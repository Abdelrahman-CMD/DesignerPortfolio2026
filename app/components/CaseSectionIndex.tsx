"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { Locale } from "../i18n";

/* De inhoudsopgave van een case: een regel in de navigatiebalk die zegt waar
   je bent, en bij aantikken een volledig scherm met de hele opgave.

   Dit verving een rail die links in beeld stond. Die rail had twee problemen.
   Ten eerste deed hij twee dingen tegelijk - voortgang tonen wil altijd
   zichtbaar zijn, een opgave wil alleen op verzoek open - en ten tweede kwam
   hij op een telefoon helemaal niet aan de orde, want daar is die marge er
   niet.

   Deze opzet splitst die twee weer. De voortgang is een haarlijn van 2px
   tegen de bovenrand die altijd blijft staan. De opgave zit achter een
   aantikbare regel die met de balk mee verdwijnt als je naar beneden scrolt
   en terugkomt als je naar boven scrolt.

   Daarom staat deze component ook IN <nav class="tc-nav"> en niet ernaast:
   de balk krijgt van CaseNavMotion een transform, en als dit een eigen
   element met position: fixed was, dan moesten er twee dingen op hetzelfde
   scrollgebaar dezelfde beweging maken. Als kind van de balk is het er
   gewoon een. De haarlijn en het paneel gaan wel via een portaal naar
   document.body, juist omdat die niet mee mogen schuiven. */

/* React vergelijkt bij het hydrateren de server-html met wat de client als
   eerste rendert. Een portaal telt daarin mee als vorm, ook al landt de inhoud
   ergens anders in de pagina - dus meteen portalen gaf "Hydration failed".
   Deze haak zegt alleen maar: op de server nee, daarna ja. */
/* Relatieve helderheid volgens WCAG, voor de keuze hieronder welke kleur de
   voortgangslijn krijgt. Alleen hex, want dat is wat de palletten van de cases
   bevatten. */
