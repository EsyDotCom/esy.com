'use client';

/* Personal runway · A · Household. The live page's layout, on your own
 * accounts only. The business shows up once, as the money in: "From Esy LLC".
 * Your pay covers your spending, so the runway that matters is the one if it
 * stopped, measured against the live page's 6-month floor. Under the
 * insights, the bills that come back every month, with the Sapphire bill set
 * aside like the live page sets card statements aside. */

import { useState } from 'react';
import { mo, ordinal, shortDate, usd, usdK } from '../format';
import MovedNote from '../MovedNote';
import { AGENCY, FLOOR_MONTHS, bookFor, lastsTo, recurringFor, runwayAt, upcoming } from '../sample';
import { Chapters, FreeCashHero, Insights, Keys, Mast, Rail, RunwayBody, SampleFoot } from '../shared';

export default function RunwayHousehold() {
  const [range, setRange] = useState<6 | 12>(12);
  const b = bookFor('personal');
  // Without pay: what you spend, less the savings interest that keeps coming.
  const spendNoPay = Math.round(b.avgOut - b.avgInterest);
  const ifStopped = runwayAt(b.freeCents, spendNoPay);
  const inRange = b.months.slice(-range);
  const bills = recurringFor('personal');
  const card = upcoming('personal', 31).find((u) => u.key === 'a-sapphire');

  return (
    <RunwayBody rail={<Rail scope="personal" b={b} />}>
      <Mast kicker={<span className="rvp-chip">Personal</span>} />
      <FreeCashHero
        b={b}
        label="Your free cash"
        line={<>If pay from {AGENCY} stopped today: <b>{mo(ifStopped)} months</b> · lasts to {lastsTo(ifStopped ?? 0)}{ifStopped != null && ifStopped < FLOOR_MONTHS ? `, under your ${FLOOR_MONTHS}-month floor` : ''}</>}
      />
      <MovedNote scope="personal" b={b} />
      <Keys
        range={range}
        setRange={setRange}
        keys={[
          { label: 'If pay stopped', value: `${mo(ifStopped)} mo`, spark: inRange.map((m) => Math.max(0, ((m.closingBalanceCents ?? 0) - b.cardBillsCents) / spendNoPay)) },
          { label: 'Spending', value: usdK(b.avgOut), spark: inRange.map((m) => m.cashOutCents) },
          { label: `From ${AGENCY}`, value: usdK(b.avgPay), spark: b.payByMonth.slice(-range).map((m) => m.pay) },
          { label: 'Left over', value: usdK(-b.burnCents), spark: inRange.map((m) => m.netCents) },
        ]}
      />
      <Insights scope="personal" b={b} />

      <section className="rx-ch">
        <p className="rx-ch-n">02</p>
        <h2 className="rx-ch-h">Bills that come back every month</h2>
        <p className="rx-ch-lede"><b>{usd(bills.totalCents)} a month</b> before you buy groceries or eat out: {Math.round((bills.totalCents / b.avgOut) * 100)}% of what you spend.</p>
        <div className="rx-ch-body">
          <ul className="rvp-bills">
            {bills.items.map((r) => (
              <li key={r.key}><span>{r.label}<small>{r.sublabel}</small></span><span className="rvp-bills-day">the {ordinal(r.day)}</span><b>{usd(r.amountCents)}</b></li>
            ))}
            {card && <li className="is-card"><span>{card.label}<small>Set aside: already out of free cash</small></span><span className="rvp-bills-day">{shortDate(card.dueOn)}</span><b>{usd(card.amountCents)}</b></li>}
          </ul>
        </div>
      </section>

      <Chapters
        b={b}
        range={range}
        start={3}
        inOutLede={`Pay from ${AGENCY} is the money in. February it didn’t come, and you sent ${AGENCY} $3,000.`}
        aheadBurn={spendNoPay}
        aheadLede={`If pay stopped today: your free cash over the next twelve months at what you spend (${usd(spendNoPay)} a month). Drag to cut it.`}
      />
      <SampleFoot>Free cash is checking and savings less the Sapphire statement.</SampleFoot>
    </RunwayBody>
  );
}
