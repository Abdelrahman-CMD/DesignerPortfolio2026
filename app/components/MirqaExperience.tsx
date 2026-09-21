"use client";

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef } from "react";
import AlarmClock from "lucide-react/icons/alarm-clock";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import BellOff from "lucide-react/icons/bell-off";
import CheckCircle2 from "lucide-react/icons/check-circle-2";
import { LanguageSwitcher, Locale, localeHref } from "../i18n";
import { CaseDeepDive } from "./CaseDeepDive";
import { initCaseMotion } from "./caseScrollStory";

const content = {
  nl: {
    navCount: "01 / 08",
    kicker: "Case 01 · Concept in ontwikkeling",
    title: ["MIRQA", "Eén gebed.", "Een haalbaar vertrekpunt."],
    summary:
      "Ik ontwerp MIRQA als een rustige mobiele companion die intentie omzet in één concrete vertrekbeslissing: welk gebed wil je in de moskee halen, waar ga je heen en wanneer moet je vertrekken?",
    meta: [
      ["Vertrekpunt", "Zelf geïnitieerde productkans"],
      ["Mijn rol", "Productstrategie · UX research · UX/UI"],
      ["Status", "In ontwikkeling · Coming soon"],
    ],
    heroCaption: "Mobiele productcase / binnenkort beschikbaar",
    heroAlt: "MIRQA app in een schuine iPhone-mockup met het persoonlijke vertrekplan voor Maghrib",
    premiseKicker: "Gedrag ondersteunen zonder geloof te gamificeren",
    premiseTitle:
      "Ik begon niet met meer meldingen. Ik begon met de vraag waarom een goede intentie onderweg toch verloren gaat.",
    premiseNotes: ["Eén gebed als doel", "Vertrektijd in plaats van aftellen", "Geen scores of publieke prestaties"],
    cards: [
      {
        eyebrow: "Onboarding / intentie en vertrouwen",
        title: "Een groot voornemen wordt één haalbare eerste stap.",
        body: "Vier schermen bouwen vertrouwen stap voor stap op: eerst de productbelofte, daarna een naam alleen voor de aanspreekvorm, één focusgebed als haalbaar begin en locatie pas wanneer de opbrengst duidelijk is. Ieder scherm vraagt één beslissing en houdt de gebruiker in controle.",
        note: "Eerst begrijpen wat MIRQA toevoegt. Daarna pas iets kiezen of delen.",
        imageAlt: "Vier MIRQA-schermen voor welkom, aanspreekvorm, focusgebed en locatiebevestiging",
        tone: "mirqa-paper",
      },
      {
        eyebrow: "Moskee kiezen / overzicht en toegankelijkheid",
        title: "Kaart en lijst leiden naar dezelfde betrouwbare keuze.",
        body: "De vaste moskee verbindt de onboarding met het dagelijkse vertrekplan. Daarna biedt de zoeker geografisch overzicht op de kaart en dezelfde resultaten scanbaar in een lijst. Selectie, volgorde, afstand en bronzekerheid blijven gelijk, zodat toegankelijkheid nooit een tweederangs ervaring wordt.",
        note: "De vorm mag veranderen. De kwaliteit van de beslissing niet.",
        imageAlt: "Drie MIRQA-schermen voor een vaste moskee, kaartweergave en gelijkwaardige lijstweergave",
        tone: "mirqa-clay",
      },
      {
        eyebrow: "Dagelijks gebruik / vertrekken en terugkijken",
        title: "Eén rustige lijn van plan naar vertrek en reflectie.",
        body: "Het homescherm vertaalt gebedstijd, reistijd, voorbereiding en rustmarge naar één vertrekmoment. In Plan kan de gebruiker die logica aanpassen; Terugblik zoekt patronen zonder scores en Gids geeft alleen context die rondom het moskeebezoek direct bruikbaar is.",
        note: "Niet vaker openen, maar op het juiste moment beter ondersteunen.",
        imageAlt: "Vier MIRQA-schermen voor home, vertrekplanning, terugblik en praktische begeleiding",
        tone: "mirqa-sand",
      },
      {
        eyebrow: "Moskee ontdekken",
        title: "Kaart en lijst zijn twee vormen van dezelfde waarheid.",
        body: "De kaart geeft geografisch overzicht; de lijst maakt dezelfde resultaten scanbaar met adres en afstand. De volgorde en selectie blijven gelijk. MIRQA benoemt onzekerheid in brondata en kiest nooit automatisch een gebedsruimte wanneer de herkomst niet betrouwbaar genoeg is.",
        note: "Toegankelijkheid verandert de vorm, niet de inhoud of de kwaliteit van de keuze.",
        image: "/projects/mirqa/mosque-map.jpg",
        imageAlt: "MIRQA kaartweergave voor het kiezen van een moskee",
        tone: "mirqa-ink",
      },
      {
        eyebrow: "Het interfacesysteem",
        title: "Rust is geen stijlkeuze. Het is de gebruikslogica.",
        body: "Een redactionele serif vertraagt waar betekenis nodig is; de interface blijft compact en voorspelbaar. Warm ivoor, klei en zachte contrasten ondersteunen focus. Eén primaire actie per scherm bewaakt het tempo van de onboarding en voorkomt beslisruis.",
        note: "Minder interface maakt de volgende stap voelbaar duidelijker.",
        tone: "mirqa-dark",
        styleGuide: true,
      },
      {
        eyebrow: "Wat nog bewezen moet worden",
        title: "Coming soon betekent: bouwen, meten en durven bijstellen.",
        body: "MIRQA is nog niet gelanceerd. De volgende productfase draait om bruikbaarheid in de echte context: begrijpen mensen de vertreklogica, vertrouwen zij de moskeedata en helpt één gekozen gebed hen daadwerkelijk om vaker op tijd te vertrekken?",
        note: "De schermen maken de hypothese concreet. Gebruik in de praktijk moet de waarde bewijzen.",
        image: "/projects/mirqa/mosque-list.jpg",
        imageAlt: "MIRQA lijstweergave als toegankelijk alternatief voor de kaart",
        tone: "mirqa-rust",
      },
    ],
    featureLabels: ["Eén haalbaar doel", "Geen streaks", "Duidelijke voortgang"],
    accessLabels: ["Kaart", "Gelijkwaardige lijst", "Bronzekerheid zichtbaar"],
    systemCaption: "Iowan Old Style brengt betekenis. Inter houdt iedere keuze rustig, compact en herkenbaar.",
    validation: [
      "Begrijpen mensen direct hoe de vertrektijd tot stand komt?",
      "Blijft de moskeekeuze betrouwbaar bij onvolledige brondata?",
      "Helpt één gekozen gebed om intentie vaker in gedrag om te zetten?",
    ],
    proofKicker: "Productbeslissingen / zichtbaar gemaakt",
    proofTitle: ["Vier kernmomenten.", "Eén rustige flow.", "Een product in beweging."],
    proofBody:
      "Deze schermen zijn geen losse UI-oefeningen. Samen laten ze zien hoe positionering, consent, gedrag, toegankelijkheid en bronvertrouwen doorwerken in één mobiele productervaring.",
    proofLabels: [
      "Onboarding / belofte",
      "Onboarding / aanspreekvorm",
      "Onboarding / gebedskeuze",
      "Onboarding / locatie bevestigd",
      "Onboarding / vaste moskee",
      "Moskee kiezen / kaart",
      "Moskee kiezen / lijst",
    ],
    contributionKicker: "Mijn bijdrage",
    contributionTitle:
      "Van een persoonlijke observatie naar een mobiele producthypothese die klaar is om in de praktijk te toetsen.",
    contributionBody:
      "Ik bepaalde de productrichting, bracht de belangrijkste gedrags- en vertrouwensmomenten in kaart, ontwierp de onboarding en moskeezoeker en bouwde het interfacesysteem rond rust en toegankelijkheid. De volgende stap is een werkende beta toetsen met echte gebruikers en beslissingen aanscherpen op gedrag in plaats van voorkeur alleen.",
    footerKicker: "Volgende case / Conceptproject",
  },
  en: {
    navCount: "01 / 08",
    kicker: "Case 01 · Product concept in development",
    title: ["MIRQA", "One prayer.", "A realistic time to leave."],
    summary:
      "I am designing MIRQA as a calm mobile companion that turns intention into one practical decision: which prayer do you want to reach at the mosque, where will you go and when should you leave?",
    meta: [
      ["Starting point", "Self-initiated product opportunity"],
      ["My role", "Product strategy · UX research · UX/UI"],
      ["Status", "In development · Coming soon"],
    ],
    heroCaption: "Mobile product case study / coming soon",
    heroAlt: "MIRQA shown in an angled iPhone mockup with a personal Maghrib departure plan",
    premiseKicker: "Supporting behaviour without gamifying faith",
    premiseTitle:
      "I did not start with more notifications. I started with why a good intention can still get lost before someone leaves home.",
    premiseNotes: ["One prayer as the goal", "A time to leave, not a countdown", "No scores or public performance"],
    cards: [
      {
        eyebrow: "Onboarding / intention and trust",
        title: "A meaningful intention becomes one achievable first step.",
        body: "Four screens build trust in sequence: the product promise comes first, a name is used only to personalise the conversation, one focus prayer creates an achievable starting point and location is requested only after its value is clear. Each screen asks for one decision and keeps the user in control.",
        note: "Help people understand MIRQA before asking them to choose or share anything.",
        imageAlt: "Four MIRQA screens covering the welcome, preferred name, focus prayer and location confirmation",
        tone: "mirqa-paper",
      },
      {
        eyebrow: "Choosing a mosque / overview and access",
        title: "Map and list lead to the same trustworthy choice.",
        body: "The regular mosque connects onboarding to the everyday departure plan. The finder then offers geographic context on a map and the same results in a scannable list. Selection, order, distance and source confidence stay consistent, so the accessible alternative never becomes a lesser experience.",
        note: "The format can change. The quality of the decision should not.",
        imageAlt: "Three MIRQA screens showing a regular mosque, map view and equivalent list view",
        tone: "mirqa-clay",
      },
      {
        eyebrow: "Everyday use / leaving and reflecting",
        title: "One calm journey from planning to departure and reflection.",
        body: "Home combines prayer time, travel, preparation and a personal buffer into one time to leave. Plan makes that logic adjustable; Reflection reveals patterns without scores, while Guide offers only the context that is useful before, during and after a mosque visit.",
        note: "Not more reasons to open the app. Better support at the moment it matters.",
        imageAlt: "Four MIRQA screens for home, departure planning, reflection and practical guidance",
        tone: "mirqa-sand",
      },
      {
        eyebrow: "Finding a mosque",
        title: "Map and list are two views of the same truth.",
        body: "The map provides geographic context; the list makes the same results scannable through address and distance. Order and selection remain consistent. MIRQA is honest about uncertainty in source data and never treats an unverified prayer space as a confident recommendation.",
        note: "Accessibility changes the format, not the information or the quality of the decision.",
        image: "/projects/mirqa/mosque-map.jpg",
        imageAlt: "MIRQA map view for choosing a mosque",
        tone: "mirqa-ink",
      },
      {
        eyebrow: "The interface system",
        title: "Calm is not decoration. It is part of the product logic.",
        body: "An editorial serif slows the experience where meaning matters; the interface stays compact and predictable. Warm ivory, clay and gentle contrast protect focus. One primary action per screen keeps the onboarding clear and reduces decision noise.",
        note: "Less interface makes the next step easier to understand.",
        tone: "mirqa-dark",
        styleGuide: true,
      },
      {
        eyebrow: "What still needs to be proven",
        title: "Coming soon means building, measuring and being willing to change course.",
        body: "MIRQA has not launched yet. The next product phase is about real-world usability: do people understand the departure logic, trust the mosque data and find that one chosen prayer genuinely helps them leave on time more often?",
        note: "The screens make the hypothesis tangible. Use in context has to prove the value.",
        image: "/projects/mirqa/mosque-list.jpg",
        imageAlt: "MIRQA list view as an accessible alternative to the map",
        tone: "mirqa-rust",
      },
    ],
    featureLabels: ["One achievable goal", "No streaks", "Clear progress"],
    accessLabels: ["Map", "Equivalent list", "Visible source confidence"],
    systemCaption: "Iowan Old Style adds meaning. Inter keeps every choice calm, compact and familiar.",
    validation: [
      "Do people understand how their departure time is calculated?",
      "Does mosque selection remain trustworthy when source data is incomplete?",
      "Can one chosen prayer help turn intention into action more often?",
    ],
    proofKicker: "Product decisions / made visible",
    proofTitle: ["Four defining moments.", "One calm flow.", "A product in motion."],
    proofBody:
      "These are not isolated UI exercises. Together they show how positioning, consent, behaviour, accessibility and trust in the underlying data shape one coherent mobile product experience.",
    proofLabels: [
      "Onboarding / promise",
      "Onboarding / how to address you",
      "Onboarding / prayer choice",
      "Onboarding / location confirmed",
      "Onboarding / regular mosque",
      "Choosing a mosque / map",
      "Choosing a mosque / list",
    ],
    contributionKicker: "My contribution",
    contributionTitle:
      "From a personal observation to a mobile product hypothesis that is ready to be tested in context.",
    contributionBody:
      "I set the product direction, mapped the key behaviour and trust moments, designed the onboarding and mosque finder, and built an interface system around calm and accessibility. The next step is to test a working beta with real users and refine decisions around observed behaviour, not preference alone.",
    footerKicker: "Next case / Concept project",
  },
} as const;

