import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [sessions, events, followUps] = await Promise.all([
      prisma.demoSession.findMany({
        include: { demo: true, interactions: true },
      }),
      prisma.analyticsEvent.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.followUp.findMany(),
    ]);

    const totalSessions = sessions.length;
    const totalDemoCompletions = sessions.filter(
      (s) => s.status === "completed"
    ).length;
    const totalFollowUps = followUps.length;

    const avgDuration =
      sessions.reduce((sum, s) => sum + (s.durationSeconds ?? 0), 0) /
      (totalSessions || 1);

    // Event counts by type
    const eventCounts: Record<string, number> = {};
    events.forEach((e) => {
      eventCounts[e.eventType] = (eventCounts[e.eventType] || 0) + 1;
    });

    // Daily activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyActivity: Record<string, number> = {};
    events
      .filter((e) => e.createdAt >= thirtyDaysAgo)
      .forEach((e) => {
        const day = e.createdAt.toISOString().split("T")[0];
        dailyActivity[day] = (dailyActivity[day] || 0) + 1;
      });

    // Top demos by session count
    const demoCounts: Record<string, { title: string; count: number }> = {};
    sessions.forEach((s) => {
      const key = s.demo.slug;
      if (!demoCounts[key]) {
        demoCounts[key] = { title: s.demo.title, count: 0 };
      }
      demoCounts[key].count++;
    });

    const topDemos = Object.values(demoCounts).sort(
      (a, b) => b.count - a.count
    );

    // Engagement by demo
    const engagementByDemo: Record<
      string,
      { title: string; sessions: number; interactions: number; avgDuration: number }
    > = {};
    sessions.forEach((s) => {
      const key = s.demo.slug;
      if (!engagementByDemo[key]) {
        engagementByDemo[key] = {
          title: s.demo.title,
          sessions: 0,
          interactions: 0,
          avgDuration: 0,
        };
      }
      engagementByDemo[key].sessions++;
      engagementByDemo[key].interactions += s.interactions.length;
      engagementByDemo[key].avgDuration += s.durationSeconds ?? 0;
    });

    Object.values(engagementByDemo).forEach((e) => {
      e.avgDuration = Math.round(e.avgDuration / (e.sessions || 1));
    });

    return NextResponse.json({
      totalSessions,
      totalDemoCompletions,
      totalFollowUps,
      avgSessionDuration: Math.round(avgDuration),
      eventCounts,
      dailyActivity,
      topDemos,
      engagementByDemo: Object.values(engagementByDemo),
    });
  } catch (error) {
    console.error("Analytics summary error:", error);
    return NextResponse.json(
      { error: "Failed to compute analytics" },
      { status: 500 }
    );
  }
}
