import { NextRequest, NextResponse } from "next/server";
import type { BusinessInputs } from "@/lib/audit-types";
import type { ToolId, ToolResult, UnifiedReport } from "@/lib/tools";
import { TOOLS } from "@/lib/tools";

export const maxDuration = 300;

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

function buildPrompt(url: string, results: ToolResult[], business: BusinessInputs | null): string {
  const toolName = (id: ToolId) => TOOLS.find((t) => t.id === id)?.name || id;

  const sections = results
    .map((r) => {
      const header = `### TOOL "${toolName(r.tool)}" (id: ${r.tool}) , statut: ${r.status}`;
      if (r.status === "error") return `${header}\nErreur: ${r.error}`;
      return `${header}\n${JSON.stringify(r.data, null, 1).slice(0, 6000)}`;
    })
    .join("\n\n");

  const hasBusiness = !!(business && (business.monthlyVisits || business.conversionRate || business.avgOrderValue));

  const businessSection = hasBusiness
    ? `DONNEES BUSINESS DU CLIENT :
- Visites mensuelles : ${business!.monthlyVisits ?? "non fournies"}
- Taux de conversion : ${business!.conversionRate != null ? business!.conversionRate + " %" : "non fourni"}
- Panier moyen : ${business!.avgOrderValue != null ? business!.avgOrderValue + " EUR" : "non fourni"}`
    : "DONNEES BUSINESS : non fournies.";

  return `Tu es Romain De Ville, consultant senior en performance web, SEO et GEO, base a Bruxelles. Tu rediges un rapport d'analyse multi-outils pour un client.

REGLES DE REDACTION :
- JAMAIS de tiret cadratin ni demi-cadratin. Virgules, points ou deux-points.
- JAMAIS ces expressions : "il est important de noter", "il convient de", "force est de constater", "dans un souci de", "il est a noter que", "n'hesitez pas a", "il est essentiel de", "en outre", "de surcroit", "par ailleurs", "en effet", "ainsi".
- Vouvoie le client. Direct et concret. Chiffres exacts tires des donnees.
- Phrases variees. Rien de generique : chaque phrase s'appuie sur les donnees fournies.

REGLES DE COHERENCE :
- Si un tool est en erreur ou vide, dis-le sobrement dans sa section, sans inventer de resultat.
- N'invente aucune statistique non sourcable. Pas de promesses chiffrees fermes : ordres de grandeur prudents.
- Pour les mots-cles : pas de volumes de recherche, raisonne en intention (transactionnel, informationnel, local) et en pertinence business.
${hasBusiness ? '- Chiffrage business : elasticite prudente (environ 7 % de conversion par seconde de chargement, etudes Akamai/Deloitte), calcul montre, ordre de grandeur.' : "- Pas de donnees business : ne chiffre rien en euros, pas de champ businessImpact."}

SITE ANALYSE : ${url}
DATE : ${new Date().toISOString().slice(0, 10)}

RESULTATS BRUTS DES TOOLS :

${sections}

${businessSection}

Reponds UNIQUEMENT avec un objet JSON valide, sans markdown ni backticks :

{
  "summary": "Synthese globale en 5-7 phrases : etat general du site, les 3 constats majeurs tous outils confondus, le niveau d'urgence.",
  "sections": [
    {
      "toolId": "id exact du tool",
      "title": "Titre court de la section",
      "verdict": "bon",
      "findings": "Ce que les donnees montrent, avec les chiffres exacts. 3-6 phrases.",
      "recommendations": "Actions concretes pour ce volet. 2-4 phrases."
    }
  ],
  "priorities": [
    {
      "title": "Action prioritaire",
      "why": "Justification chiffree issue des donnees.",
      "how": "Etapes concretes.",
      "impact": "Fort",
      "effort": "2-4 h"
    }
  ]${hasBusiness ? `,
  "businessImpact": "Paragraphe chiffre en euros, calcul montre, prudent."` : ""}
}

REGLES JSON STRICTES :
- "sections" : exactement une entree par tool fourni ci-dessus (${results.length} entrees), toolId identique a l'id fourni
- verdict : "bon", "moyen" ou "mauvais"
- "priorities" : entre 3 et 6 entrees, classees par impact decroissant, melangees tous outils confondus
- impact : "Fort", "Moyen" ou "Faible"
- Francais avec accents corrects, sans tiret cadratin, sans formules d'IA.${hasBusiness ? "" : `
- PAS de champ "businessImpact".`}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      url: string;
      results: ToolResult[];
      business?: BusinessInputs | null;
    };

    if (!body.url || !Array.isArray(body.results) || body.results.length === 0) {
      return NextResponse.json({ error: "url et results requis" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ANTHROPIC_API_KEY manquante" }, { status: 500 });
    }

    const res = await fetch(ANTHROPIC_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 8000,
        messages: [{ role: "user", content: buildPrompt(body.url, body.results, body.business ?? null) }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Anthropic API error:", res.status, err.slice(0, 500));
      return NextResponse.json({ error: `Anthropic API error: ${res.status}` }, { status: 502 });
    }

    const data = await res.json();
    let text = data.content[0].text.trim();
    if (text.startsWith("```")) {
      text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const parsed = JSON.parse(text) as UnifiedReport;

    const clean = (s: string) => s.replace(/[\u2014\u2013]/g, ", ");
    parsed.summary = clean(parsed.summary);
    parsed.sections = parsed.sections.map((s) => ({ ...s, findings: clean(s.findings), recommendations: clean(s.recommendations) }));
    parsed.priorities = parsed.priorities.map((p) => ({ ...p, title: clean(p.title), why: clean(p.why), how: clean(p.how) }));
    if (parsed.businessImpact) parsed.businessImpact = clean(parsed.businessImpact);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Report error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Erreur rapport" }, { status: 500 });
  }
}
