'use client';

/* Round 2 of /prototypes/newsletter-issue (2026-10-14): the upgraded issue,
   written for Morgan (the small-agency owner, primary ICP since 2026-10-14).
   The decision: how does one issue carry the tutorial AND the proof AND the
   agency payoff, without stopping being a tutorial you can follow?

   L4 · Build, then proof   The live L3 page, in the issue's order: the system
                            step by step, how Clay plugs into Esy, what it did
                            for us, how to sell it, the news, the scoreboard.
   L5 · Receipts first      The week's scoreboard sits on the cover, every step
                            carries its own number, and the Clay connection is
                            shown as os.esy.com's Outreach screen.
   L6 · Build it, sell it   Two columns: "Build it" (a flow from Clay to Esy,
                            then the steps) beside a sticky "Sell it" card
                            (the offer, the price, the math, the objection).

   All three read one sample (agency-issue.ts). The Clay connection is
   hypothetical and every number is os.esy.com's sample campaign; the page
   says so. No signup sends. */

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';
import SocialAvatar from '@/components/EducationHero/SocialAvatar';
import { ISSUES } from './issues';
import { AGENCY_ISSUE, type AgencySection, type AgencyStep, funnelN, spendTotal, usd } from './agency-issue';
import { CoursePromo } from './IssuePages';
import { IssueRow, NewsSection, PageSignup, useIssueHref, useNewsletterMode } from './shared';
import { PROMISE } from './Takes';

type Kind = AgencySection['kind'];
type Of<K extends Kind> = Extract<AgencySection, { kind: K }>;
const issue = AGENCY_ISSUE;
const part = <K extends Kind>(k: K) => issue.body.find((s) => s.kind === k) as Of<K>;
const fmt = (n: number) => n.toLocaleString('en-US');

const SAMPLE_LINE =
  'Prototype, round 2. The steps, Clay and os.esy.com are real; Esy’s Clay connection is hypothetical, every number is os.esy.com’s sample campaign, and the prices are examples.';

/* ── Shared pieces ───────────────────────────────────────────────────────── */

/* Three cover takes for No. 5 (2026-10-14), vinyl Mason acting out the title,
   made with scripts/newsletter-mason-cover.mjs (gpt-image-2.5 Sunburst, high,
   $0.055 a take, two takes each; the other take of each sits beside it in
   public/prototypes/newsletter-issue/covers/). Each shows one part of the
   system: finding them, writing to them, booking the call. */
const COVERS = [
  {
    key: 'find', name: 'Finding', src: '/prototypes/newsletter-issue/covers/5-find-a.webp', run: 'run-4aa271c9',
    alt: 'Mason the octopus on a rooftop at night, holding a lantern out over a small vinyl town where a few roofs glow teal.',
    caption: 'Mason’s lantern finds the few houses in town worth writing to.',
  },
  {
    key: 'send', name: 'Writing', src: '/prototypes/newsletter-issue/covers/5-send-b.webp', run: 'run-f773dbff',
    alt: 'Mason the octopus at a desk, taking small house-shaped cards from a tray, sealing them into glowing envelopes and posting them in a mailbox.',
    caption: 'Mason seals each business he picked into an envelope and posts it.',
  },
  {
    key: 'book', name: 'Booking', src: '/prototypes/newsletter-issue/covers/5-book-a.webp', run: 'run-f952ac44',
    alt: 'Mason the octopus at a desk on an old telephone, pressing a glowing peg into an appointment board on the wall.',
    caption: 'Mason takes the call and pegs the booking onto the board.',
  },
] as const;

/** The cover art under the band, with a prototype switch between the three takes. */
function CoverArt() {
  const [i, setI] = useState(0);
  const c = COVERS[i];
  return (
    <figure className="nlp-cover-art">
      <Image src={c.src} alt={c.alt} width={1536} height={864} priority sizes="(max-width: 1100px) 100vw, 1040px" />
      <figcaption>{c.caption}</figcaption>
      <div className="nla-cover-pick" role="group" aria-label="Cover take">
        <span>Cover</span>
        {COVERS.map((x, j) => (
          <button key={x.key} type="button" className={j === i ? 'is-on' : ''} aria-pressed={j === i} onClick={() => setI(j)}>
            {String.fromCharCode(65 + j)} · {x.name}
          </button>
        ))}
      </div>
    </figure>
  );
}

