'use client';

// The funnel map: three columns of places (Found → Land → Pay), wired by the routes people take, the
// move's route lit and numbered. Ported 2026-11-07 from the scout.esy.com repo
// (src/components/prototypes/funnel-proto.tsx, `Stages`), keeping only the two finishes Zev picked:
//   plate  F6, the map on a navy plate (esy.com/scout's hero)
//   quiet  F5, borderless cards on a soft grey panel
// In both, the loop is marked ↺ on the two places it joins, with its sentence under the map (Zev,
// "option 2"): a wire drawn around the outside read as a line to nowhere.

import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { BASIS, COLS, colIndex, isLoop, nodeOf, onMove, type Basis, type FLink, type FNode, type Funnel } from './funnels';

export type Skin = 'plate' | 'quiet';

export const BasisChip = ({ b }: { b: Basis }) => <span className={`sc-basis is-${b}`} title={BASIS[b].says}>{BASIS[b].name}</span>;

// Card height and gap per finish, and each column's left edge and width, in per cent of the map.
const DIMS: Record<Skin, [number, number]> = { quiet: [60, 14], plate: [54, 10] };
const COL_X = [0, 36, 72], COL_W = 28;

const wireClass = (l: FLink, f: Funnel, pick: string | null) =>
  ['fm-wire', `is-${l.basis}`, onMove(f, l) ? 'is-move' : '', pick && (l.from === pick || l.to === pick) ? 'is-picked' : '', pick && !(l.from === pick || l.to === pick) ? 'is-dim' : ''].join(' ');

