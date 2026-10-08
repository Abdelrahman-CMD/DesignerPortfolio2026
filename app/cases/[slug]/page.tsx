import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CaseExperience } from "../../components/CaseExperience";
import { GuidanceTravelExperience } from "../../components/GuidanceTravelExperience";
import { AynAlHikmahExperience } from "../../components/AynAlHikmahExperience";
import { BaynSignalExperience } from "../../components/BaynSignalExperience";
import { MirqaExperience } from "../../components/MirqaExperience";
import { EditorialCaseExperience } from "../../components/EditorialCaseExperience";
import { ClientCaseExperience } from "../../components/ClientCaseExperience";
import { editorialCases } from "../../data/caseContent";
import { caseSeo, caseSlugs, caseSlugAliases, isCaseSlug } from "../../data/caseSeo";
import { LocalizedSurface } from "../../i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Deze route is de Nederlandse ingang zonder taalvoorvoegsel; hij deelt zijn
  // teksten met /nl/cases/<slug> uit caseSeo.
  if (!isCaseSlug(slug)) return {};
  const seo = caseSeo[slug];
  return {
    title: { absolute: seo.title.nl },
    description: seo.description.nl,
    alternates: { canonical: `/nl/cases/${slug}`, languages: { "nl-NL": `/nl/cases/${slug}`, "en-GB": `/en/cases/${slug}`, "x-default": `/nl/cases/${slug}` } },
  };
}

export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const alias = caseSlugAliases[slug];
  if (alias) permanentRedirect(`/cases/${alias}`);
  if (!isCaseSlug(slug)) notFound();

  if (slug === "mirqa") {
    return <LocalizedSurface locale="nl" respectPreference><MirqaExperience locale="nl" /></LocalizedSurface>;
  }

  if (slug === "tareeqi") {
    return <LocalizedSurface locale="nl" respectPreference><CaseExperience locale="nl" /></LocalizedSurface>;
  }

  if (slug === "guidance-travel") {
    return <LocalizedSurface locale="nl" respectPreference><GuidanceTravelExperience locale="nl" /></LocalizedSurface>;
  }

  if (slug === "ayn-al-hikmah") {
    return <LocalizedSurface locale="nl" respectPreference><AynAlHikmahExperience locale="nl" /></LocalizedSurface>;
  }

  if (slug === "bayn-signal") {
    return <LocalizedSurface locale="nl" respectPreference><BaynSignalExperience locale="nl" /></LocalizedSurface>;
  }

  if (["hijaman-cups", "atotz-detachering", "oppas-by-chaima"].includes(slug)) {
    return <LocalizedSurface locale="nl" respectPreference><ClientCaseExperience project={editorialCases[slug]} locale="nl" /></LocalizedSurface>;
  }

  return <LocalizedSurface locale="nl" respectPreference><EditorialCaseExperience project={editorialCases[slug]} locale="nl" /></LocalizedSurface>;
}
