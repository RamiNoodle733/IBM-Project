import { DataSummarizationClient } from "@/components/demos/DataSummarizationClient";
import { prisma } from "@/lib/prisma";

export default async function DataSummarizationPage() {
  const demo = await prisma.demo.findUnique({
    where: { slug: "data-summarization" },
  });

  if (!demo) return <div className="page-container">Demo not found</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Data Summarization &amp; Reports</h1>
        <p>Upload CSV data and instantly generate executive summaries with key metrics and insights.</p>
      </div>
      <DataSummarizationClient demoId={demo.id} />
    </div>
  );
}
