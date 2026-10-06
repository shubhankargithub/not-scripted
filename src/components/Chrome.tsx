"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_TOP } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="label-ui inline-flex items-center gap-2 border border-rule-2 px-2.5 py-1.5 text-ink"
      >
        <span aria-hidden="true" className="flex flex-col gap-[3px]">
          <span className={`block h-[2px] w-4 ${open ? "bg-transparent" : "bg-ink"}`} />
          <span className={`block h-[2px] w-4 ${open ? "bg-ink" : "bg-ink"}`} />
          <span className={`block h-[2px] w-4 ${open ? "bg-transparent" : "bg-ink"}`} />
        </span>
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <div
          id="mobile-nav"
          key={pathname}
          className="fixed inset-x-0 bottom-0 top-14 z-50 overflow-y-auto bg-paper px-5 pb-16 pt-6"
        >
          <nav aria-label="Mobile">
            <ul className="divide-y divide-rule border-y border-rule">
              {NAV_TOP.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block py-3.5 font-display text-[1.5rem] font-semibold leading-tight text-ink transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 grid gap-3">
            <Link
              href="/archive"
              onClick={close}
              className="label-ui border border-ink bg-ink px-4 py-3 text-center text-paper"
            >
              Browse the archive
            </Link>
            <Link
              href="/newsletter"
              onClick={close}
              className="label-ui border border-ink px-4 py-3 text-center text-ink"
            >
              The daily briefing
            </Link>
          </div>
          <p className="mt-8 font-ui text-xs leading-relaxed text-ink-3">
            NOT SCRIPTED records the sources behind every story. Type-annotated coverage, full archive, no
            invented sourcing.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function HeaderSearch({ total }: { total?: number }) {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <form
      action="/archive"
      role="search"
      className={`flex min-w-0 items-center border transition-colors ${
        focused ? "border-paper" : "border-rule-2"
      } bg-paper`}
    >
      <label htmlFor="site-search" className="sr-only">
        Search the archive
      </label>
      <input
        id="site-search"
        name="q"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={`Search ${total} stories`}
        className="w-full min-w-0 bg-transparent px-2.5 py-1.5 font-ui text-xs text-ink outline-none placeholder:text-ink-4 sm:w-[10rem] lg:w-52"
      />
      <button
        type="submit"
        className="label-ui shrink-0 border-l border-rule-2 px-2.5 py-[7px] text-ink-3 transition-colors hover:text-brand"
      >
        Go
      </button>
    </form>
  );
}

export function StickyBar() {
  return (
    <div className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-2 px-4 sm:gap-4 sm:px-6">
        <Wordmark size="sm" />
        <nav aria-label="Sections" className="ml-auto hidden overflow-x-auto lg:block">
          <ul className="flex items-center gap-5">
            {NAV_TOP.slice(1, 9).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="label-ui whitespace-nowrap text-ink-2 transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/archive"
          className="label-ui ml-auto hidden whitespace-nowrap border border-ink px-2.5 py-1.5 text-ink transition-colors hover:bg-ink hover:text-paper sm:ml-0 sm:inline-block lg:hidden xl:inline-block"
        >
          Archive
        </Link>
        <div className="ml-auto lg:ml-0">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}