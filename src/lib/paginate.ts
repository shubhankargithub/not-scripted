import type { Article } from "@/content/types";

export const PER_PAGE = 10;

/** Split a sorted list into fixed-size pages. */
export function paginate<T>(items: T[], perPage = PER_PAGE): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += perPage) out.push(items.slice(i, i + perPage));
  return out.length ? out : [[]];
}

export function pageCount(total: number, perPage = PER_PAGE): number {
  return Math.max(1, Math.ceil(total / perPage));
}

/** Route slug for a 1-based page number, or undefined for the first page. */
export function pageSlug(n: number): string | undefined {
  return n <= 1 ? undefined : String(n);
}

export function parsePage(value: string | undefined, max: number): number {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > max) return 1;
  return n;
}

export function slicePage(items: Article[], page: number, perPage = PER_PAGE): Article[] {
  return items.slice((page - 1) * perPage, page * perPage);
}