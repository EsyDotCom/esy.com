'use client';

/* What moved between the business and you, said the way each view counts it.
 * Combined leaves it out (it's your money either way, as the API does today);
 * the business alone counts it as money out; you alone count it as income. */

import { mo, usd } from './format';
import { AGENCY, runwayAt, type Scope, type ScopeBook } from './sample';

const LAST = (b: ScopeBook) => b.payByMonth[b.payByMonth.length - 1];

export default function MovedNote({ scope, b }: { scope: Scope; b: ScopeBook }) {
  const last = LAST(b);
  if (scope === 'combined') {
    return (
      <p className="rvp-moved">
        <span className="rvp-moved-k">Left out</span>
        <span><b>{usd(b.movedCents)} moved between {AGENCY} and you</b> over the last three months, {usd(last.pay)} of it on Oct 1. It&rsquo;s your money either way, so here it&rsquo;s neither income nor spending.</span>
      </p>
    );
  }
  if (scope === 'business') {
    return (
      <p className="rvp-moved">
        <span className="rvp-moved-k is-out">Paid to you</span>
        <span><b>{usd(b.avgPay)} a month</b> over the last three months ({usd(last.pay)} on Oct 1), counted as money out. It&rsquo;s {AGENCY}&rsquo;s biggest line.</span>
      </p>
    );
  }
  const stopped = runwayAt(b.freeCents, Math.round(b.avgOut - b.avgInterest));
  return (
    <p className="rvp-moved">
      <span className="rvp-moved-k is-in">From {AGENCY}</span>
      <span><b>{usd(b.avgPay)} a month</b> over the last three months ({usd(last.pay)} on Oct 1), counted as your income. If it stopped, your money would last <b>{mo(stopped)} months</b>.</span>
    </p>
  );
}
