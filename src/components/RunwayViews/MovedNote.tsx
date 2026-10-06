'use client';

/* What moved between the business and you, said the way each view counts it.
 * Combined leaves it out (it's your money either way, as the API does today);
 * the business alone counts your pay as money out and what you put in as
 * money in; you alone count them the other way round. Nothing moved, no note. */

import { mo, usd } from './format';
import { AGENCY, runwayAt, type Scope, type ScopeBook } from './sample';

export default function MovedNote({ scope, b }: { scope: Scope; b: ScopeBook }) {
  const last = b.payByMonth[b.payByMonth.length - 1];
  const lastMoved = last.pay + last.fromYou;
  const onOct1 = lastMoved ? <> ({usd(lastMoved)} on Oct 1)</> : null;
  const funding = b.avgPay === 0 && b.avgFromYou > 0;
  if (!b.movedCents) return null;

  if (scope === 'combined') {
    return (
      <p className="rvp-moved">
        <span className="rvp-moved-k">Left out</span>
        <span><b>{usd(b.movedCents)} moved between {AGENCY} and you</b> over the last three months{lastMoved ? <>, {usd(lastMoved)} of it on Oct 1</> : null}. It&rsquo;s your money either way, so here it&rsquo;s neither income nor spending.</span>
      </p>
    );
  }
  if (scope === 'business') {
    if (funding) {
      const onOwn = runwayAt(b.freeCents, Math.round(b.avgOut - b.avgIncome));
      return (
        <p className="rvp-moved">
          <span className="rvp-moved-k is-in">You put in</span>
          <span><b>{usd(b.avgFromYou)} a month</b> over the last three months{onOct1}, counted as money in. Without it, {AGENCY} would last <b>{mo(onOwn)} months</b>.</span>
        </p>
      );
    }
    return (
      <p className="rvp-moved">
        <span className="rvp-moved-k is-out">Paid to you</span>
        <span><b>{usd(b.avgPay)} a month</b> over the last three months{onOct1}, counted as money out. It&rsquo;s {AGENCY}&rsquo;s biggest line.</span>
      </p>
    );
  }
  if (funding) {
    const without = runwayAt(b.freeCents, Math.round(b.avgOut - b.avgFromYou - b.avgIn));
    return (
      <p className="rvp-moved">
        <span className="rvp-moved-k is-out">To {AGENCY}</span>
        <span><b>{usd(b.avgFromYou)} a month</b> over the last three months{onOct1}, counted as your spending. Without it, your money would last <b>{mo(without)} months</b>.</span>
      </p>
    );
  }
  const stopped = runwayAt(b.freeCents, Math.round(b.avgOut - b.avgInterest));
  return (
    <p className="rvp-moved">
      <span className="rvp-moved-k is-in">From {AGENCY}</span>
      <span><b>{usd(b.avgPay)} a month</b> over the last three months{onOct1}, counted as your income. If it stopped, your money would last <b>{mo(stopped)} months</b>.</span>
    </p>
  );
}
