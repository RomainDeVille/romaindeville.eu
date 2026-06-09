import { NextRequest } from "next/server";
import { fetchWithTimeout, normalizeUrl, runTool } from "@/lib/tool-helpers";

export const maxDuration = 60;

interface W3CMessage {
  type: string;
  subType?: string;
  message: string;
  extract?: string;
  lastLine?: number;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parsed = normalizeUrl(body.url);

  return runTool("w3c", async () => {
    if (!parsed) throw new Error("URL invalide");

    const res = await fetchWithTimeout(
      `https://validator.w3.org/nu/?doc=${encodeURIComponent(parsed.toString())}&out=json`,
      { headers: { "User-Agent": "RomainDeVilleAudit/1.0 (audit tool; romain.deville3@gmail.com)" } },
      30000
    );
    if (!res.ok) throw new Error(`Validateur W3C indisponible (HTTP ${res.status})`);

    const data = (await res.json()) as { messages: W3CMessage[] };
    const errors = data.messages.filter((m) => m.type === "error");
    const warnings = data.messages.filter((m) => m.type === "info" && m.subType === "warning");

    return {
      data: {
        errorCount: errors.length,
        warningCount: warnings.length,
        topMessages: [...errors, ...warnings].slice(0, 15).map((m) => ({
          type: m.type === "error" ? "erreur" : "avertissement",
          message: m.message,
          line: m.lastLine,
        })),
      },
      empty: data.messages.length === 0,
    };
  });
}
