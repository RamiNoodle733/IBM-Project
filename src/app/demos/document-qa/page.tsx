import { prisma } from "@/lib/prisma";
import { DocumentQAClient } from "@/components/demos/DocumentQAClient";

export default async function DocumentQAPage() {
  const demo = await prisma.demo.findUnique({
    where: { slug: "document-qa" },
    include: { documents: { where: { isPreloaded: true } } },
  });

  if (!demo) return <div className="page-container">Demo not found</div>;

  const docs = demo.documents.map((d) => ({
    id: d.id,
    fileName: d.fileName,
    fileType: d.fileType,
    isPreloaded: d.isPreloaded,
  }));

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Document Q&amp;A / Knowledge Assistant</h1>
        <p>Ask questions about your documents and get AI-powered answers with source citations.</p>
      </div>
      <DocumentQAClient preloadedDocs={docs} demoId={demo.id} />
    </div>
  );
}
