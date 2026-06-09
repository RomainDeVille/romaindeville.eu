import { NextRequest, NextResponse } from "next/server";

const PAGESPEED_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

interface AuditMetric {
  id: string;
  title: string;
  score: number | null;
  displayValue?: string;
}

interface CategoryScore {
  id: string;
  title: string;
  score: number;
}

interface PageSpeedAudit {
  url: string;
  fetchedAt: string;
  categories: CategoryScore[];
  metrics: AuditMetric[];
  opportunities: AuditMetric[];
  diagnostics: AuditMetric[];
}

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

async function generateRecommendations(audit: PageSpeedAudit): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY manquante");

  const prompt = `Tu es un consultant senior en performance web. Analyse ce rapport PageSpeed Insights et rédige un rapport actionnable en français pour un client non-technique.

URL auditée : ${audit.url}
Date : ${audit.fetchedAt}

SCORES GLOBAUX :
${audit.categories.map((c) => `- ${c.title} : ${c.score}/100`).join("\n")}

MÉTRIQUES CORE WEB VITALS :
${audit.metrics.map((m) => `- ${m.title} : ${m.displayValue || "N/A"} (score: ${m.score !== null ? Math.round(m.score * 100) : "N/A"})`).join("\n")}

OPPORTUNITÉS D'AMÉLIORATION :
${audit.opportunities.map((o) => `- ${o.title} ${o.displayValue ? "(" + o.displayValue + ")" : ""}`).join("\n")}

DIAGNOSTICS :
${audit.diagnostics.map((d) => `- ${d.title} ${d.displayValue ? "(" + d.displayValue + ")" : ""}`).join("\n")}

Rédige le rapport avec cette structure exacte en Markdown :

## Résumé exécutif
Un paragraphe de synthèse avec le verdict global et les 2-3 actions les plus impactantes.

## Analyse des scores
Pour chaque catégorie (Performance, Accessibilité, SEO, Bonnes pratiques), un court paragraphe avec interprétation du score et ce que ça signifie concrètement.

## Top 5 des actions prioritaires
Liste numérotée des 5 actions classées par impact. Pour chaque action :
- Le problème détecté
- Pourquoi c'est important
- Comment le corriger (instructions concrètes)
- Impact estimé (fort/moyen/faible)

## Métriques détaillées
Explication vulgarisée de chaque Core Web Vital : ce que la valeur signifie, si c'est bon/moyen/mauvais selon les seuils Google.

## Recommandations complémentaires
3-5 recommandations additionnelles basées sur les diagnostics.

Sois direct, concret, actionnable. Pas de jargon inutile. Le client doit pouvoir transmettre ce rapport à son développeur.`;

  const res = await fetch(ANTHROPIC_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.content[0].text;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL requise" }, { status: 400 });
    }

    // Validate URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return NextResponse.json({ error: "URL invalide" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GOOGLE_PAGESPEED_API_KEY non configurée" },
        { status: 500 }
      );
    }

    // Call PageSpeed Insights API
    const categories = ["performance", "accessibility", "best-practices", "seo"];
    const params = new URLSearchParams({
      url: parsedUrl.toString(),
      key: apiKey,
      strategy: "mobile",
    });
    categories.forEach((c) => params.append("category", c));

    const psRes = await fetch(`${PAGESPEED_API}?${params}`, {
      next: { revalidate: 0 },
    });

    if (!psRes.ok) {
      const err = await psRes.text();
      return NextResponse.json(
        { error: `PageSpeed API error: ${psRes.status}`, details: err },
        { status: 502 }
      );
    }

    const psData = await psRes.json();
    const audit = parsePageSpeedResponse(psData);

    // Generate AI recommendations
    const recommendations = await generateRecommendations(audit);

    // Generate a simple ID (timestamp + random)
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

    const report = {
      id,
      audit,
      recommendations,
      createdAt: new Date().toISOString(),
    };

    // For MVP: store in a cookie-like mechanism or return directly
    // TODO: Replace with Supabase storage
    return NextResponse.json(report);
  } catch (err) {
    console.error("Audit error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur interne" },
      { status: 500 }
    );
  }
}
