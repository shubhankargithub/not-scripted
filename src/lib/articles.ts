import { ARTICLES } from "@/content";
import { AUTHORS, AUTHOR_MAP } from "@/content/authors";
import { CATEGORIES, CATEGORY_MAP, SOURCE_TYPE_LABELS, TYPE_META } from "@/content/taxonomy";
import type { Article, ArticleType, ArticleSource, Block, SourceType } from "@/content/types";
import { monthKey, readMinutes, yearKey } from "./format";

export { AUTHORS, AUTHOR_MAP, CATEGORIES, CATEGORY_MAP, SOURCE_TYPE_LABELS, TYPE_META };

function blockText(b: Block): string {
  return "text" in b && typeof b.text === "string" ? b.text : "";
}

function blockItems(b: Block): string[] {
  return "items" in b && Array.isArray(b.items) ? b.items : [];
}

const ALL = ARTICLES;

export function getAllArticles(): Article[] {
  return ALL;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ALL.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return ALL.map((a) => a.slug);
}

export function countArticles(): number {
  return ALL.length;
}

function flagged(flag: keyof NonNullable<Article["flags"]>, limit: number): Article[] {
  const hits = ALL.filter((a) => a.flags?.[flag]);
  if (hits.length >= limit) return hits.slice(0, limit);
  const seen = new Set(hits.map((a) => a.id));
  for (const a of ALL) {
    if (hits.length >= limit) break;
    if (!seen.has(a.id)) {
      hits.push(a);
      seen.add(a.id);
    }
  }
  return hits.slice(0, limit);
}

export const getLead = (): Article | undefined =>
  ALL.find((a) => a.flags?.lead) ?? ALL[0];

export const getTopStories = (limit = 6): Article[] => flagged("topStory", limit);
export const getBreaking = (limit = 5): Article[] => flagged("breaking", limit);
export const getEditorsPicks = (limit = 4): Article[] => flagged("editorsPick", limit);
export const getMostRead = (limit = 5): Article[] => flagged("mostRead", limit);
export const getTrending = (limit = 5): Article[] => flagged("trending", limit);

export function getLatest(limit = 20, exclude: string[] = []): Article[] {
  const skip = new Set(exclude);
  return ALL.filter((a) => !skip.has(a.id)).slice(0, limit);
}

export function getByCategory(category: string, limit?: number): Article[] {
  const list = ALL.filter((a) => a.category === category);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function getByType(type: ArticleType, limit?: number): Article[] {
  const list = ALL.filter((a) => a.type === type);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

export function countByCategory(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const a of ALL) out[a.category] = (out[a.category] ?? 0) + 1;
  return out;
}

export function countByType(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const a of ALL) out[a.type] = (out[a.type] ?? 0) + 1;
  return out;
}

export function countByMonth(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const a of ALL) {
    const k = monthKey(a.publishedAt);
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

export interface ArchiveMonth {
  key: string;
  count: number;
}

export function getArchiveMonths(): ArchiveMonth[] {
  return Object.entries(countByMonth())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, count]) => ({ key, count }));
}

export function getArchiveYears(): string[] {
  return Array.from(new Set(ALL.map((a) => yearKey(a.publishedAt)))).sort().reverse();
}

export function getByMonth(key: string): Article[] {
  return ALL.filter((a) => monthKey(a.publishedAt) === key);
}

export function getByYear(year: string): Article[] {
  return ALL.filter((a) => yearKey(a.publishedAt) === year);
}

export function countByYear(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const a of ALL) {
    const k = yearKey(a.publishedAt);
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

export interface SourceRecord extends Omit<ArticleSource, "type"> {
  type: SourceType;
  /** Which article the source was used for. */
  articleSlug: string;
  articleTitle: string;
}

export function getSourceRegister(): SourceRecord[] {
  const out: SourceRecord[] = [];
  for (const a of ALL) {
    for (const s of a.sources) {
      out.push({ ...s, articleSlug: a.slug, articleTitle: a.headline });
    }
  }
  return out;
}

export interface SourceFacet {
  name: string;
  count: number;
}

export function getSourceFacets(): SourceFacet[] {
  const tally = new Map<string, number>();
  for (const a of ALL) {
    const names = new Set<string>();
    for (const s of a.sources) names.add(s.name);
    for (const n of names) tally.set(n, (tally.get(n) ?? 0) + 1);
  }
  return Array.from(tally, ([name, count]) => ({ name, count })).sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );
}

export function countSources(): number {
  return getSourceRegister().length;
}

export function getHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Full-text-ish search across headline, dek, tags, kicker and body. */
export function searchArticles(query: string, pool: Article[] = ALL): Article[] {
  const q = query.trim().toLowerCase();
  if (!q) return pool;
  const terms = q.split(/\s+/).filter(Boolean);
  return pool.filter((a) => {
    const hay = [
      a.headline,
      a.dek,
      a.kicker ?? "",
      a.dateline ?? "",
      a.category,
      a.tags.join(" "),
      ...a.sources.map((s) => s.name),
      ...a.body.map((b) => [blockText(b), ...blockItems(b)].join(" ")),
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}

export function getRelated(article: Article, limit = 4): Article[] {
  const tags = new Set(article.tags);
  const scored = ALL.filter((a) => a.id !== article.id).map((a) => {
    let score = 0;
    if (a.category === article.category) score += 3;
    for (const t of a.tags) if (tags.has(t)) score += 2;
    if (a.type === article.type) score += 1;
    if (Math.abs(new Date(a.publishedAt).getTime() - new Date(article.publishedAt).getTime()) < 1000 * 60 * 60 * 24 * 21) {
      score += 1;
    }
    return { a, score };
  });
  return scored
    .sort((x, y) => y.score - x.score || y.a.publishedAt.localeCompare(x.a.publishedAt))
    .slice(0, limit)
    .map((x) => x.a);
}

export function getAuthorFor(article: Article) {
  return AUTHOR_MAP[article.authorId] ?? AUTHORS[AUTHORS.length - 1];
}

export function getArticlesByAuthor(authorId: string): Article[] {
  return ALL.filter((a) => a.authorId === authorId);
}

export function getDeskCounts(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const a of ALL) {
    const author = AUTHOR_MAP[a.authorId];
    if (!author) continue;
    out[author.desk] = (out[author.desk] ?? 0) + 1;
  }
  return out;
}

/** Tags ranked by usage, for the archive filter bar and tag clouds. */
export function getTagFacets(): SourceFacet[] {
  const tally = new Map<string, number>();
  for (const a of ALL) for (const t of a.tags) tally.set(t, (tally.get(t) ?? 0) + 1);
  return Array.from(tally, ([name, count]) => ({ name, count })).sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );
}

export function readingTime(article: Article): number {
  return readMinutes(article.body);
}

export function wordCount(article: Article): number {
  let words = 0;
  for (const b of article.body) {
    const chunks = [blockText(b), ...blockItems(b)];
    for (const c of chunks) words += c.split(/\s+/).filter(Boolean).length;
  }
  return words;
}

export function latestPublishedAt(): string {
  return ALL[0].publishedAt;
}

export function earliestPublishedAt(): string {
  return ALL[ALL.length - 1].publishedAt;
}