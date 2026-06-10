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
      "Développement d'un framework GEO de 10 tactiques pour la visibilité dans les moteurs d'IA, et déploiement d'un outil interne productisé (« Proxi SEO », custom GPT) consolidant tone of voice, structure FAQ, traductions, accessibilité et directives RGPD pour industrialiser les pratiques au sein des équipes.",
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
  {
    slug: "groupe-audit-belgium",
    client: "Groupe Audit Belgium",
    title: "Refondre un site financier multilingue pour capter des leads qualifiés",
    sector: "Cabinet d'audit et de conseil financier",
    period: "Depuis novembre 2025, mission en cours",
    intro:
      "Un cabinet d'audit s'adresse à une audience B2B exigeante, dans un secteur où la communication commerciale est réglementée. La mission : refondre le site corporate en trois langues et construire l'acquisition, avec un seul objectif mesurable, le lead qualifié.",
    problem: [
      "Un site corporate qui présentait l'activité mais ne captait pas de demandes entrantes : pas de parcours pensés pour la conversion.",
      "Trois langues à servir (FR, NL, EN) sans architecture multilingue structurée, dans un marché belge où c'est une attente de base.",
      "Aucune acquisition payante structurée, et un cadre réglementaire qui interdit les promesses commerciales approximatives.",
    ],
    solution: [
      "Pilotage de bout en bout de la refonte en architecture multilingue FR, NL, EN : structure des pages et parcours utilisateurs définis pour maximiser la captation de leads qualifiés.",
      "Stratégie SEO complète : architecture du site, contenu sémantique, maillage interne, Core Web Vitals, landing pages prioritaires, contrôles d'indexation, sitemap et monitoring Search Console.",
      "Création et optimisation continue des campagnes Google Ads Search (mots-clés, annonces, ciblage, budgets) pilotées au coût par lead.",
      "Messaging aligné sur une audience B2B réglementée : précis, vérifiable, sans promesse trompeuse.",
    ],
    results: [
      "Un site trilingue structuré autour de la conversion, pas de la plaquette.",
      "Un canal d'acquisition payant piloté au coût par lead, avec un tracking propre.",
      "Un socle SEO et GEO posé dès la refonte : indexation maîtrisée, entités optimisées, monitoring en place.",
    ],
    resultNote: "Mission en cours : les chiffres d'acquisition appartiennent au client.",
    relatedServices: [
      { label: "Google Ads et CRO", href: "/consultant-google-ads-belgique" },
      { label: "Création de site web", href: "/creation-site-web-belgique" },
      { label: "Consultant SEO Bruxelles", href: "/consultant-seo-bruxelles" },
    ],
  },
  {
    slug: "equine-care-group",
    client: "Equine Care Group",
    title: "Faire croître un e-commerce multi-marques par le CRO et l'acquisition",
    sector: "E-commerce multi-marques, santé équine",
    period: "Mai 2024 à avril 2025",
    intro:
      "Un écosystème e-commerce regroupant plusieurs marques, chacune avec son site, ses tunnels et ses campagnes. La mission : connecter l'acquisition payante, le CRO et le SEO en une seule logique de croissance, pilotée par les données plutôt que par l'intuition.",
    problem: [
      "Des parcours d'achat hétérogènes entre les marques, avec des frictions UX qui coûtaient des conversions à chaque étape du tunnel.",
      "Des budgets publicitaires répartis sur plusieurs comptes sans structure commune ni gouvernance de tracking.",
      "Une acquisition déconnectée de la performance on-site : du trafic acheté sans visibilité sur ce qu'il devenait après le clic.",
    ],
    solution: [
      "Stratégie CRO en test-and-learn sur l'ensemble du portefeuille : priorisation des hypothèses, A/B testing, itérations sur les tunnels de conversion.",
      "Reprise en main des comptes Google Ads et Meta Ads : structure, enchères, audiences, créatifs et tracking, pilotés au ROAS sur l'ensemble des marques.",
      "Stratégie SEO et GEO globale connectant les insights d'acquisition à la performance on-site : engagement, conversion, rétention.",
      "Gouvernance UX et UI cross-marques et analyses marché, concurrence et demande pour réduire les frictions identifiées.",
    ],
    results: [
      "Une méthodologie test-and-learn installée : chaque évolution des tunnels est une hypothèse mesurée, plus un pari.",
      "Des comptes publicitaires restructurés et pilotés au ROAS, avec un tracking unifié sur le portefeuille.",
      "Des parcours harmonisés entre marques et des décisions UX fondées sur les données de comportement réelles.",
    ],
    resultNote: "Les chiffres de ROAS et de revenus appartiennent au client.",
    relatedServices: [
      { label: "Google Ads et CRO", href: "/consultant-google-ads-belgique" },
      { label: "Performance web", href: "/performance-web" },
      { label: "Suivi SEO mensuel", href: "/suivi-seo-mensuel" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
