'use client';

// Copied from os.esy.com (src/components/folio/app/runway-charts.tsx, main @
// e051361, 2026-10-05): the live Runway page's charts, unchanged except for
// the two imports, which point at the prototype's sample types and month
// label. Re-copy rather than edit.
import { useEffect, useRef, useState } from 'react';
import type { CashflowMonth } from './sample';
import { monthLabel } from './format';

// ───────────────────────────────────────────────────────────────────────────
// Runway's charts on live data (/agency/runway, from /_agency/runway/i4).
// The prototypes' charts, given props instead of samples: lines draw in, bars
// grow, every chart reads a month or a day on hover, motion stops for anyone
// who asked the system to reduce it. Styles: rx-/ri- in _agency/agency.css.
// ───────────────────────────────────────────────────────────────────────────

export const usd = (cents: number) => `${cents < 0 ? '−' : ''}$${Math.abs(Math.round(cents / 100)).toLocaleString('en-US')}`;
export const usdK = (cents: number) => {
  const v = Math.abs(cents / 100);
  return `${cents < 0 ? '−' : ''}$${v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k` : Math.round(v)}`;
};
export const pct = (x: number) => `${x > 0 ? '+' : x < 0 ? '−' : ''}${Math.abs(Math.round(x * 100))}%`;
export const avg = (xs: number[]) => xs.reduce((n, x) => n + x, 0) / (xs.length || 1);
const MON = (period: string) => monthLabel(period).slice(0, 3);

function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => { const t = requestAnimationFrame(() => setM(true)); return () => cancelAnimationFrame(t); }, []);
  return m;
}

/** A word-sized line (Tufte). */
export function Spark({ values, w = 110, h = 24 }: { values: number[]; w?: number; h?: number }) {
  if (values.length < 2) return null;
  const min = Math.min(...values), max = Math.max(...values);
  const x = (i: number) => (i / (values.length - 1)) * (w - 4) + 2, y = (v: number) => h - 3 - ((v - min) / (max - min || 1)) * (h - 6);
  return (
    <svg className="rx-spark" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <path pathLength={1} className="rx-draw" d={values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('')} fill="none" />
      <circle cx={x(values.length - 1)} cy={y(values[values.length - 1])} r="2.5" />
    </svg>
  );
}

/** A line with a soft area that draws in; hover reads a point. Optional projection past the last value, and a floor band. */
export function LineChart({ values, future = [], labels, fmt, floor, aria }: {
  values: number[]; future?: number[]; labels: string[]; fmt: (v: number) => string; floor?: number; aria: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  if (values.length < 2) return <p className="rv-quiet">Not enough history to draw yet.</p>;
  const w = 760, h = 220, pad = 28, top = 18, bottom = 26;
  const all = [...values, ...future, floor ?? values[0], 0];
  const max = Math.max(...all) * 1.05, min = Math.min(0, ...all);
  const n = values.length + future.length;
  const x = (i: number) => pad + (i / (n - 1)) * (w - pad * 2);
  const y = (v: number) => top + (1 - (v - min) / (max - min || 1)) * (h - top - bottom);
  const line = values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');
  const area = `${line}L${x(values.length - 1).toFixed(1)},${y(min)}L${x(0)},${y(min)}Z`;
  const fut = future.length ? `M${x(values.length - 1)},${y(values[values.length - 1])}${future.map((v, i) => `L${x(values.length + i).toFixed(1)},${y(v).toFixed(1)}`).join('')}` : '';
  const hv = hover == null ? null : hover < values.length ? values[hover] : future[hover - values.length];
  return (
    <figure className="rx-line">
      <svg ref={svg} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={aria}
        onMouseMove={(e) => { const r = svg.current!.getBoundingClientRect(); const vx = ((e.clientX - r.left) / r.width) * w; setHover(Math.max(0, Math.min(n - 1, Math.round(((vx - pad) / (w - pad * 2)) * (n - 1))))); }}
        onMouseLeave={() => setHover(null)}>
        {floor != null && floor > 0 && <rect className="rx-floor" x={pad} width={w - pad * 2} y={y(floor)} height={Math.max(0, y(min) - y(floor))} />}
        {future.some((v) => v <= 0) && <line className="rx-zero" x1={pad} x2={w - pad} y1={y(0)} y2={y(0)} />}
        <path className="rx-area" d={area} />
        <path className="rx-path rx-draw" pathLength={1} d={line} fill="none" />
        {fut && <path className="rx-future" d={fut} fill="none" />}
        {future.length > 0 && <line className="rx-today" x1={x(values.length - 1)} x2={x(values.length - 1)} y1={top} y2={h - bottom} />}
        {labels.map((l, i) => (n <= 14 || i % 2 === 0) && <text key={i} className="rx-axis" x={x(i)} y={h - 6} textAnchor="middle">{l}</text>)}
        {hover != null && hv != null && <><line className="rx-rule" x1={x(hover)} x2={x(hover)} y1={top} y2={h - bottom} /><circle className="rx-dot" cx={x(hover)} cy={y(hv)} r="4.5" /></>}
      </svg>
      {hover != null && hv != null && <div className="rx-tip" style={{ left: `${(x(hover) / w) * 100}%` }}><b>{fmt(hv)}</b><span>{labels[hover]}{hover >= values.length ? ' · projected' : ''}</span></div>}
    </figure>
  );
}

/** Money in and out by month as growing bars; hover a month for its numbers. */
export function FlowBars({ months }: { months: CashflowMonth[] }) {
  const mounted = useMounted();
  const [hover, setHover] = useState<number | null>(null);
  if (!months.length) return <p className="rv-quiet">Months fill in as the banks sync.</p>;
  const max = Math.max(1, ...months.map((m) => Math.max(m.cashInCents, m.cashOutCents)));
  const m = hover != null ? months[hover] : null;
  return (
    <figure className="rx-flow">
      <div className="rx-flow-read" aria-live="polite">
        {m ? <><b>{MON(m.period)}</b> in {usd(m.cashInCents)} · out {usd(m.cashOutCents)} · <span className={m.netCents >= 0 ? 'is-up' : 'is-down'}>net {m.netCents >= 0 ? '+' : ''}{usd(m.netCents)}</span></>
          : <>Hover a month. Average: in {usd(avg(months.map((d) => d.cashInCents)))} · out {usd(avg(months.map((d) => d.cashOutCents)))}</>}
      </div>
      <div className="rx-flow-cols" onMouseLeave={() => setHover(null)}>
        {months.map((d, i) => (
          <button key={d.period} className={`rx-col ${hover === i ? 'is-on' : ''}`} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} aria-label={`${MON(d.period)}: in ${usd(d.cashInCents)}, out ${usd(d.cashOutCents)}`}>
            <span className="rx-bars">
              <i className="rx-in" style={{ height: mounted ? `${(d.cashInCents / max) * 100}%` : 0, transitionDelay: `${i * 30}ms` }} />
              <i className="rx-out" style={{ height: mounted ? `${(d.cashOutCents / max) * 100}%` : 0, transitionDelay: `${i * 30 + 15}ms` }} />
            </span>
            <small>{MON(d.period)}</small>
          </button>
        ))}
      </div>
      <figcaption><i className="rx-k-in" /> In <i className="rx-k-out" /> Out</figcaption>
    </figure>
  );
}

export type CatMonth = { period: string; byCat: Record<string, number> };
export type Cat = { key: string; name: string; tone: string };

/** Change of the last three complete months against the three before (the current month isn't over). */
export function catChange(series: CatMonth[], key: string) {
  const done = series.slice(0, -1);
  if (done.length < 6) return null;
  const a = avg(done.slice(-6, -3).map((s) => s.byCat[key] ?? 0)), b = avg(done.slice(-3).map((s) => s.byCat[key] ?? 0));
  return a > 0 ? (b - a) / a : null;
}

/** Small multiples (Tufte): one tiny line per spending category, with its monthly average and change. */
export function Multiples({ series, cats }: { series: CatMonth[]; cats: Cat[] }) {
  if (series.length < 2 || !cats.length) return <p className="rv-quiet">Spending by category fills in as the banks sync.</p>;
  return (
    <ul className="rx-multi">
      {cats.map((c) => {
        const vals = series.map((s) => s.byCat[c.key] ?? 0);
        const ch = catChange(series, c.key);
        return (
          <li key={c.key}>
            <span className="rx-multi-name">{c.name}</span>
            <Spark values={vals} w={160} h={36} />
            <b>{usdK(avg(vals.slice(-4, -1).length ? vals.slice(-4, -1) : vals))}<small>/mo</small></b>
            <em className={ch != null && ch > 0.05 ? 'is-up' : ch != null && ch < -0.05 ? 'is-down' : ''}>{ch == null ? '—' : Math.abs(ch) > 0.02 ? pct(ch) : 'flat'}</em>
          </li>
        );
      })}
    </ul>
  );
}

/** The mix: spending stacked by month; click a category to isolate it. */
export function StackBars({ series, cats }: { series: CatMonth[]; cats: Cat[] }) {
  const mounted = useMounted();
  const [only, setOnly] = useState<string | null>(null);
  if (series.length < 2 || !cats.length) return null;
  const total = (s: CatMonth) => cats.reduce((n, c) => n + (s.byCat[c.key] ?? 0), 0);
  const val = (s: CatMonth) => (only ? s.byCat[only] ?? 0 : total(s));
  const max = Math.max(1, ...series.map(val));
  return (
    <figure className="rx-stack">
      <div className="rx-legend" role="group" aria-label="Isolate a category">
        {cats.map((c) => {
          const ch = catChange(series, c.key);
          return <button key={c.key} aria-pressed={only === c.key} className={`is-${c.tone} ${only === c.key ? 'is-on' : ''} ${only && only !== c.key ? 'is-off' : ''}`} onClick={() => setOnly((o) => (o === c.key ? null : c.key))}><i />{c.name}<em>{ch != null && Math.abs(ch) > 0.02 ? pct(ch) : ''}</em></button>;
        })}
      </div>
      <div className="rx-stack-cols">
        {series.map((s, i) => (
          <div key={s.period} className="rx-scol" title={`${MON(s.period)}: ${usd(val(s))}`}>
            <span className="rx-sbar" style={{ height: mounted ? `${(val(s) / max) * 100}%` : 0, transitionDelay: `${i * 25}ms` }}>
              {cats.filter((c) => !only || c.key === only).map((c) => <i key={c.key} className={`is-${c.tone}`} style={{ flexGrow: s.byCat[c.key] ?? 0 }} />)}
            </span>
            <small>{MON(s.period)}</small>
          </div>
        ))}
      </div>
    </figure>
  );
}

/** Ahead: free cash over the last months and the next twelve at this burn, with a slider for cutting burn. */
export function Ahead({ past, pastLabels, free, burn, floorMonths }: { past: number[]; pastLabels: string[]; free: number; burn: number; floorMonths: number }) {
  const [cut, setCut] = useState(0);
  const b = burn - cut * 100;
  const months = b > 0 ? Math.max(0, free) / b : Infinity;
  const future = Array.from({ length: 12 }, (_, i) => free - b * (i + 1));
  const start = new Date();
  const futureLabels = Array.from({ length: 12 }, (_, i) => new Date(start.getFullYear(), start.getMonth() + 1 + i, 15).toLocaleDateString('en-US', { month: 'short' }));
  return (
    <div className="rx-ahead">
      <LineChart values={[...past, free]} future={future} labels={[...pastLabels, 'Now', ...futureLabels]} fmt={usdK} floor={b > 0 ? floorMonths * b : undefined}
        aria="Free cash over recent months, and the next twelve at this burn" />
      <label className="rx-slider">
        <span>Cut burn by <b>{usd(cut * 100)}</b> a month</span>
        <input type="range" min={0} max={Math.max(100, Math.round(burn / 100))} step={50} value={cut} onChange={(e) => setCut(Number(e.target.value))} />
        <span className="rx-slider-out">{months === Infinity ? 'Default alive: money in covers money out.' : <>Runway <b>{months.toFixed(1)} months</b> · lasts to {new Date(start.getTime() + months * 30.4375 * 86_400_000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</>}</span>
      </label>
    </div>
  );
}
