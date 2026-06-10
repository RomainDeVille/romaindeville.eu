"use client";

import { useState } from "react";
import {
  PRESETS,
  TOOLS,
  type FinalReport,
  type SectionReport,
  type ToolDef,
  type ToolId,
  type ToolResult,
} from "@/lib/tools";
import type { BusinessInputs } from "@/lib/audit-types";
import { toolDataLines, type DataLine } from "@/lib/report-data";
import { exportUnifiedPDF, unifiedPDFBase64, type UnifiedPdfInput } from "@/lib/pdf-export-unified";

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

type ToolState = "idle" | "running" | "reporting" | "ok" | "empty" | "error";

const STATE_LABEL: Record<ToolState, string> = {
  idle: "En attente",
  running: "Analyse...",
  reporting: "Redaction du chapitre...",
  ok: "Termine",
  empty: "Pas de donnees",
  error: "Erreur",
};

const STATE_COLOR: Record<ToolState, string> = {
  idle: "var(--muted)",
  running: "var(--accent)",
  reporting: "var(--accent2)",
  ok: "#22c55e",
  empty: "#f59e0b",
  error: "#ef4444",
};

const TONE_COLOR: Record<DataLine["tone"], string> = {
  good: "#22c55e",
  warn: "#f59e0b",
  bad: "#ef4444",
  muted: "var(--muted)",
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

function DataGrid({ lines }: { lines: DataLine[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "0 28px", marginBottom: 16 }}>
      {lines.map((l, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
          <span style={{ fontSize: 13, color: "var(--text)" }}>{l.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: TONE_COLOR[l.tone], textAlign: "right" }}>{l.value}</span>
        </div>
      ))}
    </div>
  );
}

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
  const [sections, setSections] = useState<Record<string, SectionReport>>({});
  const [finalReport, setFinalReport] = useState<FinalReport | null>(null);
  const [finalRunning, setFinalRunning] = useState(false);
  const [chapterFails, setChapterFails] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [reportAt, setReportAt] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientName, setClientName] = useState("");
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [sendMessage, setSendMessage] = useState("");

  const selectedTools = TOOLS.filter((t) => selected.has(t.id));
  const n = selectedTools.length || 1;
  const dataDone = selectedTools.filter((t) => ["reporting", "ok", "empty", "error"].includes(states[t.id] || "")).length;
  const sectionDone = selectedTools.filter((t) => ["ok", "empty", "error"].includes(states[t.id] || "")).length;
  const progress = Math.round((dataDone / n) * 45 + (sectionDone / n) * 40 + (finalReport ? 15 : finalRunning ? 7 : 0));

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

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  async function runOne(tool: ToolDef, index: number): Promise<{ result: ToolResult; section: SectionReport | null }> {
    setStates((s) => ({ ...s, [tool.id]: "running" }));
    let result: ToolResult;
    try {
      const payload: Record<string, unknown> = { url: url.trim() };
      if (tool.id === "keywords") {
        payload.seeds = seed.split(/\r?\n/).map((s) => s.trim()).filter(Boolean).slice(0, 5);
      }
      if (tool.id === "authority") {
        payload.competitors = competitors.split(/\r?\n/).map((c) => c.trim()).filter(Boolean);
      }
      const res = await fetch(tool.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      result = await parseJsonSafe<ToolResult>(res, `Erreur ${tool.name}`);
    } catch (err) {
      setStates((s) => ({ ...s, [tool.id]: "error" }));
      return {
        result: { tool: tool.id, status: "error", durationMs: 0, data: null, error: err instanceof Error ? err.message : "Erreur" },
        section: null,
      };
    }

    if (result.status === "error") {
      setStates((s) => ({ ...s, [tool.id]: "error" }));
      return { result, section: null };
    }

    /* Pipeline : le chapitre IA part des que les donnees de CE tool sont la.
       Departs etales + 2 tentatives : une connexion coupee ne perd plus le chapitre. */
    setStates((s) => ({ ...s, [tool.id]: "reporting" }));
    await sleep(index * 1200);
    let section: SectionReport | null = null;
    for (let attempt = 0; attempt < 2 && !section; attempt++) {
      try {
        if (attempt > 0) await sleep(2000);
        const res = await fetch("/api/v1/report/section", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: url.trim(), result, business }),
        });
        section = await parseJsonSafe<SectionReport>(res, "Erreur chapitre");
        setSections((s) => ({ ...s, [tool.id]: section as SectionReport }));
      } catch {
        section = null;
      }
    }
    setStates((s) => ({ ...s, [tool.id]: result.status === "empty" ? "empty" : "ok" }));
    return { result, section };
  }

  async function handleRun(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() || selectedTools.length === 0 || running) return;
    const seedList = seed.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (selected.has("keywords") && (seedList.length === 0 || seedList.some((s) => s.length < 3))) {
      setError("Le tool mots-cles demande 1 a 5 mots-cles (3 caracteres minimum chacun, un par ligne).");
      return;
    }

    setRunning(true);
    setError("");
    setFinalReport(null);
    setResults([]);
    setSections({});
    setChapterFails([]);
    setSendStatus("idle");
    setSendMessage("");
    setStates(Object.fromEntries(selectedTools.map((t) => [t.id, "idle" as ToolState])));

    try {
      const settled = await Promise.all(selectedTools.map((t, i) => runOne(t, i)));
      setResults(settled.map((s) => s.result));

      const okSections = settled.map((s) => s.section).filter((s): s is SectionReport => !!s);
      const failed = settled
        .filter((s) => s.result.status === "error")
        .map((s) => TOOLS.find((t) => t.id === s.result.tool)?.name || s.result.tool);
      const noChapter = settled
        .filter((s) => s.result.status !== "error" && !s.section)
        .map((s) => TOOLS.find((t) => t.id === s.result.tool)?.name || s.result.tool);
      setChapterFails(noChapter);

      if (okSections.length === 0) throw new Error("Aucun chapitre n'a pu etre redige.");

      setFinalRunning(true);
      const res = await fetch("/api/v1/report/final", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), sections: okSections, failed: [...failed, ...noChapter.map((n) => `${n} (donnees collectees mais chapitre non genere)`)], business }),
      });
      const rep = await parseJsonSafe<FinalReport>(res, "Erreur synthese");
      setFinalReport(rep);
      setReportAt(new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setFinalRunning(false);
      setRunning(false);
    }
  }

  const orderedSections = TOOLS.map((t) => sections[t.id]).filter((s): s is SectionReport => !!s);

  const pdfInput: UnifiedPdfInput | null = finalReport
    ? { url: url.trim(), createdAt: reportAt || new Date().toISOString(), final: finalReport, sections: orderedSections, results, chapterFails }
    : null;

  async function handleSend() {
    if (!pdfInput || sendStatus === "sending") return;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clientEmail.trim())) {
      setSendStatus("failed");
      setSendMessage("Adresse email invalide.");
      return;
    }
    setSendStatus("sending");
    setSendMessage("");
    try {
      const pdfBase64 = unifiedPDFBase64(pdfInput);
      const res = await fetch("/api/v1/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientEmail: clientEmail.trim(),
          clientName: clientName.trim(),
          siteUrl: url.trim(),
          summary: finalReport?.summary || "",
          pdfBase64,
        }),
      });
      const out = await parseJsonSafe<{ ok: boolean }>(res, "Erreur d'envoi");
      if (out.ok) {
        setSendStatus("sent");
        setSendMessage(`Rapport envoye a ${clientEmail.trim()}, copie dans votre boite.`);
      } else {
        throw new Error("Envoi refuse");
      }
    } catch (err) {
      setSendStatus("failed");
      setSendMessage(err instanceof Error ? err.message : "Erreur d'envoi");
    }
  }

  return (
    <div>
      <section className="psec">
        <form onSubmit={handleRun}>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 10, marginBottom: 14 }}>
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
                    {st === "empty" && (() => {
                      const r = results.find((x) => x.tool === t.id);
                      const reason =
                        r && r.data && typeof r.data === "object" && "reason" in (r.data as Record<string, unknown>)
                          ? String((r.data as Record<string, unknown>).reason)
                          : "Aucune donnee disponible pour ce site.";
                      return <p style={{ fontSize: 12, color: "#f59e0b", margin: "6px 0 0", lineHeight: 1.5 }}>{reason}</p>;
                    })()}
                  </div>
                </label>
              );
            })}
          </div>

          {selected.has("keywords") && (
            <textarea value={seed} onChange={(ev) => setSeed(ev.target.value)}
              placeholder={"Mots-cles cibles : un par ligne (5 max)\nrenovation bruxelles\ndevis renovation\nentreprise renovation belgique"}
              rows={3}
              style={{ ...inputStyle, width: "100%", marginBottom: 10, resize: "vertical", fontFamily: "var(--sans)" }} />
          )}
          {selected.has("authority") && (
            <textarea value={competitors} onChange={(ev) => setCompetitors(ev.target.value)}
              placeholder={"Concurrents : un site par ligne (optionnel, 5 max)\nhttps://concurrent-a.be\nhttps://concurrent-b.be"}
              rows={3}
              style={{ ...inputStyle, width: "100%", marginBottom: 10, resize: "vertical", fontFamily: "var(--sans)" }} />
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

        {(running || finalReport) && (
          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>
                {finalReport ? "Rapport termine" : finalRunning ? "Redaction de la synthese transversale..." : `Donnees ${dataDone}/${n} · Chapitres ${sectionDone}/${n}`}
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--heading)", color: "var(--accent)" }}>{progress}%</span>
            </div>
            <div style={{ width: "100%", height: 6, background: "var(--line)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, borderRadius: 3, background: "linear-gradient(90deg, var(--accent), var(--accent2))", transition: "width 0.4s ease" }} />
            </div>
          </div>
        )}
      </section>

      {!!finalReport && (
        <>
          <section className="psec">
            <SectionTitle label="Sommaire" />
            <Card>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px" }}>
                <a href="#resume" style={{ fontSize: 13, color: "var(--accent)" }}>Resume executif</a>
                {finalReport.businessImpact && <a href="#impact-business" style={{ fontSize: 13, color: "var(--accent)" }}>Impact business</a>}
                <a href="#priorites" style={{ fontSize: 13, color: "var(--accent)" }}>Priorites croisees</a>
                {orderedSections.map((s) => (
                  <a key={s.toolId} href={`#volet-${s.toolId}`} style={{ fontSize: 13, color: "var(--accent)" }}>{s.title}</a>
                ))}
                <a href="#conclusion" style={{ fontSize: 13, color: "var(--accent)" }}>Conclusion</a>
              </div>
            </Card>
          </section>

          <section className="psec" id="resume">
            <SectionTitle label="Resume executif" />
            <Card>
              {finalReport.summary.split(/\n{2,}/).map((para, i) => (
                <p key={i} style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted)", margin: i === 0 ? 0 : "14px 0 0" }}>{para}</p>
              ))}
            </Card>
          </section>

          {finalReport.businessImpact && (
            <section className="psec" id="impact-business">
              <SectionTitle label="Impact business estime" />
              <Card><p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted)", margin: 0 }}>{finalReport.businessImpact}</p></Card>
            </section>
          )}

          <section className="psec" id="priorites">
            <SectionTitle label="Priorites croisees" />
            {finalReport.priorities.map((p, i) => {
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
                  {p.expectedResult && (
                    <p style={{ fontSize: 13, lineHeight: 1.6, margin: "8px 0 0", color: "#15803d", background: "#22c55e10", padding: "8px 12px", borderRadius: 8 }}>
                      <strong>Resultat attendu :</strong> {p.expectedResult}
                    </p>
                  )}
                </div>
              );
            })}
          </section>

          <section className="psec">
            <SectionTitle label="Analyse detaillee par volet" />
            {orderedSections.map((s) => {
              const result = results.find((r) => r.tool === s.toolId);
              const lines = result ? toolDataLines(result) : [];
              return (
                <div key={s.toolId} id={`volet-${s.toolId}`} style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 14, padding: "22px 26px", marginBottom: 20, scrollMarginTop: 80 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <h3 style={{ fontFamily: "var(--heading)", fontSize: 17, fontWeight: 600, margin: 0 }}>{s.title}</h3>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginLeft: "auto", color: vColor(s.verdict), background: `${vColor(s.verdict)}12`, padding: "3px 10px", borderRadius: 6 }}>
                      {s.verdict}
                    </span>
                  </div>

                  {lines.length > 0 && (
                    <>
                      <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: 8 }}>Donnees mesurees</div>
                      <DataGrid lines={lines} />
                    </>
                  )}

                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: 8 }}>Constats cles</div>
                  <ul style={{ margin: "0 0 16px", paddingLeft: 18 }}>
                    {s.keyFindings.map((f, i) => (
                      <li key={i} style={{ fontSize: 13, lineHeight: 1.7, color: "var(--muted)", marginBottom: 4 }}>{f}</li>
                    ))}
                  </ul>

                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: 8 }}>Analyse</div>
                  {s.narrative.map((para, i) => (
                    <p key={i} style={{ fontSize: 14, lineHeight: 1.75, color: "var(--muted)", margin: "0 0 12px" }}>{para}</p>
                  ))}

                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", margin: "16px 0 8px" }}>Recommandations</div>
                  {s.recommendations.map((rec, i) => {
                    const ic = rec.impact === "Fort" ? "#ef4444" : rec.impact === "Moyen" ? "#f59e0b" : "#22c55e";
                    return (
                      <div key={i} style={{ borderLeft: `3px solid ${ic}`, paddingLeft: 14, marginBottom: 12 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                          <span style={{ fontSize: 14, fontWeight: 600 }}>{rec.action}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: ic }}>Impact {rec.impact} · {rec.effort}</span>
                        </div>
                        <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>{rec.detail}</p>
                        {rec.expectedResult && (
                          <p style={{ fontSize: 12.5, lineHeight: 1.6, margin: "6px 0 0", color: "#15803d" }}>
                            <strong>Resultat attendu :</strong> {rec.expectedResult}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </section>

          <section className="psec" id="conclusion">
            <SectionTitle label="Conclusion" />
            <Card><p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted)", margin: 0 }}>{finalReport.conclusion}</p></Card>
          </section>

          {(results.some((r) => r.status === "error") || chapterFails.length > 0) && (
            <section className="psec">
              <SectionTitle label="Volets incomplets" />
              <Card>
                {results.filter((r) => r.status === "error").map((r) => (
                  <p key={r.tool} style={{ fontSize: 13, color: "var(--muted)", margin: "4px 0" }}>
                    <strong>{TOOLS.find((t) => t.id === r.tool)?.name}</strong> : {r.error}
                  </p>
                ))}
                {chapterFails.map((n) => (
                  <p key={n} style={{ fontSize: 13, color: "#f59e0b", margin: "4px 0" }}>
                    <strong>{n}</strong> : donnees collectees mais chapitre IA non genere. Relancez l&apos;analyse pour ce volet.
                  </p>
                ))}
              </Card>
            </section>
          )}

          <section className="psec" style={{ borderTop: "1px solid var(--line)", paddingTop: 32 }}>
            <SectionTitle label="Livrer le rapport" />
            <Card>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <button
                  onClick={() => pdfInput && exportUnifiedPDF(pdfInput)}
                  className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1v9m0 0L5 7m3 3l3-3M2 11v2a2 2 0 002 2h8a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Telecharger le PDF
                </button>
              </div>
              <div style={{ borderTop: "1px solid var(--line)", margin: "18px 0" }} />
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 10 }}>
                Envoyer le rapport par email au client (PDF en piece jointe, copie dans votre boite) :
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input value={clientName} onChange={(ev) => setClientName(ev.target.value)} placeholder="Prenom du client (optionnel)" style={inputStyle} />
                <input type="email" value={clientEmail} onChange={(ev) => setClientEmail(ev.target.value)} placeholder="email@client.be" style={inputStyle} />
                <button onClick={handleSend} className="btn btn-primary" disabled={sendStatus === "sending"}
                  style={{ opacity: sendStatus === "sending" ? 0.6 : 1 }}>
                  {sendStatus === "sending" ? "Envoi..." : "Envoyer au client"}
                </button>
              </div>
              {sendMessage && (
                <p style={{ fontSize: 13, marginTop: 10, color: sendStatus === "sent" ? "#22c55e" : "#ef4444" }}>{sendMessage}</p>
              )}
            </Card>
          </section>
        </>
      )}
    </div>
  );
}
