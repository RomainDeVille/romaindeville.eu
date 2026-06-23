import type { Metadata } from "next";
import { Breadcrumbs } from "@/lib/breadcrumbs";
import Link from "next/link";
import { caseStudiesEn } from "@/lib/case-studies-en";
import { profile } from "@/lib/data";
import { altMeta } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "SEO and GEO Case Studies",
  description:
    "Proximus, European Parliament, Forbes BeLux: case studies in SEO, GEO and content strategy. Problem, deployed solution, results.",
  alternates: altMeta("/etudes-de-cas", "/en/case-studies", "en"),
  openGraph: { locale: "en_GB" },
};

export default function CaseStudiesEn() {
  return (
    <div className="wrap">
      <Breadcrumbs locale="en" items={[{ label: "Case studies", href: "/en/case-studies" }]} />

      <header className="phead">
        <div className="eyebrow">Case studies</div>
        <h1 className="title">
          Proof from <span className="gradient-text">the field</span>
        </h1>
        <p>
          Several assignments, several scales, several contexts: a national telecom operator, a
          European institution, an international media. Each time: problem, deployed solution,
          results.
        </p>
      </header>

      <section className="psec">
        <div className="cards">
          {caseStudiesEn.map((c) => (
            <Link key={c.slug} href={`/en/case-studies/${c.slug}`} className="card" style={{ textDecoration: "none" }}>
              <div className="n">{c.client}</div>
              <h3>{c.title}</h3>
              <p>{c.sector} · {c.period}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="closer">
        <h2>Your context is different? All the better.</h2>
        <p>The method adapts. In 20 minutes, we see whether it applies to your situation.</p>
        <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">
          Book a call
        </a>
      </section>
    </div>
  );
}