/** The navy cover band (L3's), then the cover art. */
function Cover({ children }: { children?: React.ReactNode }) {
  const { archive } = useNewsletterMode();
  return (
    <>
    <header className="nlp-cover has-art">
      <div className="nlp-cover-in">
        <Link href={archive} className="nlp-back nlp-back--dark"><ArrowLeft size={14} aria-hidden="true" /> All issues</Link>
        <div className="nlp-cover-grid">
          <span className="nlp-cover-n" aria-hidden="true">{String(issue.n).padStart(2, '0')}</span>
          <div>
            <p className="nlp-cover-kicker">The Marketing Engineer · No. {issue.n} · Oct 22, 2026 · {issue.minutes} min · For agencies</p>
            <h1 className="nlp-cover-title">
              <span className="nlp-title-part">Book calls for local clients:</span>
              <span className="nlp-title-part">outbound with Clay and Esy</span>
            </h1>
            <p className="nlp-cover-dek">{issue.dek}</p>
            <div className="nlp-cover-byline">
              <SocialAvatar frameClassName="nlp-cover-byline-photo" size={40} />
              <span className="nlp-cover-byline-text"><b>Zev Uhuru</b><span>Marketing engineer</span></span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </header>
    <CoverArt />
    </>
  );
}

function Lead() {
  return <>{part('lead').text.map((t, i) => <p key={i} className="nlp-p">{t}</p>)}</>;
}

/** Who does the step: you, Clay, Esy, or the hand-off between them. */
function Where({ w }: { w: AgencyStep['where'] }) {
  const tone = w === 'You' ? 'you' : w === 'Clay' ? 'clay' : 'esy';
  return <span className={`nla-where nla-where--${tone}`}>{w}</span>;
}

