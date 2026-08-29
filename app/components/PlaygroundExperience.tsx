"use client";

import { CSSProperties, PointerEvent, useLayoutEffect, useRef } from "react";
import ArrowDown from "lucide-react/icons/arrow-down";
import ArrowLeft from "lucide-react/icons/arrow-left";
import Sparkles from "lucide-react/icons/sparkles";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const placeholders = [
  { number: "01", label: "Breed kader", placement: "wide", tone: "clay", depth: 7 },
  { number: "02", label: "Verticaal kader", placement: "tall", tone: "paper", depth: 13 },
  { number: "03", label: "Rond experiment", placement: "round", tone: "sage", depth: 9 },
  { number: "04", label: "Vierkant fragment", placement: "square", tone: "orange", depth: 16 },
  { number: "05", label: "Klein object", placement: "small", tone: "ink", depth: 11 },
  { number: "06", label: "Lang frame", placement: "capsule", tone: "paper", depth: 18 },
  { number: "07", label: "Kleine planeet", placement: "orbit", tone: "clay", depth: 10 },
  { number: "08", label: "Breed archief", placement: "wide-two", tone: "sage", depth: 14 },
] as const;

export function PlaygroundExperience() {
  const root = useRef<HTMLElement>(null);
  const world = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".pg-nav", { opacity: 0, y: -18, duration: 0.55 })
        .from(".pg-kicker", { opacity: 0, y: 18, duration: 0.45 }, "-=0.12")
        .from(".pg-title-line > span", { yPercent: 115, duration: 0.95, stagger: 0.08 }, "-=0.14")
        .from(".pg-intro, .pg-status", { opacity: 0, y: 28, duration: 0.65, stagger: 0.08 }, "-=0.46");

      gsap.utils.toArray<HTMLElement>(".pg-card").forEach((card, index) => {
        const depth = Number(card.dataset.depth ?? 8);
        gsap.from(card, {
          opacity: 0,
          y: 100,
          rotateX: 9,
          scale: 0.94,
          duration: 0.95,
          delay: index * 0.03,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 92%" },
        });
        gsap.to(card, {
          yPercent: -depth,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);

    return () => context.revert();
  }, []);

  const moveWorld = (event: PointerEvent<HTMLElement>) => {
    if (!world.current || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(world.current, { rotateY: x * 3.2, rotateX: y * -2.4, duration: 0.8, ease: "power3.out" });
    event.currentTarget.style.setProperty("--pg-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--pg-y", `${event.clientY - rect.top}px`);
  };

  const resetWorld = () => {
    if (world.current) gsap.to(world.current, { rotateY: 0, rotateX: 0, duration: 1.1, ease: "power3.out" });
  };

  return (
    <main ref={root} className="pg-page" onPointerMove={moveWorld} onPointerLeave={resetWorld}>
      <a className="skip-link" href="#playground-space">Ga naar de playground</a>
      <nav className="pg-nav" aria-label="Playground navigatie">
        <a href="/"><ArrowLeft aria-hidden="true" /> Portfolio</a>
        <span>Playground / ruimte voor experiment</span>
        <span>Open veld · 2026</span>
      </nav>

      <header className="pg-hero">
        <div className="pg-orb pg-orb-one" aria-hidden="true" />
        <div className="pg-orb pg-orb-two" aria-hidden="true" />
        <p className="pg-kicker"><Sparkles aria-hidden="true" /> Buiten de vaste kaders</p>
        <h1>
          <span className="pg-title-line"><span>Een ruimte voor</span></span>
          <span className="pg-title-line"><span>ideeën vóórdat ze</span></span>
          <span className="pg-title-line pg-title-accent"><span>cases worden.</span></span>
        </h1>
        <p className="pg-intro">Hier komen schetsen, materiaalstudies, beelden en digitale experimenten die nog niet om een afgerond verhaal vragen.</p>
        <div className="pg-status"><span>In opbouw</span><span>Inhoud volgt</span></div>
        <a className="pg-scroll-cue" href="#playground-space"><span>Betreed de ruimte</span><ArrowDown aria-hidden="true" /></a>
      </header>

      <section className="pg-space" id="playground-space" aria-labelledby="pg-space-title">
        <div className="pg-space-heading">
          <p>Placeholder-architectuur / klaar voor inhoud</p>
          <h2 id="pg-space-title">Verschillende vormen.<br />Eén open atmosfeer.</h2>
        </div>
        <div ref={world} className="pg-world">
          {placeholders.map((card) => (
            <article
              className={`pg-card pg-card-${card.placement} pg-tone-${card.tone}`}
              data-depth={card.depth}
              aria-label={`${card.label}, inhoud volgt`}
              key={card.number}
              style={{ "--pg-depth": `${card.depth}px` } as CSSProperties}
            >
              <header><span>{card.number}</span><span>{card.label}</span></header>
              <div className="pg-placeholder-mark" aria-hidden="true"><span /><span /></div>
              <footer><span>Inhoud volgt</span><span>± {card.depth * 10} z</span></footer>
            </article>
          ))}
        </div>
      </section>

      <footer className="pg-footer">
        <p>De ruimte staat. De inhoud mag groeien.</p>
        <a href="/#werk"><span>Terug naar geselecteerd werk</span><ArrowLeft aria-hidden="true" /></a>
        <div><span>Abdelrahman / Playground</span><span>Wordt vervolgd · 2026</span></div>
      </footer>
    </main>
  );
}
