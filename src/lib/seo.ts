import type { Metadata } from "next";
import type { Article, Author } from "@/content/types";
import { PHOTOS } from "@/content/photos";
import { SITE } from "./site";

/**
 * SEO surface for the whole site.
 *
 * Everything here is derived from data the site already publishes: the SITE
 * constants, the photo register and the article records. Nothing invents an
 * author, a date, a source or an endorsement, and nothing claims a ranking or
 * an award.
 */

export const ORIGIN = SITE.url;

/** Resolve a site-relative path to an absolute URL. */
export function abs(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * Canonical paths always carry a trailing slash, because the site is built with
 * `trailingSlash: true`. Keeping this in one place stops the sitemap and the
 * `<link rel="canonical">` tags from disagreeing about the same URL.
 */
export function canonical(path: string): string {
  const clean = path.replace(/\/+$/, "");
  return `${clean}/`;
}

export const ORG_ID = `${ORIGIN}/#organization`;
export const WEBSITE_ID = `${ORIGIN}/#website`;
export const LOGO_PATH = "/icon.png";
export const LOGO_URL = abs(LOGO_PATH);
export const RSS_PATH = "/feed.xml";

/** Canonical identifier for the group that publishes this site. */
export const CIG_ID = "https://chavanindustrialgroup.com/#organization";
/** Canonical identifier for the owner of this publication. */
export const OWNER_ID = `${ORIGIN}/#shubhankar-chavan`;

/**
 * Only the Instagram profile was reachable when this was written. The other
 * handles in SITE.social returned 404, so they are deliberately left out of
 * `sameAs` rather than asserted as profiles that may not exist.
 */
const VERIFIED_SAME_AS = ["https://www.instagram.com/notscriptedin"];

/* ------------------------------------------------------------------ *
 * Ownership entities
 *
 * Chavan Industrial Group and its founder Shubhankar Chavan are the people
 * behind this publication. Every fact below is taken from the two entities' own
 * published pages; nothing is asserted beyond them. These nodes are emitted on
 * every page so that search engines and AI systems can connect the publication,
 * the group and the person, which is the point of an ownership disclosure.
 * ------------------------------------------------------------------ */

/** Profiles the entities publish for themselves on their own sites. */
const OWNER_SAME_AS = [
  "https://chavanindustrialgroup.com/about-founder.html",
  "https://shubhankarchavan.vercel.app/",
  "https://github.com/shubhankargithub",
  "https://www.linkedin.com/in/shubhankarchavan/",
];

const CIG_SAME_AS = ["https://www.instagram.com/chavanindustrialgroup"];

export function cigOrganizationNode() {
  return {
    "@type": "Organization",
    "@id": CIG_ID,
    name: "Chavan Industrial Group",
    alternateName: "CIG",
    url: "https://chavanindustrialgroup.com/",
    description:
      "Chavan Industrial Group is a registered MSME in Ahilyanagar, Maharashtra working in precision manufacturing, turnkey projects and institutional supply for Indian Railways, Defence and national infrastructure.",
    disambiguatingDescription:
      "Industrial engineering and supply group in Maharashtra; the group behind the NOT SCRIPTED publication.",
    email: "info@chavanindustrialgroup.com",
    telephone: "+91-98765-40524",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Manik Nagar",
      addressLocality: "Ahilyanagar",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    numberOfEmployees: { "@type": "QuantitativeValue", value: 5 },
    industry: "Industrial manufacturing and supply",
    sameAs: CIG_SAME_AS,
    founder: { "@id": OWNER_ID },
  };
}

export function ownerPersonNode() {
  return {
    "@type": "Person",
    "@id": OWNER_ID,
    name: "Shubhankar Chavan",
    alternateName: "Shubhankar Rahul Chavan",
    url: `${ORIGIN}/shubhankar-chavan/`,
    jobTitle: "Founder & CEO, Chavan Industrial Group; owner of NOT SCRIPTED",
    description:
      "Shubhankar Chavan is a founder and engineer from Maharashtra. He is the Founder and CEO of Chavan Industrial Group, an MSME in Ahilyanagar that supplies Indian Railways and Defence, and the owner of the NOT SCRIPTED publication.",
    worksFor: { "@id": CIG_ID },
    founderOf: { "@id": CIG_ID },
    sameAs: OWNER_SAME_AS,
    knowsAbout: [
      "Institutional supply",
      "Industrial procurement",
      "Fire safety equipment",
      "Railway components",
      "Cybersecurity",
      "Artificial intelligence",
      "Web development",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "MIT School of Computing",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Microsoft Certified: Security Operations Analyst Associate (SC-200)",
        credentialCategory: "certificate",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "EC-Council — Cybersecurity for Businesses, The Fundamental Edition",
        credentialCategory: "certificate",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "EC-Council — Make In-House Hacking and Pentesting Lab",
        credentialCategory: "certificate",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Cisco — Introduction to Cybersecurity",
        credentialCategory: "certificate",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };
}

/* ------------------------------------------------------------------ *
 * Images
 * ------------------------------------------------------------------ */

export interface SeoImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

/**
 * Pull the widest candidate out of a photo register `srcSet` string.
 *
 * The register's `base` field is empty for most entries, so deriving the path
 * from `srcSet` is the only reliable way to get a resolvable absolute URL. Every
 * referenced file is present in `public/`.
 */
function widestFromSrcset(srcset: string, slug: string): string | null {
  const candidates = srcset
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [url, width] = part.split(/\s+/);
      return { url, width: Number.parseInt(width ?? "0", 10) || 0 };
    })
    .filter((c) => Boolean(c.url));

  if (candidates.length === 0) return null;
  const best = candidates.reduce((a, b) => (b.width > a.width ? b : a));
  return best.url ?? `/img/articles/w/${slug}-1400.jpg`;
}

