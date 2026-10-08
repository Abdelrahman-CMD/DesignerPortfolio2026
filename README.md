# DesignerPortfolio2026

De portfolio-website van **Abdelrahman Ahmed**, digital designer. De site brengt
ontwerpdenken, interactieve cases en visuele experimenten samen in één
tweetalige ervaring (Nederlands en Engels).

**[Bekijk de live website](https://abdelrahman.nl)**

## Inhoud

- een interactieve homepage met ontwerpverhaal en geselecteerd werk;
- uitgebreide case studies voor conceptprojecten en klantwerk;
- een experimentele Playground met ruimtelijke, driedimensionale kaarten;
- een cv-pagina;
- responsieve layouts, scrollgestuurde animaties en subtiele micro-interacties.

## Belangrijke pagina's

Elke route bestaat in twee talen: `/nl/...` en `/en/...`.

- [Homepage](https://abdelrahman.nl/nl)
- [CV](https://abdelrahman.nl/nl/cv)
- [Playground](https://abdelrahman.nl/nl/playground)

Klantwerk:

- [AtotZ Detachering](https://abdelrahman.nl/nl/cases/atotz-detachering)
- [Oppas by Chaima](https://abdelrahman.nl/nl/cases/oppas-by-chaima)
- [Hijama 'N Cups](https://abdelrahman.nl/nl/cases/hijama-n-cups)

Concepten:

- [MIRQA](https://abdelrahman.nl/nl/cases/mirqa)
- [Tareeqi](https://abdelrahman.nl/nl/cases/tareeqi)
- [Guidance Travel](https://abdelrahman.nl/nl/cases/guidance-travel)
- [Bayn Signal](https://abdelrahman.nl/nl/cases/bayn-signal)
- [Ayn Al-Hikmah](https://abdelrahman.nl/nl/cases/ayn-al-hikmah)

## Technologie

- React 19 en TypeScript
- vinext en Vite
- GSAP voor motion en scrollinteracties
- Tailwind CSS en eigen CSS
- Cloudflare Workers, met de statische bestanden uit `public/` en `dist/client/`

## Lokaal ontwikkelen

Vereist Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Open daarna de lokale URL die in de terminal wordt getoond.

## Kwaliteitscontroles

```bash
npm run lint
npm test
npm run build
```

`npm test` bouwt eerst en draait daarna `tests/rendered-html.test.mjs` tegen de
productiebuild.

## Live zetten

**Een push naar `github`/`main` zet de site live. Meer is er niet.**

```bash
git push github main
```

De Cloudflare-worker `abdelrahman-portfolio` is gekoppeld aan deze repository en
bouwt zichzelf opnieuw zodra er iets op `main` binnenkomt. Dat duurt ongeveer
anderhalve minuut. Daarna controleer je het op https://abdelrahman.nl.

Wat dus **niet** werkt:

- `npx wrangler deploy` — dat gaat naar een andere worker die het domein niet
  bedient. Zie [`AGENTS.md`](AGENTS.md) voor het hele verhaal.
- een push naar de remote `origin` — dat is de oude ChatGPT-git en staat los van
  de live site.

Niet-gecommit werk bereikt de live site nooit. `git rev-parse HEAD github/main`
hoort gelijk te zijn aan wat er live staat.

## Repository

De `main`-branch bevat de actuele broncode én is de bron van de live website.
Zie [`VERHUISD.md`](VERHUISD.md) voor de geschiedenis: dit project heeft eerder
op de hosting van ChatGPT gedraaid.
