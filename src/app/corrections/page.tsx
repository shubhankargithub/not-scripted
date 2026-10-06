import type { Metadata } from "next";
import Link from "next/link";
import { countArticles, countSources, getAllArticles, getMostRead } from "@/lib/articles";
import { CATEGORY_MAP } from "@/content/taxonomy";
import { SITE } from "@/lib/site";
import { formatDateShort } from "@/lib/format";
import { PageIntro, SectionHead, Dot, TypeBadge, EmptyState } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Corrections",
  description:
    "The NOT SCRIPTED corrections policy and the public log of every correction issued against the archive. No corrections have been issued to date.",
  path: "/corrections",
});

const POLICY: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "A correction is made on the article, not quietly in the text",
    body:
      "When we get a fact wrong, the article itself is amended. The amended passage carries a dated correction note showing what was said before and what it says now. We do not overwrite an error and leave no trace of it. A silent edit is not a correction, and this newsroom does not treat it as one.",
  },
  {
    n: "02",
    title: "Every correction is timestamped in IST",
    body:
      "A correction note records the date and time it was applied, displayed in IST to match the publication timestamps on every article in this archive. The original publication time is never altered. A reader who wants to know what was published on a given morning can still establish it.",
  },
  {
    n: "03",
    title: "Every correction is logged publicly",
    body:
      "Corrections are collected on this page. The log is public, dated, and ordered most recent first. It is not a summary and it is not selective: anything that materially changes what a reader would have concluded from the article appears here.",
  },
  {
    n: "04",
    title: "Disputes are reported, not resolved by deletion",
    body:
      "Where two sources disagree, the article says so and names both. If one of them turns out to be wrong, we amend that figure and log it. We do not delete the contested passage, because the fact that the figures were in dispute is itself part of the record.",
  },
  {
    n: "05",
    title: "Corrections are free to report and free to publish",
    body:
      "Anyone may report an error, including someone quoted in the article and someone who disagrees with it. Reports are read by the reference desk. If a report is upheld, the correction is published whatever the reputational cost. If it is not upheld, the reader is told why in the reply.",
  },
];

const LOG_FIELDS: { label: string; detail: string }[] = [
  {
    label: "Date and time",
    detail: "The moment the correction was applied, in IST, to the minute. The original publication time of the article stays as it was.",
  },
  {
    label: "The article",
    detail: "The headline and a working link to the page as it now stands, so the correction can be read against the amended text.",
  },
  {
    label: "Nature of the error",
    detail: "A plain description of what was wrong and how it was wrong: a misread figure, an attributed claim to the wrong person, an outdated status, a broken link to a source.",
  },
  {
    label: "What changed",
    detail: "The wording or the figure as it now appears. Where a correction affects the reader&rsquo;s conclusion rather than a single sentence, the article says so explicitly.",
  },
  {
    label: "Raised by",
    detail: "Whether the error was noticed by this newsroom, reported by a reader, or flagged by a source named in the article.",
  },
];

