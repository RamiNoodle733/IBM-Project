import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SharePage({ params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params;
  const session = await prisma.demoSession.findUnique({
    where: { shareId },
    include: { demo: true, interactions: { orderBy: { createdAt: "asc" } } },
  });

  if (!session) return notFound();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{session.demo.title} — Demo Session</h1>
        <p>
          {session.prospectName && `Presented to ${session.prospectName}`}
          {session.companyName && ` at ${session.companyName}`}
          {session.startedAt && ` on ${new Date(session.startedAt).toLocaleDateString()}`}
        </p>
      </div>

      <div className="chat-container" style={{ height: "auto", maxHeight: "70vh" }}>
        <div className="chat-messages">
          {session.interactions.map((interaction) => (
            <div
              key={interaction.id}
              className={`chat-message chat-message--${interaction.role}`}
            >
              <p>{interaction.content}</p>
            </div>
          ))}
          {session.interactions.length === 0 && (
            <div className="empty-state">
              <h3>No interactions recorded</h3>
              <p>This session does not have any recorded interactions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
