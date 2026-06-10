import type { Metadata } from "next";
import Link from "next/link";
import { caseStudies } from "@/lib/case-studies";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: "Études de cas SEO et GEO",
  description:
    "Proximus, Parlement européen, Forbes BeLux : trois études de cas SEO, GEO et stratégie de contenu. Problème, solution déployée, résultats.",
  alternates: { canonical: "/etudes-de-cas" },
};

export default function EtudesDeCas() {
  return (
    <div className="wrap">
      <header className="phead">
        <div className="eyebrow">Études de cas</div>
        <h1 className="title">
          La preuve par <span className="gradient-text">le terrain</span>
        </h1>
        <p>
          Trois missions, trois échelles, trois contextes : un opérateur télécom national, une
          institution européenne, un média international. À chaque fois : problème, solution déployée,
          résultats.
        </p>
      </header>

      <section className="psec">
        <div className="cards">
          {caseStudies.map((c) => (
            <Link key={c.slug} href={`/etudes-de-cas/${c.slug}`} className="card" style={{ textDecoration: "none" }}>
              <div className="n">{c.client}</div>
              <h3>{c.title}</h3>
              <p>{c.sector} · {c.period}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="closer">
        <h2>Votre contexte est différent ? Tant mieux.</h2>
        <p>La méthode s&apos;adapte. En 20 minutes, on voit si elle s&apos;applique à votre situation.</p>
        <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">
          Réserver un appel
        </a>
      </section>
    </div>
  );
}
