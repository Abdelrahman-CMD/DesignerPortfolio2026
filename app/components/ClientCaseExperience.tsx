"use client";

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef } from "react";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import type { EditorialCase } from "../data/caseContent";
import { LanguageSwitcher, Locale, localeHref } from "../i18n";
import { CaseDeepDive } from "./CaseDeepDive";
import { initCaseMotion } from "./caseScrollStory";

type LocalCopy = { nl: string; en: string };
type ClientSlug = "hijaman-cups" | "atotz-detachering" | "oppas-by-chaima";

type ClientStory = {
  theme: "hijama" | "atotz" | "oppas";
  hero: {
    kicker: LocalCopy;
    lines: readonly LocalCopy[];
    summary: LocalCopy;
    meta: readonly { label: LocalCopy; value: LocalCopy }[];
    image: string;
    imageAlt: LocalCopy;
    caption: LocalCopy;
    annotation: LocalCopy;
  };
  snapshot: readonly { label: LocalCopy; value: LocalCopy }[];
  cards: readonly {
    number: string;
    eyebrow: LocalCopy;
    title: LocalCopy;
    body: LocalCopy;
    note: LocalCopy;
    tone: string;
    image?: string;
    imageAlt?: LocalCopy;
    annotation?: LocalCopy;
    tags?: readonly LocalCopy[];
    metrics?: boolean;
  }[];
  metrics: readonly { value: string; label: LocalCopy; source: LocalCopy }[];
  metricContext: LocalCopy;
  deepDive: readonly {
    number: string;
    eyebrow: LocalCopy;
    title: LocalCopy;
    body: LocalCopy;
    note: LocalCopy;
  }[];
  proof: {
    kicker: LocalCopy;
    title: LocalCopy;
    intro: LocalCopy;
    frames: readonly { src: string; alt: LocalCopy; caption: LocalCopy }[];
  };
  contribution: {
    title: LocalCopy;
    paragraphs: readonly LocalCopy[];
    evidenceNote: LocalCopy;
  };
};

const copy = (nl: string, en: string): LocalCopy => ({ nl, en });

