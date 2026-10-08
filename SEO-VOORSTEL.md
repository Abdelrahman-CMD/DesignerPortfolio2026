# Metadata en SEO — voorstel

Nog niet doorgevoerd. Dit is om te lezen en te corrigeren.

Opgesteld op 8 oktober 2026, met de terugkoppeling van de art director erbij.

---

## Het uitgangspunt

De art director las je werk zonder je labels en kwam uit op één patroon dat in
alle acht cases terugkomt:

> ambiguïteit → duidelijkheid → vertrouwen → actie

Elke case begint bij iemand die iets niet zeker weet. Past dit bureau bij mijn
sector. Kan ik deze persoon mijn kind toevertrouwen. Wat houdt deze behandeling
in. Wanneer moet ik vertrekken. Jij ontwerpt die twijfel weg.

Dat is interessanter dan een functietitel, en het is precies wat er nu níét in
je metadata staat. Daar staat "Senior digitaal ontwerper" — een claim over
jezelf, zonder bewijs, waar bovendien niemand op zoekt.

Twee dingen die daaruit volgen en die dit hele voorstel sturen:

1. **"Senior" gaat eruit.** Niet uit bescheidenheid, maar omdat het de lezer
   niets geeft. Je senioriteit blijkt uit hoe je denkt, niet uit het woord.
2. **De vraag van de bezoeker komt vooraan.** In plaats van te zeggen wat de
   case is, begint hij met wat de bezoeker zich afvroeg. Dat is concreter, en
   het is precies wat jouw werk onderscheidt.

Eén label overal: **Product & UX/UI designer**. Dat staat al in je
case-footers, dus het is geen nieuwe term — alleen eindelijk consequent.

---

## Deel 1 — Drie dingen die kapot zijn

Hier zit meer winst dan in welke zin dan ook. Doe deze eerst.

### 1. Elke verzonnen case-URL geeft een werkende pagina

```
/nl/cases/xyz123         → 200, titel "Xyz123 · Case study · Abdelrahman"
/nl/cases/hijama-n-cups  → 200, "Deze case is nog niet gepubliceerd"
```

De pagina wijst met zijn canonical naar zichzelf. Google noemt dit een *soft
404*: je meldt "alles in orde" terwijl er niets staat. Elke verkeerd gespelde
link wordt zo een pagina die gecrawld en beoordeeld wordt. Dit is het soort
melding dat je in Search Console zag.

**Wordt:** een echte 404 zodra de slug niet in de lijst staat.

### 2. De sitemap liegt over je wijzigingsdatums

Twee keer opgehaald met drie seconden ertussen:

```
<lastmod>2026-10-08T22:55:18.781Z</lastmod>
<lastmod>2026-10-08T22:55:21.860Z</lastmod>
```

Elke pagina zegt bij elke crawl dat hij zojuist is gewijzigd. Google leert
daarvan dat jouw datums niets betekenen en negeert ze. Je gooit een gratis
signaal weg.

**Wordt:** een vaste, echte datum per pagina.

### 3. `/onzin` toont je homepage met een 200

Hier redt de canonical je — die wijst naar `/nl`. Minder ernstig, maar een 404
is schoner.

---

## Deel 2 — De homepage

| | Nu | Wordt |
| --- | --- | --- |
| Titel NL | Abdelrahman · Senior digitaal ontwerper | Product & UX/UI designer in Amsterdam · Abdelrahman Ahmed |
| Titel EN | Abdelrahman · Senior digital designer | Product & UX/UI designer in Amsterdam · Abdelrahman Ahmed |

57 tekens, past binnen wat Google toont. Je volledige naam hoort erin: dat is
de zoekopdracht die je krijgt als iemand je kaartje heeft. "Product & UX/UI
designer in Amsterdam" is wat een bureau intypt. "Senior digitaal ontwerper"
typt niemand.

**Omschrijving NL — nu:**

> Ik ontwerp met alles wat ik onderweg leer: digitale producten op het snijvlak
> van strategie, menselijke waarde en doordachte vormgeving.

"Op het snijvlak van strategie, menselijke waarde en doordachte vormgeving" kan
iedereen over zichzelf zeggen. Twee richtingen om uit te kiezen:

