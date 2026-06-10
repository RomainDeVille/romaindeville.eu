import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Stratégie de contenu B2B : nourrir Google et les moteurs d'IA",
  description:
    "Stratégie de contenu B2B multilingue : piliers éditoriaux, workflows de rédaction, playbooks SEO et formation des équipes. Du contenu qui se positionne dans Google et se fait citer par les IA.",
  alternates: { canonical: "/strategie-contenu-b2b" },
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
