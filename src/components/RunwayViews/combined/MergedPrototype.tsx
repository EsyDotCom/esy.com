'use client';

/* D · Merged on its prototype page: a sample-data picker above the window
 * (a prototype control, not part of the product) and the one Runway page in
 * it. The picker swaps the whole sample founder, so you can watch the same
 * page change shape when the data does. `?stage=` keeps a stage linkable. */

import { useEffect, useState } from 'react';
import RunwayWindow from '../RunwayWindow';
import { STAGES, type Stage } from '../sample';
import RunwayMerged from './RunwayMerged';

export default function MergedPrototype() {
  const [stage, setStage] = useState<Stage>('paying');

  // Read the stage from the URL once, and write it back on change, without a
  // navigation (the page is static; the stage is only sample data).
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get('stage');
    if (s && STAGES.some((x) => x.stage === s)) setStage(s as Stage);
  }, []);
  const pick = (s: Stage) => {
    setStage(s);
    const url = new URL(window.location.href);
    url.searchParams.set('stage', s);
    window.history.replaceState(null, '', url);
  };
  const current = STAGES.find((x) => x.stage === stage)!;

  return (
    <>
      <div className="rvp-stagepick" role="group" aria-label="Prototype control: sample founder">
        <p className="rvp-stagepick-k">Prototype control · <b>Sample founder</b></p>
        <div className="rvp-stagepick-row">
          {STAGES.map((s) => (
            <button key={s.stage} type="button" aria-pressed={s.stage === stage} className={s.stage === stage ? 'is-on' : ''} onClick={() => pick(s.stage)}>
              {s.label}
            </button>
          ))}
        </div>
        <p className="rvp-stagepick-note">{current.note} The page below has no setting for this: it changes shape because the money does.</p>
      </div>
      <RunwayWindow>
        <RunwayMerged stage={stage} />
      </RunwayWindow>
    </>
  );
}
