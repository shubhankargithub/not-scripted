import { toCards } from "@/lib/card";
import type { Metadata } from "next";
import { ListingView } from "@/components/ListingView";
import { getDeskConfig } from "@/lib/listings";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Original Reporting",
  description: "NOT SCRIPTED's own journalism, built from primary documents and public datasets rather than from other publications' copy.",
  path: "/original",
});

export default function Page() {
  const cfg = getDeskConfig("/original")!;
  return (
    <ListingView
      eyebrow={cfg.eyebrow}
      title={cfg.title}
      dek={cfg.dek}
      articles={toCards(cfg.articles)}
      accent={cfg.accent}
      basePath="/original"
      page={1}
      totalPages={1}
      meta={cfg.meta}
      sidebarTitle={cfg.sidebarTitle}
    />
  );
}