import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sessions = await prisma.demoSession.findMany({
      include: { demo: true },
      orderBy: { startedAt: "desc" },
    });
    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Sessions fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { demoSlug, prospectName, companyName } = await request.json();

    const demo = await prisma.demo.findUnique({ where: { slug: demoSlug } });
    if (!demo) {
      return NextResponse.json({ error: "Demo not found" }, { status: 404 });
    }

    const session = await prisma.demoSession.create({
      data: {
        demoId: demo.id,
        prospectName,
        companyName,
      },
      include: { demo: true },
    });

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Session create error:", error);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
