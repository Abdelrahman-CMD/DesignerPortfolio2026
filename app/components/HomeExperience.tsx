"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import BriefcaseBusiness from "lucide-react/icons/briefcase-business";
import FileText from "lucide-react/icons/file-text";
import Figma from "lucide-react/icons/figma";
import Framer from "lucide-react/icons/framer";
import Linkedin from "lucide-react/icons/linkedin";
import Mail from "lucide-react/icons/mail";
import MessageCircle from "lucide-react/icons/message-circle";
import Share2 from "lucide-react/icons/share-2";
import Sparkles from "lucide-react/icons/sparkles";
import UserRound from "lucide-react/icons/user-round";
import Workflow from "lucide-react/icons/workflow";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LanguageSwitcher, Locale, localeHref, translateText } from "../i18n";
import { MobileNav } from "./MobileNav";

const projects = [
  {
    number: "01",
    slug: "mirqa",
    name: "MIRQA",
    title: "Van goede intentie naar een haalbaar vertrek naar de moskee",
    summary:
      "Een rustige mobiele companion die één gekozen gebed, een vertrouwde moskee en een realistische vertrektijd samenbrengt.",
    services: "Productstrategie · UX research · UX/UI",
    category: "Conceptproject",
    status: "In ontwikkeling",
    bg: "#c9653d",
    ink: "#fff8f0",
    image: "/projects/home/mirqa-cover.webp",
    imagePosition: "center",
    href: "/cases/mirqa",
  },
  {
    number: "02",
    slug: "oppasbychaima",
    name: "Oppas by Chaima",
    title: "Thuiszorg vertalen naar rustig en geloofwaardig digitaal vertrouwen",
    summary:
      "Een warme website voor een pedagogisch opgeleide oppas, waarin thuisritme, duidelijke afspraken en oudervertrouwen samenkomen.",
    services: "Positionering · UX/UI · Webontwerp en bouw",
    category: "Klantproject",
    status: "Online",
    bg: "#f0e2ce",
    ink: "#342d27",
    image: "/projects/home/oppas-by-chaima-cover.webp",
    imagePosition: "center",
    href: "/cases/oppas-by-chaima",
  },
  {
    number: "03",
    slug: "tareeqi",
    name: "Tareeqi",
    title: "Mekka en Medina ontdekken voorbij het voor de hand liggende",
    summary:
      "Een lokaal gevoed kaartplatform dat pelgrims voorbij de bekende routes brengt, met rust, context en toegankelijkheid als kompas.",
    services: "Strategie · UX/UI · Productconcept",
    category: "Conceptproject",
    status: "Zelf geïnitieerd",
    bg: "#eadfd3",
    ink: "#332a24",
    image: "/projects/home/tareeqi.webp",
    imagePosition: "center",
    href: "/cases/tareeqi",
  },
  {
    number: "04",
    slug: "hijaman-cups",
    name: "Hijama’N Cups",
    title: "Traditionele zorg vertalen naar een rustige digitale ontvangst",
    summary:
      "Een warme Framer-website voor een zelfstandige behandelpraktijk, waarin uitleg, vertrouwen en laagdrempelig boeken samenkomen.",
    services: "Strategie · UX/UI · Framer ontwerp en bouw",
    category: "Klantproject",
    status: "Online",
    bg: "#dae5dd",
    ink: "#0b4a20",
    image: "/projects/home/hijaman-cups.webp",
    imagePosition: "center",
    href: "/cases/hijaman-cups",
  },
  {
    number: "05",
    slug: "bayn",
    name: "Bayn Signal",
    title: "Vooruitlopen op lokale veranderingen met bruikbare inzichten",
    summary:
      "Een betrouwbaar signaalplatform dat expats en migranten vroegtijdig context geeft over regels, routes en het dagelijks leven.",
    services: "Redactionele strategie · UX/UI · Platformconcept",
    category: "Conceptproject",
    status: "Zelf geïnitieerd",
    bg: "#cbd9cc",
    ink: "#123f37",
    image: "/projects/home/bayn.webp",
    imagePosition: "center",
    href: "/cases/bayn-signal",
  },
  {
    number: "06",
    slug: "atotz",
    name: "AtotZ Detachering",
    title: "Binnen één week van geen digitale plek naar gericht contact",
    summary:
      "Een professionele sectorsite voor acht vakgebieden, gebouwd rond herkenning en directe WhatsApp-instroom.",
    services: "Strategie · copy · UX/UI · Framer · overdracht",
    category: "Klantproject",
    status: "Online",
    bg: "#1c2a3a",
    ink: "#f9fafb",
    image: "/projects/home/atotz-hero-thumbnail.jpg",
    imagePosition: "center",
    href: "/cases/atotz-detachering",
  },
  {
    number: "07",
    slug: "guidance",
    name: "Guidance Travel",
    title: "Een functionele herdefinitie van hoogwaardige reizen",
    summary:
      "Een conversiegerichte reiservaring waarin elke keuze, van pakketfilter tot reflectie, het vertrouwen van de pelgrim versterkt.",
    services: "Conversiestrategie · UX/UI · Webontwerp",
    category: "Conceptproject",
    status: "Zelf geïnitieerd",
    bg: "#ff9e43",
    ink: "#28231f",
    image: "/projects/home/guidance.webp",
    imagePosition: "center",
    href: "/cases/guidance-travel",
  },
  {
    number: "08",
    slug: "ayn",
    name: "Ayn Al-Hikmah",
    title: "Het gat vullen voor kenniszoekers die Medina verlaten",
    summary:
      "Een boekhandel en leeromgeving die boeken, geleerden en de structuur van studeren uit de Haramain dichterbij brengt.",
    services: "Strategie · E-commerce · Leerervaring",
    category: "Conceptproject",
    status: "Zelf geïnitieerd",
    bg: "#f2cf82",
    ink: "#401818",
    image: "/projects/home/ayn.webp",
    imagePosition: "center",
    href: "/cases/ayn-al-hikmah",
  },
] as const;

const projectCount = String(projects.length).padStart(2, "0");
const heroCtaRingCopy = {
  nl: {
    idle: "ZIE DE GEVOLGEN · ZIE DE GEVOLGEN · ",
    active: "ONTDEK PROJECTEN · ONTDEK PROJECTEN · ",
    case: "BEKIJK CASE · BEKIJK CASE · ",
  },
  en: {
    idle: "SEE THE OUTCOME · SEE THE OUTCOME · ",
    active: "EXPLORE PROJECTS · EXPLORE PROJECTS · ",
    case: "VIEW CASE · VIEW CASE · ",
  },
} as const;

const manifestoMarkerWords = {
  nl: new Set(["probleem", "gebruikers", "bouwen"]),
  en: new Set(["problem", "users", "build"]),
};

const personalStory = [
  {
    step: "01",
    kicker: "Wie ik ben",
    title: "Ik breek het ijs. Niet de basis.",
    englishTitle: "Easy conversation. Serious foundations.",
    body: "Ik ben Abdelrahman. Sociaal genoeg om snel aan tafel te komen, scherp genoeg om niet overal ja op te zeggen. Een goede klik geeft ruimte voor eerlijke vragen. Precies daar wordt het werk sterker van.",
    image: "/about/web/portrait-studio.webp",
    alt: "Abdelrahman in zijn ontwerpstudio",
    position: "center 35%",
    note: "Nieuwsgierigheid boven zekerheid",
    caption: "Thuisstudio / waar vragen vorm krijgen",
    dotX: "55%",
    dotMobileX: "8%",
  },
  {
    step: "02",
    kicker: "Wat ik doe",
    title: "Eerst begrijpen wat er schuurt. Dan pas een scherm.",
    englishTitle: "Understand the friction before designing the screen.",
    body: "We leggen aannames, gedrag en doelen naast elkaar. Ik zoek het moment waarop losse informatie één duidelijke richting krijgt. Vanaf daar ontwerp ik websites die logisch reageren op echte keuzes.",
    image: "/about/web/designing.webp",
    alt: "Abdelrahman werkt aan een digitaal ontwerp achter zijn bureau",
    position: "center",
    note: "Strategie vóór schermen",
    caption: "In ontwikkeling / bouwen, testen, opnieuw kijken",
    dotX: "39%",
    dotMobileX: "91%",
  },
  {
    step: "03",
    kicker: "Hoe ik blijf groeien",
    title: "Wat ik vandaag leer, verandert morgen mijn ontwerp.",
    englishTitle: "What I learn today shapes what I design tomorrow.",
    body: "Ik lees, observeer en experimenteer met strategie, psychologie, techniek, cultuur en AI. Niet om iedere trend te volgen, maar om per vraag een rijker antwoord te kunnen geven.",
    image: "/about/web/learning.webp",
    alt: "Abdelrahman leest The Heart of Design",
    position: "center",
    note: "Blijf een leerling",
    caption: "Veldnotities / kennis houdt mijn blik beweeglijk",
    dotX: "63%",
    dotMobileX: "11%",
  },
  {
    step: "04",
    kicker: "En buiten het scherm",
    title: "Papa zijn is mijn scherpste gebruikerstest.",
    englishTitle: "Fatherhood is my most honest usability test.",
    body: "Een kind accepteert geen ingewikkelde uitleg voor iets dat simpel moet zijn. Vaderschap houdt mijn werk menselijk: aandacht is schaars, context verandert continu en verantwoordelijkheid laat zich niet wegstylen.",
    image: "/about/web/fatherhood.webp",
    alt: "Abdelrahman als vader bij de kinderwagen",
    position: "center 35%",
    note: "Ontwerp begint thuis",
    caption: "Dagelijks leven / de belangrijkste rol buiten het scherm",
    dotX: "44%",
    dotMobileX: "88%",
  },
] as const;

const directionPalette = {
  focus: "#f1cf82",
  route: "#e9a08b",
  proof: "#b8d5d8",
  care: "#cad9a7",
  craft: "#c9653d",
} as const;

