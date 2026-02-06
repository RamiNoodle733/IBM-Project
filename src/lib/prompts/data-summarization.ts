export function buildDataSummarizationPrompt(
  columns: string[],
  rowCount: number,
  stats: string,
  sampleRows: string
): string {
  return `You are a business data analyst generating executive reports.
Given the following dataset summary and sample data, generate a comprehensive analysis.

Dataset info:
- Columns: ${columns.join(", ")}
- Total rows: ${rowCount}
- Numeric column statistics: ${stats}

Sample rows (first 10):
${sampleRows}

Respond in this exact JSON format:
{
  "summary": "2-3 paragraph executive summary suitable for C-level executives",
  "keyMetrics": [
    {"label": "metric name", "value": "formatted value", "trend": "up" | "down" | "flat"}
  ],
  "insights": ["actionable insight 1", "actionable insight 2", ...],
  "trends": ["trend observation 1", "trend observation 2", ...]
}

Generate 4-6 key metrics, 3-5 insights, and 2-4 trends. Return valid JSON only.`;
}
