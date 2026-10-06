// Sample money for the runway prototypes: one person who runs a small agency.
// Shaped like what os.esy.com/agency/runway reads from api.esy.com
// (FinanceRunwayResponse, BankAccount, BankTransaction, FinancialConnection,
// CashflowMonth), and every figure on every view is computed from the tables
// below, so the numbers agree across panels and across both prototypes: what
// leaves Esy LLC as your pay is exactly what lands in your personal checking.
//
// The rules are the API's (app/services/finance_runway.py):
//   - Runway is a cash model. Burn is the average monthly net outflow over the
//     last three complete months (HEADLINE_WINDOW_MONTHS = 3).
//   - Money that only moved between your own accounts is left out of the
//     combined view. Split by side, it isn't: the business paying you is the
//     business's spending and your income. That rule is what these
//     prototypes are about.
//   - Free cash is the bank less the tax reserve and card statements, as on
//     the live page.
//
// One simplification: in past months, card spending counts as cash out in
// the month it was spent (the cards are paid in full every month). October is
// still open, so its card purchases sit on the cards, not in cash out.
//
// All of it is sample data. No real account is read.

export type Scope = 'combined' | 'business' | 'personal';
export type Side = 'business' | 'personal';

export interface Workspace {
  id: string;
  name: string;
  kind: 'organization' | 'personal';
}

export interface FinancialConnection {
  id: string;
  workspaceId: string;
  provider: 'plaid';
  environment: 'production';
  institutionName: string;
  healthStatus: 'healthy';
  userActionRequired: boolean;
  lastSyncedAt: string;
}

export interface BankAccount {
  id: string;
  workspaceId: string;
  connectionId: string;
  name: string;
  mask: string;
  type: 'depository' | 'credit';
  currentBalanceCents: number;
  // Charge cards (Amex Platinum) have no preset limit: Plaid reports none.
  creditLimitCents: number | null;
  statementBalanceCents: number | null;
  minimumPaymentCents: number | null;
  nextPaymentDueAt: string | null;
}

export interface BankTransaction {
  id: string;
  accountId: string;
  date: string;
  // The API's sign: positive is money out.
  amountCents: number;
  merchantName: string;
  categoryPrimary: string;
}

export interface CashflowMonth {
  period: string;
  cashInCents: number;
  cashOutCents: number;
  netCents: number;
  closingBalanceCents: number | null;
}

/** "Today" for every view: the data runs to the morning of Monday 5 October 2026. */
export const NOW = new Date('2026-10-05T09:00:00');
export const YESTERDAY = '2026-10-04';
/** The live page's floor (RUNWAY_ALERT_MONTHS in os.esy.com's runway model). */
export const FLOOR_MONTHS = 6;
export const AGENCY = 'Esy LLC';
const D = 100; // dollars → cents

export const WORKSPACES: Record<Side, Workspace> = {
  business: { id: 'ws-esy', name: AGENCY, kind: 'organization' },
  personal: { id: 'ws-you', name: 'Personal', kind: 'personal' },
};
const wsSide = (workspaceId: string): Side => (workspaceId === WORKSPACES.business.id ? 'business' : 'personal');

const synced = '2026-10-05T08:42:00';
export const CONNECTIONS: FinancialConnection[] = [
  { id: 'c-chase-biz', workspaceId: 'ws-esy', provider: 'plaid', environment: 'production', institutionName: 'Chase', healthStatus: 'healthy', userActionRequired: false, lastSyncedAt: synced },
  { id: 'c-amex', workspaceId: 'ws-esy', provider: 'plaid', environment: 'production', institutionName: 'American Express', healthStatus: 'healthy', userActionRequired: false, lastSyncedAt: synced },
  { id: 'c-chase-you', workspaceId: 'ws-you', provider: 'plaid', environment: 'production', institutionName: 'Chase', healthStatus: 'healthy', userActionRequired: false, lastSyncedAt: synced },
  { id: 'c-ally', workspaceId: 'ws-you', provider: 'plaid', environment: 'production', institutionName: 'Ally Bank', healthStatus: 'healthy', userActionRequired: false, lastSyncedAt: synced },
];

