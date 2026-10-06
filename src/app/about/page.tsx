import type { Metadata } from "next";
import Link from "next/link";
import { countSources, earliestPublishedAt, getAllArticles, getArchiveMonths, getSourceFacets } from "@/lib/articles";
import { CATEGORIES, TYPE_META } from "@/content/taxonomy";
import { ARTICLE_TYPES } from "@/content/types";
import { SITE } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { PageIntro, SectionHead } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About NOT SCRIPTED",
  description:
    "NOT SCRIPTED is an independent digital newsroom in Bengaluru that publishes type-labelled journalism and records the source of every fact. Here is what that means in practice.",
  path: "/about",
});

export default function AboutPage() {
  const all = getAllArticles();
  const months = getArchiveMonths();
  const facets = getSourceFacets();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <PageIntro
        eyebrow="About the publication"
        title="NOT SCRIPTED"
        dek="A digital newsroom in Bengaluru that publishes journalism which tells you how it was made. Every article is labelled by type, dated, and carries the sources it was established against."
        meta={[
          { label: "Founded", value: String(SITE.founded) },
          { label: "Stories on file", value: `${all.length}` },
          { label: "Months covered", value: `${months.length}` },
          { label: "Source references", value: `${countSources()}` },
          { label: "Distinct sources", value: `${facets.length}` },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div>
          <section aria-labelledby="the-promise">
            <h2 id="the-promise" className="font-display text-[1.75rem] font-semibold leading-tight text-ink">
              The name is the editorial policy
            </h2>
            <div className="prose-editorial mt-4">
              <p>
                Almost all published journalism is unreproducible by the reader. A byline asserts authority; a
                quote asserts access; a statistic arrives without the series it came from. The reader is asked
                to trust rather than to check.
              </p>
              <p>
                NOT SCRIPTED is organised against that. Every article on this site carries a type. That type is
                not decoration &mdash; it tells you what kind of claim is being made and where it came from,
                before you read a word of it.
              </p>
              <p>
                The publication covers the same events that other outlets cover. That is unavoidable and it is
                not a problem: important events have important coverage, and readers are entitled to more than
                one account. The rule we hold ourselves to is that every article here is written independently.
                We do not copy, we do not paraphrase another outlet&rsquo;s article sentence by sentence, we do
                not reuse distinctive phrasing, and we do not present another organisation&rsquo;s reporting
                as our own.
              </p>
              <p>
                When we summarise reporting published elsewhere, we say so at the top of the piece, credit the
                reporting by name, and link to it. A reader who wants the full account should go and read it.
              </p>
            </div>
          </section>

          <section aria-labelledby="the-types" className="mt-12">
            <h2 id="the-types" className="font-display text-[1.6rem] font-semibold leading-tight text-ink">
              Five article types, defined
            </h2>
            <div className="mt-4 space-y-4">
              {ARTICLE_TYPES.map((t) => {
                const meta = TYPE_META[t];
                const n = all.filter((a) => a.type === t).length;
                return (
                  <div
                    key={t}
                    className="border border-rule p-4"
                    style={{ borderLeftWidth: 3, borderLeftColor: meta.accent }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="label-ui" style={{ color: meta.accent }}>
                        {meta.name}
                      </h3>
                      <span className="label-meta">
                        <Link href={meta.path} className="hover:text-brand">
                          {n} {n === 1 ? "story" : "stories"}
                        </Link>
                      </span>
                    </div>
                    <p className="mt-2 font-ui text-[0.95rem] leading-relaxed text-ink-2">{meta.description}</p>
                    <p className="mt-2 font-ui text-[0.82rem] leading-relaxed text-ink-3">{meta.notice}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="the-archive" className="mt-12">
            <h2 id="the-archive" className="font-display text-[1.6rem] font-semibold leading-tight text-ink">
              An archive, not a feed
            </h2>
            <div className="prose-editorial mt-4">
              <p>
                This archive runs from {formatDate(earliestPublishedAt())} to{" "}
                {formatDate(all[0].publishedAt)}. It is browsable by month, by desk, by type and by source, and
                every record is dated to the minute it was published.
              </p>
              <p>
                Archive entries are retrospective. They were compiled against public sources after the fact,
                which means they are reference summaries rather than dispatches &mdash; and each one says so
                in a reporting note at the foot. Older entries are shorter by design; the current months carry
                the fullest long-form work.
              </p>
              <p>
                What the archive does not contain matters as much as what it does. There are no invented
                quotes, no invented interviews, no invented eyewitness accounts, no unnamed sources, and no
                claims that this newsroom reported something on the day it did not. Where a figure is
                disputed between sources, we report the dispute rather than picking a side.
              </p>
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="at-a-glance" className="border border-rule p-5">
            <h2 id="at-a-glance" className="label-ui border-b border-ink pb-2 text-ink-4">
              At a glance
            </h2>
            <dl className="mt-3 space-y-2.5 font-ui text-[0.88rem]">
              {[
                ["Publication", SITE.name],
                ["Base", "Bengaluru, Karnataka"],
                ["Founded", String(SITE.founded)],
                ["Edition time", `${formatDate(SITE.editionAt)}, IST`],
                ["Coverage", `${all.length} stories, ${months.length} months`],
                ["Sourcing", `${countSources()} references, ${facets.length} sources`],
                ["Desks", `${CATEGORIES.length} sections`],
                ["Types", `${ARTICLE_TYPES.length}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-rule-3 pb-2">
                  <dt className="label-ui text-ink-4">{k}</dt>
                  <dd className="text-right text-ink-2">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="read-next" className="border border-rule p-5">
            <h2 id="read-next" className="label-ui border-b border-ink pb-2 text-ink-4">
              Read next
            </h2>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Editorial standards", href: "/editorial-standards" },
                { label: "How we source", href: "/sources" },
                { label: "Corrections log", href: "/corrections" },
                { label: "Newsroom & bylines", href: "/newsroom" },
                { label: "Contact the desk", href: "/contact" },
                { label: "The full archive", href: "/archive" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center justify-between gap-3 border-b border-rule-3 py-2 font-ui text-[0.9rem] text-ink-2 transition-colors last:border-b-0 hover:text-brand"
                  >
                    {l.label}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="masthead-note" className="border border-rule bg-paper-2/70 p-5">
            <h2 id="masthead-note" className="label-ui text-ink-4">
              A note on the wordmark
            </h2>
            <p className="mt-2 font-ui text-[0.85rem] leading-relaxed text-ink-2">
              The masthead sets <span className="text-ink">Not</span> in outline and{" "}
              <span className="text-ink">Scripted</span> in solid. The name is a position: the reporting is
              not scripted, and the position is not hidden. Every story on this site is vector artwork and
              typography &mdash; there is no stock photography and no borrowed image.
            </p>
          </section>
        </aside>
      </div>

      <section aria-labelledby="coverage" className="mt-14">
        <SectionHead title="What we cover" kicker={`${CATEGORIES.length} standing desks`} accent="#c21f17" />
        <div className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <div key={c.slug} className="border-t-2 pt-3" style={{ borderTopColor: c.accent }}>
              <h3 className="font-display text-[1.08rem] font-semibold text-ink">
                <Link href={`/section/${c.slug}`} className="hover:text-brand">
                  {c.name}
                </Link>
              </h3>
              <p className="mt-1.5 font-ui text-[0.85rem] leading-relaxed text-ink-3">{c.blurb}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}