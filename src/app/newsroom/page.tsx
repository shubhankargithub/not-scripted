import type { Metadata } from "next";
import Link from "next/link";
import { AUTHORS, getDeskCounts, getArticlesByAuthor, countArticles } from "@/lib/articles";
import { CATEGORY_MAP } from "@/content/taxonomy";
import { PageIntro, SectionHead, Dot } from "@/components/ui";
import { formatDateShort } from "@/lib/format";

export const metadata: Metadata = {
  title: "Newsroom & Bylines",
  description:
    "The NOT SCRIPTED desks, who files what, and how bylines and desk attributions work across this publication.",
  alternates: { canonical: "/newsroom" },
};

export default function NewsroomPage() {
  const deskCounts = getDeskCounts();
  const byDesk = new Map<string, typeof AUTHORS>();
  for (const a of AUTHORS) {
    const arr = byDesk.get(a.desk) ?? [];
    arr.push(a);
    byDesk.set(a.desk, arr);
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <PageIntro
        eyebrow="Who files what"
        title="Newsroom & Bylines"
        dek="NOT SCRIPTED is organised into desks. A desk owns a beat, a beat has a name attached to it, and the byline tells you who is accountable for what was written."
        meta={[
          { label: "Desks", value: `${byDesk.size}` },
          { label: "Named journalists", value: `${AUTHORS.length}` },
          { label: "Stories on file", value: `${countArticles()}` },
        ]}
      />

      <section aria-labelledby="how-bylines-work" className="mt-8 border border-rule bg-paper-2/60 p-5 sm:p-6">
        <h2 id="how-bylines-work" className="label-ui text-ink-4">
          How bylines work here
        </h2>
        <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
          <p>
            A byline on NOT SCRIPTED identifies the desk and the journalist accountable for the text. It does
            not imply that the person named was present at an event, conducted an interview, or filed from a
            location. This archive is compiled from published sources, and every article says so at the foot
            in a reporting note.
          </p>
          <p>
            Where a fact is attributed to a named individual &mdash; a minister, an official, an economist
            &mdash; that attribution is quoted as reported by the source credited on the article. We do not
            publish invented quotes, and we do not publish interviews that did not happen.
          </p>
          <p>
            Original reporting is the exception, and it earns its label. An article is marked
            <em> original</em> only when this newsroom independently worked the underlying documents,
            datasets or public records itself. Every original piece carries a note naming exactly what was
            worked from.
          </p>
        </div>
      </section>

      <section aria-labelledby="desk-map" className="mt-12">
        <SectionHead title="The desk map" kicker="Beats and headcount" accent="#c21f17" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from(byDesk.entries()).map(([desk, people]) => (
            <div key={desk} className="border border-rule p-4">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[1.1rem] font-semibold text-ink">{desk}</h3>
                <span className="label-meta">{deskCounts[desk] ?? 0} stories</span>
              </div>
              <ul className="mt-3 space-y-2.5">
                {people.map((p) => (
                  <li key={p.id} className="border-t border-rule-3 pt-2.5">
                    <p className="font-ui text-[0.92rem] font-semibold text-ink">{p.name}</p>
                    <p className="label-meta mt-0.5">{p.role}</p>
                    <p className="mt-1.5 font-ui text-[0.82rem] leading-relaxed text-ink-3">{p.bio}</p>
                    <p className="label-meta mt-1.5 flex items-center gap-2">
                      <span>{p.location}</span>
                      <Dot />
                      <Link
                        href={`/archive?tag=${encodeURIComponent(p.desk)}`}
                        className="underline decoration-rule-2 underline-offset-2 hover:text-brand"
                      >
                        {getArticlesByAuthor(p.id).length} filed
                      </Link>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="coverage-index" className="mt-14">
        <SectionHead title="Coverage index" kicker="Every desk, counted" accent="#14584a" />
        <div className="mt-4 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-3 lg:grid-cols-4">
          {Object.values(CATEGORY_MAP).map((c) => {
            const n = deskCounts[c.name] ?? 0;
            return (
              <Link
                key={c.slug}
                href={`/section/${c.slug}`}
                className="bg-paper p-3 transition-colors hover:bg-paper-2"
              >
                <span className="label-ui flex items-center justify-between gap-2" style={{ color: c.accent }}>
                  <span className="truncate">{c.name}</span>
                  <span className="text-ink-4">{n}</span>
                </span>
                <span className="mt-1 block font-ui text-[0.78rem] leading-snug text-ink-3">{c.blurb}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="recent-by-desk" className="mt-14">
        <SectionHead title="Latest from each desk" accent="#0b5a66" />
        <ul className="mt-4 space-y-4">
          {Array.from(byDesk.keys()).map((desk) => {
            const latest = getArticlesByAuthor(byDesk.get(desk)![0].id)[0];
            if (!latest) return null;
            return (
              <li key={desk} className="grid gap-1 border-b border-rule-3 pb-3 sm:grid-cols-[13rem_1fr] sm:gap-5">
                <span className="label-ui text-ink-4">{desk}</span>
                <span>
                  <Link
                    href={`/article/${latest.slug}`}
                    className="font-display text-[1.05rem] font-semibold leading-[1.18] text-ink hover:text-brand"
                  >
                    {latest.headline}
                  </Link>
                  <span className="label-meta mt-1 flex flex-wrap items-center gap-2">
                    <span>{byDesk.get(desk)![0].name}</span>
                    <Dot />
                    <span>{formatDateShort(latest.publishedAt)}</span>
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}