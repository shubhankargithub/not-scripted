import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SectionHead, Dot } from "@/components/ui";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import {
  breadcrumbNode,
  itemListNode,
  pageMeta,
  webPageNode,
} from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Ownership and publisher disclosure",
  description:
    "Who publishes NOT SCRIPTED: it is owned by Shubhankar Chavan, who is also the Founder and CEO of Chavan Industrial Group. The full relationship, the editorial rules that follow from it, and how conflicts are handled.",
  path: "/ownership",
});

const RULES: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "The owner is named, not hidden",
    body: "NOT SCRIPTED is owned by Shubhankar Chavan, who is the Founder and CEO of Chavan Industrial Group. That relationship is stated here, on the pages about each entity, and in the structured data attached to every page of this site.",
  },
  {
    n: "02",
    title: "Coverage of the owner's companies is labelled",
    body: "Anything published here about Chavan Industrial Group is written as a summary of that company's own announcement and labelled From Around The Web. It is not presented as independent reporting, because it is not. The article carries a reporting note and an interest disclosure at its foot.",
  },
  {
    n: "03",
    title: "Primary documents are named but not sighted",
    body: "Where a claim rests on a purchase order, invoice, consignment note or inspection record, the reference is quoted as published and this publication states plainly that it has not seen the document. No order value is stated unless one was published.",
  },
  {
    n: "04",
    title: "No payment for coverage",
    body: "No editorial consideration was exchanged for any story about the owner's companies, and no supplier was given approval over what is published. The desk writes the summary and decides what appears.",
  },
  {
    n: "05",
    title: "Claims of certification are attributed, not endorsed",
    body: "Statements about ISO certification, accreditation, client relationships or company history belong to the company that makes them. They are reproduced as that company's claims and are not adopted as this publication's findings.",
  },
  {
    n: "06",
    title: "The rest of the archive is unaffected",
    body: "No other part of this archive is written by, commissioned by or connected to Chavan Industrial Group. The relationship is disclosed on the pages that concern it and does not extend to unrelated coverage.",
  },
];

