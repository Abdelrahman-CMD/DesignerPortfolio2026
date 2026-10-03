import type { MetadataRoute } from "next";
import { editorialCases } from "./data/caseContent";

const ORIGIN = "https://abdelrahman.nl";
const LOCALES = ["nl", "en"] as const;

// De casepagina's bestaan voor elke slug uit de redactionele set, plus de
// handvol die alleen een eigen presentatie heeft; dezelfde lijst als de
// routegeneratie gebruikt.
const SLUGS = Array.from(
  new Set([
    "mirqa",
    "tareeqi",
    "guidance-travel",
    "ayn-al-hikmah",
    "bayn-signal",
    "hijaman-cups",
    ...Object.keys(editorialCases),
  ]),
);

const alternates = (path: string) => ({
  languages: {
    "nl-NL": `${ORIGIN}/nl${path}`,
    "en-GB": `${ORIGIN}/en${path}`,
  },
});

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["", "/playground", ...SLUGS.map((slug) => `/cases/${slug}`)];

  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: `${ORIGIN}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
      alternates: alternates(path),
    })),
  );
}
