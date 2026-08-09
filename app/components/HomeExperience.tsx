"use client";

import Link from "next/link";
import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    number: "01",
    slug: "tareeqi",
    name: "Tareeqi",
    title: "Navigating Mecca & Medina beyond the obvious",
    summary:
      "Een lokaal gevoed kaartplatform dat pelgrims voorbij de bekende routes brengt — met rust, context en toegankelijkheid als kompas.",
    services: "Strategy · UX/UI · Product concept",
    bg: "#eadfd3",
    ink: "#332a24",
    image: "/projects/tareeqi-overview.jpg",
    imagePosition: "top",
    href: "/cases/tareeqi",
  },
  {
    number: "02",
    slug: "ayn",
    name: "Ayn Al-Hikmah",
    title: "Filling the void for knowledge seekers leaving Medina",
    summary:
      "Een boekhandel en leeromgeving die boeken, geleerden en de structuur van studeren uit de Haramain dichterbij brengt.",
    services: "Strategy · E-commerce · Learning UX",
    bg: "#f2cf82",
    ink: "#401818",
    image: "/projects/ayn-overview.jpg",
    imagePosition: "top",
    href: "/cases/ayn-al-hikmah",
  },
  {
    number: "03",
    slug: "guidance",
    name: "Guidance Travel",
    title: "Redefining premium travel with Form Follows Function",
    summary:
      "Een conversiegerichte reiservaring waarin elke keuze — van pakketfilter tot reflectie — het vertrouwen van de pelgrim versterkt.",
    services: "Conversion strategy · UX/UI · Web design",
    bg: "#ff9e43",
    ink: "#28231f",
    image: "/projects/guidance-overview.jpg",
    imagePosition: "top",
    href: "/cases/guidance-travel",
  },
  {
    number: "04",
    slug: "bayn",
    name: "Bayn Signal",
    title: "Staying ahead of the local pulse with vital insights",
    summary:
      "Een betrouwbaar signaalplatform dat expats en migranten vroegtijdig context geeft over regels, routes en het dagelijks leven.",
    services: "Editorial strategy · UX/UI · Platform concept",
    bg: "#cbd9cc",
    ink: "#123f37",
    image: "/projects/bayn-overview.jpg",
    imagePosition: "top",
    href: "/cases/bayn-signal",
  },
  {
    number: "05",
    slug: "hijaman-cups",
    name: "Hijama’N Cups",
    title: "Turning traditional care into a calm, clear digital welcome",
    summary:
      "Een warme Framer-website voor een zelfstandige behandelpraktijk, waarin uitleg, vertrouwen en laagdrempelig boeken samenkomen.",
    services: "Strategy · UX/UI · Framer design & build",
    bg: "#dae5dd",
    ink: "#15662d",
    image: "/projects/live/hijaman-cups-rose.jpg",
    imagePosition: "center 58%",
    href: "/cases/hijaman-cups",
  },
  {
    number: "06",
    slug: "atotz",
    name: "AtotZ Detachering",
    title: "Putting the right people in the right place — without the friction",
    summary:
      "Een directe, conversiegerichte Framer-website voor een detacheringsbureau dat snelheid koppelt aan persoonlijke aandacht.",
    services: "Positioning · UX/UI · Framer design & build",
    bg: "#1c2a3a",
    ink: "#f9fafb",
    image: "/projects/live/atotz-people.jpg",
    imagePosition: "center",
    href: "/cases/atotz-detachering",
  },
] as const;

