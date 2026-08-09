"use client";

import Link from "next/link";
import Image from "next/image";
import { CSSProperties, useLayoutEffect, useRef, useState } from "react";
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
    bg: "#1c2a3a",
    ink: "#f9fafb",
    image: "/projects/home/atotz.webp",
    imagePosition: "center",
    href: "/cases/atotz-detachering",
  },
] as const;

const personalStory = [
  {
    step: "01",
    kicker: "Wie ik ben",
    title: "Nieuwsgierig van nature. Strategisch uit overtuiging.",
    body: "Ik ben Abdelrahman, senior digital designer en strategisch sparringpartner. Ik gebruik design om complexe vragen terug te brengen tot iets dat mensen begrijpen, vertrouwen en willen gebruiken.",
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
    title: "Eerst de dialoog. Dan de richting. Daarna pas pixels.",
    body: "Mijn beste werk ontstaat niet uit een briefing die meteen dichtgetimmerd is. Ik vraag door, leg aannames op tafel en wacht tot het kwartje valt. Daar, tussen structuur en vrije verbeelding, begint het echte ontwerp.",
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
    title: "Kennis is geen zijpad. Het is onderdeel van mijn vak.",
    body: "Ik blijf lezen, onderzoeken en bouwen. Van designpsychologie en strategie tot techniek en cultuur: nieuwe kennis scherpt mijn blik en voorkomt dat ik steeds hetzelfde antwoord op een nieuwe vraag geef.",
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
    title: "Oh ja — ik ben natuurlijk ook papa.",
    body: "Vaderschap maakt mijn kijk op verantwoordelijkheid heel concreet. Het herinnert me eraan voor wie we uiteindelijk ontwerpen: echte mensen, met weinig tijd, veel context en een leven dat nooit netjes in een user flow past.",
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
    title: "Richting ontstaat in de dialoog.",
    body: "Aan tafel met de klant maak ik aannames zichtbaar. We bepalen niet alleen wat er gebouwd moet worden, maar vooral welke verandering het werk moet veroorzaken.",
    tools: "Client sessions · Workshops · Direction",
    annotation: "Begin met de vraag — niet met de deliverable.",
  },
  {
    number: "02",
    phase: "Verdiepen",
    title: "Desk, field en AI brengen het probleem dichtbij.",
    body: "Ik combineer deskresearch met gesprekken en observaties uit de echte context. AI helpt patronen sneller toetsen en nieuwe vragen formuleren — het oordeel en de richting blijven menselijk.",
    tools: "Desk research · Field research · AI",
    annotation: "AI versnelt het zoeken. Het oordeel blijft menselijk.",
  },
  {
    number: "03",
    phase: "Vormgeven",
    title: "Van inzicht naar een voelbaar product.",
    body: "In Figma krijgt de ervaring structuur. In Framer of code wordt ze tastbaar, beweeglijk en testbaar. AI versnelt varianten en uitvoering, zonder de ontwerpintentie over te nemen.",
    tools: "Figma · Framer · AI-assisted build",
    annotation: "Maak het vroeg voelbaar. Dan wordt feedback concreet.",
  },
  {
    number: "04",
    phase: "Koers houden",
    title: "Check-ins maken van uitvoering een gedeelde regie.",
    body: "Tijdens iedere fase kijken we samen: klopt de richting nog, begrijpen gebruikers dit en draagt iedere keuze bij aan het doel? Zo dirigeer ik het proces én blijft de klant onderdeel van het ontwerp.",
    tools: "Prototype reviews · Check-ins · Iteration",
    annotation: "Check in. Stel bij. Houd samen koers.",
  },
] as const;

