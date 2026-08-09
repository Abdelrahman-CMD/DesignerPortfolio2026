"use client";

import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
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

      gsap.from(".footer-cta-line > span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".contact", start: "top 70%" },
      });
    }, root);

    return () => context.revert();
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

      <section className="manifesto" id="over" aria-labelledby="manifesto-label">
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
          <p className="section-kicker"><span>02</span> Selected concepts</p>
          <div className="showcase-title-wrap">
            <p className="label">Case {projects[activeProject].number} / 04</p>
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
                <span>{project.number} / 04</span>
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

      <footer className="contact" id="contact">
        <p className="section-kicker section-kicker-light"><span>04</span> Een goed gesprek begint hier</p>
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
