'use client';
/* Creators' game plans on esy.com/scout (2026-11-07, /prototypes/scout-creators/). Zev: show a small
 * version of Scout's directory on the public page, the creators and their game plans, without
 * signing in to os.esy.com. Only what a visitor could check on the creator's own public pages
 * leaves Scout (src/data/scout/creators.json, written by scripts/scout-snapshot.mjs): the game plan
 * (Esy's reading), where each platform sends people, what they sell at the price shown, and their
 * social profiles. No videos, transcripts, follower counts or income figures. Outside links are
 * nofollow (lib/outbound). Three placements:
 *   shelf   S6 · Shelf   a row of creator cards right under the map; picking one opens its plan below.
 *   index   S7 · Index   a searchable two-pane directory just under the map, list left, plan right;
 *                        the old directory keeps the AI companies.
 *   lookup  S8 · Lookup  above the fold: the hero's plate switches between creators' game plans
 *                        (the default) and the company maps.
 *   search  S9 · Lookup + search  S8 with search (Zev, round 2), then the whole tool in an app shell
 *                        (CreatorShell): Scout's window bar with the two tabs and search, a rail of
 *                        creators with their biggest audience, and the plan beside it. */
import Link from 'next/link';
import { useMemo, useState, type ReactNode } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import data from '@/data/scout/creators.json';
import { relFor } from '@/lib/outbound';
import { BasisChip } from './FunnelMap';
import { FunnelDiagram, PlatformMark, type FunnelView } from './FunnelViews';
import { slugOf } from './creatorData';
import type { Basis } from './funnels';

export type CreatorsTake = 'shelf' | 'index' | 'lookup' | 'search';

type Hop = { at: string; does?: string; basis?: string; url?: string };
type Step = { name: string; price?: string; kind?: string; what?: string; basis?: string; url?: string };
type LinkRow = { kind?: string; handle?: string; url: string; label?: string };
type Platform = { name: string; followers?: number; url?: string };
export type PublicCreator = { id: string; name: string; avatar: string; readOn: string; game: string | null; platforms: Platform[]; routes: { from: string; kind?: string; hops: Hop[] }[]; ladder: Step[]; links: LinkRow[] };

