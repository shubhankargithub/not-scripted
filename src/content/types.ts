export const ARTICLE_TYPES = [
  "original",
  "news-update",
  "explainer",
  "analysis",
  "from-the-web",
] as const;

export type ArticleType = (typeof ARTICLE_TYPES)[number];

export const SOURCE_TYPES = [
  "official",
  "wire",
  "publication",
  "institution",
  "data",
  "research",
] as const;

export type SourceType = (typeof SOURCE_TYPES)[number];

export interface ArticleSource {
  /** Name of the outlet / institution that published the source material. */
  name: string;
  /** Canonical URL of the source material. Must be a real, resolvable URL. */
  url: string;
  /** Publication date of the source, ISO-8601 (YYYY-MM-DD). */
  date?: string;
  /** Byline of the source, where one exists. */
  author?: string;
  type: SourceType;
}

export type Block =
  | { kind: "para"; text: string }
  | { kind: "subhead"; text: string }
  | { kind: "quote"; text: string; attribution?: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "numberline"; items: string[] }
  | { kind: "callout"; title?: string; text: string }
  | { kind: "dateline-note"; text: string };

export interface Article {
  id: string;
  slug: string;
  type: ArticleType;
  category: string;
  tags: string[];
  /** Short desk label shown above the headline. */
  kicker?: string;
  headline: string;
  /** Standfirst / summary deck. */
  dek: string;
  /** Location prefix used in the byline block, e.g. "Bengaluru". */
  dateline?: string;
  /** ISO-8601 publication timestamp, always stored in UTC. */
  publishedAt: string;
  /** ISO-8601 timestamp of a later revision. */
  updatedAt?: string;
  authorId: string;
  /** Opening bullet summary shown on article pages. */
  keyPoints?: string[];
  body: Block[];
  /** Verified source material used to establish the facts. */
  sources: ArticleSource[];
  /** Editorial flags used by the homepage and section modules. */
  flags?: {
    breaking?: boolean;
    topStory?: boolean;
    editorsPick?: boolean;
    mostRead?: boolean;
    trending?: boolean;
    lead?: boolean;
  };
  /** Illustration caption + credit. All artwork is original vector art, not photography. */
  art?: { alt: string; caption: string; credit?: string };
  /** Where the fact-checking / sourcing record lives. */
  sourcingNote?: string;
}

/**
 * A freely-licensed photograph used to illustrate an article. Every entry in the
 * photo register carries the photographer, the licence and a link back to the
 * file page on Wikimedia Commons. Captions describe the subject only — never
 * the event — because most of these are not pictures of the specific event.
 */
export interface ArticlePhoto {
  /** Path prefix, without extension or width suffix. */
  base: string;
  /** Responsive candidate list, e.g. "/img/…-400.jpg 400w, /img/…-800.jpg 800w". */
  srcset: string;
  width: number;
  height: number;
  caption: string;
  alt: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  sourceTitle: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  desk: string;
  bio: string;
  location: string;
}