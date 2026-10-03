import type { Metadata } from "next";
import { CvExperience } from "../components/CvExperience";
import { LocalizedSurface } from "../i18n";

export const metadata: Metadata = {
  title: "Curriculum vitae",
  description:
    "Bachelor Communicatie en Multimedia Design plus zestien jaar retail-ervaring: design en organisatie in één loopbaan.",
  alternates: { canonical: "/nl/cv", languages: { "nl-NL": "/nl/cv", "en-GB": "/en/cv", "x-default": "/nl/cv" } },
};

export default function Cv() {
  return <LocalizedSurface locale="nl" respectPreference><CvExperience locale="nl" /></LocalizedSurface>;
}
