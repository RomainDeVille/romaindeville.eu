import { NextRequest } from "next/server";
import { normalizeUrl, runTool } from "@/lib/tool-helpers";
import { parseDesktop, parseFull, runPageSpeed, type Json } from "@/lib/pagespeed";

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parsed = normalizeUrl(body.url);

  return runTool("pagespeed", async () => {
    if (!parsed) throw new Error("URL invalide");
    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
    if (!apiKey) throw new Error("GOOGLE_PAGESPEED_API_KEY non configuree");

    const target = parsed.toString();
    const [mobileData, desktopResult] = await Promise.all([
      runPageSpeed(target, apiKey, "mobile"),
      runPageSpeed(target, apiKey, "desktop").catch((e: Error) => e),
    ]);

    const audit = parseFull(mobileData as Json);
    const desktop = desktopResult instanceof Error ? null : parseDesktop(desktopResult as Json);

    /* Sous-ensemble cible pour le rapport unifie : assez pour analyser, pas de bruit */
    return {
      data: {
        url: audit.url,
        mobile: { categories: audit.categories, metrics: audit.metrics },
        desktop,
        fieldData: audit.fieldData,
        fieldDataSource: audit.fieldDataSource,
        blockingResources: (audit.blockingResources || []).slice(0, 5),
        opportunities: audit.opportunities.slice(0, 6),
        diagnostics: audit.diagnostics.slice(0, 5),
      },
    };
  });
}
