import { NextRequest, NextResponse } from "next/server";
import { fetchWithTimeout, normalizeUrl } from "@/lib/tool-helpers";

export const maxDuration = 30;

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";

function strip(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extract(re: RegExp, html: string): string {
  const m = re.exec(html);
  return m ? m[1].trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = normalizeUrl(body.url);
    if (!parsed) return NextResponse.json({ error: "URL invalide" }, { status: 400 });

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY manquante" }, { status: 500 });

    const res = await fetchWithTimeout(parsed.toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RomainDeVilleAudit/1.0)" },
      redirect: "follow",
    }, 10000);
    if (!res.ok) return NextResponse.json({ error: `Page injoignable (HTTP ${res.status})` }, { status: 502 });
    const html = await res.text();

    const title = extract(/<title[^>]*>([\s\S]*?)<\/title>/i, html);
    const metaDesc = extract(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i, html);
    const h1 = extract(/<h1[^>]*>([\s\S]*?)<\/h1>/i, html).replace(/<[^>]+>/g, " ");
    const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)]
      .map((m) => m[1].replace(/<[^>]+>/g, " ").trim())
      .filter(Boolean)
      .slice(0, 10);
    const text = strip(html).slice(0, 2500);

    const prompt = `Tu es consultant SEO senior. A partir du contenu de ce site, propose exactement 5 mots-cles "seeds" courts (2-4 mots chacun, minuscules, sans ponctuation) destines a etre etendus via Google Autocomplete pour une etude de mots-cles.

Repartition imposee :
1. le metier ou service principal
2. une intention transactionnelle (devis, prix, tarif...)
3. une variante locale (ville ou pays si le site est local)
4. un service ou produit secondaire important du site
5. un angle informationnel (comment, conseil, probleme client)

SITE : ${parsed.hostname}
TITLE : ${title}
META : ${metaDesc}
H1 : ${h1}
H2 : ${h2s.join(" | ")}
CONTENU (extrait) : ${text}

Reponds UNIQUEMENT avec un tableau JSON de 5 chaines, sans markdown. Ex: ["jardinier paysagiste","devis amenagement jardin","jardinier bruxelles","entretien jardin","comment amenager petit jardin"]`;

    const ai = await fetch(ANTHROPIC_API, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!ai.ok) {
      console.error("suggest-seeds AI error:", ai.status, (await ai.text()).slice(0, 200));
      return NextResponse.json({ error: `Anthropic API error: ${ai.status}` }, { status: 502 });
    }
    const data = await ai.json();
    let txt = data.content[0].text.trim();
    if (txt.startsWith("```")) txt = txt.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    const start = txt.indexOf("[");
    const end = txt.lastIndexOf("]");
    const seeds = (JSON.parse(txt.slice(start, end + 1)) as string[])
      .filter((s) => typeof s === "string" && s.trim().length >= 3)
      .map((s) => s.trim().toLowerCase())
      .slice(0, 5);

    if (seeds.length === 0) return NextResponse.json({ error: "Aucune suggestion generee" }, { status: 502 });
    return NextResponse.json({ seeds });
  } catch (err) {
    console.error("suggest-seeds error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Erreur suggestions" }, { status: 500 });
  }
}
