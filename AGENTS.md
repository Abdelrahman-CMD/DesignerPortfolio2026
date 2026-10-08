# Werkafspraken in deze repository

Kort briefje voor iedereen die hier werkt, mens of agent. Lees in elk geval het
eerste blok — dat is op 8 oktober 2026 een keer flink misgegaan.

## Live zetten gaat met een push. Niet met wrangler.

```bash
git push github main
```

De Cloudflare-worker **`abdelrahman-portfolio`** is gekoppeld aan
`Abdelrahman-CMD/DesignerPortfolio2026` en bouwt zichzelf opnieuw zodra er iets
op `main` binnenkomt. Hij bedient `abdelrahman.nl` en `www.abdelrahman.nl`.
Bouwen duurt ongeveer anderhalve minuut.

Er staat op hetzelfde Cloudflare-account een tweede worker,
**`site-creator-vinext-starter`**. Die bedient alleen zijn eigen
`*.workers.dev`-adres en heeft niets met de live site te maken. Hij is een
overblijfsel uit de tijd dat dit project op de hosting van ChatGPT draaide; de
naam komt uit dat sjabloon en staat daarom nog steeds in `package.json`.

**Daarom: `npx wrangler deploy` raakt de live site niet.** Dat commando leest de
naam uit `package.json`, komt dus bij die tweede worker uit, meldt vrolijk
"Success" en verandert niets aan `abdelrahman.nl`. Is die worker inmiddels
opgeruimd, dan maakt Cloudflare hem stilletjes opnieuw aan.

Hoe je deze fout herkent: de `.workers.dev`-URL toont je nieuwe werk en
`abdelrahman.nl` niet. Vergelijk dan de css-hash op de live pagina met wat er in
`dist/client/_next/static/css/` ligt. Lopen die uiteen, dan is het de koppeling
en niet de build — blijven wachten op "propagatie" heeft geen zin.

Twee dingen die hieruit volgen:

- Niet-gecommit werk bereikt de live site nooit. Vraag na een klus expliciet of
  het ook live moet, en commit en push dan.
- `git rev-parse HEAD github/main` hoort gelijk te zijn aan wat live staat.

De remote **`origin`** wijst naar de oude ChatGPT-git en staat volledig los van
de live site. Daarheen pushen doet niets. Zie `VERHUISD.md`.

## Voor je iets live zet

```bash
npm run lint
npm test
```

`npm test` bouwt eerst en draait daarna `tests/rendered-html.test.mjs` tegen de
productiebuild.

## Twee plekken die je samen moet aanpassen

De openingsanimatie van de homepage heeft een pre-hydration lock: een blokkerend
scriptje in `app/layout.tsx` zet `html[data-js="on"]`, en achter die selector
staan in `app/globals.css` alle beginposities van de hero. `HomeExperience.tsx`
spiegelt diezelfde waarden met `gsap.set()`. **Verander je de een, verander dan
ook de ander**, anders knippert de hero bij de eerste weergave. Er zit een
noodrem van 2,6 seconden op voor het geval de client-bundel niet binnenkomt.

Hetzelfde geldt voor de navigatiebalk: `CaseNavMotion.tsx` kopieert bewust de
drempels, duur en easing van `setHeaderVisibility` in `HomeExperience.tsx`,
zodat de balk zich op elke pagina gelijk gedraagt.

## Inhoud van de cases

De teksten van de drie klantcases staan in `clientStories` in
`ClientCaseExperience.tsx` — **niet** in `caseContent.ts`.

Eén harde regel: in de AtotZ-case mag de naam van de opdrachtgever nergens
voorkomen, ook niet in beeldmateriaal of bestandsnamen. Dat is op zijn verzoek.
Controleer screenshots voor je ze in `public/` zet.

Verzin niets. Cijfers, citaten en anekdotes in de cases komen uit wat de klant
daadwerkelijk heeft gezegd of uit Search Console. Staat iets niet vast, dan
blijft het eruit.
