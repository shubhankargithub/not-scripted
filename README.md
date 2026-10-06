# NOT SCRIPTED

**notscripted.in** — an independent digital newsroom based in Bengaluru.

A statically generated news publication covering India, Bengaluru & Karnataka, national politics,
business, technology, world affairs, geopolitics, science, environment, culture, lifestyle and
sport. The publication's defining commitment is that every article declares how it was made, and
records the sources it was established against.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # 196 static pages
npm start            # serve the production build
```

Requires Node 20+. Built and verified against **Next.js 16.3.8**, **React 19.2**, **Tailwind CSS v4**.

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |
| `npx next typegen` | Regenerate route types after adding routes |

---

## The editorial model

### Five article types

Every article carries a type badge. The type is a claim about how the piece was made, not a
stylistic choice.

| Type | Path | Meaning |
|---|---|---|
| **Original** | `/original` | Built by this newsroom from primary documents, datasets or public records. Must set `sourcingNote` naming what was independently worked from. |
| **News Update** | `/latest` | An independently written report on a current event, established against verified information. |
| **Explainer** | `/explainers` | Background and context so a reader can follow an ongoing story. |
| **Analysis** | `/opinion` | Argument and interpretation. Labelled as opinion; does not represent the editors as a whole. |
| **From Around The Web** | `/from-around-the-web` | An independently written summary of reporting published elsewhere, attributed by name and linked to the original. |

### Sourcing rules

- Nothing is copied, paraphrased sentence-by-sentence, or borrowed as original reporting.
- Every article carries at least two sources with a name, a real URL, and a publication date where
  known. Sources are ranked: official releases first, then wire services, institutions and datasets,
  then established publications.
- Every article ends with a **reporting note** making its retrospective character explicit.
- There are no invented quotes, interviews, eyewitness accounts, statistics or unnamed sources
  anywhere in the archive.
- Archive entries are compiled from published sources after the fact. They are not dispatches
  from the month they are dated to.
- All artwork is original generative vector geometry. There is no stock photography.

These rules are published for readers at `/editorial-standards` and `/about`, and the full source
ledger is at `/sources`.

---

## The archive

138 stories distributed across **January – October 2026**, weighted toward recent months (recent
months carry the fullest long-form work; older entries are deliberately more concise).

| Month | Stories | | Month | Stories |
|---|---|---|---|---|
| October 2026 | 18 | | March 2026 | 13 |
| September 2026 | 3 | | February 2026 | 12 |
| August 2026 | 20 | | January 2026 | 11 |
| July 2026 | 18 | | | |
| June 2026 | 17 | | | |
| May 2026 | 16 | | | |
| April 2026 | 10 | | | |

Total: **138 articles · 454 source references**.

### `/archive`

- Full-text search across headline, dek, tags, dateline, desk and source names
- Filter by desk (12), article type (5), source, month, year, topic
- Sort: newest, oldest, A–Z, most sourced
- Pagination, plus a month-and-year index and a type/desk breakdown
- **Every filter view is linkable.** Filter state lives in the URL.

---

## Structure

```
src/
├─ app/                          routes (App Router, all static)
│  ├─ layout.tsx                 root shell, fonts, metadata
│  ├─ page.tsx                   homepage
│  ├─ globals.css                design tokens
│  ├─ icon.tsx                   generated favicon
│  ├─ not-found.tsx              404
│  ├─ archive/                   search + filters + month index
│  ├─ latest/  latest/[n]/       reverse-chronological feed, paginated
│  ├─ article/[slug]/            article template (138 static pages)
│  ├─ section/[category]/[n]/    12 desks, paginated
│  ├─ top-stories/ breaking/ most-read/ trending/ editors-picks/
│  ├─ original/ opinion/ explainers/ from-around-the-web/
│  ├─ about/ editorial-standards/ sources/ newsroom/ corrections/
│  ├─ contact/ newsletter/ privacy/ terms/
│  └─ sitemap.ts robots.ts feed.xml/route.ts
├─ components/
│  ├─ Wordmark.tsx               outlined "Not" + solid "Scripted"
│  ├─ ArticleArt.tsx             generative vector artwork
│  ├─ Masthead.tsx  Chrome.tsx   masthead, nav, breaking ticker, sticky bar
│  ├─ Footer.tsx  cards.tsx  rails.tsx  ui.tsx
│  ├─ ArticlePage.tsx            article body, byline, sources, related
│  ├─ ListingView.tsx            shared section/desk listing
│  └─ ArchiveBrowser.tsx         client-side archive filtering
├─ content/
│  ├─ types.ts                   Article, Block, ArticleSource, Author
│  ├─ taxonomy.ts                12 desks, 5 types, source categories
│  ├─ authors.ts                 28 journalists across 13 desks
│  ├─ index.ts                   aggregates + sorts all months
│  └─ articles/2026-01.ts … 2026-10.ts
└─ lib/
   ├─ articles.ts                queries, search, facets, related
   ├─ card.ts                    lightweight card projection
   ├─ archiveIndex.ts            archive search records
   ├─ listings.ts                desk + section page configuration
   ├─ paginate.ts  format.ts  site.ts
