import { NextRequest, NextResponse } from "next/server";
import type { BusinessInputs } from "@/lib/audit-types";
import type { SectionReport, ToolId, ToolResult } from "@/lib/tools";
import { TOOLS } from "@/lib/tools";

export const maxDuration = 120;

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

const GUIDANCE: Record<ToolId, string> = {
  pagespeed:
    "Compare mobile et desktop metrique par metrique (FCP, LCP, TBT, CLS, Speed Index, TTI). Cite les valeurs exactes. Si des donnees terrain CrUX existent, confronte labo et terrain. Cite les URLs exactes des ressources bloquantes. Ne promets rien sur les metriques deja vertes.",
  onpage:
    "Analyse page par page : titles dupliques ou hors gabarit (25-65 caracteres), metas manquantes, pages sans H1 ou multi-H1, pages minces (<250 mots), pages mal maillees (inLinks faibles). Croise avec les requetes business du site : quelles pages existantes optimiser, quelles pages creer. Cite les URLs exactes.",
  geo: "Evalue chaque signal (Schema.org, llms.txt, robots IA, meta, OG, H1) et explique son role concret dans la visibilite ChatGPT/Perplexity/AI Overviews. Identifie le manque le plus penalisant.",
  dns: "Explique l'etat SPF/DKIM/DMARC en termes de delivrabilite concrete (Gmail, Outlook). Un DKIM non detecte sur les selecteurs courants n'est pas forcement absent : dis-le.",
  security:
    "Detaille chaque header absent et le risque concret associe (clickjacking, sniffing, fuite referrer). Donne la valeur recommandee de chaque header manquant.",
  carbon: "Replace le poids et le CO2 dans le contexte (mediane web ~0.8 g/visite). Si la note est bonne, dis que c'est un argument valorisable, pas un chantier.",
  w3c: "Si zero erreur, dis-le sobrement et explique le benefice (parsing moteurs et IA). Sinon, liste les erreurs les plus structurantes.",
  keywords:
    "Classe les suggestions par intention (transactionnelle, informationnelle, locale). Identifie 5 a 10 requetes prioritaires et les sujets d'articles a creer. Rappelle qu'il n'y a pas de volumes. Ignore les suggestions hors sujet en le signalant.",
  authority:
    "Compare le PageRank du site a chaque concurrent nomme. Si le site n'est pas reference, explique ce que ca signifie (profil de liens quasi vide) et la trajectoire realiste.",
  "crux-history":
    "Si donnees disponibles : commente les tendances par metrique avec les pourcentages. Sinon, explique pourquoi (seuil de trafic) sans dramatiser.",
};

function buildPrompt(url: string, result: ToolResult, business: BusinessInputs | null): string {
  const tool = TOOLS.find((t) => t.id === result.tool);
  const name = tool?.name || result.tool;

  return `Tu es Romain De Ville, consultant senior en performance web, SEO et GEO, base a Bruxelles. Tu rediges UN CHAPITRE d'un rapport d'audit client, consacre au volet "${name}".

REGLES DE REDACTION :
- JAMAIS de tiret cadratin ni demi-cadratin. Virgules, points, deux-points.
- JAMAIS ces expressions : "il est important de noter", "il convient de", "force est de constater", "il est essentiel de", "en outre", "par ailleurs", "en effet", "ainsi", "n'hesitez pas".
- Vouvoie le client. Direct, concret, chiffres exacts tires des donnees. Phrases variees.
- N'invente AUCUNE donnee, AUCUNE statistique externe non sourcable, AUCUNE URL.
- Ne promets jamais d'amelioration sur un point deja bon : dis qu'il est a maintenir.

CONSIGNE SPECIFIQUE A CE VOLET : ${GUIDANCE[result.tool]}

SITE : ${url}
STATUT DU TOOL : ${result.status}
DONNEES BRUTES :
${JSON.stringify(result.data, null, 1).slice(0, 9000)}
${business ? `\nCONTEXTE BUSINESS : ${JSON.stringify(business)}` : ""}

Reponds UNIQUEMENT avec un objet JSON valide, sans markdown ni backticks :

{
  "title": "Titre court du chapitre",
  "verdict": "bon" | "moyen" | "mauvais",
  "keyFindings": ["3 a 6 constats chiffres, une phrase chacun, les chiffres exacts des donnees"],
  "narrative": ["2 a 4 paragraphes d'analyse approfondie (4-7 phrases chacun) : ce que les donnees montrent, pourquoi c'est important pour le business du client, ce qui se passe si rien n'est fait"],
  "recommendations": [
    {
      "action": "Action concrete courte",
      "detail": "Etapes precises d'execution, 2-4 phrases, pas de code.",
      "impact": "Fort" | "Moyen" | "Faible",
      "effort": "estimation en heures ou jours, ex: 2-4 h",
      "expectedResult": "Resultat attendu MESURABLE et prudent : la metrique visee, sa valeur cible (fourchette ou ordre de grandeur), et comment/quand le verifier. Ex: LCP mobile attendu sous 3 s, verifiable dans PageSpeed Insights apres correction, confirme dans CrUX sous 28 jours."
    }
  ]
}

REGLES JSON : recommendations entre 2 et 4 entrees, chacune avec un expectedResult mesurable et prudent (jamais de promesse ferme : utiliser attendu, de l'ordre de). Tous les textes en francais avec accents corrects.`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { url: string; result: ToolResult; business?: BusinessInputs | null };
    if (!body.url || !body.result?.tool) {
      return NextResponse.json({ error: "url et result requis" }, { status: 400 });
    }
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY manquante" }, { status: 500 });

    const res = await fetch(ANTHROPIC_API, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 3500,
        messages: [{ role: "user", content: buildPrompt(body.url, body.result, body.business ?? null) }],
      }),
    });
    if (!res.ok) {
      console.error("Anthropic section error:", res.status, (await res.text()).slice(0, 300));
      return NextResponse.json({ error: `Anthropic API error: ${res.status}` }, { status: 502 });
    }

    const data = await res.json();
    let text = data.content[0].text.trim();
    if (text.startsWith("```")) text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");

    const parsed = JSON.parse(text) as Omit<SectionReport, "toolId">;
    const clean = (s: string) => s.replace(/[\u2014\u2013]/g, ", ");
    const section: SectionReport = {
      toolId: body.result.tool,
      title: clean(parsed.title),
      verdict: parsed.verdict,
      keyFindings: parsed.keyFindings.map(clean),
      narrative: parsed.narrative.map(clean),
      recommendations: parsed.recommendations.map((r) => ({
        ...r,
        action: clean(r.action),
        detail: clean(r.detail),
        expectedResult: r.expectedResult ? clean(r.expectedResult) : undefined,
      })),
    };
    return NextResponse.json(section);
  } catch (err) {
    console.error("Section report error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Erreur chapitre" }, { status: 500 });
  }
}
