import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CaseExperience } from "../../../components/CaseExperience";
import { GuidanceTravelExperience } from "../../../components/GuidanceTravelExperience";
import { AynAlHikmahExperience } from "../../../components/AynAlHikmahExperience";
import { BaynSignalExperience } from "../../../components/BaynSignalExperience";
import { MirqaExperience } from "../../../components/MirqaExperience";
import { EditorialCaseExperience } from "../../../components/EditorialCaseExperience";
import { ClientCaseExperience } from "../../../components/ClientCaseExperience";
import { editorialCases } from "../../../data/caseContent";
import { caseSeo, caseSlugs, caseSlugAliases, isCaseSlug } from "../../../data/caseSeo";
import { Locale, LocalizedSurface } from "../../../i18n";

const resolveLocale = (value: string): Locale => value === "en" ? "en" : "nl";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeValue, slug } = await params;
  const locale = resolveLocale(localeValue);
  // Een onbekende slug krijgt geen metadata: de pagina zelf geeft een 404, en
  // een titel verzinnen voor een pagina die niet bestaat levert alleen maar
  // een nette soft 404 op.
  if (!isCaseSlug(slug)) return {};
  const seo = caseSeo[slug];
  return {
    title: { absolute: seo.title[locale] },
    description: seo.description[locale],
    alternates: { canonical: `/${locale}/cases/${slug}`, languages: { "nl-NL": `/nl/cases/${slug}`, "en-GB": `/en/cases/${slug}`, "x-default": `/nl/cases/${slug}` } },
    openGraph: {
      title: seo.title[locale],
      description: seo.description[locale],
      url: `/${locale}/cases/${slug}`,
      locale: locale === "en" ? "en_GB" : "nl_NL",
      type: "article",
    },
  };
}

export function generateStaticParams() {
  return ["nl", "en"].flatMap((locale) => caseSlugs.map((slug) => ({ locale, slug })));
}

const ORIGIN = "https://abdelrahman.nl";

// Alleen velden die echt in de casedata staan belanden in de structuurdata:
// een jaartal wordt overgeslagen zodra het geen jaartal is (sommige cases
// dragen daar "Live website"), en de klantsite alleen als die bestaat.
const caseSchema = (slug: string, locale: Locale) => {
  const project = editorialCases[slug];
  const name = project?.name ?? slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  const description = isCaseSlug(slug) ? caseSeo[slug].description[locale] : project?.description;
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

  // Een slug die mensen logisch zouden spellen gaat met een 301 naar de echte,
  // zodat een verkeerd overgetypte link niet doodloopt.
  const alias = caseSlugAliases[slug];
  if (alias) permanentRedirect(`/${locale}/cases/${alias}`);

  // En verder: bestaat de case niet, dan een echte 404. Hiervoor gaf elke
  // verzonnen slug een pagina met status 200, die Google als soft 404 telt.
  if (!isCaseSlug(slug)) notFound();

  const schema = caseSchema(slug, locale);
  let content;

  if (slug === "mirqa") content = <MirqaExperience locale={locale} />;
  else if (slug === "tareeqi") content = <CaseExperience locale={locale} />;
  else if (slug === "guidance-travel") content = <GuidanceTravelExperience locale={locale} />;
  else if (slug === "ayn-al-hikmah") content = <AynAlHikmahExperience locale={locale} />;
  else if (slug === "bayn-signal") content = <BaynSignalExperience locale={locale} />;
  else if (["hijaman-cups", "atotz-detachering", "oppas-by-chaima"].includes(slug)) content = <ClientCaseExperience project={editorialCases[slug]} locale={locale} />;
  else content = <EditorialCaseExperience project={editorialCases[slug]} locale={locale} />;

  return (
    <>
      {schema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ) : null}
      <LocalizedSurface locale={locale}>{content}</LocalizedSurface>
    </>
  );
}
