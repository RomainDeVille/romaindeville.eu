import type { GeoAudit, GeoBotRule } from "@/lib/audit-types";

const AI_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "Bytespider",
  "Applebot-Extended",
];

const UA = "Mozilla/5.0 (compatible; RomainDeVilleAudit/1.0; +https://romaindeville.eu)";

async function fetchText(url: string, timeoutMs = 8000): Promise<{ status: number; text: string } | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html,text/plain,*/*" },
      signal: ctrl.signal,
      cache: "no-store",
      redirect: "follow",
    });
    clearTimeout(t);
    const text = await res.text();
    return { status: res.status, text };
  } catch {
    return null;
  }
}

function collectSchemaTypes(node: unknown, out: Set<string>): void {
  if (Array.isArray(node)) {
    node.forEach((n) => collectSchemaTypes(n, out));
    return;
  }
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    const t = obj["@type"];
    if (typeof t === "string") out.add(t);
    if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && out.add(x));
    const graph = obj["@graph"];
    if (graph) collectSchemaTypes(graph, out);
  }
}

function parseSchemaTypes(html: string): string[] {
  const out = new Set<string>();
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    try {
      collectSchemaTypes(JSON.parse(m[1].trim()), out);
    } catch {
      // bloc JSON-LD invalide, ignore
    }
  }
  return Array.from(out).sort();
}

function parseRobots(robotsTxt: string): GeoBotRule[] {
  const groups = new Map<string, string[]>();
  let currentAgents: string[] = [];
  let lastWasAgent = false;

  for (const rawLine of robotsTxt.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();

    if (key === "user-agent") {
      if (!lastWasAgent) currentAgents = [];
      currentAgents.push(value.toLowerCase());
      currentAgents.forEach((a) => {
        if (!groups.has(a)) groups.set(a, []);
      });
      lastWasAgent = true;
    } else {
      if (key === "disallow" || key === "allow") {
        currentAgents.forEach((a) => groups.get(a)?.push(`${key}:${value}`));
      }
      lastWasAgent = false;
    }
  }

  return AI_BOTS.map((bot) => {
    const rules = groups.get(bot.toLowerCase()) ?? groups.get("*") ?? [];
    const blockedAll = rules.some((r) => r === "disallow:/");
    return { bot, allowed: !blockedAll };
  });
}


export async function scanGeo(parsed: URL): Promise<GeoAudit> {
  const origin = parsed.origin;
  const [page, robots, llms] = await Promise.all([
    fetchText(parsed.toString()),
    fetchText(`${origin}/robots.txt`, 5000),
    fetchText(`${origin}/llms.txt`, 5000),
  ]);

  const html = page && page.status >= 200 && page.status < 400 ? page.text : "";

  const robotsTxtFound = !!robots && robots.status === 200;
  const robotsAiBots: GeoBotRule[] = robotsTxtFound
    ? parseRobots(robots.text)
    : AI_BOTS.map((bot) => ({ bot, allowed: true }));

  const hasLlmsTxt =
    !!llms &&
    llms.status === 200 &&
    llms.text.length > 0 &&
    !/<html/i.test(llms.text.slice(0, 500));

  return {
    schemaTypes: parseSchemaTypes(html),
    hasLlmsTxt,
    robotsTxtFound,
    robotsAiBots,
    metaDescription: /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i.test(html),
    ogTags: /<meta[^>]+property=["']og:/i.test(html),
    h1Count: (html.match(/<h1[\s>]/gi) || []).length,
  };
}
