# Motion audit — huidige portfolio

Versie: 21 september 2026  
Scope: homepage, acht casepagina’s en playground  
Status: documentatie van de huidige situatie, geen voorstel voor nieuwe animaties

## 1. Overkoepelende motion direction

De website gebruikt animatie als redactionele timing. Beweging moet informatie ordenen, aandacht vertragen en de bezoeker door het verhaal begeleiden. De motion voelt:

- Editorial en beheerst.
- Tactiel door papier, post-its, handgeschreven notities en lichte rotaties.
- Ruimtelijk door parallax, sticky composities en overlappende kaarten.
- Niet volledig minimalistisch: de homepage bevat een aantal uitgesproken signature moments.
- Overwegend responsief op scroll, hover en pointer proximity.

De drie belangrijkste motion signatures zijn:

1. Pixelated image reveals op de homepage.
2. Scroll-pacing met sticky kaarten op de casepagina’s.
3. Editoriale tekstonthulling via masks, regels, handschrift en lijntekeningen.

Er is momenteel geen animatie tussen verschillende pagina’s. Navigeren naar een andere pagina veroorzaakt een directe routewissel; elke nieuwe pagina start daarna haar eigen intro.

## 2. Globaal motion framework

| Categorie | Huidige toepassing |
| --- | --- |
| Snelle micro-interactie | 180 ms |
| Standaard UI-transitie | 240 ms |
| UI-easing | `cubic-bezier(0.16, 1, 0.3, 1)`: snel reageren, zacht uitlopen |
| Element entrance | Meestal 650–900 ms |
| Grote section entrance | Tot circa 1.15 seconde |
| Scroll smoothing | Meestal 0.45–0.75 scrub |
| Bewegingsrichting | Vooral verticaal omhoog; hero-beelden komen horizontaal van rechts |
| Rotatie | Zeer beperkt, meestal 0.5–2 graden voor een tastbaar editorial effect |
| Hover scaling | Meestal 1.018–1.025 |
| Herhaalanimaties | Alleen bij CTA’s, cursors en kleine navigatie-aanwijzingen |

### Globale micro-interacties

- Navigatieknoppen liften ongeveer 1–2 pixels bij hover of focus.
- De actieve navigatieknop komt iets naar voren en wisselt van achtergrond.
- Linkiconen ontvouwen zich vanuit links; het icoon wordt daarbij lijn voor lijn getekend.
- De taalkeuze lift subtiel bij hover.
- De zwevende contactknop is bewust teruggebracht tot één actie: naar de contactkaart scrollen.
- Het share-icoon roteert 18 graden bij hover of keyboardfocus.
- Keyboardfocus gebruikt dezelfde interactionele toestand als hover waar dat logisch is.

## 3. Homepage

### 3.1 Vaste navigatie

Bij de eerste paginalaad:

- De navigatie fade in en beweegt 16 pixels omlaag naar haar eindpositie.
- Duur: 280 ms.
- De actieve sectie en lichte/donkere kleurstelling veranderen zodra een sectie ongeveer 18% vanaf de bovenkant van het scherm passeert.

Tijdens scroll:

- Bij duidelijk naar beneden scrollen verdwijnt de navigatie in 300 ms boven het scherm.
- Bij omhoog scrollen verschijnt zij in 420 ms opnieuw.
- Dicht bij de bovenkant blijft zij altijd zichtbaar.

Doel: zoveel mogelijk schermruimte geven aan het werk, zonder navigatie kwijt te raken.

### 3.2 Hero — eerste indruk

De hero gebruikt een gelaagde intro van ongeveer 1.3–1.5 seconde:

1. Navigatie verschijnt.
2. Kleine metadata verschijnen met 50 ms onderlinge vertraging.
3. Het hero-canvas wordt van boven naar beneden onthuld.
4. De kicker komt 12 pixels omhoog.
5. De drie titelregels schuiven vanuit een verborgen tekstmasker omhoog.
6. Introductietekst en CTA verschijnen.
7. Het portret schuift vanuit rechts het kader binnen.
8. Tegelijk wordt het portret opgebouwd uit een pixelmosaic van blokjes van ongeveer 8 pixels.

