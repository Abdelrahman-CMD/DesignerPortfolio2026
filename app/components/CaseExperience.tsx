"use client";

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef } from "react";
import Accessibility from "lucide-react/icons/accessibility";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import MapPinned from "lucide-react/icons/map-pinned";
import Search from "lucide-react/icons/search";
import ShieldCheck from "lucide-react/icons/shield-check";
import UsersRound from "lucide-react/icons/users-round";
import WifiOff from "lucide-react/icons/wifi-off";
import { LanguageSwitcher, Locale, localeHref, translateText } from "../i18n";
import { CaseDeepDive } from "./CaseDeepDive";
import { CaseResearchEvidence } from "./CaseResearchEvidence";
import { CaseStyleGuide, type CaseStyleGuideData } from "./CaseStyleGuide";
import { initCaseMotion } from "./caseScrollStory";

const tareeqiStyleGuide: CaseStyleGuideData = {
  project: "Tareeqi",
  logo: "/projects/tareeqi-2026/logo.webp",
  logoAlt: "Tareeqi logo",
  displayFont: "Canela Text",
  displayUse: "Headlines / verhalen",
  interfaceFont: "Inter + Work Sans",
  interfaceUse: "Interface / navigatie",
  variant: "tareeqi",
  colors: [
    { name: "Light cream", value: "#F9F6F0", ink: "#2D2A26" },
    { name: "Dark nude", value: "#EEF3ED", ink: "#2D2A26" },
    { name: "Brown", value: "#5D3A20", ink: "#FFF9EE" },
    { name: "Dark chocolate", value: "#2D2A26", ink: "#FFF9EE" },
  ],
};

const cards = [
  {
    number: "01",
    eyebrow: "De kwalitatieve richting",
    title: "De route is vindbaar. De betekenis ernaast veel minder.",
    body: "In terugkerende verhalen van meerdere pelgrims kwam hetzelfde patroon naar voren: kaarten vinden locaties, maar rustige plekken, lokale boekwinkels en praktische familiekennis blijven verspreid over mensen, posts en toevallige tips.",
    note: "Dat is geen gebrek aan plekken. Het is een gebrek aan context.",
    image: "/projects/tareeqi-2026/phones.webp",
    imageAlt: "Tareeqi op twee smartphones met de kaart en het verhaal achter het concept",
    tone: "cream",
  },
  {
    number: "02",
    eyebrow: "De marktkans",
    title: "Een discovery-laag tussen de generieke kaart en lokale kennis.",
    body: "Het gat zit tussen ‘waar is iets?’ en ‘waarom past deze plek bij mij, vandaag?’. Tareeqi ordent lokale aanwijzingen op intentie, gezelschap en tempo. Precies die context kent een gewone kaart niet.",
    note: "Niet nóg een reisgids. Een contextuele routegenoot.",
    image: "/projects/tareeqi-2026/laptop-detail.webp",
    imageAlt: "Tareeqi interactieve kaart in een laptopmockup",
    tone: "sand",
  },
  {
    number: "03",
    eyebrow: "De oplossingsrichting",
    title: "Van zoeken naar gericht ontdekken.",
    body: "De interactieve kaart combineert lokale favorieten met filters als rustig, kindvriendelijk en verborgen parel. Een gebruiker start niet bij een lange lijst, maar bij de ervaring die op dat moment nodig is.",
    note: "Minder opties tegelijk. Meer relevantie per keuze.",
    image: "/projects/tareeqi-2026/tablets.webp",
    imageAlt: "Tareeqi tabletinterfaces met lokale plekken, filters en categorieën",
    tone: "sage",
  },
  {
    number: "04",
    eyebrow: "Vertrouwen vóór verrassing",
    title: "Vrij ontdekken vraagt om verantwoord ontwerpen.",
    body: "Offline routes, leesbare informatie, familie- en oudervriendelijke filters en een duidelijke herkomst van tips maken ontdekking bruikbaar in drukte. De community voegt kennis toe; het systeem moet die kennis controleerbaar houden.",
    note: "Inclusie is hier geen extra filter, maar productlogica.",
    image: "/projects/tareeqi-2026/map-desktop.webp",
    imageAlt: "Volledige desktopweergave van de Tareeqi interactieve kaart",
    tone: "chocolate",
  },
  {
    number: "05",
    eyebrow: "Het ontwerpsysteem",
    title: "Culturele warmte, zonder visuele ruis.",
    body: "Een redactionele serif geeft verhalen gewicht. De interface blijft bewust sober met Inter en Work Sans, ruime kaders en een crème basis. Bruin verankert vertrouwen; groen markeert ontdekking en voortgang.",
    note: "De plek mag spreken. De interface hoeft niet te roepen.",
    image: "/projects/tareeqi-2026/story-desktop.webp",
    imageAlt: "Tareeqi verhaalpagina met editorial typografie en projectcontext",
    tone: "ink",
    styleGuide: true,
  },
  {
    number: "06",
    eyebrow: "Wat nog bewezen moet worden",
    title: "Een sterk concept is een toetsbare hypothese, geen verzonnen succesverhaal.",
    body: "Tareeqi is een zelf geïnitieerde oplossingsrichting, geen gelanceerd product. De volgende stap is toetsen of lokale curatie sneller tot passende plekken leidt, offline zekerheid stress verlaagt en communitybijdragen betrouwbaar te beheren zijn.",
    note: "Het ontwerp maakt de kans zichtbaar. Onderzoek moet de waarde bewijzen.",
    image: "/projects/tareeqi-2026/hero-laptops.webp",
    imageAlt: "Twee Tareeqi desktopmockups als samenhangend productconcept",
    tone: "green",
  },
] as const;

