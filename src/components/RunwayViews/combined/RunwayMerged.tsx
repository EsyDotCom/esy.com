'use client';

/* Combined runway · D · Merged (round 2). One page, one route: A's switch
 * (Combined · Esy LLC · Personal) and A's one setting, "Include my personal
 * accounts". Under Combined: the big combined number, B's three columns
 * (Esy LLC | the bridge | You), then C's pay planner. Esy LLC is A's business
 * view. Personal leads with Personal B's paycheck question, with Personal C's
 * 6-month savings target beside "If pay stopped".
 *
 * Sections change shape from the data, never from a setting:
 *   - the business pays you   → the bridge says "Paid to you", the pay slider is live,
 *                                and Personal leads with the paycheck;
 *   - you fund the business   → the bridge flips to "You put in", the slider becomes a
 *                                "not yet" goal, and Personal leads with the safety net;
 *   - nothing has moved yet   → no bridge, the two sides sit side by side, and the pay
 *                                section is the goal, or a note when there's too little history. */

import { useState } from 'react';
import { FlowBars } from '../charts';
import { mo, shortDate, usd, usdK } from '../format';
import MovedNote from '../MovedNote';
import { Bridge, NotYetGoal, PayPlanner, PaycheckChart, SideCard, paycheckAnswer, payMode } from '../parts';
import { AGENCY, FLOOR_MONTHS, bookFor, lastsTo, runwayAt, upcoming, type Scope, type ScopeBook, type Stage } from '../sample';
import { Chapters, FreeCashHero, Insights, Keys, Mast, Rail, RunwayBody, SampleFoot, liveKeys, type Key } from '../shared';

const VIEWS: { scope: Scope; label: string }[] = [
  { scope: 'combined', label: 'Combined' },
  { scope: 'business', label: AGENCY },
  { scope: 'personal', label: 'Personal' },
];

/** The business's key numbers when you fund it: how it stands on its own, and what you add. */
function fundedKeys(biz: ScopeBook, range: 6 | 12): Key[] {
  const months = biz.months.slice(-range);
  const fromYou = (period: string) => biz.payByMonth.find((m) => m.period === period)?.fromYou ?? 0;
  const onOwnBurn = Math.round(biz.avgOut - biz.avgIncome);
  return [
    { label: 'On its own', value: `${mo(runwayAt(biz.freeCents, onOwnBurn))} mo`, spark: months.map((m) => Math.max(0, ((m.closingBalanceCents ?? 0) - biz.cardBillsCents) / onOwnBurn)) },
    { label: 'Burn on its own', value: usdK(onOwnBurn), spark: months.map((m) => m.cashOutCents - (m.cashInCents - fromYou(m.period))) },
    { label: 'Clients pay', value: usdK(biz.avgIncome), spark: months.map((m) => m.cashInCents - fromYou(m.period)) },
    { label: 'You put in', value: usdK(biz.avgFromYou), spark: months.map((m) => fromYou(m.period)) },
  ];
}

const monthName = (period: string) => new Date(`${period}-15T12:00:00`).toLocaleDateString('en-US', { month: 'long' });

/** Your 6-month savings target, at what drains your money now. */
function savingsTarget(you: ScopeBook, monthlyCents: number) {
  const goal = FLOOR_MONTHS * monthlyCents;
  return { goal, toGo: Math.max(0, goal - you.freeCents), above: Math.max(0, you.freeCents - goal) };
}

