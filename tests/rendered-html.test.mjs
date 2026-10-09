import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Product &amp; UX\/UI designer in Amsterdam · Abdelrahman Ahmed/);
  // "Senior" is uit de metadata gehaald: het is een claim over jezelf waar
  // niemand op zoekt. Deze regel houdt hem eruit.
  assert.doesNotMatch(html, /Senior digitaal ontwerper|Senior digital designer/);
  assert.match(html, /Productdesigner die complexiteit helder maakt/);
  assert.match(html, /Ik combineer productstrategie, UX-onderzoek en interfaceontwerp/);
  assert.match(html, /class="mind-hero-canvas"/);
  assert.match(html, /class="mind-hero-photo-slide"/);
  assert.match(html, /class="mind-hero-mosaic"/);
  assert.match(html, /hero-abdel-profile\.png/);
  assert.match(html, /brain-default\.svg/);
  assert.equal((html.match(/class="mind-brain-region(?: is-active)?"/g) ?? []).length, 5);
  assert.equal((html.match(/class="mind-zone mind-zone-/g) ?? []).length, 5);
  assert.equal((html.match(/class="mind-touch-tab(?: is-active)?"/g) ?? []).length, 5);
  assert.match(html, /Bekijk 8 cases/);
  assert.equal((html.match(/class="manifesto-marker-stroke"/g) ?? []).length, 3);
  assert.match(html, /class="mind-brain-stage"/);
  assert.doesNotMatch(html, /mind-zone-motif/);
  assert.match(html, /Gereedschap: Figma, Framer en AI/);
  assert.doesNotMatch(html, /hero-project-letter|hero-rule/);
  assert.match(html, /class="contact-postcard"/);
  assert.match(html, /class="floating-contact"/);
  assert.doesNotMatch(html, /floating-contact-links|Open contactmogelijkheden/);
  assert.doesNotMatch(html, /class="manifesto-quarter-roll"/);
  assert.doesNotMatch(html, /manifesto-coin|manifesto-coin-edge|manifesto-coin-shadow/);
  assert.match(html, /mailto:dhr_abdelrahman@outlook\.com/);
  assert.match(html, /https:\/\/wa\.me\/31621572124/);
  assert.doesNotMatch(html, /instagram/i);
  // 15 bestaande kanalen plus de twee cv-knoppen: boven in de navigatie en
  // onderaan in de postkaart, als herhaling.
  assert.equal((html.match(/class="link-icon"/g) ?? []).length, 17);
  assert.equal((html.match(/href="\/nl\/cv"/g) ?? []).length, 2);
  assert.match(html, /class="mind-title-handwrite"/);
  assert.match(html, /class="story-route-runner" data-label="Studio"/);
  assert.match(html, /href="#contact"/);
  assert.doesNotMatch(html, /href="[^"#]*playground"/i);
  assert.doesNotMatch(html, /class="postcard-cta"/);
  assert.doesNotMatch(html, /—/);
  assert.match(html, /class="method-horizontal"/);
  assert.doesNotMatch(html, /class="method-grid"/);
  assert.equal((html.match(/class="project-entry /g) ?? []).length, 8);
  assert.match(html, /class="project-grid"/);
  assert.deepEqual(
    [...html.matchAll(/class="project-card-link" href="([^"]+)"/g)].map((match) => match[1]),
    [
      "/nl/cases/mirqa",
      "/nl/cases/oppas-by-chaima",
      "/nl/cases/tareeqi",
      "/nl/cases/hijaman-cups",
      "/nl/cases/bayn-signal",
      "/nl/cases/atotz-detachering",
      "/nl/cases/guidance-travel",
      "/nl/cases/ayn-al-hikmah",
    ],
  );
  assert.equal((html.match(/class="project-parallax-media"/g) ?? []).length, 8);
  assert.match(html, /05<\/strong> Conceptprojecten/);
  assert.match(html, /03<\/strong> Klantprojecten/);
  assert.match(html, /class="case-cursor"/);
  assert.match(html, /Geselecteerd werk/);
  assert.doesNotMatch(html, /Selected work|project-open|Digital designer|Strategy \/ UX \/ Direction/);
  assert.doesNotMatch(html, /showcase-sticky|showcase-progress/);
  assert.match(html, /href="\/nl\/cases\/oppas-by-chaima"/);
  assert.match(html, /href="\/nl\/cases\/mirqa"/);
  assert.match(html, /class="language-switcher language-switcher-light"/);
  assert.match(html, /href="\/en"/);
  assert.equal((html.match(/class="method-note /g) ?? []).length, 4);
  assert.match(html, /Synthese · Probleemkader · Succesmaatstaf/);
  assert.equal((html.match(/class="story-stop story-stop-/g) ?? []).length, 4);
  assert.equal((html.match(/<canvas class="story-photo-mosaic"/g) ?? []).length, 4);
});

test("uses bounded raster assets on the homepage and case pages", async () => {
  const [homeSource, editorialSource, tareeqiSource, guidanceSource, aynSource, baynSource, hijamaSource, mirqaSource, caseData, css, caseResponse, tareeqiResponse, aynResponse, baynResponse, hijamaResponse, mirqaResponse, oppasResponse] = await Promise.all([
    readFile(new URL("../app/components/HomeExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/EditorialCaseExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/CaseExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/GuidanceTravelExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/AynAlHikmahExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/BaynSignalExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/HijamaNCupsExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/MirqaExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/caseContent.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    render("/cases/guidance-travel"),
    render("/cases/tareeqi"),
    render("/cases/ayn-al-hikmah"),
    render("/cases/bayn-signal"),
    render("/cases/hijaman-cups"),
    render("/cases/mirqa"),
    render("/cases/oppas-by-chaima"),
  ]);

  assert.equal(caseResponse.status, 200);
  const caseHtml = await caseResponse.text();
  assert.match(caseHtml, /Guidance Travel/);
  assert.match(caseHtml, /guidance-2026%2Fhero-laptops\.webp/);
  assert.match(caseHtml, /class="tc-snapshot"/);
  assert.match(caseHtml, /class="tc-evidence tc-evidence-guidance"/);
  assert.match(caseHtml, /21 deelnemers maakten de ontbrekende zekerheid concreet/);
  assert.match(caseHtml, /Probleemsignaal onderbouwd · oplossing nog niet getest/);
  assert.equal((caseHtml.match(/n = 21/g) ?? []).length, 4);
  assert.match(caseHtml, /De huidige reis verliest zekerheid tussen intentie en vertrek/);
  assert.match(caseHtml, /class="tc-deep-dive"/);
  assert.equal((caseHtml.match(/class="tc-card-shell /g) ?? []).length, 3);

  assert.equal(tareeqiResponse.status, 200);
  const tareeqiHtml = await tareeqiResponse.text();
  assert.match(tareeqiHtml, /class="tc-snapshot"/);
  assert.match(tareeqiHtml, /class="tc-evidence tc-evidence-tareeqi"/);
  assert.match(tareeqiHtml, /Terugkerende verhalen werden drie proto-persona’s, geen schijnzekerheid/);
  assert.match(tareeqiHtml, /geen formele steekproef of gevalideerde segmentatie/);
  assert.equal((tareeqiHtml.match(/class="is-(?:high|mid|low)"/g) ?? []).length, 5);
  assert.match(tareeqiHtml, /class="tc-deep-dive"/);

  assert.equal(aynResponse.status, 200);
  const aynHtml = await aynResponse.text();
  assert.match(aynHtml, /Ayn Al-Hikmah/);
  assert.match(aynHtml, /ayn-2026%2Fhero-laptops\.webp/);
  assert.match(aynHtml, /class="tc-deep-dive"/);

  assert.equal(baynResponse.status, 200);
  const baynHtml = await baynResponse.text();
  assert.match(baynHtml, /Bayn Signal/);
  assert.match(baynHtml, /bayn-2026%2Fhero-laptops\.webp/);
  assert.match(baynHtml, /class="tc-evidence tc-evidence-bayn"/);
  assert.match(baynHtml, /De doelgroep is een hypothese/);
  assert.match(baynHtml, /Nog geen primair onderzoek · aannames zichtbaar · journey bewust uitgesteld/);
  assert.match(baynHtml, /Benodigd bewijs/);
  assert.doesNotMatch(baynHtml, /Waarom hier nog geen journey staat/);
  assert.match(baynHtml, /class="tc-deep-dive"/);

  assert.equal(hijamaResponse.status, 200);
  const hijamaHtml = await hijamaResponse.text();
  assert.match(hijamaHtml, /Hijama ’N Cups/);
  assert.match(hijamaHtml, /hijama-2026%2Fhero-laptops\.webp/);
  assert.match(hijamaHtml, /class="tc-deep-dive"/);
  assert.match(hijamaHtml, /https:\/\/hijamancups\.com\//);

  assert.equal(mirqaResponse.status, 200);
  const mirqaHtml = await mirqaResponse.text();
  assert.match(mirqaHtml, /MIRQA/);
  assert.match(mirqaHtml, /projects%2Fmirqa%2Fmirqa-case-hero\.webp/);
  assert.equal((mirqaHtml.match(/tc-mirqa-screen-composition tc-mirqa-screen-composition-/g) ?? []).length, 3);
  assert.match(mirqaHtml, /projects%2Fmirqa%2Fscreens%2Fhome\.webp/);
  assert.match(mirqaHtml, /projects%2Fmirqa%2Fscreens%2Fmosque-list\.webp/);
  assert.match(mirqaHtml, /class="tc-deep-dive"/);
  assert.match(mirqaSource, /mosque-map\.jpg/);
  assert.match(mirqaSource, /Product &amp; UX\/UI designer/);

  assert.equal(oppasResponse.status, 200);
  const oppasHtml = await oppasResponse.text();
  assert.match(oppasHtml, /Oppas by Chaima/);
  assert.match(oppasHtml, /oppas-site-desktop\.png/);

  assert.match(homeSource, /className="story-photo-mosaic"/);
  assert.match(homeSource, /className="story-route"/);
  assert.doesNotMatch(homeSource, /story-photo-piece/);
  assert.match(homeSource, /\/projects\/home\/tareeqi\.webp/);
  assert.match(homeSource, /\/about\/hero-abdel-profile\.png/);
  assert.match(homeSource, /\/projects\/home\/mirqa-cover\.webp/);
  assert.match(homeSource, /\/projects\/home\/oppas-by-chaima-cover\.webp/);
  assert.match(homeSource, /\/about\/brain-default\.svg/);
  assert.match(css, /\/about\/brain-hover\.svg/);
  assert.doesNotMatch(css, /brain-head-clip|manifesto-coin-scene/);
  assert.equal((css.match(/--brain-region-mask:/g) ?? []).length, 5);
  assert.match(css, /color: var\(--zone-color\)/);
  assert.match(css, /background-blend-mode: multiply/);
  assert.match(homeSource, /document\.elementFromPoint\(pointerX, pointerY\)/);
  assert.match(homeSource, /window\.addEventListener\("scroll", handleCasePointerScroll/);
  assert.doesNotMatch(homeSource, /brain-stage-zone-/);
  assert.doesNotMatch(homeSource, /mind-portrait-foreground/);
  assert.doesNotMatch(homeSource, /\/about\/hero-profile-cutout-v2\.webp/);
  assert.doesNotMatch(homeSource, /mind-portrait-foreground-(glasses|ear)/);
  assert.doesNotMatch(homeSource, /\/about\/brain-color\.svg/);
  assert.match(homeSource, /clipPath: "inset\(0 0 0 100%\)"/);
  assert.match(homeSource, /xPercent: 14/);
  assert.match(homeSource, /nl: new Set\(\["probleem", "gebruikers", "bouwen"\]\)/);
  assert.match(homeSource, /en: new Set\(\["problem", "users", "build"\]\)/);
  assert.match(homeSource, /\/about\/web\/fatherhood\.webp/);
  assert.doesNotMatch(homeSource, /image: "\/projects\/(tareeqi|ayn|guidance|bayn)-overview\.jpg"/);
  assert.match(caseData, /\/projects\/case-shots\/ayn-detail\.webp/);
  assert.match(caseData, /https:\/\/oppasbychaima\.nl\//);
  assert.doesNotMatch(homeSource, /from "next\/link"/);
  assert.doesNotMatch(editorialSource, /from "next\/link"/);
  assert.doesNotMatch(tareeqiSource, /from "next\/link"/);
  assert.doesNotMatch(guidanceSource, /from "next\/link"/);
  assert.match(guidanceSource, /guidance-2026\/landing-desktop\.webp/);
  assert.match(guidanceSource, /styleGuide: true/);
  assert.match(aynSource, /styleGuide: true/);
  assert.match(baynSource, /bayn-2026\/landing-mobile\.webp/);
  assert.match(baynSource, /styleGuide: true/);
  assert.match(hijamaSource, /hijama-2026\/home-mobile\.webp/);
  assert.match(hijamaSource, /styleGuide: true/);
  assert.match(tareeqiSource, /styleGuide: true/);
  /* In augustus is backdrop-filter overal weggehaald omdat het op grote,
     meescrollende vlakken te duur was: een sticky balk van 1440 bij 64 is
     92.160 px die elk scrollframe opnieuw vervaagd moeten worden.

     De hamburgerknop is 54 bij 42, oftewel 2.268 px - veertig keer minder
     oppervlak. Daar is het glas wel te betalen, en het is bewust gevraagd.
     Deze test bewaakt dus nog steeds het oorspronkelijke doel: geen vervaging
     op grote vlakken. Komt er een derde regel bij, dan faalt hij. */
  /* Twee plekken mogen vervagen, en allebei om dezelfde reden: er scrollt
     niets achter. De knop is klein, en het paneel vergrendelt de pagina zolang
     het openstaat. Elke derde plek valt buiten die redenering. */
  const zonderCommentaar = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const vervagingen = zonderCommentaar.match(/[^{}]+\{[^}]*backdrop-filter:\s*blur[^}]*\}/gi) ?? [];
  const selectors = vervagingen.map((regel) => regel.split("{")[0].trim());
  assert.deepEqual(
    [...new Set(selectors)].sort(),
    [".mnav-panel", ".mnav-toggle-shape"],
    `onverwachte vervaging op: ${selectors.join(" | ")}`,
  );
  assert.match(css, /prefers-reduced-motion:\s*reduce/i);
  assert.doesNotMatch(css, /\.mind-brush-stroke-base/);
  assert.doesNotMatch(homeSource, /mind-connector-map/);
  assert.match(homeSource, /idle: "ZIE DE GEVOLGEN · ZIE DE GEVOLGEN · "/);
  assert.match(homeSource, /active: "ONTDEK PROJECTEN · ONTDEK PROJECTEN · "/);
  assert.match(homeSource, /case: "BEKIJK CASE · BEKIJK CASE · "/);
  assert.doesNotMatch(homeSource, /<circle cx=\{zone\.dotX\}/);
  assert.doesNotMatch(homeSource, /Scroll om verder te kijken/);
  assert.match(css, /white-space: nowrap/);
  assert.match(css, /\.tc-card-shell \+ \.tc-card-shell \{ margin-top: -12svh; \}/);
  assert.match(css, /object-position 24s cubic-bezier\(0\.37, 0, 0\.63, 1\)/);
  assert.match(css, /\.tc-page-ayn \.tc-card-shell:nth-child\(5\) \.tc-card \{ background: #401818;/);
});

test("renders the three live client cases as measured scroll stories", async () => {
  const [hijamaResponse, atotzResponse, oppasResponse, englishAtotzResponse, englishOppasResponse] = await Promise.all([
    render("/cases/hijaman-cups"),
    render("/cases/atotz-detachering"),
    render("/cases/oppas-by-chaima"),
    render("/en/cases/atotz-detachering"),
    render("/en/cases/oppas-by-chaima"),
  ]);

  for (const response of [hijamaResponse, atotzResponse, oppasResponse, englishAtotzResponse, englishOppasResponse]) {
    assert.equal(response.status, 200);
  }

  const [hijamaHtml, atotzHtml, oppasHtml, englishAtotzHtml, englishOppasHtml] = await Promise.all([
    hijamaResponse.text(),
    atotzResponse.text(),
    oppasResponse.text(),
    englishAtotzResponse.text(),
    englishOppasResponse.text(),
  ]);

  for (const html of [hijamaHtml, atotzHtml, oppasHtml]) {
    assert.match(html, /class="tc-page tc-page-client/);
    assert.match(html, /class="tc-snapshot"/);
    assert.match(html, /class="tc-deep-dive"/);
    assert.equal((html.match(/class="tc-card-shell /g) ?? []).length, 4);
  }

  for (const html of [hijamaHtml, oppasHtml]) {
    assert.match(html, /class="cc-metric-board"/);
  }

  assert.doesNotMatch(atotzHtml, /class="cc-metric-board"/);
  assert.match(atotzHtml, /contact-keuzeformulier\.jpg/);
  assert.match(atotzHtml, /bewijs-2-sectorroutes\.jpg/);

  assert.match(hijamaHtml, /9\.3K/);
  assert.match(hijamaHtml, /182/);
  assert.match(hijamaHtml, /2m56/);
  assert.match(atotzHtml, /2[,.]24K/);
  assert.match(atotzHtml, /18[,.]6/);
  assert.match(atotzHtml, /De aanvragen komen binnen/);
  assert.match(englishAtotzHtml, /The enquiries are coming in/);
  assert.match(englishAtotzHtml, /average position 18\.6/);
  assert.match(oppasHtml, /€2K\+/);
  assert.match(oppasHtml, /Door eigenaar gerapporteerd/);
  assert.match(englishOppasHtml, /Owner-reported/);
  assert.match(englishOppasHtml, /More than €2,000 in bookings/);
});

test("server-renders the atmospheric playground route", async () => {
  const response = await render("/playground");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Een ruimte voor/);
  assert.match(html, /cases worden/);
  assert.equal((html.match(/class="pg-card /g) ?? []).length, 8);
  assert.match(html, /pg-card-round/);
  assert.match(html, /pg-card-tall/);
  assert.match(html, /pg-card-wide-two/);
  assert.match(html, /De ruimte staat\. De inhoud mag groeien\./);
});

test("server-renders localized portfolio routes", async () => {
  const [englishHome, dutchHome, englishCase, i18nSource] = await Promise.all([
    render("/en"),
    render("/nl"),
    render("/en/cases/hijaman-cups"),
    readFile(new URL("../app/i18n.tsx", import.meta.url), "utf8"),
  ]);

  assert.equal(englishHome.status, 200);
  assert.equal(dutchHome.status, 200);
  assert.equal(englishCase.status, 200);

  const englishHtml = await englishHome.text();
  const dutchHtml = await dutchHome.text();
  const englishCaseHtml = await englishCase.text();

  assert.match(englishHtml, /data-locale="en"/);
  assert.match(englishHtml, /href="#contact"/);
  assert.doesNotMatch(englishHtml, /href="\/en\/playground"/);
  assert.match(englishHtml, /aria-current="page" aria-label="English"/);
  assert.match(dutchHtml, /data-locale="nl"/);
  assert.match(dutchHtml, /href="#contact"/);
  assert.doesNotMatch(dutchHtml, /href="\/nl\/playground"/);
  assert.match(englishCaseHtml, /data-locale="en"/);
  assert.match(englishCaseHtml, /class="tc-nav-actions"/);
  assert.match(i18nSource, /Everything I learn shifts my perspective/);
  assert.match(i18nSource, /Curious whether/);
  assert.match(i18nSource, /we’d work well together\?/);
  assert.match(i18nSource, /The right people in the right place, without the friction/);
  assert.match(i18nSource, /A personal service that still feels personal online/);
  assert.doesNotMatch(i18nSource, /Direction remains human work|if we click\?|fitting package faster/);
});

test("keeps the localized mutation observer from retriggering itself", async () => {
  const i18nSource = await readFile(new URL("../app/i18n.tsx", import.meta.url), "utf8");

  assert.match(i18nSource, /const next = `\$\{leading\}\$\{translated\}\$\{trailing\}`;/);
  assert.match(i18nSource, /if \(next === original\) return;/);
  assert.match(i18nSource, /const observerOptions: MutationObserverInit = \{/);
  assert.match(i18nSource, /let applying = false;/);
  assert.match(i18nSource, /observer\.disconnect\(\);/);
  assert.match(i18nSource, /observer\.observe\(surface, observerOptions\);/);
});

test("answers unknown case slugs with a real 404, not an empty page", async () => {
  // Hiervoor gaf elke verzonnen slug een pagina met status 200 en een titel
  // als "Xyz123 · Case study", met een canonical naar zichzelf. Google telt
  // dat als soft 404 en gaat elke verkeerd gespelde link indexeren.
  for (const pathname of [
    "/nl/cases/bestaat-niet",
    "/en/cases/bestaat-niet",
    "/cases/bestaat-niet",
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 404, `${pathname} hoort een 404 te geven`);
  }

  // En de cases die wel bestaan blijven gewoon werken.
  for (const pathname of [
    "/nl/cases/atotz-detachering",
    "/en/cases/hijaman-cups",
    "/cases/mirqa",
  ]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} hoort te blijven werken`);
  }
});

test("redirects the slug people would logically spell", async () => {
  // hijaman-cups heeft zestien maanden geschiedenis bij Google, dus die URL
  // blijft. Wie "hijama-n-cups" intypt gaat er permanent naartoe.
  const response = await render("/nl/cases/hijama-n-cups");
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "/nl/cases/hijaman-cups");
});

test("gives every sitemap entry a date that does not move", async () => {
  const first = await (await render("/sitemap.xml")).text();
  await new Promise((resolve) => setTimeout(resolve, 1100));
  const second = await (await render("/sitemap.xml")).text();

  const dates = (xml) => xml.match(/<lastmod>[^<]+<\/lastmod>/g) ?? [];
  assert.ok(dates(first).length > 0, "de sitemap hoort lastmod-datums te hebben");
  // Stond hier new Date(), dan verschilden twee ophaalacties van elkaar en
  // leerde Google dat deze datums niets betekenen.
  assert.deepEqual(dates(first), dates(second));
  assert.doesNotMatch(first, new RegExp(`<loc>[^<]*/playground</loc>`));
});

test("keeps the work connected to the person in structured data", async () => {
  const html = await (await render("/nl")).text();
  const block = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  assert.ok(block, "de homepage hoort structuurdata te bevatten");

  const graph = JSON.parse(block[1])["@graph"];
  const types = graph.map((node) => node["@type"]);
  assert.deepEqual(types, ["ProfilePage", "Person", "ItemList"]);

  const person = graph.find((node) => node["@type"] === "Person");
  assert.equal(person.jobTitle, "Product & UX/UI designer");
  assert.doesNotMatch(JSON.stringify(person), /Senior/);

  // De acht cases horen als één lijst aan hem vast te hangen, niet als acht
  // losse pagina's die toevallig op hetzelfde domein staan.
  const list = graph.find((node) => node["@type"] === "ItemList");
  assert.equal(list.numberOfItems, 8);
  assert.equal(list.itemListElement.length, 8);
  assert.equal(list.itemListElement[0].position, 1);
  assert.match(list.itemListElement[0].url, /\/nl\/cases\//);
});

test("keeps NL and EN readable in the language switcher", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  // De knoppen hadden ooit een vlagje plus een label; op mobiel verdween het
  // label met een visually-hidden-regel op span:last-child. Sinds de knoppen
  // alleen nog tekst bevatten verbergt die regel het enige dat er staat, en
  // zie je twee lege pillen. Komt hij terug, dan faalt deze test.
  assert.doesNotMatch(css, /\.language-switcher a > span:last-child\s*\{/);

  const html = await (await render("/nl")).text();
  assert.match(html, /<span>NL<\/span>/);
  assert.match(html, /<span>EN<\/span>/);
});

test("ships the narrow-screen navigation with the header", async () => {
  const html = await (await render("/nl")).text();

  // De knop staat in de server-HTML; het paneel komt pas na een klik, dus dat
  // hoort er juist niet in te staan.
  assert.match(html, /class="mnav-toggle"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /Menu openen/);
  assert.doesNotMatch(html, /class="mnav-panel"/);

  const en = await (await render("/en")).text();
  assert.match(en, /Open menu/);
});

test("keeps the switch to the hamburger tied to the measured breakpoint", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  // Op 810px stonden de pil en de tekstnavigatie met nul tussenruimte tegen
  // elkaar. Verschuift deze grens, dan gaan ze elkaar weer raken.
  assert.match(css, /@media \(max-width: 859px\) \{[^}]*\.site-header \.top-nav/s);
  assert.match(css, /\.mobile-nav \{ display: none; \}/);
});

test("never leaves the sticky bars hanging eighteen pixels too high", async () => {
  const home = await readFile(new URL("../app/components/HomeExperience.tsx", import.meta.url), "utf8");
  const caseNav = await readFile(new URL("../app/components/CaseNavMotion.tsx", import.meta.url), "utf8");
  const story = await readFile(new URL("../app/components/caseScrollStory.ts", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  // Beide openingsanimaties laten hun balk van y: -18 naar nul zakken.
  assert.match(home, /gsap\.set\("\.site-header", \{ autoAlpha: 0, y: -18 \}\)/);
  assert.match(story, /gsap\.set\("\.tc-nav", \{ autoAlpha: 0, y: -18 \}\)/);

  /* Scrolt iemand terwijl dat nog loopt, dan breekt overwrite: true die tween
     af en blijft de -18 staan - de balk hangt dan voorgoed te hoog. Allebei de
     verschijn-tweens moeten y daarom zelf op nul zetten. */
  for (const [naam, bron] of [["HomeExperience", home], ["CaseNavMotion", caseNav]]) {
    assert.match(bron, /\.\.\.\(visible \? \{ y: 0 \} : \{\}\)/, `${naam} zet y niet terug op nul`);
  }

  /* En de koptekstbalk moet aan het scherm vast blijven zitten, ook op smalle
     schermen - anders scrolt hij weg en komt hij nooit meer terug. */
  assert.doesNotMatch(css, /@media \(max-width: 859px\) \{[^}]*\.site-header \{ position: relative/s);
});
