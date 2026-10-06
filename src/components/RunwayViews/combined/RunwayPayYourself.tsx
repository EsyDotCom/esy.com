'use client';

/* Combined runway · C · Pay yourself. The page built around the one decision
 * a one-person agency makes with these numbers: how much should I pay myself?
 * Drag the pay and both sides move against each other while the combined
 * number stays put (moving money between your own pockets doesn't change how
 * long it lasts). The shaded part of the slider is the range where your pay
 * covers your spending and Esy LLC keeps the live page's 6-month floor. */

import { useState } from 'react';
import { LineChart } from '../charts';
import { mo, monthLabel, usd, usdK } from '../format';
import { AGENCY, FLOOR_MONTHS, bookFor, lastsTo, runwayAt, type ScopeBook } from '../sample';
import { Mast, Rail, RunwayBody, SampleFoot } from '../shared';

const MAX_PAY = 1_200_000;
const STEP = 25_000;

/** Free cash ahead for twelve months at a burn, after the months already behind it. */
function ahead(b: ScopeBook, burn: number) {
  const past = b.months.slice(-7, -1).map((m) => ({ label: monthLabel(m.period), v: (m.closingBalanceCents ?? 0) - b.taxReserveCents - b.cardBillsCents }));
  const start = new Date(2026, 10, 15);
  const future = Array.from({ length: 12 }, (_, i) => b.freeCents - burn * (i + 1));
  const labels = [...past.map((p) => p.label), 'Now', ...future.map((_, i) => new Date(start.getFullYear(), start.getMonth() + i, 15).toLocaleDateString('en-US', { month: 'short' }))];
  return { values: [...past.map((p) => p.v), b.freeCents], future, labels };
}

function Gauge({ k, months, value, note, tone }: { k: string; months: number | null; value: React.ReactNode; note: React.ReactNode; tone?: 'low' | 'ok' | 'flat' }) {
  return (
    <div className={`rvp-gauge ${tone ? `is-${tone}` : ''}`}>
      <p className="rvp-gauge-k">{k}</p>
      <p className="rvp-gauge-num">{value}</p>
      <div className="rvp-runbar" aria-hidden="true">
        <i className={tone === 'low' ? 'is-low' : ''} style={{ width: `${Math.min(100, ((months ?? 24) / 24) * 100)}%` }} />
        <span className="rvp-runbar-floor" style={{ left: `${(FLOOR_MONTHS / 24) * 100}%` }}><em>{FLOOR_MONTHS} mo</em></span>
      </div>
      <p className="rvp-gauge-note">{note}</p>
    </div>
  );
}

