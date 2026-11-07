'use client';
/**
 * Realistic Esy OS screens for the homepage's app sections (round 3, 2026-11-07,
 * /prototypes/home-os-apps/). Zev: replace the "ugly fake looking browser container" with a more
 * realistic view inside a creative container, elegant and on brand.
 *
 * Each screen is drawn at desktop width with the product's own markup and Folio styles, then scaled to
 * fit like a screenshot:
 *   agency  os.esy.com's live bar (shell.tsx: "esy | agency", Home, Brief, Inbox, Clients, Work, Search,
 *           Outreach, Agents, Data, + New job), the tab for the feature on. Figures are samples.
 *   compose compose.esy.com's editor bar (as in ComposeReplay) over the real AI Marketing News piece and
 *           its checks; the team is ComposeReplay itself. The Fact-checker's notes are samples.
 *   scout   esy.com/scout's real page parts: its bar, the funnel map, How we know and the directory.
 * The containers around them (display, float, mat) are in OsContainers.tsx.
 */
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronDown, RefreshCw, Sparkles } from 'lucide-react';
import { ComposeReplay } from './ComposeBand';
import { DOC, POSTS, splitClaims } from './composeShowcase';
import { FunnelMap } from '@/components/Scout/FunnelMap';
import { FUNNELS } from '@/components/Scout/funnels';
import { Directory, HowWeKnow } from '@/components/Scout/ScoutLanding';
import { cormorant } from '@/components/SkillsHub/folio/font';
import type { FeatureVisual } from './osAppFeatures';

const W = 1240;

/** What each screen is, for its container's caption. */
export const SCREEN_META: Record<FeatureVisual, { url: string; label: string; sample?: string }> = {
  'agency-today': { url: 'os.esy.com/agency', label: 'agency · Home', sample: 'Sample figures' },
  'agency-approve': { url: 'os.esy.com/agency/work', label: 'agency · Work', sample: 'A sample piece' },
  'agency-search': { url: 'os.esy.com/agency/search', label: 'agency · Search', sample: 'Sample searches' },
  'compose-team': { url: 'compose.esy.com/write', label: 'compose · The team at work', sample: 'A real post; the agents’ notes are samples' },
  'compose-checks': { url: 'compose.esy.com/write', label: 'compose · Fact-check', sample: 'A real post; the notes are samples' },
  'compose-posts': { url: 'compose.esy.com', label: 'compose · AI Marketing News' },
  'scout-map': { url: 'esy.com/scout', label: 'scout · Gamma’s funnel map' },
  'scout-basis': { url: 'esy.com/scout', label: 'scout · How we know' },
  'scout-directory': { url: 'esy.com/scout', label: 'scout · The directory' },
};

/** A desktop-width screen scaled to its container's width, like a screenshot. */
function Scaled({ h, children }: { h: number; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} className="rs-scaled" style={{ height: h * scale }}>
      <div className={`rs-page folio ${cormorant.variable}`} style={{ width: W, height: h, transform: `scale(${scale})` }} inert>{children}</div>
    </div>
  );
}

// ── agency: the live /agency bar, then the page ──────────────────────────────────────────

const AGENCY_NAV = ['Home', 'Brief', 'Inbox', 'Clients', 'Work', 'Search', 'Outreach', 'Agents', 'Data'];

function AgencyBar({ on }: { on: string }) {
  return (
    <header className="fo-bar rs-bar">
      <div className="fo-bar-in">
        <span className="fo-lockup"><span className="fo-wordmark">esy</span><span className="fo-lockup-sep" /><span className="fo-lockup-name">agency</span><ChevronDown size={14} className="rs-caret" /></span>
        <nav className="fo-nav">
          {AGENCY_NAV.map((n) => <a key={n} className={n === on ? 'is-on' : ''}>{n}{n === 'Inbox' && <span className="rs-badge">3</span>}</a>)}
        </nav>
        <div className="fo-bar-end">
          <span className="fo-btn fo-btn--primary">+ New job</span>
          <span className="fo-bar-link">Settings</span>
          <span className="rs-avatar">Z</span>
        </div>
      </div>
    </header>
  );
}

