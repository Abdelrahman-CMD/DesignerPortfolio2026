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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LanguageSwitcher, Locale, localeHref, translateText } from "../i18n";
import { CaseStyleGuide, type CaseStyleGuideData } from "./CaseStyleGuide";

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
    eyebrow: "De observatie",
    title: "Verhuizen is één beslissing. Aankomen zijn er duizend.",
    body: "Wie zich in Saudi-Arabië vestigt, zoekt dagelijks antwoorden over visa, verkeer, gezondheidszorg, wonen en lokaal gedrag. Algemene nieuwsfeeds zijn vaak te breed of missen de context die bepaalt wat iemand vandaag werkelijk moet doen.",
    note: "Het probleem was niet te weinig nieuws. Het was te weinig lokale betekenis op het juiste moment.",
    image: "/projects/bayn-2026/laptop-home.webp",
    imageAlt: "Bayn Signal landingspagina in een laptopmockup",
    tone: "bayn-beige",
  },
  {
    number: "02",
    eyebrow: "De marktkans",
    title: "Nieuws vertelt wat er gebeurt. Een signaal vertelt wat dat voor jou verandert.",
    body: "Ik zag ruimte tussen formele berichtgeving en losse communitytips. Bayn Signal brengt snelheid, bronvermelding en ervaringskennis samen, zodat informatie eerder bruikbaar wordt voor expats, migranten en bewoners.",
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
    note: "De visuele stem voelt lokaal en behulpzaam — niet journalistiek afstandelijk of sociaal-medialuid.",
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
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".tc-nav", { opacity: 0, y: -18, duration: 0.55 })
        .from(".tc-hero-kicker", { opacity: 0, y: 16, duration: 0.45 }, "+=0.08")
        .from(".tc-title-line > span", { yPercent: 112, duration: 0.85, stagger: 0.08 }, "-=0.12")
        .from(".tc-hero-summary, .tc-hero-meta", { opacity: 0, y: 24, duration: 0.6, stagger: 0.08 }, "-=0.42")
        .from(".tc-hero-media", { opacity: 0, xPercent: 16, scale: 0.97, duration: 1.15 }, "-=0.42");

      gsap.to(".tc-hero-media img", {
        yPercent: -7,
        ease: "none",
        scrollTrigger: { trigger: ".tc-hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.from(".tc-premise h2, .tc-premise-notes", {
        opacity: 0,
        y: 44,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tc-premise", start: "top 64%" },
      });

      const cardElements = gsap.utils.toArray<HTMLElement>(".tc-card");
      const shells = gsap.utils.toArray<HTMLElement>(".tc-card-shell");
      cardElements.forEach((card, index) => {
        const shell = shells[index];
        const nextShell = shells[index + 1];
        gsap.from(card.querySelectorAll(".tc-mask > span"), {
          yPercent: 115,
          duration: 0.9,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: { trigger: shell, start: "top 72%", toggleActions: "play none none reverse" },
        });
        const media = card.querySelector(".tc-card-media");
        if (media) {
          gsap.from(media, {
            opacity: 0,
            y: 42,
            scale: 0.985,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: shell, start: "top 70%", toggleActions: "play none none reverse" },
          });
        }
        if (nextShell) {
          gsap.to(card, {
            scale: 0.985,
            filter: "brightness(0.95)",
            ease: "none",
            scrollTrigger: { trigger: nextShell, start: "top bottom", end: "top 10%", scrub: true, invalidateOnRefresh: true },
          });
          const dim = card.querySelector(".tc-card-dim");
          if (dim) {
            gsap.to(dim, {
              opacity: 0.025,
              ease: "none",
              scrollTrigger: { trigger: nextShell, start: "top bottom", end: "top 10%", scrub: true, invalidateOnRefresh: true },
            });
          }
        }
      });

      gsap.utils.toArray<HTMLElement>(".tc-proof-frame").forEach((frame, index) => {
        gsap.from(frame, {
          opacity: 0,
          y: 38,
          rotate: index % 2 === 0 ? -0.6 : 0.6,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: frame, start: "top 88%" },
        });
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <main ref={root} className="tc-page tc-page-bayn">
      <a className="skip-link" href="#bayn-content">{tx("Ga naar de case")}</a>
      <nav className="tc-nav" aria-label={tx("Case navigatie")}>
        <a href={localeHref("/#werk", locale)}><ArrowLeft aria-hidden="true" /> {tx("Alle cases")}</a>
        <a className="tc-nav-brand" href={localeHref("/", locale)}>Abdelrahman / Product &amp; UX/UI designer</a>
        <div className="tc-nav-actions"><span>05 / 08</span><LanguageSwitcher locale={locale} path="/cases/bayn-signal" /></div>
      </nav>

      <header className="tc-hero">
        <div className="tc-hero-copy">
          <p className="tc-hero-kicker">{tx("Case 05 · Zelf geïnitieerd concept")}</p>
          <h1>
            <span className="tc-title-line"><span>Bayn Signal</span></span>
            <span className="tc-title-line tc-title-small"><span>{tx("Zie verandering.")}</span></span>
            <span className="tc-title-line tc-title-small"><span>{tx("Voor je haar voelt.")}</span></span>
          </h1>
          <p className="tc-hero-summary">{tx("Een actueel kennisplatform voor expats, migranten en bewoners die niet méér nieuws nodig hebben, maar het juiste lokale signaal op het juiste moment.")}</p>
          <dl className="tc-hero-meta">
            <div><dt>{tx("Vertrekpunt")}</dt><dd>{tx("Een gat tussen nieuws en lokale actie")}</dd></div>
            <div><dt>{tx("Mijn rol")}</dt><dd>{tx("Strategie · Editorial UX · UI")}</dd></div>
            <div><dt>{tx("Status")}</dt><dd>{tx("Toetsbaar platformconcept")}</dd></div>
          </dl>
        </div>
        <figure className="tc-hero-media">
          <Image src="/projects/bayn-2026/hero-laptops.webp" alt={tx("Bayn Signal lokale pulse en artikeloverzicht op twee laptops")} fill priority sizes="(max-width: 760px) 100vw, 58vw" />
          <figcaption>Local intelligence / responsive concept</figcaption>
        </figure>
      </header>

      <section className="tc-premise" id="bayn-content" aria-labelledby="bayn-premise-title">
        <p>{tx("De lokale informatiekloof")}</p>
        <h2 id="bayn-premise-title">{tx("Ik zag geen tekort aan informatie. Ik zag een tekort aan timing, lokale context en een geloofwaardige volgende stap.")}</h2>
        <div className="tc-premise-notes">
          <span><Search aria-hidden="true" /> {tx("Snel scanbaar")}</span>
          <span><RadioTower aria-hidden="true" /> {tx("Tijdig en relevant")}</span>
          <span><UsersRound aria-hidden="true" /> {tx("Gedragen door context")}</span>
        </div>
      </section>

      <section className="tc-deck" aria-label={tx("Bayn Signal oplossingsverhaal in zes kaarten")}>
        {cards.map((card, index) => (
          <article className={`tc-card-shell tc-tone-${card.tone}`} id={`chapter-${card.number}`} key={card.number} style={{ "--tc-index": index + 1 } as CSSProperties}>
            <div className="tc-card">
              <span className="tc-card-dim" aria-hidden="true" />
              <div className="tc-card-copy">
                <div className="tc-card-index"><span>{card.number}</span><span>06</span></div>
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

      <section className="tc-proof" aria-labelledby="bayn-proof-title">
        <header className="tc-proof-heading">
          <p>{tx("De kernflows / responsive uitgewerkt")}</p>
          <h2 id="bayn-proof-title">{tx("Van signaleren.")}<br />{tx("Naar begrijpen.")}<br /><em>{tx("Naar handelen.")}</em></h2>
          <p>{tx("De landing, bibliotheek en artikelervaring bouwen dezelfde informatielogica op ieder formaat: eerst relevantie herkennen, daarna de lokale context begrijpen en tenslotte weten wat je kunt doen.")}</p>
        </header>
        <div className="tc-proof-grid">
          {proofFrames.map((frame, index) => (
            <figure className="tc-proof-frame" key={frame.label}>
              <div className="tc-proof-media"><Image src={frame.src} alt={locale === "en" ? `Responsive Bayn Signal interface ${index + 1}` : `${frame.label} van Bayn Signal`} fill sizes="(max-width: 760px) 86vw, 18vw" /></div>
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
        <a href={localeHref("/cases/hijaman-cups", locale)}><span>Hijama&apos;N Cups</span><ArrowUpRight aria-hidden="true" /></a>
        <div><span>Abdelrahman / Product &amp; UX/UI designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
