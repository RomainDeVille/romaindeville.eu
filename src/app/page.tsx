import Link from "next/link";
import Image from "next/image";
import { profile, clients } from "@/lib/data";

export default function Home() {
  return (
    <div className="wrap">
      {/* ===== HERO ===== */}
      <section className="hero">
        <div>
          <div className="eyebrow">
            Consultant senior · Bruxelles · FR, NL, EN
          </div>
          <h1 className="title">
            Être trouvé, choisi et cité :{" "}
            <span className="mark gradient-text">dans Google comme dans les réponses des IA</span>.
          </h1>
          <p className="sub">
            Depuis 10 ans, j&apos;aide médias, institutions et entreprises à
            construire une visibilité qui dure : SEO technique et éditorial,
            visibilité dans les moteurs d&apos;IA (GEO), acquisition et
            stratégie de contenu. En installant dans vos équipes une culture
            qui reste après mon départ.
          </p>
          <div className="cta-row">
            <a
              className="btn btn-primary"
              href={profile.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              Réserver un appel de 20 min
            </a>
            <Link className="btn btn-ghost" href="/parcours">
              Mon parcours
            </Link>
          </div>
        </div>

        <div className="facts" aria-label="Chiffres cles">
          <div className="fact">
            <div className="v">~10 ans</div>
            <div className="k">SEO, GEO et stratégie de contenu</div>
          </div>
          <div className="fact">
            <div className="v">220K+</div>
            <div className="k">Pages optimisées en missions clients</div>
          </div>
          <div className="fact">
            <div className="v">FR · NL · EN</div>
            <div className="k">Stratégies multilingues de bout en bout</div>
          </div>
          <div className="fact">
            <div className="v">Solo</div>
            <div className="k">Vous parlez à celui qui exécute</div>
          </div>
        </div>
      </section>

      {/* ===== EXPERTISES ===== */}
      <section className="block" id="expertises">
        <h2>Quatre expertises, <span className="gradient-text">une seule logique</span> : la visibilité qui convertit.</h2>
        <p className="lead">
          La découvrabilité ne se découpe pas en silos. Un contenu bien classé
          mais lent perd son trafic, un site rapide mais absent des réponses
          des IA perd la décision. Je travaille les quatre leviers ensemble.
        </p>
        <div className="cards">
          <Link href="/consultant-seo-bruxelles" className="card" style={{ textDecoration: "none" }}>
            <div className="n">01</div>
            <h3>SEO technique et éditorial</h3>
            <p>
              Audits techniques, architecture pilier/cluster, métadonnées,
              maillage interne, Core Web Vitals, news SEO. Du code à la
              rédaction, sur des écosystèmes jusqu&apos;à 220&nbsp;000 pages.
              Découvrir &rarr;
            </p>
          </Link>
          <Link href="/consultant-geo-belgique" className="card" style={{ textDecoration: "none" }}>
            <div className="n">02</div>
            <h3>GEO : visibilité dans les IA</h3>
            <p>
              Faire de votre marque une source que ChatGPT, Perplexity, Gemini
              et AI Overviews citent. Framework de 10 tactiques, audit dédié et
              feuille de route. Découvrir l&apos;offre GEO &rarr;
            </p>
          </Link>
          <div className="card">
            <div className="n">03</div>
            <h3>Acquisition et CRO</h3>
            <p>
              Google Ads, Meta Ads, A/B testing et optimisation de funnel.
              L&apos;objectif n&apos;est jamais le trafic : c&apos;est le coût
              par lead et la conversion.
            </p>
          </div>
          <Link href="/strategie-contenu-b2b" className="card" style={{ textDecoration: "none" }}>
            <div className="n">04</div>
            <h3>Stratégie de contenu et formation</h3>
            <p>
              Lancements éditoriaux, piliers de contenu, workflows de
              rédaction, playbooks SEO et formation des journalistes et
              équipes marketing. Une culture qui reste. Découvrir &rarr;
            </p>
          </Link>
        </div>
      </section>

      {/* ===== MÉTHODE ===== */}
      <section className="block" id="methode">
        <h2>Comment je travaille</h2>
        <p className="lead">
          Pas de rapport de 80 pages qui dort dans un tiroir. Un diagnostic
          chiffré, des priorités claires, et une exécution menée avec vos
          équipes.
        </p>
        <div className="timeline">
          <div className="step">
            <div className="step-dot">🔍</div>
            <div className="step-content">
              <div className="step-label">Étape 1</div>
              <h3>Diagnostic chiffré</h3>
              <p>
                Audit de l&apos;existant sur les leviers concernés : données
                réelles, benchmark concurrents, constats vérifiables. Vous
                savez exactement où vous en êtes.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-dot">🎯</div>
            <div className="step-content">
              <div className="step-label">Étape 2</div>
              <h3>Feuille de route priorisée</h3>
              <p>
                Chaque action classée par impact et par effort, avec un
                résultat attendu mesurable. Votre équipe peut commencer le
                lendemain.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-dot">🤝</div>
            <div className="step-content">
              <div className="step-label">Étape 3</div>
              <h3>Exécution et transfert</h3>
              <p>
                J&apos;exécute avec vos équipes, je forme, je documente. La
                pédagogie fait partie de la mission : vous devenez autonomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RÉFÉRENCES ===== */}
      <section className="block">
        <h2>Ils m&apos;ont fait confiance</h2>
        <p className="lead">
          Opérateur télécom national, institution européenne, média
          international, e-commerce : des contextes différents, la même
          exigence.
        </p>
        <div className="clients-row">
          {clients.map((c) => (
            <span className="client-tag" key={c}>
              {c}
            </span>
          ))}
        </div>
        <p style={{ marginTop: 20 }}>
          <Link href="/etudes-de-cas" className="btn btn-ghost">Lire les études de cas &rarr;</Link>
        </p>
      </section>

      {/* ===== QUI JE SUIS ===== */}
      <section className="block">
        <h2>Qui je suis</h2>
        <div className="why-grid">
          <div className="portrait-wrap">
            <Image
              src="/portrait.jpg"
              alt="Romain De Ville, consultant SEO, GEO et stratégie de contenu à Bruxelles"
              width={280}
              height={280}
              className="portrait"
              priority={false}
            />
          </div>
          <div>
            <p className="lead" style={{ marginBottom: 16 }}>
              Romain De Ville, consultant senior SEO, GEO et stratégie de
              contenu, basé à Bruxelles. J&apos;interviens en français,
              néerlandais et anglais, dans les rédactions comme auprès des
              équipes produit et marketing.
            </p>
            <p className="lead" style={{ marginBottom: 24 }}>
              Mon parti pris : intégrer les enjeux de visibilité en amont des
              projets plutôt que de les corriger après coup, et transmettre la
              méthode plutôt que de créer de la dépendance.
            </p>
            <Link className="btn btn-ghost" href="/parcours">
              Voir mon parcours complet
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CLOSER ===== */}
      <section className="closer">
        <h2>Parlons de votre visibilité.</h2>
        <p>
          En 20 minutes, on regarde ensemble où vous en êtes : positions
          Google, présence dans les réponses des IA, points de friction. Sans
          préparation de votre côté, sans engagement.
        </p>
        <a
          className="btn btn-primary"
          href={profile.calendly}
          target="_blank"
          rel="noopener noreferrer"
        >
          Réserver un appel
        </a>
      </section>
    </div>
  );
}
