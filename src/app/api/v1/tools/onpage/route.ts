import { NextRequest } from "next/server";
import { fetchWithTimeout, normalizeUrl, runTool } from "@/lib/tool-helpers";

export const maxDuration = 90;

const MAX_PAGES = 15;
const UA = "Mozilla/5.0 (compatible; RomainDeVilleAudit/1.0; +https://romaindeville.eu)";

interface PageInfo {
  url: string;
  status: number;
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  h1Count: number;
  h1: string | null;
  canonical: string | null;
  noindex: boolean;
  internalLinks: number;
  imagesWithoutAlt: number;
  wordCount: number;
  depth: number;
}

function extract(re: RegExp, html: string): string | null {
  const m = re.exec(html);
  return m ? m[1].trim() : null;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function parsePage(url: string, status: number, html: string, depth: number, origin: string): { info: PageInfo; links: string[] } {
  const title = extract(/<title[^>]*>([\s\S]*?)<\/title>/i, html);
  const metaDesc =
    extract(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i, html) ||
    extract(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i, html);
  const canonical = extract(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i, html);
  const robotsMeta = extract(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i, html);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    decodeEntities(m[1].replace(/<[^>]+>/g, "").trim())
  );

  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)];
  const imagesWithoutAlt = imgs.filter((m) => !/\balt=["'][^"']+["']/i.test(m[0])).length;

  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
  const wordCount = text.split(" ").filter((w) => w.length > 1).length;

  const links = new Set<string>();
  for (const m of html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["']/gi)) {
    try {
      const u = new URL(m[1], url);
      u.hash = "";
      u.search = "";
      if (u.origin === origin && /^https?:$/.test(u.protocol)) {
        const clean = u.toString();
        if (!/\.(pdf|jpg|jpeg|png|webp|svg|gif|zip|doc|xls|mp4|css|js|xml|ico)$/i.test(clean)) {
          links.add(clean);
        }
      }
    } catch {
      // href invalide, ignore
    }
  }

  return {
    info: {
      url,
      status,
      title: title ? decodeEntities(title) : null,
      titleLength: title ? decodeEntities(title).length : 0,
      metaDescription: metaDesc ? decodeEntities(metaDesc) : null,
      metaDescriptionLength: metaDesc ? decodeEntities(metaDesc).length : 0,
      h1Count: h1s.length,
      h1: h1s[0] || null,
      canonical,
      noindex: !!robotsMeta && /noindex/i.test(robotsMeta),
      internalLinks: links.size,
      imagesWithoutAlt,
      wordCount,
      depth,
    },
    links: Array.from(links),
  };
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parsed = normalizeUrl(body.url);

  return runTool("onpage", async () => {
    if (!parsed) throw new Error("URL invalide");
    const origin = parsed.origin;
    const start = parsed.toString();

    const visited = new Map<string, PageInfo>();
    const inDegree = new Map<string, number>();
    let queue: { url: string; depth: number }[] = [{ url: start, depth: 0 }];
    const queued = new Set<string>([start]);

    while (queue.length > 0 && visited.size < MAX_PAGES) {
      const batch = queue.splice(0, 5);
      const results = await Promise.all(
        batch.map(async ({ url, depth }) => {
          try {
            const res = await fetchWithTimeout(url, { headers: { "User-Agent": UA }, redirect: "follow" }, 8000);
            const ct = res.headers.get("content-type") || "";
            if (!ct.includes("text/html")) return null;
            const html = await res.text();
            return { url, depth, status: res.status, html };
          } catch {
            return null;
          }
        })
      );

      for (const r of results) {
        if (!r || visited.has(r.url)) continue;
        const { info, links } = parsePage(r.url, r.status, r.html, r.depth, origin);
        visited.set(r.url, info);
        for (const l of links) {
          inDegree.set(l, (inDegree.get(l) || 0) + 1);
          if (!queued.has(l) && queued.size < MAX_PAGES * 3 && r.depth < 3) {
            queued.add(l);
            queue.push({ url: l, depth: r.depth + 1 });
          }
        }
      }
    }

    const pages = Array.from(visited.values());
    if (pages.length === 0) throw new Error("Aucune page HTML accessible");

    const byTitle = new Map<string, string[]>();
    const byMeta = new Map<string, string[]>();
    for (const p of pages) {
      if (p.title) byTitle.set(p.title, [...(byTitle.get(p.title) || []), p.url]);
      if (p.metaDescription) byMeta.set(p.metaDescription, [...(byMeta.get(p.metaDescription) || []), p.url]);
    }

    const issues = {
      duplicateTitles: Array.from(byTitle.entries()).filter(([, u]) => u.length > 1).map(([t, u]) => ({ title: t.slice(0, 90), urls: u })),
      duplicateMetas: Array.from(byMeta.entries()).filter(([, u]) => u.length > 1).map(([, u]) => u),
      missingTitle: pages.filter((p) => !p.title).map((p) => p.url),
      missingMeta: pages.filter((p) => !p.metaDescription).map((p) => p.url),
      titleTooLongOrShort: pages.filter((p) => p.title && (p.titleLength > 65 || p.titleLength < 25)).map((p) => ({ url: p.url, length: p.titleLength })),
      noH1: pages.filter((p) => p.h1Count === 0).map((p) => p.url),
      multiH1: pages.filter((p) => p.h1Count > 1).map((p) => ({ url: p.url, count: p.h1Count })),
      noindexPages: pages.filter((p) => p.noindex).map((p) => p.url),
      brokenPages: pages.filter((p) => p.status >= 400).map((p) => ({ url: p.url, status: p.status })),
      thinPages: pages.filter((p) => p.wordCount < 250).map((p) => ({ url: p.url, words: p.wordCount })),
      lowInternalLinks: pages.filter((p) => (inDegree.get(p.url) || 0) <= 1 && p.url !== start).map((p) => p.url),
      imagesWithoutAlt: pages.reduce((a, p) => a + p.imagesWithoutAlt, 0),
    };

    return {
      data: {
        startUrl: start,
        pagesCrawled: pages.length,
        /* ALERTES D'ABORD : si le payload est tronque cote prompt, l'essentiel survit */
        alerts: {
          noindexCount: issues.noindexPages.length,
          noindexPages: issues.noindexPages,
          brokenCount: issues.brokenPages.length,
          brokenPages: issues.brokenPages,
        },
        issues,
        maxDepthReached: Math.max(...pages.map((p) => p.depth)),
        avgWordCount: Math.round(pages.reduce((a, p) => a + p.wordCount, 0) / pages.length),
        pages: pages.map((p) => ({
          url: p.url,
          title: p.title?.slice(0, 70) || null,
          titleLength: p.titleLength,
          metaLength: p.metaDescriptionLength,
          h1Count: p.h1Count,
          words: p.wordCount,
          inLinks: inDegree.get(p.url) || 0,
          depth: p.depth,
          noindex: p.noindex,
          status: p.status,
        })),
        note: `Crawl limité à ${MAX_PAGES} pages, profondeur 3, même domaine. Représentatif, pas exhaustif.`,
      },
    };
  });
}
