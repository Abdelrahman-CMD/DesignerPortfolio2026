"use client";

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef } from "react";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import CalendarCheck from "lucide-react/icons/calendar-check";
import HeartHandshake from "lucide-react/icons/heart-handshake";
import MessageCircle from "lucide-react/icons/message-circle";
import Search from "lucide-react/icons/search";
import ShieldCheck from "lucide-react/icons/shield-check";
import Sparkles from "lucide-react/icons/sparkles";
import UserRound from "lucide-react/icons/user-round";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaseStyleGuide, type CaseStyleGuideData } from "./CaseStyleGuide";

const styleGuide: CaseStyleGuideData = {
  project: "Hijama 'N Cups",
  logo: "/projects/hijama-2026/logo.webp",
  logoAlt: "Hijama 'N Cups logo",
  displayFont: "Chillax",
  displayUse: "Headlines / vriendelijk en zacht",
  interfaceFont: "Montserrat",
  interfaceUse: "Body / navigatie / duidelijkheid",
  variant: "hijama",
  colors: [
    { name: "Care green", value: "#15662D", ink: "#F7F7F2" },
    { name: "Leaf green", value: "#288E47", ink: "#F7F7F2" },
    { name: "Soft sage", value: "#DAE5DD", ink: "#15662D" },
    { name: "Warm sand", value: "#E8D5B0", ink: "#3C341F" },
  ],
};

const cards = [
  {
    number: "01",
    eyebrow: "De klantvraag",
    title: "Een vertrouwde praktijk verdiende een digitale voordeur die net zo persoonlijk voelt.",
    body: "Nora bouwde als zelfstandig hijama- en cuppingtherapeut jarenlang een vaste klantenkring en sterke reputatie op. De website moest haar plek in de digitale wereld claimen en in één rustige ervaring uitleggen wie zij is, wat zij behandelt en hoe iemand contact opneemt.",
    note: "Niet harder verkopen, maar vertrouwen uit de behandelkamer vertalen naar het scherm.",
    image: "/projects/hijama-2026/hero-laptops.webp",
    imageAlt: "Hijama 'N Cups homepage en behandelingen op twee laptops",
    tone: "hijama-ivory",
  },
  {
    number: "02",
    eyebrow: "De informatiebehoefte",
    title: "Voor een behandeling wil iemand eerst begrijpen, vergelijken en zich veilig voelen.",
    body: "De inhoud is opgebouwd rond de vragen vóór een afspraak: wie behandelt mij, welke behandeling past bij mijn behoefte, wat kost het, hoe lang duurt het en wat kan ik verwachten? Over Nora, behandelingen en veelgestelde vragen vormen daarom samen de kern van de route.",
    note: "De navigatie volgt de twijfel van een nieuwe bezoeker, niet de organisatiestructuur van de praktijk.",
    image: "/projects/hijama-2026/tablets.webp",
    imageAlt: "Behandelingen en veelgestelde vragen van Hijama 'N Cups op tablets",
    tone: "hijama-mint",
  },
  {
    number: "03",
    eyebrow: "De conversiekeuze",
    title: "Boeken moest voelen als contact leggen — niet als een formulier invullen.",
    body: "Nora wilde afspraken bewust laagdrempelig houden. Iedere behandeling leidt daarom naar een specifieke WhatsApp-route, zodat de bezoeker meteen de juiste context meeneemt en Nora persoonlijk kan afstemmen voordat er een afspraak staat.",
    note: "Eén herkenbare handeling verbindt oriëntatie, vertrouwen en persoonlijk contact.",
    image: "/projects/hijama-2026/phones.webp",
    imageAlt: "Behandelingen, vragen en contact van Hijama 'N Cups op smartphones",
    tone: "hijama-leaf",
  },
  {
    number: "04",
    eyebrow: "Bewijs vóór belofte",
    title: "Expertise wordt geloofwaardig wanneer ervaring, certificering en echte klantstemmen samenkomen.",
    body: "De website maakt Nora zichtbaar als mens en professional. Haar achtergrond, expertise, behandelervaring en reviews staan dicht bij de beslismomenten, terwijl de FAQ medische en praktische onzekerheid opvangt zonder de ervaring zwaar of klinisch te maken.",
    note: "Social proof ondersteunt de keuze; het neemt de persoonlijke afweging nooit over.",
    image: "/projects/hijama-2026/about-desktop.webp",
    imageAlt: "Over Nora en haar expertise op de Hijama 'N Cups website",
    tone: "hijama-gold",
  },
  {
    number: "05",
    eyebrow: "Het visuele systeem",
    title: "Zacht genoeg voor welzijn. Duidelijk genoeg voor zorg en keuze.",
    body: "Forest en Leaf Green geven de praktijk herkenning en vertrouwen. Soft Mint houdt informatieve secties licht; Warm Gold brengt warmte vanuit het logo terug in vragen en contactmomenten. Chillax geeft de koppen een menselijke zachtheid, Montserrat bewaakt scanbaarheid.",
    note: "De identiteit vermijdt zowel klinische afstand als wellness-clichés.",
    image: "",
    imageAlt: "Hijama 'N Cups style guide",
    tone: "hijama-deep",
    styleGuide: true,
  },
  {
    number: "06",
    eyebrow: "Van ontwerp naar praktijk",
    title: "Figma gaf de richting. Framer maakte de digitale praktijk direct bereikbaar.",
    body: "Ik vertaalde Nora's verhaal naar positionering, contentarchitectuur, responsive UI en een werkende Framer-website. De live ervaring bundelt uitleg, behandelingen, prijzen, reviews, vragen en locatie in één herkenbare plek, met WhatsApp als bewuste brug naar de afspraak.",
    note: "De website is live. Verdere impact hoort gemeten te worden op vindbaarheid, behandeling-naar-WhatsApp-kliks en kwaliteit van aanvragen.",
    image: "/projects/hijama-2026/services-desktop.webp",
    imageAlt: "Volledige behandelingenpagina van Hijama 'N Cups",
    tone: "hijama-mint",
  },
] as const;

