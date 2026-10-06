import Link from "next/link";
import type { CardRef } from "@/lib/card";
import { CATEGORY_MAP, countByCategory } from "@/lib/articles";
import { monthLabel } from "@/lib/format";
import { SectionHead } from "./ui";
import { FeedRow, ThumbCard, WideRow, href } from "./cards";
import { Media } from "./Media";

export function CategoryRail({
  slug,
  articles,
  count,
}: {
  slug: string;
  articles: CardRef[];
  count: number;
}) {
  const cat = CATEGORY_MAP[slug];
  if (!cat || !articles.length) return null;
  const [lead, ...rest] = articles;

  return (
    <section aria-labelledby={`rail-${slug}`}>
      <div id={`rail-${slug}`} className="scroll-mt-20">
        <SectionHead
          title={cat.name}
          href={`/section/${slug}`}
          accent={cat.accent}
          actionLabel={`All ${count}`}
        />
      </div>
      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <article className="group">
          <Link href={href(lead)} className="block">
            <div className="aspect-[16/10] w-full overflow-hidden border border-rule">
              <Media slug={lead.slug} category={lead.category} ratio="wide" size="half" />
            </div>
          </Link>
          <h3 className="headline-tight mt-3 font-display text-[clamp(1.15rem,2vw,1.55rem)] font-semibold leading-[1.08] text-ink">
            <Link href={href(lead)} className="transition-colors group-hover:text-brand">
              {lead.headline}
            </Link>
          </h3>
          <p className="mt-2 font-ui text-[0.9rem] leading-relaxed text-ink-3">{lead.dek}</p>
        </article>
        <div>{rest.slice(0, 3).map((a) => <ThumbCard key={a.id} article={a} />)}</div>
      </div>
    </section>
  );
}

export function DeskList({
  title,
  href: more,
  articles,
  eyebrow,
  accent,
}: {
  title: string;
  href: string;
  articles: CardRef[];
  eyebrow?: string;
  accent?: string;
}) {
  if (!articles.length) return null;
  return (
    <section>
      <SectionHead title={title} href={more} kicker={eyebrow} accent={accent} />
      <div className="mt-1">
        {articles.map((a) => (
          <FeedRow key={a.id} article={a} dense />
        ))}
      </div>
    </section>
  );
}

export function WideList({
  title,
  href: more,
  articles,
  eyebrow,
  accent,
  actionLabel,
}: {
  title: string;
  href: string;
  articles: CardRef[];
  eyebrow?: string;
  accent?: string;
  actionLabel?: string;
}) {
  if (!articles.length) return null;
  return (
    <section>
      <SectionHead title={title} href={more} kicker={eyebrow} accent={accent} actionLabel={actionLabel} />
      <div className="mt-2">
        {articles.map((a) => (
          <WideRow key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}

export function SectionIndex() {
  const counts = countByCategory();
  return (
    <section>
      <SectionHead title="All sections" href="/archive" accent="#14181d" />
      <ul className="mt-4 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-4">
        {Object.entries(counts).map(([slug, count]) => {
          const cat = CATEGORY_MAP[slug];
          if (!cat) return null;
          return (
            <li key={slug} className="bg-paper">
              <Link
                href={`/section/${slug}`}
                className="group flex h-full items-start justify-between gap-3 p-3 transition-colors hover:bg-paper-2"
              >
                <span className="min-w-0">
                  <span className="label-ui block transition-colors" style={{ color: cat.accent }}>
                    {cat.name}
                  </span>
                  <span className="mt-1 block font-ui text-[0.78rem] leading-snug text-ink-3">{cat.blurb}</span>
                </span>
                <span className="font-display text-lg font-bold text-rule-2">{count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function ArchiveTeaser() {
  return (
    <section>
      <SectionHead title="The archive" href="/archive" kicker="Everything we have published" />
      <p className="mt-3 max-w-[70ch] font-ui text-[0.95rem] leading-relaxed text-ink-3">
        Every story on NOT SCRIPTED is dated, filed and reversible to its sources. The archive is the spine of
        this publication: filter it by month, desk, article type or the outlet a fact was established against.
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-5">
        {[
          "2026-10",
          "2026-09",
          "2026-08",
          "2026-07",
          "2026-06",
          "2026-05",
          "2026-04",
          "2026-03",
          "2026-02",
          "2026-01",
        ].map((k) => (
          <li key={k} className="bg-paper">
            <Link
              href={`/archive?month=${k}`}
              className="flex items-center justify-between gap-2 px-3 py-3 transition-colors hover:bg-paper-2"
            >
              <span className="label-ui text-ink-2">{monthLabel(k)}</span>
              <span aria-hidden="true" className="text-brand">
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}