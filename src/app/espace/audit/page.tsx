"use client";

import { useState, useRef, useCallback } from "react";
import { exportAuditPDF } from "@/lib/pdf-export";
import type {
  AuditReport,
  AuditMetric,
  AuditRecommendations,
  PageSpeedAudit,
  ScoreAnalysis,
  PriorityAction,
  MetricDetail,
  ExtraRecommendation,
} from "@/lib/audit-types";

/* ═══ PROGRESS BAR ═══ */

type Phase = "idle" | "pagespeed" | "ai" | "done";

function ProgressBar({ phase, progress, label }: { phase: Phase; progress: number; label: string }) {
  if (phase === "idle") return null;
  return (
    <div style={{ marginTop: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 14, color: "var(--text)", fontWeight: 500 }}>{label}</span>
        <span style={{
          fontSize: 14, fontFamily: "var(--heading)", fontWeight: 700, minWidth: 42, textAlign: "right",
          background: "linear-gradient(135deg, var(--accent), var(--accent2))",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          {Math.round(progress)}%
        </span>
      </div>
      <div style={{ width: "100%", maxWidth: 480, height: 6, background: "var(--line)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${progress}%`, borderRadius: 3,
          background: "linear-gradient(90deg, var(--accent), var(--accent2))",
          transition: "width 0.3s ease-out", position: "relative",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
            animation: "shimmer 1.8s ease-in-out infinite",
          }} />
        </div>
      </div>
      <style>{`@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}`}</style>
    </div>
  );
}

/* ═══ COMPONENTS ═══ */

function sColor(s: number) { return s >= 90 ? "#22c55e" : s >= 50 ? "#f59e0b" : "#ef4444"; }

function ScoreCircle({ score, label }: { score: number; label: string }) {
  const c = sColor(score), circ = 2 * Math.PI * 40, off = circ - (score / 100) * circ;
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--line)" strokeWidth="6" />
        <circle cx="50" cy="50" r="40" fill="none" stroke={c} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={off} transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 1s ease" }} />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
          style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--heading)", fill: c }}>{score}</text>
      </svg>
      <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{label}</div>
    </div>
  );
}

function MetricRow({ m }: { m: AuditMetric }) {
  const s = m.score !== null ? Math.round(m.score * 100) : null;
  const c = s === null ? "var(--muted)" : sColor(s);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
      <span style={{ fontSize: 14 }}>{m.title}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {m.displayValue && <span style={{ fontSize: 13, color: "var(--muted)" }}>{m.displayValue}</span>}
        {s !== null && <span style={{ fontSize: 13, fontWeight: 600, color: c, background: `${c}15`, padding: "2px 8px", borderRadius: 6 }}>{s}</span>}
      </div>
    </div>
  );
}

function ScoreCard({ item }: { item: ScoreAnalysis }) {
  const emoji = item.verdict === "bon" ? "\u{1F7E2}" : item.verdict === "moyen" ? "\u{1F7E0}" : "\u{1F534}";
  return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 18 }}>{emoji}</span>
        <span style={{ fontFamily: "var(--heading)", fontWeight: 600, fontSize: 16 }}>{item.category}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: sColor(item.score), background: `${sColor(item.score)}12`, padding: "2px 10px", borderRadius: 6, marginLeft: "auto" }}>
          {item.score}/100
        </span>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>{item.analysis}</p>
    </div>
  );
}

function ActionCard({ a, i }: { a: PriorityAction; i: number }) {
  const ic = a.impact === "Fort" ? "#ef4444" : a.impact === "Moyen" ? "#f59e0b" : "#22c55e";
  return (
    <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 14, padding: "20px 24px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: "linear-gradient(135deg, var(--accent), var(--accent2))",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontFamily: "var(--heading)", fontWeight: 700, fontSize: 14,
        }}>{i + 1}</div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontFamily: "var(--heading)", fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>{a.title}</h4>
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: ic, background: `${ic}12`, padding: "2px 8px", borderRadius: 4 }}>
            Impact {a.impact}
          </span>
        </div>
      </div>
      <Field label="Problème détecté" text={a.problem} />
      <Field label="Pourquoi c'est important" text={a.importance} />
      <Field label="Comment corriger" text={a.fix} />
    </div>
  );
}

function Field({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: 4 }}>{label}</div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>{text}</p>
    </div>
  );
}

function MetricDetailCard({ m }: { m: MetricDetail }) {
  const c = m.verdict === "Bon" ? "#22c55e" : m.verdict === "Mauvais" ? "#ef4444" : "#f59e0b";
  return (
    <div style={{ padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontFamily: "var(--heading)", fontWeight: 600, fontSize: 14 }}>{m.name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--heading)", color: c }}>{m.value}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: c, background: `${c}12`, padding: "2px 8px", borderRadius: 4 }}>{m.verdict}</span>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 4px", lineHeight: 1.6 }}>{m.explanation}</p>
      <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, opacity: 0.6 }}>{m.thresholds}</p>
    </div>
  );
}

function ExtraCard({ e, i }: { e: ExtraRecommendation; i: number }) {
  return (
    <div style={{ padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700, fontFamily: "var(--heading)", flexShrink: 0, marginTop: 2 }}>
          {String(i + 1).padStart(2, "0")}
        </span>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>{e.title}</h4>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>{e.description}</p>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ label }: { label: string }) {
  return <h2 style={{ fontFamily: "var(--heading)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, margin: "0 0 20px" }}>{label}</h2>;
}

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 16, padding: "20px 24px", marginBottom: 32 }}>{children}</div>;
}

