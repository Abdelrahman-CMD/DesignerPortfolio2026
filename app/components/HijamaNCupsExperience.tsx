"use client";

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef } from "react";
import ArrowLeft from "lucide-react/icons/arrow-left";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import CalendarCheck from "lucide-react/icons/calendar-check";
import HeartHandshake from "lucide-react/icons/heart-handshake";
import MessageCircle from "lucide-react/icons/message-circle";
import Search from "lucide-react/icons/search";
import Sparkles from "lucide-react/icons/sparkles";
import UserRound from "lucide-react/icons/user-round";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LanguageSwitcher, Locale, localeHref, translateText } from "../i18n";
import { CaseDeepDive } from "./CaseDeepDive";

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

export function HijamaNCupsExperience({ locale = "nl" }: { locale?: Locale }) {
  const root = useRef<HTMLElement>(null);
  const tx = (value: string) => translateText(locale, value);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".tc-nav", { opacity: 0, y: -18, duration: 0.32 })
        .from(".tc-hero-kicker", { opacity: 0, y: 16, duration: 0.28 }, "-=0.08")
        .from(".tc-title-line > span", { yPercent: 112, duration: 0.52, stagger: 0.05 }, "-=0.16")
        .from(".tc-hero-summary, .tc-hero-meta", { opacity: 0, y: 24, duration: 0.38, stagger: 0.05 }, "-=0.32")
        .from(".tc-hero-media", { opacity: 0, xPercent: 16, scale: 0.97, duration: 0.78 }, "-=0.46");

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
      <a className="skip-link" href="#hijama-content">{tx("Ga naar de case")}</a>
      <nav className="tc-nav" aria-label={tx("Case navigatie")}>
        <a href={localeHref("/#werk", locale)}><ArrowLeft aria-hidden="true" /> {tx("Alle cases")}</a>
        <a className="tc-nav-brand" href={localeHref("/", locale)}>Abdelrahman / Product &amp; UX/UI designer</a>
        <div className="tc-nav-actions"><span>06 / 08</span><LanguageSwitcher locale={locale} path="/cases/hijaman-cups" /></div>
      </nav>

      <header className="tc-hero">
        <div className="tc-hero-copy">
          <p className="tc-hero-kicker">{tx("Case 06 · Klantproject")}</p>
          <h1>
            <span className="tc-title-line"><span>Hijama ’N Cups</span></span>
            <span className="tc-title-line tc-title-small"><span>{tx("Vertrouwen voelen.")}</span></span>
            <span className="tc-title-line tc-title-small"><span>{tx("Contact durven.")}</span></span>
          </h1>
          <p className="tc-hero-summary">{tx("Een warme digitale praktijk voor Nora: haar expertise, behandelingen en antwoorden helder bij elkaar, met WhatsApp als persoonlijke en laagdrempelige route naar een afspraak.")}</p>
          <dl className="tc-hero-meta">
            <div><dt>{tx("Opdracht")}</dt><dd>{tx("Een professionele digitale plek claimen")}</dd></div>
            <div><dt>{tx("Mijn rol")}</dt><dd>{tx("Strategie · UX/UI · Figma · Framer")}</dd></div>
            <div><dt>{tx("Resultaat")}</dt><dd>{tx("Live website met WhatsApp-boeking")}</dd></div>
          </dl>
        </div>
        <figure className="tc-hero-media">
          <Image src="/projects/hijama-2026/hero-laptops.webp" alt={tx("Hijama 'N Cups homepage en behandelingen op twee laptops")} fill priority sizes="(max-width: 760px) 100vw, 58vw" />
          <figcaption>{tx("Klantproject / live sinds 2025")}</figcaption>
        </figure>
      </header>

      <section className="tc-snapshot" id="hijama-content" aria-labelledby="hijama-snapshot-title">
        <header>
          <p>{tx("De case in 30 seconden")}</p>
          <h2 id="hijama-snapshot-title">{tx("Probleem. Oplossing. Volgende stap.")}</h2>
        </header>
        <div className="tc-snapshot-grid">
          <div><span>{tx("Probleem")}</span><p>{tx(cards[0].note)}</p></div>
          <div><span>{tx("Oplossing")}</span><p>{tx(cards[2].note)}</p></div>
          <div><span>{tx("Status / volgende stap")}</span><p>{tx(cards[5].note)}</p></div>
        </div>
      </section>

      <section className="tc-deck" aria-label={tx("Hijama 'N Cups oplossingsverhaal in drie beslissingen")}>
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
                {index === 1 && <div className="tc-feature-row"><span><UserRound aria-hidden="true" /> {tx("Over Nora")}</span><span><Sparkles aria-hidden="true" /> {tx("Behandelingen")}</span><span><Search aria-hidden="true" /> {tx("Vragen vooraf")}</span></div>}
                {index === 2 && <div className="tc-feature-row"><span><CalendarCheck aria-hidden="true" /> {tx("Behandeling kiezen")}</span><span><MessageCircle aria-hidden="true" /> {tx("WhatsApp openen")}</span><span><HeartHandshake aria-hidden="true" /> {tx("Persoonlijk afstemmen")}</span></div>}
              </div>
              <figure className="tc-card-media">
                <Image src={card.image} alt={tx(card.imageAlt)} fill sizes="(max-width: 760px) 92vw, 54vw" />
              </figure>
            </div>
          </article>
        ))}
      </section>

      <CaseDeepDive
        locale={locale}
        items={cards.slice(3).map((card) => ({
          number: card.number,
          eyebrow: tx(card.eyebrow),
          title: tx(card.title),
          body: tx(card.body),
          note: tx(card.note),
        }))}
      />

      <section className="tc-proof" aria-labelledby="hijama-proof-title">
        <header className="tc-proof-heading">
          <p>{tx("De kernflows / responsive gebouwd")}</p>
          <h2 id="hijama-proof-title">{tx("Eerst begrijpen.")}<br />{tx("Dan vertrouwen.")}<br /><em>{tx("Dan contact.")}</em></h2>
          <p>{tx("De homepage, behandelingen, Nora’s achtergrond en de FAQ vormen op ieder formaat één doorlopende beslisroute. De bezoeker kan rustig oriënteren en heeft steeds een herkenbare weg naar persoonlijk contact.")}</p>
        </header>
        <div className="tc-proof-grid">
          {proofFrames.slice(0, 4).map((frame, index) => (
            <figure className="tc-proof-frame" key={frame.label}>
              <div className="tc-proof-media"><Image src={frame.src} alt={locale === "en" ? `Responsive Hijama 'N Cups interface ${index + 1}` : `${frame.label} van Hijama 'N Cups`} fill sizes="(max-width: 760px) 86vw, 44vw" /></div>
              <figcaption>{tx(frame.label)}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="tc-contribution">
        <p>{tx("Mijn bijdrage")}</p>
        <div>
          <h2>{tx("Van mond-tot-mondvertrouwen naar een digitale praktijk die Nora’s eigen manier van werken bewaart.")}</h2>
          <p>{tx("Ik bracht positionering, content, informatiearchitectuur en interface samen in Figma en bouwde de uiteindelijke ervaring in Framer. De website staat live en maakt Nora’s aanbod vindbaar en begrijpelijk. Zonder gekoppelde analytics schrijf ik geen conversie-impact toe; Google Search Console, WhatsApp-kliks en aanvraagkwaliteit zijn de logische volgende bewijslaag.")}</p>
          <a className="tc-live-link" href="https://hijamancups.com/" target="_blank" rel="noreferrer">{tx("Bekijk de live website")} <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </section>

      <footer className="tc-footer">
        <p>{tx("Volgende case / Klantproject")}</p>
        <a href={localeHref("/cases/atotz-detachering", locale)}><span>AtotZ</span><ArrowUpRight aria-hidden="true" /></a>
        <div><span>Abdelrahman / Product &amp; UX/UI designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