type StoryMosaicController = {
  render: (reveal: number, exit: number) => void;
  resize: () => void;
  dispose: () => void;
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

function createStoryMosaic(
  canvas: HTMLCanvasElement,
  fullImage: HTMLElement,
  source: string,
  objectPosition: string,
  direction: number,
): StoryMosaicController {
  const stage = canvas.parentElement;
  let gl: WebGLRenderingContext | null = null;
  let program: WebGLProgram | null = null;
  let texture: WebGLTexture | null = null;
  let image: HTMLImageElement | null = null;
  let revealProgress = 0;
  let exitProgress = 0;
  let disposed = false;
  let supported = true;

  const parsePosition = () => {
    const values = objectPosition.trim().split(/\s+/);
    const toFraction = (value: string | undefined, fallback: number) => {
      if (!value || value === "center") return fallback;
      if (value === "top" || value === "left") return 0;
      if (value === "bottom" || value === "right") return 1;
      const parsed = Number.parseFloat(value);
      return Number.isFinite(parsed) ? clamp01(parsed / 100) : fallback;
    };

    return {
      x: toFraction(values[0], 0.5),
      y: toFraction(values[1], values[0]?.includes("%") ? 0.5 : 0.5),
    };
  };

  const compileShader = (context: WebGLRenderingContext, type: number, sourceCode: string) => {
    const shader = context.createShader(type);
    if (!shader) return null;
    context.shaderSource(shader, sourceCode);
    context.compileShader(shader);
    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
      context.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const initialize = () => {
    if (gl || !supported || disposed) return;
    gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      supported = false;
      canvas.classList.add("is-unsupported");
      return;
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, `
      precision mediump float;
      uniform sampler2D uTexture;
      uniform vec2 uResolution;
      uniform vec2 uUvScale;
      uniform vec2 uUvOffset;
      uniform float uReveal;
      uniform float uExit;
      uniform float uDirection;
      varying vec2 vUv;

      float randomTile(vec2 tile) {
        return fract(sin(dot(tile, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        const float tileSize = 8.0;
        vec2 pixel = vUv * uResolution;
        vec2 tile = floor(pixel / tileSize);
        vec2 tileCount = ceil(uResolution / tileSize);
        vec2 normalizedTile = (tile + 0.5) / tileCount;
        float horizontal = uDirection < 0.0 ? normalizedTile.x : 1.0 - normalizedTile.x;
        float diagonal = (horizontal + (1.0 - normalizedTile.y)) * 0.5;
        float noise = randomTile(tile);
        float enterOrder = diagonal * 0.68 + noise * 0.2;
        float leaveOrder = (1.0 - diagonal) * 0.68 + randomTile(tile + vec2(19.0)) * 0.2;
        float assembled = smoothstep(enterOrder, enterOrder + 0.08, uReveal);
        float remaining = 1.0 - smoothstep(leaveOrder, leaveOrder + 0.08, uExit);
        vec2 imageUv = uUvOffset + vUv * uUvScale;
        vec4 color = texture2D(uTexture, imageUv);
        gl_FragColor = vec4(color.rgb, color.a * assembled * remaining);
      }
    `);

    if (!vertexShader || !fragmentShader) {
      supported = false;
      canvas.classList.add("is-unsupported");
      return;
    }

    program = gl.createProgram();
    if (!program) {
      supported = false;
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      supported = false;
      canvas.classList.add("is-unsupported");
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    image = new window.Image();
    image.decoding = "async";
    image.onload = () => {
      if (!gl || !program || !image || disposed) return;
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      draw();
    };
    image.src = source;
  };

  const draw = () => {
    if (!gl || !program || !texture || !image || disposed) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    const pixelRatio = 1;
    const width = Math.max(1, Math.round(rect.width * pixelRatio));
    const height = Math.max(1, Math.round(rect.height * pixelRatio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const canvasAspect = width / height;
    const imageAspect = image.naturalWidth / image.naturalHeight;
    const position = parsePosition();
    let scaleX = 1;
    let scaleY = 1;
    let offsetX = 0;
    let offsetY = 0;
    if (imageAspect > canvasAspect) {
      scaleX = canvasAspect / imageAspect;
      offsetX = (1 - scaleX) * position.x;
    } else {
      scaleY = imageAspect / canvasAspect;
      offsetY = (1 - scaleY) * (1 - position.y);
    }

    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform2f(gl.getUniformLocation(program, "uResolution"), width, height);
    gl.uniform2f(gl.getUniformLocation(program, "uUvScale"), scaleX, scaleY);
    gl.uniform2f(gl.getUniformLocation(program, "uUvOffset"), offsetX, offsetY);
    gl.uniform1f(gl.getUniformLocation(program, "uReveal"), revealProgress);
    gl.uniform1f(gl.getUniformLocation(program, "uExit"), exitProgress);
    gl.uniform1f(gl.getUniformLocation(program, "uDirection"), direction);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  return {
    render(reveal, exit) {
      revealProgress = clamp01(reveal);
      exitProgress = clamp01(exit);
      if (stage) stage.style.opacity = `${1 - exitProgress}`;
      if ((revealProgress > 0 || exitProgress > 0) && !gl && supported) initialize();

      if (!supported) {
        fullImage.style.opacity = `${revealProgress * (1 - exitProgress)}`;
        return;
      }

      // Crossfade the mosaic into the final image. A hard hand-off at 99.5%
      // caused a visible white flash on some GPUs once the image had loaded.
      const imageBlend = clamp01((revealProgress - 0.68) / 0.32);
      const canvasBlend = 1 - clamp01((revealProgress - 0.82) / 0.18);
      fullImage.style.opacity = `${imageBlend * (1 - exitProgress)}`;
      canvas.style.opacity = `${canvasBlend * (1 - exitProgress)}`;
      draw();
    },
    resize() {
      draw();
    },
    dispose() {
      disposed = true;
      if (gl && texture) gl.deleteTexture(texture);
      if (gl && program) gl.deleteProgram(program);
      const loseContext = gl?.getExtension("WEBGL_lose_context");
      loseContext?.loseContext();
      gl = null;
      program = null;
      texture = null;
      image = null;
    },
  };
}

const workingMethod = [
  {
    number: "01",
    phase: "Kaderen",
    title: "Maak de beslissing scherp.",
    body: "Ik breng de briefing terug tot één gebruikersbeslissing, één zakelijk doel en de beperking die beide kan laten ontsporen.",
    tools: "Synthese · Probleemkader · Succesmaatstaf",
    annotation: "Een scherpe beslissing houdt de interface rustig.",
    color: directionPalette.focus,
  },
  {
    number: "02",
    phase: "Uittekenen",
    title: "Maak de route zichtbaar.",
    body: "Flows en vroege schermen leggen ontbrekende stappen bloot voordat visuele verfijning ze kostbaar maakt om te veranderen.",
    tools: "Journey · User flow · Low-fi prototype",
    annotation: "Eerst de route. Daarna de glans.",
    color: directionPalette.route,
  },
  {
    number: "03",
    phase: "Bewijzen",
    title: "Test wat kan breken.",
    body: "Ik toets eerst de riskantste aanname: begrijpen mensen de route, vertrouwen ze de boodschap en vinden ze het juiste vervolg?",
    tools: "Gesprekken · Taaktest · Gedragsdata",
    annotation: "Bewijs het risico, niet ieder detail.",
    color: directionPalette.proof,
  },
  {
    number: "04",
    phase: "Aanscherpen",
    title: "Lever bewijs, geen decoratie.",
    body: "Interface, content en uitvoering worden samen verfijnd. Na livegang kijk ik naar gebruikssignalen om te zien wat echt werkt.",
    tools: "Designsystem · Handoff · QA · Meting",
    annotation: "Mooi wordt waardevol zodra het werkt.",
    color: directionPalette.care,
  },
] as const;

const mindZones = [
  {
    id: "curiosity",
    number: "01",
    label: "Nieuwsgierigheid",
    title: "De echte vraag vinden",
    detail:
      "Aandacht, afweging en vooruitdenken brengen aannames terug tot de vraag die er echt toe doet.",
    color: directionPalette.focus,
    ink: "#342d27",
  },
  {
    id: "connections",
    number: "02",
    label: "Verbindingen",
    title: "Context bij elkaar brengen",
    detail:
      "Losse signalen, perspectieven en ruimtelijke context worden één samenhangend beeld.",
    color: directionPalette.route,
    ink: "#342d27",
  },
  {
    id: "source",
    number: "03",
    label: "Unlimited source",
    title: "Herinnering als springplank",
    detail:
      "Ervaring, taal en associaties vormen de bron waaruit onverwachte ideeën kunnen ontstaan.",
    color: directionPalette.care,
    ink: "#23351f",
  },
  {
    id: "structure",
    number: "04",
    label: "Structuur",
    title: "Patronen zichtbaar maken",
    detail:
      "Visuele informatie wordt herkend, geordend en vertaald naar een ontwerp zonder ruis.",
    color: directionPalette.proof,
    ink: "#20363b",
  },
  {
    id: "direction",
    number: "05",
    label: "Richting geven",
    title: "Van gedachte naar realiteit",
    detail:
      "Intentie wordt verfijnd tot ritme, timing en een uitvoering die precies op haar doel landt.",
    color: directionPalette.craft,
    ink: "#fff8f0",
  },
] as const;

const homeMotionStorageKey = "portfolio:home-motion-seen:v1";

function hasSeenHomeMotion() {
  try {
    return window.localStorage.getItem(homeMotionStorageKey) === "true";
  } catch {
    return false;
  }
}

function rememberHomeMotion() {
  try {
    window.localStorage.setItem(homeMotionStorageKey, "true");
  } catch {
    // Storage can be unavailable in strict privacy modes; keep the site functional.
  }
}

export function HomeExperience({ locale = "nl" }: { locale?: Locale }) {
  const root = useRef<HTMLElement>(null);
  const [activeMindZone, setActiveMindZone] = useState<string | null>(null);
  const [isMindTouchReady, setIsMindTouchReady] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const touchMindZone = mindZones.find((zone) => zone.id === activeMindZone) ?? mindZones[0];

  useEffect(() => {
    const touchHero = window.matchMedia(
      "(max-width: 980px), (hover: none), (pointer: coarse)",
    );

    const syncTouchState = () => {
      setActiveMindZone((current) => (
        touchHero.matches ? (current ?? mindZones[0].id) : null
      ));
    };

    syncTouchState();
    touchHero.addEventListener("change", syncTouchState);
    return () => touchHero.removeEventListener("change", syncTouchState);
  }, []);

  useEffect(() => {
    const mobileHero = window.matchMedia("(max-width: 720px)");
    const touchExplorer = root.current?.querySelector<HTMLElement>(".mind-touch-explorer");

    if (!touchExplorer || !mobileHero.matches) {
      setIsMindTouchReady(true);
      return;
    }

    setIsMindTouchReady(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMindTouchReady(entry.isIntersecting);
      },
      {
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(touchExplorer);

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seenHomeMotion = hasSeenHomeMotion();
    const supportsHeroParallax = window.matchMedia("(min-width: 721px)").matches;

    let cleanupStoryRoute = () => {};
    let cleanupStoryMosaics = () => {};
    let cleanupHeader = () => {};
    let cleanupHeroCta = () => {};
    let cleanupHeroMosaic = () => {};
    let cleanupCaseCursor = () => {};

    const context = gsap.context(() => {
      ScrollTrigger.config({
        ignoreMobileResize: true,
        limitCallbacks: true,
      });
      const touchHeroVisual = window.matchMedia("(max-width: 980px), (hover: none), (pointer: coarse)").matches;

      const motion = {
        ease: "power4.out",
        softEase: "power3.out",
        revealDuration: 0.86,
        sectionStagger: 0.13,
      };

      const header = root.current?.querySelector<HTMLElement>(".site-header");
      let previousScroll = window.scrollY;
      let headerVisible = true;
      let scrollFrame = 0;

      const setHeaderVisibility = (visible: boolean) => {
        if (!header || visible === headerVisible) return;
        headerVisible = visible;
        gsap.to(header, {
          autoAlpha: visible ? 1 : 0,
          yPercent: visible ? 0 : -125,
          /* De openingsanimatie laat de balk van y: -18 naar y: 0 zakken. Scrolt
             iemand terwijl dat nog loopt, dan breekt overwrite: true die tween
             af en blijft die -18 voorgoed staan: de balk hangt dan achttien
             pixels te hoog en wordt bovenaan afgesneden. Daarom zet zichtbaar
             ook y op nul - de twee eigenschappen zijn apart, dus dit bijt de
             yPercent hierboven niet. */
          ...(visible ? { y: 0 } : {}),
          duration: visible ? 0.42 : 0.3,
          ease: visible ? "power3.out" : "power2.in",
          overwrite: true,
        });
      };

      const handleDirectionalScroll = () => {
        if (scrollFrame) return;
        scrollFrame = window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const delta = currentScroll - previousScroll;
          if (currentScroll < 90) setHeaderVisibility(true);
          else if (delta > 7) setHeaderVisibility(false);
          else if (delta < -7) setHeaderVisibility(true);
          previousScroll = currentScroll;
          scrollFrame = 0;
        });
      };

      const updateNavigation = (section: HTMLElement) => {
        if (header) header.dataset.theme = section.dataset.navTheme ?? "light";
        setActiveNav(section.dataset.navKey ?? "");
      };

      window.addEventListener("scroll", handleDirectionalScroll, { passive: true });
      gsap.utils.toArray<HTMLElement>("[data-nav-theme]").forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 18%",
          end: "bottom 18%",
          onEnter: () => updateNavigation(section),
          onEnterBack: () => updateNavigation(section),
        });
      });

      cleanupHeader = () => {
        window.removeEventListener("scroll", handleDirectionalScroll);
        if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      };

      const heroMosaicCanvas = root.current?.querySelector<HTMLCanvasElement>(".mind-hero-mosaic");
      const heroFullImage = root.current?.querySelector<HTMLElement>(".mind-hero-base");
      const heroSection = root.current?.querySelector<HTMLElement>(".mind-hero");
      const siteHeader = root.current?.querySelector<HTMLElement>(".site-header");
      const markHeroReady = () => {
        heroSection?.setAttribute("data-hero-motion", "ready");
        siteHeader?.setAttribute("data-header-motion", "ready");
      };

      // Het inline script in de layout houdt de startposities vast vóór de
      // eerste paint en zet na 2,6s een noodrem, zodat de hero nooit leeg
      // blijft hangen als deze bundel wegblijft. Hier is hij er wél, dus de
      // noodrem kan uit. Was hij al afgegaan, dan staat de hero compleet in
      // beeld: dan niet alsnog animeren, want dan ziet de bezoeker alles een
      // tweede keer verdwijnen en terugkomen.
      const motionFallback = window as unknown as { __heroMotionFallback?: number };
      if (motionFallback.__heroMotionFallback !== undefined) {
        window.clearTimeout(motionFallback.__heroMotionFallback);
        motionFallback.__heroMotionFallback = undefined;
      }
      const skipHeroIntro = prefersReducedMotion
        || document.documentElement.dataset.heroFallback === "fired";
      const heroMosaic = heroMosaicCanvas && heroFullImage
        ? createStoryMosaic(
          heroMosaicCanvas,
          heroFullImage,
          "/about/hero-abdel-profile.png",
          "right bottom",
          -1,
        )
        : null;
      const heroReveal = { progress: skipHeroIntro ? 1 : 0 };

      if (heroMosaic) {
        const resizeHeroMosaic = () => heroMosaic.resize();
        heroMosaic.render(heroReveal.progress, 0);
        window.addEventListener("resize", resizeHeroMosaic);
        cleanupHeroMosaic = () => {
          window.removeEventListener("resize", resizeHeroMosaic);
          heroMosaic.dispose();
        };
      }

      if (skipHeroIntro) {
        markHeroReady();
        gsap.set(".site-header", { autoAlpha: 1, y: 0 });
        gsap.set(".mind-title-handwrite", { clipPath: "inset(0 0% 0 0)" });
        gsap.set(".mind-hero-photo-slide", { clipPath: "inset(0 0 0 0%)", xPercent: 0, opacity: 1 });
        gsap.set(".mind-hero-mosaic", { filter: "blur(0px)", scale: 1, opacity: 1 });
        gsap.set(".mind-hero-base", { filter: "blur(0px)", scale: 1, opacity: 1 });
        gsap.set(".mind-title-line > span", { y: 0 });
        gsap.set(".mind-hero-canvas, .mind-hero-lede, .mind-hero-actions", { autoAlpha: 1, y: 0 });
        gsap.set(".mind-hero-meta span, .mind-brain-dot", { autoAlpha: 1, y: 0, scale: 1 });
      }

      if (!skipHeroIntro) {
        gsap.set(".mind-title-handwrite", { clipPath: "inset(0 100% 0 0)" });
        gsap.set(".mind-hero-photo-slide", {
          clipPath: "inset(0 0 0 100%)",
          xPercent: 14,
          opacity: 0.18,
        });
        gsap.set(".mind-hero-mosaic", { filter: "blur(16px)", scale: 1.055, opacity: 1 });
        gsap.set(".mind-hero-base", { filter: "blur(10px)", scale: 1.025, opacity: 0 });
        gsap.set(".mind-title-line > span", { y: "1.24em" });
        // Gelijk aan de pre-hydration lock in globals.css: wijzig ze samen.
        gsap.set(".site-header", { autoAlpha: 0, y: -18 });
        gsap.set(".mind-hero-canvas", { autoAlpha: 0 });
        gsap.set(".mind-hero-lede", { autoAlpha: 0, y: 18 });
        gsap.set(".mind-hero-meta span", { autoAlpha: 0, y: 12 });
        gsap.set(".mind-hero-actions", { autoAlpha: 0, y: 18 });
        gsap.set(".mind-brain-dot", { autoAlpha: 0, scale: 0.68, transformOrigin: "50% 50%" });

        const revealHeroVisual = () => {
          const visual = gsap.timeline({ defaults: { ease: "power4.out" } });
          visual
            .to(
              ".mind-hero-photo-slide",
              {
                clipPath: "inset(0 0 0 0%)",
                xPercent: 0,
                opacity: 1,
                duration: 1.08,
                ease: "power4.inOut",
              },
            )
            .to(
              heroReveal,
              {
                progress: 1,
                duration: 1.12,
                ease: "power3.inOut",
                onUpdate: () => heroMosaic?.render(heroReveal.progress, 0),
              },
              "-=0.82",
            )
            .to(
              ".mind-hero-mosaic",
              { filter: "blur(0px)", scale: 1, duration: 1.04, ease: "power3.out" },
              "<",
            )
            .to(
              ".mind-hero-base",
              { filter: "blur(0px)", scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
              "<+0.34",
            )
            .to(
              ".mind-brain-dot",
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.44,
                stagger: 0.08,
                ease: "back.out(1.6)",
              },
              "-=0.38",
            );

          return visual;
        };

        const intro = gsap.timeline({
          defaults: { ease: "power4.out" },
          onComplete: () => {
            markHeroReady();
            rememberHomeMotion();
          },
        });
        intro
          .to(
            ".mind-hero-canvas",
            { autoAlpha: 1, duration: 0.28, ease: "power2.out" },
          )
          .call(
            markHeroReady,
            undefined,
            "+=0.08",
          )
          .set(
            ".mind-hero-title",
            { autoAlpha: 1 },
            "<",
          )
          .to(
            ".mind-title-line > span",
            {
              y: 0,
              duration: 1.02,
              stagger: 0.16,
              ease: "power4.out",
              clearProps: "transform",
            },
            "<",
          )
          .add(
            touchHeroVisual ? gsap.timeline() : revealHeroVisual(),
            "-=0.42",
          )
          .to(
            ".mind-title-handwrite",
            { clipPath: "inset(0 0% 0 0)", duration: 0.82, ease: "power3.inOut" },
            "-=0.34",
          )
          .to(
            ".mind-hero-lede",
            { autoAlpha: 1, y: 0, duration: 0.48 },
            "-=0.62",
          )
          .to(
            ".mind-hero-meta span",
            { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.06 },
            "-=0.32",
          )
          .to(
            ".site-header",
            { autoAlpha: 1, y: 0, duration: 0.46 },
            "-=0.36",
          )
          .to(
            ".mind-hero-actions",
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "-=0.28",
          );

        if (touchHeroVisual) {
          ScrollTrigger.create({
            trigger: ".mind-hero-visual",
            start: "top 78%",
            once: true,
            onEnter: () => revealHeroVisual(),
          });
        }
      }

      const heroCtaStage = root.current?.querySelector<HTMLElement>(".hero-cta-stage");
      const heroCta = root.current?.querySelector<HTMLElement>(".hero-cta-container");
      const heroCtaRings = root.current?.querySelectorAll<HTMLElement>(".editorial-text-ring");

      if (heroCtaStage && heroCta && heroCtaRings?.length) {
        const moveX = gsap.quickTo(heroCta, "x", { duration: 0.34, ease: "power3.out" });
        const moveY = gsap.quickTo(heroCta, "y", { duration: 0.34, ease: "power3.out" });
        let pointerX = -1000;
        let pointerY = -1000;
        let pointerFrame = 0;
        let isNear = false;
        let hasFocus = false;
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

        if (!prefersReducedMotion) {
          gsap.to(heroCtaRings, {
            rotation: 360,
            duration: 11,
            repeat: -1,
            ease: "none",
            transformOrigin: "50% 50%",
          });
        }

        const setEngaged = (engaged: boolean, capturePointer = false) => {
          if (engaged !== isNear) {
            isNear = engaged;
            heroCta.classList.toggle("is-engaged", engaged);
          }
          document.documentElement.classList.toggle(
            "is-cta-captured",
            engaged && capturePointer && finePointer.matches && !hasFocus,
          );
        };

        const resetMagnet = () => {
          moveX(0);
          moveY(0);
          if (!hasFocus) setEngaged(false);
        };

        const renderPointer = () => {
          pointerFrame = 0;
          if (!finePointer.matches || hasFocus) return;
          const rect = heroCtaStage.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = pointerX - centerX;
          const deltaY = pointerY - centerY;
          const distance = Math.hypot(deltaX, deltaY);
          const reach = Math.max(rect.width, rect.height) / 2 + 118;

          if (distance >= reach) {
            resetMagnet();
            return;
          }

          const proximity = 1 - (distance / reach);
          const smoothPull = proximity * proximity * (3 - (2 * proximity));
          const follow = Math.min(0.97, smoothPull * 1.12);
          moveX(deltaX * follow);
          moveY(deltaY * follow);
          setEngaged(true, proximity > 0.52);
        };

        const handlePointerMove = (event: PointerEvent) => {
          if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") return;
          pointerX = event.clientX;
          pointerY = event.clientY;
          if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderPointer);
        };

        const handleFocus = () => {
          hasFocus = true;
          moveX(0);
          moveY(0);
          setEngaged(true);
        };

        const handleBlur = () => {
          hasFocus = false;
          resetMagnet();
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("blur", resetMagnet);
        heroCta.addEventListener("focus", handleFocus);
        heroCta.addEventListener("blur", handleBlur);

        if (!prefersReducedMotion && supportsHeroParallax) {
          gsap.to(heroCtaStage, {
            autoAlpha: 0,
            y: -34,
            ease: "none",
            scrollTrigger: {
              trigger: ".mind-hero",
              start: "top top",
              end: "35% top",
              scrub: true,
            },
          });
        }

        cleanupHeroCta = () => {
          window.removeEventListener("pointermove", handlePointerMove);
          window.removeEventListener("blur", resetMagnet);
          heroCta.removeEventListener("focus", handleFocus);
          heroCta.removeEventListener("blur", handleBlur);
          if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
          document.documentElement.classList.remove("is-cta-captured");
        };
      }

      if (!prefersReducedMotion && !seenHomeMotion && supportsHeroParallax) {
        gsap.to(".mind-hero-content", {
          opacity: 0.32,
          yPercent: -9,
          scale: 0.965,
          transformOrigin: "center top",
          ease: "none",
          scrollTrigger: {
            trigger: ".mind-hero",
            start: "58% center",
            end: "bottom top",
            scrub: 1.1,
          },
        });

        gsap.to(".mind-hero-visual", {
          yPercent: -4,
          scale: 0.985,
          opacity: 0.42,
          ease: "none",
          scrollTrigger: {
            trigger: ".mind-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.15,
          },
        });
      }

      if (!prefersReducedMotion && !seenHomeMotion) {
        gsap.from(".manifesto-word", {
          autoAlpha: 0,
          y: 28,
          filter: "blur(5px)",
          stagger: { each: 0.018, from: "start" },
          duration: 0.72,
          ease: motion.softEase,
          clearProps: "filter,transform,opacity,visibility",
          scrollTrigger: {
            trigger: ".manifesto-copy",
            start: "top 78%",
            toggleActions: "play none none none",
            once: true,
            fastScrollEnd: true,
          },
        });

        gsap.from(".manifesto-aside > *", {
          autoAlpha: 0,
          y: 22,
          duration: 0.72,
          stagger: 0.12,
          ease: motion.softEase,
          scrollTrigger: {
            trigger: ".manifesto",
            start: "top 66%",
            toggleActions: "play none none none",
            once: true,
            fastScrollEnd: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".manifesto-marker").forEach((word) => {
        const stroke = word.querySelector<HTMLElement>(".manifesto-marker-stroke");
        if (!stroke) return;

        if (seenHomeMotion) {
          gsap.set(stroke, { clipPath: "inset(0 0% 0 0)" });
          return;
        }

        gsap.fromTo(stroke, { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: word,
            start: "top 76%",
            end: "bottom 58%",
            scrub: 0.75,
          },
        });
      });

      const quarterWord = root.current?.querySelector<HTMLElement>('[data-marker-word="kwartje"]');
      const quarter = quarterWord?.querySelector<HTMLElement>(".manifesto-quarter-roll");
      if (quarterWord && quarter && !seenHomeMotion) {
        const quarterTimeline = gsap.timeline({ paused: true });

        quarterTimeline
          .set(quarter, {
            autoAlpha: 0,
            x: () => -quarter.offsetWidth * 0.82,
            yPercent: -50,
            rotation: -24,
            scale: 0.82,
            transformOrigin: "50% 50%",
          })
          .to(quarter, {
            delay: 0.18,
            autoAlpha: 0.28,
            x: () => quarterWord.offsetWidth * 0.18,
            rotation: 54,
            duration: 0.18,
            ease: "power2.out",
          })
          .to(quarter, {
            x: () => quarterWord.offsetWidth - (quarter.offsetWidth * 0.62),
            rotation: 334,
            duration: 0.72,
            ease: "none",
          })
          .to(quarter, {
            autoAlpha: 0,
            x: () => quarterWord.offsetWidth - (quarter.offsetWidth * 0.12),
            rotation: 402,
            scale: 0.26,
            duration: 0.24,
            ease: "power2.in",
          });

        ScrollTrigger.create({
          trigger: quarterWord,
          start: "bottom 61%",
          onEnter: () => quarterTimeline.restart(),
          onLeaveBack: () => quarterTimeline.pause(0),
        });
      }

      const showcaseHeading = root.current?.querySelector<HTMLElement>(".showcase-heading");
      if (showcaseHeading && !prefersReducedMotion && !seenHomeMotion) {
        const showcaseTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: showcaseHeading,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
            fastScrollEnd: true,
          },
        });
        showcaseTimeline
          .from(showcaseHeading.querySelector(".section-kicker"), {
            autoAlpha: 0,
            y: 16,
            duration: 0.48,
            ease: motion.softEase,
          })
          .from(".showcase-title-line > span", {
            yPercent: 118,
            duration: 0.9,
            ease: motion.ease,
          }, "-=0.16")
          .from(showcaseHeading.querySelector(".showcase-heading-copy p"), {
            autoAlpha: 0,
            y: 24,
            duration: motion.revealDuration,
            ease: motion.softEase,
          }, "-=0.38")
          .from(showcaseHeading.querySelectorAll(".showcase-index span"), {
            autoAlpha: 0,
            y: 18,
            duration: 0.62,
            stagger: 0.08,
            ease: motion.softEase,
          }, "-=0.44");
      }

      gsap.utils.toArray<HTMLElement>(".project-entry").forEach((entry) => {
        const visual = entry.querySelector<HTMLElement>(".project-visual");
        const media = entry.querySelector<HTMLElement>(".project-parallax-media");

        if (media && supportsHeroParallax && !prefersReducedMotion && !seenHomeMotion) {
          gsap.fromTo(media, {
            yPercent: -4,
          }, {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: entry,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.25,
            },
          });
        }

        if (!prefersReducedMotion && !seenHomeMotion) {
          const projectTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: entry,
              start: "top 84%",
              toggleActions: "play none none none",
              once: true,
              fastScrollEnd: true,
            },
          });
          if (visual) {
            projectTimeline.fromTo(visual, {
              autoAlpha: 0,
              y: 48,
              scale: 0.985,
            }, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.92,
              ease: motion.ease,
            });
          }
          projectTimeline.from(entry.querySelectorAll(".project-card-copy > *"), {
            autoAlpha: 0,
            y: 18,
            duration: 0.58,
            stagger: 0.065,
            ease: motion.softEase,
          }, visual ? "-=0.42" : 0);
        }
      });

      const showcaseSection = root.current?.querySelector<HTMLElement>(".showcase");
      const caseCursor = showcaseSection?.querySelector<HTMLElement>(".case-cursor");
      const fineCasePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

      if (showcaseSection && caseCursor && fineCasePointer.matches) {
        const cursorX = gsap.quickTo(caseCursor, "x", { duration: 0.24, ease: "power3.out" });
        const cursorY = gsap.quickTo(caseCursor, "y", { duration: 0.24, ease: "power3.out" });
        let activeCard: HTMLElement | null = null;
        let pointerFrame = 0;
        let pointerX = -200;
        let pointerY = -200;

        gsap.set(caseCursor, { xPercent: -50, yPercent: -50 });

        const renderCasePointer = () => {
          pointerFrame = 0;
          const sectionRect = showcaseSection.getBoundingClientRect();
          showcaseSection.style.setProperty("--showcase-pointer-x", `${pointerX - sectionRect.left}px`);
          showcaseSection.style.setProperty("--showcase-pointer-y", `${pointerY - sectionRect.top}px`);
          cursorX(pointerX);
          cursorY(pointerY);

          const target = document.elementFromPoint(pointerX, pointerY);
          const card = target?.closest<HTMLElement>(".project-card-link") ?? null;
          const nextCard = card && showcaseSection.contains(card) ? card : null;

          if (nextCard !== activeCard) {
            activeCard = nextCard;
            caseCursor.classList.toggle("is-visible", Boolean(activeCard));
            showcaseSection.classList.toggle("is-case-hover", Boolean(activeCard));

            if (activeCard) {
              caseCursor.style.setProperty("--case-cursor-bg", activeCard.dataset.cursorBg ?? "#f8f3e9");
              caseCursor.style.setProperty("--case-cursor-ink", activeCard.dataset.cursorInk ?? "#2f2a25");
            }
          }
        };

        const handleCasePointerMove = (event: PointerEvent) => {
          pointerX = event.clientX;
          pointerY = event.clientY;
          showcaseSection.classList.add("is-pointer-present");
          if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderCasePointer);
        };

        const handleCasePointerScroll = () => {
          if (!pointerFrame) pointerFrame = window.requestAnimationFrame(renderCasePointer);
        };

        const handleCasePointerLeave = () => {
          activeCard = null;
          caseCursor.classList.remove("is-visible");
          showcaseSection.classList.remove("is-pointer-present", "is-case-hover");
        };

        showcaseSection.addEventListener("pointermove", handleCasePointerMove, { passive: true });
        showcaseSection.addEventListener("pointerleave", handleCasePointerLeave);
        window.addEventListener("scroll", handleCasePointerScroll, { passive: true });

        cleanupCaseCursor = () => {
          showcaseSection.removeEventListener("pointermove", handleCasePointerMove);
          showcaseSection.removeEventListener("pointerleave", handleCasePointerLeave);
          window.removeEventListener("scroll", handleCasePointerScroll);
          if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
          showcaseSection.classList.remove("is-pointer-present", "is-case-hover");
        };
      }

      const route = root.current?.querySelector<HTMLElement>(".story-route");
      const routeSvg = route?.querySelector<SVGSVGElement>(".story-route-svg");
      const basePath = route?.querySelector<SVGPathElement>(".story-route-base");
      const progressPath = route?.querySelector<SVGPathElement>(".story-route-progress");
      const runner = route?.querySelector<HTMLElement>(".story-route-runner");
      const stops = route
        ? Array.from(route.querySelectorAll<HTMLElement>(".story-stop"))
        : [];

      if (route && routeSvg && basePath && progressPath && runner && stops.length > 0) {
        type Point = { x: number; y: number };
        const routeLabels = locale === "en"
          ? ["Studio", "Making", "Learning", "Living", "Approach"]
          : ["Studio", "Maken", "Leren", "Leven", "Aanpak"];
        let routeLength = 0;
        let routeProgress = 0;
        let resizeFrame = 0;
        let dotDistances: number[] = [];
        let routeSamples: Point[] = [];

        const createSmoothPath = (points: Point[]) => {
          if (points.length < 2) return "";
          let path = `M ${points[0].x} ${points[0].y}`;
          for (let index = 0; index < points.length - 1; index += 1) {
            const previous = points[Math.max(0, index - 1)];
            const current = points[index];
            const next = points[index + 1];
            const after = points[Math.min(points.length - 1, index + 2)];
            const controlOne = {
              x: current.x + (next.x - previous.x) / 6,
              y: current.y + (next.y - previous.y) / 6,
            };
            const controlTwo = {
              x: next.x - (after.x - current.x) / 6,
              y: next.y - (after.y - current.y) / 6,
            };
            path += ` C ${controlOne.x} ${controlOne.y}, ${controlTwo.x} ${controlTwo.y}, ${next.x} ${next.y}`;
          }
          return path;
        };

        const drawRoute = (progress: number) => {
          if (!routeLength) return;
          const normalizedProgress = clamp01(progress);
          const visibleLength = normalizedProgress * routeLength;
          const runnerPoint = basePath.getPointAtLength(visibleLength);
          const visibleSampleCount = Math.max(
            1,
            Math.ceil(normalizedProgress * Math.max(1, routeSamples.length - 1)),
          );
          const visibleSamples = routeSamples.slice(0, visibleSampleCount);
          const partialPath = visibleSamples.length > 0
            ? `M ${visibleSamples[0].x} ${visibleSamples[0].y}${visibleSamples
              .slice(1)
              .map((point) => ` L ${point.x} ${point.y}`)
              .join("")} L ${runnerPoint.x} ${runnerPoint.y}`
            : `M ${runnerPoint.x} ${runnerPoint.y}`;
          progressPath.setAttribute("d", partialPath);
          gsap.set(runner, { x: runnerPoint.x - 7, y: runnerPoint.y - 7 });
          const upcomingStop = dotDistances.findIndex((distance) => visibleLength < distance - 12);
          const routeIndex = Math.max(
            0,
            Math.min(stops.length - 1, upcomingStop === -1 ? stops.length - 1 : upcomingStop),
          );
          runner.dataset.label = routeLabels[upcomingStop === -1 ? routeLabels.length - 1 : upcomingStop];
          route.style.setProperty("--story-accent", workingMethod[routeIndex]?.color ?? directionPalette.craft);

          dotDistances.forEach((distance, index) => {
            const previousDistance = index === 0 ? 0 : dotDistances[index - 1];
            const approachDistance = Math.max(120, (distance - previousDistance) * 0.42);
            const fillProgress = clamp01(
              (visibleLength - (distance - approachDistance)) / approachDistance,
            );
            const fill = stops[index]?.querySelector<HTMLElement>(".story-stop-dot-fill");
            if (fill) gsap.set(fill, { scaleY: fillProgress });
            stops[index]
              ?.querySelector<HTMLElement>(".story-stop-dot")
              ?.classList.toggle("is-current", Math.abs(visibleLength - distance) < 18);
          });
        };

        const findClosestDistance = (target: Point) => {
          const coarseStep = Math.max(8, routeLength / 900);
          let closestDistance = 0;
          let closestDelta = Number.POSITIVE_INFINITY;
          for (let distance = 0; distance <= routeLength; distance += coarseStep) {
            const point = basePath.getPointAtLength(distance);
            const delta = (point.x - target.x) ** 2 + (point.y - target.y) ** 2;
            if (delta < closestDelta) {
              closestDelta = delta;
              closestDistance = distance;
            }
          }
          const start = Math.max(0, closestDistance - coarseStep);
          const end = Math.min(routeLength, closestDistance + coarseStep);
          for (let distance = start; distance <= end; distance += 1) {
            const point = basePath.getPointAtLength(distance);
            const delta = (point.x - target.x) ** 2 + (point.y - target.y) ** 2;
            if (delta < closestDelta) {
              closestDelta = delta;
              closestDistance = distance;
            }
          }
          return closestDistance;
        };

        const calculateRoute = () => {
          const width = route.clientWidth;
          const height = route.scrollHeight;
          const routeRect = route.getBoundingClientRect();
          routeSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);

          const dotPoints = stops.map((stop) => {
            const dot = stop.querySelector<HTMLElement>(".story-stop-dot");
            const dotRect = dot?.getBoundingClientRect();
            return {
              x: dotRect ? dotRect.left + dotRect.width / 2 - routeRect.left : width / 2,
              y: dotRect ? dotRect.top + dotRect.height / 2 - routeRect.top : 0,
            };
          });
          const points: Point[] = [
            { x: width * 0.18, y: Math.min(64, height * 0.015) },
            ...dotPoints,
            { x: width * 0.78, y: height },
          ];
          const pathData = createSmoothPath(points);
          basePath.setAttribute("d", pathData);
          progressPath.setAttribute("d", pathData);
          routeLength = basePath.getTotalLength();
          routeSamples = Array.from(
            { length: Math.ceil(routeLength / 12) + 1 },
            (_, index) => basePath.getPointAtLength(Math.min(routeLength, index * 12)),
          );
          dotDistances = dotPoints.map(findClosestDistance);
          progressPath.style.opacity = "1";
          runner.style.opacity = "1";
          drawRoute(routeProgress);
        };

        const scheduleRouteCalculation = () => {
          window.cancelAnimationFrame(resizeFrame);
          resizeFrame = window.requestAnimationFrame(calculateRoute);
        };

        scheduleRouteCalculation();
        window.addEventListener("resize", scheduleRouteCalculation);
        ScrollTrigger.addEventListener("refreshInit", scheduleRouteCalculation);

        ScrollTrigger.create({
          trigger: route,
          start: "top 74%",
          end: "bottom 64%",
          scrub: 1.05,
          onUpdate: (self) => {
            routeProgress = self.progress;
            drawRoute(routeProgress);
          },
        });

        cleanupStoryRoute = () => {
          window.cancelAnimationFrame(resizeFrame);
          window.removeEventListener("resize", scheduleRouteCalculation);
          ScrollTrigger.removeEventListener("refreshInit", scheduleRouteCalculation);
        };
      }

      const mosaicControllers: StoryMosaicController[] = [];

      stops.forEach((stop, storyIndex) => {
        const copyElements = stop.querySelectorAll<HTMLElement>(
          ".story-stop-copy .label, .story-stop-copy h3, .story-stop-copy > p:last-child",
        );
        const note = stop.querySelector<HTMLElement>(".story-margin-note");
        const tape = stop.querySelector<HTMLElement>(".story-tape");
        const photo = stop.querySelector<HTMLElement>(".story-photo");
        const canvas = stop.querySelector<HTMLCanvasElement>(".story-photo-mosaic");
        const fullImage = stop.querySelector<HTMLElement>(".story-photo-full");
        const ephemera = [note, tape].filter(
          (element): element is HTMLElement => Boolean(element),
        );
        const direction = storyIndex % 2 === 0 ? -1 : 1;
        const story = personalStory[storyIndex];
        const mosaic = canvas && fullImage
          ? createStoryMosaic(canvas, fullImage, story.image, story.position, direction)
          : null;
        let revealProgress = 0;
        let exitProgress = 0;

        if (mosaic) {
          mosaicControllers.push(mosaic);
          mosaic.render(0, 0);
        }

        if (seenHomeMotion) {
          mosaic?.render(1, 0);
          gsap.set(copyElements, { autoAlpha: 1, y: 0, rotation: 0 });
          gsap.set(ephemera, { autoAlpha: 1, scale: 1, rotation: 0 });
        }

        const revealTimeline = seenHomeMotion ? null : gsap.timeline({
          scrollTrigger: {
            trigger: stop,
            start: "top 92%",
            end: "56% 55%",
            scrub: 1,
            onUpdate: (self) => {
              revealProgress = self.progress;
              mosaic?.render(revealProgress, exitProgress);
            },
          },
        });
        if (revealTimeline) {
          revealTimeline
            .fromTo(copyElements, {
            autoAlpha: 0,
            y: 34,
            rotation: direction * 0.65,
            }, {
              autoAlpha: 1,
              y: 0,
              rotation: 0,
              stagger: 0.11,
              ease: motion.softEase,
              duration: 0.72,
            }, 0.1)
            .fromTo(ephemera, {
              autoAlpha: 0,
              scale: 0.82,
              rotation: direction * 7,
            }, {
              autoAlpha: 1,
              scale: 1,
              rotation: 0,
              ease: motion.ease,
              duration: 0.52,
            }, 0.42);
        }

        if (photo && !seenHomeMotion) {
          gsap.fromTo(photo, {
            y: 42,
            rotation: direction * 2.3,
          }, {
            y: -28,
            rotation: direction * -0.7,
            ease: "none",
            scrollTrigger: {
              trigger: stop,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.15,
            },
          });
        }

        if (!seenHomeMotion) ScrollTrigger.create({
          trigger: stop,
          start: "70% 48%",
          end: "bottom 8%",
          onUpdate: (self) => {
            exitProgress = self.progress;
            mosaic?.render(revealProgress, exitProgress);
          },
        });

        if (!seenHomeMotion) gsap.to(copyElements, {
          autoAlpha: 0.28,
          y: -24,
          stagger: 0.018,
          ease: "power2.in",
          scrollTrigger: {
            trigger: stop,
            start: "86% 44%",
            end: "bottom 4%",
            scrub: 1,
          },
        });
      });

      const resizeMosaics = () => mosaicControllers.forEach((controller) => controller.resize());
      window.addEventListener("resize", resizeMosaics);
      ScrollTrigger.addEventListener("refreshInit", resizeMosaics);
      cleanupStoryMosaics = () => {
        window.removeEventListener("resize", resizeMosaics);
        ScrollTrigger.removeEventListener("refreshInit", resizeMosaics);
        mosaicControllers.forEach((controller) => controller.dispose());
      };

      if (!prefersReducedMotion && !seenHomeMotion) {
        const methodIntro = gsap.timeline({
          scrollTrigger: { trigger: ".method-intro", start: "top 78%", toggleActions: "play none none none", once: true, fastScrollEnd: true },
        });
        methodIntro
          .from(".method-intro .section-kicker", {
            autoAlpha: 0,
            y: 16,
            duration: 0.48,
            ease: motion.softEase,
          })
          .from(".method-title-line > span", {
            yPercent: 118,
            duration: 0.88,
            stagger: motion.sectionStagger,
            ease: motion.ease,
          }, "-=0.14")
          .from(".method-intro-copy > *", {
            autoAlpha: 0,
            y: 24,
            duration: 0.72,
            stagger: 0.09,
            ease: motion.softEase,
          }, "-=0.36");
      }

      const methodPin = root.current?.querySelector<HTMLElement>(".method-pin");
      const methodTrack = root.current?.querySelector<HTMLElement>(".method-track");
      const methodProgress = root.current?.querySelector<HTMLElement>(".method-progress span");

      if (methodPin && methodTrack && methodProgress) {
        const getMethodDistance = () => Math.max(0, methodTrack.scrollWidth - methodPin.clientWidth);
        const horizontalTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: methodPin,
            start: "top top",
            end: () => `+=${getMethodDistance() + window.innerHeight * 0.68}`,
            pin: true,
            scrub: 1.05,
            invalidateOnRefresh: true,
            anticipatePin: 1.5,
          },
        });

        horizontalTimeline
          .to(methodTrack, { x: () => -getMethodDistance(), ease: "none" }, 0)
          .fromTo(methodProgress, { scaleX: 0 }, {
            scaleX: 1,
            transformOrigin: "left",
            ease: "none",
          }, 0);
      }

      if (!prefersReducedMotion && !seenHomeMotion) {
        gsap.from(".method-stack-chip", {
          opacity: 0,
          scale: 0.86,
          y: 24,
          rotation: (index) => (index % 2 === 0 ? -2 : 2),
          stagger: { each: 0.045, from: "start" },
          duration: 0.58,
          ease: motion.ease,
          scrollTrigger: { trigger: ".method-stack", start: "top 78%", toggleActions: "play none none none", fastScrollEnd: true },
        });
      }

      if (!prefersReducedMotion && !seenHomeMotion) {
        const contactTimeline = gsap.timeline({
          scrollTrigger: { trigger: ".contact", start: "top 74%", toggleActions: "play none none none", once: true, fastScrollEnd: true },
        });
        contactTimeline
          .from(".contact-postcard", {
            autoAlpha: 0,
            y: 74,
            scale: 0.965,
            rotation: -1.4,
            duration: 1.02,
            ease: motion.ease,
          })
          .from(".postcard-brand, .postcard-copy > *, .postcard-portrait, .postcard-stamp, .postcard-links", {
            autoAlpha: 0,
            y: 22,
            rotation: (index) => (index % 2 === 0 ? -0.8 : 0.8),
            duration: 0.68,
            stagger: 0.075,
            ease: motion.softEase,
          }, "-=0.52");
      }
    }, root);

    return () => {
      cleanupStoryRoute();
      cleanupStoryMosaics();
      cleanupHeader();
      cleanupHeroCta();
      cleanupHeroMosaic();
      cleanupCaseCursor();
      context.revert();
    };
  }, [locale]);

  const manifesto = locale === "en"
    ? "I make complex choices easier to understand. First define the problem. Then design a direction users understand and teams can build."
    : "Ik maak complexe keuzes begrijpelijk. Eerst het probleem scherp. Dan een richting die gebruikers begrijpen en teams kunnen bouwen.";
  const ringCopy = heroCtaRingCopy[locale];

  const activateContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main ref={root} className="site-shell">
      <a className="skip-link" href="#werk">
        Ga naar het werk
      </a>

      <header
        className="site-header"
        data-theme="light"
        data-header-motion="pending"
        aria-label="Hoofdnavigatie"
      >
        <a className="site-mark" href="#top" aria-label="Naar boven">
          {/* unoptimized omdat het een svg is: er valt niets te herschalen en
              de optimizer laat 'm toch ongemoeid. Breedte en hoogte zijn de
              viewBox van het merk, zodat de pil zijn maat al heeft voordat het
              bestand binnen is; de css bepaalt de weergavegrootte. priority
              omdat de pil bovenaan staat en niet mag nakomen. */}
          <Image
            className="site-mark-logo"
            src="/merk.svg"
            alt=""
            width={1737}
            height={1472}
            unoptimized
            priority
            draggable={false}
          />
          <span className="site-mark-copy">Abdelrahman</span>
        </a>
        <div className="site-header-actions">
          <nav className="top-nav" aria-label="Portfolio tabs">
            <a href="#werk" aria-current={activeNav === "werk" ? "location" : undefined}><span className="link-icon" aria-hidden="true"><BriefcaseBusiness /></span><span>Werk</span></a>
            <a href="#over" aria-current={activeNav === "over" ? "location" : undefined}><span className="link-icon" aria-hidden="true"><UserRound /></span><span>Over</span></a>
            <a href="#aanpak" aria-current={activeNav === "aanpak" ? "location" : undefined}><span className="link-icon" aria-hidden="true"><Workflow /></span><span>Aanpak</span></a>
            <a href="#contact" aria-current={activeNav === "contact" ? "location" : undefined}><span className="link-icon" aria-hidden="true"><Mail /></span><span>Contact</span></a>
            <a href={localeHref("/cv", locale)}><span className="link-icon" aria-hidden="true"><FileText /></span><span>CV</span></a>
          </nav>
          <LanguageSwitcher locale={locale} />
          <MobileNav locale={locale} />
        </div>
      </header>

      <aside
        className={`floating-contact${activeNav === "contact" ? " is-over-contact" : ""}`}
        aria-label="Direct contact"
      >
        <button
          type="button"
          className="floating-contact-trigger"
          aria-label="Ga naar contact"
          onClick={activateContact}
        >
          <span className="contact-arch" aria-hidden="true">
            {[..."CONTACT"].map((letter, index) => (
              <span
                style={{
                  "--letter-angle": `${-60 + (index * 20)}deg`,
                  "--letter-counter-angle": `${60 - (index * 20)}deg`,
                } as CSSProperties}
                key={`${letter}-${index}`}
              >
                {letter}
              </span>
            ))}
          </span>
          <Share2 className="contact-share-icon" aria-hidden="true" />
        </button>
      </aside>

      <section
        className="mind-hero"
        id="top"
        data-nav-theme="light"
        data-active-zone={activeMindZone ?? "idle"}
        data-hero-motion="pending"
        data-touch-ready={isMindTouchReady ? "true" : "false"}
        aria-labelledby="hero-title"
      >
        <div className="mind-hero-content">
          <div className="mind-hero-meta label" aria-label="Portfolio metadata">
            <span>Portfolio / 2026</span>
            <span>{locale === "en" ? "Product strategy / UX/UI" : "Productstrategie / UX/UI"}</span>
            <span>Amsterdam</span>
            {/* Op smalle schermen zakt de discipline onder de scheidingslijn in
                plaats van weg te vallen, zoals in het ontwerp. Dezelfde tekst
                als hierboven, die daar juist verborgen wordt - zo staat hij
                nooit twee keer tegelijk in beeld. */}
            <span className="mind-hero-meta-wrap">
              {locale === "en" ? "Product strategy / UX/UI" : "Productstrategie / UX/UI"}
            </span>
          </div>

          <div className="mind-hero-canvas">
            <div className="mind-hero-visual">
              <div className="mind-hero-photo-slide">
                <Image
                  className="mind-hero-base"
                  src="/about/hero-abdel-profile.png"
                  alt="Zijprofiel van Abdelrahman met een interactieve kaart van zijn ontwerpdenken"
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 720px) 82vw, 34vw"
                  style={{ objectFit: "contain", objectPosition: "right bottom" }}
                />
                <canvas className="mind-hero-mosaic" width="1" height="1" aria-hidden="true" />
                <div className="mind-brain-stage" aria-hidden="true">
                  <Image
                    className="mind-brain-state mind-brain-default"
                    src="/about/brain-default.svg"
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 720px) 42vw, 18vw"
                  />
                  {mindZones.map((zone) => (
                    <span
                      className={`mind-brain-region${activeMindZone === zone.id ? " is-active" : ""}`}
                      data-zone={zone.id}
                      style={{ "--zone-color": zone.color } as CSSProperties}
                      key={`brain-region-${zone.id}`}
                    />
                  ))}
                </div>

                <div className="mind-brain-dots">
                  {mindZones.map((zone) => {
                    const zoneLabel = translateText(locale, zone.label);
                    const zoneTitle = translateText(locale, zone.title);

                    return (
                      <button
                        key={`dot-${zone.id}`}
                        type="button"
                        data-zone={zone.id}
                        className={`mind-brain-dot${activeMindZone === zone.id ? " is-active" : ""}`}
                        style={{ "--zone-color": zone.color } as CSSProperties}
                        aria-pressed={activeMindZone === zone.id}
                        aria-controls="mind-touch-detail"
                        aria-label={`${zone.number} ${zoneLabel}: ${zoneTitle}`}
                        onClick={() => setActiveMindZone(zone.id)}
                      >
                        {zone.number}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="golden-ratio-detail" aria-hidden="true">
              <Image
                src="/about/golden-ratio-detail.webp"
                alt=""
                fill
                sizes="42vw"
              />
            </div>

            <header className="mind-hero-copy">
              <h1 className="mind-hero-title" id="hero-title" aria-label={locale === "en" ? "Product designer turning complexity into clarity." : "Productdesigner die complexiteit helder maakt."}>
                <span className="mind-title-line"><span>{locale === "en" ? "Product designer" : "Productdesigner"}</span></span>
                <span className="mind-title-line"><span>{locale === "en" ? "turning complexity" : "maakt complexiteit"}</span></span>
                <span className="mind-title-line"><span>{locale === "en" ? "into" : "begrijpelijk en"} <em className="mind-title-handwrite">{locale === "en" ? "clarity." : "bruikbaar."}</em></span></span>
              </h1>
              <p className="mind-hero-lede">
                {locale === "en"
                  ? "I combine product strategy, UX research and interface design to turn complex ideas into digital products people understand and teams can build."
                  : "Ik combineer productstrategie, UX-onderzoek en interfaceontwerp om complexe ideeën te vertalen naar digitale producten die mensen begrijpen en teams kunnen bouwen."}
              </p>
            </header>

            <div className="mind-hero-actions">
              <div className="hero-cta-stage">
                <a
                  className="hero-cta-container"
                  href="#werk"
                  aria-label="Zie de gevolgen en ontdek de acht projecten"
                >
                  <span className="hero-cta-shape" aria-hidden="true">
                    <span className="editorial-text-ring hero-cta-ring-idle">
                      {[...ringCopy.idle].map((character, index, characters) => (
                        <span
                          style={{
                            "--ring-angle": `${(index / characters.length) * 360}deg`,
                          } as CSSProperties}
                          key={`idle-${character}-${index}`}
                        >
                          {character === " " ? "\u00a0" : character}
                        </span>
                      ))}
                    </span>
                    <span className="editorial-text-ring hero-cta-ring-active">
                      {[...ringCopy.active].map((character, index, characters) => (
                        <span
                          style={{
                            "--ring-angle": `${(index / characters.length) * 360}deg`,
                          } as CSSProperties}
                          key={`active-${character}-${index}`}
                        >
                          {character === " " ? "\u00a0" : character}
                        </span>
                      ))}
                    </span>
                    <span className="hero-cta-orbit-core">↘</span>
                  </span>
                  <span className="hero-cta-touch-copy">
                    <span>Bekijk 8 cases</span>
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>

            <div className="mind-zone-layer" role="group" aria-label="Interactieve kaart van mijn ontwerpdenken">
              {mindZones.map((zone) => {
                const isActive = activeMindZone === zone.id;
                const zoneLabel = translateText(locale, zone.label);
                const zoneTitle = translateText(locale, zone.title);
                const zoneDetail = translateText(locale, zone.detail);

                return (
                  <button
                    key={zone.id}
                    type="button"
                    className={`mind-zone mind-zone-${zone.id}${isActive ? " is-active" : ""}`}
                    style={{ "--zone-color": zone.color, "--zone-ink": zone.ink } as CSSProperties}
                    aria-pressed={isActive}
                    aria-label={`${zone.number} ${zoneLabel}: ${zoneTitle}. ${zoneDetail}`}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse" || event.pointerType === "pen") {
                        setActiveMindZone(zone.id);
                      }
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse" || event.pointerType === "pen") {
                        setActiveMindZone(null);
                      }
                    }}
                    onFocus={(event) => {
                      if (event.currentTarget.matches(":focus-visible")) setActiveMindZone(zone.id);
                    }}
                    onBlur={() => setActiveMindZone(null)}
                    onClick={() => {
                      if (window.matchMedia("(max-width: 980px), (hover: none), (pointer: coarse)").matches) {
                        setActiveMindZone(zone.id);
                      }
                    }}
                  >
                    <span className="mind-zone-surface" aria-hidden="true" />
                    <span className="mind-zone-mobile-copy">
                      <span className="mind-zone-mobile-kicker label">{zone.number} / {zoneLabel}</span>
                      <strong>{zoneTitle}</strong>
                      <span>{zoneDetail}</span>
                    </span>
                  </button>
                );
              })}

              {mindZones.map((zone) => {
                const isActive = activeMindZone === zone.id;
                const zoneLabel = translateText(locale, zone.label);
                const zoneTitle = translateText(locale, zone.title);
                const zoneDetail = translateText(locale, zone.detail);

                return (
                  <span
                    className={`mind-annotation-panel${isActive ? " is-active" : ""}`}
                    data-zone={zone.id}
                    style={{ "--zone-color": zone.color, "--zone-ink": zone.ink } as CSSProperties}
                    aria-hidden={!isActive}
                    key={`annotation-${zone.id}`}
                  >
                      <span className="mind-annotation-kicker label">
                        {zone.number} / {zoneLabel}
                      </span>
                      <strong aria-label={zoneTitle} style={{ "--char-count": zoneTitle.length } as CSSProperties}>
                        {zoneTitle.split(" ").map((word, wordIndex, words) => {
                          const charOffset = words.slice(0, wordIndex).reduce((total, current) => total + current.length + 1, 0);

                          return (
                            <span className="mind-written-word" aria-hidden="true" key={`${zone.id}-${word}-${wordIndex}`}>
                              {[...word].map((character, characterIndex) => (
                                <span
                                  className="mind-written-char"
                                  style={{
                                    "--char-delay": `${(charOffset + characterIndex) * 24}ms`,
                                    "--erase-delay": `${(zoneTitle.length - charOffset - characterIndex) * 12}ms`,
                                  } as CSSProperties}
                                  key={`${character}-${characterIndex}`}
                                >
                                  {character}
                                </span>
                              ))}
                            </span>
                          );
                        })}
                      </strong>
                      <span className="mind-annotation-detail">{zoneDetail}</span>

                      {zone.id === "direction" && (
                        <span className="mind-tools" aria-label="Gereedschap: Figma, Framer en AI">
                          <span className="mind-tool">
                            <span className="tool-glyph" aria-hidden="true"><Figma /></span>
                            <span>Figma</span>
                          </span>
                          <span className="mind-tool">
                            <span className="tool-glyph" aria-hidden="true"><Framer /></span>
                            <span>Framer</span>
                          </span>
                          <span className="mind-tool">
                            <span className="tool-glyph" aria-hidden="true"><Sparkles /></span>
                            <span>AI</span>
                          </span>
                        </span>
                      )}
                  </span>
                );
              })}
            </div>

            <div
              className="mind-touch-explorer"
              role="region"
              aria-label="Onderdelen van mijn ontwerpdenken"
            >
              <div className="mind-touch-tabs" role="group" aria-label="Kies een hersendeel">
                {mindZones.map((zone) => {
                  const isActive = touchMindZone.id === zone.id;

                  return (
                    <button
                      key={`touch-${zone.id}`}
                      type="button"
                      className={`mind-touch-tab${isActive ? " is-active" : ""}`}
                      style={{ "--zone-color": zone.color, "--zone-ink": zone.ink } as CSSProperties}
                      aria-pressed={isActive}
                      aria-controls="mind-touch-detail"
                      aria-label={`${zone.number} ${translateText(locale, zone.label)}`}
                      onClick={() => setActiveMindZone(zone.id)}
                    >
                      <span>{zone.number}</span>
                    </button>
                  );
                })}
              </div>
              <div
                className="mind-touch-detail"
                id="mind-touch-detail"
                style={{ "--zone-color": touchMindZone.color, "--zone-ink": touchMindZone.ink } as CSSProperties}
                aria-live="polite"
              >
                <span className="mind-touch-kicker label">
                  {touchMindZone.number} / {translateText(locale, touchMindZone.label)}
                </span>
                <strong>{translateText(locale, touchMindZone.title)}</strong>
                <p>{translateText(locale, touchMindZone.detail)}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section
        className="showcase"
        id="werk"
        data-nav-theme="light"
        data-nav-key="werk"
        aria-labelledby="work-title"
      >
        <div className="case-cursor" aria-hidden="true">
          <span className="case-cursor-shape">
            <span className="editorial-text-ring case-cursor-ring">
              {[...ringCopy.case].map((character, index, characters) => (
                <span
                  style={{ "--ring-angle": `${(index / characters.length) * 360}deg` } as CSSProperties}
                  key={`case-cursor-${character}-${index}`}
                >
                  {character === " " ? "\u00a0" : character}
                </span>
              ))}
            </span>
            <span className="case-cursor-core"><ArrowUpRight /></span>
          </span>
        </div>
        <header className="showcase-heading">
          <p className="section-kicker"><span>01</span> Projecten</p>
          <div className="showcase-heading-copy">
            <h2 id="work-title"><span className="showcase-title-line"><span>Geselecteerd werk</span></span></h2>
            <p>
              Vijf zelf geïnitieerde concepten tonen hoe ik kansen in een niche ontdek
              en vertaal naar een heldere digitale richting. Drie live klantprojecten
              laten zien hoe strategie, content en ontwerp in de praktijk samenkomen.
            </p>
          </div>
          <div className="showcase-index" aria-label="Verdeling van de cases">
            <span><strong>05</strong> Conceptprojecten</span>
            <span><strong>03</strong> Klantprojecten</span>
          </div>
        </header>

        <div className="project-grid">
          {projects.map((project) => (
            <article
              className={`project-entry project-${project.slug}`}
              key={project.slug}
              style={{
                "--project-accent": project.bg,
                "--project-accent-ink": project.ink,
              } as CSSProperties}
            >
              <a
                className="project-card-link"
                href={localeHref(project.href, locale)}
                aria-label={`Bekijk de case ${project.name}`}
                data-cursor-bg={project.bg}
                data-cursor-ink={project.ink}
              >
                <div className="project-visual">
                  <div className="project-parallax-media">
                    <Image
                      src={project.image}
                      alt={`Ontwerpoverzicht van ${project.name}`}
                      fill
                      sizes="(max-width: 720px) 100vw, 46vw"
                      style={{ objectPosition: project.imagePosition }}
                    />
                  </div>
                </div>
                <div className="project-card-copy">
                  <div className="project-meta label">
                    <span>{project.number} / {projectCount}</span>
                    <span>{project.category}</span>
                    <span>{project.status}</span>
                  </div>
                  <header className="project-card-title">
                    <h3>{project.name}</h3>
                    <span className="link-icon" aria-hidden="true"><ArrowUpRight /></span>
                  </header>
                  <p className="project-problem">{project.title}</p>
                  <p className="project-summary">{project.summary}</p>
                  <span className="project-services">{project.services}</span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto" id="houding" data-nav-theme="light" aria-labelledby="manifesto-label">
        <p className="section-kicker" id="manifesto-label"><span>02</span> {locale === "en" ? "Design principle" : "Ontwerpprincipe"}</p>
        <p className="manifesto-copy">
          {manifesto.split(" ").map((word, index) => {
            const normalizedWord = word.toLocaleLowerCase(locale === "en" ? "en-GB" : "nl-NL").replace(/[^\p{L}]/gu, "");
            const isMarkerWord = manifestoMarkerWords[locale].has(normalizedWord);

            return (
              <span
                className={`manifesto-word${isMarkerWord ? " manifesto-marker" : ""}`}
                data-marker-word={isMarkerWord ? normalizedWord : undefined}
                key={`${word}-${index}`}
              >
                <span className="manifesto-word-text">{word}</span>
                {isMarkerWord && <span className="manifesto-marker-stroke" aria-hidden="true" />}
                {" "}
              </span>
            );
          })}
        </p>
        <aside className="manifesto-aside">
          <span className="label">{locale === "en" ? "My standard" : "Mijn maatstaf"}</span>
          <p>{locale === "en" ? <>Clear to people.<br />Buildable for teams.</> : <>Helder voor mensen.<br />Bouwbaar voor teams.</>}</p>
        </aside>
      </section>

      <section className="about-story" id="over" data-nav-theme="light" data-nav-key="over" aria-labelledby="about-title">
        <header className="about-story-heading">
          <p className="section-kicker"><span>03</span> De mens achter het werk</p>
          <h2 id="about-title">
            <span>Een klik voel je snel.</span>
            <span>Goed werk bouw je samen.</span>
          </h2>
          <p>Ik maak makkelijk contact, maar zeg ook eerlijk wanneer een samenwerking niet klopt. Als er vertrouwen is, mag het gesprek scherp worden. Dan komen de vragen op tafel die een website beter maken.</p>
        </header>

        <div className="story-route">
          <svg className="story-route-svg" aria-hidden="true" focusable="false" preserveAspectRatio="none">
            <path className="story-route-base" />
            <path className="story-route-progress" />
          </svg>
          <span className="story-route-runner" data-label="Studio" aria-hidden="true" />
          <div className="story-board-meta label" aria-hidden="true">
            <span>Personal field notes</span>
            <span>01 / 04</span>
          </div>
          {personalStory.map((story, index) => (
            <article
              className={`story-stop story-stop-${index + 1}`}
              key={story.step}
              style={{
                "--dot-x": story.dotX,
                "--dot-mobile-x": story.dotMobileX,
                "--story-accent": workingMethod[index]?.color ?? directionPalette.craft,
              } as CSSProperties}
            >
              <div className="story-stop-dot" aria-hidden="true">
                <span className="story-stop-dot-fill" />
                <strong>{story.step}</strong>
              </div>
              <figure className="story-photo">
                <div className="story-photo-stage" role="img" aria-label={translateText(locale, story.alt)}>
                  <Image
                    className="story-photo-full"
                    src={story.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    unoptimized
                    sizes="(max-width: 720px) 88vw, 48vw"
                    style={{ objectPosition: story.position }}
                  />
                  <canvas className="story-photo-mosaic" width="1" height="1" aria-hidden="true" />
                  <span className="story-tape" aria-hidden="true" />
                </div>
                <figcaption><span>{translateText(locale, story.caption)}</span><span>© Abdelrahman</span></figcaption>
              </figure>
              <aside className="story-margin-note" aria-hidden="true">{translateText(locale, story.note)}</aside>
              <div className="story-stop-copy">
                <p className="label">{translateText(locale, story.kicker)}</p>
                <h3>
                  {(locale === "en" ? story.englishTitle : story.title).split(" ").map((word, wordIndex) => (
                    <span className="story-heading-word" key={`${word}-${wordIndex}`}>{word}{" "}</span>
                  ))}
                </h3>
                <p>{translateText(locale, story.body)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="method" id="aanpak" data-nav-theme="dark" data-nav-key="aanpak" aria-labelledby="method-title">
        <header className="method-intro">
          <p className="section-kicker section-kicker-light"><span>04</span> Hoe ik werk</p>
          <h2 id="method-title">
            <span className="method-title-line"><span>Niet alleen ontwerpen.</span></span>
            <span className="method-title-line method-title-indent"><span>Het proces dirigeren.</span></span>
          </h2>
          <div className="method-intro-copy">
            <p>Ik pas de route aan zodra onderzoek daar aanleiding toe geeft. De volgorde blijft helder: samen scherpstellen, bewijs zoeken, tastbaar maken en tussendoor beslissen of we nog hetzelfde probleem oplossen.</p>
            <span className="label">Strategie → Onderzoek → Ontwerp → Richting</span>
          </div>
        </header>

        <div className="method-horizontal" aria-label={translateText(locale, "Vier stappen in mijn werkwijze")}>
          <div className="method-pin">
            <div className="method-horizontal-meta">
              <p className="label">Scrollroute · links naar rechts</p>
              <div className="method-progress" aria-hidden="true"><span /></div>
              <p className="label">01 / 04</p>
            </div>
            <div className="method-track">
              {workingMethod.map((step, index) => (
                <article
                  className={`method-note method-note-${index + 1}`}
                  key={step.number}
                  style={{ "--method-note-color": step.color } as CSSProperties}
                >
                  <span className="method-note-tape" aria-hidden="true" />
                  <header>
                    <span className="method-note-number">{step.number}</span>
                    <p className="label">{translateText(locale, step.phase)}</p>
                  </header>
                  <h3>{translateText(locale, step.title)}</h3>
                  <p>{translateText(locale, step.body)}</p>
                  <span className="method-tools label">{translateText(locale, step.tools)}</span>
                  <aside>{translateText(locale, step.annotation)}</aside>
                </article>
              ))}
              <div className="method-track-exit" aria-hidden="true">
                <span>↓</span>
                <p>Vanaf hier weer verticaal.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="method-stack" aria-label="Mijn ontwerpstack">
          <p className="label">Mijn gereedschapskist</p>
          <div>
            {[
              "Strategie",
              "Deskresearch",
              "Praktijkonderzoek",
              "AI",
              "Figma",
              "Framer",
              "Prototypen",
              "Afstemming",
            ].map((tool) => <span className="method-stack-chip" key={tool}>{tool}</span>)}
          </div>
          <p>Gereedschap versnelt. Richting blijft mensenwerk.</p>
        </div>
      </section>

      <footer className="contact" id="contact" data-nav-theme="light" data-nav-key="contact">
        <article className="contact-postcard">
          <div className="postcard-brand">
            <span className="postcard-monogram">A</span>
            <p>Abdelrahman<br />Product &amp; UX/UI designer</p>
          </div>

          <div className="postcard-copy">
            <p className="label">Ansichtkaart / Amsterdam / 2026</p>
            <h2><span>Even kijken</span><em>of het klikt?</em></h2>
            <p>Geen pitch nodig. Vertel wat er speelt; ik stel de vragen. Geeft het gesprek energie, dan plannen we koffie.</p>
          </div>

          <figure className="postcard-portrait">
            <Image
              src="/about/postcard-studio-cutout.webp"
              alt="Getekend portret van Abdelrahman aan zijn ontwerpdesk"
              fill
              sizes="(max-width: 720px) 72vw, 28vw"
            />
            <figcaption>Ontwerp is een dialoog</figcaption>
          </figure>

          <p className="postcard-side-type" aria-hidden="true">BRENG DE VRAAG · TOETS DE KLIK</p>

          <div className="postcard-links" aria-label="Contactkanalen">
            <a href="mailto:dhr_abdelrahman@outlook.com"><span className="link-icon" aria-hidden="true"><Mail /></span><span>E-mail</span></a>
            <a href="https://www.linkedin.com/in/abdelrahman-ahmed-30896964/" target="_blank" rel="noreferrer"><span className="link-icon" aria-hidden="true"><Linkedin /></span><span>LinkedIn</span></a>
            <a href="https://wa.me/31621572124" target="_blank" rel="noreferrer"><span className="link-icon" aria-hidden="true"><MessageCircle /></span><span>WhatsApp</span></a>
              <a href={localeHref("/cv", locale)}><span className="link-icon" aria-hidden="true"><FileText /></span><span>CV</span></a>
          </div>

          <div className="postcard-stamp" aria-hidden="true">
            <span>A</span>
            <small>AMS<br />2026</small>
          </div>

          <p className="postcard-fineprint">© 2026 · Met aandacht gebouwd · Nederland</p>
        </article>
        <p className="contact-ground-note label">Geen verkooppraat. Wel een goed gesprek.</p>
      </footer>
    </main>
  );
}
