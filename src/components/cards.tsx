import Link from "next/link";
import type { CardRef } from "@/lib/card";
import { CATEGORY_MAP } from "@/lib/articles";
import { formatDateShort, formatTime } from "@/lib/format";
import { Media } from "./Media";
import { CatLabel, Dot, TypeBadge } from "./ui";

export const href = (a: { slug: string }) => `/article/${a.slug}`;

function Frame({
  article,
  ratio = "wide",
  className = "",
}: {
  article: CardRef;
  ratio?: "wide" | "box" | "tall";
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-paper-3 ${className}`}>
      <Media slug={article.slug} category={article.category} ratio={ratio} size={ratio === "box" ? "micro" : "half"} />
    </div>
  );
}

export function LeadStory({ article }: { article: CardRef }) {
  return (
    <article className="group border-t-[3px] border-ink pt-3" style={{ boxShadow: "0 3px 0 -2px #14181d" }}>
      <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        <Link href={href(article)} className="block">
          <Frame article={article} ratio="wide" className="aspect-[16/10] w-full border border-rule" />
        </Link>
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2.5">
            <TypeBadge type={article.type} />
            <CatLabel category={article.category} />
            {article.kicker ? <span className="label-ui text-ink-4">{article.kicker}</span> : null}
          </div>
          <h2 className="headline-tight mt-3 font-display text-[clamp(1.7rem,3.5vw,2.9rem)] font-bold leading-[1.02] text-ink">
            <Link href={href(article)} className="transition-colors group-hover:text-brand">
              {article.headline}
            </Link>
          </h2>
          <p className="mt-3 font-ui text-[1.02rem] leading-relaxed text-ink-3">{article.dek}</p>
          <p className="label-meta mt-auto flex flex-wrap items-center gap-2 pt-4">
            <span style={{ color: CATEGORY_MAP[article.category]?.accent }}>{formatDateShort(article.publishedAt)}</span>
            <Dot />
            <span>{formatTime(article.publishedAt)}</span>
            <Dot />
            <span>{article.readMins} min read</span>
            <Dot />
            <span>{article.sourceCount} sources</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export function TopStoryCard({ article, rank }: { article: CardRef; rank?: number }) {
  return (
    <article className="group flex flex-col border-t border-rule pt-3">
      <Link href={href(article)} className="block">
        <Frame article={article} ratio="wide" className="aspect-[16/9] w-full border border-rule" />
      </Link>
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        {typeof rank === "number" ? (
          <span className="font-display text-[1.6rem] leading-none font-bold text-brand-3" aria-hidden="true">
            {String(rank).padStart(2, "0")}
          </span>
        ) : null}
        <TypeBadge type={article.type} />
        <CatLabel category={article.category} />
      </div>
      <h3 className="headline-tight mt-2 font-display text-[1.22rem] font-semibold leading-[1.1] text-ink">
        <Link href={href(article)} className="transition-colors group-hover:text-brand">
          {article.headline}
        </Link>
      </h3>
      <p className="mt-2 font-ui text-[0.9rem] leading-relaxed text-ink-3">{article.dek}</p>
      <p className="label-meta mt-auto flex items-center gap-2 pt-3">
        <span>{formatDateShort(article.publishedAt)}</span>
        <Dot />
        <span>{formatTime(article.publishedAt)}</span>
      </p>
    </article>
  );
}

export function FeedRow({ article, dense = false }: { article: CardRef; dense?: boolean }) {
  return (
    <article className="group border-t border-rule py-3 first:border-t-0 first:pt-0">
      <div className={dense ? "" : "grid gap-4 sm:grid-cols-[1fr_8.5rem] sm:gap-5"}>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={article.type} />
            <CatLabel category={article.category} />
            {article.breaking ? <span className="label-ui text-live">Live</span> : null}
          </div>
          <h3 className="mt-1.5 font-display text-[1.1rem] font-semibold leading-[1.15] text-ink">
            <Link href={href(article)} className="transition-colors group-hover:text-brand">
              {article.headline}
            </Link>
          </h3>
          {!dense ? <p className="mt-1.5 font-ui text-[0.88rem] leading-relaxed text-ink-3">{article.dek}</p> : null}
          <p className="label-meta mt-2 flex flex-wrap items-center gap-2">
            <span>{formatDateShort(article.publishedAt)}</span>
            <Dot />
            <span>{formatTime(article.publishedAt)}</span>
            {!dense ? (
              <>
                <Dot />
                <span>{article.readMins} min</span>
              </>
            ) : null}
          </p>
        </div>
        {!dense ? (
          <Link href={href(article)} className="order-first block sm:order-last" tabIndex={-1} aria-hidden="true">
            <Frame article={article} ratio="box" className="aspect-square w-full border border-rule" />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export function ThumbCard({ article }: { article: CardRef }) {
  return (
    <article className="group grid grid-cols-[1fr_5.5rem] gap-3 border-t border-rule py-3 first:border-t-0 first:pt-0">
      <div className="min-w-0">
        <CatLabel category={article.category} />
        <h3 className="mt-1 font-display text-[1rem] font-semibold leading-[1.18] text-ink">
          <Link href={href(article)} className="transition-colors group-hover:text-brand">
            {article.headline}
          </Link>
        </h3>
        <p className="label-meta mt-1.5">{formatDateShort(article.publishedAt)}</p>
      </div>
      <Link href={href(article)} className="block" tabIndex={-1} aria-hidden="true">
        <Frame article={article} ratio="box" className="aspect-square w-full border border-rule" />
      </Link>
    </article>
  );
}

export function RankedRow({ article, rank }: { article: CardRef; rank: number }) {
  return (
    <article className="group grid grid-cols-[2.6rem_1fr] gap-3 border-t border-rule py-3 first:border-t-0 first:pt-0">
      <span aria-hidden="true" className="font-display text-[1.75rem] leading-[0.9] font-bold text-brand">
        {rank}
      </span>
      <div className="min-w-0">
        <CatLabel category={article.category} />
        <h3 className="mt-1 font-display text-[1rem] font-semibold leading-[1.18] text-ink">
          <Link href={href(article)} className="transition-colors group-hover:text-brand">
            {article.headline}
          </Link>
        </h3>
        <p className="label-meta mt-1.5">
          {formatDateShort(article.publishedAt)} &middot; {article.readMins} min
        </p>
      </div>
    </article>
  );
}

export function WideRow({ article }: { article: CardRef }) {
  return (
    <article className="group grid gap-4 border-t border-rule py-4 sm:grid-cols-[1fr_12rem] sm:gap-6">
      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={article.type} />
          <CatLabel category={article.category} />
          {article.kicker ? <span className="label-ui text-ink-4">{article.kicker}</span> : null}
        </div>
        <h3 className="headline-tight mt-2 font-display text-[clamp(1.25rem,2.3vw,1.7rem)] font-semibold leading-[1.08] text-ink">
          <Link href={href(article)} className="transition-colors group-hover:text-brand">
            {article.headline}
          </Link>
        </h3>
        <p className="mt-2 max-w-[70ch] font-ui text-[0.95rem] leading-relaxed text-ink-3">{article.dek}</p>
        <p className="label-meta mt-auto flex flex-wrap items-center gap-2 pt-3">
          <span>{formatDateShort(article.publishedAt)}</span>
          <Dot />
          <span>{formatTime(article.publishedAt)}</span>
          <Dot />
          <span>{article.readMins} min read</span>
          <Dot />
          <span>{article.sourceCount} sources</span>
        </p>
      </div>
      <Link href={href(article)} className="block" tabIndex={-1} aria-hidden="true">
        <Frame article={article} ratio="wide" className="aspect-[16/10] w-full border border-rule sm:aspect-[4/3]" />
      </Link>
    </article>
  );
}

export function OpinionCard({ article }: { article: CardRef }) {
  return (
    <article className="group relative flex h-full flex-col border border-rule bg-paper-2/70 p-5">
      <span aria-hidden="true" className="absolute right-4 top-2 font-display text-[3.4rem] leading-none text-opinion/15">
        &rdquo;
      </span>
      <p className="label-ui text-opinion">Analysis</p>
      <h3 className="headline-tight mt-2.5 font-display text-[1.28rem] font-semibold leading-[1.08] text-ink">
        <Link href={href(article)} className="transition-colors group-hover:text-opinion">
          {article.headline}
        </Link>
      </h3>
      <p className="mt-2.5 font-ui text-[0.9rem] leading-relaxed text-ink-3">{article.dek}</p>
      <p className="label-meta mt-auto flex items-center gap-2 pt-4">
        <span className="text-ink-2">{article.authorName}</span>
        <Dot />
        <span>{formatDateShort(article.publishedAt)}</span>
      </p>
    </article>
  );
}

export function TeaserCard({ article }: { article: CardRef }) {
  return (
    <article className="group">
      <Link href={href(article)} className="block">
        <Frame article={article} ratio="box" className="aspect-[4/3] w-full border border-rule" />
      </Link>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <TypeBadge type={article.type} />
        <CatLabel category={article.category} />
      </div>
      <h3 className="mt-1.5 font-display text-[1.08rem] font-semibold leading-[1.15] text-ink">
        <Link href={href(article)} className="transition-colors group-hover:text-brand">
          {article.headline}
        </Link>
      </h3>
      <p className="label-meta mt-2">{formatDateShort(article.publishedAt)}</p>
    </article>
  );
}