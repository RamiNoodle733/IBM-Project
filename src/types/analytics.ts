export interface AnalyticsSummary {
  totalSessions: number;
  totalDemoCompletions: number;
  avgSessionDuration: number;
  eventCounts: Record<string, number>;
  dailyActivity: DailyActivity[];
  topDemos: TopDemo[];
  engagementByDemo: DemoEngagement[];
}

export interface DailyActivity {
  date: string;
  sessions: number;
  events: number;
}

export interface TopDemo {
  slug: string;
  title: string;
  count: number;
}

export interface DemoEngagement {
  slug: string;
  title: string;
  avgDuration: number;
  completionRate: number;
}

export interface LeadScoreInfo {
  id: string;
  sessionId: string;
  prospectName?: string | null;
  companyName?: string | null;
  email?: string | null;
  score: number;
  signals: string;
  recommended?: string | null;
  calculatedAt: string;
}
