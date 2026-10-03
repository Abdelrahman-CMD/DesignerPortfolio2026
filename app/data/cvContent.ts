// Overgenomen uit het losse cv op abdelrahman-cmd.github.io/cv: beide talen
// staan daar al in de opmaak, dus de Engelse tekst is de zijne en niet vertaald
// door mij. Alleen de presentatie is hier opnieuw gebouwd in de huisstijl.

export type CvTekst = { nl: string; en: string };

export type CvRol = {
  periode: CvTekst;
  locatie: string;
  titel: CvTekst;
  organisatie: CvTekst;
  tekst: CvTekst;
  punten: CvTekst[];
};

export type CvGroep = { titel: CvTekst; items: CvTekst[] };

export const cvHero = {
  kicker: { nl: "Amsterdam · Designer en operationeel leider", en: "Amsterdam · Designer & operations leader" },
  titel: { nl: "Op het snijvlak van design en organisatie.", en: "Where design meets operations." },
  lead: { nl: "", en: "" },
  feiten: [
    { label: { nl: "Achtergrond", en: "Background" }, waarde: { nl: "BSc CMD Hogeschool van Amsterdam", en: "Amsterdam University of Applied Sciences" } },
    { label: { nl: "Ervaring", en: "Experience" }, waarde: { nl: "16 jaar retail Doorgegroeid tot management-niveau", en: "16 years in retail" } },
  ],
};

export const cvOver = {
  eyebrow: { nl: "01 · Over", en: "01 · About" },
  titel: { nl: "Twee disciplines, één persoon.", en: "Two disciplines, one person." },
  alineas: [
    { nl: "Mijn kracht zit in het analyseren van gedrag, processen en data, en dit vertalen naar praktische, gebruikersgerichte oplossingen.", en: "My strength lies in analysing behaviour, processes and data, and translating that into practical, user-centred solutions." },
    { nl: "Ik heb dit toegepast in zowel digitale omgevingen (UX/UI design, wireframing, interfaceontwerp) als in een commerciële werkcontext met KPI-sturing, klantgedraganalyse en procesoptimalisatie.", en: "I have applied this in digital environments (UX/UI design, wireframing, interface design) as well as in a commercial setting driven by KPIs, customer-behaviour analysis and process optimisation." },
    { nl: "Zestien jaar in de retail leerde me wat een interface of een proces op de werkvloer moet doen: het werk eenvoudiger maken, niet ingewikkelder. Ik werk gestructureerd, schakel snel in veranderende omgevingen, en haal energie uit het begeleiden van collega's in hun ontwikkeling. Dat laatste is voor mij geen taak naast het werk, maar het werk zelf.", en: "Sixteen years in retail taught me what an interface or a process on the work floor should do: make the work simpler, not more complicated. I work in a structured way, adapt quickly in changing environments, and draw energy from guiding colleagues in their development. That last part is not a task alongside the work for me, it is the work itself." },
    { nl: "Ik zoek nu een rol waar deze combinatie tot zijn recht komt. Functies op het snijvlak van digitaal, communicatie en organisatie.", en: "I am now looking for a role where this combination comes into its own. Positions at the intersection of digital, communication and organisation." },
    { nl: "Daarnaast blijf ik mezelf in design ontwikkelen. Ik volg het vak op de voet, lees veel over recente ontwikkelingen, en gebruik wat ik leer in praktische projecten voor mensen in mijn directe omgeving als die mijn hulp kunnen gebruiken. Het houdt mijn vaardigheden scherp en mijn nieuwsgierigheid wakker.", en: "Alongside that, I keep developing myself in design. I follow the field closely, read widely about recent developments, and apply what I learn in practical projects for people around me who can use my help. It keeps my skills sharp and my curiosity awake." },
  ],
  interesses: [
    { nl: "Lezen", en: "Reading" },
    { nl: "Reizen", en: "Travel" },
    { nl: "Designen", en: "Design" },
    { nl: "Koffie", en: "Coffee" },
    { nl: "Tech", en: "Tech" },
  ],
  details: [
    { label: { nl: "Naam", en: "Name" }, waarde: { nl: "Abdel Ahmed", en: "Abdel Ahmed" } },
    { label: { nl: "Locatie", en: "Location" }, waarde: { nl: "Amsterdam", en: "Amsterdam" } },
    { label: { nl: "Geboortejaar", en: "Year of birth" }, waarde: { nl: "1995", en: "1995" } },
    { label: { nl: "Rijbewijs", en: "Driving licence" }, waarde: { nl: "B", en: "B" } },
    { label: { nl: "Talen", en: "Languages" }, waarde: { nl: "NederlandsNative ArabischNative EngelsVloeiend", en: "Dutch" } },
  ],
};

