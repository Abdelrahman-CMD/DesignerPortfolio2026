import type { Metadata } from "next";
import Link from "next/link";
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
        "Tareeqi helpt pelgrims de verborgen plekken van Mekka en Medina te ontdekken - lokaal samengesteld, toegankelijk en offline beschikbaar.",
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
        <Link href="/#werk">Terug naar het werk</Link>
      </main>
    );
  }

  return <EditorialCaseExperience project={project} />;
}
