import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateShareId, getShareUrl } from "@/lib/share";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const session = await prisma.demoSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    // If session already has a share ID, return existing URL
    if (session.shareId) {
      return NextResponse.json({
        shareId: session.shareId,
        shareUrl: getShareUrl(session.shareId),
      });
    }

    const shareId = generateShareId();

    await prisma.demoSession.update({
      where: { id: sessionId },
      data: { shareId },
    });

    // Track the share event
    await prisma.analyticsEvent.create({
      data: {
        eventType: "share_link_created",
        sessionId,
        eventData: JSON.stringify({ shareId }),
      },
    });

    return NextResponse.json({
      shareId,
      shareUrl: getShareUrl(shareId),
    });
  } catch (error) {
    console.error("Share link error:", error);
    return NextResponse.json(
      { error: "Failed to create share link" },
      { status: 500 }
    );
  }
}
