import type { Metadata } from "next";
import { HomeExperience } from "./components/HomeExperience";
import { LocalizedSurface } from "./i18n";

export const metadata: Metadata = {
  title: { absolute: "Product & UX/UI designer in Amsterdam · Abdelrahman Ahmed" },
  description:
    "Product & UX/UI designer die onduidelijke ideeën vertaalt naar heldere websites, flows en interfaces.",
  alternates: { canonical: "/nl", languages: { "nl-NL": "/nl", "en-GB": "/en", "x-default": "/nl" } },
  openGraph: {
    title: "Van onduidelijk idee naar heldere digitale ervaring.",
    description: "Portfolio van Abdelrahman Ahmed: productstrategie, UX/UI en visuele uitvoering voor websites en digitale producten.",
    url: "/nl",
    locale: "nl_NL",
    images: [{ url: "/og-mind-hero.jpg", width: 1672, height: 941, alt: "Abdelrahman Ahmed, product & UX/UI designer in Amsterdam" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Van onduidelijk idee naar heldere digitale ervaring.",
    description: "Portfolio van Abdelrahman Ahmed: productstrategie, UX/UI en visuele uitvoering voor websites en digitale producten.",
    images: ["/og-mind-hero.jpg"],
  },
};

export default function Home() {
  return <LocalizedSurface locale="nl" respectPreference><HomeExperience locale="nl" /></LocalizedSurface>;
}
