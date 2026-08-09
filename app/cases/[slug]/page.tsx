import type { Metadata } from "next";
import Link from "next/link";
import { CaseExperience } from "../../components/CaseExperience";

export const metadata: Metadata = {
  title: "Tareeqi — Case study",
  description:
    "Tareeqi helpt pelgrims de verborgen plekken van Mekka en Medina te ontdekken — lokaal samengesteld, toegankelijk en offline beschikbaar.",
};

export function generateStaticParams() {
  return [{ slug: "tareeqi" }];
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug !== "tareeqi") {
    return (
      <main className="not-found">
        <p>Deze case is nog niet gepubliceerd.</p>
        <Link href="/#werk">Terug naar het werk</Link>
      </main>
    );
  }

  return <CaseExperience />;
}
