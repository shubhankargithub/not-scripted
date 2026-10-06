import Link from "next/link";
import { getBreaking, getLatest, countArticles, countSources } from "@/lib/articles";
import { toCard, toCards } from "@/lib/card";
import { SITE } from "@/lib/site";
import { editionStamp, formatDate, weekdayLabel } from "@/lib/format";
import { Wordmark } from "./Wordmark";
import { HeaderSearch, MobileNav } from "./Chrome";
import { LiveTag } from "./ui";
import { href } from "./cards";

function BreakingTicker() {
  const items = toCards(getBreaking(6));
  if (!items.length) return null;
  const row = (
    <ul className="flex shrink-0 items-center">
      {items.map((a) => (
        <li key={a.id} className="flex items-center">
          <span aria-hidden="true" className="mx-4 text-paper/30">
            /
          </span>
          <Link href={href(a)} className="whitespace-nowrap font-ui text-[0.8rem] text-paper/90 hover:text-white hover:underline">
            {a.headline}
          </Link>
        </li>
      ))}
      <span aria-hidden="true" className="mx-4 text-paper/30">
        /
      </span>
    </ul>
  );

  return (
    <div className="border-b border-rule bg-brand">
      <div className="mx-auto flex max-w-[1400px] items-stretch">
        <span className="label-ui flex shrink-0 items-center gap-1.5 bg-ink px-3 text-paper sm:px-4">
          <span aria-hidden="true" className="animate-live-dot inline-block h-[6px] w-[6px] rounded-full bg-brand-3" />
          Breaking
        </span>
        <div className="relative min-w-0 flex-1 overflow-hidden py-2">
          <div className="animate-marquee flex w-max motion-reduce:w-auto motion-reduce:overflow-x-auto">
            {row}
            <span aria-hidden="true" className="flex items-center">
              <ul className="flex shrink-0 items-center">
                {items.map((a) => (
                  <li key={`dup-${a.id}`} className="flex items-center">
                    <span aria-hidden="true" className="mx-4 text-paper/30">
                      /
                    </span>
                    <Link
                      href={href(a)}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="whitespace-nowrap font-ui text-[0.8rem] text-paper/90"
                    >
                      {a.headline}
                    </Link>
                  </li>
                ))}
                <span aria-hidden="true" className="mx-4 text-paper/30">
                  /
                </span>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Masthead() {
  const latest = toCard(getLatest(1)[0]);
  const stories = countArticles();
  const sources = countSources();

  return (
    <header>
      <div className="border-b border-rule bg-paper-2">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-1 px-4 py-2 sm:px-6">
          <p className="label-meta">
            <time dateTime={SITE.editionAt}>{weekdayLabel(SITE.editionAt)}</time>,{" "}
            <span className="text-ink-2">{formatDate(SITE.editionAt)}</span>
          </p>
          <p className="label-meta hidden sm:inline">Edition: Bengaluru &middot; {editionStamp()}</p>
          <p className="label-meta ml-auto hidden md:inline">
            {stories} stories &middot; {sources} sourced references
          </p>
          <HeaderSearch total={stories} />
        </div>
      </div>

<div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 py-5 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          <nav aria-label="Utility" className="hidden lg:block">
            <ul className="space-y-1.5">
              <li>
                <Link href="/archive" className="label-ui text-ink-2 transition-colors hover:text-brand">
                  Archive
                </Link>
              </li>
              <li>
                <Link href="/explainers" className="label-ui text-ink-2 transition-colors hover:text-brand">
                  Explainers
                </Link>
              </li>
              <li>
                <Link href="/from-around-the-web" className="label-ui text-ink-2 transition-colors hover:text-brand">
                  From The Web
                </Link>
              </li>
            </ul>
          </nav>

<div className="col-start-2 row-start-1 min-w-0 justify-self-center text-center">
            <Wordmark size="lg" />
            <p className="label-ui mt-1.5 truncate text-ink-4 sm:mt-2">{SITE.tagline}</p>
          </div>

          <div className="col-start-3 row-start-1 flex items-center justify-end gap-3">
            <nav aria-label="More" className="hidden lg:block">
              <ul className="space-y-1.5 text-right">
                <li>
                  <Link href="/opinion" className="label-ui text-ink-2 transition-colors hover:text-brand">
                    Opinion
                  </Link>
                </li>
                <li>
                  <Link href="/most-read" className="label-ui text-ink-2 transition-colors hover:text-brand">
                    Most Read
                  </Link>
                </li>
                <li>
                  <Link href="/newsletter" className="label-ui text-ink-2 transition-colors hover:text-brand">
                    Newsletter
                  </Link>
                </li>
              </ul>
            </nav>
            <Link
              href="/breaking"
              className="label-ui hidden items-center gap-1.5 border border-brand px-2.5 py-1.5 text-brand sm:inline-flex"
            >
              <LiveTag />
            </Link>
            <MobileNav />
          </div>
        </div>
      </div>

      <nav aria-label="Sections" className="border-y border-rule bg-paper">
        <div className="mx-auto max-w-[1400px] overflow-x-auto px-4 sm:px-6">
          <ul className="flex items-center gap-1 py-1">
            {[
              { label: "Latest", href: "/latest" },
              { label: "Top Stories", href: "/top-stories" },
              { label: "India", href: "/section/india" },
              { label: "Politics", href: "/section/politics" },
              { label: "Business", href: "/section/business" },
              { label: "Technology", href: "/section/technology" },
              { label: "Bengaluru", href: "/section/karnataka" },
              { label: "World", href: "/section/world" },
              { label: "Geopolitics", href: "/section/geopolitics" },
              { label: "Science", href: "/section/science" },
              { label: "Environment", href: "/section/environment" },
              { label: "Culture", href: "/section/culture" },
              { label: "Lifestyle", href: "/section/lifestyle" },
              { label: "Sport", href: "/section/sports" },
              { label: "Opinion", href: "/opinion" },
              { label: "Archive", href: "/archive" },
            ].map((item, i) => (
              <li key={item.href} className="flex items-center">
                {i > 0 ? (
                  <span aria-hidden="true" className="px-1.5 text-rule-2">
                    |
                  </span>
                ) : null}
                <Link
                  href={item.href}
                  className="label-ui whitespace-nowrap px-1.5 py-2 text-ink-2 transition-colors hover:bg-ink hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <BreakingTicker />

      {latest ? (
        <p className="border-b border-rule-3 bg-paper-2/50">
          <span className="mx-auto block max-w-[1400px] px-4 py-1.5 font-ui text-[0.72rem] text-ink-3 sm:px-6">
            <span className="label-ui text-ink-4">Latest</span>{" "}
            <Link href={href(latest)} className="hover:text-brand hover:underline">
              {latest.headline}
            </Link>
          </span>
        </p>
      ) : null}
    </header>
  );
}