'use client';
/* A creator's funnel as a diagram (2026-11-07, round 3 of /prototypes/scout-creators/). Zev: the
 * funnel section needs visuals that show the connections, simple associations, nothing generic or
 * complex. One graph, three drawings:
 *   wires  S10 · Wires  three columns (where they post → where they send people → what they sell)
 *                       joined by thin curves; resting on a card lights its path.
 *   lanes  S11 · Lanes  one row per platform, read left to right: the platform and its audience, the
 *                       pages it links to, the offers behind them.
 *   dots   S12 · Dots   no lines: each platform has a colour, and every page and offer it leads to
 *                       carries its dot; resting on a platform lights only its path.
 * The graph comes only from Scout's public fields: routes give platform → page, and a page is joined
 * to an offer when they share a URL or a name. */
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowRight, Facebook, Github, Instagram, Linkedin, Mail, Twitter, Youtube } from 'lucide-react';
import { relFor } from '@/lib/outbound';
import { BasisChip } from './FunnelMap';
import type { Basis } from './funnels';
import type { PublicCreator } from './CreatorPlans';

export type FunnelView = 'wires' | 'lanes' | 'dots';

const isBasis = (b?: string): b is Basis => b === 'counted' || b === 'seen' || b === 'reading' || b === 'open';
const bare = (name: string) => name.replace(/\s*\(.*$/, '').trim();
/** A page's identity: its address without protocol, www, query or trailing slash (or its name when it has no link). */
const key = (s: string) => s.toLowerCase().replace(/^https?:\/\/(www\.)?/, '').replace(/[?#].*$/, '').replace(/\/$/, '');
export const audience = (n?: number) => (n == null ? '' : n >= 1e6 ? `${(n / 1e6).toFixed(1).replace(/\.0$/, '')}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : String(n));

/** Each platform's mark; platforms without a mark use their first letter. */
export function PlatformMark({ name, size = 14 }: { name: string; size?: number }) {
  const n = bare(name).toLowerCase();
  const Icon = n === 'youtube' ? Youtube : n === 'instagram' ? Instagram : n === 'linkedin' ? Linkedin : n === 'x' || n === 'twitter' ? Twitter : n === 'facebook' ? Facebook : n === 'github' ? Github : n === 'newsletter' ? Mail : null;
  return Icon ? <Icon size={size} aria-hidden="true" /> : <span className="fv-letter" aria-hidden="true" style={{ width: size, height: size, fontSize: size * 0.7 }}>{bare(name)[0]}</span>;
}

// ── The graph ────────────────────────────────────────────────────────────────────────────

type GNode = { id: string; label: string; sub?: string; url?: string; basis?: string; price?: string; free?: boolean; aud?: number; note?: string };
export type Graph = { plats: GNode[]; stops: GNode[]; offers: GNode[]; edges: [string, string][] };

/** Platforms (biggest audience first) → pages they link to (each once) → offers behind those pages. */
export function graphOf(c: PublicCreator): Graph {
  const plats = new Map<string, GNode>();
  for (const p of c.platforms) plats.set(bare(p.name), { id: `p:${bare(p.name)}`, label: bare(p.name), aud: p.followers, url: p.url });
  for (const r of c.routes) if (!plats.has(r.from)) plats.set(r.from, { id: `p:${r.from}`, label: r.from });
  // A flow's unlinked steps ("comment a keyword") stay on the platform as its note.
  for (const r of c.routes.filter((x) => x.kind === 'flow')) {
    const p = plats.get(r.from); const how = r.hops.filter((h) => !h.url).map((h) => h.at);
    if (p && how.length) p.note = how.join(' → ');
  }
  const stops = new Map<string, GNode>();
  const edges: [string, string][] = [];
  for (const r of c.routes) r.hops.forEach((h) => {
    if (r.kind === 'flow' && !h.url) return;
    const k = key(h.url ?? h.at);
    if (!stops.has(k)) stops.set(k, { id: `s:${k}`, label: h.at, sub: h.does, url: h.url, basis: h.basis });
    const e: [string, string] = [`p:${r.from}`, `s:${k}`];
    if (!edges.some((x) => x[0] === e[0] && x[1] === e[1])) edges.push(e);
  });
  const offers = c.ladder.map((l, i) => ({ id: `o:${i}`, label: l.name, sub: l.what, url: l.url, basis: l.basis, price: l.price, free: l.kind === 'free' }));
  // A page leads to an offer when they share a URL or one name holds the other ("Maker School").
  for (const s of stops.values()) for (const o of offers) {
    const sameUrl = s.url && o.url && key(s.url) === key(o.url);
    const a = s.label.toLowerCase(), b = o.label.toLowerCase();
    const sameName = a.length > 3 && b.length > 3 && (a.includes(b) || b.includes(a));
    if (sameUrl || sameName) edges.push([s.id, o.id]);
  }
  return { plats: [...plats.values()].sort((x, y) => (y.aud ?? 0) - (x.aud ?? 0)), stops: [...stops.values()], offers, edges };
}

/** Everything joined to `id`, both ways along the path (platform → page → offer). */
function pathOf(g: Graph, id: string | null) {
  if (!id) return null;
  const on = new Set([id]);
  const walk = (dir: 0 | 1) => { let grew = true; while (grew) { grew = false; for (const e of g.edges) { const [a, b] = dir ? [e[1], e[0]] : e; if (on.has(a) && !on.has(b)) { on.add(b); grew = true; } } } };
  walk(0); walk(1);
  // Walking back then forward would pull in siblings; keep only the true path from a platform.
  if (id.startsWith('p:')) { const fwd = new Set([id]); let grew = true; while (grew) { grew = false; for (const [a, b] of g.edges) if (fwd.has(a) && !fwd.has(b)) { fwd.add(b); grew = true; } } return fwd; }
  return on;
}

function Linked({ url, children }: { url?: string; children: ReactNode }) {
  return url ? <a href={url} target="_blank" rel={relFor(url, { newTab: true })}>{children}</a> : <>{children}</>;
}

function PlatCard({ n }: { n: GNode }) {
  return (
    <>
      <span className="fv-plat-top"><PlatformMark name={n.label} size={15} /><Linked url={n.url}><b>{n.label}</b></Linked><span className="fv-aud">{audience(n.aud)}</span></span>
      {n.note && <small>{n.note}</small>}
    </>
  );
}
function StopCard({ n }: { n: GNode }) {
  return (<><Linked url={n.url}><b>{n.label}</b></Linked>{n.sub && <span className="fv-sub">{n.sub}</span>}{isBasis(n.basis) && <BasisChip b={n.basis} />}</>);
}
function OfferCard({ n }: { n: GNode }) {
  return (<><span className={`fv-price ${n.free ? 'is-free' : ''}`}>{n.price}</span><Linked url={n.url}><b>{n.label}</b></Linked>{isBasis(n.basis) && <BasisChip b={n.basis} />}</>);
}

const HEADS = ['Where they post', 'Where they send people', 'What they sell'];

// ── S10 · Wires ──────────────────────────────────────────────────────────────────────────

function Wires({ g }: { g: Graph }) {
  const box = useRef<HTMLDivElement>(null);
  const refs = useRef(new Map<string, HTMLElement>());
  const [paths, setPaths] = useState<{ d: string; a: string; b: string }[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hot, setHot] = useState<string | null>(null);
  const lit = pathOf(g, hot);

  // Curves from each card's right edge to its target's left edge, measured in the diagram's own box.
  const measure = useCallback(() => {
    const root = box.current; if (!root) return;
    const r0 = root.getBoundingClientRect();
    setSize({ w: r0.width, h: r0.height });
    setPaths(g.edges.flatMap(([a, b]) => {
      const ea = refs.current.get(a), eb = refs.current.get(b); if (!ea || !eb) return [];
      const ra = ea.getBoundingClientRect(), rb = eb.getBoundingClientRect();
      const x1 = ra.right - r0.left, y1 = ra.top + ra.height / 2 - r0.top, x2 = rb.left - r0.left, y2 = rb.top + rb.height / 2 - r0.top;
      const mx = (x1 + x2) / 2;
      return [{ d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`, a, b }];
    }));
  }, [g]);
  useLayoutEffect(() => { measure(); }, [measure]);
  useEffect(() => {
    const ro = new ResizeObserver(measure); if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, [measure]);

  const cell = (n: GNode, kind: 'plat' | 'stop' | 'offer') => (
    <div
      key={n.id}
      ref={(el) => { if (el) refs.current.set(n.id, el); else refs.current.delete(n.id); }}
      className={`fv-card fv-${kind} ${lit ? (lit.has(n.id) ? 'is-lit' : 'is-dim') : ''}`}
      onMouseEnter={() => setHot(n.id)} onMouseLeave={() => setHot(null)} onFocus={() => setHot(n.id)} onBlur={() => setHot(null)} tabIndex={0}
    >
      {kind === 'plat' ? <PlatCard n={n} /> : kind === 'stop' ? <StopCard n={n} /> : <OfferCard n={n} />}
    </div>
  );
  return (
    <div className="fv fv--wires" ref={box}>
      <svg className="fv-wires" width={size.w} height={size.h} aria-hidden="true">
        {paths.map((p) => <path key={p.a + p.b} d={p.d} className={lit ? (lit.has(p.a) && lit.has(p.b) ? 'is-lit' : 'is-dim') : ''} />)}
      </svg>
      {[g.plats, g.stops, g.offers].map((col, i) => (
        <div key={i} className="fv-col">
          <p className="cp-label">{HEADS[i]}</p>
          {col.map((n) => cell(n, i === 0 ? 'plat' : i === 1 ? 'stop' : 'offer'))}
          {col.length === 0 && <p className="cp-none">Not checked.</p>}
        </div>
      ))}
    </div>
  );
}

