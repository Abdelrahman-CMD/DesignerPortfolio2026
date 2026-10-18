# Responsive contract

Local implementation; do not publish without approval.

## Shared rules

- Keep existing brand typography, colour and editorial spacing.
- Use rem tokens for text and spacing, Grid/Flex for composition and aspect-ratio for media.
- Text must reserve its own height. A fixed viewport height must not obscure content.
- Width controls composition; input capability controls optional pointer effects.
- Essential information remains available through keyboard and touch.
- Never hide overflow as a substitute for fixing overflowing text.
- Resize without reloading as well as loading directly at each breakpoint.

## Component contracts

| Component | Compact layout | Wide layout | Invariant |
| --- | --- | --- | --- |
| Header | Hamburger at <=1100 CSS px | Full links above 1100 | Labels never wrap; navigation never collides with brand |
| Hero | Stack at <=720; two columns above | Existing editorial composition | No sudden text enlargement when stacking |
| Hero portrait | Stacked below CTA at <=720; capped at 26rem | Aligned beside heading on intermediate widths | Brain artwork and hit regions share photo geometry |
| Brain details | Tap artwork with light contour feedback; no extra numbered controls | Hover with active contour above 720 | Details also available on keyboard focus; Escape dismisses |
| Work CTA | Left 88px circle at <=720 | Centred circle above 720 | Magnet only above 980 with fine pointer |
| Case intro | Flowing copy followed by media at <=980 | Existing wide layout | Media never overlays summary or metadata |
| Sticky notes | Existing touch flip behaviour | Existing desktop behaviour | Long filenames may wrap; copy stays within paper |
| About headings | Smaller fixed text steps in narrow columns | Existing editorial sizes | Long NL/EN words fit their column |
| Contact postcard | Stack copy and portrait at <=980; 2x2 links at <=720 | Two bounded content columns; four contact cells | Headline, portrait and every link stay inside the card |

## Verification

Check 320, 390, 420, 421, 681, 719, 720, 721, 820, 980, 981, 1100,
1101, 1280 and 1600 CSS pixels. Include short and tall viewports.

Record the actual innerWidth, not only the requested browser viewport:
browser zoom can make those different.

- Compare sizes immediately before/after each breakpoint.
- Check both languages and all eight case routes.
- Inspect heading/body overflow and horizontal page overflow.
- Compare photo and hit-layer bounding boxes at intermediate and wide widths.
- Check keyboard focus, Escape, touch alternatives and reduced motion.
- Check 200% browser zoom and a 320 CSS-pixel reflow viewport.
- Cross-browser/physical-device checks are separate from local browser checks.

Automated source guards are regression checks, not accessibility certification
or a substitute for visual and real-device testing.

## Local QA record

- 28 homepage text-overflow checks: NL/EN at 320, 390, 420, 421, 681,
  720, 721, 820, 980, 981, 1100, 1101, 1280 and 1600 CSS px.
- 64 case checks: eight routes, both languages, at 320, 721, 980 and 1280.
- A short 600px-high viewport included on the homepage.
- Navigation opens and closes with Escape at narrow width.
- Brain choices respond to keyboard focus; Escape dismisses their card.
- At 681px the hero title is 48px (previously 84.8px); portrait capped at 416px.
- Physical touch devices, other browser engines and actual 200% browser zoom
  still require separate verification. Width-based checks do not replace these.
- Footer follow-up: 24 containment checks, both languages at 320, 374, 375,
  681, 720, 721, 783, 980, 981, 1100, 1280 and 1600px. These include headline
  line boxes, portrait bounds and all four individual contact cells, not just
  text scrollWidth. Scrolled screenshots checked at 783 and 1280px.
- Compact hero no longer reserves the full viewport height. Its minimum
  canvas height follows the portrait width/aspect ratio, with explicit padding.
- Mobile CTA now uses an 88px circle instead of a capsule. The original rotating
  text remains for visual approval; text legibility at that size is still a
  design review point, not a passed accessibility claim.
- Touch brain prototype removes the portrait divider and extra number controls.
  Contours derive from the same region masks as the artwork. A single
  introductory accent starts on intersection, with no looping pulse; reduced
  motion skips it. Narrow detail cards reserve 16rem to avoid jumping between
  selections. Physical touch testing remains open.
