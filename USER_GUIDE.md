# AI Demo Studio — User Guide

## What Is This App?

AI Demo Studio is a **technical sales enablement platform** built for IBM Data & AI. It simulates what a Brand Technical Sales Specialist would use day-to-day to:

1. **Run live AI demos** for prospects and customers
2. **Follow guided talk tracks** during presentations
3. **Generate personalized follow-up content** after demo sessions
4. **Track engagement analytics** and score leads

The app is built with **Next.js**, **IBM Carbon Design System**, **Prisma/SQLite**, and **OpenAI GPT-4o** — all technologies relevant to IBM's Data & AI portfolio.

---

## How to Navigate the App

The top header bar has five main sections:

| Nav Item | What It Does |
|----------|-------------|
| **Home** (IBM logo) | Landing page with platform overview |
| **Demos** | AI demo catalog — run any of the 3 demos |
| **Guided Mode** | Step-by-step presentation mode with talk tracks |
| **Follow-up** | Generate recap emails and action plans from sessions |
| **Analytics** | View engagement metrics, lead scores, and recommendations |

The moon/sun icon in the top-right toggles **dark mode**.

---

## The 3 AI Demos

### 1. Document Q&A (Knowledge Assistant)

**What it does:** Simulates a RAG (Retrieval-Augmented Generation) system. Pre-loaded enterprise documents are available in a "knowledge base" sidebar. You ask questions, and GPT-4o answers based on those documents with **source citations**.

**How to use it:**
1. Go to **Demos > Document Q&A**
2. On the left sidebar, you'll see pre-loaded documents (product spec sheets, security docs, etc.). They're all selected by default — you can toggle them on/off
3. Either click a **suggested question** on the left, or type your own question in the chat input at the bottom
4. The AI will respond with an answer and cite which documents it pulled from

**What to say in a presentation:**
> "This demonstrates how IBM watsonx.ai can power a knowledge assistant that answers questions from your enterprise documents. Notice the source citations — every answer is grounded in your actual data, not hallucinated."

---

### 2. Text Classification & Insights

**What it does:** Takes customer feedback text (support tickets, reviews, comments) and classifies each one by **sentiment** (positive/negative/neutral), **category** (billing, technical, etc.), **urgency** (high/medium/low), and **confidence score**.

**How to use it:**
1. Go to **Demos > Text Classification**
2. Click **"Load Sample Tickets"** to populate with example customer feedback, or paste your own text (separate multiple items with `---` on its own line)
3. Click **"Classify Text"**
4. Results appear as cards with color-coded tags
5. Switch to the **"Insights Dashboard"** tab to see aggregate charts (sentiment distribution, category breakdown)

**What to say in a presentation:**
> "This shows how AI can automatically triage incoming customer communications. Instead of a human reading every ticket, the model classifies sentiment, category, and urgency in seconds — letting your team focus on the high-priority items."

---

### 3. Data Summarization & Reports

**What it does:** Takes a CSV file and generates an **executive summary**, **key metrics with trends**, **insights**, and **trend analysis** using AI.

**How to use it:**
1. Go to **Demos > Data Summarization**
2. Click **"Or Load Sample Data"** to use the included sales data CSV, or upload your own CSV file
3. A preview table shows the first few rows of data
4. Click **"Generate Report"**
5. The AI produces metric cards, an executive summary paragraph, key insights, and trends

**What to say in a presentation:**
> "Imagine your quarterly business review: instead of spending hours in Excel, you upload your data and get an instant executive summary with key metrics and actionable insights. This is the kind of workflow IBM watsonx.ai enables."

---

## Guided Demo Mode

**What it is:** A presentation companion tool. When you're doing a live demo for a prospect, Guided Mode gives you a three-column layout:

- **Left panel:** Session timer + discovery question checkboxes (pain points) + notes field
- **Center panel:** Step-by-step talk track — what to say, what to do, pro tips for each step
- **Right panel:** Common objections with pre-written responses and supporting data points

