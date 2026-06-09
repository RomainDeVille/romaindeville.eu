import type { Metadata } from "next";
import {
  profile,
  experiences,
  skillCategories,
  languages,
  education,
  sideProjects,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Parcours",
  description:
    "Parcours professionnel, compétences et formation de Romain De Ville, consultant senior SEO, GEO et stratégie de contenu à Bruxelles.",
  alternates: { canonical: "/parcours" },
};

export default function Parcours() {
  return (
    <div className="wrap">
      {/* ===== HEADER ===== */}
      <header className="phead">
        <div className="eyebrow">Parcours · {profile.city}</div>
        <h1 className="title">{profile.headline}</h1>
        <p>{profile.summary}</p>
      </header>

      {/* ===== EXPÉRIENCES ===== */}
      <section className="psec">
        <h2>Expérience professionnelle</h2>
        {experiences.map((e) => (
          <div className="exp" key={e.company + e.period}>
            <div className="top">
              <div className="co">{e.company}</div>
              <div className="per">{e.period}</div>
            </div>
            <div className="ro">
              {e.role} <span className="tagf">· {e.tag}</span>
            </div>
            {e.highlight && (
              <div className="highlight">{e.highlight}</div>
            )}
            {e.location && (
              <div className="highlight">{e.location}</div>
            )}
            {e.points.length > 0 && (
              <ul>
                {e.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* ===== COMPÉTENCES ===== */}
      <section className="psec">
        <h2>Compétences</h2>
        {skillCategories.map((cat) => (
          <div className="skill-group" key={cat.name}>
            <div className="skill-group-name">{cat.name}</div>
            <div className="chips">
              {cat.items.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ===== FORMATION ===== */}
      <section className="psec">
        <h2>Formation</h2>
        {education.map((ed) => (
          <div className="edu" key={ed.diploma}>
            <div className="ed">{ed.diploma}</div>
            <div className="es">{ed.school}</div>
            <div className="ep">{ed.period}</div>
          </div>
        ))}
      </section>

      {/* ===== LANGUES ===== */}
      <section className="psec">
        <h2>Langues</h2>
        <div className="langs">
          {languages.map((l) => (
            <div className="lang" key={l.name}>
              <div className="ln">{l.name}</div>
              <div className="ll">{l.level}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROJETS ===== */}
      <section className="psec">
        <h2>Projets</h2>
        <div className="proj">
          {sideProjects.map((p) => (
            <div className="p" key={p.name}>
              <div className="pn">{p.name}</div>
              <div className="pd">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="psec" style={{ textAlign: "center", paddingBottom: 64 }}>
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
