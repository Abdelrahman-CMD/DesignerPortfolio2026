"use client";

import { MouseEvent as ReactMouseEvent, ReactNode, useLayoutEffect, useRef } from "react";

export type Locale = "nl" | "en";

const english: Record<string, string> = {
  "Ga naar het werk": "Skip to selected work",
  "Digitaal ontwerper": "Digital designer",
  Werk: "Work",
  Over: "About",
  Aanpak: "Approach",
  "Direct contact": "Direct contact",
  "Neem contact op via LinkedIn": "Contact me on LinkedIn",
  "Stuur Abdelrahman een e-mail": "Email Abdelrahman",
  "Neem contact op via WhatsApp": "Contact me on WhatsApp",
  "Open contactmogelijkheden": "Open contact options",
  "Een kaart van hoe ik ontwerp": "A map of how I design",
  "Strategie / UX / Richting": "Strategy / UX / Direction",
  "Geen vaste formule. Wel een stevig vertrekpunt.": "No fixed formula. A strong starting point.",
  "Ik ontwerp met": "I design with",
  "alles wat ik": "everything I",
  "onderweg": "learn along",
  "leer.": "the way.",
  "Wat ik leer verandert mijn blik. Wat ik belangrijk vind blijft staan: een helder fundament, scherpe keuzes en websites die mensen zonder omwegen begrijpen.": "What I learn changes how I see. What matters stays constant: a clear foundation, deliberate choices and websites people understand without detours.",
  "Bekijk 7 cases": "View 7 case studies",
  Nieuwsgierigheid: "Curiosity",
  "De echte vraag vinden": "Finding the real question",
  "Aandacht, afweging en vooruitdenken brengen aannames terug tot de vraag die er echt toe doet.": "Attention, judgement and foresight reduce assumptions to the question that truly matters.",
  Verbindingen: "Connections",
  "Context bij elkaar brengen": "Bringing context together",
  "Losse signalen, perspectieven en ruimtelijke context worden één samenhangend beeld.": "Separate signals, perspectives and spatial context become one coherent picture.",
  "Herinnering als springplank": "Memory as a springboard",
  "Ervaring, taal en associaties vormen de bron waaruit onverwachte ideeën kunnen ontstaan.": "Experience, language and associations become the source of unexpected ideas.",
  Structuur: "Structure",
  "Patronen zichtbaar maken": "Making patterns visible",
  "Visuele informatie wordt herkend, geordend en vertaald naar een ontwerp zonder ruis.": "Visual information is recognised, organised and translated into a design without noise.",
  "Richting geven": "Setting direction",
  "Van gedachte naar realiteit": "From thought to reality",
  "Intentie wordt verfijnd tot ritme, timing en een uitvoering die precies op haar doel landt.": "Intent is refined into rhythm, timing and an execution that lands exactly where it should.",
  "Onderdelen van mijn ontwerpdenken": "Parts of my design thinking",
  "Kies een hersendeel": "Choose a region",
  "Mijn houding": "My perspective",
  "Dualiteit als methode": "Duality as a method",
  "Vrij denken.": "Think freely.",
  "Verantwoord bouwen.": "Build responsibly.",
  Projecten: "Projects",
  "Geselecteerd werk": "Selected work",
  "Vier zelf geïnitieerde concepten tonen hoe ik kansen in een niche ontdek en vertaal naar een heldere digitale richting. Drie live klantprojecten laten zien hoe strategie, content en ontwerp in de praktijk samenkomen.": "Four self-initiated concepts show how I uncover opportunities in a niche and translate them into a clear digital direction. Three live client projects show how strategy, content and design come together in practice.",
  Conceptprojecten: "Concept projects",
  Klantprojecten: "Client projects",
  Conceptproject: "Concept project",
  Klantproject: "Client project",
  "Zelf geïnitieerd": "Self-initiated",
  "Een lokaal gevoed kaartplatform dat pelgrims voorbij de bekende routes brengt — met rust, context en toegankelijkheid als kompas.": "A locally informed mapping platform that takes pilgrims beyond familiar routes, guided by calm, context and accessibility.",
  "Strategie · UX/UI · Productconcept": "Strategy · UX/UI · Product concept",
  "Een boekhandel en leeromgeving die boeken, geleerden en de structuur van studeren uit de Haramain dichterbij brengt.": "A bookstore and learning environment that brings books, scholars and the structure of studying in the Haramain within reach.",
  "Strategie · E-commerce · Leerervaring": "Strategy · E-commerce · Learning experience",
  "Een conversiegerichte reiservaring waarin elke keuze — van pakketfilter tot reflectie — het vertrouwen van de pelgrim versterkt.": "A conversion-led travel experience where every choice, from package filters to reflection, strengthens the pilgrim’s confidence.",
  "Conversiestrategie · UX/UI · Webontwerp": "Conversion strategy · UX/UI · Web design",
  "Een betrouwbaar signaalplatform dat expats en migranten vroegtijdig context geeft over regels, routes en het dagelijks leven.": "A reliable signal platform that gives expats and migrants early context on regulations, routes and daily life.",
  "Redactionele strategie · UX/UI · Platformconcept": "Editorial strategy · UX/UI · Platform concept",
  "Een warme Framer-website voor een zelfstandige behandelpraktijk, waarin uitleg, vertrouwen en laagdrempelig boeken samenkomen.": "A warm Framer website for an independent treatment practice, bringing explanation, trust and effortless booking together.",
  "Strategie · UX/UI · Framer ontwerp en bouw": "Strategy · UX/UI · Framer design and build",
  "Een directe, conversiegerichte Framer-website voor een detacheringsbureau dat snelheid koppelt aan persoonlijke aandacht.": "A direct, conversion-focused Framer website for a staffing agency that combines speed with personal attention.",
  "Positionering · UX/UI · Framer ontwerp en bouw": "Positioning · UX/UI · Framer design and build",
  "Een warme website voor een pedagogisch opgeleide oppas, waarin thuisritme, duidelijke afspraken en oudervertrouwen samenkomen.": "A warm website for a childcare professional, bringing home routines, clear agreements and parental trust together.",
  "Positionering · UX/UI · Webontwerp en bouw": "Positioning · UX/UI · Web design and build",
  "Bekijk de case Tareeqi": "View the Tareeqi case study",
  "Bekijk de case Ayn Al-Hikmah": "View the Ayn Al-Hikmah case study",
  "Bekijk de case Guidance Travel": "View the Guidance Travel case study",
  "Bekijk de case Bayn Signal": "View the Bayn Signal case study",
  "Bekijk de case Hijama’N Cups": "View the Hijama’N Cups case study",
  "Bekijk de case AtotZ Detachering": "View the AtotZ Detachering case study",
  "Bekijk de case Oppas by Chaima": "View the Oppas by Chaima case study",
  "Verdeling van de cases": "Case study breakdown",
  "De balans": "The balance",
  "Fundament vóór": "Foundation before",
  "Ik wissel van gereedschap, tempo en route zodra de vraag daarom vraagt. Helderheid, toegankelijkheid en intentie blijven staan. Daar toets ik iedere vondst aan.": "I change tools, pace and route whenever the question calls for it. Clarity, accessibility and intent remain constant. Every discovery is tested against them.",
  "De mens achter het werk": "The person behind the work",
  "Een klik voel je snel.": "You feel a connection quickly.",
  "Goed werk bouw je samen.": "Good work is built together.",
  "Ik maak makkelijk contact, maar zeg ook eerlijk wanneer een samenwerking niet klopt. Als er vertrouwen is, mag het gesprek scherp worden. Dan komen de vragen op tafel die een website beter maken.": "I connect easily, but I am equally honest when a collaboration is not the right fit. When there is trust, the conversation can be candid. That is when the questions that improve a website come to the table.",
  "Wie ik ben": "Who I am",
  "Wat ik doe": "What I do",
  "Hoe ik blijf groeien": "How I keep growing",
  "En buiten het scherm": "Beyond the screen",
  "Nieuwsgierigheid boven zekerheid": "Curiosity over certainty",
  "Thuisstudio / waar vragen vorm krijgen": "Home studio / where questions take shape",
  "Strategie vóór schermen": "Strategy before screens",
  "In ontwikkeling / bouwen, testen, opnieuw kijken": "In progress / build, test, look again",
  "Blijf een leerling": "Remain a learner",
  "Veldnotities / kennis houdt mijn blik beweeglijk": "Field notes / knowledge keeps my perspective moving",
  "Ontwerp begint thuis": "Design begins at home",
  "Dagelijks leven / de belangrijkste rol buiten het scherm": "Daily life / the most important role beyond the screen",
  "Abdelrahman in zijn ontwerpstudio": "Abdelrahman in his design studio",
  "Abdelrahman werkt aan een digitaal ontwerp achter zijn bureau": "Abdelrahman working on a digital design at his desk",
  "Abdelrahman leest The Heart of Design": "Abdelrahman reading The Heart of Design",
  "Abdelrahman als vader bij de kinderwagen": "Abdelrahman as a father beside the pram",
  "Zijprofiel van Abdelrahman met een interactieve kaart van zijn ontwerpdenken": "Side profile of Abdelrahman with an interactive map of his design thinking",
  "Ik ben Abdelrahman. Sociaal genoeg om snel aan tafel te komen, scherp genoeg om niet overal ja op te zeggen. Een goede klik geeft ruimte voor eerlijke vragen — precies waar het werk sterker van wordt.": "I’m Abdelrahman. Social enough to get around the table quickly, discerning enough not to say yes to everything. A genuine connection creates room for honest questions, exactly where the work becomes stronger.",
  "We leggen aannames, gedrag en doelen naast elkaar. Ik zoek het moment waarop losse informatie één duidelijke richting krijgt. Vanaf daar ontwerp ik websites die logisch reageren op echte keuzes.": "We put assumptions, behaviour and goals side by side. I look for the moment when separate pieces of information form one clear direction. From there, I design websites that respond logically to real choices.",
  "Ik lees, observeer en experimenteer met strategie, psychologie, techniek, cultuur en AI. Niet om iedere trend te volgen, maar om per vraag een rijker antwoord te kunnen geven.": "I read, observe and experiment with strategy, psychology, technology, culture and AI. Not to follow every trend, but to find a richer answer to every question.",
  "Een kind accepteert geen ingewikkelde uitleg voor iets dat simpel moet zijn. Vaderschap houdt mijn werk menselijk: aandacht is schaars, context verandert continu en verantwoordelijkheid laat zich niet wegstylen.": "A child will not accept a complicated explanation for something that should be simple. Fatherhood keeps my work human: attention is scarce, context keeps changing and responsibility cannot be styled away.",
  "Hoe ik werk": "How I work",
  "Niet alleen ontwerpen.": "More than designing.",
  "Het proces dirigeren.": "Directing the process.",
  "Ik pas de route aan zodra onderzoek daar aanleiding toe geeft. De volgorde blijft helder: samen scherpstellen, bewijs zoeken, tastbaar maken en tussendoor beslissen of we nog hetzelfde probleem oplossen.": "I adjust the route whenever research gives us reason to. The sequence stays clear: sharpen together, seek evidence, make it tangible and keep checking whether we are still solving the same problem.",
  "Strategie → Onderzoek → Ontwerp → Richting": "Strategy → Research → Design → Direction",
  "Vier stappen in mijn werkwijze": "Four steps in my process",
  "Scrollroute · links naar rechts": "Scroll path · left to right",
  Sparren: "Align",
  "De klik is geen bijzaak.": "The connection is not a detail.",
  "Een goed gesprek laat snel zien of we elkaar begrijpen én durven tegenspreken. We maken aannames zichtbaar en bepalen welke verandering de website werkelijk moet veroorzaken.": "A good conversation quickly reveals whether we understand each other and are willing to challenge one another. We surface assumptions and define the change the website truly needs to create.",
  "Klantsessies · Workshops · Richting": "Client sessions · Workshops · Direction",
  "Begin met de vraag — niet met het eindproduct.": "Start with the question, not the final product.",
  Verdiepen: "Explore",
  "De context beslist mee.": "Context shapes the decision.",
  "Deskresearch, gesprekken en observaties brengen de vraag dichtbij. AI helpt patronen sneller toetsen en nieuwe vragen formuleren; het oordeel en de richting blijven menselijk.": "Desk research, conversations and observations bring the question closer. AI helps test patterns and formulate new questions faster; judgement and direction remain human.",
  "Deskresearch · Praktijkonderzoek · AI": "Desk research · Field research · AI",
  "AI versnelt het zoeken. Het oordeel blijft menselijk.": "AI accelerates the search. Judgement stays human.",
  Vormgeven: "Design",
  "Maak het vroeg genoeg echt.": "Make it real early enough.",
  "In Figma krijgt de ervaring structuur. In Framer of code wordt ze tastbaar en testbaar. AI versnelt varianten en uitvoering, zonder de ontwerpintentie over te nemen.": "In Figma, the experience gains structure. In Framer or code, it becomes tangible and testable. AI accelerates variations and execution without taking over the design intent.",
  "Figma · Framer · Bouwen met AI-ondersteuning": "Figma · Framer · AI-assisted building",
  "Maak het vroeg voelbaar. Dan wordt feedback concreet.": "Make it tangible early. Feedback becomes specific.",
  "Koers houden": "Stay on course",
  "Koers houden is ook ontwerpen.": "Staying on course is also design.",
  "Tijdens iedere fase kijken we samen: klopt de richting nog, begrijpen gebruikers dit en draagt iedere keuze bij aan het doel? Zo blijft de klant onderdeel van iedere ontwerpbeslissing.": "At every stage we review together: is the direction still right, do users understand it and does every choice support the goal? This keeps the client part of every design decision.",
  "Prototypebeoordeling · Afstemming · Iteratie": "Prototype review · Alignment · Iteration",
  "Stem af. Stel bij. Houd samen koers.": "Align. Adjust. Stay on course together.",
  "Vanaf hier weer verticaal.": "Vertical again from here.",
  "Mijn gereedschapskist": "My toolkit",
  Strategie: "Strategy",
  Deskresearch: "Desk research",
  Praktijkonderzoek: "Field research",
  Prototypen: "Prototyping",
  Afstemming: "Alignment",
  "Gereedschap versnelt. Richting blijft mensenwerk.": "Tools accelerate. Direction remains human work.",
  "Senior digitaal ontwerper": "Senior digital designer",
  "Ansichtkaart / Amsterdam — 2026": "Postcard / Amsterdam — 2026",
  "Even kijken": "Let’s see",
  "of het klikt?": "if we click?",
  "Geen pitch nodig. Vertel wat er speelt; ik stel de vragen. Geeft het gesprek energie, dan plannen we koffie.": "No pitch needed. Tell me what is happening; I will ask the questions. If the conversation creates energy, we will plan a coffee.",
  "Ontwerp is een dialoog": "Design is a dialogue",
  "BRENG DE VRAAG · TOETS DE KLIK": "BRING THE QUESTION · TEST THE FIT",
  "Leg je vraag op tafel": "Bring your question",
  "Contactkanalen": "Contact channels",
  "© 2026 · Met aandacht gebouwd · Nederland": "© 2026 · Built with care · The Netherlands",
  "Geen verkooppraat. Wel een goed gesprek.": "No sales pitch. A good conversation.",
  "Ga naar de playground": "Skip to the playground",
  "Playground navigatie": "Playground navigation",
  "Playground / ruimte voor experiment": "Playground / room to experiment",
  "Open veld · 2026": "Open field · 2026",
  "Buiten de vaste kaders": "Beyond fixed frames",
  "Een ruimte voor": "A space for",
  "ideeën vóórdat ze": "ideas before they",
  "cases worden.": "become case studies.",
  "Hier komen schetsen, materiaalstudies, beelden en digitale experimenten die nog niet om een afgerond verhaal vragen.": "This is where sketches, material studies, images and digital experiments live before they need a finished story.",
  "In opbouw": "In progress",
  "Inhoud volgt": "Content coming",
  "Betreed de ruimte": "Enter the space",
  "Placeholder-architectuur / klaar voor inhoud": "Placeholder architecture / ready for content",
  "Verschillende vormen.": "Different forms.",
  "Eén open atmosfeer.": "One open atmosphere.",
  "Breed kader": "Wide frame",
  "Verticaal kader": "Vertical frame",
  "Rond experiment": "Round experiment",
  "Vierkant fragment": "Square fragment",
  "Klein object": "Small object",
  "Lang frame": "Long frame",
  "Kleine planeet": "Small planet",
  "Breed archief": "Wide archive",
  "De ruimte staat. De inhoud mag groeien.": "The space is ready. The content can grow.",
  "Terug naar geselecteerd werk": "Back to selected work",
  "Wordt vervolgd · 2026": "To be continued · 2026",
  "Ga naar de case": "Skip to the case study",
  "Case navigatie": "Case study navigation",
  "Alle cases": "All case studies",
  "Start een gesprek": "Start a conversation",
  "Zelf geïnitieerd concept": "Self-initiated concept",
  "Klantcase": "Client case",
  "Mijn rol": "My role",
  Vertrekpunt: "Starting point",
  Status: "Status",
  Probleem: "Problem",
  Inzicht: "Insight",
  Oplossing: "Solution",
  Resultaat: "Outcome",
  "Volgende case": "Next case study",
  "Terug naar het werk": "Back to selected work",
  "Deze case is nog niet gepubliceerd.": "This case study has not been published yet.",
  "Case 01 · Concept Solution": "Case 01 · Concept solution",
  "Case 02 · Zelf geïnitieerd concept": "Case 02 · Self-initiated concept",
  "Case 03 · Concept Solution": "Case 03 · Concept solution",
  "Case 04 · Zelf geïnitieerd concept": "Case 04 · Self-initiated concept",
  "Case 05 · Klantproject": "Case 05 · Client project",
  "Probleemvinding vóór productvorming": "Problem discovery before product development",
  "De route was duidelijk.": "The route was clear.",
  "Wat ernaast lag, niet.": "What lay beyond it was not.",
  "Ik zag een gat tussen generieke navigatie en de lokale kennis die een reis betekenis geeft. Tareeqi is mijn ontworpen antwoord: een contextuele discovery-laag voor Mekka en Medina.": "I saw a gap between generic navigation and the local knowledge that gives a journey meaning. Tareeqi is my designed response: a contextual discovery layer for Mecca and Medina.",
  "Zelf geïnitieerde bevinding": "Self-initiated insight",
  "Toetsbare oplossingsrichting": "Testable solution direction",
  "Ik begon niet met een scherm. Ik begon met wat de bestaande kaarten niet konden vertellen.": "I did not start with a screen. I started with what existing maps could not tell.",
  "Generieke zoekresultaten": "Generic search results",
  "Verspreide lokale kennis": "Scattered local knowledge",
  "Geen route op intentie": "No intent-led route",
  "De bevinding": "The finding",
  "De route is vindbaar. De betekenis ernaast veel minder.": "The route is easy to find. The meaning alongside it far less so.",
  "Wie digitaal zoekt rond Mekka en Medina, vindt vooral rituelen, highlights en generieke kaartresultaten. Rustige plekken, lokale boekwinkels en praktische familiekennis blijven versnipperd over mensen, posts en toevallige tips.": "People searching digitally around Mecca and Medina mostly find rituals, highlights and generic map results. Quiet places, local bookstores and practical family knowledge remain scattered across people, posts and chance recommendations.",
  "Dat is geen gebrek aan plekken. Het is een gebrek aan context.": "This is not a lack of places. It is a lack of context.",
  "De marktkans": "The opportunity",
  "Een discovery-laag tussen de generieke kaart en lokale kennis.": "A discovery layer between the generic map and local knowledge.",
  "Het gat zit tussen ‘waar is iets?’ en ‘waarom past deze plek bij mij, vandaag?’. Tareeqi ordent lokale aanwijzingen op intentie, gezelschap en tempo — precies de context die een gewone kaart niet kent.": "The gap lies between ‘where is it?’ and ‘why does this place suit me today?’. Tareeqi organises local cues by intent, company and pace, precisely the context a conventional map does not know.",
  "Niet nóg een reisgids. Een contextuele routegenoot.": "Not another travel guide. A contextual travel companion.",
  "De oplossingsrichting": "The solution direction",
  "Van zoeken naar gericht ontdekken.": "From searching to intentional discovery.",
  "De interactieve kaart combineert lokale favorieten met filters als rustig, kindvriendelijk en verborgen parel. Een gebruiker start niet bij een lange lijst, maar bij de ervaring die op dat moment nodig is.": "The interactive map combines local favourites with filters such as quiet, child-friendly and hidden gem. Users begin with the experience they need in that moment, not with a long list.",
  "Minder opties tegelijk. Meer relevantie per keuze.": "Fewer options at once. More relevance in every choice.",
  "Contextuele kaart": "Contextual map",
  Intentiefilters: "Intent filters",
  "Lokale curatie": "Local curation",
  "Vertrouwen vóór verrassing": "Trust before surprise",
  "Vrij ontdekken vraagt om verantwoord ontwerpen.": "Free exploration calls for responsible design.",
  "Offline routes, leesbare informatie, familie- en oudervriendelijke filters en een duidelijke herkomst van tips maken ontdekking bruikbaar in drukte. De community voegt kennis toe; het systeem moet die kennis controleerbaar houden.": "Offline routes, readable information, family- and senior-friendly filters and transparent sourcing make discovery useful in busy situations. The community adds knowledge; the system must keep it verifiable.",
  "Inclusie is hier geen extra filter, maar productlogica.": "Inclusion is not an extra filter here; it is product logic.",
  "Familie & ouderen": "Families & seniors",
  "Herkomst zichtbaar": "Visible sourcing",
  "Het ontwerpsysteem": "The design system",
  "Culturele warmte, zonder visuele ruis.": "Cultural warmth without visual noise.",
  "Een redactionele serif geeft verhalen gewicht. De interface blijft bewust sober met Inter en Work Sans, ruime kaders en een crème basis. Bruin verankert vertrouwen; groen markeert ontdekking en voortgang.": "An editorial serif gives stories weight. The interface remains deliberately restrained with Inter and Work Sans, generous frames and a cream base. Brown anchors trust; green marks discovery and progress.",
  "De plek mag spreken. De interface hoeft niet te roepen.": "Let the place speak. The interface does not need to shout.",
  "Een sterk concept is een toetsbare hypothese, geen verzonnen succesverhaal.": "A strong concept is a testable hypothesis, not an invented success story.",
  "Tareeqi is een zelf geïnitieerde oplossingsrichting, geen gelanceerd product. De volgende stap is toetsen of lokale curatie sneller tot passende plekken leidt, offline zekerheid stress verlaagt en communitybijdragen betrouwbaar te beheren zijn.": "Tareeqi is a self-initiated solution direction, not a launched product. The next step is to test whether local curation leads to fitting places faster, offline reassurance reduces stress and community contributions can be managed reliably.",
  "Het ontwerp maakt de kans zichtbaar. Onderzoek moet de waarde bewijzen.": "The design makes the opportunity visible. Research must prove the value.",
  "Past de route echt beter bij het moment?": "Does the route truly fit the moment better?",
  "Verlaagt offline zekerheid de mentale belasting?": "Does offline reassurance reduce cognitive load?",
  "Blijft communitykennis betrouwbaar en actueel?": "Does community knowledge stay reliable and current?",
  "Mijn bijdrage": "My contribution",
  "Niet aantonen dat ik een interface kan maken. Aantonen dat ik een onbenutte vraag kan vinden en vertalen naar een toetsbaar systeem.": "Not proving that I can make an interface. Proving that I can find an unmet question and translate it into a testable system.",
  "De waarde van Tareeqi zit voor mij in de verbinding tussen observatie, positionering en uitvoering. Ik heb de kans afgebakend, de kernfuncties geprioriteerd, het responsive systeem ontworpen en zichtbaar gemaakt welke aannames nog validatie nodig hebben.": "For me, Tareeqi’s value lies in connecting observation, positioning and execution. I defined the opportunity, prioritised the core features, designed the responsive system and made clear which assumptions still require validation.",
  "De reis vroeg overgave.": "The journey called for surrender.",
  "Het boeken vooral overzicht.": "Booking mainly called for clarity.",
  "Ik zag een markt waarin persoonlijke begeleiding digitaal vaak eindigde als een ondoorzichtige pakketlijst. Guidance Travel vertaalt die zorg naar een rustige route van intentie naar een passende reis.": "I saw a market where personal guidance often became an opaque package list online. Guidance Travel translates that care into a calm journey from intent to a fitting trip.",
  "Marktobservatie Hajj & Umrah": "Hajj & Umrah market observation",
  "Toetsbaar serviceconcept": "Testable service concept",
  "Zekerheid vóór pakketkeuze": "Reassurance before package choice",
  "Ik begon niet met meer verkoopdruk. Ik begon met de vragen die een pelgrim wakker houden vóór vertrek.": "I did not start with more sales pressure. I started with the questions that keep a pilgrim awake before departure.",
  "Versnipperde pakketinformatie": "Fragmented package information",
  "Begeleiding bleef onzichtbaar": "Guidance remained invisible",
  "Te weinig besliszekerheid": "Too little decision confidence",
  "De spirituele reis voelde persoonlijk. Het boeken ervan niet.": "The spiritual journey felt personal. Booking it did not.",
  "Veel Hajj- en Umrahwebsites presenteerden pakketten als losse prijzen en lange lijsten. De begeleiding die de reis waardevol maakt bleef onzichtbaar, terwijl juist vóór vertrek behoefte ontstaat aan overzicht, vertrouwen en een menselijk aanspreekpunt.": "Many Hajj and Umrah websites presented packages as isolated prices and long lists. The guidance that makes the journey valuable remained invisible, even though travellers need clarity, trust and a human point of contact most before departure.",
  "De onzekerheid zat niet in de bestemming, maar in alles wat ervoor geregeld moest worden.": "The uncertainty was not in the destination, but in everything that had to be arranged beforehand.",
  "Premium begeleiding bestond al. De digitale vertaling liep achter.": "Premium guidance already existed. Its digital translation lagged behind.",
  "Persoonlijke gidsen, duidelijke reisstappen en zorg onderweg zijn echte onderscheidende waarden. Door die waarden vóór de prijs zichtbaar te maken, verandert de website van een pakketlijst in een eerste bewijs van hoe de reis begeleid zal worden.": "Personal guides, clear travel steps and care along the way are genuine differentiators. Showing those values before the price turns the website from a package list into the first proof of how the journey will be guided.",
  "Niet harder verkopen. Eerder laten voelen hoe zorgvuldig de reis wordt gedragen.": "Do not sell harder. Let people feel earlier how carefully the journey will be supported.",
  "Eerst intentie en ritme. Daarna pas het passende pakket.": "Intent and rhythm first. The fitting package comes after.",
  "Een heldere route verbindt reisdoel, periode, groepsgrootte en gewenste ondersteuning. Pakketten worden vergelijkbaar zonder de reis tot een prijsfilter te reduceren; elke keuze krijgt context, inclusies en een logische vervolgstap.": "A clear journey connects travel purpose, timing, group size and desired support. Packages become comparable without reducing the journey to a price filter; every choice gains context, inclusions and a logical next step.",
  "Form follows function: iedere vorm helpt één beslissing vooruit.": "Form follows function: every form advances one decision.",
  "Periode & intentie": "Timing & intent",
  Reisgezelschap: "Travel party",
  "Passend pakket": "Fitting package",
  "Vertrouwen vóór conversie": "Trust before conversion",
  "Ieder praktisch detail moet zichzelf kunnen uitleggen.": "Every practical detail should explain itself.",
  "De gidsen krijgen een gezicht, pakketten tonen inclusies zonder kleine lettertjes en vragen worden beantwoord op het moment dat ze ontstaan. Zo wordt transparantie geen losse FAQ, maar productlogica door de hele ervaring.": "Guides are given a face, packages show inclusions without fine print and questions are answered when they arise. Transparency becomes product logic throughout the experience, not a separate FAQ.",
  "Een rustige interface is hier geen stijlkeuze. Het verlaagt beslisdruk.": "A calm interface is not a stylistic choice here. It reduces decision pressure.",
  "Menselijke gidsen": "Human guides",
  "Heldere inclusies": "Clear inclusions",
  "Vragen in context": "Questions in context",
  "Een sobere basis met één duidelijke energiedrager.": "A restrained base with one clear source of energy.",
  "Wat nog bewezen moet worden": "What still needs to be proven",
  "Welke informatie verlaagt twijfel aantoonbaar?": "Which information demonstrably reduces doubt?",
  "Versterken zichtbare gidsen het vertrouwen?": "Do visible guides strengthen trust?",
  "Komt iemand sneller bij een passend pakket?": "Can someone reach a fitting package faster?",
  "Kennis meenemen.": "Carry knowledge forward.",
  "Ook na Medina.": "Even after Medina.",
  "Een boekhandel en leeromgeving die authentieke boeken, betrouwbare geleerden en persoonlijke studiestructuur samenbrengt — voor kenniszoekers die thuis het ritme van Medina willen vasthouden.": "A bookstore and learning environment that brings authentic books, trusted scholars and personal study structure together for knowledge seekers who want to maintain Medina’s rhythm at home.",
  "Een gat tussen toegang en begeleiding": "A gap between access and guidance",
  "De leegte na Medina": "The gap after Medina",
  "Ik zag geen gebrek aan motivatie. Ik zag een gebrek aan structuur, gezelschap en betrouwbare toegang.": "I saw no shortage of motivation. I saw a shortage of structure, companionship and reliable access.",
  "Authentieke bronnen": "Authentic sources",
  "Lessen met context": "Lessons with context",
  "Een haalbaar leerpad": "An achievable learning path",
  "De observatie": "The observation",
  "De kennisreis eindigt niet bij vertrek. De omgeving die haar draagt vaak wel.": "The journey of knowledge does not end at departure. The environment that supports it often does.",
  "Het probleem was niet: waar koop ik een boek? Het was: hoe blijf ik thuis gericht leren?": "The problem was not: where can I buy a book? It was: how do I keep learning with direction at home?",
  "Commerce kan toegang geven. Begeleiding maakt van toegang een pad.": "Commerce can provide access. Guidance turns access into a path.",
  "Niet méér boeken tonen, maar duidelijker maken welk boek wanneer waardevol wordt.": "Do not show more books; make it clearer which book becomes valuable when.",
  "Eén ecosysteem voor ontdekken, kiezen, begrijpen en doorgaan.": "One ecosystem for discovering, choosing, understanding and continuing.",
  "De winkel is de ingang. Het leerpad is de reden om terug te komen.": "The store is the entrance. The learning path is the reason to return.",
  "Gecureerde boeken": "Curated books",
  Taalondersteuning: "Language support",
  "Live context": "Live context",
  Productlogica: "Product logic",
  "Authenticiteit moet vóór de aankoop zichtbaar en navigeerbaar zijn.": "Authenticity must be visible and navigable before purchase.",
  "Vertrouwen ontstaat wanneer herkomst, moeilijkheid en vervolgstap zichzelf uitleggen.": "Trust emerges when origin, difficulty and next steps explain themselves.",
  Herkomst: "Origin",
  "Niveau & volgorde": "Level & sequence",
  "Passende hulp": "Fitting support",
  "Het visuele systeem": "The visual system",
  "De rust van een bibliotheek, met warmte op ieder beslismoment.": "The calm of a library, with warmth at every decision point.",
  "Zie verandering.": "See change.",
  "Voor je haar voelt.": "Before you feel it.",
  "Een actueel kennisplatform voor expats, migranten en bewoners die niet méér nieuws nodig hebben, maar het juiste lokale signaal op het juiste moment.": "A current knowledge platform for expats, migrants and residents who do not need more news, but the right local signal at the right moment.",
  "Een gat tussen nieuws en lokale actie": "A gap between news and local action",
  "De lokale informatiekloof": "The local information gap",
  "Ik zag geen tekort aan informatie. Ik zag een tekort aan timing, lokale context en een geloofwaardige volgende stap.": "I saw no shortage of information. I saw a shortage of timing, local context and a credible next step.",
  "Snel scanbaar": "Quick to scan",
  "Tijdig en relevant": "Timely and relevant",
  "Gedragen door context": "Grounded in context",
  "Verhuizen is één beslissing. Aankomen zijn er duizend.": "Moving is one decision. Arriving means a thousand more.",
  "Het probleem was niet te weinig nieuws. Het was te weinig lokale betekenis op het juiste moment.": "The problem was not too little news. It was too little local meaning at the right moment.",
  "Nieuws vertelt wat er gebeurt. Een signaal vertelt wat dat voor jou verandert.": "News tells you what happens. A signal tells you what it changes for you.",
  "Relevantie vóór volume: ieder signaal moet een concrete beslissing of vervolgstap verbeteren.": "Relevance before volume: every signal must improve a concrete decision or next step.",
  "Eén lokale pulse voor aankomen, regelen, bewegen, wonen en verbinden.": "One local pulse for arriving, arranging, moving, living and connecting.",
  "De interface helpt eerst scannen, daarna begrijpen en pas dan verdiepen.": "The interface helps people scan first, understand next and only then go deeper.",
  "Scanbare pulse": "Scannable pulse",
  "Vroege signalen": "Early signals",
  Ervaringscontext: "Experience-led context",
  "Context moet dichter bij de claim staan dan de volgende klik.": "Context should sit closer to the claim than the next click.",
  "Een rustig systeem maakt urgentie herkenbaar zonder van ieder bericht een alarm te maken.": "A calm system makes urgency recognisable without turning every message into an alarm.",
  "Bron & tijdstip": "Source & time",
  "Lokale relevantie": "Local relevance",
  "Volgende stap": "Next step",
  "Een kalme informatielaag met groen als teken van richting en vertrouwen.": "A calm information layer with green as a signal of direction and trust.",
  "Van signaleren.": "From noticing.",
  "Naar begrijpen.": "To understanding.",
  "Naar handelen.": "To action.",
  "Vertrouwen voelen.": "Feel the trust.",
  "Contact durven.": "Feel ready to reach out.",
  "Een warme digitale praktijk voor Nora: haar expertise, behandelingen en antwoorden helder bij elkaar, met WhatsApp als persoonlijke en laagdrempelige route naar een afspraak.": "A warm digital practice for Nora: her expertise, treatments and answers brought together clearly, with WhatsApp as a personal and approachable route to an appointment.",
  Opdracht: "Brief",
  "Een professionele digitale plek claimen": "Claiming a professional digital presence",
  "Live website met WhatsApp-boeking": "Live website with WhatsApp booking",
  "De digitale vertrouwensvraag": "The digital trust question",
  "Hoe laat je een nieuwe bezoeker online dezelfde rust, aandacht en deskundigheid voelen als een vaste klant in Nora’s behandelkamer?": "How can a new online visitor feel the same calm, attention and expertise as a loyal client in Nora’s treatment room?",
  "Persoonlijk verhaal": "Personal story",
  "Heldere expertise": "Clear expertise",
  "De klantvraag": "The client brief",
  "Een vertrouwde praktijk verdiende een digitale voordeur die net zo persoonlijk voelt.": "A trusted practice deserved a digital front door that felt just as personal.",
  "Niet harder verkopen, maar vertrouwen uit de behandelkamer vertalen naar het scherm.": "Do not sell harder; translate the trust of the treatment room to the screen.",
  "De informatiebehoefte": "The information need",
  "Voor een behandeling wil iemand eerst begrijpen, vergelijken en zich veilig voelen.": "Before a treatment, people first want to understand, compare and feel safe.",
  "De navigatie volgt de twijfel van een nieuwe bezoeker, niet de organisatiestructuur van de praktijk.": "The navigation follows a new visitor’s uncertainty, not the practice’s organisational structure.",
  "Over Nora": "About Nora",
  Behandelingen: "Treatments",
  "Vragen vooraf": "Questions beforehand",
  "De conversiekeuze": "The conversion choice",
  "Boeken moest voelen als contact leggen — niet als een formulier invullen.": "Booking needed to feel like making contact, not filling out a form.",
  "Eén herkenbare handeling verbindt oriëntatie, vertrouwen en persoonlijk contact.": "One recognisable action connects orientation, trust and personal contact.",
  "Behandeling kiezen": "Choose a treatment",
  "WhatsApp openen": "Open WhatsApp",
  "Persoonlijk afstemmen": "Coordinate personally",
  "Bewijs vóór belofte": "Proof before promise",
  "Expertise wordt geloofwaardig wanneer ervaring, certificering en echte klantstemmen samenkomen.": "Expertise becomes credible when experience, certification and real client voices come together.",
  "Social proof ondersteunt de keuze; het neemt de persoonlijke afweging nooit over.": "Social proof supports the choice; it never replaces personal judgement.",
  "Zacht genoeg voor welzijn. Duidelijk genoeg voor zorg en keuze.": "Soft enough for wellbeing. Clear enough for care and choice.",
  "De identiteit vermijdt zowel klinische afstand als wellness-clichés.": "The identity avoids both clinical distance and wellness clichés.",
  "Van ontwerp naar praktijk": "From design to practice",
  "Figma gaf de richting. Framer maakte de digitale praktijk direct bereikbaar.": "Figma set the direction. Framer made the digital practice directly accessible.",
  "De website is live. Verdere impact hoort gemeten te worden op vindbaarheid, behandeling-naar-WhatsApp-kliks en kwaliteit van aanvragen.": "The website is live. Further impact should be measured through discoverability, treatment-to-WhatsApp clicks and enquiry quality.",
  "Eerst begrijpen.": "Understand first.",
  "Dan vertrouwen.": "Then trust.",
  "Dan contact.": "Then connect.",
  "Bekijk de live website": "View the live website",
};

