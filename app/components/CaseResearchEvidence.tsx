"use client";

import type { Locale } from "../i18n";

type Bilingual = { nl: string; en: string };
type JourneyStage = {
  label: Bilingual;
  title: Bilingual;
  body: Bilingual;
  level: "high" | "mid" | "low";
};

const read = (locale: Locale, copy: Bilingual) => copy[locale];

function Journey({
  locale,
  title,
  note,
  stages,
  path,
}: {
  locale: Locale;
  title: Bilingual;
  note: Bilingual;
  stages: JourneyStage[];
  path: string;
}) {
  return (
    <div className="tc-journey tc-evidence-reveal">
      <div className="tc-journey-heading">
        <h3>{read(locale, title)}</h3>
        <p>{read(locale, note)}</p>
      </div>
      <div className="tc-journey-plot" aria-hidden="true">
        <span>{locale === "en" ? "Confidence" : "Zekerheid"}</span>
        <svg viewBox="0 0 1000 190" preserveAspectRatio="none">
          <path className="tc-journey-line" pathLength="1" d={path} />
        </svg>
      </div>
      <ol className="tc-journey-stages">
        {stages.map((stage, index) => (
          <li className={`is-${stage.level}`} key={stage.title.nl}>
            <span>{String(index + 1).padStart(2, "0")} · {read(locale, stage.label)}</span>
            <h4>{read(locale, stage.title)}</h4>
            <p>{read(locale, stage.body)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

const guidanceJourney: JourneyStage[] = [
  {
    label: { nl: "Intentie", en: "Intent" },
    title: { nl: "De motivatie is persoonlijk", en: "The motivation is personal" },
    body: { nl: "De reis begint met een sterke spirituele en persoonlijke reden.", en: "The journey starts with a strong spiritual and personal reason." },
    level: "high",
  },
  {
    label: { nl: "Zoeken", en: "Search" },
    title: { nl: "Veel ingangen, geen vaste route", en: "Many entry points, no fixed route" },
    body: { nl: "Websites en social media werden ieder door 11 van de 21 deelnemers gebruikt.", en: "Websites and social media were each used by 11 of the 21 participants." },
    level: "mid",
  },
  {
    label: { nl: "Vergelijken", en: "Compare" },
    title: { nl: "Details raken versnipperd", en: "Details become fragmented" },
    body: { nl: "Programma’s, reisdata, kinderprijzen en inclusies zijn niet altijd vroeg duidelijk.", en: "Itineraries, dates, child pricing and inclusions are not always clear early enough." },
    level: "low",
  },
  {
    label: { nl: "Vertrouwen", en: "Trust" },
    title: { nl: "Mensen maken de belofte geloofwaardig", en: "People make the promise credible" },
    body: { nl: "Reviews, zichtbare begeleiders en echte service bepalen of de organisatie betrouwbaar voelt.", en: "Reviews, visible guides and real service shape whether the organisation feels trustworthy." },
    level: "low",
  },
  {
    label: { nl: "Contact", en: "Contact" },
    title: { nl: "Een gesprek verlaagt de drempel", en: "A conversation lowers the threshold" },
    body: { nl: "13 van de 21 deelnemers kozen WhatsApp of directe chat als gewenst contactkanaal.", en: "13 of 21 participants preferred WhatsApp or direct chat." },
    level: "mid",
  },
  {
    label: { nl: "Voorbereiden", en: "Prepare" },
    title: { nl: "De informatievraag stopt niet na de boeking", en: "The need for information continues after booking" },
    body: { nl: "Praktische voorbereiding en begeleiding tijdens de reis blijven terugkerende aandachtspunten.", en: "Practical preparation and guidance during the journey remain recurring concerns." },
    level: "mid",
  },
];

const tareeqiJourney: JourneyStage[] = [
  {
    label: { nl: "Ruimte", en: "Free time" },
    title: { nl: "Er ontstaat tijd om te ontdekken", en: "There is time to explore" },
    body: { nl: "Na de rituelen ontstaat behoefte aan een betekenisvolle plek of rustige activiteit.", en: "After the rituals, people look for a meaningful place or a calm activity." },
    level: "high",
  },
  {
    label: { nl: "Kaart", en: "Map" },
    title: { nl: "De bekende resultaten staan bovenaan", en: "Familiar results rise to the top" },
    body: { nl: "Een generieke kaart vindt locaties, maar kent intentie, gezelschap en energie niet.", en: "A generic map finds locations but does not understand intent, company or energy." },
    level: "mid",
  },
  {
    label: { nl: "Omweg", en: "Workaround" },
    title: { nl: "Tips liggen verspreid", en: "Recommendations are scattered" },
    body: { nl: "Social posts, opgeslagen links en verhalen van bekenden moeten handmatig worden gecombineerd.", en: "Social posts, saved links and recommendations from others have to be pieced together manually." },
    level: "low",
  },
  {
    label: { nl: "Twijfel", en: "Doubt" },
    title: { nl: "Past deze plek bij dit moment?", en: "Does this place fit this moment?" },
    body: { nl: "Bereikbaarheid, drukte en geschiktheid voor familie of ouderen blijven vaak onzeker.", en: "Access, crowding and suitability for families or older visitors often remain uncertain." },
    level: "low",
  },
  {
    label: { nl: "Mens", en: "Ask" },
    title: { nl: "Lokale kennis wordt de uitweg", en: "Local knowledge becomes the way forward" },
    body: { nl: "Wie iemand kent vraagt rond. Wie dat netwerk mist, kiest veilig of haakt af.", en: "People with local contacts ask around. Others choose the safest option or give up." },
    level: "mid",
  },
];

function EvidenceHeader({
  locale,
  id,
  eyebrow,
  title,
  body,
  status,
}: {
  locale: Locale;
  id: string;
  eyebrow: Bilingual;
  title: Bilingual;
  body: Bilingual;
  status: Bilingual;
}) {
  return (
    <header className="tc-evidence-header tc-evidence-reveal">
      <p>{read(locale, eyebrow)}</p>
      <div>
        <h2 id={id}>{read(locale, title)}</h2>
        <p>{read(locale, body)}</p>
        <span className="tc-evidence-status">{read(locale, status)}</span>
      </div>
    </header>
  );
}

function GuidanceEvidence({ locale }: { locale: Locale }) {
  const metrics = [
    { value: "81%", nl: "wilde een duidelijk reisprogramma", en: "wanted a clear itinerary" },
    { value: "71%", nl: "wilde heldere inclusies en exclusies", en: "wanted clear inclusions and exclusions" },
    { value: "62%", nl: "wilde een transparante prijsopbouw", en: "wanted transparent pricing" },
    { value: "62%", nl: "koos WhatsApp of directe chat", en: "preferred WhatsApp or direct chat" },
  ];
  const decisions = [
    {
      nlTitle: "Programma vóór pakketdruk", enTitle: "Itinerary before package pressure",
      nlBody: "Reisritme en globale dagindeling worden vroeg zichtbaar.", enBody: "Journey rhythm and a high-level daily plan appear early.",
    },
    {
      nlTitle: "Geen verborgen scope", enTitle: "No hidden scope",
      nlBody: "Inclusies, uitzonderingen en kosten krijgen één vast vergelijkingspatroon.", enBody: "Inclusions, exceptions and costs follow one consistent comparison pattern.",
    },
    {
      nlTitle: "Mensen maken vertrouwen concreet", enTitle: "People make trust concrete",
      nlBody: "Begeleiders, ervaring en rol staan dicht bij het beslismoment.", enBody: "Guides, their experience and role sit close to the decision point.",
    },
    {
      nlTitle: "Contact is onderdeel van de flow", enTitle: "Contact is part of the flow",
      nlBody: "WhatsApp neemt de gekozen reiscontext mee in plaats van naar een generieke inbox te leiden.", enBody: "WhatsApp carries the selected journey context instead of leading to a generic inbox.",
    },
  ];

  return (
    <section className="tc-evidence tc-evidence-guidance" aria-labelledby="guidance-evidence-title">
      <EvidenceHeader
        locale={locale}
        id="guidance-evidence-title"
        eyebrow={{ nl: "Onderzoekslaag · directionele enquête", en: "Research layer · directional survey" }}
        title={{ nl: "21 deelnemers maakten de ontbrekende zekerheid concreet.", en: "21 respondents made the missing reassurance concrete." }}
        body={{
          nl: "De enquête onderbouwt de probleemrichting en helpt prioriteren. De groep is klein en niet representatief; de voorgestelde oplossing moet nog in gebruikerstests worden bewezen.",
          en: "The survey supports the problem direction and helps set priorities. The sample is small and not representative; the proposed solution still needs usability testing.",
        }}
        status={{ nl: "Probleemsignaal onderbouwd · oplossing nog niet getest", en: "Problem signal supported · solution not yet tested" }}
      />

      <div className="tc-evidence-metrics tc-evidence-reveal" aria-label={locale === "en" ? "Key survey findings" : "Belangrijkste enquêteresultaten"}>
        {metrics.map((metric) => (
          <article key={metric.value + metric.nl}>
            <strong>{metric.value}</strong>
            <p>{locale === "en" ? metric.en : metric.nl}</p>
            <span>n = 21</span>
          </article>
        ))}
      </div>

      <Journey
        locale={locale}
        title={{ nl: "De huidige reis verliest zekerheid tussen intentie en vertrek.", en: "The current journey loses confidence between intent and departure." }}
        note={{
          nl: "Synthese van terugkerende patronen over de 21 antwoorden; dit is geen letterlijke route die iedere deelnemer volledig doorliep.",
          en: "A synthesis of recurring patterns across the 21 responses; this is not a literal path completed by every participant.",
        }}
        stages={guidanceJourney}
        path="M 20 34 C 105 22, 160 38, 205 54 S 320 111, 405 129 S 520 160, 600 142 S 730 91, 795 76 S 900 103, 980 115"
      />

      <div className="tc-evidence-decisions tc-evidence-reveal">
        <div className="tc-evidence-decisions-intro">
          <p>{locale === "en" ? "Research → design" : "Onderzoek → ontwerp"}</p>
          <h3>{locale === "en" ? "Four findings changed the route." : "Vier bevindingen veranderden de route."}</h3>
        </div>
        <div className="tc-evidence-decision-grid">
          {decisions.map((decision, index) => (
            <article key={decision.nlTitle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h4>{locale === "en" ? decision.enTitle : decision.nlTitle}</h4>
              <p>{locale === "en" ? decision.enBody : decision.nlBody}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="tc-evidence-quotes tc-evidence-reveal">
        <blockquote>“{locale === "en" ? "I often could not find the itineraries for the trips." : "Ik kon vaak de programma’s van de reizen niet vinden."}”</blockquote>
        <blockquote>“{locale === "en" ? "It matters that you know who you are travelling with." : "Het is belangrijk dat je weet met wie je reist."}”</blockquote>
        <p>{locale === "en" ? "Anonymous survey responses, lightly edited for spelling." : "Anonieme enquêteresponsen, alleen licht gecorrigeerd op spelling."}</p>
      </div>
    </section>
  );
}

function TareeqiEvidence({ locale }: { locale: Locale }) {
  const segments = [
    {
      title: { nl: "Betekeniszoeker", en: "Meaning seeker" },
      situation: { nl: "Wil na de rituelen verder kijken dan de bekende highlights.", en: "Wants to look beyond the familiar highlights after the rituals." },
      workaround: { nl: "Vraagt locals en bewaart losse tips.", en: "Asks locals and saves scattered recommendations." },
      consequence: { nl: "Gecureerde verhalen en zichtbare herkomst.", en: "Curated stories and transparent sourcing." },
    },
    {
      title: { nl: "Familieplanner", en: "Family planner" },
      situation: { nl: "Moet tempo, kinderen, ouderen en voorzieningen tegelijk meenemen.", en: "Balances pace, children, older relatives and facilities at once." },
      workaround: { nl: "Combineert kaarten met vragen in de groep.", en: "Combines maps with questions in the group." },
      consequence: { nl: "Familie-, toegankelijkheids- en rustfilters.", en: "Family, accessibility and calmness filters." },
    },
    {
      title: { nl: "Zelfstandige ontdekker", en: "Independent explorer" },
      situation: { nl: "Heeft beperkte tijd of verbinding en wil gericht kiezen.", en: "Has limited time or connectivity and wants to choose with purpose." },
      workaround: { nl: "Schakelt tussen kaarten, socials en opgeslagen links.", en: "Moves between maps, social media and saved links." },
      consequence: { nl: "Intentiefilters, compacte context en offline routes.", en: "Intent filters, concise context and offline routes." },
    },
  ];

  return (
    <section className="tc-evidence tc-evidence-tareeqi" aria-labelledby="tareeqi-evidence-title">
      <EvidenceHeader
        locale={locale}
        id="tareeqi-evidence-title"
        eyebrow={{ nl: "Onderzoekslaag · kwalitatieve synthese", en: "Research layer · qualitative synthesis" }}
        title={{ nl: "Terugkerende verhalen werden drie proto-persona’s, geen schijnzekerheid.", en: "Recurring stories became three proto-personas, not false certainty." }}
        body={{
          nl: "Deze groepen vatten informele ervaringen samen die meerdere pelgrims deelden. Er is geen formele steekproef of gevalideerde segmentatie; daarom gebruik ik ze als richting voor onderzoek en prioritering.",
          en: "These groups synthesise informal experiences shared by several pilgrims. There is no formal sample or validated segmentation, so I use them to direct research and prioritisation.",
        }}
        status={{ nl: "Kwalitatieve richting · proto-persona’s · oplossing nog niet getest", en: "Qualitative direction · proto-personas · solution not yet tested" }}
      />

      <div className="tc-segment-grid tc-evidence-reveal">
        {segments.map((segment, index) => (
          <article key={segment.title.nl}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{read(locale, segment.title)}</h3>
            <dl>
              <div><dt>{locale === "en" ? "Situation" : "Situatie"}</dt><dd>{read(locale, segment.situation)}</dd></div>
              <div><dt>{locale === "en" ? "Current workaround" : "Huidige omweg"}</dt><dd>{read(locale, segment.workaround)}</dd></div>
              <div><dt>{locale === "en" ? "Design consequence" : "Ontwerpconsequentie"}</dt><dd>{read(locale, segment.consequence)}</dd></div>
            </dl>
          </article>
        ))}
      </div>

      <Journey
        locale={locale}
        title={{ nl: "De huidige journey breekt tussen locatie en betekenis.", en: "The current journey breaks between location and meaning." }}
        note={{
          nl: "Compacte probleemjourney op basis van terugkerende verhalen. De curve laat een ontwerphypothese zien en wordt in interviews verder getoetst.",
          en: "A compact problem journey based on recurring stories. The curve is a design hypothesis to be tested in interviews.",
        }}
        stages={tareeqiJourney}
        path="M 20 38 C 118 27, 160 53, 220 69 S 348 104, 430 126 S 590 165, 675 153 S 850 91, 980 112"
      />

      <p className="tc-evidence-handnote tc-evidence-reveal">
        {locale === "en" ? "The original persona board remains a synthesis tool, not proof that these segments already exist at scale." : "Het oorspronkelijke personabord blijft een synthesetool, geen bewijs dat deze segmenten al op schaal bestaan."}
      </p>
    </section>
  );
}

function BaynEvidence({ locale }: { locale: Locale }) {
  const assumptions = [
    {
      title: { nl: "Nieuwe bewoner", en: "New resident" },
      hypothesis: { nl: "heeft één betrouwbare plek nodig voor regels én dagelijks leven", en: "needs one trusted place for rules and everyday life" },
      response: { nl: "signalen per levensmoment met bron, tijdstip en actie", en: "signals by life moment with source, time and action" },
      test: { nl: "interviews over recente beslissingen en gebruikte bronnen", en: "interviews about recent decisions and sources used" },
    },
    {
      title: { nl: "Drukke professional", en: "Time-poor professional" },
      hypothesis: { nl: "wil alleen updates zien die zijn werk of gezin vandaag raken", en: "only wants updates that affect work or family today" },
      response: { nl: "een persoonlijke pulse op thema, locatie en urgentie", en: "a personal pulse by topic, location and urgency" },
      test: { nl: "cardsort en informatietaak op snelheid en begrip", en: "card sort and information task for speed and comprehension" },
    },
    {
      title: { nl: "Gezin in transitie", en: "Family in transition" },
      hypothesis: { nl: "moet de impact van veranderingen op kinderen en planning snel begrijpen", en: "must quickly understand how changes affect children and planning" },
      response: { nl: "familiecontext, lokale gidsen en concrete vervolgstappen", en: "family context, local guides and concrete next steps" },
      test: { nl: "contextuele gebruikerstest met een recente regel- of routesituatie", en: "contextual usability test with a recent rule or route change" },
    },
  ];

  return (
    <section className="tc-evidence tc-evidence-bayn" aria-labelledby="bayn-evidence-title">
      <EvidenceHeader
        locale={locale}
        id="bayn-evidence-title"
        eyebrow={{ nl: "Onderzoekslaag · aannames expliciet", en: "Research layer · assumptions made explicit" }}
        title={{ nl: "De doelgroep is een hypothese. De volgende onderzoeksronde moet haar scherpte verdienen.", en: "The audience is a hypothesis. The next research round must earn its specificity." }}
        body={{
          nl: "De eerste persona-oefening mengde behoeften met oplossingsideeën. Daarom presenteer ik haar niet als bewijs, maar vertaal ik haar naar drie aannames die afzonderlijk getest kunnen worden.",
          en: "The first persona exercise mixed needs with solution ideas. I therefore do not present it as evidence; I translate it into three assumptions that can be tested separately.",
        }}
        status={{ nl: "Nog geen primair onderzoek · aannames zichtbaar · journey bewust uitgesteld", en: "No primary research yet · assumptions visible · journey intentionally postponed" }}
      />

      <div className="tc-assumption-grid tc-evidence-reveal">
        {assumptions.map((assumption, index) => (
          <article key={assumption.title.nl}>
            <header><span>{String(index + 1).padStart(2, "0")}</span><h3>{read(locale, assumption.title)}</h3></header>
            <dl>
              <div><dt>{locale === "en" ? "Hypothesis" : "Hypothese"}</dt><dd>{read(locale, assumption.hypothesis)}</dd></div>
              <div><dt>{locale === "en" ? "Designed response" : "Ontworpen antwoord"}</dt><dd>{read(locale, assumption.response)}</dd></div>
              <div><dt>{locale === "en" ? "Proof needed" : "Benodigd bewijs"}</dt><dd>{read(locale, assumption.test)}</dd></div>
            </dl>
          </article>
        ))}
      </div>

      <div className="tc-evidence-withheld tc-evidence-reveal">
        <span>{locale === "en" ? "Why there is no journey here" : "Waarom hier nog geen journey staat"}</span>
        <p>{locale === "en" ? "Without field research, an emotional curve would be invented. Bayn first needs interviews around real relocation and local-information moments; only then can a current-state journey honestly connect friction to design decisions." : "Zonder veldonderzoek zou een emotionele curve verzonnen zijn. Bayn heeft eerst gesprekken nodig rond echte verhuis- en informatiemomenten; pas daarna kan een current-state journey eerlijk frictie aan ontwerpbeslissingen koppelen."}</p>
      </div>
    </section>
  );
}

export function CaseResearchEvidence({ variant, locale }: { variant: "guidance" | "tareeqi" | "bayn"; locale: Locale }) {
  if (variant === "guidance") return <GuidanceEvidence locale={locale} />;
  if (variant === "tareeqi") return <TareeqiEvidence locale={locale} />;
  return <BaynEvidence locale={locale} />;
}
