"use client";

import { Locale } from "../i18n";
import {
  CvRol,
  CvTekst,
  cvContact,
  cvErvaring,
  cvHero,
  cvOpleiding,
  cvOver,
  cvRollen,
  cvStudies,
  cvTools,
  cvToolGroepen,
  cvVaardigheden,
  cvVaardigheidsGroepen,
  cvZoek,
} from "../data/cvContent";

const t = (waarde: CvTekst, locale: Locale) => (locale === "en" ? waarde.en || waarde.nl : waarde.nl);

function Tijdlijn({ rollen, locale }: { rollen: CvRol[]; locale: Locale }) {
  return (
    <ol className="cv-timeline">
      {rollen.map((rol, index) => (
        <li className="cv-entry" key={`${rol.titel.nl}-${index}`}>
          <div className="cv-entry-meta">
            <span className="cv-entry-period label">{t(rol.periode, locale)}</span>
            {rol.locatie ? <span className="cv-entry-place">{rol.locatie}</span> : null}
          </div>
          <div className="cv-entry-body">
            <h3>{t(rol.titel, locale)}</h3>
            <p className="cv-entry-org">{t(rol.organisatie, locale)}</p>
            <p className="cv-entry-text">{t(rol.tekst, locale)}</p>
            {rol.punten.length > 0 && (
              <ul className="cv-entry-points">
                {rol.punten.map((punt, i) => (
                  <li key={`punt-${i}`}>{t(punt, locale)}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function CvExperience({ locale }: { locale: Locale }) {
  return (
    <main className="cv-shell" id="top">
      <section className="cv-hero">
        <p className="cv-kicker label">{t(cvHero.kicker, locale)}</p>
        <h1>{t(cvHero.titel, locale)}</h1>
        <p className="cv-lead">{t(cvHero.lead, locale)}</p>
        <dl className="cv-facts">
          {cvHero.feiten.map((feit, i) => (
            <div key={`feit-${i}`}>
              <dt className="label">{t(feit.label, locale)}</dt>
              <dd>{t(feit.waarde, locale)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="cv-section" id="cv-over">
        <header className="cv-section-head">
          <p className="label">{t(cvOver.eyebrow, locale)}</p>
          <h2>{t(cvOver.titel, locale)}</h2>
        </header>
        <div className="cv-two-col">
          <div className="cv-prose">
            {cvOver.alineas.map((alinea, i) => (
              <p key={`alinea-${i}`}>{t(alinea, locale)}</p>
            ))}
            <ul className="cv-tags" aria-label={locale === "en" ? "Interests" : "Interesses"}>
              {cvOver.interesses.map((item, i) => (
                <li key={`interesse-${i}`}>{t(item, locale)}</li>
              ))}
            </ul>
          </div>
          <dl className="cv-details">
            {cvOver.details.map((detail, i) => (
              <div key={`detail-${i}`}>
                <dt className="label">{t(detail.label, locale)}</dt>
                <dd>{t(detail.waarde, locale)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="cv-section" id="cv-ervaring">
        <header className="cv-section-head">
          <p className="label">{t(cvErvaring.eyebrow, locale)}</p>
          <h2>{t(cvErvaring.titel, locale)}</h2>
          <p className="cv-section-lede">{t(cvErvaring.intro, locale)}</p>
        </header>
        <Tijdlijn rollen={cvRollen} locale={locale} />
      </section>

      <section className="cv-section" id="cv-opleiding">
        <header className="cv-section-head">
          <p className="label">{t(cvOpleiding.eyebrow, locale)}</p>
          <h2>{t(cvOpleiding.titel, locale)}</h2>
          <p className="cv-section-lede">{t(cvOpleiding.intro, locale)}</p>
        </header>
        <Tijdlijn rollen={cvStudies} locale={locale} />
      </section>

      <section className="cv-section" id="cv-vaardigheden">
        <header className="cv-section-head">
          <p className="label">{t(cvVaardigheden.eyebrow, locale)}</p>
          <h2>{t(cvVaardigheden.titel, locale)}</h2>
        </header>
        <div className="cv-grid-3">
          {cvVaardigheidsGroepen.map((groep, i) => (
            <div className="cv-card" key={`vaardigheid-${i}`}>
              <h3>{t(groep.titel, locale)}</h3>
              <ul className="cv-list">
                {groep.items.map((item, j) => (
                  <li key={`v-${i}-${j}`}>{t(item, locale)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section" id="cv-tools">
        <header className="cv-section-head">
          <p className="label">{t(cvTools.eyebrow, locale)}</p>
          <h2>{t(cvTools.titel, locale)}</h2>
        </header>
        <div className="cv-grid-2">
          {cvToolGroepen.map((groep, i) => (
            <div className="cv-card" key={`tool-${i}`}>
              <h3>{t(groep.titel, locale)}</h3>
              <ul className="cv-tags">
                {groep.items.map((item, j) => (
                  <li key={`t-${i}-${j}`}>{t(item, locale)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section" id="cv-zoek">
        <header className="cv-section-head">
          <p className="label">{t(cvZoek.eyebrow, locale)}</p>
          <h2>{t(cvZoek.titel, locale)}</h2>
          <p className="cv-section-lede">{t(cvZoek.intro, locale)}</p>
        </header>
        <div className="cv-grid-3">
          {cvZoek.items.map((item, i) => (
            <div className="cv-card" key={`zoek-${i}`}>
              <h3>{t(item.titel, locale)}</h3>
              <p>{t(item.tekst, locale)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section cv-contact" id="cv-contact">
        <header className="cv-section-head">
          <p className="label">{t(cvContact.eyebrow, locale)}</p>
          <h2>{t(cvContact.titel, locale)}</h2>
        </header>
        <dl className="cv-contact-grid">
          {cvContact.rijen.map((rij, i) => (
            <div key={`contact-${i}`}>
              <dt className="label">{t(rij.label, locale)}</dt>
              <dd>{rij.href ? <a href={rij.href}>{rij.waarde}</a> : rij.waarde}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
