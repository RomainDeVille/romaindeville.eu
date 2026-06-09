import { NextRequest, NextResponse } from "next/server";
import type { PageSpeedAudit, AuditRecommendations } from "@/lib/audit-types";

export const maxDuration = 60;

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

export async function POST(request: NextRequest) {
  try {
    const { audit } = (await request.json()) as { audit: PageSpeedAudit };

    if (!audit?.url || !audit?.categories) {
      return NextResponse.json({ error: "Données audit manquantes" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY manquante" }, { status: 500 });
    }

    const prompt = `Tu es Romain De Ville, consultant senior en performance web, SEO et GEO, basé à Bruxelles. Tu rédiges un rapport d'audit pour un client.

RÈGLES DE RÉDACTION :
- JAMAIS de tiret cadratin ni demi-cadratin (— ou –). Utilise des virgules, des points ou des deux-points.
- JAMAIS ces expressions : "il est important de noter", "il convient de", "force est de constater", "dans un souci de", "il est à noter que", "n'hésitez pas à", "il est essentiel de", "en outre", "de surcroît", "par ailleurs", "en effet", "ainsi".
- Vouvoie le client. Sois direct : "Votre site charge en 2.6s" pas "Le site audité présente un temps de chargement de 2.6s".
- Chiffres concrets. Instructions exactes, pas de suggestions molles.
- Phrases variées : alterne courtes et longues. Pas de structures répétitives.
- Chaque observation spécifique aux données fournies, rien de générique.

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

Réponds UNIQUEMENT avec un objet JSON valide. Pas de markdown autour, pas de backticks, pas de texte avant ou après le JSON. Voici la structure exacte attendue :

{
  "summary": "Paragraphe de synthèse (3-5 phrases). Verdict global + les 2-3 actions les plus impactantes.",
  "scores": [
    {
      "category": "Nom exact de la catégorie",
      "score": 78,
      "verdict": "moyen",
      "analysis": "Paragraphe d'analyse spécifique. Ce que ce score signifie concrètement pour le client."
    }
  ],
  "actions": [
    {
      "title": "Titre court de l'action",
      "problem": "Description du problème avec les chiffres exacts du rapport.",
      "importance": "Impact concret sur le business et les utilisateurs, avec chiffres.",
      "fix": "Instructions techniques précises et complètes. Pas de code, juste les étapes à suivre clairement.",
      "impact": "Fort"
    }
  ],
  "metrics": [
    {
      "name": "Nom de la métrique (ex: First Contentful Paint)",
      "value": "2.6 s",
      "verdict": "À améliorer",
      "thresholds": "Bon : < 1.8s, À améliorer : 1.8-3.0s, Mauvais : > 3.0s",
      "explanation": "Ce que cette valeur signifie concrètement pour l'utilisateur du site."
    }
  ],
  "extras": [
    {
      "title": "Titre de la recommandation",
      "description": "Explication et piste de correction concrète."
    }
  ]
}

RÈGLES JSON STRICTES :
- "scores" : exactement ${audit.categories.length} entrées, une par catégorie
- "actions" : exactement 5 entrées, classées par impact décroissant
- "metrics" : une entrée par Core Web Vital ci-dessus (${audit.metrics.length} entrées)
- "extras" : entre 3 et 5 entrées
- verdict scores : "bon" (>= 90), "moyen" (50-89), "mauvais" (< 50)
- verdict metrics : "Bon", "À améliorer" ou "Mauvais"
- impact actions : "Fort", "Moyen" ou "Faible"
- Dans le champ "fix" : PAS de blocs de code, PAS de backticks. Décris les étapes en texte clair.
- Tous les textes en français, sans tiret cadratin, sans formules d'IA.`;

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
      return NextResponse.json({ error: `Anthropic API error: ${res.status}` }, { status: 502, statusText: err });
    }

    const data = await res.json();
    let text = data.content[0].text.trim();

    // Strip markdown wrappers if present
    if (text.startsWith("```")) {
      text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const parsed = JSON.parse(text) as AuditRecommendations;

    // Sanitize em dashes
    const clean = (s: string) => s.replace(/[—–]/g, ", ");
    parsed.summary = clean(parsed.summary);
    parsed.scores = parsed.scores.map((s) => ({ ...s, analysis: clean(s.analysis) }));
    parsed.actions = parsed.actions.map((a) => ({
      ...a,
      title: clean(a.title),
      problem: clean(a.problem),
      importance: clean(a.importance),
      fix: clean(a.fix),
    }));
    parsed.metrics = parsed.metrics.map((m) => ({ ...m, explanation: clean(m.explanation) }));
    parsed.extras = parsed.extras.map((e) => ({ ...e, description: clean(e.description) }));

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Recommend error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur IA" },
      { status: 500 }
    );
  }
}
