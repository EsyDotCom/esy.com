'use client';

/* Combined runway · A · Switch. The live page nearly as it is, with one control
 * on top: Combined · Esy LLC · Personal. Every number under it recomputes for
 * the view. The difference that matters is your pay: combined leaves it out,
 * Esy LLC counts it as money out, Personal counts it as income.
 *
 * The setting beside the switch is per agency: "Include my personal accounts".
 * On, for a freelancer. Off, the switch goes away and Runway is the agency's
 * alone, which is how a bigger agency would always see it. */

import { useState } from 'react';
import MovedNote from '../MovedNote';
import { mo, usd } from '../format';
import { AGENCY, bookFor, runwayAt, type Scope } from '../sample';
import { Chapters, FreeCashHero, Insights, Keys, Mast, Rail, RunwayBody, SampleFoot, liveKeys } from '../shared';

const VIEWS: { scope: Scope; label: string }[] = [
  { scope: 'combined', label: 'Combined' },
  { scope: 'business', label: AGENCY },
  { scope: 'personal', label: 'Personal' },
];

const LEDES: Record<Scope, string> = {
  combined: 'Both sides together, month by month. Your pay is left out: it moved, it wasn’t spent.',
  business: `${AGENCY} alone. Your pay is in the money out.`,
  personal: `Your own accounts. Pay from ${AGENCY} is the money in.`,
};

export default function RunwaySwitch() {
  const [includePersonal, setIncludePersonal] = useState(true);
  const [picked, setPicked] = useState<Scope>('combined');
  const [range, setRange] = useState<6 | 12>(12);
  // Without your personal accounts there's nothing to switch between.
  const scope: Scope = includePersonal ? picked : 'business';
  const b = bookFor(scope);

  // Personal: pay covers spending, so the honest runway is "if pay stopped".
  const personalLine = scope === 'personal' && b.runwayMonths == null
    ? <>Pay covers your spending, with <b>{usd(-b.burnCents)}</b> a month left over · if it stopped, <b>{mo(runwayAt(b.freeCents, Math.round(b.avgOut - b.avgInterest)))} months</b></>
    : undefined;

  return (
    <RunwayBody rail={<Rail key={scope} scope={scope} b={b} />}>
      <Mast />
      <div className="rvp-scopebar">
        {includePersonal ? (
          <div className="rw-seg rvp-seg" role="group" aria-label="Whose money">
            {VIEWS.map((v) => <button key={v.scope} className={scope === v.scope ? 'is-on' : ''} aria-pressed={scope === v.scope} onClick={() => setPicked(v.scope)}>{v.label}</button>)}
          </div>
        ) : (
          <p className="rvp-scope-only"><b>{AGENCY}</b> only</p>
        )}
        <label className="rvp-toggle">
          <input type="checkbox" checked={includePersonal} onChange={(e) => setIncludePersonal(e.target.checked)} />
          <span className="rvp-toggle-track" aria-hidden="true"><i /></span>
          <span className="rvp-toggle-text">
            <b>Include my personal accounts</b>
            <small>{includePersonal ? 'Only you see them. Turn this off and Runway is the agency’s alone.' : `Runway shows ${AGENCY}’s accounts only, the way a bigger agency sees it.`}</small>
          </span>
        </label>
      </div>

      <div key={scope}>
        <FreeCashHero b={b} line={personalLine} />
        {includePersonal && <MovedNote scope={scope} b={b} />}
        <Keys keys={liveKeys(b, range)} range={range} setRange={setRange} />
        <Insights scope={scope} b={b} />
        <Chapters b={b} range={range} inOutLede={LEDES[scope]} />
      </div>
      <SampleFoot />
    </RunwayBody>
  );
}
