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

export interface PageSpeedAudit {
  url: string;
  fetchedAt: string;
  categories: CategoryScore[];
  metrics: AuditMetric[];
  opportunities: AuditMetric[];
  diagnostics: AuditMetric[];
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

export interface AuditRecommendations {
  summary: string;
  scores: ScoreAnalysis[];
  actions: PriorityAction[];
  metrics: MetricDetail[];
  extras: ExtraRecommendation[];
}

export interface AuditReport {
  id: string;
  audit: PageSpeedAudit;
  recommendations: AuditRecommendations;
  createdAt: string;
}
