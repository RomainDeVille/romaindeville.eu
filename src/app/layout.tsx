import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/lib/data";
import { SiteChrome } from "@/components/site-chrome";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
