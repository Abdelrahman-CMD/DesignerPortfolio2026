export type EditorialCase = {
  slug: string;
  number: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  heroBg: string;
  heroInk: string;
  accent: string;
  surface: string;
  dark: string;
  featured: string;
  role: string;
  focus: string;
  year: string;
  contextTitle: string;
  contextLead: string;
  contextBody: string;
  insightQuote: string;
  insightBody: string;
  conceptTitle: string;
  freedomTitle: string;
  freedomBody: string;
  responsibilityTitle: string;
  responsibilityBody: string;
  features: string[];
  headingFont: string;
  bodyFont: string;
  colors: { name: string; hex: string; text?: string }[];
  shots: { src: string; alt: string; caption: string }[];
  impactTitle: string;
  impactBody: string[];
  stats: { value: string; label: string }[];
  next: { slug: string; name: string };
  prototype: "guidance" | "bayn" | "ayn";
};

export const editorialCases: Record<string, EditorialCase> = {
  "guidance-travel": {
    slug: "guidance-travel",
    number: "03",
    name: "Guidance Travel",
    eyebrow: "High-trust travel experience",
    headline: "Redefining premium travel with Form Follows Function.",
    description:
      "Een Hajj- en Umrah-platform dat complexe pakketkeuzes terugbrengt tot een rustige, betrouwbare route van intentie naar boeking.",
    heroBg: "#f3a54f",
    heroInk: "#25231f",
    accent: "#ff9e43",
    surface: "#fff6ee",
    dark: "#1e1e1e",
    featured: "/projects/site/guidance-featured.jpg",
    role: "Concept & Strategy · UX/UI Design",
    focus: "Conversion · Trust · Travel planning",
    year: "2025",
    contextTitle: "Premium service verdient premium duidelijkheid.",
    contextLead:
      "Veel websites in deze niche voelen alsof ze rond 2010 zijn blijven staan. Ze bedienen terugkerende klanten, maar geven een nieuwe generatie pelgrims te weinig vertrouwen om de volgende stap te zetten.",
    contextBody:
      "De uitdaging was niet om meer verkoopdruk toe te voegen, maar om twijfel weg te ontwerpen. Pakketten, begeleiding, accommodatie, vervoer en visa moesten in één oogopslag begrijpelijk worden - zonder de spirituele betekenis van de reis te reduceren tot een transactie.",
    insightQuote:
      "Een pelgrim boekt geen pakket. Die boekt rust voor een reis die groter is dan de reis zelf.",
    insightBody:
      "Dat kwartje veranderde de conversiestrategie. Niet de goedkoopste prijs staat centraal, maar grip: weten wie je begeleidt, wat inbegrepen is en wat er op ieder moment van je wordt verwacht.",
    conceptTitle: "Minder interface. Meer zekerheid.",
    freedomTitle: "Een planner die start bij de intentie.",
    freedomBody:
      "In plaats van bezoekers direct in een lange lijst pakketten te laten landen, begint Guidance met vier menselijke vragen: Umrah of Hajj, reisperiode, groepsgrootte en gewenste begeleiding.",
    responsibilityTitle: "Elke keuze moet zichzelf uitleggen.",
    responsibilityBody:
      "Dieter Rams' principes vormden de toetssteen: minder visuele ruis, herkenbare hiërarchie en alleen informatie die de beslissing op dat moment beter maakt.",
    features: [
      "Pakketvergelijking zonder verborgen voorwaarden",
      "Zichtbare gidsen en geloofwaardige begeleiding",
      "Reflecties als sociale bewijslast",
      "FAQ per fase van de pelgrimage",
    ],
    headingFont: "Neue Haas Unica Pro",
    bodyFont: "Work Sans",
    colors: [
      { name: "Cosmic Orange", hex: "#FF9E43" },
      { name: "Toned Black", hex: "#1E1E1E", text: "#FFF6EE" },
      { name: "Light Beige", hex: "#FFF6EE" },
      { name: "Off-White", hex: "#F1F1F1" },
    ],
    shots: [
      {
        src: "/projects/guidance-overview.jpg",
        alt: "Guidance Travel pakketplanner en reisaanbod",
        caption: "Pakketkeuze · desktop experience",
      },
      {
        src: "/projects/guidance-story.jpg",
        alt: "Guidance Travel gidsen, gallery en veelgestelde vragen",
        caption: "Vertrouwen · gidsen, context en FAQ",
      },
      {
        src: "/projects/guidance-mobile.jpg",
        alt: "Guidance Travel mobiele interface",
        caption: "Responsive journey · mobile",
      },
    ],
    impactTitle: "Van keuzestress naar een geloofwaardige volgende stap.",
    impactBody: [
      "Guidance maakt zichtbaar wat een goede reisorganisatie in de praktijk al levert: begeleiding, zorg en betrouwbaarheid. De interface vertaalt die kwaliteit naar een ervaring die nieuwe bezoekers eerder durven vertrouwen.",
      "Als concept laat het zien hoe conversie en amanah elkaar kunnen versterken. Minder twijfel kan leiden tot meer aanvragen, zonder de betekenis van de reis ondergeschikt te maken aan verkoop.",
    ],
    stats: [
      { value: "04", label: "beslisvragen voor de juiste match" },
      { value: "01", label: "heldere route naar boeking" },
      { value: "0", label: "onnodige afleiding" },
    ],
    next: { slug: "bayn-signal", name: "Bayn Signal" },
    prototype: "guidance",
  },
  "bayn-signal": {
    slug: "bayn-signal",
    number: "04",
    name: "Bayn Signal",
    eyebrow: "Real-time local intelligence",
    headline: "Staying ahead of the local pulse with vital insights.",
    description:
      "Een actueel kennisplatform voor expats, migranten en bewoners die niet méér nieuws nodig hebben, maar het juiste signaal op het juiste moment.",
    heroBg: "#77ae98",
    heroInk: "#123f37",
    accent: "#78b29b",
    surface: "#eaf0e9",
    dark: "#13433a",
    featured: "/projects/site/bayn-featured.jpg",
    role: "Editorial Strategy · UX/UI Design",
    focus: "Signals · Community · Local context",
    year: "2025",
    contextTitle: "Verhuizen is één beslissing. Aankomen zijn er duizend.",
    contextLead:
      "Wie zich in Saudi-Arabië vestigt, zoekt antwoorden over visa, verkeer, gezondheidszorg, wonen en lokaal gedrag. Algemene nieuwskanalen zijn vaak te breed, te laat of missen de context die iemand vandaag nodig heeft.",
    contextBody:
      "Bayn Signal is ontworpen als lokaal kompas: vroeg, scanbaar en betrouwbaar. Geen eindeloze feed, maar signalen die meteen vertellen wat er verandert, voor wie dat relevant is en wat de volgende praktische stap is.",
    insightQuote:
      "Niet ieder nieuwsbericht is een signaal. Een signaal verandert wat je vandaag doet.",
    insightBody:
      "Daarom is relevantie belangrijker dan volume. Artikelen, korte updates en community-ervaringen worden rond levensmomenten geordend: aankomen, regelen, bewegen, wonen en verbinden.",
    conceptTitle: "De stad lezen voordat je haar volledig kent.",
    freedomTitle: "Een pulse die zich aan jouw leven aanpast.",
    freedomBody:
      "Gebruikers kunnen hun lokale pulse filteren op thema en urgentie. Een visawijziging voelt anders dan een nieuw restaurant; de interface maakt dat verschil zichtbaar voordat je een artikel opent.",
    responsibilityTitle: "Context vóór snelheid.",
    responsibilityBody:
      "Ieder signaal laat bron, tijdstip en lokale relevantie zien. De rustige groene hiërarchie helpt gebruikers urgentie herkennen zonder van elk bericht een alarm te maken.",
    features: [
      "Vroege updates over visa en regelgeving",
      "Lokale verkeers- en omleidingssignalen",
      "Praktische guides voor wonen en integratie",
      "Community tips met concrete ervaringen",
    ],
    headingFont: "Inter",
    bodyFont: "Sana",
    colors: [
      { name: "Deep Green", hex: "#13433A", text: "#EAF0E9" },
      { name: "Light Sage", hex: "#EAF0E9" },
      { name: "Sage", hex: "#C6D6C8" },
      { name: "Light Beige", hex: "#F5F1E8" },
    ],
    shots: [
      {
        src: "/projects/bayn-overview.jpg",
        alt: "Bayn Signal homepage met actuele signalen",
        caption: "Local pulse · homepage",
      },
      {
        src: "/projects/bayn-library.jpg",
        alt: "Bayn Signal artikeloverzicht met lokale thema's",
        caption: "Editorial library · topic discovery",
      },
      {
        src: "/projects/bayn-article.jpg",
        alt: "Bayn Signal uitgebreid praktisch artikel",
        caption: "Deep context · article experience",
      },
    ],
    impactTitle: "Meer zelfvertrouwen in een omgeving die nog nieuw voelt.",
    impactBody: [
      "Bayn Signal verkleint de afstand tussen formele informatie en het echte dagelijks leven. Gebruikers weten eerder wat er verandert én begrijpen sneller wat dat voor hen betekent.",
      "Het concept bouwt vertrouwen door actualiteit te combineren met menselijke context. Zo wordt informatie geen ruis, maar een manier om je sneller verbonden en zelfstandiger te voelen.",
    ],
    stats: [
      { value: "05", label: "signaalcategorieën" },
      { value: "2K+", label: "beoogde lokale lezers" },
      { value: "01", label: "persoonlijke lokale pulse" },
    ],
    next: { slug: "tareeqi", name: "Tareeqi" },
    prototype: "bayn",
  },
  "ayn-al-hikmah": {
    slug: "ayn-al-hikmah",
    number: "02",
    name: "Ayn Al-Hikmah",
    eyebrow: "Books, scholars & learning paths",
    headline: "Filling the void for knowledge seekers leaving Medina.",
    description:
      "Een boekhandel en leeromgeving die authentieke boeken, betrouwbare geleerden en een persoonlijke studiestructuur bij elkaar brengt.",
    heroBg: "#ecd5b7",
    heroInk: "#401818",
    accent: "#fed496",
    surface: "#fff3e9",
    dark: "#401818",
    featured: "/projects/site/ayn-featured.jpg",
    role: "Concept & Strategy · UX/UI Design",
    focus: "E-commerce · Learning · Community",
    year: "2025",
    contextTitle: "Wanneer je Medina verlaat, reist de kennis niet vanzelf mee.",
    contextLead:
      "De sfeer van boekenwinkels, geleerden en studenten verdwijnt zodra je in het vliegtuig stapt. Thuis blijven lege planken, moeilijke Arabische teksten en het gemis van een halaqah over.",
    contextBody:
      "Ayn Al-Hikmah combineert wereldwijde levering van authentieke titels met live lessen, taalondersteuning en persoonlijke leerpaden. Niet alleen toegang tot kennis, maar een omgeving die helpt om het momentum vast te houden.",
    insightQuote:
      "De leegte na Medina is geen gebrek aan motivatie. Het is een gebrek aan structuur, gezelschap en toegang.",
    insightBody:
      "Daarom is de boekwinkel niet het eindpunt. Iedere aankoop kan het begin zijn van een begeleid pad met volgorde, vocabulaire, live context en ruimte om vragen te stellen.",
    conceptTitle: "Van een boek kopen naar een pad bewandelen.",
    freedomTitle: "Een leerpad dat begint waar jij staat.",
    freedomBody:
      "De Learning Path-assistent vertaalt ervaring, taalniveau en interesse naar een haalbare route. Gebruikers zien niet alleen wat ze kunnen lezen, maar ook in welke volgorde en met welke ondersteuning.",
    responsibilityTitle: "Authenticiteit moet aantoonbaar zijn.",
    responsibilityBody:
      "Titels, auteurs en niveaus worden helder gecategoriseerd. De interface maakt herkomst, taal, moeilijkheid en begeleiding zichtbaar voordat iemand een keuze maakt.",
    features: [
      "Guided onboarding voor iedere student",
      "Stap-voor-stap studieplannen",
      "Arabische taal- en vocabulairehulp",
      "Live sessies met betrouwbare geleerden",
    ],
    headingFont: "Tajawal",
    bodyFont: "Lora",
    colors: [
      { name: "Dark Bordeaux", hex: "#401818", text: "#FFF3E9" },
      { name: "Mango Yellow", hex: "#FED496" },
      { name: "Yellow Cream", hex: "#FFEED5" },
      { name: "Warm Beige", hex: "#FFF3E9" },
    ],
    shots: [
      {
        src: "/projects/ayn-overview.jpg",
        alt: "Ayn Al-Hikmah homepage en persoonlijk leerpad",
        caption: "Learning promise · homepage",
      },
      {
        src: "/projects/ayn-library.jpg",
        alt: "Ayn Al-Hikmah boekencatalogus en aanbevolen leerpaden",
        caption: "Book discovery · catalog & paths",
      },
      {
        src: "/projects/ayn-detail.jpg",
        alt: "Ayn Al-Hikmah uitgebreide boekdetailpagina",
        caption: "Book context · product detail",
      },
    ],
    impactTitle: "Kennis die niet stopt bij toegang, maar groeit door begeleiding.",
    impactBody: [
      "Ayn Al-Hikmah overbrugt de afstand tussen de wens om authentiek te leren en de praktische moeilijkheid om thuis structuur, bronnen en begeleiding te vinden.",
      "Het concept koppelt commerce aan verantwoordelijkheid: niet zoveel mogelijk boeken verkopen, maar studenten helpen een haalbaar pad te kiezen en dat ook vol te houden.",
    ],
    stats: [
      { value: "300+", label: "geverifieerde titels" },
      { value: "50+", label: "betrouwbare geleerden" },
      { value: "80+", label: "vormen van taalondersteuning" },
    ],
    next: { slug: "guidance-travel", name: "Guidance Travel" },
    prototype: "ayn",
  },
};

export const caseMeta = {
  tareeqi: {
    name: "Tareeqi",
    description:
      "Tareeqi helpt pelgrims de verborgen plekken van Mekka en Medina te ontdekken - lokaal samengesteld, toegankelijk en offline beschikbaar.",
  },
  ...Object.fromEntries(
    Object.values(editorialCases).map((item) => [
      item.slug,
      { name: item.name, description: item.description },
    ]),
  ),
};
