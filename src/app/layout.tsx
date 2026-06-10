import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import { profile } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Romain De Ville · Consultant Senior SEO, GEO et Stratégie de Contenu",
    template: "%s · Romain De Ville",
  },
  description:
    "Consultant indépendant en SEO, GEO (visibilité dans les réponses IA) et stratégie de contenu. +10 ans d'expérience. Bruxelles.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://romaindeville.eu"
  ),
  openGraph: {
    type: "website",
    locale: "fr_BE",
    siteName: "Romain De Ville",
    title: "Romain De Ville · Consultant Senior SEO, GEO et Stratégie de Contenu",
    description:
      "Consultant indépendant en SEO, GEO et stratégie de contenu. Bruxelles.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bruxelles",
          addressCountry: "BE",
        },
        sameAs: [profile.linkedin],
        knowsAbout: [
          "SEO",
          "Generative Engine Optimization",
          "Content Strategy",
          "Technical SEO",
          "GEO",
        ],
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
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bruxelles",
          addressCountry: "BE",
        },
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
        inLanguage: "fr-BE",
        publisher: { "@id": "https://romaindeville.eu/#person" },
      },
    ],
  };

  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <nav className="nav">
          <Link href="/" className="name">
            Romain De Ville<span className="dot">.</span>
          </Link>
          <div className="right">
            <Link className="btn btn-ghost" href="/consultant-geo-belgique">
              GEO
            </Link>
            <Link className="btn btn-ghost" href="/etudes-de-cas">
              Études de cas
            </Link>
            <Link className="btn btn-ghost" href="/parcours">
              Mon parcours
            </Link>
            <a
              className="btn btn-primary"
              href={profile.calendly}
              target="_blank"
              rel="noopener noreferrer"
            >
              Réserver un appel
            </a>
            <Link className="btn btn-outline" href="/espace">
              Mon espace
            </Link>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="foot">
          <div className="wrap">
            <div className="foot-grid">
              <div>
                <div className="foot-brand">Romain De Ville<span className="dot">.</span></div>
                <p className="foot-desc">
                  Conseil en visibilité IA (GEO), SEO et stratégie de contenu pour marques,
                  médias et institutions. {profile.city}.
                </p>
              </div>
              <div className="foot-col">
                <div className="foot-title">Expertises</div>
                <Link href="/consultant-geo-belgique">Consultant GEO Belgique</Link>
                <Link href="/consultant-seo-bruxelles">Consultant SEO Bruxelles</Link>
                <Link href="/strategie-contenu-b2b">Stratégie de contenu B2B</Link>
              </div>
              <div className="foot-col">
                <div className="foot-title">Références</div>
                <Link href="/etudes-de-cas/proximus">Proximus</Link>
                <Link href="/etudes-de-cas/parlement-europeen">Parlement européen</Link>
                <Link href="/etudes-de-cas/forbes-belux">Forbes BeLux</Link>
                <Link href="/etudes-de-cas">Toutes les études de cas</Link>
              </div>
              <div className="foot-col">
                <div className="foot-title">Contact</div>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={profile.calendly} target="_blank" rel="noopener noreferrer">Réserver un appel</a>
                <Link href="/parcours">Mon parcours</Link>
              </div>
            </div>
            <div className="foot-copy">© {new Date().getFullYear()} Romain De Ville. Tous droits réservés.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
