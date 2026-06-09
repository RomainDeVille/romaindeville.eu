import { NextRequest, NextResponse } from "next/server";
import type { AuditMetric, CategoryScore, PageSpeedAudit } from "@/lib/audit-types";

export const maxDuration = 60;

const PAGESPEED_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

function parsePageSpeedResponse(data: Record<string, unknown>): PageSpeedAudit {
  const lhr = data.lighthouseResult as Record<string, unknown>;
  const categories = lhr.categories as Record<string, Record<string, unknown>>;
  const audits = lhr.audits as Record<string, Record<string, unknown>>;
  const finalUrl = (lhr.finalDisplayedUrl || lhr.finalUrl || "") as string;

  const cats: CategoryScore[] = Object.values(categories).map((cat) => ({
    id: cat.id as string,
    title: cat.title as string,
    score: Math.round(((cat.score as number) || 0) * 100),
  }));

  const metricIds = [
    "first-contentful-paint",
    "largest-contentful-paint",
    "total-blocking-time",
    "cumulative-layout-shift",
    "speed-index",
    "interactive",
  ];

  const metrics: AuditMetric[] = metricIds
    .filter((id) => audits[id])
    .map((id) => ({
      id,
      title: audits[id].title as string,
      score: audits[id].score as number | null,
      displayValue: audits[id].displayValue as string | undefined,
    }));

  const opportunities: AuditMetric[] = Object.values(audits)
    .filter(
      (a) =>
        (a.details as Record<string, unknown>)?.type === "opportunity" &&
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
        (a.details as Record<string, unknown>)?.type === "table" &&
        (a.score as number | null) !== null &&
        (a.score as number) < 0.9 &&
        !metricIds.includes(a.id as string) &&
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

  return {
    url: finalUrl,
    fetchedAt: new Date().toISOString(),
    categories: cats,
    metrics,
    opportunities,
    diagnostics,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL requise" }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return NextResponse.json({ error: "URL invalide" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GOOGLE_PAGESPEED_API_KEY non configurée" }, { status: 500 });
    }

    const categories = ["performance", "accessibility", "best-practices", "seo"];
    const params = new URLSearchParams({ url: parsedUrl.toString(), key: apiKey, strategy: "mobile" });
    categories.forEach((c) => params.append("category", c));

    const psRes = await fetch(`${PAGESPEED_API}?${params}`, { cache: "no-store" });

    if (!psRes.ok) {
      const err = await psRes.text();
      return NextResponse.json({ error: `PageSpeed API error: ${psRes.status}`, details: err }, { status: 502 });
    }

    const psData = await psRes.json();
    const audit = parsePageSpeedResponse(psData);
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

    return NextResponse.json({ id, audit, createdAt: new Date().toISOString() });
  } catch (err) {
    console.error("Audit error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Erreur interne" }, { status: 500 });
  }
}
