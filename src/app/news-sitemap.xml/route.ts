export const dynamic = "force-static";

import { getAllArticles } from "@/lib/articles";
import { SITE } from "@/lib/site";

/**
 * Google News sitemap.
 *
 * Google accepts only genuinely recent news URLs here: articles published in
 * the last two days, capped at 1,000 per file. Older stories stay in the
 * standard sitemap at /sitemap.xml, which carries the whole archive.
 *
 * This is one file regenerated on each build, not a file per article.
 *
 * Deliberate exclusions:
 * - `analysis` is left out. NOT SCRIPTED labels that type as opinion, and
 *   opinion and commentary are not what Google means by a news article here.
 * - Only `/article/` URLs appear, so no standing page, section, archive or desk
 *   listing can be misclassified as news.
 */

/** Google asks for a rolling two-day window. */
const WINDOW_MS = 2 * 24 * 60 * 60 * 1000;
/** Google's documented ceiling per news sitemap. */
const MAX_URLS = 1000;

const NEWS_TYPES = new Set(["original", "news-update", "explainer", "from-the-web"]);

function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  // Evaluated once at build time, so the window is fixed for this build.
  const cutoff = Date.now() - WINDOW_MS;

  const recent = getAllArticles()
    .filter((a) => NEWS_TYPES.has(a.type))
    .filter((a) => {
      const t = Date.parse(a.publishedAt);
      return Number.isFinite(t) && t >= cutoff;
    })
    .slice(0, MAX_URLS);

  const items = recent
    .map((a) => {
      const loc = `${SITE.url}/article/${a.slug}/`;
      return `  <url>
    <loc>${esc(loc)}</loc>
    <news:news>
      <news:publication>
        <news:name>${esc(SITE.name)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${esc(a.publishedAt)}</news:publication_date>
      <news:title>${esc(a.headline)}</news:title>
    </news:news>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=1800, stale-while-revalidate=86400",
    },
  });
}