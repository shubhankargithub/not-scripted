import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLE_TYPES } from "@/content/types";
import { SOURCE_TYPE_LABELS } from "@/content/taxonomy";
import { SITE } from "@/lib/site";
import { PageIntro } from "@/components/ui";
import { PhotoCreditStrip } from "@/components/Media";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description:
    "How NOT SCRIPTED writes, labels, sources and corrects. The rules that govern every article on this site.",
  alternates: { canonical: "/editorial-standards" },
};

const RULES: { n: string; title: string; body: string[] }[] = [
  {
    n: "01",
    title: "We write independently, or we say we did not",
    body: [
      "It is normal for several publications to cover the same event, and it is normal for them to arrive at similar conclusions. That is not copying. What is prohibited, and what this newsroom does not do, is reproducing another organisation&rsquo;s article text, paraphrasing it sentence by sentence, borrowing its distinctive phrasing or structure, or presenting another publication&rsquo;s reporting as our own.",
      "Where a story summarises reporting published elsewhere, it is published as From Around The Web. It is attributed by name at the top of the piece, the original outlet is linked, and the article tells the reader to go there for the full account.",
    ],
  },
  {
    n: "02",
    title: "Every article declares its type",
    body: [
      "The type is set on every article and is not a stylistic choice. It tells the reader what kind of claim is being made, how it was established, and what they are entitled to expect from it.",
      "Original Reporting means this newsroom independently worked the underlying documents, datasets or public records. It does not mean we were present, and it does not mean we conducted interviews we did not conduct.",
      "News Update is an independently written report on a current event, established against verified information.",
      "Explainer supplies background so a reader can follow an ongoing story.",
      "Analysis is argument. It is labelled as opinion and does not represent the view of the editors as a whole.",
      "From Around The Web is a summary of someone else&rsquo;s reporting, attributed and linked.",
    ],
  },
  {
    n: "03",
    title: "Sources are ranked, and shown",
    body: [
      "Official releases and institutional datasets come first, because they are the record of the decision itself rather than a report on it. Wire services follow. Established publications come last, because they involve one organisation&rsquo;s own reporting.",
      "Every article prints its sources at the foot, with the outlet name, the publication date where one is known, the byline where one exists, and a link. The complete index is the source register.",
    ],
  },
  {
    n: "04",
    title: "We do not invent",
    body: [
      "No invented quotes. No invented interviews. No invented eyewitness accounts. No unnamed sources presented as though they existed. No statistics, and no claims that this newsroom reported something at a time it did not.",
      "This archive is compiled from published sources after the fact. Every entry carries a reporting note saying so. Where a figure is contested between sources, the article reports the contest instead of resolving it silently.",
      "There is also no borrowed imagery. Every illustration on this site is original vector artwork generated from the article identifier and its desk palette.",
    ],
  },
  {
    n: "05",
    title: "Dates mean something",
    body: [
      "Publication timestamps are stored in UTC and displayed in IST with an explicit label. Every article shows when it was published, and shows an update time when one exists.",
      "Archive entries are retrospective and are dated to the month they cover. They are not dispatches from that month and are not written as though they were.",
    ],
  },
  {
    n: "06",
    title: "Bylines name the accountable desk",
    body: [
      "A byline identifies the desk and the journalist accountable for the text. It does not assert that the person named was present at an event or conducted an interview. The reference desk maintains the archive, verifies events against primary sources, records source metadata, and marks retrospective coverage clearly.",
    ],
  },
  {
    n: "07",
    title: "Corrections are published, not quietly edited",
    body: [
      "When we get something wrong we correct it on the article, timestamp the correction, and log it. Substantive changes are described. Silent editing of a factual error is not a correction.",
    ],
  },
  {
    n: "08",
    title: "Photographs are licensed, credited, and never pretend to be the event",
    body: [
      "Photography on this site is published under a licence that permits it: CC0, Public Domain Mark, CC BY or CC BY-SA. It is sourced from Wikimedia Commons and from Openverse, which aggregates Creative Commons material from Flickr and other archives. Nothing here uses another publication's news photography, and nothing here uses a photograph of a named living person from a press agency.",
      "Every image is credited to its photographer, carries its licence, and links to its source page. The photographer gets the attribution; the licence gets honoured. The complete register is at /sources.",
      "Captions describe the subject, never the event. Where the photograph is of the actual thing reported, the caption says so. Where it is a freely-licensed photograph of the general subject rather than the specific event, the caption says that too, in those words. A reader should never have to guess which they are looking at.",
      "Where neither exists, the story shows original generated vector artwork rather than substituting an unrelated stock image. A visible gap is more honest than a picture that quietly misleads.",
      "This is a real constraint and it shapes the archive. Freely-licensed photography of Indian news events barely exists, so a large share of these images illustrate their subject rather than depict their event, and we do not pretend otherwise.",
    ],
  },
  {
    n: "09",
    title: "The page types are a contract",
    body: [
      "Top Stories, Breaking, Trending and Most Read are audience and desk signals. Top Stories reflects editor judgement. Trending and Most Read reflect reading velocity. Breaking means the desk is actively following a developing story.",
      "None of these is a claim that a story is more important than another story. A developing flood in Nepal and a disputed GDP figure are both in the archive because both were real and both were reported.",
    ],
  },
];

