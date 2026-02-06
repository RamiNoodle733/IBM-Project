import { GuidedStep } from "@/types/guided";

export const dataSummarizationScript: GuidedStep[] = [
  {
    id: "data-sum-welcome",
    phase: "discovery",
    title: "Welcome & Agenda Overview",
    durationMinutes: 3,
    talkingPoints: [
      "Greet attendees and introduce yourself.",
      "Explain the purpose of the Data Summarization demo.",
      "Describe common pain points: information overload, manual report creation, slow insights.",
      "Outline the session agenda and expected duration.",
    ],
    actions: [
      "Share the agenda slide.",
      "Do a quick roll call or attendee check.",
    ],
    tips: [
      "Reference a recent industry report or statistic about data volume growth.",
      "Ask attendees how much time they spend on manual summarization tasks.",
    ],
  },
  {
    id: "data-sum-data-upload",
    phase: "demo",
    title: "Data Upload & Configuration",
    durationMinutes: 5,
    talkingPoints: [
      "Walk through supported data formats (CSV, JSON, structured databases).",
      "Show how to upload or connect a data source.",
      "Explain configuration options: summary length, focus areas, output format.",
      "Highlight data security and privacy controls.",
    ],
    actions: [
      "Upload a sample dataset into the summarization tool.",
      "Configure the summarization parameters.",
    ],
    tips: [
      "Use a dataset relevant to the prospect's domain.",
      "Mention that the tool supports both one-time uploads and live data connections.",
    ],
  },
  {
    id: "data-sum-generate-report",
    phase: "demo",
    title: "Generate & Review Summary Report",
    durationMinutes: 7,
    talkingPoints: [
      "Trigger the summarization process and explain what is happening behind the scenes.",
      "Walk through the generated summary, highlighting key insights.",
      "Show how users can drill down into specific sections for more detail.",
      "Demonstrate editing and refining the summary output.",
    ],
    actions: [
      "Click 'Generate Summary' and wait for the report.",
      "Scroll through the report, pointing out key sections.",
      "Demonstrate the drill-down capability on a specific insight.",
    ],
    tips: [
      "Compare the time taken by the tool vs. manual effort to emphasize value.",
      "Let the audience see the full report before moving on.",
    ],
  },
  {
    id: "data-sum-questions",
    phase: "qa",
    title: "Interactive Q&A Session",
    durationMinutes: 5,
    talkingPoints: [
      "Open the floor for audience questions.",
      "Address common concerns: accuracy of summaries, handling edge cases, scalability.",
      "Discuss integration with the prospect's existing tools and workflows.",
      "Share success stories from similar deployments.",
    ],
    actions: [
      "Monitor chat and raised hands for questions.",
      "Demonstrate any requested feature live if feasible.",
    ],
    tips: [
      "Have a few pre-prepared FAQs ready in case the audience is quiet.",
      "Redirect overly technical questions to a follow-up session.",
    ],
  },
  {
    id: "data-sum-close",
    phase: "close",
    title: "Summary & Next Steps",
    durationMinutes: 3,
    talkingPoints: [
      "Recap the main capabilities demonstrated.",
      "Highlight the business value: time savings, consistency, scalability.",
      "Propose next steps: trial access, technical workshop, or executive briefing.",
      "Provide your contact information and resource links.",
    ],
    actions: [
      "Show the closing slide with key takeaways.",
      "Send a follow-up calendar invite before ending.",
    ],
    tips: [
      "End on a strong note by tying the demo back to the prospect's stated goals.",
      "Follow up within 24 hours with a summary email and relevant materials.",
    ],
  },
];
