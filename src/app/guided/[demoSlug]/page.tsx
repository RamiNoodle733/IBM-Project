import { GuidedModeClient } from "@/components/guided/GuidedModeClient";

export default async function GuidedDemoPage({ params }: { params: Promise<{ demoSlug: string }> }) {
  const { demoSlug } = await params;
  return <GuidedModeClient demoSlug={demoSlug} />;
}
