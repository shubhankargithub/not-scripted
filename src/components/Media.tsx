import { PHOTOS } from "@/content/photos";
import type { ArticlePhoto } from "@/content/types";
import { ArticleArt } from "./ArticleArt";

export function getPhoto(slug: string): ArticlePhoto | undefined {
  return PHOTOS[slug];
}

export function hasPhoto(slug: string): boolean {
  return Boolean(PHOTOS[slug]);
}

/**
 * Pick one concrete file out of a photo register `srcSet`.
 *
 * Not every register entry ships a 1400px candidate, so asking for
 * `<base>-1400.jpg` unconditionally produced a 404 `src` on 48 articles. The
 * browser recovered from `srcSet`, but crawlers that read `src` did not.
 * Resolving the widest candidate that actually exists fixes that and keeps the
 * `src` and the `srcSet` describing the same image.
 */
export function widestCandidate(srcset: string, slug: string): string {
  const best = srcset
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [url, width] = part.split(/\s+/);
      return { url, width: Number.parseInt(width ?? "0", 10) || 0 };
    })
    .sort((a, b) => b.width - a.width)[0];

  return best?.url ?? `/img/articles/w/${slug}-1400.jpg`;
}

/**
 * Display widths for each slot. Getting these right is the difference between
 * a 25 KB thumbnail and a 677 KB full-resolution file.
 */
const SIZES = {
  micro: "(min-width: 1024px) 5.5rem, 5.5rem",
  card: "(min-width: 1024px) 16rem, (min-width: 640px) 12rem, 8.5rem",
  half: "(min-width: 1024px) 30rem, (min-width: 640px) 46vw, 92vw",
  hero: "(min-width: 1280px) 40rem, (min-width: 1024px) 56vw, 94vw",
  full: "(min-width: 1400px) 50rem, 96vw",
} as const;

type SizeKey = keyof typeof SIZES;

interface MediaProps {
  slug: string;
  category: string;
  ratio?: "wide" | "box" | "tall";
  size?: SizeKey;
  className?: string;
  /** Above-the-fold images skip lazy loading. */
  eager?: boolean;
}

export function Media({
  slug,
  category,
  ratio = "wide",
  size = "card",
  className = "",
  eager = false,
}: MediaProps) {
  const photo = getPhoto(slug);

  if (photo) {
    return (
      <img
        src={widestCandidate(photo.srcset, slug)}
        srcSet={photo.srcset}
        sizes={SIZES[size]}
        alt={photo.alt}
        width={ratio === "wide" ? photo.width : photo.height}
        height={ratio === "wide" ? photo.height : photo.width}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`block h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <ArticleArt
      seed={slug}
      category={category}
      ratio={ratio}
      className={`block h-full w-full ${className}`}
    />
  );
}

/** Full-width figure for the article page, with licence credit printed in full. */
export function PhotoFigure({ slug, category }: { slug: string; category: string }) {
  const photo = getPhoto(slug);

  if (!photo) {
    return (
      <figure className="mt-6">
        <div className="aspect-[16/9] w-full overflow-hidden border border-rule">
          <ArticleArt seed={slug} category={category} ratio="wide" className="h-full w-full" />
        </div>
        <figcaption className="label-meta mt-2 leading-relaxed">
          Original vector artwork by NOT SCRIPTED. No freely-licensed photograph of this subject was
          available, so no photograph is shown.
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="mt-6">
      <div className="aspect-[16/9] w-full overflow-hidden border border-rule bg-paper-3">
        <img
          src={widestCandidate(photo.srcset, slug)}
          srcSet={photo.srcset}
          sizes={SIZES.full}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="mt-2 leading-relaxed">
        <span className="block font-ui text-[0.82rem] text-ink-2">{photo.caption}</span>
        <span className="label-meta mt-1 block">
          {photo.tier === "supplied" ? "Image: " : "Photograph: "}
          <a
            href={photo.sourceUrl}
            target="_blank"
            rel="noopener noreferrer license"
            className="underline decoration-rule-2 underline-offset-4 hover:text-brand"
          >
            {photo.author.split("(")[0].trim()}
            <span className="sr-only">
              {" "}
              (opens the source page in a new tab)
            </span>
          </a>
          ,{" "}
          <a
            href={photo.licenseUrl || "https://creativecommons.org/licenses/"}
            target="_blank"
            rel="noopener noreferrer license"
            className="underline decoration-rule-2 underline-offset-4 hover:text-brand"
          >
            {photo.license}
          </a>
          {photo.tier === "subject"
            ? ". Photograph of the subject reported."
            : photo.tier === "supplied"
              ? ". Supplied promotional artwork, not a photograph of the event reported."
              : ". Freely-licensed photograph of the subject in general, not of the specific event reported."}
        </span>
      </figcaption>
    </figure>
  );
}

export function PhotoCreditStrip() {
  const all = Object.values(PHOTOS);
  const subject = all.filter((p) => p.tier === "subject").length;
  const illustrative = all.length - subject;
  if (!all.length) return null;
  return (
    <div className="mt-3 border border-rule bg-paper-2/60 p-4">
      <p className="label-ui text-ink-4">Photography on this site</p>
      <p className="mt-2 font-ui text-[0.85rem] leading-relaxed text-ink-2">
        {all.length} of this archive&rsquo;s stories carry a real photograph. Every image is published under a
        licence that permits it, credited to its photographer, and linked to its source page. Nothing here
        uses another publication&rsquo;s news photography.
      </p>
      <p className="mt-2 font-ui text-[0.82rem] leading-relaxed text-ink-3">
        <span className="font-semibold text-ink-2">{subject}</span> of these photographs the actual subject
        reported. The remaining <span className="font-semibold text-ink-2">{illustrative}</span> are
        freely-licensed photographs of the general subject &mdash; the kind of thing a reader would
        recognise &mdash; and are captioned as illustrative rather than as pictures of the event. Where
        neither exists, the story shows original vector artwork instead of an unrelated stock image.
      </p>
    </div>
  );
}