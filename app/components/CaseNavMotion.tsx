"use client";

import { useEffect } from "react";
import gsap from "gsap";

/* De zwevende casebalk sneed tijdens het scrollen dwars door de hero-titel:
   hij is ondoorzichtig en smaller dan de pagina, dus je zag de letters links
   en rechts ervan doorlopen en er middenin afgehakt worden.

   Deze component geeft hem hetzelfde gedrag als de header op de homepage:
   weg bij naar beneden scrollen, terug bij naar boven scrollen, en altijd
   zichtbaar bovenaan de pagina. De waarden zijn bewust letterlijk gelijk aan
   setHeaderVisibility en handleDirectionalScroll in HomeExperience - zelfde
   drempels (90px en 7px), zelfde duur, zelfde easing, zelfde yPercent - zodat
   de site zich overal hetzelfde gedraagt. Verander je de een, verander dan
   ook de ander.

   De intro-animaties van de cases zetten .tc-nav met y; hier gebruiken we
   yPercent, een aparte transform-eigenschap, dus die twee bijten elkaar niet.
   Renderen doet deze component niets. */
export function CaseNavMotion() {
  useEffect(() => {
    /* layout.tsx zet data-js="on" en start een noodrem van 2,6 seconden die de
       vlag op "off" zet als de client-bundel wegblijft. HomeExperience wist die
       timer, maar dat draait niet op een casepagina - dus daar sloeg de vlag na
       2,6 seconden altijd om, ook al was de bundel gewoon binnen. Deze
       component draait op elke casepagina, dus hier hoort dezelfde wis. */
    const noodrem = window as unknown as { __heroMotionFallback?: number };
    if (noodrem.__heroMotionFallback !== undefined) {
      window.clearTimeout(noodrem.__heroMotionFallback);
      noodrem.__heroMotionFallback = undefined;
    }

    const nav = document.querySelector<HTMLElement>(".tc-nav, .ec-nav");
    if (!nav) return;

    let previousScroll = window.scrollY;
    let navVisible = true;
    let scrollFrame = 0;

    const setNavVisibility = (visible: boolean) => {
      if (visible === navVisible) return;
      navVisible = visible;
      /* CaseSectionIndex laat hieraan zien of hij zijn compacte versie moet
         tonen. Die neemt het over zodra deze balk wegschuift, zodat er altijd
         precies een van de twee in beeld staat - nooit geen en nooit allebei.
         Via een attribuut en niet via react-state, omdat dit op elke
         scrollstap kan wisselen en er dan geen render aan te pas hoeft. */
      document.documentElement.dataset.caseNav = visible ? "visible" : "hidden";
      gsap.to(nav, {
        autoAlpha: visible ? 1 : 0,
        yPercent: visible ? 0 : -125,
        /* Zelfde reden als in setHeaderVisibility op de homepage: de intro van
           de case laat deze balk van y: -18 naar nul zakken, en scrolt iemand
           daar doorheen, dan breekt overwrite die tween af en blijft de balk
           te hoog hangen. Zichtbaar betekent daarom ook y: 0. */
        ...(visible ? { y: 0 } : {}),
        duration: visible ? 0.42 : 0.3,
        ease: visible ? "power3.out" : "power2.in",
        overwrite: true,
      });
    };

    const handleDirectionalScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        const delta = currentScroll - previousScroll;
        if (currentScroll < 90) setNavVisibility(true);
        else if (delta > 7) setNavVisibility(false);
        else if (delta < -7) setNavVisibility(true);
        previousScroll = currentScroll;
        scrollFrame = 0;
      });
    };

    window.addEventListener("scroll", handleDirectionalScroll, { passive: true });

    document.documentElement.dataset.caseNav = "visible";

    return () => {
      window.removeEventListener("scroll", handleDirectionalScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      delete document.documentElement.dataset.caseNav;
    };
  }, []);

  return null;
}
