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
  {
    slug: "recherche-agentique-preparer-site-agents-google",
    title: "Recherche agentique : préparer votre site aux agents Google",
    h1: "Recherche agentique : quand l'agent de Google visite votre site à la place du client",
    description:
      "Agents d'information, réservation agentique, appels automatisés : Google déploie la recherche agentique. Ce que ça change et comment préparer votre site.",
    excerpt:
      "Depuis I/O 2026, Google déploie des agents qui cherchent, comparent et agissent à la place de l'utilisateur. Analyse d'expert : ce qui est réellement lancé, ce qui reste incertain, et les chantiers concrets pour rester dans la sélection.",
    datePublished: "2026-07-05",
    dateModified: "2026-07-05",
    readingMinutes: 10,
    tags: ["Recherche agentique", "Agents IA", "AI Mode", "SEO", "GEO"],
    body: [
      {
        t: "p",
        html: "Le 19 mai 2026, à la conférence I/O, Google a officialisé un basculement que le secteur voyait venir : l'entrée dans « l'ère des agents de recherche ». AI Mode, devenu l'expérience par défaut, a dépassé le <strong>milliard d'utilisateurs mensuels</strong> un an après son lancement, avec des requêtes qui, selon Google, font plus que doubler chaque trimestre. Et sur cette base, Google déploie désormais des <strong>agents</strong> : des IA qui cherchent, surveillent, comparent — et commencent à agir — à la place de l'utilisateur.",
      },
      {
        t: "p",
        html: "Pour une PME, un média ou une institution en Belgique, la question n'est plus « comment plaire à un lecteur qui parcourt des résultats », mais aussi : <em>que voit un agent quand il visite mon site pour le compte de mon client ?</em> Cet article fait le tri entre ce qui est réellement déployé, ce qui reste une promesse, et les chantiers concrets à lancer dès maintenant.",
      },
      { t: "h2", text: "Ce que Google déploie concrètement depuis I/O 2026" },
      {
        t: "p",
        html: "Premier étage de la fusée : les <strong>agents d'information</strong>. Ils tournent en arrière-plan, en continu, et surveillent le web — blogs, sites d'actualité, réseaux sociaux — ainsi que les données fraîches de Google (finance, shopping, sport) pour répondre à une mission précise : « préviens-moi quand un bien correspond à mes critères », « alerte-moi si ce prix change ». L'agent envoie ensuite une synthèse, avec la possibilité d'agir. Le déploiement a commencé en juin 2026 dans AI Mode, d'abord réservé aux abonnés Google AI Pro et Ultra.",
      },
      {
        t: "p",
        html: "Deuxième étage : la <strong>réservation agentique</strong>. Google l'étend à un large éventail de services et d'expériences locales : l'utilisateur décrit ses critères, Search assemble prix et disponibilités à jour, puis renvoie des liens directs pour finaliser la réservation chez le prestataire. Pour certaines catégories — réparation à domicile, beauté, soins pour animaux — Google peut même <strong>appeler les commerces</strong> à la place de l'utilisateur. Ces capacités transactionnelles sont annoncées pour « tout le monde », mais aux États-Unis d'abord, cet été.",
      },
      {
        t: "p",
        html: "S'y ajoutent une interface générative (des tableaux de bord et mini-applications que Search code à la volée pour des tâches récurrentes) et l'extension de Personal Intelligence — la connexion du contexte personnel de l'utilisateur (Gmail, Photos) à AI Mode — à près de 200 pays et 98 langues, sans abonnement. La direction est limpide : Google ne veut plus seulement répondre, il veut <strong>exécuter</strong>.",
      },
      { t: "h2", text: "Pourquoi c'est un changement de nature, pas de degré" },
      {
        t: "p",
        html: "Depuis vingt ans, le SEO consiste à convaincre un humain à deux moments : dans la page de résultats (le clic), puis sur le site (la conversion). La recherche agentique insère un troisième acteur entre les deux. L'agent lit, filtre et présélectionne <em>avant</em> que votre client ne voie quoi que ce soit. Il ne se laisse pas séduire par un slogan ; il compare des données : prix, disponibilité, délais, avis, conditions.",
      },
      {
        t: "quote",
        html: "Avec la recherche agentique, votre premier visiteur n'est plus toujours un humain : c'est un agent mandaté par votre client. S'il ne trouve pas l'information, il ne rappelle pas — il passe au concurrent suivant.",
      },
      {
        t: "p",
        html: "Concrètement, deux conséquences. D'abord, <strong>l'exactitude des données devient un facteur de sélection de fait</strong> : un horaire obsolète, un prix caché derrière un formulaire, un stock non renseigné suffisent à sortir d'une présélection automatisée. Ensuite, la persuasion se déplace : l'argumentaire de marque compte toujours, mais plus tard dans le parcours, une fois la présélection passée. Le milieu de l'entonnoir se joue désormais en partie de machine à machine.",
      },
      { t: "h2", text: "Être « actionnable » : les chantiers qui comptent" },
      { t: "h3", text: "Des données exactes, fraîches et structurées" },
      {
        t: "p",
        html: "Les agents s'appuient sur l'index de Google et sur ses données fraîches. Votre travail : rendre l'information de votre offre lisible par une machine. Données structurées Schema.org complètes (LocalBusiness, Product, Offer, Event, horaires), cohérence stricte entre votre site, votre fiche Google Business Profile et vos éventuels flux produits. Google a d'ailleurs rappelé en juin 2026 que le <strong>HTML propre reste le standard</strong> pour Search — pas des fichiers annexes ni des formats parallèles.",
      },
      { t: "h3", text: "Une offre lisible : prix, disponibilités, conditions" },
      {
        t: "p",
        html: "La réservation agentique assemble « les derniers prix et disponibilités ». Un site vitrine qui masque ses tarifs derrière « contactez-nous » était déjà un frein pour l'utilisateur ; face à un agent, c'est une exclusion pure et simple de la sélection. Publier prix, créneaux, délais et conditions n'est plus seulement une question de transparence commerciale : c'est une condition d'existence dans les réponses agentiques. C'est un arbitrage réel — certains secteurs B2B vivent du devis sur mesure — mais il doit désormais être fait en connaissance de cause.",
      },
      { t: "h3", text: "Le socle technique : indexabilité, vitesse, fiabilité" },
      {
        t: "p",
        html: "Un agent qui rencontre un site lent, des pages en erreur ou un rendu dépendant d'interactions complexes travaillera avec ce qu'il a — c'est-à-dire vos concurrents. Les fondamentaux restent les mêmes qu'en SEO classique, mais leur coût d'échec augmente : l'humain patient recharge une page, l'agent non. Un socle sain se vérifie par un <a href=\"/audit-seo\">audit technique</a> et se maintient via la <a href=\"/performance-web\">performance web</a> ; si le site doit être refondu, autant le <a href=\"/creation-site-web-belgique\">concevoir d'emblée pour les humains et les machines</a>.",
      },
      { t: "h3", text: "L'autorité éditoriale reste le filtre final" },
      {
        t: "p",
        html: "Les agents d'information synthétisent des sources ; ils héritent donc des critères de qualité de Google — renforcés encore par la mise à jour spam de juin 2026. Un contenu signé par un auteur identifiable, appuyé sur des preuves et une expérience réelle, garde toutes ses chances d'être repris dans une synthèse d'agent. C'est le prolongement direct du <a href=\"/consultant-geo-belgique\">travail GEO</a> et d'une <a href=\"/strategie-contenu-b2b\">stratégie de contenu</a> pensée pour être citée, pas seulement lue.",
      },
      { t: "h2", text: "Belgique : calendrier réel et zones d'incertitude" },
      {
        t: "p",
        html: "Soyons précis sur ce qui vous concerne aujourd'hui. AI Mode par défaut, la nouvelle barre de recherche et Personal Intelligence sont <strong>mondiaux</strong>, donc actifs pour vos clients belges. En revanche, la réservation agentique et les appels automatisés démarrent <strong>aux États-Unis</strong>, sans calendrier annoncé pour l'Europe — où les contraintes réglementaires (DMA, RGPD) rendent toute date incertaine. Les agents d'information, eux, sont disponibles mais payants (abonnés Pro et Ultra), ce qui limite leur adoption à court terme.",
      },
      {
        t: "p",
        html: "Deux réserves d'honnêteté intellectuelle. Un : Google a un intérêt commercial évident à présenter cette bascule comme inévitable ; les chiffres d'usage réels des agents ne sont pas publics, et l'histoire récente compte des fonctionnalités annoncées en fanfare puis discrètement revues. Deux : rien n'indique que tous les secteurs seront touchés au même rythme — l'hôtellerie, la restauration et les services locaux sont en première ligne, l'industrie B2B complexe bien plus tard. La bonne posture n'est ni la panique ni le déni : c'est de faire maintenant les chantiers qui sont utiles <em>dans tous les scénarios</em> — données exactes, offre lisible, socle technique sain, autorité éditoriale.",
      },
      { t: "h2", text: "Plan d'action concret" },
      {
        t: "ul",
        items: [
          "Auditez la « lisibilité machine » de votre offre : prix, disponibilités, horaires et conditions sont-ils publiés, exacts et balisés en Schema.org ?",
          "Alignez site, Google Business Profile et flux produits : toute incohérence entre ces sources est un signal de non-fiabilité pour un agent.",
          "Vérifiez le socle technique (indexation, vitesse, erreurs) : ce qui gênait un humain élimine un agent.",
          "Renforcez les contenus qui font autorité sur vos requêtes commerciales : ce sont eux que les agents d'information reprennent dans leurs synthèses.",
          "Mettez en place une veille trimestrielle sur l'arrivée des capacités agentiques en Europe, plutôt qu'une réaction dans l'urgence le jour J.",
        ],
      },
      {
        t: "p",
        html: "La recherche agentique ne supprime pas le SEO : elle en durcit les exigences et en déplace le point de contact. Les sites qui gagneront sont ceux qui seront à la fois convaincants pour un humain et exploitables par une machine. Si vous voulez savoir où se situe votre site sur ces deux axes, c'est exactement le type de diagnostic qu'un <a href=\"/consultant-seo-bruxelles\">accompagnement SEO</a> doublé d'un <a href=\"/suivi-seo-mensuel\">suivi mensuel</a> permet d'objectiver, chiffres à l'appui.",
      },
      {
        t: "p",
        html: "<strong>Sources</strong> : <a href=\"https://blog.google/products-and-platforms/products/search/search-io-2026/\" rel=\"noopener\">Google — A new era for AI Search (I/O 2026, Liz Reid)</a> ; <a href=\"https://www.seroundtable.com/july-2026-google-webmaster-report-41591.html\" rel=\"noopener\">Search Engine Roundtable — July 2026 Google Webmaster Report</a> ; <a href=\"https://www.seroundtable.com/google-search-information-agents-41502.html\" rel=\"noopener\">Search Engine Roundtable — Google Search Rolls Out Information Agents In AI Mode</a>.",
      },
    ],
    faq: [
      {
        q: "Qu'est-ce que la recherche agentique ?",
        a: "C'est une recherche où une IA n'affiche plus seulement des résultats, mais exécute des tâches pour l'utilisateur : surveiller un sujet en continu, comparer des offres, assembler prix et disponibilités, réserver, voire appeler un commerce. Google a officialisé cette « ère des agents de recherche » à I/O 2026 et déploie les premières briques dans AI Mode depuis juin 2026.",
      },
      {
        q: "Les agents de Google sont-ils déjà actifs en Belgique ?",
        a: "Partiellement. AI Mode par défaut, la nouvelle barre de recherche et Personal Intelligence sont déployés mondialement, donc en Belgique. Les agents d'information sont disponibles mais réservés aux abonnés Google AI Pro et Ultra. La réservation agentique et les appels automatisés démarrent aux États-Unis, sans calendrier annoncé pour l'Europe.",
      },
      {
        q: "Comment préparer mon site pour les agents IA ?",
        a: "Quatre chantiers : publier une offre lisible par une machine (prix, disponibilités, horaires, conditions, balisage Schema.org) ; garantir la cohérence entre site, fiche Google Business Profile et flux produits ; assainir le socle technique (indexation, vitesse, erreurs) ; et renforcer les contenus qui font autorité, car ce sont eux que les agents citent dans leurs synthèses.",
      },
      {
        q: "La recherche agentique remplace-t-elle le SEO classique ?",
        a: "Non. Les agents s'appuient sur l'index et les critères de qualité de Google : un site mal indexé, lent ou sans autorité n'existe ni pour les résultats classiques, ni pour les agents. La recherche agentique ajoute une exigence — être exploitable par une machine — sans retirer les fondamentaux du SEO et du GEO.",
      },
      {
        q: "Faut-il publier ses prix pour apparaître dans les réponses agentiques ?",
        a: "Pour les secteurs transactionnels (services locaux, réservation, e-commerce), oui : les agents assemblent prix et disponibilités, et une offre opaque sort de la présélection. Pour le B2B complexe au devis sur mesure, l'arbitrage reste possible, mais il faut alors soigner d'autant plus les signaux publics : périmètre, fourchettes, conditions, preuves.",
      },
    ],
    related: [
      { label: "Consultant GEO Belgique", href: "/consultant-geo-belgique" },
      { label: "Consultant SEO à Bruxelles", href: "/consultant-seo-bruxelles" },
      { label: "Création de site web en Belgique", href: "/creation-site-web-belgique" },
      { label: "Performance web", href: "/performance-web" },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
