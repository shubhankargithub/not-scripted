import { getAllArticles, getAuthorFor } from "@/lib/articles";
import { CATEGORY_MAP, TYPE_META } from "@/content/taxonomy";
import { SITE } from "@/lib/site";

function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const dynamic = "force-static";

export function GET() {
  // The whole archive is published. This feed is one of the two feeds Google
  // News accepts for discovery, and capping it hid 78 stories from consumers
  // that only read the feed.
  const articles = getAllArticles();

  const items = articles
    .map((a) => {
      const link = `${SITE.url}/article/${a.slug}`;
      const cat = CATEGORY_MAP[a.category];
      const author = getAuthorFor(a);
      return `    <item>
      <title>${esc(a.headline)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <dc:creator>${esc(author.name)}</dc:creator>
      <category>${esc(cat?.name ?? a.category)}</category>
      <category>${esc(TYPE_META[a.type].name)}</category>
      <description>${esc(a.dek)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(SITE.name)}</title>
    <link>${SITE.url}</link>
    <description>${esc(SITE.description)}</description>
    <language>en-in</language>
    <lastBuildDate>${new Date(SITE.editionAt).toUTCString()}</lastBuildDate>
    <generator>NOT SCRIPTED</generator>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
    <copyright>${esc(SITE.name)} ${SITE.founded}-2026</copyright>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}