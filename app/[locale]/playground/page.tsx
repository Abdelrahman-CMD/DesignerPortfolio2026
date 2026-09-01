import type { Metadata } from "next";
import { PlaygroundExperience } from "../../components/PlaygroundExperience";
import { Locale, LocalizedSurface } from "../../i18n";

const resolveLocale = (value: string): Locale => value === "en" ? "en" : "nl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return {
    title: "Playground",
    description: locale === "en"
      ? "An atmospheric space for experiments, sketches and ideas before they need to become a finished case study."
      : "Een atmosferische ruimte voor experimenten, schetsen en ideeën die nog niet in een case hoeven te passen.",
    alternates: { languages: { "nl-NL": "/nl/playground", "en-GB": "/en/playground" } },
  };
}

export function generateStaticParams() {
  return [{ locale: "nl" }, { locale: "en" }];
}

export default async function LocalizedPlayground({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  return <LocalizedSurface locale={locale}><PlaygroundExperience locale={locale} /></LocalizedSurface>;
}
