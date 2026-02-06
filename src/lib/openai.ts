import OpenAI from "openai";

const globalForOpenAI = globalThis as unknown as {
  openai: OpenAI | undefined;
};

export const openai =
  globalForOpenAI.openai ??
  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

if (process.env.NODE_ENV !== "production") globalForOpenAI.openai = openai;

export async function chatCompletion(
  systemPrompt: string,
  userMessage: string,
  options?: { model?: string; jsonMode?: boolean; maxTokens?: number }
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: options?.model ?? "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    ...(options?.jsonMode && { response_format: { type: "json_object" } }),
    max_tokens: options?.maxTokens ?? 2048,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content ?? "";
}

export function parseJsonResponse<T>(response: string): T {
  try {
    return JSON.parse(response) as T;
  } catch {
    throw new Error(`Failed to parse JSON response: ${response.slice(0, 200)}`);
  }
}
