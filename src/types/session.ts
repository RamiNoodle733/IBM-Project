export interface SessionInfo {
  id: string;
  demoId: string;
  demoSlug?: string;
  demoTitle?: string;
  shareId?: string | null;
  prospectName?: string | null;
  prospectEmail?: string | null;
  companyName?: string | null;
  industry?: string | null;
  painPoints?: string | null;
  successMetrics?: string | null;
  status: string;
  startedAt: string;
  completedAt?: string | null;
  durationSeconds?: number | null;
}

export interface InteractionInfo {
  id: string;
  type: string;
  role: string;
  content: string;
  metadata?: string | null;
  createdAt: string;
}

export interface FollowUpInfo {
  recapEmail: string;
  actionPlan: ActionPlanStep[];
  valueProps: ValueProp[];
}

export interface ActionPlanStep {
  step: string;
  timeline: string;
  details: string;
}

export interface ValueProp {
  title: string;
  description: string;
  relevantPainPoint: string;
}
