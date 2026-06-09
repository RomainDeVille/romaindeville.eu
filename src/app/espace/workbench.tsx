"use client";

import { useState } from "react";
import { PRESETS, TOOLS, type ToolDef, type ToolId, type ToolResult, type UnifiedReport } from "@/lib/tools";
import type { BusinessInputs } from "@/lib/audit-types";
import { exportUnifiedPDF } from "@/lib/pdf-export-unified";

async function parseJsonSafe<T>(res: Response, fallback: string): Promise<T> {
  const raw = await res.text();
  let data: (T & { error?: string }) | null = null;
  try {
    data = JSON.parse(raw);
  } catch {
    data = null;
  }
  if (!res.ok) {
    const msg =
      (data && data.error) ||
      (res.status === 504 ? "Le serveur a mis trop de temps a repondre." : `${fallback} (HTTP ${res.status})`);
    throw new Error(msg);
  }
  if (data === null) throw new Error(fallback);
  return data;
}

type ToolState = "idle" | "running" | "ok" | "empty" | "error";

const STATE_LABEL: Record<ToolState, string> = {
  idle: "En attente",
  running: "En cours...",
  ok: "Termine",
  empty: "Aucune donnee",
  error: "Erreur",
};

const STATE_COLOR: Record<ToolState, string> = {
  idle: "var(--muted)",
  running: "var(--accent)",
  ok: "#22c55e",
  empty: "#f59e0b",
  error: "#ef4444",
};

function SectionTitle({ label }: { label: string }) {
  return <h2 style={{ fontFamily: "var(--heading)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, margin: "0 0 20px" }}>{label}</h2>;
}

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 16, padding: "20px 24px", marginBottom: 32 }}>{children}</div>;
}

const inputStyle: React.CSSProperties = {
  flex: 1, minWidth: 160, padding: "10px 14px", borderRadius: 10,
  border: "1px solid var(--line)", background: "var(--panel)",
  color: "var(--text)", fontFamily: "var(--sans)", fontSize: 14, outline: "none",
};

function vColor(v: string) { return v === "bon" ? "#22c55e" : v === "mauvais" ? "#ef4444" : "#f59e0b"; }

