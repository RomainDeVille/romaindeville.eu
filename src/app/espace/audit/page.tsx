"use client";

import { useState } from "react";

interface CategoryScore {
  id: string;
  title: string;
  score: number;
}

interface AuditMetric {
  id: string;
  title: string;
  score: number | null;
  displayValue?: string;
}

interface AuditReport {
  id: string;
  audit: {
    url: string;
    fetchedAt: string;
    categories: CategoryScore[];
    metrics: AuditMetric[];
    opportunities: AuditMetric[];
    diagnostics: AuditMetric[];
  };
  recommendations: string;
  createdAt: string;
}

function ScoreCircle({ score, label }: { score: number; label: string }) {
  const color =
    score >= 90
      ? "#22c55e"
      : score >= 50
      ? "#f59e0b"
      : "#ef4444";
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ textAlign: "center" }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r="40"
          fill="none"
          stroke="var(--line)"
          strokeWidth="6"
        />
        <circle
          cx="50" cy="50" r="40"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text
          x="50" y="50"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: "22px",
            fontWeight: 700,
            fontFamily: "var(--heading)",
            fill: color,
          }}
        >
          {score}
        </text>
      </svg>
      <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

function MetricRow({ metric }: { metric: AuditMetric }) {
  const score = metric.score !== null ? Math.round(metric.score * 100) : null;
  const color =
    score === null
      ? "var(--muted)"
      : score >= 90
      ? "#22c55e"
      : score >= 50
      ? "#f59e0b"
      : "#ef4444";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <span style={{ fontSize: 14 }}>{metric.title}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {metric.displayValue && (
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            {metric.displayValue}
          </span>
        )}
        {score !== null && (
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color,
              background: `${color}15`,
              padding: "2px 8px",
              borderRadius: 6,
            }}
          >
            {score}
          </span>
        )}
      </div>
    </div>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const html = content
    .replace(/^## (.+)$/gm, '<h2 style="font-family:var(--heading);font-size:22px;font-weight:700;margin:32px 0 12px;letter-spacing:-0.3px">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-family:var(--heading);font-size:17px;font-weight:600;margin:24px 0 8px">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p style='margin:0 0 12px;line-height:1.65;color:var(--muted)'>")
    .replace(/^- (.+)$/gm, '<li style="margin:4px 0;padding-left:4px;color:var(--muted)">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li style="margin:8px 0;padding-left:4px;color:var(--muted)"><strong>$2</strong></li>');

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<p style="margin:0 0 12px;line-height:1.65;color:var(--muted)">${html}</p>`,
      }}
    />
  );
}

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<AuditReport | null>(null);

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

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'audit");
      }

      setReport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wrap">
      <header className="phead">
        <div className="eyebrow">Outil interne</div>
        <h1 className="title">
          Audit <span className="gradient-text">PageSpeed</span>
        </h1>
        <p>
          Entrez l&apos;URL d&apos;un site client pour générer un rapport
          actionnable basé sur Google PageSpeed Insights.
        </p>
      </header>

      <section className="psec">
        <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemple.com"
              required
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid var(--line)",
                background: "var(--panel)",
                color: "var(--text)",
                fontFamily: "var(--sans)",
                fontSize: 15,
                outline: "none",
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "Analyse..." : "Lancer l'audit"}
            </button>
          </div>
          {error && (
            <p style={{ color: "var(--danger)", fontSize: 14 }}>{error}</p>
          )}
        </form>

        {loading && (
          <div style={{ marginTop: 32, color: "var(--muted)" }}>
            <p>
              Analyse en cours... PageSpeed + IA, cela prend 20 à 40 secondes.
            </p>
            <div
              style={{
                width: 240,
                height: 4,
                background: "var(--line)",
                borderRadius: 2,
                overflow: "hidden",
                marginTop: 12,
              }}
            >
              <div
                style={{
                  height: "100%",
                  background:
                    "linear-gradient(90deg, var(--accent), var(--accent2))",
                  borderRadius: 2,
                  animation: "loading-bar 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        )}
      </section>

      {/* ===== RAPPORT ===== */}
      {report && (
        <>
          <section className="psec">
            <h2 style={{ fontFamily: "var(--heading)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, margin: "0 0 8px" }}>
              Résultat
            </h2>
            <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>
              {report.audit.url} · {new Date(report.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            </p>

            {/* Score circles */}
            <div
              style={{
                display: "flex",
                gap: 32,
                flexWrap: "wrap",
                justifyContent: "center",
                padding: "24px 0",
                background: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                marginBottom: 32,
              }}
            >
              {report.audit.categories.map((cat) => (
                <ScoreCircle key={cat.id} score={cat.score} label={cat.title} />
              ))}
            </div>

            {/* Core Web Vitals */}
            <div
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 24,
                marginBottom: 32,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--heading)",
                  fontSize: 17,
                  fontWeight: 600,
                  margin: "0 0 16px",
                }}
              >
                Core Web Vitals
              </h3>
              {report.audit.metrics.map((m) => (
                <MetricRow key={m.id} metric={m} />
              ))}
            </div>

            {/* Opportunities */}
            {report.audit.opportunities.length > 0 && (
              <div
                style={{
                  background: "var(--panel)",
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 32,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--heading)",
                    fontSize: 17,
                    fontWeight: 600,
                    margin: "0 0 16px",
                  }}
                >
                  Opportunités d&apos;amélioration
                </h3>
                {report.audit.opportunities.map((o) => (
                  <MetricRow key={o.id} metric={o} />
                ))}
              </div>
            )}
          </section>

          {/* AI Recommendations */}
          <section className="psec">
            <h2 style={{ fontFamily: "var(--heading)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 700, margin: "0 0 24px" }}>
              Recommandations
            </h2>
            <div
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: "24px 28px",
              }}
            >
              <MarkdownRenderer content={report.recommendations} />
            </div>
          </section>

          {/* Branding footer */}
          <section
            style={{
              textAlign: "center",
              padding: "48px 0",
              borderTop: "1px solid var(--line)",
              marginTop: 32,
            }}
          >
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
              Rapport généré par Romain De Ville · Consultant SEO, GEO et
              Performance Web
            </p>
            <a
              className="btn btn-primary"
              href="https://calendly.com/romain-deville"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discuter de ces résultats
            </a>
          </section>
        </>
      )}
    </div>
  );
}
