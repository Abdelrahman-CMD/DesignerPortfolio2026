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
  socialTitle: Record<Locale, string>;
  socialImage: {
    url: string;
    width: number;
    height: number;
    alt: Record<Locale, string>;
  };
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
      nl: "Van geen digitale plek naar een werkende website in één week: positionering, sectorroutes en een contactflow die werkgevers gericht laat reageren.",
      en: "From no digital presence to a working website in one week: positioning, sector routes and a contact flow that helps employers respond with context.",
    },
    socialTitle: {
      nl: "AtotZ Detachering - van sectorvraag naar gericht contact",
      en: "AtotZ Detachering - from sector need to focused contact",
    },
    socialImage: {
      url: "/projects/home/atotz-case-thumbnail.jpg",
      width: 1800,
      height: 1350,
      alt: {
        nl: "AtotZ Detachering case thumbnail met logo en websiteframes",
        en: "AtotZ Detachering case thumbnail with logo and website frames",
      },
    },
    updated: "2026-10-08",
  },
  "hijaman-cups": {
    title: {
      nl: "Hijama 'N Cups — dertien pagina's tegen twijfel · Abdelrahman",
      en: "Hijama 'N Cups — thirteen pages against doubt · Abdelrahman",
    },
    description: {
      nl: "Een persoonlijke praktijk vertaald naar dertien vindbare pagina's: structuur, vertrouwen en een boekingsroute die twijfel vóór het eerste contact verkleint.",
      en: "A personal practice translated into thirteen discoverable pages: structure, trust and a booking route that reduces doubt before first contact.",
    },
    socialTitle: {
      nl: "Hijama 'N Cups - dertien pagina's tegen twijfel",
      en: "Hijama 'N Cups - thirteen pages against doubt",
    },
    socialImage: {
      url: "/projects/home/hijaman-cups.webp",
      width: 1280,
      height: 853,
      alt: {
        nl: "Hijama 'N Cups website case thumbnail",
        en: "Hijama 'N Cups website case thumbnail",
      },
    },
    updated: "2026-10-08",
  },
  "oppas-by-chaima": {
    title: {
      nl: "Oppas by Chaima — drietalig, boeken via WhatsApp · Abdelrahman",
      en: "Oppas by Chaima — trilingual, booked over WhatsApp · Abdelrahman",
    },
    description: {
      nl: "Een drietalige website die een persoonlijke oppasdienst begrijpelijk en vertrouwd maakt, van eerste indruk tot bruikbaar WhatsApp-gesprek.",
      en: "A trilingual website that makes a personal babysitting service clear and trustworthy, from first impression to a useful WhatsApp conversation.",
    },
    socialTitle: {
      nl: "Oppas by Chaima - vertrouwen voor de eerste boeking",
      en: "Oppas by Chaima - trust before the first booking",
    },
    socialImage: {
      url: "/projects/home/oppas-by-chaima-cover.webp",
      width: 2200,
      height: 1650,
      alt: {
        nl: "Oppas by Chaima case thumbnail met zachte websiteframes",
        en: "Oppas by Chaima case thumbnail with soft website frames",
      },
    },
    updated: "2026-10-08",
  },
  mirqa: {
    title: {
      nl: "MIRQA — app-concept voor het moskeebezoek · Abdelrahman",
      en: "MIRQA — an app concept for going to the mosque · Abdelrahman",
    },
    description: {
      nl: "Een app-concept dat gebedstijden vertaalt naar één haalbare vertrekbeslissing: gedrag, timing en rustiger keuzes in plaats van nog een lijst.",
      en: "An app concept that turns prayer times into one realistic departure decision: behaviour, timing and calmer choices instead of another list.",
    },
    socialTitle: {
      nl: "MIRQA - van intentie naar moskeebezoek",
      en: "MIRQA - from intention to mosque visit",
    },
    socialImage: {
      url: "/projects/home/mirqa-cover.webp",
      width: 2200,
      height: 1780,
      alt: {
        nl: "MIRQA appconcept case thumbnail",
        en: "MIRQA app concept case thumbnail",
      },
    },
    updated: "2026-10-04",
  },
  tareeqi: {
    title: {
      nl: "Tareeqi — navigatieconcept voor Mekka · Abdelrahman",
      en: "Tareeqi — a navigation concept for Mecca · Abdelrahman",
    },
    description: {
      nl: "Een navigatieconcept voor Mekka en Medina dat route, betekenis en lokale context samenbrengt, gebaseerd op terugkerende verhalen van pelgrims.",
      en: "A navigation concept for Mecca and Medina that connects route, meaning and local context, based on recurring stories from pilgrims.",
    },
    socialTitle: {
      nl: "Tareeqi - navigatie met lokale context",
      en: "Tareeqi - navigation with local context",
    },
    socialImage: {
      url: "/projects/home/tareeqi.webp",
      width: 1280,
      height: 853,
      alt: {
        nl: "Tareeqi navigatieconcept case thumbnail",
        en: "Tareeqi navigation concept case thumbnail",
      },
    },
    updated: "2026-10-08",
  },
  "guidance-travel": {
    title: {
      nl: "Guidance Travel — concept voor Hajj-begeleiding · Abdelrahman",
      en: "Guidance Travel — a concept for Hajj guidance · Abdelrahman",
    },
    description: {
      nl: "Een conceptsite voor Hajj- en Umrahbegeleiding die pakketkeuzes terugbrengt tot een rustige beslisroute, gevoed door input van 21 mensen.",
      en: "A concept site for Hajj and Umrah guidance that turns package choices into a calm decision route, shaped by input from 21 people.",
    },
    socialTitle: {
      nl: "Guidance Travel - een rustige keuze voor Hajj en Umrah",
      en: "Guidance Travel - one calm choice for Hajj and Umrah",
    },
    socialImage: {
      url: "/projects/home/guidance.webp",
      width: 1280,
      height: 853,
      alt: {
        nl: "Guidance Travel conceptsite case thumbnail",
        en: "Guidance Travel concept site case thumbnail",
      },
    },
    updated: "2026-10-08",
  },
  "bayn-signal": {
    title: {
      nl: "Bayn Signal — concept voor lokaal nieuws · Abdelrahman",
      en: "Bayn Signal — a concept for local news · Abdelrahman",
    },
    description: {
      nl: "Een productconcept voor lokaal nieuws dat signalen, context en vervolgstappen samenbrengt, zodat informatie sneller bruikbaar wordt.",
      en: "A product concept for local news that brings signals, context and next steps together, so information becomes useful faster.",
    },
    socialTitle: {
      nl: "Bayn Signal - lokaal nieuws met een vervolgstap",
      en: "Bayn Signal - local news with a next step",
    },
    socialImage: {
      url: "/projects/home/bayn.webp",
      width: 1280,
      height: 853,
      alt: {
        nl: "Bayn Signal lokaal nieuwsconcept case thumbnail",
        en: "Bayn Signal local news concept case thumbnail",
      },
    },
    updated: "2026-10-04",
  },
  "ayn-al-hikmah": {
    title: {
      nl: "Ayn Al-Hikmah — platformconcept voor kennis · Abdelrahman",
      en: "Ayn Al-Hikmah — a platform concept for knowledge · Abdelrahman",
    },
    description: {
      nl: "Een platformconcept dat authentieke bronnen, vertrouwde docenten en persoonlijke leerpaden ordent tot een duidelijke kenniservaring.",
      en: "A platform concept that structures authentic sources, trusted teachers and personal learning paths into a clear learning experience.",
    },
    socialTitle: {
      nl: "Ayn Al-Hikmah - kennis, bronnen en leerpaden",
      en: "Ayn Al-Hikmah - knowledge, sources and learning paths",
    },
    socialImage: {
      url: "/projects/home/ayn.webp",
      width: 1280,
      height: 853,
      alt: {
        nl: "Ayn Al-Hikmah platformconcept case thumbnail",
        en: "Ayn Al-Hikmah platform concept case thumbnail",
      },
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