function AgencyHome() {
  const tiles = [
    { v: '$1,240', label: 'earned today', since: '3 Stripe payments in the Inbox', tone: 'jade' },
    { v: '$18.40', label: 'spent today', since: '$412 this month' },
    { v: '27', label: 'made today', since: 'artifacts filed since midnight' },
    { v: '4', label: 'agents working', since: '2 waiting on you', tone: 'gold' },
  ];
  return (
    <Scaled h={580}>
      <AgencyBar on="Home" />
      <div className="rs-canvas">
        <p className="fo-label">Thursday, November 6</p>
        <h1 className="rs-h1">Good morning, Zev.</h1>
        <div className="rs-tiles">
          {tiles.map((t) => <div key={t.label} className={`rs-tile ${t.tone ? `is-${t.tone}` : ''}`}><b>{t.v}</b><span>{t.label}</span><small>{t.since}</small></div>)}
        </div>
        <div className="rs-two">
          <section className="rs-pane">
            <p className="rs-pane-h">Waiting on you <em>3</em></p>
            {[['Work', 'Three article drafts are ready to review', 'Review'], ['Search', 'Four pages lost clicks this week', 'See what to fix'], ['Outreach', 'Two replies to read', 'Open']].map(([w, t, a]) => (
              <div key={t} className="rs-row"><em>{w}</em><span>{t}</span><span className="fo-btn">{a}</span></div>
            ))}
          </section>
          <section className="rs-pane">
            <p className="rs-pane-h">Agents working</p>
            {[['Writer', 'Drafting “What to automate first”'], ['Researcher', 'Reading three sources'], ['Fact-checker', 'Checking four claims'], ['Search', 'Pulling yesterday’s clicks']].map(([w, t]) => (
              <div key={w} className="rs-row rs-row--agent"><i className="rs-live" /><b>{w}</b><span>{t}</span></div>
            ))}
          </section>
        </div>
      </div>
    </Scaled>
  );
}

