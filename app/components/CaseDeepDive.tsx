"use client";

import type { Locale } from "../i18n";

type DeepDiveItem = {
  number?: string;
  eyebrow: string;
  title: string;
  body: string;
  note: string;
};

export function CaseDeepDive({
  items,
  locale,
}: {
  items: readonly DeepDiveItem[];
  locale: Locale;
}) {
  const copy = locale === "en"
    ? {
        eyebrow: "Optional deep dive",
        title: "Explore the decisions behind the solution",
        body: "Open this section for the supporting product logic, visual system and validation questions.",
      }
    : {
        eyebrow: "Optionele verdieping",
        title: "Bekijk de beslissingen achter de oplossing",
        body: "Open deze sectie voor de aanvullende productlogica, het visuele systeem en de validatievragen.",
      };

  return (
    <details className="tc-deep-dive">
      <summary>
        <span>
          <small>{copy.eyebrow}</small>
          <strong>{copy.title}</strong>
          <span>{copy.body}</span>
        </span>
        <span className="tc-deep-dive-action" aria-hidden="true">+</span>
      </summary>
      <div className="tc-deep-dive-grid">
        {items.map((item, index) => (
          <article key={`${item.number ?? index}-${item.title}`}>
            <span className="tc-deep-dive-index">{item.number ?? `0${index + 4}`}</span>
            <p>{item.eyebrow}</p>
            <h3>{item.title}</h3>
            <div>{item.body}</div>
            <blockquote>{item.note}</blockquote>
          </article>
        ))}
      </div>
    </details>
  );
}
