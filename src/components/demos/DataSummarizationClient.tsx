"use client";

import { useState, useRef } from "react";
import { Button, Tile, InlineLoading, Tag } from "@carbon/react";
import { Upload, DocumentBlank, Play } from "@carbon/icons-react";

interface KeyMetric {
  label: string;
  value: string;
  trend: string;
}

interface SummaryResult {
  summary: string;
  keyMetrics: KeyMetric[];
  insights: string[];
  trends: string[];
}

export function DataSummarizationClient({ demoId }: { demoId: string }) {
  const [csvData, setCsvData] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState<string[][]>([]);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadSampleData = async () => {
    try {
      const res = await fetch("/sample-data/sales-data.csv");
      const text = await res.text();
      setCsvData(text);
      setFileName("sales-data.csv");
      parsePreview(text);
    } catch {
      console.error("Failed to load sample data");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setCsvData(text);
      parsePreview(text);
    };
    reader.readAsText(file);
  };

  const parsePreview = (text: string) => {
    const lines = text.trim().split("\n").slice(0, 6);
    setPreview(lines.map((l) => l.split(",")));
  };

  const summarize = async () => {
    if (!csvData) return;
    setLoading(true);
    try {
      const res = await fetch("/api/demos/data-summarization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvData }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      console.error("Summarization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!csvData && (
        <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
          <Upload size={48} />
          <h3>Upload CSV File</h3>
          <p>Drag and drop or click to select a CSV file</p>
          <Button kind="ghost" size="sm" onClick={(e: React.MouseEvent) => { e.stopPropagation(); loadSampleData(); }}>
            Or Load Sample Data
          </Button>
          <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileUpload} style={{ display: "none" }} />
        </div>
      )}

      {csvData && !result && (
        <div>
          <Tile style={{ marginBottom: "1rem", padding: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <DocumentBlank size={20} />
              <strong>{fileName}</strong>
              <Button kind="ghost" size="sm" onClick={() => { setCsvData(null); setPreview([]); setFileName(""); }}>
                Change File
              </Button>
            </div>
            {preview.length > 0 && (
              <div style={{ overflowX: "auto" }}>
                <table className="data-preview-table">
                  <thead>
                    <tr>{preview[0]?.map((h, i) => <th key={i}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {preview.slice(1).map((row, i) => (
                      <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Tile>
          <Button renderIcon={Play} onClick={summarize} disabled={loading}>
            {loading ? <InlineLoading description="Analyzing..." /> : "Generate Report"}
          </Button>
        </div>
      )}

      {result && (
        <div>
          <Button kind="ghost" size="sm" onClick={() => { setResult(null); setCsvData(null); setPreview([]); setFileName(""); }} style={{ marginBottom: "1rem" }}>
            Start Over
          </Button>

          <div className="metric-cards">
            {result.keyMetrics.map((m, i) => (
              <Tile key={i} className="metric-card">
                <div className="metric-card__label">{m.label}</div>
                <div className="metric-card__value">{m.value}</div>
                <Tag type={m.trend === "up" ? "green" : m.trend === "down" ? "red" : "gray"} size="sm">
                  {m.trend}
                </Tag>
              </Tile>
            ))}
          </div>

          <Tile style={{ marginBottom: "1rem", padding: "1.5rem" }}>
            <h3 style={{ marginBottom: "0.75rem" }}>Executive Summary</h3>
            <p style={{ lineHeight: 1.6 }}>{result.summary}</p>
          </Tile>

          <div className="charts-grid">
            <div className="chart-container">
              <h4>Key Insights</h4>
              <ul style={{ paddingLeft: "1rem", marginTop: "0.75rem" }}>
                {result.insights.map((insight, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem", lineHeight: 1.5 }}>{insight}</li>
                ))}
              </ul>
            </div>
            <div className="chart-container">
              <h4>Trends</h4>
              <ul style={{ paddingLeft: "1rem", marginTop: "0.75rem" }}>
                {result.trends.map((trend, i) => (
                  <li key={i} style={{ marginBottom: "0.5rem", lineHeight: 1.5 }}>{trend}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
