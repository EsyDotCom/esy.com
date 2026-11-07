'use client';

/* esy.com/terms (2026-11-06), in /privacy's design (P1 "The short version"): the promise and six
   plain points, then the full terms with a contents list that follows you, each section opening with
   its one-line answer. Text in terms.ts; the section renderer is shared with /privacy. */

import { Mail, ShieldCheck } from 'lucide-react';
import { Body, useActive } from './PrivacyTakes';
import { COMPANY, CONTACT } from './policy';
import { TERMS, TERMS_PROMISE, TERMS_SHORT, TERMS_UPDATED } from './terms';
import './privacy.css';

const IDS = TERMS.map((s) => s.id);

export function TermsPage() {
  const active = useActive(IDS);
  return (
    <div className="pv pv--short">
      <header className="pv-head">
        <p className="pv-kicker">Terms of service</p>
        <h1 className="pv-h1">The terms, in plain words</h1>
        <p className="pv-promise">{TERMS_PROMISE}</p>
        <p className="pv-meta"><span>Updated {TERMS_UPDATED}</span><span>{COMPANY.name}</span></p>
      </header>

      <section className="pv-short" aria-labelledby="tm-short-h">
        <h2 id="tm-short-h" className="pv-h2">The short version</h2>
        <ol className="pv-short-grid">
          {TERMS_SHORT.map((x, i) => <li key={x.title}><span className="pv-n">{i + 1}</span><b>{x.title}</b><p>{x.text}</p></li>)}
        </ol>
      </section>

      <div className="pv-doc">
        <nav className="pv-toc" aria-label="Sections">
          <p className="pv-toc-h">The full terms</p>
          <ol>{TERMS.map((s, i) => <li key={s.id}><a href={`#${s.id}`} className={active === s.id ? 'is-on' : ''}><span>{i + 1}</span>{s.title}</a></li>)}</ol>
          <div className="pv-choices is-compact">
            <p className="pv-choices-h"><ShieldCheck size={16} aria-hidden="true" />Questions?</p>
            <a className="pv-btn pv-btn--ghost" href={`mailto:${CONTACT}?subject=Terms`}><Mail size={15} aria-hidden="true" />{CONTACT}</a>
          </div>
        </nav>
        <article className="pv-article">
          {TERMS.map((s, i) => (
            <section key={s.id} id={s.id} className="pv-sec">
              <h2 className="pv-h2"><span className="pv-sec-n">{i + 1}</span>{s.title}</h2>
              <p className="pv-answer">{s.short}</p>
              <Body blocks={s.body} />
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
