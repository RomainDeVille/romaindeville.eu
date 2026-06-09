"use client";

import { useState } from "react";

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/v1/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l'audit");
      }

      const data = await res.json();
      window.location.href = `/espace/audit/${data.id}`;
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
            <p>Analyse en cours... Cela peut prendre 15 à 30 secondes.</p>
            <div
              style={{
                width: 200,
                height: 4,
                background: "var(--line)",
                borderRadius: 2,
                overflow: "hidden",
                marginTop: 12,
              }}
            >
              <div
                style={{
                  width: "60%",
                  height: "100%",
                  background: "linear-gradient(90deg, var(--accent), var(--accent2))",
                  borderRadius: 2,
                  animation: "loading-bar 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
