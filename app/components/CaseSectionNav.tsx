"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../i18n";

const items = [
  { id: "case-overview", nl: "Overzicht", en: "Overview" },
  { id: "case-context", nl: "Context", en: "Context" },
  { id: "case-process", nl: "Proces", en: "Process" },
  { id: "case-evidence", nl: "Bewijs", en: "Evidence" },
  { id: "case-outcome", nl: "Bijdrage", en: "Contribution" },
] as const;

export function CaseSectionNav({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = useState(items[0].id);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-34% 0px -52% 0px", threshold: [0.01, 0.18, 0.36] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="tc-section-nav" aria-label={locale === "en" ? "Case sections" : "Case secties"}>
      {items.map((item, index) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={activeId === item.id ? "location" : undefined}
        >
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <strong>{locale === "en" ? item.en : item.nl}</strong>
        </a>
      ))}
    </nav>
  );
}
