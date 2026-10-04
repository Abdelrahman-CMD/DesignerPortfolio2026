"use client";

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef } from "react";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import CircleCheckBig from "lucide-react/icons/circle-check-big";
import Compass from "lucide-react/icons/compass";
import RadioTower from "lucide-react/icons/radio-tower";
import Search from "lucide-react/icons/search";
import ShieldCheck from "lucide-react/icons/shield-check";
import UsersRound from "lucide-react/icons/users-round";
import { LanguageSwitcher, Locale, localeHref, translateText } from "../i18n";
import { CaseDeepDive } from "./CaseDeepDive";
import { CaseResearchEvidence } from "./CaseResearchEvidence";
import { CaseStyleGuide, type CaseStyleGuideData } from "./CaseStyleGuide";
import { initCaseMotion } from "./caseScrollStory";

import { CaseNavMotion } from "./CaseNavMotion";
const styleGuide: CaseStyleGuideData = {
  project: "Bayn Signal",
  logo: "/projects/bayn-2026/logo.webp",
  logoAlt: "Bayn Signal logo",
  displayFont: "Inter",
  displayUse: "Headlines / signalen",
  interfaceFont: "Sana",
  interfaceUse: "Body / context / helderheid",
  variant: "bayn",
  colors: [
    { name: "Deep green", value: "#13433A", ink: "#EAF0E9" },
    { name: "Signal green", value: "#77AE98", ink: "#13433A" },
    { name: "Light sage", value: "#EAF0E9", ink: "#13433A" },
    { name: "Warm beige", value: "#F5F1E8", ink: "#13433A" },
  ],
};

const cards = [
  {
    number: "01",
    eyebrow: "De starthypothese",
    title: "Verhuizen is één beslissing. Aankomen zijn er duizend.",
    body: "De case start met de hypothese dat nieuwe bewoners dagelijks antwoorden zoeken over visa, verkeer, gezondheidszorg, wonen en lokaal gedrag, terwijl algemene nieuwsfeeds te breed zijn of de context voor een concrete beslissing missen.",
    note: "De aanname: niet meer nieuws, maar lokale betekenis op het juiste moment.",
    image: "/projects/bayn-2026/laptop-home.webp",
    imageAlt: "Bayn Signal landingspagina in een laptopmockup",
    tone: "bayn-beige",
  },
  {
    number: "02",
    eyebrow: "De producthypothese",
    title: "Nieuws vertelt wat er gebeurt. Een signaal vertelt wat dat voor jou verandert.",
    body: "Bayn Signal onderzoekt de mogelijke ruimte tussen formele berichtgeving en losse communitytips. Het concept brengt snelheid, bronvermelding en ervaringskennis samen; onderzoek moet nog uitwijzen of dit informatie echt eerder bruikbaar maakt.",
    note: "Relevantie vóór volume: ieder signaal moet een concrete beslissing of vervolgstap verbeteren.",
    image: "/projects/bayn-2026/phones.webp",
    imageAlt: "Bayn Signal artikelen en lokale updates op twee smartphones",
    tone: "bayn-green",
  },
  {
    number: "03",
    eyebrow: "De oplossingsrichting",
    title: "Eén lokale pulse voor aankomen, regelen, bewegen, wonen en verbinden.",
    body: "De ervaring ordent artikelen, korte updates en community-inzichten rond levensmomenten in plaats van een eindeloze chronologische feed. Thema, locatie, tijdstip en urgentie maken vóór het openen al duidelijk waarom een bericht relevant is.",
    note: "De interface helpt eerst scannen, daarna begrijpen en pas dan verdiepen.",
    image: "/projects/bayn-2026/tablets.webp",
    imageAlt: "Bayn Signal artikeloverzicht en communitysignalen op twee tablets",
    tone: "bayn-sage",
  },
  {
    number: "04",
    eyebrow: "Productlogica",
    title: "Context moet dichter bij de claim staan dan de volgende klik.",
    body: "Ieder signaal toont bron, publicatiemoment, lokale reikwijdte en praktische impact. Verdiepende artikelen verbinden uitleg met vergelijkingen en ervaringen van bewoners, zodat snelheid niet ten koste gaat van betrouwbaarheid.",
    note: "Een rustig systeem maakt urgentie herkenbaar zonder van ieder bericht een alarm te maken.",
    image: "/projects/bayn-2026/article-desktop.webp",
    imageAlt: "Uitgebreide Bayn Signal artikelpagina met vergelijking en communitycontext",
    tone: "bayn-mint",
  },
  {
    number: "05",
    eyebrow: "Het visuele systeem",
    title: "Een kalme informatielaag met groen als teken van richting en vertrouwen.",
    body: "Deep Green verankert de identiteit en geeft acties voldoende contrast. Signal Green markeert actuele informatie; Light Sage en Warm Beige houden lange artikelen luchtig. De typografie blijft helder en compact, zodat inhoud altijd vóór decoratie komt.",
    note: "De visuele stem voelt lokaal en behulpzaam, niet journalistiek afstandelijk of sociaal-medialuid.",
    image: "",
    imageAlt: "Bayn Signal style guide",
    tone: "bayn-deep",
    styleGuide: true,
  },
  {
    number: "06",
    eyebrow: "Wat nog bewezen moet worden",
    title: "Het concept maakt relevantie scanbaar. Echte gebruikers moeten bewijzen welke signalen hun gedrag verbeteren.",
    body: "Bayn Signal is een zelf geïnitieerde ontwerpvisie, geen gelanceerd klantproduct. De volgende stap is toetsen welke bronnen vertrouwen wekken, of de categorieën snel genoeg worden begrepen en of een persoonlijke pulse mensen eerder tot een passende actie brengt.",
    note: "De schermen zijn de hypothese. Begrip, vertrouwen en bruikbare actie zijn de meetpunten.",
    image: "/projects/bayn-2026/hero-laptops.webp",
    imageAlt: "Bayn Signal eindconcept op twee laptops",
    tone: "bayn-green",
  },
] as const;

