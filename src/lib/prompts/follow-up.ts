export function buildFollowUpPrompt(context: {
  prospectName?: string;
  companyName?: string;
  industry?: string;
  demoTitle: string;
  painPoints?: string;
  successMetrics?: string;
  interactions: string;
}): string {
  return `You are a sales follow-up specialist for an AI & Data solutions company.
Based on the demo session information below, generate three outputs.

SESSION CONTEXT:
- Prospect: ${context.prospectName || "Unknown"}${context.companyName ? ` at ${context.companyName}` : ""}
- Industry: ${context.industry || "Not specified"}
- Demo shown: ${context.demoTitle}
- Pain points: ${context.painPoints || "Not specified"}
- Success metrics: ${context.successMetrics || "Not specified"}
- Key interactions during demo:
${context.interactions}

Generate this exact JSON:
{
  "recapEmail": "A professional email (under 300 words) recapping the demo, addressing specific pain points, and proposing next steps. Include a subject line at the top.",
  "actionPlan": [
    {"step": "action item", "timeline": "e.g. Within 2 days", "details": "specific details"}
  ],
  "valueProps": [
    {"title": "value prop title", "description": "explanation", "relevantPainPoint": "which pain point this addresses"}
  ]
}

Generate 4-6 action plan steps and 3-4 value propositions. Return valid JSON only.`;
}
