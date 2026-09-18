'use client';

/* A working copy of os.esy.com/office/books for the esy.com hero.
 *
 * The markup and class names follow the real page (os.esy.com
 * app/(office)/office/books/page.tsx) and the stylesheets are copied verbatim,
 * so this looks like the product because it is the product's UI — fed sample
 * figures instead of the API. It renders at a fixed desktop width and is scaled
 * to fit its container, like a screenshot you can use: the range and view
 * toggles, chart hover, rail and theme switch all work. */

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BookOpen, Library, LineChart, Mail, Moon, Search, Sun, Users, Wrench } from 'lucide-react';
import { Figtree, IBM_Plex_Mono } from 'next/font/google';
import {
  API_KEYS,
  BUDGETS,
  MONTH,
  WAITING,
  WORKSPACE_BUDGET,
  booksFor,
  dayLabel,
  money,
  pace,
  unitMoney,
  type Day,
  type Range,
} from './sample-books';
import './office.css';
import './office-rooms.css';
import './preview.css';

// The office's type: Figtree for UI, Plex Mono for figures. Newsreader (the
// display serif) is already loaded site-wide under the same variable name.
const figtree = Figtree({ variable: '--font-figtree', subsets: ['latin'] });
const plexMono = IBM_Plex_Mono({ variable: '--font-plex-mono', subsets: ['latin'], weight: ['400', '500'] });

export type OfficeTheme = 'light' | 'dark';
/** The parts of the Books a hero can point at. */
export type BooksPart = 'stats' | 'spend' | 'budgets' | 'workers';

const RAIL = [
  { key: 'today', label: 'Today', icon: Sun },
  { key: 'letters', label: 'Letters', icon: Mail },
  { key: 'team', label: 'Team', icon: Users },
  { key: 'library', label: 'Library', icon: Library },
  { key: 'books', label: 'Books', icon: LineChart },
] as const;

const DESIGN_WIDTH = 1240;

interface Props {
  theme?: OfficeTheme;
  onThemeChange?: (t: OfficeTheme) => void;
  /** Light one part and set the rest back; the window scrolls it into view. */
  focus?: BooksPart | null;
  /** Height of the window's screen, in desktop pixels (before scaling). */
  screenHeight?: number;
  className?: string;
  /** Tells the host something was clicked inside, e.g. to stop an autoplay. */
  onInteract?: () => void;
}

