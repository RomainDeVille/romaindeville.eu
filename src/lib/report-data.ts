import type { GeoAudit } from "./audit-types";
import type { ToolResult } from "./tools";

export interface DataLine {
  label: string;
  value: string;
  tone: "good" | "warn" | "bad" | "muted";
}

type Obj = Record<string, unknown>;

function scoreTone(score: number): DataLine["tone"] {
  return score >= 90 ? "good" : score >= 50 ? "warn" : "bad";
}

function metricTone(score: number | null): DataLine["tone"] {
  if (score === null) return "muted";
  const s = Math.round(score * 100);
  return s >= 90 ? "good" : s >= 50 ? "warn" : "bad";
}

interface Cat { title: string; score: number }
interface Met { title: string; score: number | null; displayValue?: string }

export function toolDataLines(r: ToolResult): DataLine[] {
  if (r.status === "error" || !r.data) {
    return [{ label: "Statut", value: r.error || "Aucune donnee", tone: "bad" }];
  }
  const d = r.data as Obj;
  const lines: DataLine[] = [];

  switch (r.tool) {
    case "pagespeed": {
      const mobile = d.mobile as { categories: Cat[]; metrics: Met[] } | undefined;
      const desktop = d.desktop as { categories: Cat[]; metrics: Met[] } | null | undefined;
      mobile?.categories.forEach((c) =>
        lines.push({ label: `${c.title} (mobile)`, value: `${c.score}/100`, tone: scoreTone(c.score) })
      );
      desktop?.categories.forEach((c) =>
        lines.push({ label: `${c.title} (desktop)`, value: `${c.score}/100`, tone: scoreTone(c.score) })
      );
      mobile?.metrics.forEach((m) =>
        lines.push({ label: `${m.title} (mobile)`, value: m.displayValue || "N/A", tone: metricTone(m.score) })
      );
      desktop?.metrics.forEach((m) =>
        lines.push({ label: `${m.title} (desktop)`, value: m.displayValue || "N/A", tone: metricTone(m.score) })
      );
      const field = d.fieldData as { name: string; displayValue: string; category: string }[] | undefined;
      field?.forEach((f) =>
        lines.push({
          label: f.name,
          value: f.displayValue,
          tone: f.category === "FAST" ? "good" : f.category === "SLOW" ? "bad" : "warn",
        })
      );
      const blocking = d.blockingResources as { url: string; wastedMs?: number }[] | undefined;
      if (blocking && blocking.length > 0) {
        const totalMs = blocking.reduce((a, b) => a + (b.wastedMs || 0), 0);
        lines.push({
          label: "Ressources bloquantes",
          value: `${blocking.length} fichier(s), ${Math.round(totalMs)} ms perdues`,
          tone: totalMs > 500 ? "bad" : "warn",
        });
      }
      break;
    }
    case "geo": {
      const g = d as unknown as GeoAudit;
      lines.push({
        label: "Schema.org",
        value: g.schemaTypes.length > 0 ? g.schemaTypes.join(", ") : "Aucun",
        tone: g.schemaTypes.length > 0 ? "good" : "bad",
      });
      lines.push({ label: "llms.txt", value: g.hasLlmsTxt ? "Present" : "Absent", tone: g.hasLlmsTxt ? "good" : "bad" });
      lines.push({ label: "Meta description", value: g.metaDescription ? "Presente" : "Absente", tone: g.metaDescription ? "good" : "bad" });
      lines.push({ label: "Open Graph", value: g.ogTags ? "Present" : "Absent", tone: g.ogTags ? "good" : "warn" });
      lines.push({ label: "H1", value: `${g.h1Count}`, tone: g.h1Count === 1 ? "good" : "warn" });
      const blocked = g.robotsAiBots.filter((b) => !b.allowed).map((b) => b.bot);
      lines.push({
        label: "Crawlers IA",
        value: blocked.length === 0 ? "Tous autorises" : `Bloques : ${blocked.join(", ")}`,
        tone: blocked.length === 0 ? "good" : "bad",
      });
      break;
    }
    case "dns": {
      const spf = d.spf as { found: boolean } | undefined;
      const dmarc = d.dmarc as { found: boolean; policy: string | null } | undefined;
      const dkim = d.dkim as { selectorsFound: string[] } | undefined;
      const mx = d.mx as string[] | undefined;
      lines.push({ label: "MX", value: mx && mx.length > 0 ? mx[0] : "Aucun", tone: mx && mx.length > 0 ? "good" : "bad" });
      lines.push({ label: "SPF", value: spf?.found ? "Present" : "Absent", tone: spf?.found ? "good" : "bad" });
      lines.push({
        label: "DMARC",
        value: dmarc?.found ? `Present (p=${dmarc.policy})` : "Absent",
        tone: dmarc?.found ? (dmarc.policy === "none" ? "warn" : "good") : "bad",
      });
      lines.push({
        label: "DKIM",
        value: dkim && dkim.selectorsFound.length > 0 ? `Detecte (${dkim.selectorsFound.join(", ")})` : "Non detecte (selecteurs courants)",
        tone: dkim && dkim.selectorsFound.length > 0 ? "good" : "warn",
      });
      lines.push({ label: "Score email", value: `${d.score}/100`, tone: scoreTone(d.score as number) });
      break;
    }
    case "security": {
      lines.push({ label: "Note securite", value: `${d.grade} (${d.score}/100)`, tone: scoreTone(d.score as number) });
      lines.push({ label: "HTTPS", value: d.https ? "Actif" : "Inactif", tone: d.https ? "good" : "bad" });
      const headers = d.headers as { name: string; present: boolean }[] | undefined;
      headers?.forEach((h) =>
        lines.push({ label: h.name, value: h.present ? "Present" : "Absent", tone: h.present ? "good" : "bad" })
      );
      const sb = d.safeBrowsing as { checked: boolean; safe?: boolean } | undefined;
      lines.push({
        label: "Google Safe Browsing",
        value: sb?.checked ? (sb.safe ? "Aucune menace" : "MENACE DETECTEE") : "Non verifie",
        tone: sb?.checked ? (sb.safe ? "good" : "bad") : "muted",
      });
      break;
    }
    case "carbon": {
      lines.push({ label: "Note carbone", value: String(d.rating), tone: ["A+", "A", "B"].includes(String(d.rating)) ? "good" : String(d.rating) === "C" ? "warn" : "bad" });
      lines.push({ label: "Poids mesure", value: `${d.totalKb} Ko`, tone: "muted" });
      lines.push({ label: "CO2 par visite", value: `${d.co2Grams} g`, tone: "muted" });
      lines.push({ label: "Assets mesures", value: `${d.assetsMeasured}/${d.assetsFound}`, tone: "muted" });
      break;
    }
    case "w3c": {
      const e = Number(d.errorCount || 0), w = Number(d.warningCount || 0);
      lines.push({ label: "Erreurs HTML", value: String(e), tone: e === 0 ? "good" : "bad" });
      lines.push({ label: "Avertissements", value: String(w), tone: w === 0 ? "good" : "warn" });
      break;
    }
    case "keywords": {
      lines.push({ label: "Mot-cle de depart", value: String(d.seed), tone: "muted" });
      lines.push({ label: "Suggestions trouvees", value: String(d.count), tone: Number(d.count) > 50 ? "good" : "warn" });
      const q = d.questions as string[] | undefined;
      lines.push({ label: "Questions detectees", value: String(q?.length || 0), tone: "muted" });
      break;
    }
    case "authority": {
      const main = d.main as { domain: string; found: boolean; pageRank: number; globalRank: number | null } | undefined;
      if (main) {
        lines.push({
          label: `PageRank ${main.domain}`,
          value: main.found ? `${main.pageRank}/10` : "Non reference",
          tone: main.found ? (main.pageRank >= 3 ? "good" : "warn") : "bad",
        });
      }
      const comps = d.competitors as { domain: string; found: boolean; pageRank: number }[] | undefined;
      comps?.forEach((c) =>
        lines.push({ label: `PageRank ${c.domain}`, value: c.found ? `${c.pageRank}/10` : "Non reference", tone: "muted" })
      );
      break;
    }
    case "crux-history": {
      if (!d.available) {
        lines.push({ label: "Donnees terrain", value: "Indisponibles (trafic insuffisant)", tone: "warn" });
        break;
      }
      lines.push({ label: "Periode", value: `${d.weeks} semaines (${d.source === "origin" ? "domaine" : "page"})`, tone: "muted" });
      const mets = d.metrics as { metric: string; latest: number | null; trendPct: number | null }[] | undefined;
      mets?.forEach((m) => {
        const trend = m.trendPct === null ? "" : m.trendPct > 0 ? ` (+${m.trendPct}% sur la periode)` : ` (${m.trendPct}%)`;
        lines.push({
          label: m.metric,
          value: `${m.latest ?? "N/A"}${trend}`,
          tone: m.trendPct === null ? "muted" : m.trendPct > 10 ? "bad" : m.trendPct < -10 ? "good" : "muted",
        });
      });
      break;
    }
  }
  return lines;
}
