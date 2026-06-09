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
            GEO · Visibilité dans les réponses des IA
          </div>
          <h1 className="title">
            Quand vos clients interrogent une IA, qui apparaît :{" "}
            <span className="mark">vous</span>, ou vos
            concurrents&nbsp;?
          </h1>
          <p className="sub">
            J&apos;aide les marques à devenir des sources que ChatGPT,
            Perplexity et Gemini citent. Parce que la recherche se déplace, et
            que ce qui ne se voit pas dans Google Analytics se joue désormais
            ailleurs.
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

        {/* AI answer mock card */}
        <div className="mock" aria-hidden="true">
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

      {/* ===== SEO NE SUFFIT PLUS ===== */}
      <section className="block">
        <h2>Le SEO ne suffit plus. Place au GEO.</h2>
        <p className="lead">
          Vos prospects ne tapent plus seulement des mots-clés. Ils posent des
          questions à une IA et reçoivent une réponse déjà filtrée, avec
          quelques marques citées et toutes les autres absentes. Si vous
          n&apos;êtes pas dans la réponse, vous n&apos;existez pas dans la
          décision, et rien dans vos statistiques ne vous le signale.
        </p>
        <div className="cards">
          <div className="card">
            <div className="n">01</div>
            <h3>Un canal invisible</h3>
            <p>
              Les réponses des IA orientent les choix en amont de tout clic. Ce
              trafic perdu n&apos;apparaît nulle part dans Google Analytics.
            </p>
          </div>
          <div className="card">
            <div className="n">02</div>
            <h3>Le gagnant rafle tout</h3>
            <p>
              Une IA cite deux ou trois marques, pas dix. Être absent de cette
              short-list, c&apos;est sortir du jeu avant la comparaison.
            </p>
          </div>
          <div className="card">
            <div className="n">03</div>
            <h3>Une fenêtre ouverte</h3>
            <p>
              Le GEO en est à ses débuts. Les marques qui s&apos;y positionnent
              maintenant prennent une avance difficile à rattraper.
            </p>
          </div>
        </div>
      </section>

      {/* ===== AUDIT GEO ===== */}
      <section className="block" id="offre">
        <h2>L&apos;audit GEO</h2>
        <p className="lead">
          Un diagnostic concret de votre présence dans les réponses des IA,
          livré avec un plan d&apos;action priorisé. Pas de théorie : ce que les
          IA disent de vous aujourd&apos;hui, et comment en faire un levier.
        </p>
        <div className="cards">
          <div className="card">
            <div className="n">Test</div>
            <h3>Visibilité réelle</h3>
            <p>
              Je teste votre marque sur ChatGPT, Perplexity, Gemini et Google
              AI, sur les vraies questions de vos clients.
            </p>
          </div>
          <div className="card">
            <div className="n">Écart</div>
            <h3>Benchmark concurrents</h3>
            <p>
              Qui est cité à votre place, sur quelles requêtes, et pourquoi.
              L&apos;écart se mesure, il se corrige.
            </p>
          </div>
          <div className="card">
            <div className="n">Plan</div>
            <h3>Actions priorisées</h3>
            <p>
              Une feuille de route classée par impact, exploitable directement
              par votre équipe.
            </p>
          </div>
        </div>
      </section>

      {/* ===== POURQUOI MOI ===== */}
      <section className="block">
        <h2>Pourquoi moi</h2>
        <div className="why-grid">
          <div className="portrait-wrap">
            <Image
              src="/portrait.jpg"
              alt="Romain De Ville, consultant SEO et GEO à Bruxelles"
              width={280}
              height={280}
              className="portrait"
              priority={false}
            />
          </div>
          <div className="facts">
            <div className="fact">
              <div className="v">~10 ans</div>
              <div className="k">SEO, GEO et stratégie de contenu</div>
            </div>
            <div className="fact">
              <div className="v">220K+</div>
              <div className="k">Pages optimisées chez Proximus</div>
            </div>
            <div className="fact">
              <div className="v">FR · NL · EN</div>
              <div className="k">Contenu multilingue natif</div>
            </div>
            <div className="fact">
              <div className="v">Solo</div>
              <div className="k">Vous parlez à celui qui exécute</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ILS M'ONT FAIT CONFIANCE ===== */}
      <section className="block">
        <h2>Ils m&apos;ont fait confiance</h2>
        <div className="clients-row">
          {clients.map((c) => (
            <span className="client-tag" key={c}>
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ===== CLOSER ===== */}
      <section className="closer">
        <h2>Voyons où vous en êtes, en direct.</h2>
        <p>
          En 20 minutes, je teste votre visibilité IA pendant l&apos;appel et
          vous montre ce que voient vos clients. Sans préparation de votre côté,
          sans engagement.
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
