import jsPDF from "jspdf";
import type { BusinessInputs } from "./audit-types";
import { TOOLS, type ToolResult, type UnifiedReport } from "./tools";

/* Memes guidelines visuelles que pdf-export.ts : palette, header, sections, footer */
const C = {
  accent: [79, 70, 229] as [number, number, number],
  accent2: [139, 92, 246] as [number, number, number],
  text: [15, 23, 42] as [number, number, number],
  muted: [100, 116, 139] as [number, number, number],
  line: [226, 232, 240] as [number, number, number],
  green: [34, 197, 94] as [number, number, number],
  orange: [245, 158, 11] as [number, number, number],
  red: [239, 68, 68] as [number, number, number],
  bg: [248, 250, 252] as [number, number, number],
};

function verdictColor(v: string): [number, number, number] {
  return v === "bon" ? C.green : v === "mauvais" ? C.red : C.orange;
}

export interface UnifiedPdfInput {
  url: string;
  createdAt: string;
  report: UnifiedReport;
  results: ToolResult[];
  business?: BusinessInputs | null;
}

export function exportUnifiedPDF(input: UnifiedPdfInput): void {
  const { url, createdAt, report, results } = input;
  const doc = new jsPDF("portrait", "mm", "a4");
  const W = 210, H = 297, M = 20, CW = W - M * 2;
  let y = 0;

  const check = (n: number) => {
    if (y + n > H - 20) { footer(); doc.addPage(); y = 20; }
  };

  const footer = () => {
    doc.setFontSize(8);
    doc.setTextColor(...C.muted);
    doc.text("Romain De Ville · Consultant SEO, GEO et Performance Web · romaindeville.eu", W / 2, H - 10, { align: "center" });
  };

  const sectionLabel = (label: string) => {
    check(14);
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...C.accent);
    doc.text(label.toUpperCase(), M, y);
    y += 7;
  };

  const para = (text: string, maxW?: number) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...C.muted);
    const lines = doc.splitTextToSize(text, maxW || CW);
    for (const line of lines) {
      check(5);
      doc.text(line, M, y);
      y += 4.2;
    }
    y += 2;
  };

  const subLabel = (label: string) => {
    check(6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...C.accent);
    doc.text(label.toUpperCase(), M, y);
    y += 4.5;
  };

  // ── HEADER ──
  doc.setFillColor(...C.accent);
  doc.rect(0, 0, W, 4, "F");
  y = 24;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(...C.text);
  doc.text("Rapport d'analyse", M, y);
  y += 10;
  doc.text("multi-outils", M, y);
  y += 14;

  doc.setFontSize(11);
  doc.setTextColor(...C.accent);
  doc.text(url, M, y);
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(...C.muted);
  const date = new Date(createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const toolNames = results.map((r) => TOOLS.find((t) => t.id === r.tool)?.name || r.tool).join(", ");
  doc.text(`Analyse realisee le ${date}`, M, y);
  y += 5;
  const tLines = doc.splitTextToSize(`Outils : ${toolNames}`, CW);
  for (const l of tLines) { doc.text(l, M, y); y += 4.2; }
  y += 5;

  doc.setDrawColor(...C.line);
  doc.setLineWidth(0.3);
  doc.line(M, y, W - M, y);
  y += 10;

  // ── CARTES VERDICTS PAR VOLET ──
  const ordered = TOOLS.map((t) => report.sections.find((s) => s.toolId === t.id)).filter(
    (s): s is NonNullable<typeof s> => !!s
  );
  const perRow = Math.min(ordered.length, 5) || 1;
  const cardW = (CW - (perRow - 1) * 4) / perRow;
  ordered.forEach((s, i) => {
    const col = i % perRow;
    if (col === 0 && i > 0) y += 26;
    check(26);
    const x = M + col * (cardW + 4);
    doc.setFillColor(...C.bg);
    doc.roundedRect(x, y, cardW, 22, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...verdictColor(s.verdict));
    doc.text(s.verdict.toUpperCase(), x + cardW / 2, y + 10, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...C.muted);
    const lbl = s.title.length > 26 ? s.title.substring(0, 25) + "." : s.title;
    doc.text(lbl, x + cardW / 2, y + 17, { align: "center" });
  });
  y += 30;

  // ── RÉSUMÉ EXÉCUTIF ──
  sectionLabel("Résumé exécutif");
  para(report.summary);

  // ── IMPACT BUSINESS ──
  if (report.businessImpact) {
    sectionLabel("Impact business estimé");
    para(report.businessImpact);
  }

  // ── ANALYSE PAR VOLET ──
  sectionLabel("Analyse par volet");
  for (const s of ordered) {
    check(22);
    const tag = s.verdict === "bon" ? "[OK]" : s.verdict === "moyen" ? "[~]" : "[!]";
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...C.text);
    doc.text(`${tag} ${s.title}`, M, y);
    doc.setFontSize(8);
    doc.setTextColor(...verdictColor(s.verdict));
    doc.text(s.verdict.toUpperCase(), W - M, y, { align: "right" });
    y += 5;
    subLabel("Constats");
    para(s.findings);
    subLabel("Recommandations");
    para(s.recommendations);
    y += 2;
  }

  // ── PRIORITÉS CROISÉES ──
  sectionLabel("Priorités croisées");
  for (let i = 0; i < report.priorities.length; i++) {
    const p = report.priorities[i];
    check(20);

    doc.setFillColor(...C.accent);
    doc.roundedRect(M, y, CW, 8, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    const title = `${i + 1}. ${p.title}`;
    doc.text(title.length > 78 ? title.slice(0, 77) + "…" : title, M + 4, y + 5.5);

    const impactColor = p.impact === "Fort" ? C.red : p.impact === "Moyen" ? C.orange : C.green;
    doc.setTextColor(...impactColor);
    doc.setFillColor(255, 255, 255);
    const impactText = `Impact ${p.impact} · ${p.effort}`;
    const impactW = doc.getTextWidth(impactText) + 6;
    doc.roundedRect(W - M - impactW - 3, y + 1.5, impactW + 2, 5, 1, 1, "F");
    doc.setFontSize(7);
    doc.text(impactText, W - M - 4, y + 5, { align: "right" });

    y += 12;

    const fields = [
      { label: "Pourquoi", text: p.why },
      { label: "Comment", text: p.how },
    ];
    for (const f of fields) {
      check(10);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...C.accent);
      doc.text(f.label, M + 2, y);
      y += 4;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...C.muted);
      const fLines = doc.splitTextToSize(f.text, CW - 4);
      for (const l of fLines) { check(4.5); doc.text(l, M + 2, y); y += 4; }
      y += 3;
    }
    y += 4;
  }

  // ── TOOLS EN ERREUR ──
  const failed = results.filter((r) => r.status === "error");
  if (failed.length > 0) {
    sectionLabel("Outils non disponibles lors de cette analyse");
    for (const r of failed) {
      const name = TOOLS.find((t) => t.id === r.tool)?.name || r.tool;
      para(`${name} : ${r.error || "erreur inconnue"}`);
    }
  }

  // ── MÉTHODOLOGIE ──
  sectionLabel("Méthodologie et limites");
  para(
    "Ce rapport agrege les resultats de plusieurs outils d'analyse executes en parallele sur le site : " +
    "performance Lighthouse (labo mobile et desktop, variance possible de 5 a 10 points entre deux mesures) et donnees terrain Chrome UX Report quand le trafic le permet, " +
    "scan technique de la page (donnees structurees, directives robots, llms.txt, headers de securite), verifications DNS publiques (SPF, DKIM, DMARC), " +
    "validation W3C, estimation carbone selon le modele Sustainable Web Design, autorite de domaine OpenPageRank et suggestions reelles Google Autocomplete pour les mots-cles. " +
    "Les suggestions de mots-cles ne comportent pas de volumes de recherche. Les gains annonces sont des estimations : seule une nouvelle mesure apres correction les confirmera. " +
    "Les chiffrages en euros, quand ils figurent dans ce rapport, sont des ordres de grandeur fondes sur les donnees fournies par le client et des elasticites publiees, pas des garanties."
  );

  // ── CLOSING ──
  y += 8;
  check(25);
  doc.setDrawColor(...C.line);
  doc.line(M, y, W - M, y);
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...C.text);
  doc.text("Romain De Ville", W / 2, y, { align: "center" });
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...C.muted);
  doc.text("Consultant Senior SEO, GEO et Performance Web", W / 2, y, { align: "center" });
  y += 5;
  doc.setTextColor(...C.accent);
  doc.text("romaindeville.eu", W / 2, y, { align: "center" });

  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...C.muted);
    doc.text(`${i} / ${total}`, W - M, H - 10, { align: "right" });
    if (i > 1) footer();
  }

  let domain = "site";
  try {
    domain = new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace(/\./g, "-");
  } catch {
    // garde "site"
  }
  const d = new Date(createdAt).toISOString().slice(0, 10);
  doc.save(`analyse-${domain}-${d}.pdf`);
}
