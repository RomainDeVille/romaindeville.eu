import { caseStudies } from "@/lib/case-studies";
import { EXPERTISES } from "@/lib/expertises";
import { EXPERTISE_SLUG_FR_EN } from "@/lib/i18n";

export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://romaindeville.eu";
const abs = (p: string) => `${BASE}${p === "/" ? "" : p}`;

interface Pair {
  fr: string;
  en: string;
  changefreq: string;
  priority: string;
}

function pairs(): Pair[] {
  const statics: Pair[] = [
    { fr: "/", en: "/en", changefreq: "weekly", priority: "1.0" },
    { fr: "/etudes-de-cas", en: "/en/case-studies", changefreq: "monthly", priority: "0.8" },
    { fr: "/parcours", en: "/en/about", changefreq: "monthly", priority: "0.6" },
    { fr: "/plan-du-site", en: "/en/site-map", changefreq: "monthly", priority: "0.3" },
  ];
  const expertises = EXPERTISES.map((e) => ({
    fr: `/${e.slug}`,
    en: `/en/${EXPERTISE_SLUG_FR_EN[e.slug]}`,
    changefreq: "monthly",
    priority: "0.9",
  }));
  const cases = caseStudies.map((c) => ({
    fr: `/etudes-de-cas/${c.slug}`,
    en: `/en/case-studies/${c.slug}`,
    changefreq: "monthly",
    priority: "0.7",
  }));
  return [...statics, ...expertises, ...cases];
}

function urlNode(loc: string, frAbs: string, enAbs: string, lastmod: string, changefreq: string, priority: string) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr-BE" href="${frAbs}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${enAbs}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${frAbs}"/>
  </url>`;
}

export function GET() {
  const lastmod = new Date().toISOString();
  const nodes: string[] = [];
  for (const p of pairs()) {
    const frAbs = abs(p.fr);
    const enAbs = abs(p.en);
    nodes.push(urlNode(frAbs, frAbs, enAbs, lastmod, p.changefreq, p.priority));
    nodes.push(urlNode(enAbs, frAbs, enAbs, lastmod, p.changefreq, p.priority));
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${nodes.join("\n")}
</urlset>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