export const cvErvaring = {
  eyebrow: { nl: "02 · Werkervaring", en: "02 · Experience" },
  titel: { nl: "Zestien jaar, twee sporen.", en: "Sixteen years, two tracks." },
  intro: { nl: "Een loopbaan die begint op de werkvloer en doorgroeit naar management-niveau, met daartussen een afgeronde studie en twee design-rollen bij agencies.", en: "A career that starts on the shop floor and grows to management level, with a completed degree and two agency design roles along the way." },
};

export const cvRollen: CvRol[] = [
  {
    periode: { nl: "Sep 2023 · Heden", en: "Sep 2023 · Present" },
    locatie: "Amsterdam",
    titel: { nl: "Assistent Filiaalmanager", en: "Assistant Store Manager" },
    organisatie: { nl: "Jumbo Supermarkten", en: "Jumbo Supermarkten" },
    tekst: { nl: "Mede-eindverantwoordelijk voor de dagelijkse operatie van een high-volume vestiging in Amsterdam. In 2023 doorgegroeid naar Assistent Filiaalmanager na het afronden van mijn bachelor. Combineert operationele leiding, commercieel resultaat en menselijk management.", en: "Jointly responsible for the daily operation of a high-volume store in Amsterdam. Progressed to Assistant Store Manager in 2023 after completing my bachelor. Combines operational leadership, commercial results and people management." },
    punten: [
      { nl: "Aansturen van 25+ medewerkers en meerdere teamleiders", en: "Leading 25+ staff and several team leaders" },
      { nl: "Verantwoordelijk voor omzet, derving, personeelskosten en KPI-realisatie", en: "Responsible for revenue, shrinkage, labour costs and KPI delivery" },
      { nl: "Analyseren van verkoopcijfers, klantgedrag en bijsturen op prestaties", en: "Analysing sales figures and customer behaviour, and steering on performance" },
      { nl: "Optimaliseren van personeelsinzet en operationele processen", en: "Optimising staff scheduling and operational processes" },
      { nl: "Data-gedreven werken en besluitvorming", en: "Data-driven work and decision-making" },
    ],
  },
  {
    periode: { nl: "2022 · 2023", en: "2022 · 2023" },
    locatie: "Amsterdam",
    titel: { nl: "Specialist Proces", en: "Specialist Process" },
    organisatie: { nl: "Jumbo Supermarkten", en: "Jumbo Supermarkten" },
    tekst: { nl: "Een zelfstandige rol waarin ik alle wekelijks terugkerende winkelprocessen beheerde. Verantwoordelijk voor het up-to-date houden van de winkel: schaplocatie-wijzigingen, nieuwe mutaties, verwijderingen en toevoegingen, en aanpassingen in de opbouw. Zonder een goed procesverloop loopt de hele winkel vast, en de klant- en commerciekant is daar sterk van afhankelijk.", en: "A standalone role managing all weekly recurring store processes. Responsible for keeping the store up to date: shelf-location changes, new product mutations, removals and additions, and adjustments to the store layout. A smooth process flow is the foundation the entire store runs on, and the customer and commercial side depends heavily on it." },
    punten: [
      { nl: "Beheren van alle wekelijks terugkerende winkelprocessen", en: "Managing all weekly recurring store processes" },
      { nl: "Schaplocaties, mutaties, toevoegingen en verwijderingen up-to-date houden", en: "Keeping shelf locations, mutations, additions and removals up to date" },
      { nl: "Slecht lopende producten uitfaseren, goed lopende breder zetten en groter bestellen", en: "Phasing out slow movers and giving fast movers more space and larger orders" },
      { nl: "Lege vakken analyseren en de oorzaak verhelpen", en: "Analysing empty shelf spaces and resolving the root cause" },
    ],
  },
  {
    periode: { nl: "Okt 2017 · 2022", en: "Oct 2017 · 2022" },
    locatie: "Amsterdam",
    titel: { nl: "Assistent Teamleider", en: "Assistant Team Leader" },
    organisatie: { nl: "Jumbo Supermarkten", en: "Jumbo Supermarkten" },
    tekst: { nl: "Begonnen in 2017 als Assistent Teamleider naast mijn studie. Aansturen van teams op de werkvloer, met verantwoordelijkheid voor de dagelijkse operatie, medewerkersbegeleiding en commerciële prestaties.", en: "Started in 2017 as Assistant Team Leader alongside my studies. Leading teams on the work floor, with responsibility for daily operations, staff guidance and commercial performance." },
    punten: [
    ],
  },
  {
    periode: { nl: "", en: "" },
    locatie: "Amsterdam",
    titel: { nl: "Junior UI/UX Designer", en: "Junior UI/UX Designer" },
    organisatie: { nl: "The Brink Agency", en: "The Brink Agency" },
    tekst: { nl: "Ontwerpen van gebruiksvriendelijke interfaces voor web- en mobile applicaties binnen een agency-omgeving. Werken met externe stakeholders en iteratief verbeteren op basis van feedback en reviews.", en: "Designing user-friendly interfaces for web and mobile applications in an agency environment. Working with external stakeholders and improving iteratively based on feedback and reviews." },
    punten: [
      { nl: "Vertalen van gebruikersbehoeften naar wireframes en visuele designs", en: "Translating user needs into wireframes and visual designs" },
      { nl: "Samenwerken met stakeholders binnen digitale projecten", en: "Collaborating with stakeholders on digital projects" },
      { nl: "Interfaces voor onder andere ABwerkt.nl en Lento.eu", en: "Interfaces for ABwerkt.nl and Lento.eu, among others" },
      { nl: "Afstudeerproject: onboarding tool voor personeel", en: "Graduation project: a staff onboarding tool" },
    ],
  },
  {
    periode: { nl: "", en: "" },
    locatie: "Amsterdam",
    titel: { nl: "Junior Visual Designer", en: "Junior Visual Designer" },
    organisatie: { nl: "Meute", en: "Meute" },
    tekst: { nl: "Visuele content en campagne-werk in een creatieve studio. Ontwerp van een landingspagina voor de overheidscampagne Nederland Vaccineert.", en: "Visual content and campaign work in a creative studio. Designed a landing page for the government campaign Nederland Vaccineert." },
    punten: [
      { nl: "Content ontwerpen voor socials", en: "Designing content for social media" },
      { nl: "Landingspagina ontwerpen voor de campagne Nederland Vaccineert", en: "Designing a landing page for the Nederland Vaccineert campaign" },
      { nl: "Feedback verwerken en reviews houden met stakeholders", en: "Processing feedback and running reviews with stakeholders" },
    ],
  },
  {
    periode: { nl: "Okt 2009 · Jan 2013", en: "Oct 2009 · Jan 2013" },
    locatie: "Amsterdam",
    titel: { nl: "Assistent Teamleider", en: "Assistant Team Leader" },
    organisatie: { nl: "Albert Heijn · 8 jaar", en: "Albert Heijn · 8 years" },
    tekst: { nl: "Begonnen in 2009 als vulploegmedewerker, in 2013 doorgegroeid naar Assistent Teamleider binnen vers- en DKW-afdelingen. Eerste stap richting management-verantwoordelijkheid.", en: "Started in 2009 as a stock replenishment associate and progressed in 2013 to Assistant Team Leader across the fresh and packaged-goods departments. A first step toward management responsibility." },
    punten: [
      { nl: "Aansturen van teams binnen vers- en DKW-afdelingen", en: "Leading teams across the fresh and packaged-goods departments" },
      { nl: "Verantwoordelijk voor dagelijkse operatie en kwaliteitsbewaking", en: "Responsible for daily operations and quality control" },
      { nl: "Begeleiden en ontwikkelen van medewerkers", en: "Coaching and developing staff" },
      { nl: "Verbeterde winkelpresentatie en klanttevredenheid", en: "Improved store presentation and customer satisfaction" },
    ],
  },
];

