import type { Metadata } from "next";
import { CaseExperience } from "../../components/CaseExperience";
import { GuidanceTravelExperience } from "../../components/GuidanceTravelExperience";
import { AynAlHikmahExperience } from "../../components/AynAlHikmahExperience";
import { BaynSignalExperience } from "../../components/BaynSignalExperience";
import { HijamaNCupsExperience } from "../../components/HijamaNCupsExperience";
import { MirqaExperience } from "../../components/MirqaExperience";
import { EditorialCaseExperience } from "../../components/EditorialCaseExperience";
import { editorialCases } from "../../data/caseContent";
import { LocalizedSurface } from "../../i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "mirqa") {
    return {
      title: "MIRQA — Product case study",
      description:
        "Een mobiele productcase in ontwikkeling die intentie vertaalt naar een haalbaar vertrek naar de moskee.",
    };
  }
  if (slug === "tareeqi") {
    return {
      title: "Tareeqi — Case study",
      description:
        "Een zelf geïnitieerde case over het gat tussen generieke navigatie en lokale kennis in Mekka en Medina — vertaald naar een toetsbare digitale oplossingsrichting.",
    };
  }
  if (slug === "guidance-travel") {
    return {
      title: "Guidance Travel — Case study",
      description:
        "Een zelf geïnitieerde case over het vertalen van persoonlijke Hajj- en Umrahbegeleiding naar een rustige, toetsbare digitale beslisroute.",
    };
  }
  if (slug === "ayn-al-hikmah") {
    return {
      title: "Ayn Al-Hikmah — Case study",
      description:
        "Een zelf geïnitieerd platformconcept dat authentieke boeken, betrouwbare geleerden en persoonlijke leerpaden samenbrengt.",
    };
  }
  if (slug === "bayn-signal") {
    return {
      title: "Bayn Signal — Case study",
      description:
        "Een zelf geïnitieerd lokaal kennisplatform dat nieuws, communitycontext en praktische vervolgstappen samenbrengt in één scanbare pulse.",
    };
  }
  if (slug === "hijaman-cups") {
    return {
      title: "Hijama 'N Cups — Case study",
      description:
        "Een klantcase over het vertalen van Nora's vertrouwde hijamapraktijk naar een warme, vindbare website met WhatsApp als persoonlijke route naar een afspraak.",
    };
  }

  const project = editorialCases[slug];
  return project
    ? { title: `${project.name} — Case study`, description: project.description }
    : { title: "Case study" };
}

export function generateStaticParams() {
  return [
    { slug: "mirqa" },
    { slug: "tareeqi" },
    { slug: "guidance-travel" },
    { slug: "ayn-al-hikmah" },
    { slug: "bayn-signal" },
    { slug: "hijaman-cups" },
    ...Object.keys(editorialCases).map((slug) => ({ slug })),
  ];
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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

  if (slug === "hijaman-cups") {
    return <LocalizedSurface locale="nl" respectPreference><HijamaNCupsExperience locale="nl" /></LocalizedSurface>;
  }

  const project = editorialCases[slug];

  if (!project) {
    return (
      <LocalizedSurface locale="nl" respectPreference><main className="not-found">
        <p>Deze case is nog niet gepubliceerd.</p>
        <a href="/#werk">Terug naar het werk</a>
      </main></LocalizedSurface>
    );
  }

  return <LocalizedSurface locale="nl" respectPreference><EditorialCaseExperience project={project} locale="nl" /></LocalizedSurface>;
}
