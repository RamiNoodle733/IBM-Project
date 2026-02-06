import { prisma } from "@/lib/prisma";
import { DemoCatalogGrid } from "@/components/demos/DemoCatalogGrid";

export default async function GuidedPage() {
  const demos = await prisma.demo.findMany({ orderBy: { sortOrder: "asc" } });

  const demoData = demos.map((d) => ({
    id: d.id,
    slug: d.slug,
    title: d.title,
    description: d.description,
    icon: d.icon,
  }));

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Guided Demo Mode</h1>
        <p>Select a demo to launch guided mode with talk tracks, discovery questions, and objection handling.</p>
      </div>
      <DemoCatalogGrid demos={demoData} tags={{}} linkPrefix="/guided" mode="guided" />
    </div>
  );
}
