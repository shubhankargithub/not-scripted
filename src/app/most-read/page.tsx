import { toCards } from "@/lib/card";
import type { Metadata } from "next";
import { ListingView } from "@/components/ListingView";
import { getDeskConfig } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Most Read",
  description: "What readers on NOT SCRIPTED spent the most time with this week. Ranked, dated and linked, with the same source records as everywhere else.",
  alternates: { canonical: "/most-read" },
};

export default function Page() {
  const cfg = getDeskConfig("/most-read")!;
  return (
    <ListingView
      eyebrow={cfg.eyebrow}
      title={cfg.title}
      dek={cfg.dek}
      articles={toCards(cfg.articles)}
      accent={cfg.accent}
      basePath="/most-read"
      page={1}
      totalPages={1}
      meta={cfg.meta}
      sidebarTitle={cfg.sidebarTitle}
    />
  );
}