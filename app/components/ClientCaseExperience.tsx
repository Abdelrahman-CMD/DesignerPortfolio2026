"use client";

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef } from "react";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import type { EditorialCase } from "../data/caseContent";
import { LanguageSwitcher, Locale, localeHref } from "../i18n";
import { CaseDeepDive } from "./CaseDeepDive";
import { initCaseMotion } from "./caseScrollStory";

import { CaseNavMotion } from "./CaseNavMotion";
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
      summary: copy("Een oud-collega startte een detacheringsbureau zonder digitale plek. Binnen één week, vlak voor mijn vakantie, zette ik een professionele onepager neer die acht sectoren begrijpelijk maakte en contact direct naar WhatsApp bracht.", "A former colleague had started a staffing agency without a digital presence. Within one week, just before my holiday, I built a professional one-pager that made eight sectors easy to understand and moved contact directly into WhatsApp."),
      meta: [
        { label: copy("Uitdaging", "Challenge"), value: copy("8 sectoren · 2 doelgroepen · 0 online aanwezigheid", "8 sectors · 2 audiences · 0 online presence") },
        { label: copy("Mijn rol", "My role"), value: copy("Strategie · copy · UX/UI · Framer · overdracht", "Strategy · copy · UX/UI · Framer · handover") },
        { label: copy("Bewijs", "Evidence"), value: copy("2,24K vertoningen · positie 18,6", "2.24K impressions · position 18.6") },
          { label: copy("Doorlooptijd", "Timeline"), value: copy("Oktober 2025 · één week · vast budget", "October 2025 · one week · fixed budget") },
      ],
      image: "/projects/home/atotz-services-thumb.jpg",
      imageAlt: copy("Sectie met AtotZ sectorroutes voor techniek en bouw", "Section with AtotZ sector routes for engineering and construction"),
      caption: copy("Sectorroutes / opgeleverd systeem", "Sector routes / delivered system"),
      annotation: copy("één merk, meerdere voordeuren ↘", "one brand, multiple front doors ↘"),
    },
    snapshot: [
      { label: copy("Probleem", "Problem"), value: copy("Acht sectoren, eerst vooral werkgevers en later ook kandidaten, maar nog geen digitale plek om die vraag helder op te vangen.", "Eight sectors, initially employers and later candidates too, but no digital place yet to capture that demand clearly.") },
      { label: copy("Oplossing", "Solution"), value: copy("Eén compacte route met sectorherkenning, korte menselijke copy en WhatsApp als eerste contactmoment in plaats van een zwaar formulier.", "One compact journey with sector recognition, short human copy and WhatsApp as the first contact moment instead of a heavy form.") },
      { label: copy("Resultaat", "Outcome"), value: copy("2,24K vertoningen, gemiddelde positie 18,6. De eigenaren melden dat de aanvragen binnenkwamen.", "2.24K impressions, average position 18.6. The owners reported that enquiries started coming in.") },
    ],
    cards: [
      {
        number: "01", eyebrow: copy("De startpositie", "The starting point"),
        title: copy("Er was geen oude site om te verbeteren. Er moest voor het eerst een plek staan.", "There was no old site to improve. A digital place had to exist for the first time."),
        body: copy("AtotZ liep tot dan toe via netwerk, referenties en mond-tot-mondcontact. De website moest snel laten zien voor welke sectoren het bureau relevant was, zonder als een generieke recruitmentpagina te voelen.", "AtotZ had been running on network, referrals and word of mouth. The website had to quickly show which sectors the agency served without feeling like a generic recruitment page."),
        note: copy("Niet groter praten dan het project was: eerst een sterke MVP die direct gebruikt kon worden.", "No overstating the project: first, a strong MVP that could be used immediately."),
        tone: "atotz-paper", image: "/projects/home/atotz-services-thumb.jpg",
        imageAlt: copy("Sectorkaarten van AtotZ Detachering voor techniek en bouw", "AtotZ Detachering sector cards for engineering and construction"),
      },
      {
        number: "02", eyebrow: copy("De doelgroepverschuiving", "The audience shift"),
        title: copy("Toen kandidaten erbij kwamen, maakte ik geen tweede route. Ik maakte de eerste slimmer.", "When candidates were added, I did not create a second journey. I made the first one smarter."),
        body: copy("De site begon vooral vanuit werkgevers. Later moest hij ook kandidaten en freelancers aanspreken. In plaats van twee concurrerende stromen koos ik voor één route waarin een keuzeveld en sectorcontext het eerste gesprek specifieker maken.", "The site started primarily from the employer side. Later it also needed to speak to candidates and freelancers. Instead of two competing flows, I kept one journey where a choice field and sector context make the first conversation more specific."),
        note: copy("Klein detail, groot effect: minder routes, meer context in het contact.", "Small detail, big effect: fewer routes, more context in the contact moment."),
        tone: "atotz-steel", image: "/projects/live/atotz/whatsapp-web.png",
        imageAlt: copy("WhatsApp-route met vooraf ingevuld sectorbericht", "WhatsApp journey with pre-filled sector message"),
        tags: [copy("Werkgevers + kandidaten", "Employers + candidates"), copy("8 sectoren", "8 sectors"), copy("Eén contactroute", "One contact journey")],
      },
      {
        number: "03", eyebrow: copy("De conversiearchitectuur", "The conversion architecture"),
        title: copy("WhatsApp was geen snelle knop achteraf, maar het logische einde van de funnel.", "WhatsApp was not a quick button added later, but the logical end of the funnel."),
        body: copy("In deze sector begint het eerste contact vaak praktisch en snel. Daarom liet ik bezoekers niet eindigen in een zwaar formulier, maar in een voorbereid gesprek waarin sector en intentie al meekomen.", "In this sector, first contact is often practical and quick. So I did not end the journey in a heavy form, but in a prepared conversation where sector and intent already travel along."),
        note: copy("Efficiënt voor de bezoeker, concreter voor de eigenaar.", "Efficient for the visitor, more concrete for the owner."),
        tone: "atotz-navy", image: "/projects/live/atotz/whatsapp-chat.png",
        imageAlt: copy("Vooraf ingevuld WhatsApp-gesprek vanuit de AtotZ-route", "Pre-filled WhatsApp conversation from the AtotZ journey"),
        annotation: copy("context reist mee tot in het gesprek ↗", "context travels into the conversation ↗"),
      },
      {
        number: "04", eyebrow: copy("Het eerste bewijs", "The first evidence"),
        title: copy("De site werd gevonden, en volgens de eigenaren begon de telefoon te bewegen.", "The site started being found, and according to the owners the phone started moving."),
        body: copy("De bevestigde Search Console-cijfers tonen 2,24K vertoningen en een gemiddelde positie van 18,6. De eigenaren gaven daarnaast aan dat aanvragen binnenkwamen en dat de website hen professioneler positioneerde.", "The confirmed Search Console figures show 2.24K impressions and an average position of 18.6. The owners also said enquiries started coming in and that the website pushed them toward a more professional position."),
        note: copy("De overige Search Console-cijfers voeg ik pas toe wanneer ze opnieuw geverifieerd zijn.", "I will only add the remaining Search Console figures once they have been verified again."),
        tone: "atotz-teal", metrics: true,
      },
    ],
    metrics: [
      { value: "2.24K", label: copy("Google-vertoningen · drie maanden", "Google impressions · three months"), source: copy("Search Console", "Search Console") },
      { value: "18.6", label: copy("gemiddelde zoekpositie", "average search position"), source: copy("Search Console", "Search Console") },
      { value: "1 week", label: copy("van vraag naar live MVP", "from ask to live MVP"), source: copy("Projectscope", "Project scope") },
      { value: "2 weken", label: copy("nazorg vóór overdracht", "aftercare before handover"), source: copy("Samenwerking", "Collaboration") },
    ],
    metricContext: copy("De cijfers tonen vroege vindbaarheid; de klantreactie voegt de menselijke laag toe: de aanvragen kwamen binnen en de site duwde het bedrijf zichtbaar richting professionaliteit.", "The figures show early discoverability; the client response adds the human layer: enquiries started coming in and the site visibly pushed the company toward professionalism."),
    deepDive: [
      { number: "05", eyebrow: copy("WhatsApp als route", "WhatsApp as the route"), title: copy("Geen formulier als eindpunt, maar een voorbereid gesprek.", "Not a form as the endpoint, but a prepared conversation."), body: copy("Tijd kost geld in deze markt. Daarom moest het eerste contact niet voelen als administratie, maar als een snelle, specifieke opening: wie ben je, welke sector bedoel je en wat zoek je?", "Time costs money in this market. That is why first contact should not feel like admin, but like a quick, specific opening: who are you, which sector do you mean and what are you looking for?"), note: copy("Later kan dit verder meetbaar worden gemaakt, maar de eerste keuze was bewust praktisch.", "This can be made more measurable later, but the first choice was deliberately practical.") },
      { number: "06", eyebrow: copy("Scope en budget", "Scope and budget"), title: copy("Niet elke glimmende plugin helpt de funnel.", "Not every shiny plugin helps the funnel."), body: copy("De klant vroeg naar plugins die hij op andere sites had gezien. Ik heb ze niet afgewezen omdat plugins slecht zijn, maar omdat deze MVP binnen budget en funnel genoeg had aan lichtere oplossingen.", "The client asked about plugins they had seen on other sites. I did not reject them because plugins are bad, but because this MVP had enough with lighter solutions within the budget and funnel."), note: copy("Minder show, meer route. Later kun je altijd opschalen.", "Less show, more journey. You can always scale up later.") },
      { number: "07", eyebrow: copy("Privacy en overdracht", "Privacy and handover"), title: copy("Een sterke over-ons-sectie verdween bewust uit de scope.", "A strong about-us section deliberately left the scope."), body: copy("Ik wilde de eigenaren en hun visie persoonlijker tonen, maar vanwege privacy wilden zij dat niet. Na twee weken nazorg is de website overgedragen; wat nu live staat kan daardoor afwijken van mijn oplevering.", "I wanted to show the owners and their vision more personally, but they preferred not to for privacy reasons. After two weeks of aftercare the site was handed over, so the current live version may differ from my delivery."), note: copy("Dat is ook ontwerpwerk: weten wanneer je je eigen voorkeur loslaat.", "That is design work too: knowing when to let go of your own preference.") },
      { number: "08", eyebrow: copy("Geen testfase", "No testing phase"), title: copy("In één week toets je niet. Je leunt op wat je al weet.", "In one week you do not test. You lean on what you already know."), body: copy("Er was geen ruimte voor gebruikersonderzoek of een testronde, en dat heb ik niet verborgen achter aannames. Ik werkte met patronen die ik uit eerdere opdrachten ken en toetste elke keuze direct bij de eigenaren, die hun sector beter kennen dan ik. Dat is een andere vorm van onderbouwing, geen zwakkere — maar het is iets anders dan meten.", "There was no room for user research or a round of testing, and I have not hidden that behind assumptions. I worked with patterns I know from earlier projects and checked every choice directly with the owners, who understand their sector better than I do. That is a different form of grounding, not a weaker one — but it is not the same as measuring."), note: copy("Snelheid kost je bewijs vooraf. Dat benoem je, in plaats van het te verbloemen.", "Speed costs you evidence up front. You name that rather than paper over it.") },
    ],
    proof: {
      kicker: copy("Bewijsbeelden / echte projectsporen", "Evidence frames / real project traces"),
      title: copy("De route is zichtbaar: onepager, WhatsApp en Search Console.", "The journey is visible: one-pager, WhatsApp and Search Console."),
      intro: copy("Deze beelden tonen niet alleen hoe de website eruitzag, maar ook hoe contact werd voorbereid en hoe de eerste vindbaarheid zichtbaar werd.", "These frames show not only what the website looked like, but also how contact was prepared and how early discoverability became visible."),
      frames: [
        { src: "/projects/live/atotz/bewijs-1-onepager.png", alt: copy("De volledige AtotZ-onepager als doorlopende strook, met aanwijzingen bij de belofte, de sectoren en de contactroute", "The full AtotZ one-pager as a continuous strip, annotated at the promise, the sectors and the contact route"), caption: copy("Eén pagina, hele propositie", "One page, whole proposition") },
        { src: "/projects/live/atotz/bewijs-2-sectoren.png", alt: copy("Drie sectorkaarten van de live site - onderwijs, IT en freelancers - elk met een knop die WhatsApp opent", "Three sector cards from the live site - education, IT and freelancers - each with a button that opens WhatsApp"), caption: copy("Acht sectoren, acht ingangen", "Eight sectors, eight entry points") },
        { src: "/projects/live/atotz/bewijs-3-search-console.png", alt: copy("Het prestatiepaneel van Google Search Console met 15 klikken, 2,24K vertoningen, 0,7% doorklikratio en gemiddelde positie 18,6", "The Google Search Console performance panel showing 15 clicks, 2.24K impressions, 0.7% click-through rate and average position 18.6"), caption: copy("Gemeten zichtbaarheid, geen conversies", "Measured visibility, not conversions") },
        { src: "/projects/live/atotz/bewijs-4-citaat.png", alt: copy("Twee zinnen van de opdrachtgevers: het proces is goed doordacht en loopt synchroon met hun doelen, en de aanvragen komen binnen", "Two sentences from the owners: the process is well considered and runs in sync with their goals, and the enquiries are coming in"), caption: copy("De opdrachtgevers, in eigen woorden", "The owners, in their own words") },
      ],
    },
    contribution: {
      title: copy("Binnen één week stond er geen portfolio-oefening, maar een bruikbare eerste digitale plek.", "Within one week, this was not a portfolio exercise, but a usable first digital place."),
      paragraphs: [
        copy("Ik deed strategie, copy, UX/UI, Framer-build, responsive uitwerking, basis-SEO en overdracht. De deadline was scherp: een week, vlak voor mijn vakantie met mijn gezin.", "I handled strategy, copy, UX/UI, the Framer build, responsive design, basic SEO and handover. The deadline was sharp: one week, just before a holiday with my family."),
        copy("De website moest warm en professioneel zijn, maar vooral kort door de bocht. Werkgevers moesten snel snappen welke sectoren AtotZ bedient en zonder drempel kunnen appen.", "The website needed to feel warm and professional, but above all direct. Employers had to quickly understand which sectors AtotZ serves and be able to message without friction."),
        copy("Met meer tijd had ik eerder begonnen bij branding en visuele identiteit. Het logo en de eerste kleuren waren al gekozen, dus ik heb binnen die kaders een bruikbare, overdraagbare MVP gebouwd.", "With more time I would have started earlier with branding and visual identity. The logo and initial colours had already been chosen, so I built a usable, transferable MVP within those constraints."),
        copy("De klant beheert de site inmiddels zelf. Daardoor kan de live versie afwijken van mijn oplevering; deze case beoordeelt het systeem, de keuzes en de staat waarin ik het project heb overgedragen.", "The client now manages the site themselves. As a result, the live version may differ from my delivery; this case evaluates the system, the decisions and the state in which I handed the project over."),
      ],
      evidenceNote: copy("Klantreactie: “De aanvragen komen binnen, maar je hebt ons goed de richting van professionaliteit in geduwd met deze website.” Search Console: 2,24K vertoningen en gemiddelde positie 18,6.", "Client response: “The enquiries are coming in, and this website really pushed us in the direction of professionalism.” Search Console: 2.24K impressions and average position 18.6."),
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

  const snapshotLabels: Record<ClientStory["theme"], { kicker: LocalCopy; title: LocalCopy; storyLabel: LocalCopy; contribution: LocalCopy }> = {
    hijama: {
      kicker: copy("Wat de praktijk online moest bewijzen", "What the practice had to prove online"),
      title: copy("Uitleg. Vertrouwen. Contact.", "Clarity. Trust. Contact."),
      storyLabel: copy("Hijama 'N Cups vertrouwensroute", "Hijama 'N Cups trust journey"),
      contribution: copy("Mijn rol / meetbare grens", "My role / evidence boundary"),
    },
    atotz: {
      kicker: copy("Wat de sectorsite moest oplossen", "What the sector site had to solve"),
      title: copy("Herkennen. Kiezen. Gericht reageren.", "Recognise. Choose. Respond with context."),
      storyLabel: copy("AtotZ sectorsiteverhaal", "AtotZ sector-site story"),
      contribution: copy("Mijn rol / leveringsbewijs", "My role / delivery evidence"),
    },
    oppas: {
      kicker: copy("Wat ouders eerst moesten voelen", "What parents needed to feel first"),
      title: copy("Vertrouwen. Ritme. Beschikbaarheid.", "Trust. Rhythm. Availability."),
      storyLabel: copy("Oppas by Chaima vertrouwensroute", "Oppas by Chaima trust journey"),
      contribution: copy("Mijn rol / klantgerapporteerd resultaat", "My role / client-reported result"),
    },
  };
  const caseLabels = snapshotLabels[story.theme];

  const pageStyle = {
    "--client-accent": project.accent,
  } as CSSProperties;

  return (
    <main ref={root} className={`tc-page tc-page-client tc-page-${story.theme}`} style={pageStyle} data-motion-project={project.slug} data-case-motion="pending">
      <a className="skip-link" href="#client-case-content">{locale === "en" ? "Skip to the case study" : "Ga naar de case"}</a>

      <CaseNavMotion />
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
          <p>{pick(locale, caseLabels.kicker)}</p>
          <h2 id={`${project.slug}-snapshot-title`}>{pick(locale, caseLabels.title)}</h2>
        </header>
        <div className="tc-snapshot-grid">
          {story.snapshot.map((item) => <article key={item.label.nl}><span>{pick(locale, item.label)}</span><p>{pick(locale, item.value)}</p></article>)}
        </div>
      </section>

      <section className="tc-deck" aria-label={pick(locale, caseLabels.storyLabel)}>
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
        <p>{pick(locale, caseLabels.contribution)}</p>
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
