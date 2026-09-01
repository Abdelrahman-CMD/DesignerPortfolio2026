import type { Metadata } from "next";
import { HomeExperience } from "../components/HomeExperience";
import { Locale, LocalizedSurface } from "../i18n";

const resolveLocale = (value: string): Locale => value === "en" ? "en" : "nl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return locale === "en" ? {
    title: { absolute: "Abdelrahman — Senior digital designer" },
    description: "I design digital products at the intersection of strategy, human value and thoughtful visual direction.",
    alternates: { languages: { "nl-NL": "/nl", "en-GB": "/en" } },
  } : {
    title: { absolute: "Abdelrahman — Senior digitaal ontwerper" },
    description: "Ik ontwerp met alles wat ik onderweg leer: digitale producten op het snijvlak van strategie, menselijke waarde en doordachte vormgeving.",
    alternates: { languages: { "nl-NL": "/nl", "en-GB": "/en" } },
  };
}

export function generateStaticParams() {
  return [{ locale: "nl" }, { locale: "en" }];
}

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  return <LocalizedSurface locale={locale}><HomeExperience locale={locale} /></LocalizedSurface>;
}