**A — begint bij het patroon** (135 tekens)

> Ik haal de twijfel uit digitale keuzes. Acht cases van eerste gesprek tot
> live website, waarvan drie draaien voor echte opdrachtgevers.

**B — begint bij het bewijs** (150 tekens)

> Acht cases, van eerste gesprek tot live website. Drie staan online voor echte
> opdrachtgevers: een detacheringsbureau, een hijamapraktijk en een oppas.

A zegt wat voor ontwerper je bent en onderbouwt het meteen. B is feitelijker en
laat de conclusie aan de lezer. **Ik zou A nemen** — die eerste zin is het
onderscheidende, en het bewijs staat er direct achter zodat het geen loze
bewering blijft.

**Omschrijving EN** (139 tekens)

> I design the doubt out of digital choices. Eight case studies from first
> conversation to live site, three of them running for real clients.

---

## Deel 3 — De acht cases

Nu heet elke case `{Naam} · Case study · Abdelrahman`. "Case study" staat op
elke portfoliopagina ter wereld en onderscheidt niets.

Maar helemaal weglaten kan ook niet: zoekt iemand op "AtotZ Detachering", dan
sta je naast de site van je eigen klant en moet duidelijk zijn dat jouw pagina
erover gáát. Dus: weg met het lege woord, erin wat deze case bijzonder maakt.

### Titels

| Nu | Wordt | Tekens |
| --- | --- | --- |
| AtotZ Detachering · Case study · Abdelrahman | AtotZ Detachering — website in één week · Abdelrahman | 53 |
| Hijama'N Cups · Case study · Abdelrahman | Hijama 'N Cups — dertien pagina's tegen twijfel · Abdelrahman | 61 |
| Oppas by Chaima · Case study · Abdelrahman | Oppas by Chaima — drietalig, boeken via WhatsApp · Abdelrahman | 62 |
| Mirqa · Case study · Abdelrahman | MIRQA — app-concept voor het moskeebezoek · Abdelrahman | 55 |
| Tareeqi · Case study · Abdelrahman | Tareeqi — navigatieconcept voor Mekka · Abdelrahman | 51 |
| Guidance Travel · Case study · Abdelrahman | Guidance Travel — concept voor Hajj-begeleiding · Abdelrahman | 61 |
| Bayn Signal · Case study · Abdelrahman | Bayn Signal — concept voor lokaal nieuws · Abdelrahman | 54 |
| Ayn Al-Hikmah · Case study · Abdelrahman | Ayn Al-Hikmah — platformconcept voor kennis · Abdelrahman | 57 |

Twee dingen vallen op in de huidige kolom. **Mirqa** staat er met een kleine
letter omdat de code de slug automatisch omzet; MIRQA is jouw schrijfwijze. En
bij je vijf concepten staat nergens in de titel dát het concepten zijn. Een
recruiter die alleen de zoekresultaten ziet, kan nu denken dat het allemaal
opgeleverd werk is. Het woord "concept" hoort erin — niet uit voorzichtigheid,
maar omdat je nergens anders in je portfolio iets anders doet.

### Omschrijvingen

Elke omschrijving begint met de vraag die de bezoeker had. Dat is het patroon
dat de art director eruit haalde, en het is meteen de beste klikzin die er is:
een vraag die de lezer herkent.

**AtotZ Detachering** (137)

> Past dit bureau bij mijn sector, en hoe neem ik gericht contact op? Zo bouwde
> ik dat in één week, en dit liet Search Console daarna zien.

**Hijama 'N Cups** (132)

> Wat houdt hijama in, past het bij mij, en durf ik contact op te nemen?
> Dertien pagina's die die vragen wegnemen voordat iemand belt.

**Oppas by Chaima** (136)

> Kan ik deze persoon mijn kind en mijn huis toevertrouwen? Een drietalige site
> die dat vertrouwen opbouwt voordat de eerste boeking komt.

**MIRQA** (141)

> Wanneer moet ik vertrekken, naar welke moskee, en klopt die tijd? Een
> app-concept over gedrag en timing, niet over nog een gebedstijdenlijst.

