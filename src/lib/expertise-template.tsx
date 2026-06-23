import Link from "next/link";
import { Breadcrumbs } from "@/lib/breadcrumbs";
import { profile } from "@/lib/data";
import { EXPERTISES, type Expertise } from "@/lib/expertises";
import { EXPERTISES_EN } from "@/lib/expertises-en";
import { ui, type Locale } from "@/lib/i18n";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://romaindeville.eu";

export function ExpertisePage({ e, locale = "fr" }: { e: Expertise; locale?: Locale }) {
  const t = ui[locale];
  const pool = locale === "en" ? EXPERTISES_EN : EXPERTISES;
  const prefix = locale === "en" ? "/en" : "";

  const related = e.related
    .map((slug) => pool.find((x) => x.slug === slug))
    .filter((x): x is Expertise => !!x);

  const pageUrl = `${BASE}${prefix}/${e.slug}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: e.name,
    serviceType: e.serviceType,
    description: e.description,
    url: pageUrl,
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
    inLanguage: locale === "en" ? "en" : "fr-BE",
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
      <Breadcrumbs locale={locale} items={[{ label: e.name, href: `${prefix}/${e.slug}` }]} />

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
            {t.tplBook20}
          </a>
        </div>
      </header>

      {e.showAiMock && (
        <section className="psec" aria-hidden="true">
          <div className="mock" style={{ maxWidth: 560 }}>
            <div className="mhead">
              <span className="spark" /> {t.tplAiHead}
            </div>
            <div className="q">
              <b>{t.tplAiAsks}</b> {t.tplAiQuestion}
            </div>
            <div className="a">
              {t.tplAiAnswerPre}
              <span className="cite">Concurrent&nbsp;A</span>{t.tplAiAnswerMid}
              <span className="cite">Concurrent&nbsp;B</span> & <span className="cite">Concurrent&nbsp;C</span>
              {t.tplAiAnswerEnd}
            </div>
            <div className="tag">
              <span className="x">&#10005;</span> {t.tplAiTag}
            </div>
          </div>
        </section>
      )}

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

      <section className="block">
        <h2>{e.proofTitle}</h2>
        <p className="lead">{e.proofText}</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {e.proofLinks.map((l) => (
            <Link key={l.href} href={l.href} className="btn btn-ghost">{l.label}</Link>
          ))}
        </div>
      </section>

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

      <section className="block">
        <h2>{t.tplOther}</h2>
        <div className="cards">
          {related.map((r) => (
            <Link key={r.slug} href={`${prefix}/${r.slug}`} className="card" style={{ textDecoration: "none" }}>
              <div className="n">&rarr;</div>
              <h3>{r.name}</h3>
              <p>{r.cardText}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="closer">
        <h2>{t.tplCloserTitle}</h2>
        <p>{t.tplCloserText}</p>
        <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">
          {t.tplCloserBtn}
        </a>
      </section>
    </div>
  );
}
