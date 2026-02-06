import Papa from "papaparse";

export interface ParsedCSV {
  headers: string[];
  rows: Record<string, string>[];
  rowCount: number;
}

export function parseCSV(csvText: string): ParsedCSV {
  const result = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });

  return {
    headers: result.meta.fields || [],
    rows: result.data,
    rowCount: result.data.length,
  };
}

export function computeColumnStats(
  rows: Record<string, string>[],
  headers: string[]
): Record<string, { min: number; max: number; avg: number; count: number }> {
  const stats: Record<string, { min: number; max: number; sum: number; count: number }> = {};

  for (const header of headers) {
    const values = rows
      .map((row) => parseFloat(row[header]))
      .filter((v) => !isNaN(v));

    if (values.length > 0) {
      stats[header] = {
        min: Math.min(...values),
        max: Math.max(...values),
        sum: values.reduce((a, b) => a + b, 0),
        count: values.length,
      };
    }
  }

  const result: Record<string, { min: number; max: number; avg: number; count: number }> = {};
  for (const [key, val] of Object.entries(stats)) {
    result[key] = {
      min: val.min,
      max: val.max,
      avg: Math.round((val.sum / val.count) * 100) / 100,
      count: val.count,
    };
  }

  return result;
}

export function formatSampleRows(
  rows: Record<string, string>[],
  limit: number = 10
): string {
  return rows
    .slice(0, limit)
    .map((row, i) => `Row ${i + 1}: ${JSON.stringify(row)}`)
    .join("\n");
}