// ── October so far, transaction by transaction ──────────────────────────────
// The open month is kept as transactions so "since yesterday" and the cards'
// running balances come from real rows, not a total.
export const OCTOBER: (BankTransaction & { kind?: 'income' | 'pay' })[] = [
  { id: 't1', accountId: 'a-biz-chk', date: '2026-10-01', amountCents: 6000 * D, merchantName: 'Paid to you', categoryPrimary: 'OWNER_PAY', kind: 'pay' },
  { id: 't2', accountId: 'a-you-chk', date: '2026-10-01', amountCents: -6000 * D, merchantName: `From ${AGENCY}`, categoryPrimary: 'OWNER_PAY', kind: 'pay' },
  { id: 't3', accountId: 'a-you-chk', date: '2026-10-01', amountCents: 2450 * D, merchantName: 'Rent · Parkline Apartments', categoryPrimary: 'RENT' },
  { id: 't4', accountId: 'a-you-chk', date: '2026-10-01', amountCents: 520 * D, merchantName: 'Oscar Health', categoryPrimary: 'INSURANCE' },
  { id: 't5', accountId: 'a-amex', date: '2026-10-01', amountCents: 450 * D, merchantName: 'WeWork', categoryPrimary: 'OFFICE' },
  { id: 't6', accountId: 'a-biz-chk', date: '2026-10-02', amountCents: -1240 * D, merchantName: 'Stripe payout', categoryPrimary: 'INCOME', kind: 'income' },
  { id: 't7', accountId: 'a-sapphire', date: '2026-10-02', amountCents: 12 * D, merchantName: 'Spotify', categoryPrimary: 'SUBSCRIPTIONS' },
  { id: 't8', accountId: 'a-sapphire', date: '2026-10-02', amountCents: 18 * D, merchantName: 'Netflix', categoryPrimary: 'SUBSCRIPTIONS' },
  { id: 't9', accountId: 'a-ink', date: '2026-10-03', amountCents: 120 * D, merchantName: 'Google Ads', categoryPrimary: 'ADS' },
  { id: 't10', accountId: 'a-sapphire', date: '2026-10-03', amountCents: 64 * D, merchantName: "Trader Joe's", categoryPrimary: 'GROCERIES' },
  { id: 't11', accountId: 'a-sapphire', date: '2026-10-03', amountCents: 20 * D, merchantName: 'Uber', categoryPrimary: 'TRANSPORT' },
  { id: 't12', accountId: 'a-biz-chk', date: YESTERDAY, amountCents: -1860 * D, merchantName: 'Northside Dental', categoryPrimary: 'INCOME', kind: 'income' },
  { id: 't13', accountId: 'a-amex', date: YESTERDAY, amountCents: 240 * D, merchantName: 'Anthropic', categoryPrimary: 'SOFTWARE' },
  { id: 't14', accountId: 'a-amex', date: YESTERDAY, amountCents: 60 * D, merchantName: 'OpenAI', categoryPrimary: 'SOFTWARE' },
  { id: 't15', accountId: 'a-ink', date: YESTERDAY, amountCents: 45 * D, merchantName: 'Figma', categoryPrimary: 'SOFTWARE' },
  { id: 't16', accountId: 'a-sapphire', date: YESTERDAY, amountCents: 86 * D, merchantName: 'Whole Foods', categoryPrimary: 'GROCERIES' },
  { id: 't17', accountId: 'a-sapphire', date: YESTERDAY, amountCents: 26 * D, merchantName: 'Sweetgreen', categoryPrimary: 'DINING' },
];

const octOnCard = (accountId: string) => OCTOBER.filter((t) => t.accountId === accountId).reduce((n, t) => n + t.amountCents, 0);