export const cvOpleiding = {
  eyebrow: { nl: "03 · Opleiding", en: "03 · Education" },
  titel: { nl: "Communicatie en multimedia design.", en: "Communication and multimedia design." },
  intro: { nl: "", en: "" },
};

export const cvStudies: CvRol[] = [
  {
    periode: { nl: "", en: "" },
    locatie: "Amsterdam",
    titel: { nl: "Bachelor of Science · CMD", en: "Bachelor of Science · CMD" },
    organisatie: { nl: "Hogeschool van Amsterdam", en: "Hogeschool van Amsterdam" },
    tekst: { nl: "Vierjarige bachelor Communicatie en Multimedia Design met focus op gebruikersgericht ontwerp en digitale interfaces.", en: "A four-year bachelor in Communication & Multimedia Design focused on user-centred design and digital interfaces." },
    punten: [
      { nl: "UX-onderzoek en gebruikerstesten", en: "UX research and user testing" },
      { nl: "Interactieontwerp en wireframing", en: "Interaction design and wireframing" },
      { nl: "Visuele communicatie en designprincipes", en: "Visual communication and design principles" },
      { nl: "Basis front-end development", en: "Front-end development fundamentals" },
    ],
  },
  {
    periode: { nl: "", en: "" },
    locatie: "Amsterdam",
    titel: { nl: "HBO · Logistiek en Economie", en: "Applied Sciences · Logistics & Economics" },
    organisatie: { nl: "Oriëntatiefase", en: "Orientation phase" },
    tekst: { nl: "Twee jaar verdiept in logistiek en bedrijfseconomie. In het tweede leerjaar tot de conclusie gekomen dat dit niet de juiste richting was, en bewust overgestapt naar Communicatie en Multimedia Design.", en: "Two years exploring logistics and business economics. In the second year I concluded this was not the right direction and made a deliberate switch to Communication & Multimedia Design." },
    punten: [
    ],
  },
  {
    periode: { nl: "", en: "" },
    locatie: "Amsterdam",
    titel: { nl: "HBO · Logistiek en Technische Vervoerskunde", en: "Applied Sciences · Logistics & Transport Engineering" },
    organisatie: { nl: "Eerste oriëntatie", en: "First orientation" },
    tekst: { nl: "Eerstejaars studie afgebroken na een kaakoperatie en herstelperiode. Een tussenjaar genomen voor herstel en het bepalen van een nieuwe studierichting.", en: "First year discontinued after jaw surgery and a recovery period. I took a gap year to recover and to determine a new direction of study." },
    punten: [
    ],
  },
  {
    periode: { nl: "", en: "" },
    locatie: "Amsterdam",
    titel: { nl: "MBO 4 · Manager Transport en Logistiek", en: "MBO 4 · Transport & Logistics Manager" },
    organisatie: { nl: "ROC Amsterdam", en: "ROC Amsterdam" },
    tekst: { nl: "Drie jaar logistiek management met focus op processen, planning en operationele coördinatie.", en: "A three-year logistics management programme focused on processes, planning and operational coordination." },
    punten: [
      { nl: "Logistieke processen opvolgen en uitvoeren", en: "Following up and executing logistics processes" },
      { nl: "Planning toepassen en wijzigen", en: "Applying and adjusting planning" },
      { nl: "Coördineren van operationele processen", en: "Coordinating operational processes" },
    ],
  },
];

