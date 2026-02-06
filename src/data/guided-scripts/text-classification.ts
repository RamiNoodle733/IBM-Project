import { GuidedStep } from "@/types/guided";

export const textClassificationScript: GuidedStep[] = [
  {
    id: "text-class-welcome",
    phase: "discovery",
    title: "Welcome & Context Setting",
    durationMinutes: 3,
    talkingPoints: [
      "Welcome attendees and introduce the session topic.",
      "Explain what text classification is and why it matters.",
      "Describe common business applications (support ticket routing, sentiment analysis, content tagging).",
      "Preview what the demo will cover.",
    ],
    actions: [
      "Display the agenda slide.",
      "Confirm all participants are present.",
    ],
    tips: [
      "Ask attendees what classification challenges they currently face to build engagement.",
      "Tailor your examples to the prospect's industry.",
    ],
  },
  {
    id: "text-class-input-demo",
    phase: "demo",
    title: "Input & Classification Demo",
    durationMinutes: 7,
    talkingPoints: [
      "Show how to configure classification categories and labels.",
      "Demonstrate single-text classification with a live example.",
      "Walk through batch classification for larger datasets.",
      "Explain the underlying model and how it can be fine-tuned.",
    ],
    actions: [
      "Enter a sample text and run the classifier.",
      "Display the classification result with confidence scores.",
      "Run a batch of 10 sample texts to show throughput.",
    ],
    tips: [
      "Use real-world examples that resonate with the audience.",
      "Highlight the speed of classification to emphasize productivity gains.",
    ],
  },
  {
    id: "text-class-insights",
    phase: "demo",
    title: "Insights & Analytics Review",
    durationMinutes: 5,
    talkingPoints: [
      "Show the analytics dashboard with classification distributions.",
      "Explain how trends and patterns can be identified over time.",
      "Discuss integration with existing BI tools and data pipelines.",
      "Highlight exportable reports and API access for automation.",
    ],
    actions: [
      "Navigate to the analytics dashboard.",
      "Filter results by category and date range.",
      "Export a sample report.",
    ],
    tips: [
      "Connect the analytics back to business KPIs the prospect cares about.",
      "Mention customization options for dashboards.",
    ],
  },
  {
    id: "text-class-questions",
    phase: "qa",
    title: "Questions & Use Case Discussion",
    durationMinutes: 5,
    talkingPoints: [
      "Invite questions from the audience.",
      "Discuss how the solution fits into their current workflows.",
      "Address concerns about model accuracy and training data requirements.",
      "Share case studies of similar implementations.",
    ],
    actions: [
      "Check the chat window for submitted questions.",
      "Facilitate a brief discussion on the prospect's top use case.",
    ],
    tips: [
      "Steer the conversation toward a concrete next step.",
      "If technical questions arise, offer to schedule a deep-dive with engineering.",
    ],
  },
  {
    id: "text-class-close",
    phase: "close",
    title: "Close & Next Steps",
    durationMinutes: 3,
    talkingPoints: [
      "Recap the key benefits demonstrated.",
      "Propose a pilot program or proof-of-concept engagement.",
      "Share pricing overview and implementation timeline.",
      "Thank everyone and confirm follow-up actions.",
    ],
    actions: [
      "Display the closing slide with next steps.",
      "Confirm the follow-up meeting date.",
    ],
    tips: [
      "Reiterate the ROI potential based on the prospect's specific use case.",
      "Send a personalized follow-up email with demo recording if available.",
    ],
  },
];
