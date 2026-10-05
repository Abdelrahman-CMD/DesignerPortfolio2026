"use client";

import { CSSProperties, Fragment, MouseEvent as ReactMouseEvent, ReactNode, useEffect, useRef, useState, useSyncExternalStore } from "react";
import ArrowLeft from "lucide-react/icons/arrow-left";
import BookOpen from "lucide-react/icons/book-open";
import Coffee from "lucide-react/icons/coffee";
import Download from "lucide-react/icons/download";
import Mail from "lucide-react/icons/mail";
import Monitor from "lucide-react/icons/monitor";
import Palette from "lucide-react/icons/palette";
import Plane from "lucide-react/icons/plane";
import { Locale, localeHref } from "../i18n";
import {
  CvRol,
  CvTekst,
  cvContact,
  cvErvaring,
  cvFooter,
  cvHero,
  cvOpleiding,
  cvOver,
  cvRollen,
  cvStudies,
  cvTools,
  cvToolGroepen,
  cvVaardigheden,
  cvVaardigheidsGroepen,
  cvZoek,
} from "../data/cvContent";
import "./cv.css";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Inter+Tight:wght@300..600&family=JetBrains+Mono:wght@400;500&display=swap";

const t = (waarde: CvTekst, locale: Locale) => (locale === "en" ? waarde.en || waarde.nl : waarde.nl);

// "Op het *snijvlak* van ..." wordt "Op het <em>snijvlak</em> van ...".
function Accent({ tekst }: { tekst: string }) {
  return (
    <>
      {tekst.split("*").map((deel, i) => (i % 2 === 1 ? <em key={i}>{deel}</em> : <Fragment key={i}>{deel}</Fragment>))}
    </>
  );
}

