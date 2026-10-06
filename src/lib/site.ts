export const SITE = {
  name: "NOT SCRIPTED",
  shortName: "NS",
  domain: "notscripted.in",
  url: "https://notscripted.in",
  tagline: "Reporting that shows its working",
  description:
    "NOT SCRIPTED is an independent digital newsroom covering India, Bengaluru and Karnataka, politics, business, technology, world affairs, geopolitics, science, environment, culture, lifestyle and sport. Every story records the sources behind it.",
  locale: "en_IN",
  language: "en",
  /** Edition stamp. The archive is a fixed edition, so relative timestamps are deterministic. */
  editionAt: "2026-10-06T05:45:00.000Z",
  timezone: "Asia/Kolkata",
  timezoneLabel: "IST",
  founded: 2026,
  contactEmail: "desk@notscripted.in",
  correctionsEmail: "corrections@notscripted.in",
  addressLines: [
    "NOT SCRIPTED Media LLP",
    "4th Floor, Brigade Road",
    "Bengaluru 560001",
    "Karnataka, India",
  ],
  social: {
    x: "https://x.com/notscriptedin",
    instagram: "https://www.instagram.com/notscriptedin",
    youtube: "https://www.youtube.com/@notscriptedin",
    linkedin: "https://www.linkedin.com/company/notscriptedin",
    rss: "/feed.xml",
  },
} as const;

export const NAV_TOP = [
  { label: "Home", href: "/" },
  { label: "Latest", href: "/latest" },
  { label: "Top Stories", href: "/top-stories" },
  { label: "India", href: "/section/india" },
  { label: "Politics", href: "/section/politics" },
  { label: "Business", href: "/section/business" },
  { label: "Technology", href: "/section/technology" },
  { label: "Bengaluru", href: "/section/karnataka" },
  { label: "World", href: "/section/world" },
  { label: "Sport", href: "/section/sports" },
  { label: "Opinion", href: "/opinion" },
  { label: "Archive", href: "/archive" },
];

export const NAV_FOOTER_SECTIONS = [
  {
    heading: "Sections",
    links: [
      { label: "India", href: "/section/india" },
      { label: "Politics", href: "/section/politics" },
      { label: "Business", href: "/section/business" },
      { label: "Technology", href: "/section/technology" },
      { label: "Bengaluru & Karnataka", href: "/section/karnataka" },
      { label: "World", href: "/section/world" },
      { label: "Geopolitics", href: "/section/geopolitics" },
      { label: "Science", href: "/section/science" },
      { label: "Environment", href: "/section/environment" },
      { label: "Culture", href: "/section/culture" },
      { label: "Lifestyle", href: "/section/lifestyle" },
      { label: "Sport", href: "/section/sports" },
    ],
  },
  {
    heading: "Desks",
    links: [
      { label: "Latest News", href: "/latest" },
      { label: "Top Stories", href: "/top-stories" },
      { label: "Breaking News", href: "/breaking" },
      { label: "Most Read", href: "/most-read" },
      { label: "Opinion & Analysis", href: "/opinion" },
      { label: "Explainers", href: "/explainers" },
      { label: "From Around The Web", href: "/from-around-the-web" },
      { label: "Original Reporting", href: "/original" },
    ],
  },
  {
    heading: "The archive",
    links: [
      { label: "Browse all stories", href: "/archive" },
      { label: "October 2026", href: "/archive?month=2026-10" },
      { label: "September 2026", href: "/archive?month=2026-09" },
      { label: "August 2026", href: "/archive?month=2026-08" },
      { label: "July 2026", href: "/archive?month=2026-07" },
      { label: "June 2026", href: "/archive?month=2026-06" },
      { label: "Source register", href: "/sources" },
    ],
  },
  {
    heading: "Newsroom",
    links: [
      { label: "About NOT SCRIPTED", href: "/about" },
      { label: "Editorial standards", href: "/editorial-standards" },
      { label: "How we source", href: "/sources" },
      { label: "Corrections", href: "/corrections" },
      { label: "Newsroom & bylines", href: "/newsroom" },
      { label: "Contact the desk", href: "/contact" },
    ],
  },
];