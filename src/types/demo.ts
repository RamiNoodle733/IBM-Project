export interface DemoInfo {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  sortOrder: number;
}

export interface DocumentInfo {
  id: string;
  fileName: string;
  fileType: string;
  isPreloaded: boolean;
}

export interface ChatMessageType {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  createdAt: Date;
}

export interface Citation {
  text: string;
  source: string;
}

export interface ClassificationResult {
  text: string;
  sentiment: "positive" | "negative" | "neutral" | "mixed";
  category: string;
  urgency: "high" | "medium" | "low";
  confidence: number;
  keyPhrases: string[];
}

export interface DataSummaryResult {
  summary: string;
  keyMetrics: KeyMetric[];
  insights: string[];
  trends: string[];
}

export interface KeyMetric {
  label: string;
  value: string;
  trend: "up" | "down" | "flat";
}