export default function OfficePreview({
  theme: themeProp,
  onThemeChange,
  focus = null,
  screenHeight = 780,
  className = '',
  onInteract,
}: Props) {
  // Theme is controlled when the host passes one, otherwise local.
  const [localTheme, setLocalTheme] = useState<OfficeTheme>('light');
  const theme = themeProp ?? localTheme;
  const setTheme = (t: OfficeTheme) => (onThemeChange ? onThemeChange(t) : setLocalTheme(t));

  const [range, setRange] = useState<Range>(7);
  const [view, setView] = useState<'chart' | 'table'>('chart');
  const [toast, setToast] = useState<string | null>(null);

  // ── Scale the desktop render to the container's width ─────────────────
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / DESIGN_WIDTH);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Scroll the focused part into view inside the window ───────────────
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    if (!focus) {
      main.scrollTo({ top: 0 });
      return;
    }
    const part = main.querySelector<HTMLElement>(`[data-op-part="${focus}"]`);
    if (part) main.scrollTo({ top: Math.max(0, part.offsetTop - 110) });
  }, [focus]);

  // Rooms outside the preview answer with a short note instead of nothing.
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const b = booksFor(range);
  const ctx = { interact: () => onInteract?.() };
  const partClass = (p: BooksPart) => (focus === p ? 'is-focus' : undefined);

  return (
    <div className={`op-frame ${figtree.variable} ${plexMono.variable} ${theme === 'dark' ? 'is-dark' : ''} ${className}`}>
      <div className="op-chrome" aria-hidden="true">
        <span className="op-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="op-url">
          <b>os.esy.com</b>/office/books
        </span>
        <span className="op-chrome-spacer" />
      </div>

      <div className="op-viewport" ref={viewportRef} style={{ height: screenHeight * scale }}>
        <div className="op-scaler" style={{ width: DESIGN_WIDTH, transform: `scale(${scale})` }}>
          <div
            className={`office op-office ${focus ? 'has-focus' : ''}`}
            data-office-theme={theme}
            style={{ height: screenHeight }}
            onClickCapture={ctx.interact}
          >
            <div className="ofc-app">
              {/* ── The rail ─────────────────────────────────────────────── */}
              <nav className="ofc-rail" aria-label="Office (preview)">
                <div className="ofc-rail-head">
                  <span className="ofc-logo">e</span>
                </div>
                {RAIL.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    className={`ofc-rail-item ${key === 'books' ? 'is-on' : ''}`}
                    aria-current={key === 'books' ? 'page' : undefined}
                    onClick={() => key !== 'books' && setToast(`${label} is part of the office. This preview opens the Books.`)}
                  >
                    <Icon aria-hidden />
                    <span className="ofc-rail-label">{label}</span>
                  </button>
                ))}
                <button type="button" className="ofc-rail-item" onClick={() => setToast('⌘K jumps to any piece, worker or client.')}>
                  <Search aria-hidden />
                  <span className="ofc-rail-label">Go to</span>
                </button>
                <span className="ofc-rail-spacer" />
                <button type="button" className="ofc-rail-item" onClick={() => setToast('The Workshop is where you set up workers.')}>
                  <Wrench aria-hidden />
                  <span className="ofc-rail-label">Workshop</span>
                </button>
                <button
                  type="button"
                  className="ofc-rail-item"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label={`Switch the preview to the ${theme === 'dark' ? 'light' : 'dark'} theme`}
                >
                  {theme === 'dark' ? <Sun aria-hidden /> : <Moon aria-hidden />}
                  <span className="ofc-rail-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
                </button>
                <button type="button" className="ofc-rail-item" onClick={() => setToast('Classic is the full dashboard, one click away.')}>
                  <BookOpen aria-hidden />
                  <span className="ofc-rail-label">Classic</span>
                </button>
              </nav>

              <main className="ofc-main" ref={mainRef}>
                <div className="ofc-page ofc-books">
                  {/* ── The week, in a sentence ─────────────────────────── */}
                  <header className="ofc-bk-head">
                    <div>
                      <span className="ofc-eyebrow">The Books · week of September 12</span>
                      <h1 className="ofc-display">{b.headline}</h1>
                      <p>{b.story}</p>
                    </div>
                    <div className="ofc-seg" role="group" aria-label="Range">
                      {([7, 14] as const).map((n) => (
                        <button key={n} type="button" className={range === n ? 'is-on' : undefined} aria-pressed={range === n} onClick={() => setRange(n)}>
                          {n === 7 ? 'This week' : 'Two weeks'}
                        </button>
                      ))}
                    </div>
                  </header>

                  {/* ── Four stats ──────────────────────────────────────── */}
                  <div className={`ofc-stats ${partClass('stats') ?? ''}`} data-op-part="stats">
                    <div>
                      <span className="k">Made</span>
                      <span className="v ofc-display">{b.made.total.toLocaleString('en-US')}</span>
                      <span className="s">{b.made.parts.join(' · ')}</span>
                    </div>
                    <div>
                      <span className="k">Spent</span>
                      <span className="v ofc-display">{money(b.spend)}</span>
                      <span className="s">
                        <span className={`ofc-tag ${b.spend > b.previous ? 'is-warn' : 'is-good'}`}>
                          {b.spend > b.previous ? '▲' : '▼'} {money(Math.abs(b.spend - b.previous))}
                        </span>
                        vs the {range === 7 ? 'week' : 'two weeks'} before
                      </span>
                    </div>
                    <div>
                      <span className="k">Waiting on you</span>
                      <span className="v ofc-display">{WAITING}</span>
                      <span className="s">
                        {b.approved.toLocaleString('en-US')} signed off {b.rangeWord}
                      </span>
                    </div>
                    <div>
                      <span className="k">Didn&apos;t make it</span>
                      <span className="v ofc-display">{b.failed + b.rejected}</span>
                      <span className="s">
                        {(((b.failed + b.rejected) / b.made.total) * 100).toFixed(1)}% · {b.failed} failed · {b.rejected} rejected
                      </span>
                    </div>
                  </div>

                  <div className="ofc-bk-grid">
                    {/* ── Spend by client, per day ────────────────────────── */}
                    <section className={`ofc-bk-panel ${partClass('spend') ?? ''}`} data-op-part="spend">
                      <div className="ofc-bk-panel-h">
                        <div>
                          <h3>Spend by client, per day</h3>
                          <p>Every provider call, rolled up to the project it was for</p>
                        </div>
                        <div className="ofc-seg" role="group" aria-label="View">
                          {(['chart', 'table'] as const).map((v) => (
                            <button key={v} type="button" className={view === v ? 'is-on' : undefined} aria-pressed={view === v} onClick={() => setView(v)}>
                              {v === 'chart' ? 'Chart' : 'Table'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="ofc-bk-legend">
                        {b.legend.map((s) => (
                          <span key={s.id}>
                            <i style={{ background: s.color }} />
                            {s.name} <span className="ofc-num ofc-muted">{money(s.value)}</span>
                          </span>
                        ))}
                      </div>
                      {view === 'chart' ? (
                        <SpendChart days={b.days} legend={b.legend} />
                      ) : (
                        <table className="ofc-tbl">
                          <thead>
                            <tr>
                              <th>Day</th>
                              {b.legend.map((s) => (
                                <th key={s.id} className="r">
                                  {s.name}
                                </th>
                              ))}
                              <th className="r">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {b.days.map((d) => (
                              <tr key={d.day}>
                                <td>{dayLabel(d.day)}</td>
                                {d.segments.map((s) => (
                                  <td key={s.id} className="r">
                                    {money(s.value)}
                                  </td>
                                ))}
                                <td className="r">{money(d.total)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </section>

                    {/* ── Budgets this month ──────────────────────────────── */}
                    <section className={`ofc-bk-panel ${partClass('budgets') ?? ''}`} data-op-part="budgets">
                      <div className="ofc-bk-panel-h">
                        <div>
                          <h3>Budgets this month</h3>
                          <p>
                            Day {MONTH.day} of {MONTH.days} · the tick marks the pace
                          </p>
                        </div>
                        <span className="ofc-inline-link">Edit</span>
                      </div>
                      {BUDGETS.map((bud) => {
                        const p = pace(bud.spent, bud.limit);
                        const color = b.legend.find((s) => s.id === bud.id)?.color;
                        return (
                          <div key={bud.id} className="ofc-meter">
                            <div className="mh">
                              <b>{bud.name}</b>
                              <span className="ofc-num">
                                {money(bud.spent)} of {money(bud.limit)}
                              </span>
                            </div>
                            <div className="track">
                              <i style={{ width: `${Math.min(100, p.share * 100)}%`, background: color }} />
                              <span className="pace" style={{ left: `${p.elapsed * 100}%` }} />
                            </div>
                            <div className="ms">
                              {p.state === 'ahead' ? (
                                <>
                                  <span className="ofc-tag is-warn">ahead of pace</span> heading for {money(p.projected)}
                                </>
                              ) : (
                                <>
                                  <span className="ofc-tag is-good">on pace</span> {Math.round(p.share * 100)}% used
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div className="ofc-meter is-total">
                        <div className="mh">
                          <b>Everything this month</b>
                          <span className="ofc-num">
                            {money(WORKSPACE_BUDGET.spent)} of {money(WORKSPACE_BUDGET.limit)}
                          </span>
                        </div>
                        <div className="track">
                          <i style={{ width: `${(WORKSPACE_BUDGET.spent / WORKSPACE_BUDGET.limit) * 100}%`, background: 'var(--o-ink-2)' }} />
                          <span className="pace" style={{ left: `${(MONTH.day / MONTH.days) * 100}%` }} />
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="ofc-bk-grid">
                    {/* ── Clients calling the API ─────────────────────────── */}
                    <section className="ofc-bk-panel" data-op-part="clients">
                      <div className="ofc-bk-panel-h">
                        <div>
                          <h3>Clients calling your API</h3>
                          <p>Every active API key for this workspace</p>
                        </div>
                      </div>
                      <table className="ofc-tbl">
                        <thead>
                          <tr>
                            <th>Client</th>
                            <th>Key</th>
                            <th className="r">Last call</th>
                          </tr>
                        </thead>
                        <tbody>
                          {API_KEYS.map((k) => (
                            <tr key={k.id}>
                              <td>
                                <b>{k.name}</b>
                              </td>
                              <td className="ofc-num ofc-muted">{k.prefix}…</td>
                              <td className="r">{k.lastUsed}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </section>

                    {/* ── Workers ─────────────────────────────────────────── */}
                    <section className={`ofc-bk-panel ${partClass('workers') ?? ''}`} data-op-part="workers">
                      <div className="ofc-bk-panel-h">
                        <div>
                          <h3>Workers {b.rangeWord}</h3>
                          <p>Pieces made and cost per piece, from their shifts</p>
                        </div>
                      </div>
                      {b.workers.map((w) => (
                        <div key={w.id} className="ofc-wk-row">
                          <span className="ofc-avatar" aria-hidden>
                            {w.name[0]}
                          </span>
                          <span className="ofc-wk-n">
                            <b>{w.name}</b>
                            <small>
                              {w.made.toLocaleString('en-US')} {w.role}
                            </small>
                          </span>
                          <span className="ofc-wk-bar" aria-hidden>
                            <i style={{ width: `${(w.made / b.workers[0].made) * 100}%` }} />
                          </span>
                          <span className="ofc-num">{unitMoney(w.spend / w.made)}</span>
                        </div>
                      ))}
                    </section>
                  </div>

                  {/* ── By model ────────────────────────────────────────────── */}
                  <section className="ofc-bk-panel" data-op-part="models">
                    <div className="ofc-bk-panel-h">
                      <div>
                        <h3>Where the money went, by model</h3>
                        <p>{range === 7 ? 'This week' : 'The last two weeks'}</p>
                      </div>
                    </div>
                    <table className="ofc-tbl">
                      <thead>
                        <tr>
                          <th>Model or tool</th>
                          <th className="r">Calls</th>
                          <th className="r">Per call</th>
                          <th className="r">Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {b.byModel.map((m) => (
                          <tr key={m.key}>
                            <td>
                              <b>{m.key}</b>
                            </td>
                            <td className="r">{m.calls.toLocaleString('en-US')}</td>
                            <td className="r">{money(m.cost / m.calls)}</td>
                            <td className="r">{money(m.cost)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                </div>
              </main>
            </div>
            {toast && (
              <div className="op-toast" role="status">
                {toast}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Stacked daily columns, ported from the office's SpendChart: dashed grid,
 * 2px gaps, rounded tops, direct labels beside the last day, and a tooltip on
 * hover or focus.
 */
function SpendChart({ days, legend }: { days: Day[]; legend: { id: string; name: string; color: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  const W = 640;
  const H = 230;
  const L = 44;
  const R = 104;
  const T = 10;
  const B = 26;
  const n = days.length;
  const max = 50; // a round ceiling above the busiest day in the sample
  const y = (v: number) => T + (H - T - B) * (1 - v / max);
  const bw = (W - L - R) / n;
  const barW = Math.min(24, bw * 0.6);
  const ticks = [0, max / 4, max / 2, (max * 3) / 4, max];
  const colorOf = (id: string) => legend.find((s) => s.id === id)?.color ?? 'var(--o-s-other)';
  const nameOf = (id: string) => legend.find((s) => s.id === id)?.name ?? id;

  // Direct labels at the last day's segment middles, nudged apart so they never collide.
  const last = days[n - 1];
  let acc = 0;
  let prevY = Infinity;
  const labels = last.segments.map((s) => {
    const mid = y(acc + s.value / 2);
    acc += s.value;
    const ly = Math.min(mid, prevY - 14);
    prevY = ly;
    return { id: s.id, y: ly };
  });

  const shown = active != null ? days[active] : null;

  return (
    <div className="ofc-bk-chart" onMouseLeave={() => setActive(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Spend per day by client">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="var(--o-line)" strokeDasharray={t ? '2 3' : undefined} />
            <text x={L - 6} y={y(t) + 3.5} textAnchor="end">
              ${t % 1 ? t.toFixed(2) : t}
            </text>
          </g>
        ))}
        {days.map((d, i) => {
          const x = L + bw * i + (bw - barW) / 2;
          const segs = d.segments.filter((s) => s.value > 0);
          let base = 0;
          return (
            <g key={d.day} opacity={active != null && active !== i ? 0.55 : 1}>
              {segs.map((s, j) => {
                const y0 = y(base);
                base += s.value;
                const top = j === segs.length - 1;
                const h = Math.max(0, y0 - y(base) - (top ? 0 : 2));
                const yy = y0 - h;
                const r = top ? Math.min(4, h, barW / 2) : 0;
                return r ? (
                  <path
                    key={s.id}
                    d={`M${x} ${y0} V${yy + r} Q${x} ${yy} ${x + r} ${yy} H${x + barW - r} Q${x + barW} ${yy} ${x + barW} ${yy + r} V${y0}Z`}
                    fill={colorOf(s.id)}
                  />
                ) : (
                  <rect key={s.id} x={x} y={yy} width={barW} height={h} fill={colorOf(s.id)} />
                );
              })}
              {(n <= 7 || i % 2 === 0 || i === n - 1) && (
                <text x={x + barW / 2} y={H - 8} textAnchor="middle">
                  {dayLabel(d.day)}
                </text>
              )}
              <rect
                x={L + bw * i}
                y={T}
                width={bw}
                height={H - T - B}
                fill="transparent"
                tabIndex={0}
                role="button"
                aria-label={`${dayLabel(d.day)}: ${money(d.total)}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="ofc-bk-hit"
              />
            </g>
          );
        })}
        {labels.map((l) => (
          <text key={l.id} x={L + bw * (n - 1) + (bw + barW) / 2 + 8} y={l.y + 4} className="dl">
            {nameOf(l.id)}
          </text>
        ))}
      </svg>
      {shown && active != null && (
        <div
          className="ofc-bk-tip"
          style={{
            left: `${((L + bw * active + bw / 2) / W) * 100}%`,
            top: `${(y(shown.total) / H) * 100}%`,
            transform: active > n / 2 ? 'translate(calc(-100% - 12px), -50%)' : 'translate(12px, -50%)',
          }}
          role="status"
        >
          <strong>{dayLabel(shown.day)}</strong>
          {shown.segments.map((s) => (
            <div key={s.id}>
              <span>
                <i style={{ background: colorOf(s.id) }} />
                {nameOf(s.id)}
              </span>
              <span className="ofc-num">{money(s.value)}</span>
            </div>
          ))}
          <div className="tot">
            <span>Total</span>
            <span className="ofc-num">{money(shown.total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
