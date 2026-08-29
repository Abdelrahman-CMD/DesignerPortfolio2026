"use client";

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef } from "react";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import CalendarRange from "lucide-react/icons/calendar-range";
import CircleCheckBig from "lucide-react/icons/circle-check-big";
import Compass from "lucide-react/icons/compass";
import HeartHandshake from "lucide-react/icons/heart-handshake";
import Search from "lucide-react/icons/search";
import ShieldCheck from "lucide-react/icons/shield-check";
import UsersRound from "lucide-react/icons/users-round";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaseStyleGuide, type CaseStyleGuideData } from "./CaseStyleGuide";

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
    number: "01", eyebrow: "De bevinding",
    title: "De spirituele reis voelde persoonlijk. Het boeken ervan niet.",
    body: "Veel Hajj- en Umrahwebsites presenteerden pakketten als losse prijzen en lange lijsten. De begeleiding die de reis waardevol maakt bleef onzichtbaar, terwijl juist vóór vertrek behoefte ontstaat aan overzicht, vertrouwen en een menselijk aanspreekpunt.",
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

export function GuidanceTravelExperience() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro.from(".tc-nav", { opacity: 0, y: -18, duration: 0.55 })
        .from(".tc-hero-kicker", { opacity: 0, y: 16, duration: 0.45 }, "+=0.08")
        .from(".tc-title-line > span", { yPercent: 112, duration: 0.85, stagger: 0.08 }, "-=0.12")
        .from(".tc-hero-summary, .tc-hero-meta", { opacity: 0, y: 24, duration: 0.6, stagger: 0.08 }, "-=0.42")
        .from(".tc-hero-media", { opacity: 0, xPercent: 16, scale: 0.97, duration: 1.15 }, "-=0.42");

      gsap.to(".tc-hero-media img", { yPercent: -7, ease: "none", scrollTrigger: { trigger: ".tc-hero", start: "top top", end: "bottom top", scrub: true } });

      const cardElements = gsap.utils.toArray<HTMLElement>(".tc-card");
      const shells = gsap.utils.toArray<HTMLElement>(".tc-card-shell");
      cardElements.forEach((card, index) => {
        const shell = shells[index];
        const nextShell = shells[index + 1];
        gsap.from(card.querySelectorAll(".tc-mask > span"), { yPercent: 115, duration: 0.9, stagger: 0.07, ease: "power4.out", scrollTrigger: { trigger: shell, start: "top 72%", toggleActions: "play none none reverse" } });
        const media = card.querySelector(".tc-card-media");
        if (media) gsap.from(media, { opacity: 0, y: 42, scale: 0.985, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: shell, start: "top 70%", toggleActions: "play none none reverse" } });
        if (nextShell) {
          gsap.to(card, { scale: 0.985, filter: "brightness(0.95)", ease: "none", scrollTrigger: { trigger: nextShell, start: "top bottom", end: "top 10%", scrub: true, invalidateOnRefresh: true } });
          const dim = card.querySelector(".tc-card-dim");
          if (dim) gsap.to(dim, { opacity: 0.025, ease: "none", scrollTrigger: { trigger: nextShell, start: "top bottom", end: "top 10%", scrub: true, invalidateOnRefresh: true } });
        }
      });
      gsap.utils.toArray<HTMLElement>(".tc-proof-frame").forEach((frame, index) => gsap.from(frame, { opacity: 0, y: 38, rotate: index % 2 === 0 ? -0.6 : 0.6, duration: 0.75, ease: "power3.out", scrollTrigger: { trigger: frame, start: "top 88%" } }));
    }, root);
    return () => context.revert();
  }, []);

  return (
    <main ref={root} className="tc-page tc-page-guidance">
      <a className="skip-link" href="#guidance-content">Ga naar de case</a>
      <nav className="tc-nav" aria-label="Case navigatie">
        <a href="/#werk"><ArrowLeft aria-hidden="true" /> Alle cases</a>
        <a className="tc-nav-brand" href="/">Abdelrahman / Digital designer</a>
        <span>03 / 07</span>
      </nav>

      <header className="tc-hero">
        <div className="tc-hero-copy">
          <p className="tc-hero-kicker">Case 03 · Concept Solution</p>
          <h1>
            <span className="tc-title-line"><span>Guidance Travel</span></span>
            <span className="tc-title-line tc-title-small"><span>De reis vroeg overgave.</span></span>
            <span className="tc-title-line tc-title-small"><span>Het boeken vooral overzicht.</span></span>
          </h1>
          <p className="tc-hero-summary">Ik zag een markt waarin persoonlijke begeleiding digitaal vaak eindigde als een ondoorzichtige pakketlijst. Guidance Travel vertaalt die zorg naar een rustige route van intentie naar een passende reis.</p>
          <dl className="tc-hero-meta">
            <div><dt>Vertrekpunt</dt><dd>Marktobservatie Hajj &amp; Umrah</dd></div>
            <div><dt>Mijn rol</dt><dd>Strategy · UX/UI · Direction</dd></div>
            <div><dt>Status</dt><dd>Toetsbaar serviceconcept</dd></div>
          </dl>
        </div>
        <figure className="tc-hero-media">
          <Image src="/projects/guidance-2026/hero-laptops.webp" alt="Guidance Travel websiteconcept op een laptop" fill priority sizes="(max-width: 760px) 100vw, 58vw" />
          <figcaption>Responsive service concept / Hajj &amp; Umrah</figcaption>
        </figure>
      </header>

      <section className="tc-premise" id="guidance-content" aria-labelledby="guidance-premise-title">
        <p>Zekerheid vóór pakketkeuze</p>
        <h2 id="guidance-premise-title">Ik begon niet met meer verkoopdruk. Ik begon met de vragen die een pelgrim wakker houden vóór vertrek.</h2>
        <div className="tc-premise-notes">
          <span><Search aria-hidden="true" /> Versnipperde pakketinformatie</span>
          <span><HeartHandshake aria-hidden="true" /> Begeleiding bleef onzichtbaar</span>
          <span><ShieldCheck aria-hidden="true" /> Te weinig besliszekerheid</span>
        </div>
      </section>

      <section className="tc-deck" aria-label="Guidance Travel oplossingsverhaal in zes kaarten">
        {cards.map((card, index) => (
          <article className={`tc-card-shell tc-tone-${card.tone}`} id={`chapter-${card.number}`} key={card.number} style={{ "--tc-index": index + 1 } as CSSProperties}>
            <div className="tc-card">
              <span className="tc-card-dim" aria-hidden="true" />
              <div className="tc-card-copy">
                <div className="tc-card-index"><span>{card.number}</span><span>06</span></div>
                <p className="tc-mask tc-card-eyebrow"><span>{card.eyebrow}</span></p>
                <h2 className="tc-mask"><span>{card.title}</span></h2>
                <p className="tc-mask tc-card-body"><span>{card.body}</span></p>
                <p className="tc-mask tc-card-note"><span>{card.note}</span></p>
                {index === 2 && <div className="tc-feature-row"><span><CalendarRange aria-hidden="true" /> Periode &amp; intentie</span><span><UsersRound aria-hidden="true" /> Reisgezelschap</span><span><Compass aria-hidden="true" /> Passend pakket</span></div>}
                {index === 3 && <div className="tc-feature-row"><span><HeartHandshake aria-hidden="true" /> Menselijke gidsen</span><span><CircleCheckBig aria-hidden="true" /> Heldere inclusies</span><span><ShieldCheck aria-hidden="true" /> Vragen in context</span></div>}
                {index === 4 && <p className="tc-system-caption">Neue Haas Unica Pro zet de richting. Work Sans houdt informatie scanbaar.</p>}
                {index === 5 && <ul className="tc-validation-list"><li>Welke informatie verlaagt twijfel aantoonbaar?</li><li>Versterken zichtbare gidsen het vertrouwen?</li><li>Komt iemand sneller bij een passend pakket?</li></ul>}
              </div>
              <figure className={`tc-card-media${"styleGuide" in card ? " tc-style-card-media" : ""}`}>
                {"styleGuide" in card ? <CaseStyleGuide data={styleGuide} /> : <Image src={card.image} alt={card.imageAlt} fill sizes="(max-width: 760px) 92vw, 54vw" />}
              </figure>
            </div>
          </article>
        ))}
      </section>

      <section className="tc-proof" aria-labelledby="guidance-proof-title">
        <header className="tc-proof-heading">
          <p>Responsive bewijs / compact beoordeelbaar</p>
          <h2 id="guidance-proof-title">Eén reislogica.<br />Drie formaten.<br /><em>Negen echte schermen.</em></h2>
          <p>Landing, pakketkeuze en vertrouwen zijn niet als losse pagina’s ontworpen, maar als één doorlopende beslisroute op desktop, tablet en mobiel.</p>
        </header>
        <div className="tc-proof-grid">
          {proofFrames.map((frame) => <figure className="tc-proof-frame" key={frame.label}><div className="tc-proof-media"><Image src={frame.src} alt={`${frame.label} van Guidance Travel`} fill sizes="(max-width: 760px) 86vw, 29vw" /></div><figcaption>{frame.label}</figcaption></figure>)}
        </div>
      </section>

      <section className="tc-contribution">
        <p>Mijn bijdrage</p>
        <div><h2>Van een markt vol pakketten naar een dienst die al vóór vertrek vertrouwen begint op te bouwen.</h2><p>Ik heb de marktfrictie vertaald naar positionering, informatiehiërarchie, keuzehulp en een responsive systeem. Het resultaat claimt geen verzonnen conversiewinst; het maakt precies zichtbaar welke aannames met echte reizigers getoetst moeten worden.</p></div>
      </section>

      <footer className="tc-footer">
        <p>Volgende case / Concept Solution</p>
        <a href="/cases/bayn-signal"><span>Bayn Signal</span><ArrowUpRight aria-hidden="true" /></a>
        <div><span>Abdelrahman / Senior digital designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
