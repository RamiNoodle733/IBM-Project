import { prisma } from "@/lib/prisma";
import { FollowUpList } from "@/components/follow-up/FollowUpList";

export default async function FollowUpPage() {
  const sessions = await prisma.demoSession.findMany({
    include: { demo: true },
    orderBy: { startedAt: "desc" },
  });

  const sessionData = sessions.map((s) => ({
    id: s.id,
    demoTitle: s.demo.title,
    prospectName: s.prospectName,
    companyName: s.companyName,
    status: s.status,
    startedAt: s.startedAt.toISOString(),
  }));

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>AI Follow-up Generator</h1>
        <p>Select a demo session to generate personalized follow-up content.</p>
      </div>
      <FollowUpList sessions={sessionData} />
    </div>
  );
}
