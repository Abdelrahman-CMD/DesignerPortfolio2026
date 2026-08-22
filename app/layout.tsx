import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "muminstudio.com";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Abdelrahman — Senior Digital Designer",
      template: "%s — Abdelrahman",
    },
    description:
      "Senior digital designer voor websites met een stevig fundament, een beweeglijke aanpak en ruimte voor een eerlijk gesprek.",
    openGraph: {
      title: "Ik ontwerp met alles wat ik onderweg leer.",
      description:
        "Websites ontstaan niet uit een vaste formule. Ontdek hoe Abdelrahman leert, richting kiest en samen bouwt.",
      type: "website",
      locale: "nl_NL",
      images: [
        {
          url: `${origin}/og-mind-hero.jpg`,
          width: 1672,
          height: 941,
          alt: "Ik ontwerp met alles wat ik onderweg leer — Abdelrahman, Senior Digital Designer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ik ontwerp met alles wat ik onderweg leer.",
      description:
        "Websites ontstaan niet uit een vaste formule. Ontdek hoe Abdelrahman leert, richting kiest en samen bouwt.",
      images: [`${origin}/og-mind-hero.jpg`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
