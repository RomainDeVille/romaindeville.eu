import type { Metadata } from "next";
import { altMeta } from "@/lib/i18n";
import Link from "next/link";
import { Breadcrumbs } from "@/lib/breadcrumbs";
import { caseStudies } from "@/lib/case-studies";
import { articles } from "@/lib/articles";
import { CORE_EXPERTISES, EXPERTISES } from "@/lib/expertises";

export const metadata: Metadata = {
  title: "Plan du site",
  description:
    "Toutes les pages de romaindeville.eu : expertises SEO, GEO et stratégie de contenu, études de cas et parcours.",
  alternates: altMeta("/plan-du-site", "/en/site-map", "fr"),
};

const groups = [
  {
    name: "Expertises",
    links: CORE_EXPERTISES.map((e) => ({ label: e.name, href: `/${e.slug}` })),
  },
  {
    name: "Google Ads par secteur et par ville",
    links: EXPERTISES.filter((e) => e.landing).map((e) => ({ label: e.name, href: `/${e.slug}` })),
  },
  {
    name: "Blog",
    links: [
      { label: "Tous les articles", href: "/blog" },
      ...articles.map((a) => ({ label: a.h1, href: `/blog/${a.slug}` })),
    ],
  },
  {
    name: "Études de cas",
    links: [
      { label: "Toutes les études de cas", href: "/etudes-de-cas" },
      ...caseStudies.map((c) => ({ label: c.client, href: `/etudes-de-cas/${c.slug}` })),
    ],
  },
  {
    name: "À propos",
    links: [
      { label: "Accueil", href: "/" },
      { label: "Mon parcours", href: "/parcours" },
    ],
  },
];

export default function PlanDuSite() {
  return (
    <div className="wrap">
      <Breadcrumbs items={[{ label: "Plan du site", href: "/plan-du-site" }]} />

      <header className="phead">
        <div className="eyebrow">Plan du site</div>
        <h1 className="title">Toutes les pages</h1>
      </header>

      {groups.map((g) => (
        <section className="psec" key={g.name}>
          <h2>{g.name}</h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {g.links.map((l) => (
              <li key={l.href} style={{ marginBottom: 8 }}>
                <Link href={l.href} style={{ color: "var(--accent)" }}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