De pixelreveal duurt 780 ms en verspreidt zich diagonaal met lichte willekeur. Hierdoor voelt de afbeelding opgebouwd in plaats van simpelweg ingefadet.

Tijdens scroll:

- De CTA verdwijnt vroeg uit beeld en beweegt 34 pixels omhoog.
- De volledige hero wordt langzaam kleiner en transparanter.
- Tekst en beeld bewegen met verschillende snelheid, waardoor subtiele diepte ontstaat.
- Deze parallax is alleen actief vanaf tablet/desktopbreedte.

### 3.3 Circulaire hero-CTA

Op desktop:

- De typografische ring roteert continu één omwenteling per 11 seconden.
- De CTA reageert magnetisch wanneer de cursor binnen ongeveer 118 pixels van het element komt.
- Hoe dichter de cursor komt, hoe sterker de knop wordt meegetrokken.
- In actieve toestand verandert de cirkel in een licht organische vorm.
- Die vorm vervormt continu in een cyclus van 2.8 seconden.
- Het centrale symbool schaalt en roteert naar zijn actieve stand.
- Bij keyboardfocus wordt dezelfde actieve toestand gebruikt, maar zonder magnetische verplaatsing.

Op touchscreens wordt deze interactie vervangen door een gewone pill-vormige knop.

### 3.4 Interactieve hersenillustratie

Desktop:

- Hover of focus op een hersengebied activeert de bijbehorende kleurlaag.
- De kleurlaag fade in binnen de standaard 240 ms.
- Een annotatie verschijnt met een kleine verticale beweging en schaalverandering.
- De handgeschreven titel wordt letter voor letter opgebouwd.
- Tussen de letters zit 24 ms vertraging.
- Bij verdwijnen wordt de tekst in omgekeerde richting afgebouwd met 12 ms per teken.
- Aanvullende uitleg schuift daarna open.
- Het gebied “direction” laat aanvullend de gebruikte tools verschijnen.

Mobiel:

- De onzichtbare hoverzones worden vervangen door vijf zichtbare tabs.
- De geselecteerde zone toont de uitleg direct onder de tabs.
- Er is geen magnetisch of pointerafhankelijk gedrag.

### 3.5 Geselecteerd werk

Per project:

- Het projectbeeld begint op 72% opacity en 46 pixels lager.
- Bij binnenkomst rond 88% van de viewport beweegt het beeld in 900 ms naar zijn rustpositie.
- De tekst volgt apart vanuit 20 pixels lager in 650 ms.
- Binnen het beeld loopt een scrollgebonden parallax van −7% naar +7%.

Hover:

- Het beeld schaalt naar 102.5%.
- Saturatie en contrast nemen licht toe.
- De donkere overlay wordt sterker.
- Het linkicoon krijgt de projectkleur en roteert 6 graden.

Custom case cursor:

- Alleen zichtbaar met een nauwkeurige muis of trackpad.
- Volgt de pointer met een zachte vertraging van 240 ms.
- Heeft een organische vervormingscyclus van 2.8 seconden.
- Achtergrond- en tekstkleur veranderen per project.
- De actieve kleur wordt ook tijdens scrollen opnieuw bepaald, zonder dat de cursor eerst het project hoeft te verlaten.
- Rond de cursor verschijnt een subtiele lokale verlichting van het achtergrondgrid.

### 3.6 Manifesto

- De tekst wordt woord voor woord leesbaar.
- Ieder woord begint op 12% opacity en 18 pixels lager.
- Het volledige effect is direct gekoppeld aan scrollprogressie.
- De woorden volgen elkaar met een kleine offset van 35 ms.
- Gemarkeerde woorden krijgen een handgetekende lijn die van links naar rechts wordt onthuld.

Bij het woord “kwartje”:

- Een geïllustreerd muntje verschijnt links van het woord.
- Het rolt in ongeveer 720 ms over het woord.
- Daarna versnelt het naar buiten, verkleint en verdwijnt.
- Deze animatie start pas wanneer het woord daadwerkelijk in het leesgebied komt.

### 3.7 De persoon achter het werk

