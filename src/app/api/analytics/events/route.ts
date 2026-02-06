import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { eventType, sessionId, metadata } = await request.json();

    if (!eventType) {
      return NextResponse.json(
        { error: "Event type is required" },
        { status: 400 }
      );
    }

    const event = await prisma.analyticsEvent.create({
      data: {
        eventType,
        sessionId: sessionId ?? null,
        eventData: metadata ? JSON.stringify(metadata) : null,
      },
    });

    return NextResponse.json({ event });
  } catch (error) {
    console.error("Analytics event error:", error);
    return NextResponse.json(
      { error: "Failed to record event" },
      { status: 500 }
    );
  }
}
