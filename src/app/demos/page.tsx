import { prisma } from "@/lib/prisma";
import { DemoCatalogGrid } from "@/components/demos/DemoCatalogGrid";

const tagMap: Record<string, string[]> = {
  "document-qa": ["AI", "NLP", "RAG"],
  "text-classification": ["Analytics", "NLP", "Sentiment"],
  "data-summarization": ["Data", "Reporting", "Insights"],
};

export default async function DemosPage() {
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
        <h1>AI Demo Catalog</h1>
        <p>
          Select a demo to run. Each demo showcases a different AI capability
          for data and analytics workflows.
        </p>
      </div>
      <DemoCatalogGrid demos={demoData} tags={tagMap} />
    </div>
  );
}
