import { NextRequest } from "next/server";
import { fetchWithTimeout, normalizeUrl, runTool } from "@/lib/tool-helpers";

export const maxDuration = 60;

/* Modele Sustainable Web Design (coefficients v3) : 0.81 kWh/GB, 442 gCO2e/kWh */
const KWH_PER_GB = 0.81;
const GRID_INTENSITY = 442;

function rating(co2g: number): string {
  if (co2g < 0.095) return "A+";
  if (co2g < 0.186) return "A";
  if (co2g < 0.341) return "B";
  if (co2g < 0.493) return "C";
  if (co2g < 0.656) return "D";
  if (co2g < 0.846) return "E";
  return "F";
}

function extractAssets(html: string, base: URL): string[] {
  const urls = new Set<string>();
  const patterns = [
    /<script[^>]+src=["']([^"']+)["']/gi,
    /<link[^>]+href=["']([^"']+)["'][^>]*rel=["']stylesheet["']/gi,
    /<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi,
    /<img[^>]+src=["']([^"']+)["']/gi,
  ];
  for (const re of patterns) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      try {
        const u = new URL(m[1], base);
        if (u.protocol.startsWith("http")) urls.add(u.toString());
      } catch {
        // URL relative invalide, ignore
      }
    }
  }
  return Array.from(urls).slice(0, 25);
}

async function assetSize(url: string): Promise<number> {
  try {
    const head = await fetchWithTimeout(url, { method: "HEAD" }, 5000);
    const len = head.headers.get("content-length");
    if (len) return parseInt(len, 10) || 0;
    return 0;
  } catch {
    return 0;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parsed = normalizeUrl(body.url);

  return runTool("carbon", async () => {
    if (!parsed) throw new Error("URL invalide");

    const res = await fetchWithTimeout(parsed.toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RomainDeVilleAudit/1.0)" },
    }, 10000);
    if (!res.ok) throw new Error(`Page injoignable (HTTP ${res.status})`);
    const html = await res.text();
    const htmlBytes = new TextEncoder().encode(html).length;

    const assets = extractAssets(html, new URL(res.url));
    const sizes = await Promise.all(assets.map(assetSize));
    const assetBytes = sizes.reduce((a, b) => a + b, 0);
    const measuredAssets = sizes.filter((s) => s > 0).length;

    const totalBytes = htmlBytes + assetBytes;
    const co2Grams = (totalBytes / 1e9) * KWH_PER_GB * GRID_INTENSITY;

    return {
      data: {
        totalBytes,
        totalKb: Math.round(totalBytes / 1024),
        htmlBytes,
        assetsFound: assets.length,
        assetsMeasured: measuredAssets,
        co2Grams: Math.round(co2Grams * 1000) / 1000,
        rating: rating(co2Grams),
        note: "Estimation premiere visite, modele Sustainable Web Design v3. Les assets sans Content-Length ne sont pas comptes : la realite est superieure ou egale a cette valeur.",
      },
    };
  });
}
