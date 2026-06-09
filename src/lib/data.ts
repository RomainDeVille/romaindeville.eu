export const profile = {
  name: "Romain De Ville",
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "romain@romaindeville.eu",
  phone: "+33 6 27 81 58 42",
  city: "Bruxelles",
  linkedin: "https://linkedin.com/in/romain-de-ville",
  headline: "Consultant Senior SEO, GEO et Stratégie de Contenu",
  summary:
    "Spécialiste SEO avec plus de 10 ans d'expérience dédiée à la découvrabilité, l'accessibilité et la pérennité des contenus numériques, dans des environnements éditoriaux, médias et institutionnels. J'implémente des stratégies de référencement naturel au sein des rédactions, en intégrant les enjeux SEO en amont des projets. Expert du SEO sur ses quatre dimensions (technique, éditorial, data, performance) et de la visibilité dans les moteurs d'IA (GEO), j'attache une importance particulière à la pédagogie et à l'installation d'une culture SEO durable.",
};

export interface Experience {
  company: string;
  role: string;
  tag: string;
  period: string;
  location?: string;
  highlight?: string;
  points: string[];
}

export const experiences: Experience[] = [
  {
    company: "Proximus",
    role: "Consultant Senior SEO et GEO",
    tag: "Freelance",
    period: "Nov. 2025 — présent",
    location: "Bruxelles, Hybride",
    highlight: "Premier opérateur télécom belge",
    points: [
      "Déploiement de la stratégie SEO et GEO des contenus client en français, néerlandais et anglais, en coordination avec les content designers, rédactions, agences et parties prenantes produit.",
      "Structuration sémantique et architecture pilier/cluster d'un écosystème de 220 000+ pages, consolidation des FAQ, blog et forum pour réduire la cannibalisation.",
      "Définition de l'architecture et suivi qualité des métadonnées, pilotage des audits SEO techniques et de la qualité des mises en production.",
      "Développement d'un framework GEO (10 tactiques) pour améliorer la visibilité dans les moteurs d'IA (AI Overviews, ChatGPT, Perplexity, Copilot) et d'un outil interne sur mesure.",
      "Suivi de performance multi-plateforme (Adobe Analytics, Contentsquare, Search Console, Semrush) traduit en rapports exécutifs et recommandations actionnables.",
    ],
  },
  {
    company: "Groupe Audit Belgium",
    role: "Consultant Acquisition Digitale et CRO",
    tag: "Freelance",
    period: "Nov. 2025 — présent",
    location: "Bruxelles, Remote",
    points: [
      "Refonte complète du site corporate en architecture multilingue (FR, NL, EN), structuration des parcours utilisateurs pour maximiser la captation de leads.",
      "Stratégie SEO de bout en bout : architecture, contenu sémantique, maillage interne, Core Web Vitals, indexation, sitemap, Search Console.",
      "Création, lancement et optimisation continue des campagnes Google Ads (Search) pour améliorer le coût par lead.",
    ],
  },
  {
    company: "Parlement européen",
    role: "Consultant Senior en Stratégie SEO",
    tag: "Freelance",
    period: "Nov. 2023 — oct. 2025",
    location: "Remote",
    highlight: "Institution européenne",
    points: [
      "Pilotage sur plusieurs trimestres de la stratégie d'optimisation de la recherche (pertinence, rapidité de réponse, réduction des zéros résultats) via une approche data-driven et itérative.",
      "Collaboration transversale avec les équipes UX et UI pour améliorer l'expérience de recherche (raffinement des requêtes, filtres, mise en page des résultats).",
      "Transformation des logs de recherche et données comportementales (Piano Analytics) en dashboards et recommandations stratégiques.",
    ],
  },
  {
    company: "Forbes BeLux",
    role: "Responsable Lancement Web et Stratégie de Contenu",
    tag: "Freelance",
    period: "Oct. 2023 — oct. 2024",
    location: "Bruxelles, Remote",
    highlight: "Média business et finance",
    points: [
      "Pilotage du lancement éditorial du site Forbes BeLux : stratégie de contenu, piliers éditoriaux, calendriers et workflows de publication au sein de la rédaction.",
      "Définition et exécution d'une stratégie SEO éditoriale multilingue (FR, NL, EN) : optimisation on-page, SEO sémantique, clusters thématiques et maillage interne.",
      "Développement de playbooks SEO et formation des journalistes au search intent, aux principes E-E-A-T et aux bonnes pratiques news SEO.",
    ],
  },
  {
    company: "Equine Care Group",
    role: "Consultant CRO et Stratégie de Croissance",
    tag: "Freelance",
    period: "Mai 2024 — avr. 2025",
    location: "Remote",
    highlight: "E-commerce multi-marques",
    points: [
      "Stratégie CRO et croissance sur un écosystème e-commerce multi-marques via une démarche test-and-learn, A/B testing et optimisation du funnel.",
      "Pilotage et optimisation des campagnes Google Ads et Meta Ads pour maximiser le ROAS et la croissance des ventes.",
      "Stratégie SEO et GEO globale connectant acquisition et performance on-site (engagement, conversion, rétention).",
    ],
  },
  {
    company: "Carbonable",
    role: "Coordinateur Marketing Digital",
    tag: "Freelance",
    period: "Sept. 2021 — août 2023",
    location: "Remote",
    points: [
      "Stratégies de croissance communautaire (Discord, X, Telegram), production de contenus éditoriaux, suivi de performance via dashboards Looker Studio.",
      "Gestion de partenariats influenceurs et marques pour accélérer la notoriété et l'expansion communautaire.",
    ],
  },
  {
    company: "LUDO LUDO",
    role: "Co-fondateur",
    tag: "ASBL",
    period: "Mars 2021 — fév. 2024",
    location: "Bruxelles",
    points: [
      "E-commerce, stratégie de contenu, SEO et acquisition payante pour une association culturelle bruxelloise.",
    ],
  },
  {
    company: "ESTACA",
    role: "Responsable Communication Digitale",
    tag: "Alternance",
    period: "Avr. 2018 — mars 2021",
    location: "Paris, France",
    points: [
      "Campagnes d'acquisition Google Ads, refonte UX du site admissions, améliorations SEO on-site et optimisation des campagnes email.",
    ],
  },
  {
    company: "VisiYou",
    role: "Développeur Web et Designer UI",
    tag: "Alternance",
    period: "Nov. 2015 — oct. 2017",
    location: "Bruxelles",
    points: [
      "Construction de sites WordPress et WooCommerce de bout en bout, formation des clients aux fondamentaux du web analytics.",
    ],
  },
];