export const CREATORS = data.creators as PublicCreator[];
const byId = (id: string) => CREATORS.find((c) => c.id === id) ?? CREATORS[0];
const day = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const isBasis = (b?: string): b is Basis => b === 'counted' || b === 'seen' || b === 'reading' || b === 'open';
/** The game plan's first sentence, for cards and rows. */
const gist = (c: PublicCreator) => (c.game ? c.game.split(/(?<=[.!?])\s/)[0] : 'Funnel and offers below.');
/** Where they post, from the routes first (that's where the funnel starts), then their profiles. */
const platformsOf = (c: PublicCreator) => [...new Set([...c.platforms.map((p) => p.name.replace(/\s*\(.*$/, '')), ...c.routes.map((r) => r.from), ...c.links.map((l) => l.kind ?? '')].filter(Boolean))];
/** 578000 → 578K, 1240000 → 1.2M, as Scout shows audiences. */
const audience = (n?: number) => (n == null ? '' : n >= 1e6 ? `${(n / 1e6).toFixed(1).replace(/\.0$/, '')}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : String(n));

/** Scout's funnel at a glance (scout-creator-page FunnelMap): every stop once, with the platforms and
 *  link slots that point there; a flow's unlinked steps ("comment a keyword") stay on its platform. */
function stopsOf(c: PublicCreator) {
  const stops = new Map<string, Hop & { from: string[] }>();
  c.routes.forEach((r) => r.hops.forEach((h, i) => {
    if (r.kind === 'flow' && !h.url) return;
    const k = (h.url ?? h.at).toLowerCase().replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    const s = stops.get(k) ?? { ...h, from: [] };
    s.from.push(r.kind === 'links' ? `${r.from} · link ${i + 1}` : r.from);
    stops.set(k, s);
  }));
  return [...stops.values()];
}

export function Face({ c, size = 40 }: { c: PublicCreator; size?: number }) {
  return c.avatar
    // eslint-disable-next-line @next/next/no-img-element
    ? <img className="sc-av" src={c.avatar} alt="" width={size} height={size} loading="lazy" referrerPolicy="no-referrer" style={{ width: size, height: size }} />
    : <span className="sc-av is-letter" aria-hidden="true" style={{ width: size, height: size }}>{c.name[0]}</span>;
}

/** One creator's game plan: what they do, where each platform sends people, what they sell, where to find them. */
export function CreatorPlan({ c, tone = 'paper', view }: { c: PublicCreator; tone?: 'paper' | 'card'; view?: FunnelView }) {
  return (
    <article className={`cp cp--${tone}`} aria-label={`${c.name}’s game plan`}>
      {/* The profile first (Zev, round 3): face, name and their socials together, the game plan as the description. */}
      <header className="cp-head">
        <Face c={c} size={64} />
        <div className="cp-head-text">
          <div className="cp-head-row">
            {/* The name opens the creator's own page (Zev, 2026-11-07). */}
            <h3><Link className="cp-name-link" href={`/scout/creators/${slugOf(c)}/`}>{c.name}<span aria-hidden="true">→</span></Link></h3>
            {c.links.length > 0 && (
              <ul className="cp-socials" aria-label={`${c.name} on social`}>
                {c.links.map((l) => (
                  <li key={l.url}><a href={l.url} target="_blank" rel={relFor(l.url, { newTab: true })} title={`${l.kind}${l.handle ? ` ${l.handle}` : ''}`} aria-label={`${l.kind}${l.handle ? ` ${l.handle}` : ''}`}><PlatformMark name={l.kind ?? ''} size={15} /></a></li>
                ))}
              </ul>
            )}
          </div>
          {c.game
            ? <p className="cp-desc">{c.game} <BasisChip b="reading" /></p>
            : <p className="cp-desc is-quiet">We don’t publish this one’s game plan here. Their funnel and offers are below.</p>}
        </div>
      </header>

      {view ? <FunnelDiagram c={c} view={view} /> : <>
      {/* The funnel, as Scout draws it: where they post (the traffic) → where they send people → what they sell. */}
      <section className="cp-funnel" aria-label={`${c.name}’s funnel`}>
        <div className="cp-col">
          <p className="cp-label">Where they post</p>
          {c.platforms.map((x) => {
            const most = c.platforms[0]?.followers || 1;
            const flow = c.routes.find((r) => r.kind === 'flow' && r.from === x.name.replace(/\s*\(.*$/, ''));
            const name = <b>{x.name.replace(/\s*\(.*$/, '')}</b>;
            return (
              <div key={x.name} className="cp-card cp-plat">
                <span className="cp-plat-top">
                  {x.url ? <a href={x.url} target="_blank" rel={relFor(x.url, { newTab: true })}>{name}</a> : name}
                  <span className="cp-aud">{audience(x.followers)}</span>
                </span>
                <i style={{ width: `${Math.max(4, ((x.followers ?? 0) / most) * 100)}%` }} aria-hidden="true" />
                {flow && <small>{flow.hops.filter((h) => !h.url).map((h) => h.at).join(' → ')}</small>}
              </div>
            );
          })}
          {c.platforms.length === 0 && <p className="cp-none">Not checked.</p>}
        </div>
        <span className="cp-arrow" aria-hidden="true">→</span>
        <div className="cp-col">
          <p className="cp-label">Where they send people</p>
          {stopsOf(c).map((h) => (
            <div key={h.at} className="cp-card">
              {h.url ? <a href={h.url} target="_blank" rel={relFor(h.url, { newTab: true })}><b>{h.at}</b></a> : <b>{h.at}</b>}
              {h.does && <span className="cp-does">{h.does}</span>}
              <small>From {h.from.join(', ')}</small>
              {isBasis(h.basis) && <BasisChip b={h.basis} />}
            </div>
          ))}
          {stopsOf(c).length === 0 && <p className="cp-none">Not checked.</p>}
        </div>
        <span className="cp-arrow" aria-hidden="true">→</span>
        <div className="cp-col">
          <p className="cp-label">What they sell, cheapest first</p>
          {c.ladder.map((st, i) => (
            <div key={st.name + i} className={`cp-card cp-rung is-${st.kind === 'free' ? 'free' : 'paid'}`}>
              <span className="cp-price">{st.price}</span>
              {st.url ? <a href={st.url} target="_blank" rel={relFor(st.url, { newTab: true })}><b>{st.name}</b></a> : <b>{st.name}</b>}
              {st.what && <span className="cp-does">{st.what}</span>}
              {isBasis(st.basis) && <BasisChip b={st.basis} />}
            </div>
          ))}
          {c.ladder.length === 0 && <p className="cp-none">Not checked.</p>}
        </div>
      </section>

      </>}
      <p className="cp-fine">Read from their public pages on {day(c.readOn)}. Audiences, prices and pages as shown that day. Esy’s reading of public pages; not affiliated with {c.name}. Corrections: scout@esy.com.</p>
    </article>
  );
}

// ── S6 · Shelf ───────────────────────────────────────────────────────────────────────────

export function CreatorShelf() {
  const [id, setId] = useState('nick');
  const c = byId(id);
  return (
    <section id="creators" className="ld-section cp-shelf-sec">
      <p className="fo-label">Creators’ game plans</p>
      <h2 className="ld-h2">How {CREATORS.length} creators turn attention into customers</h2>
      <p className="ld-lede">Pick a creator: their game plan, where each platform sends people, and what they sell, read from their own public pages.</p>
      <div className="cp-shelf" role="tablist" aria-label="Creators">
        {CREATORS.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={x.id === id} className={x.id === id ? 'is-on' : ''} onClick={() => setId(x.id)}>
            <Face c={x} size={44} />
            <b>{x.name}</b>
            <small>{gist(x)}</small>
          </button>
        ))}
      </div>
      <div className="cp-shelf-panel" key={c.id}><CreatorPlan c={c} /></div>
    </section>
  );
}

// ── S7 · Index ───────────────────────────────────────────────────────────────────────────

const FILTERS = ['All', 'YouTube', 'X', 'LinkedIn', 'Instagram'];

/** S7's search, filters, list and plan, without a section around it. */
export function CreatorIndexPane() {
  const [id, setId] = useState('nick');
  const [q, setQ] = useState('');
  const [on, setOn] = useState('All');
  const list = useMemo(() => CREATORS.filter((c) =>
    (on === 'All' || platformsOf(c).includes(on)) &&
    (!q || `${c.name} ${c.game ?? ''} ${c.ladder.map((s) => s.name).join(' ')}`.toLowerCase().includes(q.toLowerCase()))), [q, on]);
  const c = byId(id);
  return (
      <div className="cp-index">
        <div className="cp-index-list">
          <label className="cp-search"><Search size={15} aria-hidden="true" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search creators or offers" aria-label="Search creators" /></label>
          <div className="cp-filters" role="group" aria-label="Where they post">
            {FILTERS.map((f) => <button key={f} type="button" aria-pressed={on === f} className={on === f ? 'is-on' : ''} onClick={() => setOn(f)}>{f}</button>)}
          </div>
          <ul>
            {list.map((x) => (
              <li key={x.id}>
                <button type="button" className={x.id === id ? 'is-on' : ''} onClick={() => setId(x.id)} aria-current={x.id === id}>
                  <Face c={x} size={36} />
                  <span><b>{x.name}</b><small>{platformsOf(x).slice(0, 3).join(' · ')}</small></span>
                </button>
              </li>
            ))}
            {list.length === 0 && <li className="cp-empty">No creator matches. Try another word.</li>}
          </ul>
        </div>
        <div className="cp-index-plan" key={c.id}><CreatorPlan c={c} /></div>
      </div>
  );
}

export function CreatorIndex() {
  return (
    <section id="creators" className="ld-section">
      <p className="fo-label">The directory · creators</p>
      <h2 className="ld-h2">{CREATORS.length} creators, each with a game plan</h2>
      <p className="ld-lede">Search by name or by what they sell. Each plan is read from the creator’s own public pages and says how we know every line.</p>
      <CreatorIndexPane />
    </section>
  );
}

// ── S8 · Lookup (above the fold) ─────────────────────────────────────────────────────────

/** The hero's creator side: a row of faces, then the picked creator's plan in a panel, above the fold. */
export function CreatorLookup({ search = false }: { search?: boolean }) {
  const [id, setId] = useState('nick');
  const [q, setQ] = useState('');
  // Matches on name, game plan, offer names and platforms, so "Skool" or "newsletter" finds people too.
  const list = useMemo(() => (!q.trim() ? CREATORS : CREATORS.filter((x) =>
    `${x.name} ${x.game ?? ''} ${x.ladder.map((s) => s.name).join(' ')} ${platformsOf(x).join(' ')}`.toLowerCase().includes(q.trim().toLowerCase()))), [q]);
  const c = byId(id);
  const named = !!q.trim();
  return (
    <div className="cp-lookup">
      {search && (
        <form className="cp-lookup-search" role="search" onSubmit={(e) => { e.preventDefault(); if (list[0]) setId(list[0].id); }}>
          <label className="cp-search">
            <Search size={15} aria-hidden="true" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${CREATORS.length} creators, or what they sell`} aria-label="Search creators" />
          </label>
          {named && <span className="cp-count" aria-live="polite">{list.length === 0 ? 'No match' : `${list.length} ${list.length === 1 ? 'match' : 'matches'}`}</span>}
        </form>
      )}
      <div className={`cp-faces ${named ? 'is-named' : ''}`} role="tablist" aria-label="Creators">
        {list.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={x.id === id} className={x.id === id ? 'is-on' : ''} onClick={() => setId(x.id)} title={x.name}>
            <Face c={x} size={40} />{named ? <span className="cp-face-name">{x.name}</span> : <span className="cp-sr">{x.name}</span>}
          </button>
        ))}
      </div>
      <div className="cp-lookup-card" key={c.id}><CreatorPlan c={c} /></div>
    </div>
  );
}

