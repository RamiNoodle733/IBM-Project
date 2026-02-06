"use client";

import { ClickableTile, Tag } from "@carbon/react";

interface SessionSummary {
  id: string;
  demoTitle: string;
  prospectName: string | null;
  companyName: string | null;
  status: string;
  startedAt: string;
}

export function FollowUpList({ sessions }: { sessions: SessionSummary[] }) {
  if (sessions.length === 0) {
    return (
      <div className="empty-state">
        <h3>No sessions yet</h3>
        <p>Run a demo to create a session, then generate follow-up content.</p>
      </div>
    );
  }

  return (
    <div className="demo-grid">
      {sessions.map((s) => (
        <ClickableTile key={s.id} href={`/follow-up/${s.id}`} className="demo-card">
          <h3>{s.demoTitle}</h3>
          <p>
            {s.prospectName || "Unknown prospect"}
            {s.companyName && ` — ${s.companyName}`}
          </p>
          <p style={{ fontSize: "0.75rem", color: "var(--cds-text-secondary)" }}>
            {new Date(s.startedAt).toLocaleDateString()}
          </p>
          <div className="demo-card__tags">
            <Tag type={s.status === "completed" ? "green" : "gray"} size="sm">
              {s.status}
            </Tag>
          </div>
        </ClickableTile>
      ))}
    </div>
  );
}