export default function CorrectionsPage() {
  const mostRead = getMostRead(3);
  const latest = getAllArticles().slice(0, 5);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <PageIntro
        eyebrow="Transparency record"
        title="Corrections"
        dek="When NOT SCRIPTED gets something wrong, the article is corrected, the correction is timestamped, and the change is logged here. Nothing is amended quietly. This page is the public record of that process."
        meta={[
          { label: "Corrections issued", value: "0" },
          { label: "Log status", value: "Empty" },
          { label: "Stories on file", value: `${countArticles()}` },
          { label: "Source references", value: `${countSources()}` },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div>
          <section aria-labelledby="the-policy">
            <h2 id="the-policy" className="font-display text-[1.6rem] font-semibold leading-tight text-ink">
              The corrections policy
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                The test is simple. A reader should be able to tell, at any point, what this newsroom published
                and when it changed its mind. That requires two things a publication either does or does not
                have: the willingness to say it was wrong, and a record that survives the correction.
              </p>
              <p>
                The rules below govern every article in this archive. They are the same rules whether the error
                is a wrong number in an explainer or a misattributed remark in a news update.
              </p>
            </div>
            <div className="mt-6 space-y-6">
              {POLICY.map((r) => (
                <div key={r.n}>
                  <div className="flex items-baseline gap-4 border-b-[3px] border-ink pb-2">
                    <span aria-hidden="true" className="font-display text-[1.45rem] leading-none font-bold text-brand">
                      {r.n}
                    </span>
                    <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">{r.title}</h3>
                  </div>
                  <p className="mt-3 font-ui text-[0.96rem] leading-relaxed text-ink-2">{r.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="the-log" className="mt-12">
            <SectionHead title="The corrections log" kicker="Most recent first" accent="#c21f17" />
            <div className="mt-4">
              <EmptyState
                title="No corrections have been issued against this archive."
                body="The log is empty because nothing in the archive has required a published correction, not because corrections are withheld. The first entry will appear here the moment one is made."
              />
            </div>
            <p className="mt-4 font-ui text-[0.9rem] leading-relaxed text-ink-3">
              An empty log is a claim about this edition of the archive, not a standing guarantee. It should be
              read alongside the <Link href="/editorial-standards" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">editorial standards</Link>, which set out what we claim for each article and what we
              do not.
            </p>
          </section>

          <section aria-labelledby="what-an-entry-contains" className="mt-12">
            <SectionHead title="What a log entry contains" kicker="The format, before it is used" accent="#1b3c86" />
            <p className="mt-3 max-w-[76ch] font-ui text-[0.95rem] leading-relaxed text-ink-3">
              Nothing below describes a real correction. It sets out the five fields every entry will carry, so
              that a reader knows in advance what a correction is obliged to tell them.
            </p>
            <dl className="mt-5 border border-rule">
              {LOG_FIELDS.map((f) => (
                <div key={f.label} className="grid gap-1 border-b border-rule-3 px-4 py-3.5 last:border-b-0 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-5">
                  <dt className="label-ui text-ink-4">{f.label}</dt>
                  <dd className="font-ui text-[0.92rem] leading-relaxed text-ink-2">{f.detail}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="illustrative" className="mt-12">
            <SectionHead
              title="Illustrative entry format"
              kicker="Sample format only"
              accent="#0b5a66"
            />
            <div className="mt-3 border border-dashed border-rule-2 bg-paper-2/60 p-4">
              <p className="label-ui text-brand">Not a correction record</p>
              <p className="mt-2 max-w-[76ch] font-ui text-[0.93rem] leading-relaxed text-ink-2">
                The five records below use real articles from this archive so that the shape of an entry is
                legible. They are illustrations of the format only. No correction has been issued against any
                of these articles, and the description and amendment shown are placeholders, not statements
                about the articles.
              </p>
            </div>
            <ol className="mt-4 space-y-3">
              {latest.map((a) => {
                const cat = CATEGORY_MAP[a.category];
                return (
                  <li key={a.id} className="border border-rule p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <TypeBadge type={a.type} />
                      <span className="label-ui" style={{ color: cat?.accent ?? "#5b656f" }}>
                        {cat?.name ?? a.category}
                      </span>
                      <span className="label-meta">{formatDateShort(a.publishedAt)}</span>
                    </div>
                    <p className="mt-2 font-display text-[1.05rem] font-semibold leading-[1.2] text-ink">
                      <Link href={`/article/${a.slug}`} className="hover:text-brand">
                        {a.headline}
                      </Link>
                    </p>
                    <dl className="mt-3 space-y-1.5 border-t border-rule-3 pt-3 font-ui text-[0.86rem] leading-relaxed">
                      <div className="flex flex-wrap gap-2">
                        <dt className="label-ui shrink-0 text-ink-4">Date</dt>
                        <dd className="text-ink-4">Placeholder &mdash; the day and time the correction was applied</dd>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <dt className="label-ui shrink-0 text-ink-4">Nature</dt>
                        <dd className="text-ink-4">Placeholder &mdash; what was wrong and how it was wrong</dd>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <dt className="label-ui shrink-0 text-ink-4">Amended</dt>
                        <dd className="text-ink-4">Placeholder &mdash; what the passage says now</dd>
                      </div>
                    </dl>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="report-it" className="border border-brand bg-brand-wash p-5">
            <h2 id="report-it" className="label-ui text-brand">
              Report an error
            </h2>
            <p className="mt-2 font-ui text-[0.88rem] leading-relaxed text-ink-2">
              Send the article link, the passage you believe is wrong, and the source that shows it. Reports are
              read by the reference desk and answered.
            </p>
            <a
              href={`mailto:${SITE.correctionsEmail}`}
              className="label-ui mt-3 inline-block border border-brand bg-brand px-3 py-2 text-paper transition-colors hover:bg-brand-2"
            >
              {SITE.correctionsEmail}
            </a>
            <p className="mt-3 font-ui text-[0.8rem] leading-relaxed text-ink-3">
              Please include the article URL in the subject line. It routes the report faster.
            </p>
          </section>

          <section aria-labelledby="where-to-look" className="border border-rule p-5">
            <h2 id="where-to-look" className="label-ui border-b border-ink pb-2 text-ink-4">
              Where to look first
            </h2>
            <p className="mt-3 font-ui text-[0.85rem] leading-relaxed text-ink-3">
              Errors cluster in the places with the most moving parts: figures taken from a dataset, names
              transcribed from a long document, and claims attributed to a named person. Start with these.
            </p>
            <ul className="mt-3 space-y-2">
              {mostRead.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/article/${a.slug}`}
                    className="block border-b border-rule-3 pb-2 font-ui text-[0.9rem] leading-snug text-ink-2 transition-colors last:border-b-0 hover:text-brand"
                  >
                    {a.headline}
                    <span className="label-meta mt-1 flex flex-wrap items-center gap-2">
                      <span>{a.sources.length} sources</span>
                      <Dot />
                      <span>{a.sources[0]?.name}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="related-pages" className="border border-rule p-5">
            <h2 id="related-pages" className="label-ui border-b border-ink pb-2 text-ink-4">
              Read next
            </h2>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Editorial standards", href: "/editorial-standards" },
                { label: "How we source", href: "/sources" },
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

          <section aria-labelledby="scope-note" className="border border-rule bg-paper-2/70 p-5">
            <h2 id="scope-note" className="label-ui text-ink-4">
              Scope of this log
            </h2>
            <p className="mt-2 font-ui text-[0.85rem] leading-relaxed text-ink-2">
              This log covers articles published by NOT SCRIPTED. It does not cover corrections made by the
              publications and institutions recorded in the{" "}
              <Link href="/sources" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">
                source register
              </Link>
              . Where a source has amended its own reporting, follow the link on the article and read their
              version.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
