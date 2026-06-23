import type { Metadata } from "next";
import { Breadcrumbs } from "@/lib/breadcrumbs";
import { profile } from "@/lib/data";
import {
  profileEn,
  experiencesEn,
  skillCategoriesEn,
  languagesEn,
  educationEn,
  sideProjectsEn,
} from "@/lib/data-en";
import { altMeta } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "About",
  description:
    "Professional background, skills and education of Romain De Ville, senior SEO, GEO and content strategy consultant in Brussels.",
  alternates: altMeta("/parcours", "/en/about", "en"),
  openGraph: {
    type: "website",
    siteName: "Romain De Ville",
    images: [{ url: "/og-en.png", width: 1200, height: 630, alt: "Romain De Ville — SEO, GEO & Content Strategy, Brussels" }],
 locale: "en_GB" },
};

export default function About() {
  return (
    <div className="wrap">
      <Breadcrumbs locale="en" items={[{ label: "About", href: "/en/about" }]} />

      {/* ===== HEADER ===== */}
      <header className="phead">
        <div className="eyebrow">About · {profile.city}</div>
        <h1 className="title">{profileEn.headline}</h1>
        <p>{profileEn.summary}</p>
      </header>

      {/* ===== EXPERIENCE ===== */}
      <section className="psec">
        <h2>Professional experience</h2>
        {experiencesEn.map((e) => (
          <div className="exp" key={e.company + e.period}>
            <div className="top">
              <div className="co">{e.company}</div>
              <div className="per">{e.period}</div>
            </div>
            <div className="ro">
              {e.role} <span className="tagf">· {e.tag}</span>
            </div>
            {e.highlight && <div className="highlight">{e.highlight}</div>}
            {e.location && <div className="highlight">{e.location}</div>}
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

      {/* ===== SKILLS ===== */}
      <section className="psec">
        <h2>Skills</h2>
        {skillCategoriesEn.map((cat) => (
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

      {/* ===== EDUCATION ===== */}
      <section className="psec">
        <h2>Education</h2>
        {educationEn.map((ed) => (
          <div className="edu" key={ed.diploma}>
            <div className="ed">{ed.diploma}</div>
            <div className="es">{ed.school}</div>
            <div className="ep">{ed.period}</div>
          </div>
        ))}
      </section>

      {/* ===== LANGUAGES ===== */}
      <section className="psec">
        <h2>Languages</h2>
        <div className="langs">
          {languagesEn.map((l) => (
            <div className="lang" key={l.name}>
              <div className="ln">{l.name}</div>
              <div className="ll">{l.level}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="psec">
        <h2>Projects</h2>
        <div className="proj">
          {sideProjectsEn.map((p) => (
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
          Book a call
        </a>
      </section>
    </div>
  );
}
