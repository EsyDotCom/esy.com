'use client';

/* esy.com/privacy, three designs of the same rewritten policy (2026-11-06, /prototypes/privacy/).
   The decision: how should the privacy page read, so a person gets the answer they came for fast and
   the full text is still all there?
     P1 The short version  The promise and six plain points first, then the full policy with a
                           sticky contents rail; every section opens with its one-line answer.
     P2 What you did       Start from the reader's situation (reading, subscribing, asking for a map,
                           using an app, being in Scout): pick one, see exactly what we keep and how to
                           stop. The full text sits below as numbered, expandable sections.
     P3 Annotated          The full policy as a document, with a plain-English note beside every
                           section in the margin and a "Your choices" card that stays in view.
   All three share the text (policy.ts), the Cookie settings button and the contact card. */

import { useEffect, useState } from 'react';
import { ChevronDown, Cookie, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { COMPANY, CONTACT, PROMISE, SECTIONS, SHORT, SITUATIONS, UPDATED, openCookieSettings, type Block, type Situation } from './policy';
import './privacy.css';

export type PrivacyTake = 'short' | 'situations' | 'annotated';

// ── Shared pieces ─────────────────────────────────────────────────────────────

function Head({ kicker }: { kicker?: string }) {
  return (
    <header className="pv-head">
      <p className="pv-kicker">{kicker ?? 'Privacy policy'}</p>
      <h1 className="pv-h1">Your information, in plain words</h1>
      <p className="pv-promise">{PROMISE}</p>
      <p className="pv-meta"><span>Updated {UPDATED}</span><span>{COMPANY.name}</span></p>
    </header>
  );
}

export const Address = () => (
  <address className="pv-address"><b>{COMPANY.name}</b>{COMPANY.lines.map((l) => <span key={l}>{l}</span>)}</address>
);

/** One situation as a small table: what we keep, why, who helps, how long, how to stop. */
function SituationFacts({ s }: { s: Situation }) {
  return (
    <dl className="pv-facts">
      <div><dt>What we keep</dt><dd><ul>{s.keep.map((k) => <li key={k}>{k}</li>)}</ul></dd></div>
      <div><dt>Why</dt><dd>{s.why}</dd></div>
      <div><dt>Who helps us</dt><dd>{s.helpers}</dd></div>
      <div><dt>How long</dt><dd>{s.howLong}</dd></div>
      <div><dt>How to stop</dt><dd>{s.stop}</dd></div>
    </dl>
  );
}

export function Body({ blocks, situations = 'list' }: { blocks: Block[]; situations?: 'list' | 'none' }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (typeof b === 'string') return <p key={i}>{b}</p>;
        if ('list' in b) return <ul key={i} className="pv-list">{b.list.map((x) => <li key={x}>{x}</li>)}</ul>;
        if ('address' in b) return <Address key={i} />;
        if (situations === 'none') return null;
        return (
          <div key={i} className="pv-sits">
            {SITUATIONS.map((s) => <div key={s.id} className="pv-sit"><h4>{s.you}</h4><SituationFacts s={s} /></div>)}
          </div>
        );
      })}
    </>
  );
}

/** The two things every reader may want to do right now. */
function Choices({ compact }: { compact?: boolean }) {
  return (
    <div className={`pv-choices ${compact ? 'is-compact' : ''}`}>
      <p className="pv-choices-h"><ShieldCheck size={16} aria-hidden="true" />Your choices</p>
      <button type="button" className="pv-btn" onClick={openCookieSettings}><Cookie size={15} aria-hidden="true" />Cookie settings</button>
      <a className="pv-btn pv-btn--ghost" href={`mailto:${CONTACT}?subject=My%20information`}><Mail size={15} aria-hidden="true" />Ask for a copy or deletion</a>
      <p className="pv-choices-note">Every newsletter email has an unsubscribe link. Write to <a href={`mailto:${CONTACT}`}>{CONTACT}</a> for anything else.</p>
    </div>
  );
}