// ── Personal, when the business pays you: the paycheck question ─────────────
function PaycheckLead({ stage, you }: { stage: Stage; you: ScopeBook }) {
  const a = paycheckAnswer(stage);
  const spendNoPay = Math.round(you.avgOut - you.avgInterest);
  const ifStopped = runwayAt(you.freeCents, spendNoPay);
  const target = savingsTarget(you, spendNoPay);
  return (
    <>
      <section className="rvp-ask">
        <p className="rx-ch-n">Your pay</p>
        <h2 className="rvp-ask-h">Does what {AGENCY} pays you cover your life?</h2>
        <p className="rvp-answer">
          <b>In {a.covered} of the last {a.months} months, yes.</b> {AGENCY} paid you {usd(a.paid)}; you spent {usd(a.spent)}
          {a.sentBack ? `, and sent ${usd(a.sentBack)} back to the business in ${a.sentBackIn}` : ''}.
        </p>
      </section>
      <dl className="rx-keys rvp-keys5">
        <div><dt>Paid to you</dt><dd>{usdK(you.avgPay)}<small className="rvp-per">/mo</small></dd><p className="rvp-key-note">last three months</p></div>
        <div><dt>You spend</dt><dd>{usdK(you.avgOut)}<small className="rvp-per">/mo</small></dd><p className="rvp-key-note">cards and cash</p></div>
        <div><dt>Left over</dt><dd className="is-up">{usdK(-you.burnCents)}<small className="rvp-per">/mo</small></dd><p className="rvp-key-note">with savings interest</p></div>
        <div><dt>If pay stopped</dt><dd className={ifStopped != null && ifStopped < FLOOR_MONTHS ? 'is-low' : ''}>{mo(ifStopped)}<small className="rvp-per"> mo</small></dd><p className="rvp-key-note">floor is {FLOOR_MONTHS}</p></div>
        <div><dt>Savings target</dt><dd className={target.toGo ? '' : 'is-up'}>{target.toGo ? usdK(target.toGo) : 'Met'}</dd><p className="rvp-key-note">{target.toGo ? `to go, of ${usdK(target.goal)} (${FLOOR_MONTHS} mo)` : `${usdK(target.above)} above ${FLOOR_MONTHS} mo`}</p></div>
      </dl>
      <section className="rx-ch">
        <p className="rx-ch-n">01</p>
        <h2 className="rx-ch-h">Pay against spending, month by month</h2>
        <p className="rx-ch-lede">Jade is what {AGENCY} paid you; navy is what you spent. Gold months are the ones the business skipped or cut.</p>
        <PaycheckChart stage={stage} />
      </section>
    </>
  );
}

// What drains your money now when no pay comes in: what you spend, plus what
// you put into the business, less savings interest. A paycheck that has
// stopped isn't counted.
const personalDrain = (you: ScopeBook) => Math.round(you.avgSpend + you.avgFromYou - you.avgInterest);

/** Personal's free-cash line: how long your money lasts, by the same clock as the section under it. */
function personalLine(you: ScopeBook, paying: boolean) {
  if (paying) {
    const stopped = runwayAt(you.freeCents, Math.round(you.avgOut - you.avgInterest));
    return <>If pay from {AGENCY} stopped: <b>{mo(stopped)} months</b> · lasts to {lastsTo(stopped ?? 0)}</>;
  }
  const drain = personalDrain(you);
  const covers = runwayAt(you.freeCents, drain);
  return <><b>{mo(covers)} months</b> at {usdK(drain)} a month{you.avgFromYou > 0 ? `, ${usdK(you.avgFromYou)} of it into ${AGENCY}` : ', with no paycheck coming in'} · lasts to {lastsTo(covers ?? 0)}</>;
}

