'use client';

// Shared pieces for the product-homepage prototypes (2026-10-18): the header,
// the os.esy.com app frame, the product panels, and the bands every take
// reuses. The product panels are redrawn here from os.esy.com's real /agency
// Search, Data and Work screens and the sign-in's product snippets
// (os.esy.com src/components/folio/agency/productproto.tsx, search.css and
// folio.css: its tokens, panel, table and left-accent row styles), so the
// shots read as the real app. Per Zev's rules since then: no pills (inline
// rows with hairlines instead), and square corners on any left-accent box.

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, BarChart3, MessageSquareQuote, Plug, Sparkles, TrendingUp } from 'lucide-react';
import { ClientMark, CLIENTS } from './clients';
import {
  ANSWERS_SEEN, BY_ENGINE, CITATIONS, CITED, CITED_WEEKS, CLIENT_RANKS, CONNECTED, DATA, SAMPLE_NOTE, WORK, WORK_ROWS, n, type Engine,
} from './sample';

export const SIGNUP = 'https://os.esy.com/signup';
export const SIGNIN = 'https://os.esy.com/signin';
export const signup = (take: string) => `${SIGNUP}?src=proto-${take}`;

/* ── The page frame ─────────────────────────────────────────────────────── */

/** The wordmark as the header draws it: Black Ops One, the e in teal. */
export function Wordmark() {
  return <span className="ph-mark" aria-label="Esy"><span aria-hidden="true">e</span>sy</span>;
}

/** The product homepage's header: the publication moves to /newsletter. */
export function ProductHeader({ take, onDark = false }: { take: string; onDark?: boolean }) {
  return (
    <header className={`ph-head${onDark ? ' is-dark' : ''}`}>
      <div className="ph-head-in">
        <Link href="#top" className="ph-head-brand"><Wordmark /><span className="ph-head-rule" aria-hidden="true" /><span className="ph-head-tag">AI search</span></Link>
        <nav className="ph-head-nav" aria-label="Primary">
          <a href="#product">Product</a>
          <Link href="/newsletter/">Newsletter</Link>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="ph-head-cta">
          <a href={SIGNIN} className="ph-head-signin">Sign in</a>
          <a href={signup(take)} className="ph-btn ph-btn--sm">Get started</a>
        </div>
      </div>
    </header>
  );
}

/** Light/dark for the prototype: a quiet strip above the picker. */
export function useTheme(): ['light' | 'dark', (t: 'light' | 'dark') => void] {
  const [t, setT] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ph-theme');
      if (saved === 'light' || saved === 'dark') setT(saved);
    } catch {}
  }, []);
  const set = (v: 'light' | 'dark') => {
    setT(v);
    try { localStorage.setItem('ph-theme', v); } catch {}
  };
  return [t, set];
}

export function ThemeStrip({ theme, set }: { theme: 'light' | 'dark'; set: (t: 'light' | 'dark') => void }) {
  return (
    <div className="ph-themes" role="group" aria-label="Prototype theme">
      <span>Prototype</span>
      {(['light', 'dark'] as const).map((t) => (
        <button key={t} type="button" aria-pressed={theme === t} className={theme === t ? 'is-on' : ''} onClick={() => set(t)}>{t === 'light' ? 'Light' : 'Dark'}</button>
      ))}
    </div>
  );
}

/* ── Small real-looking pieces ──────────────────────────────────────────── */

/** A sparkline; `down` means smaller is better (a rank). */
export function Spark({ values, down = false, w = 120, h = 32 }: { values: number[]; down?: boolean; w?: number; h?: number }) {
  const lo = Math.min(...values), hi = Math.max(...values), span = hi - lo || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * (w - 4) + 2;
    const t = (v - lo) / span;
    return [x, down ? 2 + t * (h - 4) : h - 2 - t * (h - 4)];
  });
  const last = pts[pts.length - 1];
  return (
    <svg className="ph-spark" viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
      <polyline points={pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="3" fill="currentColor" />
    </svg>
  );
}

/** An answer engine's small mark: a square tile with its initial (no pills). */
const ENGINE_MARK: Record<Engine, string> = { ChatGPT: 'C', Perplexity: 'P', Copilot: 'B', 'Google AI Overviews': 'G' };
export const EngineMark = ({ engine }: { engine: Engine }) => <span className="ph-eng" aria-hidden="true">{ENGINE_MARK[engine]}</span>;

