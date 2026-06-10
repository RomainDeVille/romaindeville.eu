import { NextRequest } from "next/server";
import { fetchWithTimeout, runTool } from "@/lib/tool-helpers";

export const maxDuration = 120;

const SUGGEST = "https://suggestqueries.google.com/complete/search";
const QUESTION_PREFIXES = ["comment", "pourquoi", "quel", "combien", "prix", "meilleur", "avis", "devis", "tarif", "exemple"];
const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const MAX_SEEDS = 5;

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

async function batched<T, R>(items: T[], size: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(...(await Promise.all(items.slice(i, i + size).map(fn))));
  }
  return out;
}

const QUESTION_RE = /^(comment|pourquoi|quel|quelle|combien|que|qui|ou|quand|est-ce)\b/;

async function expandSeed(seed: string, hl: string) {
  const queries = [
    seed,
    ...LETTERS.map((l) => `${seed} ${l}`),
    ...QUESTION_PREFIXES.map((p) => `${p} ${seed}`),
  ];
  const results = await batched(queries, 12, (q) => suggest(q, hl));
  const all = new Set<string>();
  results.flat().forEach((s) => {
    const cleaned = s.trim().toLowerCase();
    if (cleaned && cleaned !== seed) all.add(cleaned);
  });
  const suggestions = Array.from(all).sort();
  return {
    seed,
    count: suggestions.length,
    suggestions: suggestions.slice(0, 80),
    questions: suggestions.filter((s) => QUESTION_RE.test(s)).slice(0, 20),
  };
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const hl = typeof body.lang === "string" ? body.lang : "fr";

  /* Multi-seeds (nouveau) avec retro-compatibilite seed unique */
  let seeds: string[] = [];
  if (Array.isArray(body.seeds)) {
    seeds = body.seeds.filter((s: unknown) => typeof s === "string").map((s: string) => s.trim().toLowerCase());
  } else if (typeof body.seed === "string") {
    seeds = [body.seed.trim().toLowerCase()];
  }
  seeds = Array.from(new Set(seeds.filter((s) => s.length >= 3))).slice(0, MAX_SEEDS);

  return runTool("keywords", async () => {
    if (seeds.length === 0) throw new Error("Au moins un mot-cle de depart requis (3 caracteres minimum)");

    const bySeed = [];
    for (const seed of seeds) {
      bySeed.push(await expandSeed(seed, hl));
    }

    const totalUnique = new Set(bySeed.flatMap((b) => b.suggestions)).size;

    return {
      data: {
        seeds,
        totalCount: bySeed.reduce((a, b) => a + b.count, 0),
        totalUnique,
        bySeed,
        note: "Suggestions reelles Google Autocomplete, regroupees par mot-cle de depart. Pas de volumes de recherche (donnee payante chez tous les fournisseurs).",
      },
      empty: totalUnique === 0,
    };
  });
}