/** Which section is on screen, for a contents list that follows the reader. */
export function useActive(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver((entries) => {
      const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (seen[0]) setActive(seen[0].target.id);
    }, { rootMargin: '-15% 0px -70% 0px' });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

// ── P1 · The short version ────────────────────────────────────────────────────

function ShortVersion() {
  const ids = SECTIONS.map((s) => s.id);
  const active = useActive(ids);
  return (
    <div className="pv pv--short">
      <Head />
      <section className="pv-short" aria-labelledby="pv-short-h">
        <h2 id="pv-short-h" className="pv-h2">The short version</h2>
        <ol className="pv-short-grid">
          {SHORT.map((x, i) => <li key={x.title}><span className="pv-n">{i + 1}</span><b>{x.title}</b><p>{x.text}</p></li>)}
        </ol>
      </section>
      <div className="pv-doc">
        <nav className="pv-toc" aria-label="Sections">
          <p className="pv-toc-h">The full policy</p>
          <ol>{SECTIONS.map((s, i) => <li key={s.id}><a href={`#${s.id}`} className={active === s.id ? 'is-on' : ''}><span>{i + 1}</span>{s.title}</a></li>)}</ol>
          <Choices compact />
        </nav>
        <article className="pv-article">
          {SECTIONS.map((s, i) => (
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

// ── P2 · What you did ─────────────────────────────────────────────────────────

function WhatYouDid() {
  const [sit, setSit] = useState(SITUATIONS[0].id);
  const [open, setOpen] = useState<string | null>(null);
  const s = SITUATIONS.find((x) => x.id === sit)!;
  return (
    <div className="pv pv--sits">
      <Head kicker="Privacy policy · start with what you did" />
      <section className="pv-pick" aria-labelledby="pv-pick-h">
        <h2 id="pv-pick-h" className="pv-h2">What did you do?</h2>
        <div className="pv-pick-tabs" role="tablist">
          {SITUATIONS.map((x) => <button key={x.id} role="tab" aria-selected={x.id === sit} className={x.id === sit ? 'is-on' : ''} onClick={() => setSit(x.id)}>{x.you}</button>)}
        </div>
        <div className="pv-pick-panel" role="tabpanel" aria-label={s.you}>
          <h3>{s.you}</h3>
          <SituationFacts s={s} />
        </div>
      </section>
      <section className="pv-short pv-short--row" aria-label="The short version">
        {SHORT.map((x) => <p key={x.title}><b>{x.title}.</b> {x.text}</p>)}
      </section>
      <section className="pv-accordion" aria-labelledby="pv-full-h">
        <div className="pv-accordion-head">
          <h2 id="pv-full-h" className="pv-h2">The full policy</h2>
          <button type="button" className="pv-textbtn" onClick={() => setOpen(open === 'all' ? null : 'all')}>{open === 'all' ? 'Close all' : 'Open all'}</button>
        </div>
        {SECTIONS.map((x, i) => {
          const on = open === 'all' || open === x.id;
          return (
            <div key={x.id} id={x.id} className={`pv-acc ${on ? 'is-open' : ''}`}>
              <button type="button" className="pv-acc-head" aria-expanded={on} onClick={() => setOpen(on && open !== 'all' ? null : x.id)}>
                <span className="pv-sec-n">{i + 1}</span>
                <span className="pv-acc-title"><b>{x.title}</b><small>{x.short}</small></span>
                <ChevronDown size={18} aria-hidden="true" />
              </button>
              {on && <div className="pv-acc-body"><Body blocks={x.body} situations={x.id === 'collect' ? 'none' : 'list'} />{x.id === 'collect' && <p className="pv-see-above">Each situation is laid out under “What did you do?” above.</p>}</div>}
            </div>
          );
        })}
      </section>
      <div className="pv-foot-choices"><Choices /></div>
    </div>
  );
}

// ── P3 · Annotated ────────────────────────────────────────────────────────────

function Annotated() {
  return (
    <div className="pv pv--notes">
      <Head kicker="Privacy policy · with notes in the margin" />
      <div className="pv-notes-doc">
        <article>
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} className="pv-note-row">
              <div className="pv-note-text">
                <h2 className="pv-h2"><span className="pv-sec-n">{i + 1}</span>{s.title}</h2>
                <Body blocks={s.body} />
              </div>
              <aside className="pv-note"><span>In short</span>{s.short}</aside>
            </section>
          ))}
        </article>
        <div className="pv-notes-rail"><Choices /><p className="pv-rail-addr"><MapPin size={14} aria-hidden="true" />{COMPANY.name}, Dover, Delaware</p></div>
      </div>
    </div>
  );
}

export function PrivacyPage({ take }: { take: PrivacyTake }) {
  if (take === 'situations') return <WhatYouDid />;
  if (take === 'annotated') return <Annotated />;
  return <ShortVersion />;
}
