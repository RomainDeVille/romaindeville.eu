import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/data";

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
    "@type": "Person",
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
    worksFor: {
      "@type": "Organization",
      name: "RDIGITAL",
    },
  };

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
            <Link className="btn btn-ghost" href="/geo">
              GEO
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
        {children}
        <footer className="foot">
          <div className="wrap">
            <div>
              Romain De Ville · Conseil en visibilité IA (GEO), SEO et stratégie
              de contenu · {profile.city}
            </div>
            <div className="foot-links">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span className="foot-sep">·</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div className="foot-copy">© {new Date().getFullYear()} Romain De Ville. Tous droits réservés.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
