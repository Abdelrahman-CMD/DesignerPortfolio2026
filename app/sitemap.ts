import type { MetadataRoute } from "next";
import { caseSeo, caseSlugs } from "./data/caseSeo";

const ORIGIN = "https://abdelrahman.nl";
const LOCALES = ["nl", "en"] as const;

/* Hier stond eerder new Date() voor elke regel. Daardoor meldde elke pagina bij
   elke crawl dat hij zojuist was gewijzigd - twee verzoeken met drie seconden
   ertussen gaven twee verschillende datums. Google leert daarvan dat de datums
   in deze sitemap niets betekenen en negeert ze dan voorgoed.

   Nu staat er per pagina een echte datum. Die van de cases komt uit
   caseSeo.updated; deze twee houd je met de hand bij. Zet ze op vandaag zodra
   de inhoud echt verandert, en laat ze staan bij opmaak of een refactor. */
const HOME_UPDATED = "2026-10-09";
const CV_UPDATED = "2026-10-08";

const alternates = (path: string) => ({
  languages: {
    "nl-NL": `${ORIGIN}/nl${path}`,
    "en-GB": `${ORIGIN}/en${path}`,
  },
});

type Entry = { path: string; updated: string; priority: number; changeFrequency: "weekly" | "monthly" };

// De playground staat bewust op noindex, dus hij hoort hier niet in: een
// sitemap die pagina's aandraagt die je niet geindexeerd wilt hebben, geeft
// tegenstrijdige signalen.
const entries: Entry[] = [
  { path: "", updated: HOME_UPDATED, priority: 1, changeFrequency: "weekly" },
  { path: "/cv", updated: CV_UPDATED, priority: 0.7, changeFrequency: "monthly" },
  ...caseSlugs.map((slug): Entry => ({
    path: `/cases/${slug}`,
    updated: caseSeo[slug].updated,
    priority: 0.7,
    changeFrequency: "monthly",
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    entries.map(({ path, updated, priority, changeFrequency }) => ({
      url: `${ORIGIN}/${locale}${path}`,
      lastModified: new Date(`${updated}T12:00:00Z`),
      changeFrequency,
      priority,
      alternates: alternates(path),
    })),
  );
}