// ── Accounts, as of this morning ────────────────────────────────────────────
// Card balances are last statement + October's purchases, so they agree with
// the rows above.
export const ACCOUNTS: BankAccount[] = [
  { id: 'a-biz-chk', workspaceId: 'ws-esy', connectionId: 'c-chase-biz', name: 'Business Complete Checking', mask: '4417', type: 'depository', currentBalanceCents: 38_400 * D, creditLimitCents: null, statementBalanceCents: null, minimumPaymentCents: null, nextPaymentDueAt: null },
  { id: 'a-biz-tax', workspaceId: 'ws-esy', connectionId: 'c-chase-biz', name: 'Tax reserve', mask: '0921', type: 'depository', currentBalanceCents: 14_200 * D, creditLimitCents: null, statementBalanceCents: null, minimumPaymentCents: null, nextPaymentDueAt: null },
  { id: 'a-amex', workspaceId: 'ws-esy', connectionId: 'c-amex', name: 'Business Platinum', mask: '1008', type: 'credit', currentBalanceCents: 3_920 * D + octOnCard('a-amex'), creditLimitCents: null, statementBalanceCents: 3_920 * D, minimumPaymentCents: 3_920 * D, nextPaymentDueAt: '2026-10-19' },
  { id: 'a-ink', workspaceId: 'ws-esy', connectionId: 'c-chase-biz', name: 'Ink Business Preferred', mask: '5521', type: 'credit', currentBalanceCents: 980 * D + octOnCard('a-ink'), creditLimitCents: 15_000 * D, statementBalanceCents: 980 * D, minimumPaymentCents: 40 * D, nextPaymentDueAt: '2026-10-23' },
  { id: 'a-you-chk', workspaceId: 'ws-you', connectionId: 'c-chase-you', name: 'Total Checking', mask: '2280', type: 'depository', currentBalanceCents: 7_850 * D, creditLimitCents: null, statementBalanceCents: null, minimumPaymentCents: null, nextPaymentDueAt: null },
  { id: 'a-you-save', workspaceId: 'ws-you', connectionId: 'c-ally', name: 'High-yield savings', mask: '6612', type: 'depository', currentBalanceCents: 21_500 * D, creditLimitCents: null, statementBalanceCents: null, minimumPaymentCents: null, nextPaymentDueAt: null },
  { id: 'a-sapphire', workspaceId: 'ws-you', connectionId: 'c-chase-you', name: 'Sapphire Preferred', mask: '7713', type: 'credit', currentBalanceCents: 1_690 * D + octOnCard('a-sapphire'), creditLimitCents: 18_000 * D, statementBalanceCents: 1_690 * D, minimumPaymentCents: 40 * D, nextPaymentDueAt: '2026-10-14' },
];
const account = (id: string) => ACCOUNTS.find((a) => a.id === id)!;
export const sideOfAccount = (id: string) => wsSide(account(id).workspaceId);

// ── The last eleven closed months, as monthly totals ────────────────────────
// Nov 2025 → Sep 2026. Dollars; converted to cents below.
const PERIODS = ['2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09'];
// Clients paid the business (Stripe payouts and bank transfers). Summer was slow.
const INCOME = [17_800, 19_600, 15_100, 10_900, 16_400, 17_600, 18_300, 16_200, 9_800, 10_400, 10_900];
// What the business paid you: skipped in February (you put $3,000 in instead), cut in July.
const OWNER_PAY = [6_000, 6_000, 6_000, 0, 6_000, 6_000, 6_000, 6_000, 4_000, 6_000, 6_000];
const FROM_YOU = [0, 0, 0, 3_000, 0, 0, 0, 0, 0, 0, 0];
// Quarterly estimated tax, paid from the tax reserve.
const TAXES = [0, 0, 4_200, 0, 0, 4_600, 0, 4_800, 0, 0, 5_100];
const INTEREST = [70, 72, 72, 74, 74, 75, 75, 76, 74, 75, 76];

