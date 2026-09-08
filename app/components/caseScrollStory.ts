import gsap from "gsap";

export function revealCaseEvidence() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = gsap.utils.toArray<HTMLElement>(".tc-evidence-reveal");
  const lines = gsap.utils.toArray<SVGPathElement>(".tc-journey-line");

  if (reduceMotion) {
    gsap.set(items, { autoAlpha: 1, y: 0 });
    gsap.set(lines, { strokeDashoffset: 0 });
    return;
  }

  items.forEach((item) => {
    gsap.from(item, {
      autoAlpha: 0,
      y: 44,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 86%",
        toggleActions: "play none none reverse",
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
          start: "top 72%",
          end: "center 42%",
          scrub: 0.6,
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
        stagger: 0.22,
        ease: "none",
        scrollTrigger: {
          trigger: shell,
          start: "top 14%",
          end: "top -58%",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      },
    );
    return;
  }

  gsap.from(lines, {
    autoAlpha: 0,
    yPercent: 108,
    duration: 0.8,
    stagger: 0.08,
    ease: "power4.out",
    scrollTrigger: {
      trigger: shell,
      start: "top 84%",
      toggleActions: "play none none reverse",
    },
  });
}