export function Workbench() {
  const [url, setUrl] = useState("");
  const [seed, setSeed] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [visits, setVisits] = useState("");
  const [convRate, setConvRate] = useState("");
  const [aov, setAov] = useState("");
  const [selected, setSelected] = useState<Set<ToolId>>(new Set(TOOLS.filter((t) => t.defaultChecked).map((t) => t.id)));
  const [activePreset, setActivePreset] = useState<string>("");
  const [states, setStates] = useState<Record<string, ToolState>>({});
  const [results, setResults] = useState<ToolResult[]>([]);
  const [report, setReport] = useState<UnifiedReport | null>(null);
  const [reportRunning, setReportRunning] = useState(false);
  const [reportAt, setReportAt] = useState("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");

  const selectedTools = TOOLS.filter((t) => selected.has(t.id));
  const doneCount = selectedTools.filter((t) => ["ok", "empty", "error"].includes(states[t.id] || "")).length;
  const toolsPct = selectedTools.length > 0 ? (doneCount / selectedTools.length) * 70 : 0;
  const reportPct = report ? 30 : reportRunning ? 15 : 0;
  const progress = Math.round(toolsPct + reportPct);

  function applyPreset(presetId: string) {
    const p = PRESETS.find((x) => x.id === presetId);
    if (!p) return;
    setSelected(new Set(p.tools));
    setActivePreset(presetId);
  }

  function toggle(id: ToolId) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
    setActivePreset("");
  }

  const business: BusinessInputs | null = (() => {
    const v = parseFloat(visits), c = parseFloat(convRate), p = parseFloat(aov);
    const out: BusinessInputs = {};
    if (Number.isFinite(v) && v > 0) out.monthlyVisits = v;
    if (Number.isFinite(c) && c > 0) out.conversionRate = c;
    if (Number.isFinite(p) && p > 0) out.avgOrderValue = p;
    return Object.keys(out).length > 0 ? out : null;
  })();

  async function runOne(tool: ToolDef): Promise<ToolResult> {
    setStates((s) => ({ ...s, [tool.id]: "running" }));
    try {
      const payload: Record<string, unknown> = { url: url.trim() };
      if (tool.id === "keywords") payload.seed = seed.trim();
      if (tool.id === "authority") {
        payload.competitors = competitors.split(",").map((c) => c.trim()).filter(Boolean);
      }
      const res = await fetch(tool.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await parseJsonSafe<ToolResult>(res, `Erreur ${tool.name}`);
      setStates((s) => ({ ...s, [tool.id]: result.status === "ok" ? "ok" : result.status === "empty" ? "empty" : "error" }));
      return result;
    } catch (err) {
      setStates((s) => ({ ...s, [tool.id]: "error" }));
      return {
        tool: tool.id,
        status: "error",
        durationMs: 0,
        data: null,
        error: err instanceof Error ? err.message : "Erreur inconnue",
      };
    }
  }

  async function handleRun(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() || selectedTools.length === 0 || running) return;
    if (selected.has("keywords") && seed.trim().length < 3) {
      setError("Le tool mots-cles demande un mot-cle de depart (3 caracteres minimum).");
      return;
    }

    setRunning(true);
    setError("");
    setReport(null);
    setResults([]);
    setStates(Object.fromEntries(selectedTools.map((t) => [t.id, "idle" as ToolState])));

    try {
      const settled = await Promise.all(selectedTools.map((t) => runOne(t)));
      setResults(settled);

      setReportRunning(true);
      const res = await fetch("/api/v1/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), results: settled, business }),
      });
      const rep = await parseJsonSafe<UnifiedReport>(res, "Erreur rapport");
      setReport(rep);
      setReportAt(new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setReportRunning(false);
      setRunning(false);
    }
  }

  /* Sections affichees dans l'ordre du registre : meme squelette de rapport a chaque fois */
  const orderedSections = report
    ? TOOLS.map((t) => report.sections.find((s) => s.toolId === t.id)).filter((s): s is NonNullable<typeof s> => !!s)
    : [];

  return (
    <div>
      <section className="psec">
        <form onSubmit={handleRun} style={{ maxWidth: 720 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <input type="url" value={url} onChange={(ev) => setUrl(ev.target.value)} placeholder="https://exemple.com" required
              style={{ ...inputStyle, fontSize: 15, padding: "12px 16px" }} />
            <button type="submit" className="btn btn-primary" disabled={running} style={{ opacity: running ? 0.6 : 1 }}>
              {running ? "Analyse..." : `Lancer (${selectedTools.length})`}
            </button>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            {PRESETS.map((p) => (
              <button key={p.id} type="button" onClick={() => applyPreset(p.id)}
                style={{
                  fontSize: 12, fontWeight: 600, padding: "6px 14px", borderRadius: 999, cursor: "pointer",
                  border: `1px solid ${activePreset === p.id ? "var(--accent)" : "var(--line)"}`,
                  background: activePreset === p.id ? "var(--accent)" : "var(--panel)",
                  color: activePreset === p.id ? "#fff" : "var(--text)",
                }}>
                {p.name}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10, marginBottom: 14 }}>
            {TOOLS.map((t) => {
              const st = states[t.id];
              const checked = selected.has(t.id);
              return (
                <label key={t.id} style={{
                  display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 14px", borderRadius: 12, cursor: "pointer",
                  border: `1px solid ${checked ? "var(--accent)" : "var(--line)"}`,
                  background: "var(--panel)", opacity: running && !checked ? 0.5 : 1,
                }}>
                  <input type="checkbox" checked={checked} onChange={() => toggle(t.id)} disabled={running} style={{ marginTop: 3 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</span>
                      {st && checked && (
                        <span style={{ fontSize: 11, fontWeight: 700, color: STATE_COLOR[st], flexShrink: 0 }}>{STATE_LABEL[st]}</span>
                      )}
                    </div>
                    <p style={{ fontSize: 12, color: "var(--muted)", margin: "3px 0 0", lineHeight: 1.5 }}>{t.description}</p>
                  </div>
                </label>
              );
            })}
          </div>

          {selected.has("keywords") && (
            <input value={seed} onChange={(ev) => setSeed(ev.target.value)} placeholder="Mot-cle de depart (ex : renovation bruxelles)"
              style={{ ...inputStyle, width: "100%", marginBottom: 10 }} />
          )}
          {selected.has("authority") && (
            <input value={competitors} onChange={(ev) => setCompetitors(ev.target.value)} placeholder="Concurrents, separes par des virgules (optionnel)"
              style={{ ...inputStyle, width: "100%", marginBottom: 10 }} />
          )}

          <details style={{ marginBottom: 12 }}>
            <summary style={{ fontSize: 13, color: "var(--muted)", cursor: "pointer", userSelect: "none" }}>
              Donnees business (optionnel) : chiffrer l&apos;impact en euros
            </summary>
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              <input type="number" min="0" value={visits} onChange={(ev) => setVisits(ev.target.value)} placeholder="Visites / mois" style={inputStyle} />
              <input type="number" min="0" step="0.1" value={convRate} onChange={(ev) => setConvRate(ev.target.value)} placeholder="Taux de conversion (%)" style={inputStyle} />
              <input type="number" min="0" value={aov} onChange={(ev) => setAov(ev.target.value)} placeholder="Panier moyen (EUR)" style={inputStyle} />
            </div>
          </details>

          {error && <p style={{ color: "var(--danger)", fontSize: 14 }}>{error}</p>}
        </form>

        {(running || report) && (
          <div style={{ marginTop: 24, maxWidth: 720 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>
                {report ? "Rapport termine" : reportRunning ? "Redaction du rapport unifie..." : `Tools : ${doneCount}/${selectedTools.length}`}
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--heading)", color: "var(--accent)" }}>{progress}%</span>
            </div>
            <div style={{ width: "100%", height: 6, background: "var(--line)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, borderRadius: 3, background: "linear-gradient(90deg, var(--accent), var(--accent2))", transition: "width 0.4s ease" }} />
            </div>
          </div>
        )}
      </section>

      {!!report && (
        <>
          <section className="psec">
            <SectionTitle label="Resume executif" />
            <Card><p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted)", margin: 0 }}>{report.summary}</p></Card>
          </section>

          {report.businessImpact && (
            <section className="psec">
              <SectionTitle label="Impact business estime" />
              <Card><p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted)", margin: 0 }}>{report.businessImpact}</p></Card>
            </section>
          )}

          <section className="psec">
            <SectionTitle label="Analyse par volet" />
            {orderedSections.map((s) => (
              <div key={s.toolId} style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 14, padding: "20px 24px", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <h3 style={{ fontFamily: "var(--heading)", fontSize: 16, fontWeight: 600, margin: 0 }}>{s.title}</h3>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginLeft: "auto", color: vColor(s.verdict), background: `${vColor(s.verdict)}12`, padding: "2px 10px", borderRadius: 6 }}>
                    {s.verdict}
                  </span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: 4 }}>Constats</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", margin: "0 0 12px" }}>{s.findings}</p>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: 4 }}>Recommandations</div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>{s.recommendations}</p>
              </div>
            ))}
          </section>

          <section className="psec">
            <SectionTitle label="Priorites croisees" />
            {report.priorities.map((p, i) => {
              const ic = p.impact === "Fort" ? "#ef4444" : p.impact === "Moyen" ? "#f59e0b" : "#22c55e";
              return (
                <div key={i} style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 14, padding: "18px 22px", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, flexShrink: 0, background: "linear-gradient(135deg, var(--accent), var(--accent2))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--heading)", fontWeight: 700, fontSize: 13 }}>{i + 1}</div>
                    <h4 style={{ fontFamily: "var(--heading)", fontSize: 15, fontWeight: 600, margin: 0 }}>{p.title}</h4>
                    <span style={{ fontSize: 11, fontWeight: 600, color: ic, background: `${ic}12`, padding: "2px 8px", borderRadius: 4, marginLeft: "auto" }}>Impact {p.impact}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", background: "var(--line)", padding: "2px 8px", borderRadius: 4 }}>{p.effort}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted)", margin: "0 0 6px" }}>{p.why}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>{p.how}</p>
                </div>
              );
            })}
          </section>

          {results.some((r) => r.status === "error") && (
            <section className="psec">
              <SectionTitle label="Tools en erreur" />
              <Card>
                {results.filter((r) => r.status === "error").map((r) => (
                  <p key={r.tool} style={{ fontSize: 13, color: "var(--muted)", margin: "4px 0" }}>
                    <strong>{TOOLS.find((t) => t.id === r.tool)?.name}</strong> : {r.error}
                  </p>
                ))}
              </Card>
            </section>
          )}

          <section style={{ textAlign: "center", padding: "48px 0", borderTop: "1px solid var(--line)", marginTop: 32 }}>
            <button
              onClick={() => exportUnifiedPDF({ url: url.trim(), createdAt: reportAt || new Date().toISOString(), report, results, business })}
              className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v9m0 0L5 7m3 3l3-3M2 11v2a2 2 0 002 2h8a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Exporter en PDF
            </button>
          </section>
        </>
      )}
    </div>
  );
}
