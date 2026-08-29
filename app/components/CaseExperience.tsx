"use client";

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef } from "react";
import Accessibility from "lucide-react/icons/accessibility";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import Compass from "lucide-react/icons/compass";
import MapPinned from "lucide-react/icons/map-pinned";
import Search from "lucide-react/icons/search";
import ShieldCheck from "lucide-react/icons/shield-check";
import UsersRound from "lucide-react/icons/users-round";
import WifiOff from "lucide-react/icons/wifi-off";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaseStyleGuide, type CaseStyleGuideData } from "./CaseStyleGuide";

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
    eyebrow: "De bevinding",
    title: "De route is vindbaar. De betekenis ernaast veel minder.",
    body: "Wie digitaal zoekt rond Mekka en Medina, vindt vooral rituelen, highlights en generieke kaartresultaten. Rustige plekken, lokale boekwinkels en praktische familiekennis blijven versnipperd over mensen, posts en toevallige tips.",
    note: "Dat is geen gebrek aan plekken. Het is een gebrek aan context.",
    image: "/projects/tareeqi-2026/phones.webp",
    imageAlt: "Tareeqi op twee smartphones met de kaart en het verhaal achter het concept",
    tone: "cream",
  },
  {
    number: "02",
    eyebrow: "De marktkans",
    title: "Een discovery-laag tussen de generieke kaart en lokale kennis.",
    body: "Het gat zit tussen ‘waar is iets?’ en ‘waarom past deze plek bij mij, vandaag?’. Tareeqi ordent lokale aanwijzingen op intentie, gezelschap en tempo — precies de context die een gewone kaart niet kent.",
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

export function CaseExperience() {
  const root = useRef<HTMLElement>(null);

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

      const cardElements = gsap.utils.toArray<HTMLElement>(".tc-card");
      const shells = gsap.utils.toArray<HTMLElement>(".tc-card-shell");

      cardElements.forEach((card, index) => {
        const shell = shells[index];
        const nextShell = shells[index + 1];
        const revealLines = card.querySelectorAll(".tc-mask > span");
        const media = card.querySelector(".tc-card-media");

        gsap.from(revealLines, {
          yPercent: 115,
          duration: 0.9,
          stagger: 0.07,
          ease: "power4.out",
          scrollTrigger: { trigger: shell, start: "top 72%", toggleActions: "play none none reverse" },
        });

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
            scrollTrigger: {
              trigger: nextShell,
              start: "top bottom",
              end: "top 10%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
          const dim = card.querySelector(".tc-card-dim");
          if (dim) {
            gsap.to(dim, {
              opacity: 0.025,
              ease: "none",
              scrollTrigger: {
                trigger: nextShell,
                start: "top bottom",
                end: "top 10%",
                scrub: true,
                invalidateOnRefresh: true,
              },
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

      gsap.utils.toArray<HTMLVideoElement>(".tc-card video").forEach((video) => {
        ScrollTrigger.create({
          trigger: video.closest(".tc-card") ?? video,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => void video.play(),
          onEnterBack: () => void video.play(),
          onLeave: () => video.pause(),
          onLeaveBack: () => video.pause(),
        });
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <main ref={root} className="tc-page">
      <a className="skip-link" href="#tareeqi-content">Ga naar de case</a>

      <nav className="tc-nav" aria-label="Case navigatie">
        <a href="/#werk"><ArrowLeft aria-hidden="true" /> Alle cases</a>
        <a className="tc-nav-brand" href="/">Abdelrahman / Digital designer</a>
        <span>01 / 07</span>
      </nav>

      <header className="tc-hero">
        <div className="tc-hero-copy">
          <p className="tc-hero-kicker">Case 01 · Concept Solution</p>
          <h1>
            <span className="tc-title-line"><span>Tareeqi</span></span>
            <span className="tc-title-line tc-title-small"><span>De route was duidelijk.</span></span>
            <span className="tc-title-line tc-title-small"><span>Wat ernaast lag, niet.</span></span>
          </h1>
          <p className="tc-hero-summary">
            Ik zag een gat tussen generieke navigatie en de lokale kennis die een reis
            betekenis geeft. Tareeqi is mijn ontworpen antwoord: een contextuele
            discovery-laag voor Mekka en Medina.
          </p>
          <dl className="tc-hero-meta">
            <div><dt>Vertrekpunt</dt><dd>Zelf geïnitieerde bevinding</dd></div>
            <div><dt>Mijn rol</dt><dd>Research · Strategy · UX/UI</dd></div>
            <div><dt>Status</dt><dd>Toetsbare oplossingsrichting</dd></div>
          </dl>
        </div>
        <figure className="tc-hero-media">
          <Image
            src="/projects/tareeqi-2026/hero-laptops.webp"
            alt="Tareeqi websiteconcept op twee laptops"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 58vw"
          />
          <figcaption>Responsive concept / Mecca &amp; Medina</figcaption>
        </figure>
      </header>

      <section className="tc-premise" id="tareeqi-content" aria-labelledby="tc-premise-title">
        <p>Probleemvinding vóór productvorming</p>
        <h2 id="tc-premise-title">Ik begon niet met een scherm. Ik begon met wat de bestaande kaarten niet konden vertellen.</h2>
        <div className="tc-premise-notes">
          <span><Search aria-hidden="true" /> Generieke zoekresultaten</span>
          <span><UsersRound aria-hidden="true" /> Verspreide lokale kennis</span>
          <span><Compass aria-hidden="true" /> Geen route op intentie</span>
        </div>
      </section>

      <section className="tc-deck" aria-label="Tareeqi oplossingsverhaal in zes kaarten">
        {cards.map((card, index) => (
          <article
            className={`tc-card-shell tc-tone-${card.tone}`}
            id={`chapter-${card.number}`}
            key={card.number}
            style={{ "--tc-index": index + 1 } as CSSProperties}
          >
            <div className="tc-card">
              <span className="tc-card-dim" aria-hidden="true" />
              <div className="tc-card-copy">
                <div className="tc-card-index"><span>{card.number}</span><span>06</span></div>
                <p className="tc-mask tc-card-eyebrow"><span>{card.eyebrow}</span></p>
                <h2 className="tc-mask"><span>{card.title}</span></h2>
                <p className="tc-mask tc-card-body"><span>{card.body}</span></p>
                <p className="tc-mask tc-card-note"><span>{card.note}</span></p>
                {index === 2 && (
                  <div className="tc-feature-row" aria-label="Ontdekkingsfuncties">
                    <span><MapPinned aria-hidden="true" /> Contextuele kaart</span>
                    <span><Search aria-hidden="true" /> Intentiefilters</span>
                    <span><UsersRound aria-hidden="true" /> Lokale curatie</span>
                  </div>
                )}
                {index === 3 && (
                  <div className="tc-feature-row" aria-label="Toegankelijkheidsfuncties">
                    <span><WifiOff aria-hidden="true" /> Offline</span>
                    <span><Accessibility aria-hidden="true" /> Familie &amp; ouderen</span>
                    <span><ShieldCheck aria-hidden="true" /> Herkomst zichtbaar</span>
                  </div>
                )}
                {index === 4 && (
                  <p className="tc-system-caption">Canela draagt het verhaal. Inter en Work Sans houden de bediening stil en precies.</p>
                )}
                {index === 5 && (
                  <ul className="tc-validation-list">
                    <li>Past de route echt beter bij het moment?</li>
                    <li>Verlaagt offline zekerheid de mentale belasting?</li>
                    <li>Blijft communitykennis betrouwbaar en actueel?</li>
                  </ul>
                )}
              </div>
              <figure className={`tc-card-media${"styleGuide" in card ? " tc-style-card-media" : ""}`}>
                {"styleGuide" in card ? (
                  <CaseStyleGuide data={tareeqiStyleGuide} />
                ) : (
                  <Image src={card.image} alt={card.imageAlt} fill sizes="(max-width: 760px) 92vw, 54vw" />
                )}
              </figure>
            </div>
          </article>
        ))}
      </section>

      <section className="tc-proof" aria-labelledby="tc-proof-title">
        <header className="tc-proof-heading">
          <p>Responsive bewijs / geen eindeloze walkthrough</p>
          <h2 id="tc-proof-title">Eén systeem.<br />Drie formaten.<br /><em>Tien echte schermen.</em></h2>
          <p>De volledige exports blijven beschikbaar, maar worden hier als een compacte redactionele contact sheet getoond. Zo is de breedte van het concept snel te beoordelen.</p>
        </header>
        <div className="tc-proof-grid">
          {proofFrames.map((frame) => (
            <figure className="tc-proof-frame" key={frame.label}>
              <div className="tc-proof-media">
                <Image src={frame.src} alt={`${frame.label} van Tareeqi`} fill sizes="(max-width: 760px) 86vw, 29vw" />
              </div>
              <figcaption>{frame.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="tc-contribution">
        <p>Mijn bijdrage</p>
        <div>
          <h2>Niet aantonen dat ik een interface kan maken. Aantonen dat ik een onbenutte vraag kan vinden en vertalen naar een toetsbaar systeem.</h2>
          <p>De waarde van Tareeqi zit voor mij in de verbinding tussen observatie, positionering en uitvoering. Ik heb de kans afgebakend, de kernfuncties geprioriteerd, het responsive systeem ontworpen en zichtbaar gemaakt welke aannames nog validatie nodig hebben.</p>
        </div>
      </section>

      <footer className="tc-footer">
        <p>Volgende case / Concept Solution</p>
        <a href="/cases/ayn-al-hikmah"><span>Ayn Al-Hikmah</span><ArrowUpRight aria-hidden="true" /></a>
        <div><span>Abdelrahman / Senior digital designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