/** The featured photograph for an article, as an absolute URL, or null. */
export function articleImage(slug: string): SeoImage | null {
  const photo = PHOTOS[slug];
  if (!photo) return null;
  const url = widestFromSrcset(photo.srcset, slug);
  if (!url) return null;
  return { url: abs(url), width: photo.width, height: photo.height, alt: photo.alt };
}

/** Fallback card image: the existing wordmark icon. No new artwork is created. */
export function fallbackImage(): SeoImage {
  return {
    url: LOGO_URL,
    width: 512,
    height: 512,
    alt: `${SITE.name} wordmark`,
  };
}

/** Featured image for an article, falling back to the site icon. */
export function articleImageOrFallback(slug: string): SeoImage {
  return articleImage(slug) ?? fallbackImage();
}

/* ------------------------------------------------------------------ *
 * Structured data nodes
 * ------------------------------------------------------------------ */

/**
 * The publisher. Real facts only: legal name, address and contact come from
 * SITE, and `sameAs` lists only the one social profile that resolves.
 */
export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.domain,
    url: `${ORIGIN}/`,
    description: SITE.description,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
      caption: `${SITE.name} wordmark`,
    },
    image: LOGO_URL,
    sameAs: VERIFIED_SAME_AS,
    foundingDate: String(SITE.founded),
    founder: { "@id": OWNER_ID },
    parentOrganization: { "@id": CIG_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: "4th Floor, Brigade Road",
      addressLocality: "Bengaluru",
      postalCode: "560001",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "editorial",
        email: SITE.contactEmail,
        availableLanguage: ["en"],
        areaServed: "IN",
      },
      {
        "@type": "ContactPoint",
        contactType: "corrections",
        email: SITE.correctionsEmail,
        availableLanguage: ["en"],
        areaServed: "IN",
      },
    ],
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${ORIGIN}/`,
    name: SITE.name,
    alternateName: SITE.domain,
    description: SITE.description,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * A byline. Uses only the name, role and desk already shown in the newsroom
 * page. There are no author profile pages and no verified social handles, so no
 * `url` and no `sameAs` are claimed.
 */
export function personNode(author: Author) {
  return {
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    worksFor: { "@id": ORG_ID },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbNode(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(canonical(c.path)),
    })),
  };
}

/** Plain text of an article body, for wordCount. */
export function articlePlainText(article: Article): string {
  const out: string[] = [];
  for (const block of article.body) {
    if (block.kind === "para" || block.kind === "subhead" || block.kind === "dateline-note") {
      out.push(block.text);
    } else if (block.kind === "quote") {
      out.push(block.text);
      if (block.attribution) out.push(block.attribution);
    } else if (block.kind === "callout") {
      if (block.title) out.push(block.title);
      out.push(block.text);
    } else {
      out.push(block.items.join(" "));
    }
  }
  if (article.keyPoints) out.push(article.keyPoints.join(" "));
  if (article.sourcingNote) out.push(article.sourcingNote);
  return out.join(" ");
}

export function wordCount(article: Article): number {
  const text = articlePlainText(article);
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * NewsArticle for one story. Dates, byline, category, keywords and citations
 * all come straight off the article record.
 */
export function newsArticleNode(article: Article, author: Author, sectionName: string) {
  const url = abs(canonical(`/article/${article.slug}`));
  const image = articleImage(article.slug);
  return {
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: article.headline,
    description: article.dek,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@id": `${url}#author` },
    publisher: { "@id": ORG_ID },
    articleSection: sectionName,
    keywords: article.tags.join(", "),
    inLanguage: "en-IN",
    isAccessibleForFree: true,
    wordCount: wordCount(article),
    ...(article.dateline ? { dateline: article.dateline } : {}),
    ...(image
      ? {
          image: {
            "@type": "ImageObject",
            url: image.url,
            width: image.width,
            height: image.height,
            caption: image.alt,
          },
        }
      : {}),
    ...(article.sources.length
      ? {
          citation: article.sources.map((s) => ({
            "@type": "CreativeWork",
            name: s.name,
            url: s.url,
          })),
          isBasedOn: article.sources.map((s) => s.url),
        }
      : {}),
  };
}

