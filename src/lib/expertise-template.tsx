import Link from "next/link";
import { Breadcrumbs } from "@/lib/breadcrumbs";
import { profile } from "@/lib/data";
import { EXPERTISES, type Expertise } from "@/lib/expertises";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://romaindeville.eu";

export function ExpertisePage({ e }: { e: Expertise }) {
  const related = e.related
    .map((slug) => EXPERTISES.find((x) => x.slug === slug))
    .filter((x): x is Expertise => !!x);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/${e.slug}#service`,
    name: e.name,
    serviceType: e.serviceType,
    description: e.description,
    url: `${BASE}/${e.slug}`,
    provider: { "@id": `${BASE}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Belgique" },
      { "@type": "City", name: "Bruxelles" },
    ],
    availableLanguage: ["fr", "nl", "en"],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: e.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumbs items={[{ label: e.name, href: `/${e.slug}` }]} />

      {/* ===== HERO ===== */}
      <header className="phead">
        <div className="eyebrow">{e.eyebrow}</div>
        <h1 className="title">
          {e.h1Pre}
          <span className="gradient-text">{e.h1Mark}</span>
          {e.h1Post || ""}
        </h1>
        <p>{e.intro}</p>
        <div className="cta-row" style={{ marginTop: 24 }}>
          <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">
            Réserver un appel de 20 min
          </a>
        </div>
      </header>

      {/* ===== MOCK IA (GEO uniquement) ===== */}
      {e.showAiMock && (
        <section className="psec" aria-hidden="true">
          <div className="mock" style={{ maxWidth: 560 }}>
            <div className="mhead">
              <span className="spark" /> Réponse générée par une IA
            </div>
            <div className="q">
              <b>Un client demande :</b> «&nbsp;Quelle est la meilleure solution pour [votre marché]&nbsp;?&nbsp;»
            </div>
            <div className="a">
              Pour ce besoin, les options les plus souvent recommandées sont{" "}
              <span className="cite">Concurrent&nbsp;A</span>, reconnu pour sa fiabilité, ainsi que{" "}
              <span className="cite">Concurrent&nbsp;B</span> et <span className="cite">Concurrent&nbsp;C</span>,
              fréquemment cités pour leur rapport qualité-prix.
            </div>
            <div className="tag">
              <span className="x">✕</span> Votre marque : non citée
            </div>
          </div>
        </section>
      )}

      {/* ===== PÉRIMÈTRE ===== */}
      <section className="block">
        <h2>{e.scopeTitle}</h2>
        <div className="cards">
          {e.scopeCards.map((c, i) => (
            <div className="card" key={c.title}>
              <div className="n">{String(i + 1).padStart(2, "0")}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PREUVE ===== */}
      <section className="block">
        <h2>{e.proofTitle}</h2>
        <p className="lead">{e.proofText}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {e.proofLinks.map((l) => (
            <Link key={l.href} href={l.href} className="btn btn-ghost">{l.label}</Link>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="block" id="faq">
        <h2>{e.faqTitle}</h2>
        {e.faq.map((f) => (
          <details key={f.q} style={{ borderBottom: "1px solid var(--line)", padding: "16px 0" }}>
            <summary style={{ fontFamily: "var(--heading)", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
              {f.q}
            </summary>
            <p style={{ marginTop: 10, lineHeight: 1.75, color: "var(--muted)" }}>{f.a}</p>
          </details>
        ))}
      </section>

      {/* ===== AUTRES EXPERTISES ===== */}
      <section className="block">
        <h2>Autres expertises</h2>
        <div className="cards">
          {related.map((r) => (
            <Link key={r.slug} href={`/${r.slug}`} className="card" style={{ textDecoration: "none" }}>
              <div className="n">&rarr;</div>
              <h3>{r.name}</h3>
              <p>{r.cardText}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="closer">
        <h2>Parlons-en, concrètement.</h2>
        <p>
          En 20 minutes, on regarde votre situation sur ce sujet précis : où vous en êtes, ce qui
          bloque, ce que ça vaudrait de le corriger. Sans préparation de votre côté, sans engagement.
        </p>
        <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">
          Réserver un appel
        </a>
      </section>
    </div>
  );
}