export function FunnelMap({ f, skin, pick: picked, setPick }: { f: Funnel; skin: Skin; pick: string | null; setPick: (id: string | null) => void }) {
  const [CARD, GAP] = DIMS[skin];
  // Hover lights a place's routes the way a click does, without keeping it.
  const [hover, setHover] = useState<string | null>(null);
  const pick = hover ?? picked;
  const cols = COLS.map((c) => f.nodes.filter((n) => n.col === c.key));
  const most = Math.max(...cols.map((c) => c.length));

  // Links from Found straight to Pay skip Land: they run in a lane over (or under) the Land column,
  // never behind its cards, so room is kept above and below the cards for those lanes.
  const skips = f.links.filter((l) => !isLoop(f, l) && colIndex(nodeOf(f, l.to).col) - colIndex(nodeOf(f, l.from).col) > 1);
  const LANE = skips.length ? 14 + skips.length * 7 : 0;
  const body = most * (CARD + GAP) - GAP + LANE * 2;
  const H = body + 8;

  // Each column is centred on the tallest one, so a single Land card sits in the middle.
  const pos = useMemo(() => {
    const m = new Map<string, { x: number; y: number }>();
    cols.forEach((list, ci) => {
      const off = (body - (list.length * (CARD + GAP) - GAP)) / 2;
      list.forEach((n, i) => m.set(n.id, { x: COL_X[ci], y: off + i * (CARD + GAP) }));
    });
    return m;
  }, [f, body, CARD, GAP]); // eslint-disable-line react-hooks/exhaustive-deps

  const move = new Set(f.move.path);
  const loop = f.links.find((l) => isLoop(f, l));
  const loopIds = loop ? [loop.from, loop.to] : [];
  const LOOP = '__loop'; // the hover value that lights the loop's two places
  const stepOf = (id: string) => f.move.path.indexOf(id) + 1;

  // Lit: the move's places by default; with something picked or hovered, it and its neighbours.
  const lit = (n: FNode) => {
    if (pick === LOOP) return loopIds.includes(n.id);
    if (pick && loopIds.includes(pick) && loopIds.includes(n.id)) return true;
    if (pick) return n.id === pick || f.links.some((l) => (l.from === pick && l.to === n.id) || (l.to === pick && l.from === n.id));
    return move.has(n.id);
  };

  // One route as an SVG path in the map's 0–100 × H space.
  const wire = (l: FLink) => {
    const a = pos.get(l.from)!, b = pos.get(l.to)!;
    const ya = a.y + CARD / 2, yb = b.y + CARD / 2;
    if (a.x === b.x) return `M${a.x} ${ya} C${a.x - 5} ${ya}, ${a.x - 5} ${yb}, ${a.x} ${yb}`; // within a column: an arc on its left
    const xa = a.x + COL_W, xb = b.x;
    const k = skips.indexOf(l);
    if (k >= 0) {
      // Over the Land column when the target sits in the top half, under it otherwise; one lane each.
      const up = yb < body / 2, yr = up ? 6 + k * 7 : body - 6 - k * 7, m0 = COL_X[1] - 2, m1 = COL_X[1] + COL_W + 2;
      return `M${xa} ${ya} C${xa + 4} ${ya}, ${m0 - 4} ${yr}, ${m0} ${yr} L${m1} ${yr} C${m1 + 4} ${yr}, ${xb - 4} ${yb}, ${xb} ${yb}`;
    }
    return `M${xa} ${ya} C${xa + 5} ${ya}, ${xb - 5} ${yb}, ${xb} ${yb}`;
  };
  const wirePick = pick === LOOP ? null : pick;

  return (
    <div className="fm-scroll">
      <div className={`fm-stages fm-skin-${skin}`}>
        <div className="fm-heads">
          {COLS.map((c, i) => (
            <div key={c.key} style={{ left: `${COL_X[i]}%`, width: `${COL_W}%` }}>
              <p className="fm-head"><span>{i + 1}</span>{c.label}</p>
              <small>{c.sub}</small>
              {c.key === 'pay' && <small className="fm-trigger">↳ {f.trigger}</small>}
              {c.key === 'land' && f.between && <small className="fm-between">In between: {f.between.text}</small>}
            </div>
          ))}
        </div>
        <div className="fm-board" style={{ height: H }}>
          <svg className="fm-wires" viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" style={{ height: H }} aria-hidden="true">
            {f.links.filter((l) => !isLoop(f, l)).map((l) => <path key={l.from + l.to} d={wire(l)} className={wireClass(l, f, wirePick)} vectorEffect="non-scaling-stroke" />)}
          </svg>
          {f.nodes.map((n) => {
            const p = pos.get(n.id)!;
            const step = f.move.path.indexOf(n.id);
            return (
              <button
                key={n.id}
                type="button"
                className={`fm-node is-${n.basis} ${lit(n) ? 'is-lit' : ''} ${picked === n.id ? 'is-picked' : ''} ${step >= 0 ? 'is-step' : ''}`}
                style={{ left: `${p.x}%`, width: `${COL_W}%`, top: p.y, height: CARD, ['--i' as string]: colIndex(n.col) }}
                onClick={() => setPick(picked === n.id ? null : n.id)}
                onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(n.id)} onBlur={() => setHover(null)}
                aria-pressed={picked === n.id}
                title={n.note}
              >
                {step >= 0 && <span className="fm-step" aria-label={`Step ${step + 1} of the move`}>{step + 1}</span>}
                <b>{n.name}</b>
                <small>{n.figure ?? BASIS[n.basis].name}</small>
                {loop && loopIds.includes(n.id) && (
                  <span className="fm-loopmark" title={loop.note} aria-label={n.id === loop.from ? `The loop starts here and leads back to ${nodeOf(f, loop.to).name}` : `The loop comes back here from ${nodeOf(f, loop.from).name}`}>
                    <RotateCcw size={11} aria-hidden="true" />{n.id === loop.from ? 'brings the next' : `from step ${stepOf(loop.from)}`}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {loop && (
          <p className="fm-loopline" onMouseEnter={() => setHover(LOOP)} onMouseLeave={() => setHover(null)}>
            <RotateCcw size={14} aria-hidden="true" />
            <span><b>The loop.</b> {loop.note}</span>
            <small>{stepOf(loop.from) ? `Step ${stepOf(loop.from)}` : nodeOf(f, loop.from).name} → {stepOf(loop.to) ? `step ${stepOf(loop.to)}` : nodeOf(f, loop.to).name}</small>
          </p>
        )}
      </div>
    </div>
  );
}

/** What a picked place is, how we know it, its source, and every route in and out of it. */
export function Readout({ f, id }: { f: Funnel; id: string | null }) {
  const n = id ? nodeOf(f, id) : null;
  if (!n) return <p className="fm-readout fm-readout--empty">Pick any place on the map to see what it is, how we know, and the routes in and out.</p>;
  const ins = f.links.filter((l) => l.to === n.id);
  const outs = f.links.filter((l) => l.from === n.id);
  const route = (l: FLink, other: FNode, dir: '←' | '→') => (
    <li key={l.from + l.to}><span>{dir} {other.name}</span>{l.note && <small>{l.note}</small>}<BasisChip b={l.basis} /></li>
  );
  return (
    <div className="fm-readout" aria-live="polite">
      <p className="fo-label">{COLS[colIndex(n.col)].label} · {COLS[colIndex(n.col)].sub.toLowerCase()}</p>
      <h3>{n.name}{n.figure && <span>{n.figure}</span>}</h3>
      <p>{n.note} <BasisChip b={n.basis} />{n.source && <a className="fm-source" href={n.source} target="_blank" rel="noopener noreferrer nofollow">Source</a>}</p>
      {(ins.length > 0 || outs.length > 0) && (
        <ul className="fm-routes">
          {ins.map((l) => route(l, nodeOf(f, l.from), '←'))}
          {outs.map((l) => route(l, nodeOf(f, l.to), '→'))}
        </ul>
      )}
    </div>
  );
}
