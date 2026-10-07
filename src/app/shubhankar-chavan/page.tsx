import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SectionHead, Dot } from "@/components/ui";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { breadcrumbNode, pageMeta, webPageNode, OWNER_ID } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Shubhankar Chavan",
  description:
    "Shubhankar Chavan (Shubhankar Rahul Chavan) is the Founder and CEO of Chavan Industrial Group, an MSME in Ahilyanagar, Maharashtra, and the owner of NOT SCRIPTED. His education, roles, certifications and public work.",
  path: "/shubhankar-chavan",
});

const ROLES: { when: string; role: string; org: string; detail: string }[] = [
  {
    when: "From July 2026",
    role: "Business Development Executive",
    org: "Intellipaat Software Solutions Pvt Ltd",
    detail:
      "Business growth through client acquisition and relationship management, identifying opportunities in the technology education sector, running the sales cycle from lead generation to closure, and building partnerships with enterprise clients.",
  },
  {
    when: "January 2025 - March 2026",
    role: "Web Developer & Project Manager",
    org: "Chavan Industrial Group",
    detail:
      "Designing and developing web applications for industrial and business operations, managing project timelines and cross-functional coordination, building and maintaining the company's web presence, and overseeing digital transformation for fire safety and industrial compliance work.",
  },
];

const EDUCATION: { what: string; org: string; when: string; detail: string }[] = [
  {
    what: "B.Tech, Computer Science & Engineering",
    org: "Cyber Security and Forensic",
    when: "2022 - 2026",
    detail: "MIT School of Computing. CGPA 7.26 / 10.",
  },
  {
    what: "12th Standard",
    org: "Pune Institute",
    when: "2022",
    detail: "82 / 100.",
  },
  {
    what: "10th Standard, CISCE",
    org: "Colonel Parab's School",
    when: "2020",
    detail: "72 / 100.",
  },
];

const CERTIFICATIONS: { name: string; body: string }[] = [
  {
    name: "Security Operations Analyst Associate (SC-200)",
    body: "Microsoft",
  },
  {
    name: "Cybersecurity for Businesses — The Fundamental Edition",
    body: "EC-Council",
  },
  {
    name: "Make In-House Hacking and Pentesting Lab",
    body: "EC-Council",
  },
  {
    name: "Introduction to Cybersecurity",
    body: "Cisco",
  },
];

