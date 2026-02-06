import { GuidedStep } from "@/types/guided";

export const documentQAScript: GuidedStep[] = [
  {
    id: "doc-qa-welcome",
    phase: "discovery",
    title: "Welcome & Introduction",
    durationMinutes: 3,
    talkingPoints: [
      "Thank the attendees for joining the session.",
      "Introduce yourself and your role at IBM.",
      "Briefly outline what Document Q&A can do for their organization.",
      "Set expectations for the demo timeline and interactive portions.",
    ],
    actions: [
      "Share your screen with the welcome slide.",
      "Confirm all attendees can see and hear you.",
    ],
    tips: [
      "Use the attendee's company name early to personalize the experience.",
      "Keep the introduction concise -- momentum matters.",
    ],
  },
  {
    id: "doc-qa-demo-setup",
    phase: "demo",
    title: "Demo Setup & Data Ingestion",
    durationMinutes: 5,
    talkingPoints: [
      "Explain the types of documents supported (PDF, Word, plain text).",
      "Walk through the ingestion pipeline and how documents are indexed.",
      "Highlight security and data-handling practices.",
      "Mention configurable chunking and embedding strategies.",
    ],
    actions: [
      "Upload a sample document into the Document Q&A interface.",
      "Show the processing status and confirmation.",
    ],
    tips: [
      "Use a document relevant to the prospect's industry if possible.",
      "Pause to let the ingestion complete before moving on.",
    ],
  },
  {
    id: "doc-qa-live-qa",
    phase: "demo",
    title: "Live Q&A Demonstration",
    durationMinutes: 7,
    talkingPoints: [
      "Demonstrate asking natural-language questions against the uploaded document.",
      "Show how the system retrieves relevant passages and synthesizes answers.",
      "Highlight citation and source-linking capabilities.",
      "Discuss accuracy, confidence scoring, and how hallucinations are minimized.",
    ],
    actions: [
      "Ask three prepared questions that showcase different answer types.",
      "Point out the citations panel and source references.",
    ],
    tips: [
      "Prepare fallback questions in case the live demo encounters issues.",
      "Emphasize the speed and relevance of the answers.",
    ],
  },
  {
    id: "doc-qa-questions",
    phase: "qa",
    title: "Audience Questions & Discussion",
    durationMinutes: 5,
    talkingPoints: [
      "Open the floor for questions from attendees.",
      "Address common concerns around accuracy, data privacy, and integration.",
      "Relate answers back to the prospect's specific use cases.",
      "Share relevant customer success stories if applicable.",
    ],
    actions: [
      "Monitor the chat for written questions.",
      "Invite attendees to unmute and ask questions directly.",
    ],
    tips: [
      "If a question is outside your expertise, note it and promise a follow-up.",
      "Keep answers concise to leave time for multiple questions.",
    ],
  },
  {
    id: "doc-qa-close",
    phase: "close",
    title: "Wrap-Up & Next Steps",
    durationMinutes: 3,
    talkingPoints: [
      "Summarize the key takeaways from the demo.",
      "Outline recommended next steps (pilot program, technical deep-dive, etc.).",
      "Provide contact information and available resources.",
      "Thank attendees for their time.",
    ],
    actions: [
      "Share the follow-up slide with links and contact details.",
      "Send a calendar invite for the next meeting before ending the call.",
    ],
    tips: [
      "End with a clear call to action.",
      "Follow up with a recap email within 24 hours.",
    ],
  },
];