function helderheid(hex: string) {
  const h = hex.replace("#", "");
  const vol = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (vol.length !== 6) return null;
  const kanalen = [0, 2, 4].map((i) => {
    const c = parseInt(vol.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * kanalen[0] + 0.7152 * kanalen[1] + 0.0722 * kanalen[2];
}

function contrast(a: string, b: string) {
  const la = helderheid(a);
  const lb = helderheid(b);
  if (la === null || lb === null) return 0;
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const abonneerNiets = () => () => {};
const opDeClient = () => true;
const opDeServer = () => false;

const secties = [
  { id: "case-overview", nl: "Overzicht", en: "Overview" },
  { id: "case-context", nl: "Context", en: "Context" },
  { id: "case-process", nl: "Proces", en: "Process" },
  { id: "case-evidence", nl: "Bewijs", en: "Evidence" },
  { id: "case-outcome", nl: "Bijdrage", en: "Contribution" },
] as const;

export function CaseSectionIndex({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const [open, setOpen] = useState(false);
  const gehydrateerd = useSyncExternalStore(abonneerNiets, opDeClient, opDeServer);
  const [actiefId, setActiefId] = useState<string>(secties[0].id);
  const knop = useRef<HTMLButtonElement>(null);
  const paneel = useRef<HTMLDivElement>(null);
  const ring = useRef<SVGRectElement>(null);
  const ringDoek = useRef<SVGSVGElement>(null);
  /* Waar we na het sluiten heen scrollen. Dit moet via een ref: de scroll-lock
     hieronder zet bij het opruimen de oude positie terug, dus een scroll die
     de klik zelf doet wordt daarna overschreven. Zelfde constructie als in
     MobileNav, om dezelfde reden. */
  const doel = useRef<string | null>(null);
  const paneelId = useId();

  /* Deze vier staan hier en niet vlak boven de return, omdat de effecten
     hieronder ze in hun afhankelijkheden hebben: een const die later in de
     functie staat bestaat op dat moment nog niet. */
  const positie = Math.max(0, secties.findIndex((sectie) => sectie.id === actiefId));
  const nu = secties[positie];
  const nummer = String(positie + 1).padStart(2, "0");
  const naam = en ? nu.en : nu.nl;

  /* Waar de bezoeker is, en hoe ver hij in dat hoofdstuk is. Beide komen uit
     dezelfde meting, met opzet: toen de naam uit een IntersectionObserver kwam
     en de lijn uit een eigen berekening, konden ze elkaar tegenspreken - de
     lijn zei dat Context af was terwijl de naam nog Context zei.

     Een hoofdstuk loopt van zijn eigen kop tot aan de volgende kop, en niet
     tot het einde van het element met dat id. Tussen twee secties staat
     inhoud die bij geen van beide hoort; rekende je alleen met offsetHeight,
     dan stond een segment al vol terwijl je nog aan het lezen was.

     De vulling gaat via scaleX op refs: geen layout per scrollstap, en geen
     react-render. Alleen als je echt een hoofdstuk verder bent gaat er state
     om, en dat is een paar keer per case. */
  useEffect(() => {
    let frame = 0;

    const meet = () => {
      frame = 0;
      const grenzen = secties.map((sectie) => {
        const el = document.getElementById(sectie.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : null;
      });
      if (grenzen[0] === null) return;

      /* Gerekend in scrollposities en niet in documentposities. Een hoofdstuk
         begint als zijn kop het midden van het scherm passeert - dat is waar
         je leest - maar die drempel wordt afgekapt op de laatste scrollpositie
         die er bestaat.

         Zonder dat afkappen haalde het laatste segment de 100% nooit: onderaan
         de pagina ligt het midden van het scherm per definitie een half scherm
         vóór het einde, dus het bleef op 0,51 steken terwijl je echt helemaal
         beneden was. Dat is precies zo verwarrend als het klinkt. */
      const laatste = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const aanzet = grenzen.map((top) =>
        top === null ? null : Math.min(laatste, Math.max(0, top - window.innerHeight / 2)),
      );
      let hier = 0;

      secties.forEach((sectie, index) => {
        const start = aanzet[index];
        if (start === null) return;
        const volgende = aanzet.slice(index + 1).find((g) => g !== null) ?? laatste;
        const lengte = Math.max(1, volgende - start);
        const deel = Math.min(1, Math.max(0, (window.scrollY - start) / lengte));
        if (deel > 0 && deel < 1) hier = index;
        else if (deel >= 1) hier = Math.min(secties.length - 1, index + 1);
      });

      /* De rand van de pil toont de voortgang door de hele case, niet door het
         huidige hoofdstuk: hoe ver je in dit hoofdstuk bent zegt niets over
         hoeveel er nog komt, en dat laatste is de vraag die een haastige lezer
         stelt. Welk hoofdstuk het is staat er in letters naast. */
      const doek = ringDoek.current;
      const rand = ring.current;
      if (doek && rand) {
        const pil = doek.parentElement?.getBoundingClientRect();
        if (pil && pil.width > 0) {
          /* Binnen twee pixels van het einde telt als het einde. De laatste
             scrollpixels komen er door ScrollTrigger niet altijd uit, en dan
             bleef er een zichtbare kier in de rand staan terwijl je echt
             helemaal beneden was - precies op het moment dat de cirkel rond
             hoort te zijn. */
          const totaal = window.scrollY >= laatste - 2
            ? 1
            : Math.min(1, Math.max(0, window.scrollY / laatste));
          rand.style.strokeDashoffset = String(1 - totaal);
        }
      }

      setActiefId((vorige) => (vorige === secties[hier].id ? vorige : secties[hier].id));
    };

    const bijScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(meet);
    };

    meet();
    window.addEventListener("scroll", bijScroll, { passive: true });
    window.addEventListener("resize", bijScroll);
    return () => {
      window.removeEventListener("scroll", bijScroll);
      window.removeEventListener("resize", bijScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  /* De kleuren van de case staan op <main class="tc-page tc-page-...">, maar de
     pil hangt in een portaal aan document.body en valt daar dus buiten. Ze
     worden hier eenmalig overgezet.

     Twee verschillende, met opzet. De baan waarin de voortgang loopt krijgt de
     accentkleur: die is decoratief, dus daar geldt geen contrasteis. De lijn
     die zich vult krijgt de donkere kleur van de case, want drie van de zeven
     accenten halen de 3:1 niet die een functioneel element nodig heeft -
     Guidance komt op 1,89 en zou een vrijwel onzichtbare amberen lijn op crème
     opleveren. De donkere variant haalt overal minstens 6,5 en is nog steeds
     van de case zelf. */
  useEffect(() => {
    const pil = knop.current;
    const pagina = document.querySelector<HTMLElement>(".tc-page, .editorial-case");
    if (!pil || !pagina) return;
    const stijl = getComputedStyle(pagina);
    const haal = (naam: string, terugval: string) => stijl.getPropertyValue(naam).trim() || terugval;

    const accent = haal("--tc-brown", "#b83225");
    const donker = haal("--tc-ink", "#292723");
    const schil = haal("--nav-shell", "#f8f5ef");

    /* De voortgangslijn krijgt de accentkleur van de case, maar alleen als die
       het haalt. Vier van de zeven palletten doen dat: Ayn 3,74, Oppas 4,57,
       Mirqa 4,82, AtotZ 5,04. Drie niet: Guidance blijft op 1,89, Bayn op 2,33
       en Hijama op 2,48 - en een voortgangsbalk die je niet kunt zien is geen
       voortgangsbalk. Die drie vallen terug op de donkere kleur van diezelfde
       case, dus het blijft een kleur die bij de pagina hoort.

       Dit staat hier en niet in de css, omdat css niet kan rekenen met
       contrast. Verandert er ooit een palet, dan verschuift deze keuze
       vanzelf mee. */
    const leesbaar = contrast(accent, schil) >= 3;

    pil.style.setProperty("--case-accent", accent);
    /* De lijn en de tekst zijn apart. Stonden ze op dezelfde variabele, dan
       kreeg de tekst de accentkleur mee zodra die voor de lijn gekozen werd -
       en terracotta letters op een crèmekleurige pil leest beroerd. De tekst
       is altijd de donkere kleur van de case. */
    pil.style.setProperty("--case-lijn", leesbaar ? accent : donker);
    pil.style.setProperty("--case-tekst", donker);
    pil.style.setProperty("--case-schil", schil);
  }, [gehydrateerd]);

  /* De rand is een svg en moet dus de maat van de pil kennen. Dat gebeurt via
     een ResizeObserver en niet in de scrollmeting, omdat de pil ook breder of
     smaller wordt terwijl je stilstaat - bij een hoofdstukwissel - en die
     overgang duurt een paar honderd milliseconden. Een observer loopt daar
     frame voor frame in mee; een scrollmeting zou pas bij de volgende scroll
     bijtrekken en de rand ondertussen naast de pil laten staan. */
  useEffect(() => {
    const doek = ringDoek.current;
    const rand = ring.current;
    const pil = knop.current;
    if (!doek || !rand || !pil) return;

    const pas = () => {
      const b = Math.round(pil.offsetWidth);
      const h = Math.round(pil.offsetHeight);
      if (b < 2 || h < 2) return;
      /* De rand van de pil is de baan; deze lijn ligt er precies bovenop. De
         inzet is daarom een halve randdikte, niet een hele pixel. */
      const dikte = 2.5;
      doek.setAttribute("viewBox", `0 0 ${b} ${h}`);
      rand.setAttribute("x", String(dikte / 2));
      rand.setAttribute("y", String(dikte / 2));
      rand.setAttribute("width", String(b - dikte));
      rand.setAttribute("height", String(h - dikte));
      rand.setAttribute("rx", String((h - dikte) / 2));
    };

    pas();
    const kijker = new ResizeObserver(pas);
    kijker.observe(pil);
    return () => kijker.disconnect();
    /* gehydrateerd hoort erbij: de pil hangt in een portaal dat pas na de
       hydratie bestaat, dus bij de eerste doorloop is knop.current nog leeg.
       Zonder deze afhankelijkheid liep dit effect precies een keer, op dat
       lege moment, en bleef de rand op breedte nul staan. */
  }, [gehydrateerd]);

  /* De breedte wordt expliciet gezet, want een pil die zich naar zijn inhoud
     voegt valt niet te animeren - fit-content heeft geen begin- en eindwaarde
     om tussen te lopen. Bij elke hoofdstukwissel meten we de nieuwe natuurlijke
     breedte en schrijven die als pixelwaarde; de overgang in de css doet de
     rest. De eerste keer staat hij er meteen goed, zonder animatie. */
  useEffect(() => {
    const pil = knop.current;
    if (!pil) return;
    const vorige = pil.style.width;
    pil.style.width = "auto";
    const breed = pil.offsetWidth;
    pil.style.width = vorige || `${breed}px`;
    if (!vorige) return;
    const frame = window.requestAnimationFrame(() => {
      pil.style.width = `${breed}px`;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [naam, nummer, gehydrateerd]);

  // Escape sluit, en de focus gaat terug naar de regel waar hij vandaan kwam.
  useEffect(() => {
    if (!open) return;
    const bijToets = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
    };
    window.addEventListener("keydown", bijToets);
    return () => window.removeEventListener("keydown", bijToets);
  }, [open]);

  /* Bij openen gaat de focus naar het onderdeel waar de bezoeker al staat, en
     niet naar het eerste. Wie met het toetsenbord navigeert landt daarmee op
     zijn eigen plek in de opgave in plaats van bovenaan.

     Het terugzetten gebeurt in het opruimen en niet in de Escape-afhandeling:
     daar riep ik .focus() nog terwijl het paneel in beeld stond, waarna het
     verdwijnen van het gefocuste anker de focus alsnog naar de body gooide. */
  useEffect(() => {
    if (!open) return;
    const hier = paneel.current?.querySelector<HTMLElement>('a[aria-current="location"]');
    (hier ?? paneel.current?.querySelector<HTMLElement>("a"))?.focus();
    const terug = knop.current;
    return () => terug?.focus();
  }, [open]);

  // Een klik buiten het blad sluit het paneel.
  useEffect(() => {
    if (!open) return;
    const bijKlik = (event: MouseEvent) => {
      const raak = event.target as Node;
      if (paneel.current?.contains(raak) || knop.current?.contains(raak)) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", bijKlik);
    return () => window.removeEventListener("pointerdown", bijKlik);
  }, [open]);

  /* De pagina erachter staat stil zolang de opgave open is.

     Hier staat bewust overflow: hidden en niet de body op position: fixed,
     zoals het mobiele menu doet. Op een casepagina pint ScrollTrigger secties
     vast, en die pins hangen aan de hoogte van het document. Haal je de body
     uit de flow, dan klapt die hoogte in, en bij het sluiten bestond de
     bewaarde scrollpositie niet meer: gemeten sprong je dan van 10827 terug
     naar 6939 - bijna vierduizend pixels eerder in de case. Met overflow
     verandert er niets aan de flow, dus valt er ook niets te herstellen. */
  useEffect(() => {
    if (!open) return;
    const wortel = document.documentElement;
    const vorige = wortel.style.overflow;
    wortel.style.overflow = "hidden";

    return () => {
      wortel.style.overflow = vorige;

      const naar = doel.current;
      doel.current = null;
      if (!naar) return;
      const sectie = document.getElementById(naar);
      if (!sectie) return;
      const stil = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: sectie.getBoundingClientRect().top + window.scrollY,
        behavior: stil ? "auto" : "smooth",
      });
    };
  }, [open]);

  const ga = (id: string) => (event: { preventDefault: () => void }) => {
    event.preventDefault();
    doel.current = id;
    setOpen(false);
  };

  return (
    <>
      {/* De vijf ankers blijven hoe dan ook in de html staan - de rail die hier
          eerst stond leverde die ook, en zonder javascript is dit het enige
          dat werkt. */}
      <ul className="csi-fallback" hidden={gehydrateerd}>
        {secties.map((sectie, index) => (
          <li key={sectie.id}>
            <a href={`#${sectie.id}`}>
              <span className="csi-num">{String(index + 1).padStart(2, "0")}</span>{" "}
              {en ? sectie.en : sectie.nl}
            </a>
          </li>
        ))}
      </ul>

      {gehydrateerd
        ? createPortal(
            <>
              {/* Het enige blijvende element op een casepagina: waar je bent,
                  hoe ver je bent, en de ingang naar de inhoudsopgave in een
                  pil van ongeveer 120 bij 30.

                  Hij staat linksonder en niet linksboven, omdat hij altijd in
                  beeld moet blijven: de voortgang zit nu in zijn rand, dus zou
                  hij met de balk meeverdwijnen, dan verdween de voortgang mee.
                  Boven is geen ruimte - daar staat de balk, en eronder de
                  broodkruimel die er anders onder wegvalt. Onderaan is wel
                  ruimte, en op een telefoon ligt hij daar in duimbereik. */}
              <button
                ref={knop}
                type="button"
                className="csi-chip"
                aria-expanded={open}
                aria-controls={paneelId}
                aria-label={
                  en
                    ? `Open contents. You are at section ${positie + 1} of ${secties.length}: ${naam}`
                    : `Inhoud openen. Je bent bij onderdeel ${positie + 1} van ${secties.length}: ${naam}`
                }
                onClick={() => setOpen((v) => !v)}
              >
                {/* De rand tekent zichzelf vol terwijl je scrolt. Dat is
                    dezelfde techniek als de icoontjes in de navigatiebalk
                    gebruiken: een pad met pathLength 1, zodat de voortgang
                    rechtstreeks de dashoffset is en er geen rekenwerk met de
                    omtrek aan te pas komt. */}
                <svg ref={ringDoek} className="csi-chip-rand" aria-hidden="true" focusable="false">
                  <rect ref={ring} x="0" y="0" width="0" height="0" rx="0" pathLength="1" />
                </svg>
                <span className="csi-nu-num" aria-hidden="true">{nummer}</span>
                <span className="csi-nu-streep" aria-hidden="true">/</span>
                <span className="csi-chip-naam" aria-hidden="true">{naam}</span>
              </button>

              {open ? (
                <div
                  id={paneelId}
                  ref={paneel}
                  className="csi-panel"
                  role="dialog"
                  aria-modal="true"
                  aria-label={en ? "Contents of this case study" : "Inhoud van deze case"}
                >
                  <div className="csi-sheet">
                    <p className="csi-eyebrow label">{en ? "Contents" : "Inhoud"}</p>
                    <ol className="csi-lijst">
                      {secties.map((sectie, index) => {
                        const hier = sectie.id === actiefId;
                        return (
                          <li key={sectie.id}>
                            <a
                              href={`#${sectie.id}`}
                              onClick={ga(sectie.id)}
                              aria-current={hier ? "location" : undefined}
                            >
                              <span className="csi-num" aria-hidden="true">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <span className="csi-naam">{en ? sectie.en : sectie.nl}</span>
                              <span className="csi-hier" aria-hidden="true" />
                            </a>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
              ) : null}
            </>,
            document.body,
          )
        : null}
    </>
  );
}