type CatTable = Record<string, { name: string; side: Side; months: number[] }>;
export const CATEGORIES: CatTable = {
  SOFTWARE: { name: 'Software & AI', side: 'business', months: [1_100, 1_150, 1_180, 1_200, 1_260, 1_320, 1_380, 1_450, 1_560, 1_640, 1_720] },
  CONTRACTORS: { name: 'Contractors', side: 'business', months: [3_200, 3_600, 2_400, 1_800, 3_000, 3_400, 3_800, 3_200, 3_000, 3_600, 4_000] },
  ADS: { name: 'Ads', side: 'business', months: [700, 900, 600, 500, 650, 800, 950, 900, 700, 850, 1_000] },
  OFFICE: { name: 'Coworking', side: 'business', months: [450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450] },
  BIZ_TRAVEL: { name: 'Client travel', side: 'business', months: [0, 900, 0, 0, 350, 0, 1_200, 400, 0, 600, 0] },
  FEES: { name: 'Insurance & fees', side: 'business', months: [310, 310, 310, 310, 310, 310, 310, 310, 310, 310, 310] },
  RENT: { name: 'Rent', side: 'personal', months: [2_450, 2_450, 2_450, 2_450, 2_450, 2_450, 2_450, 2_450, 2_450, 2_450, 2_450] },
  GROCERIES: { name: 'Groceries', side: 'personal', months: [620, 700, 640, 600, 610, 650, 630, 660, 640, 680, 650] },
  DINING: { name: 'Eating out', side: 'personal', months: [380, 520, 300, 260, 340, 400, 420, 450, 380, 410, 470] },
  INSURANCE: { name: 'Health insurance', side: 'personal', months: [520, 520, 520, 520, 520, 520, 520, 520, 520, 520, 520] },
  UTILITIES: { name: 'Utilities & phone', side: 'personal', months: [210, 230, 260, 250, 220, 200, 190, 210, 230, 240, 210] },
  SUBSCRIPTIONS: { name: 'Subscriptions', side: 'personal', months: [95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95] },
  TRANSPORT: { name: 'Getting around', side: 'personal', months: [180, 160, 150, 140, 170, 190, 200, 210, 180, 190, 200] },
  SHOPPING: { name: 'Shopping', side: 'personal', months: [300, 900, 200, 150, 250, 300, 280, 350, 260, 320, 340] },
  TRAVEL: { name: 'Travel', side: 'personal', months: [0, 0, 0, 0, 0, 0, 0, 1_400, 0, 0, 0] },
};
export const catName = (key: string) =>
  key === 'OWNER_PAY' ? 'Paid to you' : key === 'TAXES' ? 'Estimated tax' : CATEGORIES[key]?.name ?? key;

// Bills that come back every month, for "Due in 14 days" and the household view.
export interface Recurring {
  key: string;
  side: Side;
  label: string;
  sublabel: string;
  amountCents: number;
  day: number; // day of the month it lands
}
export const RECURRING: Recurring[] = [
  { key: 'r-rent', side: 'personal', label: 'Rent', sublabel: 'Parkline Apartments', amountCents: 2_450 * D, day: 1 },
  { key: 'r-health', side: 'personal', label: 'Health insurance', sublabel: 'Oscar Health', amountCents: 520 * D, day: 1 },
  { key: 'r-comcast', side: 'personal', label: 'Internet', sublabel: 'Comcast', amountCents: 80 * D, day: 9 },
  { key: 'r-phone', side: 'personal', label: 'Phone', sublabel: 'Verizon', amountCents: 85 * D, day: 12 },
  { key: 'r-power', side: 'personal', label: 'Electric', sublabel: 'ConEd · varies', amountCents: 60 * D, day: 22 },
  { key: 'r-spotify', side: 'personal', label: 'Spotify', sublabel: 'Subscription', amountCents: 12 * D, day: 2 },
  { key: 'r-netflix', side: 'personal', label: 'Netflix', sublabel: 'Subscription', amountCents: 18 * D, day: 2 },
  { key: 'r-icloud', side: 'personal', label: 'iCloud+', sublabel: 'Subscription', amountCents: 10 * D, day: 18 },
  { key: 'r-gym', side: 'personal', label: 'Gym', sublabel: 'Equinox', amountCents: 55 * D, day: 15 },
  { key: 'r-wework', side: 'business', label: 'WeWork', sublabel: 'Hot desk', amountCents: 450 * D, day: 1 },
  { key: 'r-notion', side: 'business', label: 'Notion', sublabel: 'Team plan', amountCents: 20 * D, day: 12 },
  { key: 'r-gws', side: 'business', label: 'Google Workspace', sublabel: '2 seats', amountCents: 36 * D, day: 15 },
  { key: 'r-adobe', side: 'business', label: 'Adobe', sublabel: 'Creative Cloud', amountCents: 60 * D, day: 9 },
];

// ── Derived: the money, month by month, for each side ───────────────────────

interface SideMonth {
  period: string;
  income: number; // money from outside
  interest: number;
  spend: Record<string, number>; // spending lines (includes Estimated tax)
  paidOut: number; // business → you (business side) / you → business (personal side)
  paidIn: number; // you → business (business side) / business → you (personal side)
}

const PAYERS: [string, number][] = [['Northside Dental', 0.4], ['Lakeview Realty', 0.24], ['Harbor & Pine', 0.2], ['Stripe payouts', 0.16]];

