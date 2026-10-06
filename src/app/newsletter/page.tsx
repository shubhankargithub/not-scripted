import type { Metadata } from "next";
import Link from "next/link";
import { getAllArticles, countArticles, getArchiveMonths } from "@/lib/articles";
import { CATEGORY_MAP } from "@/content/taxonomy";
import { SITE } from "@/lib/site";
import { formatDateShort } from "@/lib/format";
import { PageIntro, SectionHead, Dot, TypeBadge } from "@/components/ui";

export const metadata: Metadata = {
  title: "The Daily Briefing",
  description:
    "The NOT SCRIPTED daily briefing: one lead story, what the sources actually said, and the links, once a morning. Free, and carrying no advertising.",
  alternates: { canonical: "/newsletter" },
};

const CONTENTS: { label: string; body: string }[] = [
  {
    label: "The lead story",
    body:
      "One piece, named at the top, with a plain statement of what it establishes and what it does not. If the lead is an explainer rather than a news report, it says so, because the two are not the same kind of claim.",
  },
  {
    label: "What the sources actually said",
    body:
      "For each item, the outlet or dataset the fact was established against, and where a source is disputed, what the dispute is. The briefing does not smooth over a contested figure in order to keep a line short.",
  },
  {
    label: "The links",
    body:
      "Direct links to the source material, so a reader can read the original and judge the account against it rather than take it on trust. The briefing is a signpost, not a substitute.",
  },
  {
    label: "The rest of the desk",
    body:
      "A short list of the other stories published that morning, by desk, with their type labels intact. Nothing is demoted to an unlabelled bullet.",
  },
];

