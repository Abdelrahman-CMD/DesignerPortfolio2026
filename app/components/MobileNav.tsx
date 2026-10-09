"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Linkedin from "lucide-react/icons/linkedin";
import Mail from "lucide-react/icons/mail";
import MessageCircle from "lucide-react/icons/message-circle";
import { LanguageSwitcher, Locale, localeHref } from "../i18n";

/* De navigatie voor smalle schermen, naar het ontwerp van Abdelrahman.

   Waarom hij bestaat: op de brede header staan de pil, vijf tekstknoppen en de
   taalschakelaar naast elkaar. Onder ongeveer 860px raken die elkaar - gemeten
   op 810px stonden de pil en de navigatie met nul tussenruimte tegen elkaar -
   en daaronder knipte .site-shell (overflow-x: clip) de taalschakelaar stil af.
   Vanaf dat punt neemt deze knop het over.

   De drie streken in het icoon zijn met de hand getrokken van vorm: ze lopen
   licht golvend en zijn niet even lang, zodat ze bij het merk horen in plaats
   van bij een standaard hamburgermenu. */

const MERK_ROOD = "#B83225";

function Streken() {
  return (
    <svg viewBox="0 0 34 24" aria-hidden="true" focusable="false" className="mnav-strokes">
      <g fill={MERK_ROOD}>
        {/* bovenste streek - korter, loopt naar rechts iets omhoog */}
        <path d="M6.6 4.1c2.1-.6 4.3-.9 6.5-1 2.6-.2 5.2-.1 7.8.2 1.4.2 2.8.4 4.1.9.5.2.9.5 1 1 .1.6-.3 1.2-.9 1.4-.9.3-1.9.3-2.8.2-3.3-.3-6.6-.5-9.9-.3-1.8.1-3.6.3-5.4.7-.7.1-1.5.3-2.2.1-.6-.2-1-.8-.8-1.4.2-.7.9-1 1.6-1.2Z" />
        {/* middelste streek - de langste, met een duidelijke golf */}
        <path d="M3.4 11.3c2.6-.7 5.3-1 8-1.2 3.9-.2 7.9-.1 11.8.4 1.9.2 3.8.5 5.6 1.1.6.2 1.2.5 1.4 1.1.2.7-.3 1.4-1 1.6-1 .3-2 .2-3 .1-4.2-.5-8.4-.8-12.6-.6-2.8.1-5.6.4-8.3 1-.8.2-1.7.4-2.4 0-.7-.4-.9-1.3-.5-1.9.3-.4.7-.5 1-.6Z" />
        {/* onderste streek - korter, zakt naar rechts iets weg */}
        <path d="M6.2 18.6c2.3-.6 4.6-.9 7-1 2.7-.2 5.5-.1 8.2.3 1.3.2 2.6.4 3.8.9.6.2 1 .7 1 1.3-.1.6-.6 1.1-1.2 1.1-1 .1-2 0-3-.2-3.2-.4-6.5-.6-9.7-.4-1.7.1-3.5.3-5.2.7-.7.2-1.5.3-2.1 0-.6-.3-.9-1-.6-1.6.2-.6.8-.9 1.4-1.1Z" />
      </g>
    </svg>
  );
}

const items = [
  { nummer: "01", nl: "Werk", en: "Work", href: "#werk", extern: false },
  { nummer: "02", nl: "Over", en: "About", href: "#over", extern: false },
  { nummer: "03", nl: "Aanpak", en: "Approach", href: "#aanpak", extern: false },
  { nummer: "04", nl: "Contact", en: "Contact", href: "#contact", extern: false },
  { nummer: "05", nl: "CV", en: "CV", href: "/cv", extern: true },
] as const;

const kanalen = [
  { naam: "WhatsApp", href: "https://wa.me/31621572124", icoon: "whatsapp" },
  { naam: "Outlook", href: "mailto:dhr_abdelrahman@outlook.com", icoon: "mail" },
  { naam: "LinkedIn", href: "https://www.linkedin.com/in/abdelrahman-ahmed-30896964/", icoon: "linkedin" },
] as const;

/* Dezelfde iconen als in de navigatiebalk en de ansichtkaart, in dezelfde
   .link-icon-huls. Daarmee erven ze het hele gedrag van de desktoplinks: de
   huls klapt open bij aanwijzen en de lijnen tekenen zichzelf via
   stroke-dashoffset. Mijn eigen getekende svg's deden dat geen van beide. */
const kanaalIcoon = {
  whatsapp: MessageCircle,
  mail: Mail,
  linkedin: Linkedin,
} as const;

