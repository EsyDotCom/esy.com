'use client';

/* Pieces more than one direction uses, lifted out of B · Split, C · Pay
 * yourself and Personal B · Paycheck so D · Merged can stack them without
 * copies: the side cards and the bridge between them, the pay planner, the
 * "not yet" goal, and the pay-against-spending chart. Each reads the data and
 * picks its own shape from it (paying you, funded by you, or neither), never
 * from a setting. */

import { useState } from 'react';
import { LineChart } from './charts';
import { mo, monthLabel, usd, usdK } from './format';
import {
  AGENCY,
  FLOOR_MONTHS,
  PLAN_HISTORY_DAYS,
  bookFor,
  lastsTo,
  paycheckMonths,
  runwayAt,
  type ScopeBook,
  type Side,
  type Stage,
} from './sample';

/** Which way money is moving between the business and you, from the data. */
export type PayMode = 'paying' | 'funding' | 'none';
export const payMode = (biz: ScopeBook): PayMode => (biz.avgPay > 0 ? 'paying' : biz.avgFromYou > 0 ? 'funding' : 'none');

const monthName = (period: string) => new Date(`${period}-15T12:00:00`).toLocaleDateString('en-US', { month: 'long' });

/**
 * What drains your own money each month when no pay comes in: what you spend,
 * plus what you put into the business, less savings interest. A paycheck that
 * has stopped isn't counted. The You column and the Personal tab both use it.
 */
export const personalDrain = (you: ScopeBook) => Math.round(you.avgSpend + you.avgFromYou - you.avgInterest);

// ── The side cards and the bridge (B · Split) ───────────────────────────────

const SCALE_MONTHS = 24; // the runway bars run to two years