const normalise = (value: string) => value.replace(/\s+/g, " ").trim();

const localisePath = (pathname: string, locale: Locale) => {
  const clean = pathname.replace(/^\/(nl|en)(?=\/|$)/, "") || "/";
  return `/${locale}${clean === "/" ? "" : clean}`;
};

export function localeHref(href: string, locale: Locale) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const [pathAndQuery, hash = ""] = href.split("#");
  const [pathname, query = ""] = pathAndQuery.split("?");
  const localised = localisePath(pathname || "/", locale);
  return `${localised}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
}

export function LanguageSwitcher({ locale, path = "/", tone = "light" }: { locale: Locale; path?: string; tone?: "light" | "dark" }) {
  const switchLocale = (nextLocale: Locale, event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.localStorage.setItem("portfolio-locale", nextLocale);
    const path = localisePath(window.location.pathname, nextLocale);
    window.location.assign(`${path}${window.location.search}${window.location.hash}`);
  };

  return (
    <div className={`language-switcher language-switcher-${tone}`} role="group" aria-label={locale === "en" ? "Choose language" : "Kies taal"}>
      <a data-language-option href={localeHref(path, "nl")} aria-current={locale === "nl" ? "page" : undefined} aria-label="Nederlands" lang="nl" onClick={(event) => switchLocale("nl", event)}>
        <span aria-hidden="true">🇳🇱</span><span>NL</span>
      </a>
      <a data-language-option href={localeHref(path, "en")} aria-current={locale === "en" ? "page" : undefined} aria-label="English" lang="en" onClick={(event) => switchLocale("en", event)}>
        <span aria-hidden="true">🇬🇧</span><span>EN</span>
      </a>
    </div>
  );
}

export function LocalizedSurface({ children, locale, respectPreference = false }: { children: ReactNode; locale: Locale; respectPreference?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const storedLocale = window.localStorage.getItem("portfolio-locale") as Locale | null;
    const pathname = window.location.pathname;
    const isLocalisedRoute = /^\/(nl|en)(?=\/|$)/.test(pathname);

    if (respectPreference && !isLocalisedRoute && storedLocale && storedLocale !== locale) {
      window.location.replace(`${localisePath(pathname, storedLocale)}${window.location.search}${window.location.hash}`);
      return;
    }

    window.localStorage.setItem("portfolio-locale", locale);
    document.documentElement.lang = locale;

    const surface = root.current;
    if (!surface) return;

    const localiseAnchor = (anchor: HTMLAnchorElement) => {
      if (anchor.hasAttribute("data-language-option")) return;
      const href = anchor.getAttribute("href");
      if (href?.startsWith("/") && !href.startsWith("//")) {
        const localised = localeHref(href, locale);
        if (localised !== href) anchor.setAttribute("href", localised);
      }
    };

    const translateTextNode = (node: Node) => {
      if (locale !== "en") return;
      const original = node.textContent ?? "";
      const translated = english[normalise(original)];
      if (!translated) return;
      const leading = original.match(/^\s*/)?.[0] ?? "";
      const trailing = original.match(/\s*$/)?.[0] ?? "";
      node.textContent = `${leading}${translated}${trailing}`;
    };

    const translateElement = (element: Element) => {
      if (element instanceof HTMLAnchorElement) localiseAnchor(element);
      if (locale !== "en" || !(element instanceof HTMLElement)) return;
      ["aria-label", "alt", "title", "placeholder"].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (!value) return;
        const translated = english[normalise(value)];
        if (translated && translated !== value) element.setAttribute(attribute, translated);
      });
    };

    const localiseTree = (tree: Element) => {
      translateElement(tree);
      tree.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(localiseAnchor);
      if (locale !== "en") return;
      const walker = document.createTreeWalker(tree, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        translateTextNode(node);
        node = walker.nextNode();
      }
      tree.querySelectorAll<HTMLElement>("[aria-label], [alt], [title], [placeholder]").forEach(translateElement);
    };

    localiseTree(surface);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "characterData") translateTextNode(mutation.target);
        if (mutation.type === "attributes" && mutation.target instanceof Element) translateElement(mutation.target);
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);
          if (node instanceof Element) localiseTree(node);
        });
      });
    });

    observer.observe(surface, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["aria-label", "alt", "title", "placeholder", "href"] });

    requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    return () => observer.disconnect();
  }, [locale, respectPreference]);

  return <div className="localized-surface" data-locale={locale} ref={root}>{children}</div>;
}
