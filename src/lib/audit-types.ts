export interface CategoryScore {
  id: string;
  title: string;
  score: number;
}

export interface AuditMetric {
  id: string;
  title: string;
  score: number | null;
  displayValue?: string;
}

export interface BlockingResource {
  url: string;
  wastedMs?: number;
  totalBytes?: number;
}

export interface FieldMetric {
  name: string;
  displayValue: string;
  category: "FAST" | "AVERAGE" | "SLOW";
}

export interface DesktopSummary {
  categories: CategoryScore[];
  metrics: AuditMetric[];
}

export interface PageSpeedAudit {
  url: string;
  fetchedAt: string;
  categories: CategoryScore[];
  metrics: AuditMetric[];
  opportunities: AuditMetric[];
  diagnostics: AuditMetric[];
  blockingResources?: BlockingResource[];
  fieldData?: FieldMetric[];
  fieldDataSource?: "url" | "origin";
  desktop?: DesktopSummary;
}

export interface GeoBotRule {
  bot: string;
  allowed: boolean;
}

export interface GeoAudit {
  schemaTypes: string[];
  hasLlmsTxt: boolean;
  robotsTxtFound: boolean;
  robotsAiBots: GeoBotRule[];
  metaDescription: boolean;
  ogTags: boolean;
  h1Count: number;
}

export interface BusinessInputs {
  monthlyVisits?: number;
  conversionRate?: number;
  avgOrderValue?: number;
}

export interface ScoreAnalysis {
  category: string;
  score: number;
  verdict: "bon" | "moyen" | "mauvais";
  analysis: string;
}

export interface PriorityAction {
  title: string;
  problem: string;
  importance: string;
  fix: string;
  impact: "Fort" | "Moyen" | "Faible";
  effort?: string;
}

export interface MetricDetail {
  name: string;
  value: string;
  verdict: "Bon" | "À améliorer" | "Mauvais";
  thresholds: string;
  explanation: string;
}

export interface ExtraRecommendation {
  title: string;
  description: string;
}

export interface RoadmapItem {
  horizon: "30 jours" | "60 jours" | "90 jours";
  title: string;
  effort: string;
  expectedResult: string;
}

export interface AuditRecommendations {
  summary: string;
  scores: ScoreAnalysis[];
  actions: PriorityAction[];
  metrics: MetricDetail[];
  extras: ExtraRecommendation[];
  businessImpact?: string;
  geoAnalysis?: string;
  roadmap?: RoadmapItem[];
}

export interface AuditReport {
  id: string;
  audit: PageSpeedAudit;
  recommendations: AuditRecommendations;
  createdAt: string;
  geo?: GeoAudit | null;
  business?: BusinessInputs | null;
}
