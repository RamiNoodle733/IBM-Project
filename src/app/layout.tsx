import type { Metadata } from "next";
import "./globals.scss";
import { HeaderBar } from "@/components/layout/HeaderBar";

export const metadata: Metadata = {
  title: "AI Demo Studio — IBM Data & AI",
  description:
    "Interactive AI demo platform showcasing Document Q&A, Text Classification, and Data Summarization for enterprise sales enablement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeaderBar />
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
