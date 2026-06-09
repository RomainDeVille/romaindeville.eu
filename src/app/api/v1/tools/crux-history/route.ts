import { NextRequest } from "next/server";
import { fetchWithTimeout, normalizeUrl, runTool } from "@/lib/tool-helpers";

export const maxDuration = 30;

const CRUX_HISTORY = "https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord";

const METRIC_LABELS: Record<string, string> = {
  largest_contentful_paint: "LCP",
  interaction_to_next_paint: "INP",
  cumulative_layout_shift: "CLS",
  first_contentful_paint: "FCP",
  experimental_time_to_first_byte: "TTFB",
};

interface CruxHistoryResponse {
  record?: {
    collectionPeriods?: { lastDate: { year: number; month: number; day: number } }[];
    metrics?: Record<string, { percentilesTimeseries?: { p75s?: (string | number | null)[] } }>;
  };
}

async function queryHistory(key: string, body: Record<string, string>): Promise<CruxHistoryResponse | null> {
  const res = await fetchWithTimeout(`${CRUX_HISTORY}?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }, 10000);
  if (res.status === 404) return null;
  if (res.status === 403) throw new Error("API Chrome UX Report non activee dans Google Cloud");
  if (!res.ok) throw new Error(`CrUX History en erreur (HTTP ${res.status})`);
  return (await res.json()) as CruxHistoryResponse;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parsed = normalizeUrl(body.url);

  return runTool("crux-history", async () => {
    if (!parsed) throw new Error("URL invalide");
    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
    if (!apiKey) throw new Error("GOOGLE_PAGESPEED_API_KEY non configuree");

    let source: "url" | "origin" = "url";
    let data = await queryHistory(apiKey, { url: parsed.toString() });
    if (!data) {
      source = "origin";
      data = await queryHistory(apiKey, { origin: parsed.origin });
    }
    if (!data || !data.record) {
      return { data: { available: false, reason: "Pas assez de trafic pour des donnees CrUX historiques." }, empty: true };
    }

    const dates = (data.record.collectionPeriods || []).map(
      (p) => `${p.lastDate.year}-${String(p.lastDate.month).padStart(2, "0")}-${String(p.lastDate.day).padStart(2, "0")}`
    );

    const metrics = Object.entries(data.record.metrics || {})
      .filter(([k]) => METRIC_LABELS[k])
      .map(([k, v]) => {
        const series = (v.percentilesTimeseries?.p75s || []).map((p) =>
          p === null || p === undefined ? null : typeof p === "string" ? parseFloat(p) : p
        );
        const valid = series.filter((s): s is number => s !== null);
        const first = valid[0] ?? null;
        const last = valid[valid.length - 1] ?? null;
        const trend =
          first !== null && last !== null && first > 0
            ? Math.round(((last - first) / first) * 100)
            : null;
        return { metric: METRIC_LABELS[k], series, latest: last, trendPct: trend };
      });

    return {
      data: { available: true, source, weeks: dates.length, dates, metrics },
    };
  });
}