/** One side: cash, burn and runway against the floor. Its shape follows the data: covered, propped up by you, or burning. */
export function SideCard({ side, b }: { side: Side; b: ScopeBook }) {
  const propped = side === 'business' && b.avgFromYou > 0;
  // What the business burns without the money you put in.
  const onOwnBurn = Math.round(b.avgOut - b.avgIncome);
  // A paycheck from somewhere else that has stopped: the three-month average
  // still holds its last weeks, so measure by what drains your money now
  // instead (the same clock as the Personal tab).
  const lastClosed = b.months[b.months.length - 2]?.period ?? '';
  const lastPaycheck = side === 'personal' && b.salary?.lastPeriod && b.salary.lastPeriod < lastClosed ? b.salary : null;
  const burn = lastPaycheck ? personalDrain(b) : b.burnCents;
  const covered = b.burnMeasured && burn <= 0 && !propped;
  // A side whose money in covers money out still has a number worth knowing: how long without that money in.
  const ifStopped = covered && side === 'personal' ? runwayAt(b.freeCents, Math.round(b.avgOut - b.avgInterest - b.avgIncome)) : null;
  const months = !b.burnMeasured ? null : propped ? runwayAt(b.freeCents, onOwnBurn) : covered ? ifStopped : runwayAt(b.freeCents, burn);
  const top = b.cats.filter((c) => c.key !== 'OTHER' && c.key !== 'OWNER_PAY').slice(0, 3)
    .map((c) => ({ name: c.name, cents: b.catSeries.slice(-4, -1).reduce((n, m) => n + (m.byCat[c.key] ?? 0), 0) / Math.min(3, Math.max(1, b.catSeries.length - 1)) }));
  const low = months != null && months < FLOOR_MONTHS;

  const facts: [string, React.ReactNode, string?][] = [['In the bank', usd(b.cashCents)]];
  if (!b.burnMeasured) facts.push(['Burn', '—'], ['Runway', '—']);
  else if (propped) facts.push(['Burn on its own', <>{usdK(onOwnBurn)}<small>/mo</small></>], ['On its own', <>{mo(months)}<small> mo</small></>, low ? 'is-low' : '']);
  else if (covered && side === 'business') facts.push(['Left over', <>{usdK(-b.burnCents)}<small>/mo</small></>, 'is-up'], ['Runway', 'Covered']);
  else if (covered) facts.push(['Left over', <>{usdK(-b.burnCents)}<small>/mo</small></>, 'is-up'], ['If pay stopped', <>{mo(months)}<small> mo</small></>, low ? 'is-low' : '']);
  else facts.push(['Burn', <>{usdK(burn)}<small>/mo</small></>], ['Runway', <>{mo(months)}<small> mo</small></>, low ? 'is-low' : '']);

  const note = !b.burnMeasured
    ? <>Not enough history yet, {b.observedDays} days in. A month of activity gives a usable rate.</>
    : propped
      ? <>With the {usd(b.avgFromYou)} a month you put in, it covers its costs. On its own it lasts to {lastsTo(months ?? 0)}.</>
      : covered && side === 'business'
        ? <>Clients cover the costs so far{b.observedDays < 92 ? `, ${b.observedDays} days in` : ''}.</>
        : covered
          ? <>Pay covers your spending. Without it, savings and checking last {mo(months)} months{low ? ', under the floor' : ''}.</>
          : side === 'business'
            ? <>Lasts to {lastsTo(months ?? 0)} at this burn{b.avgPay > 0 ? ', your pay included' : ''}.</>
            : b.avgFromYou > 0
              ? <>Lasts to {lastsTo(months ?? 0)}, the {usd(b.avgFromYou)} a month into {AGENCY} included.</>
              : lastPaycheck
                ? <>No paycheck coming in: your last one from {lastPaycheck.label.replace(/ payroll$/, '')} came in {monthName(lastPaycheck.lastPeriod!)}. At what you spend, it lasts to {lastsTo(months ?? 0)}.</>
                : <>Lasts to {lastsTo(months ?? 0)} at this burn.</>;

  const firstLine = side === 'business'
    ? { label: 'Clients paid', cents: b.avgIncome }
    : b.avgPay > 0 ? { label: `From ${AGENCY}`, cents: b.avgPay } : b.avgFromYou > 0 ? { label: `Into ${AGENCY}`, cents: b.avgFromYou } : null;

  return (
    <section className={`rvp-side is-${side}`} aria-label={side === 'business' ? AGENCY : 'You'}>
      <p className="rvp-side-k">{side === 'business' ? AGENCY : 'You'}</p>
      <p className="rvp-side-num">{usd(b.freeCents)}<small>free cash</small></p>
      <dl className="rvp-side-facts">
        {facts.map(([k, v, cls]) => <div key={k}><dt>{k}</dt><dd className={cls ?? ''}>{v}</dd></div>)}
      </dl>
      <div className="rvp-runbar" role="img" aria-label={`${mo(months)} months against a ${FLOOR_MONTHS}-month floor`}>
        {/* Covered with nothing burning: a full bar, not an empty one that reads as zero. */}
        <i className={low ? 'is-low' : months == null && covered ? 'is-ok' : ''} style={{ width: `${months == null && covered ? 100 : Math.min(100, ((months ?? 0) / SCALE_MONTHS) * 100)}%` }} />
        <span className="rvp-runbar-floor" style={{ left: `${(FLOOR_MONTHS / SCALE_MONTHS) * 100}%` }}><em>{FLOOR_MONTHS} mo floor</em></span>
      </div>
      <p className="rvp-side-note">{note}</p>
      {b.months.length > 1 && (
        <div className="rvp-side-spark">
          <span>Cash, {b.months.length} months</span>
          <SparkLine values={b.months.map((m) => m.closingBalanceCents ?? 0)} />
        </div>
      )}
      <ul className="rvp-side-lines">
        {firstLine && <li><span>{firstLine.label}</span><b>{usd(firstLine.cents)}<small>/mo</small></b></li>}
        {top.map((t) => <li key={t.name}><span>{t.name}</span><b>{usd(t.cents)}<small>/mo</small></b></li>)}
      </ul>
    </section>
  );
}

// A local Spark so this file doesn't depend on the chart's default size.
function SparkLine({ values }: { values: number[] }) {
  const w = 250, h = 34;
  const min = Math.min(...values), max = Math.max(...values);
  const x = (i: number) => (i / (values.length - 1)) * (w - 4) + 2, y = (v: number) => h - 3 - ((v - min) / (max - min || 1)) * (h - 6);
  return (
    <svg className="rx-spark" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <path pathLength={1} className="rx-draw" d={values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('')} fill="none" />
      <circle cx={x(values.length - 1)} cy={y(values[values.length - 1])} r="2.5" />
    </svg>
  );
}