// ── Personal, when no pay comes in: the safety net is the real clock ────────
function SafetyLead({ stage, you }: { stage: Stage; you: ScopeBook }) {
  const drain = personalDrain(you);
  const covers = runwayAt(you.freeCents, drain);
  const target = savingsTarget(you, drain);
  const lastPaycheck = you.salary?.lastPeriod ? you.salary : null;
  const firstIn = you.payByMonth.find((m) => m.fromYou > 0);
  const without = you.avgFromYou > 0 ? runwayAt(you.freeCents, Math.round(you.avgSpend - you.avgInterest)) : null;
  const next30 = upcoming('personal', 31, stage);
  return (
    <>
      <section className="rvp-ask">
        <p className="rx-ch-n">Your safety net</p>
        <h2 className="rvp-ask-h">Your money covers <span className={covers != null && covers < FLOOR_MONTHS ? 'is-low' : ''}>{mo(covers)} months</span> of your life.</h2>
        <p className="rx-ch-lede">
          Checking and savings, less card bills: {usd(you.freeCents)}. You spend {usd(you.avgSpend)} a month
          {you.avgFromYou > 0 ? <> and put {usd(you.avgFromYou)} into {AGENCY}. Without that, {mo(without)} months.</> : '.'}
          {lastPaycheck && <> Your last paycheck from {lastPaycheck.label.replace(/ payroll$/, '')} came in {monthName(lastPaycheck.lastPeriod!)}; nothing has come in since.</>}
        </p>
        <div className="rvp-goal" role="img" aria-label={`${mo(covers)} of a ${FLOOR_MONTHS}-month goal`}>
          <div className="rvp-goal-bar">
            <i className={covers != null && covers < FLOOR_MONTHS ? 'is-low' : ''} style={{ width: `${Math.min(100, ((covers ?? 0) / FLOOR_MONTHS) * 100)}%` }} />
            {Array.from({ length: FLOOR_MONTHS - 1 }, (_, k) => <span key={k} style={{ left: `${((k + 1) / FLOOR_MONTHS) * 100}%` }} />)}
          </div>
          <div className="rvp-goal-scale">{Array.from({ length: FLOOR_MONTHS + 1 }, (_, k) => <span key={k}>{k} mo</span>)}</div>
        </div>
        <p className="rvp-answer">
          {target.toGo
            ? <><b>{usd(target.toGo)} short of {FLOOR_MONTHS} months.</b> At this pace it runs out in {lastsTo(covers ?? 0)}.</>
            : <><b>{usd(target.above)} above {FLOOR_MONTHS} months.</b> At this pace it lasts to {lastsTo(covers ?? 0)}.</>}
        </p>
      </section>
      <dl className="rx-keys rvp-keys5">
        <div><dt>Covers</dt><dd className={covers != null && covers < FLOOR_MONTHS ? 'is-low' : ''}>{mo(covers)}<small className="rvp-per"> mo</small></dd><p className="rvp-key-note">of your life, at this pace</p></div>
        <div><dt>You spend</dt><dd>{usdK(you.avgSpend)}<small className="rvp-per">/mo</small></dd><p className="rvp-key-note">cards and cash</p></div>
        {you.avgFromYou > 0
          ? <div><dt>Into {AGENCY}</dt><dd>{usdK(you.avgFromYou)}<small className="rvp-per">/mo</small></dd><p className="rvp-key-note">{usd(you.fromYouTotalCents)} since {firstIn ? monthName(firstIn.period) : 'you started'}</p></div>
          : <div><dt>Coming in</dt><dd>{usdK(0)}</dd><p className="rvp-key-note">{lastPaycheck ? `last paycheck in ${monthName(lastPaycheck.lastPeriod!)}` : 'no pay yet'}</p></div>}
        <div><dt>{AGENCY} pays you</dt><dd>{usdK(you.avgPay)}</dd><p className="rvp-key-note">not yet</p></div>
        <div><dt>Savings target</dt><dd className={target.toGo ? '' : 'is-up'}>{target.toGo ? usdK(target.toGo) : 'Met'}</dd><p className="rvp-key-note">{target.toGo ? `to go, of ${usdK(target.goal)} (${FLOOR_MONTHS} mo)` : `${usdK(target.above)} above ${FLOOR_MONTHS} mo`}</p></div>
      </dl>
      <section className="rx-ch">
        <p className="rx-ch-n">01</p>
        <h2 className="rx-ch-h">In and out, month by month</h2>
        <p className="rx-ch-lede">{you.avgFromYou > 0 ? `Money out includes what you put into ${AGENCY}.` : lastPaycheck ? `The paychecks stop in ${monthName(lastPaycheck.lastPeriod!)}.` : 'Your own accounts.'}</p>
        <div className="rx-ch-body"><FlowBars key={`p${stage}`} months={you.months} /></div>
      </section>
      <section className="rx-ch">
        <p className="rx-ch-n">02</p>
        <h2 className="rx-ch-h">Already promised, next 30 days</h2>
        <p className="rx-ch-lede"><b>{usd(next30.reduce((s, u) => s + u.amountCents, 0))}</b> is spoken for, before groceries and everything else.</p>
        <ul className="rv-due rvp-due-light">
          {next30.map((u) => <li key={u.key}><span>{shortDate(u.dueOn)}</span><span>{u.label}<small>{u.sublabel}</small></span><b>{usd(u.amountCents)}</b></li>)}
        </ul>
      </section>
    </>
  );
}

