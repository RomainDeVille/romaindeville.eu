/* Registre central des tools d'analyse. Ajouter un tool = une entree ici + une route. */

export type ToolId =
  | "pagespeed"
  | "geo"
  | "dns"
  | "security"
  | "carbon"
  | "w3c"
  | "keywords"
  | "authority"
  | "crux-history";

export interface ToolDef {
  id: ToolId;
  name: string;
  description: string;
  endpoint: string;
  needsSeed?: boolean;
  defaultChecked: boolean;
}

export const TOOLS: ToolDef[] = [
  {
    id: "pagespeed",
    name: "Performance PageSpeed",
    description: "Lighthouse mobile + desktop, Core Web Vitals labo et terrain, ressources bloquantes.",
    endpoint: "/api/v1/tools/pagespeed",
    defaultChecked: true,
  },
  {
    id: "geo",
    name: "Visibilite IA (GEO)",
    description: "Schema.org, llms.txt, acces des crawlers IA, meta et Open Graph.",
    endpoint: "/api/v1/tools/geo",
    defaultChecked: true,
  },
  {
    id: "dns",
    name: "DNS et delivrabilite email",
    description: "SPF, DKIM, DMARC, MX : vos emails arrivent-ils en boite de reception ?",
    endpoint: "/api/v1/tools/dns",
    defaultChecked: true,
  },
  {
    id: "security",
    name: "Securite",
    description: "Headers HTTP (HSTS, CSP...), HTTPS et verification Google Safe Browsing.",
    endpoint: "/api/v1/tools/security",
    defaultChecked: true,
  },
  {
    id: "carbon",
    name: "Empreinte carbone",
    description: "Poids de la page et estimation CO2 par visite (modele Sustainable Web Design).",
    endpoint: "/api/v1/tools/carbon",
    defaultChecked: true,
  },
  {
    id: "w3c",
    name: "Validite HTML",
    description: "Erreurs et avertissements du validateur W3C.",
    endpoint: "/api/v1/tools/w3c",
    defaultChecked: false,
  },
  {
    id: "keywords",
    name: "Opportunites de mots-cles",
    description: "Suggestions Google reelles autour d'un mot-cle de depart, clusterisees par intention.",
    endpoint: "/api/v1/tools/keywords",
    needsSeed: true,
    defaultChecked: false,
  },
  {
    id: "authority",
    name: "Autorite de domaine",
    description: "Score OpenPageRank 0-10, comparable a vos concurrents.",
    endpoint: "/api/v1/tools/authority",
    defaultChecked: true,
  },
  {
    id: "crux-history",
    name: "Historique Core Web Vitals",
    description: "Evolution des metriques terrain (vrais utilisateurs) sur ~6 mois.",
    endpoint: "/api/v1/tools/crux-history",
    defaultChecked: true,
  },
];

export interface ToolResult {
  tool: ToolId;
  status: "ok" | "error" | "empty";
  durationMs: number;
  /* Donnees specifiques au tool, structure libre mais serialisable */
  data: unknown;
  error?: string;
}

/* ── Profils de projet : presets de tools ── */

export interface ToolPreset {
  id: string;
  name: string;
  tools: ToolId[];
}

export const PRESETS: ToolPreset[] = [
  { id: "complet", name: "Audit complet", tools: ["pagespeed", "geo", "dns", "security", "carbon", "w3c", "keywords", "authority", "crux-history"] },
  { id: "seo", name: "SEO et contenu", tools: ["geo", "keywords", "authority", "w3c"] },
  { id: "technique", name: "Technique et securite", tools: ["pagespeed", "security", "dns", "carbon", "w3c"] },
  { id: "suivi", name: "Suivi mensuel", tools: ["pagespeed", "crux-history", "security", "dns"] },
];

/* ── Format du rapport unifie : identique quel que soit le choix de tools ── */

export interface UnifiedSection {
  toolId: ToolId;
  title: string;
  verdict: "bon" | "moyen" | "mauvais";
  findings: string;
  recommendations: string;
}

export interface UnifiedPriority {
  title: string;
  why: string;
  how: string;
  impact: "Fort" | "Moyen" | "Faible";
  effort: string;
}

export interface UnifiedReport {
  summary: string;
  sections: UnifiedSection[];
  priorities: UnifiedPriority[];
  businessImpact?: string;
}
