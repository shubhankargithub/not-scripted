import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SectionHead, Dot } from "@/components/ui";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { breadcrumbNode, pageMeta, webPageNode, CIG_ID } from "@/lib/seo";

const SITE_URL = "https://chavanindustrialgroup.com/";

export const metadata: Metadata = pageMeta({
  title: "Chavan Industrial Group",
  description:
    "Chavan Industrial Group is a registered MSME in Ahilyanagar, Maharashtra working in precision manufacturing, turnkey projects and institutional supply for Indian Railways, Defence and infrastructure. Its capabilities, record and contact details.",
  path: "/chavan-industrial-group",
});

const CAPABILITIES: { title: string; body: string }[] = [
  {
    title: "Precision manufacturing",
    body: "CNC machining and fabrication for railway and defence components, described by the company as working to zero-tolerance specifications.",
  },
  {
    title: "Turnkey projects",
    body: "End-to-end execution from design and manufacture through assembly, installation and commissioning, with the company carrying full accountability for the engagement.",
  },
  {
    title: "Engineering solutions",
    body: "Custom engineering design, prototyping and technical consulting for specialised industrial and infrastructure applications.",
  },
  {
    title: "Supply chain",
    body: "Sourcing, inventory management and just-in-time delivery of components and raw materials, which is the discipline behind the group's railway orders.",
  },
  {
    title: "Quality assurance",
    body: "Testing, inspection and certification. The company states that its manufacturing processes are ISO-certified on every engagement.",
  },
  {
    title: "Technical support",
    body: "After-sales support, maintenance, repairs and technical consultation for delivered projects and products.",
  },
];

const MILESTONES: { when: string; what: string; detail: string; href?: string }[] = [
  {
    when: "30 June 2025",
    what: "New fabrication facility inaugurated",
    detail:
      "A facility dedicated to manufacturing high-precision components for rail and defence, expanding the group's in-house capability.",
  },
  {
    when: "28 January 2026",
    what: "Digital video handy camera supplied to Indian Railways",
    detail:
      "Purchase order 91246072100070, against bid 19561657 opened on the same date under office tender 91246072.",
  },
  {
    when: "27 March 2026",
    what: "Push button telephones supplied to Indian Railways",
    detail:
      "Beetel make, model 802 or similar, with clip and CI facilities, under purchase order 91246072100070 dated 28 January 2026. Consignment reference 048689-25-04075.",
  },
  {
    when: "20 March 2026",
    what: "Nitrogen-type fire extinguishers supplied to Central Railway",
    detail:
      "Purchase order 91265153100253 for nine-litre stored-pressure extinguishers. Inspection coordinated through CONSG; invoice INV-CIG-03 dated 13 June 2026.",
    href: "/fire-safety-central-railway",
  },
];

export default function ChavanIndustrialGroupPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <SeoJsonLd
        nodes={[
          webPageNode({
            path: "/chavan-industrial-group",
            name: "Chavan Industrial Group",
            description:
              "An MSME in Ahilyanagar, Maharashtra working in precision manufacturing, turnkey projects and institutional supply for Indian Railways, Defence and infrastructure.",
            about: CIG_ID,
          }),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Chavan Industrial Group", path: "/chavan-industrial-group" },
          ]),
        ]}
      />

      <PageIntro
        eyebrow="The group behind this publication"
        title="Chavan Industrial Group"
        dek="An MSME in Ahilyanagar, Maharashtra working in precision manufacturing, turnkey projects and institutional supply for Indian Railways, Defence and national infrastructure. Founded and led by Shubhankar Chavan."
        meta={[
          { label: "Registered as", value: "MSME" },
          { label: "Based in", value: "Ahilyanagar, Maharashtra" },
          { label: "Founder & CEO", value: "Shubhankar Chavan" },
          { label: "Years in industry", value: "2+" },
          { label: "Projects delivered", value: "50+" },
          { label: "Team members", value: "5" },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <section aria-labelledby="what-it-is">
            <h2 id="what-it-is" className="font-display text-[1.35rem] font-semibold text-ink">
              What the group does
            </h2>
            <div className="prose-editorial mt-3 text-[1rem]">
              <p>
                Chavan Industrial Group describes itself as an engineering, manufacturing and supply
                business working across five areas: railways, defence, infrastructure, industrial
                supply and engineering solutions. Its stated customers are institutional rather than
                consumer — Indian Railways, Ministry of Defence establishments and other national
                bodies — and the work is described as precision supplies, turnkey projects and
                specialised engineering services.
              </p>
              <p>
                The company states that in a little over two years it has grown from a solo effort
                into a team of five, sourcing, manufacturing and delivering materials and
                components to institutional clients across communication equipment, surveillance
                systems, fire-safety gear and general industrial supply.
              </p>
              <p>
                Its own account of the approach is that institutional supply is not the same as
                selling a product. It is described as a chain of disciplines: reading a
                specification precisely, sourcing to standard, preparing documentation, coordinating
                inspection, managing logistics and meeting delivery commitments.
              </p>
            </div>
          </section>

          <section aria-labelledby="capabilities" className="mt-10">
            <SectionHead title="Capabilities" accent="#14584A" />
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {CAPABILITIES.map((c) => (
                <li key={c.title} className="border border-rule p-4">
                  <h3 className="font-display text-[1.05rem] font-semibold text-ink">{c.title}</h3>
                  <p className="mt-1.5 font-ui text-[0.92rem] leading-relaxed text-ink-3">{c.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="milestones" className="mt-10">
            <SectionHead title="Record" accent="#B3271E" kicker="As published by the company" />
            <ol className="mt-4 space-y-4">
              {MILESTONES.map((m) => (
                <li key={m.what} className="border-l-[3px] border-ink pl-4">
                  <p className="label-ui text-ink-4">{m.when}</p>
                  <h3 className="mt-1 font-display text-[1.1rem] font-semibold text-ink">
                    {m.href ? (
                      <Link href={m.href} className="transition-colors hover:text-brand">
                        {m.what}
                      </Link>
                    ) : (
                      m.what
                    )}
                  </h3>
                  <p className="mt-1 font-ui text-[0.95rem] leading-relaxed text-ink-3">{m.detail}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-ui text-[0.9rem] text-ink-4">
              Order references above are as published by Chavan Industrial Group. NOT SCRIPTED has
              not sighted the underlying purchase orders.
            </p>
          </section>
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="contact" className="border border-rule p-5">
            <h2 id="contact" className="label-ui border-b border-ink pb-2 text-ink-4">
              Contact
            </h2>
            <address className="mt-3 font-ui text-[0.95rem] not-italic leading-relaxed text-ink-3">
              <strong className="text-ink">Chavan Industrial Group</strong>
              <br />
              Manik Nagar
              <br />
              Ahilyanagar, Maharashtra
              <br />
              India
            </address>
            <ul className="mt-3 space-y-1 font-ui text-[0.92rem]">
              <li>
                <a
                  href="mailto:info@chavanindustrialgroup.com"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  info@chavanindustrialgroup.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876540524"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  +91 98765 40524
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="offsite" className="border border-rule p-5">
            <h2 id="offsite" className="label-ui border-b border-ink pb-2 text-ink-4">
              Elsewhere
            </h2>
            <ul className="mt-3 space-y-2 font-ui text-[0.95rem]">
              <li className="flex flex-wrap items-baseline gap-x-2">
                <a
                  href={SITE_URL}
                  rel="noopener"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  chavanindustrialgroup.com
                </a>
                <Dot />
                <span className="text-ink-4">company site</span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2">
                <a
                  href="https://www.instagram.com/chavanindustrialgroup/"
                  rel="noopener"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Instagram
                </a>
                <Dot />
                <span className="text-ink-4">@chavanindustrialgroup</span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2">
                <Link
                  href="/shubhankar-chavan"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Shubhankar Chavan
                </Link>
                <Dot />
                <span className="text-ink-4">founder</span>
              </li>
            </ul>
          </section>

          <section aria-labelledby="note" className="border border-rule bg-paper-2/50 p-5">
            <h2 id="note" className="label-ui border-b border-ink pb-2 text-ink-4">
              Sourcing note
            </h2>
            <p className="mt-3 font-ui text-[0.9rem] leading-relaxed text-ink-3">
              Everything on this page is taken from the group&rsquo;s own published pages. Claims of
              certification, accreditation and client relationships are the group&rsquo;s own and have
              not been independently verified by this publication. Order references are quoted as
              published; the underlying documents were not sighted.
            </p>
            <p className="mt-3 font-ui text-[0.9rem] leading-relaxed text-ink-3">
              Chavan Industrial Group is the group behind NOT SCRIPTED. The full relationship is set
              out on the{" "}
              <Link href="/ownership" className="underline decoration-rule-2 underline-offset-2 hover:text-brand">
                ownership page
              </Link>
              .
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}