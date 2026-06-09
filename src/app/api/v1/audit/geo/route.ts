import { NextRequest, NextResponse } from "next/server";
import { scanGeo } from "@/lib/geo-scan";

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL requise" }, { status: 400 });
    }

    let parsed: URL;
    try {
      parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return NextResponse.json({ error: "URL invalide" }, { status: 400 });
    }

    const geo = await scanGeo(parsed);
    return NextResponse.json({ geo });
  } catch (err) {
    console.error("GEO audit error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Erreur GEO" }, { status: 500 });
  }
}
