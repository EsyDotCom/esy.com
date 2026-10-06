'use client';

/* Combined runway · B · Split. The combined number on top, as the live page
 * has it, then the two sides under it: Esy LLC on the left, you on the right,
 * each with its own cash, burn and runway. Between them, the bridge: what the
 * business paid you each month, so the one number that connects the sides is
 * on the page instead of hidden in "transfers". */

import { useState } from 'react';
import { FlowBars, Spark } from '../charts';
import { mo, monthLabel, usd, usdK } from '../format';
import { AGENCY, FLOOR_MONTHS, bookFor, lastsTo, runwayAt, type ScopeBook, type Side } from '../sample';
import { FreeCashHero, Insights, Mast, Rail, RunwayBody, SampleFoot } from '../shared';

const SCALE_MONTHS = 24; // the runway bars run to two years

/** One side: cash, burn and runway, against the floor. */
function SideCard({ side, b }: { side: Side; b: ScopeBook }) {
  const covered = b.runwayMonths == null;
  // A side whose money in covers money out still has a number worth knowing: how long without that money in.
  const ifStopped = covered ? runwayAt(b.freeCents, Math.round(b.avgOut - b.avgInterest - b.avgIncome)) : null;
  const months = covered ? ifStopped : b.runwayMonths;
  const top = b.cats.filter((c) => c.key !== 'OTHER' && c.key !== 'OWNER_PAY').slice(0, 3)
    .map((c) => ({ name: c.name, cents: b.catSeries.slice(-4, -1).reduce((n, m) => n + (m.byCat[c.key] ?? 0), 0) / 3 }));
  const low = months != null && months < FLOOR_MONTHS;
  return (
    <section className={`rvp-side is-${side}`} aria-label={side === 'business' ? AGENCY : 'You'}>
      <p className="rvp-side-k">{side === 'business' ? AGENCY : 'You'}</p>
      <p className="rvp-side-num">{usd(b.freeCents)}<small>free cash</small></p>
      <dl className="rvp-side-facts">
        <div><dt>In the bank</dt><dd>{usd(b.cashCents)}</dd></div>
        <div><dt>{covered ? 'Left over' : 'Burn'}</dt><dd className={covered ? 'is-up' : ''}>{usdK(Math.abs(b.burnCents))}<small>/mo</small></dd></div>
        <div><dt>{covered ? 'If pay stopped' : 'Runway'}</dt><dd className={low ? 'is-low' : ''}>{mo(months)}<small> mo</small></dd></div>
      </dl>
      <div className="rvp-runbar" role="img" aria-label={`${mo(months)} months against a ${FLOOR_MONTHS}-month floor`}>
        <i className={low ? 'is-low' : ''} style={{ width: `${Math.min(100, ((months ?? 0) / SCALE_MONTHS) * 100)}%` }} />
        <span className="rvp-runbar-floor" style={{ left: `${(FLOOR_MONTHS / SCALE_MONTHS) * 100}%` }}><em>{FLOOR_MONTHS} mo floor</em></span>
      </div>
      <p className="rvp-side-note">
        {covered
          ? <>Pay covers your spending. Without it, savings and checking last {mo(months)} months{low ? ', under the floor' : ''}.</>
          : <>Lasts to {lastsTo(months ?? 0)} at this burn, your pay included.</>}
      </p>
      <div className="rvp-side-spark">
        <span>Cash, 12 months</span>
        <Spark values={b.months.map((m) => m.closingBalanceCents ?? 0)} w={250} h={34} />
      </div>
      <ul className="rvp-side-lines">
        <li><span>{side === 'business' ? 'Clients paid' : `From ${AGENCY}`}</span><b>{usd(side === 'business' ? b.avgIncome : b.avgPay)}<small>/mo</small></b></li>
        {top.map((t) => <li key={t.name}><span>{t.name}</span><b>{usd(t.cents)}<small>/mo</small></b></li>)}
      </ul>
    </section>
  );
}

/** The bridge: what the business paid you, month by month. */
function Bridge({ b }: { b: ScopeBook }) {
  const last6 = b.payByMonth.slice(-6);
  const max = Math.max(...last6.map((m) => m.pay), 1);
  const typical = 600_000;
  const lastIn = [...b.payByMonth].reverse().find((m) => m.fromYou > 0);
  return (
    <section className="rvp-bridge" aria-label="Paid to you">
      <p className="rvp-bridge-k">Paid to you</p>
      <p className="rvp-bridge-num">{usd(b.avgPay)}<small>a month, last 3</small></p>
      <span className="rvp-bridge-arrow" aria-hidden="true">→</span>
      <ol className="rvp-paybars">
        {last6.map((m) => (
          <li key={m.period} className={m.pay < typical ? 'is-cut' : ''} title={`${monthLabel(m.period)}: ${usd(m.pay)}`}>
            <span><i style={{ height: `${(m.pay / max) * 100}%` }} /></span>
            <b>{m.pay ? `${Math.round(m.pay / 100_000)}k` : '0'}</b>
            <small>{monthLabel(m.period)}</small>
          </li>
        ))}
      </ol>
      <p className="rvp-bridge-note">
        {last6.some((m) => m.pay < typical) && <>July was cut to {usd(last6.find((m) => m.pay < typical)!.pay)}. </>}
        {lastIn && <>You last put money in in {new Date(`${lastIn.period}-15`).toLocaleDateString('en-US', { month: 'long' })}: {usd(lastIn.fromYou)}.</>}
      </p>
    </section>
  );
}

export default function RunwaySplit() {
  const [range] = useState<6 | 12>(6);
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
        <Bridge b={biz} />
        <SideCard side="personal" b={you} />
      </div>

      <section className="rx-ch">
        <p className="rx-ch-n">02</p>
        <h2 className="rx-ch-h">In and out, side by side</h2>
        <p className="rx-ch-lede">The last six months. On the left your pay is money out; on the right it&rsquo;s money in.</p>
        <div className="rvp-flows">
          <div><p className="rvp-flow-k">{AGENCY}</p><FlowBars months={biz.months.slice(-range)} /></div>
          <div><p className="rvp-flow-k">You</p><FlowBars months={you.months.slice(-range)} /></div>
        </div>
      </section>

      <Insights scope="combined" b={all} />
      <SampleFoot />
    </RunwayBody>
  );
}
