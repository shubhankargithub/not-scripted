import { toCards } from "@/lib/card";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingView } from "@/components/ListingView";
import { PER_PAGE, pageCount, parsePage, slicePage } from "@/lib/paginate";
import { sectionConfig, sectionSlugs } from "@/lib/listings";
import { pageMeta, articleImageOrFallback } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  const out: { category: string; n: string }[] = [];
  for (const category of sectionSlugs()) {
    const cfg = sectionConfig(category);
    if (!cfg) continue;
    const max = pageCount(cfg.articles.length);
    for (let i = 2; i <= max; i += 1) out.push({ category, n: String(i) });
  }
  return out;
}

export async function generateMetadata({
  params,
}: PageProps<"/section/[category]/[n]">): Promise<Metadata> {
  const { category, n } = await params;
const cfg = sectionConfig(category);
  if (!cfg) return { title: "Section not found" };
  return pageMeta({
    title: `${cfg.title} — page ${n}`,
    description: `Page ${n} of NOT SCRIPTED ${cfg.title.toLowerCase()} coverage. ${cfg.dek}`,
    path: `/section/${category}/${n}`,
    image: cfg.articles[0] ? articleImageOrFallback(cfg.articles[0].slug) : undefined,
  });
}

export default async function SectionPaged({ params }: PageProps<"/section/[category]/[n]">) {
  const { category, n } = await params;
  const cfg = sectionConfig(category);
  if (!cfg) notFound();
  const max = pageCount(cfg.articles.length);
  const page = parsePage(n, max);

  return (
    <ListingView
      eyebrow={cfg.eyebrow}
      title={`${cfg.title} — page ${page}`}
      dek={cfg.dek}
      articles={toCards(slicePage(cfg.articles, page, PER_PAGE))}
      accent={cfg.accent}
      basePath={`/section/${category}`}
      page={page}
      totalPages={max}
      meta={cfg.meta}
      sidebarTitle={cfg.sidebarTitle}
    />
  );
}