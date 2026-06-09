import { NextRequest, NextResponse } from "next/server";
import type {
  AuditRecommendations,
  BusinessInputs,
  GeoAudit,
  PageSpeedAudit,
} from "@/lib/audit-types";

export const maxDuration = 300;

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

function buildPrompt(audit: PageSpeedAudit, geo: GeoAudit | null, business: BusinessInputs | null): string {
  const fieldSection =
    audit.fieldData && audit.fieldData.length > 0
      ? `DONNEES TERRAIN (CrUX, vrais utilisateurs sur 28 jours, source : ${audit.fieldDataSource === "origin" ? "domaine entier" : "cette page"}) :
${audit.fieldData.map((f) => `- ${f.name} : ${f.displayValue} (${f.category})`).join("\n")}`
      : "DONNEES TERRAIN : aucune donnee CrUX disponible (trafic insuffisant). Le rapport repose uniquement sur des donnees labo.";

  const desktopSection = audit.desktop
    ? `SCORES DESKTOP (comparaison) :
${audit.desktop.categories.map((c) => `- ${c.title} : ${c.score}/100`).join("\n")}
METRIQUES DESKTOP :
${audit.desktop.metrics.map((m) => `- ${m.title} : ${m.displayValue || "N/A"}`).join("\n")}`
    : "SCORES DESKTOP : non disponibles.";

  const blockingSection =
    audit.blockingResources && audit.blockingResources.length > 0
      ? `RESSOURCES BLOQUANTES EXACTES (a citer dans les corrections) :
${audit.blockingResources.map((b) => `- ${b.url}${b.wastedMs ? ` (${Math.round(b.wastedMs)} ms perdues)` : ""}${b.totalBytes ? ` (${Math.round(b.totalBytes / 1024)} KiB)` : ""}`).join("\n")}`
      : "RESSOURCES BLOQUANTES : aucune identifiee par Lighthouse.";

  const geoSection = geo
    ? `AUDIT GEO (visibilite moteurs IA) :
- Types Schema.org detectes : ${geo.schemaTypes.length > 0 ? geo.schemaTypes.join(", ") : "AUCUN"}
- llms.txt : ${geo.hasLlmsTxt ? "present" : "absent"}
- robots.txt : ${geo.robotsTxtFound ? "present" : "absent"}
- Acces des crawlers IA : ${geo.robotsAiBots.map((b) => `${b.bot} ${b.allowed ? "autorise" : "bloque"}`).join(", ")}
- Meta description : ${geo.metaDescription ? "presente" : "absente"}
- Balises Open Graph : ${geo.ogTags ? "presentes" : "absentes"}
- Nombre de H1 : ${geo.h1Count}`
    : "AUDIT GEO : non disponible.";

  const businessSection =
    business && (business.monthlyVisits || business.conversionRate || business.avgOrderValue)
      ? `DONNEES BUSINESS DU CLIENT :
- Visites mensuelles : ${business.monthlyVisits ?? "non fournies"}
- Taux de conversion : ${business.conversionRate != null ? business.conversionRate + " %" : "non fourni"}
- Panier moyen : ${business.avgOrderValue != null ? business.avgOrderValue + " EUR" : "non fourni"}`
      : "DONNEES BUSINESS : non fournies par le client.";

  const hasBusiness = !!(business && (business.monthlyVisits || business.conversionRate || business.avgOrderValue));

  return `Tu es Romain De Ville, consultant senior en performance web, SEO et GEO, base a Bruxelles. Tu rediges un rapport d'audit pour un client.

REGLES DE REDACTION :
- JAMAIS de tiret cadratin ni demi-cadratin. Utilise des virgules, des points ou des deux-points.
- JAMAIS ces expressions : "il est important de noter", "il convient de", "force est de constater", "dans un souci de", "il est a noter que", "n'hesitez pas a", "il est essentiel de", "en outre", "de surcroit", "par ailleurs", "en effet", "ainsi".
- Vouvoie le client. Sois direct : "Votre site charge en 2.6s" pas "Le site audite presente un temps de chargement de 2.6s".
- Chiffres concrets. Instructions exactes, pas de suggestions molles.
- Phrases variees : alterne courtes et longues. Pas de structures repetitives.
- Chaque observation specifique aux donnees fournies, rien de generique.

REGLES DE COHERENCE (obligatoires) :
- Ne promets JAMAIS une amelioration sur une metrique deja au vert. Si TBT ou CLS sont deja bons, dis qu'ils sont a maintenir, pas a ameliorer.
- Distingue toujours donnees labo (un seul run Lighthouse, variance de 5 a 10 points entre deux mesures) et donnees terrain (CrUX, vrais utilisateurs). Si les deux divergent, explique pourquoi et privilegie le terrain.
- N'invente JAMAIS de statistique de population, d'etude ou de pourcentage que tu ne peux pas sourcer. Pour l'accessibilite, parle de lisibilite et d'obligation legale europeenne (European Accessibility Act applicable depuis juin 2025), pas de chiffres medicaux inventes.
- Cite les URLs exactes des ressources bloquantes fournies ci-dessous dans les corrections. N'invente aucune URL.
- Les extrapolations de gain doivent rester prudentes : "de l'ordre de", "potentiellement", avec la mention que seule une nouvelle mesure confirmera.
${hasBusiness ? '- Pour le chiffrage business, utilise une elasticite prudente et sourcable : environ 7 % de conversion en moins par seconde de chargement supplementaire (etudes Akamai/Deloitte). Montre ton calcul. Arrondis. Presente le resultat comme un ordre de grandeur, pas une promesse.' : "- Aucune donnee business fournie : ne chiffre RIEN en euros. Pas de champ businessImpact."}

URL : ${audit.url}
Date : ${audit.fetchedAt}

SCORES MOBILE (labo) :
${audit.categories.map((c) => `- ${c.title} : ${c.score}/100`).join("\n")}

CORE WEB VITALS MOBILE (labo) :
${audit.metrics.map((m) => `- ${m.title} : ${m.displayValue || "N/A"} (score: ${m.score !== null ? Math.round(m.score * 100) : "N/A"})`).join("\n")}

${desktopSection}

${fieldSection}

OPPORTUNITES :
${audit.opportunities.map((o) => `- ${o.title} ${o.displayValue ? "(" + o.displayValue + ")" : ""}`).join("\n")}

DIAGNOSTICS :
${audit.diagnostics.map((d) => `- ${d.title} ${d.displayValue ? "(" + d.displayValue + ")" : ""}`).join("\n")}

${blockingSection}

${geoSection}

${businessSection}

Reponds UNIQUEMENT avec un objet JSON valide. Pas de markdown autour, pas de backticks, pas de texte avant ou apres le JSON. Structure exacte :

{
  "summary": "Paragraphe de synthese (4-6 phrases). Verdict global mobile ET desktop, donnees terrain si disponibles, les 2-3 actions les plus impactantes.",
  "scores": [
    {
      "category": "Nom exact de la categorie",
      "score": 78,
      "verdict": "moyen",
      "analysis": "Analyse specifique mobile vs desktop. Ce que ce score signifie concretement pour le client."
    }
  ],
  "actions": [
    {
      "title": "Titre court de l'action",
      "problem": "Description du probleme avec les chiffres exacts du rapport et les URLs exactes concernees.",
      "importance": "Impact concret sur le business et les utilisateurs.",
      "fix": "Instructions techniques precises et completes. Pas de code, juste les etapes.",
      "impact": "Fort",
      "effort": "2-4 h"
    }
  ],
  "metrics": [
    {
      "name": "Nom de la metrique",
      "value": "2.6 s",
      "verdict": "A ameliorer",
      "thresholds": "Bon : < 1.8s, A ameliorer : 1.8-3.0s, Mauvais : > 3.0s",
      "explanation": "Ce que cette valeur signifie pour l'utilisateur. Comparer labo et terrain si les deux existent."
    }
  ],
  "extras": [
    { "title": "Titre", "description": "Explication et piste concrete." }
  ],${hasBusiness ? `
  "businessImpact": "Paragraphe chiffre : manque a gagner annuel estime en euros du au temps de chargement actuel, calcul montre, ordre de grandeur prudent.",` : ""}
  "geoAnalysis": "Paragraphe d'analyse GEO : etat de la visibilite aupres des moteurs IA (Schema.org, llms.txt, acces crawlers), ce qui manque, ce que ca change pour la visibilite dans ChatGPT, Perplexity et Google AI Overviews.",
  "roadmap": [
    {
      "horizon": "30 jours",
      "title": "Titre de l'action",
      "effort": "2-4 h",
      "expectedResult": "Resultat mesurable attendu."
    }
  ]
}

REGLES JSON STRICTES :
- "scores" : exactement ${audit.categories.length} entrees, une par categorie
- "actions" : exactement 5 entrees, classees par impact decroissant, chacune avec "effort" estime en heures ou jours
- "metrics" : une entree par Core Web Vital mobile ci-dessus (${audit.metrics.length} entrees)
- "extras" : entre 3 et 5 entrees
- "roadmap" : entre 4 et 6 entrees reparties sur les trois horizons (30, 60, 90 jours), horizon strictement parmi "30 jours", "60 jours", "90 jours"
- verdict scores : "bon" (>= 90), "moyen" (50-89), "mauvais" (< 50)
- verdict metrics : "Bon", "A ameliorer" ou "Mauvais" (ecris "A ameliorer" avec A accentue : "\u00c0 am\u00e9liorer")
- impact actions : "Fort", "Moyen" ou "Faible"
- Dans "fix" : PAS de blocs de code, PAS de backticks. Etapes en texte clair.
- Tous les textes en francais avec accents corrects, sans tiret cadratin, sans formules d'IA.${hasBusiness ? "" : `
- PAS de champ "businessImpact" dans le JSON.`}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      audit: PageSpeedAudit;
      geo?: GeoAudit | null;
      business?: BusinessInputs | null;
    };
    const { audit } = body;
    const geo = body.geo ?? null;
    const business = body.business ?? null;

    if (!audit?.url || !audit?.categories) {
      return NextResponse.json({ error: "Donnees audit manquantes" }, { status: 400 });
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
        max_tokens: 9000,
        messages: [{ role: "user", content: buildPrompt(audit, geo, business) }],
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

    const parsed = JSON.parse(text) as AuditRecommendations;

    const clean = (s: string) => s.replace(/[\u2014\u2013]/g, ", ");
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
    if (parsed.businessImpact) parsed.businessImpact = clean(parsed.businessImpact);
    if (parsed.geoAnalysis) parsed.geoAnalysis = clean(parsed.geoAnalysis);
    if (parsed.roadmap) {
      parsed.roadmap = parsed.roadmap.map((r) => ({
        ...r,
        title: clean(r.title),
        expectedResult: clean(r.expectedResult),
      }));
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Recommend error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur IA" },
      { status: 500 }
    );
  }
}