export default function ShubhankarChavanPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <SeoJsonLd
        nodes={[
          webPageNode({
            path: "/shubhankar-chavan",
            name: "Shubhankar Chavan",
            description:
              "Founder and CEO of Chavan Industrial Group and the owner of NOT SCRIPTED: education, roles, certifications and public work.",
            about: OWNER_ID,
          }),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Shubhankar Chavan", path: "/shubhankar-chavan" },
          ]),
        ]}
      />

      <PageIntro
        eyebrow="Owner of this publication"
        title="Shubhankar Chavan"
        dek="Also published as Shubhankar Rahul Chavan. A founder and engineer from Maharashtra, he is the Founder and CEO of Chavan Industrial Group and the owner of NOT SCRIPTED. His work spans industrial supply and procurement on one side, and cybersecurity, software and applied AI on the other."
        meta={[
          { label: "Role", value: "Founder & CEO, Chavan Industrial Group" },
          { label: "Also", value: "Owner of NOT SCRIPTED" },
          { label: "Based in", value: "Pune, Maharashtra" },
          { label: "Qualification", value: "B.Tech, CSE — Cyber Security and Forensic" },
          { label: "Alma mater", value: "MIT School of Computing" },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <section aria-labelledby="short-answer">
            <h2 id="short-answer" className="font-display text-[1.35rem] font-semibold text-ink">
              The short answer
            </h2>
            <div className="prose-editorial mt-3 text-[1rem]">
              <p>
                <strong>Shubhankar Chavan</strong> is the Founder and Chief Executive Officer of{" "}
                <Link
                  href="/chavan-industrial-group"
                  className="underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Chavan Industrial Group
                </Link>
                , a registered MSME in Ahilyanagar, Maharashtra that supplies Indian Railways, Defence
                establishments and other institutional buyers. He is also the owner of NOT SCRIPTED,
                the publication you are reading.
              </p>
              <p>
                He trained as a computer scientist rather than an engineer in the conventional
                sense, taking a B.Tech in Computer Science and Engineering specialising in Cyber
                Security and Forensic subjects at MIT School of Computing between 2022 and 2026. His
                professional work since then has run along two tracks: building the industrial supply
                business, and working in security operations and software.
              </p>
            </div>
          </section>

          <section aria-labelledby="roles" className="mt-10">
            <SectionHead title="Roles" accent="#1B3C86" />
            <ol className="mt-4 space-y-5">
              {ROLES.map((r) => (
                <li key={r.org} className="border-l-[3px] border-ink pl-4">
                  <p className="label-ui text-ink-4">{r.when}</p>
                  <h3 className="mt-1 font-display text-[1.1rem] font-semibold text-ink">
                    {r.role}, {r.org}
                  </h3>
                  <p className="mt-1.5 font-ui text-[0.95rem] leading-relaxed text-ink-3">{r.detail}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-ui text-[0.9rem] text-ink-4">
              Chavan Industrial Group also describes him as its founder and CEO; the two records sit
              alongside each other rather than replacing one another, and both are reproduced here as
              published.
            </p>
          </section>

          <section aria-labelledby="education" className="mt-10">
            <SectionHead title="Education" accent="#14584A" />
            <dl className="mt-4 divide-y divide-rule border-y border-rule">
              {EDUCATION.map((e) => (
                <div key={e.what} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-4">
                  <div>
                    <dt className="font-display text-[1rem] font-semibold text-ink">{e.what}</dt>
                    <dd className="flex flex-wrap items-baseline gap-x-2 font-ui text-[0.9rem] text-ink-3">
                      {e.org} <Dot /> {e.when} <Dot /> {e.detail}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="certs" className="mt-10">
            <SectionHead title="Certifications" accent="#0F5F6E" />
            <ul className="mt-4 space-y-2">
              {CERTIFICATIONS.map((c) => (
                <li key={c.name} className="border border-rule p-3">
                  <h3 className="font-display text-[1rem] font-semibold text-ink">{c.name}</h3>
                  <p className="mt-1 font-ui text-[0.88rem] text-ink-4">{c.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="work" className="mt-10">
            <SectionHead title="Technical work" accent="#4A3A78" />
            <div className="prose-editorial mt-3 text-[1rem]">
              <p>
                His published technical work covers security tooling and web development, with a
                stated focus on security operations, threat detection, Microsoft Sentinel and
                Defender, KQL, and hands-on penetration testing practice. He also lists applied AI
                work in large-language-model evaluation and prompt analysis.
              </p>
              <p>
                Public repositories under his account include a SYN flood denial-of-service script, an
                IP discovery tool, a port scanner, a keylogger written for cybersecurity awareness
                training, a Wonderla theme-park booking application, a full-stack e-commerce build, a
                Splunk SIEM practice log set, a MAC OUI lookup utility and this publication&rsquo;s own
                source code.
              </p>
            </div>
            <ul className="mt-4 font-ui text-[0.95rem]">
              <li className="flex flex-wrap items-baseline gap-x-2">
                <a
                  href="https://github.com/shubhankargithub"
                  rel="noopener"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  github.com/shubhankargithub
                </a>
                <Dot />
                <span className="text-ink-4">code and repositories</span>
              </li>
            </ul>
          </section>
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="profiles" className="border border-rule p-5">
            <h2 id="profiles" className="label-ui border-b border-ink pb-2 text-ink-4">
              Profiles
            </h2>
            <ul className="mt-3 space-y-2 font-ui text-[0.95rem]">
              <li className="flex flex-wrap items-baseline gap-x-2">
                <a
                  href="https://shubhankarchavan.vercel.app/"
                  rel="noopener"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Portfolio and résumé
                </a>
                <Dot />
                <span className="text-ink-4">own site</span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2">
                <a
                  href="https://www.linkedin.com/in/shubhankarchavan/"
                  rel="noopener"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  LinkedIn
                </a>
                <Dot />
                <span className="text-ink-4">listed on his own site</span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2">
                <a
                  href="https://github.com/shubhankargithub"
                  rel="noopener"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  GitHub
                </a>
                <Dot />
                <span className="text-ink-4">listed on his own site</span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2">
                <a
                  href="https://chavanindustrialgroup.com/about-founder.html"
                  rel="noopener"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Founder page, Chavan Industrial Group
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="contact" className="border border-rule p-5">
            <h2 id="contact" className="label-ui border-b border-ink pb-2 text-ink-4">
              Contact
            </h2>
            <address className="mt-3 font-ui text-[0.95rem] not-italic leading-relaxed text-ink-3">
              <strong className="text-ink">Shubhankar Rahul Chavan</strong>
              <br />
              Pune, Maharashtra
              <br />
              India
            </address>
            <ul className="mt-3 space-y-1 font-ui text-[0.92rem]">
              <li className="flex flex-wrap items-baseline gap-x-2">
                <a
                  href="mailto:shubhankarchavan01@gmail.com"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  shubhankarchavan01@gmail.com
                </a>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2">
                <a
                  href="tel:+919657526862"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  +91 96575 26862
                </a>
              </li>
            </ul>
            <p className="mt-3 font-ui text-[0.88rem] text-ink-4">
              For editorial matters, use the{" "}
              <Link
                href="/contact"
                className="underline decoration-rule-2 underline-offset-2 hover:text-brand"
              >
                newsroom contact page
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="ownership-note" className="border border-rule bg-paper-2/50 p-5">
            <h2 id="ownership-note" className="label-ui border-b border-ink pb-2 text-ink-4">
              Editorial note
            </h2>
            <p className="mt-3 font-ui text-[0.9rem] leading-relaxed text-ink-3">
              This page exists because the owner of a publication should be identifiable. Anything
              published here about the owner&rsquo;s own companies is labelled as a summary of the
              company&rsquo;s own announcement rather than as independent reporting. The full
              relationship is set out on the{" "}
              <Link
                href="/ownership"
                className="underline decoration-rule-2 underline-offset-2 hover:text-brand"
              >
                ownership page
              </Link>
              .
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}