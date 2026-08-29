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
  assert.match(html, /Abdelrahman — Senior digitaal ontwerper/);
  assert.match(html, /Ik ontwerp met alles wat ik onderweg leer/);
  assert.match(html, /class="mind-hero-canvas"/);
  assert.match(html, /class="mind-hero-photo-slide"/);
  assert.match(html, /hero-abdel-profile\.png/);
  assert.match(html, /brain-default\.svg/);
  assert.equal((html.match(/class="mind-brain-region(?: is-active)?"/g) ?? []).length, 5);
  assert.equal((html.match(/class="mind-zone mind-zone-/g) ?? []).length, 5);
  assert.equal((html.match(/class="mind-touch-tab(?: is-active)?"/g) ?? []).length, 5);
  assert.match(html, /Bekijk 7 cases/);
  assert.equal((html.match(/class="manifesto-marker-stroke"/g) ?? []).length, 3);
  assert.match(html, /class="mind-brain-stage"/);
  assert.doesNotMatch(html, /mind-zone-motif/);
  assert.match(html, /Gereedschap: Figma, Framer en AI/);
  assert.doesNotMatch(html, /hero-project-letter|hero-rule/);
  assert.match(html, /class="contact-postcard"/);
  assert.match(html, /class="floating-contact"/);
  assert.match(html, /class="manifesto-quarter-roll"/);
  assert.doesNotMatch(html, /manifesto-coin|manifesto-coin-edge|manifesto-coin-shadow/);
  assert.match(html, /mailto:dhr_abdelrahman@outlook\.com/);
  assert.match(html, /https:\/\/wa\.me\/31621572124/);
  assert.doesNotMatch(html, /instagram/i);
  assert.equal((html.match(/class="link-icon"/g) ?? []).length, 15);
  assert.match(html, /class="method-horizontal"/);
  assert.equal((html.match(/class="project-entry /g) ?? []).length, 7);
  assert.match(html, /class="project-grid"/);
  assert.equal((html.match(/class="project-parallax-media"/g) ?? []).length, 7);
  assert.match(html, /04<\/strong> Conceptprojecten/);
  assert.match(html, /03<\/strong> Klantprojecten/);
  assert.match(html, /class="case-cursor"/);
  assert.match(html, /Geselecteerd werk/);
  assert.doesNotMatch(html, /Selected work|project-open|Digital designer|Strategy \/ UX \/ Direction/);
  assert.doesNotMatch(html, /showcase-sticky|showcase-progress/);
  assert.match(html, /href="\/cases\/oppas-by-chaima"/);
  assert.equal((html.match(/class="method-note /g) ?? []).length, 4);
  assert.equal((html.match(/<canvas class="story-photo-mosaic"/g) ?? []).length, 4);
});

test("uses bounded raster assets on the homepage and case pages", async () => {
  const [homeSource, editorialSource, tareeqiSource, guidanceSource, aynSource, baynSource, caseData, css, caseResponse, tareeqiResponse, aynResponse, baynResponse, oppasResponse] = await Promise.all([
    readFile(new URL("../app/components/HomeExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/EditorialCaseExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/CaseExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/GuidanceTravelExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/AynAlHikmahExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/BaynSignalExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/caseContent.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    render("/cases/guidance-travel"),
    render("/cases/tareeqi"),
    render("/cases/ayn-al-hikmah"),
    render("/cases/bayn-signal"),
    render("/cases/oppas-by-chaima"),
  ]);

  assert.equal(caseResponse.status, 200);
  const caseHtml = await caseResponse.text();
  assert.match(caseHtml, /Guidance Travel/);
  assert.match(caseHtml, /guidance-2026%2Fhero-laptops\.webp/);
  assert.match(caseHtml, /tc-style-board-guidance/);

  assert.equal(tareeqiResponse.status, 200);
  const tareeqiHtml = await tareeqiResponse.text();
  assert.match(tareeqiHtml, /tc-style-board-tareeqi/);

  assert.equal(aynResponse.status, 200);
  const aynHtml = await aynResponse.text();
  assert.match(aynHtml, /Ayn Al-Hikmah/);
  assert.match(aynHtml, /ayn-2026%2Fhero-laptops\.webp/);
  assert.match(aynHtml, /tc-style-board-ayn/);

  assert.equal(baynResponse.status, 200);
  const baynHtml = await baynResponse.text();
  assert.match(baynHtml, /Bayn Signal/);
  assert.match(baynHtml, /bayn-2026%2Fhero-laptops\.webp/);
  assert.match(baynHtml, /tc-style-board-bayn/);

  assert.equal(oppasResponse.status, 200);
  const oppasHtml = await oppasResponse.text();
  assert.match(oppasHtml, /Oppas by Chaima/);
  assert.match(oppasHtml, /oppas-site-desktop\.png/);

  assert.match(homeSource, /className="story-photo-mosaic"/);
  assert.doesNotMatch(homeSource, /story-photo-piece/);
  assert.match(homeSource, /\/projects\/home\/tareeqi\.webp/);
  assert.match(homeSource, /\/about\/hero-abdel-profile\.png/);
  assert.match(homeSource, /\/about\/brain-default\.svg/);
  assert.match(css, /\/about\/brain-hover\.svg/);
  assert.doesNotMatch(css, /brain-head-clip|manifesto-coin-scene/);
  assert.equal((css.match(/--brain-region-mask:/g) ?? []).length, 5);
  assert.match(css, /color: var\(--zone-color\)/);
  assert.doesNotMatch(homeSource, /brain-stage-zone-/);
  assert.doesNotMatch(homeSource, /mind-portrait-foreground/);
  assert.doesNotMatch(homeSource, /\/about\/hero-profile-cutout-v2\.webp/);
  assert.doesNotMatch(homeSource, /mind-portrait-foreground-(glasses|ear)/);
  assert.doesNotMatch(homeSource, /\/about\/brain-color\.svg/);
  assert.match(homeSource, /xPercent: 104/);
  assert.match(homeSource, /manifestoMarkerWords = new Set\(\["écht", "kwartje", "kern"\]\)/);
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
  assert.match(tareeqiSource, /styleGuide: true/);
  assert.doesNotMatch(css, /backdrop-filter:\s*blur/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/i);
  assert.doesNotMatch(css, /\.mind-brush-stroke-base/);
  assert.doesNotMatch(homeSource, /mind-connector-map/);
  assert.match(homeSource, /heroCtaIdleRingCopy = "ZIE DE GEVOLGEN · ZIE DE GEVOLGEN · "/);
  assert.match(homeSource, /heroCtaActiveRingCopy = "ONTDEK PROJECTEN · ONTDEK PROJECTEN · "/);
  assert.match(homeSource, /caseCursorRingCopy = "BEKIJK CASE · BEKIJK CASE · "/);
  assert.doesNotMatch(homeSource, /<circle cx=\{zone\.dotX\}/);
  assert.doesNotMatch(homeSource, /Scroll om verder te kijken/);
  assert.match(css, /white-space: nowrap/);
  assert.match(css, /\.tc-card-shell \+ \.tc-card-shell \{ margin-top: -12svh; \}/);
  assert.match(css, /object-position 24s cubic-bezier\(0\.37, 0, 0\.63, 1\)/);
  assert.match(css, /\.tc-page-ayn \.tc-card-shell:nth-child\(5\) \.tc-card \{ background: #401818;/);
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