const proofFrames = [
  { label: "Lokale pulse / desktop", src: "/projects/bayn-2026/landing-desktop.webp" },
  { label: "Lokale pulse / tablet", src: "/projects/bayn-2026/landing-tablet.webp" },
  { label: "Lokale pulse / mobiel", src: "/projects/bayn-2026/landing-mobile.webp" },
  { label: "Alle signalen / desktop", src: "/projects/bayn-2026/articles-desktop.webp" },
  { label: "Verdieping / artikel", src: "/projects/bayn-2026/article-desktop.webp" },
] as const;

export function BaynSignalExperience({ locale = "nl" }: { locale?: Locale }) {
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
    <main ref={root} className="tc-page tc-page-bayn" data-motion-project="bayn-signal" data-case-motion="pending">
      <a className="skip-link" href="#bayn-content">{tx("Ga naar de case")}</a>
      <CaseNavMotion />
      <nav className="tc-nav" aria-label={tx("Case navigatie")}>
        <a href={localeHref("/#werk", locale)}><ArrowLeft aria-hidden="true" /> {tx("Alle cases")}</a>
        <a className="tc-nav-brand" href={localeHref("/", locale)}>Abdelrahman / Product &amp; UX/UI designer</a>
        <div className="tc-nav-actions"><span>05 / 08</span><LanguageSwitcher locale={locale} path="/cases/bayn-signal" /></div>
      </nav>

      <header className="tc-hero">
        <div className="tc-hero-copy">
          <p className="tc-hero-kicker">{locale === "en" ? "Case 05 · Hypothesis-led concept" : "Case 05 · Hypothesegedreven concept"}</p>
          <h1>
            <span className="tc-title-line"><span>Bayn Signal</span></span>
            <span className="tc-title-line tc-title-small"><span>{tx("Zie verandering.")}</span></span>
            <span className="tc-title-line tc-title-small"><span>{tx("Voor je haar voelt.")}</span></span>
          </h1>
          <p className="tc-hero-summary">{locale === "en" ? "A testable platform hypothesis for expats, migrants and residents who may not need more news, but the right local signal at the right moment." : "Een toetsbare platformhypothese voor expats, migranten en bewoners die mogelijk niet méér nieuws nodig hebben, maar het juiste lokale signaal op het juiste moment."}</p>
          <dl className="tc-hero-meta">
            <div><dt>{tx("Vertrekpunt")}</dt><dd>{locale === "en" ? "Self-initiated assumptions" : "Zelf geïnitieerde aannames"}</dd></div>
            <div><dt>{tx("Mijn rol")}</dt><dd>{tx("Strategie · Editorial UX · UI")}</dd></div>
            <div><dt>{tx("Status")}</dt><dd>{tx("Toetsbaar platformconcept")}</dd></div>
          </dl>
        </div>
        <figure className="tc-hero-media">
          <Image src="/projects/bayn-2026/hero-laptops.webp" alt={tx("Bayn Signal lokale pulse en artikeloverzicht op twee laptops")} fill priority sizes="(max-width: 760px) 100vw, 58vw" />
          <figcaption>Local intelligence / responsive concept</figcaption>
        </figure>
      </header>

      <section className="tc-snapshot" id="bayn-content" aria-labelledby="bayn-snapshot-title">
        <header><p>{tx("De case in 30 seconden")}</p><h2 id="bayn-snapshot-title">{tx("Probleem. Oplossing. Volgende stap.")}</h2></header>
        <div className="tc-snapshot-grid">
          <article><span>{tx("Probleem")}</span><p>{tx(cards[0].note)}</p></article>
          <article><span>{tx("Oplossing")}</span><p>{tx(cards[2].note)}</p></article>
          <article><span>{tx("Status / volgende stap")}</span><p>{tx(cards[5].note)}</p></article>
        </div>
      </section>

      <CaseResearchEvidence variant="bayn" locale={locale} />

      <section className="tc-deck" aria-label={tx("Bayn Signal oplossingsverhaal in drie beslissingen")}>
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
                {index === 2 && <div className="tc-feature-row"><span><Search aria-hidden="true" /> {tx("Scanbare pulse")}</span><span><RadioTower aria-hidden="true" /> {tx("Vroege signalen")}</span><span><UsersRound aria-hidden="true" /> {tx("Ervaringscontext")}</span></div>}
                {index === 3 && <div className="tc-feature-row"><span><ShieldCheck aria-hidden="true" /> {tx("Bron & tijdstip")}</span><span><Compass aria-hidden="true" /> {tx("Lokale relevantie")}</span><span><CircleCheckBig aria-hidden="true" /> {tx("Volgende stap")}</span></div>}
                {index === 4 && <p className="tc-system-caption">{tx("Inter houdt de signalen direct. Sana geeft uitleg en langere context voldoende ademruimte.")}</p>}
                {index === 5 && <ul className="tc-validation-list"><li>{tx("Herkennen gebruikers sneller welk bericht voor hen relevant is?")}</li><li>{tx("Begrijpen zij waarom een bron en lokaal perspectief betrouwbaar zijn?")}</li><li>{tx("Leidt de persoonlijke pulse eerder tot een passende actie?")}</li></ul>}
              </div>
              <figure className={`tc-card-media${"styleGuide" in card ? " tc-style-card-media" : ""}`}>
                {"styleGuide" in card ? <CaseStyleGuide data={localizedStyleGuide} /> : <Image src={card.image} alt={tx(card.imageAlt)} fill sizes="(max-width: 760px) 92vw, 54vw" />}
              </figure>
            </div>
          </article>
        ))}
      </section>

      <CaseDeepDive items={cards.slice(3).map((card) => ({ ...card, eyebrow: tx(card.eyebrow), title: tx(card.title), body: tx(card.body), note: tx(card.note) }))} locale={locale} />

      <section className="tc-proof" aria-labelledby="bayn-proof-title">
        <header className="tc-proof-heading">
          <p>{tx("De kernflows / responsive uitgewerkt")}</p>
          <h2 id="bayn-proof-title">{tx("Van signaleren.")}<br />{tx("Naar begrijpen.")}<br /><em>{tx("Naar handelen.")}</em></h2>
          <p>{tx("De landing, bibliotheek en artikelervaring bouwen dezelfde informatielogica op ieder formaat: eerst relevantie herkennen, daarna de lokale context begrijpen en tenslotte weten wat je kunt doen.")}</p>
        </header>
        <div className="tc-proof-grid">
          {proofFrames.slice(0, 4).map((frame, index) => (
            <figure className="tc-proof-frame" key={frame.label}>
              <div className="tc-proof-media"><Image src={frame.src} alt={locale === "en" ? `Responsive Bayn Signal interface ${index + 1}` : `${frame.label} van Bayn Signal`} fill sizes="(max-width: 760px) 86vw, 44vw" /></div>
              <figcaption>{tx(frame.label)}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="tc-contribution">
        <p>{tx("Mijn bijdrage")}</p>
        <div><h2>{tx("Van informatie-overload naar een lokale pulse die betekenis vóór volume plaatst.")}</h2><p>{tx("Ik vertaalde de nichekans naar positionering, contentarchitectuur, signaalhiërarchie en een responsive interfacesysteem. Omdat dit een conceptproject is, presenteer ik geen verzonnen impactcijfers; de case maakt juist zichtbaar welke aannames rond relevantie, vertrouwen en gedrag met echte gebruikers getoetst moeten worden.")}</p></div>
      </section>

      <footer className="tc-footer">
        <p>{tx("Volgende case / Klantproject")}</p>
        <a href={localeHref("/cases/atotz-detachering", locale)}><span>AtotZ Detachering</span><ArrowUpRight aria-hidden="true" /></a>
        <div><span>Abdelrahman / Product &amp; UX/UI designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
