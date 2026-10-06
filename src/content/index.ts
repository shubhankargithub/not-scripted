import type { Article } from "./types";

import { JANUARY_2026 } from "./articles/2026-01";
import { FEBRUARY_2026 } from "./articles/2026-02";
import { MARCH_2026 } from "./articles/2026-03";
import { APRIL_2026 } from "./articles/2026-04";
import { MAY_2026 } from "./articles/2026-05";
import { JUNE_2026 } from "./articles/2026-06";
import { JULY_2026 } from "./articles/2026-07";
import { AUGUST_2026 } from "./articles/2026-08";
import { SEPTEMBER_2026 } from "./articles/2026-09";
import { OCTOBER_2026 } from "./articles/2026-10";

export const ARTICLES: Article[] = [
  ...OCTOBER_2026,
  ...SEPTEMBER_2026,
  ...AUGUST_2026,
  ...JULY_2026,
  ...JUNE_2026,
  ...MAY_2026,
  ...APRIL_2026,
  ...MARCH_2026,
  ...FEBRUARY_2026,
  ...JANUARY_2026,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));