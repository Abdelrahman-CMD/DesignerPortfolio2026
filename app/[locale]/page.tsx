import type { Metadata } from "next";
import { HomeExperience } from "../components/HomeExperience";
import { caseSeo, caseSlugs } from "../data/caseSeo";
import { Locale, LocalizedSurface } from "../i18n";

const resolveLocale = (value: string): Locale => value === "en" ? "en" : "nl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return locale === "en" ? {
    title: { absolute: "Product & UX/UI designer in Amsterdam · Abdelrahman Ahmed" },
    description: "I design the doubt out of digital choices. Eight case studies from first conversation to live site, three of them running for real clients.",
    alternates: { canonical: "/en", languages: { "nl-NL": "/nl", "en-GB": "/en", "x-default": "/nl" } },
    openGraph: {
      title: "I design with everything I learn along the way.",
      description: "Websites don't come from a fixed formula. See how Abdelrahman learns, chooses a direction and builds together.",
      url: "/en",
      locale: "en_GB",
      alternateLocale: ["nl_NL"],
      images: [{ url: "/og-mind-hero.jpg", width: 1672, height: 941, alt: "Abdelrahman Ahmed, product & UX/UI designer in Amsterdam" }],
    },
    twitter: {
      title: "I design with everything I learn along the way.",
      description: "Websites don't come from a fixed formula. See how Abdelrahman learns, chooses a direction and builds together.",
      images: ["/og-mind-hero.jpg"],
    },
  } : {
    title: { absolute: "Product & UX/UI designer in Amsterdam · Abdelrahman Ahmed" },
    description: "Ik haal de twijfel uit digitale keuzes. Acht cases van eerste gesprek tot live website, waarvan drie draaien voor echte opdrachtgevers.",
    alternates: { canonical: "/nl", languages: { "nl-NL": "/nl", "en-GB": "/en", "x-default": "/nl" } },
    openGraph: {
      title: "Ik ontwerp met alles wat ik onderweg leer.",
      description: "Websites ontstaan niet uit een vaste formule. Ontdek hoe Abdelrahman leert, richting kiest en samen bouwt.",
      url: "/nl",
      locale: "nl_NL",
      alternateLocale: ["en_GB"],
      images: [{ url: "/og-mind-hero.jpg", width: 1672, height: 941, alt: "Abdelrahman Ahmed, product & UX/UI designer in Amsterdam" }],
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "nl" }, { locale: "en" }];
}

const ORIGIN = "https://abdelrahman.nl";

/* Google kende hier alleen de Person. Dat hij acht casepagina's heeft gemaakt
   stond nergens: die pagina's bestonden los van hem. De ItemList hieronder legt
   dat verband - dit is een portfolio, dit zijn de stukken, in deze volgorde -
   en ProfilePage zegt dat deze pagina de hoofdpagina van een maker is.

   Alles hieronder is na te lopen op de site zelf. Geen functieniveau, geen
   jarenclaim: het label is wat er in de footers en titels staat. */
const personSchema = (locale: Locale) => ({
  "@type": "Person",
  "@id": `${ORIGIN}/#abdelrahman`,
  name: "Abdelrahman Ahmed",
  url: `${ORIGIN}/${locale}`,
  jobTitle: "Product & UX/UI designer",
  description: locale === "en"
    ? "Product & UX/UI designer in Amsterdam. Brings unclear digital questions back to a route people understand and dare to take: structure, interaction and visual execution in one pair of hands."
    : "Product & UX/UI designer in Amsterdam. Brengt onduidelijke digitale vraagstukken terug tot een route die mensen begrijpen en durven te nemen: structuur, interactie en visuele uitvoering in één hand.",
  address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
  knowsLanguage: ["nl", "en"],
  knowsAbout: locale === "en"
    ? ["Product design", "UX design", "Information architecture", "Interface design", "Web design"]
    : ["Productontwerp", "UX-ontwerp", "Informatiearchitectuur", "Interfaceontwerp", "Webdesign"],
  email: "mailto:dhr_abdelrahman@outlook.com",
  sameAs: ["https://www.linkedin.com/in/abdelrahman-ahmed-30896964/"],
});

const profileSchema = (locale: Locale) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${ORIGIN}/${locale}#page`,
      url: `${ORIGIN}/${locale}`,
      inLanguage: locale === "en" ? "en-GB" : "nl-NL",
      mainEntity: { "@id": `${ORIGIN}/#abdelrahman` },
    },
    personSchema(locale),
    {
      "@type": "ItemList",
      "@id": `${ORIGIN}/${locale}#werk`,
      name: locale === "en" ? "Selected work" : "Geselecteerd werk",
      numberOfItems: caseSlugs.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: caseSlugs.map((slug, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${ORIGIN}/${locale}/cases/${slug}`,
        // Alleen de projectnaam, niet de hele titel: de ItemList benoemt de
        // stukken, de pagina zelf vertelt waar ze over gaan.
        name: caseSeo[slug].title[locale].split(" — ")[0],
      })),
    },
  ],
});

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema(locale)) }}
      />
      <LocalizedSurface locale={locale}><HomeExperience locale={locale} /></LocalizedSurface>
    </>
  );
}
