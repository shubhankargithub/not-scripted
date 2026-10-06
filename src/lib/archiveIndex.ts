import { getAllArticles } from "./articles";
import type { ArticleType } from "@/content/types";
import { isoDate, monthKey, yearKey } from "./format";

/**
 * Lightweight archive record. Deliberately excludes body copy so the archive
 * browser can be statically rendered and hydrate instantly; search matches on
 * headline, dek, tags, kicker, dateline, category and source names.
 */
export interface ArchiveRecord {
  id: string;
  slug: string;
  headline: string;
  dek: string;
  kicker?: string;
  dateline?: string;
  type: ArticleType;
  category: string;
  tags: string[];
  date: string;
  month: string;
  year: string;
  time: string;
  sources: string[];
  sourceCount: number;
  blocks: number;
  keyPoints: number;
  updated: boolean;
}

export function buildArchiveIndex(): ArchiveRecord[] {
  return getAllArticles().map((a) => ({
    id: a.id,
    slug: a.slug,
    headline: a.headline,
    dek: a.dek,
    kicker: a.kicker,
    dateline: a.dateline,
    type: a.type,
    category: a.category,
    tags: a.tags,
    date: isoDate(a.publishedAt),
    month: monthKey(a.publishedAt),
    year: yearKey(a.publishedAt),
    time: a.publishedAt,
    sources: Array.from(new Set(a.sources.map((s) => s.name))),
    sourceCount: a.sources.length,
    blocks: a.body.length,
    keyPoints: a.keyPoints?.length ?? 0,
    updated: Boolean(a.updatedAt),
  }));
}

export function searchRecord(r: ArchiveRecord, terms: string[]): boolean {
  if (!terms.length) return true;
  const hay = [
    r.headline,
    r.dek,
    r.kicker ?? "",
    r.dateline ?? "",
    r.category,
    r.tags.join(" "),
    r.sources.join(" "),
  ]
    .join(" ")
    .toLowerCase();
  return terms.every((t) => hay.includes(t));
}