function closedMonths(side: Side): SideMonth[] {
  return PERIODS.map((period, i) => {
    const spend: Record<string, number> = {};
    for (const [k, c] of Object.entries(CATEGORIES)) if (c.side === side && c.months[i]) spend[k] = c.months[i] * D;
    if (side === 'business' && TAXES[i]) spend.TAXES = TAXES[i] * D;
    return side === 'business'
      ? { period, income: INCOME[i] * D, interest: 0, spend, paidOut: OWNER_PAY[i] * D, paidIn: FROM_YOU[i] * D }
      : { period, income: 0, interest: INTEREST[i] * D, spend, paidOut: FROM_YOU[i] * D, paidIn: OWNER_PAY[i] * D };
  });
}

// October so far, from the rows. Spending lines count every purchase (card or
// cash); cash out counts only what left a bank account.
function octoberMonth(side: Side): SideMonth & { cashSpend: number } {
  const rows = OCTOBER.filter((t) => sideOfAccount(t.accountId) === side);
  const spend: Record<string, number> = {};
  let income = 0, paidOut = 0, paidIn = 0, cashSpend = 0;
  for (const t of rows) {
    if (t.categoryPrimary === 'OWNER_PAY') {
      if (t.amountCents > 0) paidOut += t.amountCents; else paidIn -= t.amountCents;
    } else if (t.categoryPrimary === 'INCOME') income -= t.amountCents;
    else {
      spend[t.categoryPrimary] = (spend[t.categoryPrimary] ?? 0) + t.amountCents;
      if (account(t.accountId).type === 'depository') cashSpend += t.amountCents;
    }
  }
  return { period: '2026-10', income, interest: 0, spend, paidOut, paidIn, cashSpend };
}

const sum = (xs: number[]) => xs.reduce((n, x) => n + x, 0);
const spendTotal = (m: SideMonth) => sum(Object.values(m.spend));
export const avg = (xs: number[]) => (xs.length ? sum(xs) / xs.length : 0);

const BOOKS: Record<Side, { closed: SideMonth[]; oct: ReturnType<typeof octoberMonth> }> = {
  business: { closed: closedMonths('business'), oct: octoberMonth('business') },
  personal: { closed: closedMonths('personal'), oct: octoberMonth('personal') },
};

const cashAccounts = (sides: Side[]) => ACCOUNTS.filter((a) => a.type === 'depository' && sides.includes(wsSide(a.workspaceId)));
const cardAccounts = (sides: Side[]) => ACCOUNTS.filter((a) => a.type === 'credit' && sides.includes(wsSide(a.workspaceId)));
const sidesOf = (scope: Scope): Side[] => (scope === 'combined' ? ['business', 'personal'] : [scope]);

/** Everything one view needs, for one scope. */
export interface ScopeBook {
  scope: Scope;
  cashCents: number;
  taxReserveCents: number;
  cardBillsCents: number;
  cardBalanceCents: number;
  freeCents: number;
  /** Average monthly net outflow, last three closed months. Negative: money in covers money out. */
  burnCents: number;
  /** Months of free cash at this burn; null when money in covers money out. */
  runwayMonths: number | null;
  months: CashflowMonth[]; // 12, Nov → Oct (Oct is month to date)
  cats: { key: string; name: string; tone: string }[];
  catSeries: { period: string; byCat: Record<string, number> }[];
  /** Monthly averages over the last three closed months. */
  avgIn: number;
  avgOut: number;
  avgSpend: number;
  avgIncome: number;
  avgInterest: number;
  /** Your pay, as this side sees it (out of the business, into personal). Last three closed months. */
  avgPay: number;
  payByMonth: { period: string; pay: number; fromYou: number }[];
  /** Money that moved between your own sides in the last three closed months (combined leaves it out). */
  movedCents: number;
  accounts: BankAccount[];
  connections: FinancialConnection[];
}

const TONES = ['navy', 'slate', 'jade', 'sand', 'mist', 'gold'];

