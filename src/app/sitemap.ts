export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { CATEGORIES } from "@/content/taxonomy";
import { abs, canonical } from "@/lib/seo";

interface StaticRoute {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  /**
   * `live` marks an editorial listing, which changes whenever a story is filed
   * and therefore gets a real lastmod. Policy and reference pages only change
   * when the policy is revised, so they are listed without one rather than being
   * stamped with the newest article's date on every build.
   */
  live?: boolean;
}

const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", priority: 1, changeFrequency: "hourly", live: true },
  { path: "/latest", priority: 0.9, changeFrequency: "hourly", live: true },
  { path: "/top-stories", priority: 0.9, changeFrequency: "hourly", live: true },
  { path: "/breaking", priority: 0.9, changeFrequency: "hourly", live: true },
  { path: "/most-read", priority: 0.8, changeFrequency: "daily", live: true },
  { path: "/trending", priority: 0.7, changeFrequency: "hourly", live: true },
  { path: "/editors-picks", priority: 0.7, changeFrequency: "daily", live: true },
  { path: "/archive", priority: 0.9, changeFrequency: "weekly", live: true },
  { path: "/opinion", priority: 0.7, changeFrequency: "daily", live: true },
  { path: "/explainers", priority: 0.7, changeFrequency: "daily", live: true },
  { path: "/from-around-the-web", priority: 0.6, changeFrequency: "weekly", live: true },
  { path: "/original", priority: 0.6, changeFrequency: "weekly", live: true },
  { path: "/sources", priority: 0.6, changeFrequency: "weekly" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/ownership", priority: 0.5, changeFrequency: "monthly" },
  { path: "/chavan-industrial-group", priority: 0.5, changeFrequency: "monthly" },
  { path: "/shubhankar-chavan", priority: 0.5, changeFrequency: "monthly" },
  { path: "/fire-safety-central-railway", priority: 0.5, changeFrequency: "monthly" },
  { path: "/editorial-standards", priority: 0.5, changeFrequency: "monthly" },
  { path: "/corrections", priority: 0.4, changeFrequency: "weekly" },
  { path: "/newsroom", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
  { path: "/newsletter", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const all = getAllArticles();
  const latest = all[0].publishedAt;

  // Canonical URLs carry a trailing slash because the site is built with
  // `trailingSlash: true`. Emitting the slash here keeps the sitemap and the
  // <link rel="canonical"> tags describing the same URL, which is what stops
  // the two forms being indexed as duplicates of each other.
  const articles = all.map((a) => ({
    url: abs(canonical(`/article/${a.slug}`)),
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: a.flags?.lead ? 0.9 : 0.7,
  }));

  const sections = CATEGORIES.map((c) => ({
    url: abs(canonical(`/section/${c.slug}`)),
    lastModified: new Date(latest),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const staticRoutes = STATIC_ROUTES.map((r) => ({
    url: abs(canonical(r.path)),
    ...(r.live ? { lastModified: new Date(latest) } : {}),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  return [...staticRoutes, ...sections, ...articles];
}