/** A client's mark and name, small. */
export const ClientName = ({ id, site = false }: { id: keyof typeof CLIENTS; site?: boolean }) => (
  <span className="ph-client"><ClientMark id={id} size={20} /><span>{site ? CLIENTS[id].site : CLIENTS[id].name}</span></span>
);

/* ── The product panels (os.esy.com /agency Search, Data, Work) ─────────── */

/** AI answers: how many named a client this week, by engine, and the latest quotes. */
export function CitedPanel({ rows = 3 }: { rows?: number }) {
  return (
    <section className="ph-panel" aria-label="AI answers, sample">
      <header className="ph-panel-h"><span className="ph-k"><MessageSquareQuote size={13} aria-hidden="true" /> AI answers · this week</span><Spark values={CITED_WEEKS} w={84} h={24} /></header>
      <p className="ph-big"><b>Cited in {CITED} answers</b> <span>of {ANSWERS_SEEN} checked</span></p>
      <ul className="ph-engines">
        {BY_ENGINE.map((e) => <li key={e.engine}><EngineMark engine={e.engine} />{e.engine}<b>{e.n}</b></li>)}
      </ul>
      <ul className="ph-cites">
        {CITATIONS.slice(0, rows).map((c) => (
          <li key={c.q}><ClientName id={c.client} site /> quoted for <q>{c.q}</q><span className="ph-cite-eng"><EngineMark engine={c.engine} />{c.engine}</span></li>
        ))}
      </ul>
    </section>
  );
}

