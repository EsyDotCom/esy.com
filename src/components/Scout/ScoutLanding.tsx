'use client';

// esy.com/scout: Scout's public page, the free directory of funnel maps (shipped 2026-11-07).
// It's S5 "Map, night" from the scout.esy.com repo's prototypes (/scout/prototypes/landing/s5), the
// take Zev picked for Marcus, the marketing engineer: one real funnel map on a navy plate as the hero,
// how to read a map, the directory, how we know, "map a company for me", and one ask, The Marketing
// Engineer. Changes from the prototype, for a live page:
//   - Forms sign up for real through /api/newsletter/subscribe (forms scout-hero, scout-request and
//     scout-band), and a map request keeps the website asked for on the subscriber's contact.
//   - The directory says what's mapped: the four maps open in the hero, the rest say "Mapping next".
//   - A picked place gets the readout under the map (what it is, how we know, its source).
// The roster and line counts come from src/data/scout/snapshot.json (scripts/scout-snapshot.mjs),
// so no line of any study is published. No money claims: only what can be checked.
// 2026-11-07: the live page passes creators="search" funnel="lanes" (S11 · Lanes): the creators'
// game plans (src/data/scout/creators.json) in the Scout shell above the fold, the company maps on
// its other tab, the header and signup on a navy band, and no page footer of its own.

import Link from 'next/link';
import { useRef, useState, type FormEvent } from 'react';
import { ArrowUp, RotateCcw, Sparkles } from 'lucide-react';
import { useNewsletterSubscribe } from '@/hooks/useNewsletterSubscribe';
import snapshot from '@/data/scout/snapshot.json';
import { BASIS, COLS, FUNNELS, type Basis } from './funnels';
import { BasisChip, FunnelMap, Readout } from './FunnelMap';
import { CreatorIndex, CreatorLookup, CreatorShelf, CreatorShell, type CreatorsTake } from './CreatorPlans';
import type { FunnelView } from './FunnelViews';
import { ScoutHero, type HeroTake } from './ScoutHeroes';

// The AI tools Marcus uses (Zev, 2026-11-06). `map` is the funnel id when its map is done.
const COMPANIES: { id: string; name: string; job: string; map?: string }[] = [
  { id: 'n8n', name: 'n8n', job: 'Automations', map: 'n8n' },
  { id: 'gamma', name: 'Gamma', job: 'Presentations', map: 'gamma' },
  { id: 'clay', name: 'Clay', job: 'Outreach data', map: 'clay' },
  { id: 'make', name: 'Make', job: 'Automations' },
  { id: 'instantly', name: 'Instantly', job: 'Cold email' },
  { id: 'lovable', name: 'Lovable', job: 'Builders' },
  { id: 'replit', name: 'Replit', job: 'Builders' },
];
// Creators whose own map is done (Scout creator id → funnel id).
const CREATOR_MAPS: Record<string, string> = { nate: 'nate' };

const PRIVACY = '/privacy/';
const day = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// ── The newsletter box ───────────────────────────────────────────────────────────────────

/** What a signup form says once it's sent, or why it wasn't. */
function Sent({ status, already, error }: { status: string; already: boolean; error: string | null }) {
  if (status === 'success') return <p className="sc-sent" role="status">{already ? 'You’re already subscribed. Thanks for reading.' : 'Almost there: check your inbox and confirm your email.'}</p>;
  if (status === 'error' && error) return <p className="sc-error" role="alert">{error}</p>;
  return null;
}

/** The Marketing Engineer, with what it promises. `form` says which box a signup came from. */
function Join({ form, big }: { form: string; big?: boolean }) {
  const { subscribe, status, errorMessage, honeypotProps, alreadySubscribed } = useNewsletterSubscribe({ form });
  const [email, setEmail] = useState('');
  const submit = (e: FormEvent) => { e.preventDefault(); subscribe(email); };
  return (
    <form className={`ld-join ${big ? 'is-big' : ''}`} onSubmit={submit}>
      <input {...honeypotProps} />
      {status === 'success' ? <Sent status={status} already={alreadySubscribed} error={null} /> : (
        <>
          <input className="fo-input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" aria-label="Your email" autoComplete="email" />
          <button className="fo-btn fo-btn--primary" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Signing you up…' : 'Get The Marketing Engineer'}</button>
          <Sent status={status} already={false} error={errorMessage} />
        </>
      )}
      <small>The systems I build for marketing, and each new Scout map. Free; unsubscribe anytime. <Link href={PRIVACY}>Privacy policy</Link>.</small>
    </form>
  );
}

