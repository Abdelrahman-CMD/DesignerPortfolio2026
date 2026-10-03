import type { Metadata } from "next";
import { HomeExperience } from "./components/HomeExperience";
import { LocalizedSurface } from "./i18n";

export const metadata: Metadata = {
  title: { absolute: "Abdelrahman · Senior digitaal ontwerper" },
  description:
    "Ik ontwerp met alles wat ik onderweg leer: digitale producten op het snijvlak van strategie, menselijke waarde en doordachte vormgeving.",
  alternates: { canonical: "/nl", languages: { "nl-NL": "/nl", "en-GB": "/en", "x-default": "/nl" } },
};

export default function Home() {
  return <LocalizedSurface locale="nl" respectPreference><HomeExperience locale="nl" /></LocalizedSurface>;
}
