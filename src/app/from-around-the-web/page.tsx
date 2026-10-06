import { toCards } from "@/lib/card";
import type { Metadata } from "next";
import { ListingView } from "@/components/ListingView";
import { getDeskConfig } from "@/lib/listings";

export const metadata: Metadata = {
  title: "From Around The Web",
  description: "Independently written summaries of reporting published elsewhere, with clear attribution and a link to the original source in every case.",
  alternates: { canonical: "/from-around-the-web" },
};

export default function Page() {
  const cfg = getDeskConfig("/from-around-the-web")!;
  return (
    <ListingView
      eyebrow={cfg.eyebrow}
      title={cfg.title}
      dek={cfg.dek}
      articles={toCards(cfg.articles)}
      accent={cfg.accent}
      basePath="/from-around-the-web"
      page={1}
      totalPages={1}
      meta={cfg.meta}
      sidebarTitle={cfg.sidebarTitle}
    />
  );
}