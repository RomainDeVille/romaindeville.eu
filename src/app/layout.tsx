import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/lib/data";
import { CORE_EXPERTISES } from "@/lib/expertises";
import { CORE_EXPERTISES_EN } from "@/lib/expertises-en";
import { caseStudies } from "@/lib/case-studies";
import { caseStudiesEn } from "@/lib/case-studies-en";
import { ui, type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-heading", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Romain De Ville · Consultant Senior SEO, GEO et Stratégie de Contenu",
    template: "%s · Romain De Ville",
  },
  description:
    "Consultant indépendant en SEO, GEO (visibilité dans les réponses IA) et stratégie de contenu. +10 ans d'expérience. Bruxelles.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://romaindeville.eu"),
  authors: [{ name: "Romain De Ville", url: "https://romaindeville.eu" }],
  creator: "Romain De Ville",
  publisher: "Romain De Ville",
  applicationName: "Romain De Ville",
  keywords: ["consultant SEO Bruxelles", "consultant GEO Belgique", "Google Ads Belgique", "stratégie de contenu", "SEO technique"],
  openGraph: {
    type: "website",
    locale: "fr_BE",
    alternateLocale: "en_GB",
    siteName: "Romain De Ville",
    title: "Romain De Ville · Consultant Senior SEO, GEO et Stratégie de Contenu",
    description: "Consultant indépendant en SEO, GEO et stratégie de contenu. Bruxelles.",
    url: "https://romaindeville.eu",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Romain De Ville — Consultant SEO, GEO et stratégie de contenu, Bruxelles" }],
  },
  twitter: { card: "summary_large_image", title: "Romain De Ville · Consultant SEO, GEO et Stratégie de Contenu", description: "Consultant indépendant en SEO, GEO et stratégie de contenu. Bruxelles.", images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const locale: Locale = h.get("x-locale") === "en" ? "en" : "fr";
  const t = ui[locale];
  const isEn = locale === "en";
  const prefix = isEn ? "/en" : "";
  const coreExpertises = isEn ? CORE_EXPERTISES_EN : CORE_EXPERTISES;
  const cases = isEn ? caseStudiesEn : caseStudies;

  const homeHref = isEn ? "/en" : "/";
  const casesHref = isEn ? "/en/case-studies" : "/etudes-de-cas";
  const aboutHref = isEn ? "/en/about" : "/parcours";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://romaindeville.eu/#person",
        name: "Romain De Ville",
        jobTitle: "Consultant Senior SEO, GEO et Stratégie de Contenu",
        url: "https://romaindeville.eu",
        email: profile.email,
        telephone: profile.phone,
        address: { "@type": "PostalAddress", addressLocality: "Bruxelles", addressCountry: "BE" },
        sameAs: [profile.linkedin],
        knowsAbout: ["SEO", "Generative Engine Optimization", "Content Strategy", "Technical SEO", "GEO"],
        worksFor: { "@id": "https://romaindeville.eu/#organization" },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://romaindeville.eu/#organization",
        name: "Romain De Ville · RDIGITAL",
        description:
          "Conseil indépendant en SEO, GEO (visibilité dans les réponses des IA), acquisition et stratégie de contenu pour entreprises, médias et institutions.",
        url: "https://romaindeville.eu",
        email: profile.email,
        telephone: profile.phone,
        founder: { "@id": "https://romaindeville.eu/#person" },
        address: { "@type": "PostalAddress", addressLocality: "Bruxelles", addressCountry: "BE" },
        areaServed: [
          { "@type": "Country", name: "Belgique" },
          { "@type": "City", name: "Bruxelles" },
        ],
        knowsLanguage: ["fr", "nl", "en"],
        makesOffer: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Consultance SEO technique et éditoriale" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Consultance GEO (Generative Engine Optimization)" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Acquisition digitale et CRO" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Stratégie de contenu et formation des équipes" } },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://romaindeville.eu/#website",
        name: "Romain De Ville",
        url: "https://romaindeville.eu",
        inLanguage: ["fr-BE", "en"],
        publisher: { "@id": "https://romaindeville.eu/#person" },
      },
    ],
  };

  return (
    <html lang={t.htmlLang} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <nav className="nav">
          <Link href={homeHref} className="name">
            Romain De Ville<span className="dot">.</span>
          </Link>
          <div className="right">
            <details className="nav-dd">
              <summary><span className="btn btn-ghost">{t.navExpertises}</span></summary>
              <div className="nav-dd-menu">
                {coreExpertises.map((e) => (
                  <Link key={e.slug} href={`${prefix}/${e.slug}`}>{e.name}</Link>
                ))}
              </div>
            </details>
            <Link className="btn btn-ghost" href={casesHref}>{t.navCases}</Link>
            <Link className="btn btn-ghost" href={aboutHref}>{t.navAbout}</Link>
            <a className="btn btn-primary" href={profile.calendly} target="_blank" rel="noopener noreferrer">{t.navBook}</a>
            <LanguageSwitcher locale={locale} />
            <Link className="btn btn-outline" href="/espace">{t.navSpace}</Link>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="foot">
          <div className="wrap">
            <div className="foot-grid">
              <div>
                <div className="foot-brand">Romain De Ville<span className="dot">.</span></div>
                <p className="foot-desc">{t.footDesc} {profile.city}.</p>
              </div>
              <div className="foot-col">
                <div className="foot-title">{t.footExpertises}</div>
                {coreExpertises.map((e) => (
                  <Link key={e.slug} href={`${prefix}/${e.slug}`}>{e.name}</Link>
                ))}
              </div>
              <div className="foot-col">
                <div className="foot-title">{t.footReferences}</div>
                {cases.map((c) => (
                  <Link key={c.slug} href={`${casesHref}/${c.slug}`}>{c.client}</Link>
                ))}
                <Link href={casesHref}>{t.footAllCases}</Link>
              </div>
              <div className="foot-col">
                <div className="foot-title">{t.footContact}</div>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={profile.calendly} target="_blank" rel="noopener noreferrer">{t.navBook}</a>
                <Link href={aboutHref}>{t.footAbout}</Link>
              </div>
            </div>
            <div className="foot-copy">
              © {new Date().getFullYear()} Romain De Ville. {t.footRights} · <Link href={isEn ? "/en/site-map" : "/plan-du-site"}>{t.footSitemap}</Link>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