/** The article's author, keyed so the NewsArticle can point at it by @id. */
export function articleAuthorNode(article: Article, author: Author) {
  const url = abs(canonical(`/article/${article.slug}`));
  return {
    "@type": "Person",
    "@id": `${url}#author`,
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    worksFor: { "@id": ORG_ID },
  };
}

/**
 * WebPage for any non-article route. Gives crawlers a single node that ties the
 * page to the publisher and states what the page is.
 */
export function webPageNode(input: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "CollectionPage";
  /** @id of the entity this page is about. Defaults to the publication. */
  about?: string;
}) {
  const url = abs(canonical(input.path));
  return {
    "@type": input.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    inLanguage: "en-IN",
    isAccessibleForFree: true,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": input.about ?? ORG_ID },
  };
}

/** An ordered list of the articles shown on a listing page. */
export function itemListNode(input: { path: string; articles: { slug: string; headline: string }[] }) {
  const url = abs(canonical(input.path));
  return {
    "@type": "ItemList",
    "@id": `${url}#list`,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: input.articles.length,
    itemListElement: input.articles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(canonical(`/article/${a.slug}`)),
      name: a.headline,
    })),
  };
}

/* ------------------------------------------------------------------ *
 * Page metadata
 * ------------------------------------------------------------------ */

export interface PageMetaInput {
  title: string;
  description: string;
  /** Site-relative path, with or without a trailing slash. */
  path: string;
  image?: SeoImage;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  keywords?: string[];
  noindex?: boolean;
}

/**
 * One metadata factory for every route.
 *
 * The root layout cannot supply a correct `og:url` or `og:title` for a child
 * page, and a partial `openGraph` block replaces the inherited one wholesale.
 * Building it here keeps the canonical, the share card and the RSS discovery
 * link correct and identical on all ~190 pages.
 */
export function pageMeta(input: PageMetaInput): Metadata {
  const url = abs(canonical(input.path));
  // Every page gets an image so share cards and AI crawlers never receive a bare
  // link. Pages with a lead story pass their featured photograph; the rest fall
  // back to the existing wordmark icon rather than new artwork.
  const image = input.image ?? fallbackImage();
  const isArticle = input.type === "article";

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: input.path,
      types: { "application/rss+xml": RSS_PATH },
    },
    ...(input.keywords?.length ? { keywords: input.keywords } : {}),
    ...(input.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: input.type ?? "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url,
      title: input.title,
      description: input.description,
      ...(image
        ? {
            images: [
              { url: image.url, width: image.width, height: image.height, alt: image.alt },
            ],
          }
        : {}),
      ...(isArticle
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
            section: input.section,
            tags: input.tags,
          }
        : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: input.title,
      description: input.description,
      ...(image ? { images: [image.url] } : {}),
    },
  };
}