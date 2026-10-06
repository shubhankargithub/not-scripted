import type { Metadata } from "next";
import Link from "next/link";
import type { CardRef } from "@/lib/card";
import { toCard, toCards } from "@/lib/card";
import {
  getAllArticles,
  getBreaking,
  getByCategory,
  getByType,
  getEditorsPicks,
  getLead,
  getMostRead,
  getTopStories,
  getTrending,
  countArticles,
  countSources,
} from "@/lib/articles";
import { SITE } from "@/lib/site";
import { editionStamp, formatDateShort, formatTime } from "@/lib/format";
import { LeadStory, OpinionCard, RankedRow, ThumbCard, TopStoryCard, WideRow, href } from "@/components/cards";
import { CategoryRail, ArchiveTeaser, SectionIndex, WideList } from "@/components/rails";
import { CatLabel, Dot, LiveTag, SectionHead, TypeBadge } from "@/components/ui";
import { Media } from "@/components/Media";

export const metadata: Metadata = {
  title: `${SITE.name} â€” ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

function BreakingPanel() {
  const items = toCards(getBreaking(5));
  const [top, ...rest] = items;
  if (!top) return null;

  return (
    <section aria-labelledby="breaking-now" className="border border-brand bg-brand-wash">
      <div className="flex items-center justify-between gap-3 border-b border-brand/25 px-4 py-2.5">
        <h2 id="breaking-now" className="label-ui flex items-center gap-2 text-brand">
          <LiveTag />
          <span className="text-ink">Breaking &amp; developing</span>
        </h2>
        <Link href="/breaking" className="label-ui text-brand hover:underline">
          All breaking
        </Link>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <article className="group p-4 lg:border-r lg:border-brand/20">
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={top.type} />
            <CatLabel category={top.category} />
            <span className="label-meta">{formatTime(top.publishedAt)}</span>
          </div>
          <h3 className="headline-tight mt-2 font-display text-[clamp(1.35rem,2.7vw,2.05rem)] font-bold leading-[1.04] text-ink">
            <Link href={href(top)} className="transition-colors group-hover:text-brand">
              {top.headline}
            </Link>
          </h3>
          <p className="mt-2.5 font-ui text-[0.95rem] leading-relaxed text-ink-2">{top.dek}</p>
          <p className="label-meta mt-3 flex flex-wrap items-center gap-2">
            <span>{formatDateShort(top.publishedAt)}</span>
            <Dot />
            <span>{top.sourceCount} sources recorded</span>
          </p>
        </article>

        <ul className="border-t border-brand/20 px-4 py-2 lg:border-t-0">
          {rest.map((a) => (
            <li key={a.id} className="border-b border-brand/15 last:border-b-0">
              <Link href={href(a)} className="group flex gap-3 py-2.5">
                <span className="label-meta shrink-0 pt-[3px] tabular-nums">
                  {formatDateShort(a.publishedAt)}
                  <span className="mt-0.5 block text-ink-4">{formatTime(a.publishedAt)}</span>
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[1rem] font-semibold leading-[1.18] text-ink group-hover:text-brand">
                    {a.headline}
                  </span>
                  <span className="label-meta mt-1 block">{a.sourceCount} sources</span>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/breaking" className="label-ui block py-2.5 text-brand hover:underline">
              Follow the breaking desk &rarr;
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

function LeadCluster() {
  const leadRaw = getLead();
  const lead = leadRaw ? toCard(leadRaw) : undefined;
  const pinned = new Set<string>(lead ? [lead.id] : []);
  const side = toCards(getTopStories(5)).filter((a) => !pinned.has(a.id)).slice(0, 4);
  const mostRead = toCards(getMostRead(5));
  const trending = toCards(getTrending(5));
  if (!lead) return null;

  return (
    <section aria-label="Top stories">
      <SectionHead title="Top Stories" href="/top-stories" kicker="The desk's lead package" accent="#c21f17" />
      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
        <div>
          <LeadStory article={lead} />
          {side.length ? (
            <div className="mt-6 grid gap-6 border-t border-rule pt-5 sm:grid-cols-2">
              {side.map((a) => (
                <TopStoryCard key={a.id} article={a} />
              ))}
            </div>
          ) : null}
        </div>

        <aside className="lg:border-l lg:border-rule lg:pl-6">
          <h3 className="label-ui border-b border-ink pb-2 text-ink-4">Most read</h3>
          <div>
            {mostRead.map((a, i) => (
              <RankedRow key={a.id} article={a} rank={i + 1} />
            ))}
          </div>
          <Link
            href="/most-read"
            className="label-ui mt-3 inline-block border-b border-ink-4 pb-0.5 text-ink-3 hover:border-brand hover:text-brand"
          >
            Most read this week
          </Link>

          <h3 className="label-ui mt-8 border-b border-ink pb-2 text-ink-4">Trending now</h3>
          <div>
            {trending.map((a, i) => (
              <RankedRow key={a.id} article={a} rank={i + 1} />
            ))}
          </div>
          <Link
            href="/latest"
            className="label-ui mt-3 inline-block border-b border-ink-4 pb-0.5 text-ink-3 hover:border-brand hover:text-brand"
          >
            Live latest feed
          </Link>
        </aside>
      </div>
    </section>
  );
}

function PicksBand({ picks }: { picks: CardRef[] }) {
  if (!picks.length) return null;
  return (
    <section aria-labelledby="picks">
      <div id="picks">
        <SectionHead title="Editor's Picks" href="/editors-picks" kicker="Chosen by the editors" accent="#7a1f3d" />
      </div>
      <div className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
        {picks.map((a) => (
          <article key={a.id} className="group">
            <Link href={href(a)} className="block">
              <div className="aspect-[4/3] w-full overflow-hidden border border-rule">
                <Media slug={a.slug} category={a.category} ratio="box" size="card" />
              </div>
            </Link>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <TypeBadge type={a.type} />
              <CatLabel category={a.category} />
            </div>
            <h3 className="mt-1.5 font-display text-[1.06rem] font-semibold leading-[1.16] text-ink">
              <Link href={href(a)} className="transition-colors group-hover:text-brand">
                {a.headline}
              </Link>
            </h3>
            <p className="label-meta mt-2">{formatDateShort(a.publishedAt)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Rail({ slug, take = 4 }: { slug: string; take?: number }) {
  const cards = toCards(getByCategory(slug, take));
  const count = getByCategory(slug).length;
  return <CategoryRail slug={slug} articles={cards} count={count} />;
}

export default function HomePage() {
  const all = getAllArticles();

  const pinned = new Set(
    all
      .filter(
        (a) =>
          a.flags?.lead ||
          a.flags?.topStory ||
          a.flags?.editorsPick ||
          a.flags?.mostRead ||
          a.flags?.trending ||
          a.flags?.breaking,
      )
      .map((a) => a.id),
  );

  const featuredLatest = [
    ...toCards(all.filter((a) => pinned.has(a.id))),
    ...toCards(all.filter((a) => !pinned.has(a.id))),
  ].slice(0, 12);

  const picks = toCards(getEditorsPicks(4));
  const justIn = toCards(all.slice(0, 6));
  const trendingRail = toCards(getTrending(4));
  const picksRail = toCards(getEditorsPicks(4));
  const opinion = toCards(getByType("analysis", 3));
  const explainers = toCards(getByType("explainer", 4));
  const fromWeb = toCards(getByType("from-the-web", 4));
  const original = toCards(getByType("original", 3));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <section className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-rule pb-3">
        <p className="label-meta">
          Edition of <span className="text-ink-2">{editionStamp()}</span>
        </p>
        <p className="label-meta">
          {countArticles()} stories on file &middot; {countSources()} source references
        </p>
        <p className="label-meta ml-auto">
          Every page type is labelled:{" "}
          <span className="text-ink-2">original</span> / <span className="text-ink-2">news update</span> /{" "}
          <span className="text-ink-2">explainer</span> / <span className="text-ink-2">analysis</span> /{" "}
          <span className="text-ink-2">from around the web</span>
        </p>
      </section>

      <div className="space-y-12 sm:space-y-14">
        <BreakingPanel />

        <LeadCluster />

        <section aria-labelledby="latest-news">
          <div id="latest-news" className="scroll-mt-20">
            <SectionHead title="Latest News" href="/latest" kicker="Reverse chronological" />
          </div>
          <div className="mt-3 grid gap-8 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)]">
            <div>
              {featuredLatest.map((a, i) => (
                <div key={a.id} className={i === 2 ? "mt-6 border-t-[3px] border-ink pt-4" : ""}>
                  <WideRow article={a} />
                </div>
              ))}
              <Link
                href="/latest"
                className="label-ui mt-6 inline-block border border-ink px-4 py-2.5 text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Load the full latest feed
              </Link>
            </div>

            <aside className="space-y-10 lg:border-l lg:border-rule lg:pl-6">
              <section aria-labelledby="latest-rail">
                <h2 id="latest-rail" className="label-ui border-b border-ink pb-2 text-ink-4">
                  Just in
                </h2>
                <div>{justIn.map((a) => <ThumbCard key={a.id} article={a} />)}</div>
              </section>

              <section aria-labelledby="popular-rail">
                <h2 id="popular-rail" className="label-ui border-b border-ink pb-2 text-ink-4">
                  Readers are on
                </h2>
                <div>
                  {trendingRail.map((a, i) => (
                    <RankedRow key={a.id} article={a} rank={i + 1} />
                  ))}
                </div>
              </section>

              <section aria-labelledby="picks-rail">
                <h2 id="picks-rail" className="label-ui border-b border-ink pb-2 text-ink-4">
                  Editors&rsquo; picks
                </h2>
                <div>{picksRail.map((a) => <ThumbCard key={a.id} article={a} />)}</div>
              </section>
            </aside>
          </div>
        </section>

        <PicksBand picks={picks} />

        {opinion.length ? (
          <section aria-labelledby="opinion-band">
            <div id="opinion-band" className="scroll-mt-20">
              <SectionHead
                title="Opinion & Analysis"
                href="/opinion"
                kicker="Clearly labelled argument"
                accent="#7a1f3d"
              />
            </div>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              {opinion.map((a) => (
                <OpinionCard key={a.id} article={a} />
              ))}
            </div>
          </section>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-2">
          <WideList
            title="Explainers"
            eyebrow="Background you need"
            href="/explainers"
            accent="#0b5a66"
            articles={explainers}
          />
          <WideList
            title="From Around The Web"
            eyebrow="Independently summarised"
            href="/from-around-the-web"
            accent="#6b4423"
            articles={fromWeb}
            actionLabel="All"
          />
        </div>

        {original.length ? (
          <WideList
            title="Original reporting"
            eyebrow="Built by this newsroom"
            href="/original"
            accent="#c21f17"
            articles={original}
          />
        ) : null}

        <div className="grid gap-10 lg:grid-cols-2">
          <Rail slug="india" />
          <Rail slug="business" />
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <Rail slug="karnataka" />
          <Rail slug="technology" />
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <Rail slug="world" />
          <Rail slug="geopolitics" />
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <Rail slug="sports" />
          <Rail slug="environment" />
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <Rail slug="science" />
          <Rail slug="culture" />
        </div>
        <div className="grid gap-10 lg:grid-cols-2">
          <Rail slug="politics" />
          <Rail slug="lifestyle" />
        </div>

        <SectionIndex />
        <ArchiveTeaser />
      </div>
    </div>
  );
}