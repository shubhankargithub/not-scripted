import type { ArticleType, SourceType } from "./types";

export interface Category {
  slug: string;
  name: string;
  /**
   * Descriptive page title used in `<title>`, Open Graph and Twitter metadata.
   * `name` alone ("India", "Sports") is too thin for a search engine to tell
   * one section from another, so each category carries a phrase that says what
   * the desk actually covers. Kept under about sixty characters so it is not
   * truncated in results.
   */
  searchTitle: string;
  /** Short descriptor used on section landing pages. */
  blurb: string;
  /** Section index letter used in the print-style section bar. */
  accent: string;
  /** Secondary hue used for cards and rails. */
  hue: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "india",
    name: "India",
    searchTitle: "India News: Politics, Policy and Public Life",
    blurb:
      "Policy, politics and public life across the states, tracked against official records and on-the-ground reporting.",
    accent: "#B3271E",
    hue: "#E9D9D6",
  },
  {
    slug: "karnataka",
    name: "Bengaluru & Karnataka",
    searchTitle: "Bengaluru and Karnataka News",
    blurb:
      "The city and the state: infrastructure, water, mobility, urban policy and the businesses reshaping India's tech capital.",
    accent: "#9C3B14",
    hue: "#EADFD2",
  },
  {
    slug: "politics",
    name: "Politics",
    searchTitle: "Indian Politics: Parliament, Elections and Policy",
    blurb:
      "Parliamentary business, party arithmetic, electoral rolls and the machinery of Indian democracy.",
    accent: "#7A2233",
    hue: "#E7DCE0",
  },
  {
    slug: "business",
    name: "Business",
    searchTitle: "Business News: Markets, Companies and the Economy",
    blurb:
      "Markets, corporate results, labour, banking and the economy — read against the data rather than the noise.",
    accent: "#14584A",
    hue: "#D8E7E1",
  },
  {
    slug: "technology",
    name: "Technology",
    searchTitle: "Technology News: AI, Software, Space and Semiconductors",
    blurb:
      "Semiconductors, software, artificial intelligence, space and the Indian technology economy.",
    accent: "#1B3C86",
    hue: "#DCE3F1",
  },
  {
    slug: "world",
    name: "World",
    searchTitle: "World News: Global Affairs, Conflict and Diplomacy",
    blurb:
      "Reporting from outside India: conflict, diplomacy, elections, disasters and the global economy.",
    accent: "#2A4A6B",
    hue: "#DDE5EC",
  },
  {
    slug: "geopolitics",
    name: "Geopolitics",
    searchTitle: "Geopolitics: Great Power Competition and Trade Blocs",
    blurb:
      "Great-power competition, trade blocs, energy security and India's place in the shifting world order.",
    accent: "#4A3A78",
    hue: "#E0DCEA",
  },
  {
    slug: "science",
    name: "Science",
    searchTitle: "Science News: Space, Health and Climate Research",
    blurb:
      "Space missions, health research, climate models and the institutions doing the slow, careful work.",
    accent: "#0F5F6E",
    hue: "#D6E9EC",
  },
  {
    slug: "environment",
    name: "Environment",
    searchTitle: "Environment News: Air, Water, Forests and Energy",
    blurb:
      "Air, water, forests, heat and the transition — with an emphasis on what the numbers actually show.",
    accent: "#256B33",
    hue: "#D9E8D9",
  },
  {
    slug: "culture",
    name: "Culture",
    searchTitle: "Culture: Film, Music, Literature and Memory",
    blurb:
      "Film, music, literature and the institutions that decide what a country remembers.",
    accent: "#8A2B4D",
    hue: "#EEDDE4",
  },
  {
    slug: "lifestyle",
    name: "Lifestyle",
    searchTitle: "Lifestyle: Food, Travel, Health and Homes",
    blurb:
      "Food, travel, health, housing and the everyday decisions of an urban Indian household.",
    accent: "#A4621F",
    hue: "#F0E4D1",
  },
  {
    slug: "sports",
    name: "Sports",
    searchTitle: "Sport News: Cricket, Football and Athletics",
    blurb:
      "Cricket, the Asian Games, football, athletics and the business of Indian sport.",
    accent: "#1B5E20",
    hue: "#DCE9DC",
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
);