/** Rankings by client: Google and Bing positions, the share of AI answers, the trend. */
export function RankPanel({ rows = 3, compact = false }: { rows?: number; compact?: boolean }) {
  return (
    <section className="ph-panel" aria-label="Rankings, sample">
      <header className="ph-panel-h"><span className="ph-k"><TrendingUp size={13} aria-hidden="true" /> Rankings · AI and classic</span></header>
      <div className="ph-table-scroll">
      <table className="ph-table">
        <thead><tr><th scope="col">Client</th><th scope="col">Google</th><th scope="col">Bing</th><th scope="col">In AI answers</th>{!compact && <th scope="col">8 weeks</th>}</tr></thead>
        <tbody>
          {CLIENT_RANKS.slice(0, rows).map((r) => (
            <tr key={r.client}>
              <th scope="row"><ClientName id={r.client} /></th>
              <td>#{r.google}</td><td>#{r.bing}</td><td>{r.aiShare}%</td>
              {!compact && <td className="ph-up"><Spark values={r.trend} down w={70} h={20} /></td>}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </section>
  );
}

/** Data: what's connected, and what it reports. */
export function DataPanel({ sources = true }: { sources?: boolean }) {
  return (
    <section className="ph-panel" aria-label="Analytics, sample">
      <header className="ph-panel-h"><span className="ph-k"><BarChart3 size={13} aria-hidden="true" /> Data · last 28 days</span><Spark values={DATA.clickWeeks} w={84} h={24} /></header>
      <dl className="ph-kpis">
        <div><dt>Clicks</dt><dd>{n(DATA.clicks)}</dd></div>
        <div><dt>Impressions</dt><dd>{n(DATA.impressions)}</dd></div>
        <div><dt>Visits from AI answers</dt><dd>{DATA.aiVisits}</dd></div>
      </dl>
      {sources && (
        <ul className="ph-sources" aria-label="Connected sources">
          {CONNECTED.map((s) => <li key={s.name}><Plug size={13} aria-hidden="true" /><b>{s.name}</b><em>{s.fresh}</em></li>)}
        </ul>
      )}
    </section>
  );
}

/** The AI marketing work behind the numbers: Work and Outreach. */
export function WorkPanel() {
  const label = { approved: 'Live', waiting: 'For your OK', reply: 'Reply' } as const;
  return (
    <section className="ph-panel" aria-label="The work, sample">
      <header className="ph-panel-h"><span className="ph-k"><Sparkles size={13} aria-hidden="true" /> Work · this week</span></header>
      <p className="ph-work-sum"><span><b>{WORK.approved} pages</b> approved</span><span><b>{WORK.waiting} drafts</b> waiting for you</span><span><b>{WORK.replies} replies</b> to outreach</span></p>
      <ul className="ph-work">
        {WORK_ROWS.map((w) => <li key={w.what} className={`is-${w.state}`}><ClientMark id={w.client} size={20} /><span>{w.what}</span><em>{label[w.state]}</em></li>)}
      </ul>
    </section>
  );
}

/* ── The app frame ──────────────────────────────────────────────────────── */

/** A fixed-width app screen scaled to fit its box, like a screenshot. */
export function Scaled({ width = 1180, height = 640, children }: { width?: number; height?: number; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(0.6);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setK(Math.min(1, e.contentRect.width / width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div className="ph-scaled" ref={box} style={{ height: height * k }}>
      <div className="ph-scaled-in" style={{ width, height, transform: `scale(${k})` }}>{children}</div>
    </div>
  );
}

/** os.esy.com/agency/search in a browser frame, drawn from the real screen. */
export function AppShot({ tab = 'AI answers' }: { tab?: 'AI answers' | 'Rankings' | 'Data' }) {
  return (
    <figure className="ph-shot">
      <div className="ph-browser" aria-hidden="true">
        <span className="ph-dots"><i /><i /><i /></span>
        <span className="ph-url">os.esy.com/agency/search</span>
      </div>
      <Scaled>
        <div className="ph-app">
          <div className="ph-app-bar">
            <span className="ph-app-lockup"><Wordmark /><span className="ph-head-rule" aria-hidden="true" /><span>agency</span></span>
            <nav aria-hidden="true">{['Clients', 'Work', 'Outreach', 'Search', 'Inbox', 'Data'].map((x) => <span key={x} className={x === 'Search' ? 'is-on' : ''}>{x}</span>)}</nav>
          </div>
          <div className="ph-app-body">
            <div className="ph-app-title">
              <h3>Search and Rankings</h3>
              <span>4 clients · week of Oct 12</span>
            </div>
            <div className="ph-app-tabs" aria-hidden="true">{(['AI answers', 'Rankings', 'Data'] as const).map((x) => <span key={x} className={x === tab ? 'is-on' : ''}>{x}</span>)}</div>
            <div className="ph-app-grid">
              <CitedPanel rows={4} />
              <div className="ph-app-col">
                <RankPanel rows={4} compact />
                <DataPanel sources={false} />
              </div>
            </div>
          </div>
        </div>
      </Scaled>
      <figcaption className="ph-sample">{SAMPLE_NOTE}</figcaption>
    </figure>
  );
}

/* ── Bands every take reuses ───────────────────────────────────────────── */

/** The publication, moved: a band that sends readers to /newsletter. */
export function NewsletterBand() {
  return (
    <section className="ph-letter" aria-label="The Marketing Engineer">
      <div className="ph-wrap ph-letter-in">
        <Image src="/images/newsletter/covers/vinyl-mason/5.webp" alt="" width={320} height={180} className="ph-letter-cover" />
        <div>
          <p className="ph-kicker">The newsletter</p>
          <h2>The Marketing Engineer</h2>
          <p>One AI marketing system a week, the skill that runs it, and what it did for us. Free.</p>
        </div>
        <Link href="/newsletter/" className="ph-link">Read The Marketing Engineer <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

/** Pricing doesn't exist yet: say so plainly, never invent a price. */
export function PricingNote({ take }: { take: string }) {
  return (
    <section id="pricing" className="ph-pricing">
      <div className="ph-wrap">
        <p className="ph-kicker">Pricing</p>
        <h2>Plans for agencies and brands.</h2>
        <p className="ph-proto-note">Prototype: there’s no pricing page yet, so this links to sign-up. Prices go here once they’re set.</p>
        <a href={signup(take)} className="ph-btn">Get started <ArrowRight size={16} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

/** Mason, small and quiet: an existing render, never the hero. */
export function MasonQuiet({ pose = 'rest', className = '' }: { pose?: 'rest' | 'point'; className?: string }) {
  const size = pose === 'rest' ? { w: 480, h: 443 } : { w: 560, h: 471 };
  return <Image src={`/prototypes/product-home/mason-${pose}.webp`} alt="" width={size.w} height={size.h} className={`ph-mason ${className}`} />;
}