De sectie bestaat uit vier verhaalstops.

Algemene scrollbeweging:

- Een handgetekende route groeit mee met de scroll.
- Een marker reist over het pad.
- De stopmarkeringen worden gevuld wanneer de marker dichterbij komt.

Per verhaalstop:

- De foto wordt opnieuw opgebouwd met dezelfde pixelmosaic-taal als het heroportret.
- De onthullingsrichting wisselt links/rechts per foto.
- Tekst komt ongeveer 55 pixels omhoog met een zeer lichte rotatie.
- Label, titel en body verschijnen achter elkaar.
- Tape en handgeschreven kantnotities schalen vanuit 70% naar hun eindpositie met een lichte overshoot.
- De foto beweegt gedurende de volledige scroll van 42 pixels onder naar 28 pixels boven zijn uitgangspositie.
- Bij het verlaten van de stop wordt de tekst teruggebracht naar 14% opacity en 50 pixels omhoog verplaatst.
- De pixelafbeelding breekt tegelijkertijd weer af.

Deze sectie gebruikt de meest narratieve motion van de website.

### 3.8 Werkwijze

Intro:

- De twee titelregels komen omhoog vanuit tekstmasks.
- Duur: 1 seconde, met 120 ms verschil tussen de regels.
- De begeleidende tekst komt 40 pixels omhoog in 850 ms.

Horizontale methode:

- De sectie wordt tijdelijk vastgezet.
- Verticale scroll wordt vertaald naar horizontale verplaatsing door de vier stappen.
- Een voortgangslijn groeit gelijktijdig van links naar rechts.
- De pinlengte wordt dynamisch berekend op basis van de werkelijke breedte van de inhoud.

Toolstack:

- Toolchips verschijnen vanuit 65% schaal en 36 pixels lager.
- Zij hebben afwisselend ongeveer acht graden rotatie.
- De volgorde is bewust willekeurig.
- De beweging eindigt met een zachte overshoot.

### 3.9 Contact

- De volledige ansichtkaart komt vanuit 82 pixels lager in beeld.
- Start: 95.5% schaal en −1.8 graden rotatie.
- Duur: 1.15 seconde.
- Daarna verschijnen tekst, portret, merkstempel en de drie contactkanalen achter elkaar.
- De onderdelen bewegen 26 pixels omhoog en corrigeren een kleine wisselende rotatie.
- Onderlinge vertraging: 70 ms.

## 4. Gedeeld motionsysteem voor casepagina’s

Alle acht detailed cases gebruiken grotendeels dezelfde bewegingsgrammatica.

### 4.1 Navigatie en hero

De standaard intro duurt ongeveer 1.4 seconde:

1. Navigatie: fade en 18 pixels omlaag, 320 ms.
2. Kicker: 16 pixels omhoog, 280 ms.
3. Titelregels: vanuit tekstmasker omhoog, 520 ms met 50 ms stagger.
4. Samenvatting en metadata: fade en 24 pixels omhoog, 380 ms.
5. Hero-afbeelding: komt 16% vanuit rechts, start op 97% schaal en duurt 780 ms.

Tijdens scroll beweegt de hero-afbeelding ongeveer 7% omhoog. Bij MIRQA is dit teruggebracht naar 5%.

### 4.2 “De case in 30 seconden”

De titel en drie projectkleurige post-its zijn momenteel statisch. Zij hebben:

- Geen scroll entrance.
- Geen hoverreactie.
- Geen onderlinge reveal.
- Wel kleine vaste rotatieverschillen voor het fysieke papiergevoel.

Dit is visueel een duidelijke sectie, maar vormt motionmatig een rustpunt.

### 4.3 Research evidence

Aanwezig bij Tareeqi, Guidance Travel en Bayn Signal.

- Iedere evidence-module verschijnt vanuit 44 pixels lager.
- Duur: 850 ms.
- Trigger: zodra het element ongeveer 86% van de viewport bereikt.
- Bij terugscrollen wordt de animatie omgekeerd.
- De journeycurve wordt met scrollprogressie van links naar rechts getekend.
- De lijntekening loopt van ongeveer 72% viewportpositie tot het middelpunt van de sectie.