export const cvVaardigheden = {
  eyebrow: { nl: "04 · Vaardigheden", en: "04 · Skills" },
  titel: { nl: "Wat ik meeneem.", en: "What I bring." },
};

export const cvVaardigheidsGroepen: CvGroep[] = [
  {
    titel: { nl: "Design en digitaal", en: "Design & digital" },
    items: [
      { nl: "AI/UI/UX Design", en: "AI/UI/UX design" },
      { nl: "Wireframing en prototyping", en: "Wireframing and prototyping" },
      { nl: "User flows en testing", en: "User flows and testing" },
      { nl: "User-centered design", en: "User-centred design" },
      { nl: "Stakeholder communicatie", en: "Stakeholder communication" },
      { nl: "Product reviews", en: "Product reviews" },
    ],
  },
  {
    titel: { nl: "Management en leiderschap", en: "Management & leadership" },
    items: [
      { nl: "Teamleiding en coaching", en: "Team leadership and coaching" },
      { nl: "Operationele aansturing", en: "Operational management" },
      { nl: "Planning en organisatie", en: "Planning and organisation" },
      { nl: "Besluitvorming onder druk", en: "Decision-making under pressure" },
      { nl: "Conflictoplossend vermogen", en: "Conflict resolution" },
      { nl: "Verbindend leiderschap", en: "Connecting leadership" },
    ],
  },
  {
    titel: { nl: "Analyse en proces", en: "Analysis & process" },
    items: [
      { nl: "Data-analyse en KPI-sturing", en: "Data analysis and KPI steering" },
      { nl: "Procesoptimalisatie", en: "Process optimisation" },
      { nl: "Klantgedrag analyseren", en: "Analysing customer behaviour" },
      { nl: "Probleemoplossend denken", en: "Problem-solving mindset" },
      { nl: "Structuur in complexiteit", en: "Structure within complexity" },
      { nl: "Kwaliteitsbewaking", en: "Quality control" },
    ],
  },
];