function AgencyWork() {
  const queue = ['What to automate first in a one-person agency', 'Clay vs Apollo for a two-person agency', 'The Marketing Engineer, issue 7', 'October report for a client', 'Three outreach replies'];
  const made = [['Sources', '3 pages, read Nov 6'], ['Model', 'Claude Opus 5.5'], ['Checks', 'Facts matched, voice passed'], ['Cost', '$0.42'], ['Time', '6 min']];
  return (
    <Scaled h={720}>
      <AgencyBar on="Work" />
      <div className="rs-canvas rs-split">
        <aside className="rs-pane rs-queue">
          <p className="rs-pane-h">Waiting on you <em>3</em></p>
          {queue.map((q, i) => <div key={q} className={`rs-qrow ${i === 0 ? 'is-on' : ''}`}><b>{q}</b><small>{i < 3 ? 'Ready to review' : 'In progress'}</small></div>)}
        </aside>
        <section className="rs-pane rs-detail">
          <p className="fo-label fo-label--jade">Article · ready to review</p>
          <h2 className="rs-h2">What to automate first in a one-person agency</h2>
          <p className="rs-meta">1,180 words · drafted by the Writer · checked by the Fact-checker</p>
          <p className="rs-excerpt">Start with the work you repeat every week and check every time: the research before a client call, the report after it, the first draft of a post. Leave the decisions to yourself…</p>
          <p className="rs-pane-h">How it was made</p>
          <dl className="rs-made">{made.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          <div className="rs-actions"><span className="fo-btn fo-btn--primary"><Check size={14} />Approve</span><span className="fo-btn">Send back with a note</span></div>
        </section>
      </div>
    </Scaled>
  );
}

function AgencySearch() {
  const rows = [
    ['ai marketing agency tools', '312', '−38%', '6.1', 'Update the page'],
    ['claude code for marketers', '0', 'rising', '—', 'Write a new page'],
    ['n8n vs make', '148', '+22%', '7.4', 'Add a comparison'],
    ['marketing engineer', '96', '+9%', '4.8', 'Keep'],
    ['ai seo for local business', '41', '−12%', '11.2', 'Refresh the examples'],
  ];
  return (
    <Scaled h={720}>
      <AgencyBar on="Search" />
      <div className="rs-canvas">
        <div className="rs-search-head">
          <div><p className="fo-label">esy.com · last 28 days</p><h1 className="rs-h1 rs-h1--sm">What to make next</h1></div>
          <div className="rs-sources"><span>Search Console</span><span>GA4</span><span>Bing</span></div>
        </div>
        <div className="rs-tiles rs-tiles--3">
          {[['4,812', 'clicks', '+12% on the 28 days before'], ['212K', 'impressions', '+31%'], ['14.2', 'average position', 'from 16.0']].map(([v, l, s]) => <div key={l} className="rs-tile"><b>{v}</b><span>{l}</span><small>{s}</small></div>)}
        </div>
        <section className="rs-pane">
          <div className="rs-table rs-table-h"><span>Search</span><span>Clicks</span><span>Change</span><span>Position</span><span>Next</span></div>
          {rows.map((r) => <div key={r[0]} className="rs-table"><b>{r[0]}</b><span>{r[1]}</span><span className={r[2].startsWith('−') ? 'is-down' : 'is-up'}>{r[2]}</span><span>{r[3]}</span><em>{r[4]}</em></div>)}
        </section>
      </div>
    </Scaled>
  );
}

// ── compose: its editor bar, then the piece ──────────────────────────────────────────────

function ComposeBar({ status }: { status: string }) {
  return (
    <header className="rs-cbar">
      <span className="rs-cbar-back">← Library</span>
      <span className="fo-lockup"><span className="fo-wordmark">esy</span><span className="fo-lockup-sep" /><span className="fo-lockup-name">Compose</span></span>
      <span className="rs-cbar-doc">{DOC.publication} · {DOC.story}</span>
      <span className="rs-chip is-live">{status}</span>
      <span className="rs-cbar-end">{DOC.words} words · one source</span>
    </header>
  );
}

function ComposeChecks() {
  return (
    <Scaled h={700}>
      <ComposeBar status="Live" />
      <div className="rs-ccanvas">
        <article className="rs-doc">
          <p className="fo-label fo-label--jade">{DOC.publication} · {DOC.story}</p>
          <h1 className="rs-doc-h">{DOC.headline}</h1>
          <p className="rs-doc-dek">{DOC.dek}</p>
          {DOC.body.map((_, p) => (
            <p key={p}>{splitClaims(p).map((part, i) => part.check == null ? <span key={i}>{part.text}</span> : <mark key={i} className={part.check === 1 ? 'is-on' : ''}>{part.text}</mark>)}</p>
          ))}
        </article>
        <aside className="rs-checks">
          <p className="rs-pane-h">Fact-checker · {DOC.checks.length} claims</p>
          {DOC.checks.map((c, i) => (
            <div key={c.claim} className={`rs-check ${i === 1 ? 'is-on' : ''}`}>
              {c.note.includes('Re-check') ? <RefreshCw size={14} /> : <Check size={14} />}
              <span><b>“{c.claim}”</b>{c.note}</span>
            </div>
          ))}
          <div className="rs-source"><small>Source</small><b>{DOC.source.publisher}</b><span>{DOC.source.title} · {DOC.source.read}</span></div>
        </aside>
      </div>
    </Scaled>
  );
}

function ComposeLibrary() {
  return (
    <Scaled h={640}>
      <header className="rs-cbar">
        <span className="fo-lockup"><span className="fo-wordmark">esy</span><span className="fo-lockup-sep" /><span className="fo-lockup-name">Compose</span></span>
        <span className="rs-cbar-doc">Library</span>
        <span className="rs-cbar-end"><span className="fo-btn fo-btn--primary">+ New piece</span></span>
      </header>
      <div className="rs-canvas">
        <div className="rs-search-head">
          <div><p className="fo-label">Publication</p><h1 className="rs-h1 rs-h1--sm">AI Marketing News</h1></div>
          <div className="rs-team">{['Researcher', 'Writer', 'Fact-checker', 'You'].map((r) => <span key={r}>{r}</span>)}</div>
        </div>
        <section className="rs-pane">
          {POSTS.map((p) => (
            <div key={p.slug} className="rs-post"><small>{p.story}</small><b>{p.title}</b><span className="rs-chip is-live">Live</span></div>
          ))}
        </section>
      </div>
    </Scaled>
  );
}

// ── scout: esy.com/scout's own page ──────────────────────────────────────────────────────

function ScoutBar() {
  return (
    <header className="ld-head rs-scoutbar">
      <span className="fo-lockup ld-lockup"><span className="fo-wordmark">esy</span><span className="fo-lockup-sep" /><span className="fo-lockup-name">Scout</span></span>
      <nav className="ld-head-nav"><a>How to read a map</a><a>The directory</a><a>How we know</a></nav>
      <span className="fo-btn fo-btn--primary ld-head-cta">Get the newsletter</span>
    </header>
  );
}

function ScoutMapPage() {
  const f = FUNNELS.find((x) => x.id === 'gamma')!;
  return (
    <Scaled h={770}>
      <ScoutBar />
      <div className="rs-scout">
        <div className="ld-maptabs">{FUNNELS.map((x) => <button key={x.id} type="button" className={x.id === 'gamma' ? 'is-on' : ''}><span>{x.name[0]}</span>{x.name}</button>)}</div>
        <div className="ld-mapcap"><h2>{f.title}</h2><p><Sparkles size={14} /><span><b>The move.</b> {f.move.text}</span></p></div>
        <FunnelMap f={f} skin="plate" pick={null} setPick={() => {}} />
      </div>
    </Scaled>
  );
}

function ScoutBasisPage() {
  return (
    <Scaled h={520}>
      <ScoutBar />
      <div className="rs-scout rs-scout--band"><HowWeKnow /></div>
    </Scaled>
  );
}

function ScoutDirectoryPage() {
  return (
    <Scaled h={900}>
      <ScoutBar />
      <div className="rs-scout"><Directory open={() => {}} /></div>
    </Scaled>
  );
}

export function OsScreen({ id }: { id: FeatureVisual }) {
  switch (id) {
    case 'agency-today': return <AgencyHome />;
    case 'agency-approve': return <AgencyWork />;
    case 'agency-search': return <AgencySearch />;
    case 'compose-team': return <div className="rs-replay"><ComposeReplay /></div>;
    case 'compose-checks': return <ComposeChecks />;
    case 'compose-posts': return <ComposeLibrary />;
    case 'scout-map': return <ScoutMapPage />;
    case 'scout-basis': return <ScoutBasisPage />;
    case 'scout-directory': return <ScoutDirectoryPage />;
  }
}
