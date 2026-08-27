"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation keeps the case independent from the client router. */

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef } from "react";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import BookOpenText from "lucide-react/icons/book-open-text";
import Languages from "lucide-react/icons/languages";
import RadioTower from "lucide-react/icons/radio-tower";
import Route from "lucide-react/icons/route";
import ShieldCheck from "lucide-react/icons/shield-check";
import Sparkles from "lucide-react/icons/sparkles";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaseStyleGuide, type CaseStyleGuideData } from "./CaseStyleGuide";

const styleGuide: CaseStyleGuideData = {
  project: "Ayn Al-Hikmah",
  logo: "/projects/ayn-2026/logo.webp",
  logoAlt: "Ayn Al-Hikmah logo",
  displayFont: "Tajawal",
  displayUse: "Headlines / richting",
  interfaceFont: "Lora",
  interfaceUse: "Body / lezen / rust",
  variant: "ayn",
  colors: [
    { name: "Bordeaux", value: "#401818", ink: "#FFF3E9" },
    { name: "Mango", value: "#FED496", ink: "#401818" },
    { name: "Cream", value: "#FFEED5", ink: "#401818" },
    { name: "Warm beige", value: "#FFF3E9", ink: "#401818" },
  ],
};

const cards = [
  {
    number: "01",
    eyebrow: "De observatie",
    title: "De kennisreis eindigt niet bij vertrek. De omgeving die haar draagt vaak wel.",
    body: "Na een verblijf in Mekka of Medina blijven motivatie en intentie bestaan, maar verdwijnen toegang tot vertrouwde boeken, geleerden en het dagelijkse ritme van samen leren. Bestaande webshops lossen vooral de aankoop op — niet het volhouden.",
    note: "Het probleem was niet: waar koop ik een boek? Het was: hoe blijf ik thuis gericht leren?",
    image: "/projects/ayn-2026/laptop-home.webp",
    imageAlt: "Ayn Al-Hikmah landingspagina in een laptopmockup",
    tone: "ayn-beige",
  },
  {
    number: "02",
    eyebrow: "De marktkans",
    title: "Commerce kan toegang geven. Begeleiding maakt van toegang een pad.",
    body: "Ik koppelde de betrouwbaarheid van een gespecialiseerde boekhandel aan de continuïteit van een leeromgeving. Zo wordt iedere titel niet alleen een product, maar een mogelijke stap binnen een groter onderwerp, niveau en ritme.",
    note: "Niet méér boeken tonen, maar duidelijker maken welk boek wanneer waardevol wordt.",
    image: "/projects/ayn-2026/phones.webp",
    imageAlt: "Ayn Al-Hikmah concept op twee smartphones",
    tone: "ayn-mango",
  },
  {
    number: "03",
    eyebrow: "De oplossingsrichting",
    title: "Eén ecosysteem voor ontdekken, kiezen, begrijpen en doorgaan.",
    body: "De ervaring verbindt gecureerde boeken, auteurs en niveaus met guided onboarding, taalondersteuning en live sessies. Een persoonlijke route maakt zichtbaar waar iemand begint, wat een haalbare volgende stap is en welke hulp daarbij past.",
    note: "De winkel is de ingang. Het leerpad is de reden om terug te komen.",
    image: "/projects/ayn-2026/tablets.webp",
    imageAlt: "Ayn Al-Hikmah leerpaden op twee tablets",
    tone: "ayn-cream",
  },
  {
    number: "04",
    eyebrow: "Productlogica",
    title: "Authenticiteit moet vóór de aankoop zichtbaar en navigeerbaar zijn.",
    body: "Titels worden niet alleen op categorie ontsloten, maar ook op auteur, taal, niveau, onderwerp en gewenste ondersteuning. Op de detailpagina krijgt context evenveel gewicht als prijs: waarom dit boek ertoe doet, voor wie het geschikt is en wat logisch volgt.",
    note: "Vertrouwen ontstaat wanneer herkomst, moeilijkheid en vervolgstap zichzelf uitleggen.",
    image: "/projects/ayn-2026/detail-desktop.webp",
    imageAlt: "Uitgebreide boekdetailpagina van Ayn Al-Hikmah",
    tone: "ayn-tan",
  },
  {
    number: "05",
    eyebrow: "Het visuele systeem",
    title: "De rust van een bibliotheek, met warmte op ieder beslismoment.",
    body: "Bordeaux geeft de ervaring autoriteit zonder afstandelijk te worden. Cream en warm beige creëren leesruimte; mango markeert hulp en actie. Tajawal zet richting in de koppen, terwijl Lora langere uitleg bewust vertraagt.",
    note: "Het systeem voelt inhoudelijk en menselijk — nooit als een generieke marktplaats.",
    image: "",
    imageAlt: "Ayn Al-Hikmah style guide",
    tone: "ayn-bordeaux",
    styleGuide: true,
  },
  {
    number: "06",
    eyebrow: "Wat nog bewezen moet worden",
    title: "Het concept maakt de leerlus zichtbaar. Echte studenten moeten bewijzen of die lus standhoudt.",
    body: "Ayn Al-Hikmah is een zelf geïnitieerde ontwerpvisie, geen gelanceerd klantproduct. De volgende stap is toetsen of mensen betere titels kiezen, de aanbevelingen begrijpen en na aankoop daadwerkelijk terugkeren voor ondersteuning en een volgende stap.",
    note: "De schermen zijn de hypothese. Begrip, vertrouwen en volhouden zijn de meetpunten.",
    image: "/projects/ayn-2026/hero-laptops.webp",
    imageAlt: "Ayn Al-Hikmah eindconcept op twee laptops",
    tone: "ayn-mango",
  },
] as const;

