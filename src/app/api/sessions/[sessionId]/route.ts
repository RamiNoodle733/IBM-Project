import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const session = await prisma.demoSession.findUnique({
      where: { id: sessionId },
      include: {
        demo: true,
        interactions: { orderBy: { createdAt: "asc" } },
        followUps: { orderBy: { generatedAt: "desc" } },
      },
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Session fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const updates = await request.json();

    const session = await prisma.demoSession.update({
      where: { id: sessionId },
      data: updates,
      include: { demo: true },
    });

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Session update error:", error);
    return NextResponse.json({ error: "Failed to update session" }, { status: 500 });
  }
}