/** The steps as the tutorial reads: name, who runs it, what it does. */
function Steps({ proof = false }: { proof?: boolean }) {
  const s = part('system');
  return (
    <div className={`nla-steps${proof ? ' nla-steps--proof' : ''}`} id="system">
      <p className="nlp-h">{s.title}</p>
      <ol>
        {s.steps.map((st, i) => (
          <li key={st.name} className="nla-step">
            <span className="nla-step-n">{i + 1}</span>
            <div className="nla-step-main">
              <p className="nla-step-head"><b>{st.name}</b> <Where w={st.where} /></p>
              <p className="nla-step-does">{st.does}</p>
            </div>
            {proof && (
              <div className="nla-step-proof">
                {st.result ? (
                  <>
                    <span className="nla-proof-n">{st.result.n}</span>
                    {st.result.of && <span className="nla-proof-of">of {st.result.of}</span>}
                    <span className="nla-proof-note">{st.result.note}</span>
                  </>
                ) : (
                  <span className="nla-proof-note">Rules v3, from 3 won and 5 lost</span>
                )}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** How Clay plugs into Esy, in words, with what each side keeps. */
function ConnectBox() {
  const c = part('connect');
  return (
    <div className="nla-connect" id="connect">
      <p className="nlp-h">{c.title}</p>
      <dl className="nla-connect-lines">
        {c.lines.map((l) => (
          <div key={l.label}><dt>{l.label}</dt><dd>{l.text}</dd></div>
        ))}
      </dl>
      <Keeps />
      <p className="nla-hypo">{c.note}</p>
    </div>
  );
}

function Keeps() {
  const { keeps } = part('connect');
  return (
    <div className="nla-keeps">
      <div><p className="nla-keeps-h"><Where w="Clay" /> keeps</p><ul>{keeps.clay.map((k) => <li key={k}>{k}</li>)}</ul></div>
      <div><p className="nla-keeps-h"><Where w="Esy" /> keeps</p><ul>{keeps.esy.map((k) => <li key={k}>{k}</li>)}</ul></div>
    </div>
  );
}

/** The connection as os.esy.com would show it: a mock of Outreach with sample
    rows (sample businesses, finders and costs). */
function ConnectWindow() {
  const c = part('connect');
  const rows = [
    { name: 'Bluebonnet Roofing', city: 'Austin', why: 'Hail on Oct 9; no storm-repair page', src: 'Clay · Prospeo', cost: '$0.29' },
    { name: 'Kestrel Roof & Gutter', city: 'Dallas', why: 'Offers metal roofs; no page for them', src: 'Clay · Hunter', cost: '$0.07' },
    { name: 'Lone Oak Roofing', city: 'San Antonio', why: '3 reviews ask about financing', src: 'Clay · Apollo', cost: '$0.15' },
  ];
  return (
    <div className="nla-connect" id="connect">
      <p className="nlp-h">{c.title}</p>
      <p className="nlp-p">{c.lines[0].text}</p>
      <figure className="nla-win" aria-label="A mock of Outreach in os.esy.com receiving rows from Clay">
        <div className="nla-win-bar"><span /><span /><span /><b>os.esy.com/agency/outreach</b></div>
        <div className="nla-win-body">
          <div className="nla-win-head">
            <span className="nla-win-title">Outreach · Roofers in Texas</span>
            <span className="nla-win-conn"><i aria-hidden="true" /> Clay table connected · 3 new rows</span>
          </div>
          <p className="nla-win-col">To reach <span>Found and checked. Not emailed yet.</span></p>
          <ul className="nla-win-rows">
            {rows.map((r) => (
              <li key={r.name}>
                <span className="nla-win-name">{r.name}<small>{r.city}</small></span>
                <span className="nla-win-why">{r.why}</span>
                <span className="nla-win-src">{r.src} · {r.cost}</span>
                <span className="nla-win-act">Approve</span>
              </li>
            ))}
          </ul>
          <p className="nla-win-foot">Campaign spend {usd(spendTotal)} of $150 · Clay data {usd(38.4)}</p>
        </div>
      </figure>
      <dl className="nla-connect-lines">
        {c.lines.slice(1).map((l) => (
          <div key={l.label}><dt>{l.label}</dt><dd>{l.text}</dd></div>
        ))}
      </dl>
      <p className="nla-hypo">{c.note} The screen is a mock with sample rows.</p>
    </div>
  );
}

/** The connection as a flow: Clay's half, the hand-off, Esy's half. */
function ConnectFlow() {
  const c = part('connect');
  return (
    <div className="nla-connect" id="connect">
      <p className="nlp-h">{c.title}</p>
      <div className="nla-flow" role="img" aria-label="Google Maps into a Clay table, through research and email finders, then into Esy's Outreach: sign-off, send, replies, calls.">
        <div className="nla-flow-side nla-flow-side--clay">
          <p className="nla-flow-label"><Where w="Clay" /></p>
          <ol>
            <li>Google Maps search</li>
            <li>Rules as filters</li>
            <li>Research agent: why now</li>
            <li>Email waterfall + check</li>
          </ol>
        </div>
        <div className="nla-flow-hand" aria-hidden="true"><ArrowRight size={18} /><span>approved rows, with sources and cost</span></div>
        <div className="nla-flow-side nla-flow-side--esy">
          <p className="nla-flow-label"><Where w="Esy" /></p>
          <ol>
            <li>To reach</li>
            <li>Scout drafts, you sign off</li>
            <li>Sent in their morning</li>
            <li>Replies, calls, client</li>
          </ol>
        </div>
      </div>
      <Keeps />
      <p className="nla-hypo">{c.note}</p>
    </div>
  );
}

/** What it did for us: the funnel as bars (log-ish widths so 1 still shows), and the spend. */
function Results({ withFunnel = true }: { withFunnel?: boolean }) {
  const r = part('results');
  const top = r.funnel[0].n;
  return (
    <div className="nla-results" id="results">
      <p className="nlp-h">{withFunnel ? r.title : 'What it cost us'}</p>
      {withFunnel && (
        <ol className="nla-funnel">
          {r.funnel.map((f) => (
            <li key={f.label}>
              <span className="nla-funnel-label">{f.label}</span>
              <span className="nla-funnel-bar"><i style={{ width: `${Math.max(2, (Math.log10(f.n + 1) / Math.log10(top + 1)) * 100).toFixed(1)}%` }} /></span>
              <span className="nla-funnel-n">{fmt(f.n)}</span>
            </li>
          ))}
        </ol>
      )}
      <table className="nla-spend">
        <tbody>
          {r.spend.map((s) => <tr key={s.label}><td>{s.label}</td><td>{usd(s.usd)}</td></tr>)}
          <tr className="nla-spend-total"><td>Total</td><td>{usd(spendTotal)}</td></tr>
          <tr><td>Per reply</td><td>{usd(spendTotal / funnelN('Replied'))}</td></tr>
          <tr><td>Per client</td><td>{usd(spendTotal / funnelN('Became a client'))}</td></tr>
        </tbody>
      </table>
      <p className="nlp-p nla-lesson">{r.lesson}</p>
    </div>
  );
}

/** Sell it to your clients: the offer, what's in it, example prices, the math, the objection. */
function Clients({ card = false }: { card?: boolean }) {
  const c = part('clients');
  return (
    <div className={`nla-clients${card ? ' nla-clients--card' : ''}`} id="clients">
      <p className="nla-clients-kicker">For your clients</p>
      <p className="nlp-h">{c.offer}</p>
      <ul className="nla-includes">{c.includes.map((x) => <li key={x}>{x}</li>)}</ul>
      <div className="nla-price">
        {c.price.map((p) => <div key={p.label}><span>{p.label}</span><b>{p.value}</b></div>)}
      </div>
      <p className="nla-price-note">Example prices, for a shape to start from.</p>
      <ul className="nla-math">{c.math.map((m) => <li key={m}>{m}</li>)}</ul>
      <div className="nla-objection"><b>{c.objection.q}</b> {c.objection.a}</div>
    </div>
  );
}

function Take() {
  const t = part('take');
  const [copied, setCopied] = useState(false);
  return (
    <div className="nlp-take" id="take">
      <p className="nlp-h">{t.title}</p>
      <p className="nlp-p">{t.what}</p>
      <button type="button" className="nlp-take-btn" onClick={() => setCopied(true)}>
        <Copy size={14} aria-hidden="true" /> {copied ? 'Sample: the real issue copies it' : t.label}
      </button>
    </div>
  );
}

function Reads() {
  const r = part('reads');
  return (
    <div className="nlp-reads">
      <p className="nlp-h">Worth your time</p>
      <ul>{r.items.map((x) => <li key={x.title}><a href={x.href}>{x.title}</a>: {x.why}</li>)}</ul>
    </div>
  );
}

/** This week's numbers, with the running total. `tone` dark sits on the cover. */
function Scoreboard({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const s = part('scoreboard');
  return (
    <div className={`nla-score nla-score--${tone}`} id="scoreboard">
      <p className="nla-score-h">Our scoreboard · {s.week}</p>
      <ul>
        {s.rows.map((r) => (
          <li key={r.label}>
            <b>{fmt(r.week)}</b>
            <span>{r.label}</span>
            <small>{fmt(r.total)} so far</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Next() {
  const n = part('next');
  return <p className="nlp-next">{n.text} <a href={n.href}>{n.cta} <ArrowRight size={13} aria-hidden="true" /></a></p>;
}

function Sign() {
  return <p className="nlp-sign"><SocialAvatar frameClassName="nlp-sign-photo" size={40} />Zev</p>;
}

/** The foot every take shares: the course, the signup band, the other issues. */
function Foot() {
  const href = useIssueHref();
  return (
    <>
      <section className="nlp-band">
        <div className="nlp-band-in">
          <div>
            <p className="nlp-band-title">Get the next issue in your inbox.</p>
            <p className="nlp-band-sub">{PROMISE}</p>
          </div>
          <PageSignup tone="dark" form="issue-band" />
        </div>
      </section>
      <section className="nlp-wrap">
        <p className="nlp-label">More issues</p>
        <div className="nlp-list">{ISSUES.map((i) => <IssueRow key={i.n} issue={i} href={href} />)}</div>
        <p className="nlp-sample">{SAMPLE_LINE}</p>
      </section>
    </>
  );
}

/* ── L4 · Build, then proof ──────────────────────────────────────────────── */
export function IssueBuildProof() {
  return (
    <main className="nlp">
      <Cover />
      <article className="nlp-letter nlp-letter--cover">
        <Lead />
        <Steps />
        <ConnectBox />
        <Results />
        <Clients />
        <Take />
        <NewsSection slugs={part('news').slugs} />
        <Reads />
        <Scoreboard />
        <Next />
        <Sign />
        <CoursePromo />
      </article>
      <Foot />
    </main>
  );
}

/* ── L5 · Receipts first ─────────────────────────────────────────────────── */
export function IssueReceipts() {
  return (
    <main className="nlp">
      <Cover><Scoreboard tone="dark" /></Cover>
      <article className="nlp-letter nlp-letter--cover nla-wide">
        <Lead />
        <Steps proof />
        <ConnectWindow />
        <Results withFunnel={false} />
        <Clients card />
        <Take />
        <NewsSection slugs={part('news').slugs} />
        <Reads />
        <Next />
        <Sign />
        <CoursePromo />
      </article>
      <Foot />
    </main>
  );
}

/* ── L6 · Build it, sell it ──────────────────────────────────────────────── */
export function IssueBuildSell() {
  return (
    <main className="nlp">
      <Cover />
      <div className="nla-split">
        <article className="nla-split-main">
          <Lead />
          <p className="nla-track">Build it</p>
          <ConnectFlow />
          <Steps />
          <Take />
          <Results />
        </article>
        <aside className="nla-split-side">
          <p className="nla-track">Sell it</p>
          <Clients card />
          <Scoreboard />
        </aside>
      </div>
      <div className="nlp-letter nla-after">
        <NewsSection slugs={part('news').slugs} />
        <Reads />
        <Next />
        <Sign />
        <CoursePromo />
      </div>
      <Foot />
    </main>
  );
}
