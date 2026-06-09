import { NextRequest } from "next/server";
import { dnsQuery, normalizeUrl, runTool } from "@/lib/tool-helpers";

export const maxDuration = 30;

const DKIM_SELECTORS = ["default", "google", "selector1", "selector2", "k1", "mail", "dkim", "s1"];

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const parsed = normalizeUrl(body.url);

  return runTool("dns", async () => {
    if (!parsed) throw new Error("URL invalide");
    const domain = parsed.hostname.replace(/^www\./, "");

    const [mxRecords, rootTxt, dmarcTxt, ...dkimResults] = await Promise.all([
      dnsQuery(domain, "MX"),
      dnsQuery(domain, "TXT"),
      dnsQuery(`_dmarc.${domain}`, "TXT"),
      ...DKIM_SELECTORS.map((s) => dnsQuery(`${s}._domainkey.${domain}`, "TXT")),
    ]);

    const spfRecord = rootTxt.find((t) => t.toLowerCase().startsWith("v=spf1")) || null;
    const dmarcRecord = dmarcTxt.find((t) => t.toLowerCase().startsWith("v=dmarc1")) || null;
    const dmarcPolicy = dmarcRecord ? (dmarcRecord.match(/p=(\w+)/i)?.[1] || "inconnue") : null;
    const dkimSelectors = DKIM_SELECTORS.filter((s, i) =>
      dkimResults[i].some((t) => t.toLowerCase().includes("v=dkim1") || t.includes("k=rsa"))
    );

    const issues: string[] = [];
    if (mxRecords.length === 0) issues.push("Aucun enregistrement MX : ce domaine ne recoit pas d'emails.");
    if (!spfRecord) issues.push("SPF absent : n'importe qui peut envoyer des emails en se faisant passer pour ce domaine.");
    if (spfRecord && /[?+]all/.test(spfRecord)) issues.push("SPF permissif (+all ou ?all) : protection quasi nulle.");
    if (!dmarcRecord) issues.push("DMARC absent : aucune politique anti-usurpation, deliverabilite degradee vers Gmail et Outlook.");
    if (dmarcPolicy === "none") issues.push("DMARC en p=none : surveillance seule, aucune protection active.");
    if (dkimSelectors.length === 0) issues.push("Aucune signature DKIM detectee sur les selecteurs courants (verification non exhaustive).");

    return {
      data: {
        domain,
        mx: mxRecords.slice(0, 5),
        spf: { found: !!spfRecord, record: spfRecord },
        dmarc: { found: !!dmarcRecord, record: dmarcRecord, policy: dmarcPolicy },
        dkim: { selectorsFound: dkimSelectors, selectorsTested: DKIM_SELECTORS },
        issues,
        score: Math.max(0, 100 - issues.length * 20),
      },
    };
  });
}