const clientStories: Record<ClientSlug, ClientStory> = {
  "hijaman-cups": {
    theme: "hijama",
    hero: {
      kicker: copy("Case 04 · Live klantproject", "Case 04 · Live client project"),
      lines: [
        copy("Hijama ’N Cups", "Hijama ’N Cups"),
        copy("Van mond-tot-mond.", "From word of mouth."),
        copy("Naar vindbaar vertrouwen.", "To discoverable trust."),
      ],
      summary: copy(
        "Een vertrouwde behandelpraktijk vertaald naar een rustige, vindbare website. Dertien gerichte pagina’s helpen bezoekers eerst begrijpen, dan vergelijken en pas daarna persoonlijk contact leggen.",
        "A trusted treatment practice translated into a calm, discoverable website. Thirteen focused pages help people understand, compare and only then start a personal conversation.",
      ),
      meta: [
        { label: copy("Uitdaging", "Challenge"), value: copy("Offline vertrouwen digitaal voelbaar maken", "Make offline trust tangible online") },
        { label: copy("Mijn rol", "My role"), value: copy("Strategie · UX/UI · Figma · Framer", "Strategy · UX/UI · Figma · Framer") },
        { label: copy("Bewijs", "Evidence"), value: copy("Search Console · Analytics · publieke audit", "Search Console · Analytics · public audit") },
      ],
      image: "/projects/hijama-2026/hero-laptops.webp",
      imageAlt: copy("Hijama ’N Cups homepage en behandelingen op twee laptops", "Hijama ’N Cups homepage and treatments shown on two laptops"),
      caption: copy("Live website / publieke bewijslaag", "Live website / public evidence layer"),
      annotation: copy("live, gemeten en nog steeds persoonlijk ↘", "live, measured and still personal ↘"),
    },
    snapshot: [
      { label: copy("Probleem", "Problem"), value: copy("Nieuwe bezoekers hadden uitleg en vertrouwen nodig vóórdat zij een behandeling durfden bespreken.", "New visitors needed clarity and reassurance before feeling ready to discuss a treatment.") },
      { label: copy("Oplossing", "Solution"), value: copy("Dertien gerichte pagina’s verbinden behandelingen, Nora’s expertise, FAQ en persoonlijk WhatsApp-contact.", "Thirteen focused pages connect treatments, Nora’s expertise, FAQs and personal WhatsApp contact.") },
      { label: copy("Resultaat", "Outcome"), value: copy("9,3K Google-vertoningen en 182 organische klikken in 16 maanden; recent gemiddeld 2m56 per bezoek.", "9.3K Google impressions and 182 organic clicks in 16 months; recent visits averaged 2m56.") },
    ],
    cards: [
      {
        number: "01",
        eyebrow: copy("De klantvraag", "The client challenge"),
        title: copy("De digitale voordeur moest net zo vertrouwd voelen als de praktijk.", "The digital front door had to feel as reassuring as the practice."),
        body: copy("Nora had al een sterke reputatie en vaste klantenkring. De website moest nieuwe bezoekers welkom heten, haar deskundigheid zichtbaar maken en onzekerheid rond een eerste behandeling verlagen.", "Nora already had a strong reputation and loyal client base. The website had to welcome new visitors, make her expertise visible and reduce uncertainty around a first treatment."),
        note: copy("Niet harder verkopen. Eerst de drempel verlagen om een vraag te stellen.", "Not a harder sell. First make it easier to ask a question."),
        tone: "hijama-ivory",
        image: "/projects/hijama-2026/about-desktop.webp",
        imageAlt: copy("De Over Nora-pagina van Hijama ’N Cups", "The About Nora page of Hijama ’N Cups"),
        annotation: copy("vertrouwen begint bij wie er behandelt", "trust starts with who provides the care"),
      },
      {
        number: "02",
        eyebrow: copy("De informatiearchitectuur", "The information architecture"),
        title: copy("Elke behandeling kreeg een eigen antwoord op dezelfde twijfel.", "Every treatment answered the same uncertainty in its own way."),
        body: copy("Prijs, duur, aanpak, voorbereiding en nazorg staan per behandeling bij elkaar. De bezoeker hoeft geen vaktaal te kennen en kan vanuit een concrete behoefte rustig door naar een passende behandeling.", "Price, duration, approach, preparation and aftercare sit together for each treatment. Visitors do not need specialist language and can move calmly from a need to a suitable option."),
        note: copy("De navigatie volgt de vraag van de bezoeker, niet de structuur van de praktijk.", "The navigation follows the visitor’s question, not the practice’s organisation chart."),
        tone: "hijama-mint",
        image: "/projects/hijama-2026/tablets.webp",
        imageAlt: copy("Behandelingen en veelgestelde vragen van Hijama ’N Cups op tablets", "Hijama ’N Cups treatments and FAQs on tablets"),
        tags: [copy("13 crawlbare pagina’s", "13 crawlable pages"), copy("Unieke metadata", "Unique metadata"), copy("Eén H1 per pagina", "One H1 per page")],
      },
      {
        number: "03",
        eyebrow: copy("De conversiekeuze", "The conversion decision"),
        title: copy("Boeken voelt als contact leggen, niet als een formulier afmaken.", "Booking feels like starting a conversation, not completing a form."),
        body: copy("WhatsApp blijft bewust de persoonlijke brug tussen oriëntatie en afspraak. Die route is op alle dertien gecrawlde pagina’s bereikbaar, zodat een bezoeker vanuit iedere behandeling context kan meenemen.", "WhatsApp deliberately remains the personal bridge between orientation and booking. The route is available across all thirteen crawled pages, so visitors can carry treatment context into the conversation."),
        note: copy("Eén herkenbare handeling verbindt begrijpen, vertrouwen en contact.", "One familiar action connects understanding, trust and contact."),
        tone: "hijama-leaf",
        image: "/projects/hijama-2026/phones.webp",
        imageAlt: copy("Hijama ’N Cups behandelingen en contactroutes op smartphones", "Hijama ’N Cups treatment and contact routes on smartphones"),
        annotation: copy("persoonlijk contact bleef het eindpunt ↗", "personal contact remained the destination ↗"),
      },
      {
        number: "04",
        eyebrow: copy("De gemeten bewijslaag", "The measured evidence layer"),
        title: copy("De architectuur werd niet alleen gebouwd. Ze wordt gevonden en gebruikt.", "The architecture was not only built. It is being found and used."),
        body: copy("Search Console en recente site-analytics laten organische zichtbaarheid, inhoudelijke verdieping en een uitgesproken mobiele context zien. De publieke audit bevestigt daarnaast dat alle dertien sitemap-URL’s bereikbaar zijn.", "Search Console and recent site analytics show organic visibility, deeper content exploration and a distinctly mobile context. The public audit also confirms that all thirteen sitemap URLs are reachable."),
        note: copy("Geen toegeschreven boekingen zonder CTA-tracking. Wel controleerbaar bewijs van bereik en gebruik.", "No attributed bookings without CTA tracking, but there is verifiable evidence of reach and use."),
        tone: "hijama-deep",
        metrics: true,
      },
    ],
    metrics: [
      { value: "9.3K", label: copy("Google-vertoningen · 16 maanden", "Google impressions · 16 months"), source: copy("Search Console", "Search Console") },
      { value: "182", label: copy("organische klikken", "organic clicks"), source: copy("Search Console", "Search Console") },
      { value: "2m56", label: copy("gemiddelde bezoektijd · recente 30 dagen", "average visit · recent 30 days"), source: copy("Site-analytics", "Site analytics") },
      { value: "85%", label: copy("mobiele bezoekers · 44 van 52", "mobile visitors · 44 of 52"), source: copy("Site-analytics", "Site analytics") },
    ],
    metricContext: copy("52 unieke bezoekers genereerden recent 145 paginaweergaven: 2,8 per bezoeker. Diensten, Over Nora, Wet Cupping en FAQ stonden bij de meest bekeken routes.", "52 unique visitors recently generated 145 pageviews: 2.8 per visitor. Services, About Nora, Wet Cupping and FAQs ranked among the most-viewed routes."),
    deepDive: [
      { number: "05", eyebrow: copy("Publieke audit", "Public audit"), title: copy("13 van 13 pagina’s bereikbaar", "13 of 13 pages reachable"), body: copy("Iedere sitemap-URL gaf een succesvolle respons en bevatte een unieke titel, description, canonical, social metadata en één H1.", "Every sitemap URL returned successfully and included a unique title, description, canonical, social metadata and one H1."), note: copy("De audit bewijst technische levering en crawlbaarheid, maar garandeert geen zoekpositie.", "The audit proves technical delivery and crawlability, but does not guarantee rankings.") },
      { number: "06", eyebrow: copy("Gedrag", "Behaviour"), title: copy("Bezoekers verdiepen zich verder dan de entree", "Visitors move beyond the entrance"), body: copy("De 145 paginaweergaven bij 52 unieke bezoekers laten zien dat behandelingen en vertrouwenscontent daadwerkelijk worden geopend.", "145 pageviews from 52 unique visitors show that treatment and trust content is actively explored."), note: copy("Gemiddeld 2,8 paginaweergaven per unieke bezoeker in de gemeten 30 dagen.", "An average of 2.8 pageviews per unique visitor during the measured 30 days.") },
      { number: "07", eyebrow: copy("Grens van het bewijs", "Evidence boundary"), title: copy("WhatsApp is bereikbaar, maar nog niet doorgemeten", "WhatsApp is reachable, but not yet measured"), body: copy("Zonder eventtracking kan ik geen klik-, aanvraag- of boekingsconversie aan het ontwerp toeschrijven.", "Without event tracking, I cannot attribute click, enquiry or booking conversion to the design."), note: copy("Een eerlijke grens maakt de gemeten resultaten geloofwaardiger.", "An honest boundary makes the measured results more credible.") },
    ],
    proof: {
      kicker: copy("Live ervaring / responsive gebouwd", "Live experience / built responsively"),
      title: copy("Eerst begrijpen. Dan vertrouwen. Dan contact.", "Understand first. Build trust. Then connect."),
      intro: copy("De belangrijkste routes blijven op desktop, tablet en mobiel één rustig verhaal. De beeldselectie toont zowel de schaal van het systeem als de persoonlijke details.", "The key routes remain one calm story across desktop, tablet and mobile. The selected frames show both the scale of the system and its personal details."),
      frames: [
        { src: "/projects/hijama-2026/hero-laptops.webp", alt: copy("Hijama ’N Cups op twee laptops", "Hijama ’N Cups on two laptops"), caption: copy("Homepage + behandeling", "Homepage + treatment") },
        { src: "/projects/hijama-2026/home-mobile.webp", alt: copy("Lange mobiele homepage van Hijama ’N Cups", "Long mobile homepage of Hijama ’N Cups"), caption: copy("Mobiele beslisroute", "Mobile decision journey") },
        { src: "/projects/hijama-2026/services-tablet.webp", alt: copy("Behandelingenoverzicht op tablet", "Treatment overview on tablet"), caption: copy("Behandelingen vergelijken", "Comparing treatments") },
        { src: "/projects/hijama-2026/faq-mobile.webp", alt: copy("Veelgestelde vragen op mobiel", "Frequently asked questions on mobile"), caption: copy("Twijfel wegnemen", "Reducing uncertainty") },
      ],
    },
    contribution: {
      title: copy("Een persoonlijke praktijk werd een vindbare digitale route zonder haar menselijke karakter kwijt te raken.", "A personal practice became a discoverable digital journey without losing its human character."),
      paragraphs: [
        copy("Ik bracht positionering, content, informatiearchitectuur en responsive interface samen in Figma en bouwde de uiteindelijke website in Framer.", "I combined positioning, content, information architecture and responsive interface design in Figma, then built the final website in Framer."),
        copy("De resultaten tonen organisch bereik en inhoudelijk gebruik. Ze schrijven bewust geen afspraken of omzet toe zolang WhatsApp-conversies niet worden gemeten.", "The results demonstrate organic reach and content use. They deliberately do not attribute appointments or revenue while WhatsApp conversions remain untracked."),
      ],
      evidenceNote: copy("Bronnen: publieke audit 8–9 september 2026, Google Search Console over 16 maanden en site-analytics van 10 augustus–9 september 2026.", "Sources: public audit on 8–9 September 2026, Google Search Console across 16 months and site analytics from 10 August–9 September 2026."),
    },
  },
  "atotz-detachering": {
    theme: "atotz",
    hero: {
      kicker: copy("Case 06 · Live klantproject", "Case 06 · Live client project"),
      lines: [copy("AtotZ", "AtotZ"), copy("Van sectorvraag.", "From sector need."), copy("Naar gericht contact.", "To focused contact.")],
      summary: copy("Een compacte recruitmentwebsite die meerdere sectoren en doelgroepen binnen één duidelijke merkroute houdt. Search Console toont inmiddels vroege organische zichtbaarheid. De publieke audit bewijst de structuur en conversiearchitectuur, maar nog niet het aantal leads.", "A compact recruitment website that keeps multiple sectors and audiences within one clear brand journey. Search Console now shows early organic visibility. The public audit proves the structure and conversion architecture, but not lead volume yet."),
      meta: [
        { label: copy("Uitdaging", "Challenge"), value: copy("Meerdere sectoren zonder versnippering", "Multiple sectors without fragmentation") },
        { label: copy("Mijn rol", "My role"), value: copy("Positionering · UX/UI · Framer", "Positioning · UX/UI · Framer") },
        { label: copy("Bewijs", "Evidence"), value: copy("Search Console · publieke audit", "Search Console · public audit") },
      ],
      image: "/projects/live/atotz-site-desktop.png",
      imageAlt: copy("Live desktopwebsite van AtotZ Detachering", "Live desktop website of AtotZ Detachering"),
      caption: copy("Live website / auditbaar systeem", "Live website / auditable system"),
      annotation: copy("één merk, meerdere voordeuren ↘", "one brand, multiple front doors ↘"),
    },
    snapshot: [
      { label: copy("Probleem", "Problem"), value: copy("Werkgevers en professionals moesten verschillende sectorvragen herkennen zonder te verdwalen in losse proposities.", "Employers and professionals needed to recognise different sector needs without getting lost in separate propositions.") },
      { label: copy("Oplossing", "Solution"), value: copy("Eén positionering leidt via sectorspecifieke content en vooraf ingevulde WhatsApp-routes naar gericht contact.", "One positioning system leads through sector-specific content and pre-filled WhatsApp routes to focused contact.") },
      { label: copy("Meetbaar bewijs", "Measured evidence"), value: copy("2,24K Google-vertoningen in drie maanden, een gemiddelde positie van 18,6 en een aantoonbaar gebouwde sectorspecifieke contactroute.", "2.24K Google impressions in three months, an average position of 18.6 and a demonstrably built sector-specific contact journey.") },
    ],
    cards: [
      {
        number: "01", eyebrow: copy("De structuurvraag", "The structural challenge"),
        title: copy("Veel expertise mocht niet voelen als veel verschillende bedrijven.", "Broad expertise could not feel like several different companies."),
        body: copy("Techniek, bouw, administratie, logistiek, zorg, onderwijs, IT en freelance vragen ieder om herkenning. Tegelijk moest AtotZ als één menselijk en daadkrachtig merk blijven spreken.", "Engineering, construction, administration, logistics, care, education, IT and freelance work each need recognition. At the same time, AtotZ had to speak as one human and decisive brand."),
        note: copy("De sector verandert. De belofte en het ritme blijven herkenbaar.", "The sector changes. The promise and rhythm remain recognisable."),
        tone: "atotz-paper", image: "/projects/live/atotz-people.jpg",
        imageAlt: copy("Professionals die samenwerken voor AtotZ Detachering", "Professionals collaborating for AtotZ Detachering"),
      },
      {
        number: "02", eyebrow: copy("De beslisroute", "The decision journey"),
        title: copy("Van brede belofte naar de sector die vandaag relevant is.", "From a broad promise to the sector that matters today."),
        body: copy("De one-page ervaring bouwt op van positionering en sectorherkenning naar werkwijze, FAQ en actie. Iedere laag beantwoordt één volgende vraag, zodat bezoekers niet eerst de hele dienstverlening hoeven te ontcijferen.", "The one-page experience moves from positioning and sector recognition to process, FAQs and action. Each layer answers the next question, so visitors do not have to decode the entire service first."),
        note: copy("Eerst herkennen. Dan begrijpen. Pas daarna reageren.", "Recognise first. Understand next. Only then respond."),
        tone: "atotz-steel", image: "/projects/live/atotz-site-desktop.png",
        imageAlt: copy("Desktopweergave van de AtotZ Detachering-website", "Desktop view of the AtotZ Detachering website"),
        tags: [copy("8 expertiseroutes", "8 expertise routes"), copy("FAQ-schema", "FAQ schema"), copy("Eén heldere H1", "One clear H1")],
      },
      {
        number: "03", eyebrow: copy("De conversiearchitectuur", "The conversion architecture"),
        title: copy("Iedere sector neemt zijn eigen context mee naar WhatsApp.", "Every sector carries its own context into WhatsApp."),
        body: copy("De publieke audit vond tien bron-gelabelde instroomroutes en twaalf unieke WhatsApp-doelen. Vooraf ingevulde berichten maken duidelijk vanuit welke behoefte iemand contact zoekt, zonder een zwaar formulier op te leggen.", "The public audit found ten source-tagged entry routes and twelve unique WhatsApp targets. Pre-filled messages clarify the need behind each enquiry without imposing a heavy form."),
        note: copy("Dit bewijst de route, niet hoeveel leads erdoorheen kwamen.", "This proves the route, not how many leads moved through it."),
        tone: "atotz-navy", image: "/projects/live/atotz-site-mobile.png",
        imageAlt: copy("Mobiele AtotZ-website met directe contactroutes", "Mobile AtotZ website with direct contact routes"),
        annotation: copy("context reist mee tot in het gesprek ↗", "context travels into the conversation ↗"),
      },
      {
        number: "04", eyebrow: copy("De gemeten bewijslaag", "The measured evidence layer"),
        title: copy("De site bouwt zichtbaarheid op; de klik verdient nu de aandacht.", "The site is building visibility; earning the click is the next task."),
        body: copy("De gedeelde Search Console-weergave over drie maanden toont 2,24K vertoningen, 15 klikken, 0,7% CTR en een gemiddelde positie van 18,6. Dat bewijst dat Google de propositie vertoont, maar nog niet dat de zoekresultaattekst genoeg relevante bezoeken wint.", "The shared three-month Search Console view shows 2.24K impressions, 15 clicks, a 0.7% CTR and an average position of 18.6. This proves Google is surfacing the proposition, but not yet that the search snippet earns enough relevant visits."),
        note: copy("Volgende stap: titels, descriptions en sectorspecifieke landingsrelevantie aanscherpen. Daarna meten we de CTR opnieuw.", "Next: sharpen titles, descriptions and sector-specific landing relevance, then measure CTR again."),
        tone: "atotz-teal", metrics: true,
      },
    ],
    metrics: [
      { value: "2.24K", label: copy("Google-vertoningen · drie maanden", "Google impressions · three months"), source: copy("Search Console", "Search Console") },
      { value: "15", label: copy("organische klikken", "organic clicks"), source: copy("Search Console", "Search Console") },
      { value: "18.6", label: copy("gemiddelde zoekpositie", "average search position"), source: copy("Search Console", "Search Console") },
      { value: "0.7%", label: copy("gemiddelde CTR", "average CTR"), source: copy("Search Console", "Search Console") },
    ],
    metricContext: copy("De publieke audit vult dit aan: 10 gelabelde instroomroutes, 12 unieke WhatsApp-doelen, Organization- en FAQ-data, 33 van 36 lazy-loaded beelden, 11 toegankelijk benoemde formulierelementen en geen kapotte beelden of mobiele overflow.", "The public audit adds 10 tagged entry routes, 12 unique WhatsApp targets, Organisation and FAQ data, 33 of 36 lazy-loaded images, 11 accessibly named form controls, and no broken images or mobile overflow."),
    deepDive: [
      { number: "05", eyebrow: copy("Publieke audit", "Public audit"), title: copy("Een gerichte leadroute is aantoonbaar gebouwd", "A focused lead journey is demonstrably built"), body: copy("Sectorlinks gebruiken eigen context en herkenbare bronlabels. Daardoor kan het gesprek inhoudelijker beginnen en blijft latere attributie technisch mogelijk.", "Sector links use their own context and identifiable source labels. This lets the conversation start with more substance and keeps later attribution technically possible."), note: copy("Mogelijkheid tot attributie is nog geen bewezen conversie.", "The ability to attribute is not yet proven conversion.") },
      { number: "06", eyebrow: copy("Zoekintentie", "Search intent"), title: copy("Bouwtermen leveren minimaal 817 vertoningen op, nog zonder klik.", "Construction terms generate at least 817 impressions, but no clicks yet."), body: copy("Alleen al de vijf zichtbare bouwgerelateerde zoekopdrachten in de gedeelde top tien tellen samen 817 vertoningen. Dat laat een relevante zoekvraag zien, maar de getoonde rijen registreerden nog geen klikken.", "The five visible construction-related queries in the shared top ten total 817 impressions. That reveals relevant search demand, but the displayed rows had not yet registered clicks."), note: copy("Dit is een optimalisatiesignaal, geen conversieresultaat: hogere posities en een scherpere snippet moeten de volgende meting verbeteren.", "This is an optimisation signal, not a conversion outcome: higher rankings and a sharper snippet should improve the next measurement.") },
      { number: "07", eyebrow: copy("Open bewijsruimte", "Open evidence gap"), title: copy("Vindbaarheid is bewezen; commerciële impact nog niet.", "Discoverability is proven; commercial impact is not yet."), body: copy("Search Console bewijst vertoningen en klikken, maar koppelt die niet aan aanvragen, plaatsingen, omzet of tijdswinst. Die resultaten voeg ik pas toe wanneer de klant ze bevestigt.", "Search Console proves impressions and clicks, but does not connect them to enquiries, placements, revenue or time saved. I will only add those outcomes once the client confirms them."), note: copy("Eerst bewijs. Dan pas een resultaatheadline.", "Evidence first. Only then an outcome headline.") },
    ],
    proof: {
      kicker: copy("Live ervaring / één herkenbaar systeem", "Live experience / one recognisable system"),
      title: copy("Zakelijke directheid. Menselijke ontvangst.", "Commercial clarity. A human welcome."),
      intro: copy("De visuele richting blijft stevig en direct, terwijl sectorfotografie en compacte mobiele routes het contact menselijk en dichtbij houden.", "The visual direction stays strong and direct, while sector photography and compact mobile routes keep contact human and close."),
      frames: [
        { src: "/projects/live/atotz-site-desktop.png", alt: copy("AtotZ-website op desktop", "AtotZ website on desktop"), caption: copy("Positionering + sectorroute", "Positioning + sector journey") },
        { src: "/projects/live/atotz-site-mobile.png", alt: copy("AtotZ-website op mobiel", "AtotZ website on mobile"), caption: copy("Mobiele conversieroute", "Mobile conversion journey") },
        { src: "/projects/live/atotz-construction.jpg", alt: copy("Bouwprofessional op locatie", "Construction professional on site"), caption: copy("Sectorbeeld · bouw", "Sector imagery · construction") },
        { src: "/projects/live/atotz-technical.jpg", alt: copy("Technisch professional aan het werk", "Technical professional at work"), caption: copy("Sectorbeeld · techniek", "Sector imagery · engineering") },
      ],
    },
    contribution: {
      title: copy("Een breed detacheringsaanbod werd één scanbare route naar gericht contact.", "A broad staffing offer became one scannable journey to focused contact."),
      paragraphs: [
        copy("Ik bracht positionering, sectorarchitectuur, responsive interface en directe contactroutes samen in één modulaire Framer-website.", "I combined positioning, sector architecture, responsive interface design and direct contact routes in one modular Framer website."),
        copy("Search Console bewijst vroege organische zichtbaarheid; de publieke audit bewijst de leveringskwaliteit en conversiearchitectuur. De lage CTR maakt de volgende optimalisatie bovendien concreet zonder commerciële impact te suggereren.", "Search Console proves early organic visibility; the public audit proves delivery quality and conversion architecture. The low CTR also makes the next optimisation concrete without implying commercial impact."),
      ],
      evidenceNote: copy("Bronnen: door de klant gedeelde Google Search Console-weergave over drie maanden, september 2026, en publieke desktop- en mobiele audit van 8–9 september 2026.", "Sources: client-shared three-month Google Search Console view, September 2026, and public desktop and mobile audit conducted on 8–9 September 2026."),
    },
  },
  "oppas-by-chaima": {
    theme: "oppas",
    hero: {
      kicker: copy("Case 02 · Live klantproject", "Case 02 · Live client project"),
      lines: [copy("Oppas by Chaima", "Oppas by Chaima"), copy("Eerst vertrouwen.", "Trust first."), copy("Dan pas boeken.", "Then book.")],
      summary: copy("Een warme, drietalige kennismaking voor ouders die niet zomaar beschikbaarheid zoeken, maar iemand tijdelijk toelaten tot het ritme van thuis.", "A warm, trilingual introduction for parents who are not simply checking availability, but inviting someone into the rhythm of home."),
      meta: [
        { label: copy("Uitdaging", "Challenge"), value: copy("Vertrouwen bouwen vóór het eerste appje", "Build trust before the first message") },
        { label: copy("Mijn rol", "My role"), value: copy("Positionering · UX/UI · Webdesign & build", "Positioning · UX/UI · Web design & build") },
        { label: copy("Resultaat", "Outcome"), value: copy("€2K+ boekingswaarde sinds juli 2026", "€2K+ booking value since July 2026") },
      ],
      image: "/projects/live/oppas/hero-section.jpg",
      imageAlt: copy("Herosectie van de live website van Oppas by Chaima", "Hero section of the live Oppas by Chaima website"),
      caption: copy("Herosectie · live sinds juli 2026", "Hero section · live since July 2026"),
      annotation: copy("zacht van toon, concreet in de route ↘", "soft in tone, concrete in its journey ↘"),
    },
    snapshot: [
      { label: copy("Probleem", "Problem"), value: copy("Ouders kiezen geen los oppasuur; ze zoeken zekerheid over wie thuis binnenkomt en hoe diegene met hun kind omgaat.", "Parents are not buying an isolated hour of childcare; they need certainty about who enters their home and how that person cares for their child.") },
      { label: copy("Oplossing", "Solution"), value: copy("Een rustige route verbindt Chaima’s ervaring, vier concrete stappen, thuisritme, oudervragen en een gerichte WhatsApp-intake.", "A calm journey connects Chaima’s experience, four concrete steps, family routines, parent questions and a focused WhatsApp intake.") },
      { label: copy("Resultaat", "Outcome"), value: copy("Meer dan €2.000 aan boekingen sinds de lancering in juli 2026, zoals door de eigenaar gerapporteerd.", "More than €2,000 in bookings since launching in July 2026, as reported by the owner.") },
    ],
    cards: [
      {
        number: "01", eyebrow: copy("De echte keuze", "The real decision"),
        title: copy("Een ouder boekt geen oppasuur. Die vertrouwt iemand het ritme van thuis toe.", "A parent does not book an hour of childcare. They entrust someone with the rhythm of home."),
        body: copy("De website moest veel meer doen dan beschikbaarheid tonen. Chaima’s pedagogische achtergrond, ervaring en manier van communiceren moesten al vóór de kennismaking voelbaar worden.", "The website had to do far more than show availability. Chaima’s educational background, experience and way of communicating needed to feel tangible before the introduction."),
        note: copy("Vertrouwen werd de informatiearchitectuur, niet alleen de uitstraling.", "Trust became the information architecture, not just the visual mood."),
        tone: "oppas-paper", image: "/projects/live/oppas/huiselijk-vertrouwen.jpg",
        imageAlt: copy("Huiselijke illustratie van Chaima met twee kinderen", "Homelike illustration of Chaima with two children"),
        annotation: copy("het gevoel van thuis, vóór het eerste gesprek", "the feeling of home, before the first conversation"),
      },
      {
        number: "02", eyebrow: copy("De vertrouwensroute", "The trust journey"),
        title: copy("Iedere volgende sectie beantwoordt één oudervraag.", "Each next section answers one parent question."),
        body: copy("Wie is Chaima? Hoe verloopt het contact? Wat gebeurt er tijdens een oppasmoment? Wat kost het en welke afspraken maken we vooraf? Vier concrete stappen veranderen een ongrijpbare dienst in een voorstelbare ervaring.", "Who is Chaima? How does contact work? What happens during a booking? What does it cost and what do we agree upfront? Four concrete steps turn an intangible service into an experience parents can picture."),
        note: copy("De route geeft controle terug zonder de warmte weg te organiseren.", "The journey gives parents control without organising the warmth out of it."),
        tone: "oppas-sand", image: "/projects/live/oppas/thuis-ritme-oppas-moment.jpg",
        imageAlt: copy("Sectie met vier oppasmomenten rond thuisritme", "Section with four childcare moments around home rhythm"),
        tags: [copy("4 duidelijke stappen", "4 clear steps"), copy("Tarief vóór contact", "Rate before contact"), copy("FAQ als bewijs", "FAQs as evidence")],
      },
      {
        number: "03", eyebrow: copy("Van herkenning naar intake", "From recognition to intake"),
        title: copy("Drie talen openen de deur. Vijf vragen maken het eerste appje bruikbaar.", "Three languages open the door. Five questions make the first message useful."),
        body: copy("Nederlands, Engels en Frans krijgen ieder eigen metadata en taalinstellingen. De vooraf ingevulde WhatsApp-intake vraagt naam, plaats, huisdieren, kinderen met leeftijden en gewenst oppasmoment.", "Dutch, English and French each receive their own metadata and language settings. The pre-filled WhatsApp intake asks for name, location, pets, children and ages, and the desired booking moment."),
        note: copy("Laagdrempelig voor de ouder. Betere context voor Chaima.", "Low effort for the parent. Better context for Chaima."),
        tone: "oppas-terracotta", image: "/projects/live/oppas/kennismaking-funnel.jpg",
        imageAlt: copy("Funnel-elementen met WhatsApp-intake, taalkeuze en beschikbaarheidsvraag", "Funnel elements with WhatsApp intake, language choice and availability request"),
        annotation: copy("menselijk contact, maar met context ↗", "human contact, but with context ↗"),
      },
      {
        number: "04", eyebrow: copy("Het eerste resultaat", "The first outcome"),
        title: copy("De rustige route vertaalt zich al naar concrete boekingswaarde.", "The calm journey is already translating into concrete booking value."),
        body: copy("Sinds de lancering in juli 2026 heeft de website volgens de eigenaar meer dan €2.000 aan boekingen gegenereerd. De publieke audit bevestigt daarnaast een technisch complete drietalige basis.", "Since launching in July 2026, the website has generated more than €2,000 in bookings according to the owner. The public audit also confirms a technically complete trilingual foundation."),
        note: copy("Boekingswaarde is klantgerapporteerd; technische bevindingen zijn publiek gecontroleerd.", "Booking value is client-reported; technical findings were checked publicly."),
        tone: "oppas-ink", metrics: true,
      },
    ],
    metrics: [
      { value: "€2K+", label: copy("boekingswaarde sinds juli 2026", "booking value since July 2026"), source: copy("Door eigenaar gerapporteerd", "Owner-reported") },
      { value: "03", label: copy("gelokaliseerde taalversies", "localised language versions"), source: copy("Publieke audit", "Public audit") },
      { value: "05", label: copy("velden in de WhatsApp-intake", "fields in the WhatsApp intake"), source: copy("Live route", "Live journey") },
      { value: "0", label: copy("kapotte beelden of mobiele overflow", "broken images or mobile overflow"), source: copy("Desktop + mobiel", "Desktop + mobile") },
    ],
    metricContext: copy("Alle drie taalpagina’s gaven een succesvolle respons, met eigen taalcode, canonical en social metadata. Alle zeven gecontroleerde afbeeldingen hebben een ingevulde alt-tekst.", "All three language pages returned successfully, with their own language code, canonical and social metadata. All seven checked images have non-empty alt text."),
    deepDive: [
      { number: "05", eyebrow: copy("Publieke audit", "Public audit"), title: copy("Drie talen, technisch als drie echte ingangen", "Three languages built as three real entrances"), body: copy("De Nederlandse, Engelse en Franse pagina’s hebben ieder correcte taalinstellingen, unieke metadata en structured data voor LocalBusiness, Person en ContactPoint.", "The Dutch, English and French pages each have correct language settings, unique metadata and structured data for LocalBusiness, Person and ContactPoint."), note: copy("Lokalisatie zit in de structuur, niet alleen in de vertaalde woorden.", "Localisation lives in the structure, not just the translated words.") },
      { number: "06", eyebrow: copy("Toegankelijke levering", "Accessible delivery"), title: copy("Beelden, bediening en mobiele layout blijven bruikbaar", "Images, controls and mobile layout remain usable"), body: copy("De audit vond geen ontbrekende alt-teksten, geen onbenoemde bediening, geen kapotte afbeeldingen en geen horizontale overflow.", "The audit found no missing alt text, unnamed controls, broken images or horizontal overflow."), note: copy("Dit zijn sterke toegankelijkheidssignalen, geen volledige WCAG-certificering.", "These are strong accessibility signals, not full WCAG certification.") },
      { number: "07", eyebrow: copy("Resultaatgrens", "Outcome boundary"), title: copy("€2K+ is boekingswaarde, geen winstclaim", "€2K+ is booking value, not a profit claim"), body: copy("Het resultaat is door de eigenaar gedeeld en wordt daarom als klantgerapporteerd gepresenteerd. Kosten, marge en afzonderlijke acquisitiebronnen zijn niet beoordeeld.", "The result was shared by the owner and is therefore presented as client-reported. Costs, margin and individual acquisition sources were not assessed."), note: copy("Precies formuleren maakt het resultaat sterker, niet kleiner.", "Precise wording makes the result stronger, not smaller.") },
    ],
    proof: {
      kicker: copy("Live ervaring / warm én concreet", "Live experience / warm and concrete"),
      title: copy("Een huiselijke sfeer met een duidelijke volgende stap.", "A homelike atmosphere with a clear next step."),
      intro: copy("De illustraties brengen nabijheid; de website brengt volgorde. Samen ontstaat een kennismaking die zacht voelt en toch alle praktische oudervragen beantwoordt.", "The illustrations create closeness; the website creates order. Together they form an introduction that feels soft while answering practical parent questions."),
      frames: [
        { src: "/projects/live/oppas/overview-volledige-website.jpg", alt: copy("Volledige website-overview van Oppas by Chaima", "Full website overview of Oppas by Chaima"), caption: copy("Volledige route · vertrouwen naar contact", "Full journey · trust to contact") },
        { src: "/projects/live/oppas/pedagogische-achtergrond.jpg", alt: copy("Sectie over Chaima's pedagogische achtergrond", "Section about Chaima's pedagogical background"), caption: copy("Pedagogische basis · expertise voelbaar", "Pedagogical foundation · expertise made tangible") },
        { src: "/projects/live/oppas/thuis-ritme-oppas-moment.jpg", alt: copy("Vier kaarten over thuisritme en oppasmomenten", "Four cards about home rhythm and childcare moments"), caption: copy("Thuisritme · service concreet gemaakt", "Home rhythm · service made concrete") },
        { src: "/projects/live/oppas/testimonials.jpg", alt: copy("Ouderervaringen en testimonials op de website", "Parent reviews and testimonials on the website"), caption: copy("Ouderbewijs · vertrouwen bevestigd", "Parent proof · trust confirmed") },
        { src: "/projects/live/oppas/faq-whatsapp.jpg", alt: copy("FAQ en WhatsApp-contactblok van Oppas by Chaima", "FAQ and WhatsApp contact block of Oppas by Chaima"), caption: copy("FAQ + WhatsApp · twijfel naar actie", "FAQ + WhatsApp · doubt to action") },
      ],
    },
    contribution: {
      title: copy("Een persoonlijke dienst kreeg een digitale kennismaking die vertrouwen omzet in een bruikbaar eerste gesprek.", "A personal service gained a digital introduction that turns trust into a useful first conversation."),
      paragraphs: [
        copy("Ik vertaalde positionering, oudervragen, Chaima’s ervaring en een warme visuele wereld naar een drietalige, responsive website met een directe intake.", "I translated positioning, parent questions, Chaima’s experience and a warm visual world into a trilingual responsive website with a direct intake."),
        copy("Sinds de lancering in juli 2026 is volgens de eigenaar meer dan €2.000 aan boekingswaarde gegenereerd. De publieke audit bevestigt de lokalisatie, toegankelijke beeldbeschrijvingen en mobiele stabiliteit.", "Since launching in July 2026, more than €2,000 in booking value has been generated according to the owner. The public audit confirms localisation, accessible image descriptions and mobile stability."),
      ],
      evidenceNote: copy("Bronnen: door de eigenaar gerapporteerde boekingswaarde en publieke audit van 8–9 september 2026.", "Sources: owner-reported booking value and public audit conducted on 8–9 September 2026."),
    },
  },
};