/** The bridge: what moved between the business and you, month by month, in the direction it moved. */
export function Bridge({ biz }: { biz: ScopeBook }) {
  const mode = payMode(biz);
  const last6 = biz.payByMonth.slice(-6);
  const value = (m: (typeof last6)[number]) => (mode === 'funding' ? m.fromYou : m.pay);
  const max = Math.max(...last6.map(value), 1);
  const lastIn = [...biz.payByMonth].reverse().find((m) => m.fromYou > 0);
  const cut = mode === 'paying' ? last6.find((m) => m.pay < max) : undefined;
  const since = biz.payByMonth.find((m) => m.fromYou > 0);
  return (
    <section className={`rvp-bridge ${mode === 'funding' ? 'is-in' : ''}`} aria-label={mode === 'funding' ? 'You put in' : 'Paid to you'}>
      <p className="rvp-bridge-k">{mode === 'funding' ? 'You put in' : 'Paid to you'}</p>
      <p className="rvp-bridge-num">{usd(mode === 'funding' ? biz.avgFromYou : biz.avgPay)}<small>a month, last 3</small></p>
      <span className="rvp-bridge-arrow" aria-hidden="true">{mode === 'funding' ? '←' : '→'}</span>
      <ol className="rvp-paybars">
        {last6.map((m) => (
          <li key={m.period} className={mode === 'paying' && m.pay < max ? 'is-cut' : ''} title={`${monthLabel(m.period)}: ${usd(value(m))}`}>
            <span><i style={{ height: `${(value(m) / max) * 100}%` }} /></span>
            <b>{value(m) ? `${Math.round(value(m) / 100_000)}k` : '0'}</b>
            <small>{monthLabel(m.period)}</small>
          </li>
        ))}
      </ol>
      <p className="rvp-bridge-note">
        {mode === 'funding'
          ? <>{usd(biz.fromYouTotalCents)} in since {since ? monthName(since.period) : 'you started'}, from your savings.</>
          : <>
              {cut && <>{monthName(cut.period)} was cut to {usd(cut.pay)}. </>}
              {lastIn && <>You last put money in in {monthName(lastIn.period)}: {usd(lastIn.fromYou)}.</>}
            </>}
      </p>
    </section>
  );
}

// ── The pay planner (C · Pay yourself) ──────────────────────────────────────

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

/** How much should I pay myself? A slider that moves both sides while the combined runway stays put. */
export function PayPlanner({ stage = 'paying', showAhead = false, n }: { stage?: Stage; showAhead?: boolean; n?: string }) {
  const all = bookFor('combined', stage);
  const biz = bookFor('business', stage);
  const you = bookFor('personal', stage);

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
    <>
      <section className="rvp-ask">
        <p className="rx-ch-n">{n ? `${n} · ` : ''}Your pay</p>
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

      {showAhead && (
        <section className="rx-ch">
          <p className="rx-ch-n">02</p>
          <h2 className="rx-ch-h">A year ahead at this pay</h2>
          <p className="rx-ch-lede">Free cash on each side. The shaded band is {FLOOR_MONTHS} months of that side&rsquo;s burn.</p>
          <div className="rvp-flows">
            <div><p className="rvp-flow-k">{AGENCY}</p><LineChart values={bizAhead.values} future={bizAhead.future} labels={bizAhead.labels} fmt={usdK} floor={bizBurn > 0 ? FLOOR_MONTHS * bizBurn : undefined} aria={`${AGENCY} free cash ahead`} /></div>
            <div><p className="rvp-flow-k">You</p><LineChart values={youAhead.values} future={youAhead.future} labels={youAhead.labels} fmt={usdK} floor={youBurn > 0 ? FLOOR_MONTHS * youBurn : undefined} aria="Your free cash ahead" /></div>
          </div>
        </section>
      )}
    </>
  );
}

// ── Not yet: what it would take to start paying you ─────────────────────────

/** The pay you'd aim for first, when the business doesn't pay you yet. */
export const FIRST_PAY_CENTS = 300_000;

/**
 * When the business doesn't pay you yet: how far it is from paying you a
 * first amount and keeping the 6-month floor, in money in the bank or money
 * coming in. With too little history, says so instead of guessing.
 */
export function NotYetGoal({ stage, n }: { stage: Stage; n?: string }) {
  const biz = bookFor('business', stage);
  const z = FIRST_PAY_CENTS;
  const head = <><p className="rx-ch-n">{n ? `${n} · ` : ''}Your pay</p><h2 className="rvp-ask-h">Paying yourself: not yet</h2></>;

  if (biz.historyDays < PLAN_HISTORY_DAYS) {
    const inSoFar = biz.months.reduce((s, m) => s + m.cashInCents, 0);
    const outSoFar = biz.months.reduce((s, m) => s + m.cashOutCents, 0);
    return (
      <section className="rvp-ask">
        {head}
        <p className="rvp-answer">
          Once {AGENCY} has three months of history, this shows what it can pay you. It has <b>{biz.historyDays} days</b> so far: {usd(inSoFar)} in from clients, {usd(outSoFar)} out.
        </p>
      </section>
    );
  }

  // Before any pay, and without the money you put in.
  const onOwn = Math.round(biz.avgOut - biz.avgPay - biz.avgIncome);
  const burnAtZ = onOwn + z;
  const moreInBank = Math.max(0, FLOOR_MONTHS * burnAtZ - biz.freeCents);
  const moreComingIn = Math.max(0, Math.round(burnAtZ - biz.freeCents / FLOOR_MONTHS));
  return (
    <section className="rvp-ask">
      {head}
      {moreInBank === 0 ? (
        <p className="rvp-answer"><b>{AGENCY} could pay you {usd(z)} a month today</b> and stay above {FLOOR_MONTHS} months.</p>
      ) : (
        <p className="rvp-answer">
          To pay you <b>{usd(z)} a month</b> and stay above {FLOOR_MONTHS} months{biz.avgFromYou > 0 ? ', without your money,' : ''} {AGENCY} needs <b>{usd(moreInBank)} more in the bank</b>, or <b>{usd(moreComingIn)} a month more coming in</b>.
        </p>
      )}
      <dl className="rvp-whatif rvp-goalfacts">
        <div><dt>Clients pay</dt><dd>{usdK(biz.avgIncome)}<small className="rvp-per">/mo</small></dd></div>
        <div><dt>It spends</dt><dd>{usdK(biz.avgOut - biz.avgPay)}<small className="rvp-per">/mo</small></dd></div>
        {biz.avgFromYou > 0
          ? <div><dt>You put in</dt><dd>{usdK(biz.avgFromYou)}<small className="rvp-per">/mo</small></dd></div>
          : <div><dt>Free cash</dt><dd>{usdK(biz.freeCents)}</dd></div>}
      </dl>
    </section>
  );
}

