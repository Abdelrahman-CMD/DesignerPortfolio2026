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
      "Digital design, UX/UI en strategie voor betekenisvolle producten en merken.",
    openGraph: {
      title: "Ontwerpen voor impact, niet voor de spotlights.",
      description:
        "Digital design waar strakke structuur en out-of-the-box denken samenkomen.",
      type: "website",
      locale: "nl_NL",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1730,
          height: 909,
          alt: "Ontwerpen voor impact, niet voor de spotlights.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ontwerpen voor impact, niet voor de spotlights.",
      description:
        "Digital design waar strakke structuur en out-of-the-box denken samenkomen.",
      images: [`${origin}/og.png`],
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
