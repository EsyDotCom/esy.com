'use client';
/* esy.com/scout/how-we-work/, three designs (2026-11-07, /prototypes/scout-methods/). Zev: the page's
 * words are right, the design can do better. One set of words (below), three shapes:
 *   commitments  M1 · Commitments  editorial: a sticky index that follows you, each rule a big statement
 *                                  with its detail beside it, the label key and the log at the end.
 *   split        M2 · Always / Never  a navy band of three promises, a two-column always / never split,
 *                                  the label key as a visual, a corrections panel with turnaround times.
 *   process      M3 · How a page is made  the process as four stages, public page → read and labelled →
 *                                  published → corrected, then the corrections process as a timeline.
 *   merge        M4 · Commitments + promises  M1 with M2's three promises as a navy panel under the
 *                                  headline (Zev's pick, round 2). */
import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Check, Mail, X } from 'lucide-react';
import corrections from '@/data/scout/corrections.json';
import { BasisChip } from './FunnelMap';
import { BASIS, type Basis } from './funnels';
import { CREATOR_LIST, SCOUT_CONTACT, correctionMail } from './creatorData';

export type MethodsTake = 'commitments' | 'split' | 'process' | 'merge';

type Correction = { date: string; creator: string; page: string | null; kind: string; what: string; why: string };
const LOG = corrections.entries as Correction[];
const day = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const KIND: Record<string, string> = { correction: 'Correction', 'photo-removed': 'Photo removed', 'page-removed': 'Page removed', update: 'Update' };
const UPDATED = '2026-11-07';

// ── The words, once ──────────────────────────────────────────────────────────────────────
const PROMISES = [
  { k: 'Public only', t: 'Only what creators have made public, read the way any visitor can.' },
  { k: 'Labelled', t: 'Every line says how we know it and the day we read it.' },
  { k: 'Correctable', t: `Spot something wrong? Write to ${SCOUT_CONTACT} and we’ll review it.` },
];
const ALWAYS = [
  'Read only public profiles, posts, link pages and offer pages',
  'Label every line: counted, seen, our reading, or not checked',
  'Date every page, every audience count and every price',
  'Mark a creator’s game plan as our reading, beside the facts behind it',
  'Use the same page for everyone, with an independence line and a correction link',
  'Mark links to the people we cover nofollow',
];
const NEVER = [
  'Publish anyone’s earnings, revenue or income',
  'Publish personal or family details, or anything outside their public business',
  'Sign up, buy, join private groups, or use anything behind a login or paywall',
  'Reproduce full posts, captions or transcripts',
  'Take payment to include, leave out or describe anyone; use affiliate links',
  'Put a creator’s name or face in our ads, sales emails or next to a sign-up form',
];
const EXAMPLES: Record<Basis, string> = {
  counted: '“12 of their last 12 posts ask for a comment”',
  seen: '“Maker School, $184/mo, on its own page”',
  reading: '“Their game plan: give the courses away, sell the community”',
  open: '“What the DM sends: needs a sign-up”',
};
const TURNAROUND = [
  { k: 'Factual errors', t: 'Reviewed; if we got something wrong, fixed within five business days and logged' },
  { k: 'Photos', t: 'The creator or their team can ask; we review each request' },
  { k: 'Personal information', t: 'Flag anything personal that shouldn’t be there; we review it promptly' },
  { k: 'A whole page', t: 'Tell us who you are and why; we evaluate each request' },
];
const STEPS = [
  { k: 'You write', t: `To ${SCOUT_CONTACT}, or with the link on any page (its name filled in).` },
  { k: 'We review', t: 'We look at who’s asking and what’s at issue, and check it against the page’s sources.' },
  { k: 'We fix what’s wrong', t: 'If we got something wrong, we fix it within five business days.' },
  { k: 'It’s logged', t: 'Any change, its date and the reason go in the public log below.' },
];

