"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { exportAuditPDF } from "@/lib/pdf-export";
import type {
  AuditReport,
  AuditMetric,
  ScoreAnalysis,
  PriorityAction,
  MetricDetail,
  ExtraRecommendation,
} from "@/lib/audit-types";

/* ═══════════════════════════════════════════════
   LOADING BAR
   ═══════════════════════════════════════════════ */

const LOADING_PHASES = [
  { label: "Connexion à Google PageSpeed...", target: 12, duration: 2500 },
  { label: "Analyse de la performance mobile...", target: 28, duration: 3000 },
  { label: "Scan des Core Web Vitals...", target: 45, duration: 3500 },
  { label: "Évaluation accessibilité et SEO...", target: 58, duration: 3000 },
  { label: "Identification des opportunités...", target: 68, duration: 3000 },
  { label: "Génération des recommandations IA...", target: 82, duration: 5000 },
  { label: "Rédaction du rapport détaillé...", target: 91, duration: 5000 },
  { label: "Finalisation...", target: 96, duration: 8000 },
];

function ProgressBar({ loading }: { loading: boolean }) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setPhaseIndex(0);
      return;
    }
    startTime.current = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime.current;
      let cumDur = 0;
      let phase = 0;
      for (let i = 0; i < LOADING_PHASES.length; i++) {
        if (elapsed < cumDur + LOADING_PHASES[i].duration) { phase = i; break; }
        cumDur += LOADING_PHASES[i].duration;
        if (i === LOADING_PHASES.length - 1) phase = i;
      }
      setPhaseIndex(phase);
      const p = LOADING_PHASES[phase];
      const prev = phase > 0 ? LOADING_PHASES[phase - 1].target : 0;
      const pElapsed = elapsed - cumDur;
      const eased = 1 - Math.pow(1 - Math.min(pElapsed / p.duration, 1), 3);
      setProgress(Math.min(prev + (p.target - prev) * eased, 97));
    }, 80);
    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  return (
    <div style={{ marginTop: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 14, color: "var(--text)", fontWeight: 500 }}>
          {LOADING_PHASES[phaseIndex].label}
        </span>
        <span
          style={{
            fontSize: 14, fontFamily: "var(--heading)", fontWeight: 700, minWidth: 42, textAlign: "right",
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>
      <div style={{ width: "100%", maxWidth: 480, height: 6, background: "var(--line)", borderRadius: 3, overflow: "hidden" }}>
        <div
          style={{
            height: "100%", width: `${progress}%`, borderRadius: 3, transition: "width 0.3s ease-out",
            background: "linear-gradient(90deg, var(--accent), var(--accent2))", position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
              animation: "shimmer 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>
      <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10, opacity: 0.7 }}>
        PageSpeed Insights + analyse IA, environ 20 à 40 secondes
      </p>
      <style>{`@keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }`}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCORE CIRCLE
   ═══════════════════════════════════════════════ */

function scoreColor(score: number): string {
  if (score >= 90) return "#22c55e";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

function ScoreCircle({ score, label }: { score: number; label: string }) {
  const color = scoreColor(score);
  const circ = 2 * Math.PI * 40;
  const offset = circ - (score / 100) * circ;
  return (
    <div style={{ textAlign: "center" }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--line)" strokeWidth="6" />
        <circle
          cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          transform="rotate(-90 50 50)" style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text x="50" y="50" textAnchor="middle" dominantBaseline="central"
          style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--heading)", fill: color }}>
          {score}
        </text>
      </svg>
      <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   METRIC ROW
   ═══════════════════════════════════════════════ */

function MetricRow({ metric }: { metric: AuditMetric }) {
  const score = metric.score !== null ? Math.round(metric.score * 100) : null;
  const color = score === null ? "var(--muted)" : scoreColor(score);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
      <span style={{ fontSize: 14 }}>{metric.title}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {metric.displayValue && <span style={{ fontSize: 13, color: "var(--muted)" }}>{metric.displayValue}</span>}
        {score !== null && (
          <span style={{ fontSize: 13, fontWeight: 600, color, background: `${color}15`, padding: "2px 8px", borderRadius: 6 }}>
            {score}
          </span>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION: SCORE ANALYSIS
   ═══════════════════════════════════════════════ */

function ScoreAnalysisCard({ item }: { item: ScoreAnalysis }) {
  const emoji = item.verdict === "bon" ? "🟢" : item.verdict === "moyen" ? "🟠" : "🔴";
  return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 18 }}>{emoji}</span>
        <span style={{ fontFamily: "var(--heading)", fontWeight: 600, fontSize: 16 }}>
          {item.category}
        </span>
        <span style={{
          fontSize: 13, fontWeight: 700, color: scoreColor(item.score),
          background: `${scoreColor(item.score)}12`, padding: "2px 10px", borderRadius: 6, marginLeft: "auto",
        }}>
          {item.score}/100
        </span>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>{item.analysis}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION: PRIORITY ACTION
   ═══════════════════════════════════════════════ */

function ActionCard({ action, index }: { action: PriorityAction; index: number }) {
  const impactColor = action.impact === "Fort" ? "#ef4444" : action.impact === "Moyen" ? "#f59e0b" : "#22c55e";
  return (
    <div style={{
      background: "var(--panel)", border: "1px solid var(--line)", borderRadius: 14,
      padding: "20px 24px", marginBottom: 16,
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: "linear-gradient(135deg, var(--accent), var(--accent2))",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontFamily: "var(--heading)", fontWeight: 700, fontSize: 14,
        }}>
          {index + 1}
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontFamily: "var(--heading)", fontSize: 16, fontWeight: 600, margin: "0 0 4px", letterSpacing: "-0.2px" }}>
            {action.title}
          </h4>
          <span style={{
            fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em",
            color: impactColor, background: `${impactColor}12`, padding: "2px 8px", borderRadius: 4,
          }}>
            Impact {action.impact}
          </span>
        </div>
      </div>
      {/* Fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Field label="Problème détecté" text={action.problem} />
        <Field label="Pourquoi c'est important" text={action.importance} />
        <Field label="Comment corriger" text={action.fix} />
      </div>
    </div>
  );
}

function Field({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: 4 }}>
        {label}
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--muted)", margin: 0, whiteSpace: "pre-wrap" }}>{text}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION: METRIC DETAIL
   ═══════════════════════════════════════════════ */

function MetricDetailCard({ metric }: { metric: MetricDetail }) {
  const color = metric.verdict === "Bon" ? "#22c55e" : metric.verdict === "À améliorer" ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontFamily: "var(--heading)", fontWeight: 600, fontSize: 14 }}>{metric.name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--heading)", color }}>{metric.value}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color, background: `${color}12`, padding: "2px 8px", borderRadius: 4 }}>
            {metric.verdict}
          </span>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 4px", lineHeight: 1.6 }}>{metric.explanation}</p>
      <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, opacity: 0.7 }}>{metric.thresholds}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION: EXTRA RECO
   ═══════════════════════════════════════════════ */

function ExtraCard({ item, index }: { item: ExtraRecommendation; index: number }) {
  return (
    <div style={{ padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700, fontFamily: "var(--heading)", flexShrink: 0, marginTop: 2 }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>{item.title}</h4>
          <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--muted)", margin: 0 }}>{item.description}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION WRAPPER
   ═══════════════════════════════════════════════ */

function SectionTitle({ label }: { label: string }) {
  return (
    <h2 style={{
      fontFamily: "var(--heading)", fontSize: 12, letterSpacing: "0.14em",
      textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, margin: "0 0 20px",
    }}>
      {label}
    </h2>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--panel)", border: "1px solid var(--line)",
      borderRadius: 16, padding: "20px 24px", marginBottom: 32,
    }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<AuditReport | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = useCallback(() => {
    if (report) exportAuditPDF(report);
  }, [report]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setReport(null);

    try {
      const res = await fetch("/api/v1/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'audit");
      setReport(data);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wrap">
      {/* ── HEADER ── */}
      <header className="phead">
        <div className="eyebrow">Outil interne</div>
        <h1 className="title">Audit <span className="gradient-text">PageSpeed</span></h1>
        <p>Entrez l&apos;URL d&apos;un site pour générer un rapport actionnable.</p>
      </header>

      {/* ── FORM ── */}
      <section className="psec">
        <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <input
              type="url" value={url} onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemple.com" required
              style={{
                flex: 1, padding: "12px 16px", borderRadius: 10,
                border: "1px solid var(--line)", background: "var(--panel)",
                color: "var(--text)", fontFamily: "var(--sans)", fontSize: 15, outline: "none",
              }}
            />
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
              {loading ? "Analyse..." : "Lancer l'audit"}
            </button>
          </div>
          {error && <p style={{ color: "var(--danger)", fontSize: 14 }}>{error}</p>}
        </form>
        <ProgressBar loading={loading} />
      </section>

      {/* ═══ RAPPORT ═══ */}
      {report && (
        <>
          <div ref={resultRef} />

          {/* ── Meta ── */}
          <section className="psec">
            <SectionTitle label="Résultat" />
            <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>
              {report.audit.url} · {new Date(report.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>

            {/* Score circles */}
            <Card>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", padding: "8px 0" }}>
                {report.audit.categories.map((cat) => (
                  <ScoreCircle key={cat.id} score={cat.score} label={cat.title} />
                ))}
              </div>
            </Card>

            {/* Summary */}
            <Card>
              <h3 style={{ fontFamily: "var(--heading)", fontSize: 17, fontWeight: 600, margin: "0 0 12px" }}>
                Résumé exécutif
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted)", margin: 0 }}>
                {report.recommendations.summary}
              </p>
            </Card>
          </section>

          {/* ── Analyse des scores ── */}
          <section className="psec">
            <SectionTitle label="Analyse des scores" />
            <Card>
              {report.recommendations.scores.map((s) => (
                <ScoreAnalysisCard key={s.category} item={s} />
              ))}
            </Card>
          </section>

          {/* ── Core Web Vitals ── */}
          <section className="psec">
            <SectionTitle label="Core Web Vitals" />
            <Card>
              {report.audit.metrics.map((m) => (
                <MetricRow key={m.id} metric={m} />
              ))}
            </Card>
          </section>

          {/* ── Métriques détaillées ── */}
          <section className="psec">
            <SectionTitle label="Métriques détaillées" />
            <Card>
              {report.recommendations.metrics.map((m) => (
                <MetricDetailCard key={m.name} metric={m} />
              ))}
            </Card>
          </section>

          {/* ── Opportunités ── */}
          {report.audit.opportunities.length > 0 && (
            <section className="psec">
              <SectionTitle label="Opportunités d'amélioration" />
              <Card>
                {report.audit.opportunities.map((o) => (
                  <MetricRow key={o.id} metric={o} />
                ))}
              </Card>
            </section>
          )}

          {/* ── Top 5 actions ── */}
          <section className="psec">
            <SectionTitle label="Top 5 des actions prioritaires" />
            {report.recommendations.actions.map((a, i) => (
              <ActionCard key={i} action={a} index={i} />
            ))}
          </section>

          {/* ── Recommandations complémentaires ── */}
          <section className="psec">
            <SectionTitle label="Recommandations complémentaires" />
            <Card>
              {report.recommendations.extras.map((e, i) => (
                <ExtraCard key={i} item={e} index={i} />
              ))}
            </Card>
          </section>

          {/* ── Actions: PDF + CTA ── */}
          <section style={{ textAlign: "center", padding: "48px 0", borderTop: "1px solid var(--line)", marginTop: 32 }}>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
              <button onClick={handleExportPDF} className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v9m0 0L5 7m3 3l3-3M2 11v2a2 2 0 002 2h8a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Télécharger le PDF
              </button>
              <a className="btn btn-outline" href="https://calendly.com/romain-deville" target="_blank" rel="noopener noreferrer">
                Discuter de ces résultats
              </a>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>
              Rapport généré par Romain De Ville · Consultant SEO, GEO et Performance Web
            </p>
          </section>
        </>
      )}
    </div>
  );
}
