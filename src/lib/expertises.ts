export interface ExpertiseFaq {
  q: string;
  a: string;
}

export interface ScopeCard {
  title: string;
  text: string;
}

export interface Expertise {
  slug: string;
  name: string;
  cardText: string;
  title: string;
  description: string;
  eyebrow: string;
  h1Pre: string;
  h1Mark: string;
  h1Post?: string;
  intro: string;
  scopeTitle: string;
  scopeCards: ScopeCard[];
  proofTitle: string;
  proofText: string;
  proofLinks: { label: string; href: string }[];
  faqTitle: string;
  faq: ExpertiseFaq[];
  related: string[];
  serviceType: string;
  showAiMock?: boolean;
}

export const EXPERTISES: Expertise[] = [
  {
    slug: "consultant-seo-bruxelles",
    name: "Consultant SEO Bruxelles",
    cardText:
      "Audits techniques, architecture pilier/cluster, métadonnées, Core Web Vitals, news SEO. Du code à la rédaction, sur des écosystèmes jusqu'à 220 000 pages.",
    title: "Consultant SEO Bruxelles : SEO technique et éditorial B2B",
    description:
      "Consultant SEO senior à Bruxelles : audits techniques, architecture pilier/cluster, Core Web Vitals, news SEO et stratégies multilingues FR/NL/EN pour entreprises, médias et institutions.",
    eyebrow: "Consultant SEO · Bruxelles · FR, NL, EN",
    h1Pre: "Consultant SEO à Bruxelles pour ",
    h1Mark: "marques, médias et institutions",
    intro:
      "Dix ans de référencement naturel sur ses quatre dimensions : technique, éditorial, data et performance. Des écosystèmes de 220 000 pages aux lancements de médias, en français, néerlandais et anglais.",
    scopeTitle: "Audits, architecture, données : le SEO sur ses quatre dimensions",
    scopeCards: [
      {
        title: "SEO technique",
        text: "Audits complets, Core Web Vitals, indexation, migrations, architecture de métadonnées, schema markup, qualité des mises en production. Le socle sans lequel le contenu ne porte pas.",
      },
      {
        title: "SEO éditorial",
        text: "Architecture pilier/cluster, SEO sémantique, search intent, E-E-A-T, news SEO. J'ai formé des rédactions entières, de Forbes BeLux aux équipes de contenu télécom.",
      },
      {
        title: "SEO multilingue",
        text: "Stratégies FR, NL et EN coordonnées : architecture par langue, gestion de la cannibalisation entre versions, coordination des rédactions et agences. Une réalité belge que peu maîtrisent.",
      },
      {
        title: "Data et reporting",
        text: "Search Console, GA4, Adobe Analytics, Contentsquare, Semrush. Des dashboards et rapports exécutifs qui transforment les données en décisions, pas en slides décoratives.",
      },
    ],
    proofTitle: "220 000 pages structurées, trois contextes, une méthode",
    proofText:
      "Structuration sémantique d'un écosystème de plus de 220 000 pages chez Proximus, optimisation de l'expérience de recherche au Parlement européen, lancement éditorial et SEO de Forbes BeLux. Trois échelles différentes, la même exigence.",
    proofLinks: [
      { label: "Étude de cas Proximus", href: "/etudes-de-cas/proximus" },
      { label: "Toutes les études de cas", href: "/etudes-de-cas" },
    ],
    faqTitle: "Questions fréquentes sur le SEO à Bruxelles",
    faq: [
      {
        q: "Intervenez-vous sur site à Bruxelles ou à distance ?",
        a: "Les deux. Je suis basé à Bruxelles et je me déplace chez les clients belges quand la mission le demande : ateliers, formations, comités éditoriaux. Le reste du travail se fait à distance, avec des points réguliers. Pour les clients hors Belgique, je travaille entièrement en remote.",
      },
      {
        q: "Quelle différence entre un consultant SEO indépendant et une agence ?",
        a: "Vous parlez à celui qui exécute. Pas de chef de projet intermédiaire, pas de junior qui apprend sur votre budget. J'interviens sur les quatre dimensions du SEO (technique, éditorial, data, performance) et je forme vos équipes pour que la compétence reste chez vous après la mission.",
      },
      {
        q: "Travaillez-vous en néerlandais et en anglais ?",
        a: "Oui. J'ai piloté des stratégies SEO multilingues FR, NL et EN pour Proximus et Forbes BeLux : architecture des contenus par langue, coordination des rédactions, gestion de la cannibalisation entre versions linguistiques.",
      },
      {
        q: "Sur quels types de sites avez-vous travaillé ?",
        a: "Des écosystèmes de plus de 220 000 pages (télécom), des sites institutionnels (Parlement européen), des médias (Forbes BeLux), des e-commerces multi-marques et des sites corporate B2B. La méthode s'adapte, l'exigence reste la même.",
      },
      {
        q: "Combien de temps avant de voir des résultats SEO ?",
        a: "Cela dépend de votre autorité de départ, de la concurrence sur vos requêtes et du rythme d'implémentation des recommandations. Les premiers mouvements se mesurent généralement en deux à trois mois, la consolidation en six à douze. Je mesure avant et après, et je ne promets jamais de position.",
      },
      {
        q: "Quels sont vos tarifs ?",
        a: "Au périmètre, après un appel de cadrage de 20 minutes gratuit et sans engagement. Pas de coûts cachés, pas de durée d'engagement imposée : le devis décrit ce qui est fait, quand, et ce que vous recevez.",
      },
    ],
    related: ["consultant-geo-belgique", "audit-seo", "strategie-contenu-b2b"],
    serviceType: "Search Engine Optimization",
  },
  {
    slug: "consultant-geo-belgique",
    name: "Consultant GEO Belgique",
    cardText:
      "Faire de votre marque une source que ChatGPT, Perplexity, Gemini et AI Overviews citent. Framework de 10 tactiques, audit dédié et feuille de route.",
    title: "Consultant GEO Belgique : visibilité dans les réponses des IA",
    description:
      "Consultant GEO en Belgique : faites de votre marque une source que ChatGPT, Perplexity, Gemini et Google AI Overviews citent. Audit de visibilité IA et plan d'action priorisé. Bruxelles, FR/NL/EN.",
    eyebrow: "Consultant GEO · Belgique · Bruxelles",
    h1Pre: "Consultant GEO en Belgique : quand vos clients interrogent une IA, qui apparaît : ",
    h1Mark: "vous, ou vos concurrents",
    h1Post: " ?",
    intro:
      "J'aide les marques à devenir des sources que ChatGPT, Perplexity et Gemini citent. Parce que la recherche se déplace, et que ce qui ne se voit pas dans Google Analytics se joue désormais ailleurs.",
    scopeTitle: "Audit de visibilité IA, benchmark, feuille de route : l'offre GEO",
    scopeCards: [
      {
        title: "Visibilité réelle",
        text: "Je teste votre marque sur ChatGPT, Perplexity, Gemini et Google AI, sur les vraies questions de vos clients. Ce que les IA disent de vous aujourd'hui, mesuré, pas supposé.",
      },
      {
        title: "Benchmark concurrents",
        text: "Qui est cité à votre place, sur quelles requêtes, et pourquoi. L'écart se mesure, il se corrige.",
      },
      {
        title: "Feuille de route priorisée",
        text: "Données structurées, llms.txt, contenus en réponses directes, signaux d'autorité : chaque action classée par impact, exploitable directement par votre équipe.",
      },
      {
        title: "Framework éprouvé",
        text: "Un framework de 10 tactiques GEO et un outillage développés et déployés en entreprise, sur un écosystème de plus de 220 000 pages en trois langues.",
      },
    ],
    proofTitle: "Déployé chez Proximus, pas un concept de conférence",
    proofText:
      "Le framework GEO et l'outil interne que j'utilise ont été développés en mission chez le premier opérateur télécom belge, sur un écosystème trilingue de plus de 220 000 pages. Le GEO y est un chantier piloté, avec des indicateurs, pas une expérimentation.",
    proofLinks: [
      { label: "Étude de cas Proximus", href: "/etudes-de-cas/proximus" },
    ],
    faqTitle: "Questions fréquentes sur le GEO",
    faq: [
      {
        q: "C'est quoi, un consultant GEO ?",
        a: "Le GEO (Generative Engine Optimization) consiste à rendre une marque visible dans les réponses générées par les IA : ChatGPT, Perplexity, Gemini, Google AI Overviews. Un consultant GEO audite ce que ces moteurs disent de vous, identifie pourquoi vos concurrents sont cités à votre place, et met en place les contenus, données structurées et signaux d'autorité qui font de votre site une source citée.",
      },
      {
        q: "Quelle est la différence entre SEO et GEO ?",
        a: "Le SEO vise le classement de vos pages dans les résultats de recherche. Le GEO vise la citation de votre marque dans les réponses des IA. Les deux se renforcent : un bon socle SEO technique est un prérequis du GEO, mais le GEO ajoute des leviers spécifiques comme les données structurées Schema.org, le fichier llms.txt, l'accès des crawlers IA et des contenus formulés en réponses directes.",
      },
      {
        q: "Le GEO remplace-t-il le SEO ?",
        a: "Non, il s'y ajoute. Google reste la première source de trafic pour la plupart des sites. Mais une part croissante des décisions se forme dans les réponses des IA, avant tout clic. Travailler l'un sans l'autre, c'est laisser un canal à vos concurrents.",
      },
      {
        q: "Comment se passe un audit GEO ?",
        a: "Trois étapes : je teste votre visibilité réelle sur ChatGPT, Perplexity, Gemini et Google AI sur les vraies questions de vos clients, je compare avec vos concurrents pour identifier qui est cité et pourquoi, puis je livre une feuille de route classée par impact, directement exploitable par votre équipe.",
      },
      {
        q: "Travaillez-vous partout en Belgique ?",
        a: "Oui. Je suis basé à Bruxelles et j'interviens dans toute la Belgique, sur site ou à distance, en français, néerlandais et anglais. J'accompagne aussi des clients en France et ailleurs en Europe en remote.",
      },
      {
        q: "Quels résultats peut-on attendre, et en combien de temps ?",
        a: "Les premiers signaux (citations dans les réponses IA, trafic référent depuis les moteurs génératifs) apparaissent généralement en quelques semaines à quelques mois selon votre autorité de départ. Le GEO est une discipline récente : les marques qui s'y positionnent maintenant prennent une avance mesurable. Je ne promets jamais de résultat chiffré à l'avance, je mesure avant et après.",
      },
    ],
    related: ["consultant-seo-bruxelles", "strategie-contenu-b2b", "audit-seo"],
    serviceType: "Generative Engine Optimization",
    showAiMock: true,
  },
  {
    slug: "strategie-contenu-b2b",
    name: "Stratégie de contenu B2B",
    cardText:
      "Lancements éditoriaux, piliers de contenu, workflows de rédaction, playbooks SEO et formation des équipes. Une culture qui reste.",
    title: "Stratégie de contenu B2B en Belgique : nourrir Google et les IA",
    description:
      "Stratégie de contenu B2B multilingue en Belgique : piliers éditoriaux, workflows de rédaction, playbooks SEO et formation des équipes. Du contenu qui se positionne dans Google et se fait citer par les IA.",
    eyebrow: "Stratégie de contenu · B2B · FR, NL, EN",
    h1Pre: "Du contenu qui se positionne dans Google ",
    h1Mark: "et se fait citer par les IA",
    intro:
      "Un même contenu alimente désormais deux canaux : les résultats de recherche classiques et les réponses générées par ChatGPT, Perplexity ou Google AI Overviews. Je conçois des stratégies éditoriales qui servent les deux, et je forme vos équipes à les faire vivre.",
    scopeTitle: "Piliers, workflows, formation : la mécanique éditoriale complète",
    scopeCards: [
      {
        title: "Piliers et clusters",
        text: "Définition des piliers éditoriaux alignés sur votre business, architecture pilier/cluster, maillage interne. Chaque contenu a une place, une cible et un rôle. Fini les blogs qui publient dans le vide.",
      },
      {
        title: "Workflows de rédaction",
        text: "Calendriers, briefs, circuits de validation, intégration du SEO en amont de l'écriture plutôt qu'en correction après coup. Déployé au sein de rédactions réelles, dont le lancement éditorial complet de Forbes BeLux.",
      },
      {
        title: "Écriture pour les moteurs d'IA",
        text: "Réponses directes, structuration en questions, données vérifiables, E-E-A-T : les contenus que les moteurs génératifs citent ont des caractéristiques mesurables. Je les intègre à vos guidelines.",
      },
      {
        title: "Formation et playbooks",
        text: "Playbooks SEO sur mesure, formation des journalistes et équipes marketing au search intent et aux bonnes pratiques. L'objectif : que la qualité ne dépende plus de ma présence.",
      },
    ],
    proofTitle: "Un média lancé de zéro, des rédactions autonomes",
    proofText:
      "Lancement éditorial complet de Forbes BeLux : piliers, calendriers, workflows et formation des journalistes, en trois langues. Les playbooks ont survécu à la mission, c'est le critère qui compte.",
    proofLinks: [
      { label: "Étude de cas Forbes BeLux", href: "/etudes-de-cas/forbes-belux" },
      { label: "Toutes les études de cas", href: "/etudes-de-cas" },
    ],
    faqTitle: "Questions fréquentes sur la stratégie de contenu B2B",
    faq: [
      {
        q: "Par où commence une stratégie de contenu B2B ?",
        a: "Par vos clients, pas par un calendrier éditorial. On identifie les questions qu'ils posent à chaque étape de leur décision, on les regroupe en piliers, puis on construit l'architecture de contenus qui y répond. Le calendrier vient en dernier : c'est un outil d'exécution, pas une stratégie.",
      },
      {
        q: "Écrire pour les IA, c'est différent d'écrire pour Google ?",
        a: "Les fondamentaux se recouvrent : répondre clairement à une intention, structurer, sourcer. Mais les moteurs génératifs ont leurs préférences mesurables : réponses directes en début de section, formats question-réponse, données vérifiables, signaux d'autorité explicites. J'intègre ces critères aux guidelines de rédaction.",
      },
      {
        q: "Formez-vous nos équipes ou produisez-vous le contenu ?",
        a: "Les deux selon le besoin, avec une préférence assumée pour la formation : playbooks sur mesure, ateliers avec les rédacteurs, relectures accompagnées. L'objectif est que la qualité ne dépende plus de ma présence. C'est la méthode déployée chez Forbes BeLux et en environnement télécom.",
      },
      {
        q: "Gérez-vous le contenu multilingue FR, NL, EN ?",
        a: "Oui, c'est même un cœur de métier : architecture par langue, recherche de mots-clés par marché, coordination des rédactions et gestion de la cannibalisation entre versions linguistiques.",
      },
      {
        q: "Utilisez-vous l'IA pour rédiger ?",
        a: "Comme assistant, oui : recherche, structuration, premiers jets encadrés par des guidelines strictes. Comme producteur autonome, non : le contenu générique généré en masse ne porte ni l'expertise ni l'expérience que Google et les IA récompensent. La signature humaine reste le différenciateur.",
      },
      {
        q: "Combien de contenus faut-il publier par mois ?",
        a: "Moins que ce que vous croyez, mieux que ce que vous faites. Un contenu pilier solide par mois, correctement maillé et mis à jour, bat dix articles minces. Le rythme se cale sur vos ressources réelles : un calendrier intenable est un calendrier mort en trois mois.",
      },
    ],
    related: ["consultant-seo-bruxelles", "consultant-geo-belgique", "formation-seo-belgique"],
    serviceType: "Content Strategy",
  },
  {
    slug: "creation-site-web-belgique",
    name: "Création de site web",
    cardText:
      "Des sites rapides, sobres et SEO-ready dès le premier jour. La preuve la plus simple : celui que vous lisez.",
    title: "Création de site web en Belgique : rapide, sobre et SEO-ready",
    description:
      "Création de sites web en Belgique : conception, développement moderne et référencement intégré dès le premier jour. Core Web Vitals au vert, sécurité et sobriété mesurables publiquement.",
    eyebrow: "Création de site web · Belgique",
    h1Pre: "Un site web ",
    h1Mark: "rapide, sobre et visible dès le premier jour",
    intro:
      "Un site qui affiche 99/100 en performance et A+ en sobriété carbone, ce n'est pas une promesse commerciale : c'est ce site-ci, vérifiable avec n'importe quel outil public. Je conçois des sites vitrines et B2B avec le référencement intégré à la conception, pas corrigé après coup.",
    scopeTitle: "Conception, développement, référencement : un seul interlocuteur",
    scopeCards: [
      {
        title: "Architecture et contenus",
        text: "Arborescence pensée à partir des requêtes de vos clients, maillage interne, multilingue FR/NL/EN si votre marché le demande. La structure du site est une décision SEO, pas une décision graphique.",
      },
      {
        title: "Développement moderne",
        text: "Stack récente, Core Web Vitals au vert comme critère de livraison, headers de sécurité, accessibilité. Pas de constructeur lourd qui plombe la vitesse dès la première extension.",
      },
      {
        title: "SEO et GEO intégrés",
        text: "Métadonnées, données structurées Schema.org, llms.txt, sitemap et Search Console configurés à la mise en ligne. Le site naît visible au lieu de rattraper son retard.",
      },
      {
        title: "Autonomie",
        text: "Formation à la mise à jour, documentation, code et accès qui vous appartiennent. Pas d'abonnement captif, pas de dépendance au prestataire.",
      },
    ],
    proofTitle: "La preuve par ce site",
    proofText:
      "Le site que vous lisez est ma vitrine technique : performance Lighthouse 99-100 en desktop, note de sécurité A, empreinte carbone A+, données structurées complètes et hiérarchie propre. Auditez-le avec l'outil de votre choix : c'est le niveau d'exigence que je livre.",
    proofLinks: [
      { label: "Audit SEO et visibilité IA", href: "/audit-seo" },
    ],
    faqTitle: "Questions fréquentes sur la création de site web",
    faq: [
      {
        q: "Quel délai pour un site vitrine ?",
        a: "Quelques semaines, pas quelques mois, pour un site vitrine ou B2B classique : le délai exact dépend du nombre de pages, des langues et de la disponibilité de vos contenus. Le planning est posé au devis et tenu.",
      },
      {
        q: "WordPress ou sur mesure ?",
        a: "Les deux sont possibles. Je privilégie un socle moderne et léger quand le projet le permet, parce que la vitesse et la sécurité y sont structurelles. Si vous avez déjà un WordPress, je peux l'optimiser plutôt que de tout refaire : la bonne réponse dépend de l'existant, pas du dogme.",
      },
      {
        q: "Le site sera-t-il vraiment rapide ?",
        a: "Les Core Web Vitals au vert sont un critère de livraison, mesuré avec les outils publics de Google avant la mise en ligne. Si une page ne passe pas, elle n'est pas livrée. Mon propre site sert d'étalon public de ce standard.",
      },
      {
        q: "Faites-vous des sites multilingues FR, NL, EN ?",
        a: "Oui, c'est une spécialité : architecture par langue, métadonnées localisées, gestion de la cannibalisation entre versions. En Belgique, un site sérieux est souvent multilingue dès sa conception.",
      },
      {
        q: "Le référencement est-il inclus ?",
        a: "Le socle technique SEO est inclus : métadonnées, données structurées, sitemap, Search Console, performance. La stratégie de contenu et l'acquisition de liens sont des missions à part entière : je vous dis clairement où s'arrête l'un et où commence l'autre.",
      },
      {
        q: "Combien coûte un site web ?",
        a: "Au périmètre : nombre de pages, langues, fonctionnalités, contenus à produire ou non. Devis précis après un appel de 20 minutes gratuit. Pas de coûts cachés ni d'abonnement imposé : le site vous appartient.",
      },
    ],
    related: ["performance-web", "consultant-seo-bruxelles", "suivi-seo-mensuel"],
    serviceType: "Web Design and Development",
  },
  {
    slug: "consultant-google-ads-belgique",
    name: "Google Ads et CRO",
    cardText:
      "Campagnes Search pilotées au coût par lead, A/B testing et optimisation du funnel. Le trafic n'est pas l'objectif : la conversion l'est.",
    title: "Consultant Google Ads en Belgique : campagnes pilotées au coût par lead",
    description:
      "Consultant Google Ads en Belgique : création, lancement et optimisation de campagnes Search et Meta Ads, couplées au CRO. Pilotage au coût par lead et au ROAS, pas aux clics.",
    eyebrow: "Acquisition payante · CRO · Belgique",
    h1Pre: "Des campagnes Google Ads jugées sur ",
    h1Mark: "le coût par lead, pas sur les clics",
    intro:
      "Création, lancement et optimisation continue de campagnes Search et Meta Ads, couplées au travail de conversion sur le site : A/B testing, funnel, pages de destination. Parce qu'un clic payé qui n'aboutit pas est une dépense, pas un résultat.",
    scopeTitle: "Campagnes, conversion, mesure : l'acquisition de bout en bout",
    scopeCards: [
      {
        title: "Campagnes Search",
        text: "Structure de compte propre, mots-clés et correspondances maîtrisés, annonces testées, budgets pilotés. Optimisation continue sur le coût par lead, pas sur le volume de clics.",
      },
      {
        title: "CRO et funnel",
        text: "A/B testing, optimisation des pages de destination et du parcours de conversion. Augmenter le taux de conversion rend chaque euro publicitaire plus rentable, durablement.",
      },
      {
        title: "Tracking et mesure",
        text: "Conversions correctement configurées, GA4, dashboards lisibles. Sans mesure fiable, l'optimisation est de la divination : le tracking propre est un prérequis, pas une option.",
      },
      {
        title: "Synergie SEO et SEA",
        text: "Ne pas payer pour des requêtes que vous gagnez déjà en organique, couvrir en Ads ce que le SEO n'atteint pas encore. Les deux canaux se pilotent ensemble.",
      },
    ],
    proofTitle: "ROAS e-commerce et coût par lead B2B",
    proofText:
      "Pilotage de campagnes Google Ads et Meta Ads pour un écosystème e-commerce multi-marques (Equine Care Group), génération de leads B2B pour Groupe Audit Belgium, campagnes d'acquisition pour l'enseignement supérieur (ESTACA). Trois logiques de conversion différentes, la même discipline de mesure.",
    proofLinks: [
      { label: "Toutes les études de cas", href: "/etudes-de-cas" },
    ],
    faqTitle: "Questions fréquentes sur Google Ads",
    faq: [
      {
        q: "Quel budget minimum pour Google Ads ?",
        a: "Cela dépend du coût par clic de votre secteur en Belgique. En dessous d'un certain volume de données, l'algorithme ne peut pas apprendre et l'optimisation devient impossible : si votre budget ne permet pas d'atteindre ce seuil, je vous le dis avant de commencer, et on regarde si le SEO n'est pas un meilleur premier levier.",
      },
      {
        q: "Gérez-vous aussi Meta Ads ?",
        a: "Oui, Meta Ads (Facebook et Instagram) en complément du Search, notamment pour le e-commerce et la notoriété. Le canal se choisit selon votre cycle d'achat, pas selon la mode.",
      },
      {
        q: "Y a-t-il une durée d'engagement ?",
        a: "Non. Le pilotage est mensuel et résiliable. Les campagnes ont besoin de quelques semaines d'apprentissage pour donner leur mesure, je le précise au cadrage, mais rien ne vous enferme contractuellement.",
      },
      {
        q: "Quelle différence avec une agence média ?",
        a: "Vous parlez à celui qui a la main sur le compte. Pas de frais de gestion opaques en pourcentage du budget, pas de campagnes laissées en pilote automatique. Et le compte vous appartient : vous gardez l'historique si la collaboration s'arrête.",
      },
      {
        q: "Comment mesurez-vous les résultats ?",
        a: "Conversions configurées proprement avant le premier euro dépensé : leads, appels, ventes selon votre activité. Reporting mensuel lisible : dépense, coût par lead ou ROAS, et décisions prises. Si une campagne ne performe pas, vous le voyez aussi.",
      },
      {
        q: "Intervenez-vous partout en Belgique ?",
        a: "Oui, le pilotage de campagnes se fait à distance, avec des points réguliers en visio ou sur site à Bruxelles et alentours quand c'est utile.",
      },
    ],
    related: ["creation-site-web-belgique", "consultant-seo-bruxelles", "suivi-seo-mensuel"],
    serviceType: "Pay Per Click Advertising",
  },
  {
    slug: "audit-seo",
    name: "Audit SEO et visibilité IA",
    cardText:
      "Un diagnostic complet : performance, sécurité, autorité, mots-clés et présence dans les réponses des IA. Livré avec une feuille de route priorisée.",
    title: "Audit SEO en Belgique : diagnostic complet et visibilité IA",
    description:
      "Audit SEO complet en Belgique : performance mobile et desktop, données terrain, sécurité, autorité, mots-clés et signaux GEO. Chaque constat chiffré, chaque action priorisée par impact et effort.",
    eyebrow: "Audit SEO · Visibilité IA · Belgique",
    h1Pre: "Un audit qui dit ",
    h1Mark: "quoi corriger, dans quel ordre, et pourquoi",
    intro:
      "Neuf volets analysés : performance mobile et desktop, données terrain réelles, sécurité, délivrabilité email, validité du code, autorité de domaine, opportunités de mots-clés, empreinte carbone et signaux GEO. Chaque constat est chiffré, chaque action est priorisée par impact et par effort.",
    scopeTitle: "Neuf volets, un diagnostic, une feuille de route",
    scopeCards: [
      {
        title: "Technique et performance",
        text: "Core Web Vitals en labo (mobile et desktop) et sur vos vrais utilisateurs via Chrome UX Report, ressources bloquantes identifiées fichier par fichier, validité W3C, sécurité des headers HTTP.",
      },
      {
        title: "Visibilité IA (GEO)",
        text: "Données structurées Schema.org, fichier llms.txt, accès des crawlers IA (GPTBot, ClaudeBot, PerplexityBot...), balises essentielles. Ce que les moteurs génératifs peuvent lire de vous, et ce qui leur manque.",
      },
      {
        title: "Autorité et concurrence",
        text: "Profil d'autorité de votre domaine comparé à vos concurrents directs, opportunités de mots-clés issues des suggestions Google réelles, classées par intention.",
      },
      {
        title: "Feuille de route",
        text: "Priorités croisées entre tous les volets, classées par impact et par effort, roadmap 30/60/90 jours. Avec vos données business, l'enjeu se chiffre en euros, prudemment.",
      },
    ],
    proofTitle: "Outillé en propre, éprouvé en mission",
    proofText:
      "L'audit s'appuie sur un outillage que j'ai développé et que j'utilise en mission : neuf analyses exécutées en parallèle sur des données Google officielles (Lighthouse, Chrome UX Report, Safe Browsing), rapport rédigé volet par volet puis synthétisé. Le même niveau d'exigence que pour les audits menés chez Proximus.",
    proofLinks: [
      { label: "Étude de cas Proximus", href: "/etudes-de-cas/proximus" },
    ],
    faqTitle: "Questions fréquentes sur l'audit SEO",
    faq: [
      {
        q: "Que contient concrètement le rapport ?",
        a: "Un résumé exécutif, un chapitre par volet analysé avec les données mesurées, les constats chiffrés et les recommandations, des priorités croisées classées par impact et effort, et une conclusion avec la trajectoire 90 jours. Format PDF, en français, sans jargon inutile.",
      },
      {
        q: "Combien de temps prend un audit ?",
        a: "La collecte et l'analyse outillée sont rapides ; la valeur est dans la lecture d'expert, la priorisation et les recommandations spécifiques à votre contexte. Comptez quelques jours entre le cadrage et la restitution, selon le périmètre.",
      },
      {
        q: "Faut-il me donner des accès ?",
        a: "Non pour l'audit externe : tout s'analyse depuis l'extérieur, comme Google et les IA voient votre site. Les accès Search Console et Analytics sont optionnels et permettent d'aller plus loin sur les mots-clés réels et le comportement des visiteurs.",
      },
      {
        q: "Quelle différence avec un audit gratuit en ligne ?",
        a: "Les outils gratuits sortent des scores ; un audit sérieux dit pourquoi, dans quel ordre corriger, et ce que ça change pour votre activité. La donnée brute est la matière première, la priorisation contextuelle est le livrable.",
      },
      {
        q: "Et après l'audit ?",
        a: "Trois options : votre équipe exécute la feuille de route en autonomie, je l'accompagne sur les chantiers prioritaires, ou on passe en suivi mensuel pour piloter la progression. L'audit est conçu pour être actionnable dans les trois cas.",
      },
      {
        q: "Combien coûte un audit ?",
        a: "Au périmètre : taille du site, langues, profondeur concurrentielle. Devis après un appel de cadrage de 20 minutes, gratuit et sans engagement.",
      },
    ],
    related: ["suivi-seo-mensuel", "consultant-seo-bruxelles", "performance-web"],
    serviceType: "SEO Audit",
  },
  {
    slug: "performance-web",
    name: "Performance web",
    cardText:
      "Core Web Vitals au vert, pages plus rapides, expérience mobile soignée. La vitesse est un critère de classement et un levier de conversion.",
    title: "Performance web et Core Web Vitals : des pages rapides qui convertissent",
    description:
      "Optimisation de la performance web en Belgique : Core Web Vitals (LCP, INP, CLS) mesurés en labo et sur vos vrais utilisateurs, corrections ciblées sans refonte. La vitesse est un levier de classement et de conversion.",
    eyebrow: "Performance web · Core Web Vitals",
    h1Pre: "Chaque seconde de chargement ",
    h1Mark: "coûte des conversions",
    intro:
      "Diagnostic et correction des Core Web Vitals : LCP, INP et CLS, mesurés en laboratoire et sur vos vrais utilisateurs via Chrome UX Report. La performance n'est pas un sujet de développeur : c'est un critère de classement Google et un levier de conversion direct.",
    scopeTitle: "Mesurer, corriger, maintenir : la performance en trois temps",
    scopeCards: [
      {
        title: "Diagnostic labo et terrain",
        text: "Lighthouse mobile et desktop, données réelles Chrome UX Report sur 28 jours, ressources bloquantes identifiées fichier par fichier. On corrige ce qui est mesuré, pas ce qui est supposé.",
      },
      {
        title: "Corrections ciblées",
        text: "Images, polices, scripts bloquants, cache, layout shifts : la plupart des sites gagnent leurs secondes sans refonte. Chaque correction est vérifiée par une nouvelle mesure.",
      },
      {
        title: "Suivi dans le temps",
        text: "Les Core Web Vitals se dégradent à chaque évolution non surveillée du site. Mise en place d'un suivi terrain pour détecter les régressions avant qu'elles ne coûtent.",
      },
      {
        title: "Performance et sobriété",
        text: "Un site rapide est un site léger : moins de poids transféré, c'est aussi une empreinte carbone réduite et un argument RSE mesurable. Les deux objectifs se servent mutuellement.",
      },
    ],
    proofTitle: "Ce site comme étalon public",
    proofText:
      "Le site que vous lisez affiche des Core Web Vitals au vert et une performance Lighthouse de 99-100 en desktop, vérifiables avec les outils publics de Google. C'est le standard que j'applique aux sites que j'optimise, des vitrines B2B aux écosystèmes de plusieurs centaines de milliers de pages.",
    proofLinks: [
      { label: "Audit SEO et visibilité IA", href: "/audit-seo" },
    ],
    faqTitle: "Questions fréquentes sur la performance web",
    faq: [
      {
        q: "C'est quoi, les Core Web Vitals ?",
        a: "Trois métriques d'expérience définies par Google : LCP (vitesse d'affichage du contenu principal), INP (réactivité aux interactions) et CLS (stabilité visuelle de la page). Google les mesure sur vos vrais visiteurs Chrome et les intègre à son classement.",
      },
      {
        q: "Pourquoi mon site est-il plus lent sur mobile ?",
        a: "Le test mobile simule un appareil milieu de gamme sur réseau dégradé : processeur bridé, connexion lente. C'est la réalité d'une partie de vos visiteurs. Un site confortable sur votre ordinateur de bureau peut être pénible sur le smartphone d'un prospect dans le train.",
      },
      {
        q: "La vitesse influence-t-elle vraiment le référencement ?",
        a: "Oui, mais restons précis : c'est un critère de classement parmi des centaines, rarement celui qui fait passer de la page 3 à la page 1. Son effet le plus fort est indirect : moins d'abandons, plus de pages vues, plus de conversions. C'est d'abord un levier business.",
      },
      {
        q: "Faut-il refondre mon site pour le rendre rapide ?",
        a: "Rarement. La majorité des gains vient de corrections ciblées : images mal dimensionnées, polices bloquantes, scripts inutiles, cache absent. La refonte ne se justifie que si le socle technique est structurellement condamné, et je vous le dis si c'est le cas.",
      },
      {
        q: "Travaillez-vous sur WordPress ?",
        a: "Oui. WordPress n'est pas lent par nature, il le devient par accumulation : thèmes lourds, extensions redondantes, médias non optimisés. L'optimisation suit la même méthode que partout : mesurer, corriger, re-mesurer.",
      },
      {
        q: "Comment saurai-je que ça a marché ?",
        a: "Par la mesure avant/après, en labo et sur vos vrais utilisateurs. Les données terrain de Chrome UX Report mettent 28 jours à refléter pleinement les corrections : le rapport final compare les deux états, chiffres à l'appui.",
      },
    ],
    related: ["creation-site-web-belgique", "audit-seo", "suivi-seo-mensuel"],
    serviceType: "Web Performance Optimization",
  },
  {
    slug: "formation-seo-belgique",
    name: "Formation SEO et GEO",
    cardText:
      "Des formations sur mesure pour rédactions et équipes marketing : search intent, E-E-A-T, news SEO et visibilité IA. La compétence reste chez vous.",
    title: "Formation SEO et GEO en Belgique : pour rédactions et équipes marketing",
    description:
      "Formation SEO et GEO en Belgique : search intent, E-E-A-T, news SEO et écriture pour les moteurs d'IA. Ateliers sur mesure, playbooks et accompagnement, en français, néerlandais ou anglais.",
    eyebrow: "Formation · SEO et GEO · Belgique",
    h1Pre: "Former vos équipes pour que la visibilité ",
    h1Mark: "ne dépende plus d'un prestataire",
    intro:
      "J'ai formé des journalistes chez Forbes BeLux et des équipes contenu en environnement télécom : search intent, E-E-A-T, news SEO, écriture pour les moteurs d'IA. Des formats sur mesure, ancrés dans vos contenus réels plutôt que dans des slides théoriques.",
    scopeTitle: "Ateliers, playbooks, accompagnement : la formation qui produit",
    scopeCards: [
      {
        title: "Fondamentaux SEO éditorial",
        text: "Search intent, structure des contenus, métadonnées, maillage : ce que chaque rédacteur doit maîtriser pour que ses contenus portent. Sur vos propres pages, pas sur des exemples génériques.",
      },
      {
        title: "Écriture pour les moteurs d'IA",
        text: "Ce qui fait qu'un contenu est cité par ChatGPT, Perplexity ou les AI Overviews : réponses directes, données vérifiables, structuration. Le volet GEO que peu de formations couvrent.",
      },
      {
        title: "Playbooks sur mesure",
        text: "Des guidelines écrites pour votre contexte : votre ton, vos formats, vos circuits de validation. Le livrable qui reste quand la formation est finie et que les questions reviennent.",
      },
      {
        title: "Accompagnement des premières productions",
        text: "Relectures commentées des premiers contenus produits après la formation : c'est là que les réflexes s'installent. La formation sans suivi retombe en six semaines.",
      },
    ],
    proofTitle: "Des rédactions qui produisent sans moi",
    proofText:
      "Chez Forbes BeLux, j'ai formé les journalistes au search intent, à l'E-E-A-T et au news SEO pendant le lancement du média : les playbooks ont survécu à la mission et structurent encore la production. C'est le seul critère de réussite d'une formation.",
    proofLinks: [
      { label: "Étude de cas Forbes BeLux", href: "/etudes-de-cas/forbes-belux" },
    ],
    faqTitle: "Questions fréquentes sur la formation SEO et GEO",
    faq: [
      {
        q: "À qui s'adressent ces formations ?",
        a: "Aux équipes qui produisent : rédactions, content managers, équipes marketing, chargés de communication. Le niveau s'adapte, du grand débutant à l'équipe aguerrie qui veut intégrer le volet IA. Pas de prérequis technique.",
      },
      {
        q: "En présentiel ou à distance ?",
        a: "Les deux. Présentiel à Bruxelles et partout en Belgique pour les ateliers d'équipe, distanciel pour les formats courts et les suivis. Le présentiel reste plus efficace pour les ateliers pratiques sur vos contenus.",
      },
      {
        q: "Formez-vous en néerlandais et en anglais ?",
        a: "Oui : français natif, anglais professionnel, néerlandais opérationnel. Les supports et playbooks peuvent être livrés dans la langue de travail de votre équipe.",
      },
      {
        q: "Combien de temps dure une formation ?",
        a: "Du format atelier d'une demi-journée au parcours de plusieurs sessions espacées avec exercices entre les deux. Le parcours espacé donne de meilleurs résultats : les réflexes s'installent en produisant, pas en écoutant.",
      },
      {
        q: "Qu'est-ce qu'on garde après la formation ?",
        a: "Les playbooks sur mesure, les supports, et des contenus réels retravaillés ensemble pendant les ateliers. L'objectif est explicitement que vous n'ayez plus besoin de moi pour le quotidien.",
      },
      {
        q: "Quel est le tarif d'une formation ?",
        a: "Au format : nombre de participants, durée, niveau de personnalisation des playbooks. Devis après un appel de cadrage gratuit de 20 minutes.",
      },
    ],
    related: ["strategie-contenu-b2b", "consultant-seo-bruxelles", "consultant-geo-belgique"],
    serviceType: "SEO Training",
  },
  {
    slug: "suivi-seo-mensuel",
    name: "Suivi SEO mensuel",
    cardText:
      "Un rapport complet chaque mois (performance, autorité, visibilité IA, sécurité) et un point d'expert de 45 minutes. Vous savez toujours où vous en êtes.",
    title: "Suivi SEO mensuel : rapport complet et point d'expert chaque mois",
    description:
      "Suivi SEO mensuel : un rapport multi-volets chaque mois (performance terrain, autorité, visibilité IA, sécurité) et un point d'expert de 45 minutes pour décider des actions. Sans engagement de durée.",
    eyebrow: "Abonnement · Suivi mensuel",
    h1Pre: "Votre visibilité, ",
    h1Mark: "pilotée mois après mois",
    intro:
      "Le SEO et le GEO ne sont pas des projets ponctuels : les algorithmes, vos concurrents et les moteurs d'IA bougent en continu. Le suivi mensuel combine un rapport multi-volets généré par mon outillage et un point d'expert de 45 minutes pour décider des actions du mois.",
    scopeTitle: "Rapport, lecture d'expert, décisions : le rythme mensuel",
    scopeCards: [
      {
        title: "Rapport mensuel multi-volets",
        text: "Performance terrain (vrais utilisateurs), sécurité, autorité de domaine face aux concurrents, signaux GEO : la même profondeur d'analyse que l'audit initial, rejouée chaque mois pour mesurer la trajectoire.",
      },
      {
        title: "Point d'expert de 45 minutes",
        text: "La donnée ne décide rien toute seule. Chaque mois, on lit le rapport ensemble, on identifie ce qui a bougé et pourquoi, et on arrête les deux ou trois actions du mois suivant.",
      },
      {
        title: "Veille active",
        text: "Mises à jour d'algorithmes, évolutions des moteurs d'IA, mouvements de vos concurrents : je surveille ce qui peut affecter votre visibilité et je vous préviens quand ça vous concerne.",
      },
      {
        title: "Accès direct",
        text: "Une question entre deux points mensuels ? Vous écrivez, je réponds. Pas de ticket, pas de hotline : un interlocuteur qui connaît votre dossier.",
      },
    ],
    proofTitle: "Le même outillage que mes missions grands comptes",
    proofText:
      "Le reporting mensuel s'appuie sur l'outillage et la discipline de mesure déployés en mission chez Proximus et au Parlement européen : suivi multi-plateforme traduit en rapports exécutifs et en décisions, trimestre après trimestre. Le suivi mensuel applique cette méthode à votre échelle.",
    proofLinks: [
      { label: "Étude de cas Proximus", href: "/etudes-de-cas/proximus" },
    ],
    faqTitle: "Questions fréquentes sur le suivi mensuel",
    faq: [
      {
        q: "Que contient le rapport mensuel ?",
        a: "Les données mesurées du mois (performance terrain, sécurité, autorité, signaux GEO), leur évolution par rapport aux mois précédents, les constats qui en découlent et les priorités proposées. Format PDF lisible par un non-technicien, le même que vous montreriez à votre direction.",
      },
      {
        q: "Y a-t-il un engagement de durée ?",
        a: "Non, c'est mensuel et résiliable. Le SEO récompense la constance, et c'est précisément pour ça que je préfère vous garder par la valeur du suivi plutôt que par une clause contractuelle.",
      },
      {
        q: "Pour quel type d'entreprise est-ce pensé ?",
        a: "Les PME et indépendants qui veulent un pilotage sérieux de leur visibilité sans embaucher, et les équipes marketing qui veulent un regard d'expert mensuel sur leurs données. Si votre site n'a pas encore de socle, on commence par l'audit.",
      },
      {
        q: "Quelle différence avec l'audit ?",
        a: "L'audit est la photo complète à l'instant T, avec sa feuille de route. Le suivi est le film : il mesure si la trajectoire est la bonne, détecte les régressions et adapte les priorités au fil des mises à jour de Google et des mouvements concurrents.",
      },
      {
        q: "Exécutez-vous aussi les actions décidées ?",
        a: "Le suivi inclut le pilotage et les recommandations. L'exécution peut rester chez vous, ou s'ajouter ponctuellement quand un chantier dépasse vos ressources : on le décide action par action, en transparence.",
      },
      {
        q: "Quel est le prix du suivi mensuel ?",
        a: "Un forfait mensuel fixe, établi au périmètre lors de l'appel de cadrage : taille du site, nombre de concurrents suivis, langues. Sans engagement de durée et sans surprise sur la facture.",
      },
    ],
    related: ["audit-seo", "consultant-seo-bruxelles", "consultant-geo-belgique"],
    serviceType: "SEO Consulting",
  },
];

export function getExpertise(slug: string): Expertise | undefined {
  return EXPERTISES.find((e) => e.slug === slug);
}
