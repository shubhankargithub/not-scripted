import Link from "next/link";
import type { Article, Block } from "@/content/types";
import { CATEGORY_MAP, SOURCE_TYPE_LABELS, TYPE_META, getAuthorFor, readingTime, getRelated } from "@/lib/articles";
import { formatDate, formatDateTime, formatDateShort, formatTime, timeAgo } from "@/lib/format";
import {
  articleAuthorNode,
  breadcrumbNode,
  newsArticleNode,
  webPageNode,
} from "@/lib/seo";
import { Media, PhotoFigure } from "./Media";
import { InstagramShare } from "./InstagramShare";
import { SeoJsonLd } from "./SeoJsonLd";
import { CatLabel, Dot, TypeBadge } from "./ui";
import { href } from "./cards";

function BodyBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-editorial">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "para":
            return <p key={i}>{b.text}</p>;
          case "subhead":
            return (
              <h2 key={i} className="mt-8 mb-3 font-display text-[1.35rem] font-semibold leading-tight text-ink">
                {b.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote key={i} className="my-7 border-l-[3px] border-brand pl-5">
                <p className="font-display text-[1.28rem] font-medium leading-[1.3] text-ink">{b.text}</p>
                {b.attribution ? (
                  <footer className="label-meta mt-2.5">&mdash; {b.attribution}</footer>
                ) : null}
              </blockquote>
            );
          case "bullets":
            return (
              <ul key={i} className="my-6 space-y-2.5 border-y border-rule py-4">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[1.06rem] leading-relaxed text-ink-2">
                    <span aria-hidden="true" className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full bg-brand" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "numberline":
            return (
              <ol key={i} className="my-6 space-y-3 border-y border-rule py-4">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[1.06rem] leading-relaxed text-ink-2">
                    <span aria-hidden="true" className="font-display text-[1.1rem] font-bold text-brand">
                      {j + 1}.
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <aside key={i} className="my-7 border border-rule-2 bg-paper-2 p-5">
                {b.title ? <p className="label-ui mb-2 text-brand">{b.title}</p> : null}
                <p className="font-display text-[1.14rem] font-medium leading-[1.35] text-ink">{b.text}</p>
              </aside>
            );
          case "dateline-note":
            return (
              <aside
                key={i}
                className="mt-9 border-l-[3px] border-rule-2 bg-paper-2/70 p-4 font-ui text-[0.82rem] leading-relaxed text-ink-3"
              >
                <span className="label-ui block text-ink-4">Reporting note</span>
                <span className="mt-1 block">{b.text}</span>
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export function ArticlePageBody({ article }: { article: Article }) {
  const author = getAuthorFor(article);
  const cat = CATEGORY_MAP[article.category];
  const typeMeta = TYPE_META[article.type];
  const related = getRelated(article, 4);

  const sectionName = cat?.name ?? article.category;
  const articlePath = `/article/${article.slug}`;

  const jsonLd = [
    newsArticleNode(article, author, sectionName),
    articleAuthorNode(article, author),
    breadcrumbNode([
      { name: "Home", path: "/" },
      { name: sectionName, path: `/section/${article.category}` },
      { name: article.headline, path: articlePath },
    ]),
    webPageNode({
      path: articlePath,
      name: article.headline,
      description: article.dek,
    }),
  ];

  return (
    <article className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <SeoJsonLd nodes={jsonLd} />

      <InstagramShare
        slug={article.slug}
        headline={article.headline}
        dek={article.dek}
        category={article.category}
        publishedAt={formatDateShort(article.publishedAt)}
      />

      <nav aria-label="Breadcrumb" className="label-meta flex flex-wrap items-center gap-2">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link href={`/section/${article.category}`} className="hover:text-brand">
          {cat?.name}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-ink-2" style={{ color: typeMeta.accent }}>
          {typeMeta.shortName}
        </span>
      </nav>

      <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,2.15fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <header>
            <div className="flex flex-wrap items-center gap-2.5">
              <TypeBadge type={article.type} />
              <CatLabel category={article.category} />
              {article.flags?.breaking ? (
                <span className="label-ui text-live">Live</span>
              ) : null}
              {article.kicker ? <span className="label-ui text-ink-4">{article.kicker}</span> : null}
            </div>

            <h1 className="headline-tight mt-3 font-display text-[clamp(2rem,4.6vw,3.55rem)] font-bold leading-[1.01] text-ink">
              {article.headline}
            </h1>

            <p className="mt-4 max-w-[68ch] font-ui text-[1.1rem] leading-relaxed text-ink-2">{article.dek}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-rule py-3">
              <p className="font-ui text-sm text-ink-2">
                By <span className="font-semibold text-ink">{author.name}</span>
                <span className="text-ink-4"> &middot; {author.role}, {author.desk}</span>
              </p>
              <p className="label-meta ml-auto flex flex-wrap items-center gap-2">
                <time dateTime={article.publishedAt}>Published {formatDateTime(article.publishedAt)}</time>
                {article.updatedAt ? (
                  <>
                    <Dot />
                    <span>
                      Updated{" "}
                      <time dateTime={article.updatedAt}>{formatTime(article.updatedAt)}</time>
                    </span>
                  </>
                ) : null}
                <Dot />
                <span>{readingTime(article)} min read</span>
              </p>
            </div>
          </header>

          <PhotoFigure slug={article.slug} category={article.category} />

          {article.art ? (
            <p className="label-meta mt-2 leading-relaxed">
              {article.art.caption}{" "}
              <span className="text-ink-4">&mdash; {article.art.credit ?? "Illustration: NOT SCRIPTED"}</span>
            </p>
          ) : null}

          <aside
            className="mt-7 border border-rule-2 p-4 sm:p-5"
            style={{ backgroundColor: `${typeMeta.accent}08`, borderLeftWidth: 3, borderLeftColor: typeMeta.accent }}
          >
            <p className="label-ui" style={{ color: typeMeta.accent }}>
              {typeMeta.name}
            </p>
            <p className="mt-1.5 font-ui text-[0.86rem] leading-relaxed text-ink-2">{typeMeta.notice}</p>
          </aside>

          {article.keyPoints?.length ? (
            <section aria-labelledby="key-points" className="mt-7 border-y-[3px] border-ink py-4">
              <h2 id="key-points" className="label-ui text-ink-4">
                The short version
              </h2>
              <ul className="mt-3 space-y-2.5">
                {article.keyPoints.map((k, i) => (
                  <li key={i} className="flex gap-3 font-ui text-[1rem] leading-relaxed text-ink-2">
                    <span aria-hidden="true" className="mt-[0.5em] h-[5px] w-[5px] shrink-0 rounded-full bg-brand" />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-7">
            <BodyBlocks blocks={article.body} />
          </div>

          <section aria-labelledby="sources" className="mt-10 border-t-[3px] border-ink pt-4">
            <h2 id="sources" className="label-ui text-ink-4">
              Sources &mdash; {article.sources.length} reference{article.sources.length === 1 ? "" : "s"}
            </h2>
            <p className="mt-2 max-w-[70ch] font-ui text-[0.85rem] leading-relaxed text-ink-3">
              These are the published sources this article was established against. NOT SCRIPTED wrote the
              text above; the sources below are credited to their own publishers.
            </p>
            <ol className="mt-4 space-y-2.5">
              {article.sources.map((s, i) => (
                <li
                  key={`${s.url}-${i}`}
                  className="flex flex-col gap-1 border-b border-rule-3 pb-2.5 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <span aria-hidden="true" className="label-ui shrink-0 text-rule-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-ui text-[0.95rem] font-semibold text-ink underline decoration-rule-2 underline-offset-4 transition-colors hover:text-brand"
                    >
                      {s.name}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    {s.author ? <span className="mt-0.5 block font-ui text-[0.8rem] text-ink-3">By {s.author}</span> : null}
                    <span className="label-meta mt-0.5 block">
                      {SOURCE_TYPE_LABELS[s.type]}
                      {s.date ? (
                        <>
                          {" "}
                          &middot; {formatDateShort(s.date)}
                        </>
                      ) : null}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            {article.sourcingNote ? (
              <p className="mt-4 font-ui text-[0.82rem] leading-relaxed text-ink-3">{article.sourcingNote}</p>
            ) : null}
          </section>

          <section aria-labelledby="about-author" className="mt-9 border border-rule bg-paper-2/60 p-5">
            <p className="label-ui text-ink-4">About the byline</p>
            <h2 id="about-author" className="mt-1.5 font-display text-[1.2rem] font-semibold text-ink">
              {author.name}
            </h2>
            <p className="label-meta mt-1">
              {author.role} &middot; {author.desk} &middot; {author.location}
            </p>
            <p className="mt-2.5 max-w-[64ch] font-ui text-[0.9rem] leading-relaxed text-ink-2">{author.bio}</p>
            <p className="mt-3 font-ui text-[0.8rem] leading-relaxed text-ink-3">
              <Link href="/newsroom" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">
                Read about the NOT SCRIPTED newsroom and how our bylines work
              </Link>
              .
            </p>
          </section>
        </div>

        <aside className="space-y-8 lg:border-l lg:border-rule lg:pl-6">
          <section aria-labelledby="story-facts">
            <h2 id="story-facts" className="label-ui border-b border-ink pb-2 text-ink-4">
              Story record
            </h2>
            <dl className="mt-3 space-y-2.5 font-ui text-[0.86rem]">
              {[
                { k: "Type", v: typeMeta.name },
                { k: "Desk", v: cat?.name ?? article.category },
                { k: "Published", v: formatDate(article.publishedAt) },
                { k: "Time", v: formatTime(article.publishedAt) },
                { k: "Age", v: timeAgo(article.publishedAt) },
                { k: "Read time", v: `${readingTime(article)} minutes` },
                { k: "Sources", v: `${article.sources.length} recorded` },
              ].map((row) => (
                <div key={row.k} className="flex justify-between gap-4 border-b border-rule-3 pb-2">
                  <dt className="label-ui text-ink-4">{row.k}</dt>
                  <dd className="text-right text-ink-2">{row.v}</dd>
                </div>
              ))}
            </dl>
            {article.tags.length ? (
              <div className="mt-4">
                <p className="label-ui text-ink-4">Filed under</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {article.tags.map((t) => (
                    <li key={t}>
                      <Link
                        href={`/archive?tag=${encodeURIComponent(t)}`}
                        className="label-ui inline-block border border-rule-2 px-1.5 py-1 text-ink-3 transition-colors hover:border-ink hover:text-ink"
                      >
                        {t}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>

          {article.sources.length ? (
            <section aria-labelledby="where-from">
              <h2 id="where-from" className="label-ui border-b border-ink pb-2 text-ink-4">
                Where this came from
              </h2>
              <ul className="mt-3 space-y-2">
                {Array.from(new Set(article.sources.map((s) => s.name))).map((n) => (
                  <li key={n}>
                    <Link
                      href={`/archive?source=${encodeURIComponent(n)}`}
                      className="font-ui text-[0.88rem] text-ink-2 underline decoration-rule-2 underline-offset-4 transition-colors hover:text-brand"
                    >
                      {n}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-labelledby="more-type">
            <h2 id="more-type" className="label-ui border-b border-ink pb-2 text-ink-4">
              Other desks
            </h2>
            <div className="mt-1">
              {Object.values(TYPE_META)
                .filter((t) => t.slug !== article.type)
                .map((t) => (
                  <Link
                    key={t.slug}
                    href={t.path}
                    className="group flex items-center justify-between gap-3 border-b border-rule-3 py-2.5 last:border-b-0"
                  >
                    <span>
                      <span className="label-ui block" style={{ color: t.accent }}>
                        {t.shortName}
                      </span>
                      <span className="mt-0.5 block font-ui text-[0.78rem] leading-snug text-ink-3">
                        {t.description}
                      </span>
                    </span>
                    <span aria-hidden="true" className="shrink-0 text-brand">
                      &rarr;
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        </aside>
      </div>

      {related.length ? (
        <section aria-labelledby="related" className="mt-14 border-t-[3px] border-ink pt-4">
          <h2 id="related" className="font-display text-[1.5rem] font-semibold leading-none text-ink">
            Related coverage
          </h2>
          <p className="label-meta mt-1.5">
            Matched on desk{article.tags.length ? `, ${article.tags.slice(0, 3).join(", ")}` : ""} and publication window
          </p>
          <div className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((a) => (
              <article key={a.id} className="group">
                <Link href={href(a)} className="block">
                  <div className="aspect-[4/3] w-full overflow-hidden border border-rule">
                    <Media slug={a.slug} category={a.category} ratio="box" size="card" />
                  </div>
                </Link>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <TypeBadge type={a.type} />
                  <CatLabel category={a.category} />
                </div>
                <h3 className="mt-1.5 font-display text-[1.02rem] font-semibold leading-[1.16] text-ink">
                  <Link href={href(a)} className="transition-colors group-hover:text-brand">
                    {a.headline}
                  </Link>
                </h3>
                <p className="label-meta mt-2">{formatDateShort(a.publishedAt)}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}