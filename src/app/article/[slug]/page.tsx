import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePageBody } from "@/components/ArticlePage";
import { getAllSlugs, getArticleBySlug } from "@/lib/articles";

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

  const description = article.dek;
  return {
    title: article.headline,
    description,
    alternates: { canonical: `/article/${article.slug}` },
    keywords: article.tags,
    openGraph: {
      type: "article",
      title: article.headline,
      description,
      url: `/article/${article.slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      section: article.category,
      tags: article.tags,
    },
    twitter: { card: "summary_large_image", title: article.headline, description },
  };
}

export default async function ArticleRoute({ params }: PageProps<"/article/[slug]">) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return <ArticlePageBody article={article} />;
}