'use client';

/* Combined runway · C · Pay yourself. The page built around the one decision
 * a one-person agency makes with these numbers: how much should I pay myself?
 * Drag the pay and both sides move against each other while the combined
 * number stays put (moving money between your own pockets doesn't change how
 * long it lasts). The shaded part of the slider is the range where your pay
 * covers your spending and Esy LLC keeps the live page's 6-month floor.
 * (The planner lives in ../parts.tsx, shared with D · Merged.) */

import { bookFor } from '../sample';
import { PayPlanner } from '../parts';
import { Mast, Rail, RunwayBody, SampleFoot } from '../shared';

export default function RunwayPayYourself() {
  const all = bookFor('combined');
  return (
    <RunwayBody rail={<Rail scope="combined" b={all} />}>
      <Mast />
      <PayPlanner showAhead />
      <SampleFoot>Each side&rsquo;s burn is its average over the last three closed months with your pay taken out, then your pay put back at the slider&rsquo;s amount.</SampleFoot>
    </RunwayBody>
  );
}
