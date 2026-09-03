"use client";

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { EditorialCase } from "../data/caseContent";
import { LanguageSwitcher, Locale, localeHref, translateText } from "../i18n";

const prototypeContent = {
  guidance: {
    label: "Journey matcher",
    question: "Welke reis past bij jouw intentie?",
    options: ["Umrah", "Hajj", "Familie"],
    results: {
      Umrah: ["Umrah · 10 dagen", "Kleine groep · dichtbij de Haram"],
      Hajj: ["Hajj · complete begeleiding", "Gids, verblijf, vervoer en visa"],
      Familie: ["Umrah · family pace", "Rustmomenten · kindvriendelijk verblijf"],
    },
  },
  bayn: {
    label: "Your local pulse",
    question: "Welke signalen zijn vandaag relevant?",
    options: ["Visa", "Verkeer", "Lokaal leven"],
    results: {
      Visa: ["Visa policy update", "Belangrijk · 18 min geleden"],
      Verkeer: ["Route naar Al-Haram gewijzigd", "Omleiding · vanaf 16:00"],
      "Lokaal leven": ["3 buurtinzichten voor deze week", "Door bewoners geverifieerd"],
    },
  },
  ayn: {
    label: "Personal learning path",
    question: "Waar wil je jouw kennis verdiepen?",
    options: ["Fundament", "Arabisch", "Fiqh"],
    results: {
      Fundament: ["Aqeedah Starter Path", "3 boeken · 1 live sessie"],
      Arabisch: ["Vocabulary for seekers", "4 weken · guided support"],
      Fiqh: ["Fiqh foundations", "Van basis naar klassieke tekst"],
    },
  },
  hijaman: {
    label: "Treatment finder",
    question: "Waar heb je vandaag behoefte aan?",
    options: ["Hijama", "Ontspanning", "Warmte"],
    results: {
      Hijama: ["Wet Cupping", "€55 · 60—90 min"],
      Ontspanning: ["Relax Massage", "€55 · 60 min"],
      Warmte: ["Hot Stone Massage", "€55 · 45 min"],
    },
  },
  atotz: {
    label: "Talent matcher",
    question: "Welke expertise heeft je team nodig?",
    options: ["Techniek", "Zorg", "IT"],
    results: {
      Techniek: ["Technisch personeel", "Eerste profielen binnen 24 uur"],
      Zorg: ["Betrokken zorgprofessionals", "Menselijke match · flexibel inzetbaar"],
      IT: ["IT-specialisten", "Direct waarde in projecten"],
    },
  },
  oppas: {
    label: "Family fit",
    question: "Waar heeft jullie gezin vooral behoefte aan?",
    options: ["Babyzorg", "Bedtijd", "Gezinsritme"],
    results: {
      Babyzorg: ["Vertrouwde babyzorg", "Voeding · slaap · een rustige update"],
      Bedtijd: ["Een herkenbare bedtijdroutine", "Pyjama · boekje · heldere overdracht"],
      Gezinsritme: ["Oppas die thuis aansluit", "Eten · spel · afspraken vooraf"],
    },
  },
} as const;

