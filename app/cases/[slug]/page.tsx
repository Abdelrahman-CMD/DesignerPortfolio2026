import type { Metadata } from "next";
/* eslint-disable @next/next/no-html-link-for-pages -- Keep the fallback route independent from the client router. */
import { CaseExperience } from "../../components/CaseExperience";
import { EditorialCaseExperience } from "../../components/EditorialCaseExperience";
import { editorialCases } from "../../data/caseContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "tareeqi") {
    return {
      title: "Tareeqi — Case study",
      description:
        "Een zelf geïnitieerde case over het gat tussen generieke navigatie en lokale kennis in Mekka en Medina — vertaald naar een toetsbare digitale oplossingsrichting.",
    };
  }

  const project = editorialCases[slug];
  return project
    ? { title: `${project.name} — Case study`, description: project.description }
    : { title: "Case study" };
}

export function generateStaticParams() {
  return [
    { slug: "tareeqi" },
    ...Object.keys(editorialCases).map((slug) => ({ slug })),
  ];
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "tareeqi") {
    return <CaseExperience />;
  }

  const project = editorialCases[slug];

  if (!project) {
    return (
      <main className="not-found">
        <p>Deze case is nog niet gepubliceerd.</p>
        <a href="/#werk">Terug naar het werk</a>
      </main>
    );
  }

  return <EditorialCaseExperience project={project} />;
}
