import Link from "next/link";
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
        src={`${photo.base}-400.jpg`}
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
          src={`${photo.base}-1400.jpg`}
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
          Photograph:{" "}
          <a
            href={photo.sourceUrl}
            target="_blank"
            rel="noopener noreferrer license"
            className="underline decoration-rule-2 underline-offset-4 hover:text-brand"
          >
            {photo.author.split("(")[0].trim()}
            <span className="sr-only">
              {" "}
              (opens the file page on Wikimedia Commons in a new tab)
            </span>
          </a>{" "}
          via{" "}
          <a
            href="https://commons.wikimedia.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-rule-2 underline-offset-4 hover:text-brand"
          >
            Wikimedia Commons
          </a>
          ,{" "}
          {photo.licenseUrl ? (
            <a
              href={photo.licenseUrl}
              target="_blank"
              rel="noopener noreferrer license"
              className="underline decoration-rule-2 underline-offset-4 hover:text-brand"
            >
              {photo.license}
            </a>
          ) : (
            <span>{photo.license}</span>
          )}
          . Illustrative photograph of the subject, not of the specific event reported.
        </span>
      </figcaption>
    </figure>
  );
}

export function PhotoCreditStrip() {
  const n = Object.keys(PHOTOS).length;
  if (!n) return null;
  return (
    <p className="mt-3 font-ui text-[0.78rem] leading-relaxed text-ink-3">
      {n} of this archive&rsquo;s stories carry a freely-licensed photograph. Every image is credited to its
      photographer with the licence it is published under, and linked to its file page on Wikimedia
      Commons. Where no licensed photograph of a subject exists, the story shows original artwork
      instead of substituting an unrelated stock image.{" "}
      <Link
        href="/editorial-standards"
        className="underline decoration-rule-2 underline-offset-4 hover:text-brand"
      >
        See our editorial standards
      </Link>
      .
    </p>
  );
}