import { toCards } from "@/lib/card";
import type { Metadata } from "next";
import { ListingView } from "@/components/ListingView";
import { getDeskConfig } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Opinion & Analysis",
  description: "Clearly labelled analysis and argument from NOT SCRIPTED columnists. Not straight news, and not the view of the editors as a whole.",
  alternates: { canonical: "/opinion" },
};

export default function Page() {
  const cfg = getDeskConfig("/opinion")!;
  return (
    <ListingView
      eyebrow={cfg.eyebrow}
      title={cfg.title}
      dek={cfg.dek}
      articles={toCards(cfg.articles)}
      accent={cfg.accent}
      basePath="/opinion"
      page={1}
      totalPages={1}
      meta={cfg.meta}
      sidebarTitle={cfg.sidebarTitle}
    />
  );
}