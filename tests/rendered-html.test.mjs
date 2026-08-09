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
  assert.match(html, /Ontwerpen voor impact, voorbij de spotlights/);
  assert.match(html, /class="hero-case-preview"/);
  assert.match(html, /class="method-horizontal"/);
  assert.equal((html.match(/class="project-entry /g) ?? []).length, 6);
  assert.equal((html.match(/class="method-note /g) ?? []).length, 4);
  assert.doesNotMatch(html, /<canvas\b/i);
});

test("uses bounded raster assets on the homepage and case pages", async () => {
  const [homeSource, caseData, css, caseResponse] = await Promise.all([
    readFile(new URL("../app/components/HomeExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/caseContent.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    render("/cases/guidance-travel"),
  ]);

  assert.equal(caseResponse.status, 200);
  const caseHtml = await caseResponse.text();
  assert.match(caseHtml, /Guidance Travel/);
  assert.match(caseHtml, /case-shots%2Fguidance-overview\.webp/);

  assert.match(homeSource, /Array\.from\(\{ length: 6 \}/);
  assert.match(homeSource, /\/projects\/home\/tareeqi\.webp/);
  assert.match(homeSource, /\/about\/web\/fatherhood\.webp/);
  assert.doesNotMatch(homeSource, /image: "\/projects\/(tareeqi|ayn|guidance|bayn)-overview\.jpg"/);
  assert.match(caseData, /\/projects\/case-shots\/ayn-detail\.webp/);
  assert.doesNotMatch(css, /backdrop-filter:\s*blur/i);
});
