import type { Metadata } from "next";
import { CvExperience } from "../../components/CvExperience";
import { Locale, LocalizedSurface } from "../../i18n";

const resolveLocale = (value: string): Locale => value === "en" ? "en" : "nl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);

  return {
    title: locale === "en" ? "Curriculum vitae" : "Curriculum vitae",
    description: locale === "en"
      ? "A BSc in Communication & Multimedia Design plus sixteen years in retail: design and operations in one career."
      : "Bachelor Communicatie en Multimedia Design plus zestien jaar retail-ervaring: design en organisatie in één loopbaan.",
    alternates: {
      canonical: `/${locale}/cv`,
      languages: { "nl-NL": "/nl/cv", "en-GB": "/en/cv", "x-default": "/nl/cv" },
    },
    openGraph: { url: `/${locale}/cv`, locale: locale === "en" ? "en_GB" : "nl_NL" },
  };
}

export function generateStaticParams() {
  return [{ locale: "nl" }, { locale: "en" }];
}

export default async function LocalizedCv({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  return <LocalizedSurface locale={locale}><CvExperience locale={locale} /></LocalizedSurface>;
}