/* ═══ MAIN ═══ */

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState("");
  const [audit, setAudit] = useState<PageSpeedAudit | null>(null);
  const [reco, setReco] = useState<AuditRecommendations | null>(null);
  const [reportId, setReportId] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const report: AuditReport | null = audit && reco ? { id: reportId, audit, recommendations: reco, createdAt } : null;

  const handleExportPDF = useCallback(() => {
    if (report) exportAuditPDF(report);
  }, [report]);

  function startProgress(fromPct: number, toPct: number, durationMs: number, label: string) {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgressLabel(label);
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      const val = fromPct + (toPct - fromPct) * eased;
      setProgress(Math.min(val, toPct));
      if (ratio >= 1 && timerRef.current) clearInterval(timerRef.current);
    }, 80);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setPhase("pagespeed");
    setError("");
    setAudit(null);
    setReco(null);
    setProgress(0);

    try {
      startProgress(0, 45, 15000, "Connexion a Google PageSpeed...");

      const r1 = await fetch("/api/v1/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const d1 = await r1.json();
      if (!r1.ok) throw new Error(d1.error || "Erreur PageSpeed");

      setAudit(d1.audit);
      setReportId(d1.id);
      setCreatedAt(d1.createdAt);
      setProgress(50);
      setPhase("ai");

      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);

      startProgress(50, 95, 25000, "Generation des recommandations IA...");

      const r2 = await fetch("/api/v1/audit/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audit: d1.audit }),
      });
      const d2 = await r2.json();
      if (!r2.ok) throw new Error(d2.error || "Erreur IA");

      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(100);
      setProgressLabel("Rapport termine !");
      setReco(d2);
      setPhase("done");
    } catch (err) {
      if (timerRef.current) clearInterval(timerRef.current);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setPhase("idle");
      setProgress(0);
    }
  }

  return (
    <div className="wrap">
      <header className="phead">
        <div className="eyebrow">Outil interne</div>
        <h1 className="title">Audit <span className="gradient-text">PageSpeed</span></h1>
        <p>Entrez l&apos;URL d&apos;un site pour generer un rapport actionnable.</p>
      </header>

      <section className="psec">
        <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <input type="url" value={url} onChange={(ev) => setUrl(ev.target.value)}
              placeholder="https://exemple.com" required
              style={{ flex: 1, padding: "12px 16px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--panel)", color: "var(--text)", fontFamily: "var(--sans)", fontSize: 15, outline: "none" }} />
            <button type="submit" className="btn btn-primary" disabled={phase !== "idle" && phase !== "done"} style={{ opacity: (phase !== "idle" && phase !== "done") ? 0.6 : 1 }}>
              {phase === "idle" || phase === "done" ? "Lancer l'audit" : "Analyse..."}
            </button>
          </div>
          {error && <p style={{ color: "var(--danger)", fontSize: 14 }}>{error}</p>}
        </form>
        {(phase === "pagespeed" || phase === "ai") && <ProgressBar phase={phase} progress={progress} label={progressLabel} />}
      </section>

      {/* SCORES (Phase 1) */}
      {!!audit && (
        <>
          <div ref={resultRef} />

          <section className="psec">
            <SectionTitle label="Resultat" />
            <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>
              {audit.url} &middot; {new Date(createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>
            <Card>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", padding: "8px 0" }}>
                {audit.categories.map((c) => <ScoreCircle key={c.id} score={c.score} label={c.title} />)}
              </div>
            </Card>
          </section>

          <section className="psec">
            <SectionTitle label="Core Web Vitals" />
            <Card>{audit.metrics.map((m) => <MetricRow key={m.id} m={m} />)}</Card>
          </section>

          {audit.opportunities.length > 0 && (
            <section className="psec">
              <SectionTitle label="Opportunites d'amelioration" />
              <Card>{audit.opportunities.map((o) => <MetricRow key={o.id} m={o} />)}</Card>
            </section>
          )}

          {phase === "ai" && (
            <section className="psec" style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "var(--panel)", border: "1px solid var(--line)",
                borderRadius: 12, padding: "14px 24px",
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "var(--accent)", animation: "pulse 1.5s ease-in-out infinite",
                }} />
                <span style={{ fontSize: 14, color: "var(--muted)" }}>
                  Generation des recommandations IA en cours...
                </span>
              </div>
              <style>{`@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}`}</style>
            </section>
          )}
        </>
      )}

      {/* RECOMMENDATIONS (Phase 2) */}
      {!!reco && (
        <>
          <section className="psec">
            <SectionTitle label="Resume executif" />
            <Card>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted)", margin: 0 }}>{reco.summary}</p>
            </Card>
          </section>

          <section className="psec">
            <SectionTitle label="Analyse des scores" />
            <Card>{reco.scores.map((s) => <ScoreCard key={s.category} item={s} />)}</Card>
          </section>

          <section className="psec">
            <SectionTitle label="Metriques detaillees" />
            <Card>{reco.metrics.map((m) => <MetricDetailCard key={m.name} m={m} />)}</Card>
          </section>

          <section className="psec">
            <SectionTitle label="Top 5 des actions prioritaires" />
            {reco.actions.map((a, i) => <ActionCard key={i} a={a} i={i} />)}
          </section>

          <section className="psec">
            <SectionTitle label="Recommandations complementaires" />
            <Card>{reco.extras.map((ex, i) => <ExtraCard key={i} e={ex} i={i} />)}</Card>
          </section>

          <section style={{ textAlign: "center", padding: "48px 0", borderTop: "1px solid var(--line)", marginTop: 32 }}>
            <button onClick={handleExportPDF} className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
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
