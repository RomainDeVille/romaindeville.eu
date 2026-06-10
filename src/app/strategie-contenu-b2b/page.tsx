import type { Metadata } from "next";
import { Breadcrumbs } from "@/lib/breadcrumbs";
import Link from "next/link";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Stratégie de contenu B2B : nourrir Google et les moteurs d'IA",
  description:
    "Stratégie de contenu B2B multilingue : piliers éditoriaux, workflows de rédaction, playbooks SEO et formation des équipes. Du contenu qui se positionne dans Google et se fait citer par les IA.",
  alternates: { canonical: "/strategie-contenu-b2b" },
};


const faq = [
  {
    q: "Par ou commence une strategie de contenu B2B ?",
    a: "Par vos clients, pas par un calendrier editorial. On identifie les questions qu'ils posent a chaque etape de leur decision, on les regroupe en piliers, puis on construit l'architecture de contenus qui y repond. Le calendrier vient en dernier : c'est un outil d'execution, pas une strategie.",
  },
  {
    q: "Ecrire pour les IA, c'est different d'ecrire pour Google ?",
    a: "Les fondamentaux se recouvrent : repondre clairement a une intention, structurer, sourcer. Mais les moteurs generatifs ont leurs preferences mesurables : reponses directes en debut de section, formats question-reponse, donnees verifiables, signaux d'autorite explicites. J'integre ces criteres aux guidelines de redaction.",
  },
  {
    q: "Formez-vous nos equipes ou produisez-vous le contenu ?",
    a: "Les deux selon le besoin, avec une preference assumee pour la formation : playbooks sur mesure, ateliers avec les redacteurs, relectures accompagnees. L'objectif est que la qualite ne dépende plus de ma presence. C'est la methode deployee chez Forbes BeLux et en environnement telecom.",
  },
  {
    q: "Gerez-vous le contenu multilingue FR, NL, EN ?",
    a: "Oui, c'est meme un coeur de metier : architecture par langue, recherche de mots-cles par marche, coordination des redactions et gestion de la cannibalisation entre versions linguistiques.",
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
  "@id": "https://romaindeville.eu/strategie-contenu-b2b#service",
  name: "Stratégie de contenu B2B et formation des équipes",
  serviceType: "Content Strategy",
  description:
    "Piliers éditoriaux, architecture pilier/cluster, workflows de rédaction, playbooks SEO et formation des journalistes et équipes marketing. Contenu multilingue FR/NL/EN conçu pour Google et les moteurs d'IA.",
  url: "https://romaindeville.eu/strategie-contenu-b2b",
  provider: { "@id": "https://romaindeville.eu/#organization" },
  areaServed: [
    { "@type": "Country", name: "Belgique" },
    { "@type": "City", name: "Bruxelles" },
  ],
  availableLanguage: ["fr", "nl", "en"],
};

export default function StrategieContenuB2B() {
  return (
    <div className="wrap">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <Breadcrumbs items={[{ label: "Stratégie de contenu B2B", href: "/strategie-contenu-b2b" }]} />

      <header className="phead">
        <div className="eyebrow">Stratégie de contenu · B2B · FR, NL, EN</div>
        <h1 className="title">
          Du contenu qui se positionne dans Google <span className="gradient-text">et se fait citer par les IA</span>
        </h1>
        <p>
          Un même contenu alimente désormais deux canaux : les résultats de recherche classiques et les
          réponses générées par ChatGPT, Perplexity ou Google AI Overviews. Je conçois des stratégies
          éditoriales qui servent les deux, et je forme vos équipes à les faire vivre.
        </p>
      </header>

      <section className="block">
        <h2>Comment je structure une stratégie de contenu</h2>
        <div className="cards">
          <div className="card">
            <div className="n">01</div>
            <h3>Piliers et clusters</h3>
            <p>
              Définition des piliers éditoriaux alignés sur votre business, architecture pilier/cluster,
              maillage interne. Chaque contenu a une place, une cible et un rôle. Fini les blogs qui
              publient dans le vide.
            </p>
          </div>
          <div className="card">
            <div className="n">02</div>
            <h3>Workflows de rédaction</h3>
            <p>
              Calendriers, briefs, circuits de validation, intégration du SEO en amont de l&apos;écriture
              plutôt qu&apos;en correction après coup. Déployé au sein de rédactions réelles, dont le
              lancement éditorial complet de Forbes BeLux.
            </p>
          </div>
          <div className="card">
            <div className="n">03</div>
            <h3>Écriture pour les moteurs d&apos;IA</h3>
            <p>
              Réponses directes, structuration en questions, données vérifiables, E-E-A-T : les contenus
              que les moteurs génératifs citent ont des caractéristiques mesurables. Je les intègre à vos
              guidelines. Voir aussi{" "}
              <Link href="/consultant-geo-belgique" style={{ color: "var(--accent)" }}>l&apos;offre GEO</Link>.
            </p>
          </div>
          <div className="card">
            <div className="n">04</div>
            <h3>Formation et playbooks</h3>
            <p>
              Playbooks SEO sur mesure, formation des journalistes et équipes marketing au search intent
              et aux bonnes pratiques. L&apos;objectif : que la qualité ne dépende plus de ma présence.
            </p>
          </div>
        </div>
      </section>

      <section className="block">
        <h2>Le multilingue comme terrain de jeu</h2>
        <p className="lead">
          FR, NL, EN : en Belgique, une stratégie de contenu sérieuse est multilingue ou elle n&apos;est
          pas. J&apos;ai coordonné des contenus trilingues pour Proximus et Forbes BeLux : architecture
          par langue, recherche de mots-clés par marché, gestion de la cannibalisation entre versions.{" "}
          <Link href="/etudes-de-cas" style={{ color: "var(--accent)" }}>Les études de cas détaillent la méthode</Link>.
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

      <section className="block">
        <h2>Autres expertises</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/consultant-geo-belgique" className="btn btn-ghost">Consultant GEO Belgique</Link>
          <Link href="/consultant-seo-bruxelles" className="btn btn-ghost">Consultant SEO Bruxelles</Link>
          <Link href="/etudes-de-cas" className="btn btn-ghost">Études de cas</Link>
        </div>
      </section>

      <section className="closer">
        <h2>Votre contenu mérite un plan.</h2>
        <p>
          En 20 minutes, on regarde ce que vous publiez, qui le lit, et ce qui manque pour que Google et
          les IA s&apos;y réfèrent. Sans engagement.
        </p>
        <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">
          Réserver un appel de 20 min
        </a>
      </section>
    </div>
  );
}
