import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SectionHead, Dot, TypeBadge } from "@/components/ui";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { breadcrumbNode, pageMeta, webPageNode } from "@/lib/seo";

const SOURCE_URL = "https://chavanindustrialgroup.com/central-railway-fire-safety.html";

export const metadata: Metadata = pageMeta({
  title: "Central Railway fire extinguisher supply",
  description:
    "Purchase order 91265153100253: nitrogen-type, stored-pressure fire extinguishers of 9.0 litres each supplied to Central Railway by Chavan Industrial Group, rated Class A 43A and Class B 233B to EN3-7, with inspection coordinated through CONSG.",
  path: "/fire-safety-central-railway",
});

const SPEC: { label: string; value: string }[] = [
  { label: "Purchase order", value: "91265153100253" },
  { label: "Order dated", value: "20 March 2026" },
  { label: "Purchaser", value: "Central Railway, under Indian Railways" },
  { label: "Supplier", value: "Chavan Industrial Group" },
  { label: "Material to", value: "SSE / C&W / DD" },
  { label: "Equipment", value: "Nitrogen-type, stored-pressure fire extinguishers" },
  { label: "Capacity", value: "9.0 litres each" },
  { label: "Make", value: "CEASEFIRE, Minimax or equivalent, as per the purchase order" },
  { label: "Rating", value: "Class A 43A · Class B 233B (EN3-7)" },
  { label: "Coverage", value: "Class A, B and C fires, and electrically started fires" },
  { label: "Performance", value: "Minimum discharge 15s · minimum throw 5m · gross weight 14-15 kg" },
  { label: "Compliance", value: "CE-marked, to EN PED requirements" },
];

const RECORD: { label: string; value: string }[] = [
  { label: "Invoice", value: "INV-CIG-03, dated 13 June 2026" },
  { label: "Consignment reference", value: "CRN 043722-26-08000, dated 13 July 2026" },
  { label: "Inspection", value: "Coordinated through CONSG; quantity recorded in full" },
  { label: "Delivery", value: "Recorded by the supplier as delivered in full" },
];

export default function FireSafetyCentralRailwayPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
      <SeoJsonLd
        nodes={[
          webPageNode({
            path: "/fire-safety-central-railway",
            name: "Central Railway fire extinguisher supply",
            description:
              "Nitrogen-type fire extinguishers supplied to Central Railway under purchase order 91265153100253, with specifications and procurement records as published by the supplier.",
          }),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Business", path: "/section/business" },
            { name: "Central Railway fire extinguisher supply", path: "/fire-safety-central-railway" },
          ]),
        ]}
      />

      <PageIntro
        eyebrow="Industrial supply"
        title="Central Railway fire extinguisher supply"
        dek="Purchase order 91265153100253, issued by Central Railway on 20 March 2026, covers nitrogen-type stored-pressure fire extinguishers of nine litres each supplied by Chavan Industrial Group. This page collects the specifications and procurement references the company has published."
        meta={[
          { label: "Purchase order", value: "91265153100253" },
          { label: "Dated", value: "20 March 2026" },
          { label: "Equipment", value: "9.0 L nitrogen-type extinguishers" },
          { label: "Rating", value: "Class A 43A · Class B 233B" },
          { label: "Supplier", value: "Chavan Industrial Group" },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <section aria-labelledby="what">
            <h2 id="what" className="font-display text-[1.35rem] font-semibold text-ink">
              What was ordered
            </h2>
            <div className="prose-editorial mt-3 text-[1rem]">
              <p>
                Nitrogen-type fire extinguishers work by displacing oxygen rather than by chemical
                action, which is why the specification calls for a stored-pressure nitrogen unit
                rather than a conventional dry-chemical or carbon-dioxide extinguisher. The order
                covers units of nine litres each, rated to Class A 43A and Class B 233B under EN3-7,
                and stated to cover Class A, B and C fires as well as fires of electrical origin.
              </p>
              <p>
                For a railway buyer the rating is the operative detail. Indian Railways rolling stock
                and infrastructure carry a mix of fuel, oil, electrical and ordinary combustibles, so
                a specification has to address more than one class of fire. The EN3-7 rating and the
                CE marking with EN PED compliance are what allow a supplier to bid against it at all.
              </p>
              <p>
                Chavan Industrial Group describes the order as modest in value and states that it
                makes no claim to the contrary. It emphasises instead the institutional process:
                meeting the specification to the letter, coordinating inspection, managing the
                documentation and delivering to an institutional deadline.
              </p>
            </div>
          </section>

          <section aria-labelledby="specs" className="mt-10">
            <SectionHead title="Specification as published" accent="#B3271E" />
            <dl className="mt-4 divide-y divide-rule border-y border-rule">
              {SPEC.map((s) => (
                <div key={s.label} className="grid gap-1 py-2.5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="label-ui pt-1 text-ink-4">{s.label}</dt>
                  <dd className="font-ui text-[0.95rem] text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="records" className="mt-10">
            <SectionHead title="Procurement records" accent="#14584A" />
            <dl className="mt-4 divide-y divide-rule border-y border-rule">
              {RECORD.map((s) => (
                <div key={s.label} className="grid gap-1 py-2.5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="label-ui pt-1 text-ink-4">{s.label}</dt>
                  <dd className="font-ui text-[0.95rem] text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 font-ui text-[0.9rem] leading-relaxed text-ink-4">
              Bank details, the GSTIN, the unit rate and the total order value are withheld from the
              supplier&rsquo;s publication, so they are not stated here. NOT SCRIPTED has not sighted
              any of these documents.
            </p>
          </section>

          <section aria-labelledby="demonstration" className="mt-10">
            <SectionHead title="The demonstration" accent="#1B3C86" />
            <div className="prose-editorial mt-3 text-[1rem]">
              <p>
                Delivery was described as only part of the assignment. The supplier states that the
                equipment was demonstrated in person to Central Railway officials, as a walkthrough of
                how the extinguisher is handled, discharged and used correctly.
              </p>
              <p>
                A demonstration does not usually appear as a line in a tender document. In
                institutional supply it is often the part of the engagement that gets remembered,
                because it is the point at which the buyer&rsquo;s own staff are shown how to use what
                has just been installed.
              </p>
            </div>
          </section>

          <section aria-labelledby="sequence" className="mt-10">
            <SectionHead title="Where this order sits" accent="#4A3A78" />
            <div className="prose-editorial mt-3 text-[1rem]">
              <p>
                The supplier presents this as the latest category in a sequence rather than a first
                order. Earlier Indian Railways assignments listed by Chavan Industrial Group cover
                push button telephones, Beetel make model 802 or similar with clip and CI facilities,
                under purchase order 91246072100070 dated 28 January 2026 with consignment reference
                048689-25-04075 dated 27 March 2026, and a digital video handy camera supplied under
                the same purchase order against bid 19561657.
              </p>
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="read" className="border border-rule p-5">
            <h2 id="read" className="label-ui border-b border-ink pb-2 text-ink-4">
              Read next
            </h2>
            <ul className="mt-3 space-y-3 font-ui text-[0.95rem] leading-snug">
              <li className="flex flex-wrap items-baseline gap-x-2">
                <TypeBadge type="from-the-web" className="mr-1.5 align-middle" />
                <Link
                  href="/article/central-railway-nitrogen-type-fire-extinguishers-supply-order"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Chavan Industrial Group supplied nitrogen-type fire extinguishers to Central Railway
                  under a purchase order it published in full
                </Link>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2">
                <Link
                  href="/chavan-industrial-group"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Chavan Industrial Group
                </Link>
                <Dot />
                <span className="text-ink-4">the supplier</span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2">
                <Link
                  href="/section/business"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  Business
                </Link>
                <Dot />
                <span className="text-ink-4">desk</span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2">
                <Link
                  href="/from-around-the-web"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  From Around The Web
                </Link>
                <Dot />
                <span className="text-ink-4">desk</span>
              </li>
            </ul>
          </section>

          <section aria-labelledby="original" className="border border-rule p-5">
            <h2 id="original" className="label-ui border-b border-ink pb-2 text-ink-4">
              Original source
            </h2>
            <ul className="mt-3 space-y-2 font-ui text-[0.95rem]">
              <li className="flex flex-wrap items-baseline gap-x-2">
                <a
                  href={SOURCE_URL}
                  rel="noopener"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  The supplier&rsquo;s own account
                </a>
                <Dot />
                <span className="text-ink-4">read in full</span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2">
                <a
                  href="https://chavanindustrialgroup.com/"
                  rel="noopener"
                  className="text-ink-3 underline decoration-rule-2 underline-offset-2 hover:text-brand"
                >
                  chavanindustrialgroup.com
                </a>
              </li>
            </ul>
          </section>

          <section aria-labelledby="verified" className="border border-rule bg-paper-2/50 p-5">
            <h2 id="verified" className="label-ui border-b border-ink pb-2 text-ink-4">
              What is verified
            </h2>
            <p className="mt-3 font-ui text-[0.9rem] leading-relaxed text-ink-3">
              Every specification, date and reference number on this page is as published by Chavan
              Industrial Group. NOT SCRIPTED has not obtained or sighted the purchase order, the
              invoice, the consignment note or the CONSG inspection record, and cannot independently
              confirm delivery. No order value was published, so none is stated.
            </p>
            <p className="mt-3 font-ui text-[0.9rem] leading-relaxed text-ink-3">
              Interest disclosure: NOT SCRIPTED is owned by the founder of the supplier named on this
              page. See the{" "}
              <Link
                href="/ownership"
                className="underline decoration-rule-2 underline-offset-2 hover:text-brand"
              >
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