export default function RunwayMerged({ stage }: { stage: Stage }) {
  const [includePersonal, setIncludePersonal] = useState(true);
  const [picked, setPicked] = useState<Scope>('combined');
  const [range, setRange] = useState<6 | 12>(12);
  // Without your personal accounts there's nothing to switch between.
  const scope: Scope = includePersonal ? picked : 'business';

  const all = bookFor('combined', stage);
  const biz = bookFor('business', stage);
  const you = bookFor('personal', stage);
  const mode = payMode(biz);
  const b = scope === 'combined' ? all : scope === 'business' ? biz : you;

  // The business alone, funded by you: say how long it lasts on its own first.
  const onOwn = runwayAt(biz.freeCents, Math.round(biz.avgOut - biz.avgIncome));
  const bizLine = mode === 'funding'
    ? <>On its own: <b>{mo(onOwn)} months</b> at {usdK(Math.round(biz.avgOut - biz.avgIncome))} a month · with the {usd(biz.avgFromYou)} a month you put in, it covers its costs</>
    : undefined;

  return (
    <RunwayBody rail={<Rail key={`${stage}${scope}`} scope={scope} b={b} />}>
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

      {scope === 'combined' && (
        <div key={`c${stage}`}>
          <FreeCashHero b={all} label="Free cash, both sides" />
          <MovedNote scope="combined" b={all} />
          <div className={`rvp-split ${mode === 'none' ? 'is-two' : ''}`}>
            <SideCard side="business" b={biz} />
            {mode !== 'none' && <Bridge biz={biz} />}
            <SideCard side="personal" b={you} />
          </div>
          {mode === 'paying' ? <PayPlanner stage={stage} n="02" /> : <NotYetGoal stage={stage} n="02" />}
          <Insights scope="combined" b={all} />
        </div>
      )}

      {scope === 'business' && (
        <div key={`b${stage}`}>
          <FreeCashHero b={biz} line={bizLine} />
          {includePersonal && <MovedNote scope="business" b={biz} />}
          <Keys keys={mode === 'funding' ? fundedKeys(biz, range) : liveKeys(biz, range)} range={range} setRange={setRange} />
          <Insights scope="business" b={biz} />
          <Chapters b={biz} range={range} inOutLede={mode === 'funding' ? `${AGENCY} alone. What you put in is in the money in.` : mode === 'paying' ? `${AGENCY} alone. Your pay is in the money out.` : `${AGENCY} alone, since it opened.`} />
        </div>
      )}

      {scope === 'personal' && (
        <div key={`p${stage}`}>
          {/* Free cash first, as on the other two tabs; the stage-led section follows. */}
          <FreeCashHero b={you} label="Your free cash" line={personalLine(you, mode === 'paying')} />
          {mode === 'paying' ? <PaycheckLead stage={stage} you={you} /> : <SafetyLead stage={stage} you={you} />}
        </div>
      )}
      <SampleFoot />
    </RunwayBody>
  );
}