const proofFrames = [
  { label: "Landing / desktop v1", src: "/projects/tareeqi-2026/landing-desktop-v1.webp" },
  { label: "Landing / desktop v2", src: "/projects/tareeqi-2026/landing-desktop.webp" },
  { label: "Discovery map / desktop", src: "/projects/tareeqi-2026/map-desktop.webp" },
  { label: "Story / desktop", src: "/projects/tareeqi-2026/story-desktop.webp" },
  { label: "Landing / tablet", src: "/projects/tareeqi-2026/landing-tablet.webp" },
  { label: "Discovery map / tablet", src: "/projects/tareeqi-2026/map-tablet.webp" },
  { label: "Story / tablet", src: "/projects/tareeqi-2026/story-tablet.webp" },
  { label: "Landing / mobile", src: "/projects/tareeqi-2026/landing-mobile.webp" },
  { label: "Discovery map / mobile", src: "/projects/tareeqi-2026/map-mobile.webp" },
  { label: "Story / mobile", src: "/projects/tareeqi-2026/story-mobile.webp" },
] as const;

export function CaseExperience({ locale = "nl" }: { locale?: Locale }) {
  const root = useRef<HTMLElement>(null);
  const tx = (value: string) => translateText(locale, value);
  const localizedStyleGuide = {
    ...tareeqiStyleGuide,
    displayUse: tx(tareeqiStyleGuide.displayUse),
    interfaceUse: tx(tareeqiStyleGuide.interfaceUse),
  };

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    return initCaseMotion(element);
  }, []);

  return (
    <main ref={root} className="tc-page" data-motion-project="tareeqi">
      <a className="skip-link" href="#tareeqi-content">{tx("Ga naar de case")}</a>

      <nav className="tc-nav" aria-label={tx("Case navigatie")}>
        <a href={localeHref("/#werk", locale)}><ArrowLeft aria-hidden="true" /> {tx("Alle cases")}</a>
        <a className="tc-nav-brand" href={localeHref("/", locale)}>Abdelrahman / Product &amp; UX/UI designer</a>
        <div className="tc-nav-actions"><span>03 / 08</span><LanguageSwitcher locale={locale} path="/cases/tareeqi" /></div>
      </nav>

      <header className="tc-hero">
        <div className="tc-hero-copy">
          <p className="tc-hero-kicker">{locale === "en" ? "Case 03 · Qualitative concept" : "Case 03 · Kwalitatief concept"}</p>
          <h1>
            <span className="tc-title-line"><span>Tareeqi</span></span>
            <span className="tc-title-line tc-title-small"><span>{tx("De route was duidelijk.")}</span></span>
            <span className="tc-title-line tc-title-small"><span>{tx("Wat ernaast lag, niet.")}</span></span>
          </h1>
          <p className="tc-hero-summary">{locale === "en" ? "Recurring stories from pilgrims exposed a gap between generic navigation and the local knowledge that gives a journey meaning. Tareeqi turns that qualitative direction into a testable discovery concept." : "Terugkerende verhalen van pelgrims legden een gat bloot tussen generieke navigatie en de lokale kennis die een reis betekenis geeft. Tareeqi vertaalt die kwalitatieve richting naar een toetsbaar discoveryconcept."}</p>
          <dl className="tc-hero-meta">
            <div><dt>{tx("Vertrekpunt")}</dt><dd>{locale === "en" ? "Recurring stories · proto-personas" : "Terugkerende verhalen · proto-persona’s"}</dd></div>
            <div><dt>{tx("Mijn rol")}</dt><dd>Research · Strategy · UX/UI</dd></div>
            <div><dt>{tx("Status")}</dt><dd>{tx("Toetsbare oplossingsrichting")}</dd></div>
          </dl>
        </div>
        <figure className="tc-hero-media" style={{ viewTransitionName: "case-hero" } as CSSProperties}>
          <Image
            src="/projects/tareeqi-2026/hero-laptops.webp"
            alt={tx("Tareeqi websiteconcept op twee laptops")}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 58vw"
          />
          <figcaption>Responsive concept / Mecca &amp; Medina</figcaption>
        </figure>
      </header>

      <section className="tc-snapshot" id="tareeqi-content" aria-labelledby="tc-snapshot-title">
        <header><p>{tx("De case in 30 seconden")}</p><h2 id="tc-snapshot-title">{tx("Probleem. Oplossing. Volgende stap.")}</h2></header>
        <div className="tc-snapshot-grid">
          <article><span>{tx("Probleem")}</span><p>{tx(cards[0].note)}</p></article>
          <article><span>{tx("Oplossing")}</span><p>{tx(cards[2].note)}</p></article>
          <article><span>{tx("Status / volgende stap")}</span><p>{tx(cards[5].note)}</p></article>
        </div>
      </section>

      <CaseResearchEvidence variant="tareeqi" locale={locale} />

      <section className="tc-deck" aria-label={tx("Tareeqi oplossingsverhaal in drie beslissingen")}>
        {cards.slice(0, 3).map((card, index) => (
          <article
            className={`tc-card-shell tc-tone-${card.tone}`}
            id={`chapter-${card.number}`}
            key={card.number}
            style={{ "--tc-index": index + 1 } as CSSProperties}
          >
            <div className="tc-card">
              <span className="tc-card-dim" aria-hidden="true" />
              <div className="tc-card-copy">
                <div className="tc-card-index"><span>{card.number}</span><span>03</span></div>
                <p className="tc-mask tc-card-eyebrow"><span>{tx(card.eyebrow)}</span></p>
                <h2 className="tc-mask"><span>{tx(card.title)}</span></h2>
                <p className="tc-mask tc-card-body"><span>{tx(card.body)}</span></p>
                <p className="tc-mask tc-card-note"><span>{tx(card.note)}</span></p>
                {index === 2 && (
                  <div className="tc-feature-row" aria-label={tx("Ontdekkingsfuncties")}>
                    <span><MapPinned aria-hidden="true" /> {tx("Contextuele kaart")}</span>
                    <span><Search aria-hidden="true" /> {tx("Intentiefilters")}</span>
                    <span><UsersRound aria-hidden="true" /> {tx("Lokale curatie")}</span>
                  </div>
                )}
                {index === 3 && (
                  <div className="tc-feature-row" aria-label={tx("Toegankelijkheidsfuncties")}>
                    <span><WifiOff aria-hidden="true" /> Offline</span>
                    <span><Accessibility aria-hidden="true" /> {tx("Familie & ouderen")}</span>
                    <span><ShieldCheck aria-hidden="true" /> {tx("Herkomst zichtbaar")}</span>
                  </div>
                )}
                {index === 4 && (
                  <p className="tc-system-caption">{tx("Canela draagt het verhaal. Inter en Work Sans houden de bediening stil en precies.")}</p>
                )}
                {index === 5 && (
                  <ul className="tc-validation-list">
                    <li>{tx("Past de route echt beter bij het moment?")}</li>
                    <li>{tx("Verlaagt offline zekerheid de mentale belasting?")}</li>
                    <li>{tx("Blijft communitykennis betrouwbaar en actueel?")}</li>
                  </ul>
                )}
              </div>
              <figure className={`tc-card-media${"styleGuide" in card ? " tc-style-card-media" : ""}`}>
                {"styleGuide" in card ? (
                  <CaseStyleGuide data={localizedStyleGuide} />
                ) : (
                  <Image src={card.image} alt={tx(card.imageAlt)} fill sizes="(max-width: 760px) 92vw, 54vw" />
                )}
              </figure>
            </div>
          </article>
        ))}
      </section>

      <CaseDeepDive items={cards.slice(3).map((card) => ({ ...card, eyebrow: tx(card.eyebrow), title: tx(card.title), body: tx(card.body), note: tx(card.note) }))} locale={locale} />

      <section className="tc-proof" aria-labelledby="tc-proof-title">
        <header className="tc-proof-heading">
          <p>{tx("Geselecteerde schermen / snel te beoordelen")}</p>
          <h2 id="tc-proof-title">{tx("Eén systeem.")}<br />{tx("Drie formaten.")}<br /><em>{tx("Vier kernschermen.")}</em></h2>
          <p>{tx("Vier representatieve schermen tonen de belangrijkste ervaring. De volledige exports blijven op verzoek beschikbaar.")}</p>
        </header>
        <div className="tc-proof-grid">
          {proofFrames.slice(0, 4).map((frame, index) => (
            <figure className="tc-proof-frame" key={frame.label}>
              <div className="tc-proof-media">
                <Image
                  src={frame.src}
                  alt={locale === "en" ? `Responsive Tareeqi interface ${index + 1}` : `${frame.label} van Tareeqi`}
                  fill
                  sizes="(max-width: 760px) 86vw, 29vw"
                />
              </div>
              <figcaption>{tx(frame.label)}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="tc-contribution">
        <p>{tx("Mijn bijdrage")}</p>
        <div>
          <h2>{tx("Niet aantonen dat ik een interface kan maken. Aantonen dat ik een onbenutte vraag kan vinden en vertalen naar een toetsbaar systeem.")}</h2>
          <p>{tx("De waarde van Tareeqi zit voor mij in de verbinding tussen observatie, positionering en uitvoering. Ik heb de kans afgebakend, de kernfuncties geprioriteerd, het responsive systeem ontworpen en zichtbaar gemaakt welke aannames nog validatie nodig hebben.")}</p>
        </div>
      </section>

      <footer className="tc-footer">
        <p>{tx("Volgende case / Concept Solution")}</p>
        <a href={localeHref("/cases/hijaman-cups", locale)}><span>Hijama&apos;N Cups</span><ArrowUpRight aria-hidden="true" /></a>
        <div><span>Abdelrahman / Product &amp; UX/UI designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
