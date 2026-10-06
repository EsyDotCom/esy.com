'use client';

/* Combined runway · B · Split. The combined number on top, as the live page
 * has it, then the two sides under it: Esy LLC on the left, you on the right,
 * each with its own cash, burn and runway. Between them, the bridge: what the
 * business paid you each month, so the one number that connects the sides is
 * on the page instead of hidden in "transfers". (The cards and the bridge
 * live in ../parts.tsx, shared with D · Merged.) */

import { FlowBars } from '../charts';
import { AGENCY, bookFor } from '../sample';
import { Bridge, SideCard } from '../parts';
import { FreeCashHero, Insights, Mast, Rail, RunwayBody, SampleFoot } from '../shared';

const RANGE = 6;

export default function RunwaySplit() {
  const all = bookFor('combined');
  const biz = bookFor('business');
  const you = bookFor('personal');
  return (
    <RunwayBody rail={<Rail scope="combined" b={all} />}>
      <Mast />
      <FreeCashHero b={all} label="Free cash, both sides" />
      <p className="rvp-moved">
        <span className="rvp-moved-k">Together</span>
        <span>The number above leaves your pay out: it moved from {AGENCY} to you, it wasn&rsquo;t spent. Split by side, it&rsquo;s {AGENCY}&rsquo;s biggest cost and your only income.</span>
      </p>

      <div className="rvp-split">
        <SideCard side="business" b={biz} />
        <Bridge biz={biz} />
        <SideCard side="personal" b={you} />
      </div>

      <section className="rx-ch">
        <p className="rx-ch-n">02</p>
        <h2 className="rx-ch-h">In and out, side by side</h2>
        <p className="rx-ch-lede">The last six months. On the left your pay is money out; on the right it&rsquo;s money in.</p>
        <div className="rvp-flows">
          <div><p className="rvp-flow-k">{AGENCY}</p><FlowBars months={biz.months.slice(-RANGE)} /></div>
          <div><p className="rvp-flow-k">You</p><FlowBars months={you.months.slice(-RANGE)} /></div>
        </div>
      </section>

      <Insights scope="combined" b={all} />
      <SampleFoot />
    </RunwayBody>
  );
}
