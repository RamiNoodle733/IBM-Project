"use client";

import { useState } from "react";
import { Button, Tile, Tag, ProgressIndicator, ProgressStep, TextArea, Accordion, AccordionItem, Checkbox } from "@carbon/react";
import { ArrowRight, ArrowLeft, Play, Pause, Reset } from "@carbon/icons-react";
import { useTimer } from "@/hooks/useTimer";
import { documentQAScript } from "@/data/guided-scripts/document-qa";
import { textClassificationScript } from "@/data/guided-scripts/text-classification";
import { dataSummarizationScript } from "@/data/guided-scripts/data-summarization";
import { discoveryQuestions } from "@/data/discovery-questions";
import { commonObjections } from "@/data/objections";

const scripts: Record<string, typeof documentQAScript> = {
  "document-qa": documentQAScript,
  "text-classification": textClassificationScript,
  "data-summarization": dataSummarizationScript,
};

const titles: Record<string, string> = {
  "document-qa": "Document Q&A",
  "text-classification": "Text Classification",
  "data-summarization": "Data Summarization",
};

export function GuidedModeClient({ demoSlug }: { demoSlug: string }) {
  const script = scripts[demoSlug] || documentQAScript;
  const [currentStep, setCurrentStep] = useState(0);
  const [notes, setNotes] = useState("");
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const { formattedTime, isRunning, start, pause, reset } = useTimer();

  const step = script[currentStep];
  const painPointQuestion = discoveryQuestions.find((q) => q.id === "pain-points");

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Guided Mode: {titles[demoSlug] || demoSlug}</h1>
        <p>Step {currentStep + 1} of {script.length}</p>
      </div>

      <ProgressIndicator currentIndex={currentStep} spaceEqually style={{ marginBottom: "1.5rem" }}>
        {script.map((s, i) => (
          <ProgressStep key={i} label={s.title} onClick={() => setCurrentStep(i)} />
        ))}
      </ProgressIndicator>

      <div className="guided-layout">
        {/* Left: Timer + Discovery */}
        <div className="panel">
          <h4 style={{ marginBottom: "0.75rem" }}>Session Timer</h4>
          <div className="timer-display">{formattedTime}</div>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Button kind="ghost" size="sm" renderIcon={isRunning ? Pause : Play} onClick={isRunning ? pause : start}>
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button kind="ghost" size="sm" renderIcon={Reset} onClick={reset}>
              Reset
            </Button>
          </div>

          <h4 style={{ marginBottom: "0.75rem" }}>Discovery</h4>
          {painPointQuestion && (
            <div style={{ marginBottom: "1rem" }}>
              <p style={{ fontSize: "0.75rem", marginBottom: "0.25rem" }}>Pain Points</p>
              {painPointQuestion.options?.map((opt) => (
                <Checkbox
                  key={opt}
                  id={`pain-${opt}`}
                  labelText={opt}
                  checked={selectedPainPoints.includes(opt)}
                  onChange={(_: any, { checked }: { checked: boolean }) => {
                    setSelectedPainPoints((prev) =>
                      checked ? [...prev, opt] : prev.filter((p) => p !== opt)
                    );
                  }}
                />
              ))}
            </div>
          )}
          <TextArea
            id="notes"
            labelText="Notes"
            placeholder="Session notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            style={{ marginTop: "0.75rem" }}
          />
        </div>

        {/* Center: Talk Track */}
        <div className="panel">
          <div style={{ marginBottom: "1rem" }}>
            <Tag type="blue" size="sm">{step.phase}</Tag>
            <h2 style={{ marginTop: "0.5rem" }}>{step.title}</h2>
            <p style={{ fontSize: "0.875rem", color: "var(--cds-text-secondary)" }}>
              Suggested duration: {step.durationMinutes} minutes
            </p>
          </div>

          <div className="guided-step">
            <div className="guided-step__title">What to Say</div>
            <ul className="guided-step__list">
              {step.talkingPoints.map((point: string, i: number) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="guided-step">
            <div className="guided-step__title">What to Do</div>
            <ul className="guided-step__list">
              {step.actions.map((action: string, i: number) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>

          <Tile style={{ marginTop: "1rem", padding: "0.75rem" }}>
            <div className="guided-step__title">Pro Tips</div>
            <ul className="guided-step__list">
              {step.tips.map((tip: string, i: number) => (
                <li key={i} style={{ fontStyle: "italic" }}>{tip}</li>
              ))}
            </ul>
          </Tile>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
            <Button kind="secondary" renderIcon={ArrowLeft} disabled={currentStep === 0} onClick={() => setCurrentStep((prev) => prev - 1)}>
              Previous
            </Button>
            <Button renderIcon={ArrowRight} disabled={currentStep === script.length - 1} onClick={() => setCurrentStep((prev) => prev + 1)}>
              Next Step
            </Button>
          </div>
        </div>

        {/* Right: Objections */}
        <div className="panel">
          <h4 style={{ marginBottom: "0.75rem" }}>Common Objections</h4>
          <Accordion>
            {commonObjections.map((obj) => (
              <AccordionItem key={obj.id} title={obj.objection}>
                <p style={{ marginBottom: "0.75rem", lineHeight: 1.5 }}>{obj.response}</p>
                <div>
                  <strong style={{ fontSize: "0.75rem" }}>Supporting Data:</strong>
                  <ul style={{ paddingLeft: "1rem", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                    {obj.dataPoints.map((dp, i) => (
                      <li key={i}>{dp}</li>
                    ))}
                  </ul>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
