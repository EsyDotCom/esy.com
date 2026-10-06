'use client';

/* The live Runway page's pieces (os.esy.com src/components/folio/app/runway.tsx,
 * main @ e051361), taken apart so each direction can arrange them: the
 * masthead, the free-cash hero, the key numbers, Esy's insights, the four
 * chapters, and the navy rail. Same markup and class names as the live page;
 * they read a ScopeBook (sample.ts) instead of the API, so every piece
 * recomputes when the view changes between combined, business and personal. */

import { useState } from 'react';
import { Ahead, FlowBars, Multiples, Spark, StackBars, avg, catChange, pct } from './charts';
import { mo, monthLabel, shortDate, usd, usdK } from './format';
import { OutLink } from './RunwayWindow';
import {
  AGENCY,
  FLOOR_MONTHS,
  NOW,
  lastsTo,
  upcoming,
  yesterdayLines,
  type BankAccount,
  type Scope,
  type ScopeBook,
} from './sample';

export { FLOOR_MONTHS };

export const SampleTag = () => <span className="rv-sampletag" title="Not wired to api.esy.com yet">Sample</span>;

export function RSec({ title, count, children }: { title: string; count?: number | string; children: React.ReactNode }) {
  return (
    <section className="rv-rsec">
      <h3 className="rv-rsec-h">{title}{count != null && <em>{count}</em>}</h3>
      <div className="rv-rsec-body">{children}</div>
    </section>
  );
}

/** The two panes: main on the left, the navy rail on the right, each scrolling on its own. */
export function RunwayBody({ rail, children }: { rail: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="fo-body has-right rv-body">
      <main className="fo-pane rv-main">
        <div className="rv-pad rx-pad">{children}</div>
      </main>
      <aside className="fo-pane fo-rail--navy rv-rail" aria-label="Runway rail">{rail}</aside>
    </div>
  );
}

/** The masthead: today's date, the title, and Banking and Data on the right. */
export function Mast({ title = 'Runway', kicker, children }: { title?: string; kicker?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="rv-mast">
      <div>
        <p className="rv-kicker">{NOW.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}{kicker}</p>
        <h1 className="rv-title">{title}</h1>
        {children}
      </div>
      <div className="rw-mast-actions">
        <OutLink className="fo-btn">Banking</OutLink>
        <OutLink className="fo-btn">Data</OutLink>
      </div>
    </header>
  );
}

// ── The finance desk's asks (from the live page, still samples there) ──────
type Ask = { id: string; who: string; title: string; note: string; primary: string; second: string };
export const BUSINESS_ASKS: Ask[] = [
  { id: 'a1', who: 'Quill', title: 'Lakeview Realty is 14 days late on $2,800', note: 'Invoice #1039. A friendly second reminder is drafted.', primary: 'Send reminder', second: 'Edit draft' },
  { id: 'a2', who: 'Scout', title: 'Two tools look unused', note: 'Adobe (no sign-in in 74 days) and Notion (overlaps the Library).', primary: 'Cancel both', second: 'Keep' },
  { id: 'a3', who: 'Ledger', title: 'Bill Northside for $394 of Anthropic?', note: '41% of September’s Claude usage ran on Northside work.', primary: 'Add to invoice', second: 'Absorb it' },
];
// The same desk, on your own money. Every figure is the sample data's.
export const PERSONAL_ASKS: Ask[] = [
  { id: 'p1', who: 'Ledger', title: 'Pay the Sapphire bill in full?', note: '$1,690 is due Oct 14. Checking has $7,850 with October’s rent already paid.', primary: 'Schedule it', second: 'Remind me' },
  { id: 'p2', who: 'Ledger', title: 'Move $1,000 to savings?', note: 'October’s pay is in. Savings covers 4.4 months of your spending; 6 is the goal.', primary: 'Move $1,000', second: 'Not this month' },
];

