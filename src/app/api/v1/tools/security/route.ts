import { NextRequest } from "next/server";
import { fetchWithTimeout, normalizeUrl, runTool } from "@/lib/tool-helpers";

export const maxDuration = 30;

const HEADERS_CHECKED = [
  { key: "strict-transport-security", label: "HSTS (Strict-Transport-Security)", weight: 25 },
  { key: "content-security-policy", label: "Content-Security-Policy", weight: 25 },
  { key: "x-content-type-options", label: "X-Content-Type-Options", weight: 15 },
  { key: "x-frame-options", label: "X-Frame-Options", weight: 15 },
  { key: "referrer-policy", label: "Referrer-Policy", weight: 10 },
  { key: "permissions-policy", label: "Permissions-Policy", weight: 10 },
];

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parsed = normalizeUrl(body.url);

  return runTool("security", async () => {
    if (!parsed) throw new Error("URL invalide");

    const res = await fetchWithTimeout(parsed.toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RomainDeVilleAudit/1.0)" },
      redirect: "follow",
    }, 10000);

    const finalHttps = res.url.startsWith("https://");
    const headers = HEADERS_CHECKED.map((h) => {
      const value = res.headers.get(h.key);
      return { name: h.label, present: !!value, value: value ? value.slice(0, 180) : null, weight: h.weight };
    });
    let score = headers.reduce((acc, h) => acc + (h.present ? h.weight : 0), 0);
    if (!finalHttps) score = Math.min(score, 20);

    const grade = score >= 90 ? "A" : score >= 70 ? "B" : score >= 50 ? "C" : score >= 30 ? "D" : "F";

    /* Safe Browsing : degrade proprement si l'API n'est pas activee */
    let safeBrowsing: { checked: boolean; safe?: boolean; threats?: string[]; reason?: string } = { checked: false, reason: "Cle API absente" };
    const key = process.env.GOOGLE_PAGESPEED_API_KEY;
    if (key) {
      try {
        const sbRes = await fetchWithTimeout(
          `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${key}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              client: { clientId: "romaindeville-audit", clientVersion: "1.0" },
              threatInfo: {
                threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
                platformTypes: ["ANY_PLATFORM"],
                threatEntryTypes: ["URL"],
                threatEntries: [{ url: parsed.toString() }],
              },
            }),
          },
          6000
        );
        if (sbRes.ok) {
          const sb = (await sbRes.json()) as { matches?: { threatType: string }[] };
          safeBrowsing = { checked: true, safe: !sb.matches || sb.matches.length === 0, threats: (sb.matches || []).map((m) => m.threatType) };
        } else {
          safeBrowsing = { checked: false, reason: `API Safe Browsing non activee ou en erreur (${sbRes.status})` };
        }
      } catch {
        safeBrowsing = { checked: false, reason: "Safe Browsing injoignable" };
      }
    }

    return {
      data: { url: res.url, https: finalHttps, headers, score, grade, safeBrowsing },
    };
  });
}
