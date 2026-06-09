import { NextRequest, NextResponse } from "next/server";
import { parseDesktop, parseFull, runPageSpeed, type Json } from "@/lib/pagespeed";

export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL requise" }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return NextResponse.json({ error: "URL invalide" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GOOGLE_PAGESPEED_API_KEY non configurée" }, { status: 500 });
    }

    const target = parsedUrl.toString();
    const [mobileData, desktopResult] = await Promise.all([
      runPageSpeed(target, apiKey, "mobile"),
      runPageSpeed(target, apiKey, "desktop").catch((e: Error) => e),
    ]);

    const audit = parseFull(mobileData as Json);
    if (!(desktopResult instanceof Error)) {
      audit.desktop = parseDesktop(desktopResult as Json);
    }

    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    return NextResponse.json({ id, audit, createdAt: new Date().toISOString() });
  } catch (err) {
    console.error("Audit error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Erreur interne" }, { status: 500 });
  }
}
