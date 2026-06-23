import type { Metadata } from "next";

export type Locale = "fr" | "en";
export const LOCALES: Locale[] = ["fr", "en"];
export const DEFAULT_LOCALE: Locale = "fr";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://romaindeville.eu";

/** Mapping des slugs d'expertise FR -> EN (slugs traduits pour le SEO anglophone). */
export const EXPERTISE_SLUG_FR_EN: Record<string, string> = {
  "consultant-seo-bruxelles": "seo-consultant-brussels",
  "consultant-geo-belgique": "geo-consultant-belgium",
  "strategie-contenu-b2b": "b2b-content-strategy",
  "creation-site-web-belgique": "web-design-belgium",
  "consultant-google-ads-belgique": "google-ads-consultant-belgium",
  "audit-seo": "seo-audit",
  "performance-web": "web-performance",
  "formation-seo-belgique": "seo-training-belgium",
  "suivi-seo-mensuel": "monthly-seo-monitoring",
  "tarifs-google-ads-belgique": "google-ads-pricing-belgium",
  "consultant-cro-belgique": "cro-consultant-belgium",
  "google-ads-bruxelles": "google-ads-brussels",
  "google-ads-secteurs-belgique": "google-ads-by-industry-belgium",
};

export const EXPERTISE_SLUG_EN_FR: Record<string, string> = Object.fromEntries(
  Object.entries(EXPERTISE_SLUG_FR_EN).map(([fr, en]) => [en, fr])
);

/** Mapping des pages statiques (chemin FR -> chemin EN). */
export const PAGE_FR_EN: Record<string, string> = {
  "/": "/en",
  "/parcours": "/en/about",
  "/etudes-de-cas": "/en/case-studies",
  "/plan-du-site": "/en/site-map",
};

export const PAGE_EN_FR: Record<string, string> = Object.fromEntries(
  Object.entries(PAGE_FR_EN).map(([fr, en]) => [en, fr])
);

/** Construit l'objet alternates (canonical + hreflang) pour les métadonnées Next. */
export function altMeta(frPath: string, enPath: string, locale: Locale): Metadata["alternates"] {
  return {
    canonical: locale === "fr" ? frPath : enPath,
    languages: {
      "fr-BE": frPath,
      en: enPath,
      "x-default": frPath,
    },
  };
}

/** Alternates pour une page d'expertise, à partir du slug FR. */
export function altExpertise(frSlug: string, locale: Locale = "fr"): Metadata["alternates"] {
  const enSlug = EXPERTISE_SLUG_FR_EN[frSlug];
  return altMeta(`/${frSlug}`, `/en/${enSlug}`, locale);
}

/** Donne l'URL équivalente dans l'autre langue pour un pathname donné (switcher). */
export function counterpartPath(pathname: string, target: Locale): string {
  // normalise sans slash final
  const path = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (target === "en") {
    if (path.startsWith("/en")) return path;
    if (PAGE_FR_EN[path]) return PAGE_FR_EN[path];
    // étude de cas FR -> EN
    if (path.startsWith("/etudes-de-cas/")) return `/en/case-studies/${path.split("/")[2]}`;
    // expertise FR -> EN
    const seg = path.slice(1);
    if (EXPERTISE_SLUG_FR_EN[seg]) return `/en/${EXPERTISE_SLUG_FR_EN[seg]}`;
    return "/en";
  } else {
    if (!path.startsWith("/en")) return path;
    if (PAGE_EN_FR[path]) return PAGE_EN_FR[path];
    if (path.startsWith("/en/case-studies/")) return `/etudes-de-cas/${path.split("/")[3]}`;
    const seg = path.replace(/^\/en\//, "");
    if (EXPERTISE_SLUG_EN_FR[seg]) return `/${EXPERTISE_SLUG_EN_FR[seg]}`;
    return "/";
  }
}

export function absUrl(path: string): string {
  return `${BASE}${path === "/" ? "" : path}`;
}

/** Dictionnaire des chaînes d'interface (hors contenu de page, écrit en dur par page). */
export const ui = {
  fr: {
    htmlLang: "fr",
    navExpertises: "Expertises",
    navCases: "Études de cas",
    navAbout: "Mon parcours",
    navBook: "Réserver un appel",
    navSpace: "Mon espace",
    footDesc:
      "Conseil en visibilité IA (GEO), SEO et stratégie de contenu pour marques, médias et institutions.",
    footExpertises: "Expertises",
    footReferences: "Références",
    footAllCases: "Toutes les études de cas",
    footContact: "Contact",
    footAbout: "Mon parcours",
    footRights: "Tous droits réservés.",
    footSitemap: "Plan du site",
    tplBook20: "Réserver un appel de 20 min",
    tplAiHead: "Réponse générée par une IA",
    tplAiAsks: "Un client demande :",
    tplAiQuestion: "« Quelle est la meilleure solution pour [votre marché] ? »",
    tplAiAnswerPre: "Pour ce besoin, les options les plus souvent recommandées sont ",
    tplAiAnswerMid: ", reconnu pour sa fiabilité, ainsi que ",
    tplAiAnswerEnd: ", fréquemment cités pour leur rapport qualité-prix.",
    tplAiTag: "Votre marque : non citée",
    tplOther: "Autres expertises",
    tplCloserTitle: "Parlons-en, concrètement.",
    tplCloserText:
      "En 20 minutes, on regarde votre situation sur ce sujet précis : où vous en êtes, ce qui bloque, ce que ça vaudrait de le corriger. Sans préparation de votre côté, sans engagement.",
    tplCloserBtn: "Réserver un appel",
    crumbHome: "Accueil",
    switchTo: "EN",
    switchLabel: "English",
  },
  en: {
    htmlLang: "en",
    navExpertises: "Services",
    navCases: "Case studies",
    navAbout: "About",
    navBook: "Book a call",
    navSpace: "Client area",
    footDesc:
      "AI visibility (GEO), SEO and content strategy consulting for brands, media and institutions.",
    footExpertises: "Services",
    footReferences: "References",
    footAllCases: "All case studies",
    footContact: "Contact",
    footAbout: "About",
    footRights: "All rights reserved.",
    footSitemap: "Sitemap",
    tplBook20: "Book a 20-min call",
    tplAiHead: "AI-generated answer",
    tplAiAsks: "A customer asks:",
    tplAiQuestion: "“What is the best solution for [your market]?”",
    tplAiAnswerPre: "For this need, the most frequently recommended options are ",
    tplAiAnswerMid: ", known for its reliability, along with ",
    tplAiAnswerEnd: ", often cited for their value for money.",
    tplAiTag: "Your brand: not cited",
    tplOther: "Other services",
    tplCloserTitle: "Let’s talk, concretely.",
    tplCloserText:
      "In 20 minutes, we look at where you stand on this specific topic: what’s blocking you, and what fixing it would be worth. No preparation needed, no commitment.",
    tplCloserBtn: "Book a call",
    crumbHome: "Home",
    switchTo: "FR",
    switchLabel: "Français",
  },
} as const;

export type Dict = (typeof ui)[Locale];
