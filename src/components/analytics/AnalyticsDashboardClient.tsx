"use client";

import { useState, useEffect } from "react";
import { Tile, InlineLoading, Tag } from "@carbon/react";

interface AnalyticsSummary {
  totalSessions: number;
  totalDemoCompletions: number;
  totalFollowUps: number;
  avgSessionDuration: number;
  eventCounts: Record<string, number>;
  topDemos: Array<{ title: string; count: number }>;
  engagementByDemo: Array<{
    title: string;
    sessions: number;
    interactions: number;
    avgDuration: number;
  }>;
}

interface LeadData {
  id: string;
  score: number;
  prospectName: string;
  companyName: string | null;
  demoTitle: string;
  signals: string[];
  recommended: string[];
}

export function AnalyticsDashboardClient() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/analytics/summary").then((r) => r.json()),
      fetch("/api/analytics/leads").then((r) => r.json()),
    ])
      .then(([summaryData, leadsData]) => {
        setSummary(summaryData);
        setLeads(leadsData.leads || []);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <InlineLoading description="Loading analytics..." />;
  if (error || !summary) return <p>Failed to load analytics data.</p>;

  const totalEvents = summary.eventCounts
    ? Object.values(summary.eventCounts).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div>
      <div className="metric-cards">
        <Tile className="metric-card">
          <div className="metric-card__label">Total Sessions</div>
          <div className="metric-card__value">{summary.totalSessions}</div>
        </Tile>
        <Tile className="metric-card">
          <div className="metric-card__label">Completions</div>
          <div className="metric-card__value">
            {summary.totalDemoCompletions}
          </div>
        </Tile>
        <Tile className="metric-card">
          <div className="metric-card__label">Avg Duration</div>
          <div className="metric-card__value">
            {Math.floor(summary.avgSessionDuration / 60)}m{" "}
            {summary.avgSessionDuration % 60}s
          </div>
        </Tile>
        <Tile className="metric-card">
          <div className="metric-card__label">Total Events</div>
          <div className="metric-card__value">{totalEvents}</div>
        </Tile>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h4>Demo Popularity</h4>
          <div style={{ marginTop: "1rem" }}>
            {summary.topDemos.map((demo) => (
              <div
                key={demo.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.75rem",
                }}
              >
                <span style={{ minWidth: 200, fontSize: "0.875rem" }}>
                  {demo.title}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 12,
                    background: "var(--cds-layer-02)",
                    borderRadius: 4,
                  }}
                >
                  <div
                    style={{
                      width: `${
                        summary.topDemos[0]?.count
                          ? (demo.count / summary.topDemos[0].count) * 100
                          : 0
                      }%`,
                      height: "100%",
                      background: "var(--cds-interactive)",
                      borderRadius: 4,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "0.875rem",
                    minWidth: 30,
                    textAlign: "right",
                  }}
                >
                  {demo.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h4>Engagement by Demo</h4>
          <div style={{ marginTop: "1rem" }}>
            {summary.engagementByDemo.map((demo) => (
              <Tile
                key={demo.title}
                style={{ marginBottom: "0.5rem", padding: "0.75rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                    {demo.title}
                  </span>
                  <Tag type="blue" size="sm">
                    {demo.sessions} sessions
                  </Tag>
                </div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--cds-text-secondary)",
                    marginTop: "0.25rem",
                  }}
                >
                  {demo.interactions} interactions | Avg{" "}
                  {Math.floor(demo.avgDuration / 60)}m {demo.avgDuration % 60}s
                </p>
              </Tile>
            ))}
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "1rem" }}>Lead Scores</h3>
      {leads.length === 0 ? (
        <p style={{ color: "var(--cds-text-secondary)" }}>
          No leads scored yet.
        </p>
      ) : (
        <div>
          {leads.map((lead) => {
            const recommended = Array.isArray(lead.recommended)
              ? lead.recommended
              : [];
            return (
              <Tile
                key={lead.id}
                style={{ marginBottom: "0.75rem", padding: "1rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div>
                    <strong>{lead.prospectName || "Unknown"}</strong>
                    {lead.companyName && (
                      <span style={{ color: "var(--cds-text-secondary)" }}>
                        {" "}
                        — {lead.companyName}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--cds-text-secondary)",
                        marginLeft: "0.5rem",
                      }}
                    >
                      ({lead.demoTitle})
                    </span>
                  </div>
                  <Tag
                    type={
                      lead.score >= 70
                        ? "green"
                        : lead.score >= 40
                        ? "blue"
                        : "gray"
                    }
                    size="sm"
                  >
                    Score: {lead.score}/100
                  </Tag>
                </div>
                <div className="lead-score-bar">
                  <div className="lead-score-bar__track">
                    <div
                      className="lead-score-bar__fill"
                      style={{ width: `${lead.score}%` }}
                    />
                  </div>
                </div>
                {recommended.length > 0 && (
                  <div style={{ marginTop: "0.75rem" }}>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        marginBottom: "0.25rem",
                      }}
                    >
                      Recommended Actions:
                    </p>
                    <ul style={{ paddingLeft: "1rem", fontSize: "0.75rem" }}>
                      {recommended.map((r: string, i: number) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Tile>
            );
          })}
        </div>
      )}
    </div>
  );
}
