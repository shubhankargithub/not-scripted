import type { Metadata } from "next";
import Link from "next/link";
import { countArticles, countSources } from "@/lib/articles";
import { SITE } from "@/lib/site";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How NOT SCRIPTED handles information about readers. This site is statically generated, has no accounts, no login, no cookies and no user database, and collects nothing.",
  alternates: { canonical: "/privacy" },
};

const NOT_COLLECTED: string[] = [
  "Account details. There is no sign-up, no login and no profile. Nobody using this site has an account with us, because there is nowhere to create one.",
  "Server-side user records. This publication is statically generated. Articles are files served to your browser, and there is no database of readers behind them.",
  "Cookies set by this site. No cookie is written by NOT SCRIPTED for any purpose, including preferences, sessions and measurement.",
  "Location, device or contact lists. We do not hold address books, we do not ask for a phone number, and we do not retain mobile numbers from anyone.",
  "Behavioural profiles. No profile of you is assembled, stored, sold, shared or enriched.",
];

const WOULD_BE_DESCRIBED: string[] = [
  "Every analytics provider, named, with what each one measures and how long it is retained.",
  "Every advertising or measurement partner, named, with the categories of interest involved.",
  "The lawful basis relied on, and how long the data is kept before deletion.",
  "How to exercise access, correction and erasure rights.",
  "Any change to the above, described here before the change takes effect rather than afterwards.",
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <PageIntro
        eyebrow="Reader privacy"
        title="Privacy"
        dek="NOT SCRIPTED is a statically generated publication with no accounts, no login and no user database. It collects nothing about its readers, and this page says so in plain terms rather than in the language of a compliance template."
        meta={[
          { label: "Accounts", value: "None" },
          { label: "Cookies set", value: "None" },
          { label: "Analytics", value: "None enabled" },
          { label: "Advertising", value: "None" },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div>
          <section aria-labelledby="the-short-version">
            <h2 id="the-short-version" className="font-display text-[1.6rem] font-semibold leading-tight text-ink">
              The short version
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                Nothing on this site asks you to identify yourself. You can read every article, browse the whole
                archive and search it without an account, and nothing about you is written down. There is no
                newsletter database, because there is no working newsletter subscription. The forms on this site
                are static demonstrations and do not transmit data.
              </p>
              <p>
                The absence of data collection here is not a policy we might change quietly later. It is a
                consequence of how the site is built: the articles are files, and the only things that reach a
                server are the ordinary web requests your browser makes to fetch them.
              </p>
            </div>
          </section>

          <section aria-labelledby="what-we-do-not-collect" className="mt-10">
            <h2 id="what-we-do-not-collect" className="font-display text-[1.4rem] font-semibold leading-tight text-ink">
              What this site does not collect
            </h2>
            <ul className="mt-4 space-y-3">
              {NOT_COLLECTED.map((t) => (
                <li key={t} className="flex gap-3 border-b border-rule-3 pb-3 last:border-b-0 last:pb-0">
                  <span aria-hidden="true" className="mt-[7px] inline-block h-[7px] w-[7px] shrink-0 bg-brand" />
                  <span className="font-ui text-[0.96rem] leading-relaxed text-ink-2">{t}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="how-the-site-works" className="mt-10">
            <h2 id="how-the-site-works" className="font-display text-[1.4rem] font-semibold leading-tight text-ink">
              Article content is static and served as files
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                Every article in this archive is a file that was generated before you arrived. Your browser
                requests that file, and the file is returned. The article text does not change in response to
                who is asking for it, and nothing you type, click or search for changes the file you receive.
              </p>
              <p>
                That has a direct consequence worth stating: because no reader profile exists, there is nothing
                to breach. The archive holds {countArticles()} articles and {countSources()} source references. It
                holds no records of the people who read them.
              </p>
            </div>
          </section>

          <section aria-labelledby="analytics-and-advertising" className="mt-10">
            <h2 id="analytics-and-advertising" className="font-display text-[1.4rem] font-semibold leading-tight text-ink">
              Analytics and advertising
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                No analytics tool is installed on this site and no advertising is served. Nothing measures which
                pages you open, how long you stay, where you came from or where you go next.
              </p>
              <p>
                If either is ever introduced, it will be described here first, in the terms set out below, and
                the description will say what the tool is, what it collects and who processes it. This page is
                the record of that promise, which is why it is written to be amended rather than left to drift.
              </p>
            </div>
            <ul className="mt-4 space-y-2 border border-rule bg-paper-2/60 p-4">
              {WOULD_BE_DESCRIBED.map((t) => (
                <li key={t} className="flex gap-2.5 font-ui text-[0.9rem] leading-relaxed text-ink-2">
                  <span aria-hidden="true" className="mt-[8px] inline-block h-[5px] w-[5px] shrink-0 bg-ink-4" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="third-party-sites" className="mt-10">
            <h2 id="third-party-sites" className="font-display text-[1.4rem] font-semibold leading-tight text-ink">
              Links to other publications
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                Articles here link frequently to the sources they were established against, and the{" "}
                <Link href="/sources" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">
                  source register
                </Link>{" "}
                lists every one of them. Those links take you to other organisations&rsquo; websites. Once you
                have left this site, their privacy policies apply to you and NOT SCRIPTED has no control over
                them, no visibility of what they collect, and no ability to remove it.
              </p>
              <p>
                The same is true of the social channels linked in the footer. We are not responsible for how
                those platforms handle your information, and we would rather say that plainly than imply a
                control we do not have.
              </p>
            </div>
          </section>

          <section aria-labelledby="email-to-the-desk" className="mt-10">
            <h2 id="email-to-the-desk" className="font-display text-[1.4rem] font-semibold leading-tight text-ink">
              If you write to us
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                Email you send to the desk at{" "}
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="underline decoration-rule-2 underline-offset-4 hover:text-brand"
                >
                  {SITE.contactEmail}
                </a>{" "}
                or to the corrections address at{" "}
                <a
                  href={`mailto:${SITE.correctionsEmail}`}
                  className="underline decoration-rule-2 underline-offset-4 hover:text-brand"
                >
                  {SITE.correctionsEmail}
                </a>{" "}
                is used for one purpose only: to reply to you. It is not added to a mailing list, sold, shared,
                or used for marketing. Where a message contains a document that matters to the reporting, that
                document may be referred to in an article, in which case the article will say what it was
                established against.
              </p>
              <p>
                If you ask us to stop replying, or to delete what you sent, we will do it. We will keep a
                record of the fact that you asked, and nothing more than that.
              </p>
            </div>
          </section>

          <section aria-labelledby="cookies" className="mt-10">
            <h2 id="cookies" className="font-display text-[1.4rem] font-semibold leading-tight text-ink">
              Cookies
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                This site sets no cookies. Not for preferences, not for sessions, and not for measurement. A
                browser requesting a page from NOT SCRIPTED receives the page and nothing else from us.
              </p>
              <p>
                Where this site links to a social profile or an embedded document hosted elsewhere, that
                third party may set its own cookies once you follow the link. That is outside our control and
                is governed by their policies, not by this page.
              </p>
            </div>
          </section>

          <section aria-labelledby="asking-for-removal" className="mt-10">
            <h2 id="asking-for-removal" className="font-display text-[1.4rem] font-semibold leading-tight text-ink">
              Asking for removal
            </h2>
            <div className="prose-editorial dropcap-off mt-3 text-[1.02rem]">
              <p>
                There is very little to remove, which is the point. If you have written to the desk and want
                your message deleted, or your address forgotten, write to{" "}
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="underline decoration-rule-2 underline-offset-4 hover:text-brand"
                >
                  {SITE.contactEmail}
                </a>{" "}
                from the address concerned and say what you would like removed.
              </p>
              <p>
                One limit is worth being explicit about. If you have sent us a document that is the basis of a
                published article, we will not erase the article, or the fact that the document exists, in
                order to remove your details. Reporting has to be able to stand after the reporter has moved on.
                What we will do is stop quoting you, withdraw your name from future work, and remove personal
                details that carry no journalistic weight.
              </p>
            </div>
            <p className="mt-4 font-ui text-[0.88rem] leading-relaxed text-ink-3">
              Questions about this page can go to the{" "}
              <Link href="/contact" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">
                contact the desk
              </Link>
              . The terms that govern use of the site are set out in the{" "}
              <Link href="/terms" className="underline decoration-rule-2 underline-offset-4 hover:text-brand">
                terms of use
              </Link>
              .
            </p>
          </section>
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="at-a-glance" className="border border-rule p-5">
            <h2 id="at-a-glance" className="label-ui border-b border-ink pb-2 text-ink-4">
              Privacy at a glance
            </h2>
            <dl className="mt-3 space-y-2.5 font-ui text-[0.88rem]">
              {[
                ["Accounts", "None"],
                ["Login", "None"],
                ["User database", "None"],
                ["Cookies set", "None"],
                ["Analytics", "None"],
                ["Advertising", "None"],
                ["Mailing list", "None"],
                ["Server-side reader records", "None"],
                ["Static articles", `${countArticles()}`],
                ["Source references", `${countSources()}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-rule-3 pb-2">
                  <dt className="label-ui text-ink-4">{k}</dt>
                  <dd className="text-right text-ink-2">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="hosting-note" className="border border-rule p-5">
            <h2 id="hosting-note" className="label-ui border-b border-ink pb-2 text-ink-4">
              Hosting and server logs
            </h2>
            <p className="mt-3 font-ui text-[0.85rem] leading-relaxed text-ink-2">
              This site is served from a hosting provider. As with any web host, the provider processes the
              ordinary technical information required to deliver a page &mdash; the request, the file returned
              and the response time &mdash; for the purpose of operating the network. That is hosting, not
              audience measurement, and it is not under the control of this newsroom. We do not use it to build
              a picture of readers.
            </p>
          </section>

          <section aria-labelledby="data-requests" className="border border-brand bg-brand-wash p-5">
            <h2 id="data-requests" className="label-ui text-brand">
              Ask us anything
            </h2>
            <p className="mt-2 font-ui text-[0.88rem] leading-relaxed text-ink-2">
              If you want to know whether anything at all is held about you, or you want it removed, write and
              the desk will answer plainly.
            </p>
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="label-ui mt-3 inline-block border border-brand bg-brand px-3 py-2 text-paper transition-colors hover:bg-brand-2"
            >
              {SITE.contactEmail}
            </a>
          </section>

          <section aria-labelledby="privacy-links" className="border border-rule p-5">
            <h2 id="privacy-links" className="label-ui border-b border-ink pb-2 text-ink-4">
              Read next
            </h2>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Terms of use", href: "/terms" },
                { label: "Contact the desk", href: "/contact" },
                { label: "Editorial standards", href: "/editorial-standards" },
                { label: "How we source", href: "/sources" },
                { label: "Corrections log", href: "/corrections" },
                { label: "The daily briefing", href: "/newsletter" },
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

          <section aria-labelledby="version-note" className="border border-rule bg-paper-2/70 p-5">
            <h2 id="version-note" className="label-ui text-ink-4">
              Status of this policy
            </h2>
            <p className="mt-2 font-ui text-[0.85rem] leading-relaxed text-ink-2">
              This policy describes the site as it currently stands. It is not a generic template: it describes
              a publication that runs no analytics, sets no cookies and holds no reader database, and it says
              so in those terms rather than in the language of a form.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
