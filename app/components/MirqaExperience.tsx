"use client";

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef } from "react";
import AlarmClock from "lucide-react/icons/alarm-clock";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import BellOff from "lucide-react/icons/bell-off";
import CheckCircle2 from "lucide-react/icons/check-circle-2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LanguageSwitcher, Locale, localeHref } from "../i18n";
import { CaseDeepDive } from "./CaseDeepDive";

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
    premiseKicker: "Gedrag ondersteunen zonder geloof te gamificeren",
    premiseTitle:
      "Ik begon niet met meer meldingen. Ik begon met de vraag waarom een goede intentie onderweg toch verloren gaat.",
    premiseNotes: ["Eén gebed als doel", "Vertrektijd in plaats van aftellen", "Geen scores of publieke prestaties"],
    cards: [
      {
        eyebrow: "De productvraag",
        title: "Gebedstijden vertellen wanneer. Niet wat er nodig is om op tijd te vertrekken.",
        body: "De meeste apps eindigen bij een tijdstip of melding. MIRQA richt zich op het gedrag ervoor: één gebed kiezen, een moskee bepalen en op een realistisch moment vertrekken. Zo wordt een abstracte intentie een kleine, uitvoerbare afspraak met jezelf.",
        note: "Niet méér aandacht vragen. Precies op tijd de juiste steun geven.",
        image: "/projects/mirqa/onboarding-welcome.jpg",
        imageAlt: "MIRQA welkomstscherm met de productbelofte en een rustige startknop",
        tone: "mirqa-paper",
      },
      {
        eyebrow: "De gedragskeuze",
        title: "Eén gebed tegelijk verlaagt de drempel.",
        body: "De onboarding vraagt niet welk gebed iemand het vaakst mist, maar met welk gebed diegene wil beginnen. Dat verschuift de ervaring van schuld naar haalbaarheid. De app ondersteunt gewoontevorming zonder aanbidding te reduceren tot een score, streak of ranglijst.",
        note: "Een betekenisvolle keuze hoeft niet zwaar te voelen.",
        image: "/projects/mirqa/onboarding-prayer.jpg",
        imageAlt: "MIRQA onboarding waarin de gebruiker één gebed als startpunt kiest",
        tone: "mirqa-clay",
      },
      {
        eyebrow: "Onboarding en consent",
        title: "Eerst de belofte. Daarna pas de toestemming.",
        body: "Naam, locatie en vaste moskee verschijnen alleen wanneer ze aantoonbaar iets verbeteren. Elk toestemmingsmoment krijgt een eigen uitkomst en herstelroute. De gebruiker begrijpt wat de app teruggeeft voordat er om data wordt gevraagd.",
        note: "Toestemming is een productmoment, geen systeemtussenscherm.",
        image: "/projects/mirqa/onboarding-location.jpg",
        imageAlt: "MIRQA bevestigt rustig dat locatie is ingesteld en legt de waarde uit",
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
    premiseKicker: "Supporting behaviour without gamifying faith",
    premiseTitle:
      "I did not start with more notifications. I started with why a good intention can still get lost before someone leaves home.",
    premiseNotes: ["One prayer as the goal", "A time to leave, not a countdown", "No scores or public performance"],
    cards: [
      {
        eyebrow: "The product question",
        title: "Prayer times tell people when. They do not help them leave on time.",
        body: "Most apps stop at a timetable or notification. MIRQA focuses on the behaviour around it: choose one prayer, select a mosque and work back to a realistic departure time. An abstract intention becomes a small commitment someone can act on.",
        note: "Ask for less attention. Offer the right support at the right moment.",
        image: "/projects/mirqa/onboarding-welcome.jpg",
        imageAlt: "MIRQA welcome screen introducing the product promise and a calm way to begin",
        tone: "mirqa-paper",
      },
      {
        eyebrow: "The behavioural choice",
        title: "One prayer at a time makes the goal feel achievable.",
        body: "Onboarding does not ask which prayer someone misses most. It asks where they want to begin. That reframes the experience around progress rather than guilt. The product supports habit formation without reducing worship to a score, streak or leaderboard.",
        note: "A meaningful choice does not have to feel heavy.",
        image: "/projects/mirqa/onboarding-prayer.jpg",
        imageAlt: "MIRQA onboarding lets someone choose one prayer as a starting point",
        tone: "mirqa-clay",
      },
      {
        eyebrow: "Onboarding and consent",
        title: "Explain the value first. Ask for permission second.",
        body: "A name, location and regular mosque are requested only when they improve the experience. Every permission state has its own outcome and recovery route. People understand what MIRQA gives back before they are asked to share data.",
        note: "Consent is a product moment, not a system interruption.",
        image: "/projects/mirqa/onboarding-location.jpg",
        imageAlt: "MIRQA calmly confirms that location is set and explains its value",
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

export function MirqaExperience({ locale = "nl" }: { locale?: Locale }) {
  const root = useRef<HTMLElement>(null);
  const copy = content[locale];
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro.from(".tc-nav", { opacity: 0, y: -18, duration: 0.32 })
        .from(".tc-hero-kicker", { opacity: 0, y: 16, duration: 0.28 }, "-=0.08")
        .from(".tc-title-line > span", { yPercent: 112, duration: 0.52, stagger: 0.05 }, "-=0.16")
        .from(".tc-hero-summary, .tc-hero-meta", { opacity: 0, y: 24, duration: 0.38, stagger: 0.05 }, "-=0.32")
        .from(".tc-hero-media", { opacity: 0, xPercent: 16, scale: 0.97, duration: 0.78 }, "-=0.46");

      gsap.to(".tc-hero-media > img:first-child", { yPercent: -5, ease: "none", scrollTrigger: { trigger: ".tc-hero", start: "top top", end: "bottom top", scrub: true } });

      const cardElements = gsap.utils.toArray<HTMLElement>(".tc-card");
      const shells = gsap.utils.toArray<HTMLElement>(".tc-card-shell");
      cardElements.forEach((card, index) => {
        const shell = shells[index];
        const nextShell = shells[index + 1];
        gsap.from(card.querySelectorAll(".tc-mask > span"), { yPercent: 115, duration: 0.9, stagger: 0.07, ease: "power4.out", scrollTrigger: { trigger: shell, start: "top 72%", toggleActions: "play none none reverse" } });
        const media = card.querySelector(".tc-card-media");
        if (media) gsap.from(media, { opacity: 0, y: 42, scale: 0.985, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: shell, start: "top 70%", toggleActions: "play none none reverse" } });
        if (nextShell) gsap.to(card, { scale: 0.985, filter: "brightness(0.95)", ease: "none", scrollTrigger: { trigger: nextShell, start: "top bottom", end: "top 10%", scrub: true, invalidateOnRefresh: true } });
      });

      gsap.utils.toArray<HTMLElement>(".tc-proof-frame").forEach((frame, index) => gsap.from(frame, { opacity: 0, y: 38, rotate: index % 2 === 0 ? -0.6 : 0.6, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: frame, start: "top 88%" } }));
    }, root);
    return () => context.revert();
  }, []);

  return (
    <main ref={root} className="tc-page tc-page-mirqa">
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
        <figure className="tc-hero-media">
          <Image src="/projects/mirqa/onboarding-welcome.jpg" alt={copy.cards[0].imageAlt} fill priority sizes="(max-width: 760px) 100vw, 58vw" />
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
                {index === 1 && <div className="tc-feature-row"><span><CheckCircle2 aria-hidden="true" /> {copy.featureLabels[0]}</span><span><BellOff aria-hidden="true" /> {copy.featureLabels[1]}</span><span><AlarmClock aria-hidden="true" /> {copy.featureLabels[2]}</span></div>}
              </div>
              <figure className="tc-card-media">
                <Image src={card.image} alt={card.imageAlt} fill sizes="(max-width: 760px) 92vw, 54vw" />
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
              <div className="tc-proof-media"><Image src={src} alt={`${copy.proofLabels[index]} — MIRQA`} fill sizes="(max-width: 760px) 82vw, 44vw" /></div>
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
        <a href={localeHref("/cases/tareeqi", locale)}><span>Tareeqi</span><ArrowUpRight aria-hidden="true" /></a>
        <div><span>Abdelrahman / Product &amp; UX/UI designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
