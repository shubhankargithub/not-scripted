import Link from "next/link";
import { CATEGORIES, TYPE_META } from "@/lib/articles";
import { NAV_FOOTER_SECTIONS, SITE } from "@/lib/site";
import { ARTICLE_TYPES } from "@/content/types";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="mt-16 border-t-[3px] border-ink bg-ink text-paper">
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2.2fr)]">
          <div>
            <div className="inline-block bg-paper px-3 py-2">
              <Wordmark size="md" />
            </div>
            <p className="mt-4 max-w-[42ch] font-ui text-[0.9rem] leading-relaxed text-paper/70">
              {SITE.description}
            </p>
            <address className="mt-5 not-italic font-ui text-[0.82rem] leading-relaxed text-paper/55">
              {SITE.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <p className="mt-4 font-ui text-[0.82rem] text-paper/55">
              <a href={`mailto:${SITE.contactEmail}`} className="hover:text-paper hover:underline">
                {SITE.contactEmail}
              </a>
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {NAV_FOOTER_SECTIONS.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h3 className="label-ui border-b border-paper/20 pb-2 text-paper/50">{col.heading}</h3>
                <ul className="mt-3 space-y-1.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="font-ui text-[0.86rem] text-paper/80 transition-colors hover:text-brand-3"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 border-t border-paper/15 pt-6 sm:grid-cols-2">
          <div>
            <h3 className="label-ui text-paper/50">Every article is labelled</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {ARTICLE_TYPES.map((t) => (
                <li key={t}>
                  <Link
                    href={TYPE_META[t].path}
                    className="label-ui inline-block border border-paper/25 px-2 py-1 text-paper/75 transition-colors hover:border-brand-3 hover:text-brand-3"
                  >
                    {TYPE_META[t].shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label-ui text-paper/50">Follow the desk</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {[
                { label: "X", href: SITE.social.x },
                { label: "Instagram", href: SITE.social.instagram },
                { label: "YouTube", href: SITE.social.youtube },
                { label: "LinkedIn", href: SITE.social.linkedin },
                { label: "RSS", href: SITE.social.rss },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="label-ui inline-block border border-paper/25 px-2 py-1 text-paper/75 transition-colors hover:border-brand-3 hover:text-brand-3"
                    {...(s.href.startsWith("http") ? { rel: "noopener noreferrer", target: "_blank" } : {})}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-ui text-[0.76rem] text-paper/45">
            &copy; {SITE.founded}&ndash;2026 NOT SCRIPTED Media LLP. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {[
              { label: "Editorial standards", href: "/editorial-standards" },
              { label: "Corrections", href: "/corrections" },
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="label-ui text-paper/55 transition-colors hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 max-w-[90ch] font-ui text-[0.72rem] leading-relaxed text-paper/35">
          NOT SCRIPTED covers the same events other outlets report on, and writes every story independently.
          Nothing on this site is copied or paraphrased from another publication. Where a story summarises
          reporting published elsewhere it is labelled From Around The Web, attributed by name, and linked to
          the original. Archive entries are retrospective: they were compiled against the public sources
          recorded on each article, not reported on the day. There are no invented quotes, interviews or
          eyewitness accounts in this archive.
        </p>
      </div>
    </footer>
  );
}

export function CategoryCloud() {
  return (
    <ul className="flex flex-wrap gap-2">
      {CATEGORIES.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/section/${c.slug}`}
            className="label-ui inline-flex items-center gap-1.5 border px-2 py-1 transition-colors"
            style={{ borderColor: `${c.accent}44`, color: c.accent, backgroundColor: `${c.accent}0d` }}
          >
            <span aria-hidden="true" className="inline-block h-[6px] w-[6px] rounded-full" style={{ backgroundColor: c.accent }} />
            {c.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}