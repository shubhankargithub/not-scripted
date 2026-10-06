"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type { ArchiveRecord } from "@/lib/archiveIndex";
import { CATEGORIES, CATEGORY_MAP, TYPE_META } from "@/content/taxonomy";
import { ARTICLE_TYPES } from "@/content/types";
import { formatDate, monthLabel } from "@/lib/format";

const PER_PAGE = 12;

interface Props {
  records: ArchiveRecord[];
  months: { key: string; count: number }[];
  years: string[];
  sources: { name: string; count: number }[];
}

interface Filters {
  q: string;
  cats: string[];
  types: string[];
  month: string;
  year: string;
  source: string;
  tag: string;
  sort: string;
  page: number;
}

const listeners = new Set<() => void>();

function notify() {
  for (const l of listeners) l();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("popstate", onChange);
  };
}

function getQuery() {
  return window.location.search;
}

function getServerQuery() {
  return "";
}

function parse(qs: string): Filters {
  const s = new URLSearchParams(qs);
  const list = (v: string | null) => (v ?? "").split(",").filter(Boolean);
  const page = Number(s.get("page") ?? "1");
  return {
    q: s.get("q") ?? "",
    cats: list(s.get("category")),
    types: list(s.get("type")),
    month: s.get("month") ?? "",
    year: s.get("year") ?? "",
    source: s.get("source") ?? "",
    tag: s.get("tag") ?? "",
    sort: s.get("sort") ?? "newest",
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

function toSearch(f: Filters): string {
  const s = new URLSearchParams();
  if (f.q.trim()) s.set("q", f.q.trim());
  if (f.cats.length) s.set("category", f.cats.join(","));
  if (f.types.length) s.set("type", f.types.join(","));
  if (f.month) s.set("month", f.month);
  if (f.year) s.set("year", f.year);
  if (f.source) s.set("source", f.source);
  if (f.tag) s.set("tag", f.tag);
  if (f.sort && f.sort !== "newest") s.set("sort", f.sort);
  if (f.page > 1) s.set("page", String(f.page));
  return s.toString();
}

/**
 * Archive browser. The URL is the single source of truth, read through
 * useSyncExternalStore rather than useSearchParams: this page is statically
 * rendered, and suspending on search params would ship nothing but a loading
 * skeleton to readers and crawlers. The server snapshot is the empty query, so
 * the static HTML always contains the complete unfiltered archive and every
 * filtered view remains linkable and shareable.
 */
export function ArchiveBrowser({ records, months, years, sources }: Props) {
  const query = useSyncExternalStore(subscribe, getQuery, getServerQuery);
  const filters = useMemo(() => parse(query), [query]);
  const [qInput, setQInput] = useState<string | null>(null);
  const q = qInput ?? filters.q;

  const apply = useCallback((next: Partial<Filters>) => {
    const merged: Filters = { ...parse(getQuery()), ...next };
    if (next.q === undefined) merged.q = parse(getQuery()).q;
    const qs = toSearch(merged);
    window.history.replaceState(window.history.state, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
    setQInput(null);
    notify();
  }, []);

  const reset = useCallback(() => {
    window.history.replaceState(window.history.state, "", window.location.pathname);
    setQInput(null);
    notify();
  }, []);

  const filtered = useMemo(() => {
    const terms = filters.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let out = records.filter((r) => {
      if (filters.cats.length && !filters.cats.includes(r.category)) return false;
      if (filters.types.length && !filters.types.includes(r.type)) return false;
      if (filters.month && r.month !== filters.month) return false;
      if (filters.year && r.year !== filters.year) return false;
      if (filters.source && !r.sources.includes(filters.source)) return false;
      if (filters.tag && !r.tags.includes(filters.tag)) return false;
      if (!terms.length) return true;
      const hay = [
        r.headline,
        r.dek,
        r.kicker ?? "",
        r.dateline ?? "",
        r.category,
        r.tags.join(" "),
        r.sources.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((t) => hay.includes(t));
    });

    out = [...out].sort((a, b) => {
      if (filters.sort === "oldest") return a.time.localeCompare(b.time);
      if (filters.sort === "az") return a.headline.localeCompare(b.headline);
      if (filters.sort === "sources") return b.sourceCount - a.sourceCount || b.time.localeCompare(a.time);
      return b.time.localeCompare(a.time);
    });
    return out;
  }, [records, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(filters.page, totalPages);
  const slice = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const toggleIn = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const activeCount =
    filters.cats.length +
    filters.types.length +
    (filters.month ? 1 : 0) +
    (filters.year ? 1 : 0) +
    (filters.source ? 1 : 0) +
    (filters.tag ? 1 : 0) +
    (filters.q ? 1 : 0);

  const goToPage = (p: number) => {
    apply({ page: p });
    window.requestAnimationFrame(() => {
      document.getElementById("archive-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)]">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            apply({ q, page: 1 });
          }}
          className="flex flex-col gap-3 border border-rule bg-paper-2/70 p-4 sm:flex-row sm:items-center"
        >
          <label htmlFor="archive-q" className="label-ui shrink-0 text-ink-4">
            Search
          </label>
          <input
            id="archive-q"
            type="search"
            value={q}
            onChange={(e) => setQInput(e.target.value)}
            placeholder={`Headline, topic, source or desk across ${records.length} stories`}
            className="min-w-0 flex-1 border border-rule-2 bg-white px-3 py-2.5 font-ui text-sm text-ink outline-none placeholder:text-ink-4 focus:border-ink"
          />
          <button
            type="submit"
            className="label-ui shrink-0 bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-brand"
          >
            Search
          </button>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={reset}
              className="label-ui shrink-0 border border-rule-2 px-3 py-2.5 text-ink-3 transition-colors hover:border-ink hover:text-ink"
            >
              Clear {activeCount} filter{activeCount === 1 ? "" : "s"}
            </button>
          ) : null}
        </form>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
          <div>
            <label htmlFor="archive-month" className="label-ui mb-1.5 block text-ink-4">
              Month
            </label>
            <select
              id="archive-month"
              value={filters.month}
              onChange={(e) => apply({ month: e.target.value, page: 1 })}
              className="w-full border border-rule-2 bg-white px-2.5 py-2 font-ui text-sm text-ink outline-none focus:border-ink"
            >
              <option value="">All months</option>
              {months.map((m) => (
                <option key={m.key} value={m.key}>
                  {monthLabel(m.key)} ({m.count})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="archive-year" className="label-ui mb-1.5 block text-ink-4">
              Year
            </label>
            <select
              id="archive-year"
              value={filters.year}
              onChange={(e) => apply({ year: e.target.value, page: 1 })}
              className="w-full border border-rule-2 bg-white px-2.5 py-2 font-ui text-sm text-ink outline-none focus:border-ink"
            >
              <option value="">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label htmlFor="archive-source" className="label-ui mb-1.5 block text-ink-4">
              Source the fact was established from
            </label>
            <select
              id="archive-source"
              value={filters.source}
              onChange={(e) => apply({ source: e.target.value, page: 1 })}
              className="w-full border border-rule-2 bg-white px-2.5 py-2 font-ui text-sm text-ink outline-none focus:border-ink"
            >
              <option value="">All sources</option>
              {sources.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} ({s.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <fieldset className="border border-rule p-4">
          <legend className="label-ui px-1 text-ink-4">Filter by desk</legend>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => {
              const on = filters.cats.includes(c.slug);
              const n = records.filter((r) => r.category === c.slug).length;
              return (
                <button
                  key={c.slug}
                  type="button"
                  aria-pressed={on}
                  onClick={() => apply({ cats: toggleIn(filters.cats, c.slug), page: 1 })}
                  className="label-ui inline-flex items-center gap-1.5 border px-2 py-1.5 transition-colors"
                  style={{
                    borderColor: on ? c.accent : "var(--color-rule)",
                    backgroundColor: on ? `${c.accent}14` : "transparent",
                    color: on ? c.accent : "var(--color-ink-3)",
                  }}
                >
                  <span aria-hidden="true" className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: c.accent }} />
                  {c.name}
                  <span className="opacity-60">{n}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="flex flex-col gap-3">
          <fieldset className="border border-rule p-4">
            <legend className="label-ui px-1 text-ink-4">Filter by article type</legend>
            <div className="grid gap-1.5">
              {ARTICLE_TYPES.map((t) => {
                const on = filters.types.includes(t);
                const meta = TYPE_META[t];
                const n = records.filter((r) => r.type === t).length;
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={on}
                    onClick={() => apply({ types: toggleIn(filters.types, t), page: 1 })}
                    className="label-ui flex items-center justify-between gap-3 border px-2 py-1.5 text-left transition-colors"
                    style={{
                      borderColor: on ? meta.accent : "var(--color-rule)",
                      backgroundColor: on ? `${meta.accent}12` : "transparent",
                      color: on ? meta.accent : "var(--color-ink-3)",
                    }}
                  >
                    <span>{meta.shortName}</span>
                    <span className="opacity-60">{n}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label htmlFor="archive-sort" className="label-ui mb-1.5 block text-ink-4">
              Sort order
            </label>
            <select
              id="archive-sort"
              value={filters.sort}
              onChange={(e) => apply({ sort: e.target.value, page: 1 })}
              className="w-full border border-rule-2 bg-white px-2.5 py-2 font-ui text-sm text-ink outline-none focus:border-ink"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="az">Headline A&ndash;Z</option>
              <option value="sources">Most sourced first</option>
            </select>
          </div>
        </div>
      </div>

      {filters.tag ? (
        <p className="mt-3 flex flex-wrap items-center gap-2 border border-rule bg-paper-2/70 px-3 py-2">
          <span className="label-ui text-ink-4">Topic</span>
          <span className="font-ui text-sm text-ink">{filters.tag}</span>
          <button
            type="button"
            onClick={() => apply({ tag: "", page: 1 })}
            className="label-ui ml-auto text-brand hover:underline"
          >
            Remove topic filter
          </button>
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-2">
        <p className="label-meta" id="archive-results">
          Showing <span className="text-ink">{slice.length}</span> of{" "}
          <span className="text-ink">{filtered.length}</span> of {records.length} stories
          {totalPages > 1 ? (
            <>
              {" "}
              &middot; page <span className="text-ink">{safePage}</span> of {totalPages}
            </>
          ) : null}
        </p>
        {activeCount > 0 ? <p className="label-meta">Filtered view &middot; this URL is shareable</p> : null}
      </div>

      {slice.length ? (
        <ul>
          {slice.map((r) => {
            const cat = CATEGORY_MAP[r.category];
            const typeMeta = TYPE_META[r.type];
            return (
              <li key={r.id} className="group border-b border-rule py-4">
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_13rem] md:gap-6">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="label-ui rounded-[2px] px-[5px] py-[3px] text-[9.5px]"
                        style={{
                          color: typeMeta.accent,
                          boxShadow: `inset 0 0 0 1px ${typeMeta.accent}33`,
                          backgroundColor: `${typeMeta.accent}0f`,
                        }}
                      >
                        {typeMeta.shortName}
                      </span>
                      <span className="label-ui" style={{ color: cat?.accent ?? "#5b656f" }}>
                        {cat?.name ?? r.category}
                      </span>
                      {r.kicker ? <span className="label-ui text-ink-4">{r.kicker}</span> : null}
                    </div>
                    <h3 className="headline-tight mt-2 font-display text-[1.2rem] font-semibold leading-[1.1] text-ink">
                      <Link href={`/article/${r.slug}`} className="transition-colors group-hover:text-brand">
                        {r.headline}
                      </Link>
                    </h3>
                    <p className="mt-2 max-w-[78ch] font-ui text-[0.9rem] leading-relaxed text-ink-3">{r.dek}</p>
                    <p className="label-meta mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <time dateTime={r.time}>{formatDate(r.time)}</time>
                      {r.dateline ? (
                        <>
                          <span aria-hidden="true">&middot;</span>
                          <span>{r.dateline}</span>
                        </>
                      ) : null}
                      <span aria-hidden="true">&middot;</span>
                      <span>{r.sourceCount} sources</span>
                      {r.updated ? (
                        <>
                          <span aria-hidden="true">&middot;</span>
                          <span>Updated</span>
                        </>
                      ) : null}
                      {r.tags.slice(0, 4).map((t) => (
                        <span key={t}>
                          <span aria-hidden="true">&middot;</span>
                          <button
                            type="button"
                            onClick={() => apply({ tag: t, page: 1 })}
                            className="underline decoration-rule-2 underline-offset-2 hover:text-brand"
                          >
                            {t}
                          </button>
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="md:border-l md:border-rule md:pl-5">
                    <p className="label-ui text-ink-4">Established from</p>
                    <ul className="mt-1.5 space-y-0.5">
                      {r.sources.slice(0, 4).map((s) => (
                        <li key={s} className="font-ui text-[0.78rem] leading-snug text-ink-3">
                          {s}
                        </li>
                      ))}
                      {r.sources.length > 4 ? (
                        <li className="font-ui text-[0.78rem] text-ink-4">+{r.sources.length - 4} more</li>
                      ) : null}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="border border-dashed border-rule-2 bg-paper-2/60 px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold text-ink">No stories match those filters</p>
          <p className="mx-auto mt-2 max-w-[48ch] font-ui text-sm text-ink-3">
            The archive holds {records.length} stories between January and October 2026. Try widening the
            month range, dropping the source filter, or searching for a broader term.
          </p>
          <button type="button" onClick={reset} className="label-ui mt-5 border border-ink bg-ink px-4 py-2.5 text-paper">
            Reset the archive
          </button>
        </div>
      )}

      {totalPages > 1 ? (
        <nav aria-label="Archive pagination" className="mt-8 flex flex-wrap items-center gap-1.5 border-t border-rule pt-5">
          <button
            type="button"
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage === 1}
            className="label-ui border border-rule px-3 py-2 text-ink-2 transition-colors enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-paper disabled:opacity-35"
          >
            &larr; Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => goToPage(p)}
              aria-current={p === safePage ? "page" : undefined}
              className={`label-ui min-w-[2.25rem] border px-3 py-2 transition-colors ${
                p === safePage
                  ? "border-ink bg-ink text-paper"
                  : "border-rule text-ink-2 hover:border-ink hover:bg-ink hover:text-paper"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage === totalPages}
            className="label-ui border border-rule px-3 py-2 text-ink-2 transition-colors enabled:hover:border-ink enabled:hover:bg-ink enabled:hover:text-paper disabled:opacity-35"
          >
            Next &rarr;
          </button>
        </nav>
      ) : null}
    </div>
  );
}