### 4.4 Sticky decision cards

Desktop:

- Iedere kaart krijgt circa 170 viewporthoogtes aan scrollruimte.
- De kaart blijft sticky rond 9% van de bovenkant.
- De zichtbare kaarthoogte is ongeveer 82% van het scherm.
- De mediazijde verschijnt vanuit 42 pixels lager, 98.5% schaal en opacity 0.
- Duur: 900 ms.
- De tekst verschijnt niet direct. Eyebrow, titel, body en notitie komen afzonderlijk vanuit een verticaal tekstmasker.
- Tussen tekstonderdelen zit een ruime scroll-offset, zodat de bezoeker de informatie gedoseerd ontvangt.
- Wanneer de volgende kaart verschijnt, schaalt de vorige kaart terug naar 98.5% en wordt zij licht donkerder.
- De kaarten stapelen visueel over elkaar.

Mobiel:

- De lange scrubbed tekstonthulling wordt vervangen door een directe entrance.
- De tekst verschijnt in 800 ms wanneer de kaart circa 84% van de viewport bereikt.
- Stagger tussen tekstdelen: 80 ms.
- Hierdoor blijft de case op mobiel compacter en beter bedienbaar.

Hover:

- De kaartafbeelding schaalt naar 102.5%.
- MIRQA gebruikt een eigen variant: de losse telefoonschermen liften 0.55 rem en krijgen een sterkere schaduw in 520 ms.

### 4.5 Optionele verdieping

- De verdieping is standaard gesloten.
- Het plusteken roteert in 240 ms naar 45 graden wanneer de sectie wordt geopend.
- De inhoud zelf heeft geen uitgewerkte hoogte- of staggeranimatie en verschijnt vrijwel direct.

### 4.6 Geselecteerde schermen

- Ieder frame verschijnt vanuit 38 pixels lager.
- Duur: 750 ms.
- Frames krijgen afwisselend −0.6 of +0.6 graden rotatie.
- De entrance start rond 88% van de viewport.

Hover:

- Lange pagina-afbeeldingen bewegen langzaam van boven naar beneden.
- De volledige hover-pan duurt maximaal 24 seconden.
- Het beeld schaalt naar 101%.
- De captionpijl beweegt diagonaal naar rechtsboven.

### 4.7 Bijdrage en resultaat

De hoofdinhoud van deze sectie is statisch.

- De externe websitelink lift 2 pixels.
- Achtergrond en tekstkleur worden bij hover omgewisseld.
- Er is geen scroll entrance voor de resultaatheadline of bewijsregels.

### 4.8 Footer

- De footer zelf is statisch.
- Bij hover beweegt de pijl naar de volgende case diagonaal naar rechtsboven.

## 5. Verschillen per case

| Case | Afwijkende motion |
| --- | --- |
| MIRQA | Hero-parallax van 5%. Drie sticky besliskaarten. Gegroepeerde telefoonschermen liften gezamenlijk bij hover. Geen research-journeysectie. |
| Tareeqi | Standaard hero-parallax. Research evidence verschijnt modulair en de journeylijn wordt tijdens scroll getekend. Drie sticky besliskaarten. |
| Ayn Al-Hikmah | Standaard case-intro en drie sticky kaarten. Geen research evidence of journeyanimatie tussen snapshot en kaarten. |
| Guidance Travel | Zelfde cardritme als Tareeqi, aangevuld met scroll-reveals voor enquêtebevindingen en een getekende journeycurve. |
| Bayn Signal | Zelfde evidence- en journeymotion als Guidance, uitgevoerd binnen de eigen groene projectkleur. |
| Hijama’N Cups | Vier sticky besliskaarten. De handgeschreven hero-annotatie verschijnt als laatste onderdeel van de hero-intro. Bewijsregister en cijfers hebben geen aparte telanimatie. |
| AtotZ Detachering | Dezelfde client-case motion als Hijama’N Cups, met vier sticky kaarten en een geanimeerde hero-annotatie. |
| Oppas by Chaima | Dezelfde client-case motion, uitgevoerd in de warmere projectkleuren. Geen unieke projectspecifieke animatie. |