**How to use it:**
1. Go to **Guided Mode**
2. Select which demo you're presenting (Document Q&A, Text Classification, or Data Summarization)
3. Click **Start** on the timer when you begin
4. Follow the steps in the center panel — use the **Previous/Next** buttons to navigate
5. Check off pain points as the prospect mentions them
6. If the prospect raises an objection, expand it in the right panel for a suggested response

**What to say in a presentation:**
> "This guided mode is what I'd actually use during a live customer demo. It keeps me on script, tracks time, captures discovery notes, and has instant answers to common objections — all without the prospect seeing it."

---

## AI Follow-up Generator

**What it is:** After running a demo session, this tool generates three pieces of follow-up content:

1. **Recap Email** — A personalized email summarizing what was demonstrated
2. **Action Plan** — Recommended next steps with timelines
3. **Value Propositions** — Tailored value props mapped to the prospect's specific pain points

**How to use it:**
1. Go to **Follow-up**
2. Select a completed demo session from the list
3. Click **"Generate Follow-up"**
4. Browse the three tabs: Recap Email, Action Plan, Value Propositions
5. Use the **Copy** button to copy content to your clipboard

**Note:** Sessions are created when you run demos. The pre-seeded data includes sample sessions you can generate follow-ups for.

---

## Engagement Analytics

**What it is:** A dashboard showing:

- **Metric cards:** Total sessions, completions, average duration, total events
- **Demo Popularity:** Bar chart showing which demos are used most
- **Engagement by Demo:** Sessions, interactions, and average duration per demo
- **Lead Scores:** Each prospect scored 0-100 based on their engagement signals, with recommended next actions

**How to use it:**
1. Go to **Analytics**
2. View the pre-seeded engagement data
3. Lead scores use a scoring algorithm based on: demo completion, number of interactions, session duration, follow-up generation, and discovery engagement

**What to say in a presentation:**
> "After every demo, the platform automatically scores the lead and recommends next actions. A prospect who completed the full demo, asked multiple questions, and triggered a follow-up would score higher than someone who only viewed the landing page."

---

## Technical Architecture (For Interviews)

If asked about the tech stack, here's what to know:

- **Frontend:** Next.js 16 with App Router, React 19, TypeScript
- **UI Framework:** IBM Carbon Design System — the same design system used across IBM products
- **Database:** Prisma ORM with SQLite (seeded with demo data at build time)
- **AI:** OpenAI GPT-4o API for all AI-powered features
- **Styling:** SCSS with IBM Plex fonts, Carbon design tokens for theming
- **Deployment:** Vercel (serverless)

**Key architectural patterns:**
- Server Components for data fetching (Prisma queries), Client Components for interactivity
- API routes handle all AI calls server-side (API key never exposed to browser)
- Carbon's `<Theme>` component handles dark/light mode switching
- All custom styles use Carbon CSS variables (`--cds-*`) so they adapt to theme changes

---

## How to Talk About This Project

**For a resume/interview, frame it as:**

> "I built an AI-powered sales enablement platform that demonstrates the kind of workflows IBM Data & AI enables for enterprise customers. It includes three live AI demos — document Q&A with citations, text classification with analytics dashboards, and data summarization — plus guided presentation tools, AI-generated follow-up content, and engagement analytics with lead scoring. It's built with IBM's Carbon Design System and deployed to production."

**Key selling points:**
- Shows you can build and demo AI-powered applications
- Shows you understand the technical sales workflow (demo → discovery → follow-up → scoring)
- Shows you can work with IBM's design language (Carbon)
- Shows you understand enterprise AI use cases (RAG, classification, summarization)
- Shows end-to-end product thinking, not just a single feature

---

## Environment Setup (If Someone Asks)

1. Clone the repo
2. Copy `.env.example` to `.env` and add your `OPENAI_API_KEY`
3. Run `npm install`
4. Run `npx prisma db push && npm run db:seed` to set up the database
5. Run `npm run dev` to start the development server
6. Open `http://localhost:3000`

The app requires an OpenAI API key for the AI demos to work. Without it, the demo pages will show but API calls will fail.
