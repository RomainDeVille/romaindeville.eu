"use client";

import { useState, useRef, useCallback } from "react";
import { exportAuditPDF } from "@/lib/pdf-export";
import type {
  AuditReport,
  AuditMetric,
  AuditRecommendations,
  BusinessInputs,
  FieldMetric,
  GeoAudit,
  PageSpeedAudit,
  PriorityAction,
  RoadmapItem,
  ScoreAnalysis,
  MetricDetail,
  ExtraRecommendation,
} from "@/lib/audit-types";

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
      (res.status === 504
        ? "Le serveur a mis trop de temps a repondre. Relancez l'audit."
        : `${fallback} (HTTP ${res.status})`);
    throw new Error(msg);
  }
  if (data === null) throw new Error(fallback);
  return data;
}

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

function FieldRow({ f }: { f: FieldMetric }) {
  const c = f.category === "FAST" ? "#22c55e" : f.category === "SLOW" ? "#ef4444" : "#f59e0b";
  const lbl = f.category === "FAST" ? "Bon" : f.category === "SLOW" ? "Mauvais" : "Moyen";
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--line)" }}>
      <span style={{ fontSize: 14 }}>{f.name}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>{f.displayValue}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: c, background: `${c}15`, padding: "2px 8px", borderRadius: 6 }}>{lbl}</span>
      </div>
    </div>
  );
}

