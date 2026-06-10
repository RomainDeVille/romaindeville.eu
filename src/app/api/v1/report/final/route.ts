import { NextRequest, NextResponse } from "next/server";
import type { BusinessInputs } from "@/lib/audit-types";
import type { FinalReport, SectionReport } from "@/lib/tools";

export const maxDuration = 120;

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

function buildPrompt(url: string, sections: SectionReport[], failed: string[], business: BusinessInputs | null): string {
  const condensed = sections.map((s) => ({
    volet: s.title,
    verdict: s.verdict,
    constats: s.keyFindings,
    recommandations: s.recommendations.map((r) => `${r.action} (impact ${r.impact}, ${r.effort})${r.expectedResult ? " , resultat attendu : " + r.expectedResult : ""}`),
  }));

  const hasBusiness = !!(business && (business.monthlyVisits || business.conversionRate || business.avgOrderValue));

  return `Tu es Romain De Ville, consultant senior en performance web, SEO et GEO. Les chapitres detailles d'un rapport d'audit multi-outils sont deja rediges. Tu ecris maintenant LA SYNTHESE TRANSVERSALE.

REGLES DE REDACTION :
- JAMAIS de tiret cadratin. JAMAIS de formules d'IA ("il est important de noter", "en outre", "par ailleurs", "en effet", "ainsi").
- Vouvoie le client. Chiffres exacts repris des constats. Aucune invention.
${hasBusiness ? "- Chiffrage business : elasticite prudente (environ 7 % de conversion par seconde de chargement, etudes Akamai/Deloitte), calcul montre, ordre de grandeur." : "- Pas de donnees business : ne chiffre rien en euros, pas de champ businessImpact."}

SITE : ${url}
DONNEES BUSINESS : ${hasBusiness ? JSON.stringify(business) : "non fournies"}
VOLETS EN ECHEC TECHNIQUE : ${failed.length > 0 ? failed.join(", ") : "aucun"}

SYNTHESES DES CHAPITRES :
${JSON.stringify(condensed, null, 1).slice(0, 12000)}

Reponds UNIQUEMENT avec un objet JSON valide, sans markdown ni backticks :

{
  "summary": "Resume executif de 6 a 9 phrases : etat general, les 3 forces, les 3 faiblesses majeures, le niveau d'urgence. C'est la premiere chose que le client lit.",
  "priorities": [
    {
      "title": "Action prioritaire",
      "why": "Justification chiffree, croisee entre volets quand c'est pertinent.",
      "how": "Premieres etapes concretes.",
      "impact": "Fort" | "Moyen" | "Faible",
      "effort": "ex: 2-4 h",
      "expectedResult": "Resultat attendu mesurable et prudent : metrique visee, valeur cible, comment et quand verifier."
    }
  ]${hasBusiness ? `,
  "businessImpact": "Paragraphe chiffre en euros, calcul montre, prudent."` : ""},
  "conclusion": "3-4 phrases : la trajectoire recommandee sur 90 jours et le premier pas a faire cette semaine."
}

REGLES JSON : priorities entre 5 et 7 entrees, chacune avec un expectedResult mesurable et prudent, classees par impact decroissant, tirees des recommandations des chapitres (deduplique les doublons entre volets). Francais avec accents.${hasBusiness ? "" : ' PAS de champ "businessImpact".'}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      url: string;
      sections: SectionReport[];
      failed?: string[];
      business?: BusinessInputs | null;
    };
    if (!body.url || !Array.isArray(body.sections) || body.sections.length === 0) {
      return NextResponse.json({ error: "url et sections requis" }, { status: 400 });
    }
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY manquante" }, { status: 500 });

    const res = await fetch(ANTHROPIC_API, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4000,
        messages: [
          { role: "user", content: buildPrompt(body.url, body.sections, body.failed || [], body.business ?? null) },
        ],
      }),
    });
    if (!res.ok) {
      console.error("Anthropic final error:", res.status, (await res.text()).slice(0, 300));
      return NextResponse.json({ error: `Anthropic API error: ${res.status}` }, { status: 502 });
    }

    const data = await res.json();
    let text = data.content[0].text.trim();
    if (text.startsWith("```")) text = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");

    const parsed = JSON.parse(text) as FinalReport;
    const clean = (s: string) => s.replace(/[\u2014\u2013]/g, ", ");
    parsed.summary = clean(parsed.summary);
    parsed.conclusion = clean(parsed.conclusion);
    parsed.priorities = parsed.priorities.map((p) => ({
      ...p,
      title: clean(p.title),
      why: clean(p.why),
      how: clean(p.how),
      expectedResult: p.expectedResult ? clean(p.expectedResult) : undefined,
    }));
    if (parsed.businessImpact) parsed.businessImpact = clean(parsed.businessImpact);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Final report error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Erreur synthese" }, { status: 500 });
  }
}
