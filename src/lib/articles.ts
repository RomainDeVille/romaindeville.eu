export type Block =
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; html: string }
  | { t: "ul"; items: string[] }
  | { t: "quote"; html: string };

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface Article {
  slug: string;
  title: string; // <title> SEO
  h1: string;
  description: string; // meta description
  excerpt: string; // carte d'index
  datePublished: string; // ISO
  dateModified: string; // ISO
  readingMinutes: number;
  tags: string[];
  body: Block[];
  faq: ArticleFaq[];
  related: { label: string; href: string }[];
}

export const articles: Article[] = [
  {
    slug: "search-console-rapport-ia-visibilite-ai-overviews",
    title:
      "Rapport IA de la Search Console : mesurer votre visibilité dans les réponses IA de Google",
    h1: "Search Console mesure enfin votre visibilité dans les réponses IA de Google",
    description:
      "Google déploie ses rapports de performances IA dans la Search Console : impressions dans AI Overviews et AI Mode. Ce qu'ils montrent, leurs limites, et comment adapter votre stratégie SEO et GEO en Belgique.",
    excerpt:
      "Depuis juin 2026, la Search Console mesure vos impressions dans AI Overviews et AI Mode. Décryptage d'expert : ce que le rapport montre, ce qu'il cache encore, et ce que ça change concrètement pour votre visibilité.",
    datePublished: "2026-07-05",
    dateModified: "2026-07-05",
    readingMinutes: 9,
    tags: ["GEO", "SEO", "Search Console", "AI Overviews", "Visibilité IA"],
    body: [
      {
        t: "p",
        html: "Pendant deux ans, une question est restée sans réponse mesurable : quand Google répond à vos clients avec une IA plutôt qu'avec dix liens bleus, votre site est-il cité, ou vos concurrents le sont-ils à votre place ? Depuis juin 2026, Google apporte enfin un début de réponse chiffrée. La Search Console intègre des <strong>rapports de performances pour l'IA générative</strong>, en cours de déploiement élargi tout au long de juillet. Pour la première fois, votre présence dans les AI Overviews et dans AI Mode devient un indicateur que vous pouvez suivre, pas seulement supposer.",
      },
      {
        t: "p",
        html: "C'est un changement de fond. La recherche se déplace vers des réponses générées, et la part de trafic renvoyé vers le web ouvert continue de baisser — un rapport de juin 2026 la situe autour de 27,6 %. Autrement dit, une partie croissante des décisions se forme <em>dans la réponse</em>, avant tout clic. Ce que ce nouveau rapport rend visible, c'est précisément ce terrain-là.",
      },
      { t: "h2", text: "Ce que le rapport montre — et ce qu'il ne montre pas encore" },
      {
        t: "p",
        html: "Le rapport « performances IA générative » ajoute une vue dédiée aux impressions de votre site dans les fonctionnalités génératives de Google : <strong>AI Overviews</strong> et <strong>AI Mode</strong> côté Search, ainsi que les fonctionnalités génératives dans Discover. Une impression y signifie une chose précise : un lien vers votre site a été affiché à un utilisateur au sein d'une réponse générée par l'IA.",
      },
      {
        t: "p",
        html: "Les données sont ventilées comme le reste de la Search Console : par <strong>page</strong>, par <strong>pays</strong>, par <strong>appareil</strong> et par <strong>date</strong> (de l'heure au mois). Vous voyez donc quelles URL apparaissent dans les réponses IA, et pour quels marchés — utile quand on cible la Belgique en français, néerlandais et anglais.",
      },
      {
        t: "p",
        html: "La limite est tout aussi importante à comprendre que la fonctionnalité elle-même : à ce stade, <strong>il n'y a ni clics, ni CTR, ni requêtes</strong> dans ces rapports. Vous mesurez une <em>visibilité</em>, pas encore sa valeur en trafic. Google indique qu'il ajoutera des métriques au fil du temps, sans calendrier ni engagement précis. Il faut donc lire ces chiffres pour ce qu'ils sont : un signal de présence, pas un tableau de bord de conversion.",
      },
      {
        t: "quote",
        html: "Être la source que l'IA cite devient la nouvelle « position 1 » — à la différence près qu'on peut désormais commencer à la mesurer.",
      },
      { t: "h2", text: "Pourquoi c'est un tournant pour le GEO" },
      {
        t: "p",
        html: "Jusqu'ici, le <a href=\"/consultant-geo-belgique\">GEO (Generative Engine Optimization)</a> souffrait d'un handicap : il était difficile à prouver. On pouvait tester manuellement ce que ChatGPT, Perplexity ou Google AI disaient d'une marque, mais sans suivi systématique dans le temps. Ce rapport change la donne côté Google : la visibilité dans les réponses IA sort du domaine de l'intuition pour entrer dans celui de la donnée.",
      },
      {
        t: "p",
        html: "Concrètement, une marque peut désormais constater qu'elle est <strong>bien classée en résultats classiques mais absente des AI Overviews</strong> — ou l'inverse. Ce sont deux batailles distinctes. Une page peut mériter la première place organique et n'être jamais reprise comme source dans la réponse générée, parce que son contenu n'est pas structuré en réponses directes, ne porte pas de signaux d'expertise clairs, ou n'est pas assez explicite pour être « cité ».",
      },
      { t: "h2", text: "Comment y accéder et le lire" },
      {
        t: "p",
        html: "Le déploiement est <strong>progressif</strong> : Google ouvre l'accès à un sous-ensemble de sites, en commençant par le Royaume-Uni avant une diffusion mondiale plus large. Si vous n'avez pas encore la vue dédiée, ce n'est donc pas une erreur de configuration — c'est une question de calendrier. Surveillez l'apparition d'une nouvelle entrée dans le rapport Performances de votre Search Console.",
      },
      {
        t: "p",
        html: "Une fois disponible, la bonne lecture consiste à croiser deux choses : vos <strong>impressions IA</strong> et vos <strong>impressions classiques</strong> sur les mêmes pages. Trois cas de figure méritent votre attention :",
      },
      {
        t: "ul",
        items: [
          "Visible en classique, absent en IA : votre page rank, mais l'IA ne la juge pas assez « citable ». C'est le chantier GEO prioritaire — structure, réponses directes, preuves.",
          "Visible en IA, faible en classique : votre contenu est repris comme source sans forcément bien se positionner. Signal encourageant sur l'autorité de l'entité, à consolider côté SEO technique.",
          "Absent des deux : problème de fond (indexation, pertinence, autorité) qui relève d'un audit complet avant toute optimisation fine.",
        ],
      },
      { t: "h2", text: "Ce que ça change pour votre stratégie de contenu" },
      {
        t: "p",
        html: "Le contexte de juillet 2026 est cohérent avec ce lancement. La mise à jour spam de juin 2026 a de nouveau frappé le contenu de faible valeur, et la responsable de Google Search, Liz Reid, a répété un message limpide : Google veut voir « le bon contenu ressortir ». Les pages génériques qui répètent ce que tout le monde dit reculent vite ; celles qui portent un <strong>auteur réel, des preuves, des cas d'usage précis et une expérience de première main</strong> gagnent du terrain. C'est exactement ce que récompensent aussi les moteurs génératifs quand ils choisissent une source à citer.",
      },
      {
        t: "p",
        html: "En pratique, pour être repris dans une réponse IA — et le voir dans ce rapport — un contenu gagne à : répondre directement à l'intention dès le début de section, structurer l'information en questions-réponses, avancer des données vérifiables, et afficher des signaux d'autorité (auteur identifié, sources, données structurées Schema.org). C'est le cœur d'une <a href=\"/strategie-contenu-b2b\">stratégie de contenu pensée pour Google et pour les IA</a> à la fois.",
      },
      {
        t: "p",
        html: "Un point mérite d'être clarifié, car il circule beaucoup : Google a confirmé en juin 2026 que le fichier <strong>llms.txt n'aide ni ne pénalise</strong> le classement dans Google Search. Ce n'est pas une raison pour le négliger — il reste utile pour d'autres moteurs et pour documenter votre site — mais ce n'est pas le levier qui vous fera apparaître dans les AI Overviews. Le levier, c'est le contenu et l'autorité, pas un fichier.",
      },
      { t: "h2", text: "Les pièges à éviter" },
      {
        t: "ul",
        items: [
          "Sur-réagir aux premières données : le rapport est jeune, l'échantillon partiel, les chiffres bougeront. On observe une tendance sur plusieurs semaines, on ne pilote pas à la journée.",
          "Confondre impressions IA et trafic : sans clics ni CTR, une forte visibilité IA ne garantit pas des visites. C'est un indicateur d'autorité et de notoriété, à ne pas traduire trop vite en euros.",
          "Chercher un raccourci technique : ni llms.txt, ni un réglage magique ne remplacent un contenu qui fait autorité. Les moteurs génératifs citent des sources crédibles, pas des balises.",
          "Ignorer la donnée par langue et par pays : en Belgique, la ventilation par marché (FR/NL/EN) est précieuse pour prioriser les contenus à retravailler.",
        ],
      },
      { t: "h2", text: "Plan d'action concret" },
      {
        t: "ul",
        items: [
          "Vérifiez si votre Search Console propose déjà le rapport IA ; sinon, attendez le déploiement sans forcer.",
          "Dès qu'il est disponible, exportez vos impressions IA par page et comparez-les à vos impressions classiques.",
          "Identifiez vos pages « visibles en classique, absentes en IA » : ce sont vos priorités GEO.",
          "Retravaillez ces pages en réponses directes, avec preuves, auteur et données structurées.",
          "Suivez la tendance sur 4 à 8 semaines avant de conclure quoi que ce soit.",
        ],
      },
      {
        t: "p",
        html: "La bascule vers une recherche assistée par IA n'est plus une prévision : c'est mesurable, dans votre propre Search Console. Les marques qui traitent la visibilité IA comme un chantier piloté — et non comme une curiosité — prennent une avance qui, cette fois, se voit dans les chiffres. Si vous voulez savoir où vous en êtes précisément, un <a href=\"/audit-seo\">audit SEO et visibilité IA</a> croise justement ces deux dimensions ; et un <a href=\"/suivi-seo-mensuel\">suivi mensuel</a> permet d'en piloter la trajectoire.",
      },
    ],
    faq: [
      {
        q: "Qu'est-ce que le rapport de performances IA de la Search Console ?",
        a: "C'est une vue lancée par Google en juin 2026 qui mesure les impressions de votre site dans les fonctionnalités d'IA générative de Google : AI Overviews et AI Mode côté Search, ainsi que les fonctionnalités génératives de Discover. Une impression signifie qu'un lien vers votre site a été affiché dans une réponse générée par l'IA.",
      },
      {
        q: "Le rapport montre-t-il les clics et les requêtes ?",
        a: "Non, pas encore. À ce stade, il n'affiche que des impressions, ventilées par page, pays, appareil et date. Il n'y a ni clics, ni CTR, ni requêtes. Vous mesurez donc une visibilité, pas sa valeur en trafic. Google indique qu'il ajoutera des métriques au fil du temps, sans calendrier précis.",
      },
      {
        q: "Pourquoi je ne vois pas encore ce rapport dans ma Search Console ?",
        a: "Parce que le déploiement est progressif. Google l'ouvre à un sous-ensemble de sites, en commençant par le Royaume-Uni avant une diffusion mondiale plus large. Si vous ne l'avez pas encore, c'est normal : ce n'est pas un problème de configuration, mais une question de calendrier.",
      },
      {
        q: "Le fichier llms.txt aide-t-il à apparaître dans les réponses IA de Google ?",
        a: "Non. Google a confirmé en juin 2026 que llms.txt n'aide ni ne pénalise le classement dans Google Search. Il peut rester utile pour d'autres moteurs et pour documenter votre site, mais ce n'est pas le levier qui vous fera apparaître dans les AI Overviews. Ce qui compte, c'est un contenu à forte autorité, structuré en réponses directes.",
      },
      {
        q: "Comment améliorer ma visibilité dans les AI Overviews ?",
        a: "En travaillant le contenu et l'autorité : répondre directement à l'intention dès le début de section, structurer en questions-réponses, avancer des données vérifiables, afficher un auteur identifié et des données structurées Schema.org. C'est le cœur du GEO. Un audit permet d'identifier précisément les pages à retravailler en priorité.",
      },
    ],
    related: [
      { label: "Consultant GEO Belgique", href: "/consultant-geo-belgique" },
      { label: "Audit SEO et visibilité IA", href: "/audit-seo" },
      { label: "Stratégie de contenu B2B", href: "/strategie-contenu-b2b" },
      { label: "Suivi SEO mensuel", href: "/suivi-seo-mensuel" },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
