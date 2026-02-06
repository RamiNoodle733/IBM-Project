import { TextClassificationClient } from "@/components/demos/TextClassificationClient";
import { prisma } from "@/lib/prisma";

export default async function TextClassificationPage() {
  const demo = await prisma.demo.findUnique({
    where: { slug: "text-classification" },
  });

  if (!demo) return <div className="page-container">Demo not found</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Text Classification &amp; Insights</h1>
        <p>Automatically classify customer feedback by sentiment, category, and urgency.</p>
      </div>
      <TextClassificationClient demoId={demo.id} />
    </div>
  );
}
