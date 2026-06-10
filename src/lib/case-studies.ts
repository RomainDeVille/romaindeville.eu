export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  sector: string;
  period: string;
  intro: string;
  problem: string[];
  solution: string[];
  results: string[];
  resultNote?: string;
  relatedServices: { label: string; href: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "proximus",
    client: "Proximus",
    title: "Structurer le SEO et le GEO d'un écosystème de 220 000+ pages",
    sector: "Premier opérateur télécom belge",
    period: "Depuis novembre 2025, mission en cours",
    intro:
      "Proximus publie des contenus en français, néerlandais et anglais à travers un écosystème de plus de 220 000 pages : support, FAQ, blog, forum, pages produit. Plusieurs équipes y contribuent : content designers, rédactions, agences, équipes produit. À cette échelle, la visibilité ne se décrète pas, elle se gouverne.",
    problem: [
      "Cannibalisation entre les FAQ, le blog et le forum : plusieurs pages se disputaient les mêmes requêtes, diluant la visibilité de chacune.",
      "Gouvernance des métadonnées hétérogène entre les équipes et les langues, sans architecture commune ni contrôle qualité systématique des mises en production.",
      "Émergence des moteurs d'IA (AI Overviews, ChatGPT, Perplexity, Copilot) sans cadre opérationnel pour y positionner la marque.",
    ],
    solution: [
      "Structuration sémantique en architecture pilier/cluster et consolidation des FAQ, blog et forum pour réduire la cannibalisation entre contenus et entre langues.",
      "Définition de l'architecture des métadonnées et mise en place d'un suivi qualité : audits SEO techniques et contrôle des mises en production.",
      "Développement d'un framework GEO de 10 tactiques pour la visibilité dans les moteurs d'IA, accompagné d'un outil interne sur mesure.",
      "Suivi de performance multi-plateforme (Adobe Analytics, Contentsquare, Search Console, Semrush) traduit en rapports exécutifs et recommandations actionnables.",
    ],
    results: [
      "Une architecture sémantique commune adoptée par les équipes contenu des trois langues.",
      "Une gouvernance des métadonnées et un processus qualité installés dans le flux de production.",
      "Un cadre GEO opérationnel, outillé, qui fait de la visibilité IA un chantier piloté et non une expérimentation.",
      "Un reporting exécutif qui relie les actions SEO aux indicateurs business.",
    ],
    resultNote: "Mission en cours : les indicateurs chiffrés appartiennent au client.",
    relatedServices: [
      { label: "Consultant SEO Bruxelles", href: "/consultant-seo-bruxelles" },
      { label: "Consultant GEO Belgique", href: "/consultant-geo-belgique" },
    ],
  },
  {
    slug: "parlement-europeen",
    client: "Parlement européen",
    title: "Optimiser l'expérience de recherche d'une institution multilingue",
    sector: "Institution européenne",
    period: "Novembre 2023 à octobre 2025",
    intro:
      "Le Parlement européen met à disposition du public et des professionnels un volume documentaire considérable, dans toutes les langues de l'Union. La mission : améliorer la recherche interne, c'est-à-dire la capacité de chaque visiteur à trouver le bon document, vite.",
    problem: [
      "Des requêtes qui aboutissaient trop souvent à zéro résultat, ou à des résultats peu pertinents.",
      "Des logs de recherche et des données comportementales riches mais sous-exploités pour piloter les améliorations.",
      "Une expérience de recherche (filtres, raffinement de requêtes, présentation des résultats) à faire évoluer sans rupture pour les utilisateurs.",
    ],
    solution: [
      "Pilotage sur plusieurs trimestres d'une stratégie d'optimisation data-driven et itérative : pertinence des résultats, rapidité de réponse, réduction des zéros résultats.",
      "Collaboration transversale avec les équipes UX et UI : raffinement des requêtes, filtres, mise en page des résultats.",
      "Transformation des logs de recherche et données comportementales (Piano Analytics) en dashboards et recommandations stratégiques.",
    ],
    results: [
      "Un processus d'amélioration continue de la recherche, piloté par la donnée, trimestre après trimestre pendant deux ans.",
      "Des décisions UX fondées sur les comportements réels de recherche plutôt que sur l'intuition.",
      "Des dashboards qui ont rendu la performance de la recherche lisible pour les équipes non techniques.",
    ],
    resultNote: "Les métriques internes de l'institution ne sont pas publiables.",
    relatedServices: [
      { label: "Consultant SEO Bruxelles", href: "/consultant-seo-bruxelles" },
    ],
  },
  {
    slug: "forbes-belux",
    client: "Forbes BeLux",
    title: "Lancer un média avec le SEO intégré dès le premier jour",
    sector: "Média business et finance",
    period: "Octobre 2023 à octobre 2024",
    intro:
      "Lancer l'édition Belgique-Luxembourg de Forbes : un site média trilingue à construire de zéro, une rédaction à structurer, et une exigence de visibilité immédiate sur un marché où les médias établis occupent le terrain depuis des années.",
    problem: [
      "Aucune fondation : pas de piliers éditoriaux, pas de calendriers, pas de workflows de publication.",
      "Une rédaction de journalistes expérimentés mais non formés au search intent et aux spécificités du news SEO.",
      "Trois langues à coordonner sans cannibalisation ni dilution de l'autorité naissante du domaine.",
    ],
    solution: [
      "Pilotage du lancement éditorial : stratégie de contenu, piliers éditoriaux, calendriers et workflows de publication au sein de la rédaction.",
      "Stratégie SEO éditoriale multilingue FR, NL, EN : optimisation on-page, SEO sémantique, clusters thématiques et maillage interne.",
      "Développement de playbooks SEO et formation des journalistes au search intent, aux principes E-E-A-T et aux bonnes pratiques news SEO.",
    ],
    results: [
      "Un média lancé avec son socle SEO en place dès le premier jour, plutôt que corrigé après coup.",
      "Une rédaction autonome sur les bonnes pratiques : les playbooks ont survécu à la mission.",
      "Des piliers éditoriaux qui structurent la production de contenu au-delà de l'accompagnement.",
    ],
    relatedServices: [
      { label: "Stratégie de contenu B2B", href: "/strategie-contenu-b2b" },
      { label: "Consultant SEO Bruxelles", href: "/consultant-seo-bruxelles" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