```

### Adding an article

Append to the relevant `src/content/articles/YYYY-MM.ts`:

```ts
{
  id: "ns-2026-11-example",
  slug: "unique-lowercase-hyphenated-slug",
  type: "news-update",
  category: "india",
  tags: ["Topic"],
  kicker: "Optional desk label",
  headline: "Your own headline",
  dek: "One-sentence standfirst.",
  dateline: "New Delhi",
  publishedAt: "2026-11-04T06:15:00.000Z",
  updatedAt: "2026-11-04T09:30:00.000Z",
  authorId: "a-nandini-rao",
  keyPoints: ["Short version bullet."],
  body: [
    { kind: "para", text: "…" },
    { kind: "subhead", text: "…" },
    { kind: "bullets", items: ["…"] },
    { kind: "quote", text: "…", attribution: "…" },
    { kind: "numberline", items: ["…"] },
    { kind: "callout", title: "…", text: "…" },
    { kind: "dateline-note", text: "Retrospective reporting note." }
  ],
  sources: [
    { name: "…", url: "https://…", date: "2026-11-03", type: "official" }
  ],
  flags: { topStory: true, editorsPick: true, mostRead: true, trending: true, breaking: true, lead: true },
  art: { alt: "…", caption: "…", credit: "Illustration: NOT SCRIPTED" },
  sourcingNote: "Required only for type: original"
}
```

Then `npm run build`. New pages, sitemap entries, RSS items and archive records are generated
automatically.

Rules that matter: `source.date` must be on or before `publishedAt`; every article needs at least
two real sources; every article ends with a `dateline-note`; slugs must be unique across all months.

---

## Design system

| Token | Value | Use |
|---|---|---|
| `paper` | `#FBF9F5` | Page ground, warm newsprint |
| `ink` | `#14181D` | Headlines, masthead |
| `brand` | `#C21F17` | Oxide red — accents, live marks |
| `rule` | `#DDD8CE` | Hairlines |
| `opinion` / `explain` / `web` | `#7A1F3D` / `#0B5A66` / `#6B4423` | Per-type accents |

- **Display / body:** Newsreader (variable, optical sizing, italic)
- **UI / labels:** Archivo

Utilities: `label-ui`, `label-meta`, `hairline`, `double-rule`, `headline-tight`, `dropcap-off`.

The masthead sets **Not** in outline via `-webkit-text-stroke` and **Scripted** solid — the name as
an editorial position. Article artwork is generated deterministically from each slug and its desk
palette, so it is stable across builds and unique per article.

---

## Technical notes

- **Fully static.** 196 prerendered routes. No runtime data fetching, no CMS, no database.
- **Card projection.** Listing pages pass a `CardRef` projection (`src/lib/card.ts`) rather than full
  `Article` objects, so body copy is never duplicated into the RSC payload. This cut the homepage
  from 1.04 MB to ~726 KB uncompressed (~75 KB gzipped).
- **Archive filtering.** `ArchiveBrowser` derives state from the URL via `useSyncExternalStore`
  instead of `useSearchParams`. `useSearchParams` would opt the page into dynamic rendering and ship
  only a loading skeleton to readers and crawlers; this way the static HTML contains the complete
  unfiltered archive and filtered views remain shareable.
- **Pagination** uses path segments (`/latest/2`, `/section/india/2`) so every page is crawlable.
- **Deterministic time.** `SITE.editionAt` in `src/lib/site.ts` fixes the edition stamp, so relative
  timestamps do not drift between builds.
- **SEO.** Per-route metadata with title templates, canonical URLs, Open Graph and Twitter cards,
  `NewsArticle` JSON-LD with `citation`/`isBasedOn` source arrays, `sitemap.xml`, `robots.txt` and
  an RSS feed at `/feed.xml`.
- **Accessibility.** Skip link, semantic landmarks, labelled filters with `aria-pressed`, `sr-only`
  hints on external links, `prefers-reduced-motion` handling for the ticker.

### Known gaps

- September 2026 (3 articles) and April 2026 (10) are thinner than other months.
- `/sources` renders a 454-row ledger inside a `<details>` element; paginate it if payload matters.
- Contact and newsletter forms are intentionally inert and say so on the page.

---

© 2026 NOT SCRIPTED Media LLP, Bengaluru. Article text on this site is original. Where a story
summarises reporting published elsewhere it is labelled From Around The Web, attributed by name and
linked to the original source.