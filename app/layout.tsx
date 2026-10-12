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
      default: "Product & UX/UI designer in Amsterdam · Abdelrahman Ahmed",
      template: "%s · Abdelrahman",
    },
    description:
      "Product & UX/UI designer die onduidelijke ideeën vertaalt naar heldere websites, flows en interfaces.",
    openGraph: {
      title: "Van onduidelijk idee naar heldere digitale ervaring.",
      description:
        "Portfolio van Abdelrahman Ahmed: productstrategie, UX/UI en visuele uitvoering voor websites en digitale producten.",
      type: "website",
      locale: "nl_NL",
      images: [
        {
          url: `${origin}/og-mind-hero.jpg`,
          width: 1672,
          height: 941,
          alt: "Abdelrahman Ahmed, product & UX/UI designer in Amsterdam",
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
      title: "Van onduidelijk idee naar heldere digitale ervaring.",
      description:
        "Portfolio van Abdelrahman Ahmed: productstrategie, UX/UI en visuele uitvoering voor websites en digitale producten.",
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
