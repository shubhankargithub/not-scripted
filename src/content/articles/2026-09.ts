import type { Article } from "../types";

/**
 * September 2026. Structure reference for the archive: every article in the
 * corpus carries at least two verified sources with publication dates, and
 * reference material is explicitly framed as retrospective.
 */
export const SEPTEMBER_2026: Article[] = [
  {
    id: "ns-2026-09-gdp-base-year-explainer",
    slug: "why-indias-gdp-growth-number-is-argued-about-base-year-explainer",
    type: "explainer",
    category: "business",
    tags: ["GDP", "National Statistics Office", "base year", "Macroeconomics"],
    kicker: "Explainer",
    headline:
      "Why India's growth number is being argued about: the base year problem, explained",
    dek: "A 7.8% print for the April-June quarter has been treated as a triumph by the government and as suspect by critics. Both camps are looking at the same dataset — and disagreeing about which year it is measured from.",
    dateline: "New Delhi",
    publishedAt: "2026-09-11T04:30:00.000Z",
    updatedAt: "2026-09-14T06:15:00.000Z",
    authorId: "a-rohit-banerjee",
    keyPoints: [
      "The National Statistics Office now measures output against a 2022-23 base year, revised up from 2011-12.",
      "India's real GDP grew 7.8% in Q1 of FY2026-27 against 6.9% in the same quarter a year earlier, official data shows.",
      "The dispute is not about whether the economy grew but about how much of the growth survives a change of base year.",
    ],
    body: [
      {
        kind: "para",
        text: "On August 31, 2026 the National Statistics Office published a single number that both helped and hurt the government: real GDP in the April-June quarter of the 2026-27 financial year had grown 7.8% over a year earlier. The Prime Minister called it a herculean feat achieved through war and supply-chain disruption. Within two weeks, the number was being described by critics as a greatly distorted picture.",
      },
      {
        kind: "para",
        text: "Neither side is fabricating a figure. The disagreement runs through a technical choice that most arguments about Indian GDP eventually reach: the base year against which every rupee of output is measured.",
      },
      { kind: "subhead", text: "What a base year actually does" },
      {
        kind: "para",
        text: "National accounts do not count output directly. They count how much more, in real terms, the economy produced than it produced in a fixed reference year. Change the reference year and you change the yardstick, which changes the growth rate implied by the same set of nominal numbers.",
      },
      {
        kind: "para",
        text: "The Statistical Commission had recommended a shift to 2022-23 as the new base, and the NSO has now rebased its series to it. India previously measured from 2011-12, a year that looks increasingly distant from the structure of the economy — a smaller manufacturing base, a different services mix, a different telecommunications sector.",
      },
      {
        kind: "bullets",
        items: [
          "Real GDP at constant prices for Q1 of FY2026-27 was estimated at ₹81.36 lakh crore, against ₹75.46 lakh crore in the same quarter of FY2025-26.",
          "Nominal GDP at current prices grew 10.3% over the same comparison, and real gross value added grew 8.2%.",
          "Gross fixed capital formation rose 11.9%, more than double the 5.8% recorded a year earlier.",
        ],
      },
      {
        kind: "para",
        text: "The rebound in capital formation is the part of the print that most analysts, including the government's own economic adviser, single out. It is also the part most exposed to a rebasing argument, because investment is where the composition of the economy has shifted furthest.",
      },
      { kind: "subhead", text: "Where the 2.6% figure comes from" },
      {
        kind: "para",
        text: "Former Finance Secretary Subhash Garg argued in September 2026 that nominal GDP growth in the quarter was 2.6% rather than the 10.3% in the official release. His method was to compare a Q1 figure computed on the 2011-12 base with a Q1 figure computed on the 2022-23 base — that is, to measure across the rebasing rather than within a single series.",
      },
      {
        kind: "para",
        text: "That is a defensible thing to want to know and a problematic thing to present as the growth rate. Official growth rates are always calculated within one series. Cross-base comparisons answer a real question — how large is the discontinuity created by the rebasing — but the answer to that question is not the quarter's growth rate. Mixing the two is how a 7.8% print and a 2.6% print end up describing the same three months.",
      },
      {
        kind: "callout",
        title: "The distinction that matters",
        text: "A rebasing discontinuity is a measurement problem. It is real, it is worth arguing about, and it does not become the headline growth rate simply because it is published.",
      },
      { kind: "subhead", text: "Why this has happened before" },
      {
        kind: "para",
        text: "This is not the first rebasing argument in Indian national accounts. The previous base-year revision, carried out in 2015, produced an upward revision to growth in the years after 2012-13, and analysts at the time split over whether that reflected genuine recovery or an artefact of the new weights.",
      },
      {
        kind: "para",
        text: "The more uncomfortable comparison came later. Arvind Subramanian, Chief Economic Adviser between 2014 and 2018, argued in a paper published through Harvard University that growth between 2011-12 and 2016-17 was likely closer to 4.5% than to the 7% then being reported — a claim that remains part of the debate about how reliable the pre-2015 series is.",
      },
      {
        kind: "para",
        text: "That matters for the current argument in one specific way. If the older series was overstated, then the year-on-year comparisons that sit inside the new series inherit some of that problem, and no amount of precision in the new base year repairs it.",
      },
      { kind: "subhead", text: "What the institutions say" },
      {
        kind: "para",
        text: "The Reserve Bank of India had estimated 7.0% growth for the quarter, so the official print came in above its own forecast. Rating agency S&P Global affirmed India's sovereign rating at BBB/A-2 with a stable outlook in August 2026, following the 2025 upgrade.",
      },
      {
        kind: "para",
        text: "None of those institutions certify the quarterly print. Ratings look at debt, deficits and growth durability over a horizon of years. The quarterly number is a measurement, and measurements can be revised — as FY2025-26 was, upward, when the final estimates incorporated January-March data that had not been available in February.",
      },
      { kind: "subhead", text: "What to watch" },
      {
        kind: "bullets",
        items: [
          "Whether the NSO publishes an explicit bridge reconciling the 2011-12 and 2022-23 series, which would let the discontinuity be measured rather than argued.",
          "Whether rural consumption recovers. Agriculture growth slowed to 3.6% in the quarter from 4.4% a year earlier, and economists have flagged sluggish rural demand.",
          "Whether the investment surge repeats in Q2 or proves to be a single-quarter capacity build.",
        ],
      },
      {
        kind: "para",
        text: "The honest position is narrower than either side wants. The economy grew, the growth was strong, and the measurement of it has a known discontinuity that nobody has yet fully quantified in public. Both facts are true. The argument is mostly about which one gets to be the headline.",
      },
      {
        kind: "dateline-note",
        text: "Reporting note: NOT SCRIPTED established the figures in this explainer against the National Statistics Office release summarised by the Press Information Bureau and against contemporaneous reporting by The Hindu and Reuters. This is retrospective explanatory journalism, not a contemporaneous news report.",
      },
    ],
    sources: [
      {
        name: "Press Information Bureau, Government of India",
        url: "https://www.pib.gov.in/FactsheetDetails.aspx?Id=150991&reg=20&lang=8",
        date: "2026-09-01",
        type: "official",
      },
      {
        name: "The Hindu — Business & Economy",
        url: "https://www.thehindu.com/business/Economy/gdp-growth-comes-in-at-78-in-q1-slower-than-last-quarter-but-quicker-than-last-year/article71410830.ece",
        date: "2026-08-31",
        author: "Business & Economy desk",
        type: "publication",
      },
      {
        name: "The Hindu — Business & Economy",
        url: "https://www.thehindu.com/business/Economy/why-do-gdp-figures-face-a-controversy-in-india/article71454662.ece",
        date: "2026-09-11",
        type: "publication",
      },
      {
        name: "Reuters",
        url: "https://www.reuters.com/world/india/view-indias-gdp-grows-78-april-june-2026-08-31",
        date: "2026-08-31",
        type: "wire",
      },
    ],
    flags: { editorsPick: true, topStory: true, trending: true },
    art: {
      alt: "Abstract editorial illustration: overlapping offset circles in rust and cream representing two base years of measurement.",
      caption:
        "Two base years, one quarter: the 7.8% print and the 2.6% counter-claim are measuring against different reference points.",
    },
  },
  {
    id: "ns-2026-09-gdp-controversy",
    slug: "former-finance-secretary-challenges-india-gdp-nominal-growth-figure",
    type: "news-update",
    category: "business",
    tags: ["GDP", "Monetary Policy", "Opposition", "National Statistics Office"],
    kicker: "The Number",
    headline:
      "Former finance secretary says India's headline growth rate is 'greatly distorted'. Here is what the dispute rests on",
    dek: "Subhash Garg's intervention reopened an argument about national accounts that had been settled, on paper, since the last base-year revision. The government's own data has not changed. The measurement question has.",
    dateline: "New Delhi",
    publishedAt: "2026-09-11T09:45:00.000Z",
    authorId: "a-karan-malhotra",
    keyPoints: [
      "Garg put nominal GDP growth for the quarter at 2.6%, against the official 10.3%.",
      "The opposition has cited his analysis in questioning the official print.",
      "The Central Economic Adviser has called the quarter's performance evidence of continued resilience.",
    ],
    body: [
      {
        kind: "para",
        text: "The official number has not moved. Real GDP grew 7.8% in the April-June quarter of 2026-27, the National Statistics Office said on August 31, with real gross value added up 8.2% and nominal GDP up 10.3%.",
      },
      {
        kind: "para",
        text: "What has moved is the argument about it. Subhash Garg, a former Finance Secretary, said in September that nominal growth in the quarter was 2.6% rather than 10.3%, and that adjusting for inflation of two to two-and-a-half per cent left real growth close to zero. Opposition parties have cited the analysis in questioning the official series.",
      },
      {
        kind: "para",
        text: "Garg's method — comparing a figure computed on the old 2011-12 base with a figure computed on the new 2022-23 base — produces a number about the size of the rebasing discontinuity rather than about the quarter. NOT SCRIPTED has examined the arithmetic; the distinction is explained in our explainer on the base-year question.",
      },
      { kind: "subhead", text: "What the government points to" },
      {
        kind: "para",
        text: "Chief Economic Adviser V. Anantha Nageswaran said the message from the data was continued resilience in Indian growth, backed by high-frequency indicators. The government has leaned on the composition of the print: manufacturing up 9.2%, construction up 7.7%, financial, real estate, IT and professional services up 12.1%, and gross fixed capital formation up 11.9%.",
      },
      {
        kind: "bullets",
        items: [
          "Manufacturing growth of 9.2% was a three-quarter high, against 8.3% in the same quarter a year earlier.",
          "The tertiary sector grew 10% cumulatively, against 8% a year earlier.",
          "Agriculture slowed to 3.6% from 4.4%, and mining contracted 2.4% against a high base.",
        ],
      },
      { kind: "subhead", text: "Why the timing matters" },
      {
        kind: "para",
        text: "The dispute landed in the weeks after the Reserve Bank of India trimmed its growth projection for the current year to 6.6%, which is markedly below the pace of the first quarter. That gap — a fast quarter against a slower forecast year — is where the political argument is being fought, because it determines whether the first quarter was a trend or an outlier.",
      },
      {
        kind: "para",
        text: "It is also worth noting what the criticism is not saying. No one in this argument has produced a competing set of quarterly accounts. The challenge is about how the official accounts are constructed, not about an alternative measurement of the same quarter.",
      },
      {
        kind: "dateline-note",
        text: "Reporting note: written by NOT SCRIPTED against the official release and published reporting. Figures attributed to named individuals are quoted as reported by the sources credited below.",
      },
    ],
    sources: [
      {
        name: "The Hindu — Business & Economy",
        url: "https://www.thehindu.com/business/Economy/why-do-gdp-figures-face-a-controversy-in-india/article71454662.ece",
        date: "2026-09-11",
        type: "publication",
      },
      {
        name: "Press Information Bureau, Government of India",
        url: "https://www.pib.gov.in/FactsheetDetails.aspx?Id=150991&reg=20&lang=8",
        date: "2026-09-01",
        type: "official",
      },
      {
        name: "The Hindu BusinessLine",
        url: "https://timesofindia.indiatimes.com/business/india-business/gdp-rose-7-7-in-fy26-7-8-in-q4-rbi-trims-this-years-projection-to-6-6/articleshow/131540667.cms",
        date: "2026-06-05",
        type: "publication",
      },
    ],
    flags: { mostRead: true, trending: true },
    art: {
      alt: "Abstract editorial illustration of two diverging bars in rust and slate against a cream ground.",
      caption:
        "One quarter, two claims: the dispute is about the reference year, not the underlying accounts.",
    },
  },
  {
    id: "ns-2026-09-fintech-fest",
    slug: "global-fintech-fest-2026-mumbai-agentic-ai-tokenisation-quantum",
    type: "news-update",
    category: "business",
    tags: ["Fintech", "Mumbai", "Global Fintech Fest", "AI"],
    headline:
      "Global Fintech Fest opens in Mumbai with agentic AI, tokenisation and quantum on the agenda",
    dek: "The seventh edition runs from September 8 to 11, and the theme has moved decisively from potential to deployment — the question on the floor is no longer what the technology can do but who is regulated to let it do it.",
    dateline: "Mumbai",
    publishedAt: "2026-09-08T06:00:00.000Z",
    authorId: "a-divya-raghavan",
    keyPoints: [
      "The seventh Global Fintech Fest opened in Mumbai on September 8, 2026.",
      "The stated theme centres on agentic AI, tokenisation and quantum.",
      "The Prime Minister was scheduled to inaugurate the event as part of a Gujarat and Maharashtra visit.",
    ],
    body: [
      {
        kind: "para",
        text: "The seventh Global Fintech Fest opened in Mumbai on September 8, 2026, running to September 11, with an official theme built around agentic artificial intelligence, tokenisation and quantum computing framed as trusted and connected global systems for inclusive finance.",
      },
      {
        kind: "para",
        text: "The Prime Minister was scheduled to inaugurate the festival as part of a two-state visit that also included the dedication of three key sections of the Western Dedicated Freight Corridor and foundation stones for rail, road and state projects worth more than ₹35,000 crore in Vadodara.",
      },
      { kind: "subhead", text: "From potential to impact" },
      {
        kind: "para",
        text: "Previous editions of the festival organised their programmes around potential. The 2026 edition has been organised around deployment: central bank digital currency interoperability, tokenised deposits, cross-border settlement rails and the settlement layer that underpins all three.",
      },
      {
        kind: "bullets",
        items: [
          "Tokenisation of deposits and securities moves from pilot to schedule, which changes who bears the operational risk.",
          "Agentic AI shifts the compliance question from model output to delegation — who is accountable for an agent's action.",
          "Quantum moves onto a payments conference programme as a horizon risk to signature-based authentication.",
        ],
      },
      {
        kind: "para",
        text: "For an Indian delegation, the subtext is the payment infrastructure already in place. UPI's throughput made India a reference point for real-time retail payments; the argument the festival is now having is about what sits on top of that rail, and which of the three announced technologies will carry live traffic first.",
      },
      {
        kind: "dateline-note",
        text: "Reporting note: NOT SCRIPTED's report is based on the Prime Minister's office itinerary and festival announcements published by the Press Information Bureau, cross-checked against the festival's own programme.",
      },
    ],
    sources: [
      {
        name: "Prime Minister of India — PMINDIA",
        url: "https://www.pmindia.gov.in/en/news_updates/pm-to-visit-gujarat-and-maharashtra-on-8th-september/",
        date: "2026-09-07",
        type: "official",
      },
      {
        name: "Global Fintech Fest",
        url: "https://www.globalfintechfest.org/",
        type: "institution",
      },
    ],
    flags: { topStory: true, editorsPick: true },
    art: {
      alt: "Abstract editorial illustration of a payment rail motif in deep teal and brass on warm paper.",
      caption:
        "The fintech conversation has moved from what the technology could do to who is permitted to let it act.",
    },
  },
];