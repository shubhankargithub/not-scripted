import { toCards } from "@/lib/card";
import type { Metadata } from "next";
import { ListingView } from "@/components/ListingView";
import { getDeskConfig } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Editor's Picks",
  description: "Coverage selected for reading value rather than news value: the pieces we would send to someone who wants to understand an issue rather than catch up on it.",
  alternates: { canonical: "/editors-picks" },
};

export default function Page() {
  const cfg = getDeskConfig("/editors-picks")!;
  return (
    <ListingView
      eyebrow={cfg.eyebrow}
      title={cfg.title}
      dek={cfg.dek}
      articles={toCards(cfg.articles)}
      accent={cfg.accent}
      basePath="/editors-picks"
      page={1}
      totalPages={1}
      meta={cfg.meta}
      sidebarTitle={cfg.sidebarTitle}
    />
  );
}