export interface TypeMeta {
  slug: ArticleType;
  name: string;
  shortName: string;
  /** One-line explanation rendered on listing pages. */
  description: string;
  /** Disclaimer strip rendered on every article of this type. */
  notice: string;
  accent: string;
  path: string;
}

export const TYPE_META: Record<ArticleType, TypeMeta> = {
  original: {
    slug: "original",
    name: "Original Reporting",
    shortName: "Original",
    description:
      "Reported by NOT SCRIPTED's own newsroom, from documents, data and interviews conducted for this publication.",
    notice:
      "Original reporting by the NOT SCRIPTED newsroom. Figures in this story were established against the sources listed at the foot of the article.",
    accent: "#B3271E",
    path: "/original",
  },
  "news-update": {
    slug: "news-update",
    name: "News Update",
    shortName: "News Update",
    description:
      "An independently written report on a current event, written by NOT SCRIPTED against verified information.",
    notice:
      "This is an independently written report by NOT SCRIPTED. It is not a reproduction of any other publication's copy; sourcing is listed at the foot of the article.",
    accent: "#1B3C86",
    path: "/latest",
  },
  explainer: {
    slug: "explainer",
    name: "Explainer",
    shortName: "Explainer",
    description:
      "Context and background on a story that is confusing, technical or simply too important to move past in three paragraphs.",
    notice:
      "Explainer: written to give a reader the background needed to follow an ongoing story. Updated when the underlying facts change.",
    accent: "#0F5F6E",
    path: "/explainers",
  },
  analysis: {
    slug: "analysis",
    name: "Analysis",
    shortName: "Analysis",
    description:
      "Interpretation and argument from NOT SCRIPTED columnists and correspondents. Clearly labelled as opinion.",
    notice:
      "This is analysis and opinion, not straight news. It does not represent the view of the publication's editors as a whole.",
    accent: "#8A2B4D",
    path: "/opinion",
  },
  "from-the-web": {
    slug: "from-the-web",
    name: "From Around The Web",
    shortName: "From The Web",
    description:
      "An independently written summary of reporting published elsewhere, with clear attribution and a link to the original.",
    notice:
      "From Around The Web: NOT SCRIPTED has written this summary. It summarises reporting published by the outlets credited below; read those reports in full for their own account.",
    accent: "#7A2233",
    path: "/from-around-the-web",
  },
};

export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  official: "Official release",
  wire: "Wire service",
  publication: "Publication",
  institution: "Research institution",
  data: "Dataset / statistics",
  research: "Academic / peer-reviewed",
};

export const NAV_SECTIONS = [
  { label: "India", href: "/section/india" },
  { label: "Politics", href: "/section/politics" },
  { label: "Business", href: "/section/business" },
  { label: "Technology", href: "/section/technology" },
  { label: "Bengaluru", href: "/section/karnataka" },
  { label: "World", href: "/section/world" },
  { label: "Geopolitics", href: "/section/geopolitics" },
  { label: "Science", href: "/section/science" },
  { label: "Environment", href: "/section/environment" },
  { label: "Culture", href: "/section/culture" },
  { label: "Lifestyle", href: "/section/lifestyle" },
  { label: "Sports", href: "/section/sports" },
];

export const NAV_DESKS = [
  { label: "Latest News", href: "/latest" },
  { label: "Top Stories", href: "/top-stories" },
  { label: "Breaking", href: "/breaking" },
  { label: "Opinion", href: "/opinion" },
  { label: "Explainers", href: "/explainers" },
  { label: "From The Web", href: "/from-around-the-web" },
  { label: "Archive", href: "/archive" },
];