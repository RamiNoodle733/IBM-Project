"use client";

import { ClickableTile, Tag } from "@carbon/react";
import { Document, Category, ChartLine } from "@carbon/icons-react";

const iconMap: Record<string, React.ComponentType<{ size: number }>> = {
  Document,
  Category,
  ChartLine,
};

interface DemoCatalogProps {
  demos: Array<{
    id: string;
    slug: string;
    title: string;
    description: string;
    icon: string;
  }>;
  tags: Record<string, string[]>;
  linkPrefix?: string;
  mode?: "demo" | "guided";
}

export function DemoCatalogGrid({ demos, tags, linkPrefix = "/demos", mode = "demo" }: DemoCatalogProps) {
  return (
    <div className="demo-grid">
      {demos.map((demo) => {
        const IconComponent = iconMap[demo.icon] || Document;
        const demoTags = tags[demo.slug] || [];
        return (
          <ClickableTile
            key={demo.id}
            href={`${linkPrefix}/${demo.slug}`}
            className="demo-card"
          >
            <IconComponent size={32} />
            <h3>{demo.title}</h3>
            <p>{mode === "guided" ? "Guided presentation with step-by-step talk track" : demo.description}</p>
            <div className="demo-card__tags">
              {mode === "guided" ? (
                <Tag type="green" size="sm">Guided Mode</Tag>
              ) : (
                demoTags.map((tag) => (
                  <Tag key={tag} type="blue" size="sm">
                    {tag}
                  </Tag>
                ))
              )}
            </div>
          </ClickableTile>
        );
      })}
    </div>
  );
}
