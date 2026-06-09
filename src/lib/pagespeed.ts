import type {
  AuditMetric,
  BlockingResource,
  CategoryScore,
  DesktopSummary,
  FieldMetric,
  PageSpeedAudit,
} from "@/lib/audit-types";

const PAGESPEED_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

const METRIC_IDS = [
  "first-contentful-paint",
  "largest-contentful-paint",
  "total-blocking-time",
  "cumulative-layout-shift",
  "speed-index",
  "interactive",
];

export type Json = Record<string, unknown>;

export function parseCategories(lhr: Json): CategoryScore[] {
  const categories = lhr.categories as Record<string, Json>;
  return Object.values(categories).map((cat) => ({
    id: cat.id as string,
    title: cat.title as string,
    score: Math.round(((cat.score as number) || 0) * 100),
  }));
}

export function parseMetrics(lhr: Json): AuditMetric[] {
  const audits = lhr.audits as Record<string, Json>;
  return METRIC_IDS.filter((id) => audits[id]).map((id) => ({
    id,
    title: audits[id].title as string,
    score: audits[id].score as number | null,
    displayValue: audits[id].displayValue as string | undefined,
  }));
}

export function parseBlockingResources(lhr: Json): BlockingResource[] {
  const audits = lhr.audits as Record<string, Json>;
  const audit = audits["render-blocking-resources"];
  if (!audit) return [];
  const details = audit.details as Json | undefined;
  const items = (details?.items as Json[] | undefined) || [];
  return items.slice(0, 10).map((it) => ({
    url: it.url as string,
    wastedMs: it.wastedMs as number | undefined,
    totalBytes: it.totalBytes as number | undefined,
  }));
}

const FIELD_LABELS: Record<string, string> = {
  FIRST_CONTENTFUL_PAINT_MS: "First Contentful Paint (terrain)",
  LARGEST_CONTENTFUL_PAINT_MS: "Largest Contentful Paint (terrain)",
  CUMULATIVE_LAYOUT_SHIFT_SCORE: "Cumulative Layout Shift (terrain)",
  INTERACTION_TO_NEXT_PAINT: "Interaction to Next Paint (terrain)",
  EXPERIMENTAL_TIME_TO_FIRST_BYTE: "Time to First Byte (terrain)",
};

export function parseFieldData(exp: Json | undefined): FieldMetric[] {
  if (!exp) return [];
  const metrics = exp.metrics as Record<string, Json> | undefined;
  if (!metrics) return [];
  const out: FieldMetric[] = [];
  for (const [key, label] of Object.entries(FIELD_LABELS)) {
    const m = metrics[key];
    if (!m) continue;
    const pct = m.percentile as number;
    const display =
      key === "CUMULATIVE_LAYOUT_SHIFT_SCORE"
        ? (pct / 100).toFixed(2)
        : pct >= 1000
          ? `${(pct / 1000).toFixed(1)} s`
          : `${pct} ms`;
    out.push({
      name: label,
      displayValue: display,
      category: m.category as FieldMetric["category"],
    });
  }
  return out;
}

export function parseFull(data: Json): PageSpeedAudit {
  const lhr = data.lighthouseResult as Json;
  const audits = lhr.audits as Record<string, Json>;
  const finalUrl = (lhr.finalDisplayedUrl || lhr.finalUrl || "") as string;

  const opportunities: AuditMetric[] = Object.values(audits)
    .filter(
      (a) =>
        (a.details as Json)?.type === "opportunity" &&
        (a.score as number | null) !== null &&
        (a.score as number) < 0.9
    )
    .sort((a, b) => ((a.score as number) || 0) - ((b.score as number) || 0))
    .slice(0, 10)
    .map((a) => ({
      id: a.id as string,
      title: a.title as string,
      score: a.score as number | null,
      displayValue: a.displayValue as string | undefined,
    }));

  const diagnostics: AuditMetric[] = Object.values(audits)
    .filter(
      (a) =>
        (a.details as Json)?.type === "table" &&
        (a.score as number | null) !== null &&
        (a.score as number) < 0.9 &&
        !METRIC_IDS.includes(a.id as string) &&
        !opportunities.find((o) => o.id === a.id)
    )
    .sort((a, b) => ((a.score as number) || 0) - ((b.score as number) || 0))
    .slice(0, 8)
    .map((a) => ({
      id: a.id as string,
      title: a.title as string,
      score: a.score as number | null,
      displayValue: a.displayValue as string | undefined,
    }));

  const urlField = parseFieldData(data.loadingExperience as Json | undefined);
  const originField = parseFieldData(data.originLoadingExperience as Json | undefined);
  const fieldData = urlField.length > 0 ? urlField : originField;
  const fieldDataSource: "url" | "origin" | undefined =
    urlField.length > 0 ? "url" : originField.length > 0 ? "origin" : undefined;

  return {
    url: finalUrl,
    fetchedAt: new Date().toISOString(),
    categories: parseCategories(lhr),
    metrics: parseMetrics(lhr),
    opportunities,
    diagnostics,
    blockingResources: parseBlockingResources(lhr),
    fieldData,
    fieldDataSource,
  };
}

export function parseDesktop(data: Json): DesktopSummary {
  const lhr = data.lighthouseResult as Json;
  return { categories: parseCategories(lhr), metrics: parseMetrics(lhr) };
}

export async function runPageSpeed(url: string, apiKey: string, strategy: "mobile" | "desktop") {
  const categories = ["performance", "accessibility", "best-practices", "seo"];
  const params = new URLSearchParams({ url, key: apiKey, strategy });
  categories.forEach((c) => params.append("category", c));
  const res = await fetch(`${PAGESPEED_API}?${params}`, { cache: "no-store" });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`PageSpeed API error (${strategy}): ${res.status} ${err.slice(0, 200)}`);
  }
  return (await res.json()) as Json;
}