export function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  /* Het paneel hangt aan document.body in plaats van aan de header. De header
     krijgt een transform van GSAP, en een element met position: fixed rekent
     dan vanaf die header in plaats van vanaf het scherm - het paneel werd zo
     platgedrukt tot de hoogte van de balk.

     Portalen kan alleen in de browser, en dat is hier geen probleem: open kan
     uitsluitend true worden door een klik, dus op dat moment staan we per
     definitie niet meer op de server. */
  const paneelId = useId();
  const knop = useRef<HTMLButtonElement>(null);
  const paneel = useRef<HTMLDivElement>(null);
  /* Waar we na het sluiten heen willen. Dit moet via een ref, omdat de
     scroll-lock hieronder de oude positie terugzet bij het opruimen; deed de
     klik de scroll zelf, dan won dat terugzetten en bleef je bovenaan. */
  const doel = useRef<string | null>(null);

  // Escape sluit, en de focus gaat terug naar de knop waar hij vandaan kwam.
  useEffect(() => {
    if (!open) return;
    const bijToets = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        knop.current?.focus();
      }
    };
    window.addEventListener("keydown", bijToets);
    return () => window.removeEventListener("keydown", bijToets);
  }, [open]);

  /* Zolang het menu openstaat mag de pagina erachter niet meescrollen. De
     scrollpositie wordt vastgehouden en teruggezet, anders springt de bezoeker
     na het sluiten naar boven. */
  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    const body = document.body;
    const vorige = { position: body.style.position, top: body.style.top, width: body.style.width };
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";
    return () => {
      body.style.position = vorige.position;
      body.style.top = vorige.top;
      body.style.width = vorige.width;
      window.scrollTo(0, y);

      // Pas nu de pagina weer normaal scrollt, kan er een doel aangelopen worden.
      const naar = doel.current;
      doel.current = null;
      if (!naar) return;
      const sectie = document.querySelector(naar);
      if (!sectie) return;
      const top = sectie.getBoundingClientRect().top + window.scrollY;
      const stil = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: stil ? "auto" : "smooth" });
    };
  }, [open]);

  // Een klik buiten het paneel sluit het.
  useEffect(() => {
    if (!open) return;
    const bijKlik = (event: MouseEvent) => {
      const doel = event.target as Node;
      if (paneel.current?.contains(doel) || knop.current?.contains(doel)) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", bijKlik);
    return () => window.removeEventListener("pointerdown", bijKlik);
  }, [open]);

  const ga = (href: string, extern: boolean) => (event: { preventDefault: () => void }) => {
    if (extern) return; // laat de browser de cv-pagina gewoon openen
    event.preventDefault();
    doel.current = href;
    setOpen(false);
  };

  return (
    <div className={`mobile-nav${open ? " is-open" : ""}`} data-mobile-nav>
      <button
        ref={knop}
        type="button"
        className="mnav-toggle"
        aria-expanded={open}
        aria-controls={paneelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="mnav-toggle-label">
          {open ? (locale === "en" ? "Close" : "Sluit") : "Menu"}
        </span>
        <span className="mnav-toggle-shape" aria-hidden="true">
          {open ? (
            <svg viewBox="0 0 24 24" className="mnav-cross" aria-hidden="true" focusable="false">
              <path d="M6.2 6.2 17.8 17.8M17.8 6.2 6.2 17.8" />
            </svg>
          ) : (
            <Streken />
          )}
        </span>
        <span className="sr-only">
          {open ? (locale === "en" ? "Close menu" : "Menu sluiten") : (locale === "en" ? "Open menu" : "Menu openen")}
        </span>
      </button>

      {open
        ? createPortal(
      <div
        id={paneelId}
        ref={paneel}
        className="mnav-panel"
        aria-label={locale === "en" ? "Main navigation" : "Hoofdnavigatie"}
      >
        <nav className="mnav-card">
          <ul>
            {items.map((item) => (
              <li key={item.nummer}>
                <a
                  href={item.extern ? localeHref(item.href, locale) : item.href}
                  onClick={ga(item.href, item.extern)}
                >
                  <span className="mnav-num" aria-hidden="true">{item.nummer}</span>
                  <span className="mnav-naam">{locale === "en" ? item.en : item.nl}</span>
                  <span className="mnav-arrow" aria-hidden="true">
                    {item.extern ? (
                      <svg viewBox="0 0 24 24" focusable="false"><path d="M7 17 17 7M8.5 7H17v8.5" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" focusable="false"><path d="M4 12h15M13 6.2 19.2 12 13 17.8" /></svg>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mnav-lang">
            <LanguageSwitcher locale={locale} />
          </div>
        </nav>

        <div className="mnav-kanalen">
          {kanalen.map((k) => (
            <a
              key={k.naam}
              href={k.href}
              {...(k.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {(() => {
                const Icoon = kanaalIcoon[k.icoon];
                return (
                  <span className="link-icon" aria-hidden="true">
                    <Icoon />
                  </span>
                );
              })()}
              <span>{k.naam}</span>
            </a>
          ))}
        </div>

        {/* Dezelfde metaregel als boven de titel, hier onderaan het paneel,
            zoals in het ontwerp. aria-hidden omdat hij een tweede keer in de
            leesvolgorde niets toevoegt. */}
        <div className="mnav-meta label" aria-hidden="true">
          <span>Portfolio / 2026</span>
          <span>Amsterdam</span>
          <span className="mnav-meta-wrap">
            {locale === "en" ? "Product strategy / UX/UI" : "Productstrategie / UX/UI"}
          </span>
        </div>
      </div>,
            document.body,
          )
        : null}
    </div>
  );
}