// ── S11 · Lanes ──────────────────────────────────────────────────────────────────────────

function Lanes({ g }: { g: Graph }) {
  const byId = new Map([...g.stops, ...g.offers].map((n) => [n.id, n]));
  const reached = new Set<string>();
  const lanes = g.plats.map((p) => {
    const stops = g.edges.filter(([a]) => a === p.id).map(([, b]) => byId.get(b)!).filter(Boolean);
    const offers = [...new Set(stops.flatMap((s) => g.edges.filter(([a]) => a === s.id).map(([, b]) => b)))].map((id) => byId.get(id)!);
    offers.forEach((o) => reached.add(o.id));
    return { p, stops, offers };
  });
  const rest = g.offers.filter((o) => !reached.has(o.id));
  return (
    <div className="fv fv--lanes">
      <div className="fv-lane fv-lane--head" aria-hidden="true"><span>{HEADS[0]}</span><span>{HEADS[1]}</span><span>{HEADS[2]}</span></div>
      {lanes.map(({ p, stops, offers }) => (
        <div key={p.id} className="fv-lane">
          <div className="fv-card fv-plat"><PlatCard n={p} /></div>
          <div className="fv-chain">
            {stops.length ? stops.map((s) => <span key={s.id} className="fv-chip"><ArrowRight size={12} aria-hidden="true" /><Linked url={s.url}>{s.label}</Linked></span>) : <span className="fv-none">Stays on the platform</span>}
          </div>
          <div className="fv-chain">
            {offers.length ? offers.map((o) => <span key={o.id} className="fv-chip is-offer"><ArrowRight size={12} aria-hidden="true" /><Linked url={o.url}>{o.label}</Linked><em>{o.price}</em></span>) : <span className="fv-none">—</span>}
          </div>
        </div>
      ))}
      {rest.length > 0 && (
        <div className="fv-rest">
          <p className="cp-label">Also sold</p>
          {rest.map((o) => <span key={o.id} className="fv-chip is-offer"><Linked url={o.url}>{o.label}</Linked><em>{o.price}</em></span>)}
        </div>
      )}
    </div>
  );
}