export default function RunwayPayYourself() {
  const all = bookFor('combined');
  const biz = bookFor('business');
  const you = bookFor('personal');

  // Each side's burn before your pay. The business runs a surplus before it pays
  // you; your life costs what it costs. Pay moves money from one to the other.
  const bizBeforePay = Math.round(biz.avgOut - biz.avgPay - biz.avgIn);
  const youBeforePay = Math.round(you.avgOut - (you.avgIn - you.avgPay));
  const lastPay = biz.payByMonth[biz.payByMonth.length - 1].pay;
  const [pay, setPay] = useState(lastPay);

  const bizBurn = bizBeforePay + pay;
  const youBurn = youBeforePay - pay;
  const bizMonths = runwayAt(biz.freeCents, bizBurn);
  const youMonths = runwayAt(you.freeCents, youBurn);
  // The comfortable range: pay covers your life, and the business keeps its floor.
  const low = youBeforePay;
  const high = Math.floor((biz.freeCents / FLOOR_MONTHS - bizBeforePay) / STEP) * STEP;
  const pctOf = (c: number) => `${(Math.max(0, Math.min(MAX_PAY, c)) / MAX_PAY) * 100}%`;
  const bizLow = bizMonths != null && bizMonths < FLOOR_MONTHS;
  const youShort = youBurn > 0;

  const verdict = bizLow
    ? <>At {usd(pay)}, {AGENCY} is under its {FLOOR_MONTHS}-month floor. Paying yourself {usd(high)} or less keeps it there.</>
    : youShort
      ? <>At {usd(pay)}, your spending runs {usd(youBurn)} a month ahead of your pay, and savings make up the gap. {usd(low)} covers it.</>
      : <>At {usd(pay)}, {AGENCY} has <b>{mo(bizMonths)} months</b> and you keep <b>{usd(-youBurn)}</b> a month. Anything from {usd(low)} to {usd(high)} does both.</>;

  const bizAhead = ahead(biz, bizBurn);
  const youAhead = ahead(you, youBurn);

  return (
    <RunwayBody rail={<Rail scope="combined" b={all} />}>
      <Mast />
      <section className="rvp-ask">
        <p className="rx-ch-n">Your pay</p>
        <h2 className="rvp-ask-h">How much should I pay myself?</h2>
        <p className="rx-ch-lede">Drag it. {AGENCY}&rsquo;s runway and yours move against each other; the two together don&rsquo;t move at all, because paying yourself only moves money between your own accounts.</p>

        <label className="rvp-pay">
          <span className="rvp-pay-read"><b>{usd(pay)}</b> a month to you <small>{pay === lastPay ? '· what you paid on Oct 1' : `· you paid ${usd(lastPay)} on Oct 1`}</small></span>
          <span className="rvp-pay-track">
            <span className="rvp-pay-band" style={{ left: pctOf(low), width: `calc(${pctOf(high)} - ${pctOf(low)})` }} />
            <input type="range" min={0} max={MAX_PAY} step={STEP} value={pay} onChange={(e) => setPay(Number(e.target.value))} aria-label="Monthly pay to you" />
          </span>
          <span className="rvp-pay-scale"><span>$0</span><span style={{ left: pctOf(low) }}>{usdK(low)} covers your life</span><span style={{ left: pctOf(high) }}>{usdK(high)} keeps {FLOOR_MONTHS} mo</span><span>{usdK(MAX_PAY)}</span></span>
        </label>

        <div className="rvp-gauges">
          <Gauge
            k={AGENCY}
            months={bizMonths}
            tone={bizLow ? 'low' : 'ok'}
            value={bizMonths == null ? 'Covered' : <>{mo(bizMonths)}<small> mo</small></>}
            note={bizMonths == null ? 'Clients cover the business and your pay.' : <>Burns {usd(bizBurn)} a month · lasts to {lastsTo(bizMonths)}</>}
          />
          <Gauge
            k="You"
            months={youShort ? youMonths : runwayAt(you.freeCents, youBeforePay)}
            tone={youShort && youMonths != null && youMonths < FLOOR_MONTHS ? 'low' : 'ok'}
            value={youShort ? <>{mo(youMonths)}<small> mo</small></> : <>+{usdK(-youBurn)}<small>/mo</small></>}
            note={youShort ? <>Spending runs {usd(youBurn)} a month past your pay.</> : <>Left over after {usd(youBeforePay)} of spending. If pay stopped: {mo(runwayAt(you.freeCents, youBeforePay))} months.</>}
          />
          <Gauge
            k="Together"
            months={all.runwayMonths}
            tone="flat"
            value={<>{mo(all.runwayMonths)}<small> mo</small></>}
            note={<>Doesn&rsquo;t move. {usd(all.burnCents)} a month goes out either way.</>}
          />
        </div>
        <p className="rvp-verdict">{verdict}</p>
      </section>

      <section className="rx-ch">
        <p className="rx-ch-n">02</p>
        <h2 className="rx-ch-h">A year ahead at this pay</h2>
        <p className="rx-ch-lede">Free cash on each side. The shaded band is {FLOOR_MONTHS} months of that side&rsquo;s burn.</p>
        <div className="rvp-flows">
          <div><p className="rvp-flow-k">{AGENCY}</p><LineChart values={bizAhead.values} future={bizAhead.future} labels={bizAhead.labels} fmt={usdK} floor={bizBurn > 0 ? FLOOR_MONTHS * bizBurn : undefined} aria={`${AGENCY} free cash ahead`} /></div>
          <div><p className="rvp-flow-k">You</p><LineChart values={youAhead.values} future={youAhead.future} labels={youAhead.labels} fmt={usdK} floor={youBurn > 0 ? FLOOR_MONTHS * youBurn : undefined} aria="Your free cash ahead" /></div>
        </div>
      </section>
      <SampleFoot>Each side&rsquo;s burn is its average over the last three closed months with your pay taken out, then your pay put back at the slider&rsquo;s amount.</SampleFoot>
    </RunwayBody>
  );
}