De casepagina’s verschillen dus vooral in kleur, inhoud en beeldmateriaal. Hun timing en beweging zijn bijna identiek.

## 6. Playground

### Hero

- Navigatie komt in 550 ms van boven.
- Kicker volgt vanuit 18 pixels lager in 450 ms.
- De drie titelregels bewegen vanuit masks omhoog in 950 ms.
- Stagger: 80 ms.
- Introductie en statuslabels verschijnen in 650 ms.
- De scrollpijl beweegt continu op en neer in een cyclus van 1.8 seconde.

### Experimentele ruimte

Per object:

- Start op opacity 0, 100 pixels lager, 94% schaal en 9 graden naar achteren gekanteld.
- Entrance: 950 ms.
- Daarna beweegt ieder object tijdens scroll met zijn eigen dieptewaarde, tussen ongeveer 7% en 18%.

Pointerinteractie:

- De volledige wereld reageert op de cursor met maximaal circa 1.6 graden horizontale en 1.2 graden verticale rotatie.
- Reactietijd: 800 ms.
- Bij pointer leave keert de wereld in 1.1 seconde terug naar neutraal.

Hover op een kaart:

- De kaart komt 34 pixels naar voren in de 3D-ruimte.
- Schaal wordt 101.8%.
- De oorspronkelijke rotatie wordt rechtgetrokken.
- De schaduw wordt dieper.

## 7. Responsive en toegankelijkheid

### Touch en mobiel

- Custom cursors worden niet getoond.
- Magnetische CTA-beweging vervalt.
- Het interactieve brein wordt een tabinterface.
- Casekaartteksten gebruiken een korte entrance in plaats van langdurige scrollscrubbing.
- De horizontale methodesectie blijft scrollgestuurd, maar gebruikt de smallere mobiele layout.

### Reduced motion — huidige status

Reduced motion is gedeeltelijk geïmplementeerd:

- De homepage-hero slaat intro, parallax, ringrotatie en magnetische exit over.
- Het volledige heroportret wordt direct zichtbaar.
- Animaties en transitions binnen de interactieve hero worden vrijwel onmiddellijk afgerond.
- Casekaartteksten en research evidence worden direct zichtbaar.
- De journeylijn wordt direct volledig getekend.
- Grote transforms op casebeelden worden uitgeschakeld.

Nog niet volledig afgedekt:

- Manifesto, projectreveals, persoonlijke story, methode en contact kunnen op de homepage nog bewegen.
- De casehero en proof-frame fades worden niet volledig overgeslagen.
- De playground heeft geen aparte reduced-motionvariant.
- Er bestaat dus nog geen sitebrede reduced-motionstrategie.

## 8. Kritische samenvatting voor de animation designer

De homepage heeft een herkenbare, eigen motion identity: pixelreveal, organische CTA, handgeschreven annotaties, routeanimatie en horizontale storytelling. De casepagina’s zijn consistenter en rustiger, maar voelen daardoor ook meer als één herhaald template.

De grootste huidige verschillen:

- Homepage: expressief, authored en persoonlijk.
- Casepagina’s: systematisch, sticky en functioneel.
- Playground: ruimtelijk en experimenteel.

De sterkste bestaande basis is het principe dat scroll de leestijd regisseert. De belangrijkste aandachtspunten voor een volgende motionronde zijn:

1. Geef cases een kleine projectspecifieke motion signature zonder het gedeelde systeem te verliezen.
2. Onderzoek de statische overgangen bij snapshot, bijdrage en deep dive.
3. Voeg alleen een paginatransitie toe als die de continuïteit tussen homepage en case versterkt.
4. Maak reduced motion consequent over de volledige website.
5. Bewaak dat sticky storytelling aandacht vertraagt, maar geen gedwongen wachttijd wordt.
6. Gebruik handschrift en illustratieve beweging als betekenisvolle annotatie, niet als decoratie.

Kernzin voor de motion direction:

> Gebruik beweging als redactionele regie: laat eerst de hiërarchie landen, daarna het beeld spreken en pas als laatste de persoonlijke annotatie verschijnen.
