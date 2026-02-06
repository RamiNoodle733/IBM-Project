export type EventType =
  | "page_view"
  | "demo_start"
  | "demo_complete"
  | "cta_click"
  | "share_view"
  | "question_asked"
  | "file_uploaded"
  | "follow_up_generated"
  | "share_link_created";

export async function trackEvent(
  eventType: EventType,
  data?: {
    sessionId?: string;
    page?: string;
    eventData?: Record<string, unknown>;
  }
): Promise<void> {
  try {
    await fetch("/api/analytics/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType,
        sessionId: data?.sessionId,
        page: data?.page ?? (typeof window !== "undefined" ? window.location.pathname : undefined),
        eventData: data?.eventData ? JSON.stringify(data.eventData) : undefined,
      }),
    });
  } catch {
    // Fire and forget - don't block UI for analytics
  }
}