// ── S12 · Dots ───────────────────────────────────────────────────────────────────────────

const DOTS = ['#0A2540', '#00A896', '#C9A227', '#7A8CA3', '#2BD8BB', '#4A5F75'];

function Dots({ g }: { g: Graph }) {
  const [hot, setHot] = useState<string | null>(null);
  const colour = new Map(g.plats.map((p, i) => [p.id, DOTS[i % DOTS.length]]));
  // Which platforms reach each page and offer.
  const from = new Map<string, string[]>();
  for (const p of g.plats) for (const id of pathOf(g, p.id) ?? []) if (id !== p.id) from.set(id, [...(from.get(id) ?? []), p.id]);
  const lit = hot ? pathOf(g, hot) : null;
  const dots = (id: string) => <span className="fv-dots" aria-hidden="true">{(from.get(id) ?? []).map((p) => <i key={p} style={{ background: colour.get(p) }} />)}</span>;
  const state = (id: string) => (lit ? (lit.has(id) ? 'is-lit' : 'is-dim') : '');
  return (
    <div className="fv fv--dots">
      <div className="fv-col">
        <p className="cp-label">{HEADS[0]}</p>
        {g.plats.map((p) => (
          <button key={p.id} type="button" className={`fv-card fv-plat ${state(p.id)} ${hot === p.id ? 'is-hot' : ''}`} onMouseEnter={() => setHot(p.id)} onMouseLeave={() => setHot(null)} onFocus={() => setHot(p.id)} onBlur={() => setHot(null)}>
            <i className="fv-swatch" style={{ background: colour.get(p.id) }} aria-hidden="true" />
            <PlatCard n={p} />
          </button>
        ))}
      </div>
      <div className="fv-col">
        <p className="cp-label">{HEADS[1]}</p>
        {g.stops.map((s) => <div key={s.id} className={`fv-card fv-stop ${state(s.id)}`}>{dots(s.id)}<StopCard n={s} /></div>)}
        {g.stops.length === 0 && <p className="cp-none">Not checked.</p>}
      </div>
      <div className="fv-col">
        <p className="cp-label">{HEADS[2]}</p>
        {g.offers.map((o) => <div key={o.id} className={`fv-card fv-offer ${state(o.id)}`}>{dots(o.id)}<OfferCard n={o} /></div>)}
        {g.offers.length === 0 && <p className="cp-none">Not checked.</p>}
      </div>
    </div>
  );
}

export function FunnelDiagram({ c, view }: { c: PublicCreator; view: FunnelView }) {
  const g = graphOf(c);
  return view === 'lanes' ? <Lanes g={g} /> : view === 'dots' ? <Dots g={g} /> : <Wires g={g} />;
}
