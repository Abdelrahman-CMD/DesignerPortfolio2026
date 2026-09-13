import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type CaseMotionOptions = {
  heroParallax?: number;
};

const once = "play none none none";

function elements<T extends Element>(root: ParentNode, selector: string) {
  return Array.from(root.querySelectorAll<T>(selector));
}

export function revealCaseEvidence(root: HTMLElement = document.body) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = elements<HTMLElement>(root, ".tc-evidence-reveal");
  const lines = elements<SVGPathElement>(root, ".tc-journey-line");

  if (reduceMotion) {
    gsap.set(items, { autoAlpha: 1, y: 0 });
    gsap.set(lines, { strokeDashoffset: 0 });
    return;
  }

  items.forEach((item) => {
    gsap.from(item, {
      autoAlpha: 0,
      y: 36,
      duration: 0.72,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 88%",
        toggleActions: once,
        fastScrollEnd: true,
      },
    });
  });

  lines.forEach((line) => {
    gsap.fromTo(
      line,
      { strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: line.closest(".tc-journey"),
          start: "top 74%",
          end: "center 44%",
          scrub: 0.45,
        },
      },
    );
  });
}

export function revealCaseCard(card: HTMLElement, shell: HTMLElement) {
  const lines = card.querySelectorAll<HTMLElement>(".tc-mask > span");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    gsap.set(lines, { autoAlpha: 1, yPercent: 0 });
    return;
  }

  const isDesktop = window.matchMedia("(min-width: 721px)").matches;

  if (isDesktop) {
    gsap.fromTo(
      lines,
      { autoAlpha: 0, yPercent: 108 },
      {
        autoAlpha: 1,
        yPercent: 0,
        stagger: 0.18,
        ease: "none",
        scrollTrigger: {
          trigger: shell,
          start: "top 15%",
          end: "top -42%",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      },
    );
    return;
  }

  gsap.from(lines, {
    autoAlpha: 0,
    yPercent: 108,
    duration: 0.62,
    stagger: 0.07,
    ease: "power4.out",
    scrollTrigger: {
      trigger: shell,
      start: "top 86%",
      toggleActions: once,
      fastScrollEnd: true,
    },
  });
}

