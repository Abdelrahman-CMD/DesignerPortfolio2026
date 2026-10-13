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
  const segmenten = useRef<(HTMLDivElement | null)[]>([]);
  /* Waar we na het sluiten heen scrollen. Dit moet via een ref: de scroll-lock
     hieronder zet bij het opruimen de oude positie terug, dus een scroll die
     de klik zelf doet wordt daarna overschreven. Zelfde constructie als in
     MobileNav, om dezelfde reden. */
  const doel = useRef<string | null>(null);
  const paneelId = useId();

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

        const balk = segmenten.current[index];
        if (balk) balk.style.transform = `scaleX(${deel})`;
        if (deel > 0 && deel < 1) hier = index;
        else if (deel >= 1) hier = Math.min(secties.length - 1, index + 1);
      });

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

  const positie = Math.max(0, secties.findIndex((sectie) => sectie.id === actiefId));
  const nu = secties[positie];
  const nummer = String(positie + 1).padStart(2, "0");
  const naam = en ? nu.en : nu.nl;

  const ga = (id: string) => (event: { preventDefault: () => void }) => {
    event.preventDefault();
    doel.current = id;
    setOpen(false);
  };

  return (
    <>
      <button
        ref={knop}
        type="button"
        className="csi-bar"
        /* Zonder javascript opent deze knop niets, en een knop die niets
           doet is erger dan geen knop. Tot de hydratie staat hij uit en
           de lijst hieronder aan; daarna precies andersom. */
        hidden={!gehydrateerd}
        aria-expanded={open}
        aria-controls={paneelId}
        aria-label={
          open
            ? en ? "Close contents" : "Inhoud sluiten"
            : en
              ? `Open contents. You are at section ${positie + 1} of ${secties.length}: ${naam}`
              : `Inhoud openen. Je bent bij onderdeel ${positie + 1} van ${secties.length}: ${naam}`
        }
        onClick={() => setOpen((v) => !v)}
      >
        <span className="csi-nu" aria-hidden="true">
          <span className="csi-nu-num">{nummer}</span>
          <span className="csi-nu-streep">/</span>
          <span className="csi-nu-naam">{naam}</span>
        </span>
        <span className="csi-cue" aria-hidden="true">
          <span>{open ? (en ? "Close" : "Sluit") : en ? "Contents" : "Inhoud"}</span>
          {/* Eén plusje dat 45 graden draait. Dat is dezelfde beweging als de
              hamburger naar een kruis maakt, dus het rijmt met de rest. */}
          <span className={`csi-plus${open ? " is-kruis" : ""}`}>
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 5.5v13M5.5 12h13" />
            </svg>
          </span>
        </span>
      </button>

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
              {/* De haarlijn blijft staan als de balk weggeschoven is. Dat is
                  het enige dat de vraag "hoeveel komt er nog" beantwoordt
                  zodra de navigatie verdwijnt. */}
              <div className="csi-voortgang" aria-hidden="true">
                {secties.map((sectie, index) => (
                  <div key={sectie.id} className="csi-segment">
                    <div
                      ref={(el) => {
                        segmenten.current[index] = el;
                      }}
                      className="csi-segment-vulling"
                    />
                  </div>
                ))}
              </div>

              {/* De compacte versie van de regel in de balk. Zij verschijnt
                  precies wanneer die balk wegschuift en verdwijnt wanneer hij
                  terugkomt, zodat er altijd een van de twee staat. Aantikbaar,
                  zodat je ook diep in een case kunt springen zonder eerst
                  omhoog te swipen. */}
              <button
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
