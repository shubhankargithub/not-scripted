import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePageBody } from "@/components/ArticlePage";
import { CATEGORY_MAP, getAllSlugs, getArticleBySlug } from "@/lib/articles";
import { articleImageOrFallback, pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/article/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Story not found" };

  const path = `/article/${article.slug}`;

  return pageMeta({
    title: article.headline,
    description: article.dek,
    path,
    image: articleImageOrFallback(article.slug),
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
    section: CATEGORY_MAP[article.category]?.name ?? article.category,
    tags: article.tags,
    keywords: article.tags,
  });
}

export default async function ArticleRoute({ params }: PageProps<"/article/[slug]">) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return <ArticlePageBody article={article} />;
}