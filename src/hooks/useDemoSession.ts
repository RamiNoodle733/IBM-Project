"use client";

import { useState, useCallback } from "react";
import { SessionInfo } from "@/types/session";

export function useDemoSession(demoSlug: string) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const createSession = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ demoSlug }),
      });
      const data = await res.json();
      setSessionId(data.session.id);
      setSession(data.session);
      return data.session.id as string;
    } finally {
      setLoading(false);
    }
  }, [demoSlug]);

  const updateSession = useCallback(
    async (updates: Partial<SessionInfo>) => {
      if (!sessionId) return;
      const res = await fetch(`/api/sessions/${sessionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      setSession(data.session);
    },
    [sessionId]
  );

  const completeSession = useCallback(async () => {
    if (!sessionId) return;
    await updateSession({
      status: "completed",
      completedAt: new Date().toISOString(),
    });
  }, [sessionId, updateSession]);

  return { sessionId, session, loading, createSession, updateSession, completeSession };
}
