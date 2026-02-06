"use client";

import { Button, ClickableTile } from "@carbon/react";
import {
  ArrowRight,
  Analytics,
  Catalog,
  UserSpeaker,
  Email,
} from "@carbon/icons-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="page-container">
          <p className="hero__eyebrow">IBM Data & AI</p>
          <h1 className="hero__title">AI Demo Studio</h1>
          <p className="hero__subtitle">
            A technical sales enablement platform built for IBM Data & AI.
            Run interactive AI demonstrations, guide prospect conversations,
            and generate intelligent follow-ups — all from one place.
          </p>
          <div className="hero__cta">
            <Link href="/demos">
              <Button renderIcon={ArrowRight} size="lg">
                Explore Demos
              </Button>
            </Link>
            <Link href="/guided">
              <Button kind="tertiary" size="lg">
                Guided Mode
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="page-container">
        <section className="features-section">
          <h2>Platform Capabilities</h2>
          <div className="features-grid">
            <ClickableTile href="/demos" className="feature-card">
              <Catalog size={32} />
              <h3>AI Demo Catalog</h3>
              <p>
                Three production-ready demos: document Q&A with citations,
                text classification with analytics, and CSV data summarization.
              </p>
            </ClickableTile>
            <ClickableTile href="/guided" className="feature-card">
              <UserSpeaker size={32} />
              <h3>Guided Demo Mode</h3>
              <p>
                Step-by-step talk tracks, discovery questions, and objection
                handling — everything a sales specialist needs for a live demo.
              </p>
            </ClickableTile>
            <ClickableTile href="/follow-up" className="feature-card">
              <Email size={32} />
              <h3>AI Follow-up Generator</h3>
              <p>
                Generate personalized recap emails, action plans, and tailored
                value propositions based on each demo session.
              </p>
            </ClickableTile>
            <ClickableTile href="/analytics" className="feature-card">
              <Analytics size={32} />
              <h3>Engagement Analytics</h3>
              <p>
                Track demo engagement with lead scoring (0-100), activity
                charts, and AI-recommended next actions per prospect.
              </p>
            </ClickableTile>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-card__number">1</div>
              <h4>Select a Demo</h4>
              <p>
                Choose from Document Q&A, Text Classification, or Data
                Summarization from the demo catalog.
              </p>
            </div>
            <div className="step-card">
              <div className="step-card__number">2</div>
              <h4>Run the Demo</h4>
              <p>
                Interact with real AI models (GPT-4o) using pre-loaded enterprise
                data or upload your own.
              </p>
            </div>
            <div className="step-card">
              <div className="step-card__number">3</div>
              <h4>Generate Follow-up</h4>
              <p>
                AI creates personalized recap emails and action plans tailored
                to the prospect&apos;s industry and pain points.
              </p>
            </div>
            <div className="step-card">
              <div className="step-card__number">4</div>
              <h4>Track & Score</h4>
              <p>
                Monitor engagement analytics and lead scores to prioritize
                your highest-value prospects.
              </p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>
            Built with Next.js, IBM Carbon Design System, and OpenAI — demonstrating
            AI-powered sales enablement for IBM Data & AI.
          </p>
        </footer>
      </div>
    </div>
  );
}
