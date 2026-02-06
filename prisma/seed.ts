import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.analyticsEvent.deleteMany();
  await prisma.interaction.deleteMany();
  await prisma.followUp.deleteMany();
  await prisma.leadScore.deleteMany();
  await prisma.demoSession.deleteMany();
  await prisma.document.deleteMany();
  await prisma.demo.deleteMany();

  // Create Demos
  const docQA = await prisma.demo.create({
    data: {
      slug: "document-qa",
      title: "Document Q&A / Knowledge Assistant",
      description:
        "Ask questions about your documents and get AI-powered answers with source citations. Upload PDFs, text files, or use pre-loaded enterprise documents.",
      category: "AI",
      icon: "Document",
      sortOrder: 1,
    },
  });

  const textClass = await prisma.demo.create({
    data: {
      slug: "text-classification",
      title: "Text Classification & Insights",
      description:
        "Automatically classify customer feedback by sentiment, category, and urgency. View insights through interactive charts and dashboards.",
      category: "Analytics",
      icon: "Category",
      sortOrder: 2,
    },
  });

  await prisma.demo.create({
    data: {
      slug: "data-summarization",
      title: "Data Summarization & Reports",
      description:
        "Upload CSV data and instantly generate executive summaries with key metrics, actionable insights, and trend analysis.",
      category: "Data",
      icon: "ChartLine",
      sortOrder: 3,
    },
  });

  // Load and create pre-loaded documents
  const sampleDataDir = path.join(process.cwd(), "public", "sample-data");

  const productManual = fs.readFileSync(
    path.join(sampleDataDir, "product-manual.txt"),
    "utf-8"
  );
  const faqDoc = fs.readFileSync(
    path.join(sampleDataDir, "faq-document.txt"),
    "utf-8"
  );

  await prisma.document.create({
    data: {
      demoId: docQA.id,
      fileName: "DataSphere Pro - Product Manual.txt",
      fileType: "txt",
      content: productManual,
      isPreloaded: true,
    },
  });

  await prisma.document.create({
    data: {
      demoId: docQA.id,
      fileName: "AI Solutions - FAQ.txt",
      fileType: "txt",
      content: faqDoc,
      isPreloaded: true,
    },
  });

  // Create a sample completed session
  const sampleSession = await prisma.demoSession.create({
    data: {
      demoId: docQA.id,
      prospectName: "Sarah Chen",
      prospectEmail: "sarah.chen@acmecorp.com",
      companyName: "Acme Corporation",
      industry: "Technology",
      painPoints: JSON.stringify([
        "Manual data processing",
        "Difficulty finding information",
        "Slow reporting cycles",
      ]),
      successMetrics: JSON.stringify([
        "Time saved per task",
        "Improved accuracy",
        "Employee productivity",
      ]),
      status: "completed",
      completedAt: new Date(),
      durationSeconds: 847,
    },
  });

  await prisma.interaction.createMany({
    data: [
      {
        sessionId: sampleSession.id,
        type: "question",
        role: "user",
        content: "What are the key features of DataSphere Pro?",
      },
      {
        sessionId: sampleSession.id,
        type: "answer",
        role: "assistant",
        content:
          "DataSphere Pro offers four key capabilities: **Document Intelligence** for AI-powered document analysis, **Predictive Analytics** for forecasting trends, **Real-time Dashboards** for live data visualization, and **Natural Language Queries** that let you ask questions in plain English. [Source: DataSphere Pro - Product Manual.txt]",
        metadata: JSON.stringify({
          citations: [
            {
              text: "Document Intelligence, Predictive Analytics, Real-time Dashboards, Natural Language Queries",
              source: "DataSphere Pro - Product Manual.txt",
            },
          ],
        }),
      },
      {
        sessionId: sampleSession.id,
        type: "question",
        role: "user",
        content: "What security certifications does the platform have?",
      },
      {
        sessionId: sampleSession.id,
        type: "answer",
        role: "assistant",
        content:
          "The platform maintains **SOC 2 Type II** certification (audited annually), **GDPR** compliance, and **HIPAA** readiness with Business Associate Agreements available. All data is encrypted using AES-256 at rest and TLS 1.3 in transit. **ISO 27001** certification is also maintained, and FedRAMP authorization is in progress. [Source: AI Solutions - FAQ.txt]",
        metadata: JSON.stringify({
          citations: [
            {
              text: "SOC 2 Type II, GDPR, HIPAA, ISO 27001",
              source: "AI Solutions - FAQ.txt",
            },
          ],
        }),
      },
    ],
  });

  // Create sample analytics events
  const now = new Date();
  const eventData: {
    eventType: string;
    page?: string;
    sessionId?: string;
    createdAt: Date;
  }[] = [];

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const sessionsForDay = Math.floor(Math.random() * 5) + 1;

    for (let j = 0; j < sessionsForDay; j++) {
      eventData.push({
        eventType: "page_view",
        page: "/demos",
        createdAt: date,
      });
      if (Math.random() > 0.3) {
        eventData.push({
          eventType: "demo_start",
          sessionId: sampleSession.id,
          page: "/demos/document-qa",
          createdAt: date,
        });
      }
      if (Math.random() > 0.5) {
        eventData.push({
          eventType: "demo_complete",
          sessionId: sampleSession.id,
          page: "/demos/document-qa",
          createdAt: date,
        });
      }
    }
  }

  await prisma.analyticsEvent.createMany({ data: eventData });

  // Create a sample follow-up
  await prisma.followUp.create({
    data: {
      sessionId: sampleSession.id,
      recapEmail:
        "Subject: Great connecting today - DataSphere Pro for Acme Corporation\n\nHi Sarah,\n\nThank you for taking the time to explore DataSphere Pro today. I really enjoyed learning about Acme Corporation's data challenges.\n\nBased on our conversation, I believe DataSphere Pro can address your key pain points:\n\n- **Manual data processing**: Our Document Intelligence module automates document analysis, reducing manual review time by up to 80%.\n- **Difficulty finding information**: Natural Language Queries let your team find answers instantly across all your documents.\n- **Slow reporting cycles**: Real-time dashboards deliver insights as they happen, not days later.\n\nI'll follow up with a detailed proposal this week. In the meantime, feel free to explore the demo at your convenience using the link I'll share.\n\nBest regards",
      actionPlan: JSON.stringify([
        {
          step: "Send technical documentation",
          timeline: "Within 24 hours",
          details:
            "Share API docs and integration guides relevant to their tech stack",
        },
        {
          step: "Schedule stakeholder demo",
          timeline: "Within 1 week",
          details:
            "Include their CTO and engineering lead for a deeper technical dive",
        },
        {
          step: "Prepare POC proposal",
          timeline: "Within 1 week",
          details:
            "Outline a 2-week proof of concept using their actual document repository",
        },
        {
          step: "Follow up on budget timeline",
          timeline: "Within 2 weeks",
          details:
            "Connect with procurement to understand approval process",
        },
      ]),
      valueProps: JSON.stringify([
        {
          title: "80% Reduction in Manual Processing",
          description:
            "Document Intelligence automates document analysis that currently requires manual review",
          relevantPainPoint: "Manual data processing",
        },
        {
          title: "Instant Information Access",
          description:
            "Natural Language Queries replace hours of searching with instant, cited answers",
          relevantPainPoint: "Difficulty finding information",
        },
        {
          title: "Real-time Reporting",
          description:
            "Live dashboards replace batch reporting cycles with always-current insights",
          relevantPainPoint: "Slow reporting cycles",
        },
      ]),
    },
  });

  // Create lead scores
  await prisma.leadScore.create({
    data: {
      sessionId: sampleSession.id,
      prospectName: "Sarah Chen",
      companyName: "Acme Corporation",
      email: "sarah.chen@acmecorp.com",
      score: 75,
      signals: JSON.stringify([
        { signal: "Completed demo", points: 15, category: "engagement" },
        { signal: "Asked 2+ questions", points: 5, category: "engagement" },
        {
          signal: "Spent 5+ min on demo",
          points: 5,
          category: "engagement",
        },
        {
          signal: "Provided company name",
          points: 5,
          category: "discovery",
        },
        { signal: "Provided email", points: 10, category: "discovery" },
        {
          signal: "Identified pain points",
          points: 10,
          category: "discovery",
        },
        {
          signal: "Defined success metrics",
          points: 5,
          category: "discovery",
        },
        {
          signal: "Follow-up generated",
          points: 10,
          category: "follow-up",
        },
      ]),
      recommended: JSON.stringify([
        "Share demo recording link with prospect",
        "Schedule deeper technical dive with engineering team",
      ]),
    },
  });

  // Create a second sample session (in-progress)
  const session2 = await prisma.demoSession.create({
    data: {
      demoId: textClass.id,
      prospectName: "Michael Torres",
      companyName: "Global Retail Inc.",
      industry: "Retail & E-commerce",
      painPoints: JSON.stringify([
        "Scaling customer support",
        "Inconsistent analysis quality",
      ]),
      status: "active",
      durationSeconds: 320,
    },
  });

  await prisma.leadScore.create({
    data: {
      sessionId: session2.id,
      prospectName: "Michael Torres",
      companyName: "Global Retail Inc.",
      score: 35,
      signals: JSON.stringify([
        {
          signal: "Provided company name",
          points: 5,
          category: "discovery",
        },
        {
          signal: "Identified pain points",
          points: 10,
          category: "discovery",
        },
        {
          signal: "Spent 5+ min on demo",
          points: 5,
          category: "engagement",
        },
        {
          signal: "Asked 1 question(s)",
          points: 5,
          category: "engagement",
        },
      ]),
      recommended: JSON.stringify([
        "Follow up to complete the demo walkthrough",
        "Collect prospect email for follow-up",
        "Generate and send follow-up email",
        "Share demo recording link with prospect",
      ]),
    },
  });

  console.log("Database seeded successfully!");
  console.log(
    `Created 3 demos, 2 documents, 2 sessions, 4 interactions, ${eventData.length} analytics events`
  );
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
