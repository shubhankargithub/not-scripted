import type { Metadata } from "next";
import Link from "next/link";
import {
  countByType,
  countSources,
  earliestPublishedAt,
  getAllArticles,
  getArchiveMonths,
  getArchiveYears,
  getByMonth,
  getSourceFacets,
  getSourceRegister,
} from "@/lib/articles";
import { buildArchiveIndex } from "@/lib/archiveIndex";
import { ArchiveBrowser } from "@/components/ArchiveBrowser";
import { CATEGORY_MAP } from "@/content/taxonomy";
import { TYPE_META } from "@/content/taxonomy";
import { ARTICLE_TYPES } from "@/content/types";
import { formatDate, formatDateShort, monthLabel } from "@/lib/format";
import { PageIntro, SectionHead, TypeBadge, Dot } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "The Archive",
  description:
    "The complete NOT SCRIPTED archive: every story, searchable and filterable by month, year, desk, article type and the published source each fact was established against.",
  path: "/archive",
});

export default function ArchivePage() {
  const records = buildArchiveIndex();
  const months = getArchiveMonths();
  const years = getArchiveYears();
  const sourceFacets = getSourceFacets();
  const register = getSourceRegister();
  const hosts = new Set(register.map((s) => new URL(s.url).hostname.replace(/^www\./, "")));
  const all = getAllArticles();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <PageIntro
        eyebrow={`${records.length} stories on file`}
        title="The Archive"
        dek="Everything NOT SCRIPTED has published, searchable end to end. Filter by desk, article type, month, year, topic, or by the outlet a fact was established against. Every record below carries its own publication date and source list."
        meta={[
          { label: "Stories", value: `${records.length}` },
          { label: "Date range", value: `${formatDate(earliestPublishedAt())} — ${formatDate(all[0].publishedAt)}` },
          { label: "Source references", value: `${countSources()}` },
          { label: "Distinct sources", value: `${sourceFacets.length}` },
          { label: "Distinct hosts", value: `${hosts.size}` },
        ]}
      />

      <section aria-labelledby="archive-browse" className="mt-8 scroll-mt-20">
        <h2 id="archive-browse" className="label-ui border-b-[3px] border-ink pb-2 text-ink-4">
          Search and filter every story
        </h2>
        <div className="mt-4">
          <ArchiveBrowser records={records} months={months} years={years} sources={sourceFacets} />
        </div>
      </section>

      <section aria-labelledby="archive-months" className="mt-14">
        <div id="archive-months" className="scroll-mt-20">
          <SectionHead
            title="Browse by month"
            kicker="Month and year navigation"
            accent="#14181d"
            actionLabel="Full index"
          />
        </div>
        <p className="mt-3 max-w-[76ch] font-ui text-[0.95rem] leading-relaxed text-ink-3">
          Coverage by month. Older entries are archived reference summaries — shorter by design, and always
          labelled as retrospective. The most recent months carry the fullest long-form reporting.
        </p>

        <div className="mt-5 space-y-8">
          {years.map((year) => (
            <div key={year}>
              <h3 className="label-ui border-b border-rule pb-1.5 text-ink-4">{year}</h3>
              <div className="mt-3 grid gap-6 lg:grid-cols-2">
                {months
                  .filter((m) => m.key.startsWith(year))
                  .map((m) => {
                    const items = getByMonth(m.key);
                    return (
                      <section key={m.key}>
                        <div className="flex items-baseline justify-between gap-3">
                          <h4 className="font-display text-[1.3rem] font-semibold leading-none text-ink">
                            <Link href={`/archive?month=${m.key}`} className="transition-colors hover:text-brand">
                              {monthLabel(m.key)}
                            </Link>
                          </h4>
                          <span className="label-meta">
                            {m.count} {m.count === 1 ? "story" : "stories"}
                          </span>
                        </div>
                        <ul className="mt-2.5">
                          {items.map((a) => {
                            const cat = CATEGORY_MAP[a.category];
                            return (
                              <li key={a.id} className="group border-t border-rule-3 py-2.5 first:border-t-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <TypeBadge type={a.type} />
                                  <span className="label-ui" style={{ color: cat?.accent ?? "#5b656f" }}>
                                    {cat?.name ?? a.category}
                                  </span>
                                  <span className="label-meta">{formatDateShort(a.publishedAt)}</span>
                                </div>
                                <p className="mt-1.5 font-display text-[1.02rem] font-semibold leading-[1.18] text-ink">
                                  <Link href={`/article/${a.slug}`} className="transition-colors group-hover:text-brand">
                                    {a.headline}
                                  </Link>
                                </p>
<p className="label-meta mt-1.5 flex flex-wrap items-center gap-2">
                                  <span>{a.sources.length} sources</span>
                                  <Dot />
                                  <span>{a.sources[0]?.name}</span>
                                  {a.tags.slice(0, 3).map((t) => (
                                    <span key={t}>
                                      <Dot />
                                      <Link
                                        href={`/archive?tag=${encodeURIComponent(t)}`}
                                        className="underline decoration-rule-2 underline-offset-2 hover:text-brand"
                                      >
                                        {t}
                                      </Link>
                                    </span>
                                  ))}
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      </section>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="archive-types" className="mt-14">
        <SectionHead title="By article type" kicker="How each piece was written" accent="#7a2233" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ARTICLE_TYPES.map((t) => {
            const meta = TYPE_META[t];
            const n = countByType()[t] ?? 0;
            return (
              <Link
                key={t}
                href={meta.path}
                className="group flex flex-col border border-rule p-4 transition-colors hover:bg-paper-2"
                style={{ borderTopWidth: 3, borderTopColor: meta.accent }}
              >
                <span className="label-ui" style={{ color: meta.accent }}>
                  {meta.name}
                </span>
                <span className="mt-2 font-display text-[2rem] font-bold leading-none text-ink">{n}</span>
                <span className="mt-2 font-ui text-[0.8rem] leading-snug text-ink-3">{meta.description}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="archive-desks" className="mt-14">
        <SectionHead title="By desk" kicker="Where the stories came from" accent="#14584a" />
        <div className="mt-4 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-4">
          {Object.entries(CATEGORY_MAP).map(([slug, cat]) => {
            const n = all.filter((a) => a.category === slug).length;
            return (
              <Link
                key={slug}
                href={`/archive?category=${slug}`}
                className="bg-paper p-3 transition-colors hover:bg-paper-2"
              >
                <span className="label-ui flex items-center justify-between gap-2" style={{ color: cat.accent }}>
                  <span className="truncate">{cat.name}</span>
                  <span className="text-ink-4">{n}</span>
                </span>
                <span className="mt-1 block font-ui text-[0.78rem] leading-snug text-ink-3">{cat.blurb}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="archive-sources" className="mt-14">
        <SectionHead
          title="Source register"
          kicker="Every outlet we established facts from"
          href="/sources"
          accent="#1b3c86"
          actionLabel="Full register"
        />
        <p className="mt-3 max-w-[76ch] font-ui text-[0.95rem] leading-relaxed text-ink-3">
          This archive does not publish on the basis of anonymous assertion. Below are the publications and
          institutions behind the reporting — official government releases first, then wire services, then
          established publications. Click any source to see every NOT SCRIPTED story that used it.
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {sourceFacets.slice(0, 48).map((s) => (
            <li key={s.name}>
              <Link
                href={`/archive?source=${encodeURIComponent(s.name)}`}
                className="label-ui inline-flex items-center gap-1.5 border border-rule px-2 py-1.5 text-ink-3 transition-colors hover:border-ink hover:text-ink"
              >
                {s.name}
                <span className="text-brand">{s.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

