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
    const nav = document.querySelector<HTMLElement>(".tc-nav, .ec-nav");
    if (!nav) return;

    let previousScroll = window.scrollY;
    let navVisible = true;
    let scrollFrame = 0;

    const setNavVisibility = (visible: boolean) => {
      if (visible === navVisible) return;
      navVisible = visible;
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

    return () => {
      window.removeEventListener("scroll", handleDirectionalScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return null;
}