export function EditorialCaseExperience({ project, locale = "nl" }: { project: EditorialCase; locale?: Locale }) {
  const root = useRef<HTMLElement>(null);
  const tx = (value: string) => translateText(locale, value);
  const prototype = prototypeContent[project.prototype];
  const [selection, setSelection] = useState<string>(prototype.options[0]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".ec-nav", { opacity: 0, y: -16, duration: 0.65 })
        .from(".ec-title-line > span", {
          yPercent: 115,
          duration: 1.1,
          stagger: 0.08,
        }, "-=0.25")
        .from(".ec-hero-copy > p, .ec-meta", {
          opacity: 0,
          y: 24,
          duration: 0.75,
          stagger: 0.08,
        }, "-=0.55")
        .from(".ec-featured", {
          opacity: 0,
          y: 80,
          scale: 0.96,
          duration: 1.05,
        }, "-=0.65");

      gsap.to(".ec-featured", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".ec-hero",
          start: "40% center",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".ec-reveal").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 52,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 84%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".ec-shot-media").forEach((element) => {
        const image = element.querySelector("img");
        if (!image) return;
        gsap.fromTo(image, { yPercent: -3 }, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.from(".ec-insight-rule", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".ec-insight-quote", start: "top 75%" },
      });
    }, root);

    return () => context.revert();
  }, [project.slug]);

  const result = prototype.results[selection as keyof typeof prototype.results] as
    | readonly [string, string]
    | undefined;

  const style = {
    "--case-bg": project.heroBg,
    "--case-hero-ink": project.heroInk,
    "--case-ink": project.contentInk ?? project.heroInk,
    "--case-footer-ink": project.footerInk ?? project.contentInk ?? project.heroInk,
    "--case-accent": project.accent,
    "--case-surface": project.surface,
    "--case-dark": project.dark,
  } as CSSProperties;

  return (
    <main ref={root} className={`editorial-case editorial-case-${project.prototype}`} style={style}>
      <a className="skip-link" href="#case-story">{tx("Ga naar de case")}</a>

      <nav className="ec-nav" aria-label={tx("Case navigatie")}>
        <a href={localeHref("/#werk", locale)} className="case-back"><span aria-hidden="true">←</span> {tx("Alle cases")}</a>
        <a href={localeHref("/", locale)} className="case-brand">Abdelrahman / Product &amp; UX/UI designer</a>
        <div className="ec-nav-actions"><a href="mailto:dhr_abdelrahman@outlook.com">{tx("Start een gesprek")}</a><LanguageSwitcher locale={locale} path={`/cases/${project.slug}`} tone={project.prototype === "atotz" ? "dark" : "light"} /></div>
      </nav>

      <header className="ec-hero">
        <div className="ec-hero-grid" aria-hidden="true" />
        <div className="ec-hero-copy">
          <p className="section-kicker"><span>Case {project.number}</span> {tx(project.eyebrow)}</p>
          <h1>
            {(project.titleLines ?? [project.name]).map((line, index) => (
              <span className={`ec-title-line ec-title-line-${index + 1}`} key={line}><span>{line}</span></span>
            ))}
          </h1>
          <p className="ec-hero-headline">{tx(project.headline)}</p>
          <dl className="ec-meta">
            <div><dt>{tx("Rol")}</dt><dd>{tx(project.role)}</dd></div>
            <div><dt>Focus</dt><dd>{tx(project.focus)}</dd></div>
            <div><dt>{tx(project.yearLabel ?? "Jaar")}</dt><dd>{tx(project.year)}</dd></div>
          </dl>
        </div>
        <figure className="ec-featured">
          <Image
            src={project.featured}
            alt={tx(project.featuredAlt ?? `${project.name} projectoverzicht`)}
            fill
            priority
            sizes="94vw"
          />
          <figcaption><span>Project overview</span><span>{tx(project.creditLine ?? "Concept / UX/UI / Strategy")}</span></figcaption>
        </figure>
      </header>

      <article id="case-story">
        <section className="ec-context">
          <p className="section-kicker"><span>01</span> Context</p>
          <header className="ec-context-grid ec-reveal">
            <h2>{tx(project.contextTitle)}</h2>
            <div>
              <p className="ec-context-lead">{tx(project.contextLead)}</p>
              <p>{tx(project.contextBody)}</p>
            </div>
          </header>
        </section>

        <section className="ec-insight">
          <p className="section-kicker section-kicker-light"><span>02</span> {tx("Het kwartje")}</p>
          <blockquote className="ec-insight-quote ec-reveal">
            <span className="ec-insight-rule" aria-hidden="true" />
            “{tx(project.insightQuote)}”
          </blockquote>
          <p className="ec-insight-body ec-reveal">{tx(project.insightBody)}</p>
        </section>

        <section className="ec-concept">
          <header className="ec-concept-heading ec-reveal">
            <p className="section-kicker"><span>03</span> {tx("Het concept")}</p>
            <h2>{tx(project.conceptTitle)}</h2>
          </header>

          <div className="ec-duality ec-reveal">
            <article>
              <span className="ec-duality-index">A</span>
              <p className="label">Freedom / Out-of-the-box</p>
              <h3>{tx(project.freedomTitle)}</h3>
              <p>{tx(project.freedomBody)}</p>
            </article>
            <article>
              <span className="ec-duality-index">B</span>
              <p className="label">Responsibility / Structure</p>
              <h3>{tx(project.responsibilityTitle)}</h3>
              <p>{tx(project.responsibilityBody)}</p>
            </article>
          </div>

          <div className="ec-prototype ec-reveal">
            <div className="ec-prototype-copy">
              <p className="label">Interactive thought</p>
              <h3>{tx(prototype.question)}</h3>
              <p>{tx("Probeer het principe. De interface verandert mee met de behoefte, maar houdt de keuze rustig en overzichtelijk.")}</p>
            </div>
            <div className="ec-prototype-ui">
              <div className="ec-prototype-top">
                <span className="label">{tx(prototype.label)}</span>
                <span className="ec-live-dot">{tx("Live concept")}</span>
              </div>
              <div className="ec-prototype-options" role="group" aria-label={prototype.question}>
                {prototype.options.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={selection === option ? "is-active" : ""}
                    aria-pressed={selection === option}
                    onClick={() => setSelection(option)}
                  >
                    {tx(option)}
                  </button>
                ))}
              </div>
              <div className="ec-prototype-result" aria-live="polite">
                <span className="label">{tx("Persoonlijke uitkomst")}</span>
                <strong>{result?.[0] ? tx(result[0]) : null}</strong>
                <small>{result?.[1] ? tx(result[1]) : null}</small>
                <div className="ec-result-line"><span /></div>
                <button type="button">{tx("Bekijk de volgende stap")} <span aria-hidden="true">↗</span></button>
              </div>
            </div>
          </div>

          <ol className="ec-feature-list ec-reveal">
            {project.features.map((feature, index) => (
              <li key={feature}><span>0{index + 1}</span>{tx(feature)}</li>
            ))}
          </ol>
        </section>

        <section className="ec-system">
          <header className="ec-system-heading ec-reveal">
            <p className="section-kicker"><span>04</span> Design system</p>
            <h2>{tx("Een visuele stem die het concept draagt.")}</h2>
            <p>{tx("Typografie en kleur zijn geen decoratie. Ze helpen de gebruiker begrijpen wat belangrijk is, wat vertrouwd voelt en waar actie nodig is.")}</p>
          </header>
          <div className="ec-type ec-reveal">
            <div><span>Aa</span><p>{project.headingFont}<small>Headlines / identity</small></p></div>
            <div><span>Aa</span><p>{project.bodyFont}<small>Body / interface / clarity</small></p></div>
          </div>
          <div className="ec-palette">
            {project.colors.map((color) => (
              <div
                className="ec-color ec-reveal"
                key={color.name}
                style={{ background: color.hex, color: color.text ?? project.contentInk ?? project.heroInk }}
              >
                <span>{color.name}</span><small>{color.hex}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="ec-gallery">
          <header className="ec-gallery-heading ec-reveal">
            <p className="section-kicker"><span>05</span> {tx("De ervaring")}</p>
            <h2>{tx("Van principe naar product.")}</h2>
            <p>{tx(project.galleryIntro ?? "De belangrijkste schermen uit het concept, rechtstreeks uit de casepresentatie.")}</p>
          </header>
          <div className="ec-shot-grid">
            {project.shots.map((shot, index) => (
              <figure className={`ec-shot ec-shot-${index + 1} ${shot.src.includes("-site-") ? "ec-shot-website" : ""} ec-reveal`} key={shot.src}>
                <div className="ec-shot-media">
                  <Image src={shot.src} alt={tx(shot.alt)} fill sizes={index === 0 ? "92vw" : "46vw"} />
                </div>
                <figcaption><span>0{index + 1}</span><span>{tx(shot.caption)}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="ec-impact">
          <p className="section-kicker section-kicker-light"><span>06</span> {tx("De bijdrage")}</p>
          <div className="ec-impact-grid ec-reveal">
            <h2>{tx(project.impactTitle)}</h2>
            <div>
              {project.impactBody.map((paragraph) => <p key={paragraph}>{tx(paragraph)}</p>)}
              {project.externalUrl ? (
                <a className="ec-live-link" href={project.externalUrl} target="_blank" rel="noreferrer">
                  {tx("Bekijk de live website")} <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>
          </div>
          <dl className="ec-stats ec-reveal">
            {project.stats.map((stat) => (
              <div key={stat.label}><dt>{stat.value}</dt><dd>{tx(stat.label)}</dd></div>
            ))}
          </dl>
        </section>
      </article>

      <footer className="ec-footer">
        <p className="section-kicker">
          <span>{locale === "en" ? "Next" : "Volgende"}</span> {locale === "en" ? "case study" : "case"}
        </p>
        <a href={localeHref(`/cases/${project.next.slug}`, locale)}>
          <span>{project.next.name}</span><span aria-hidden="true">↗</span>
        </a>
        <div><span>Abdelrahman / Product &amp; UX/UI designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
