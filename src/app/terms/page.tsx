import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { PageIntro } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms of Use",
  description:
    "The terms governing use of NOT SCRIPTED: who owns the journalism, what may be quoted and linked, what this publication is not, and what it does not warrant.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <PageIntro
        eyebrow="The fine print"
        title="Terms of Use"
        dek="What you may do with the journalism published here, what you may not, and the limits of what this publication warrants. Written to be read rather than to be survived."
        meta={[
          { label: "Publisher", value: SITE.addressLines[0] },
          { label: "Applies to", value: SITE.domain },
          { label: "Law", value: "India" },
          { label: "Related", value: "Privacy & corrections" },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div>
          <section aria-labelledby="who-publishes">
            <h2 id="who-publishes" className="font-display text-[1.5rem] font-semibold leading-tight text-ink">
              Who publishes this
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                NOT SCRIPTED is published by NOT SCRIPTED Media LLP, a limited liability partnership registered
                in India, with its registered office in Bengaluru. These terms govern your use of the site at{" "}
                {SITE.domain} and of the material published on it. Using the site means accepting them.
              </p>
            </div>
          </section>

          <section aria-labelledby="copyright" className="mt-10">
            <h2 id="copyright" className="font-display text-[1.5rem] font-semibold leading-tight text-ink">
              Copyright in the journalism
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                Original journalism published by NOT SCRIPTED &mdash; the writing, the headlines, the summaries,
                the analysis, the editorial apparatus around each article &mdash; is the copyright of NOT SCRIPTED
                Media LLP. It is protected by Indian copyright law, and it may not be republished in whole or in
                substantial part without permission.
              </p>
              <p>
                Short quotation, with attribution and a link, is welcome and needs no permission. So is
                translation. Republishing the archive in bulk &mdash; scraping the full index, mirroring the
                collection, or running a copy of the site &mdash; is not something these terms grant.
              </p>
            </div>
          </section>

          <section aria-labelledby="quoted-material" className="mt-10">
            <h2 id="quoted-material" className="font-display text-[1.5rem] font-semibold leading-tight text-ink">
              Quoted material belongs to its publishers
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                NOT SCRIPTED quotes and summarises material published by other organisations: official releases,
                wire copy, reports, datasets, research papers and the work of other publications. That material
                remains the property of the organisation that published it. NOT SCRIPTED holds no claim over it
                and grants no rights in it.
              </p>
              <p>
                Where this site reproduces or relies on such material, it does so under the fair dealing
                provisions of Indian copyright law, for the purposes of reporting, criticism, review and
                commentary. Every such use is attributed by name, dated where the original is dated, and linked
                to the original. The{" "}
                <Link href="/sources" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">
                  source register
                </Link>{" "}
                lists every source used across the archive, and each article names its own sources at the foot.
              </p>
              <p>
                Rights holders who believe material of theirs has been used beyond fair dealing should write to{" "}
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="underline decoration-rule-2 underline-offset-4 hover:text-brand"
                >
                  {SITE.contactEmail}
                </a>{" "}
                with the article URL and the passage in question. Such requests are dealt with by the desk.
              </p>
            </div>
          </section>

          <section aria-labelledby="our-own-text" className="mt-10">
            <h2 id="our-own-text" className="font-display text-[1.5rem] font-semibold leading-tight text-ink">
              The summaries are our own text
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                Articles labelled <em>From Around The Web</em> are summaries written by NOT SCRIPTED. They are
                NOT SCRIPTED&rsquo;s own prose, not the original publisher&rsquo;s text, and not a substitute for
                the reporting they summarise. They may be quoted with attribution to NOT SCRIPTED and a link to
                the article. What may not be done is passing them off as the work of the outlet whose reporting
                they summarise, which is precisely what the type label exists to prevent.
              </p>
              <p>
                The same applies to articles elsewhere on the site. A fact taken from a published source is not
                this publication&rsquo;s property merely because this publication has written about it. Where an
                article carries an error, the{" "}
                <Link href="/corrections" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">
                  corrections log
                </Link>{" "}
                records what was amended and when.
              </p>
            </div>
          </section>

          <section aria-labelledby="no-advice" className="mt-10">
            <h2 id="no-advice" className="font-display text-[1.5rem] font-semibold leading-tight text-ink">
              No financial, legal or professional advice
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                Nothing published here is financial, legal, medical or professional advice. Articles on business,
                markets, technology, health and public policy are journalism, not recommendations. They do not
                take account of any reader&rsquo;s circumstances, and a reader should consult a qualified
                adviser before acting on any financial, legal, medical or other professional question.
              </p>
              <p>
                Analysis and opinion articles are labelled as such and represent the view of the named
                columnist, not of the publication&rsquo;s editors as a whole.
              </p>
            </div>
          </section>

          <section aria-labelledby="no-warranty" className="mt-10">
            <h2 id="no-warranty" className="font-display text-[1.5rem] font-semibold leading-tight text-ink">
              No warranty of accuracy beyond the sources recorded
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                NOT SCRIPTED warrants nothing beyond what its own articles state: that each article was
                established against the sources named on it, at the time of publication. It makes no general
                warranty that the material is complete, exhaustive, fit for any purpose, or error-free. Facts
                change after publication; readers are expected to treat this as a dated archive rather than as a
                current state of the world.
              </p>
              <p>
                Where sources disagree, this publication reports the disagreement rather than resolving it, and
                says so. Where an article is retrospective, it says so in a reporting note. These labels are
                part of the terms on which the material is offered: to rely on an article without reading its
                labels and its source list is to rely on it in circumstances it was not written for.
              </p>
            </div>
          </section>

          <section aria-labelledby="linking" className="mt-10">
            <h2 id="linking" className="font-display text-[1.5rem] font-semibold leading-tight text-ink">
              Linking is welcome
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                Link to NOT SCRIPTED freely. Use the headline as the anchor text, keep the link to the article
                itself rather than to a cached copy, and attribute it to NOT SCRIPTED. Do not present the
                publication&rsquo;s name in a way that suggests endorsement of your site or its contents, and do
                not imply that NOT SCRIPTED has granted an arrangement it has not.
              </p>
            </div>
          </section>

          <section aria-labelledby="third-parties" className="mt-10">
            <h2 id="third-parties" className="font-display text-[1.5rem] font-semibold leading-tight text-ink">
              Third-party content
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                NOT SCRIPTED is not responsible for the content of any third-party site it links to, including
                the publications, institutions and platforms recorded in the source register. Those
                organisations&rsquo; claims are theirs, not ours, and their policies &mdash; privacy, cookies,
                terms &mdash; govern your visit to their sites. A link is an act of citation, not an endorsement.
              </p>
              <p>
                These terms are governed by the law of India. Disputes are subject to the courts at Bengaluru,
                Karnataka. How this site handles any information you send it is set out separately in the{" "}
                <Link href="/privacy" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="summary" className="border border-rule p-5">
            <h2 id="summary" className="label-ui border-b border-ink pb-2 text-ink-4">
              In brief
            </h2>
            <ul className="mt-3 space-y-2.5">
              {[
                "NOT SCRIPTED Media LLP publishes the site and owns the original journalism.",
                "Short quotation and linking with attribution need no permission.",
                "Quoted material belongs to its publishers and is used under fair dealing, attributed and linked.",
                "Summaries written by NOT SCRIPTED are NOT SCRIPTED&rsquo;s own text and are quoted as ours.",
                "Nothing here is financial, legal, medical or professional advice.",
                "Accuracy is warranted only against the sources recorded on each article.",
                "NOT SCRIPTED is not responsible for third-party content it links to.",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 border-b border-rule-3 pb-2.5 last:border-b-0 last:pb-0">
                  <span aria-hidden="true" className="mt-[8px] inline-block h-[5px] w-[5px] shrink-0 bg-brand" />
                  <span className="font-ui text-[0.86rem] leading-relaxed text-ink-2">{t}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="publisher" className="border border-rule p-5">
            <h2 id="publisher" className="label-ui border-b border-ink pb-2 text-ink-4">
              The publisher
            </h2>
            <address className="mt-3 not-italic font-ui text-[0.85rem] leading-relaxed text-ink-2">
              <span className="block font-display text-[1.05rem] font-semibold text-ink">{SITE.addressLines[0]}</span>
              {SITE.addressLines.slice(1).map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <p className="mt-3 font-ui text-[0.85rem] leading-relaxed text-ink-2">
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="underline decoration-rule-2 underline-offset-4 hover:text-brand"
              >
                {SITE.contactEmail}
              </a>
            </p>
            <p className="mt-3 font-ui text-[0.8rem] leading-relaxed text-ink-3">
              Correspondence about these terms, or a rights request concerning quoted material, should be
              addressed to the desk with the article URL.
            </p>
          </section>

          <section aria-labelledby="related-terms" className="border border-rule p-5">
            <h2 id="related-terms" className="label-ui border-b border-ink pb-2 text-ink-4">
              Read next
            </h2>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Privacy policy", href: "/privacy" },
                { label: "Corrections log", href: "/corrections" },
                { label: "Editorial standards", href: "/editorial-standards" },
                { label: "How we source", href: "/sources" },
                { label: "Contact the desk", href: "/contact" },
                { label: "The full archive", href: "/archive" },
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

          <section aria-labelledby="fair-dealing-note" className="border border-rule bg-paper-2/70 p-5">
            <h2 id="fair-dealing-note" className="label-ui text-ink-4">
              On fair dealing
            </h2>
            <p className="mt-2 font-ui text-[0.85rem] leading-relaxed text-ink-2">
              Fair dealing is not a licence a publisher grants itself. It is a statutory exception, and a claim
              that material has been used beyond it is a matter for the courts, not for this newsroom to
              adjudicate. What this publication undertakes is procedural: attribution, dating, a link to the
              original, and a route for a rights holder to reach the desk.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