const proofFrames = [
  { label: "Homepage / tablet", src: "/projects/hijama-2026/home-tablet.webp" },
  { label: "Homepage / mobiel", src: "/projects/hijama-2026/home-mobile.webp" },
  { label: "Behandelingen / desktop", src: "/projects/hijama-2026/services-desktop.webp" },
  { label: "Behandelingen / tablet", src: "/projects/hijama-2026/services-tablet.webp" },
  { label: "Veelgestelde vragen / mobiel", src: "/projects/hijama-2026/faq-mobile.webp" },
] as const;

export function HijamaNCupsExperience() {
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
    <main ref={root} className="tc-page tc-page-hijama">
      <a className="skip-link" href="#hijama-content">Ga naar de case</a>
      <nav className="tc-nav" aria-label="Case navigatie">
        <a href="/#werk"><ArrowLeft aria-hidden="true" /> Alle cases</a>
        <a className="tc-nav-brand" href="/">Abdelrahman / Digital designer</a>
        <span>05 / 07</span>
      </nav>

      <header className="tc-hero">
        <div className="tc-hero-copy">
          <p className="tc-hero-kicker">Case 05 · Klantproject</p>
          <h1>
            <span className="tc-title-line"><span>Hijama ’N Cups</span></span>
            <span className="tc-title-line tc-title-small"><span>Vertrouwen voelen.</span></span>
            <span className="tc-title-line tc-title-small"><span>Contact durven.</span></span>
          </h1>
          <p className="tc-hero-summary">Een warme digitale praktijk voor Nora: haar expertise, behandelingen en antwoorden helder bij elkaar, met WhatsApp als persoonlijke en laagdrempelige route naar een afspraak.</p>
          <dl className="tc-hero-meta">
            <div><dt>Opdracht</dt><dd>Een professionele digitale plek claimen</dd></div>
            <div><dt>Mijn rol</dt><dd>Strategie · UX/UI · Figma · Framer</dd></div>
            <div><dt>Resultaat</dt><dd>Live website met WhatsApp-boeking</dd></div>
          </dl>
        </div>
        <figure className="tc-hero-media">
          <Image src="/projects/hijama-2026/hero-laptops.webp" alt="Hijama 'N Cups homepage en behandelingen op twee laptops" fill priority sizes="(max-width: 760px) 100vw, 58vw" />
          <figcaption>Klantproject / live sinds 2025</figcaption>
        </figure>
      </header>

      <section className="tc-premise" id="hijama-content" aria-labelledby="hijama-premise-title">
        <p>De digitale vertrouwensvraag</p>
        <h2 id="hijama-premise-title">Hoe laat je een nieuwe bezoeker online dezelfde rust, aandacht en deskundigheid voelen als een vaste klant in Nora’s behandelkamer?</h2>
        <div className="tc-premise-notes">
          <span><UserRound aria-hidden="true" /> Persoonlijk verhaal</span>
          <span><ShieldCheck aria-hidden="true" /> Heldere expertise</span>
          <span><MessageCircle aria-hidden="true" /> Direct contact</span>
        </div>
      </section>

      <section className="tc-deck" aria-label="Hijama 'N Cups oplossingsverhaal in zes kaarten">
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
                {index === 1 && <div className="tc-feature-row"><span><UserRound aria-hidden="true" /> Over Nora</span><span><Sparkles aria-hidden="true" /> Behandelingen</span><span><Search aria-hidden="true" /> Vragen vooraf</span></div>}
                {index === 2 && <div className="tc-feature-row"><span><CalendarCheck aria-hidden="true" /> Behandeling kiezen</span><span><MessageCircle aria-hidden="true" /> WhatsApp openen</span><span><HeartHandshake aria-hidden="true" /> Persoonlijk afstemmen</span></div>}
                {index === 4 && <p className="tc-system-caption">Chillax brengt warmte en persoonlijkheid. Montserrat houdt uitleg, prijzen en veelgestelde vragen snel scanbaar.</p>}
                {index === 5 && <ul className="tc-validation-list"><li>Welke pagina brengt de meeste passende WhatsApp-gesprekken op gang?</li><li>Welke behandelvragen blijven vóór het contact onbeantwoord?</li><li>Hoe dragen organisch verkeer en lokale zoektermen bij aan nieuwe aanvragen?</li></ul>}
              </div>
              <figure className={`tc-card-media${"styleGuide" in card ? " tc-style-card-media" : ""}`}>
                {"styleGuide" in card ? <CaseStyleGuide data={styleGuide} /> : <Image src={card.image} alt={card.imageAlt} fill sizes="(max-width: 760px) 92vw, 54vw" />}
              </figure>
            </div>
          </article>
        ))}
      </section>

      <section className="tc-proof" aria-labelledby="hijama-proof-title">
        <header className="tc-proof-heading">
          <p>De kernflows / responsive gebouwd</p>
          <h2 id="hijama-proof-title">Eerst begrijpen.<br />Dan vertrouwen.<br /><em>Dan contact.</em></h2>
          <p>De homepage, behandelingen, Nora’s achtergrond en de FAQ vormen op ieder formaat één doorlopende beslisroute. De bezoeker kan rustig oriënteren en heeft steeds een herkenbare weg naar persoonlijk contact.</p>
        </header>
        <div className="tc-proof-grid">
          {proofFrames.map((frame) => (
            <figure className="tc-proof-frame" key={frame.label}>
              <div className="tc-proof-media"><Image src={frame.src} alt={`${frame.label} van Hijama 'N Cups`} fill sizes="(max-width: 760px) 86vw, 18vw" /></div>
              <figcaption>{frame.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="tc-contribution">
        <p>Mijn bijdrage</p>
        <div>
          <h2>Van mond-tot-mondvertrouwen naar een digitale praktijk die Nora’s eigen manier van werken bewaart.</h2>
          <p>Ik bracht positionering, content, informatiearchitectuur en interface samen in Figma en bouwde de uiteindelijke ervaring in Framer. De website staat live en maakt Nora’s aanbod vindbaar en begrijpelijk. Zonder gekoppelde analytics schrijf ik geen conversie-impact toe; Google Search Console, WhatsApp-kliks en aanvraagkwaliteit zijn de logische volgende bewijslaag.</p>
          <a className="tc-live-link" href="https://hijamancups.com/" target="_blank" rel="noreferrer">Bekijk de live website <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </section>

      <footer className="tc-footer">
        <p>Volgende case / Klantproject</p>
        <a href="/cases/atotz-detachering"><span>AtotZ</span><ArrowUpRight aria-hidden="true" /></a>
        <div><span>Abdelrahman / Senior digital designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