export default function NewsletterPage() {
  const sample = getAllArticles().slice(0, 6);
  const months = getArchiveMonths();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <PageIntro
        eyebrow="Once a morning"
        title="The Daily Briefing"
        dek="One email each morning: the lead story, what the sources actually said, and the links so you can read them yourself. Free, and carrying no advertising of any kind."
        meta={[
          { label: "Frequency", value: "Daily, morning IST" },
          { label: "Cost", value: "Free" },
          { label: "Advertising", value: "None" },
          { label: "Stories on file", value: `${countArticles()}` },
          { label: "Months covered", value: `${months.length}` },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div>
          <section aria-labelledby="what-arrives" className="border border-rule bg-paper-2/60 p-5 sm:p-6">
            <h2 id="what-arrives" className="label-ui text-ink-4">
              What arrives, and when
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                The briefing goes out once in the morning, in IST, and carries the morning&rsquo;s lead story
                with the sourcing attached. It is written by the desk rather than assembled by a system, and it
                goes out whether or not the news is dramatic. On a quiet morning it says the morning was quiet.
              </p>
              <p>
                It is free. There is no paid tier, no premium version and no advertising in the body of the
                message. That is not a temporary arrangement pending scale: a briefing that carries advertising
                has a different job from a briefing that reports what a source said, and this newsroom is not
                willing to run both in the same email.
              </p>
            </div>
            <dl className="mt-5 grid gap-x-8 gap-y-3 border-t border-rule-2 pt-4 sm:grid-cols-2">
              {[
                ["Sends", "One email a day, morning IST"],
                ["Length", "Short enough to read before the day starts"],
                ["Price", "Free, with no paid tier"],
                ["Advertising", "None, in the body or the footer"],
                ["Unsubscribe", "One click, no questions"],
                ["Machine-readable", "RSS at /feed.xml"],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-rule-3 pb-2">
                  <dt className="label-ui text-ink-4">{k}</dt>
                  <dd className="mt-0.5 font-ui text-[0.9rem] text-ink-2">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="inside" className="mt-12">
            <SectionHead title="What goes into an issue" kicker="Four parts, in order" accent="#c21f17" />
            <ol className="mt-5 space-y-5">
              {CONTENTS.map((c, i) => (
                <li key={c.label} className="grid gap-2 border-b border-rule-3 pb-5 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-5">
                  <span aria-hidden="true" className="font-display text-[1.7rem] leading-none font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-ink">{c.label}</h3>
                    <p className="mt-2 max-w-[74ch] font-ui text-[0.96rem] leading-relaxed text-ink-2">{c.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="sample-issues" className="mt-12">
            <SectionHead
              title="Archive of briefings"
              kicker="Sample issue contents"
              accent="#1b3c86"
            />
            <div className="mt-3 border border-dashed border-rule-2 bg-paper-2/60 p-4">
              <p className="label-ui text-brand">Sample contents, not issued briefings</p>
              <p className="mt-2 max-w-[76ch] font-ui text-[0.93rem] leading-relaxed text-ink-2">
                The list below shows what an issue would look like, built from the six most recent articles in
                this archive. These items were published as articles. No briefing has been sent, and this is
                not a record of one having been sent.
              </p>
            </div>
            <ol className="mt-4 space-y-3">
              {sample.map((a, i) => {
                const cat = CATEGORY_MAP[a.category];
                return (
                  <li key={a.id} className="border border-rule p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span aria-hidden="true" className="label-ui text-ink-4">
                        Issue line {String(i + 1).padStart(2, "0")}
                      </span>
                      <Dot />
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
                    <p className="label-meta mt-1.5 flex flex-wrap items-center gap-2">
                      <span>{a.sources.length} sources</span>
                      <Dot />
                      <span>{a.sources[0]?.name}</span>
                    </p>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 font-ui text-[0.9rem] leading-relaxed text-ink-3">
              The full run of published material is in the{" "}
              <Link href="/archive" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">
                archive
              </Link>
              , browsable by month, desk, type and source.
            </p>
          </section>
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="signup" className="border border-rule p-5">
            <h2 id="signup" className="label-ui border-b border-ink pb-2 text-ink-4">
              Sign up
            </h2>
            <p id="signup-note" className="mt-3 border border-dashed border-rule-2 bg-paper-2/60 p-3 font-ui text-[0.82rem] leading-relaxed text-ink-2">
              This form is a static demonstration. It is not connected to a server action and nothing is sent
              to this site, stored, or added to a mailing list. There is no mailing list here to add anybody to.
            </p>
            <form
              action={`mailto:${SITE.contactEmail}`}
              method="post"
              encType="text/plain"
              className="mt-4 space-y-3"
              aria-describedby="signup-note"
            >
              <div>
                <label htmlFor="newsletter-email" className="label-ui mb-1 block text-ink-4">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-describedby="signup-note"
                  placeholder="name@example.com"
                  className="w-full border border-rule-2 bg-white px-3 py-2.5 font-ui text-sm text-ink outline-none placeholder:text-ink-4 focus:border-ink"
                />
              </div>
              <div>
                <label htmlFor="newsletter-desk" className="label-ui mb-1 block text-ink-4">
                  Send me
                </label>
                <select
                  id="newsletter-desk"
                  name="edition"
                  defaultValue="daily"
                  aria-describedby="signup-note"
                  className="w-full border border-rule-2 bg-white px-3 py-2.5 font-ui text-sm text-ink outline-none focus:border-ink"
                >
                  <option value="daily">The daily briefing</option>
                  <option value="karnataka">Bengaluru &amp; Karnataka</option>
                  <option value="business">Business</option>
                  <option value="world">World</option>
                </select>
              </div>
              <button
                type="submit"
                aria-describedby="signup-note"
                className="label-ui w-full bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-brand"
              >
                Demonstration form &mdash; not connected
              </button>
            </form>
            <p className="mt-4 font-ui text-[0.85rem] leading-relaxed text-ink-2">
              There is no mailing list to join on this site. To follow the desk, subscribe to the{" "}
              <a
                href="/feed.xml"
                className="font-semibold text-ink underline decoration-rule-2 underline-offset-4 hover:text-brand"
              >
                RSS feed
              </a>{" "}
              at <span className="whitespace-nowrap">/feed.xml</span>, which is generated from the same archive
              and needs no account. The desk can also be written to directly at{" "}
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="font-semibold text-ink underline decoration-rule-2 underline-offset-4 hover:text-brand"
              >
                {SITE.contactEmail}
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="why-free" className="border border-rule bg-paper-2/70 p-5">
            <h2 id="why-free" className="label-ui text-ink-4">
              Why there is no advertising
            </h2>
            <p className="mt-2 font-ui text-[0.85rem] leading-relaxed text-ink-2">
              An advert in a briefing is an instruction to soften the item next to it. That is the whole
              mechanism, and it does not require anyone at the desk to intend it. A publication that labels its
              sources and logs its corrections cannot also sell the placement next to them.
            </p>
          </section>

          <section aria-labelledby="no-tracking" className="border border-rule p-5">
            <h2 id="no-tracking" className="label-ui border-b border-ink pb-2 text-ink-4">
              What we would need to tell you
            </h2>
            <p className="mt-3 font-ui text-[0.85rem] leading-relaxed text-ink-2">
              If a signup were ever connected, this page and the{" "}
              <Link href="/privacy" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">
                privacy policy
              </Link>{" "}
              would say so before it went live: what address is stored, where it is stored, who processes it,
              and how to have it deleted. The current privacy policy states plainly that this site runs no
              mailing list and no user database.
            </p>
          </section>

          <section aria-labelledby="newsletter-links" className="border border-rule p-5">
            <h2 id="newsletter-links" className="label-ui border-b border-ink pb-2 text-ink-4">
              Read next
            </h2>
            <ul className="mt-3 space-y-2">
              {[
                { label: "The full archive", href: "/archive" },
                { label: "Latest news", href: "/latest" },
                { label: "Top stories", href: "/top-stories" },
                { label: "How we source", href: "/sources" },
                { label: "Editorial standards", href: "/editorial-standards" },
                { label: "Contact the desk", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center justify-between gap-3 border-b border-rule-3 py-2 font-ui text-[0.88rem] text-ink-2 transition-colors last:border-b-0 hover:text-brand"
                  >
                    {l.label}
                    <span aria-hidden="true">&rarr;</span>
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