const proofFrames = [
  { label: "Belofte / landing", src: "/projects/ayn-2026/landing-desktop.webp" },
  { label: "Ontdekken / boekwinkel", src: "/projects/ayn-2026/shop-desktop.webp" },
  { label: "Begrijpen / boekdetail", src: "/projects/ayn-2026/detail-desktop.webp" },
] as const;

export function AynAlHikmahExperience() {
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
            scale: 0.95,
            filter: "brightness(0.86)",
            ease: "none",
            scrollTrigger: { trigger: nextShell, start: "top bottom", end: "top 10%", scrub: true, invalidateOnRefresh: true },
          });
          const dim = card.querySelector(".tc-card-dim");
          if (dim) {
            gsap.to(dim, {
              opacity: 0.06,
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
    <main ref={root} className="tc-page tc-page-ayn">
      <a className="skip-link" href="#ayn-content">Ga naar de case</a>
      <nav className="tc-nav" aria-label="Case navigatie">
        <a href="/#werk"><ArrowLeft aria-hidden="true" /> Alle cases</a>
        <a className="tc-nav-brand" href="/">Abdelrahman / Digital designer</a>
        <span>02 / 07</span>
      </nav>

      <header className="tc-hero">
        <div className="tc-hero-copy">
          <p className="tc-hero-kicker">Case 02 · Zelf geïnitieerd concept</p>
          <h1>
            <span className="tc-title-line"><span>Ayn Al-Hikmah</span></span>
            <span className="tc-title-line tc-title-small"><span>Kennis meenemen.</span></span>
            <span className="tc-title-line tc-title-small"><span>Ook na Medina.</span></span>
          </h1>
          <p className="tc-hero-summary">Een boekhandel en leeromgeving die authentieke boeken, betrouwbare geleerden en persoonlijke studiestructuur samenbrengt — voor kenniszoekers die thuis het ritme van Medina willen vasthouden.</p>
          <dl className="tc-hero-meta">
            <div><dt>Vertrekpunt</dt><dd>Een gat tussen toegang en begeleiding</dd></div>
            <div><dt>Mijn rol</dt><dd>Concept · Strategie · UX/UI</dd></div>
            <div><dt>Status</dt><dd>Toetsbaar platformconcept</dd></div>
          </dl>
        </div>
        <figure className="tc-hero-media">
          <Image src="/projects/ayn-2026/hero-laptops.webp" alt="Ayn Al-Hikmah webshop en boekdetail op twee laptops" fill priority sizes="(max-width: 760px) 100vw, 58vw" />
          <figcaption>Commerce + learning / responsive concept</figcaption>
        </figure>
      </header>

      <section className="tc-premise" id="ayn-content" aria-labelledby="ayn-premise-title">
        <p>De leegte na Medina</p>
        <h2 id="ayn-premise-title">Ik zag geen gebrek aan motivatie. Ik zag een gebrek aan structuur, gezelschap en betrouwbare toegang.</h2>
        <div className="tc-premise-notes">
          <span><BookOpenText aria-hidden="true" /> Authentieke bronnen</span>
          <span><RadioTower aria-hidden="true" /> Lessen met context</span>
          <span><Route aria-hidden="true" /> Een haalbaar leerpad</span>
        </div>
      </section>

      <section className="tc-deck" aria-label="Ayn Al-Hikmah oplossingsverhaal in zes kaarten">
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
                {index === 2 && <div className="tc-feature-row"><span><BookOpenText aria-hidden="true" /> Gecureerde boeken</span><span><Languages aria-hidden="true" /> Taalondersteuning</span><span><RadioTower aria-hidden="true" /> Live context</span></div>}
                {index === 3 && <div className="tc-feature-row"><span><ShieldCheck aria-hidden="true" /> Herkomst</span><span><Route aria-hidden="true" /> Niveau &amp; volgorde</span><span><Sparkles aria-hidden="true" /> Passende hulp</span></div>}
                {index === 4 && <p className="tc-system-caption">Tajawal brengt richting. Lora geeft uitleg en langere leestekst rust.</p>}
                {index === 5 && <ul className="tc-validation-list"><li>Kiezen studenten aantoonbaar passender materiaal?</li><li>Begrijpen zij waarom een titel wordt aanbevolen?</li><li>Helpt de begeleiding hen het studieritme vol te houden?</li></ul>}
              </div>
              <figure className={`tc-card-media${"styleGuide" in card ? " tc-style-card-media" : ""}`}>
                {"styleGuide" in card ? <CaseStyleGuide data={styleGuide} /> : <Image src={card.image} alt={card.imageAlt} fill sizes="(max-width: 760px) 92vw, 54vw" />}
              </figure>
            </div>
          </article>
        ))}
      </section>

      <section className="tc-proof" aria-labelledby="ayn-proof-title">
        <div className="tc-proof-heading">
          <p>Drie kernflows / volledig uitgewerkt</p>
          <h2 id="ayn-proof-title">Van belofte.<br />Naar boekkeuze.<br /><em>Naar begrip.</em></h2>
          <p>De landing, boekwinkel en detailpagina vertellen samen één verhaal: eerst herkennen wat ontbreekt, daarna gericht ontdekken en uiteindelijk met voldoende context een keuze maken.</p>
        </div>
        <div className="tc-proof-grid">
          {proofFrames.map((frame) => (
            <figure className="tc-proof-frame" key={frame.label}>
              <div className="tc-proof-media"><Image src={frame.src} alt={`${frame.label} van Ayn Al-Hikmah`} fill sizes="(max-width: 760px) 86vw, 29vw" /></div>
              <figcaption>{frame.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="tc-contribution">
        <p>Mijn bijdrage</p>
        <div><h2>Van een webshop voor boeken naar een omgeving die kennis helpt landen, groeien en doorgaan.</h2><p>Ik vertaalde de nichekans naar positionering, servicearchitectuur, informatiehiërarchie en een responsive interface. Omdat dit een conceptproject is, presenteer ik geen verzonnen impactcijfers; de case maakt juist helder welke aannames met kenniszoekers getoetst moeten worden.</p></div>
      </section>

      <footer className="tc-footer">
        <p>Volgende case / Conceptproject</p>
        <a href="/cases/guidance-travel"><span>Guidance Travel</span><ArrowUpRight aria-hidden="true" /></a>
        <div><span>Abdelrahman / Senior digital designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
