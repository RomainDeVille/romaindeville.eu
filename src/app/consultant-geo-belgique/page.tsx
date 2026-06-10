import type { Metadata } from "next";
import { Breadcrumbs } from "@/lib/breadcrumbs";
import Link from "next/link";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Consultant GEO Belgique : visibilité dans les réponses des IA",
  description:
    "Consultant GEO en Belgique : faites de votre marque une source que ChatGPT, Perplexity, Gemini et Google AI Overviews citent. Audit de visibilité IA et plan d'action priorisé. Bruxelles, FR/NL/EN.",
  alternates: { canonical: "/consultant-geo-belgique" },
};

const faq = [
  {
    q: "C'est quoi, un consultant GEO ?",
    a: "Le GEO (Generative Engine Optimization) consiste a rendre une marque visible dans les reponses generees par les IA : ChatGPT, Perplexity, Gemini, Google AI Overviews. Un consultant GEO audite ce que ces moteurs disent de vous, identifie pourquoi vos concurrents sont cites a votre place, et met en place les contenus, donnees structurees et signaux d'autorite qui font de votre site une source citee.",
  },
  {
    q: "Quelle est la difference entre SEO et GEO ?",
    a: "Le SEO vise le classement de vos pages dans les resultats de recherche. Le GEO vise la citation de votre marque dans les reponses des IA. Les deux se renforcent : un bon socle SEO technique est un prerequis du GEO, mais le GEO ajoute des leviers specifiques comme les donnees structurees Schema.org, le fichier llms.txt, l'acces des crawlers IA et des contenus formules en reponses directes.",
  },
  {
    q: "Comment se passe un audit GEO ?",
    a: "Trois etapes : je teste votre visibilite reelle sur ChatGPT, Perplexity, Gemini et Google AI sur les vraies questions de vos clients, je compare avec vos concurrents pour identifier qui est cite et pourquoi, puis je livre une feuille de route classee par impact, directement exploitable par votre equipe.",
  },
  {
    q: "Travaillez-vous partout en Belgique ?",
    a: "Oui. Je suis base a Bruxelles et j'interviens dans toute la Belgique, sur site ou a distance, en francais, neerlandais et anglais. J'accompagne aussi des clients en France et ailleurs en Europe en remote.",
  },
  {
    q: "Quels resultats peut-on attendre, et en combien de temps ?",
    a: "Les premiers signaux (citations dans les reponses IA, trafic referent depuis les moteurs generatifs) apparaissent generalement en quelques semaines a quelques mois selon votre autorite de depart. Le GEO est une discipline recente : les marques qui s'y positionnent maintenant prennent une avance mesurable sur leur marche. Je ne promets jamais de resultat chiffre a l'avance, je mesure avant et apres.",
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
  "@id": "https://romaindeville.eu/consultant-geo-belgique#service",
  name: "Consultance GEO (Generative Engine Optimization)",
  serviceType: "Generative Engine Optimization",
  description:
    "Audit de visibilite dans les reponses des IA, benchmark concurrents et feuille de route priorisee pour devenir une source citee par ChatGPT, Perplexity, Gemini et Google AI Overviews.",
  url: "https://romaindeville.eu/consultant-geo-belgique",
  provider: { "@id": "https://romaindeville.eu/#organization" },
  areaServed: [
    { "@type": "Country", name: "Belgique" },
    { "@type": "City", name: "Bruxelles" },
  ],
  availableLanguage: ["fr", "nl", "en"],
};

export default function ConsultantGeoBelgique() {
  return (
    <div className="wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Consultant GEO Belgique", href: "/consultant-geo-belgique" }]} />

      <header className="phead">
        <div className="eyebrow">Consultant GEO · Belgique · Bruxelles</div>
        <h1 className="title">
          Consultant GEO en Belgique : quand vos clients interrogent une IA,
          qui apparaît : <span className="gradient-text">vous, ou vos concurrents</span>&nbsp;?
        </h1>
        <p>
          J&apos;aide les marques à devenir des sources que ChatGPT, Perplexity et Gemini citent.
          Parce que la recherche se déplace, et que ce qui ne se voit pas dans Google Analytics se
          joue désormais ailleurs.
        </p>
        <div className="cta-row" style={{ marginTop: 24 }}>
          <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">
            Réserver un appel de 20 min
          </a>
        </div>
      </header>

      {/* AI answer mock card */}
      <section className="psec" aria-hidden="true">
        <div className="mock" style={{ maxWidth: 560 }}>
          <div className="mhead">
            <span className="spark" /> Réponse générée par une IA
          </div>
          <div className="q">
            <b>Un client demande :</b> «&nbsp;Quelle est la meilleure solution
            pour [votre marché]&nbsp;?&nbsp;»
          </div>
          <div className="a">
            Pour ce besoin, les options les plus souvent recommandées sont{" "}
            <span className="cite">Concurrent&nbsp;A</span>, reconnu pour sa
            fiabilité, ainsi que{" "}
            <span className="cite">Concurrent&nbsp;B</span> et{" "}
            <span className="cite">Concurrent&nbsp;C</span>, fréquemment cités
            pour leur rapport qualité-prix.
          </div>
          <div className="tag">
            <span className="x">✕</span> Votre marque : non citée
          </div>
        </div>
      </section>

      <section className="block">
        <h2>Le SEO ne suffit plus. Place au <span className="gradient-text">GEO</span>.</h2>
        <p className="lead">
          Vos prospects ne tapent plus seulement des mots-clés. Ils posent des questions à une IA et
          reçoivent une réponse déjà filtrée, avec quelques marques citées et toutes les autres
          absentes. Si vous n&apos;êtes pas dans la réponse, vous n&apos;existez pas dans la décision.
        </p>
        <div className="cards">
          <div className="card">
            <div className="n">01</div>
            <h3>Un canal invisible</h3>
            <p>
              Les réponses des IA orientent les choix en amont de tout clic. Ce trafic perdu
              n&apos;apparaît nulle part dans Google Analytics.
            </p>
          </div>
          <div className="card">
            <div className="n">02</div>
            <h3>Le gagnant rafle tout</h3>
            <p>
              Une IA cite deux ou trois marques, pas dix. Être absent de cette short-list,
              c&apos;est sortir du jeu avant la comparaison.
            </p>
          </div>
          <div className="card">
            <div className="n">03</div>
            <h3>Une fenêtre ouverte</h3>
            <p>
              Le GEO en est à ses débuts. Les marques qui s&apos;y positionnent maintenant prennent
              une avance difficile à rattraper.
            </p>
          </div>
        </div>
      </section>

      <section className="block" id="offre">
        <h2>L&apos;audit <span className="gradient-text">GEO</span></h2>
        <p className="lead">
          Un diagnostic concret de votre présence dans les réponses des IA, livré avec un plan
          d&apos;action priorisé. Pas de théorie : ce que les IA disent de vous aujourd&apos;hui, et
          comment en faire un levier.
        </p>
        <div className="timeline">
          <div className="step">
            <div className="step-dot">🔍</div>
            <div className="step-content">
              <div className="step-label">Étape 1</div>
              <h3>Visibilité réelle</h3>
              <p>
                Je teste votre marque sur ChatGPT, Perplexity, Gemini et Google AI, sur les vraies
                questions de vos clients.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-dot">🎯</div>
            <div className="step-content">
              <div className="step-label">Étape 2</div>
              <h3>Benchmark concurrents</h3>
              <p>
                Qui est cité à votre place, sur quelles requêtes, et pourquoi. L&apos;écart se
                mesure, il se corrige.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-dot">📋</div>
            <div className="step-content">
              <div className="step-label">Étape 3</div>
              <h3>Actions priorisées</h3>
              <p>
                Une feuille de route classée par impact, exploitable directement par votre équipe.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="block">
        <h2>Déployé en entreprise, pas en théorie</h2>
        <p className="lead">
          Framework GEO de 10 tactiques et outil interne développés en mission chez Proximus, sur un
          écosystème de plus de 220&nbsp;000 pages en trois langues.{" "}
          <Link href="/etudes-de-cas/proximus" style={{ color: "var(--accent)" }}>Lire l&apos;étude de cas</Link>.
        </p>
      </section>

      <section className="block" id="faq">
        <h2>Questions fréquentes</h2>
        {faq.map((f) => (
          <details key={f.q} style={{ borderBottom: "1px solid var(--line)", padding: "16px 0" }}>
            <summary style={{ fontFamily: "var(--heading)", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
              {f.q}
            </summary>
            <p style={{ marginTop: 10, lineHeight: 1.75, color: "var(--muted)" }}>{f.a}</p>
          </details>
        ))}
      </section>

      <section className="block">
        <h2>Autres expertises</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/consultant-seo-bruxelles" className="btn btn-ghost">Consultant SEO Bruxelles</Link>
          <Link href="/strategie-contenu-b2b" className="btn btn-ghost">Stratégie de contenu B2B</Link>
          <Link href="/etudes-de-cas" className="btn btn-ghost">Études de cas</Link>
        </div>
      </section>

      <section className="closer">
        <h2>Voyons où vous en êtes, en direct.</h2>
        <p>
          En 20 minutes, je teste votre visibilité IA pendant l&apos;appel et vous montre ce que
          voient vos clients. Sans préparation de votre côté, sans engagement.
        </p>
        <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">
          Réserver un appel
        </a>
      </section>
    </div>
  );
}
