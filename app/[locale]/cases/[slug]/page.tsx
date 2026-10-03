import type { Metadata } from "next";
import { CaseExperience } from "../../../components/CaseExperience";
import { GuidanceTravelExperience } from "../../../components/GuidanceTravelExperience";
import { AynAlHikmahExperience } from "../../../components/AynAlHikmahExperience";
import { BaynSignalExperience } from "../../../components/BaynSignalExperience";
import { MirqaExperience } from "../../../components/MirqaExperience";
import { EditorialCaseExperience } from "../../../components/EditorialCaseExperience";
import { ClientCaseExperience } from "../../../components/ClientCaseExperience";
import { editorialCases } from "../../../data/caseContent";
import { Locale, LocalizedSurface } from "../../../i18n";

const resolveLocale = (value: string): Locale => value === "en" ? "en" : "nl";

const caseDescriptions: Record<string, { nl: string; en: string }> = {
  mirqa: {
    nl: "Een mobiele productcase in ontwikkeling die intentie vertaalt naar een haalbaar vertrek naar de moskee.",
    en: "A mobile product case study in development, turning intention into a realistic journey to the mosque.",
  },
  tareeqi: {
    nl: "Een zelf geïnitieerde case over het gat tussen generieke navigatie en lokale kennis in Mekka en Medina.",
    en: "A self-initiated case study exploring the gap between generic navigation and local knowledge in Mecca and Medina.",
  },
  "guidance-travel": {
    nl: "Een zelf geïnitieerde case over persoonlijke Hajj- en Umrahbegeleiding als rustige digitale beslisroute.",
    en: "A self-initiated case study translating personal Hajj and Umrah guidance into a calm digital decision journey.",
  },
  "ayn-al-hikmah": {
    nl: "Een platformconcept dat authentieke boeken, betrouwbare geleerden en persoonlijke leerpaden samenbrengt.",
    en: "A platform concept that connects authentic books and trusted scholars with personal learning paths.",
  },
  "bayn-signal": {
    nl: "Een lokaal kennisplatform dat nieuws, communitycontext en praktische vervolgstappen samenbrengt.",
    en: "A local knowledge platform that turns news and community context into practical next steps.",
  },
  "hijaman-cups": {
    nl: "Nora’s vertrouwde hijamapraktijk vertaald naar een warme website met WhatsApp als route naar een afspraak.",
    en: "A warm, reassuring website for Nora’s trusted hijama practice, with WhatsApp as the most personal way to book.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeValue, slug } = await params;
  const locale = resolveLocale(localeValue);
  const project = editorialCases[slug];
  const title = project?.name ?? slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  const description = caseDescriptions[slug]?.[locale] ?? project?.description ?? "Portfolio case study by Abdelrahman.";
  return {
    title: `${title} · Case study`,
    description,
    alternates: { canonical: `/${locale}/cases/${slug}`, languages: { "nl-NL": `/nl/cases/${slug}`, "en-GB": `/en/cases/${slug}`, "x-default": `/nl/cases/${slug}` } },
  };
}

export function generateStaticParams() {
  const slugs = ["mirqa", "tareeqi", "guidance-travel", "ayn-al-hikmah", "bayn-signal", "hijaman-cups", ...Object.keys(editorialCases)];
  return ["nl", "en"].flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

const ORIGIN = "https://abdelrahman.nl";

// Alleen velden die echt in de casedata staan belanden in de structuurdata:
// een jaartal wordt overgeslagen zodra het geen jaartal is (sommige cases
// dragen daar "Live website"), en de klantsite alleen als die bestaat.
const caseSchema = (slug: string, locale: Locale) => {
  const project = editorialCases[slug];
  const name = project?.name ?? slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  const description = caseDescriptions[slug]?.[locale] ?? project?.description;
  if (!name || !description) return null;

  const url = `${ORIGIN}/${locale}/cases/${slug}`;
  const year = project?.year && /^\d{4}$/.test(project.year) ? project.year : undefined;
  const keywords = [project?.role, project?.focus]
    .filter(Boolean)
    .join(" · ")
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#case`,
        name,
        description,
        url,
        inLanguage: locale === "en" ? "en-GB" : "nl-NL",
        creator: { "@type": "Person", name: "Abdelrahman Ahmed", url: `${ORIGIN}/${locale}` },
        ...(year ? { dateCreated: year } : {}),
        ...(keywords.length ? { keywords } : {}),
        ...(project?.featured ? { image: `${ORIGIN}${project.featured}` } : {}),
        ...(project?.externalUrl
          ? { about: { "@type": "WebSite", name, url: project.externalUrl } }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "en" ? "Home" : "Start", item: `${ORIGIN}/${locale}` },
          { "@type": "ListItem", position: 2, name: locale === "en" ? "Work" : "Werk", item: `${ORIGIN}/${locale}#werk` },
          { "@type": "ListItem", position: 3, name },
        ],
      },
    ],
  };
};

export default async function LocalizedCasePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeValue, slug } = await params;
  const locale = resolveLocale(localeValue);
  const schema = caseSchema(slug, locale);
  let content;

  if (slug === "mirqa") content = <MirqaExperience locale={locale} />;
  else if (slug === "tareeqi") content = <CaseExperience locale={locale} />;
  else if (slug === "guidance-travel") content = <GuidanceTravelExperience locale={locale} />;
  else if (slug === "ayn-al-hikmah") content = <AynAlHikmahExperience locale={locale} />;
  else if (slug === "bayn-signal") content = <BaynSignalExperience locale={locale} />;
  else if (["hijaman-cups", "atotz-detachering", "oppas-by-chaima"].includes(slug)) content = <ClientCaseExperience project={editorialCases[slug]} locale={locale} />;
  else if (editorialCases[slug]) content = <EditorialCaseExperience project={editorialCases[slug]} locale={locale} />;
  else content = <main className="not-found"><p>Deze case is nog niet gepubliceerd.</p><a href="/#werk">Terug naar het werk</a></main>;

  return (
    <>
      {schema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ) : null}
      <LocalizedSurface locale={locale}>{content}</LocalizedSurface>
    </>
  );
}
