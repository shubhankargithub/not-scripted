import { toCards } from "@/lib/card";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingView } from "@/components/ListingView";
import { pageCount, slicePage } from "@/lib/paginate";
import { sectionConfig, sectionSlugs } from "@/lib/listings";

export function generateStaticParams() {
  return sectionSlugs().map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/section/[category]">): Promise<Metadata> {
  const { category } = await params;
  const cfg = sectionConfig(category);
  if (!cfg) return { title: "Section not found" };
  return {
    title: cfg.title,
    description: cfg.dek,
    alternates: { canonical: `/section/${category}` },
    openGraph: { title: cfg.title, description: cfg.dek, url: `/section/${category}` },
  };
}

export default async function SectionPage({ params }: PageProps<"/section/[category]">) {
  const { category } = await params;
  const cfg = sectionConfig(category);
  if (!cfg) notFound();
  const max = pageCount(cfg.articles.length);

  return (
    <ListingView
      eyebrow={cfg.eyebrow}
      title={cfg.title}
      dek={cfg.dek}
      articles={toCards(slicePage(cfg.articles, 1))}
      accent={cfg.accent}
      basePath={`/section/${category}`}
      page={1}
      totalPages={max}
      meta={cfg.meta}
      sidebarTitle={cfg.sidebarTitle}
    />
  );
}