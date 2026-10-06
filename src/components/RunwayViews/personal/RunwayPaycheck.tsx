'use client';

/* Personal runway · B · Paycheck. Framed around one question: does what
 * Esy LLC pays you cover your life? Month by month, pay against everything you
 * spent (cards included), the gap or surplus under each month, and the
 * months the business skipped or cut your pay picked out in gold. Then the
 * fallback: how long your own money lasts if pay stopped today. */

import { mo, monthLabel, usd, usdK } from '../format';
import { PaycheckChart } from '../parts';
import { AGENCY, FLOOR_MONTHS, bookFor, lastsTo, paycheckMonths, runwayAt } from '../sample';
import { Mast, Rail, RunwayBody, SampleFoot } from '../shared';

const TYPICAL_PAY = 600_000;

export default function RunwayPaycheck() {
  const b = bookFor('personal');
  const rows = paycheckMonths();
  const closed = rows.filter((r) => !r.open);
  const covered = closed.filter((r) => r.pay >= r.spend).length;
  const paid = closed.reduce((n, r) => n + r.pay, 0);
  const spent = closed.reduce((n, r) => n + r.spend, 0);
  const sentBack = closed.reduce((n, r) => n + r.toBusiness, 0);
  const spendNoPay = Math.round(b.avgOut - b.avgInterest);
  const ifStopped = runwayAt(b.freeCents, spendNoPay);

  const why = (r: (typeof rows)[number]) =>
    r.open ? 'October so far'
      : r.pay === 0 ? `${AGENCY} skipped your pay${r.toBusiness ? ` and you sent it ${usd(r.toBusiness)}` : ''}`
        : r.pay < TYPICAL_PAY ? `Pay cut to ${usd(r.pay)}`
          : r.spend > r.pay ? 'You spent more than you were paid'
            : 'Covered';

  return (
    <RunwayBody rail={<Rail scope="personal" b={b} />}>
      <Mast kicker={<span className="rvp-chip">Personal</span>} />
      <section className="rvp-ask">
        <p className="rx-ch-n">Your pay</p>
        <h2 className="rvp-ask-h">Does what {AGENCY} pays you cover your life?</h2>
        <p className="rvp-answer">
          <b>In {covered} of the last {closed.length} months, yes.</b> {AGENCY} paid you {usd(paid)}; you spent {usd(spent)}
          {sentBack ? `, and sent ${usd(sentBack)} back to the business in February` : ''}.
        </p>
      </section>

      <dl className="rx-keys rvp-keys4">
        <div><dt>Paid to you</dt><dd>{usdK(b.avgPay)}<small className="rvp-per">/mo</small></dd><p className="rvp-key-note">last three months</p></div>
        <div><dt>You spend</dt><dd>{usdK(b.avgOut)}<small className="rvp-per">/mo</small></dd><p className="rvp-key-note">cards and cash</p></div>
        <div><dt>Left over</dt><dd className="is-up">{usdK(-b.burnCents)}<small className="rvp-per">/mo</small></dd><p className="rvp-key-note">with savings interest</p></div>
        <div><dt>If pay stopped</dt><dd className={ifStopped != null && ifStopped < FLOOR_MONTHS ? 'is-low' : ''}>{mo(ifStopped)}<small className="rvp-per"> mo</small></dd><p className="rvp-key-note">floor is {FLOOR_MONTHS}</p></div>
      </dl>

      <section className="rx-ch">
        <p className="rx-ch-n">01</p>
        <h2 className="rx-ch-h">Pay against spending, month by month</h2>
        <p className="rx-ch-lede">Jade is what {AGENCY} paid you; navy is what you spent. Gold months are the ones the business skipped or cut.</p>
        <PaycheckChart />
      </section>

      <section className="rx-ch">
        <p className="rx-ch-n">02</p>
        <h2 className="rx-ch-h">If pay stopped today</h2>
        <p className="rx-ch-lede">Checking and savings, less the Sapphire bill, at {usd(spendNoPay)} a month of spending.</p>
        <div className="rvp-stopped">
          <p className="rvp-stopped-num">{mo(ifStopped)}<small> months</small></p>
          <div className="rvp-runbar" role="img" aria-label={`${mo(ifStopped)} months against a ${FLOOR_MONTHS}-month floor`}>
            <i className={ifStopped != null && ifStopped < FLOOR_MONTHS ? 'is-low' : ''} style={{ width: `${Math.min(100, ((ifStopped ?? 0) / 12) * 100)}%` }} />
            <span className="rvp-runbar-floor" style={{ left: `${(FLOOR_MONTHS / 12) * 100}%` }}><em>{FLOOR_MONTHS} mo floor</em></span>
          </div>
          <p className="rvp-stopped-note">{usd(b.freeCents)} would last to {lastsTo(ifStopped ?? 0)}. Keeping {FLOOR_MONTHS} months takes {usd(FLOOR_MONTHS * spendNoPay - b.freeCents)} more, about {Math.ceil((FLOOR_MONTHS * spendNoPay - b.freeCents) / -b.burnCents)} months of what&rsquo;s left over now.</p>
        </div>
      </section>

      <section className="rx-ch">
        <p className="rx-ch-n">03</p>
        <h2 className="rx-ch-h">The months</h2>
        <table className="rv-audit rvp-months">
          <thead><tr><th>Month</th><th>Pay</th><th>Spent</th><th>Left over</th><th>What happened</th></tr></thead>
          <tbody>
            {[...rows].reverse().map((r) => (
              <tr key={r.period} className={r.pay < TYPICAL_PAY && !r.open ? 'is-cut' : ''}>
                <td><b>{monthLabel(r.period)}</b>{r.open ? ' (so far)' : ''}</td>
                <td>{usd(r.pay)}</td>
                <td>{usd(r.spend)}</td>
                <td className={r.pay - r.spend >= 0 ? 'is-up' : 'is-down'}>{r.pay - r.spend >= 0 ? '+' : '−'}{usd(Math.abs(r.pay - r.spend))}</td>
                <td>{why(r)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <SampleFoot>Spending is every purchase on your personal cards and accounts; pay is what landed from {AGENCY}.</SampleFoot>
    </RunwayBody>
  );
}
