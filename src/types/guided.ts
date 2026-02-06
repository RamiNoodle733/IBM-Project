export interface GuidedStep {
  id: string;
  phase: "discovery" | "demo" | "qa" | "close";
  title: string;
  durationMinutes: number;
  talkingPoints: string[];
  actions: string[];
  tips: string[];
}

export interface DiscoveryQuestion {
  id: string;
  category: string;
  question: string;
  type: "text" | "select" | "multiselect";
  options?: string[];
}

export interface Objection {
  id: string;
  objection: string;
  response: string;
  dataPoints: string[];
}