const personalStory = [
  {
    step: "01",
    kicker: "Wie ik ben",
    title: "Nieuwsgierig van nature. Strategisch uit overtuiging.",
    body: "Ik ben Abdelrahman, senior digital designer en strategisch sparringpartner. Ik gebruik design om complexe vragen terug te brengen tot iets dat mensen begrijpen, vertrouwen en willen gebruiken.",
    image: "/about/portrait-studio.jpg",
    alt: "Abdelrahman in zijn ontwerpstudio",
    position: "center 35%",
    note: "Curiosity over certainty",
    caption: "Home studio / waar vragen vorm krijgen",
    dotX: "55%",
    dotMobileX: "8%",
  },
  {
    step: "02",
    kicker: "Wat ik doe",
    title: "Eerst de dialoog. Dan de richting. Daarna pas pixels.",
    body: "Mijn beste werk ontstaat niet uit een briefing die meteen dichtgetimmerd is. Ik vraag door, leg aannames op tafel en wacht tot het kwartje valt. Daar, tussen structuur en vrije verbeelding, begint het echte ontwerp.",
    image: "/about/designing.jpg",
    alt: "Abdelrahman werkt aan een digitaal ontwerp achter zijn bureau",
    position: "center",
    note: "Strategy before screens",
    caption: "In progress / bouwen, testen, opnieuw kijken",
    dotX: "39%",
    dotMobileX: "91%",
  },
  {
    step: "03",
    kicker: "Hoe ik blijf groeien",
    title: "Kennis is geen zijpad. Het is onderdeel van mijn vak.",
    body: "Ik blijf lezen, onderzoeken en bouwen. Van designpsychologie en strategie tot techniek en cultuur: nieuwe kennis scherpt mijn blik en voorkomt dat ik steeds hetzelfde antwoord op een nieuwe vraag geef.",
    image: "/about/learning.jpg",
    alt: "Abdelrahman leest The Heart of Design",
    position: "center",
    note: "Stay a student",
    caption: "Field notes / kennis houdt mijn blik beweeglijk",
    dotX: "63%",
    dotMobileX: "11%",
  },
  {
    step: "04",
    kicker: "En buiten het scherm",
    title: "Oh ja — ik ben natuurlijk ook papa.",
    body: "Vaderschap maakt mijn kijk op verantwoordelijkheid heel concreet. Het herinnert me eraan voor wie we uiteindelijk ontwerpen: echte mensen, met weinig tijd, veel context en een leven dat nooit netjes in een user flow past.",
    image: "/about/fatherhood.jpg",
    alt: "Abdelrahman als vader bij de kinderwagen",
    position: "center 35%",
    note: "Design starts at home",
    caption: "Real life / de belangrijkste rol buiten het scherm",
    dotX: "44%",
    dotMobileX: "88%",
  },
] as const;

const storyPhotoPieces = Array.from({ length: 12 }, (_, index) => {
  const columns = 4;
  const rows = 3;
  const column = index % columns;
  const row = Math.floor(index / columns);
  const gap = 0.28;
  const left = column * (100 / columns) + gap;
  const right = (column + 1) * (100 / columns) - gap;
  const top = row * (100 / rows) + gap;
  const bottom = (row + 1) * (100 / rows) - gap;

  return {
    clipPath: `polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)`,
    column,
    row,
  };
});

const workingMethod = [
  {
    number: "01",
    phase: "Sparren",
    title: "Richting ontstaat in de dialoog.",
    body: "Aan tafel met de klant maak ik aannames zichtbaar. We bepalen niet alleen wat er gebouwd moet worden, maar vooral welke verandering het werk moet veroorzaken.",
    tools: "Client sessions · Workshops · Direction",
  },
  {
    number: "02",
    phase: "Verdiepen",
    title: "Desk, field en AI brengen het probleem dichtbij.",
    body: "Ik combineer deskresearch met gesprekken en observaties uit de echte context. AI helpt patronen sneller toetsen en nieuwe vragen formuleren — het oordeel en de richting blijven menselijk.",
    tools: "Desk research · Field research · AI",
  },
  {
    number: "03",
    phase: "Vormgeven",
    title: "Van inzicht naar een voelbaar product.",
    body: "In Figma krijgt de ervaring structuur. In Framer of code wordt ze tastbaar, beweeglijk en testbaar. AI versnelt varianten en uitvoering, zonder de ontwerpintentie over te nemen.",
    tools: "Figma · Framer · AI-assisted build",
  },
  {
    number: "04",
    phase: "Koers houden",
    title: "Check-ins maken van uitvoering een gedeelde regie.",
    body: "Tijdens iedere fase kijken we samen: klopt de richting nog, begrijpen gebruikers dit en draagt iedere keuze bij aan het doel? Zo dirigeer ik het proces én blijft de klant onderdeel van het ontwerp.",
    tools: "Prototype reviews · Check-ins · Iteration",
  },
] as const;

