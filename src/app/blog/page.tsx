import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/lib/breadcrumbs";
import { profile } from "@/lib/data";
import { articles } from "@/lib/articles";
import { altMeta } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Blog SEO, GEO et visibilité IA",
  description:
    "Analyses et décryptages d'expert sur le SEO, le GEO (visibilité dans les réponses des IA), Google Ads et la stratégie de contenu. Par Romain De Ville, consultant à Bruxelles.",
  alternates: altMeta("/blog", "/blog", "fr"),
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Blog() {
  const sorted = [...articles].sort((a, b) => b.datePublished.localeCompare(a.datePublished));

  return (
    <div className="wrap">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

      <header className="phead">
        <div className="eyebrow">Blog · SEO, GEO & visibilité IA</div>
        <h1 className="title">
          Décrypter la recherche, <span className="gradient-text">de Google aux IA</span>
        </h1>
        <p>
          Des analyses d'expert sur ce qui bouge vraiment en SEO, en GEO et dans les moteurs
          d'IA — sans jargon décoratif, avec ce que ça change concrètement pour votre visibilité.
        </p>
      </header>

      <section className="psec">
        <div className="cards">
          {sorted.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="card" style={{ textDecoration: "none" }}>
              <div className="n">{formatDate(a.datePublished)}</div>
              <h3>{a.h1}</h3>
              <p>{a.excerpt} Lire &rarr;</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="closer">
        <h2>Un sujet précis à creuser pour votre marque ?</h2>
        <p>En 20 minutes, on regarde votre visibilité — dans Google comme dans les réponses des IA — et ce qui aurait le plus d'impact.</p>
        <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">
          Réserver un appel
        </a>
      </section>
    </div>
  );
}
