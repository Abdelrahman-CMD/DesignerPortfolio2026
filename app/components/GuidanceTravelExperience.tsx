"use client";

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef } from "react";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import CalendarRange from "lucide-react/icons/calendar-range";
import CircleCheckBig from "lucide-react/icons/circle-check-big";
import Compass from "lucide-react/icons/compass";
import HeartHandshake from "lucide-react/icons/heart-handshake";
import ShieldCheck from "lucide-react/icons/shield-check";
import UsersRound from "lucide-react/icons/users-round";
import { LanguageSwitcher, Locale, localeHref, translateText } from "../i18n";
import { CaseDeepDive } from "./CaseDeepDive";
import { CaseResearchEvidence } from "./CaseResearchEvidence";
import { CaseStyleGuide, type CaseStyleGuideData } from "./CaseStyleGuide";
import { initCaseMotion } from "./caseScrollStory";

const styleGuide: CaseStyleGuideData = {
  project: "Guidance Travel",
  logo: "/projects/guidance-2026/logo.webp",
  logoAlt: "Guidance Travel logo",
  displayFont: "Neue Haas Unica Pro",
  displayUse: "Headlines / identiteit",
  interfaceFont: "Work Sans",
  interfaceUse: "Body / interface / helderheid",
  variant: "guidance",
  colors: [
    { name: "Cosmic orange", value: "#FF9E43", ink: "#1E1E1E" },
    { name: "Toned black", value: "#1E1E1E", ink: "#FFF6EE" },
    { name: "Light beige", value: "#FFF6EE", ink: "#1E1E1E" },
    { name: "Off-white", value: "#F1F1F1", ink: "#1E1E1E" },
  ],
};

const cards = [
  {
    number: "01", eyebrow: "De onderzoeksrichting",
    title: "De spirituele reis voelde persoonlijk. Het boeken ervan niet.",
    body: "Een directionele enquête met 21 deelnemers maakte de prioriteiten concreet: 17 wilden een duidelijk reisprogramma, 15 heldere inclusies en 13 een transparante prijsopbouw. Begeleiding en contact moeten vóór vertrek zichtbaar en begrijpelijk zijn.",
    note: "De onzekerheid zat niet in de bestemming, maar in alles wat ervoor geregeld moest worden.",
    image: "/projects/guidance-2026/phones.webp", imageAlt: "Guidance Travel op twee smartphones", tone: "beige",
  },
  {
    number: "02", eyebrow: "De marktkans",
    title: "Premium begeleiding bestond al. De digitale vertaling liep achter.",
    body: "Persoonlijke gidsen, duidelijke reisstappen en zorg onderweg zijn echte onderscheidende waarden. Door die waarden vóór de prijs zichtbaar te maken, verandert de website van een pakketlijst in een eerste bewijs van hoe de reis begeleid zal worden.",
    note: "Niet harder verkopen. Eerder laten voelen hoe zorgvuldig de reis wordt gedragen.",
    image: "/projects/guidance-2026/laptops.webp", imageAlt: "Guidance Travel desktopconcept op twee laptops", tone: "orange",
  },
  {
    number: "03", eyebrow: "De oplossingsrichting",
    title: "Eerst intentie en ritme. Daarna pas het passende pakket.",
    body: "Een heldere route verbindt reisdoel, periode, groepsgrootte en gewenste ondersteuning. Pakketten worden vergelijkbaar zonder de reis tot een prijsfilter te reduceren; elke keuze krijgt context, inclusies en een logische vervolgstap.",
    note: "Form follows function: iedere vorm helpt één beslissing vooruit.",
    image: "/projects/guidance-2026/tablets.webp", imageAlt: "Guidance Travel pakketten en gidsen op tablets", tone: "offwhite",
  },
  {
    number: "04", eyebrow: "Vertrouwen vóór conversie",
    title: "Ieder praktisch detail moet zichzelf kunnen uitleggen.",
    body: "De gidsen krijgen een gezicht, pakketten tonen inclusies zonder kleine lettertjes en vragen worden beantwoord op het moment dat ze ontstaan. Zo wordt transparantie geen losse FAQ, maar productlogica door de hele ervaring.",
    note: "Een rustige interface is hier geen stijlkeuze. Het verlaagt beslisdruk.",
    image: "/projects/guidance-2026/faq-desktop.webp", imageAlt: "Guidance Travel gidsen, galerij en FAQ op desktop", tone: "black",
  },
  {
    number: "05", eyebrow: "Het ontwerpsysteem",
    title: "Een sobere basis met één duidelijke energiedrager.",
    body: "Zwart en off-white bouwen het rationele fundament. Cosmic Orange markeert actie, warmte en momentum. De typografie is direct en functioneel, zodat beelden van reis, begeleiding en gemeenschap de emotionele laag kunnen dragen.",
    note: "De identiteit trekt aandacht op de momenten waarop een keuze nodig is.",
    image: "", imageAlt: "Guidance Travel style guide", tone: "beige", styleGuide: true,
  },
  {
    number: "06", eyebrow: "Wat nog bewezen moet worden",
    title: "Het concept maakt een betere beslisroute zichtbaar. Gebruikers moeten bewijzen welke zekerheid telt.",
    body: "Guidance Travel is een zelf geïnitieerde oplossingsrichting. De volgende stap is testen welke informatie twijfel verlaagt, of begeleiders vertrouwen versterken en of de keuzehulp mensen sneller bij een passend pakket brengt zonder de ervaring commercieel te laten voelen.",
    note: "De interface is de hypothese. Begrip, vertrouwen en passende keuzes zijn de meetpunten.",
    image: "/projects/guidance-2026/hero-laptops.webp", imageAlt: "Guidance Travel eindconcept in een laptopmockup", tone: "orange",
  },
] as const;

