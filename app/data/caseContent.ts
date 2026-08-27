export type EditorialCase = {
  slug: string;
  number: string;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  heroBg: string;
  heroInk: string;
  contentInk?: string;
  footerInk?: string;
  titleLines?: string[];
  accent: string;
  surface: string;
  dark: string;
  featured: string;
  featuredAlt?: string;
  creditLine?: string;
  role: string;
  focus: string;
  year: string;
  yearLabel?: string;
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
  galleryIntro?: string;
  impactTitle: string;
  impactBody: string[];
  stats: { value: string; label: string }[];
  next: { slug: string; name: string };
  externalUrl?: string;
  prototype: "guidance" | "bayn" | "ayn" | "hijaman" | "atotz" | "oppas";
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
    featured: "/projects/home/guidance.webp",
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
        src: "/projects/case-shots/guidance-overview.webp",
        alt: "Guidance Travel pakketplanner en reisaanbod",
        caption: "Pakketkeuze · desktop experience",
      },
      {
        src: "/projects/case-shots/guidance-story.webp",
        alt: "Guidance Travel gidsen, gallery en veelgestelde vragen",
        caption: "Vertrouwen · gidsen, context en FAQ",
      },
      {
        src: "/projects/case-shots/guidance-mobile.webp",
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
    featured: "/projects/home/bayn.webp",
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
        src: "/projects/case-shots/bayn-overview.webp",
        alt: "Bayn Signal homepage met actuele signalen",
        caption: "Local pulse · homepage",
      },
      {
        src: "/projects/case-shots/bayn-library.webp",
        alt: "Bayn Signal artikeloverzicht met lokale thema's",
        caption: "Editorial library · topic discovery",
      },
      {
        src: "/projects/case-shots/bayn-article.webp",
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
    next: { slug: "hijaman-cups", name: "Hijama’N Cups" },
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
    featured: "/projects/ayn-2026/hero-laptops.webp",
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
        src: "/projects/case-shots/ayn-overview.webp",
        alt: "Ayn Al-Hikmah homepage en persoonlijk leerpad",
        caption: "Learning promise · homepage",
      },
      {
        src: "/projects/case-shots/ayn-library.webp",
        alt: "Ayn Al-Hikmah boekencatalogus en aanbevolen leerpaden",
        caption: "Book discovery · catalog & paths",
      },
      {
        src: "/projects/case-shots/ayn-detail.webp",
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
  "hijaman-cups": {
    slug: "hijaman-cups",
    number: "05",
    name: "Hijama’N Cups",
    eyebrow: "Live client work · Framer",
    headline: "Turning traditional care into a calm, clear digital welcome.",
    description:
      "Een warme Framer-website voor een zelfstandige behandelpraktijk, waarin vertrouwen, uitleg en laagdrempelig boeken samenkomen.",
    heroBg: "#dae5dd",
    heroInk: "#0b4a20",
    accent: "#e8d5b0",
    surface: "#f7f7f2",
    dark: "#124d24",
    featured: "/projects/home/hijaman-cups.webp",
    featuredAlt: "Cuppingglas met een rode roos uit de fotografie van Hijama’N Cups",
    creditLine: "Strategy / UX/UI / Framer design & build",
    role: "Strategie · UX/UI · Framer Design & Build",
    focus: "Trust · Service discovery · Booking",
    year: "Live website",
    yearLabel: "Status",
    contextTitle: "Persoonlijke zorg vraagt om digitale rust.",
    contextLead:
      "Hijama’N Cups biedt vrouwen en kinderen een breed aanbod van hijama, cupping en massages. Voor een nieuwe bezoeker kunnen de behandeling, voorbereiding en keuze echter veel vragen oproepen.",
    contextBody:
      "De website moest tegelijk warm, deskundig en praktisch zijn: iemand welkom heten, behandelingen vergelijkbaar maken en eerlijke informatie bieden over duur, prijs, aanpak en nazorg. De zelfstandige behandelaar moest bovendien alles makkelijk kunnen beheren in Framer.",
    insightQuote:
      "Voordat iemand een behandeling boekt, moet de website eerst de drempel verlagen om een vraag te stellen.",
    insightBody:
      "Daarom begint de ervaring niet met medische afstand of commerciële druk, maar met herkenning. Welkom in meerdere talen, rustige productfotografie en een duidelijke route van behoefte naar behandeling creëren ruimte om op eigen tempo vertrouwen op te bouwen.",
    conceptTitle: "Van onzeker oriënteren naar met vertrouwen boeken.",
    freedomTitle: "Een visuele wereld die zacht én onderscheidend voelt.",
    freedomBody:
      "De minimalistische productfotografie maakt cups herkenbaar zonder klinisch te worden. Groen, beige en veel witruimte geven de traditionele behandelvorm een eigentijdse, verzorgde uitstraling.",
    responsibilityTitle: "Iedere behandeling krijgt concrete context.",
    responsibilityBody:
      "Prijzen, behandeltijd, stappen, effecten, voorzorgsmaatregelen en veelgestelde vragen zijn logisch verdeeld. Zo blijft de ervaring toegankelijk, ook voor iemand die nog nooit hijama of cupping heeft gehad.",
    features: [
      "Behandeloverzicht met prijs en tijdsduur",
      "Stap-voor-stap uitleg per behandeling",
      "Voorzorg en nazorg in heldere taal",
      "Direct boeken en vragen stellen via WhatsApp",
    ],
    headingFont: "Chillax",
    bodyFont: "Montserrat",
    colors: [
      { name: "Care Green", hex: "#15662D", text: "#F7F7F2" },
      { name: "Soft Sage", hex: "#DAE5DD" },
      { name: "Warm Sand", hex: "#E8D5B0" },
      { name: "Calm White", hex: "#F7F7F2" },
    ],
    shots: [
      {
        src: "/projects/live/hijaman-site-desktop.png",
        alt: "Homepage van de live Hijama’N Cups website op desktop",
        caption: "Live website · meertalig welkom en behandelingsroute",
      },
      {
        src: "/projects/live/hijaman-cups-rose.jpg",
        alt: "Cuppingglas met een rode roos",
        caption: "Art direction · een zachte introductie",
      },
      {
        src: "/projects/live/hijaman-cups-green.jpg",
        alt: "Groene dry-cuppingglazen uit de praktijkfotografie",
        caption: "Treatment language · herkenbaar en rustig",
      },
    ],
    galleryIntro:
      "De live desktopervaring naast de eigen fotografie: een meertalig welkom, herkenbare instrumenten en informatie die een eerste behandeling minder onbekend maakt.",
    impactTitle: "Een zelfstandige praktijk die online even persoonlijk voelt als in de behandelkamer.",
    impactBody: [
      "De website brengt een uitgebreid behandelaanbod terug tot een rustige route. Bezoekers kunnen zich eerst verdiepen, zien wat een behandeling inhoudt en vervolgens rechtstreeks een afspraak of vraag starten.",
      "Voor de ondernemer vormt Framer één beheersbare plek voor merk, informatie en conversie. Daarmee is de site niet alleen een visitekaartje, maar een verlengstuk van haar persoonlijke manier van werken.",
    ],
    stats: [
      { value: "09+", label: "behandelingen helder ontsloten" },
      { value: "03", label: "talen in het welkom" },
      { value: "01", label: "directe route naar een afspraak" },
    ],
    next: { slug: "atotz-detachering", name: "AtotZ Detachering" },
    externalUrl: "https://hijamancups.com/",
    prototype: "hijaman",
  },
  "atotz-detachering": {
    slug: "atotz-detachering",
    number: "06",
    name: "AtotZ Detachering",
    eyebrow: "Live client work · Framer",
    headline: "Putting the right people in the right place — without the friction.",
    description:
      "Een scherpe, conversiegerichte Framer-website voor een zelfstandig detacheringsbureau dat menselijkheid en snelheid wil combineren.",
    heroBg: "#1c2a3a",
    heroInk: "#f9fafb",
    contentInk: "#1c2a3a",
    footerInk: "#07101a",
    titleLines: ["AtotZ", "Detachering"],
    accent: "#128c7e",
    surface: "#f9fafb",
    dark: "#101828",
    featured: "/projects/home/atotz.webp",
    featuredAlt: "Professional voor een team, uit de fotografie van AtotZ Detachering",
    creditLine: "Strategy / UX/UI / Framer design & build",
    role: "Strategie · UX/UI · Framer Design & Build",
    focus: "Positioning · Lead generation · Service clarity",
    year: "Live website",
    yearLabel: "Status",
    contextTitle: "Snel schakelen werkt alleen als vertrouwen vooroploopt.",
    contextLead:
      "AtotZ verbindt bedrijven en professionals in techniek, bouw, administratie, logistiek, zorg, onderwijs en IT. De markt belooft vaak snelheid; het merk wilde laten zien dat een snelle match ook persoonlijk en zorgvuldig kan zijn.",
    contextBody:
      "De website moest meerdere sectoren en twee doelgroepen bedienen zonder te versnipperen. Werkgevers moeten direct personeel kunnen aanvragen, terwijl professionals en freelancers herkennen dat AtotZ hun expertise serieus neemt.",
    insightQuote:
      "De echte belofte is niet ‘wij hebben mensen’. Het is: wij begrijpen wie op welke plek tot zijn recht komt.",
    insightBody:
      "Dat inzicht gaf de site één duidelijk ritme: belofte, bewijs, sector, werkwijze en actie. De gemiddelde match binnen vijf dagen wordt geloofwaardig doordat bezoekers ook zien wat er in de eerste 24 uur gebeurt.",
    conceptTitle: "Zakelijke daadkracht met een menselijke voordeur.",
    freedomTitle: "Eén merk dat door iedere sector heen herkenbaar blijft.",
    freedomBody:
      "Grote typografie, directe fotografie en korte statements geven AtotZ energie. De content wisselt per vakgebied, maar de belofte blijft consequent: de juiste mensen, op de juiste plek, zonder gedoe.",
    responsibilityTitle: "Een proces dat verwachtingen vooraf helder maakt.",
    responsibilityBody:
      "Kennismaken, selecteren, voorstellen en starten worden als vier concrete stappen uitgelegd. Reactietijden en vervolgstappen staan zichtbaar in de flow, zodat snelheid geen lege marketingclaim blijft.",
    features: [
      "Sectorgerichte routes voor werkgevers",
      "Heldere vierstaps werkwijze",
      "WhatsApp en formulier als directe leadroutes",
      "FAQ die commerciële onzekerheid wegneemt",
    ],
    headingFont: "Baron Neue Black",
    bodyFont: "Poppins",
    colors: [
      { name: "AtotZ Navy", hex: "#1C2A3A", text: "#F9FAFB" },
      { name: "Signal Teal", hex: "#128C7E", text: "#07101A" },
      { name: "Clear White", hex: "#F9FAFB" },
      { name: "Deep Ink", hex: "#101828", text: "#F9FAFB" },
    ],
    shots: [
      {
        src: "/projects/live/atotz-site-desktop.png",
        alt: "Homepage van de live AtotZ Detachering website op desktop",
        caption: "Live website · heldere positionering en directe leadroute",
      },
      {
        src: "/projects/live/atotz-site-mobile.png",
        alt: "Mobiele homepage van de live AtotZ Detachering website",
        caption: "Responsive experience · mobile",
      },
      {
        src: "/projects/live/atotz-construction.jpg",
        alt: "Bouwprofessional op locatie",
        caption: "Sector route · bouw en uitvoering",
      },
    ],
    galleryIntro:
      "De live desktop- en mobiele ervaring naast de sectorfotografie: één positionering die werkgevers snel van belofte naar bewijs en contact brengt.",
    impactTitle: "Een jong bureau dat digitaal direct als een volwassen partner opereert.",
    impactBody: [
      "AtotZ presenteert complexe dienstverlening als een helder gesprek. Werkgevers zien snel wat het bureau levert, hoe het proces werkt en wanneer zij de eerste kandidaten kunnen verwachten.",
      "De modulaire Framer-opbouw laat de ondernemer nieuwe sectoren, proposities en bewijs toevoegen zonder de merkconsistentie of conversieroute kwijt te raken.",
    ],
    stats: [
      { value: "24u", label: "reactie en eerste profielen" },
      { value: "05", label: "dagen tot gemiddelde match" },
      { value: "08", label: "expertiseroutes op één platform" },
    ],
    next: { slug: "oppas-by-chaima", name: "Oppas by Chaima" },
    externalUrl: "https://atotzdetachering.nl/",
    prototype: "atotz",
  },
  "oppas-by-chaima": {
    slug: "oppas-by-chaima",
    number: "07",
    name: "Oppas by Chaima",
    eyebrow: "Live client work · Web design & build",
    headline: "Turning a parent’s biggest question into calm digital trust.",
    description:
      "Een warme, heldere website voor een pedagogisch opgeleide oppas aan huis, ontworpen rond vertrouwen, thuisritme en duidelijke afspraken.",
    heroBg: "#f0e2ce",
    heroInk: "#342d27",
    contentInk: "#342d27",
    footerInk: "#342d27",
    titleLines: ["Oppas by", "Chaima"],
    accent: "#c9673a",
    surface: "#fbf6ea",
    dark: "#342d27",
    featured: "/projects/live/oppas-site-desktop.png",
    featuredAlt: "Homepage van Oppas by Chaima met een rustige introductie en warme illustratie",
    creditLine: "Positioning / UX/UI / Web design & build",
    role: "Positionering · UX/UI · Web Design & Build",
    focus: "Trust · Family fit · Availability",
    year: "Live website",
    yearLabel: "Status",
    contextTitle: "Wie je binnenlaat, moet al vóór de voordeur vertrouwd voelen.",
    contextLead:
      "Ouders zoeken niet alleen iemand die een paar uur beschikbaar is. Ze zoeken rust: iemand die het ritme van thuis begrijpt, helder communiceert en zorgvuldig omgaat met wat voor hen het belangrijkst is.",
    contextBody:
      "Oppas by Chaima richt zich op gezinnen met kinderen van 0 tot 12 jaar in Amsterdam en omgeving. De website moest tien jaar ervaring, een pedagogische basis en de praktische werkwijze vertalen naar een warme eerste kennismaking — zonder grote claims of commerciële druk.",
    insightQuote:
      "Een ouder boekt geen oppasuur. Die geeft iemand tijdelijk een plek in het ritme van thuis.",
    insightBody:
      "Dat inzicht maakte vertrouwen tot de hoofdstructuur van de site. Eerst herkenning en menselijke context, daarna de stappen, afspraken, ervaring en ouderverhalen. De beschikbaarheidsvraag komt pas wanneer iemand voldoende weet om met een gerust gevoel contact te leggen.",
    conceptTitle: "Digitale rust voordat de oppasavond begint.",
    freedomTitle: "Een zachte beeldwereld die zorg voelbaar maakt.",
    freedomBody:
      "Handgemaakte illustraties, organische vormen en warme natuurtinten geven de website het gevoel van een vertrouwd huis. Fraunces voegt persoonlijkheid toe, terwijl speelse details de ervaring vriendelijk houden zonder kinderachtig te worden.",
    responsibilityTitle: "Duidelijkheid die ouders controle teruggeeft.",
    responsibilityBody:
      "Tarief, regio, kennismaking en vier concrete stappen staan vroeg in de flow. Ouders zien hoe updates werken, welke informatie vooraf wordt afgestemd en hoe Chaima aansluit bij eten, spel, slaap en opvoedstijl.",
    features: [
      "Vier heldere stappen van eerste appje tot oppasmoment",
      "Tarieven en beschikbaarheid zichtbaar vóór contact",
      "Pedagogische ervaring vertaald naar voordelen thuis",
      "Ouderverhalen en FAQ als rustig bewijs",
    ],
    headingFont: "Fraunces",
    bodyFont: "Manrope",
    colors: [
      { name: "Warm Paper", hex: "#FBF6EA" },
      { name: "Terracotta", hex: "#C9673A", text: "#FFF8EC" },
      { name: "Soft Sand", hex: "#F0E2CE" },
      { name: "Home Ink", hex: "#342D27", text: "#FBF6EA" },
    ],
    shots: [
      {
        src: "/projects/live/oppas-site-desktop.png",
        alt: "Live homepage van Oppas by Chaima op desktop",
        caption: "Live website · vertrouwen en beschikbaarheid in één eerste blik",
      },
      {
        src: "/projects/live/oppas-over-mij.webp",
        alt: "Warme illustratie van Chaima die met twee kinderen een boek leest",
        caption: "About story · ervaring wordt persoonlijk en herkenbaar",
      },
      {
        src: "/projects/live/oppas-bedtijd.webp",
        alt: "Illustratie van een rustige bedtijdroutine met jonge kinderen",
        caption: "Service detail · thuisritme als uitgangspunt",
      },
    ],
    galleryIntro:
      "De live homepage naast de illustraties die het merk menselijk maken: één rustige route van eerste indruk naar werkwijze, ervaring en een vrijblijvende beschikbaarheidsvraag.",
    impactTitle: "Een persoonlijke dienst die online niet onpersoonlijk wordt.",
    impactBody: [
      "De website maakt een moeilijk vergelijkbare keuze concreet. Ouders begrijpen wie Chaima is, hoe zij werkt, wat een oppasmoment kost en welke afspraken vooraf worden gemaakt — zonder eerst een lang gesprek te hoeven voeren.",
      "Voor Chaima vormt de site een digitale kennismaking die veel terugkerende vragen al zorgvuldig beantwoordt. Daardoor begint WhatsApp niet meer bij nul, maar bij een gezin dat al beter weet of de samenwerking past.",
    ],
    stats: [
      { value: "10", label: "jaar ervaring met kinderen" },
      { value: "0–12", label: "jaar als leeftijdsbereik" },
      { value: "04", label: "duidelijke stappen vóór de oppas" },
    ],
    next: { slug: "tareeqi", name: "Tareeqi" },
    externalUrl: "https://oppasbychaima.nl/",
    prototype: "oppas",
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
