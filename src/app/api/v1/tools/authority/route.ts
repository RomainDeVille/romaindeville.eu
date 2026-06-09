import { NextRequest } from "next/server";
import { fetchWithTimeout, normalizeUrl, runTool } from "@/lib/tool-helpers";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parsed = normalizeUrl(body.url);
  const competitors: string[] = Array.isArray(body.competitors)
    ? body.competitors.filter((c: unknown) => typeof c === "string").slice(0, 5)
    : [];

  return runTool("authority", async () => {
    if (!parsed) throw new Error("URL invalide");
    const apiKey = process.env.OPENPAGERANK_API_KEY;
    if (!apiKey) throw new Error("OPENPAGERANK_API_KEY non configuree sur Vercel");

    const domains = [
      parsed.hostname.replace(/^www\./, ""),
      ...competitors
        .map((c) => normalizeUrl(c)?.hostname.replace(/^www\./, ""))
        .filter((d): d is string => !!d),
    ];

    const params = domains.map((d) => `domains[]=${encodeURIComponent(d)}`).join("&");
    const res = await fetchWithTimeout(
      `https://openpagerank.com/api/v1.0/getPageRank?${params}`,
      { headers: { "API-OPR": apiKey } },
      10000
    );
    if (!res.ok) throw new Error(`OpenPageRank en erreur (HTTP ${res.status})`);

    const data = (await res.json()) as {
      response: { domain: string; page_rank_decimal: number | string; rank: string | null; status_code: number }[];
    };

    const results = data.response.map((r) => ({
      domain: r.domain,
      found: r.status_code === 200,
      pageRank: typeof r.page_rank_decimal === "number" ? r.page_rank_decimal : parseFloat(r.page_rank_decimal) || 0,
      globalRank: r.rank ? parseInt(r.rank, 10) : null,
    }));

    return { data: { main: results[0], competitors: results.slice(1) } };
  });
}
