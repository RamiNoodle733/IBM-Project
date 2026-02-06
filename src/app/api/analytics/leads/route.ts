import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.leadScore.findMany({
      orderBy: { score: "desc" },
    });

    const enriched = await Promise.all(
      leads.map(async (lead) => {
        const session = await prisma.demoSession.findUnique({
          where: { id: lead.sessionId },
          include: { demo: true },
        });
        return {
          ...lead,
          signals: lead.signals ? JSON.parse(lead.signals) : [],
          recommended: lead.recommended ? JSON.parse(lead.recommended) : [],
          prospectName: session?.prospectName ?? "Unknown",
          companyName: session?.companyName ?? null,
          demoTitle: session?.demo.title ?? "Unknown",
        };
      })
    );

    return NextResponse.json({ leads: enriched });
  } catch (error) {
    console.error("Lead scores error:", error);
    return NextResponse.json(
      { error: "Failed to fetch lead scores" },
      { status: 500 }
    );
  }
}
