"use client";

import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef, useState } from "react";
import ArrowUpRight from "lucide-react/icons/arrow-up-right";
import BriefcaseBusiness from "lucide-react/icons/briefcase-business";
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

const projects = [
  {
    number: "01",
    slug: "tareeqi",
    name: "Tareeqi",
    title: "Navigating Mecca & Medina beyond the obvious",
    summary:
      "Een lokaal gevoed kaartplatform dat pelgrims voorbij de bekende routes brengt — met rust, context en toegankelijkheid als kompas.",
    services: "Strategy · UX/UI · Product concept",
    category: "Concept Solution",
    browserLabel: "self-initiated.solution",
    bg: "#eadfd3",
    ink: "#332a24",
    image: "/projects/home/tareeqi.webp",
    imagePosition: "center",
    href: "/cases/tareeqi",
  },
  {
    number: "02",
    slug: "ayn",
    name: "Ayn Al-Hikmah",
    title: "Filling the void for knowledge seekers leaving Medina",
    summary:
      "Een boekhandel en leeromgeving die boeken, geleerden en de structuur van studeren uit de Haramain dichterbij brengt.",
    services: "Strategy · E-commerce · Learning UX",
    category: "Concept Solution",
    browserLabel: "self-initiated.solution",
    bg: "#f2cf82",
    ink: "#401818",
    image: "/projects/home/ayn.webp",
    imagePosition: "center",
    href: "/cases/ayn-al-hikmah",
  },
  {
    number: "03",
    slug: "guidance",
    name: "Guidance Travel",
    title: "Redefining premium travel with Form Follows Function",
    summary:
      "Een conversiegerichte reiservaring waarin elke keuze — van pakketfilter tot reflectie — het vertrouwen van de pelgrim versterkt.",
    services: "Conversion strategy · UX/UI · Web design",
    category: "Concept Solution",
    browserLabel: "self-initiated.solution",
    bg: "#ff9e43",
    ink: "#28231f",
    image: "/projects/home/guidance.webp",
    imagePosition: "center",
    href: "/cases/guidance-travel",
  },
  {
    number: "04",
    slug: "bayn",
    name: "Bayn Signal",
    title: "Staying ahead of the local pulse with vital insights",
    summary:
      "Een betrouwbaar signaalplatform dat expats en migranten vroegtijdig context geeft over regels, routes en het dagelijks leven.",
    services: "Editorial strategy · UX/UI · Platform concept",
    category: "Concept Solution",
    browserLabel: "self-initiated.solution",
    bg: "#cbd9cc",
    ink: "#123f37",
    image: "/projects/home/bayn.webp",
    imagePosition: "center",
    href: "/cases/bayn-signal",
  },
  {
    number: "05",
    slug: "hijaman-cups",
    name: "Hijama’N Cups",
    title: "Turning traditional care into a calm, clear digital welcome",
    summary:
      "Een warme Framer-website voor een zelfstandige behandelpraktijk, waarin uitleg, vertrouwen en laagdrempelig boeken samenkomen.",
    services: "Strategy · UX/UI · Framer design & build",
    category: "Client Work",
    browserLabel: "client.project",
    bg: "#dae5dd",
    ink: "#0b4a20",
    image: "/projects/home/hijaman-cups.webp",
    imagePosition: "center",
    href: "/cases/hijaman-cups",
  },
  {
    number: "06",
    slug: "atotz",
    name: "AtotZ Detachering",
    title: "Putting the right people in the right place — without the friction",
    summary:
      "Een directe, conversiegerichte Framer-website voor een detacheringsbureau dat snelheid koppelt aan persoonlijke aandacht.",
    services: "Positioning · UX/UI · Framer design & build",
    category: "Client Work",
    browserLabel: "client.project",
    bg: "#1c2a3a",
    ink: "#f9fafb",
    image: "/projects/home/atotz.webp",
    imagePosition: "center",
    href: "/cases/atotz-detachering",
  },
  {
    number: "07",
    slug: "oppasbychaima",
    name: "Oppas by Chaima",
    title: "Turning care at home into calm, credible digital trust",
    summary:
      "Een warme website voor een pedagogisch opgeleide oppas, waarin thuisritme, duidelijke afspraken en oudervertrouwen samenkomen.",
    services: "Positioning · UX/UI · Web design & build",
    category: "Client Work",
    browserLabel: "client.project",
    bg: "#f0e2ce",
    ink: "#342d27",
    image: "/projects/live/oppas-site-desktop.png",
    imagePosition: "center",
    href: "/cases/oppas-by-chaima",
  },
] as const;

const projectCount = String(projects.length).padStart(2, "0");
const heroCtaIdleRingCopy = "ZIE DE GEVOLGEN · ZIE DE GEVOLGEN · ";
const heroCtaActiveRingCopy = "ONTDEK DE CASES · ONTDEK DE CASES · ";

const manifestoMarkerWords = new Set(["écht", "kwartje", "kern"]);