const hobbyIconen = [BookOpen, Plane, Palette, Coffee, Monitor];

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function Tijdlijn({ rollen, locale }: { rollen: CvRol[]; locale: Locale }) {
  return (
    <div className="timeline">
      {rollen.map((rol, index) => (
        <article className="role reveal" key={`${rol.titel.nl}-${index}`}>
          <div className="role-meta">
            {t(rol.periode, locale)}
            <span className="location">{rol.locatie}</span>
            {rol.eerder ? (
              <span className="role-prior">
                <span className="prior-period">{t(rol.eerder.periode, locale)}</span>
                <span className="prior-role">{t(rol.eerder.rol, locale)}</span>
              </span>
            ) : null}
          </div>
          <div>
            <h3 className="role-title"><Accent tekst={t(rol.titel, locale)} /></h3>
            <p className="role-company">{t(rol.organisatie, locale)}</p>
            <p className="role-desc">{t(rol.tekst, locale)}</p>
            {rol.punten.length > 0 && (
              <ul className="role-list">
                {rol.punten.map((punt, i) => (
                  <li key={`punt-${i}`}>{t(punt, locale)}</li>
                ))}
              </ul>
            )}
            {rol.resultaat ? (
              <p className="role-result"><strong>{t(rol.resultaat.label, locale)}</strong> {t(rol.resultaat.tekst, locale)}</p>
            ) : null}
            {rol.verwijzing ? (
              <p className="role-result">
                <strong>{t(rol.verwijzing.label, locale)}</strong> {t(rol.verwijzing.tekst, locale)}{" "}
                <a className="role-link" href={localeHref(rol.verwijzing.href, locale)}>{t(rol.verwijzing.link, locale)}</a>.
              </p>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

function SectieKop({ eyebrow, titel, lede, id, locale }: { eyebrow: CvTekst; titel: CvTekst; lede?: CvTekst; id: string; locale: Locale }) {
  return (
    <div className="sec-head reveal">
      <p className="eyebrow">{t(eyebrow, locale)}</p>
      <h2 id={id}><Accent tekst={t(titel, locale)} /></h2>
      {lede ? <p className="lede">{t(lede, locale)}</p> : null}
    </div>
  );
}

function Sectie({ id, className, labelledBy, children }: { id: string; className?: string; labelledBy: string; children: ReactNode }) {
  return (
    <section id={id} className={className} aria-labelledby={labelledBy}>
      <div className="container">{children}</div>
    </section>
  );
}

// Donkere modus is opt-in, net als op het losse cv, en wordt onthouden in
// localStorage. De server rendert altijd licht.
type Thema = "light" | "dark";
const THEMA_EVENT = "cv-theme";

function themaLezen(): Thema {
  try {
    return window.localStorage.getItem("cv-theme") === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function themaZetten(thema: Thema) {
  try { window.localStorage.setItem("cv-theme", thema); } catch { /* opslag geblokkeerd: geldt alleen voor deze sessie niet */ }
  window.dispatchEvent(new Event(THEMA_EVENT));
}

function themaVolgen(melding: () => void) {
  window.addEventListener(THEMA_EVENT, melding);
  window.addEventListener("storage", melding);
  return () => {
    window.removeEventListener(THEMA_EVENT, melding);
    window.removeEventListener("storage", melding);
  };
}

export function CvExperience({ locale }: { locale: Locale }) {
  const root = useRef<HTMLDivElement>(null);
  const theme = useSyncExternalStore(themaVolgen, themaLezen, () => "light" as const);
  const [navHidden, setNavHidden] = useState(false);
  const nl = locale !== "en";

  const wisselThema = () => themaZetten(theme === "dark" ? "light" : "dark");

  // Blokken komen zacht omhoog zodra ze in beeld scrollen. De klasse
  // "cv-motion" staat er pas als JS draait, dus zonder JS is alles zichtbaar.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    el.classList.add("cv-motion");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    el.querySelectorAll(".reveal").forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  // Navigatie verdwijnt bij naar beneden scrollen en komt terug bij omhoog.
  useEffect(() => {
    let laatste = window.scrollY;
    let frame = 0;
    const DELTA = 10;
    const opScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        if (Math.abs(y - laatste) < DELTA) return;
        setNavHidden(y > laatste && y > 120);
        laatste = y;
      });
    };
    window.addEventListener("scroll", opScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", opScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const wisselTaal = (doel: Locale, event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try { window.localStorage.setItem("portfolio-locale", doel); } catch { /* opslag geblokkeerd: de URL kiest de taal al */ }
    window.location.assign(`${localeHref("/cv", doel)}${window.location.hash}`);
  };

  const print = () => window.print();
  const downloadLabel = nl ? "Download CV als PDF" : "Download CV as PDF";
  const linkedIn = cvContact.rijen.find((rij) => rij.href.includes("linkedin"))?.href;

  return (
    <div ref={root} className="cvx" data-theme={theme}>
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <a className="skip-link" href="#cv-main">{nl ? "Spring naar inhoud" : "Skip to content"}</a>

      <header className={`nav${navHidden ? " nav--hidden" : ""}`}>
        <div className="nav-inner">
          <div className="nav-start">
            <a className="nav-back" href={localeHref("/", locale)}>
              <ArrowLeft size={15} aria-hidden="true" />
              <span>Portfolio</span>
            </a>
            <div className="brand-slot">
              <a className="brand" href="#cv-main" aria-label={nl ? "Abdelrahman Ahmed · naar boven" : "Abdelrahman Ahmed · back to top"}>
                <span className="dot" />
                <span className="name-full">Abdelrahman Ahmed</span>
                <span className="name-mid" aria-hidden="true">Abdel Ahmed</span>
                <span className="name-short" aria-hidden="true">A.A.</span>
              </a>
            </div>
          </div>
          <nav className="nav-links" aria-label={nl ? "CV-navigatie" : "CV navigation"}>
            <a href="#over">{nl ? "Over" : "About"}</a>
            <a href="#ervaring">{nl ? "Ervaring" : "Experience"}</a>
            <a href="#vaardigheden">{nl ? "Vaardigheden" : "Skills"}</a>
            <span className="nav-icons">
              <a className="cta" href="#contact">
                <span className="cta-text">Contact</span>
                <Mail className="cta-icon" size={16} aria-hidden="true" />
              </a>
              {linkedIn ? (
                <a className="nav-icon nav-linkedin" href={linkedIn} target="_blank" rel="noreferrer" aria-label={nl ? "LinkedIn profiel (opent in nieuw tabblad)" : "LinkedIn profile (opens in new tab)"}>
                  <LinkedInIcon />
                </a>
              ) : null}
              <button className="nav-icon" type="button" onClick={print} aria-label={downloadLabel}>
                <Download size={16} aria-hidden="true" />
              </button>
              <span className="lang-pill" role="group" aria-label={nl ? "Taal" : "Language"}>
                <a href={localeHref("/cv", "nl")} aria-current={nl ? "page" : undefined} onClick={(e) => wisselTaal("nl", e)}>NL</a>
                <a href={localeHref("/cv", "en")} aria-current={nl ? undefined : "page"} onClick={(e) => wisselTaal("en", e)}>EN</a>
              </span>
              <button className="theme-toggle" type="button" onClick={wisselThema} aria-label={nl ? "Wissel licht/donker thema" : "Toggle light/dark theme"}>
                <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
              </button>
            </span>
          </nav>
        </div>
      </header>

      <main id="cv-main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container">
            <p className="eyebrow">{t(cvHero.kicker, locale)}</p>
            <h1 id="hero-title"><Accent tekst={t(cvHero.titel, locale)} /></h1>
            <p className="hero-lede">{t(cvHero.lead, locale)}</p>
            <dl className="hero-meta">
              {cvHero.feiten.map((feit, i) => (
                <div key={`feit-${i}`}>
                  <dt>{t(feit.label, locale)}</dt>
                  <dd>{t(feit.waarde, locale)} <span className="sub">{t(feit.sub, locale)}</span></dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Sectie id="over" labelledBy="over-title">
          <SectieKop id="over-title" eyebrow={cvOver.eyebrow} titel={cvOver.titel} locale={locale} />
          <div className="about-grid">
            <div className="about-body reveal">
              {cvOver.alineas.map((alinea, i) => (
                <p className={i === 0 ? "lead-p" : undefined} key={`alinea-${i}`}>{t(alinea, locale)}</p>
              ))}
            </div>
            <div className="about-side reveal">
              <div className="bio-card">
                <figure className="portrait" onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()}>
                  <picture>
                    <source srcSet="/cv/portrait.webp" type="image/webp" />
                    <img src="/cv/portrait.jpg" alt={t(cvOver.portret, locale)} width={620} height={523} loading="lazy" decoding="async" draggable={false} />
                  </picture>
                  <div className="portrait-shield" aria-hidden="true" />
                  <div className="hobbies" aria-hidden="true">
                    {cvOver.interesses.map((item, i) => {
                      const Icoon = hobbyIconen[i % hobbyIconen.length];
                      return (
                        <span className="hobby" style={{ "--i": i } as CSSProperties} key={`hobby-${i}`}>
                          <Icoon className="hobby-icon" size={15} strokeWidth={1.7} />
                          <span>{t(item, locale)}</span>
                        </span>
                      );
                    })}
                  </div>
                </figure>
                <dl className="about-aside">
                  {cvOver.details.map((detail, i) => (
                    <div className="about-aside-row" key={`detail-${i}`}>
                      <dt>{t(detail.label, locale)}</dt>
                      <dd>{t(detail.waarde, locale)}</dd>
                    </div>
                  ))}
                  <div className="about-aside-row about-aside-row--langs">
                    <dt>{t(cvOver.talenLabel, locale)}</dt>
                    <dd>
                      {cvOver.talen.map((taal, i) => (
                        <span className="lang-row" key={`taal-${i}`}>
                          <span className="lang-name">{t(taal.taal, locale)}</span>
                          <span className="lang-level">{t(taal.niveau, locale)}</span>
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Sectie>

        <Sectie id="ervaring" labelledBy="ervaring-title">
          <SectieKop id="ervaring-title" eyebrow={cvErvaring.eyebrow} titel={cvErvaring.titel} lede={cvErvaring.intro} locale={locale} />
          <Tijdlijn rollen={cvRollen} locale={locale} />
        </Sectie>

        <Sectie id="opleiding" labelledBy="opleiding-title">
          <SectieKop id="opleiding-title" eyebrow={cvOpleiding.eyebrow} titel={cvOpleiding.titel} locale={locale} />
          <Tijdlijn rollen={cvStudies} locale={locale} />
        </Sectie>

        <Sectie id="vaardigheden" labelledBy="vaardigheden-title">
          <SectieKop id="vaardigheden-title" eyebrow={cvVaardigheden.eyebrow} titel={cvVaardigheden.titel} locale={locale} />
          <div className="skills-grid reveal">
            {cvVaardigheidsGroepen.map((groep, i) => (
              <div className="skill-col" key={`vaardigheid-${i}`}>
                <h3>{t(groep.titel, locale)}</h3>
                <ul>
                  {groep.items.map((item, j) => (
                    <li key={`v-${i}-${j}`}>{t(item, locale)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Sectie>

        <Sectie id="tools" labelledBy="tools-title">
          <SectieKop id="tools-title" eyebrow={cvTools.eyebrow} titel={cvTools.titel} locale={locale} />
          <div className="tools-grid reveal">
            {cvToolGroepen.map((groep, i) => (
              <div className="tools-col" key={`tool-${i}`}>
                <h3>{t(groep.titel, locale)}</h3>
                <div className="tools-list">
                  {groep.items.map((item, j) => (
                    <span className="tool-tag" key={`t-${i}-${j}`}>{t(item, locale)}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Sectie>

        <Sectie id="op-zoek" className="seeking" labelledBy="seeking-title">
          <SectieKop id="seeking-title" eyebrow={cvZoek.eyebrow} titel={cvZoek.titel} lede={cvZoek.intro} locale={locale} />
          <div className="seeking-grid">
            {cvZoek.items.map((item, i) => (
              <div className="seeking-card reveal" key={`zoek-${i}`}>
                <p className="card-label">{t(item.label, locale)}</p>
                <h4>{t(item.titel, locale)}</h4>
                <p>{t(item.tekst, locale)}</p>
              </div>
            ))}
          </div>
        </Sectie>

        <Sectie id="contact" className="cv-contact" labelledBy="contact-title">
          <p className="eyebrow">{t(cvContact.eyebrow, locale)}</p>
          <p className="status-label">
            <span className="status-dot" aria-hidden="true">
              <span className="status-dot-pulse" />
              <span className="status-dot-core" />
            </span>
            <span>{t(cvContact.status, locale)}</span>
          </p>
          <h2 id="contact-title"><Accent tekst={t(cvContact.titel, locale)} /></h2>
          <dl className="contact-grid">
            {cvContact.rijen.map((rij, i) => (
              <div className="contact-row" key={`contact-${i}`}>
                <dt>{t(rij.label, locale)}</dt>
                <dd>
                  <a href={rij.href} {...(rij.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{rij.waarde}</a>
                </dd>
              </div>
            ))}
          </dl>
          <button className="cv-download" type="button" onClick={print} aria-label={downloadLabel}>
            <Download size={16} strokeWidth={1.7} aria-hidden="true" />
            <span>{t(cvContact.download, locale)}</span>
          </button>
        </Sectie>
      </main>

      <footer className="footer">
        <span className="footer-mark" aria-hidden="true">●</span>
        <span className="footer-line">{t(cvFooter.regel, locale)}</span>
        <span className="footer-meta">{t(cvFooter.meta, locale)}</span>
      </footer>
    </div>
  );
}