export function bookFor(scope: Scope): ScopeBook {
  const sides = sidesOf(scope);
  const both = scope === 'combined';
  const closedOf = (s: Side) => BOOKS[s].closed;

  // Per month: what came in and went out for this scope. Pay between the sides
  // counts only when you look at one side alone.
  const monthTotals = [...PERIODS, '2026-10'].map((period, i) => {
    let inC = 0, outC = 0, spendAll = 0, income = 0, interest = 0, pay = 0, fromYou = 0;
    for (const s of sides) {
      const m = i < PERIODS.length ? closedOf(s)[i] : BOOKS[s].oct;
      const spendCash = i < PERIODS.length ? spendTotal(m) : BOOKS[s].oct.cashSpend;
      income += m.income;
      interest += m.interest;
      spendAll += spendTotal(m);
      inC += m.income + m.interest + (both ? 0 : m.paidIn);
      outC += spendCash + (both ? 0 : m.paidOut);
      if (s === 'business') { pay += m.paidOut; fromYou += m.paidIn; }
      else if (!sides.includes('business')) { pay += m.paidIn; fromYou += m.paidOut; }
    }
    return { period, inC, outC, spendAll, income, interest, pay, fromYou };
  });

  // Closing balances, walked back from this morning's cash.
  const cashCents = sum(cashAccounts(sides).map((a) => a.currentBalanceCents));
  const closing: number[] = [];
  let bal = cashCents;
  for (let i = monthTotals.length - 1; i >= 0; i--) {
    closing[i] = bal;
    bal -= monthTotals[i].inC - monthTotals[i].outC;
  }
  const months: CashflowMonth[] = monthTotals.map((m, i) => ({
    period: m.period, cashInCents: m.inC, cashOutCents: m.outC, netCents: m.inC - m.outC, closingBalanceCents: closing[i],
  }));

  // The headline window: the last three closed months (Jul, Aug, Sep).
  const win = monthTotals.slice(-4, -1);
  const avgIn = avg(win.map((m) => m.inC));
  const avgOut = avg(win.map((m) => m.outC));
  const burnCents = Math.round(avgOut - avgIn);

  const taxReserveCents = sum(cashAccounts(sides).filter((a) => /\btax/i.test(a.name)).map((a) => a.currentBalanceCents));
  const cards = cardAccounts(sides);
  const cardBillsCents = sum(cards.map((a) => a.statementBalanceCents ?? 0));
  const freeCents = cashCents - taxReserveCents - cardBillsCents;
  const runwayMonths = burnCents > 0 ? Math.round((Math.max(0, freeCents) / burnCents) * 10) / 10 : null;

  // Spending lines by month. Viewed from the business alone, paying you is a line of its own.
  const catSeries = monthTotals.map((_, i) => {
    const byCat: Record<string, number> = {};
    for (const s of sides) {
      const m = i < PERIODS.length ? closedOf(s)[i] : BOOKS[s].oct;
      for (const [k, v] of Object.entries(m.spend)) byCat[k] = (byCat[k] ?? 0) + v;
      if (scope === 'business' && m.paidOut) byCat.OWNER_PAY = (byCat.OWNER_PAY ?? 0) + m.paidOut;
    }
    return { period: monthTotals[i].period, byCat };
  });
  const totals = new Map<string, number>();
  for (const m of catSeries) for (const [k, v] of Object.entries(m.byCat)) totals.set(k, (totals.get(k) ?? 0) + v);
  const top = [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k]) => k);
  const rolled = catSeries.map((m) => {
    const byCat: Record<string, number> = {};
    for (const [k, v] of Object.entries(m.byCat)) { const kk = top.includes(k) ? k : 'OTHER'; byCat[kk] = (byCat[kk] ?? 0) + v; }
    return { period: m.period, byCat };
  });
  const cats = [...top, ...(totals.size > top.length ? ['OTHER'] : [])].map((k, i) => ({ key: k, name: k === 'OTHER' ? 'Other' : catName(k), tone: TONES[i % TONES.length] }));

  const allPay = PERIODS.map((p, i) => ({ period: p, pay: OWNER_PAY[i] * D, fromYou: FROM_YOU[i] * D }));
  allPay.push({ period: '2026-10', pay: BOOKS.business.oct.paidOut, fromYou: BOOKS.business.oct.paidIn });

  return {
    scope,
    cashCents,
    taxReserveCents,
    cardBillsCents,
    cardBalanceCents: sum(cards.map((a) => a.currentBalanceCents)),
    freeCents,
    burnCents,
    runwayMonths,
    months,
    cats,
    catSeries: rolled,
    avgIn,
    avgOut,
    avgSpend: avg(win.map((m) => m.spendAll)),
    avgIncome: avg(win.map((m) => m.income)),
    avgInterest: avg(win.map((m) => m.interest)),
    avgPay: avg(allPay.slice(-4, -1).map((m) => m.pay)),
    payByMonth: allPay,
    movedCents: sum(allPay.slice(-4, -1).map((m) => m.pay + m.fromYou)),
    accounts: ACCOUNTS.filter((a) => sides.includes(wsSide(a.workspaceId))),
    connections: CONNECTIONS.filter((c) => sides.includes(wsSide(c.workspaceId))),
  };
}

