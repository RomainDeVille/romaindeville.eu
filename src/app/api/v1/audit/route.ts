import { NextRequest, NextResponse } from "next/server";
import type { PageSpeedAudit, AuditMetric, CategoryScore, AuditRecommendations } from "@/lib/audit-types";

const PAGESPEED_API = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

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

async function generateRecommendations(audit: PageSpeedAudit): Promise<AuditRecommendations> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY manquante");

  const prompt = `Tu es Romain De Ville, consultant senior en performance web, SEO et GEO, basé à Bruxelles. Tu rédiges un rapport d'audit pour un client.

RÈGLES DE RÉDACTION :
- JAMAIS de tiret cadratin (—) ni demi-cadratin (–). Utilise des virgules, des points ou des deux-points.
- JAMAIS ces expressions : "il est important de noter", "il convient de", "force est de constater", "dans un souci de", "il est à noter que", "n'hésitez pas à", "il est essentiel de", "en outre", "de surcroît", "par ailleurs".
- Tutoie pas le client, vouvoie-le. Sois direct : "Votre site charge en 2.6s" pas "Le site audité présente un temps de chargement de 2.6s".
- Chiffres concrets. Instructions exactes, pas de suggestions molles.
- Phrases variées : alterne courtes et longues.
- Chaque observation spécifique aux données fournies, pas de générique.

URL : ${audit.url}
Date : ${audit.fetchedAt}

SCORES :
${audit.categories.map((c) => `- ${c.title} : ${c.score}/100`).join("\n")}

CORE WEB VITALS :
${audit.metrics.map((m) => `- ${m.title} : ${m.displayValue || "N/A"} (score: ${m.score !== null ? Math.round(m.score * 100) : "N/A"})`).join("\n")}

OPPORTUNITÉS :
${audit.opportunities.map((o) => `- ${o.title} ${o.displayValue ? "(" + o.displayValue + ")" : ""}`).join("\n")}

DIAGNOSTICS :
${audit.diagnostics.map((d) => `- ${d.title} ${d.displayValue ? "(" + d.displayValue + ")" : ""}`).join("\n")}

Réponds UNIQUEMENT avec un objet JSON valide (pas de markdown, pas de backticks, pas de texte avant/après). Structure exacte :

{
  "summary": "Un paragraphe de synthèse (3-5 phrases). Verdict global + les 2-3 actions les plus impactantes. Direct, concret.",
  "scores": [
    {
      "category": "Performance",
      "score": 78,
      "verdict": "moyen",
      "analysis": "Paragraphe d'analyse spécifique pour cette catégorie. Ce que ça signifie concrètement pour le propriétaire du site."
    }
  ],
  "actions": [
    {
      "title": "Titre court et clair de l'action",
      "problem": "Description précise du problème détecté, avec les chiffres du rapport.",
      "importance": "Impact concret sur l'utilisateur et le business. Chiffres à l'appui.",
      "fix": "Instructions techniques complètes. Étapes concrètes, exemples de code si pertinent. Dire exactement quoi faire.",
      "impact": "Fort"
    }
  ],
  "metrics": [
    {
      "name": "First Contentful Paint (FCP)",
      "value": "2.6 s",
      "verdict": "À améliorer",
      "thresholds": "Bon : < 1.8s, À améliorer : 1.8-3.0s, Mauvais : > 3.0s",
      "explanation": "Explication vulgarisée : ce que ça signifie pour l'utilisateur."
    }
  ],
  "extras": [
    {
      "title": "Titre de la recommandation",
      "description": "Explication + piste de correction concrète."
    }
  ]
}

OBLIGATOIRE :
- "scores" : exactement ${audit.categories.length} entrées (une par catégorie)
- "actions" : exactement 5 entrées, classées par impact décroissant
- "metrics" : une entrée par Core Web Vital listé ci-dessus
- "extras" : entre 3 et 5 recommandations complémentaires
- verdict dans scores : "bon" (>= 90), "moyen" (50-89), "mauvais" (< 50)
- verdict dans metrics : "Bon", "À améliorer" ou "Mauvais" selon les seuils Google
- Tous les textes en français, sans tiret cadratin (—), sans formules d'IA`;

  const res = await fetch(ANTHROPIC_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 6000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error: ${res.status} ${err}`);
  }

  const data = await res.json();
  const text = data.content[0].text.trim();

  // Parse JSON, handling potential markdown wrappers
  let jsonStr = text;
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    const parsed = JSON.parse(jsonStr) as AuditRecommendations;

    // Sanitize: remove any em dashes that slipped through
    const sanitize = (s: string) => s.replace(/[—–]/g, ", ");
    parsed.summary = sanitize(parsed.summary);
    parsed.scores = parsed.scores.map((s) => ({ ...s, analysis: sanitize(s.analysis) }));
    parsed.actions = parsed.actions.map((a) => ({
      ...a,
      title: sanitize(a.title),
      problem: sanitize(a.problem),
      importance: sanitize(a.importance),
      fix: sanitize(a.fix),
    }));
    parsed.metrics = parsed.metrics.map((m) => ({
      ...m,
      explanation: sanitize(m.explanation),
    }));
    parsed.extras = parsed.extras.map((e) => ({
      ...e,
      description: sanitize(e.description),
    }));

    return parsed;
  } catch {
    throw new Error("Erreur de parsing des recommandations IA");
  }
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
      return NextResponse.json(
        { error: "GOOGLE_PAGESPEED_API_KEY non configurée" },
        { status: 500 }
      );
    }

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
    const recommendations = await generateRecommendations(audit);

    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

    return NextResponse.json({
      id,
      audit,
      recommendations,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Audit error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur interne" },
      { status: 500 }
    );
  }
}
