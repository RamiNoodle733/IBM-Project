"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent, EventType } from "@/lib/analytics";

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("page_view", { page: pathname });
  }, [pathname]);

  return {
    track: (eventType: EventType, data?: { sessionId?: string; eventData?: Record<string, unknown> }) => {
      trackEvent(eventType, { ...data, page: pathname });
    },
  };
}