const pick = (locale: Locale, value: LocalCopy) => value[locale];

export function ClientCaseExperience({ project, locale = "nl" }: { project: EditorialCase; locale?: Locale }) {
  const root = useRef<HTMLElement>(null);
  const story = clientStories[project.slug as ClientSlug];

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    return initCaseMotion(element);
  }, [project.slug]);

  if (!story) return null;

  const pageStyle = {
    "--client-accent": project.accent,
  } as CSSProperties;

  return (
    <main ref={root} className={`tc-page tc-page-client tc-page-${story.theme}`} style={pageStyle} data-motion-project={project.slug} data-case-motion="pending">
      <a className="skip-link" href="#client-case-content">{locale === "en" ? "Skip to the case study" : "Ga naar de case"}</a>

      <nav className="tc-nav" aria-label={locale === "en" ? "Case study navigation" : "Case navigatie"}>
        <a href={localeHref("/#werk", locale)}><ArrowLeft aria-hidden="true" /> {locale === "en" ? "All case studies" : "Alle cases"}</a>
        <a className="tc-nav-brand" href={localeHref("/", locale)}>Abdelrahman / Product &amp; UX/UI designer</a>
        <div className="tc-nav-actions"><span>{project.number} / 08</span><LanguageSwitcher locale={locale} path={`/cases/${project.slug}`} /></div>
      </nav>

      <header className="tc-hero">
        <div className="tc-hero-copy">
          <p className="tc-hero-kicker">{pick(locale, story.hero.kicker)}</p>
          <h1>
            {story.hero.lines.map((line, index) => (
              <span className={`tc-title-line ${index > 0 ? "tc-title-small" : ""}`} key={line.nl}><span>{pick(locale, line)}</span></span>
            ))}
          </h1>
          <p className="tc-hero-summary">{pick(locale, story.hero.summary)}</p>
          {project.externalUrl ? (
            <a className="tc-hero-live" href={project.externalUrl} target="_blank" rel="noreferrer">
              {locale === "en" ? "View the live website" : "Bekijk de live website"} <ArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
          <dl className="tc-hero-meta">
            {story.hero.meta.map((item) => <div key={item.label.nl}><dt>{pick(locale, item.label)}</dt><dd>{pick(locale, item.value)}</dd></div>)}
          </dl>
        </div>
        <figure className="tc-hero-media">
          <Image src={story.hero.image} alt={pick(locale, story.hero.imageAlt)} fill priority sizes="(max-width: 760px) 100vw, 58vw" />
          <span className="cc-hero-note">{pick(locale, story.hero.annotation)}</span>
          <figcaption>{pick(locale, story.hero.caption)}</figcaption>
        </figure>
      </header>

      <section className="tc-snapshot" id="client-case-content" aria-labelledby={`${project.slug}-snapshot-title`}>
        <header>
          <p>{locale === "en" ? "The case in 30 seconds" : "De case in 30 seconden"}</p>
          <h2 id={`${project.slug}-snapshot-title`}>{locale === "en" ? "Problem. Solution. Evidence." : "Probleem. Oplossing. Bewijs."}</h2>
        </header>
        <div className="tc-snapshot-grid">
          {story.snapshot.map((item) => <article key={item.label.nl}><span>{pick(locale, item.label)}</span><p>{pick(locale, item.value)}</p></article>)}
        </div>
      </section>

      <section className="tc-deck" aria-label={locale === "en" ? `${project.name} story in four decisions` : `${project.name} in vier beslissingen`}>
        {story.cards.map((card, index) => (
          <article className={`tc-card-shell tc-tone-${card.tone}`} id={`chapter-${card.number}`} key={card.number} style={{ "--tc-index": index + 1 } as CSSProperties}>
            <div className="tc-card">
              <span className="tc-card-dim" aria-hidden="true" />
              <div className="tc-card-copy">
                <div className="tc-card-index"><span>{card.number}</span><span>04</span></div>
                <p className="tc-mask tc-card-eyebrow"><span>{pick(locale, card.eyebrow)}</span></p>
                <h2 className="tc-mask"><span>{pick(locale, card.title)}</span></h2>
                <p className="tc-mask tc-card-body"><span>{pick(locale, card.body)}</span></p>
                <p className="tc-mask tc-card-note"><span>{pick(locale, card.note)}</span></p>
                {card.tags ? <div className="cc-card-tags">{card.tags.map((tag) => <span key={tag.nl}>{pick(locale, tag)}</span>)}</div> : null}
              </div>
              <div className={`tc-card-media ${card.metrics ? "cc-card-metrics" : ""}`}>
                {card.metrics ? (
                  <div className="cc-metric-board">
                    <header><span>{locale === "en" ? "Evidence ledger" : "Bewijsregister"}</span><strong>{project.name}</strong></header>
                    <dl>
                      {story.metrics.map((metric) => (
                        <div key={metric.label.nl}><dt>{metric.value}</dt><dd>{pick(locale, metric.label)}<small>{pick(locale, metric.source)}</small></dd></div>
                      ))}
                    </dl>
                    <p>{pick(locale, story.metricContext)}</p>
                  </div>
                ) : card.image && card.imageAlt ? (
                  <>
                    <Image src={card.image} alt={pick(locale, card.imageAlt)} fill sizes="(max-width: 760px) 92vw, 54vw" />
                    {card.annotation ? <span className="cc-media-note">{pick(locale, card.annotation)}</span> : null}
                  </>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </section>

      <CaseDeepDive
        locale={locale}
        items={story.deepDive.map((item) => ({
          number: item.number,
          eyebrow: pick(locale, item.eyebrow),
          title: pick(locale, item.title),
          body: pick(locale, item.body),
          note: pick(locale, item.note),
        }))}
      />

      <section className="tc-proof" aria-labelledby={`${project.slug}-proof-title`}>
        <header className="tc-proof-heading">
          <p>{pick(locale, story.proof.kicker)}</p>
          <h2 id={`${project.slug}-proof-title`}>{pick(locale, story.proof.title)}</h2>
          <p>{pick(locale, story.proof.intro)}</p>
        </header>
        <div className="tc-proof-grid">
          {story.proof.frames.map((frame) => (
            <figure className="tc-proof-frame" key={frame.src}>
              <div className="tc-proof-media"><Image src={frame.src} alt={pick(locale, frame.alt)} fill sizes="(max-width: 760px) 82vw, 52vw" /></div>
              <figcaption><span>{pick(locale, frame.caption)}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="tc-contribution">
        <p>{locale === "en" ? "My contribution / evidence" : "Mijn bijdrage / bewijs"}</p>
        <div>
          <h2>{pick(locale, story.contribution.title)}</h2>
          {story.contribution.paragraphs.map((paragraph) => <p key={paragraph.nl}>{pick(locale, paragraph)}</p>)}
          <small className="cc-evidence-note">{pick(locale, story.contribution.evidenceNote)}</small>
          <a className="tc-live-link" href={project.externalUrl} target="_blank" rel="noreferrer">{locale === "en" ? "View the live website" : "Bekijk de live website"} <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </section>

      <footer className="tc-footer">
        <p>{locale === "en" ? "Next case study" : "Volgende case"}</p>
        <a href={localeHref(`/cases/${project.next.slug}`, locale)}><span>{project.next.name}</span><ArrowUpRight aria-hidden="true" /></a>
        <div><span>Abdelrahman / Product &amp; UX/UI designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
