import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#292723" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "abdelrahman.nl";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Abdelrahman · Senior digitaal ontwerper",
      template: "%s · Abdelrahman",
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
          alt: "Ik ontwerp met alles wat ik onderweg leer. Abdelrahman, senior digitaal ontwerper",
        },
      ],
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    twitter: {
      card: "summary_large_image",
      title: "Ik ontwerp met alles wat ik onderweg leer.",
      description:
        "Websites ontstaan niet uit een vaste formule. Ontdek hoe Abdelrahman leert, richting kiest en samen bouwt.",
      images: [`${origin}/og-mind-hero.jpg`],
    },
  };
}

/* Loopt blokkerend als eerste node in de body, dus vóór de eerste paint.
   data-js="on" activeert de pre-hydration lock in globals.css. Komt de
   client-bundel niet binnen, dan zet de timer de vlag op "off" en staat de
   hero alsnog volledig in beeld; HomeExperience wist de timer zodra de
   intro-timeline draait. */
const heroMotionGate =
  '(function(){var d=document.documentElement;d.dataset.js="on";'
  + 'window.__heroMotionFallback=window.setTimeout(function(){'
  + 'd.dataset.js="off";d.dataset.heroFallback="fired";},2600);})();';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>
        <script dangerouslySetInnerHTML={{ __html: heroMotionGate }} />
        {children}
      </body>
    </html>
  );
}