/** Your side, month by month: what the business paid you against everything you spent (cards included). October is to date. */
export function paycheckMonths(): { period: string; pay: number; spend: number; toBusiness: number; interest: number; open: boolean }[] {
  const rows = BOOKS.personal.closed.map((m) => ({ period: m.period, pay: m.paidIn, spend: spendTotal(m), toBusiness: m.paidOut, interest: m.interest, open: false }));
  const o = BOOKS.personal.oct;
  rows.push({ period: o.period, pay: o.paidIn, spend: spendTotal(o), toBusiness: o.paidOut, interest: o.interest, open: true });
  return rows;
}

/** Your savings and checking, this morning. */
export const SAVINGS_CENTS = account('a-you-save').currentBalanceCents;
export const CHECKING_CENTS = account('a-you-chk').currentBalanceCents;

/** Who paid the business over the last three closed months. */
export function payers(): { label: string; cents: number }[] {
  const income = sum(BOOKS.business.closed.slice(-3).map((m) => m.income));
  return PAYERS.map(([label, share]) => ({ label, cents: Math.round(income * share) }));
}

/** Yesterday, merchant by merchant, signed so money in is positive (as the live page shows it). */
export function yesterdayLines(scope: Scope): { label: string; cents: number }[] {
  const sides = sidesOf(scope);
  return OCTOBER.filter((t) => t.date === YESTERDAY && sides.includes(sideOfAccount(t.accountId)))
    .map((t) => ({ label: t.merchantName, cents: -t.amountCents }))
    .sort((a, b) => Math.abs(b.cents) - Math.abs(a.cents));
}

export interface UpcomingItem {
  key: string;
  dueOn: string;
  label: string;
  sublabel: string;
  amountCents: number;
  daysAway: number;
  side: Side;
}

/** Card bills and recurring charges in the next `days` days, for one scope. */
export function upcoming(scope: Scope, days = 14): UpcomingItem[] {
  const sides = sidesOf(scope);
  const today = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());
  const away = (iso: string) => Math.round((new Date(`${iso}T00:00:00`).getTime() - today.getTime()) / 86_400_000);
  const items: UpcomingItem[] = [];
  for (const a of ACCOUNTS) {
    const side = wsSide(a.workspaceId);
    if (a.type !== 'credit' || !a.nextPaymentDueAt || !sides.includes(side)) continue;
    items.push({ key: a.id, dueOn: a.nextPaymentDueAt, label: `${a.name} bill`, sublabel: `Statement balance ••${a.mask}`, amountCents: a.statementBalanceCents ?? 0, daysAway: away(a.nextPaymentDueAt), side });
  }
  for (const r of RECURRING) {
    if (!sides.includes(r.side)) continue;
    for (const monthOffset of [0, 1]) {
      const d = new Date(today.getFullYear(), today.getMonth() + monthOffset, r.day);
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (away(iso) >= 0) { items.push({ key: `${r.key}-${monthOffset}`, dueOn: iso, label: r.label, sublabel: r.sublabel, amountCents: r.amountCents, daysAway: away(iso), side: r.side }); break; }
    }
  }
  return items.filter((u) => u.daysAway <= days).sort((a, b) => a.daysAway - b.daysAway);
}

/** Recurring bills for one side, monthly total first. */
export function recurringFor(side: Side) {
  const items = RECURRING.filter((r) => r.side === side).sort((a, b) => b.amountCents - a.amountCents);
  return { items, totalCents: sum(items.map((r) => r.amountCents)) };
}

/** Months of free cash at a given burn; null when nothing is burning. */
export const runwayAt = (freeCents: number, burnCents: number) =>
  burnCents > 0 ? Math.round((Math.max(0, freeCents) / burnCents) * 10) / 10 : null;

/** The date `months` from today, as "June 2028". */
export const lastsTo = (months: number) =>
  new Date(NOW.getTime() + months * 30.4375 * 86_400_000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