function Asks({ asks }: { asks: Ask[] }) {
  const [done, setDone] = useState<Record<string, string>>({});
  return (
    <ol className="rv-asks">
      {asks.map((a) => (
        <li key={a.id} className={done[a.id] ? 'is-done' : ''}>
          <p className="rv-ask-head"><span className="rv-ask-title">{a.title}</span></p>
          <div className="rv-ask-body rv-ask-body--flush">
            <p>{a.who} · {a.note}</p>
            {done[a.id] ? <p className="rv-ask-done">{done[a.id]}</p> : (
              <div className="rv-ask-btns">
                <button className="fo-btn fo-btn--primary" onClick={() => setDone((d) => ({ ...d, [a.id]: `${a.primary} · done` }))}>{a.primary}</button>
                <button className="fo-textbtn" onClick={() => setDone((d) => ({ ...d, [a.id]: a.second }))}>{a.second}</button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

const cardLine = (a: BankAccount) =>
  a.type === 'credit' ? `owe ${usd(a.currentBalanceCents)}${a.creditLimitCents == null ? ' · no preset limit' : ''}` : usd(a.currentBalanceCents);

/** The navy rail: what needs you, what's due, and the banks behind the numbers, for this view's accounts. */
export function Rail({ scope, b, extra }: { scope: Scope; b: ScopeBook; extra?: React.ReactNode }) {
  const asks = scope === 'personal' ? PERSONAL_ASKS : BUSINESS_ASKS;
  // Needs you, from the record: a card bill due within a week, runway under the floor.
  const needs = [
    ...upcoming(scope, 7).filter((u) => u.key.startsWith('a-')).map((u) => ({ key: u.key, title: `${u.label}: ${usd(u.amountCents)} due in ${u.daysAway} days`, note: 'Statement balance. Paying in full keeps it out of next month’s burn.', cta: 'See the card' })),
    ...(b.runwayMonths != null && b.runwayMonths < FLOOR_MONTHS ? [{ key: 'floor', title: `Runway is ${mo(b.runwayMonths)} months, under your ${FLOOR_MONTHS}-month floor`, note: `Net burn is ${usd(b.burnCents)} a month.`, cta: 'See what’s going out' }] : []),
  ];
  const due = upcoming(scope, 14);
  return (
    <>
      {extra}
      <RSec title="Needs you" count={needs.length + asks.length}>
        {needs.length > 0 && (
          <ol className="rv-asks">
            {needs.map((n) => (
              <li key={n.key}>
                <p className="rv-ask-head"><span className="rv-ask-title">{n.title}</span></p>
                <div className="rv-ask-body rv-ask-body--flush"><p>{n.note}</p><div className="rv-ask-btns"><OutLink className="fo-btn fo-btn--primary">{n.cta}</OutLink></div></div>
              </li>
            ))}
          </ol>
        )}
        <p className="rv-railnote">From the finance desk <SampleTag /></p>
        <Asks key={scope} asks={asks} />
      </RSec>
      <RSec title="Due in 14 days" count={due.length}>
        {due.length ? (
          <ul className="rv-due">{due.map((u) => <li key={u.key}><span>{shortDate(u.dueOn)}</span><span>{u.label}<small>{scope === 'combined' ? `${u.side === 'business' ? AGENCY : 'Personal'} · ` : ''}{u.sublabel}</small></span><b>{usd(u.amountCents)}</b></li>)}</ul>
        ) : <p className="rv-quiet">Nothing expected in the next two weeks.</p>}
      </RSec>
      <RSec title="Banks" count={b.connections.length ? 'all good' : undefined}>
        <div className="rw-banks on-navy">
          {b.connections.map((c) => {
            const accts = b.accounts.filter((a) => a.connectionId === c.id);
            return (
              <div key={c.id} className="rw-bank">
                <div className="rw-bank-top">
                  <b>{c.institutionName}</b>
                  <span className="rw-bank-env">{c.workspaceId === 'ws-esy' ? AGENCY : 'Personal'}</span>
                  <span className="rw-health">Syncing</span>
                </div>
                <ul className="rw-bank-accts">{accts.map((a) => <li key={a.id}><span>{a.name} ••{a.mask}</span><span>{cardLine(a)}</span></li>)}</ul>
                <p className="rw-bank-meta">synced {new Date(c.lastSyncedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
              </div>
            );
          })}
          <OutLink className="fo-btn rw-connect">Manage banks</OutLink>
          <p className="rw-bank-note">Read-only through Plaid. Esy reads balances and transactions; nothing here can move money.</p>
        </div>
      </RSec>
    </>
  );
}

/** 01 · Free cash, and the bank split into what's free and what's spoken for. */
export function FreeCashHero({ b, label = 'Free cash', sub, line }: { b: ScopeBook; label?: string; sub?: string; line?: React.ReactNode }) {
  const free = b.freeCents;
  const split = [
    { k: 'free', label: 'Free cash', cents: Math.max(0, free) },
    ...(b.taxReserveCents ? [{ k: 'tax', label: 'Tax reserve', cents: b.taxReserveCents }] : []),
    { k: 'cards', label: 'Card bills', cents: b.cardBillsCents },
  ];
  return (
    <div className="ri-hero">
      <div>
        <p className="ri-hero-label">{label} <span>{sub ?? (b.taxReserveCents ? 'after tax and card bills' : 'after card bills')}</span></p>
        <p className="ri-hero-num">{usd(free)}</p>
        <p className="ri-hero-sub">
          {line ?? (b.runwayMonths != null
            ? <><b>{mo(b.runwayMonths)} months</b> at {usdK(b.burnCents)} a month · lasts to {lastsTo(b.runwayMonths)}</>
            : <>Money in covers money out, with <b>{usd(-b.burnCents)}</b> a month left over.</>)}
        </p>
      </div>
      <div className="ri-split">
        <div className="ri-split-bar" role="img" aria-label={`Bank ${usd(b.cashCents)}: ${split.map((p) => `${p.label.toLowerCase()} ${usd(p.cents)}`).join(', ')}`}>
          {split.map((p) => <i key={p.k} className={`is-${p.k}`} style={{ flexGrow: p.cents }} />)}
        </div>
        <ul className="ri-split-key">{split.map((p) => <li key={p.k} className={`is-${p.k}`}><i /><span>{p.label}</span><b>{usd(p.cents)}</b></li>)}<li className="is-bank"><span>In the bank</span><b>{usd(b.cashCents)}</b></li></ul>
      </div>
    </div>
  );
}

/** Runway in months for each of the last months: closing cash less what's spoken for, over this burn. */
export const runwayHistory = (b: ScopeBook) =>
  b.burnCents > 0 ? b.months.map((m) => Math.max(0, ((m.closingBalanceCents ?? 0) - b.taxReserveCents - b.cardBillsCents) / b.burnCents)) : [];

export type Key = { label: string; value: string; spark: number[] };

/** The key numbers under the hero, with the 6/12-month range switch. */
export function Keys({ keys, range, setRange }: { keys: Key[]; range: 6 | 12; setRange: (r: 6 | 12) => void }) {
  return (
    <div className="rx-instr-top">
      <dl className="rx-keys">
        {keys.map((k) => <div key={k.label}><dt>{k.label}</dt><dd>{k.value}</dd><Spark values={k.spark} /></div>)}
      </dl>
      <div className="rw-seg" role="group" aria-label="Range">{([6, 12] as const).map((x) => <button key={x} className={range === x ? 'is-on' : ''} onClick={() => setRange(x)}>{x} months</button>)}</div>
    </div>
  );
}

/** The live page's four keys, for a scope. */
export function liveKeys(b: ScopeBook, range: 6 | 12): Key[] {
  const inRange = b.months.slice(-range);
  return [
    { label: 'Runway', value: b.runwayMonths == null ? 'Covered' : `${mo(b.runwayMonths)} mo`, spark: runwayHistory(b).slice(-range) },
    { label: b.burnCents > 0 ? 'Net burn' : 'Left over', value: usdK(Math.abs(b.burnCents)), spark: inRange.map((m) => m.cashOutCents - m.cashInCents) },
    { label: 'Money in', value: usdK(avg(inRange.map((m) => m.cashInCents))), spark: inRange.map((m) => m.cashInCents) },
    { label: 'Money out', value: usdK(avg(inRange.map((m) => m.cashOutCents))), spark: inRange.map((m) => m.cashOutCents) },
  ];
}

/** The spending line that moved most (last three closed months against the three before). */
export function watchLine(b: ScopeBook) {
  return b.cats.filter((c) => c.key !== 'OTHER' && c.key !== 'OWNER_PAY')
    .map((c) => ({ c, ch: catChange(b.catSeries, c.key), recent: avg(b.catSeries.slice(-4, -1).map((m) => m.byCat[c.key] ?? 0)) }))
    .filter((x) => x.ch != null && x.ch >= 0.15 && x.recent >= 20_000)
    .sort((a, b2) => (b2.ch ?? 0) - (a.ch ?? 0))[0] ?? null;
}

/** Esy insights: yesterday, line by line, with what each is worth in runway; then what to watch and what's set aside. */
export function Insights({ scope, b }: { scope: Scope; b: ScopeBook }) {
  const lines = yesterdayLines(scope);
  const net = lines.reduce((n, l) => n + l.cents, 0);
  const worth = (c: number) => (b.burnCents > 0 ? `${c >= 0 ? '+' : '−'}${Math.abs(c / b.burnCents).toFixed(2)} mo` : '—');
  const watch = watchLine(b);
  const setAside = upcoming(scope, 31).find((u) => u.key.startsWith('a-')) ?? null;
  return (
    <section className="ri-brief ri-brief--overnight" aria-label="Esy insights">
      <header><p className="rx-ch-n">Esy insights · since yesterday</p><h2 className="rx-ch-h">What moved free cash, and what it&rsquo;s worth</h2></header>
      {lines.length ? (
        <table className="ri-overnight">
          <tbody>
            {lines.map((l) => <tr key={l.label}><td>{l.label}</td><td className={l.cents >= 0 ? 'is-up' : 'is-down'}>{l.cents >= 0 ? '+' : ''}{usd(l.cents)}</td><td>{worth(l.cents)}</td></tr>)}
            <tr className="ri-overnight-total"><td>Net, yesterday</td><td className={net >= 0 ? 'is-up' : 'is-down'}>{net >= 0 ? '+' : ''}{usd(net)}</td><td>{worth(net)}</td></tr>
          </tbody>
        </table>
      ) : <p className="rv-quiet ri-quietday">Nothing moved yesterday.</p>}
      <ul className="ri-notes ri-notes--spark">
        {watch && <li className="is-watch"><span className="ri-kind">Watch</span><span><b>{watch.c.name} is up {pct(watch.ch!)}.</b> {usd(watch.recent)} a month over the last three months, against the three before.</span><Spark values={b.catSeries.map((m) => m.byCat[watch.c.key] ?? 0)} w={110} h={28} /></li>}
        {setAside && <li className="is-set"><span className="ri-kind">Set aside</span><span><b>{usd(setAside.amountCents)} on {setAside.label.replace(/ bill$/, '')} is due {shortDate(setAside.dueOn)}.</b> It’s already out of free cash, so paying it won’t move the number.</span><span /></li>}
      </ul>
      <p className="ri-brief-foot">Esy, from yesterday&rsquo;s bank and card transactions · <OutLink className="fo-textbtn">The full brief →</OutLink></p>
    </section>
  );
}

/** Chapters 02–05: in and out, every spending line, the mix, and free cash ahead. */
export function Chapters({ b, range, inOutLede, start = 2, aheadBurn, aheadLede }: {
  b: ScopeBook; range: 6 | 12; inOutLede?: string; start?: number;
  /** Project "Ahead" at another burn (e.g. your spending if pay stopped) instead of this view's. */
  aheadBurn?: number; aheadLede?: string;
}) {
  const n = (i: number) => String(start + i).padStart(2, '0');
  const series = b.catSeries.slice(-range);
  const freePast = b.months.slice(-range, -1).map((m) => ({ label: monthLabel(m.period).slice(0, 3), v: (m.closingBalanceCents ?? 0) - b.taxReserveCents - b.cardBillsCents }));
  return (
    <>
      <section className="rx-ch"><p className="rx-ch-n">{n(0)}</p><h2 className="rx-ch-h">In and out</h2><p className="rx-ch-lede">{inOutLede ?? 'The last year, month by month.'}</p><div className="rx-ch-body"><FlowBars key={`f${b.scope}${range}`} months={b.months.slice(-range)} /></div></section>
      <section className="rx-ch"><p className="rx-ch-n">{n(1)}</p><h2 className="rx-ch-h">Every spending line, on its own</h2><p className="rx-ch-lede">Same months, one line each. The one that moved is obvious.</p><div className="rx-ch-body"><Multiples series={series} cats={b.cats} /></div></section>
      <section className="rx-ch"><p className="rx-ch-n">{n(2)}</p><h2 className="rx-ch-h">The mix</h2><p className="rx-ch-lede">Stacked, with a category isolated on click.</p><div className="rx-ch-body"><StackBars key={`s${b.scope}${range}`} series={series} cats={b.cats} /></div></section>
      <section className="rx-ch"><p className="rx-ch-n">{n(3)}</p><h2 className="rx-ch-h">Ahead</h2><p className="rx-ch-lede">{aheadLede ?? 'Free cash for the next twelve months at this burn; drag to change it.'}</p><div className="rx-ch-body">
        <Ahead key={b.scope} past={freePast.map((p) => p.v)} pastLabels={freePast.map((p) => p.label)} free={b.freeCents} burn={aheadBurn ?? b.burnCents} floorMonths={FLOOR_MONTHS} />
      </div></section>
    </>
  );
}

/** The foot note every view carries: what free cash means, and that these are samples. */
export function SampleFoot({ children }: { children?: React.ReactNode }) {
  return (
    <p className="fo-sample">
      {children ?? <>Free cash is the bank less the tax reserve (cash accounts named &ldquo;tax&rdquo;) and card statements.</>}{' '}
      Every number here is a sample: a one-person agency, built to show the layout. No real account is read.
    </p>
  );
}
