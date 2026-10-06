import Link from "next/link";
import type { CardRef } from "@/lib/card";
import { CATEGORY_MAP, getMostRead, getTrending } from "@/lib/articles";
import { toCards } from "@/lib/card";
import { Media } from "./Media";
import { CatLabel, Dot, EmptyState, Pagination, PageIntro, SectionHead, TypeBadge } from "./ui";
import { RankedRow, WideRow } from "./cards";
import { CategoryCloud } from "./Footer";
import { SeoJsonLd } from "./SeoJsonLd";
import { breadcrumbNode, itemListNode, webPageNode } from "@/lib/seo";

interface Props {
  eyebrow: string;
  title: string;
  dek: string;
  articles: CardRef[];
  basePath: string;
  page: number;
  totalPages: number;
  meta?: { label: string; value: string }[];
  /** Desk accent colour, used on the hero rule. */
  accent: string;
  /** Sidebar heading, e.g. "Most read". */
  sidebarTitle?: string;
  /** Show a wide top card as well as the list. */
  hero?: boolean;
}

export function ListingView({
  eyebrow,
  title,
  dek,
  articles,
  accent,
  basePath,
  page,
  totalPages,
  meta,
  sidebarTitle = "Most read",
  hero = true,
}: Props) {
  const [first, ...rest] = articles;
  const list = hero ? rest : articles;

  const pageHref = (p: number) => (p <= 1 ? basePath : `${basePath}/${p}`);

  const crumbs: { name: string; path: string }[] = [{ name: "Home", path: "/" }];
  if (basePath.startsWith("/section/")) {
    const cat = CATEGORY_MAP[articles[0]?.category ?? ""];
    crumbs.push({ name: cat?.name ?? title, path: basePath });
  } else {
    crumbs.push({ name: title, path: basePath });
  }

  const jsonLd = [
    webPageNode({ path: basePath, name: title, description: dek, type: "CollectionPage" }),
    breadcrumbNode(crumbs),
    itemListNode({
      path: basePath,
      articles: articles.map((a) => ({ slug: a.slug, headline: a.headline })),
    }),
  ];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <SeoJsonLd nodes={jsonLd} />
      <PageIntro
        eyebrow={eyebrow}
        title={title}
        dek={dek}
        meta={[
          ...(meta ?? []),
          { label: "Stories on this page", value: `${articles.length}` },
          ...(totalPages > 1 ? [{ label: "Pages", value: `${page} of ${totalPages}` }] : []),
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          {hero && first ? (
            <article
              className="group pb-6"
              style={{ borderBottom: `3px solid ${accent}` }}
            >
              <Link href={`/article/${first.slug}`} className="block">
                <div className="aspect-[16/9] w-full overflow-hidden border border-rule">
                  <Media slug={first.slug} category={first.category} ratio="wide" size="hero" eager />
                </div>
              </Link>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <TypeBadge type={first.type} />
                <CatLabel category={first.category} />
                {first.kicker ? <span className="label-ui text-ink-4">{first.kicker}</span> : null}
              </div>
              <h2 className="headline-tight mt-2 font-display text-[clamp(1.5rem,3vw,2.35rem)] font-bold leading-[1.04] text-ink">
                <Link href={`/article/${first.slug}`} className="transition-colors group-hover:text-brand">
                  {first.headline}
                </Link>
              </h2>
              <p className="mt-3 max-w-[70ch] font-ui text-[1rem] leading-relaxed text-ink-3">{first.dek}</p>
            </article>
          ) : null}

          <div className="mt-6">
            {list.length ? (
              list.map((a) => <WideRow key={a.id} article={a} />)
            ) : (
              <EmptyState
                title="Nothing on this page"
                body="Try the archive search, or move to another month or desk."
              />
            )}
          </div>

          <Pagination current={page} total={totalPages} buildHref={pageHref} />
        </div>

        <aside className="space-y-9 lg:border-l lg:border-rule lg:pl-6">
          <section aria-labelledby="ls-sidebar">
            <h2 id="ls-sidebar" className="label-ui border-b border-ink pb-2 text-ink-4">
              {sidebarTitle}
            </h2>
            <div>
              {toCards(getMostRead(5)).map((a, i) => (
                <RankedRow key={a.id} article={a} rank={i + 1} />
              ))}
            </div>
          </section>

          <section aria-labelledby="ls-trending">
            <h2 id="ls-trending" className="label-ui border-b border-ink pb-2 text-ink-4">
              Trending
            </h2>
            <div>
              {toCards(getTrending(4)).map((a, i) => (
                <RankedRow key={a.id} article={a} rank={i + 1} />
              ))}
            </div>
          </section>

          <section aria-labelledby="ls-brief">
            <h2 id="ls-brief" className="label-ui border-b border-ink pb-2 text-ink-4">
              The daily briefing
            </h2>
            <p className="mt-3 font-ui text-[0.88rem] leading-relaxed text-ink-3">
              One email each morning with the lead story, what the sources actually said, and the links we
              established the facts from.
            </p>
            <form action="/newsletter" className="mt-3 flex">
              <label htmlFor="ls-email" className="sr-only">
                Email address
              </label>
              <input
                id="ls-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="min-w-0 flex-1 border border-rule-2 bg-white px-3 py-2 font-ui text-xs text-ink outline-none focus:border-ink"
              />
              <button
                type="submit"
                className="label-ui shrink-0 bg-ink px-3 py-2 text-paper transition-colors hover:bg-brand"
              >
                Join
              </button>
            </form>
          </section>

          <section aria-labelledby="ls-sections">
            <h2 id="ls-sections" className="label-ui border-b border-ink pb-2 text-ink-4">
              Jump to a desk
            </h2>
            <div className="mt-3">
              <CategoryCloud />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export function DeskBand({
  articles,
  title,
  href,
  accent,
  eyebrow,
}: {
  articles: CardRef[];
  title: string;
  href: string;
  accent: string;
  eyebrow?: string;
}) {
  if (!articles.length) return null;
  return (
    <section>
      <SectionHead title={title} href={href} kicker={eyebrow} accent={accent} />
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <article key={a.id} className="group">
            <Link href={`/article/${a.slug}`} className="block">
              <div className="aspect-[16/10] w-full overflow-hidden border border-rule">
                <Media slug={a.slug} category={a.category} ratio="wide" size="card" />
              </div>
            </Link>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <TypeBadge type={a.type} />
              <CatLabel category={a.category} />
            </div>
            <h3 className="mt-1.5 font-display text-[1.12rem] font-semibold leading-[1.15] text-ink">
              <Link href={`/article/${a.slug}`} className="transition-colors group-hover:text-brand">
                {a.headline}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-2 font-ui text-[0.86rem] leading-relaxed text-ink-3">{a.dek}</p>
            <p className="label-meta mt-2.5 flex items-center gap-2">
              <span>{CATEGORY_MAP[a.category]?.name}</span>
              <Dot />
              <span>{a.sourceCount} sources</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}