// ── Pay against spending (Personal B · Paycheck) ────────────────────────────

/** Month by month: what the business paid you against everything you spent, with skipped or cut months in gold. */
export function PaycheckChart({ stage = 'paying' }: { stage?: Stage }) {
  const rows = paycheckMonths(stage);
  const closed = rows.filter((r) => !r.open);
  const covered = closed.filter((r) => r.pay >= r.spend).length;
  const typical = Math.max(...rows.map((r) => r.pay));
  const max = Math.max(...rows.map((r) => Math.max(r.pay, r.spend)));
  const [hover, setHover] = useState<number | null>(null);
  const h = hover != null ? rows[hover] : null;
  const why = (r: (typeof rows)[number]) =>
    r.open ? 'October so far'
      : r.pay === 0 ? `${AGENCY} skipped your pay${r.toBusiness ? ` and you sent it ${usd(r.toBusiness)}` : ''}`
        : r.pay < typical ? `Pay cut to ${usd(r.pay)}`
          : r.spend > r.pay ? 'You spent more than you were paid'
            : 'Covered';
  return (
    <div className="rvp-paycheck" onMouseLeave={() => setHover(null)}>
      <p className="rx-flow-read" aria-live="polite">
        {h ? <><b>{monthLabel(h.period)}</b> pay {usd(h.pay)} · spent {usd(h.spend)} · <span className={h.pay - h.spend >= 0 ? 'is-up' : 'is-down'}>{h.pay - h.spend >= 0 ? 'left over' : 'short'} {usd(Math.abs(h.pay - h.spend))}</span> · {why(h)}</>
          : <>Hover a month. Covered {covered} of {closed.length}; the gaps came from savings.</>}
      </p>
      <ol className="rvp-pc-cols">
        {rows.map((r, i) => {
          const flag = r.open ? 'is-open' : r.pay < typical ? 'is-cut' : '';
          const gap = r.pay - r.spend;
          return (
            <li key={r.period} className={`${flag} ${hover === i ? 'is-on' : ''}`} onMouseEnter={() => setHover(i)}>
              <span className="rvp-pc-bars">
                <i className="rvp-pc-pay" style={{ height: `${(r.pay / max) * 100}%` }} />
                <i className="rvp-pc-spend" style={{ height: `${(r.spend / max) * 100}%` }} />
              </span>
              <b className={gap >= 0 ? 'is-up' : 'is-down'}>{r.open ? '…' : `${gap >= 0 ? '+' : '−'}${usdK(Math.abs(gap))}`}</b>
              <small>{monthLabel(r.period)}</small>
            </li>
          );
        })}
      </ol>
      <p className="rvp-pc-key"><i className="rvp-pc-pay" /> Pay from {AGENCY} <i className="rvp-pc-spend" /> Your spending <i className="rvp-pc-cut" /> Skipped or cut</p>
    </div>
  );
}

/** The paycheck question's answer, in one sentence, from the months. */
export function paycheckAnswer(stage: Stage = 'paying') {
  const closed = paycheckMonths(stage).filter((r) => !r.open);
  const sentBackMonths = closed.filter((r) => r.toBusiness > 0);
  return {
    covered: closed.filter((r) => r.pay >= r.spend).length,
    months: closed.length,
    paid: closed.reduce((s, r) => s + r.pay, 0),
    spent: closed.reduce((s, r) => s + r.spend, 0),
    sentBack: sentBackMonths.reduce((s, r) => s + r.toBusiness, 0),
    sentBackIn: sentBackMonths.map((r) => monthName(r.period)).join(' and '),
  };
}