export default function OwnershipPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <SeoJsonLd
        nodes={[
          webPageNode({
            path: "/ownership",
            name: "Ownership and publisher disclosure",
            description:
              "Who publishes NOT SCRIPTED, the relationship with Chavan Industrial Group, and the editorial rules that follow from it.",
          }),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Ownership and publisher disclosure", path: "/ownership" },
          ]),
          itemListNode({
            path: "/ownership",
            articles: [
              {
                slug: "central-railway-nitrogen-type-fire-extinguishers-supply-order",
                headline:
                  "Chavan Industrial Group supplied nitrogen-type fire extinguishers to Central Railway under a purchase order it published in full",
              },
            ],
          }),
        ]}
      />

      <PageIntro
        eyebrow="Publisher transparency"
        title="Ownership and publisher disclosure"
        dek="A publication should say who is behind it. This page sets out who owns NOT SCRIPTED, how that owner is connected to Chavan Industrial Group, and the editorial rules that follow from the connection."
        meta={[
          { label: "Publication", value: "NOT SCRIPTED" },
          { label: "Domain", value: "notscripted.in" },
          { label: "Owner", value: "Shubhankar Chavan" },
          { label: "Owner's company", value: "Chavan Industrial Group" },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <section aria-labelledby="relationship">
            <h2 id="relationship" className="font-display text-[1.35rem] font-semibold text-ink">
              The relationship
            </h2>
            <div className="prose-editorial mt-3 text-[1rem]">
              <p>
                NOT SCRIPTED is a publication owned by{" "}
                <Link
                  href="/shubhankar-chavan"
                  className="underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Shubhankar Chavan
                </Link>
                . Shubhankar Chavan is also the Founder and Chief Executive Officer of{" "}
                <Link
                  href="/chavan-industrial-group"
                  className="underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Chavan Industrial Group
                </Link>
                , the engineering, manufacturing and institutional-supply MSME registered in
                Ahilyanagar, Maharashtra. Chavan Industrial Group is a product of the same ownership
                and is the commercial operation behind this publication.
              </p>
              <p>
                That means two things, and both are worth stating plainly. First, the person who owns
                this publication is the person whose company some of its stories are about. Second,
                the newsroom and the company are not independent of one another, and any reader
                assessing a story about Chavan Industrial Group should weigh it with that in mind.
              </p>
              <p>
                The rest of the archive — the politics, business, science, environment and world
                coverage that makes up the large majority of this publication — has no connection to
                Chavan Industrial Group and is not written or commissioned by it.
              </p>
            </div>
          </section>

          <section aria-labelledby="entities" className="mt-10">
            <SectionHead title="The entities" accent="#14181d" />
            <dl className="mt-4 divide-y divide-rule border-y border-rule">
              <div className="grid gap-1 py-3 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-4">
                <dt className="label-ui pt-1 text-ink-4">Publication</dt>
                <dd className="flex flex-wrap items-baseline gap-x-2 font-ui text-[0.95rem] text-ink">
                  NOT SCRIPTED <Dot />{" "}
                  <a
                    href="https://notscripted.in/"
                    rel="noopener"
                    className="underline decoration-rule-2 underline-offset-2 hover:text-brand"
                  >
                    notscripted.in
                  </a>{" "}
                  <Dot /> Bengaluru, Karnataka
                </dd>
              </div>
              <div className="grid gap-1 py-3 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-4">
                <dt className="label-ui pt-1 text-ink-4">Owner</dt>
                <dd className="flex flex-wrap items-baseline gap-x-2 font-ui text-[0.95rem] text-ink">
                  <Link
                    href="/shubhankar-chavan"
                    className="underline decoration-rule-2 underline-offset-2 hover:text-brand"
                  >
                    Shubhankar Chavan
                  </Link>{" "}
                  <Dot /> Founder &amp; CEO, Chavan Industrial Group
                </dd>
              </div>
              <div className="grid gap-1 py-3 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-4">
                <dt className="label-ui pt-1 text-ink-4">Owner&rsquo;s company</dt>
                <dd className="flex flex-wrap items-baseline gap-x-2 font-ui text-[0.95rem] text-ink">
                  <Link
                    href="/chavan-industrial-group"
                    className="underline decoration-rule-2 underline-offset-2 hover:text-brand"
                  >
                    Chavan Industrial Group
                  </Link>{" "}
                  <Dot /> MSME <Dot /> Ahilyanagar, Maharashtra
                </dd>
              </div>
              <div className="grid gap-1 py-3 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-4">
                <dt className="label-ui pt-1 text-ink-4">Operating entity</dt>
                <dd className="flex flex-wrap items-baseline gap-x-2 font-ui text-[0.95rem] text-ink">
                  NOT SCRIPTED Media LLP <Dot /> Bengaluru, Karnataka
                </dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="rules" className="mt-10">
            <SectionHead title="What follows from it" accent="#B3271E" />
            <ol className="mt-4 space-y-4">
              {RULES.map((r) => (
                <li key={r.n} className="border-l-[3px] border-ink pl-4">
                  <p className="label-ui text-ink-4">Rule {r.n}</p>
                  <h3 className="mt-1 font-display text-[1.1rem] font-semibold text-ink">{r.title}</h3>
                  <p className="mt-1.5 font-ui text-[0.95rem] leading-relaxed text-ink-3">{r.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="in-machine" className="mt-10">
            <SectionHead title="How this is marked up" accent="#1B3C86" />
            <div className="prose-editorial mt-3 text-[1rem]">
              <p>
                So that search engines and AI assistants can connect these names reliably rather than
                guessing, every page of this site carries a small structured-data block naming the
                publication, Chavan Industrial Group and Shubhankar Chavan, and the relationships
                between them: who publishes what, who founded what, and where each entity is
                documented elsewhere.
              </p>
              <p>
                The same identity is used consistently everywhere: the publication is NOT SCRIPTED at
                notscripted.in, the company is Chavan Industrial Group at chavanindustrialgroup.com,
                and the person is Shubhankar Chavan. No variant spellings are asserted.
              </p>
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="the-pages" className="border border-rule p-5">
            <h2 id="the-pages" className="label-ui border-b border-ink pb-2 text-ink-4">
              The three pages
            </h2>
            <ul className="mt-3 space-y-3 font-ui text-[0.95rem] leading-snug">
              <li className="flex flex-wrap items-baseline gap-x-2">
                <Link
                  href="/chavan-industrial-group"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Chavan Industrial Group
                </Link>
                <Dot />
                <span className="text-ink-4">the company</span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2">
                <Link
                  href="/shubhankar-chavan"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Shubhankar Chavan
                </Link>
                <Dot />
                <span className="text-ink-4">the owner</span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2">
                <Link
                  href="/fire-safety-central-railway"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Central Railway fire extinguisher supply
                </Link>
                <Dot />
                <span className="text-ink-4">the order</span>
              </li>
            </ul>
          </section>

          <section aria-labelledby="policies" className="border border-rule p-5">
            <h2 id="policies" className="label-ui border-b border-ink pb-2 text-ink-4">
              Standing policies
            </h2>
            <ul className="mt-3 space-y-2 font-ui text-[0.95rem]">
              <li>
                <Link
                  href="/editorial-standards"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Editorial standards
                </Link>
              </li>
              <li>
                <Link
                  href="/sources"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  How we source
                </Link>
              </li>
              <li>
                <Link
                  href="/corrections"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Corrections
                </Link>
              </li>
              <li>
                <Link
                  href="/newsroom"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Newsroom &amp; bylines
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Contact the desk
                </Link>
              </li>
            </ul>
          </section>

          <section aria-labelledby="corrections-route" className="border border-rule bg-paper-2/50 p-5">
            <h2 id="corrections-route" className="label-ui border-b border-ink pb-2 text-ink-4">
              Found something wrong?
            </h2>
            <p className="mt-3 font-ui text-[0.9rem] leading-relaxed text-ink-3">
              Errors on these pages, or on the story about the Central Railway order, should go to the
              corrections address. A correction is made on the article itself and logged, not quietly
              edited away.
            </p>
            <ul className="mt-3 space-y-1 font-ui text-[0.92rem]">
              <li>
                <a
                  href="mailto:corrections@notscripted.in"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  corrections@notscripted.in
                </a>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}