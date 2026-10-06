'use client';

/* Personal runway · C · Safety net. Your savings as an emergency fund: how
 * many months of your life they cover, against a 6-month goal (the live
 * page's floor), what's already promised in the next 30 days, and a what-if
 * for the month the business pays you less, which shows both sides of it:
 * your net, and Esy LLC's runway. */

import { useState } from 'react';
import { mo, shortDate, usd, usdK } from '../format';
import { AGENCY, CHECKING_CENTS, FLOOR_MONTHS, NOW, SAVINGS_CENTS, bookFor, runwayAt, upcoming } from '../sample';
import { Mast, Rail, RunwayBody, SampleFoot } from '../shared';

export default function RunwaySafetyNet() {
  const b = bookFor('personal');
  const biz = bookFor('business');
  const spend = Math.round(b.avgOut); // a month of your life, cards and cash
  const covers = SAVINGS_CENTS / spend;
  const goal = FLOOR_MONTHS * spend;
  const toGo = Math.max(0, goal - SAVINGS_CENTS);
  const pay = b.payByMonth[b.payByMonth.length - 1].pay;
  const bizBeforePay = Math.round(biz.avgOut - biz.avgPay - biz.avgIn);

  const [less, setLess] = useState(0);
  const newPay = pay - less;
  const net = newPay + Math.round(b.avgInterest) - spend; // a month's left over at that pay
  const monthsToGoal = net > 0 ? Math.ceil(toGo / net) : null;
  const goalDate = monthsToGoal != null ? new Date(NOW.getFullYear(), NOW.getMonth() + monthsToGoal, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : null;
  const bizMonthsNow = runwayAt(biz.freeCents, bizBeforePay + pay);
  const bizMonthsThen = runwayAt(biz.freeCents, bizBeforePay + newPay);

  const next30 = upcoming('personal', 31);
  const committed = next30.reduce((n, u) => n + u.amountCents, 0);

  return (
    <RunwayBody rail={<Rail scope="personal" b={b} />}>
      <Mast kicker={<span className="rvp-chip">Personal</span>} />
      <section className="rvp-ask">
        <p className="rx-ch-n">Your safety net</p>
        <h2 className="rvp-ask-h">Savings cover <span className={covers < FLOOR_MONTHS ? 'is-low' : ''}>{mo(Math.round(covers * 10) / 10)} months</span> of your life.</h2>
        <p className="rx-ch-lede">{usd(SAVINGS_CENTS)} in high-yield savings, at {usd(spend)} a month of spending. The goal is {FLOOR_MONTHS} months: {usd(goal)}.</p>
        <div className="rvp-goal" role="img" aria-label={`${Math.round((SAVINGS_CENTS / goal) * 100)}% of a ${FLOOR_MONTHS}-month goal`}>
          <div className="rvp-goal-bar">
            <i style={{ width: `${Math.min(100, (SAVINGS_CENTS / goal) * 100)}%` }} />
            {Array.from({ length: FLOOR_MONTHS - 1 }, (_, k) => <span key={k} style={{ left: `${((k + 1) / FLOOR_MONTHS) * 100}%` }} />)}
          </div>
          <div className="rvp-goal-scale">{Array.from({ length: FLOOR_MONTHS + 1 }, (_, k) => <span key={k}>{k} mo</span>)}</div>
        </div>
        <p className="rvp-answer">
          <b>{usd(toGo)} to go.</b> At {usd(pay)} a month from {AGENCY}, you keep {usd(pay + Math.round(b.avgInterest) - spend)} a month, which gets there by {new Date(NOW.getFullYear(), NOW.getMonth() + Math.ceil(toGo / (pay + Math.round(b.avgInterest) - spend)), 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
        </p>
      </section>

      <section className="rx-ch">
        <p className="rx-ch-n">01</p>
        <h2 className="rx-ch-h">Already promised, next 30 days</h2>
        <p className="rx-ch-lede"><b>{usd(committed)}</b> is spoken for out of {usd(CHECKING_CENTS)} in checking, before groceries and everything else.</p>
        <ul className="rv-due rvp-due-light">
          {next30.map((u) => <li key={u.key}><span>{shortDate(u.dueOn)}</span><span>{u.label}<small>{u.sublabel}</small></span><b>{usd(u.amountCents)}</b></li>)}
        </ul>
      </section>

      <section className="rx-ch">
        <p className="rx-ch-n">02</p>
        <h2 className="rx-ch-h">If {AGENCY} paid you less</h2>
        <p className="rx-ch-lede">A slow month for the business is a smaller month for you. Drag to see both.</p>
        <label className="rx-slider">
          <span>Pay me <b>{usd(less)}</b> less</span>
          <input type="range" min={0} max={pay} step={25_000} value={less} onChange={(e) => setLess(Number(e.target.value))} />
          <span className="rx-slider-out">
            At <b>{usd(newPay)}</b> a month,{' '}
            {net >= 0
              ? <>you keep <b>{usd(net)}</b>{monthsToGoal ? <> and reach {FLOOR_MONTHS} months by <b>{goalDate}</b></> : <> and you&rsquo;re already at the goal</>}.</>
              : <>you&rsquo;re <b>{usd(-net)}</b> short each month, and savings cover that for <b>{mo(Math.round((SAVINGS_CENTS / -net) * 10) / 10)} months</b>.</>}
            {' '}{less === 0
              ? <>{AGENCY}&rsquo;s runway stays at {mo(bizMonthsNow)} months.</>
              : <>{AGENCY}&rsquo;s runway goes from {mo(bizMonthsNow)} to <b>{bizMonthsThen == null ? 'covered' : `${mo(bizMonthsThen)} months`}</b>.</>}
          </span>
        </label>
        <dl className="rvp-whatif">
          <div><dt>Your month</dt><dd className={net >= 0 ? 'is-up' : 'is-down'}>{net >= 0 ? '+' : '−'}{usdK(Math.abs(net))}</dd></div>
          <div><dt>To {FLOOR_MONTHS} months</dt><dd>{monthsToGoal == null ? (toGo ? 'never' : 'there') : `${monthsToGoal} mo`}</dd></div>
          <div><dt>{AGENCY} runway</dt><dd>{mo(bizMonthsThen)} mo</dd></div>
        </dl>
      </section>
      <SampleFoot>A month of your life is your average spending over the last three months, cards included.</SampleFoot>
    </RunwayBody>
  );
}
