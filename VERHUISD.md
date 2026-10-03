# Dit project is verhuisd

> **Waar hoort dit bestand?** In de oude ChatGPT-repo
> (`git.chatgpt-team.site/.../appgprj_6a7869f6...`). Alleen daar klopt de tekst
> hieronder. Lees je dit in je lokale werkmap of op GitHub, dan gaat het
> **niet** over de map waar je nu in zit: die is actueel.

**Let op: de code in deze ChatGPT-repo is oud. Gebruik hem niet.**

De laatste versie hier is van **25 augustus 2026** (`5f43921`, "Replace hero brain artwork with interactive SVG layers"). Daarna is het project ergens anders verdergegaan en staat het hier **84 commits** achter.

---

## Waar alles nu staat

| Wat | Waar |
| --- | --- |
| De live website | **https://abdelrahman.nl** (Nederlands en Engels) |
| Alle code en geschiedenis | **https://github.com/Abdelrahman-CMD/DesignerPortfolio2026** (branch `main`) |
| De hosting | Cloudflare Workers, worker `site-creator-vinext-starter` |

Het oude webadres op `*.chatgpt.site` serveert de site niet meer. Het geeft een 401 en zit achter een inlog.

---

## Wil je aan de website werken?

Begin dan niet hier, maar haal de actuele versie op:

```bash
git clone https://github.com/Abdelrahman-CMD/DesignerPortfolio2026.git
cd DesignerPortfolio2026
npm install
npm run dev
```

---

## Voor wie hier technisch iets mee moet

Een paar dingen die sinds augustus veranderd zijn en die je niet uit deze oude code kunt afleiden:

**Eigen domein.** `abdelrahman.nl` loopt via Cloudflare, met het domein als custom domain op de worker (geen route). `www.abdelrahman.nl` stuurt met een 301 door naar het kale domein, met behoud van pad en querystring.

**Deployen gaat anders dan je hier ziet.** `vinext deploy` bestaat niet meer; dat is verhuisd naar `@vinext/cloudflare`, en die versie vindt de wrangler-config niet omdat de build hem genereert in `dist/server/`. Wat wel werkt:

```bash
npm run build
npx wrangler deploy --config dist/server/wrangler.json
```

**SEO en toegankelijkheid zijn uitgewerkt.** Per taal canonical-URL's en hreflang (inclusief `x-default`), per pagina OpenGraph en Twitter-kaarten, JSON-LD (`Person`, `CreativeWork`, `BreadcrumbList`), een echte `robots.ts` en `sitemap.ts`, en cache-regels in `public/_headers`. De playground staat bewust op `noindex`.

**Er is een CV-pagina bijgekomen** op `/nl/cv` en `/en/cv`, met knoppen in de navigatie en in de footer.

**Het interactieve brein werkt nu ook op tablet en mobiel**, via aantikbare punten in plaats van hover.

**De hero-intro heeft een pre-hydration lock.** Alle beginposities van de openingsanimatie staan in `globals.css` achter `html[data-js="on"]`, gezet door een blokkerend script in `app/layout.tsx`. De tweens in `HomeExperience.tsx` spiegelen diezelfde waarden met `gsap.set()`. Verander je de een, verander dan ook de ander. Er zit een noodrem van 2,6 seconden op: komt de client-bundel niet binnen, dan wordt de lock losgelaten en staat de hero gewoon volledig in beeld.

---

## Mag dit kluisje weg?

Dat is aan Abdelrahman. Er staat niets in wat niet ook op GitHub staat, dus er gaat niets verloren. Zolang het blijft bestaan, is deze notitie er om verwarring te voorkomen.

*Laatst bijgewerkt: 3 oktober 2026.*