// ── S9 · The shell: the whole tool in a Scout window ─────────────────────────────────────

/** Scout as an app on the page: a window bar (lockup, the two tabs, search), a rail of creators and the
 *  plan beside it; the company maps live on the other tab. Zev: an on-brand shell, a premium tool feel. */
export function CreatorShell({ side, setSide, maps, view }: { side: 'creators' | 'maps'; setSide: (s: 'creators' | 'maps') => void; maps: ReactNode; view?: FunnelView }) {
  const [id, setId] = useState('nick');
  const [q, setQ] = useState('');
  const list = useMemo(() => (!q.trim() ? CREATORS : CREATORS.filter((x) =>
    `${x.name} ${x.game ?? ''} ${x.ladder.map((s) => s.name).join(' ')} ${platformsOf(x).join(' ')}`.toLowerCase().includes(q.trim().toLowerCase()))), [q]);
  const c = byId(id);
  return (
    <div className="cs" id="creators" role="region" aria-label="Scout">
      <div className="cs-bar">
        <span className="cs-lockup" aria-hidden="true"><span className="fo-wordmark">esy</span><span className="fo-lockup-sep" /><span className="fo-lockup-name">Scout</span></span>
        <div className="cs-tabs" role="tablist" aria-label="What to see">
          <button type="button" role="tab" aria-selected={side === 'creators'} className={side === 'creators' ? 'is-on' : ''} onClick={() => setSide('creators')}>Creators <small>{CREATORS.length}</small></button>
          <button type="button" role="tab" aria-selected={side === 'maps'} className={side === 'maps' ? 'is-on' : ''} onClick={() => setSide('maps')}>AI companies</button>
        </div>
        {side === 'creators' && (
          <form className="cs-search" role="search" onSubmit={(e) => { e.preventDefault(); if (list[0]) setId(list[0].id); }}>
            <Search size={14} aria-hidden="true" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search creators or what they sell" aria-label="Search creators" />
            {q.trim() && <span className="cs-count" aria-live="polite">{list.length}</span>}
          </form>
        )}
        <Link className="cs-all" href="/scout/creators/">All creators →</Link>
        <span className="cs-status"><i aria-hidden="true" />Public pages only</span>
      </div>
      {side === 'creators' ? (
        <div className="cs-body">
          <ul className="cs-rail" aria-label="Creators">
            {list.map((x) => (
              <li key={x.id}>
                <button type="button" className={x.id === id ? 'is-on' : ''} aria-current={x.id === id} onClick={() => setId(x.id)}>
                  <Face c={x} size={32} />
                  <span><b>{x.name}</b><small>{x.platforms[0] ? `${x.platforms[0].name.replace(/\s*\(.*$/, '')} ${audience(x.platforms[0].followers)}` : platformsOf(x)[0] ?? ''}</small></span>
                </button>
              </li>
            ))}
            {list.length === 0 && <li className="cp-empty">No creator matches.</li>}
          </ul>
          <div className="cs-main" key={c.id}><CreatorPlan c={c} view={view} /><Link className="cs-full" href={`/scout/creators/${slugOf(c)}/`}>Open {c.name}’s full page →</Link></div>
        </div>
      ) : (
        <div className="cs-maps">{maps}</div>
      )}
    </div>
  );
}
