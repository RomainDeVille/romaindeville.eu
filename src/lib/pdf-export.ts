import jsPDF from "jspdf";
import type { AuditReport } from "./audit-types";

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

function sColor(score: number): [number, number, number] {
  if (score >= 90) return C.green;
  if (score >= 50) return C.orange;
  return C.red;
}

export function exportAuditPDF(report: AuditReport): void {
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

  // ── HEADER ──
  doc.setFillColor(...C.accent);
  doc.rect(0, 0, W, 4, "F");
  y = 24;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(...C.text);
  doc.text("Rapport d'audit", M, y);
  y += 10;
  doc.text("de performance web", M, y);
  y += 14;

  doc.setFontSize(11);
  doc.setTextColor(...C.accent);
  doc.text(report.audit.url, M, y);
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(...C.muted);
  const date = new Date(report.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  doc.text(`Audit realise le ${date}`, M, y);
  y += 10;

  doc.setDrawColor(...C.line);
  doc.setLineWidth(0.3);
  doc.line(M, y, W - M, y);
  y += 10;

  // ── SCORE CARDS ──
  const cats = report.audit.categories;
  const cardW = (CW - (cats.length - 1) * 4) / cats.length;
  cats.forEach((cat, i) => {
    const x = M + i * (cardW + 4);
    doc.setFillColor(...C.bg);
    doc.roundedRect(x, y, cardW, 28, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...sColor(cat.score));
    doc.text(cat.score.toString(), x + cardW / 2, y + 13, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...C.muted);
    const lbl = cat.title.length > 16 ? cat.title.substring(0, 15) + "." : cat.title;
    doc.text(lbl, x + cardW / 2, y + 22, { align: "center" });
  });
  y += 36;

  // ── RÉSUMÉ EXÉCUTIF ──
  sectionLabel("Résumé exécutif");
  para(report.recommendations.summary);

  // ── ANALYSE DES SCORES ──
  sectionLabel("Analyse des scores");
  for (const s of report.recommendations.scores) {
    check(16);
    const emoji = s.verdict === "bon" ? "[OK]" : s.verdict === "moyen" ? "[~]" : "[!]";
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...C.text);
    doc.text(`${emoji} ${s.category} : ${s.score}/100`, M, y);
    y += 5;
    para(s.analysis);
    y += 2;
  }

  // ── CORE WEB VITALS ──
  sectionLabel("Core Web Vitals");
  for (const m of report.audit.metrics) {
    check(8);
    const score = m.score !== null ? Math.round(m.score * 100) : null;
    const color = score === null ? C.muted : sColor(score);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...C.text);
    doc.text(m.title, M, y);
    doc.setTextColor(...color);
    doc.setFont("helvetica", "bold");
    doc.text(m.displayValue || "N/A", W - M, y, { align: "right" });
    y += 3;
    doc.setDrawColor(...C.line);
    doc.setLineWidth(0.15);
    doc.line(M, y, W - M, y);
    y += 5;
  }

  // ── MÉTRIQUES DÉTAILLÉES ──
  sectionLabel("Métriques détaillées");
  for (const m of report.recommendations.metrics) {
    check(18);
    const vColor = m.verdict === "Bon" ? C.green : m.verdict === "Mauvais" ? C.red : C.orange;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...C.text);
    doc.text(m.name, M, y);
    doc.setTextColor(...vColor);
    doc.text(`${m.value} (${m.verdict})`, W - M, y, { align: "right" });
    y += 5;
    para(m.explanation);
    doc.setFontSize(8);
    doc.setTextColor(...C.muted);
    const thLines = doc.splitTextToSize(m.thresholds, CW);
    for (const l of thLines) { check(4); doc.text(l, M, y); y += 3.5; }
    y += 3;
  }

  // ── TOP 5 ACTIONS ──
  sectionLabel("Top 5 des actions prioritaires");
  for (let i = 0; i < report.recommendations.actions.length; i++) {
    const a = report.recommendations.actions[i];
    check(20);

    // Title bar
    doc.setFillColor(...C.accent);
    doc.roundedRect(M, y, CW, 8, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(`${i + 1}. ${a.title}`, M + 4, y + 5.5);

    const impactColor = a.impact === "Fort" ? C.red : a.impact === "Moyen" ? C.orange : C.green;
    doc.setTextColor(...impactColor);
    doc.setFillColor(255, 255, 255);
    const impactText = `Impact ${a.impact}`;
    const impactW = doc.getTextWidth(impactText) + 6;
    doc.roundedRect(W - M - impactW - 3, y + 1.5, impactW + 2, 5, 1, 1, "F");
    doc.setFontSize(7);
    doc.text(impactText, W - M - 4, y + 5, { align: "right" });

    y += 12;

    // Fields
    const fields = [
      { label: "Problème", text: a.problem },
      { label: "Importance", text: a.importance },
      { label: "Correction", text: a.fix },
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

  // ── RECOMMANDATIONS COMPLÉMENTAIRES ──
  sectionLabel("Recommandations complémentaires");
  for (let i = 0; i < report.recommendations.extras.length; i++) {
    const e = report.recommendations.extras[i];
    check(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...C.text);
    doc.text(`${i + 1}. ${e.title}`, M, y);
    y += 5;
    para(e.description);
    y += 2;
  }

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

  // Page numbers + footers
  const total = doc.getNumberOfPages();
  for (let i = 1; i <= total; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...C.muted);
    doc.text(`${i} / ${total}`, W - M, H - 10, { align: "right" });
    if (i > 1) footer();
  }

  const domain = new URL(report.audit.url).hostname.replace(/\./g, "-");
  const d = new Date(report.createdAt).toISOString().slice(0, 10);
  doc.save(`audit-${domain}-${d}.pdf`);
}
