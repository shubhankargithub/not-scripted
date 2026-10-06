import { toCards } from "@/lib/card";
import type { Metadata } from "next";
import { ListingView } from "@/components/ListingView";
import { PER_PAGE, pageCount, parsePage, slicePage } from "@/lib/paginate";
import { getDeskConfig } from "@/lib/listings";
import { pageMeta, articleImageOrFallback } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  const cfg = getDeskConfig("/latest")!;
  const max = pageCount(cfg.articles.length);
  return Array.from({ length: max - 1 }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: PageProps<"/latest/[n]">): Promise<Metadata> {
  const { n } = await params;
  const cfg = getDeskConfig("/latest")!;
  return pageMeta({
    title: `Latest News — page ${n}`,
    description: `Page ${n} of the NOT SCRIPTED live feed, newest first.`,
    path: `/latest/${n}`,
    image: cfg.articles[0] ? articleImageOrFallback(cfg.articles[0].slug) : undefined,
  });
}

export default async function LatestPaged({ params }: PageProps<"/latest/[n]">) {
  const { n } = await params;
  const cfg = getDeskConfig("/latest")!;
  const max = pageCount(cfg.articles.length);
  const page = parsePage(n, max);

  return (
    <ListingView
      eyebrow={cfg.eyebrow}
      title={`${cfg.title} — page ${page}`}
      dek={cfg.dek}
      articles={toCards(slicePage(cfg.articles, page, PER_PAGE))}
      accent={cfg.accent}
      basePath="/latest"
      page={page}
      totalPages={max}
      meta={cfg.meta}
      sidebarTitle={cfg.sidebarTitle}
    />
  );
}