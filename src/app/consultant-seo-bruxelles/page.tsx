import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Consultant SEO Bruxelles : SEO technique et éditorial B2B",
  description:
    "Consultant SEO senior à Bruxelles : audits techniques, architecture pilier/cluster, Core Web Vitals, news SEO et stratégies multilingues FR/NL/EN pour entreprises, médias et institutions.",
  alternates: { canonical: "/consultant-seo-bruxelles" },
};

const faq = [
  {
    q: "Intervenez-vous sur site a Bruxelles ou a distance ?",
    a: "Les deux. Je suis base a Bruxelles et je me deplace chez les clients belges quand la mission le demande : ateliers, formations, comites editoriaux. Le reste du travail se fait a distance, avec des points reguliers. Pour les clients hors Belgique, je travaille entierement en remote.",
  },
  {
    q: "Quelle difference entre un consultant SEO independant et une agence ?",
    a: "Vous parlez a celui qui execute. Pas de chef de projet intermediaire, pas de junior qui apprend sur votre budget. J'interviens sur les quatre dimensions du SEO (technique, editorial, data, performance) et je forme vos equipes pour que la competence reste chez vous apres la mission.",
  },
  {
    q: "Travaillez-vous en neerlandais et en anglais ?",
    a: "Oui. J'ai pilote des strategies SEO multilingues FR, NL et EN pour Proximus et Forbes BeLux : architecture des contenus par langue, coordination des redactions, gestion de la cannibalisation entre versions linguistiques.",
  },
  {
    q: "Sur quels types de sites avez-vous travaille ?",
    a: "Des ecosystemes de plus de 220 000 pages (telecom), des sites institutionnels (Parlement europeen), des medias (Forbes BeLux), des e-commerces multi-marques et des sites corporate B2B. La methode s'adapte, l'exigence reste la meme.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://romaindeville.eu/consultant-seo-bruxelles#service",
  name: "Consultance SEO technique et éditoriale",
  serviceType: "Search Engine Optimization",
  description:
    "Audits SEO techniques, architecture pilier/cluster, métadonnées, Core Web Vitals, news SEO et stratégies multilingues pour entreprises et institutions, à Bruxelles et en remote.",
  url: "https://romaindeville.eu/consultant-seo-bruxelles",
  provider: { "@id": "https://romaindeville.eu/#organization" },
  areaServed: [
    { "@type": "City", name: "Bruxelles" },
    { "@type": "Country", name: "Belgique" },
  ],
  availableLanguage: ["fr", "nl", "en"],
};

export default function ConsultantSeoBruxelles() {
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <header className="phead">
        <div className="eyebrow">Consultant SEO · Bruxelles · FR, NL, EN</div>
        <h1 className="title">
          Consultant SEO à Bruxelles pour <span className="gradient-text">marques, médias et institutions</span>
        </h1>
        <p>
          Dix ans de référencement naturel sur ses quatre dimensions : technique, éditorial, data et
          performance. Des écosystèmes de 220&nbsp;000 pages aux lancements de médias, en français,
          néerlandais et anglais.
        </p>
      </header>

      <section className="block">
        <h2>Ce que je prends en charge</h2>
        <div className="cards">
          <div className="card">
            <div className="n">01</div>
            <h3>SEO technique</h3>
            <p>
              Audits complets, Core Web Vitals, indexation, migrations, architecture de métadonnées,
              schema markup, qualité des mises en production. Le socle sans lequel le contenu ne porte pas.
            </p>
          </div>
          <div className="card">
            <div className="n">02</div>
            <h3>SEO éditorial</h3>
            <p>
              Architecture pilier/cluster, SEO sémantique, search intent, E-E-A-T, news SEO. J&apos;ai
              forme des rédactions entières, de Forbes BeLux aux équipes de contenu télécom.
            </p>
          </div>
          <div className="card">
            <div className="n">03</div>
            <h3>SEO multilingue</h3>
            <p>
              Stratégies FR, NL et EN coordonnées : architecture par langue, gestion de la cannibalisation
              entre versions, coordination des rédactions et agences. Une réalité belge que peu maîtrisent.
            </p>
          </div>
          <div className="card">
            <div className="n">04</div>
            <h3>Data et reporting</h3>
            <p>
              Search Console, GA4, Adobe Analytics, Contentsquare, Semrush. Des dashboards et rapports
              exécutifs qui transforment les données en décisions, pas en slides décoratives.
            </p>
          </div>
        </div>
      </section>

      <section className="block">
        <h2>Des références qui engagent</h2>
        <p className="lead">
          Structuration sémantique d&apos;un écosystème de plus de 220&nbsp;000 pages chez Proximus,
          optimisation de l&apos;expérience de recherche au Parlement européen, lancement éditorial et
          SEO de Forbes BeLux. Trois contextes, trois échelles, la même méthode :{" "}
          <Link href="/etudes-de-cas" style={{ color: "var(--accent)" }}>voir les études de cas</Link>.
        </p>
      </section>

      <section className="block" id="faq">
        <h2>Questions fréquentes</h2>
        {faq.map((f) => (
          <details key={f.q} style={{ borderBottom: "1px solid var(--line)", padding: "16px 0" }}>
            <summary style={{ fontFamily: "var(--heading)", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>{f.q}</summary>
            <p style={{ marginTop: 10, lineHeight: 1.75, color: "var(--muted)" }}>{f.a}</p>
          </details>
        ))}
      </section>

      <section className="closer">
        <h2>Parlons de votre référencement.</h2>
        <p>
          En 20 minutes, on regarde vos positions actuelles, vos concurrents et vos marges de progression.
          Sans préparation de votre côté, sans engagement.
        </p>
        <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">
          Réserver un appel de 20 min
        </a>
      </section>
    </div>
  );
}
