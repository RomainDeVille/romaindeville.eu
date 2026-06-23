import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/lib/breadcrumbs";
import { caseStudiesEn } from "@/lib/case-studies-en";
import { CORE_EXPERTISES_EN, EXPERTISES_EN } from "@/lib/expertises-en";
import { altMeta } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "All pages of romaindeville.eu: SEO, GEO and content strategy services, case studies and background.",
  alternates: altMeta("/plan-du-site", "/en/site-map", "en"),
  openGraph: {
    type: "website",
    siteName: "Romain De Ville",
    images: [{ url: "/og-en.png", width: 1200, height: 630, alt: "Romain De Ville — SEO, GEO & Content Strategy, Brussels" }],
 locale: "en_GB" },
};

const groups = [
  {
    name: "Services",
    links: CORE_EXPERTISES_EN.map((e) => ({ label: e.name, href: `/en/${e.slug}` })),
  },
  {
    name: "Google Ads by industry and city",
    links: EXPERTISES_EN.filter((e) => e.landing).map((e) => ({ label: e.name, href: `/en/${e.slug}` })),
  },
  {
    name: "Case studies",
    links: [
      { label: "All case studies", href: "/en/case-studies" },
      ...caseStudiesEn.map((c) => ({ label: c.client, href: `/en/case-studies/${c.slug}` })),
    ],
  },
  {
    name: "About",
    links: [
      { label: "Home", href: "/en" },
      { label: "About", href: "/en/about" },
    ],
  },
];

export default function SiteMapEn() {
  return (
    <div className="wrap">
      <Breadcrumbs locale="en" items={[{ label: "Sitemap", href: "/en/site-map" }]} />

      <header className="phead">
        <div className="eyebrow">Sitemap</div>
        <h1 className="title">All pages</h1>
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
