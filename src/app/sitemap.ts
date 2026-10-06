export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { CATEGORIES } from "@/content/taxonomy";
import { SITE } from "@/lib/site";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "hourly" },
  { path: "/latest", priority: 0.9, changeFrequency: "hourly" },
  { path: "/top-stories", priority: 0.9, changeFrequency: "hourly" },
  { path: "/breaking", priority: 0.9, changeFrequency: "hourly" },
  { path: "/most-read", priority: 0.8, changeFrequency: "daily" },
  { path: "/trending", priority: 0.7, changeFrequency: "hourly" },
  { path: "/editors-picks", priority: 0.7, changeFrequency: "daily" },
  { path: "/archive", priority: 0.9, changeFrequency: "weekly" },
  { path: "/opinion", priority: 0.7, changeFrequency: "daily" },
  { path: "/explainers", priority: 0.7, changeFrequency: "daily" },
  { path: "/from-around-the-web", priority: 0.6, changeFrequency: "weekly" },
  { path: "/original", priority: 0.6, changeFrequency: "weekly" },
  { path: "/sources", priority: 0.6, changeFrequency: "weekly" },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" },
  { path: "/editorial-standards", priority: 0.5, changeFrequency: "monthly" },
  { path: "/corrections", priority: 0.4, changeFrequency: "weekly" },
  { path: "/newsroom", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
  { path: "/newsletter", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = getAllArticles()[0].publishedAt;
  const articles = getAllArticles().map((a) => ({
    url: `${SITE.url}/article/${a.slug}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: a.flags?.lead ? 0.9 : 0.7,
  }));

  const sections = CATEGORIES.map((c) => ({
    url: `${SITE.url}/section/${c.slug}`,
    lastModified: new Date(latest),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const staticRoutes = STATIC_ROUTES.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: new Date(latest),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  return [...staticRoutes, ...sections, ...articles];
}