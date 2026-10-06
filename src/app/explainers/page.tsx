import { toCards } from "@/lib/card";
import type { Metadata } from "next";
import { ListingView } from "@/components/ListingView";
import { getDeskConfig } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Explainers",
  description: "Context and background on a story that is confusing, technical or simply too important to move past in three paragraphs.",
  alternates: { canonical: "/explainers" },
};

export default function Page() {
  const cfg = getDeskConfig("/explainers")!;
  return (
    <ListingView
      eyebrow={cfg.eyebrow}
      title={cfg.title}
      dek={cfg.dek}
      articles={toCards(cfg.articles)}
      accent={cfg.accent}
      basePath="/explainers"
      page={1}
      totalPages={1}
      meta={cfg.meta}
      sidebarTitle={cfg.sidebarTitle}
    />
  );
}