/** The paragraphs, keyed, for the takes that show them in full. */
const DETAIL: Record<string, ReactNode> = {
  what: <>Scout is editorial analysis, published as commentary for marketers and marketing engineers who want to learn how successful creators build their businesses. It covers {CREATOR_LIST.length} creators today, plus AI companies, and each page is built from that creator’s own study, not generated from a feed. It isn’t business, financial or legal advice.</>,
  sources: <>Only what a creator or company has made public: their public profiles and posts, the pages their links lead to, and their own offer and pricing pages. We read them the way any visitor can. When something needs a sign-up or a purchase to see, the line says <em>not checked</em> instead.</>,
  photos: <>We show each creator’s public profile picture, small, only to identify whose marketing a page studies. Faces never appear in our ads or sales emails, and never next to a sign-up form. If you’re the creator or represent them, you can ask us to remove your photo, and we’ll review the request.</>,
  independence: <>Scout isn’t affiliated with or endorsed by anyone it covers. No one pays to be in Scout, to be left out, or to be described a certain way, and it has no affiliate or sponsored links. Esy makes its own products for the same readers; we never compare a creator’s offers with ours on a Scout page.</>,
  dates: <>Every page shows the day we read the creator’s pages, and every audience count and price is as shown that day. A page’s date changes only when we read it again.</>,
};

// ── Shared pieces ────────────────────────────────────────────────────────────────────────
function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="ld ld--map-night has-band pf-page">
      <header className="ld-head">
        <Link className="fo-lockup ld-lockup" href="/scout/" aria-label="Scout"><span className="fo-wordmark">esy</span><span className="fo-lockup-sep" /><span className="fo-lockup-name">Scout</span></Link>
        <nav className="ld-head-nav" aria-label="Scout"><Link href="/scout/">The tool</Link><Link href="/scout/creators/">All creators</Link></nav>
        <Link className="fo-btn fo-btn--primary ld-head-cta" href="/scout/#join">Get the newsletter</Link>
      </header>
      <main className="ld-main">{children}</main>
    </div>
  );
}
const Crumbs = () => <nav className="pf-crumbs" aria-label="Breadcrumb"><Link href="/scout/"><ArrowLeft size={13} aria-hidden="true" />Scout</Link><span>/</span><span>How Scout works</span></nav>;
const MailBtn = ({ dark = false }: { dark?: boolean }) => <a className={`mt-mail ${dark ? 'is-dark' : ''}`} href={correctionMail()}><Mail size={16} aria-hidden="true" />{SCOUT_CONTACT}</a>;

function Labels() {
  return (
    <ul className="mt-labels">
      {(Object.keys(BASIS) as Basis[]).map((b) => (
        <li key={b}><BasisChip b={b} /><span className="mt-labels-says">{BASIS[b].says}</span><span className="mt-labels-eg">{EXAMPLES[b]}</span></li>
      ))}
    </ul>
  );
}
function Log() {
  return LOG.length === 0
    ? <p className="mt-log-empty"><Check size={16} aria-hidden="true" />No corrections yet. Every correction, photo removal and page removal will be listed here with its date.</p>
    : <ol className="mt-log">{LOG.map((e) => <li key={e.date + e.creator + e.what}><span>{day(e.date)}</span><span><b>{KIND[e.kind] ?? e.kind}: {e.creator}.</b> {e.what} <em>{e.why}</em></span></li>)}</ol>;
}
const SeeAlso = () => <p className="mt-see">See also our <Link href="/editorial-standards/">editorial standards</Link>, <Link href="/privacy/#scout">privacy policy</Link> and <Link href="/terms/#scout">terms</Link>. Updated {day(UPDATED)}.</p>;

