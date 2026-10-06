import { toCards } from "@/lib/card";
import type { Metadata } from "next";
import { ListingView } from "@/components/ListingView";
import { pageCount, parsePage, slicePage } from "@/lib/paginate";
import { getDeskConfig } from "@/lib/listings";
import { pageMeta, articleImageOrFallback } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Latest News",
  description:
    "The NOT SCRIPTED live feed: every story, newest first, with publication times in IST and the sources each was established against.",
  path: "/latest",
  image: articleImageOrFallback(getDeskConfig("/latest")!.articles[0].slug),
});

export default function LatestPage() {
  const cfg = getDeskConfig("/latest")!;
  const max = pageCount(cfg.articles.length);

  return (
    <ListingView
      eyebrow={cfg.eyebrow}
      title={cfg.title}
      dek={cfg.dek}
      articles={toCards(slicePage(cfg.articles, 1))}
      accent={cfg.accent}
      basePath="/latest"
      page={parsePage(undefined, max)}
      totalPages={max}
      meta={cfg.meta}
      sidebarTitle={cfg.sidebarTitle}
    />
  );
}