export interface SkillCategory {
  name: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "SEO éditorial et contenu",
    items: [
      "Stratégie SEO éditoriale",
      "Guidelines rédactionnelles",
      "Architecture pilier/cluster",
      "SEO sémantique",
      "Search intent et E-E-A-T",
      "News SEO",
      "Contenus multilingues (FR, NL, EN)",
    ],
  },
  {
    name: "SEO technique et données",
    items: [
      "Audits techniques",
      "Schema markup",
      "Maillage interne",
      "Core Web Vitals",
      "Migrations et indexation",
      "Architecture de métadonnées",
    ],
  },
  {
    name: "Moteurs d'IA (GEO)",
    items: [
      "Generative Engine Optimization",
      "Visibilité LLM (AI Overviews, ChatGPT, Perplexity, Copilot)",
      "Rédaction pour les moteurs d'IA",
      "Veille SEO et IA continue",
    ],
  },
  {
    name: "Outils",
    items: [
      "Google Search Console",
      "Google Analytics 4",
      "Adobe Analytics",
      "Contentsquare",
      "Semrush",
      "Ahrefs",
      "Screaming Frog",
      "Looker Studio",
      "Google Ads",
      "Meta Ads",
    ],
  },
];

export const languages = [
  { name: "Français", level: "C2 · natif" },
  { name: "Anglais", level: "C1 · professionnel" },
  { name: "Néerlandais", level: "B1 · intermédiaire" },
];

export interface Education {
  diploma: string;
  school: string;
  period: string;
}

export const education: Education[] = [
  {
    diploma: "Master of Science en Marketing Digital et Business",
    school: "OMNES Education, Paris",
    period: "2018 — 2021",
  },
  {
    diploma: "Formation Professionnelle DeFi et Blockchain",
    school: "Alyra",
    period: "2021",
  },
  {
    diploma: "Certificat en Design et Gestion d'Entreprise",
    school: "EFP, Bruxelles",
    period: "2015 — 2017",
  },
];

export const clients = [
  "Proximus",
  "Parlement européen",
  "Forbes BeLux",
  "Equine Care Group",
  "Groupe Audit Belgium",
  "Carbonable",
];

export const sideProjects = [
  {
    name: "RDIGITAL",
    desc: "Pratique de conseil indépendante en SEO, GEO et stratégie de contenu.",
  },
  {
    name: "LUDO LUDO",
    desc: "Association culturelle basée à Bruxelles, cofondée.",
  },
  {
    name: "Harmony",
    desc: "Association de photographie et d'arts pour la jeunesse (France, Pérou, Thaïlande).",
  },
];
