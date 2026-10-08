import type { Metadata } from "next";
import { HomeExperience } from "./components/HomeExperience";
import { LocalizedSurface } from "./i18n";

export const metadata: Metadata = {
  title: { absolute: "Product & UX/UI designer in Amsterdam · Abdelrahman Ahmed" },
  description:
    "Ik haal de twijfel uit digitale keuzes. Acht cases van eerste gesprek tot live website, waarvan drie draaien voor echte opdrachtgevers.",
  alternates: { canonical: "/nl", languages: { "nl-NL": "/nl", "en-GB": "/en", "x-default": "/nl" } },
};

export default function Home() {
  return <LocalizedSurface locale="nl" respectPreference><HomeExperience locale="nl" /></LocalizedSurface>;
}
