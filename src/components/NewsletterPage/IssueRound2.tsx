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
   says so. No signup sends.

   L5 is the live issue page (2026-10-15): /newsletter/<slug>/ renders
   IssueReceipts with a real issue. Every piece reads the issue from context
   and draws nothing when the issue lacks its part, so an issue written before
   the template's v2 (no results, clients or scoreboard) still reads whole.

   The weekly issue (template v3, api.esy.com #645, 2026-11-14) reads as
   Compose's N12, which Zev picked: the scoreboard under the title, then the
   lead, the news (each post with a line of ours), The System (written out in
   Markdown, steps, or both), The Study, The Skill, the sponsor, next week, and
   any older parts after. Older issues keep L5's order unchanged. */

import Image from 'next/image';
import Link from 'next/link';
import { relFor } from '@/lib/outbound';
import { createContext, useContext, useState } from 'react';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';
import SocialAvatar from '@/components/EducationHero/SocialAvatar';
import { type IssueSponsor, type IssueStep, isWeeklyIssue } from './issues';
import { IssueMarkdown } from './IssueMarkdown';
import { AGENCY_ISSUE, type AgencyIssue, type AgencySection, usd } from './agency-issue';
import { CoursePromo, TitleLines } from './IssuePages';
import { IssueRow, NewsSection, PageSignup, SampleNote, useCover, useDateLabel, useIssueHref, useIssues, useNewsletterMode } from './shared';
import { PROMISE } from './Takes';

type Kind = AgencySection['kind'];
type Of<K extends Kind> = Extract<AgencySection, { kind: K }>;

/* The issue on this page: the round-2 sample in the prototypes, a real issue
   on /newsletter/<slug>/. A live Issue is a narrower AgencyIssue (it never has
   the sample's Clay connection), so one context serves both. */
const IssueCtx = createContext<AgencyIssue>(AGENCY_ISSUE);
const useIssue = () => useContext(IssueCtx);
/** One part of the issue, or undefined when the issue doesn't have it. */
function usePart<K extends Kind>(k: K): Of<K> | undefined {
  return useIssue().body.find((s) => s.kind === k) as Of<K> | undefined;
}
/** True when the steps carry their own numbers (L5's proof column). */
function useStepsHaveProof() {
  return !!usePart('system')?.steps.some((st) => st.result);
}
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
function CoverPicker() {
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

/** The issue's own cover, shown whole under the band (as L3 does). */
function CoverArt() {
  const issue = useIssue();
  const cover = useCover()(issue);
  if (!cover) return null;
  return (
    <figure className="nlp-cover-art">
      <Image src={cover} alt={issue.coverAlt ?? ''} width={1536} height={864} priority sizes="(max-width: 1100px) 100vw, 1040px" />
      {issue.coverCaption && <figcaption>{issue.coverCaption}</figcaption>}
    </figure>
  );
}

/** The navy cover band (L3's), then the cover art. The prototypes keep the
    three-cover switch for No. 5; the live page shows the issue's cover. */
function Cover({ children }: { children?: React.ReactNode }) {
  const issue = useIssue();
  const { archive, live } = useNewsletterMode();
  const dateLabel = useDateLabel();
  // An issue with a "Sell it to your clients" part is written for agencies.
  const forAgencies = !!usePart('clients');
  return (
    <>
    <header className={`nlp-cover${issue.cover ? ' has-art' : ''}`}>
      <div className="nlp-cover-in">
        <Link href={archive} className="nlp-back nlp-back--dark"><ArrowLeft size={14} aria-hidden="true" /> All issues</Link>
        <div className="nlp-cover-grid">
          <span className="nlp-cover-n" aria-hidden="true">{String(issue.n).padStart(2, '0')}</span>
          <div>
            <p className="nlp-cover-kicker">
              The Marketing Engineer · No. {issue.n} · {dateLabel(issue)} · {issue.minutes} min{forAgencies && ' · For agencies'}
            </p>
            <h1 className="nlp-cover-title"><TitleLines title={issue.title} /></h1>
            <p className="nlp-cover-dek">{issue.dek}</p>
            {/* A sample issue says so up top, before any of its numbers. */}
            {issue.sample && <p className="nlp-cover-sample">{issue.sample}</p>}
            <div className="nlp-cover-byline">
              <SocialAvatar frameClassName="nlp-cover-byline-photo" size={40} />
              <span className="nlp-cover-byline-text"><b>Zev Uhuru</b><span>Marketing engineer</span></span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </header>
    {/* The three-cover switch belongs to the round-2 sample only; any other issue shows its own cover. */}
    {!live && issue === AGENCY_ISSUE ? <CoverPicker /> : <CoverArt />}
    </>
  );
}

function Lead() {
  const lead = usePart('lead');
  return <>{lead?.text.map((t, i) => <p key={i} className="nlp-p">{t}</p>)}</>;
}

/** Who does the step: you, a tool (Clay), Esy, or the hand-off into Esy. */
function Where({ w }: { w: string }) {
  const tone = w === 'You' ? 'you' : w.includes('Esy') ? 'esy' : 'tool';
  return <span className={`nla-where nla-where--${tone}`}>{w}</span>;
}

/** The steps as the tutorial reads: name, who runs it, what it does. */
function Steps({ proof = false }: { proof?: boolean }) {
  const s = usePart('system');
  if (!s) return null;
  return (
    <div className={`nla-steps${proof ? ' nla-steps--proof' : ''}`} id="system">
      <p className="nlp-h">{s.title}</p>
      <StepList steps={s.steps} proof={proof} />
    </div>
  );
}

/** The numbered steps themselves, shared by L5's system and the weekly System. */
function StepList({ steps, proof }: { steps: IssueStep[]; proof: boolean }) {
  return (
      <ol>
        {steps.map((st, i) => (
          <li key={st.name} className="nla-step">
            <span className="nla-step-n">{i + 1}</span>
            <div className="nla-step-main">
              <p className="nla-step-head"><b>{st.name}</b>{st.where && <> <Where w={st.where} /></>}</p>
              <p className="nla-step-does">{st.does}</p>
            </div>
            {proof && (
              <div className="nla-step-proof">
                {st.result && <StepResult r={st.result} />}
              </div>
            )}
          </li>
        ))}
      </ol>
  );
}

function StepResult({ r }: { r: NonNullable<IssueStep['result']> }) {
  return (
    <>
      {r.n && <span className="nla-proof-n">{r.n}</span>}
      {r.of && <span className="nla-proof-of">of {r.of}</span>}
      <span className="nla-proof-note">{r.note}</span>
    </>
  );
}

/** How Clay plugs into Esy, in words, with what each side keeps. */
function ConnectBox() {
  const c = usePart('connect');
  if (!c) return null;
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
  const c = usePart('connect');
  if (!c) return null;
  const { keeps } = c;
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
  const c = usePart('connect');
  const spend = spendOf(usePart('results'));
  if (!c) return null;
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
          <p className="nla-win-foot">Campaign spend {usd(spend)} of $150 · Clay data {usd(38.4)}</p>
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
  const c = usePart('connect');
  if (!c) return null;
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

const spendOf = (r?: Of<'results'>) => (r ? r.spend.reduce((n, s) => n + s.usd, 0) : 0);

/** What it did for us: the funnel as bars (log-ish widths so 1 still shows), and the spend. */
function Results({ withFunnel = true }: { withFunnel?: boolean }) {
  const r = usePart('results');
  if (!r) return null;
  const top = r.funnel[0]?.n ?? 0;
  const total = spendOf(r);
  const funnelN = (label: string) => r.funnel.find((f) => f.label === label)?.n ?? 0;
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
          <tr className="nla-spend-total"><td>Total</td><td>{usd(total)}</td></tr>
          {r.per?.filter((p) => funnelN(p.funnel) > 0).map((p) => (
            <tr key={p.label}><td>{p.label}</td><td>{usd(total / funnelN(p.funnel))}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="nlp-p nla-lesson">{r.lesson}</p>
    </div>
  );
}

/** Sell it to your clients: the offer, what's in it, example prices, the math, the objection. */
function Clients({ card = false }: { card?: boolean }) {
  const c = usePart('clients');
  if (!c) return null;
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

/** The weekly skill (the template's `skill` part, 2026-10-15): the same
    kicker every week, then this week's skill by name. */
function Take() {
  const t = usePart('take');
  const [copied, setCopied] = useState(false);
  if (!t) return null;
  return (
    <div className="nlp-take" id="take">
      <p className="nla-take-kicker">The weekly skill</p>
      <p className="nlp-h">{t.title}</p>
      <p className="nlp-p">{t.what}</p>
      {/* A skill written in Compose is copied for real; the samples only say what would happen. */}
      <button
        type="button"
        className="nlp-take-btn"
        onClick={() => {
          if (t.skill) navigator.clipboard?.writeText(t.skill).catch(() => {});
          setCopied(true);
        }}
      >
        <Copy size={14} aria-hidden="true" /> {copied ? (t.skill ? 'Copied' : 'Sample: the real issue copies it') : t.label}
      </button>
    </div>
  );
}

function News() {
  const n = usePart('news');
  return n ? <NewsSection slugs={n.slugs} lines={n.lines} /> : null;
}

/* ── The weekly issue (template v3, Compose's N12) ───────────────────────── */

/** The System, weekly: its kicker and heading, the body written out (Markdown,
    read strictly), the steps when it has them, and, on weeks the sponsor's
    tool is genuinely The System's job, their words closing it. */
function WeeklySystem() {
  const s = usePart('system');
  const sponsor = usePart('sponsor');
  if (!s) return null;
  const proof = s.steps.some((st) => st.result);
  return (
    <section className="nlw-sec nlw-system" id="system">
      <p className="nla-take-kicker">The System</p>
      <h2 className="nlw-h">{s.title}</h2>
      {s.body?.trim() && <IssueMarkdown text={s.body} />}
      {s.steps.length > 0 && (
        <div className={`nla-steps${proof ? ' nla-steps--proof' : ''}`}>
          <StepList steps={s.steps} proof={proof} />
        </div>
      )}
      {sponsor && closesSystem(sponsor) && <SponsorClose s={sponsor} />}
    </section>
  );
}

/** True when the sponsor's words end The System (placement "system", with
    words to show). Otherwise the sponsor gets the full box in its slot, so the
    slot never points back at nothing. */
const closesSystem = (s: IssueSponsor) => s.placement === 'system' && !!(s.text || s.headline);

// The sponsor's label and line, as Esy worded them. Esy never sends them blank
// (sponsor_label / sponsor_line); the fallbacks only guard the disclosure, which
// must never be missing from the page.
const sponsorLabel = (s: IssueSponsor) => s.label || (s.format === 'tutorial' ? 'Sponsored tutorial' : 'Sponsor');
const sponsorLine = (s: IssueSponsor) => s.line || `This issue is sponsored by ${s.name || 'our sponsor'}.`;
/** The button's link: Esy already tagged it with ?src=…, so it's used as given; only https is followed. */
const sponsorHref = (s: IssueSponsor) => (/^https:\/\//i.test(s.href) ? s.href : '');
/** A paid sponsor's link says so to search engines; our own product's doesn't need to. */
const sponsorRel = (s: IssueSponsor, href: string) => relFor(href, { extra: s.own ? '' : 'sponsored' });

/** The sponsor's words at the end of The System, under "Where {name} comes in". */
function SponsorClose({ s }: { s: IssueSponsor }) {
  const href = sponsorHref(s);
  const name = s.name || 'our sponsor';
  return (
    <aside className="nlw-close" aria-label={sponsorLabel(s)}>
      <p className="nlw-close-h">Where {name} comes in</p>
      <p className="nlw-close-p">{s.text || s.headline}</p>
      {href && (
        <a className="nlw-sp-cta" href={href} rel={sponsorRel(s, href)}>
          {s.cta || `See ${name}`} <ArrowRight size={14} aria-hidden="true" />
        </a>
      )}
    </aside>
  );
}

/** The Study: one creator's funnel in labelled lines, then their Scout page.
    (#study is where the email's "on the web" card lands.) */
function Study() {
  const s = usePart('study');
  if (!s) return null;
  // Scout's creator pages live at /scout/creators/<slug>/; src counts the clicks from here.
  const href = s.scoutSlug ? `/scout/creators/${encodeURIComponent(s.scoutSlug)}/?src=tme-study` : '';
  const link = s.link || (s.creator ? `See ${s.creator}’s full funnel on Scout` : 'See the full funnel on Scout');
  return (
    <section className="nlw-sec nlw-study" id="study">
      <p className="nla-take-kicker">The Study</p>
      {s.title && <h2 className="nlw-h">{s.title}</h2>}
      {s.lines.length > 0 && (
        <dl className="nlw-lines">
          {s.lines.map((l, i) => (
            <div key={i}><dt>{l.label}</dt><dd>{l.text}</dd></div>
          ))}
        </dl>
      )}
      {href && <Link className="nlw-more" href={href}>{link} <ArrowRight size={13} aria-hidden="true" /></Link>}
    </section>
  );
}

/** The Skill, weekly: the skill by name, what it returns, the skill itself to
    copy (when Compose wrote it), and when to use it. Stays #take: the email's
    button opens the skill here. */
function WeeklyTake() {
  const t = usePart('take');
  const [copied, setCopied] = useState(false);
  if (!t) return null;
  const copy = () => {
    if (t.skill) navigator.clipboard?.writeText(t.skill).catch(() => {});
    setCopied(true);
  };
  return (
    <section className="nlw-sec nlw-skill" id="take">
      <p className="nla-take-kicker">The Skill</p>
      <h2 className="nlw-h">{t.title}</h2>
      <p className="nlp-p">{t.what}</p>
      {t.skill ? (
        <div className="nlw-code">
          <div className="nlw-code-bar">
            <span>The skill</span>
            <button type="button" className="nlw-copy" onClick={copy}>
              <Copy size={13} aria-hidden="true" /> {copied ? 'Copied' : t.label || 'Copy the skill'}
            </button>
          </div>
          <pre>{t.skill}</pre>
        </div>
      ) : (
        <button type="button" className="nlp-take-btn" onClick={copy}>
          <Copy size={14} aria-hidden="true" /> {copied ? 'Sample: the real issue copies it' : t.label}
        </button>
      )}
      {t.when && <p className="nlw-when"><b>When to use it:</b> {t.when}</p>}
    </section>
  );
}

/** The sponsor's mark: their logo by link, or their name in type. */
function SponsorMark({ s }: { s: IssueSponsor }) {
  // A logo only from https or this site; anything else falls back to the name.
  const logo = /^(https:\/\/|\/(?!\/))/i.test(s.logoUrl) ? s.logoUrl : '';
  // eslint-disable-next-line @next/next/no-img-element -- the sponsor's own logo, from wherever Esy says it lives
  if (logo) return <img className="nlw-sp-logo" src={logo} alt={s.name} />;
  return <span className="nlw-sp-name">{s.name}</span>;
}

/** The sponsor slot, after The Skill (#sponsor, where the email's card lands).
    No sponsor part, no box. When their words closed The System, the slot is
    one muted line pointing back. The label above and the line under the box
    are always shown: a paid slot never hides that it's paid. */
function Sponsor() {
  const s = usePart('sponsor');
  if (!s) return null;
  if (closesSystem(s)) {
    return <p className="nlw-pointer" id="sponsor">{sponsorLine(s)} It’s the tool at the end of The System, above.</p>;
  }
  const href = sponsorHref(s);
  const steps = s.format === 'tutorial' ? s.steps.filter(Boolean) : [];
  return (
    <aside className={`nlw-sp${s.own ? ' is-own' : ''}`} id="sponsor" aria-label={sponsorLabel(s)}>
      <div className="nlw-sp-top">
        <SponsorMark s={s} />
        <span className="nlw-sp-label">{sponsorLabel(s)}</span>
      </div>
      {s.headline && <h3 className="nlw-sp-h">{s.headline}</h3>}
      {s.text && <p className="nlw-sp-p">{s.text}</p>}
      {steps.length > 0 && <ol className="nlw-sp-steps">{steps.map((x, i) => <li key={i}>{x}</li>)}</ol>}
      {steps.length > 0 && s.tool && <p className="nlw-sp-p nlw-sp-tool">{s.tool}</p>}
      {s.cta && href && (
        <a className="nlw-sp-cta" href={href} rel={sponsorRel(s, href)}>
          {s.cta} <ArrowRight size={14} aria-hidden="true" />
        </a>
      )}
      <p className="nlw-sp-line">{sponsorLine(s)}</p>
    </aside>
  );
}

function Reads() {
  const r = usePart('reads');
  if (!r) return null;
  return (
    <div className="nlp-reads">
      <p className="nlp-h">Worth your time</p>
      <ul>{r.items.map((x) => <li key={x.title}><Link href={x.href} rel={relFor(x.href)}>{x.title}</Link>: {x.why}</li>)}</ul>
    </div>
  );
}

/** This week's numbers, with the running total. `tone` dark sits on the cover. */
function Scoreboard({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const s = usePart('scoreboard');
  if (!s) return null;
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
  const n = usePart('next');
  if (!n) return null;
  return <p className="nlp-next">{n.text} <a href={n.href} rel={relFor(n.href)}>{n.cta} <ArrowRight size={13} aria-hidden="true" /></a></p>;
}

function Sign() {
  return <p className="nlp-sign"><SocialAvatar frameClassName="nlp-sign-photo" size={40} />Zev</p>;
}

/** The foot every take shares: the signup band, the other issues, and what's a sample. */
function Foot() {
  const href = useIssueHref();
  const issue = useIssue();
  const { n } = issue;
  // Prototypes: the round-2 sample's note, or another sample issue's own line (the weekly sample).
  const protoNote = issue === AGENCY_ISSUE ? SAMPLE_LINE : issue.sample ?? SAMPLE_LINE;
  const { live } = useNewsletterMode();
  const issues = useIssues();
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
        <div className="nlp-list">{issues.filter((i) => i.n !== n).map((i) => <IssueRow key={i.n} issue={i} href={href} />)}</div>
        {live ? <SampleNote /> : <p className="nlp-sample">{protoNote}</p>}
      </section>
    </>
  );
}

/* ── L4 · Build, then proof ──────────────────────────────────────────────── */
export function IssueBuildProof({ issue = AGENCY_ISSUE }: { issue?: AgencyIssue }) {
  return (
    <IssueCtx.Provider value={issue}>
    <main className="nlp">
      <Cover />
      <article className="nlp-letter nlp-letter--cover">
        <Lead />
        <Steps />
        <ConnectBox />
        <Results />
        <Clients />
        <Take />
        <News />
        <Reads />
        <Scoreboard />
        <Next />
        <Sign />
        <CoursePromo />
      </article>
      <Foot />
    </main>
    </IssueCtx.Provider>
  );
}

/* ── L5 · Receipts first ─────────────────────────────────────────────────── */
export function IssueReceipts({ issue = AGENCY_ISSUE }: { issue?: AgencyIssue }) {
  return (
    <IssueCtx.Provider value={issue}>
      <Receipts />
    </IssueCtx.Provider>
  );
}

function Receipts() {
  // When the steps carry their numbers, the funnel would repeat them: show the spend only.
  const proof = useStepsHaveProof();
  const weekly = isWeeklyIssue(useIssue());
  // The weekly issue (v3) reads in N12's order. Any v2 parts it also carries
  // follow Next, in the email's order, so nothing it has is left out. (The
  // connection is shown in words here, never as the round-2 mock screen.)
  if (weekly) {
    return (
      <main className="nlp">
        <Cover><Scoreboard tone="dark" /></Cover>
        <article className="nlp-letter nlp-letter--cover nla-wide nlw">
          <Lead />
          <News />
          <WeeklySystem />
          <Study />
          <WeeklyTake />
          <Sponsor />
          <Next />
          <ConnectBox />
          <Results withFunnel={!proof} />
          <Clients card />
          <Reads />
          <Sign />
          <CoursePromo />
        </article>
        <Foot />
      </main>
    );
  }
  return (
    <main className="nlp">
      <Cover><Scoreboard tone="dark" /></Cover>
      <article className="nlp-letter nlp-letter--cover nla-wide">
        <Lead />
        <Steps proof={proof} />
        <ConnectWindow />
        <Results withFunnel={!proof} />
        <Clients card />
        <Take />
        <News />
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
export function IssueBuildSell({ issue = AGENCY_ISSUE }: { issue?: AgencyIssue }) {
  return (
    <IssueCtx.Provider value={issue}>
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
        <News />
        <Reads />
        <Next />
        <Sign />
        <CoursePromo />
      </div>
      <Foot />
    </main>
    </IssueCtx.Provider>
  );
}
