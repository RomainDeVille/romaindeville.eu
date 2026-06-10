import jsPDF from "jspdf";
import { TOOLS, type FinalReport, type SectionReport, type ToolResult } from "./tools";
import { toolDataLines } from "./report-data";

/* Memes guidelines visuelles que le PDF audit d'origine : palette, header, sections, footer */
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

function toneColor(t: string): [number, number, number] {
  return t === "good" ? C.green : t === "bad" ? C.red : t === "warn" ? C.orange : C.muted;
}

export interface UnifiedPdfInput {
  url: string;
  createdAt: string;
  final: FinalReport;
  sections: SectionReport[];
  results: ToolResult[];
}

function buildDoc(input: UnifiedPdfInput): jsPDF {
  const { url, createdAt, final, sections, results } = input;
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

  const subLabel = (label: string) => {
    check(6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...C.accent);
    doc.text(label.toUpperCase(), M, y);
    y += 4.5;
  };

  const para = (text: string, size = 9) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    doc.setTextColor(...C.muted);
    const lines = doc.splitTextToSize(text, CW);
    for (const line of lines) {
      check(5);
      doc.text(line, M, y);
      y += 4.2;
    }
    y += 2;
  };

  const bullet = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...C.muted);
    const lines = doc.splitTextToSize(text, CW - 5);
    let first = true;
    for (const line of lines) {
      check(5);
      if (first) { doc.text("•", M, y); first = false; }
      doc.text(line, M + 4, y);
      y += 4.2;
    }
    y += 1;
  };

  const kvRow = (label: string, value: string, color: [number, number, number]) => {
    check(8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...C.text);
    doc.text(label, M, y);
    doc.setTextColor(...color);
    doc.setFont("helvetica", "bold");
    const v = value.length > 60 ? value.slice(0, 59) + "…" : value;
    doc.text(v, W - M, y, { align: "right" });
    y += 2.5;
    doc.setDrawColor(...C.line);
    doc.setLineWidth(0.15);
    doc.line(M, y, W - M, y);
    y += 4;
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
  doc.text(`Analyse realisee le ${date}`, M, y);
  y += 5;
  const toolNames = results.map((r) => TOOLS.find((t) => t.id === r.tool)?.name || r.tool).join(", ");
  const tLines = doc.splitTextToSize(`Outils : ${toolNames}`, CW);
  for (const l of tLines) { doc.text(l, M, y); y += 4.2; }
  y += 5;

  doc.setDrawColor(...C.line);
  doc.setLineWidth(0.3);
  doc.line(M, y, W - M, y);
  y += 10;

  // ── CARTES VERDICTS ──
  const perRow = Math.min(sections.length, 5) || 1;
  const cardW = (CW - (perRow - 1) * 4) / perRow;
  sections.forEach((s, i) => {
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
  para(final.summary, 9.5);

  if (final.businessImpact) {
    sectionLabel("Impact business estimé");
    para(final.businessImpact, 9.5);
  }

  // ── PRIORITÉS CROISÉES ──
  sectionLabel("Priorités croisées");
  for (let i = 0; i < final.priorities.length; i++) {
    const p = final.priorities[i];
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
    subLabel("Pourquoi");
    para(p.why);
    subLabel("Comment");
    para(p.how);
    y += 3;
  }

  // ── CHAPITRES PAR VOLET ──
  for (const s of sections) {
    check(30);
    y += 4;
    doc.setDrawColor(...C.line);
    doc.setLineWidth(0.3);
    doc.line(M, y, W - M, y);
    y += 8;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...C.text);
    doc.text(s.title, M, y);
    doc.setFontSize(9);
    doc.setTextColor(...verdictColor(s.verdict));
    doc.text(s.verdict.toUpperCase(), W - M, y, { align: "right" });
    y += 8;

    const result = results.find((r) => r.tool === s.toolId);
    if (result) {
      const lines = toolDataLines(result);
      if (lines.length > 0) {
        subLabel("Données mesurées");
        for (const l of lines) kvRow(l.label, l.value, toneColor(l.tone));
        y += 2;
      }
    }

    subLabel("Constats clés");
    for (const f of s.keyFindings) bullet(f);
    y += 2;

    subLabel("Analyse");
    for (const p of s.narrative) para(p);

    subLabel("Recommandations");
    for (const rec of s.recommendations) {
      check(12);
      const ic = rec.impact === "Fort" ? C.red : rec.impact === "Moyen" ? C.orange : C.green;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...C.text);
      const head = `${rec.action}`;
      const headLines = doc.splitTextToSize(head, CW - 35);
      for (const l of headLines) { check(5); doc.text(l, M, y); y += 4.3; }
      doc.setFontSize(7.5);
      doc.setTextColor(...ic);
      doc.text(`Impact ${rec.impact} · ${rec.effort}`, M, y);
      y += 4.5;
      para(rec.detail);
      y += 1;
    }
  }

  // ── CONCLUSION ──
  sectionLabel("Conclusion");
  para(final.conclusion, 9.5);

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
    "Chaque volet a ete analyse individuellement puis synthetise. Les suggestions de mots-cles ne comportent pas de volumes de recherche. " +
    "Les gains annonces sont des estimations : seule une nouvelle mesure apres correction les confirmera. " +
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

  return doc;
}

function fileName(input: UnifiedPdfInput): string {
  let domain = "site";
  try {
    domain = new URL(input.url.startsWith("http") ? input.url : `https://${input.url}`).hostname.replace(/\./g, "-");
  } catch {
    // garde "site"
  }
  const d = new Date(input.createdAt).toISOString().slice(0, 10);
  return `analyse-${domain}-${d}.pdf`;
}

export function exportUnifiedPDF(input: UnifiedPdfInput): void {
  buildDoc(input).save(fileName(input));
}

export function unifiedPDFBase64(input: UnifiedPdfInput): string {
  const uri = buildDoc(input).output("datauristring");
  return uri.split(",")[1];
}