function GeoChecklist({ geo }: { geo: GeoAudit }) {
  const Row = ({ label, ok, detail }: { label: string; ok: boolean; detail?: string }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--line)", gap: 16 }}>
      <span style={{ fontSize: 14 }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10, textAlign: "right" }}>
        {detail && <span style={{ fontSize: 12, color: "var(--muted)", maxWidth: 360, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{detail}</span>}
        <span style={{
          fontSize: 12, fontWeight: 700, flexShrink: 0,
          color: ok ? "#22c55e" : "#ef4444",
          background: ok ? "#22c55e15" : "#ef444415",
          padding: "2px 10px", borderRadius: 6,
        }}>{ok ? "OK" : "Manquant"}</span>
      </div>
    </div>
  );
  const blocked = geo.robotsAiBots.filter((b) => !b.allowed);
  return (
    <>
      <Row label="Donnees structurees Schema.org" ok={geo.schemaTypes.length > 0}
        detail={geo.schemaTypes.length > 0 ? geo.schemaTypes.join(", ") : "Aucun bloc JSON-LD detecte"} />
      <Row label="Fichier llms.txt" ok={geo.hasLlmsTxt} />
      <Row label="Meta description" ok={geo.metaDescription} />
      <Row label="Balises Open Graph" ok={geo.ogTags} />
      <Row label="Balise H1 unique" ok={geo.h1Count === 1} detail={`${geo.h1Count} H1 sur la page`} />
      <div style={{ padding: "12px 0 4px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: 8 }}>
          Acces des crawlers IA {geo.robotsTxtFound ? "(robots.txt)" : "(robots.txt absent, tout est autorise par defaut)"}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {geo.robotsAiBots.map((b) => (
            <span key={b.bot} style={{
              fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 6,
              color: b.allowed ? "#22c55e" : "#ef4444",
              background: b.allowed ? "#22c55e12" : "#ef444412",
            }}>{b.bot}</span>
          ))}
        </div>
        {blocked.length > 0 && (
          <p style={{ fontSize: 12, color: "var(--muted)", margin: "8px 0 0" }}>
            {blocked.length} crawler{blocked.length > 1 ? "s" : ""} IA bloque{blocked.length > 1 ? "s" : ""} : le contenu de ce site ne peut pas etre repris par ces moteurs.
          </p>
        )}
      </div>
    </>
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
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: ic, background: `${ic}12`, padding: "2px 8px", borderRadius: 4 }}>
              Impact {a.impact}
            </span>
            {a.effort && (
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", background: "var(--line)", padding: "2px 8px", borderRadius: 4 }}>
                Effort {a.effort}
              </span>
            )}
          </div>
        </div>
      </div>
      <Field label="Probleme detecte" text={a.problem} />
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

function RoadmapRow({ r }: { r: RoadmapItem }) {
  const hc = r.horizon === "30 jours" ? "#ef4444" : r.horizon === "60 jours" ? "#f59e0b" : "#22c55e";
  return (
    <div style={{ padding: "14px 0", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: hc, background: `${hc}12`, padding: "2px 10px", borderRadius: 6, flexShrink: 0 }}>
          {r.horizon}
        </span>
        <span style={{ fontFamily: "var(--heading)", fontWeight: 600, fontSize: 14 }}>{r.title}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", marginLeft: "auto", flexShrink: 0 }}>
          Effort : {r.effort}
        </span>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>{r.expectedResult}</p>
    </div>
  );
}

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

/* ═══ MAIN ═══ */

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [visits, setVisits] = useState("");
  const [convRate, setConvRate] = useState("");
  const [aov, setAov] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState("");
  const [audit, setAudit] = useState<PageSpeedAudit | null>(null);
  const [geoData, setGeoData] = useState<GeoAudit | null>(null);
  const [reco, setReco] = useState<AuditRecommendations | null>(null);
  const [reportId, setReportId] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const business: BusinessInputs | null = (() => {
    const v = parseFloat(visits), c = parseFloat(convRate), p = parseFloat(aov);
    const out: BusinessInputs = {};
    if (Number.isFinite(v) && v > 0) out.monthlyVisits = v;
    if (Number.isFinite(c) && c > 0) out.conversionRate = c;
    if (Number.isFinite(p) && p > 0) out.avgOrderValue = p;
    return Object.keys(out).length > 0 ? out : null;
  })();

  const report: AuditReport | null = audit && reco
    ? { id: reportId, audit, recommendations: reco, createdAt, geo: geoData, business }
    : null;

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
    setGeoData(null);
    setReco(null);
    setProgress(0);

    try {
      startProgress(0, 45, 25000, "Analyse PageSpeed mobile + desktop...");

      const geoPromise: Promise<GeoAudit | null> = fetch("/api/v1/audit/geo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      })
        .then((r) => parseJsonSafe<{ geo: GeoAudit }>(r, "Erreur GEO"))
        .then((d) => d.geo)
        .catch(() => null);

      const r1 = await fetch("/api/v1/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const d1 = await parseJsonSafe<{ audit: PageSpeedAudit; id: string; createdAt: string }>(r1, "Erreur PageSpeed");
      const geo = await geoPromise;

      setAudit(d1.audit);
      setGeoData(geo);
      setReportId(d1.id);
      setCreatedAt(d1.createdAt);
      setProgress(50);
      setPhase("ai");

      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);

      startProgress(50, 95, 90000, "Generation des recommandations IA...");

      const r2 = await fetch("/api/v1/audit/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audit: d1.audit, geo, business }),
      });
      const d2 = await parseJsonSafe<AuditRecommendations>(r2, "Erreur IA");

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

  const busy = phase !== "idle" && phase !== "done";

  return (
    <div className="wrap">
      <header className="phead">
        <div className="eyebrow">Outil interne</div>
        <h1 className="title">Audit <span className="gradient-text">PageSpeed</span></h1>
        <p>Entrez l&apos;URL d&apos;un site pour generer un rapport actionnable : labo mobile + desktop, donnees terrain CrUX, visibilite IA (GEO).</p>
      </header>

      <section className="psec">
        <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            <input type="url" value={url} onChange={(ev) => setUrl(ev.target.value)}
              placeholder="https://exemple.com" required
              style={{ flex: 1, padding: "12px 16px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--panel)", color: "var(--text)", fontFamily: "var(--sans)", fontSize: 15, outline: "none" }} />
            <button type="submit" className="btn btn-primary" disabled={busy} style={{ opacity: busy ? 0.6 : 1 }}>
              {busy ? "Analyse..." : "Lancer l'audit"}
            </button>
          </div>
          <details style={{ marginBottom: 12 }}>
            <summary style={{ fontSize: 13, color: "var(--muted)", cursor: "pointer", userSelect: "none" }}>
              Donnees business (optionnel) : chiffrer l&apos;impact en euros
            </summary>
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              <input type="number" min="0" value={visits} onChange={(ev) => setVisits(ev.target.value)}
                placeholder="Visites / mois" style={inputStyle} />
              <input type="number" min="0" step="0.1" value={convRate} onChange={(ev) => setConvRate(ev.target.value)}
                placeholder="Taux de conversion (%)" style={inputStyle} />
              <input type="number" min="0" value={aov} onChange={(ev) => setAov(ev.target.value)}
                placeholder="Panier moyen (EUR)" style={inputStyle} />
            </div>
          </details>
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
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", textAlign: "center", marginBottom: 12 }}>Mobile</div>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", padding: "8px 0" }}>
                {audit.categories.map((c) => <ScoreCircle key={c.id} score={c.score} label={c.title} />)}
              </div>
              {audit.desktop && (
                <>
                  <div style={{ borderTop: "1px solid var(--line)", margin: "16px 0" }} />
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", textAlign: "center", marginBottom: 12 }}>Desktop</div>
                  <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", padding: "8px 0" }}>
                    {audit.desktop.categories.map((c) => <ScoreCircle key={c.id} score={c.score} label={c.title} />)}
                  </div>
                </>
              )}
            </Card>
          </section>

          <section className="psec">
            <SectionTitle label="Core Web Vitals (labo, mobile)" />
            <Card>{audit.metrics.map((m) => <MetricRow key={m.id} m={m} />)}</Card>
          </section>

          {audit.fieldData && audit.fieldData.length > 0 && (
            <section className="psec">
              <SectionTitle label="Donnees terrain (vrais utilisateurs, CrUX 28 jours)" />
              <Card>
                {audit.fieldData.map((f) => <FieldRow key={f.name} f={f} />)}
                <p style={{ fontSize: 12, color: "var(--muted)", margin: "10px 0 0", opacity: 0.7 }}>
                  Source : {audit.fieldDataSource === "origin" ? "ensemble du domaine" : "cette page"}. Ces chiffres refletent l&apos;experience reelle des visiteurs, contrairement aux scores labo qui varient entre deux mesures.
                </p>
              </Card>
            </section>
          )}

          {audit.blockingResources && audit.blockingResources.length > 0 && (
            <section className="psec">
              <SectionTitle label="Ressources bloquantes identifiees" />
              <Card>
                {audit.blockingResources.map((b) => (
                  <div key={b.url} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontSize: 13, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.url}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#ef4444", flexShrink: 0 }}>
                      {b.wastedMs ? `${Math.round(b.wastedMs)} ms` : ""}{b.totalBytes ? ` · ${Math.round(b.totalBytes / 1024)} KiB` : ""}
                    </span>
                  </div>
                ))}
              </Card>
            </section>
          )}

          {audit.opportunities.length > 0 && (
            <section className="psec">
              <SectionTitle label="Opportunites d'amelioration" />
              <Card>{audit.opportunities.map((o) => <MetricRow key={o.id} m={o} />)}</Card>
            </section>
          )}

          {geoData && (
            <section className="psec">
              <SectionTitle label="Visibilite IA (GEO)" />
              <Card><GeoChecklist geo={geoData} /></Card>
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

          {reco.businessImpact && (
            <section className="psec">
              <SectionTitle label="Impact business estime" />
              <Card>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--muted)", margin: 0 }}>{reco.businessImpact}</p>
              </Card>
            </section>
          )}

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

          {reco.geoAnalysis && (
            <section className="psec">
              <SectionTitle label="Analyse GEO" />
              <Card>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "var(--muted)", margin: 0 }}>{reco.geoAnalysis}</p>
              </Card>
            </section>
          )}

          <section className="psec">
            <SectionTitle label="Recommandations complementaires" />
            <Card>{reco.extras.map((ex, i) => <ExtraCard key={i} e={ex} i={i} />)}</Card>
          </section>

          {reco.roadmap && reco.roadmap.length > 0 && (
            <section className="psec">
              <SectionTitle label="Roadmap 30 / 60 / 90 jours" />
              <Card>{reco.roadmap.map((r, i) => <RoadmapRow key={i} r={r} />)}</Card>
            </section>
          )}

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