const images = [
  "/projects/mirqa/onboarding-welcome.jpg",
  "/projects/mirqa/onboarding-name.jpg",
  "/projects/mirqa/onboarding-prayer.jpg",
  "/projects/mirqa/onboarding-location.jpg",
  "/projects/mirqa/onboarding-mosque.jpg",
  "/projects/mirqa/mosque-map.jpg",
  "/projects/mirqa/mosque-list.jpg",
] as const;

const cardScreenGroups = [
  [
    "/projects/mirqa/screens/onboarding-welcome.webp",
    "/projects/mirqa/screens/onboarding-name.webp",
    "/projects/mirqa/screens/onboarding-prayer.webp",
    "/projects/mirqa/screens/onboarding-location.webp",
  ],
  [
    "/projects/mirqa/screens/onboarding-mosque.webp",
    "/projects/mirqa/screens/mosque-map.webp",
    "/projects/mirqa/screens/mosque-list.webp",
  ],
  [
    "/projects/mirqa/screens/home.webp",
    "/projects/mirqa/screens/plan.webp",
    "/projects/mirqa/screens/reflection.webp",
    "/projects/mirqa/screens/guide.webp",
  ],
] as const;

export function MirqaExperience({ locale = "nl" }: { locale?: Locale }) {
  const root = useRef<HTMLElement>(null);
  const copy = content[locale];
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    return initCaseMotion(element, { heroParallax: 5 });
  }, []);

  return (
    <main ref={root} className="tc-page tc-page-mirqa" data-motion-project="mirqa">
      <a className="skip-link" href="#mirqa-content">{locale === "en" ? "Skip to the case study" : "Ga naar de case"}</a>

      <nav className="tc-nav" aria-label={locale === "en" ? "Case study navigation" : "Case navigatie"}>
        <a href={localeHref("/#werk", locale)}><ArrowLeft aria-hidden="true" /> {locale === "en" ? "All case studies" : "Alle cases"}</a>
        <a className="tc-nav-brand" href={localeHref("/", locale)}>Abdelrahman / Product &amp; UX/UI designer</a>
        <div className="tc-nav-actions"><span>{copy.navCount}</span><LanguageSwitcher locale={locale} path="/cases/mirqa" /></div>
      </nav>

      <header className="tc-hero">
        <div className="tc-hero-copy">
          <p className="tc-hero-kicker">{copy.kicker}</p>
          <h1>
            <span className="tc-title-line"><span>{copy.title[0]}</span></span>
            <span className="tc-title-line tc-title-small"><span>{copy.title[1]}</span></span>
            <span className="tc-title-line tc-title-small"><span>{copy.title[2]}</span></span>
          </h1>
          <p className="tc-hero-summary">{copy.summary}</p>
          <dl className="tc-hero-meta">
            {copy.meta.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </div>
        <figure className="tc-hero-media" style={{ viewTransitionName: "case-hero" } as CSSProperties}>
          <Image src="/projects/mirqa/mirqa-case-hero.webp" alt={copy.heroAlt} fill priority sizes="(max-width: 760px) 100vw, 58vw" />
          <figcaption>{copy.heroCaption}</figcaption>
        </figure>
      </header>

      <section className="tc-snapshot" id="mirqa-content" aria-labelledby="mirqa-snapshot-title">
        <header>
          <p>{locale === "en" ? "The 30-second case" : "De case in 30 seconden"}</p>
          <h2 id="mirqa-snapshot-title">{locale === "en" ? "Problem. Solution. Next step." : "Probleem. Oplossing. Volgende stap."}</h2>
        </header>
        <div className="tc-snapshot-grid">
          <div><span>{locale === "en" ? "Problem" : "Probleem"}</span><p>{copy.cards[0].note}</p></div>
          <div><span>{locale === "en" ? "Solution" : "Oplossing"}</span><p>{copy.cards[2].note}</p></div>
          <div><span>{locale === "en" ? "Status / next step" : "Status / volgende stap"}</span><p>{copy.cards[5].note}</p></div>
        </div>
      </section>

      <section className="tc-deck" aria-label={locale === "en" ? "MIRQA product story in three decisions" : "MIRQA productverhaal in drie beslissingen"}>
        {copy.cards.slice(0, 3).map((card, index) => (
          <article className={`tc-card-shell tc-tone-${card.tone}`} id={`chapter-${index + 1}`} key={card.eyebrow} style={{ "--tc-index": index + 1 } as CSSProperties}>
            <div className="tc-card">
              <span className="tc-card-dim" aria-hidden="true" />
              <div className="tc-card-copy">
                <div className="tc-card-index"><span>0{index + 1}</span><span>03</span></div>
                <p className="tc-mask tc-card-eyebrow"><span>{card.eyebrow}</span></p>
                <h2 className="tc-mask"><span>{card.title}</span></h2>
                <p className="tc-mask tc-card-body"><span>{card.body}</span></p>
                <p className="tc-mask tc-card-note"><span>{card.note}</span></p>
                {index === 0 && <div className="tc-feature-row"><span><CheckCircle2 aria-hidden="true" /> {copy.featureLabels[0]}</span><span><BellOff aria-hidden="true" /> {copy.featureLabels[1]}</span><span><AlarmClock aria-hidden="true" /> {copy.featureLabels[2]}</span></div>}
              </div>
              <figure
                className={`tc-card-media tc-mirqa-screen-composition tc-mirqa-screen-composition-${index + 1}`}
                role="img"
                aria-label={card.imageAlt}
              >
                {cardScreenGroups[index].map((src, screenIndex) => (
                  <span className={`tc-mirqa-screen tc-mirqa-screen-${screenIndex + 1}`} key={src} aria-hidden="true">
                    <Image src={src} alt="" fill sizes="(max-width: 760px) 34vw, 22vw" />
                  </span>
                ))}
              </figure>
            </div>
          </article>
        ))}
      </section>

      <CaseDeepDive
        locale={locale}
        items={copy.cards.slice(3).map((card, index) => ({
          number: `0${index + 4}`,
          eyebrow: card.eyebrow,
          title: card.title,
          body: card.body,
          note: card.note,
        }))}
      />

      <section className="tc-proof" aria-labelledby="mirqa-proof-title">
        <header className="tc-proof-heading">
          <p>{copy.proofKicker}</p>
          <h2 id="mirqa-proof-title">{copy.proofTitle[0]}<br />{copy.proofTitle[1]}<br /><em>{copy.proofTitle[2]}</em></h2>
          <p>{copy.proofBody}</p>
        </header>
        <div className="tc-proof-grid">
          {images.slice(0, 4).map((src, index) => (
            <figure className="tc-proof-frame" key={src}>
              <div className="tc-proof-media"><Image src={src} alt={`${copy.proofLabels[index]}. MIRQA`} fill sizes="(max-width: 760px) 82vw, 44vw" /></div>
              <figcaption>{copy.proofLabels[index]}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="tc-contribution">
        <p>{copy.contributionKicker}</p>
        <div><h2>{copy.contributionTitle}</h2><p>{copy.contributionBody}</p></div>
      </section>

      <footer className="tc-footer">
        <p>{copy.footerKicker}</p>
        <a href={localeHref("/cases/oppas-by-chaima", locale)}><span>Oppas by Chaima</span><ArrowUpRight aria-hidden="true" /></a>
        <div><span>Abdelrahman / Product &amp; UX/UI designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
