"use client";

import { useState, useEffect } from "react";
import { Button, Tile, InlineLoading, Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import { Email, Copy, Checkmark } from "@carbon/icons-react";

interface ActionPlanStep {
  step: string;
  timeline: string;
  details: string;
}

interface ValueProp {
  title: string;
  description: string;
  relevantPainPoint: string;
}

interface FollowUpData {
  recapEmail: string;
  actionPlan: ActionPlanStep[];
  valueProps: ValueProp[];
}

export function FollowUpClient({ sessionId }: { sessionId: string }) {
  const [session, setSession] = useState<any>(null);
  const [followUp, setFollowUp] = useState<FollowUpData | null>(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/sessions/${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        setSession(data.session);
        if (data.session?.followUps?.length > 0) {
          const fu = data.session.followUps[0];
          setFollowUp({
            recapEmail: fu.recapEmail,
            actionPlan: JSON.parse(fu.actionPlan),
            valueProps: JSON.parse(fu.valueProps),
          });
        }
      });
  }, [sessionId]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      setFollowUp(data);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!session) return <InlineLoading description="Loading session..." />;

  return (
    <div>
      <div className="page-header">
        <h1>Follow-up: {session.demo?.title}</h1>
        <p>
          {session.prospectName && `${session.prospectName}`}
          {session.companyName && ` at ${session.companyName}`}
        </p>
      </div>

      {!followUp && (
        <Button renderIcon={Email} onClick={handleGenerate} disabled={generating}>
          {generating ? <InlineLoading description="Generating follow-up..." /> : "Generate Follow-up"}
        </Button>
      )}

      {followUp && (
        <Tabs>
          <TabList aria-label="Follow-up sections">
            <Tab>Recap Email</Tab>
            <Tab>Action Plan</Tab>
            <Tab>Value Propositions</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="follow-up-section">
                <div className="copy-button-inline">
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={copied === "email" ? Checkmark : Copy}
                    onClick={() => copyToClipboard(followUp.recapEmail, "email")}
                  >
                    {copied === "email" ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <div className="email-preview">{followUp.recapEmail}</div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="follow-up-section">
                <h3>Recommended Next Steps</h3>
                {followUp.actionPlan.map((step, i) => (
                  <div key={i} className="action-plan-item">
                    <div className="action-plan-item__timeline">{step.timeline}</div>
                    <div>
                      <strong>{step.step}</strong>
                      <p style={{ fontSize: "0.875rem", color: "var(--cds-text-secondary)", marginTop: "0.25rem" }}>
                        {step.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="follow-up-section">
                <h3>Tailored Value Propositions</h3>
                {followUp.valueProps.map((vp, i) => (
                  <div key={i} className="value-prop-card">
                    <h4>{vp.title}</h4>
                    <p>{vp.description}</p>
                    <div className="value-prop-card__pain-point">
                      Addresses: {vp.relevantPainPoint}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </div>
  );
}
