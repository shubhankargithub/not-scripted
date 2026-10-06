import { toCards } from "@/lib/card";
import type { Metadata } from "next";
import { ListingView } from "@/components/ListingView";
import { getDeskConfig } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Trending",
  description: "Stories picking up the most attention across the site right now, surfaced by reading velocity rather than editorial selection.",
  alternates: { canonical: "/trending" },
};

export default function Page() {
  const cfg = getDeskConfig("/trending")!;
  return (
    <ListingView
      eyebrow={cfg.eyebrow}
      title={cfg.title}
      dek={cfg.dek}
      articles={toCards(cfg.articles)}
      accent={cfg.accent}
      basePath="/trending"
      page={1}
      totalPages={1}
      meta={cfg.meta}
      sidebarTitle={cfg.sidebarTitle}
    />
  );
}