export interface ScoringSignal {
  signal: string;
  points: number;
  category: "engagement" | "discovery" | "follow-up";
}

export interface LeadScoreResult {
  score: number;
  signals: ScoringSignal[];
  recommended: string[];
}

export function calculateLeadScore(params: {
  demoCompleted: boolean;
  questionsAsked: number;
  durationSeconds: number;
  hasProspectName: boolean;
  hasEmail: boolean;
  hasCompanyName: boolean;
  hasPainPoints: boolean;
  hasSuccessMetrics: boolean;
  followUpGenerated: boolean;
  shareLinksOpened: number;
  sessionCount: number;
}): LeadScoreResult {
  const signals: ScoringSignal[] = [];
  const recommended: string[] = [];

  // ENGAGEMENT (max 40)
  if (params.demoCompleted) {
    signals.push({ signal: "Completed demo", points: 15, category: "engagement" });
  } else {
    recommended.push("Follow up to complete the demo walkthrough");
  }

  if (params.questionsAsked >= 3) {
    signals.push({ signal: "Asked 3+ questions", points: 10, category: "engagement" });
  } else if (params.questionsAsked > 0) {
    signals.push({ signal: `Asked ${params.questionsAsked} question(s)`, points: 5, category: "engagement" });
    recommended.push("Encourage more questions during the next interaction");
  }

  if (params.durationSeconds > 300) {
    signals.push({ signal: "Spent 5+ min on demo", points: 5, category: "engagement" });
  }

  if (params.shareLinksOpened > 0) {
    signals.push({ signal: "Viewed shared link", points: 5, category: "engagement" });
  }

  if (params.sessionCount > 1) {
    signals.push({ signal: "Multiple sessions", points: 5, category: "engagement" });
  }

  // DISCOVERY (max 30)
  if (params.hasCompanyName) {
    signals.push({ signal: "Provided company name", points: 5, category: "discovery" });
  } else {
    recommended.push("Identify the prospect's company");
  }

  if (params.hasEmail) {
    signals.push({ signal: "Provided email", points: 10, category: "discovery" });
  } else {
    recommended.push("Collect prospect email for follow-up");
  }

  if (params.hasPainPoints) {
    signals.push({ signal: "Identified pain points", points: 10, category: "discovery" });
  } else {
    recommended.push("Schedule discovery call to identify pain points");
  }

  if (params.hasSuccessMetrics) {
    signals.push({ signal: "Defined success metrics", points: 5, category: "discovery" });
  }

  // FOLLOW-UP (max 30)
  if (params.followUpGenerated) {
    signals.push({ signal: "Follow-up generated", points: 10, category: "follow-up" });
  } else {
    recommended.push("Generate and send follow-up email");
  }

  if (params.shareLinksOpened > 0) {
    signals.push({ signal: "Shared link opened", points: 10, category: "follow-up" });
  } else {
    recommended.push("Share demo recording link with prospect");
  }

  if (params.sessionCount > 1) {
    signals.push({ signal: "Return visitor", points: 10, category: "follow-up" });
  }

  const score = Math.min(100, signals.reduce((sum, s) => sum + s.points, 0));

  return { score, signals, recommended };
}
