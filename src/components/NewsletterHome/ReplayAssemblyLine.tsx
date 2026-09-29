'use client';

/* E · Assembly line: the brand's factory, for one real run. The hot dog rides
 * a moving belt through five stations and changes at each: rendered on its
 * keying green, cut out, outlined by the audit, tagged with its name, stamped
 * by the gate. At the end it lands on the shelf beside five siblings, the
 * same prompt in other styles (each a real run), under the running count of
 * every run Esy has recorded. Takes the band's full width.
 */
import { CLIPART_RUN as RUN } from './clipartRun';
import { clock, money, useRunReplay, type Phase } from './useRunReplay';

const STATIONS: { phase: Phase; label: string; note: string }[] = [
  { phase: 'render', label: 'Render', note: 'gpt-image-2' },
  { phase: 'cutout', label: 'Cutout', note: 'Chroma key' },
  { phase: 'audit', label: 'Audit', note: '0 holes · no halo' },
  { phase: 'name', label: 'Name', note: 'Claude Haiku' },
  { phase: 'gate', label: 'Gate', note: 'No stray text' },
];

// The shelf: this run, then the same prompt in five other styles.
const SHELF = ['flat', 'watercolor', 'outline', 'pixel', 'clay'];

export default function ReplayAssemblyLine() {
  const r = useRunReplay();
  const { phase, p } = r;
  const at = STATIONS.findIndex((s) => s.phase === phase);
  const done = phase === 'done';
  // Where the piece sits on the belt (% of its width): it glides to the centre
  // of each station in the first 40% of that step, then works there. The
  // skipped edge refine keeps it at the cutout station.
  const centre = (i: number) => ((i + 0.5) / STATIONS.length) * 100;
  const pos =
    phase === 'refine'
      ? centre(1)
      : at < 0
        ? -10
        : centre(at - 1) + (centre(at) - centre(at - 1)) * Math.min(1, p / 0.4);

  return (
    <div className="ra" {...r.hover} aria-label={`A real clip.art run on the assembly line: ${RUN.subject}, $${RUN.totalUsd} in ${RUN.seconds}s`}>
      <header className="ra-head">
        <p className="ra-order">
          <small>Order</small>
          {RUN.subject} <b>{RUN.style}</b>
        </p>
        <p className="ra-counters">
          <span><small>Run time</small>{clock(r.runSeconds)}</span>
          <span><small>Cost</small>{money(r.usd)}</span>
        </p>
      </header>

      <div className="ra-floor">
        {/* The stations. */}
        <ol className="ra-stations">
          {STATIONS.map((s) => {
            const state = r.past(s.phase) ? 'done' : phase === s.phase ? 'live' : 'wait';
            return (
              <li key={s.phase} className={`is-${state}`}>
                <span className="ra-lamp" />
                <b>{s.label}</b>
                <span>{s.note}</span>
              </li>
            );
          })}
        </ol>

        {/* The belt, and the piece riding it. */}
        <div className={`ra-belt ${done || phase === 'order' ? '' : 'is-running'}`}>
          {phase !== 'order' && !done && (
            <div className="ra-piece" style={{ left: `${pos}%` }}>
              <div className={`ra-piece-art ${r.past('render') ? 'is-cut' : ''}`}>
                {/* eslint-disable-next-line @next/next/no-img-element -- the run's own output */}
                <img src={r.past('render') ? RUN.cutout : RUN.render} alt="" className={r.past('cutout', true) && r.past('render') ? 'is-traced' : ''} />
                {phase === 'render' && <span className="ra-develop" style={{ opacity: 1 - p }} />}
              </div>
              {r.past('name', true) && <span className="ra-label">{RUN.title.replace(' Clipart', '')}</span>}
              {r.past('gate') || phase === 'gate' ? <span className={`ra-stamp ${phase === 'gate' && p < 0.6 ? '' : 'is-on'}`}>Pass</span> : null}
            </div>
          )}
        </div>
      </div>

      {/* The shelf: where finished work lands. */}
      <div className={`ra-shelf ${done ? 'is-landed' : ''}`}>
        <div className="ra-shelf-items">
          <figure className="ra-shelf-new">
            {/* eslint-disable-next-line @next/next/no-img-element -- the run's own output */}
            <img src={RUN.cutout} alt={`${RUN.title}, finished`} />
            <figcaption>{money(RUN.totalUsd)} · {RUN.seconds}s</figcaption>
          </figure>
          {SHELF.map((s) => (
            <figure key={s}>
              {/* eslint-disable-next-line @next/next/no-img-element -- sibling runs, generated through Esy */}
              <img src={`/prototypes/home-clipart/${s}.webp`} alt="" />
            </figure>
          ))}
        </div>
        <p className="ra-count">
          <b>{RUN.totalRuns.toLocaleString('en-US')}</b> runs recorded, every one with its prompt, model, checks and cost.
        </p>
      </div>
    </div>
  );
}
