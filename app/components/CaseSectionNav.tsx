"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "../i18n";

/* De inhoudsopgave naast een case.

   Hij stond eerst permanent uitgeklapt op 138px breed. Dat past niet: de
   smalste linkermarge op een casepagina is 51px en rechts loopt de content
   zelfs buiten beeld. Op vier van de zes gemeten scrollposities lag er tekst
   of beeld onder de balk - tot 103px overlap.

   De oorzaak is dat hij twee dingen tegelijk probeerde te zijn. Een
   voortgangsmeter wil altijd zichtbaar zijn maar mag klein; een
   inhoudsopgave wil rijk zijn maar alleen op verzoek. Nu zijn ze gesplitst:
   in rust vijf streepjes van samen 24px, en de labels komen pas als je de
   rail aanwijst of ernaartoe tabt.

   Tijdens het scrollen licht het label van de sectie waar je bent even op en
   vervaagt weer. Daarmee beantwoordt hij "waar ben ik" zonder daar de hele
   tijd ruimte voor te vragen. */

const items = [
  { id: "case-overview", nl: "Overzicht", en: "Overview" },
  { id: "case-context", nl: "Context", en: "Context" },
  { id: "case-process", nl: "Proces", en: "Process" },
  { id: "case-evidence", nl: "Bewijs", en: "Evidence" },
  { id: "case-outcome", nl: "Bijdrage", en: "Contribution" },
] as const;

export function CaseSectionNav({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = useState<string>(items[0].id);
  const [scrolling, setScrolling] = useState(false);
  const rustTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-34% 0px -52% 0px", threshold: [0.01, 0.18, 0.36] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Tijdens het scrollen staat het actieve label aan; 1,1 seconde nadat je
     stopt gaat het weer uit. Zonder deze pauze knippert het bij elke kleine
     beweging van de muis of een trackpad dat uitrolt. */
  useEffect(() => {
    const bijScroll = () => {
      setScrolling(true);
      window.clearTimeout(rustTimer.current);
      rustTimer.current = window.setTimeout(() => setScrolling(false), 1100);
    };

    window.addEventListener("scroll", bijScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", bijScroll);
      window.clearTimeout(rustTimer.current);
    };
  }, []);

  return (
    <nav
      className={`tc-section-nav${scrolling ? " is-scrolling" : ""}`}
      aria-label={locale === "en" ? "Case sections" : "Case secties"}
    >
      {items.map((item, index) => {
        const naam = locale === "en" ? item.en : item.nl;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "location" : undefined}
          >
            <span className="tc-section-tick" aria-hidden="true" />
            {/* De tekst blijft in de html staan en wordt alleen visueel
                weggeschoven, zodat een schermlezer gewoon "03, Proces" krijgt. */}
            <span className="tc-section-label">
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <strong>{naam}</strong>
            </span>
          </a>
        );
      })}
    </nav>
  );
}
