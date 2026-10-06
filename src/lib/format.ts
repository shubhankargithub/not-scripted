import { SITE } from "./site";

const TZ = "Asia/Kolkata";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface ZonedParts {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: string;
  dayPeriod: string;
  weekday: string;
}

const cache = new Map<string, ZonedParts>();

function parts(iso: string): ZonedParts {
  const hit = cache.get(iso);
  if (hit) return hit;

  const d = new Date(iso);
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    weekday: "long",
  });
  const out: Record<string, string> = {};
  for (const p of fmt.formatToParts(d)) out[p.type] = p.value;

  const result: ZonedParts = {
    day: Number(out.day),
    month: Number(out.month),
    year: Number(out.year),
    hour: Number(out.hour),
    minute: out.minute,
    dayPeriod: (out.dayPeriod ?? "").toLowerCase(),
    weekday: out.weekday ?? "",
  };
  cache.set(iso, result);
  return result;
}

/** 6 October 2026 */
export function formatDate(iso: string): string {
  const p = parts(iso);
  return `${p.day} ${MONTHS[p.month - 1]} ${p.year}`;
}

/** 6 Oct 2026 */
export function formatDateShort(iso: string): string {
  const p = parts(iso);
  return `${p.day} ${MONTHS_SHORT[p.month - 1]} ${p.year}`;
}

/** 6 October 2026, 11:15 am IST */
export function formatDateTime(iso: string): string {
  const p = parts(iso);
  return `${p.day} ${MONTHS[p.month - 1]} ${p.year}, ${p.hour}:${p.minute} ${p.dayPeriod} ${SITE.timezoneLabel}`;
}

/** 11:15 am IST */
export function formatTime(iso: string): string {
  const p = parts(iso);
  return `${p.hour}:${p.minute} ${p.dayPeriod} ${SITE.timezoneLabel}`;
}

/** ISO date in IST, e.g. 2026-10-06 */
export function isoDate(iso: string): string {
  const p = parts(iso);
  return `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
}

/** YYYY-MM in IST, used for archive month grouping. */
export function monthKey(iso: string): string {
  return isoDate(iso).slice(0, 7);
}

export function yearKey(iso: string): string {
  return isoDate(iso).slice(0, 4);
}

export function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function monthLabelShort(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return `${MONTHS_SHORT[m - 1]} ${y}`;
}

export function weekdayLabel(iso: string): string {
  return parts(iso).weekday;
}

/** Human "3 hours ago", measured against the edition stamp. */
export function timeAgo(iso: string, from: string = SITE.editionAt): string {
  const diff = new Date(from).getTime() - new Date(iso).getTime();
  const future = diff < 0;
  const mins = Math.abs(diff) / 60000;

  let out: string;
  if (mins < 1) return "just now";
  if (mins < 60) {
    const m = Math.floor(mins);
    out = `${m} min`;
  } else if (mins < 60 * 24) {
    const h = Math.floor(mins / 60);
    out = `${h} hour${h === 1 ? "" : "s"}`;
  } else if (mins < 60 * 24 * 14) {
    const d = Math.floor(mins / (60 * 24));
    out = `${d} day${d === 1 ? "" : "s"}`;
  } else if (mins < 60 * 24 * 60) {
    const w = Math.floor(mins / (60 * 24 * 7));
    out = `${w} week${w === 1 ? "" : "s"}`;
  } else {
    const mo = Math.floor(mins / (60 * 24 * 30.44));
    out = `${mo} month${mo === 1 ? "" : "s"}`;
  }
  return future ? `in ${out}` : `${out} ago`;
}

export function editionStamp(): string {
  return formatDateTime(SITE.editionAt);
}

/** Rough reading time from the body block text. */
export function readMinutes(blocks: { text?: string; items?: string[] }[]): number {
  let words = 0;
  for (const b of blocks) {
    if (b.text) words += b.text.split(/\s+/).filter(Boolean).length;
    if (b.items) for (const i of b.items) words += i.split(/\s+/).filter(Boolean).length;
  }
  return Math.max(2, Math.round(words / 210));
}

export function pluralise(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}