const personalStory = [
  {
    step: "01",
    kicker: "Wie ik ben",
    title: "Ik breek het ijs. Niet de basis.",
    body: "Ik ben Abdelrahman. Sociaal genoeg om snel aan tafel te komen, scherp genoeg om niet overal ja op te zeggen. Een goede klik geeft ruimte voor eerlijke vragen — precies waar het werk sterker van wordt.",
    image: "/about/web/portrait-studio.webp",
    alt: "Abdelrahman in zijn ontwerpstudio",
    position: "center 35%",
    note: "Curiosity over certainty",
    caption: "Home studio / waar vragen vorm krijgen",
    dotX: "55%",
    dotMobileX: "8%",
  },
  {
    step: "02",
    kicker: "Wat ik doe",
    title: "Eerst begrijpen wat er schuurt. Dan pas een scherm.",
    body: "We leggen aannames, gedrag en doelen naast elkaar. Ik zoek het moment waarop losse informatie één duidelijke richting krijgt. Vanaf daar ontwerp ik websites die logisch reageren op echte keuzes.",
    image: "/about/web/designing.webp",
    alt: "Abdelrahman werkt aan een digitaal ontwerp achter zijn bureau",
    position: "center",
    note: "Strategy before screens",
    caption: "In progress / bouwen, testen, opnieuw kijken",
    dotX: "39%",
    dotMobileX: "91%",
  },
  {
    step: "03",
    kicker: "Hoe ik blijf groeien",
    title: "Wat ik vandaag leer, verandert morgen mijn ontwerp.",
    body: "Ik lees, observeer en experimenteer met strategie, psychologie, techniek, cultuur en AI. Niet om iedere trend te volgen, maar om per vraag een rijker antwoord te kunnen geven.",
    image: "/about/web/learning.webp",
    alt: "Abdelrahman leest The Heart of Design",
    position: "center",
    note: "Stay a student",
    caption: "Field notes / kennis houdt mijn blik beweeglijk",
    dotX: "63%",
    dotMobileX: "11%",
  },
  {
    step: "04",
    kicker: "En buiten het scherm",
    title: "Papa zijn is mijn scherpste gebruikerstest.",
    body: "Een kind accepteert geen ingewikkelde uitleg voor iets dat simpel moet zijn. Vaderschap houdt mijn werk menselijk: aandacht is schaars, context verandert continu en verantwoordelijkheid laat zich niet wegstylen.",
    image: "/about/web/fatherhood.webp",
    alt: "Abdelrahman als vader bij de kinderwagen",
    position: "center 35%",
    note: "Design starts at home",
    caption: "Real life / de belangrijkste rol buiten het scherm",
    dotX: "44%",
    dotMobileX: "88%",
  },
] as const;

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

      const showFullImage = revealProgress >= 0.995 && exitProgress <= 0.001;
      fullImage.style.opacity = showFullImage ? "1" : "0";
      canvas.style.opacity = showFullImage ? "0" : "1";
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
    phase: "Sparren",
    title: "De klik is geen bijzaak.",
    body: "Een goed gesprek laat snel zien of we elkaar begrijpen én durven tegenspreken. We maken aannames zichtbaar en bepalen welke verandering de website werkelijk moet veroorzaken.",
    tools: "Client sessions · Workshops · Direction",
    annotation: "Begin met de vraag — niet met de deliverable.",
  },
  {
    number: "02",
    phase: "Verdiepen",
    title: "De context beslist mee.",
    body: "Deskresearch, gesprekken en observaties brengen de vraag dichtbij. AI helpt patronen sneller toetsen en nieuwe vragen formuleren; het oordeel en de richting blijven menselijk.",
    tools: "Desk research · Field research · AI",
    annotation: "AI versnelt het zoeken. Het oordeel blijft menselijk.",
  },
  {
    number: "03",
    phase: "Vormgeven",
    title: "Maak het vroeg genoeg echt.",
    body: "In Figma krijgt de ervaring structuur. In Framer of code wordt ze tastbaar en testbaar. AI versnelt varianten en uitvoering, zonder de ontwerpintentie over te nemen.",
    tools: "Figma · Framer · AI-assisted build",
    annotation: "Maak het vroeg voelbaar. Dan wordt feedback concreet.",
  },
  {
    number: "04",
    phase: "Koers houden",
    title: "Koers houden is ook ontwerpen.",
    body: "Tijdens iedere fase kijken we samen: klopt de richting nog, begrijpen gebruikers dit en draagt iedere keuze bij aan het doel? Zo blijft de klant onderdeel van iedere ontwerpbeslissing.",
    tools: "Prototype reviews · Check-ins · Iteration",
    annotation: "Check in. Stel bij. Houd samen koers.",
  },
] as const;

const mindZones = [
  {
    id: "curiosity",
    number: "01",
    label: "Nieuwsgierigheid",
    title: "De echte vraag vinden",
    detail:
      "Ik blijf vragen tot aannames plaatsmaken voor een kern die we samen begrijpen.",
    color: "#d8644a",
  },
  {
    id: "connections",
    number: "02",
    label: "Verbindingen",
    title: "Context bij elkaar brengen",
    detail:
      "Mens, cultuur, business en techniek worden één verhaal in plaats van losse eisen.",
    color: "#d7a84e",
  },
  {
    id: "structure",
    number: "03",
    label: "Structuur",
    title: "Complexiteit zonder ruis",
    detail:
      "Scherpe inzichten worden systemen die helder, toegankelijk en verantwoordelijk werken.",
    color: "#879a75",
  },
  {
    id: "source",
    number: "04",
    label: "Unlimited source",
    title: "Voorbij het logische antwoord",
    detail:
      "Hier begint niets met een component. Eerst ontstaat ruimte voor het onverwachte idee.",
    color: "#314668",
  },
  {
    id: "direction",
    number: "05",
    label: "Richting geven",
    title: "Van gedachte naar realiteit",
    detail:
      "Tools versnellen de uitvoering. Selectie, richting en verantwoordelijkheid blijven mensenwerk.",
    color: "#6682a1",
  },
] as const;

