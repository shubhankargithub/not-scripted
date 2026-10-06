import Link from "next/link";
import { CATEGORY_MAP, TYPE_META } from "@/lib/articles";
import type { Article } from "@/content/types";
import { formatDateShort, formatTime, timeAgo } from "@/lib/format";

export function SectionHead({
  title,
  href,
  kicker,
  accent = "#14181d",
  actionLabel,
}: {
  title: string;
  href?: string;
  kicker?: string;
  accent?: string;
  actionLabel?: string;
}) {
  return (
    <div
      className="flex items-end justify-between gap-4 border-t-[3px] pb-2 pt-2.5"
      style={{ borderTopColor: accent, boxShadow: `0 3px 0 -2px ${accent}` }}
    >
      <div className="min-w-0">
        {kicker ? <p className="label-ui text-ink-4">{kicker}</p> : null}
        <h2 className="font-display text-[1.35rem] leading-none font-semibold tracking-tight text-ink sm:text-[1.6rem]">
          {href ? (
            <Link href={href} className="transition-colors hover:text-brand">
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
      </div>
      {href ? (
        <Link
          href={href}
          className="label-ui shrink-0 border-b border-ink-4 pb-0.5 text-ink-3 transition-colors hover:border-brand hover:text-brand"
        >
          {actionLabel ?? "More"}
        </Link>
      ) : null}
    </div>
  );
}

export function TypeBadge({ type, className = "" }: { type: Article["type"]; className?: string }) {
  const meta = TYPE_META[type];
  return (
    <span
      className={`label-ui inline-flex items-center gap-1 whitespace-nowrap rounded-[2px] px-[5px] py-[3px] text-[9.5px] ${className}`}
      style={{
        color: meta.accent,
        boxShadow: `inset 0 0 0 1px ${meta.accent}33`,
        backgroundColor: `${meta.accent}0f`,
      }}
      title={meta.name}
    >
      {meta.shortName}
    </span>
  );
}

export function CatLabel({ category, className = "" }: { category: string; className?: string }) {
  const cat = CATEGORY_MAP[category];
  return (
    <span className={`label-ui whitespace-nowrap ${className}`} style={{ color: cat?.accent ?? "#5b656f" }}>
      {cat?.name ?? category}
    </span>
  );
}

export function MetaRow({
  article,
  showTime = false,
  className = "",
}: {
  article: Article;
  showTime?: boolean;
  className?: string;
}) {
  return (
    <p className={`label-meta flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
      <span>{formatDateShort(article.publishedAt)}</span>
      {showTime ? (
        <>
          <Dot />
          <span>{formatTime(article.publishedAt)}</span>
        </>
      ) : null}
    </p>
  );
}

export function Dot() {
  return <span aria-hidden="true" className="inline-block h-[3px] w-[3px] rounded-full bg-current opacity-60" />;
}

export function Byline({ article, className = "" }: { article: Article; className?: string }) {
  return (
    <p className={`label-meta ${className}`}>
      By <span className="text-ink-2">{article.authorId.replace(/^a-/, "").replace(/-/g, " ")}</span>
    </p>
  );
}

export function LiveTag({ className = "" }: { className?: string }) {
  return (
    <span className={`label-ui inline-flex items-center gap-1.5 text-live ${className}`}>
      <span aria-hidden="true" className="animate-live-dot inline-block h-[7px] w-[7px] rounded-full bg-live" />
      Breaking
    </span>
  );
}

export function Stamp({ article, className = "" }: { article: Article; className?: string }) {
  return (
    <p className={`label-meta ${className}`}>
      <time dateTime={article.publishedAt}>{timeAgo(article.publishedAt)}</time>
    </p>
  );
}

export function PageIntro({
  eyebrow,
  title,
  dek,
  meta,
}: {
  eyebrow: string;
  title: string;
  dek?: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <header className="border-b-[3px] border-ink pb-4">
      <p className="label-ui text-brand">{eyebrow}</p>
      <h1 className="headline-tight mt-2 font-display text-[clamp(2rem,5.6vw,3.5rem)] font-bold text-ink">
        {title}
      </h1>
      {dek ? <p className="mt-3 max-w-[62ch] font-ui text-[1.02rem] leading-relaxed text-ink-3">{dek}</p> : null}
      {meta?.length ? (
        <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="label-ui text-ink-4">{m.label}</dt>
              <dd className="mt-0.5 font-ui text-sm font-semibold text-ink">{m.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </header>
  );
}

export function Pagination({
  current,
  total,
  buildHref,
}: {
  current: number;
  total: number;
  buildHref: (page: number) => string;
}) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center gap-1.5 border-t border-rule pt-6">
      {current > 1 ? (
        <Link
          href={buildHref(current - 1)}
          className="label-ui border border-rule px-3 py-2 text-ink-2 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          &larr; Prev
        </Link>
      ) : null}
      {pages.map((p) =>
        p === current ? (
          <span
            key={p}
            aria-current="page"
            className="label-ui min-w-[2.25rem] bg-ink px-3 py-2 text-center text-paper"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            className="label-ui min-w-[2.25rem] border border-rule px-3 py-2 text-center text-ink-2 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            {p}
          </Link>
        ),
      )}
      {current < total ? (
        <Link
          href={buildHref(current + 1)}
          className="label-ui border border-rule px-3 py-2 text-ink-2 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          Next &rarr;
        </Link>
      ) : null}
    </nav>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-dashed border-rule-2 bg-paper-2/60 px-6 py-14 text-center">
      <p className="font-display text-xl font-semibold text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-[46ch] font-ui text-sm text-ink-3">{body}</p>
    </div>
  );
}