export const cvTools = {
  eyebrow: { nl: "05 · Tools en systemen", en: "05 · Tools & systems" },
  titel: { nl: "Wat ik gebruik.", en: "What I use." },
};

export const cvToolGroepen: CvGroep[] = [
  {
    titel: { nl: "Design en digitale tools", en: "Design & digital tools" },
    items: [
      { nl: "Figma", en: "Figma" },
      { nl: "Framer", en: "Framer" },
      { nl: "Adobe Creative Suite", en: "Adobe Creative Suite" },
      { nl: "HTML/CSS", en: "HTML/CSS" },
      { nl: "Claude", en: "Claude" },
      { nl: "ChatGPT", en: "ChatGPT" },
      { nl: "Gemini", en: "Gemini" },
    ],
  },
  {
    titel: { nl: "Analyse en kantoor", en: "Analysis & office" },
    items: [
      { nl: "Microsoft Office Suite", en: "Microsoft Office Suite" },
      { nl: "KPI-dashboards", en: "KPI-dashboards" },
      { nl: "Retail systemen", en: "Retail systems" },
      { nl: "Teams · Zoom · Meet", en: "Teams · Zoom · Meet" },
    ],
  },
];

export const cvZoek = {
  eyebrow: { nl: "06 · Op zoek naar", en: "06 · Looking for" },
  titel: { nl: "Wat ik zoek.", en: "What I am looking for." },
  intro: { nl: "Een functie waar mijn dubbele achtergrond meerwaarde heeft, in een omgeving die bij me past. Samen met mijn jobcoach verken ik welke richting het beste aansluit op wat ik in deze fase wil opbouwen.", en: "A role where my dual background adds value, in an environment that fits me. Together with my job coach I am exploring which direction best matches what I want to build in this phase." },
  items: [
    { titel: { nl: "Snijvlak digitaal en organisatie", en: "Digital meets organisation" }, tekst: { nl: "Type rol", en: "Type of role" } },
    { titel: { nl: "Hybride of remote", en: "Hybrid or remote" }, tekst: { nl: "Een hybride rol waar ontwerpdenken en operationeel inzicht samenkomen. Bij organisaties die waarde zien in de combinatie van denken en doen.", en: "A hybrid role where design thinking and operational insight come together. At organisations that value the combination of thinking and doing." } },
    { titel: { nl: "Mensen en proces", en: "People and process" }, tekst: { nl: "Werkomgeving", en: "Work setting" } },
  ],
};

export const cvContact = {
  eyebrow: { nl: "07 · Contact", en: "07 · Contact" },
  status: { nl: "Beschikbaar", en: "Available" },
  titel: { nl: "Open voor een gesprek.", en: "Open to a conversation." },
  rijen: [
    { label: { nl: "E-mail", en: "Email" }, waarde: "dhr_abdelrahman@outlook.com", href: "mailto:dhr_abdelrahman@outlook.com" },
    { label: { nl: "Telefoon", en: "Phone" }, waarde: "+31 6 21 57 21 24", href: "tel:+31621572124" },
  ],
};
