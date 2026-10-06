import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { PageIntro, SectionHead, Dot } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact the Desk",
  description:
    "How to reach the NOT SCRIPTED newsroom in Bengaluru: the desk address, what to send, and where to write for tips, corrections, letters and commercial enquiries.",
  alternates: { canonical: "/contact" },
};

const DESKS: { label: string; email: string; note: string }[] = [
  {
    label: "The main desk",
    email: SITE.contactEmail,
    note: "Everything else. General enquiries, speaking to the reference desk, requests to speak on the record, and administrative queries about this publication.",
  },
  {
    label: "Corrections",
    email: SITE.correctionsEmail,
    note: "Errors in articles already published. Please include the article URL and the source that shows the error. Every report is read and answered.",
  },
];

const WHAT_TO_SEND: { label: string; body: string; href?: string; linkLabel?: string }[] = [
  {
    label: "Tips",
    body:
      "A document, a dataset, a contract, a photograph, an internal memo, a recording, or a first-hand account of something that has happened. Send what you have rather than a summary of it. Tell us how you came by it and whether you are able to share it in full. If you are not able to speak on the record, say so at the outset rather than at the end: it changes what we can do with what you send, and it is better to know before we begin.",
  },
  {
    label: "Leads and stories",
    body:
      "What the desk should be looking at, and why it matters this week rather than next. A lead is not a finished story and we do not treat it as one. Nothing is commissioned on the strength of an email, and nothing is published because a claim was interesting.",
  },
  {
    label: "Corrections",
    body:
      "A factual error in something already published. The most useful corrections include the article URL and a source that establishes the correct position. Corrections are logged publicly on the corrections page and applied to the article with a timestamp.",
    href: "/corrections",
    linkLabel: "Read the corrections policy",
  },
  {
    label: "Letters",
    body:
      "Responses, disagreements and considered objections to our reporting. We publish letters that engage with the reporting rather than those that merely repeat it, and we do not publish anonymous correspondence. A letter is a letter to the editor: it does not become an article and it does not carry the publication&rsquo;s authority.",
  },
  {
    label: "Commercial",
    body:
      "Advertising, syndication, licensing, events and partnerships are handled at the Bengaluru office. Describe the product, the audience you want to reach and the dates you need, and someone will reply. The newsroom does not handle commercial enquiries and should not be used as a route to it.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Will you publish my letter?",
    a: "If it engages with the reporting and is signed, we will consider it. We do not publish anonymous letters, and we do not publish a letter that repeats a claim already made in the article without adding to it.",
  },
  {
    q: "Can I remain anonymous?",
    a: "Not unilaterally. If you need your identity protected, that has to be agreed with the desk before publication and not requested afterwards. Where a source is anonymised at all, the article says so and explains why. This publication does not publish an unnamed source presented as though it existed.",
  },
  {
    q: "Can you remove an article?",
    a: "Rarely, and never simply because a subject dislikes it. Genuine legal threats, and identifiable factual errors, are dealt with as described in the corrections policy. Disagreement with our conclusions is not grounds for removal.",
  },
  {
    q: "Do you pay for information?",
    a: "No. The newsroom does not pay for coverage and does not accept payment for it. See the note on payment below.",
  },
  {
    q: "Can you take down a link to another publication?",
    a: "No, provided the link is to the source as published and the summary is attributed. The source register exists so that a reader can go to the original and judge our account against it.",
  },
  {
    q: "How quickly do you reply?",
    a: "The desk reads what arrives and prioritises corrections and verifiable tips above everything else. A reply is not guaranteed on every message, and a follow-up after a week is reasonable if nothing has come back.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <PageIntro
        eyebrow="Write to the newsroom"
        title="Contact the Desk"
        dek="The NOT SCRIPTED desk is in Bengaluru and reads everything that arrives. Write plainly, say what you have and what you cannot say, and the desk will tell you where it can go."
        meta={[
          { label: "Registered office", value: "Bengaluru 560001" },
          { label: "Desk address", value: SITE.contactEmail },
          { label: "Corrections", value: SITE.correctionsEmail },
          { label: "Reply policy", value: "Read and answered" },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div>
          <section aria-labelledby="where-we-are" className="border border-rule bg-paper-2/60 p-5 sm:p-6">
            <h2 id="where-we-are" className="label-ui text-ink-4">
              The address
            </h2>
            <address className="mt-3 not-italic">
              <p className="font-display text-[1.25rem] font-semibold leading-snug text-ink">
                {SITE.addressLines[0]}
              </p>
              {SITE.addressLines.slice(1).map((l) => (
                <p key={l} className="mt-0.5 font-ui text-[0.95rem] leading-relaxed text-ink-2">
                  {l}
                </p>
              ))}
            </address>
            <dl className="mt-5 space-y-3 border-t border-rule-2 pt-4">
              {DESKS.map((d) => (
                <div key={d.email}>
                  <dt className="label-ui text-ink-4">{d.label}</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${d.email}`}
                      className="font-ui text-[0.98rem] font-semibold text-ink underline decoration-rule-2 underline-offset-4 transition-colors hover:text-brand"
                    >
                      {d.email}
                    </a>
                    <p className="mt-1 max-w-[64ch] font-ui text-[0.85rem] leading-relaxed text-ink-3">{d.note}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="what-to-send" className="mt-12">
            <SectionHead title="What to send, and where" kicker="Five kinds of message" accent="#c21f17" />
            <div className="mt-5 space-y-6">
              {WHAT_TO_SEND.map((w) => (
                <div key={w.label}>
                  <div className="flex items-baseline gap-4 border-b-[3px] border-ink pb-2">
                    <h3 className="font-display text-[1.25rem] font-semibold leading-tight text-ink">{w.label}</h3>
                  </div>
                  <p className="mt-3 max-w-[74ch] font-ui text-[0.97rem] leading-relaxed text-ink-2">{w.body}</p>
                  {w.href && w.linkLabel ? (
                    <p className="mt-2 font-ui text-[0.88rem] text-ink-3">
                      <Link
                        href={w.href}
                        className="underline decoration-rule-2 underline-offset-4 transition-colors hover:text-brand"
                      >
                        {w.linkLabel}
                      </Link>
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="payment-and-sources" className="mt-12">
            <SectionHead title="Two things the desk will say no to" kicker="Stated plainly" accent="#7a1f3d" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="border border-rule p-4">
                <h3 className="label-ui text-ink-4">No payment for coverage</h3>
                <p className="mt-2 font-ui text-[0.9rem] leading-relaxed text-ink-2">
                  The newsroom does not accept payment, consideration, hospitality or reciprocal advertising in
                  exchange for coverage, and it does not run paid content. Commercial relationships are handled
                  at the office and are kept away from the desk. If a story is reported, it is reported because
                  the desk judged it worth reporting.
                </p>
              </div>
              <div className="border border-rule p-4">
                <h3 className="label-ui text-ink-4">No anonymity by request alone</h3>
                <p className="mt-2 font-ui text-[0.9rem] leading-relaxed text-ink-2">
                  A source is not anonymised on request after the fact. Any protection of a source&rsquo;s
                  identity has to be agreed with the desk in advance, and where it is agreed the article states
                  that the source is not named and why. This publication does not present an unnamed source as
                  though it existed.
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="write-to-us" className="border border-rule p-5">
            <h2 id="write-to-us" className="label-ui border-b border-ink pb-2 text-ink-4">
              Compose a message
            </h2>
            <p id="form-note" className="mt-3 border border-dashed border-rule-2 bg-paper-2/60 p-3 font-ui text-[0.82rem] leading-relaxed text-ink-2">
              This form is a static demonstration. It is not connected to a server action and it does not
              transmit data. Nothing you type here is sent, stored or read. To reach the desk, use the mailto
              address below.
            </p>
            <form
              action={`mailto:${SITE.contactEmail}`}
              method="post"
              encType="text/plain"
              className="mt-4 space-y-3"
              aria-describedby="form-note"
            >
              <div>
                <label htmlFor="contact-name" className="label-ui mb-1 block text-ink-4">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  aria-describedby="form-note"
                  className="w-full border border-rule-2 bg-white px-3 py-2.5 font-ui text-sm text-ink outline-none placeholder:text-ink-4 focus:border-ink"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="label-ui mb-1 block text-ink-4">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-describedby="form-note"
                  className="w-full border border-rule-2 bg-white px-3 py-2.5 font-ui text-sm text-ink outline-none placeholder:text-ink-4 focus:border-ink"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="label-ui mb-1 block text-ink-4">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  aria-describedby="form-note"
                  className="w-full border border-rule-2 bg-white px-3 py-2.5 font-ui text-sm text-ink outline-none placeholder:text-ink-4 focus:border-ink"
                />
              </div>
              <div>
                <label htmlFor="contact-desk" className="label-ui mb-1 block text-ink-4">
                  Enquiry
                </label>
                <select
                  id="contact-desk"
                  name="enquiry"
                  defaultValue="tips"
                  aria-describedby="form-note"
                  className="w-full border border-rule-2 bg-white px-3 py-2.5 font-ui text-sm text-ink outline-none focus:border-ink"
                >
                  <option value="tips">Tips and documents</option>
                  <option value="leads">Story leads</option>
                  <option value="corrections">Corrections</option>
                  <option value="letters">Letters to the editor</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="label-ui mb-1 block text-ink-4">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  aria-describedby="form-note"
                  className="w-full resize-y border border-rule-2 bg-white px-3 py-2.5 font-ui text-sm text-ink outline-none placeholder:text-ink-4 focus:border-ink"
                />
              </div>
              <button
                type="submit"
                aria-describedby="form-note"
                className="label-ui w-full bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-brand"
              >
                Demonstration form &mdash; not connected
              </button>
            </form>
            <p className="mt-4 font-ui text-[0.85rem] leading-relaxed text-ink-2">
              To send a real message, write to{" "}
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="font-semibold text-ink underline decoration-rule-2 underline-offset-4 hover:text-brand"
              >
                {SITE.contactEmail}
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="faq" className="border border-rule p-5">
            <h2 id="faq" className="label-ui border-b border-ink pb-2 text-ink-4">
              Common questions
            </h2>
            <dl className="mt-3 space-y-3">
              {FAQ.map((f) => (
                <div key={f.q} className="border-b border-rule-3 pb-3 last:border-b-0 last:pb-0">
                  <dt className="font-ui text-[0.9rem] font-semibold text-ink">{f.q}</dt>
                  <dd className="mt-1 font-ui text-[0.85rem] leading-relaxed text-ink-3">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="contact-links" className="border border-rule p-5">
            <h2 id="contact-links" className="label-ui border-b border-ink pb-2 text-ink-4">
              Read next
            </h2>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Editorial standards", href: "/editorial-standards" },
                { label: "How we source", href: "/sources" },
                { label: "Corrections log", href: "/corrections" },
                { label: "Newsroom & bylines", href: "/newsroom" },
                { label: "About NOT SCRIPTED", href: "/about" },
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

          <section aria-labelledby="follow-note" className="border border-rule bg-paper-2/70 p-5">
            <h2 id="follow-note" className="label-ui text-ink-4">
              Following the desk
            </h2>
            <p className="mt-2 font-ui text-[0.85rem] leading-relaxed text-ink-2">
              Nothing you send to the desk is treated as a subscription. For the feed, use{" "}
              <Link href="/newsletter" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">
                the daily briefing
              </Link>{" "}
              or subscribe to <Link href="/feed.xml" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">RSS</Link>
              .
            </p>
            <p className="label-meta mt-3 flex items-center gap-2">
              <span>{SITE.domain}</span>
              <Dot />
              <span>Bengaluru</span>
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
