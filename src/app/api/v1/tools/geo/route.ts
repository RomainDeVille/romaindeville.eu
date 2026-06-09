import { NextRequest } from "next/server";
import { normalizeUrl, runTool } from "@/lib/tool-helpers";
import { scanGeo } from "@/lib/geo-scan";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parsed = normalizeUrl(body.url);

  return runTool("geo", async () => {
    if (!parsed) throw new Error("URL invalide");
    const geo = await scanGeo(parsed);
    return { data: geo };
  });
}