export function initCaseMotion(root: HTMLElement, options: CaseMotionOptions = {}) {
  gsap.registerPlugin(ScrollTrigger);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const durationScale = window.matchMedia("(max-width: 720px)").matches ? 0.72 : 1;
  const cleanups: Array<() => void> = [];

  const context = gsap.context(() => {
    const revealTargets = elements<HTMLElement>(root,
      ".tc-nav, .tc-hero-kicker, .tc-title-line > span, .tc-hero-summary, .tc-hero-meta, .tc-hero-media, .cc-hero-note, .tc-snapshot > header > *, .tc-snapshot-grid > *, .tc-premise h2, .tc-premise-notes, .tc-proof-heading > *, .tc-proof-frame, .tc-contribution > *, .tc-footer > *",
    );

    if (reduceMotion) {
      gsap.set(revealTargets, { clearProps: "all", autoAlpha: 1, x: 0, y: 0, xPercent: 0, yPercent: 0, scale: 1 });
      gsap.set(elements<HTMLElement>(root, ".tc-mask > span, .tc-mirqa-screen, .cc-card-tags > span, .cc-metric-board > *"), {
        clearProps: "all",
        autoAlpha: 1,
        x: 0,
        y: 0,
        yPercent: 0,
        scale: 1,
      });
      revealCaseEvidence(root);
      return;
    }

    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
    intro
      .from(".tc-nav", { autoAlpha: 0, y: -18, duration: 0.32 })
      .from(".tc-hero-kicker", { autoAlpha: 0, y: 14, duration: 0.3 }, "-=0.08")
      .from(".tc-title-line > span", { yPercent: 112, duration: 0.62, stagger: 0.065 }, "-=0.16")
      .from(".tc-hero-summary, .tc-hero-meta", { autoAlpha: 0, y: 22, duration: 0.48, stagger: 0.09 }, "-=0.34")
      .from(".tc-hero-media", { autoAlpha: 0, xPercent: 12, scale: 0.975, duration: 0.86 }, "-=0.48")
      .from(".cc-hero-note", { autoAlpha: 0, rotate: -4, y: 16, duration: 0.46 }, "-=0.22");
    intro.timeScale(1 / durationScale);

    const heroImage = root.querySelector<HTMLElement>(".tc-hero-media > img:first-child");
    if (heroImage && window.matchMedia("(min-width: 721px)").matches) {
      gsap.to(heroImage, {
        yPercent: -(options.heroParallax ?? 7),
        ease: "none",
        scrollTrigger: {
          trigger: root.querySelector(".tc-hero"),
          start: "top top",
          end: "bottom top",
          scrub: 0.55,
        },
      });
    }

    const snapshot = root.querySelector<HTMLElement>(".tc-snapshot");
    if (snapshot) {
      gsap.from(snapshot.querySelectorAll(":scope > header > *"), {
        autoAlpha: 0,
        y: 26,
        duration: 0.62 * durationScale,
        stagger: 0.11,
        ease: "power3.out",
        scrollTrigger: { trigger: snapshot, start: "top 84%", toggleActions: once, fastScrollEnd: true },
      });
      gsap.from(snapshot.querySelectorAll(".tc-snapshot-grid > *"), {
        autoAlpha: 0,
        y: 44,
        scale: 0.965,
        duration: 0.72 * durationScale,
        stagger: 0.12,
        ease: "back.out(1.25)",
        scrollTrigger: { trigger: snapshot, start: "top 78%", toggleActions: once, fastScrollEnd: true },
      });
    }

    const premise = root.querySelector<HTMLElement>(".tc-premise");
    if (premise) {
      gsap.from(premise.querySelectorAll("h2, .tc-premise-notes"), {
        autoAlpha: 0,
        y: 38,
        duration: 0.78 * durationScale,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: premise, start: "top 82%", toggleActions: once, fastScrollEnd: true },
      });
    }

    revealCaseEvidence(root);

    const cards = elements<HTMLElement>(root, ".tc-card");
    const shells = elements<HTMLElement>(root, ".tc-card-shell");
    cards.forEach((card, index) => {
      const shell = shells[index];
      const nextShell = shells[index + 1];
      if (!shell) return;
      revealCaseCard(card, shell);

      const media = card.querySelector<HTMLElement>(".tc-card-media");
      if (media) {
        gsap.from(media, {
          autoAlpha: 0,
          y: 38,
          scale: 0.985,
          duration: 0.84 * durationScale,
          ease: "power3.out",
          scrollTrigger: { trigger: shell, start: "top 78%", toggleActions: once, fastScrollEnd: true },
        });

        const screens = media.querySelectorAll<HTMLElement>(".tc-mirqa-screen");
        if (screens.length) {
          gsap.from(screens, {
            autoAlpha: 0,
            y: 52,
            scale: 0.94,
            duration: 0.78 * durationScale,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: shell, start: "top 69%", toggleActions: once, fastScrollEnd: true },
          });
        }
      }

      const tags = card.querySelectorAll<HTMLElement>(".cc-card-tags > span");
      if (tags.length) {
        gsap.from(tags, {
          autoAlpha: 0,
          y: 12,
          duration: 0.38 * durationScale,
          stagger: 0.055,
          ease: "power2.out",
          scrollTrigger: { trigger: shell, start: "top 44%", toggleActions: once, fastScrollEnd: true },
        });
      }

      const metricRows = card.querySelectorAll<HTMLElement>(".cc-metric-board dl > div");
      if (metricRows.length) {
        gsap.from(metricRows, {
          autoAlpha: 0,
          y: 20,
          duration: 0.52 * durationScale,
          stagger: 0.095,
          ease: "power3.out",
          scrollTrigger: { trigger: shell, start: "top 48%", toggleActions: once, fastScrollEnd: true },
        });
      }

      if (nextShell) {
        gsap.to(card, {
          scale: 0.985,
          filter: "brightness(0.95)",
          ease: "none",
          scrollTrigger: {
            trigger: nextShell,
            start: "top bottom",
            end: "top 12%",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });
        const dim = card.querySelector<HTMLElement>(".tc-card-dim");
        if (dim) {
          gsap.to(dim, {
            opacity: 0.025,
            ease: "none",
            scrollTrigger: {
              trigger: nextShell,
              start: "top bottom",
              end: "top 12%",
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          });
        }
      }
    });

    elements<HTMLElement>(root, ".tc-proof-heading").forEach((heading) => {
      gsap.from(heading.children, {
        autoAlpha: 0,
        y: 26,
        duration: 0.62 * durationScale,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: heading, start: "top 84%", toggleActions: once, fastScrollEnd: true },
      });
    });

    elements<HTMLElement>(root, ".tc-proof-frame").forEach((frame, index) => {
      gsap.from(frame, {
        autoAlpha: 0,
        y: 34,
        rotate: index % 2 === 0 ? -0.55 : 0.55,
        duration: 0.72 * durationScale,
        ease: "power3.out",
        scrollTrigger: { trigger: frame, start: "top 86%", toggleActions: once, fastScrollEnd: true },
      });
    });

    const contribution = root.querySelector<HTMLElement>(".tc-contribution");
    if (contribution) {
      gsap.from(contribution.children, {
        autoAlpha: 0,
        y: 28,
        duration: 0.62 * durationScale,
        stagger: 0.105,
        ease: "power3.out",
        scrollTrigger: { trigger: contribution, start: "top 82%", toggleActions: once, fastScrollEnd: true },
      });
    }

    const footer = root.querySelector<HTMLElement>(".tc-footer");
    if (footer) {
      gsap.from(footer.children, {
        autoAlpha: 0,
        y: 22,
        duration: 0.56 * durationScale,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: footer, start: "top 88%", toggleActions: once, fastScrollEnd: true },
      });
    }

    elements<HTMLDetailsElement>(root, ".tc-deep-dive").forEach((details) => {
      let animated = false;
      const reveal = () => {
        if (!details.open || animated) return;
        animated = true;
        gsap.from(details.querySelectorAll(".tc-deep-dive-grid > article"), {
          autoAlpha: 0,
          y: 26,
          duration: 0.56 * durationScale,
          stagger: 0.08,
          ease: "power3.out",
        });
      };
      details.addEventListener("toggle", reveal);
      cleanups.push(() => details.removeEventListener("toggle", reveal));
    });

    elements<HTMLVideoElement>(root, ".tc-card-media video").forEach((video) => {
      ScrollTrigger.create({
        trigger: video,
        start: "top 78%",
        end: "bottom 22%",
        onEnter: () => void video.play().catch(() => undefined),
        onEnterBack: () => void video.play().catch(() => undefined),
        onLeave: () => video.pause(),
        onLeaveBack: () => video.pause(),
      });
    });

    const hero = root.querySelector<HTMLElement>(".tc-hero-media");
    const removeSharedHero = () => {
      if (hero) hero.style.viewTransitionName = "none";
    };
    elements<HTMLAnchorElement>(root, "a[href]").forEach((link) => {
      link.addEventListener("click", removeSharedHero);
      cleanups.push(() => link.removeEventListener("click", removeSharedHero));
    });
  }, root);

  return () => {
    cleanups.forEach((cleanup) => cleanup());
    context.revert();
  };
}
