import { getByType, getBreaking, getEditorsPicks, getLead, getMostRead, getTopStories, getTrending, getAllArticles } from "./articles";
import type { Article } from "@/content/types";
import { TYPE_META } from "@/content/taxonomy";
import { CATEGORY_MAP } from "@/content/taxonomy";

export interface ListingConfig {
  eyebrow: string;
  title: string;
  dek: string;
  accent: string;
  articles: Article[];
  sidebarTitle: string;
  meta: { label: string; value: string }[];
}

const DESKS: Record<string, () => ListingConfig> = {
  "/latest": () => {
    const all = getAllArticles();
    return {
      eyebrow: "Live feed",
      title: "Latest News",
      dek: "Every NOT SCRIPTED story, newest first. Times are shown in IST. Each entry records where the facts were established from — nothing appears here without a dated source behind it.",
      accent: "#14181d",
      articles: all,
      sidebarTitle: "Most read",
      meta: [
        { label: "Total on file", value: `${all.length}` },
        { label: "Feed order", value: "Newest first" },
      ],
    };
  },
  "/top-stories": () => {
    const list = getTopStories(12);
    return {
      eyebrow: "The lead package",
      title: "Top Stories",
      dek: "What the desk is putting first: the stories our editors judge to matter most, whether or not they broke first.",
      accent: "#c21f17",
      articles: list,
      sidebarTitle: "Trending",
      meta: [
        { label: "Selected", value: `${list.length}` },
        { label: "Criterion", value: "Editor judgement" },
      ],
    };
  },
  "/breaking": () => {
    const list = getBreaking(12);
    return {
      eyebrow: "Developing",
      title: "Breaking News",
      dek: "Stories the newsroom is actively following. Breaking entries are time-stamped to the moment of the last verified update and never claim more certainty than the sources allow.",
      accent: "#d40d0d",
      articles: list,
      sidebarTitle: "Just in",
      meta: [
        { label: "Live items", value: `${list.length}` },
        { label: "Convention", value: "IST timestamps" },
      ],
    };
  },
  "/most-read": () => {
    const list = getMostRead(12);
    return {
      eyebrow: "Audience",
      title: "Most Read",
      dek: "What readers on NOT SCRIPTED spent the most time with this week. Ranked, dated and linked, with the same source records as everywhere else on the site.",
      accent: "#8a2b4d",
      articles: list,
      sidebarTitle: "Trending",
      meta: [
        { label: "Ranked", value: `${list.length}` },
        { label: "Window", value: "Rolling seven days" },
      ],
    };
  },
  "/trending": () => {
    const list = getTrending(12);
    return {
      eyebrow: "Audience",
      title: "Trending",
      dek: "Stories picking up the most attention across the site right now, surfaced by reading velocity rather than editorial selection.",
      accent: "#9c3b14",
      articles: list,
      sidebarTitle: "Most read",
      meta: [{ label: "Rising", value: `${list.length}` }],
    };
  },
  "/editors-picks": () => {
    const list = getEditorsPicks(12);
    return {
      eyebrow: "Chosen by the editors",
      title: "Editor's Picks",
      dek: "Coverage selected for reading value rather than news value: the pieces we would send to someone who wants to understand an issue rather than catch up on it.",
      accent: "#7a1f3d",
      articles: list,
      sidebarTitle: "Most read",
      meta: [{ label: "Picked", value: `${list.length}` }],
    };
  },
  "/original": () => {
    const list = getByType("original");
    return {
      eyebrow: TYPE_META.original.name,
      title: "Original Reporting",
      dek: TYPE_META.original.description,
      accent: TYPE_META.original.accent,
      articles: list,
      sidebarTitle: "Most read",
      meta: [
        { label: "Originals", value: `${list.length}` },
        { label: "Built from", value: "Documents & datasets" },
      ],
    };
  },
  "/opinion": () => {
    const list = getByType("analysis");
    return {
      eyebrow: TYPE_META.analysis.name,
      title: "Opinion & Analysis",
      dek: TYPE_META.analysis.description,
      accent: TYPE_META.analysis.accent,
      articles: list,
      sidebarTitle: "Most read",
      meta: [
        { label: "Pieces", value: `${list.length}` },
        { label: "Standing", value: "Clearly labelled argument" },
      ],
    };
  },
  "/explainers": () => {
    const list = getByType("explainer");
    return {
      eyebrow: TYPE_META.explainer.name,
      title: "Explainers",
      dek: TYPE_META.explainer.description,
      accent: TYPE_META.explainer.accent,
      articles: list,
      sidebarTitle: "Most read",
      meta: [{ label: "Explainers", value: `${list.length}` }],
    };
  },
  "/from-around-the-web": () => {
    const list = getByType("from-the-web");
    return {
      eyebrow: TYPE_META["from-the-web"].name,
      title: "From Around The Web",
      dek: TYPE_META["from-the-web"].description,
      accent: TYPE_META["from-the-web"].accent,
      articles: list,
      sidebarTitle: "Most read",
      meta: [
        { label: "Summaries", value: `${list.length}` },
        { label: "Every one linked to its original", value: "Yes" },
      ],
    };
  },
};

export function getDeskConfig(path: string): ListingConfig | undefined {
  return DESKS[path]?.();
}

export function allDeskPaths(): string[] {
  return Object.keys(DESKS);
}

export function sectionConfig(slug: string): ListingConfig | undefined {
  const cat = CATEGORY_MAP[slug];
  if (!cat) return undefined;
  const list = getAllArticles().filter((a) => a.category === slug);
  return {
    eyebrow: `${cat.name} desk`,
    title: cat.name,
    dek: cat.blurb,
    accent: cat.accent,
    articles: list,
    sidebarTitle: `Most read in ${cat.name}`,
    meta: [
      { label: "Stories", value: `${list.length}` },
      { label: "Also filed under", value: "Archive" },
    ],
  };
}

export function sectionSlugs(): string[] {
  return Object.keys(CATEGORY_MAP);
}

export function leadSummary(): Article | undefined {
  return getLead();
}