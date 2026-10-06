import type { Metadata } from "next";
import Link from "next/link";
import { getSourceFacets, getSourceRegister, countSources } from "@/lib/articles";
import { SOURCE_TYPE_LABELS } from "@/content/taxonomy";
import { formatDateShort } from "@/lib/format";
import { PageIntro, SectionHead, Dot } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Source Register",
  description:
    "Every publication, wire service, government release and institution NOT SCRIPTED used to establish facts, with the stories each one was used for.",
  path: "/sources",
});

export default function SourcesPage() {
  const register = getSourceRegister();
  const facets = getSourceFacets();

  const grouped = new Map<string, typeof register>();
  for (const s of register) {
    const arr = grouped.get(s.name) ?? [];
    arr.push(s);
    grouped.set(s.name, arr);
  }

  const hosts = new Set(register.map((s) => new URL(s.url).hostname.replace(/^www\./, "")));

  const byType = new Map<string, { name: string; count: number }[]>();
  for (const f of facets) {
    const sample = grouped.get(f.name)?.[0];
    const key: string = sample ? SOURCE_TYPE_LABELS[sample.type] : "Publication";
    const arr = byType.get(key) ?? [];
    arr.push(f);
    byType.set(key, arr);
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <PageIntro
        eyebrow="Transparency record"
        title="Source Register"
        dek="A complete index of the published material behind this archive. Every fact on this site was established against one or more of the sources listed here, and every article names the specific sources it used."
        meta={[
          { label: "Source references", value: `${countSources()}` },
          { label: "Distinct sources", value: `${facets.length}` },
          { label: "Distinct hosts", value: `${hosts.size}` },
        ]}
      />

      <section aria-labelledby="how-to-read" className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="border border-rule bg-paper-2/60 p-5">
          <h2 id="how-to-read" className="label-ui text-ink-4">
            How to read this
          </h2>
          <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
            <p>
              NOT SCRIPTED covers the same events other publications report on. It does not republish their
              work. Where a fact appears here, it was established independently against a source listed on
              this page or named at the foot of the relevant article.
            </p>
            <p>
              Source types are ranked. Official releases come first because they are the record of the
              decision itself. Wire services follow because they aggregate across jurisdictions on a
              deadline. Established publications come last because they involve one organisation&rsquo;s
              own reporting, which is reporting rather than record.
            </p>
            <p>
              The register is deliberately plain. It does not claim exclusive access to anything, and it
              does not treat a well-sourced fact as original. It records how this site knows what it knows.
            </p>
          </div>
        </div>
        <div className="border border-rule p-5">
          <h2 className="label-ui text-ink-4">Source categories</h2>
          <dl className="mt-3 space-y-2.5">
            {Object.entries(SOURCE_TYPE_LABELS).map(([k, v]) => (
              <div key={k} className="border-b border-rule-3 pb-2 last:border-b-0">
                <dt className="font-ui text-sm font-semibold text-ink">{v}</dt>
                <dd className="label-meta mt-0.5">
                  {byType.get(v)?.length ?? 0} distinct sources
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {Array.from(byType.entries()).map(([label, list]) => (
        <section key={label} aria-labelledby={`src-${label}`} className="mt-12">
          <div id={`src-${label}`} className="scroll-mt-20">
            <SectionHead title={label} kicker={`${list.length} sources`} accent="#1b3c86" />
          </div>
          <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => (
              <li key={s.name} className="border-t border-rule pt-2">
                <Link
                  href={`/archive?source=${encodeURIComponent(s.name)}`}
                  className="font-ui text-[0.92rem] font-semibold text-ink underline decoration-rule-2 underline-offset-4 transition-colors hover:text-brand"
                >
                  {s.name}
                </Link>
                <p className="label-meta mt-1 flex flex-wrap items-center gap-2">
                  <span>Used in {s.count} {s.count === 1 ? "story" : "stories"}</span>
                  <Dot />
                  <span>{sampleHost(grouped.get(s.name) ?? [])}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section aria-labelledby="all-refs" className="mt-14">
        <SectionHead
          title="Every reference, itemised"
          kicker={`${register.length} entries`}
          accent="#14181d"
        />
        <p className="mt-3 max-w-[76ch] font-ui text-[0.92rem] leading-relaxed text-ink-3">
          The register is long because the archive is long. Filter the archive by source instead of reading
          this table end to end &mdash; choosing an outlet there returns every story it was used for.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {facets.slice(0, 30).map((s) => (
            <Link
              key={s.name}
              href={`/archive?source=${encodeURIComponent(s.name)}`}
              className="label-ui inline-flex items-center gap-1.5 border border-rule px-2 py-1.5 text-ink-3 transition-colors hover:border-ink hover:text-ink"
            >
              {s.name}
              <span className="text-brand">{s.count}</span>
            </Link>
          ))}
        </div>
        <details className="mt-5 border border-rule">
          <summary className="label-ui cursor-pointer list-none bg-paper-2/70 px-4 py-3 text-ink-2 transition-colors hover:bg-paper-3">
            <span className="label-ui">Show all {register.length} references as a table</span>
          </summary>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[54rem] border-collapse text-left">
              <thead>
                <tr className="border-y border-ink">
                  <th scope="col" className="label-ui py-2 pr-4 text-ink-4">Source</th>
                  <th scope="col" className="label-ui py-2 pr-4 text-ink-4">Type</th>
                  <th scope="col" className="label-ui py-2 pr-4 text-ink-4">Published</th>
                  <th scope="col" className="label-ui py-2 pr-4 text-ink-4">Used in</th>
                </tr>
              </thead>
              <tbody>
                {register.map((s, i) => (
                  <tr key={`${s.url}-${i}`} className="border-b border-rule-3 align-top">
                    <td className="py-2 pr-4 font-ui text-[0.86rem]">
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink underline decoration-rule-2 underline-offset-4 hover:text-brand"
                      >
                        {s.name}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </td>
                    <td className="py-2 pr-4 label-meta">{SOURCE_TYPE_LABELS[s.type]}</td>
                    <td className="py-2 pr-4 label-meta whitespace-nowrap">
                      {s.date ? formatDateShort(s.date) : "undated"}
                    </td>
                    <td className="py-2 pr-4 font-ui text-[0.84rem] text-ink-3">
                      <Link href={`/article/${s.articleSlug}`} className="hover:text-brand hover:underline">
                        {s.articleTitle}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </section>
    </div>
  );
}

function sampleHost(entries: { url: string }[]): string {
  const first = entries[0]?.url;
  if (!first) return "";
  try {
    return new URL(first).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}