// ── The page ─────────────────────────────────────────────────────────────────────────────

// `creators` (prototypes only, /prototypes/scout-creators/) adds the creators' game plans in one of
// three placements (CreatorPlans.tsx); without it the page is exactly the live one.
export function ScoutLanding({ creators, funnel, heroTake }: { creators?: CreatorsTake; funnel?: FunnelView; heroTake?: HeroTake } = {}) {
  const [id, setId] = useState('gamma');
  // S8 · Lookup: the hero's plate shows creators' game plans first, the company maps on the other tab.
  const [side, setSide] = useState<'creators' | 'maps'>('creators');
  const hero = creators === 'lookup' || creators === 'search';
  const lookup = hero && side === 'creators';
  const [pick, setPick] = useState<string | null>(null);
  const mapRef = useRef<HTMLElement>(null);
  const f = FUNNELS.find((x) => x.id === id)!;

  // The directory opens a map in the hero and brings it into view.
  const open = (funnel: string) => {
    setId(funnel);
    setPick(null);
    mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // The company maps: tabs, the map, its readout. The live hero shows it; S9's shell holds it in a tab.
  const mapsView = (<>
            <div className="ld-maptabs" role="tablist" aria-label="Whose funnel">
              {/* Monograms, not photos: no one's face sits next to the email box (Zev, 2026-11-06). */}
              {FUNNELS.map((x) => (
                <button key={x.id} type="button" role="tab" aria-selected={x.id === id} className={x.id === id ? 'is-on' : ''} onClick={() => { setId(x.id); setPick(null); }}>
                  <span>{x.name[0]}</span>{x.name}
                </button>
              ))}
            </div>
            <div className="ld-mapcap">
              <h2>{f.title}</h2>
              <p><Sparkles size={14} aria-hidden="true" /><span><b>The move.</b> {f.move.text}</span></p>
            </div>
            <p className="sc-answer">{f.answer}</p>
            <FunnelMap key={f.id} f={f} skin="plate" pick={pick} setPick={setPick} />
            <Readout f={f} id={pick} />
            <p className="sc-mapnote">
              {f.read ? `Read from ${f.name}’s own public pages on ${day(f.read)}; each place links its source.` : `Drawn from ${f.name}’s Scout file: his public videos, profiles and pages.`}
            </p>
  </>);

  return (
    // S8/S9: the header and the hero's newsletter part sit on a navy band (Zev), so the Scout tool
    // below reads as its own thing.
    <div className={`ld ld--map-night ${hero ? 'has-band' : ''}`}>
      <header className="ld-head">
        <Link className="fo-lockup ld-lockup" href="/" aria-label="Esy home"><span className="fo-wordmark">esy</span><span className="fo-lockup-sep" /><span className="fo-lockup-name">Scout</span></Link>
        <nav className="ld-head-nav" aria-label="Scout">
          {creators && creators !== 'lookup' && <a href="#creators">Creators</a>}
          <a href="#read">How to read a map</a>
          <a href="#directory">The directory</a>
          <a href="#how">How we know</a>
        </nav>
        <a className="fo-btn fo-btn--primary ld-head-cta" href="#join">Get the newsletter</a>
      </header>

      <main className="ld-main">
        {/* The hero: one funnel map, whole, on the night plate, across the four that are done. */}
        <section className="ld-maphero is-map-night">
          <div className="ld-maphero-text">
            {/* /prototypes/scout-hero/ swaps the headline block for one of three heroes (ScoutHeroes.tsx). */}
            {heroTake ? <ScoutHero take={heroTake} join={<Join form="scout-hero" />} /> : (<>
            <p className="fo-label fo-label--jade">Scout · funnel maps by Esy</p>
            <h1 className="ld-h1">See how they get their customers.</h1>
            <p className="ld-lede">Scout maps the funnels of the creators and AI companies marketing engineers learn from: where people find them, where they land, what they pay for, and the one move that makes it work. Every line says how we know it.</p>
            <Join form="scout-hero" />
            </>)}
          </div>
          <figure className="ld-mapfig" id="map" ref={mapRef}>
            {creators === 'lookup' && (
              <div className="cp-side" role="tablist" aria-label="What to see">
                <button type="button" role="tab" aria-selected={side === 'creators'} className={side === 'creators' ? 'is-on' : ''} onClick={() => setSide('creators')}>Creators’ game plans</button>
                <button type="button" role="tab" aria-selected={side === 'maps'} className={side === 'maps' ? 'is-on' : ''} onClick={() => setSide('maps')}>AI company funnel maps</button>
              </div>
            )}
            {creators === 'search' ? <CreatorShell side={side} setSide={setSide} maps={mapsView} view={funnel} />
              : lookup ? <CreatorLookup /> : mapsView}
          </figure>

        </section>

        {creators === 'shelf' && <CreatorShelf />}
        {creators === 'index' && <CreatorIndex />}

        {/* How to read any map: the three columns, the move and the loop, once. */}
        <section id="read" className="ld-section">
          <p className="fo-label">How to read a map</p>
          <h2 className="ld-h2">Every map answers one question: how does a stranger become a customer?</h2>
          <ol className="ld-read">
            {COLS.map((c, i) => <li key={c.key}><span className="ld-read-n">{i + 1}</span><b>{c.label}</b><small>{c.sub}</small></li>)}
            <li className="is-move"><span className="ld-read-n"><Sparkles size={13} aria-hidden="true" /></span><b>The move</b><small>The one choice that makes it work, the part worth copying</small></li>
            <li className="is-loop"><span className="ld-read-n"><RotateCcw size={13} aria-hidden="true" /></span><b>The loop</b><small>When customers bring the next ones</small></li>
          </ol>
        </section>

        <Directory open={open} companiesOnly={!!creators} />
        <HowWeKnow />
        <MapRequest />

        <section id="join" className="ld-joinband">
          <h2 className="ld-h2">New maps, in The Marketing Engineer</h2>
          <p className="ld-lede">Each new map, plus the systems I build: AI search, outreach, automations. Written for marketing engineers.</p>
          <Join form="scout-band" big />
        </section>
      </main>

      {/* The page's own footer (S5's) is gone (Zev, 2026-11-07): on esy.com it read as a second footer
          under the site's. Its lines (independent, not affiliated, affiliate links, corrections)
          stay in the directory's fine print, and each creator's plan card carries its own. */}
    </div>
  );
}

// ── The directory ────────────────────────────────────────────────────────────────────────

/** Everyone in Scout. The four finished maps open in the hero; the rest are marked as next. */
// `companiesOnly` (with the creators' game plans above) leaves the creators to their own section.
export function Directory({ open, companiesOnly = false }: { open: (funnel: string) => void; companiesOnly?: boolean }) {
  const people = snapshot.creators;
  const mapped = FUNNELS.length;
  return (
    <section id="directory" className="ld-section">
      <p className="fo-label">The directory</p>
      <h2 className="ld-h2">{companiesOnly ? `${COMPANIES.length} AI companies in Scout` : `${people.length} creators and ${COMPANIES.length} AI companies in Scout`}</h2>
      <p className="ld-lede">{mapped} maps are open now. Pick one to see it above; the rest are being mapped the same way.</p>
      <div className={`ld-dir ${companiesOnly ? 'is-cos-only' : ''}`}>
        {!companiesOnly && <div>
          <p className="ld-dir-h">Creators</p>
          <ul className="ld-dir-people">
            {people.map((p) => {
              const funnel = CREATOR_MAPS[p.id];
              const face = p.avatar
                // eslint-disable-next-line @next/next/no-img-element
                ? <img className="sc-av" src={p.avatar} alt="" width={40} height={40} loading="lazy" referrerPolicy="no-referrer" />
                : <span className="sc-av is-letter" aria-hidden="true">{p.name[0]}</span>;
              return (
                <li key={p.id}>
                  {funnel
                    ? <button type="button" className="is-mapped" onClick={() => open(funnel)}>{face}<span>{p.name}</span><em>See the map</em></button>
                    : <div>{face}<span>{p.name}</span></div>}
                </li>
              );
            })}
          </ul>
        </div>}
        <div>
          <p className="ld-dir-h">AI companies</p>
          <ul className="ld-dir-cos">
            {COMPANIES.map((c) => (
              <li key={c.id}>
                {c.map
                  ? <button type="button" onClick={() => open(c.map!)}><b>{c.name}</b><small>{c.job}</small><em>See the map <ArrowUp size={12} aria-hidden="true" /></em></button>
                  : <div className="is-next"><b>{c.name}</b><small>{c.job}</small><em>Mapping next</em></div>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="ld-disclaim">Scout is independent analysis of public pages and posts. It isn’t affiliated with or endorsed by any creator or company shown; names and photos identify whose public marketing is studied. To ask for a correction or removal, write to zev@esy.com. Some links are affiliate links; Esy may earn a commission, and it never changes a map.</p>
    </section>
  );
}

// ── How we know ──────────────────────────────────────────────────────────────────────────

/** Every line on the roster, split by how we know it, from the snapshot. */
export function HowWeKnow() {
  const order: Basis[] = ['counted', 'seen', 'reading', 'open'];
  const by = order.map((b) => ({ b, n: snapshot.lines[b] }));
  const total = by.reduce((s, x) => s + x.n, 0) || 1;
  return (
    <section id="how" className="ld-band">
      <p className="fo-label">How we know</p>
      <h2 className="ld-h2">{total} lines across the roster, each marked</h2>
      <div className="ld-stack" role="img" aria-label={by.map((x) => `${BASIS[x.b].name} ${x.n}`).join(', ')}>
        {by.filter((x) => x.n).map((x) => <span key={x.b} className={`is-${x.b}`} style={{ flexGrow: x.n }} title={`${BASIS[x.b].name}: ${x.n}`} />)}
      </div>
      <ul className="ld-stack-key">
        {by.map((x) => <li key={x.b}><BasisChip b={x.b} /><b>{x.n}</b><span>{Math.round((x.n / total) * 100)}%</span><small>{BASIS[x.b].says}</small></li>)}
      </ul>
      <p className="sc-mapnote">Counted on {day(snapshot.takenOn)}.</p>
    </section>
  );
}

// ── Map a company ────────────────────────────────────────────────────────────────────────

/** Ask for a company's map. Signs the reader up to The Marketing Engineer (they confirm by email) and
 *  keeps the website asked for on their contact (`request`), so the map can be sent when it's done.
 *  The analysis is what's offered, never anyone's contact details. */
function MapRequest() {
  const { subscribe, status, errorMessage, honeypotProps, alreadySubscribed } = useNewsletterSubscribe({ form: 'scout-request' });
  const [f, setF] = useState({ email: '', site: '' });
  const submit = (e: FormEvent) => { e.preventDefault(); subscribe(f.email, { request: f.site.trim() }); };
  return (
    <section id="request" className="ld-request">
      <div>
        <p className="fo-label fo-label--jade">Map a company</p>
        <h2 className="ld-h2">Not on the list? Tell us who.</h2>
        <p className="ld-lede">Give us a company’s website and we’ll email you its funnel map when it’s done: every way in, where people land, what they pay for, and the move.</p>
      </div>
      <form onSubmit={submit}>
        <input {...honeypotProps} />
        {status === 'success' ? (
          <p className="sc-sent" role="status">{alreadySubscribed ? `Got it. We’ll email you the map for ${f.site.trim()} when it’s done.` : `Got it. Confirm your email (check your inbox) and we’ll send the map for ${f.site.trim()} when it’s done.`}</p>
        ) : (
          <>
            <label><span>The company’s website</span><input className="fo-input" required value={f.site} onChange={(e) => setF({ ...f, site: e.target.value })} placeholder="clay.com" maxLength={120} /></label>
            <label><span>Your email</span><input className="fo-input" type="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@company.com" autoComplete="email" /></label>
            <button className="fo-btn fo-btn--primary" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Sending…' : 'Request a map'}</button>
            <Sent status={status} already={false} error={errorMessage} />
          </>
        )}
        <small className="ld-form-note">We’ll email you the map and sign you up to The Marketing Engineer (you confirm by email; unsubscribe anytime). <Link href={PRIVACY}>Privacy policy</Link>.</small>
      </form>
    </section>
  );
}
