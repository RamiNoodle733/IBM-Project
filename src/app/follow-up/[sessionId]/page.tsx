import { FollowUpClient } from "@/components/follow-up/FollowUpClient";

export default async function FollowUpSessionPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params;
  return (
    <div className="page-container">
      <FollowUpClient sessionId={sessionId} />
    </div>
  );
}
