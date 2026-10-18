import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const home = await readFile(new URL("../app/components/HomeExperience.tsx", import.meta.url), "utf8");

test("stacking the hero does not restore oversized viewport-based type", () => {
  assert.doesNotMatch(css, /font-size:\s*clamp\(3\.15rem,\s*13\.8vw/);
  assert.match(css, /\.mind-hero h1 \{ max-width: 100%; font-size: 3rem/);
  assert.match(css, /width: min\(100%, 26rem\); justify-self: center/);
});

test("brain hit regions belong to the photo, not a separately sized overlay", () => {
  assert.match(home, /className="mind-hero-photo-slide">\s*<div className="mind-hit-layer"/);
  assert.doesNotMatch(home, /alignHoverLayer|layoutPosition/);
  assert.match(css, /\.mind-hit-layer \{[^}]*inset: 0/);
});

test("hover cards support dismissal and moving from the trigger to the card", () => {
  assert.match(home, /event.key === "Escape"\) setActiveMindZone\(null\)/);
  assert.match(home, /onPointerEnter=\{keepMindCard\}/);
  assert.match(css, /\.mind-annotation-panel\.is-active \{\s*pointer-events: auto/);
});

test("navigation switches before labels wrap", () => {
  assert.match(css, /@media \(max-width: 1100px\) \{\s*\.site-header \.top-nav/);
  assert.match(css, /\.top-nav a \{\s*white-space: nowrap/);
});

test("mobile CTA stays circular and does not reintroduce the capsule orbit", () => {
  assert.match(css, /--hero-cta-circle-size: 5\.5rem;/);
  assert.doesNotMatch(css, /hero-cta-capsule-orbit|--hero-cta-touch-size/);
});

test("touch brain uses contour feedback and leaves the artwork unobstructed", () => {
  assert.match(css, /\.mind-brain-dots \{ display: none; \}/);
  assert.doesNotMatch(home, /className="mind-touch-tabs"/);
  assert.match(home, /className="mind-brain-contours"/);
  assert.match(home, /contours.dataset.intro = "seen"/);
  assert.doesNotMatch(css, /aspect-ratio: 1\.06; border-top:/);
});

test("compact hero height follows portrait geometry instead of viewport height", () => {
  assert.match(css, /min-height: calc\(72\.2cqw \+ var\(--space-6\) \+ var\(--space-3\)\)/);
  assert.doesNotMatch(css, /min-height: max\(40rem, calc\(100svh - 11rem\)\)/);
});

test("postcard tracks cannot grow to intrinsic unwrapped headline widths", () => {
  assert.match(css, /grid-template-columns: minmax\(0, 1\.6fr\) minmax\(0, 1fr\)/);
  assert.match(css, /\.contact h2 span, \.contact h2 em \{ white-space: normal; overflow-wrap: anywhere; \}/);
  assert.match(css, /\.postcard-links \{ grid-column: 1 \/ -1; grid-row: 3; min-width: 0/);
});
