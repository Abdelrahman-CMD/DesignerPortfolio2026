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
  assert.match(html, /Abdelrahman — Senior Digital Designer/);
  assert.match(html, /Ik ontwerp met alles wat ik onderweg leer/);
  assert.match(html, /class="mind-hero-canvas"/);
  assert.match(html, /mind-hero-base\.webp/);
  assert.equal((html.match(/class="mind-zone mind-zone-/g) ?? []).length, 5);
  assert.match(html, /class="mind-cosmos"/);
  assert.match(html, /Tools: Figma, Framer en AI/);
  assert.doesNotMatch(html, /hero-project-letter|hero-rule/);
  assert.match(html, /class="contact-postcard"/);
  assert.match(html, /class="floating-contact"/);
  assert.equal((html.match(/class="link-icon"/g) ?? []).length, 14);
  assert.match(html, /class="method-horizontal"/);
  assert.equal((html.match(/class="project-entry /g) ?? []).length, 7);
  assert.match(html, /href="\/cases\/oppas-by-chaima"/);
  assert.equal((html.match(/class="method-note /g) ?? []).length, 4);
  assert.equal((html.match(/<canvas class="story-photo-mosaic"/g) ?? []).length, 4);
});

test("uses bounded raster assets on the homepage and case pages", async () => {
  const [homeSource, editorialSource, tareeqiSource, caseData, css, caseResponse, oppasResponse] = await Promise.all([
    readFile(new URL("../app/components/HomeExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/EditorialCaseExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/CaseExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/caseContent.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    render("/cases/guidance-travel"),
    render("/cases/oppas-by-chaima"),
  ]);

  assert.equal(caseResponse.status, 200);
  const caseHtml = await caseResponse.text();
  assert.match(caseHtml, /Guidance Travel/);
  assert.match(caseHtml, /case-shots%2Fguidance-overview\.webp/);

  assert.equal(oppasResponse.status, 200);
  const oppasHtml = await oppasResponse.text();
  assert.match(oppasHtml, /Oppas by Chaima/);
  assert.match(oppasHtml, /oppas-site-desktop\.png/);

  assert.match(homeSource, /className="story-photo-mosaic"/);
  assert.doesNotMatch(homeSource, /story-photo-piece/);
  assert.match(homeSource, /\/projects\/home\/tareeqi\.webp/);
  assert.match(homeSource, /\/about\/mind-hero-base\.webp/);
  assert.match(homeSource, /\/about\/web\/fatherhood\.webp/);
  assert.doesNotMatch(homeSource, /image: "\/projects\/(tareeqi|ayn|guidance|bayn)-overview\.jpg"/);
  assert.match(caseData, /\/projects\/case-shots\/ayn-detail\.webp/);
  assert.match(caseData, /https:\/\/oppasbychaima\.nl\//);
  assert.doesNotMatch(homeSource, /from "next\/link"/);
  assert.doesNotMatch(editorialSource, /from "next\/link"/);
  assert.doesNotMatch(tareeqiSource, /from "next\/link"/);
  assert.doesNotMatch(css, /backdrop-filter:\s*blur/i);
  assert.doesNotMatch(css, /prefers-reduced-motion:\s*reduce/i);
});