**Tareeqi** (136)

> Google Maps kent de weg, maar niet de plek. Een navigatieconcept voor Mekka
> en Medina, gebouwd op wat pelgrims steeds opnieuw vertelden.

**Guidance Travel** (146)

> Welke reis past bij mij, en wie begeleidt me? Een conceptsite die Hajj- en
> Umrahbegeleiding terugbrengt tot een rustige keuze. 21 mensen bevraagd.

**Bayn Signal** (140)

> Wat gebeurt er in mijn buurt, en wat kan ik ermee? Een concept voor lokaal
> nieuws dat eindigt in een vervolgstap in plaats van een tijdlijn.

**Ayn Al-Hikmah** (133)

> Welk boek, welke leraar, en kan ik die vertrouwen? Een platformconcept dat
> authentieke bronnen en persoonlijke leerpaden samenbrengt.

Alles hierin komt uit je eigen casetekst. De dertien pagina's, de drie talen,
de 21 enquêtedeelnemers, de pelgrimsverhalen, Search Console — ik heb ze alle
vijf teruggezocht in de code voor ik ze opschreef. Niets verzonnen.

**Eén ding om te controleren:** in de huidige AtotZ-omschrijving staat
"Framer-website". Klopt dat? Zo niet, dan staat daar nu iets onwaars.

---

## Deel 4 — Wat Google over je weet

Je hebt al `Person`-structuurdata: naam, rol, Amsterdam, talen, LinkedIn. Die
is in orde. Drie aanpassingen.

**Het label gelijktrekken.** `jobTitle` staat nu op "Productontwerper · UX/UI"
(NL) en "Product designer · UX/UI" (EN). Wordt overal "Product & UX/UI
designer", gelijk aan je titels en je footers.

**De omschrijving om het patroon heen bouwen.** Nu:

> Productontwerper die complexiteit begrijpelijk maakt, op het snijvlak van
> strategie, onderzoek en interfaceontwerp.

Wordt:

> Product & UX/UI designer in Amsterdam. Brengt onduidelijke digitale
> vraagstukken terug tot een route die mensen begrijpen en durven te nemen:
> structuur, interactie en visuele uitvoering in één hand.

**Een lijst van je cases op de homepage.** Nu weet Google dat jij bestaat, en
los daarvan dat er acht casepagina's zijn. Met een `ItemList` koppel je die aan
elkaar: dit is één samenhangend portfolio, dit zijn de acht stukken, in deze
volgorde. Dat is je werk laten spreken, maar dan machineleesbaar.

En de homepage markeren als `ProfilePage` met jou als `mainEntity`. Google
heeft daar een apart type voor, bedoeld voor precies dit: de pagina van één
maker.

---

## Deel 5 — Wat ik juist zou laten staan

**De deelkaart.** Je OG-afbeelding met "Ik ontwerp met alles wat ik onderweg
leer" is sterk: dat is jouw stem, en dat is wat iemand ziet als je portfolio in
een LinkedIn-bericht langskomt. Daar hoeven geen cases in. Alleen de alt-tekst
zegt nog "senior digitaal ontwerper" — die gaat mee.

**De URL van Hijama.** Die is nu `hijaman-cups` terwijl je merk "Hijama 'N
Cups" heet. Lelijk, maar die pagina heeft zestien maanden geschiedenis bij
Google. Een URL wijzigen zet die op nul tenzij je het perfect doorstuurt. Laten
staan, en een 301 toevoegen van `hijama-n-cups` naar `hijaman-cups` voor wie
het logisch spelt.

**Je hero.** Die zegt "Productdesigner maakt complexiteit begrijpelijk en
bruikbaar" — dat ligt al op één lijn met dit voorstel en met wat de art
director eruit haalde. Niet aankomen.

---

## Volgorde

1. De soft 404 — grootste effect, raakt geen enkele tekst
2. De sitemap-datums
3. Titels en omschrijvingen
4. De structuurdata
5. De 301 voor Hijama

Stap 1 en 2 kunnen meteen. Stap 3 pas als jij de teksten hierboven hebt
nagelopen — het zijn jouw woorden over jouw werk, niet de mijne.
