import { NextRequest } from "next/server";
import { fetchWithTimeout, runTool } from "@/lib/tool-helpers";

export const maxDuration = 60;

const SUGGEST = "https://suggestqueries.google.com/complete/search";
const QUESTION_PREFIXES = ["comment", "pourquoi", "quel", "combien", "prix", "meilleur", "avis", "devis", "tarif", "exemple"];
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

async function suggest(q: string, hl: string): Promise<string[]> {
  try {
    const res = await fetchWithTimeout(
      `${SUGGEST}?client=firefox&hl=${hl}&q=${encodeURIComponent(q)}`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
      5000
    );
    if (!res.ok) return [];
    const data = (await res.json()) as [string, string[]];
    return Array.isArray(data?.[1]) ? data[1] : [];
  } catch {
    return [];
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const seed = typeof body.seed === "string" ? body.seed.trim().toLowerCase() : "";
  const hl = typeof body.lang === "string" ? body.lang : "fr";

  return runTool("keywords", async () => {
    if (!seed || seed.length < 3) throw new Error("Mot-cle de depart requis (3 caracteres minimum)");

    const queries = [
      seed,
      ...LETTERS.map((l) => `${seed} ${l}`),
      ...QUESTION_PREFIXES.map((p) => `${p} ${seed}`),
    ];

    const results = await Promise.all(queries.map((q) => suggest(q, hl)));
    const all = new Set<string>();
    results.flat().forEach((s) => {
      const cleaned = s.trim().toLowerCase();
      if (cleaned && cleaned !== seed) all.add(cleaned);
    });

    const suggestions = Array.from(all).sort();
    const questions = suggestions.filter((s) => /^(comment|pourquoi|quel|quelle|combien|que|qui|ou|quand|est-ce)\b/.test(s));

    return {
      data: {
        seed,
        count: suggestions.length,
        suggestions: suggestions.slice(0, 250),
        questions: questions.slice(0, 40),
        note: "Suggestions reelles Google Autocomplete. Pas de volumes de recherche (donnee payante chez tous les fournisseurs).",
      },
      empty: suggestions.length === 0,
    };
  });
}
