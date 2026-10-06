import type { Article, ArticleType } from "@/content/types";
import { AUTHOR_MAP } from "@/content/authors";
import { readMinutes } from "./format";

/**
 * Everything a card needs. Deliberately excludes body copy, sources and tags so
 * that listing pages ship a small serialisable payload instead of duplicating
 * whole articles into the RSC stream.
 */
export interface CardRef {
  id: string;
  slug: string;
  headline: string;
  dek: string;
  category: string;
  type: ArticleType;
  publishedAt: string;
  kicker?: string;
  authorName: string;
  sourceCount: number;
  readMins: number;
  breaking: boolean;
}

export function toCard(a: Article): CardRef {
  return {
    id: a.id,
    slug: a.slug,
    headline: a.headline,
    dek: a.dek,
    category: a.category,
    type: a.type,
    publishedAt: a.publishedAt,
    kicker: a.kicker,
    authorName: AUTHOR_MAP[a.authorId]?.name ?? a.authorId.replace(/^a-/, "").replace(/-/g, " "),
    sourceCount: a.sources.length,
    readMins: readMinutes(a.body),
    breaking: Boolean(a.flags?.breaking),
  };
}

export function toCards(list: Article[]): CardRef[] {
  return list.map(toCard);
}