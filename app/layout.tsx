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
      "Ik ontwerp met alles wat ik onderweg leer — digital design, UX/UI en strategie voor betekenisvolle producten en merken.",
    openGraph: {
      title: "Ik ontwerp met alles wat ik onderweg leer.",
      description:
        "Een kijkje in het ontwerpdenken van Abdelrahman: onderzoek, verbeelding, structuur en richting.",
      type: "website",
      locale: "nl_NL",
      images: [
        {
          url: `${origin}/og-mind-v2.png`,
          width: 1730,
          height: 909,
          alt: "Ik ontwerp met alles wat ik onderweg leer — Abdelrahman, Senior Digital Designer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ik ontwerp met alles wat ik onderweg leer.",
      description:
        "Een kijkje in het ontwerpdenken van Abdelrahman: onderzoek, verbeelding, structuur en richting.",
      images: [`${origin}/og-mind-v2.png`],
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
