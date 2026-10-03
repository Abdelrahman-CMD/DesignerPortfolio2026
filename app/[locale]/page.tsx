import type { Metadata } from "next";
import { HomeExperience } from "../components/HomeExperience";
import { Locale, LocalizedSurface } from "../i18n";

const resolveLocale = (value: string): Locale => value === "en" ? "en" : "nl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return locale === "en" ? {
    title: { absolute: "Abdelrahman · Senior digital designer" },
    description: "I design clear, thoughtful digital experiences where strategy, human needs and visual craft come together.",
    alternates: { canonical: "/en", languages: { "nl-NL": "/nl", "en-GB": "/en", "x-default": "/nl" } },
    openGraph: {
      title: "I design with everything I learn along the way.",
      description: "Websites don't come from a fixed formula. See how Abdelrahman learns, chooses a direction and builds together.",
      url: "/en",
      locale: "en_GB",
      alternateLocale: ["nl_NL"],
    },
    twitter: {
      title: "I design with everything I learn along the way.",
      description: "Websites don't come from a fixed formula. See how Abdelrahman learns, chooses a direction and builds together.",
    },
  } : {
    title: { absolute: "Abdelrahman · Senior digitaal ontwerper" },
    description: "Ik ontwerp met alles wat ik onderweg leer: digitale producten op het snijvlak van strategie, menselijke waarde en doordachte vormgeving.",
    alternates: { canonical: "/nl", languages: { "nl-NL": "/nl", "en-GB": "/en", "x-default": "/nl" } },
    openGraph: {
      title: "Ik ontwerp met alles wat ik onderweg leer.",
      description: "Websites ontstaan niet uit een vaste formule. Ontdek hoe Abdelrahman leert, richting kiest en samen bouwt.",
      url: "/nl",
      locale: "nl_NL",
      alternateLocale: ["en_GB"],
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "nl" }, { locale: "en" }];
}

const personSchema = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdelrahman Ahmed",
  url: `https://abdelrahman.nl/${locale}`,
  jobTitle: locale === "en" ? "Product designer · UX/UI" : "Productontwerper · UX/UI",
  description: locale === "en"
    ? "Product designer turning complexity into clarity, working where strategy, research and interface design meet."
    : "Productontwerper die complexiteit begrijpelijk maakt, op het snijvlak van strategie, onderzoek en interfaceontwerp.",
  address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
  knowsLanguage: ["nl", "en"],
});

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(locale)) }}
      />
      <LocalizedSurface locale={locale}><HomeExperience locale={locale} /></LocalizedSurface>
    </>
  );
}