export function HomeExperience() {
  const root = useRef<HTMLElement>(null);
  const showcase = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [activeHeroProject, setActiveHeroProject] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let cleanupStoryRoute = () => {};
    let cleanupStoryMosaics = () => {};

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".site-mark, .top-nav", {
          opacity: 0,
          y: -14,
          duration: 0.7,
        })
        .from(
          ".hero-line > span",
          { yPercent: 115, duration: 1.25, stagger: 0.1 },
          "-=0.35",
        )
        .from(
          ".hero-intro, .hero-index, .hero-note, .hero-cover-meta span, .scroll-note",
          { opacity: 0, y: 22, duration: 0.8, stagger: 0.1 },
          "-=0.65",
        )
        .from(".hero-rule span", { scaleX: 0, transformOrigin: "left", duration: 1 }, "-=0.7")
        .from(".hero-case-preview", { opacity: 0, scale: 0.88, rotation: 6, duration: 1.05 }, "-=1");

      gsap.to(".hero-copy", {
        opacity: 0.14,
        yPercent: -13,
        scale: 0.945,
        transformOrigin: "center top",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "58% center",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-case-preview", {
        yPercent: -8,
        scale: 0.96,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
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

      gsap.utils.toArray<HTMLElement>(".project-entry").forEach((entry, index) => {
        const background = entry.dataset.bg ?? projects[index].bg;

        ScrollTrigger.create({
          trigger: entry,
          start: "top 54%",
          end: "bottom 46%",
          onEnter: () => {
            setActiveProject(index);
            gsap.to(showcase.current, {
              backgroundColor: background,
              color: projects[index].ink,
              duration: 0.75,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            setActiveProject(index);
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

      gsap.from(".footer-cta-line > span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".contact", start: "top 70%" },
      });

      gsap.fromTo(".contact-issue", {
        scale: 0.72,
        rotation: -6,
        opacity: 0.12,
      }, {
        scale: 1,
        rotation: 0,
        opacity: 0.82,
        ease: "none",
        scrollTrigger: {
          trigger: ".contact",
          start: "top bottom",
          end: "58% 58%",
          scrub: true,
        },
      });
    }, root);

    return () => {
      cleanupStoryRoute();
      cleanupStoryMosaics();
      context.revert();
    };
  }, []);

  const manifesto =
    "Mooie plaatjes bouwen is makkelijk. Iets ontwerpen dat écht werkt, vergt nieuwsgierigheid en een scherpe dialoog. Ik wacht tot het kwartje valt. Pas als we de kern begrijpen, begin ik met ontwerpen.";

  const heroProject = projects[activeHeroProject];
  const projectLetter = (letter: string, projectIndex: number) => {
    const project = projects[projectIndex];
    return (
      <button
        type="button"
        className={`hero-project-letter ${activeHeroProject === projectIndex ? "is-active" : ""}`}
        style={{
          "--letter-bg": project.bg,
          "--letter-ink": project.ink,
        } as CSSProperties}
        aria-label={`Toon ${project.name} in de hero-preview`}
        aria-pressed={activeHeroProject === projectIndex}
        onMouseEnter={() => setActiveHeroProject(projectIndex)}
        onFocus={() => setActiveHeroProject(projectIndex)}
        onClick={() => setActiveHeroProject(projectIndex)}
      >
        {letter}
      </button>
    );
  };

  return (
    <main ref={root} className="site-shell">
      <a className="skip-link" href="#werk">
        Ga naar het werk
      </a>

      <header className="site-header" aria-label="Hoofdnavigatie">
        <Link className="site-mark" href="#top" aria-label="Naar boven">
          <span>A</span>
          <span className="site-mark-copy">Abdelrahman<br />Digital designer</span>
        </Link>
        <nav className="top-nav">
          <a href="#werk">Werk</a>
          <a href="#over">Over</a>
          <a href="#aanpak">Aanpak</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-cover-meta label" aria-label="Portfolio metadata">
            <span>Portfolio / 2026</span>
            <span>Issue 01 · Digital products</span>
            <span>Strategy / UX / Direction</span>
          </div>
          <p className="hero-index label">Een portfolio over ontwerp dat ertoe doet</p>
          <h1 id="hero-title" aria-label="Ontwerpen voor impact, voorbij de spotlights. Alles zonder ruis.">
            <span className="hero-line"><span>On{projectLetter("t", 0)}werpen voor <em className="hero-mark">imp{projectLetter("a", 1)}ct,</em></span></span>
            <span className="hero-line hero-line-indent"><span>voor{projectLetter("b", 3)}ij de spotli{projectLetter("g", 2)}{projectLetter("h", 4)}ts.</span></span>
            <span className="hero-line hero-line-quiet"><span>{projectLetter("A", 5)}lles zonder ruis.</span></span>
          </h1>
          <aside
            className="hero-case-preview"
            style={{
              "--preview-bg": heroProject.bg,
              "--preview-ink": heroProject.ink,
            } as CSSProperties}
            aria-live="polite"
          >
            <Link href={heroProject.href} aria-label={`Open de case ${heroProject.name}`}>
              <figure>
                <div className="hero-preview-media">
                  <Image
                    key={heroProject.slug}
                    src={heroProject.image}
                    alt={`Preview van ${heroProject.name}`}
                    fill
                    priority={activeHeroProject === 0}
                    sizes="(max-width: 720px) 46vw, 18vw"
                    style={{ objectPosition: heroProject.imagePosition }}
                  />
                </div>
                <figcaption>
                  <span>{heroProject.number} / 06</span>
                  <strong>{heroProject.name}</strong>
                  <span>Bekijk case ↗</span>
                </figcaption>
              </figure>
            </Link>
          </aside>
          <div className="hero-bottom">
            <aside className="hero-note">
              <span>design is a dialogue</span>
              <p>06 cases over vertrouwen, richting en menselijke waarde.</p>
            </aside>
            <p className="hero-intro">
              Ik ben een digital designer en strategisch sparringpartner. Ik bouw
              digitale producten waar strakke structuur en out-of-the-box denken
              samenkomen. Geen loze esthetiek, maar design dat menselijke waarde
              toevoegt.
            </p>
            <p className="scroll-note label"><span aria-hidden="true">↓</span> Scroll om te ontdekken</p>
          </div>
          <div className="hero-rule" aria-hidden="true"><span /></div>
        </div>
      </section>

      <section className="manifesto" id="houding" aria-labelledby="manifesto-label">
        <p className="section-kicker" id="manifesto-label"><span>01</span> Mijn houding</p>
        <p className="manifesto-copy">
          {manifesto.split(" ").map((word, index) => (
            <span className="manifesto-word" key={`${word}-${index}`}>{word}{" "}</span>
          ))}
        </p>
        <aside className="manifesto-aside">
          <span className="label">Dualiteit als methode</span>
          <p>Vrij denken.<br />Verantwoord bouwen.</p>
        </aside>
      </section>

      <section
        className="showcase"
        id="werk"
        ref={showcase}
        style={{
          backgroundColor: projects[0].bg,
          color: projects[0].ink,
        }}
        aria-labelledby="work-title"
      >
        <div className="showcase-sticky">
          <p className="section-kicker"><span>02</span> Selected work</p>
          <div className="showcase-title-wrap">
            <p className="label">Case {projects[activeProject].number} / 06</p>
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
                <span>{project.number} / 06</span>
                <span>{project.services}</span>
              </div>
              <div className="project-visual">
                <span className="project-watermark" aria-hidden="true">{project.name}</span>
                <div className="browser-frame">
                  <div className="browser-bar" aria-hidden="true">
                    <i /><i /><i /><span>{project.slug}.concept</span>
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
                    <Link className="text-link" href={project.href}>
                      Bekijk de case <span aria-hidden="true">↗</span>
                    </Link>
                  ) : (
                    <span className="text-link text-link-muted">Concept preview</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="principle" aria-label="Ontwerpprincipe">
        <p className="section-kicker"><span>03</span> De balans</p>
        <div className="principle-grid">
          <p className="principle-big">Vorm volgt <em>begrip.</em></p>
          <p>
            Structuur geeft richting. Verbeelding maakt nieuwe ruimte. Mijn werk
            ontstaat precies tussen die twee in — op het moment dat strategie en
            menselijk gedrag elkaar echt begrijpen.
          </p>
        </div>
      </section>

      <section className="about-story" id="over" aria-labelledby="about-title">
        <div className="about-story-heading">
          <p className="section-kicker"><span>04</span> De mens achter het werk</p>
          <h2 id="about-title">
            <span>Ik ontwerp met alles</span>
            <span>wat ik onderweg leer.</span>
          </h2>
          <p>Geen rechte carrièrelijn, maar een route van vragen stellen, maken, lezen, opnieuw kijken — en thuiskomen.</p>
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

      <section className="method" id="aanpak" aria-labelledby="method-title">
        <div className="method-intro">
          <p className="section-kicker section-kicker-light"><span>05</span> Hoe ik werk</p>
          <h2 id="method-title">
            <span className="method-title-line"><span>Niet alleen ontwerpen.</span></span>
            <span className="method-title-line method-title-indent"><span>Het proces dirigeren.</span></span>
          </h2>
          <div className="method-intro-copy">
            <p>Mijn stack is geen gereedschapskist die het gesprek vervangt. Ze helpt om sneller van vraag naar inzicht en van inzicht naar een werkend product te bewegen.</p>
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

      <footer className="contact" id="contact">
        <div className="contact-cover-meta label">
          <span>Back cover / contact</span>
          <span>Abdelrahman · Digital direction</span>
          <span>06 / 06</span>
        </div>
        <div className="contact-heading-grid">
          <span className="contact-issue" aria-hidden="true">06</span>
          <div>
            <p className="section-kicker section-kicker-light"><span>06</span> Een goed gesprek begint hier</p>
            <h2>
              <span className="footer-cta-line"><span>Klaar om te sparren?</span></span>
              <span className="footer-cta-line footer-cta-indent"><span>Laten we het kwartje</span></span>
              <span className="footer-cta-line"><span>samen laten vallen.</span></span>
            </h2>
          </div>
        </div>
        <aside className="contact-note">
          <span>you bring the question</span>
          <p>Ik breng nieuwsgierigheid, structuur en een richting die we samen kunnen toetsen.</p>
        </aside>
        <a className="contact-button" href="mailto:abdel@muminstudio.com">
          <span>Vertel me waar je aan werkt</span>
          <span aria-hidden="true">↗</span>
        </a>
        <div className="footer-meta">
          <p>Abdelrahman<br />Senior Digital Designer<br />Nederland</p>
          <div className="footer-links">
            <a href="mailto:abdel@muminstudio.com">Email</a>
            <a href="https://instagram.com/themuminstudio" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://wa.me/31634158194" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <p className="footer-credit">© 2026<br />Built with intention</p>
        </div>
      </footer>
    </main>
  );
}