export function HomeExperience() {
  const root = useRef<HTMLElement>(null);
  const showcase = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [activeMindZone, setActiveMindZone] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("");
  const [contactOpen, setContactOpen] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let cleanupStoryRoute = () => {};
    let cleanupStoryMosaics = () => {};
    let cleanupHeader = () => {};
    let cleanupHeroCta = () => {};

    const context = gsap.context(() => {
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

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".site-header", {
          autoAlpha: 0,
          y: -16,
          duration: 0.46,
        })
        .from(
          ".mind-hero-meta span",
          { autoAlpha: 0, y: 10, duration: 0.38, stagger: 0.07 },
          ">+=0.12",
        )
        .from(
          ".mind-hero-canvas",
          { clipPath: "inset(0 0 100% 0)", duration: 0.48, ease: "power3.inOut" },
          "-=0.08",
        )
        .from(
          ".mind-hero-kicker",
          { autoAlpha: 0, y: 12, duration: 0.36 },
          ">-=0.06",
        )
        .from(
          ".mind-title-line > span",
          { yPercent: 112, duration: 0.56, stagger: 0.08 },
          ">-=0.04",
        )
        .from(
          ".mind-hero-lede",
          { autoAlpha: 0, y: 15, duration: 0.4 },
          ">-=0.04",
        )
        .from(
          ".mind-hero-actions",
          { autoAlpha: 0, y: 12, duration: 0.36 },
          ">-=0.06",
        )
        .from(
          ".mind-hero-photo-slide",
          {
            xPercent: 104,
            opacity: 0.12,
            duration: 1.22,
            ease: "power3.inOut",
          },
          ">+=0.08",
        );

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

        gsap.to(heroCtaRings, {
          rotation: 360,
          duration: 11,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });

        const setEngaged = (engaged: boolean, capturePointer = false) => {
          if (engaged !== isNear) {
            isNear = engaged;
            heroCta.classList.toggle("is-engaged", engaged);
          }
          document.documentElement.classList.toggle(
            "hero-cta-cursor-captured",
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

        cleanupHeroCta = () => {
          window.removeEventListener("pointermove", handlePointerMove);
          window.removeEventListener("blur", resetMagnet);
          heroCta.removeEventListener("focus", handleFocus);
          heroCta.removeEventListener("blur", handleBlur);
          if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
          document.documentElement.classList.remove("hero-cta-cursor-captured");
        };
      }

      gsap.to(".mind-hero-content", {
        opacity: 0.14,
        yPercent: -13,
        scale: 0.945,
        transformOrigin: "center top",
        ease: "none",
        scrollTrigger: {
          trigger: ".mind-hero",
          start: "58% center",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".mind-hero-visual", {
        yPercent: -6,
        scale: 0.975,
        opacity: 0.28,
        ease: "none",
        scrollTrigger: {
          trigger: ".mind-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".manifesto-word", {
        opacity: 0.12,
        y: 18,
        stagger: 0.035,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".manifesto-copy",
          start: "top 78%",
          end: "bottom 62%",
          scrub: 0.65,
        },
      });

      gsap.utils.toArray<HTMLElement>(".manifesto-marker").forEach((word) => {
        const stroke = word.querySelector<HTMLElement>(".manifesto-marker-stroke");
        if (!stroke) return;

        gsap.fromTo(stroke, { clipPath: "inset(0 100% 0 0)" }, {
          clipPath: "inset(0 0% 0 0)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: word,
            start: "top 76%",
            end: "bottom 61%",
            scrub: 0.45,
          },
        });
      });

      const quarterWord = root.current?.querySelector<HTMLElement>('[data-marker-word="kwartje"]');
      const manifestoSection = root.current?.querySelector<HTMLElement>(".manifesto");
      const quarterScene = root.current?.querySelector<HTMLElement>(".manifesto-coin-scene");
      const quarter = root.current?.querySelector<HTMLElement>(".manifesto-coin");
      const quarterShadow = root.current?.querySelector<HTMLElement>(".manifesto-coin-shadow");
      if (quarterWord && manifestoSection && quarterScene && quarter && quarterShadow) {
        const positionQuarter = () => {
          const sectionBounds = manifestoSection.getBoundingClientRect();
          const wordBounds = quarterWord.getBoundingClientRect();
          const sceneSize = quarterScene.offsetWidth;

          gsap.set(quarterScene, {
            left: wordBounds.left - sectionBounds.left + (wordBounds.width / 2) - (sceneSize / 2),
            top: wordBounds.bottom - sectionBounds.top - (sceneSize / 2),
          });
        };

        positionQuarter();

        const quarterTimeline = gsap.timeline({
          paused: true,
          repeat: -1,
          repeatDelay: 1.4,
          repeatRefresh: true,
        });

        quarterTimeline
          .set(quarterScene, { autoAlpha: 1 })
          .set(quarterShadow, { opacity: 0, scaleX: 0.18, scaleY: 0.42 })
          .fromTo(quarter, {
            autoAlpha: 1,
            y: () => -quarterScene.getBoundingClientRect().top - quarter.offsetHeight - 32,
            x: -32,
            z: 72,
            rotationX: -18,
            rotationY: -540,
            rotationZ: -14,
            transformPerspective: 900,
            transformOrigin: "50% 50%",
          }, {
            y: 0,
            x: 0,
            z: 0,
            rotationX: 18,
            rotationY: 1080,
            rotationZ: 8,
            duration: 1.9,
            ease: "power2.in",
          })
          .to(quarterShadow, {
            opacity: 0.34,
            scaleX: 1,
            scaleY: 1,
            duration: 0.16,
            ease: "power2.out",
          }, "-=0.16")
          .to(quarter, {
            y: -56,
            z: 38,
            rotationX: 28,
            rotationY: 1260,
            rotationZ: -12,
            duration: 0.34,
            ease: "power3.out",
          })
          .to(quarter, {
            y: 0,
            z: 0,
            rotationX: 16,
            rotationY: 1440,
            rotationZ: 6,
            duration: 0.42,
            ease: "power2.in",
          })
          .to(quarter, {
            rotationY: 1800,
            rotationZ: 2,
            duration: 0.62,
            ease: "power1.out",
          })
          .to(quarter, {
            y: 1,
            rotationX: 80,
            rotationY: 1872,
            rotationZ: -3,
            duration: 0.62,
            ease: "power2.inOut",
          })
          .to(quarter, {
            y: 2,
            rotationX: 76,
            rotationY: 1890,
            rotationZ: 0,
            duration: 0.34,
            ease: "power3.out",
          })
          .to(quarterShadow, {
            opacity: 0.28,
            scaleX: 1.08,
            scaleY: 0.62,
            duration: 0.34,
          }, "<");

        ScrollTrigger.create({
          trigger: manifestoSection,
          start: "top 62%",
          end: "bottom 22%",
          onRefresh: positionQuarter,
          onEnter: () => {
            positionQuarter();
            quarterTimeline.restart();
          },
          onEnterBack: () => {
            positionQuarter();
            quarterTimeline.restart();
          },
          onLeave: () => quarterTimeline.pause(),
          onLeaveBack: () => {
            quarterTimeline.pause(0);
            gsap.set(quarterScene, { autoAlpha: 0 });
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".project-entry").forEach((entry, index) => {
        const background = entry.dataset.bg ?? projects[index].bg;

        ScrollTrigger.create({
          trigger: entry,
          start: "top 54%",
          end: "bottom 46%",
          onEnter: () => {
            setActiveProject(index);
            if (header) header.dataset.theme = projects[index].ink === "#f9fafb" ? "dark" : "light";
            setActiveNav("werk");
            gsap.to(showcase.current, {
              backgroundColor: background,
              color: projects[index].ink,
              duration: 0.75,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            setActiveProject(index);
            if (header) header.dataset.theme = projects[index].ink === "#f9fafb" ? "dark" : "light";
            setActiveNav("werk");
            gsap.to(showcase.current, {
              backgroundColor: background,
              color: projects[index].ink,
              duration: 0.75,
              ease: "power2.out",
            });
          },
        });

        gsap.from(entry.querySelector(".project-visual"), {
          yPercent: 9,
          scale: 0.965,
          ease: "none",
          scrollTrigger: {
            trigger: entry,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        });

        const image = entry.querySelector("img");
        if (image) {
          gsap.fromTo(
            image,
            { yPercent: -4 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: entry,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });

      gsap.fromTo(".showcase-progress span", { scaleY: 0 }, {
        scaleY: 1,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ".project-stream",
          start: "top 62%",
          end: "bottom 62%",
          scrub: true,
        },
      });

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
          start: "top 68%",
          end: "bottom 72%",
          scrub: true,
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

        const revealTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: stop,
            start: "top 90%",
            end: "48% 57%",
            scrub: 0.75,
            onUpdate: (self) => {
              revealProgress = self.progress;
              mosaic?.render(revealProgress, exitProgress);
            },
          },
        });
        revealTimeline
          .fromTo(copyElements, {
            autoAlpha: 0,
            y: 55,
            rotation: direction * 1.5,
          }, {
            autoAlpha: 1,
            y: 0,
            rotation: 0,
            stagger: 0.08,
            ease: "power3.out",
            duration: 0.65,
          }, 0.16)
          .fromTo(ephemera, {
            autoAlpha: 0,
            scale: 0.7,
            rotation: direction * 14,
          }, {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            ease: "back.out(1.5)",
            duration: 0.45,
          }, 0.35);

        if (photo) {
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
              scrub: true,
            },
          });
        }

        ScrollTrigger.create({
          trigger: stop,
          start: "70% 48%",
          end: "bottom 8%",
          onUpdate: (self) => {
            exitProgress = self.progress;
            mosaic?.render(revealProgress, exitProgress);
          },
        });

        gsap.to(copyElements, {
          autoAlpha: 0.14,
          y: -50,
          stagger: 0.025,
          ease: "power2.in",
          scrollTrigger: {
            trigger: stop,
            start: "75% 46%",
            end: "bottom 5%",
            scrub: true,
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

      gsap.from(".method-title-line > span", {
        yPercent: 112,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".method-intro", start: "top 72%" },
      });

      gsap.from(".method-intro-copy", {
        opacity: 0,
        y: 40,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: ".method-intro-copy", start: "top 82%" },
      });

      const methodPin = root.current?.querySelector<HTMLElement>(".method-pin");
      const methodTrack = root.current?.querySelector<HTMLElement>(".method-track");
      const methodProgress = root.current?.querySelector<HTMLElement>(".method-horizontal-progress span");

      if (methodPin && methodTrack && methodProgress) {
        const getMethodDistance = () => Math.max(0, methodTrack.scrollWidth - methodPin.clientWidth);
        const horizontalTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: methodPin,
            start: "top top",
            end: () => `+=${getMethodDistance() + window.innerHeight * 0.35}`,
            pin: true,
            scrub: 0.65,
            invalidateOnRefresh: true,
            anticipatePin: 1,
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

      gsap.from(".method-stack-chip", {
        opacity: 0,
        scale: 0.65,
        y: 36,
        rotation: (index) => (index % 2 === 0 ? -8 : 8),
        stagger: { each: 0.06, from: "random" },
        duration: 0.7,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".method-stack", start: "top 75%" },
      });

      gsap.from(".contact-postcard", {
        opacity: 0,
        y: 82,
        scale: 0.955,
        rotation: -1.8,
        duration: 1.15,
        ease: "power4.out",
        scrollTrigger: { trigger: ".contact", start: "top 72%" },
      });

      gsap.from(".postcard-copy > *, .postcard-portrait, .postcard-brand, .postcard-stamp, .postcard-links, .postcard-cta", {
        opacity: 0,
        y: 26,
        rotation: (index) => (index % 2 === 0 ? -1.2 : 1.2),
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-postcard",
          start: "top 66%",
        },
      });
    }, root);

    return () => {
      cleanupStoryRoute();
      cleanupStoryMosaics();
      cleanupHeader();
      cleanupHeroCta();
      context.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const colorLayer = root.current?.querySelector<HTMLElement>(".mind-brain-zone.is-active");
      if (!colorLayer) return;

      gsap.killTweensOf(colorLayer);
      gsap.set(colorLayer, { autoAlpha: 0, scale: 1, rotation: 0 });

      if (!activeMindZone) return;

      const motion = ({
        curiosity: { scale: 1.008, rotation: -0.08, origin: "32% 22%" },
        connections: { scale: 1.009, rotation: 0.08, origin: "78% 20%" },
        structure: { scale: 1.006, rotation: -0.04, origin: "48% 54%" },
        source: { scale: 1.01, rotation: 0.08, origin: "92% 55%" },
        direction: { scale: 1.008, rotation: -0.08, origin: "70% 78%" },
      } as Record<string, { scale: number; rotation: number; origin: string }>)[activeMindZone];
      if (!motion) return;

      gsap.fromTo(colorLayer, {
        autoAlpha: 0.08,
        scale: 0.995,
        rotation: 0,
      }, {
        autoAlpha: 1,
        scale: motion.scale,
        rotation: motion.rotation,
        transformOrigin: motion.origin,
        duration: 0.46,
        ease: "power2.out",
        overwrite: true,
      });
    }, root);

    return () => context.revert();
  }, [activeMindZone]);

  const manifesto =
    "Een website hoeft niet harder te roepen. Ze moet écht duidelijk maken waarom iemand blijft. Daarom stel ik vragen tot de ruis verdwijnt. Wanneer het kwartje valt, bouwen we verder op een kern die ook morgen nog klopt.";

  const activateContact = () => {
    if (window.matchMedia("(hover: none)").matches) {
      setContactOpen((current) => !current);
      return;
    }

    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main ref={root} className="site-shell">
      <a className="skip-link" href="#werk">
        Ga naar het werk
      </a>

      <header className="site-header" data-theme="light" aria-label="Hoofdnavigatie">
        <a className="site-mark" href="#top" aria-label="Naar boven">
          <span>A</span>
          <span className="site-mark-copy">Abdelrahman<br />Digital designer</span>
        </a>
        <nav className="top-nav" aria-label="Portfolio tabs">
          <a href="#werk" aria-current={activeNav === "werk" ? "location" : undefined}><span className="link-icon" aria-hidden="true"><BriefcaseBusiness /></span><span>Werk</span></a>
          <a href="#over" aria-current={activeNav === "over" ? "location" : undefined}><span className="link-icon" aria-hidden="true"><UserRound /></span><span>Over</span></a>
          <a href="#aanpak" aria-current={activeNav === "aanpak" ? "location" : undefined}><span className="link-icon" aria-hidden="true"><Workflow /></span><span>Aanpak</span></a>
        </nav>
      </header>

      <aside
        className={`floating-contact${contactOpen ? " is-open" : ""}`}
        aria-label="Direct contact"
        onMouseEnter={() => {
          if (window.matchMedia("(hover: hover)").matches) setContactOpen(true);
        }}
        onMouseLeave={() => {
          if (window.matchMedia("(hover: hover)").matches) setContactOpen(false);
        }}
        onFocusCapture={() => setContactOpen(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setContactOpen(false);
        }}
      >
        <div className="floating-contact-links" id="floating-contact-links" aria-hidden={!contactOpen}>
          <a href="https://www.linkedin.com/in/abdelrahman-ahmed-30896964/" target="_blank" rel="noreferrer" aria-label="Neem contact op via LinkedIn">
            <Linkedin aria-hidden="true" />
          </a>
          <a href="mailto:dhr_abdelrahman@outlook.com" aria-label="Stuur Abdelrahman een e-mail">
            <Mail aria-hidden="true" />
          </a>
          <a href="https://wa.me/31621572124" target="_blank" rel="noreferrer" aria-label="Neem contact op via WhatsApp">
            <MessageCircle aria-hidden="true" />
          </a>
        </div>
        <button
          type="button"
          className="floating-contact-trigger"
          aria-expanded={contactOpen}
          aria-controls="floating-contact-links"
          aria-label="Open contactmogelijkheden"
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
        aria-labelledby="hero-title"
      >
        <div className="mind-hero-content">
          <div className="mind-hero-meta label" aria-label="Portfolio metadata">
            <span>Portfolio / 2026</span>
            <span>Een kaart van hoe ik ontwerp</span>
            <span>Strategy / UX / Direction</span>
          </div>

          <div className="mind-hero-canvas">
            <div className="mind-hero-visual">
              <div className="mind-hero-photo-slide">
                <Image
                  className="mind-hero-base"
                  src="/about/hero-profile-window-v1.webp"
                  alt="Zijprofiel van Abdelrahman met een interactieve kaart van zijn ontwerpdenken"
                  fill
                  priority
                  sizes="100vw"
                  style={{ objectFit: "contain", objectPosition: "right bottom" }}
                />
                <div className="mind-brain-stage" aria-hidden="true">
                  <Image
                    className="mind-brain-lumi"
                    src="/about/brain-stage-lumi.png"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                  />
                  {mindZones.map((zone) => (
                    <Image
                      className={`mind-brain-zone mind-brain-zone-${zone.id}${activeMindZone === zone.id ? " is-active" : ""}`}
                      src={`/about/brain-stage-zone-${zone.id}.png`}
                      alt=""
                      fill
                      sizes="100vw"
                      key={`brain-zone-${zone.id}`}
                    />
                  ))}
                </div>
                <Image
                  className="mind-portrait-foreground"
                  src="/about/hero-profile-foreground-v1.webp"
                  alt=""
                  fill
                  sizes="100vw"
                  aria-hidden="true"
                />
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

            <div className="mind-hero-copy">
              <p className="mind-hero-kicker label">Geen vaste formule. Wel een stevig vertrekpunt.</p>
              <h1 id="hero-title" aria-label="Ik ontwerp met alles wat ik onderweg leer.">
                <span className="mind-title-line"><span>Ik ontwerp met</span></span>
                <span className="mind-title-line"><span>alles wat ik</span></span>
                <span className="mind-title-line"><span>onderweg <em>leer.</em></span></span>
              </h1>
              <p className="mind-hero-lede">
                Wat ik leer verandert mijn blik. Wat ik belangrijk vind blijft staan:
                een helder fundament, scherpe keuzes en websites die mensen zonder omwegen begrijpen.
              </p>
            </div>

            <div className="mind-hero-actions">
              <div className="hero-cta-stage">
                <a
                  className="hero-cta-container"
                  href="#werk"
                  aria-label="Zie de gevolgen en ontdek de zeven cases"
                >
                  <span className="hero-cta-shape" aria-hidden="true">
                    <span className="editorial-text-ring hero-cta-ring-idle">
                      {[...heroCtaIdleRingCopy].map((character, index, characters) => (
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
                      {[...heroCtaActiveRingCopy].map((character, index, characters) => (
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
                </a>
              </div>
            </div>

            <div className="mind-zone-layer" role="group" aria-label="Interactieve kaart van mijn ontwerpdenken">
              {mindZones.map((zone) => {
                const isActive = activeMindZone === zone.id;

                return (
                  <button
                    key={zone.id}
                    type="button"
                    className={`mind-zone mind-zone-${zone.id}${isActive ? " is-active" : ""}`}
                    style={{ "--zone-color": zone.color } as CSSProperties}
                    aria-pressed={isActive}
                    aria-label={`${zone.number} ${zone.label}: ${zone.title}. ${zone.detail}`}
                    onMouseEnter={() => {
                      if (window.matchMedia("(hover: hover)").matches) setActiveMindZone(zone.id);
                    }}
                    onMouseLeave={() => {
                      if (window.matchMedia("(hover: hover)").matches) setActiveMindZone(null);
                    }}
                    onFocus={(event) => {
                      if (event.currentTarget.matches(":focus-visible")) setActiveMindZone(zone.id);
                    }}
                    onBlur={() => setActiveMindZone(null)}
                    onClick={() => {
                      if (window.matchMedia("(hover: none)").matches) {
                        setActiveMindZone((current) => current === zone.id ? null : zone.id);
                      }
                    }}
                  >
                    <span className="mind-zone-surface" aria-hidden="true" />
                    <span className="mind-zone-mobile-copy">
                      <span className="mind-zone-mobile-kicker label">{zone.number} / {zone.label}</span>
                      <strong>{zone.title}</strong>
                      <span>{zone.detail}</span>
                    </span>
                  </button>
                );
              })}

              {mindZones.map((zone) => {
                const isActive = activeMindZone === zone.id;

                return (
                  <span
                    className={`mind-annotation-panel mind-annotation-panel-${zone.id}${isActive ? " is-active" : ""}`}
                    style={{ "--zone-color": zone.color } as CSSProperties}
                    aria-hidden={!isActive}
                    key={`annotation-${zone.id}`}
                  >
                      <span className="mind-annotation-kicker label">
                        {zone.number} / {zone.label}
                      </span>
                      <strong aria-label={zone.title} style={{ "--char-count": zone.title.length } as CSSProperties}>
                        {zone.title.split(" ").map((word, wordIndex, words) => {
                          const charOffset = words.slice(0, wordIndex).reduce((total, current) => total + current.length + 1, 0);

                          return (
                            <span className="mind-written-word" aria-hidden="true" key={`${zone.id}-${word}-${wordIndex}`}>
                              {[...word].map((character, characterIndex) => (
                                <span
                                  className="mind-written-char"
                                  style={{
                                    "--char-delay": `${(charOffset + characterIndex) * 24}ms`,
                                    "--erase-delay": `${(zone.title.length - charOffset - characterIndex) * 12}ms`,
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
                      <span className="mind-annotation-detail">{zone.detail}</span>

                      {zone.id === "direction" && (
                        <span className="mind-tools" aria-label="Tools: Figma, Framer en AI">
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

          </div>
        </div>
      </section>

      <section className="manifesto" id="houding" data-nav-theme="light" aria-labelledby="manifesto-label">
        <p className="section-kicker" id="manifesto-label"><span>01</span> Mijn houding</p>
        <p className="manifesto-copy">
          {manifesto.split(" ").map((word, index) => {
            const normalizedWord = word.toLocaleLowerCase("nl-NL").replace(/[^\p{L}]/gu, "");
            const isMarkerWord = manifestoMarkerWords.has(normalizedWord);

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
        <span className="manifesto-coin-scene" aria-hidden="true">
          <span className="manifesto-coin-shadow" />
          <span className="manifesto-coin">
            {Array.from({ length: 13 }, (_, index) => (
              <i className="manifesto-coin-edge" style={{ transform: `translateZ(${index - 6}px)` }} key={index} />
            ))}
            <span className="manifesto-coin-face manifesto-coin-front"><strong>25</strong><small>cent</small></span>
            <span className="manifesto-coin-face manifesto-coin-back"><strong>A</strong><small>kwartje</small></span>
          </span>
        </span>
        <aside className="manifesto-aside">
          <span className="label">Dualiteit als methode</span>
          <p>Vrij denken.<br />Verantwoord bouwen.</p>
        </aside>
      </section>

      <section
        className="showcase"
        id="werk"
        data-nav-theme="light"
        data-nav-key="werk"
        ref={showcase}
        style={{
          backgroundColor: projects[0].bg,
          color: projects[0].ink,
        }}
        aria-labelledby="work-title"
      >
        <div className="showcase-sticky">
          <p className="section-kicker"><span>02</span> Selected work</p>
          <p className="showcase-intro">
            Drie websites gebouwd met klanten. Vier oplossingsrichtingen geboren uit
            een gat dat ik zelf zag. Anders van oorsprong, gelijk in aandacht.
          </p>
          <div className="showcase-title-wrap">
            <p className="label">Case {projects[activeProject].number} / {projectCount}</p>
            <h2 id="work-title" aria-live="polite">{projects[activeProject].name}</h2>
          </div>
          <div className="project-dots" aria-hidden="true">
            {projects.map((project, index) => (
              <span key={project.slug} className={index === activeProject ? "is-active" : ""} />
            ))}
          </div>
          <div className="showcase-progress" aria-hidden="true"><span /></div>
        </div>

        <div className="project-stream">
          {projects.map((project) => (
            <article
              className={`project-entry project-${project.slug}`}
              data-bg={project.bg}
              key={project.slug}
              style={{ color: project.ink, backgroundColor: project.bg }}
            >
              <div className="project-meta label">
                <span>{project.number} / {projectCount} · {project.category}</span>
                <span>{project.services}</span>
              </div>
              <div className="project-visual">
                <span className="project-watermark" aria-hidden="true">{project.name}</span>
                <div className="browser-frame">
                  <div className="browser-bar" aria-hidden="true">
                    <i /><i /><i /><span>{project.browserLabel}</span>
                  </div>
                  <div className="browser-image">
                    <Image
                      src={project.image}
                      alt={`Ontwerpoverzicht van ${project.name}`}
                      fill
                      sizes="(max-width: 720px) 82vw, 53vw"
                      style={{ objectPosition: project.imagePosition }}
                    />
                  </div>
                </div>
              </div>
              <div className="project-copy">
                <h3>{project.title}</h3>
                <div>
                  <p>{project.summary}</p>
                  {project.href ? (
                    <a className="text-link" href={project.href}>
                      <span className="link-icon" aria-hidden="true"><ArrowUpRight /></span><span>Bekijk de case</span>
                    </a>
                  ) : (
                    <span className="text-link text-link-muted">Concept preview</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="principle" data-nav-theme="light" aria-label="Ontwerpprincipe">
        <p className="section-kicker"><span>03</span> De balans</p>
        <div className="principle-grid">
          <p className="principle-big">Fundament vóór <em>effect.</em></p>
          <p>
            Ik wissel van gereedschap, tempo en route zodra de vraag daarom vraagt.
            Helderheid, toegankelijkheid en intentie blijven staan. Daar toets ik
            iedere vondst aan.
          </p>
        </div>
      </section>

      <section className="about-story" id="over" data-nav-theme="light" data-nav-key="over" aria-labelledby="about-title">
        <div className="about-story-heading">
          <p className="section-kicker"><span>04</span> De mens achter het werk</p>
          <h2 id="about-title">
            <span>Een klik voel je snel.</span>
            <span>Goed werk bouw je samen.</span>
          </h2>
          <p>Ik maak makkelijk contact, maar zeg ook eerlijk wanneer een samenwerking niet klopt. Als er vertrouwen is, mag het gesprek scherp worden. Dan komen de vragen op tafel die een website beter maken.</p>
        </div>

        <div className="story-route">
          <svg className="story-route-svg" aria-hidden="true" focusable="false" preserveAspectRatio="none">
            <path className="story-route-base" />
            <path className="story-route-progress" />
          </svg>
          <span className="story-route-runner" aria-hidden="true" />
          <div className="story-board-meta label" aria-hidden="true">
            <span>Personal field notes</span>
            <span>01 — 04</span>
          </div>
          {personalStory.map((story, index) => (
            <article
              className={`story-stop story-stop-${index + 1}`}
              key={story.step}
              style={{
                "--dot-x": story.dotX,
                "--dot-mobile-x": story.dotMobileX,
              } as CSSProperties}
            >
              <div className="story-stop-dot" aria-hidden="true">
                <span className="story-stop-dot-fill" />
                <strong>{story.step}</strong>
              </div>
              <figure className="story-photo">
                <div className="story-photo-stage" role="img" aria-label={story.alt}>
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
                <figcaption><span>{story.caption}</span><span>© Abdelrahman</span></figcaption>
              </figure>
              <aside className="story-margin-note" aria-hidden="true">{story.note}</aside>
              <div className="story-stop-copy">
                <p className="label">{story.kicker}</p>
                <h3>
                  {story.title.split(" ").map((word, wordIndex) => (
                    <span className="story-heading-word" key={`${word}-${wordIndex}`}>{word}{" "}</span>
                  ))}
                </h3>
                <p>{story.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="method" id="aanpak" data-nav-theme="dark" data-nav-key="aanpak" aria-labelledby="method-title">
        <div className="method-intro">
          <p className="section-kicker section-kicker-light"><span>05</span> Hoe ik werk</p>
          <h2 id="method-title">
            <span className="method-title-line"><span>Niet alleen ontwerpen.</span></span>
            <span className="method-title-line method-title-indent"><span>Het proces dirigeren.</span></span>
          </h2>
          <div className="method-intro-copy">
            <p>Ik pas de route aan zodra onderzoek daar aanleiding toe geeft. De volgorde blijft helder: samen scherpstellen, bewijs zoeken, tastbaar maken en tussendoor beslissen of we nog hetzelfde probleem oplossen.</p>
            <span className="label">Strategy → Research → Design → Direction</span>
          </div>
        </div>

        <div className="method-horizontal" aria-label="Vier stappen in mijn werkwijze">
          <div className="method-pin">
            <div className="method-horizontal-meta">
              <p className="label">Scrollroute · links naar rechts</p>
              <div className="method-horizontal-progress" aria-hidden="true"><span /></div>
              <p className="label">01 — 04</p>
            </div>
            <div className="method-track">
              {workingMethod.map((step, index) => (
                <article className={`method-note method-note-${index + 1}`} key={step.number}>
                  <span className="method-note-tape" aria-hidden="true" />
                  <header>
                    <span className="method-note-number">{step.number}</span>
                    <p className="label">{step.phase}</p>
                  </header>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <span className="method-tools label">{step.tools}</span>
                  <aside>{step.annotation}</aside>
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
          <p className="label">The working stack</p>
          <div>
            {[
              "Strategie",
              "Desk research",
              "Field research",
              "AI",
              "Figma",
              "Framer",
              "Prototyping",
              "Check-ins",
            ].map((tool) => <span className="method-stack-chip" key={tool}>{tool}</span>)}
          </div>
          <p>Tools versnellen. Richting blijft mensenwerk.</p>
        </div>
      </section>

      <footer className="contact" id="contact" data-nav-theme="light" data-nav-key="contact">
        <article className="contact-postcard">
          <div className="postcard-brand">
            <span className="postcard-monogram">A</span>
            <p>Abdelrahman<br />Senior digital designer</p>
          </div>

          <div className="postcard-copy">
            <p className="label">Postcard / Amsterdam — 2026</p>
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
            <figcaption>Design is a dialogue</figcaption>
          </figure>

          <p className="postcard-side-type" aria-hidden="true">BRING THE QUESTION · TEST THE CLICK</p>

          <a className="postcard-cta" href="mailto:dhr_abdelrahman@outlook.com">
            <span className="link-icon" aria-hidden="true"><Mail /></span><span>Leg je vraag op tafel</span>
          </a>

          <div className="postcard-links" aria-label="Contactkanalen">
            <a href="mailto:dhr_abdelrahman@outlook.com"><span className="link-icon" aria-hidden="true"><Mail /></span><span>Email</span></a>
            <a href="https://www.linkedin.com/in/abdelrahman-ahmed-30896964/" target="_blank" rel="noreferrer"><span className="link-icon" aria-hidden="true"><Linkedin /></span><span>LinkedIn</span></a>
            <a href="https://wa.me/31621572124" target="_blank" rel="noreferrer"><span className="link-icon" aria-hidden="true"><MessageCircle /></span><span>WhatsApp</span></a>
          </div>

          <div className="postcard-stamp" aria-hidden="true">
            <span>A</span>
            <small>AMS<br />2026</small>
          </div>

          <p className="postcard-fineprint">© 2026 · Built with intention · Nederland</p>
        </article>
        <p className="contact-ground-note label">Geen verkooppraat. Wel een goed gesprek.</p>
      </footer>
    </main>
  );
}
