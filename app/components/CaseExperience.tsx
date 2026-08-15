"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Native document navigation avoids a vinext RSC link interception failure. */

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const routeModes = {
  reflection: {
    label: "Reflectie",
    title: "Een stille ochtend dichtbij de Haram",
    meta: "3 plekken · 42 min · rustig tempo",
  },
  family: {
    label: "Familie",
    title: "Ruimte voor kinderen en ouderen",
    meta: "4 plekken · 68 min · rolstoelvriendelijk",
  },
  culture: {
    label: "Lokale cultuur",
    title: "Boeken, dadels en verhalen van de stad",
    meta: "5 plekken · 91 min · lokaal samengesteld",
  },
} as const;

type RouteMode = keyof typeof routeModes;

export function CaseExperience() {
  const root = useRef<HTMLElement>(null);
  const [routeMode, setRouteMode] = useState<RouteMode>("reflection");
  const [offline, setOffline] = useState(true);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".case-nav", { opacity: 0, y: -16, duration: 0.65 })
        .from(".case-title-line > span", {
          yPercent: 115,
          duration: 1.15,
          stagger: 0.1,
        }, "-=0.3")
        .from(".case-lede, .case-meta", {
          opacity: 0,
          y: 20,
          duration: 0.75,
          stagger: 0.08,
        }, "-=0.55")
        .from(".case-device", {
          opacity: 0,
          y: 80,
          rotate: 1.5,
          duration: 1.1,
        }, "-=0.75");

      gsap.to(".case-device", {
        yPercent: -18,
        rotate: -1,
        ease: "none",
        scrollTrigger: {
          trigger: ".case-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".case-hero-map", {
        yPercent: 12,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: ".case-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 55,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 84%" },
        });
      });

      gsap.from(".insight-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.15,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".insight-quote", start: "top 72%" },
      });

      gsap.from(".palette-chip", {
        y: 36,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: ".design-system", start: "top 70%" },
      });
    }, root);

    return () => context.revert();
  }, []);

  const activeRoute = routeModes[routeMode];

  return (
    <main ref={root} className="case-page">
      <a className="skip-link" href="#case-content">Ga naar de case</a>

      <nav className="case-nav" aria-label="Case navigatie">
        <a href="/#werk" className="case-back"><span aria-hidden="true">←</span> Alle cases</a>
        <a href="/" className="case-brand">Abdelrahman / Digital designer</a>
        <a href="mailto:abdel@muminstudio.com">Start een gesprek</a>
      </nav>

      <header className="case-hero">
        <div className="case-hero-map" aria-hidden="true">
          <span className="map-road map-road-one" />
          <span className="map-road map-road-two" />
          <span className="map-road map-road-three" />
          <i className="map-pin pin-one" /><i className="map-pin pin-two" />
          <i className="map-pin pin-three" /><i className="map-pin pin-four" />
          <span className="map-city city-medina">AL MADINAH</span>
          <span className="map-city city-mecca">MAKKAH</span>
        </div>
        <div className="case-hero-copy">
          <p className="section-kicker"><span>Case 01</span> Visionary concept</p>
          <h1>
            <span className="case-title-line"><span>Tareeqi</span></span>
          </h1>
          <p className="case-lede">Navigating Mecca &amp; Medina<br />beyond the obvious.</p>
          <dl className="case-meta">
            <div><dt>Rol</dt><dd>Concept &amp; Strategy<br />UX/UI Design</dd></div>
            <div><dt>Focus</dt><dd>Discovery<br />Accessibility</dd></div>
            <div><dt>Jaar</dt><dd>2025</dd></div>
          </dl>
        </div>
        <div className="case-device" aria-label="Tareeqi interface in een browservenster">
          <div className="browser-bar"><i /><i /><i /><span>tareeqi.app</span></div>
          <div className="browser-image">
            <Image
              src="/projects/home/tareeqi.webp"
              alt="Tareeqi concept gepresenteerd op twee laptops"
              fill
              priority
              sizes="(max-width: 720px) 92vw, 52vw"
            />
          </div>
        </div>
      </header>

      <div id="case-content">
        <section className="case-intro reveal-up">
          <p className="section-kicker"><span>01</span> Context</p>
          <div className="case-intro-grid">
            <h2>De reis eindigt niet bij de rituelen.</h2>
            <div>
              <p className="case-intro-lead">
                Miljoenen pelgrims bezoeken Mekka en Medina, maar bewegen langs
                dezelfde bekende routes. De rustige moskee, het boekwinkeltje van
                een lokale geleerde of dat ene dak met uitzicht blijft vaak buiten
                beeld.
              </p>
              <p>
                Tareeqi is een digitale reisgenoot: een community-gedreven kaart met
                betekenisvolle plekken, betrouwbare context en routes die passen bij
                het tempo en de intentie van de bezoeker.
              </p>
            </div>
          </div>
        </section>

        <section className="insight">
          <p className="section-kicker section-kicker-light"><span>02</span> Het kwartje</p>
          <blockquote className="insight-quote reveal-up">
            <span className="insight-line" aria-hidden="true" />
            “De echte diepte van een plek staat niet op de kaart. Ze leeft bij de
            mensen die er elke dag lopen.”
          </blockquote>
          <p className="insight-note reveal-up">
            Dus werd lokale kennis geen extra contentlaag, maar het fundament van
            het product. Elke route begint bij een menselijke behoefte: rust,
            reflectie, toegankelijkheid of nieuwsgierigheid.
          </p>
        </section>

        <section className="duality" aria-labelledby="duality-title">
          <div className="duality-heading reveal-up">
            <p className="section-kicker"><span>03</span> Het concept</p>
            <h2 id="duality-title">Vrijheid om te ontdekken.<br /><em>Structuur om te vertrouwen.</em></h2>
          </div>

          <article className="concept-panel freedom-panel reveal-up">
            <div className="concept-copy">
              <span className="concept-number">A</span>
              <p className="label">Freedom / Out-of-the-box</p>
              <h3>Een route die begint met een gevoel.</h3>
              <p>
                Geen klassiek zoekveld met categorieën als vertrekpunt. De Smart
                Discovery Assistant vertaalt een intentie — kalmte, familie of
                lokale cultuur — naar een persoonlijke route.
              </p>
            </div>
            <div className="route-demo" aria-label="Interactieve routekeuze">
              <p className="route-prompt">Waar heb je vandaag behoefte aan?</p>
              <div className="route-options" role="group" aria-label="Kies een route">
                {(Object.keys(routeModes) as RouteMode[]).map((mode) => (
                  <button
                    type="button"
                    key={mode}
                    className={routeMode === mode ? "is-active" : ""}
                    onClick={() => setRouteMode(mode)}
                    aria-pressed={routeMode === mode}
                  >
                    {routeModes[mode].label}
                  </button>
                ))}
              </div>
              <div className="route-map" aria-hidden="true">
                <span className="route-line" />
                <i className="route-node node-a" /><i className="route-node node-b" />
                <i className="route-node node-c" /><i className="route-node node-d" />
              </div>
              <div className="route-result" aria-live="polite">
                <span className="label">Voorgestelde route</span>
                <strong>{activeRoute.title}</strong>
                <small>{activeRoute.meta}</small>
              </div>
            </div>
          </article>

          <article className="concept-panel responsibility-panel reveal-up">
            <div className="concept-copy">
              <span className="concept-number">B</span>
              <p className="label">Responsibility / UX structure</p>
              <h3>Vrij bewegen, ook als de verbinding wegvalt.</h3>
              <p>
                Betrouwbaarheid betekent hier: geen stress in drukte, routes voor
                ouderen en gezinnen, en essentiële informatie die vooraf op het
                toestel staat.
              </p>
              <ul className="responsibility-list">
                <li><span>01</span> Elder-friendly routing</li>
                <li><span>02</span> Prayer &amp; rest stops</li>
                <li><span>03</span> Arabic + English</li>
              </ul>
            </div>
            <div className={`offline-card ${offline ? "is-offline" : ""}`}>
              <div className="offline-top">
                <span className="label">Tareeqi / Map status</span>
                <button
                  type="button"
                  onClick={() => setOffline((value) => !value)}
                  aria-pressed={offline}
                >
                  <span /> {offline ? "Offline ready" : "Online"}
                </button>
              </div>
              <div className="offline-map" aria-hidden="true">
                <span className="offline-road road-a" /><span className="offline-road road-b" />
                <i className="offline-pin op-one" /><i className="offline-pin op-two" />
                <i className="offline-pin op-three" />
                <span className="offline-person">●</span>
              </div>
              <div className="download-state">
                <span><i style={{ width: offline ? "100%" : "46%" }} /></span>
                <p>{offline ? "Route opgeslagen · 12.4 MB" : "Route synchroniseren"}</p>
              </div>
            </div>
          </article>
        </section>

        <section className="design-system">
          <div className="design-system-heading reveal-up">
            <p className="section-kicker"><span>04</span> Design system</p>
            <h2>Warm als de plek.<br />Helder als de route.</h2>
            <p>
              Canela geeft culturele diepte aan de grote statements. Inter houdt de
              kaart, filters en route-informatie rustig en scanbaar.
            </p>
          </div>
          <div className="type-specimen reveal-up">
            <div className="type-serif"><span>Aa</span><p>Canela Text<br /><small>Headlines / editorial moments</small></p></div>
            <div className="type-sans"><span>Aa</span><p>Inter<br /><small>Interface / wayfinding / body</small></p></div>
          </div>
          <div className="palette" aria-label="Tareeqi kleurenpalet">
            <div className="palette-chip color-chocolate"><span>Dark Chocolate</span><small>#2D2A26</small></div>
            <div className="palette-chip color-nude"><span>Dark Nude</span><small>#B9A392</small></div>
            <div className="palette-chip color-cream"><span>Light Cream</span><small>#F9F6F0</small></div>
            <div className="palette-chip color-green"><span>Discovery Green</span><small>#6C9F5E</small></div>
          </div>
        </section>

        <section className="case-gallery">
          <div className="gallery-heading reveal-up">
            <p className="section-kicker"><span>05</span> In context</p>
            <h2>Show, don’t tell.</h2>
            <p>Van de eerste stadskeuze tot een lokaal samengestelde route: de interface blijft op de achtergrond en laat de plek spreken.</p>
          </div>
          <figure className="case-gallery-image reveal-up">
            <div className="case-gallery-media">
              <Image
                src="/projects/case-shots/tareeqi-map.webp"
                alt="Tareeqi kaartinterface met filters en lokale plekken"
                fill
                sizes="92vw"
              />
            </div>
            <figcaption><span>Map discovery</span><span>Desktop experience / Mecca</span></figcaption>
          </figure>
        </section>

        <section className="impact">
          <p className="section-kicker section-kicker-light"><span>06</span> De bijdrage</p>
          <div className="impact-grid reveal-up">
            <h2>Een route naar meer dan een bestemming.</h2>
            <div>
              <p>
                Tareeqi overbrugt de kloof tussen de wens om dieper te reizen en de
                praktische realiteit van drukke steden, beperkte verbinding en
                uiteenlopende mobiliteit.
              </p>
              <p>
                Als concept laat het zien hoe een kaartplatform tegelijk meer lokaal,
                inclusiever en persoonlijker kan zijn — zonder de gebruiker te
                overladen. De mogelijke impact zit niet in méér plekken afvinken,
                maar in betekenisvollere momenten vinden.
              </p>
            </div>
          </div>
          <dl className="impact-stats reveal-up">
            <div><dt>1,200+</dt><dd>unieke plekken in het concept</dd></div>
            <div><dt>2</dt><dd>talen vanaf de basis</dd></div>
            <div><dt>1</dt><dd>community als kompas</dd></div>
          </dl>
        </section>
      </div>

      <footer className="case-footer">
        <p className="section-kicker"><span>Next</span> Volgende case</p>
        <a href="/cases/ayn-al-hikmah"><span>Ayn Al-Hikmah</span><span aria-hidden="true">↗</span></a>
        <div><span>Abdelrahman / Digital designer</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
