"use client";

import { Button, ClickableTile } from "@carbon/react";
import { ArrowRight, Demo, Analytics, Document } from "@carbon/icons-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page-container">
      <section className="hero">
        <h1 className="hero__title">AI Demo Studio</h1>
        <p className="hero__subtitle">
          Interactive AI-powered demos for enterprise sales enablement.
          Showcase Document Q&A, Text Classification, and Data Summarization
          with guided presentation tools and engagement analytics.
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
      </section>

      <section className="features-section">
        <h2>Platform Capabilities</h2>
        <div className="features-grid">
          <ClickableTile href="/demos" className="feature-card">
            <Demo size={32} />
            <h3>AI Demo Catalog</h3>
            <p>Three interactive demos showcasing AI capabilities for document analysis, text classification, and data summarization.</p>
          </ClickableTile>
          <ClickableTile href="/guided" className="feature-card">
            <Demo size={32} />
            <h3>Guided Demo Mode</h3>
            <p>Step-by-step talk tracks, discovery questions, and objection handling for structured sales presentations.</p>
          </ClickableTile>
          <ClickableTile href="/follow-up" className="feature-card">
            <Document size={32} />
            <h3>AI Follow-up Generator</h3>
            <p>Automatically generate personalized recap emails, action plans, and value propositions after each demo.</p>
          </ClickableTile>
          <ClickableTile href="/analytics" className="feature-card">
            <Analytics size={32} />
            <h3>Engagement Analytics</h3>
            <p>Track demo engagement, lead scores, and recommended next actions with a comprehensive dashboard.</p>
          </ClickableTile>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-card__number">1</div>
            <h4>Select a Demo</h4>
            <p>Choose from Document Q&A, Text Classification, or Data Summarization.</p>
          </div>
          <div className="step-card">
            <div className="step-card__number">2</div>
            <h4>Run the Demo</h4>
            <p>Interact with real AI models using pre-loaded or custom data.</p>
          </div>
          <div className="step-card">
            <div className="step-card__number">3</div>
            <h4>Generate Follow-up</h4>
            <p>Create personalized follow-up content based on the demo session.</p>
          </div>
          <div className="step-card">
            <div className="step-card__number">4</div>
            <h4>Track Engagement</h4>
            <p>Monitor analytics and lead scores to prioritize outreach.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