export default function StandardsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <PageIntro
        eyebrow="The rules"
        title="Editorial Standards"
        dek="These are the standards every article on NOT SCRIPTED is written and filed against. They are published so that a reader can hold the publication to them, and so that a competitor can check."
        meta={[
          { label: "Standards", value: `${RULES.length}` },
          { label: "Article types", value: `${ARTICLE_TYPES.length}` },
          { label: "Source categories", value: `${Object.keys(SOURCE_TYPE_LABELS).length}` },
          { label: "Version", value: "Current edition" },
        ]}
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-9">
          {RULES.map((r) => (
            <section key={r.n} aria-labelledby={`rule-${r.n}`}>
              <div className="flex items-baseline gap-4 border-b-[3px] border-ink pb-2">
                <span
                  aria-hidden="true"
                  className="font-display text-[1.6rem] leading-none font-bold text-brand"
                >
                  {r.n}
                </span>
                <h2 id={`rule-${r.n}`} className="font-display text-[1.4rem] font-semibold leading-tight text-ink">
                  {r.title}
                </h2>
              </div>
              <div className="mt-3.5 space-y-3">
                {r.body.map((p, i) => (
                  <p key={i} className="font-ui text-[0.98rem] leading-relaxed text-ink-2">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-8">
          <PhotoCreditStrip />
          <section aria-labelledby="quick-type-table" className="border border-rule p-5">
            <h2 id="quick-type-table" className="label-ui border-b border-ink pb-2 text-ink-4">
              Type quick reference
            </h2>
            <dl className="mt-3 space-y-3">
              {ARTICLE_TYPES.map((t) => (
                <div key={t} className="border-b border-rule-3 pb-2.5 last:border-b-0 last:pb-0">
                  <dt>
                    <Link
                      href={`/${t === "from-the-web" ? "from-around-the-web" : t === "analysis" ? "opinion" : t === "explainer" ? "explainers" : t === "original" ? "original" : "latest"}`}
                      className="label-ui"
                      style={{ color: { original: "#c21f17", "news-update": "#1b3c86", explainer: "#0b5a66", analysis: "#7a1f3d", "from-the-web": "#6b4423" }[t] }}
                    >
                      {t}
                    </Link>
                  </dt>
                  <dd className="mt-1 font-ui text-[0.84rem] leading-relaxed text-ink-3">
                    {
                      {
                        original: "Built by this newsroom from documents and public datasets.",
                        "news-update": "Independently written report on a current event.",
                        explainer: "Background and context for an ongoing story.",
                        analysis: "Labelled argument, not straight news.",
                        "from-the-web": "Summary of reporting published elsewhere, attributed and linked.",
                      }[t]
                    }
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="source-rank" className="border border-rule p-5">
            <h2 id="source-rank" className="label-ui border-b border-ink pb-2 text-ink-4">
              Source ranking
            </h2>
            <ol className="mt-3 space-y-2.5">
              {Object.entries(SOURCE_TYPE_LABELS).map(([k, v], i) => (
                <li key={k} className="flex gap-3 border-b border-rule-3 pb-2.5 last:border-b-0 last:pb-0">
                  <span aria-hidden="true" className="font-display text-[1.05rem] font-bold text-brand">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-ui text-[0.9rem] font-semibold text-ink">{v}</span>
                    <span className="mt-0.5 block font-ui text-[0.8rem] leading-relaxed text-ink-3">
                      {k === "official" && "Government ministries, regulators, Parliament and official gazette notifications."}
                      {k === "wire" && "Reuters, AP, PTI, AFP and comparable services aggregating across jurisdictions."}
                      {k === "institution" && "Universities, multilateral bodies, treaty organisations and standards bodies."}
                      {k === "data" && "Statistical agencies, exchanges and series published with a methodology."}
                      {k === "research" && "Peer-reviewed and working papers, cited with the author and paper."}
                      {k === "publication" && "Established publications, credited and linked to the original."}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="report-an-error" className="border border-brand bg-brand-wash p-5">
            <h2 id="report-an-error" className="label-ui text-brand">
              Something wrong?
            </h2>
            <p className="mt-2 font-ui text-[0.88rem] leading-relaxed text-ink-2">
              Tell us. Errors are logged publicly and corrected on the article with a timestamp.
            </p>
            <a
              href={`mailto:${SITE.correctionsEmail}`}
              className="label-ui mt-3 inline-block border border-brand bg-brand px-3 py-2 text-paper transition-colors hover:bg-brand-2"
            >
              {SITE.correctionsEmail}
            </a>
          </section>

          <section aria-labelledby="standards-links" className="border border-rule p-5">
            <h2 id="standards-links" className="label-ui border-b border-ink pb-2 text-ink-4">
              Further reading
            </h2>
            <ul className="mt-3 space-y-2">
              {[
                { label: "How we source", href: "/sources" },
                { label: "Corrections log", href: "/corrections" },
                { label: "Newsroom & bylines", href: "/newsroom" },
                { label: "The archive", href: "/archive" },
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