export function HomeExperience() {
  const root = useRef<HTMLElement>(null);
  const showcase = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    let cleanupStoryRoute = () => {};

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".site-mark, .top-nav", {
          opacity: 0,
          y: -14,
          duration: 0.7,
        })
        .from(
          ".hero-line > span",
          { yPercent: 115, duration: 1.25, stagger: 0.1 },
          "-=0.35",
        )
        .from(
          ".hero-intro, .hero-index, .scroll-note",
          { opacity: 0, y: 22, duration: 0.8, stagger: 0.1 },
          "-=0.65",
        );

      gsap.to(".hero-copy", {
        opacity: 0.14,
        yPercent: -13,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "58% center",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".manifesto-word", {
        opacity: 0.12,
        y: 18,
        stagger: 0.035,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".manifesto-copy",
          start: "top 78%",
          end: "bottom 62%",
          scrub: 0.65,
        },
      });

      gsap.utils.toArray<HTMLElement>(".project-entry").forEach((entry, index) => {
        const background = entry.dataset.bg ?? projects[index].bg;

        ScrollTrigger.create({
          trigger: entry,
          start: "top 54%",
          end: "bottom 46%",
          onEnter: () => {
            setActiveProject(index);
            gsap.to(showcase.current, {
              backgroundColor: background,
              duration: 0.75,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            setActiveProject(index);
            gsap.to(showcase.current, {
              backgroundColor: background,
              duration: 0.75,
              ease: "power2.out",
            });
          },
        });

        gsap.from(entry.querySelector(".project-visual"), {
          yPercent: 9,
          scale: 0.965,
          ease: "none",
          scrollTrigger: {
            trigger: entry,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        });

        const image = entry.querySelector("img");
        if (image) {
          gsap.fromTo(
            image,
            { yPercent: -4 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: entry,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });

      const route = root.current?.querySelector<HTMLElement>(".story-route");
      const canvas = route?.querySelector<HTMLCanvasElement>(".story-route-canvas");
      const runner = route?.querySelector<HTMLElement>(".story-route-runner");
      const stops = route
        ? Array.from(route.querySelectorAll<HTMLElement>(".story-stop"))
        : [];

      if (route && canvas && runner && stops.length > 0) {
        type Point = { x: number; y: number };
        let samples: Point[] = [];
        let routeProgress = 0;
        let resizeFrame = 0;

        const catmullRom = (
          point0: Point,
          point1: Point,
          point2: Point,
          point3: Point,
          amount: number,
        ): Point => {
          const amount2 = amount * amount;
          const amount3 = amount2 * amount;
          return {
            x: 0.5 * ((2 * point1.x) + (-point0.x + point2.x) * amount +
              (2 * point0.x - 5 * point1.x + 4 * point2.x - point3.x) * amount2 +
              (-point0.x + 3 * point1.x - 3 * point2.x + point3.x) * amount3),
            y: 0.5 * ((2 * point1.y) + (-point0.y + point2.y) * amount +
              (2 * point0.y - 5 * point1.y + 4 * point2.y - point3.y) * amount2 +
              (-point0.y + 3 * point1.y - 3 * point2.y + point3.y) * amount3),
          };
        };

        const sampleRoute = (points: Point[]) => {
          const nextSamples: Point[] = [];
          const steps = 44;
          for (let index = 0; index < points.length - 1; index += 1) {
            const point0 = points[Math.max(0, index - 1)];
            const point1 = points[index];
            const point2 = points[index + 1];
            const point3 = points[Math.min(points.length - 1, index + 2)];
            for (let step = 0; step < steps; step += 1) {
              nextSamples.push(catmullRom(point0, point1, point2, point3, step / steps));
            }
          }
          nextSamples.push(points[points.length - 1]);
          return nextSamples;
        };

        const drawRoute = (progress: number) => {
          const drawingContext = canvas.getContext("2d");
          if (!drawingContext || samples.length === 0) return;

          const width = route.clientWidth;
          const height = route.scrollHeight;
          drawingContext.clearRect(0, 0, width, height);
          drawingContext.lineCap = "round";
          drawingContext.lineJoin = "round";

          drawingContext.beginPath();
          drawingContext.moveTo(samples[0].x, samples[0].y);
          samples.slice(1).forEach((point) => drawingContext.lineTo(point.x, point.y));
          drawingContext.strokeStyle = "rgba(47, 43, 38, 0.17)";
          drawingContext.lineWidth = 1.25;
          drawingContext.setLineDash([3, 8]);
          drawingContext.stroke();

          const finalIndex = Math.max(
            1,
            Math.min(samples.length - 1, Math.round(progress * (samples.length - 1))),
          );
          const gradient = drawingContext.createLinearGradient(0, 0, 0, height);
          gradient.addColorStop(0, "#ff553a");
          gradient.addColorStop(0.58, "#e85e3f");
          gradient.addColorStop(1, "#9f543b");

          drawingContext.beginPath();
          drawingContext.moveTo(samples[0].x, samples[0].y);
          for (let index = 1; index <= finalIndex; index += 1) {
            const point = samples[index];
            drawingContext.lineTo(point.x, point.y);
          }
          drawingContext.setLineDash([]);
          drawingContext.strokeStyle = gradient;
          drawingContext.lineWidth = 3.25;
          drawingContext.shadowColor = "rgba(244, 81, 54, 0.24)";
          drawingContext.shadowBlur = 12;
          drawingContext.stroke();
          drawingContext.shadowBlur = 0;

          const runnerPoint = samples[finalIndex];
          gsap.set(runner, { x: runnerPoint.x - 7, y: runnerPoint.y - 7 });
        };

        const calculateRoute = () => {
          const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
          const width = route.clientWidth;
          const height = route.scrollHeight;
          const routeRect = route.getBoundingClientRect();
          canvas.width = Math.max(1, Math.round(width * pixelRatio));
          canvas.height = Math.max(1, Math.round(height * pixelRatio));
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
          canvas.getContext("2d")?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

          const dotPoints = stops.map((stop) => {
            const dot = stop.querySelector<HTMLElement>(".story-stop-dot");
            const dotRect = dot?.getBoundingClientRect();
            return {
              x: dotRect ? dotRect.left + dotRect.width / 2 - routeRect.left : width / 2,
              y: dotRect ? dotRect.top + dotRect.height / 2 - routeRect.top : 0,
            };
          });
          const points: Point[] = [
            { x: width * 0.18, y: 0 },
            ...dotPoints,
            { x: width * 0.78, y: height },
          ];
          samples = sampleRoute(points);
          drawRoute(routeProgress);
        };

        const scheduleRouteCalculation = () => {
          window.cancelAnimationFrame(resizeFrame);
          resizeFrame = window.requestAnimationFrame(calculateRoute);
        };

        scheduleRouteCalculation();
        window.addEventListener("resize", scheduleRouteCalculation);
        ScrollTrigger.addEventListener("refreshInit", scheduleRouteCalculation);

        ScrollTrigger.create({
          trigger: route,
          start: "top 68%",
          end: "bottom 72%",
          scrub: true,
          onUpdate: (self) => {
            routeProgress = self.progress;
            drawRoute(routeProgress);
          },
        });

        cleanupStoryRoute = () => {
          window.cancelAnimationFrame(resizeFrame);
          window.removeEventListener("resize", scheduleRouteCalculation);
          ScrollTrigger.removeEventListener("refreshInit", scheduleRouteCalculation);
        };
      }

      stops.forEach((stop, storyIndex) => {
        const pieces = Array.from(
          stop.querySelectorAll<HTMLElement>(".story-photo-piece"),
        );
        const copyElements = stop.querySelectorAll<HTMLElement>(
          ".story-stop-copy .label, .story-stop-copy h3, .story-stop-copy > p:last-child",
        );
        const fill = stop.querySelector<HTMLElement>(".story-stop-dot-fill");
        const note = stop.querySelector<HTMLElement>(".story-margin-note");
        const tape = stop.querySelector<HTMLElement>(".story-tape");
        const photo = stop.querySelector<HTMLElement>(".story-photo");
        const ephemera = [note, tape].filter(
          (element): element is HTMLElement => Boolean(element),
        );
        const direction = storyIndex % 2 === 0 ? -1 : 1;

        pieces.forEach((piece) => {
          const column = Number(piece.dataset.column ?? 0);
          const row = Number(piece.dataset.row ?? 0);
          gsap.set(piece, {
            autoAlpha: 0,
            x: direction * (150 + column * 38),
            y: -120 + row * 72,
            rotation: direction * (8 + column * 2) - row * 3,
            scale: 0.78,
          });
        });

        const revealTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: stop,
            start: "top 90%",
            end: "48% 57%",
            scrub: 0.75,
          },
        });
        revealTimeline
          .to(pieces, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            stagger: { each: 0.035, from: direction < 0 ? "end" : "start" },
            ease: "power3.out",
            duration: 1,
          })
          .fromTo(copyElements, {
            autoAlpha: 0,
            y: 55,
            rotation: direction * 1.5,
          }, {
            autoAlpha: 1,
            y: 0,
            rotation: 0,
            stagger: 0.08,
            ease: "power3.out",
            duration: 0.65,
          }, 0.28)
          .fromTo(ephemera, {
            autoAlpha: 0,
            scale: 0.7,
            rotation: direction * 14,
          }, {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            ease: "back.out(1.5)",
            duration: 0.45,
          }, 0.44);

        if (fill) {
          gsap.fromTo(fill, { scaleY: 0 }, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stop,
              start: "top 82%",
              end: "top 51%",
              scrub: true,
            },
          });
        }

        if (photo) {
          gsap.fromTo(photo, {
            y: 42,
            rotation: direction * 2.3,
          }, {
            y: -28,
            rotation: direction * -0.7,
            ease: "none",
            scrollTrigger: {
              trigger: stop,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        gsap.to(pieces, {
          autoAlpha: 0.06,
          x: (pieceIndex) => direction * (-95 - (pieceIndex % 4) * 34),
          y: (pieceIndex) => 80 + Math.floor(pieceIndex / 4) * 52,
          rotation: (pieceIndex) => direction * (-5 - (pieceIndex % 4) * 2),
          scale: 0.86,
          stagger: { each: 0.018, from: "center" },
          ease: "power2.in",
          scrollTrigger: {
            trigger: stop,
            start: "70% 48%",
            end: "bottom 8%",
            scrub: 0.8,
          },
        });

        gsap.to(copyElements, {
          autoAlpha: 0.14,
          y: -50,
          stagger: 0.025,
          ease: "power2.in",
          scrollTrigger: {
            trigger: stop,
            start: "75% 46%",
            end: "bottom 5%",
            scrub: true,
          },
        });
      });

      gsap.from(".method-title-line > span", {
        yPercent: 112,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".method-intro", start: "top 72%" },
      });

      gsap.from(".method-intro-copy", {
        opacity: 0,
        y: 40,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: ".method-intro-copy", start: "top 82%" },
      });

      gsap.utils.toArray<HTMLElement>(".method-step").forEach((step, index) => {
        const content = step.querySelectorAll<HTMLElement>(
          ".method-step-number, .method-step > .label, .method-step h3, .method-step > p:not(.label), .method-tools",
        );
        const progress = step.querySelector<HTMLElement>(".method-step-progress span");

        gsap.from(content, {
          opacity: 0,
          y: 38,
          rotation: index % 2 === 0 ? -0.8 : 0.8,
          stagger: 0.055,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 78%" },
        });

        if (progress) {
          gsap.fromTo(progress, { scaleX: 0 }, {
            scaleX: 1,
            transformOrigin: "left",
            ease: "none",
            scrollTrigger: {
              trigger: step,
              start: "top 79%",
              end: "bottom 44%",
              scrub: true,
            },
          });
        }
      });

      gsap.from(".method-stack-chip", {
        opacity: 0,
        scale: 0.65,
        y: 36,
        rotation: (index) => (index % 2 === 0 ? -8 : 8),
        stagger: { each: 0.06, from: "random" },
        duration: 0.7,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".method-stack", start: "top 75%" },
      });

      gsap.from(".footer-cta-line > span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".contact", start: "top 70%" },
      });
    }, root);

    return () => {
      cleanupStoryRoute();
      context.revert();
    };
  }, []);

  const manifesto =
    "Mooie plaatjes bouwen is makkelijk. Iets ontwerpen dat écht werkt, vergt nieuwsgierigheid en een scherpe dialoog. Ik wacht tot het kwartje valt. Pas als we de kern begrijpen, begin ik met ontwerpen.";

  return (
    <main ref={root} className="site-shell">
      <a className="skip-link" href="#werk">
        Ga naar het werk
      </a>

      <header className="site-header" aria-label="Hoofdnavigatie">
        <Link className="site-mark" href="#top" aria-label="Naar boven">
          <span>A</span>
          <span className="site-mark-copy">Abdelrahman<br />Digital designer</span>
        </Link>
        <nav className="top-nav">
          <a href="#werk">Werk</a>
          <a href="#over">Over</a>
          <a href="#aanpak">Aanpak</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-index label">Portfolio / 2026</p>
          <h1 id="hero-title">
            <span className="hero-line"><span>Ontwerpen voor impact,</span></span>
            <span className="hero-line hero-line-indent"><span>niet voor de spotlights.</span></span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-intro">
              Ik ben een digital designer en strategisch sparringpartner. Ik bouw
              digitale producten waar strakke structuur en out-of-the-box denken
              samenkomen. Geen loze esthetiek, maar design dat menselijke waarde
              toevoegt.
            </p>
            <p className="scroll-note label"><span aria-hidden="true">↓</span> Scroll om te ontdekken</p>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true"><span /></div>
      </section>

      <section className="manifesto" id="houding" aria-labelledby="manifesto-label">
        <p className="section-kicker" id="manifesto-label"><span>01</span> Mijn houding</p>
        <p className="manifesto-copy">
          {manifesto.split(" ").map((word, index) => (
            <span className="manifesto-word" key={`${word}-${index}`}>{word}{" "}</span>
          ))}
        </p>
        <aside className="manifesto-aside">
          <span className="label">Dualiteit als methode</span>
          <p>Vrij denken.<br />Verantwoord bouwen.</p>
        </aside>
      </section>

      <section
        className="showcase"
        id="werk"
        ref={showcase}
        style={{ backgroundColor: projects[0].bg }}
        aria-labelledby="work-title"
      >
        <div className="showcase-sticky">
          <p className="section-kicker"><span>02</span> Selected work</p>
          <div className="showcase-title-wrap">
            <p className="label">Case {projects[activeProject].number} / 06</p>
            <h2 id="work-title" aria-live="polite">{projects[activeProject].name}</h2>
          </div>
          <div className="project-dots" aria-hidden="true">
            {projects.map((project, index) => (
              <span key={project.slug} className={index === activeProject ? "is-active" : ""} />
            ))}
          </div>
        </div>

        <div className="project-stream">
          {projects.map((project, index) => (
            <article
              className={`project-entry project-${project.slug}`}
              data-bg={project.bg}
              key={project.slug}
              style={{ color: project.ink }}
            >
              <div className="project-meta label">
                <span>{project.number} / 06</span>
                <span>{project.services}</span>
              </div>
              <div className="project-visual">
                <span className="project-watermark" aria-hidden="true">{project.name}</span>
                <div className="browser-frame">
                  <div className="browser-bar" aria-hidden="true">
                    <i /><i /><i /><span>{project.slug}.concept</span>
                  </div>
                  <div className="browser-image">
                    <Image
                      src={project.image}
                      alt={`Ontwerpoverzicht van ${project.name}`}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 720px) 82vw, 53vw"
                      style={{ objectPosition: project.imagePosition }}
                    />
                  </div>
                </div>
              </div>
              <div className="project-copy">
                <h3>{project.title}</h3>
                <div>
                  <p>{project.summary}</p>
                  {project.href ? (
                    <Link className="text-link" href={project.href}>
                      Bekijk de case <span aria-hidden="true">↗</span>
                    </Link>
                  ) : (
                    <span className="text-link text-link-muted">Concept preview</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="principle" aria-label="Ontwerpprincipe">
        <p className="section-kicker"><span>03</span> De balans</p>
        <div className="principle-grid">
          <p className="principle-big">Vorm volgt <em>begrip.</em></p>
          <p>
            Structuur geeft richting. Verbeelding maakt nieuwe ruimte. Mijn werk
            ontstaat precies tussen die twee in — op het moment dat strategie en
            menselijk gedrag elkaar echt begrijpen.
          </p>
        </div>
      </section>

      <section className="about-story" id="over" aria-labelledby="about-title">
        <div className="about-story-heading">
          <p className="section-kicker"><span>04</span> De mens achter het werk</p>
          <h2 id="about-title">
            <span>Ik ontwerp met alles</span>
            <span>wat ik onderweg leer.</span>
          </h2>
          <p>Geen rechte carrièrelijn, maar een route van vragen stellen, maken, lezen, opnieuw kijken — en thuiskomen.</p>
        </div>

        <div className="story-route">
          <canvas className="story-route-canvas" aria-hidden="true" />
          <span className="story-route-runner" aria-hidden="true" />
          <div className="story-board-meta label" aria-hidden="true">
            <span>Personal field notes</span>
            <span>01 — 04</span>
          </div>
          {personalStory.map((story, index) => (
            <article
              className={`story-stop story-stop-${index + 1}`}
              key={story.step}
              style={{
                "--dot-x": story.dotX,
                "--dot-mobile-x": story.dotMobileX,
              } as CSSProperties}
            >
              <div className="story-stop-dot" aria-hidden="true">
                <span className="story-stop-dot-fill" />
                <strong>{story.step}</strong>
              </div>
              <figure className="story-photo">
                <div className="story-photo-stage" role="img" aria-label={story.alt}>
                  {storyPhotoPieces.map((piece, pieceIndex) => (
                    <span
                      className="story-photo-piece"
                      data-column={piece.column}
                      data-row={piece.row}
                      key={`${story.step}-${pieceIndex}`}
                      style={{
                        backgroundImage: `url(${story.image})`,
                        backgroundPosition: story.position,
                        clipPath: piece.clipPath,
                      }}
                    />
                  ))}
                  <span className="story-tape" aria-hidden="true" />
                </div>
                <figcaption><span>{story.caption}</span><span>© Abdelrahman</span></figcaption>
              </figure>
              <aside className="story-margin-note" aria-hidden="true">{story.note}</aside>
              <div className="story-stop-copy">
                <p className="label">{story.kicker}</p>
                <h3>
                  {story.title.split(" ").map((word, wordIndex) => (
                    <span className="story-heading-word" key={`${word}-${wordIndex}`}>{word}{" "}</span>
                  ))}
                </h3>
                <p>{story.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="method" id="aanpak" aria-labelledby="method-title">
        <div className="method-intro">
          <p className="section-kicker section-kicker-light"><span>05</span> Hoe ik werk</p>
          <h2 id="method-title">
            <span className="method-title-line"><span>Niet alleen ontwerpen.</span></span>
            <span className="method-title-line method-title-indent"><span>Het proces dirigeren.</span></span>
          </h2>
          <div className="method-intro-copy">
            <p>Mijn stack is geen gereedschapskist die het gesprek vervangt. Ze helpt om sneller van vraag naar inzicht en van inzicht naar een werkend product te bewegen.</p>
            <span className="label">Strategy → Research → Design → Direction</span>
          </div>
        </div>

        <div className="method-flow">
          {workingMethod.map((step) => (
            <article className="method-step" key={step.number}>
              <div className="method-step-progress" aria-hidden="true"><span /></div>
              <div className="method-step-number">{step.number}</div>
              <p className="label">{step.phase}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <span className="method-tools label">{step.tools}</span>
            </article>
          ))}
        </div>

        <div className="method-stack" aria-label="Mijn ontwerpstack">
          <p className="label">The working stack</p>
          <div>
            {[
              "Strategie",
              "Desk research",
              "Field research",
              "AI",
              "Figma",
              "Framer",
              "Prototyping",
              "Check-ins",
            ].map((tool) => <span className="method-stack-chip" key={tool}>{tool}</span>)}
          </div>
          <p>Tools versnellen. Richting blijft mensenwerk.</p>
        </div>
      </section>

      <footer className="contact" id="contact">
        <p className="section-kicker section-kicker-light"><span>06</span> Een goed gesprek begint hier</p>
        <h2>
          <span className="footer-cta-line"><span>Klaar om te sparren?</span></span>
          <span className="footer-cta-line footer-cta-indent"><span>Laten we het kwartje</span></span>
          <span className="footer-cta-line"><span>samen laten vallen.</span></span>
        </h2>
        <a className="contact-button" href="mailto:abdel@muminstudio.com">
          <span>Vertel me waar je aan werkt</span>
          <span aria-hidden="true">↗</span>
        </a>
        <div className="footer-meta">
          <p>Abdelrahman<br />Senior Digital Designer<br />Nederland</p>
          <div className="footer-links">
            <a href="mailto:abdel@muminstudio.com">Email</a>
            <a href="https://instagram.com/themuminstudio" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://wa.me/31634158194" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <p className="footer-credit">© 2026<br />Built with intention</p>
        </div>
      </footer>
    </main>
  );
}
