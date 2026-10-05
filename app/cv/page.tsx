import type { Metadata } from "next";
import { CvExperience } from "../components/CvExperience";
import { LocalizedSurface } from "../i18n";

export const metadata: Metadata = {
  title: "Curriculum vitae",
  description:
    "Bachelor Communicatie en Multimedia Design plus zestien jaar retail-ervaring: design en organisatie in één loopbaan.",
  openGraph: { url: "/nl/cv", locale: "nl_NL", title: "Abdel Ahmed · CV", images: [{ url: "/cv/og-image.jpg", width: 1200, height: 630, alt: "Abdel Ahmed · Op het snijvlak van design en organisatie" }] },
  twitter: { card: "summary_large_image", images: ["/cv/og-image.jpg"] },
  alternates: { canonical: "/nl/cv", languages: { "nl-NL": "/nl/cv", "en-GB": "/en/cv", "x-default": "/nl/cv" } },
};

export default function Cv() {
  return <LocalizedSurface locale="nl" respectPreference><CvExperience locale="nl" /></LocalizedSurface>;
}