const proofFrames = [
  { label: "Landing / desktop", src: "/projects/guidance-2026/landing-desktop.webp" },
  { label: "Pakketten / desktop", src: "/projects/guidance-2026/plans-desktop.webp" },
  { label: "Gidsen & FAQ / desktop", src: "/projects/guidance-2026/faq-desktop.webp" },
  { label: "Landing / tablet", src: "/projects/guidance-2026/landing-tablet.webp" },
  { label: "Pakketten / tablet", src: "/projects/guidance-2026/plans-tablet.webp" },
  { label: "Gidsen & FAQ / tablet", src: "/projects/guidance-2026/faq-tablet.webp" },
  { label: "Landing / mobile", src: "/projects/guidance-2026/landing-mobile.webp" },
  { label: "Pakketten / mobile", src: "/projects/guidance-2026/plans-mobile.webp" },
  { label: "Gidsen & FAQ / mobile", src: "/projects/guidance-2026/faq-mobile.webp" },
] as const;

export function GuidanceTravelExperience({ locale = "nl" }: { locale?: Locale }) {
  const root = useRef<HTMLElement>(null);
  const tx = (value: string) => translateText(locale, value);
  const localizedStyleGuide = {
    ...styleGuide,
    displayUse: tx(styleGuide.displayUse),
    interfaceUse: tx(styleGuide.interfaceUse),
  };

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    return initCaseMotion(element);
  }, []);

  return (
    <main ref={root} className="tc-page tc-page-guidance" data-motion-project="guidance-travel" data-case-motion="pending">
      <a className="skip-link" href="#guidance-content">{tx("Ga naar de case")}</a>
      <nav className="tc-nav" aria-label={tx("Case navigatie")}>
        <a href={localeHref("/#werk", locale)}><ArrowLeft aria-hidden="true" /> {tx("Alle cases")}</a>
        <a className="tc-nav-brand" href={localeHref("/", locale)}>Abdelrahman / Product &amp; UX/UI designer</a>
        <div className="tc-nav-actions"><span>07 / 08</span><LanguageSwitcher locale={locale} path="/cases/guidance-travel" /></div>
      </nav>

      <header className="tc-hero">
        <div className="tc-hero-copy">
          <p className="tc-hero-kicker">{locale === "en" ? "Case 07 · Research-led concept" : "Case 07 · Onderzoeksgericht concept"}</p>
          <h1>
            <span className="tc-title-line"><span>Guidance Travel</span></span>
            <span className="tc-title-line tc-title-small"><span>{tx("De reis vroeg overgave.")}</span></span>
            <span className="tc-title-line tc-title-small"><span>{tx("Het boeken vooral overzicht.")}</span></span>
          </h1>
          <p className="tc-hero-summary">{locale === "en" ? "A directional survey with 21 respondents showed where booking confidence breaks down. Guidance Travel turns those findings into a calm route from intention to the right journey." : "Een directionele enquête met 21 deelnemers liet zien waar besliszekerheid verdwijnt. Guidance Travel vertaalt die bevindingen naar een rustige route van intentie naar een passende reis."}</p>
          <dl className="tc-hero-meta">
            <div><dt>{tx("Vertrekpunt")}</dt><dd>{locale === "en" ? "Directional survey · 21 responses" : "Directionele enquête · 21 responsen"}</dd></div>
            <div><dt>{tx("Mijn rol")}</dt><dd>Strategy · UX/UI · Direction</dd></div>
            <div><dt>{tx("Status")}</dt><dd>{tx("Toetsbaar serviceconcept")}</dd></div>
          </dl>
        </div>
        <figure className="tc-hero-media">
          <Image src="/projects/guidance-2026/hero-laptops.webp" alt={tx("Guidance Travel websiteconcept op een laptop")} fill priority sizes="(max-width: 760px) 100vw, 58vw" />
          <figcaption>Responsive service concept / Hajj &amp; Umrah</figcaption>
        </figure>
      </header>

      <section className="tc-snapshot" id="guidance-content" aria-labelledby="guidance-snapshot-title">
        <header><p>{tx("De case in 30 seconden")}</p><h2 id="guidance-snapshot-title">{tx("Probleem. Oplossing. Volgende stap.")}</h2></header>
        <div className="tc-snapshot-grid">
          <article><span>{tx("Probleem")}</span><p>{tx(cards[0].note)}</p></article>
          <article><span>{tx("Oplossing")}</span><p>{tx(cards[2].note)}</p></article>
          <article><span>{tx("Status / volgende stap")}</span><p>{tx(cards[5].note)}</p></article>
        </div>
      </section>

      <CaseResearchEvidence variant="guidance" locale={locale} />

      <section className="tc-deck" aria-label={tx("Guidance Travel oplossingsverhaal in drie beslissingen")}>
        {cards.slice(0, 3).map((card, index) => (
          <article className={`tc-card-shell tc-tone-${card.tone}`} id={`chapter-${card.number}`} key={card.number} style={{ "--tc-index": index + 1 } as CSSProperties}>
            <div className="tc-card">
              <span className="tc-card-dim" aria-hidden="true" />
              <div className="tc-card-copy">
                <div className="tc-card-index"><span>{card.number}</span><span>03</span></div>
                <p className="tc-mask tc-card-eyebrow"><span>{tx(card.eyebrow)}</span></p>
                <h2 className="tc-mask"><span>{tx(card.title)}</span></h2>
                <p className="tc-mask tc-card-body"><span>{tx(card.body)}</span></p>
                <p className="tc-mask tc-card-note"><span>{tx(card.note)}</span></p>
                {index === 2 && <div className="tc-feature-row"><span><CalendarRange aria-hidden="true" /> {tx("Periode & intentie")}</span><span><UsersRound aria-hidden="true" /> {tx("Reisgezelschap")}</span><span><Compass aria-hidden="true" /> {tx("Passend pakket")}</span></div>}
                {index === 3 && <div className="tc-feature-row"><span><HeartHandshake aria-hidden="true" /> {tx("Menselijke gidsen")}</span><span><CircleCheckBig aria-hidden="true" /> {tx("Heldere inclusies")}</span><span><ShieldCheck aria-hidden="true" /> {tx("Vragen in context")}</span></div>}
                {index === 4 && <p className="tc-system-caption">{tx("Neue Haas Unica Pro zet de richting. Work Sans houdt informatie scanbaar.")}</p>}
                {index === 5 && <ul className="tc-validation-list"><li>{tx("Welke informatie verlaagt twijfel aantoonbaar?")}</li><li>{tx("Versterken zichtbare gidsen het vertrouwen?")}</li><li>{tx("Komt iemand sneller bij een passend pakket?")}</li></ul>}
              </div>
              <figure className={`tc-card-media${"styleGuide" in card ? " tc-style-card-media" : ""}`}>
                {"styleGuide" in card ? <CaseStyleGuide data={localizedStyleGuide} /> : <Image src={card.image} alt={tx(card.imageAlt)} fill sizes="(max-width: 760px) 92vw, 54vw" />}
              </figure>
            </div>
          </article>
        ))}
      </section>

      <CaseDeepDive items={cards.slice(3).map((card) => ({ ...card, eyebrow: tx(card.eyebrow), title: tx(card.title), body: tx(card.body), note: tx(card.note) }))} locale={locale} />

      <section className="tc-proof" aria-labelledby="guidance-proof-title">
        <header className="tc-proof-heading">
          <p>{tx("Geselecteerde schermen / snel te beoordelen")}</p>
          <h2 id="guidance-proof-title">{tx("Eén reislogica.")}<br />{tx("Drie formaten.")}<br /><em>{tx("Vier kernschermen.")}</em></h2>
          <p>{tx("Vier representatieve schermen tonen de beslisroute. De volledige responsive uitwerking blijft op verzoek beschikbaar.")}</p>
        </header>
        <div className="tc-proof-grid">
          {proofFrames.slice(0, 4).map((frame, index) => <figure className="tc-proof-frame" key={frame.label}><div className="tc-proof-media"><Image src={frame.src} alt={locale === "en" ? `Responsive Guidance Travel interface ${index + 1}` : `${frame.label} van Guidance Travel`} fill sizes="(max-width: 760px) 86vw, 44vw" /></div><figcaption>{tx(frame.label)}</figcaption></figure>)}
        </div>
      </section>

      <section className="tc-contribution">
        <p>{tx("Mijn bijdrage")}</p>
        <div><h2>{tx("Van een markt vol pakketten naar een dienst die al vóór vertrek vertrouwen begint op te bouwen.")}</h2><p>{tx("Ik heb de marktfrictie vertaald naar positionering, informatiehiërarchie, keuzehulp en een responsive systeem. Het resultaat claimt geen verzonnen conversiewinst; het maakt precies zichtbaar welke aannames met echte reizigers getoetst moeten worden.")}</p></div>
      </section>

      <footer className="tc-footer">
        <p>{tx("Volgende case / Concept Solution")}</p>
        <a href={localeHref("/cases/ayn-al-hikmah", locale)}><span>Ayn Al-Hikmah</span><ArrowUpRight aria-hidden="true" /></a>
        <div><span>Abdelrahman / Product &amp; UX/UI designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
