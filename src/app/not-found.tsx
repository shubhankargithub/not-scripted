import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORY_MAP } from "@/content/taxonomy";

/**
 * The root layout advertises `index, follow`, which would otherwise be inherited
 * here and contradict the `noindex` Next emits for a 404. A missing URL has no
 * canonical of its own either, so the inherited homepage canonical is suppressed.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description: "That page is not part of the NOT SCRIPTED archive.",
  robots: { index: false, follow: true },
};

const ROUTES: { label: string; href: string; note: string }[] = [
  { label: "The full archive", href: "/archive", note: "Every story on file, filterable by month, desk, type and source" },
  { label: "Latest news", href: "/latest", note: "The most recent filings, in publication order" },
  { label: "Top stories", href: "/top-stories", note: "What the desk considers the lead account today" },
  { label: "India", href: "/section/india", note: "Policy, politics and public life across the states" },
  { label: "Business", href: "/section/business", note: "Markets, corporate results, labour and the economy" },
  { label: "Bengaluru & Karnataka", href: "/section/karnataka", note: "The city and the state, from water to mobility" },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6">
      <div className="border-b-[3px] border-ink pb-5">
        <p className="label-ui text-brand">Page not found</p>
        <p className="headline-tight mt-2 font-display text-[clamp(5rem,18vw,11rem)] leading-[0.85] font-bold text-ink">
          404
        </p>
        <h1 className="headline-tight mt-4 font-display text-[clamp(1.5rem,3.6vw,2.35rem)] font-bold text-ink">
          This story is not in the archive
        </h1>
        <p className="mt-3 max-w-[62ch] font-ui text-[1.02rem] leading-relaxed text-ink-3">
          The address you followed does not match anything this publication has filed. There is no article at
          this URL, and no page of this name.
        </p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div>
          <section aria-labelledby="why">
            <h2 id="why" className="font-display text-[1.35rem] font-semibold leading-tight text-ink">
              Why this can happen
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1rem]">
              <p>
                If you followed a link from another site, the article may have been renamed or the link may be
                stale. Neither is unusual. Publication URLs change when a headline is corrected in the course of
                filing, when a section is reorganised, or when a link was typed by hand somewhere else and the
                story has since been filed under a different name.
              </p>
              <p>
                It is also possible the page never existed. A mistyped path, a truncated link in a message, or a
                search result pointing at a URL that has since been retired will all land here.
              </p>
              <p>
                What has <em>not</em> happened is the disappearance of a story. Nothing in this archive is
                withdrawn without a record. If an article was removed rather than moved, it would appear in the{" "}
                <Link href="/corrections" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">
                  corrections log
                </Link>
                .
              </p>
            </div>
          </section>

          <section aria-labelledby="find-it" className="mt-10">
            <h2 id="find-it" className="font-display text-[1.35rem] font-semibold leading-tight text-ink">
              Try the archive
            </h2>
            <p className="mt-2 max-w-[66ch] font-ui text-[0.95rem] leading-relaxed text-ink-3">
              The archive is indexed by headline, subject, desk, tag, month and by the source each fact was
              established against. Searching for a word from the story you were after is usually enough to find
              it.
            </p>
            <form action="/archive" method="get" role="search" className="mt-4">
              <label htmlFor="notfound-q" className="label-ui mb-1.5 block text-ink-4">
                Search the archive
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="notfound-q"
                  name="q"
                  type="search"
                  placeholder="Headline, subject, source, city"
                  className="min-w-0 flex-1 border border-rule-2 bg-white px-3 py-2.5 font-ui text-sm text-ink outline-none placeholder:text-ink-4 focus:border-ink"
                />
                <button
                  type="submit"
                  className="label-ui shrink-0 bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-brand"
                >
                  Search
                </button>
              </div>
            </form>
          </section>
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="routes" className="border border-rule p-5">
            <h2 id="routes" className="label-ui border-b border-ink pb-2 text-ink-4">
              Where to go instead
            </h2>
            <ul className="mt-3 space-y-2">
              {ROUTES.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="group flex items-start justify-between gap-3 border-b border-rule-3 py-2.5 last:border-b-0"
                  >
                    <span className="min-w-0">
                      <span className="block font-ui text-[0.95rem] font-semibold text-ink transition-colors group-hover:text-brand">
                        {r.label}
                      </span>
                      <span className="mt-0.5 block font-ui text-[0.8rem] leading-snug text-ink-3">{r.note}</span>
                    </span>
                    <span aria-hidden="true" className="mt-1 shrink-0 text-ink-4 transition-colors group-hover:text-brand">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="desk-note" className="border border-rule bg-paper-2/70 p-5">
            <h2 id="desk-note" className="label-ui text-ink-4">
              If a link is broken
            </h2>
            <p className="mt-2 font-ui text-[0.85rem] leading-relaxed text-ink-2">
              If you arrived here from a link published elsewhere and the story is genuinely missing, tell the
              desk which link and where you found it. Broken links are a fault in the record, not something a
              reader should have to absorb quietly.
            </p>
            <Link
              href="/contact"
              className="label-ui mt-3 inline-block border border-ink px-3 py-2 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Contact the desk
            </Link>
          </section>

          <section aria-labelledby="sections" className="border border-rule p-5">
            <h2 id="sections" className="label-ui border-b border-ink pb-2 text-ink-4">
              All desks
            </h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {Object.values(CATEGORY_MAP).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/section/${c.slug}`}
                    className="label-ui inline-flex items-center gap-1.5 border px-2 py-1.5 text-ink-3 transition-colors hover:border-ink hover:text-ink"
                    style={{ borderColor: `${c.accent}44`, backgroundColor: `${c.accent}0d` }}
                  >
                    <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-full" style={{ backgroundColor: c.accent }} />
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
