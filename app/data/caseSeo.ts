/* Eigen kopie in plaats van een import uit i18n.tsx: dat bestand is een
   client component en dit is pure data die de server-routes lezen. */
type Locale = "nl" | "en";

/* De casepagina's bestaan in twee routebomen: /cases/<slug> en
   /<locale>/cases/<slug>. Stonden de titels en omschrijvingen in allebei,
   dan lopen ze vroeg of laat uit elkaar. Daarom hier, één keer.

   Dit bestand is ook de enige lijst van geldige slugs. Staat een slug er niet
   in, dan geeft de route een echte 404 in plaats van een lege pagina met een
   200 - zie de opmerking bij isCaseSlug. */

export type CaseSeo = {
  /* Volledige <title>, inclusief de staart. Geen template, omdat de
     casetitels anders over de ~60 tekens gaan die Google toont en het
     onderscheidende deel dan juist wegvalt. */
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  /* Datum van de laatste inhoudelijke wijziging, voor de sitemap. Met de hand
     bijhouden: zet hem op vandaag zodra je de tekst of het beeld van een case
     echt verandert, en laat hem staan bij een opmaakwijziging. Een datum die
     bij elke crawl meebeweegt leert Google dat je datums niets betekenen. */
  updated: string;
};

/* De volgorde hier is de volgorde waarin het werk op de homepage staat, en
   waarin de ItemList in de structuurdata de cases aandraagt: klantwerk eerst,
   concepten daarna. */
export const caseSeo = {
  "atotz-detachering": {
    title: {
      nl: "AtotZ Detachering — website in één week · Abdelrahman",
      en: "AtotZ Detachering — a website in one week · Abdelrahman",
    },
    description: {
      nl: "Past dit bureau bij mijn sector, en hoe neem ik gericht contact op? Zo bouwde ik dat in één week, en dit liet Search Console daarna zien.",
      en: "Does this agency fit my sector, and how do I reach the right person? How I built that in one week, and what Search Console showed afterwards.",
    },
    updated: "2026-10-08",
  },
  "hijaman-cups": {
    title: {
      nl: "Hijama 'N Cups — dertien pagina's tegen twijfel · Abdelrahman",
      en: "Hijama 'N Cups — thirteen pages against doubt · Abdelrahman",
    },
    description: {
      nl: "Wat houdt hijama in, past het bij mij, en durf ik contact op te nemen? Dertien pagina's die die vragen wegnemen voordat iemand belt.",
      en: "What does hijama involve, is it for me, and dare I get in touch? Thirteen pages that answer those questions before anyone picks up the phone.",
    },
    updated: "2026-10-08",
  },
  "oppas-by-chaima": {
    title: {
      nl: "Oppas by Chaima — drietalig, boeken via WhatsApp · Abdelrahman",
      en: "Oppas by Chaima — trilingual, booked over WhatsApp · Abdelrahman",
    },
    description: {
      nl: "Kan ik deze persoon mijn kind en mijn huis toevertrouwen? Een drietalige site die dat vertrouwen opbouwt voordat de eerste boeking komt.",
      en: "Can I trust this person with my child and my home? A trilingual site that builds that trust before the first booking arrives.",
    },
    updated: "2026-10-08",
  },
  mirqa: {
    title: {
      nl: "MIRQA — app-concept voor het moskeebezoek · Abdelrahman",
      en: "MIRQA — an app concept for going to the mosque · Abdelrahman",
    },
    description: {
      nl: "Wanneer moet ik vertrekken, naar welke moskee, en klopt die tijd? Een app-concept over gedrag en timing, niet over nog een gebedstijdenlijst.",
      en: "When should I leave, which mosque, and is that time right? An app concept about behaviour and timing, not another list of prayer times.",
    },
    updated: "2026-10-04",
  },
  tareeqi: {
    title: {
      nl: "Tareeqi — navigatieconcept voor Mekka · Abdelrahman",
      en: "Tareeqi — a navigation concept for Mecca · Abdelrahman",
    },
    description: {
      nl: "Google Maps kent de weg, maar niet de plek. Een navigatieconcept voor Mekka en Medina, gebouwd op wat pelgrims steeds opnieuw vertelden.",
      en: "Google Maps knows the route but not the place. A navigation concept for Mecca and Medina, built on what pilgrims kept telling me.",
    },
    updated: "2026-10-08",
  },
  "guidance-travel": {
    title: {
      nl: "Guidance Travel — concept voor Hajj-begeleiding · Abdelrahman",
      en: "Guidance Travel — a concept for Hajj guidance · Abdelrahman",
    },
    description: {
      nl: "Welke reis past bij mij, en wie begeleidt me? Een conceptsite die Hajj- en Umrahbegeleiding terugbrengt tot een rustige keuze. 21 mensen bevraagd.",
      en: "Which journey suits me, and who will guide me? A concept site that turns Hajj and Umrah guidance into one calm choice. 21 people surveyed.",
    },
    updated: "2026-10-08",
  },
  "bayn-signal": {
    title: {
      nl: "Bayn Signal — concept voor lokaal nieuws · Abdelrahman",
      en: "Bayn Signal — a concept for local news · Abdelrahman",
    },
    description: {
      nl: "Wat gebeurt er in mijn buurt, en wat kan ik ermee? Een concept voor lokaal nieuws dat eindigt in een vervolgstap in plaats van een tijdlijn.",
      en: "What is happening in my area, and what can I do with it? A concept for local news that ends in a next step instead of a timeline.",
    },
    updated: "2026-10-04",
  },
  "ayn-al-hikmah": {
    title: {
      nl: "Ayn Al-Hikmah — platformconcept voor kennis · Abdelrahman",
      en: "Ayn Al-Hikmah — a platform concept for knowledge · Abdelrahman",
    },
    description: {
      nl: "Welk boek, welke leraar, en kan ik die vertrouwen? Een platformconcept dat authentieke bronnen en persoonlijke leerpaden samenbrengt.",
      en: "Which book, which teacher, and can I trust them? A platform concept that brings authentic sources and personal learning paths together.",
    },
    updated: "2026-10-04",
  },
} as const satisfies Record<string, CaseSeo>;

export type CaseSlug = keyof typeof caseSeo;

export const caseSlugs = Object.keys(caseSeo) as CaseSlug[];

/* De routes zijn dynamisch, dus zonder deze controle rendert /cases/<wat-dan-ook>
   een lege pagina met status 200. Google leest dat als een soft 404 en gaat
   elke verkeerd gespelde link indexeren. Met deze controle volgt notFound(). */
export const isCaseSlug = (value: string): value is CaseSlug =>
  Object.prototype.hasOwnProperty.call(caseSeo, value);

/* Een slug die mensen logisch zouden spellen maar die niet bestaat, krijgt een
   301 naar de echte. Hijama's pagina draait onder hijaman-cups en heeft daar
   zestien maanden geschiedenis bij Google; die gooi je niet weg voor een
   nettere URL. */
export const caseSlugAliases: Record<string, CaseSlug> = {
  "hijama-n-cups": "hijaman-cups",
  "hijama'n-cups": "hijaman-cups",
  atotz: "atotz-detachering",
  "oppas-by-chaima-nl": "oppas-by-chaima",
};