// ── M1 · Commitments ─────────────────────────────────────────────────────────────────────
const COMMITMENTS = [
  { id: 'what', title: 'We study public business, not people.', body: DETAIL.what },
  { id: 'sources', title: 'We read only what’s public.', body: DETAIL.sources },
  { id: 'labels', title: 'Every line says how we know it.', body: <><p>A creator’s game plan is always our reading of the facts beside it: an opinion, labelled, so you can check it.</p><Labels /></> },
  { id: 'never', title: 'Some things we never publish.', body: <ul className="mt-x">{NEVER.map((n) => <li key={n}><X size={15} aria-hidden="true" />{n}</li>)}</ul> },
  { id: 'photos', title: 'Faces identify. They never sell.', body: DETAIL.photos },
  { id: 'independence', title: 'No one pays to be in Scout.', body: DETAIL.independence },
  { id: 'dates', title: 'Every number has a date.', body: DETAIL.dates },
  { id: 'corrections', title: 'You can ask us to correct it.', body: <><ul className="mt-turn">{TURNAROUND.map((r) => <li key={r.k}><b>{r.k}</b><span>{r.t}</span></li>)}</ul><MailBtn /></> },
  { id: 'log', title: 'Corrections log', body: <Log /> },
];

function Commitments({ promises = false }: { promises?: boolean }) {
  const [on, setOn] = useState('what');
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setOn(e.target.id); }), { rootMargin: '-30% 0px -60% 0px' });
    COMMITMENTS.forEach((c) => { const el = document.getElementById(c.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <div className="mt mt--c">
      <Crumbs />
      <header className="mt-c-head">
        <p className="fo-label">How Scout works</p>
        <h1 className="mt-h1">How we study creators, <em>and how to correct us.</em></h1>
        <p className="mt-lede">Scout is Esy’s independent analysis of how creators and AI companies market themselves. These are the rules every page follows.</p>
      </header>
      {/* M4: M2's three promises, as the page's summary, before the rules. */}
      {promises && <ol className="mt-promises mt-c-promises">{PROMISES.map((p, i) => <li key={p.k}><span>{i + 1}</span><b>{p.k}</b><p>{p.t}</p></li>)}</ol>}
      <div className="mt-c-grid">
        <nav className="mt-c-index" aria-label="On this page">
          <ol>{COMMITMENTS.map((c, i) => <li key={c.id}><a href={`#${c.id}`} className={on === c.id ? 'is-on' : ''}><span>{String(i + 1).padStart(2, '0')}</span>{c.title.replace(/\.$/, '')}</a></li>)}</ol>
          <MailBtn />
        </nav>
        <div className="mt-c-body">
          {COMMITMENTS.map((c, i) => (
            <section key={c.id} id={c.id} className="mt-c-sec">
              <span className="mt-c-n">{String(i + 1).padStart(2, '0')}</span>
              <h2>{c.title}</h2>
              <div className="mt-c-detail">{typeof c.body === 'string' ? <p>{c.body}</p> : c.id === 'labels' || c.id === 'never' || c.id === 'corrections' || c.id === 'log' ? c.body : <p>{c.body}</p>}</div>
            </section>
          ))}
          <SeeAlso />
        </div>
      </div>
    </div>
  );
}

// ── M2 · Always / Never ──────────────────────────────────────────────────────────────────
function Split() {
  return (
    <div className="mt mt--s">
      <section className="mt-s-band">
        <div className="mt-wrap">
          <Crumbs />
          <p className="fo-label">How Scout works</p>
          <h1 className="mt-h1">Three promises <em>behind every Scout page.</em></h1>
          <ol className="mt-promises">{PROMISES.map((p, i) => <li key={p.k}><span>{i + 1}</span><b>{p.k}</b><p>{p.t}</p></li>)}</ol>
        </div>
      </section>
      <div className="mt-wrap">
        <section className="mt-s-sec">
          <p className="mt-s-intro">{DETAIL.what}</p>
          <div className="mt-s-split">
            <div className="is-always"><h2><Check size={18} aria-hidden="true" />We always</h2><ul>{ALWAYS.map((a) => <li key={a}>{a}</li>)}</ul></div>
            <div className="is-never"><h2><X size={18} aria-hidden="true" />We never</h2><ul>{NEVER.map((n) => <li key={n}>{n}</li>)}</ul></div>
          </div>
        </section>
        <section className="mt-s-sec">
          <h2 className="mt-h2">How to read the labels</h2>
          <Labels />
        </section>
        <section className="mt-s-sec mt-s-three">
          <div><h3>Photos</h3><p>{DETAIL.photos}</p></div>
          <div><h3>Independence</h3><p>{DETAIL.independence}</p></div>
          <div><h3>Dates</h3><p>{DETAIL.dates}</p></div>
        </section>
        <section className="mt-s-sec mt-s-fix" id="corrections">
          <div>
            <h2 className="mt-h2">Spot something wrong? Tell us.</h2>
            <p>Every Scout page has a <em>Request a correction or removal</em> link with its name filled in. Or write directly:</p>
            <MailBtn dark />
          </div>
          <ul className="mt-turn is-dark">{TURNAROUND.map((r) => <li key={r.k}><b>{r.k}</b><span>{r.t}</span></li>)}</ul>
        </section>
        <section className="mt-s-sec" id="log"><h2 className="mt-h2">Corrections log</h2><Log /></section>
        <SeeAlso />
      </div>
    </div>
  );
}

// ── M3 · How a page is made ──────────────────────────────────────────────────────────────
const STAGES = [
  { k: 'A public page', t: 'We start from what the creator has made public.', d: DETAIL.sources },
  { k: 'Read and labelled', t: 'Every line gets a label and a date.', d: <><Labels /></> },
  { k: 'Published', t: 'One page per creator, the same for everyone.', d: <>{DETAIL.independence} {DETAIL.photos}</> },
  { k: 'Corrected', t: 'Anyone can ask us to fix or remove it.', d: <ul className="mt-turn">{TURNAROUND.map((r) => <li key={r.k}><b>{r.k}</b><span>{r.t}</span></li>)}</ul> },
];

function Process() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt mt--p">
      <Crumbs />
      <header className="mt-p-head">
        <p className="fo-label">How Scout works</p>
        <h1 className="mt-h1">How a Scout page <em>is made, and corrected.</em></h1>
        <p className="mt-lede">{DETAIL.what}</p>
      </header>
      <ol className="mt-stages" role="tablist" aria-label="How a page is made">
        {STAGES.map((s, i) => (
          <li key={s.k}>
            <button type="button" role="tab" aria-selected={open === i} className={open === i ? 'is-on' : ''} onClick={() => setOpen(i)}>
              <span className="mt-stage-n">{i + 1}</span><b>{s.k}</b><small>{s.t}</small>
            </button>
            {i < STAGES.length - 1 && <ArrowRight className="mt-stage-arrow" size={18} aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <div className="mt-stage-panel" role="tabpanel" key={open}>{typeof STAGES[open].d === 'string' ? <p>{STAGES[open].d}</p> : <div>{STAGES[open].d}</div>}</div>

      <section className="mt-p-sec">
        <h2 className="mt-h2">What we never publish</h2>
        <ul className="mt-x mt-x--grid">{NEVER.map((n) => <li key={n}><X size={15} aria-hidden="true" />{n}</li>)}</ul>
      </section>

      <section className="mt-p-sec" id="corrections">
        <h2 className="mt-h2">How a correction works</h2>
        <ol className="mt-timeline">{STEPS.map((s, i) => <li key={s.k}><span className="mt-tl-dot">{i + 1}</span><b>{s.k}</b><p>{s.t}</p></li>)}</ol>
        <MailBtn />
      </section>
      <section className="mt-p-sec" id="log"><h2 className="mt-h2">Corrections log</h2><Log /></section>
      <SeeAlso />
    </div>
  );
}

export function ScoutMethodsTake({ take }: { take: MethodsTake }) {
  return <Shell>{take === 'split' ? <Split /> : take === 'process' ? <Process /> : <Commitments promises={take === 'merge'} />}</Shell>;
}
