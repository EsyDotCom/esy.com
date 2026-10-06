// Sample money for the runway prototypes: one person who runs a small agency,
// at three stages of it (round 2): paying yourself, funding the business, and
// just started. Shaped like what os.esy.com/agency/runway reads from
// api.esy.com (FinanceRunwayResponse, BankAccount, BankTransaction,
// FinancialConnection, CashflowMonth), and every figure on every view is
// computed from the tables below, so the numbers agree across panels and
// across prototypes: what leaves Esy LLC as your pay is exactly what lands in
// your personal checking, and what you put in is exactly what leaves it.
//
// The rules are the API's (app/services/finance_runway.py):
//   - Runway is a cash model. Burn is the average monthly net outflow over the
//     last three complete months (HEADLINE_WINDOW_MONTHS = 3). With less
//     history than that, the rate is divided by the days actually observed,
//     and under 30 days there is no rate at all (MIN_OBSERVED_DAYS): an honest
//     "not yet" beats a confident wrong number.
//   - Money that only moved between your own accounts is left out of the
//     combined view. Split by side, it isn't: the business paying you is the
//     business's spending and your income, and money you put in is the
//     business's income and your spending. That rule is what these
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
export type Stage = 'paying' | 'funding' | 'starting';

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
/** The API's floor for a burn rate (MIN_OBSERVED_DAYS in finance_runway.py). */
export const MIN_OBSERVED_DAYS = 30;
/** How much business history a pay plan needs before it's worth suggesting. */
export const PLAN_HISTORY_DAYS = 90;
export const AGENCY = 'Esy LLC';
const D = 100; // dollars → cents
const DAYS_PER_MONTH = 30.4375;

export const WORKSPACES: Record<Side, Workspace> = {
  business: { id: 'ws-esy', name: AGENCY, kind: 'organization' },
  personal: { id: 'ws-you', name: 'Personal', kind: 'personal' },
};
const wsSide = (workspaceId: string): Side => (workspaceId === WORKSPACES.business.id ? 'business' : 'personal');

// The last eleven closed months, Nov 2025 → Sep 2026. October is open.
const PERIODS = ['2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09'];
const WINDOW_START = new Date('2026-07-01T00:00:00'); // the headline window: Jul, Aug, Sep
const WINDOW_END = new Date('2026-10-01T00:00:00');
const WINDOW_DAYS = Math.round((WINDOW_END.getTime() - WINDOW_START.getTime()) / 86_400_000);

type CatTable = Record<string, { name: string; side: Side; months: number[] }>;
type Txn = BankTransaction & { kind?: 'income' | 'pay' | 'in' };
type AccountDef = Omit<BankAccount, 'currentBalanceCents'> & {
  /** Cash this morning. Omitted on a side's first cash account when the side opened with nothing: then it's computed from every month since. */
  balance?: number;
  /** Cards: the last statement, in dollars. The balance is that plus October's purchases. */
  statement?: number;
};

export interface Recurring {
  key: string;
  side: Side;
  label: string;
  sublabel: string;
  amountCents: number;
  day: number; // day of the month it lands
}

export interface Ask { id: string; who: string; title: string; note: string; primary: string; second: string }

interface StageData {
  label: string;
  /** One line for the stage picker. */
  note: string;
  /** First day each side has any history. */
  start: Record<Side, string>;
  /** Clients paying the business, dollars per closed month. */
  income: number[];
  payers: [string, number][];
  ownerPay: number[]; // business → you
  fromYou: number[]; // you → business
  taxes: number[]; // quarterly estimated tax, from the tax reserve
  interest: number[]; // savings interest, personal
  salary: { label: string; months: number[] } | null; // a paycheck from somewhere else, personal
  categories: CatTable;
  october: Txn[];
  accounts: AccountDef[];
  connections: FinancialConnection[];
  recurring: Recurring[];
}

const synced = '2026-10-05T08:42:00';
const conn = (id: string, workspaceId: string, institutionName: string): FinancialConnection =>
  ({ id, workspaceId, provider: 'plaid', environment: 'production', institutionName, healthStatus: 'healthy', userActionRequired: false, lastSyncedAt: synced });
const cash = (id: string, side: Side, connectionId: string, name: string, mask: string, balance?: number): AccountDef =>
  ({ id, workspaceId: WORKSPACES[side].id, connectionId, name, mask, type: 'depository', balance, creditLimitCents: null, statementBalanceCents: null, minimumPaymentCents: null, nextPaymentDueAt: null });
const card = (id: string, side: Side, connectionId: string, name: string, mask: string, statement: number, limit: number | null, minimum: number, due: string): AccountDef =>
  ({ id, workspaceId: WORKSPACES[side].id, connectionId, name, mask, type: 'credit', statement, creditLimitCents: limit == null ? null : limit * D, statementBalanceCents: statement * D, minimumPaymentCents: minimum * D, nextPaymentDueAt: due });
const tx = (id: string, accountId: string, date: string, dollars: number, merchantName: string, categoryPrimary: string, kind?: Txn['kind']): Txn =>
  ({ id, accountId, date, amountCents: Math.round(dollars * D), merchantName, categoryPrimary, kind });
const flat = (n: number, from = 0) => PERIODS.map((_, i) => (i >= from ? n : 0));

// ── Stage 1 · Paying yourself ────────────────────────────────────────────
// An established agency that pays its owner about $6,000 a month. (Round 1's data.)
const PAYING: StageData = {
  label: 'Paying yourself',
  note: 'Two years in. Esy LLC pays you about $6,000 a month.',
  start: { business: '2024-03-01', personal: '2019-01-01' },
  income: [17_800, 19_600, 15_100, 10_900, 16_400, 17_600, 18_300, 16_200, 9_800, 10_400, 10_900],
  payers: [['Northside Dental', 0.4], ['Lakeview Realty', 0.24], ['Harbor & Pine', 0.2], ['Stripe payouts', 0.16]],
  // Skipped in February (you put $3,000 in instead), cut in July.
  ownerPay: [6_000, 6_000, 6_000, 0, 6_000, 6_000, 6_000, 6_000, 4_000, 6_000, 6_000],
  fromYou: [0, 0, 0, 3_000, 0, 0, 0, 0, 0, 0, 0],
  taxes: [0, 0, 4_200, 0, 0, 4_600, 0, 4_800, 0, 0, 5_100],
  interest: [70, 72, 72, 74, 74, 75, 75, 76, 74, 75, 76],
  salary: null,
  categories: {
    SOFTWARE: { name: 'Software & AI', side: 'business', months: [1_100, 1_150, 1_180, 1_200, 1_260, 1_320, 1_380, 1_450, 1_560, 1_640, 1_720] },
    CONTRACTORS: { name: 'Contractors', side: 'business', months: [3_200, 3_600, 2_400, 1_800, 3_000, 3_400, 3_800, 3_200, 3_000, 3_600, 4_000] },
    ADS: { name: 'Ads', side: 'business', months: [700, 900, 600, 500, 650, 800, 950, 900, 700, 850, 1_000] },
    OFFICE: { name: 'Coworking', side: 'business', months: flat(450) },
    BIZ_TRAVEL: { name: 'Client travel', side: 'business', months: [0, 900, 0, 0, 350, 0, 1_200, 400, 0, 600, 0] },
    FEES: { name: 'Insurance & fees', side: 'business', months: flat(310) },
    RENT: { name: 'Rent', side: 'personal', months: flat(2_450) },
    GROCERIES: { name: 'Groceries', side: 'personal', months: [620, 700, 640, 600, 610, 650, 630, 660, 640, 680, 650] },
    DINING: { name: 'Eating out', side: 'personal', months: [380, 520, 300, 260, 340, 400, 420, 450, 380, 410, 470] },
    INSURANCE: { name: 'Health insurance', side: 'personal', months: flat(520) },
    UTILITIES: { name: 'Utilities & phone', side: 'personal', months: [210, 230, 260, 250, 220, 200, 190, 210, 230, 240, 210] },
    SUBSCRIPTIONS: { name: 'Subscriptions', side: 'personal', months: flat(95) },
    TRANSPORT: { name: 'Getting around', side: 'personal', months: [180, 160, 150, 140, 170, 190, 200, 210, 180, 190, 200] },
    SHOPPING: { name: 'Shopping', side: 'personal', months: [300, 900, 200, 150, 250, 300, 280, 350, 260, 320, 340] },
    TRAVEL: { name: 'Travel', side: 'personal', months: [0, 0, 0, 0, 0, 0, 0, 1_400, 0, 0, 0] },
  },
  october: [
    tx('t1', 'a-biz-chk', '2026-10-01', 6000, 'Paid to you', 'OWNER_PAY', 'pay'),
    tx('t2', 'a-you-chk', '2026-10-01', -6000, `From ${AGENCY}`, 'OWNER_PAY', 'pay'),
    tx('t3', 'a-you-chk', '2026-10-01', 2450, 'Rent · Parkline Apartments', 'RENT'),
    tx('t4', 'a-you-chk', '2026-10-01', 520, 'Oscar Health', 'INSURANCE'),
    tx('t5', 'a-amex', '2026-10-01', 450, 'WeWork', 'OFFICE'),
    tx('t6', 'a-biz-chk', '2026-10-02', -1240, 'Stripe payout', 'INCOME', 'income'),
    tx('t7', 'a-sapphire', '2026-10-02', 12, 'Spotify', 'SUBSCRIPTIONS'),
    tx('t8', 'a-sapphire', '2026-10-02', 18, 'Netflix', 'SUBSCRIPTIONS'),
    tx('t9', 'a-ink', '2026-10-03', 120, 'Google Ads', 'ADS'),
    tx('t10', 'a-sapphire', '2026-10-03', 64, "Trader Joe's", 'GROCERIES'),
    tx('t11', 'a-sapphire', '2026-10-03', 20, 'Uber', 'TRANSPORT'),
    tx('t12', 'a-biz-chk', YESTERDAY, -1860, 'Northside Dental', 'INCOME', 'income'),
    tx('t13', 'a-amex', YESTERDAY, 240, 'Anthropic', 'SOFTWARE'),
    tx('t14', 'a-amex', YESTERDAY, 60, 'OpenAI', 'SOFTWARE'),
    tx('t15', 'a-ink', YESTERDAY, 45, 'Figma', 'SOFTWARE'),
    tx('t16', 'a-sapphire', YESTERDAY, 86, 'Whole Foods', 'GROCERIES'),
    tx('t17', 'a-sapphire', YESTERDAY, 26, 'Sweetgreen', 'DINING'),
  ],
  accounts: [
    cash('a-biz-chk', 'business', 'c-chase-biz', 'Business Complete Checking', '4417', 38_400),
    cash('a-biz-tax', 'business', 'c-chase-biz', 'Tax reserve', '0921', 14_200),
    card('a-amex', 'business', 'c-amex', 'Business Platinum', '1008', 3_920, null, 3_920, '2026-10-19'),
    card('a-ink', 'business', 'c-chase-biz', 'Ink Business Preferred', '5521', 980, 15_000, 40, '2026-10-23'),
    cash('a-you-chk', 'personal', 'c-chase-you', 'Total Checking', '2280', 7_850),
    cash('a-you-save', 'personal', 'c-ally', 'High-yield savings', '6612', 21_500),
    card('a-sapphire', 'personal', 'c-chase-you', 'Sapphire Preferred', '7713', 1_690, 18_000, 40, '2026-10-14'),
  ],
  connections: [
    conn('c-chase-biz', 'ws-esy', 'Chase'),
    conn('c-amex', 'ws-esy', 'American Express'),
    conn('c-chase-you', 'ws-you', 'Chase'),
    conn('c-ally', 'ws-you', 'Ally Bank'),
  ],
  recurring: [
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
  ],
};

// ── Stage 2 · Funding the business ───────────────────────────────────────
// Nine months in. Clients don't cover the costs yet, so you put $3,000 a
// month in from savings (and $10,000 to open the account in January). Your
// salary from your last job stopped in December.
const FUNDING: StageData = {
  label: 'Funding the business',
  note: 'Nine months in. Clients don’t cover costs yet; you put in $3,000 a month.',
  start: { business: '2026-01-06', personal: '2019-01-01' },
  income: [0, 0, 1_200, 2_400, 3_100, 2_800, 4_200, 3_900, 4_600, 5_100, 5_400],
  payers: [['Harbor & Pine', 0.45], ['Northside Dental', 0.35], ['Stripe payouts', 0.2]],
  ownerPay: flat(0),
  fromYou: [0, 0, 10_000, 3_000, 3_000, 3_000, 3_000, 3_000, 3_000, 3_000, 3_000],
  taxes: flat(0),
  interest: [110, 110, 105, 98, 92, 86, 80, 74, 68, 62, 58],
  salary: { label: 'Brightline Media payroll', months: [7_400, 7_400, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  categories: {
    SOFTWARE: { name: 'Software & AI', side: 'business', months: [0, 0, 420, 480, 520, 560, 620, 680, 760, 840, 900] },
    CONTRACTORS: { name: 'Contractors', side: 'business', months: [0, 0, 0, 1_200, 2_400, 3_000, 4_000, 4_600, 5_200, 5_800, 6_000] },
    ADS: { name: 'Ads', side: 'business', months: [0, 0, 300, 400, 500, 450, 600, 650, 700, 800, 850] },
    OFFICE: { name: 'Coworking', side: 'business', months: flat(450, 2) },
    EQUIPMENT: { name: 'Equipment', side: 'business', months: [0, 0, 2_400, 0, 0, 0, 0, 600, 0, 0, 0] },
    FEES: { name: 'Insurance & fees', side: 'business', months: [0, 0, 380, 250, 250, 250, 250, 250, 250, 250, 250] },
    RENT: { name: 'Rent', side: 'personal', months: flat(1_950) },
    GROCERIES: { name: 'Groceries', side: 'personal', months: [600, 680, 560, 540, 550, 570, 560, 580, 560, 570, 550] },
    DINING: { name: 'Eating out', side: 'personal', months: [420, 560, 260, 220, 240, 250, 230, 260, 240, 250, 230] },
    INSURANCE: { name: 'Health insurance', side: 'personal', months: flat(480, 2) },
    UTILITIES: { name: 'Utilities & phone', side: 'personal', months: [170, 190, 210, 200, 180, 170, 160, 170, 180, 190, 180] },
    SUBSCRIPTIONS: { name: 'Subscriptions', side: 'personal', months: flat(60) },
    TRANSPORT: { name: 'Getting around', side: 'personal', months: [240, 230, 150, 140, 150, 160, 150, 160, 150, 150, 150] },
    SHOPPING: { name: 'Shopping', side: 'personal', months: [300, 700, 150, 120, 150, 180, 160, 200, 150, 170, 160] },
  },
  october: [
    tx('f1', 'a-biz-chk', '2026-10-01', -3000, 'From you', 'OWNER_PAY', 'in'),
    tx('f2', 'a-you-chk', '2026-10-01', 3000, `To ${AGENCY}`, 'OWNER_PAY', 'in'),
    tx('f3', 'a-you-chk', '2026-10-01', 1950, 'Rent · Linden Court', 'RENT'),
    tx('f4', 'a-you-chk', '2026-10-01', 480, 'Blue Cross', 'INSURANCE'),
    tx('f5', 'a-ink', '2026-10-01', 450, 'WeWork', 'OFFICE'),
    tx('f6', 'a-biz-chk', '2026-10-02', -1450, 'Harbor & Pine', 'INCOME', 'income'),
    tx('f7', 'a-biz-chk', '2026-10-03', 1800, 'Contractor · M. Ortiz', 'CONTRACTORS'),
    tx('f8', 'a-freedom', '2026-10-03', 72, "Trader Joe's", 'GROCERIES'),
    tx('f9', 'a-ink', YESTERDAY, 210, 'Anthropic', 'SOFTWARE'),
    tx('f10', 'a-ink', YESTERDAY, 90, 'Meta Ads', 'ADS'),
    tx('f11', 'a-freedom', YESTERDAY, 54, 'Safeway', 'GROCERIES'),
    tx('f12', 'a-freedom', YESTERDAY, 18, 'Netflix', 'SUBSCRIPTIONS'),
  ],
  accounts: [
    cash('a-biz-chk', 'business', 'c-chase-biz', 'Business Complete Checking', '3306'),
    card('a-ink', 'business', 'c-chase-biz', 'Ink Business Cash', '8842', 2_100, 10_000, 40, '2026-10-21'),
    cash('a-you-chk', 'personal', 'c-chase-you', 'Total Checking', '2280', 3_900),
    cash('a-you-save', 'personal', 'c-ally', 'High-yield savings', '6612', 24_600),
    card('a-freedom', 'personal', 'c-chase-you', 'Freedom Unlimited', '5530', 860, 12_000, 40, '2026-10-16'),
  ],
  connections: [conn('c-chase-biz', 'ws-esy', 'Chase'), conn('c-chase-you', 'ws-you', 'Chase'), conn('c-ally', 'ws-you', 'Ally Bank')],
  recurring: [
    { key: 'r-rent', side: 'personal', label: 'Rent', sublabel: 'Linden Court', amountCents: 1_950 * D, day: 1 },
    { key: 'r-health', side: 'personal', label: 'Health insurance', sublabel: 'Blue Cross', amountCents: 480 * D, day: 1 },
    { key: 'r-into', side: 'personal', label: `Into ${AGENCY}`, sublabel: 'Your monthly transfer', amountCents: 3_000 * D, day: 1 },
    { key: 'r-comcast', side: 'personal', label: 'Internet', sublabel: 'Comcast', amountCents: 70 * D, day: 9 },
    { key: 'r-phone', side: 'personal', label: 'Phone', sublabel: 'Mint Mobile', amountCents: 30 * D, day: 12 },
    { key: 'r-netflix', side: 'personal', label: 'Netflix', sublabel: 'Subscription', amountCents: 18 * D, day: 4 },
    { key: 'r-wework', side: 'business', label: 'WeWork', sublabel: 'Hot desk', amountCents: 450 * D, day: 1 },
    { key: 'r-gws', side: 'business', label: 'Google Workspace', sublabel: '1 seat', amountCents: 18 * D, day: 15 },
    { key: 'r-adobe', side: 'business', label: 'Adobe', sublabel: 'Creative Cloud', amountCents: 60 * D, day: 9 },
  ],
};

// ── Stage 3 · Just started ───────────────────────────────────────────────
// Six weeks in. Your last job ended in June; the business opened on Aug 24
// with a first client's retainer. Nothing has moved between you and it yet.
const STARTING: StageData = {
  label: 'Just started',
  note: 'Six weeks in. Your last paycheck was in July; no money has moved between you and Esy LLC.',
  start: { business: '2026-08-24', personal: '2019-01-01' },
  income: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4_000, 2_200],
  payers: [['Harbor & Pine', 1]],
  ownerPay: flat(0),
  fromYou: flat(0),
  taxes: flat(0),
  interest: [88, 90, 92, 94, 96, 98, 100, 102, 104, 101, 98],
  // Final paycheck and unused vacation landed in July.
  salary: { label: 'Brightline Media payroll', months: [6_900, 6_900, 6_900, 6_900, 6_900, 6_900, 6_900, 6_900, 3_200, 0, 0] },
  categories: {
    SOFTWARE: { name: 'Software & AI', side: 'business', months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 120, 260] },
    OFFICE: { name: 'Coworking', side: 'business', months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 450] },
    ADS: { name: 'Ads', side: 'business', months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 300] },
    EQUIPMENT: { name: 'Equipment', side: 'business', months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1_400, 0] },
    FEES: { name: 'Filing & fees', side: 'business', months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 330, 90] },
    RENT: { name: 'Rent', side: 'personal', months: flat(2_100) },
    GROCERIES: { name: 'Groceries', side: 'personal', months: [620, 690, 600, 580, 600, 610, 620, 630, 610, 640, 620] },
    DINING: { name: 'Eating out', side: 'personal', months: [420, 560, 380, 340, 380, 400, 420, 440, 360, 300, 280] },
    INSURANCE: { name: 'Health insurance', side: 'personal', months: [0, 0, 0, 0, 0, 0, 0, 0, 610, 610, 610] },
    UTILITIES: { name: 'Utilities & phone', side: 'personal', months: [190, 210, 230, 220, 200, 190, 180, 190, 200, 210, 200] },
    SUBSCRIPTIONS: { name: 'Subscriptions', side: 'personal', months: flat(80) },
    TRANSPORT: { name: 'Getting around', side: 'personal', months: [230, 220, 230, 220, 230, 240, 230, 230, 120, 100, 110] },
    SHOPPING: { name: 'Shopping', side: 'personal', months: [320, 780, 220, 180, 260, 300, 280, 320, 240, 220, 200] },
    TRAVEL: { name: 'Travel', side: 'personal', months: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1_200, 0] },
  },
  october: [
    tx('s1', 'a-you-chk', '2026-10-01', 2100, 'Rent · Hollis Street', 'RENT'),
    tx('s2', 'a-you-chk', '2026-10-01', 610, 'COBRA · Aetna', 'INSURANCE'),
    tx('s3', 'a-ink', '2026-10-01', 450, 'Industrious', 'OFFICE'),
    tx('s4', 'a-ink', '2026-10-03', 60, 'Adobe', 'SOFTWARE'),
    tx('s5', 'a-freedom', '2026-10-03', 58, "Trader Joe's", 'GROCERIES'),
    tx('s6', 'a-ink', YESTERDAY, 20, 'Anthropic', 'SOFTWARE'),
    tx('s7', 'a-freedom', YESTERDAY, 64, 'Whole Foods', 'GROCERIES'),
    tx('s8', 'a-freedom', YESTERDAY, 31, 'Chipotle', 'DINING'),
  ],
  accounts: [
    cash('a-biz-chk', 'business', 'c-chase-biz', 'Business Complete Checking', '7019'),
    card('a-ink', 'business', 'c-chase-biz', 'Ink Business Cash', '2210', 410, 5_000, 40, '2026-10-18'),
    cash('a-you-chk', 'personal', 'c-chase-you', 'Total Checking', '2280', 6_200),
    cash('a-you-save', 'personal', 'c-ally', 'High-yield savings', '6612', 34_000),
    card('a-freedom', 'personal', 'c-chase-you', 'Freedom Unlimited', '5530', 1_180, 12_000, 40, '2026-10-13'),
  ],
  connections: [conn('c-chase-biz', 'ws-esy', 'Chase'), conn('c-chase-you', 'ws-you', 'Chase'), conn('c-ally', 'ws-you', 'Ally Bank')],
  recurring: [
    { key: 'r-rent', side: 'personal', label: 'Rent', sublabel: 'Hollis Street', amountCents: 2_100 * D, day: 1 },
    { key: 'r-health', side: 'personal', label: 'Health insurance', sublabel: 'COBRA · Aetna', amountCents: 610 * D, day: 1 },
    { key: 'r-comcast', side: 'personal', label: 'Internet', sublabel: 'Comcast', amountCents: 75 * D, day: 9 },
    { key: 'r-phone', side: 'personal', label: 'Phone', sublabel: 'Verizon', amountCents: 85 * D, day: 12 },
    { key: 'r-spotify', side: 'personal', label: 'Spotify', sublabel: 'Subscription', amountCents: 12 * D, day: 2 },
    { key: 'r-office', side: 'business', label: 'Industrious', sublabel: 'Coworking', amountCents: 450 * D, day: 1 },
    { key: 'r-adobe', side: 'business', label: 'Adobe', sublabel: 'Creative Cloud', amountCents: 60 * D, day: 3 },
  ],
};

const DATA: Record<Stage, StageData> = { paying: PAYING, funding: FUNDING, starting: STARTING };
/** The stages, for the prototype's sample-data picker. */
export const STAGES: { stage: Stage; label: string; note: string }[] = (['paying', 'funding', 'starting'] as Stage[]).map((stage) => ({ stage, label: DATA[stage].label, note: DATA[stage].note }));

export const catName = (key: string, stage: Stage = 'paying') =>
  key === 'OWNER_PAY' ? 'Paid to you' : key === 'TAXES' ? 'Estimated tax' : DATA[stage].categories[key]?.name ?? key;

// ── Derived: the money, month by month, for each side ───────────────────────

interface SideMonth {
  period: string;
  income: number; // money from outside (clients, a paycheck)
  interest: number;
  spend: Record<string, number>; // spending lines (includes Estimated tax)
  paidOut: number; // business → you (business side) / you → business (personal side)
  paidIn: number; // you → business (business side) / business → you (personal side)
}

const sum = (xs: number[]) => xs.reduce((n, x) => n + x, 0);
const spendTotal = (m: SideMonth) => sum(Object.values(m.spend));
export const avg = (xs: number[]) => (xs.length ? sum(xs) / xs.length : 0);

function closedMonths(s: StageData, side: Side): SideMonth[] {
  return PERIODS.map((period, i) => {
    const spend: Record<string, number> = {};
    for (const [k, c] of Object.entries(s.categories)) if (c.side === side && c.months[i]) spend[k] = c.months[i] * D;
    if (side === 'business' && s.taxes[i]) spend.TAXES = s.taxes[i] * D;
    return side === 'business'
      ? { period, income: s.income[i] * D, interest: 0, spend, paidOut: s.ownerPay[i] * D, paidIn: s.fromYou[i] * D }
      : { period, income: (s.salary?.months[i] ?? 0) * D, interest: s.interest[i] * D, spend, paidOut: s.fromYou[i] * D, paidIn: s.ownerPay[i] * D };
  });
}

// October so far, from the rows. Spending lines count every purchase (card or
// cash); cash out counts only what left a bank account.
function octoberMonth(s: StageData, side: Side, sideOf: (accountId: string) => Side, isCard: (accountId: string) => boolean): SideMonth & { cashSpend: number } {
  const rows = s.october.filter((t) => sideOf(t.accountId) === side);
  const spend: Record<string, number> = {};
  let income = 0, paidOut = 0, paidIn = 0, cashSpend = 0;
  for (const t of rows) {
    if (t.categoryPrimary === 'OWNER_PAY') {
      if (t.amountCents > 0) paidOut += t.amountCents; else paidIn -= t.amountCents;
    } else if (t.categoryPrimary === 'INCOME') income -= t.amountCents;
    else {
      spend[t.categoryPrimary] = (spend[t.categoryPrimary] ?? 0) + t.amountCents;
      if (!isCard(t.accountId)) cashSpend += t.amountCents;
    }
  }
  return { period: '2026-10', income, interest: 0, spend, paidOut, paidIn, cashSpend };
}

interface Built {
  data: StageData;
  accounts: BankAccount[];
  books: Record<Side, { closed: SideMonth[]; oct: ReturnType<typeof octoberMonth> }>;
}

const built = new Map<Stage, Built>();

/** One stage's accounts and books. Cards carry October's purchases; a side that opened with nothing has its cash computed from every month since. */
function build(stage: Stage): Built {
  const hit = built.get(stage);
  if (hit) return hit;
  const s = DATA[stage];
  const defOf = (id: string) => s.accounts.find((a) => a.id === id)!;
  const sideOf = (id: string) => wsSide(defOf(id).workspaceId);
  const isCard = (id: string) => defOf(id).type === 'credit';
  const books = {
    business: { closed: closedMonths(s, 'business'), oct: octoberMonth(s, 'business', sideOf, isCard) },
    personal: { closed: closedMonths(s, 'personal'), oct: octoberMonth(s, 'personal', sideOf, isCard) },
  };
  const net = (side: Side) =>
    sum(books[side].closed.map((m) => m.income + m.interest + m.paidIn - spendTotal(m) - m.paidOut)) +
    (books[side].oct.income + books[side].oct.paidIn - books[side].oct.cashSpend - books[side].oct.paidOut);
  const accounts: BankAccount[] = s.accounts.map((a) => {
    const { balance, statement, ...rest } = a;
    let current: number;
    if (a.type === 'credit') current = (statement ?? 0) * D + sum(s.october.filter((t) => t.accountId === a.id).map((t) => t.amountCents));
    else if (balance != null) current = balance * D;
    else current = net(wsSide(a.workspaceId)); // opened with nothing: what came in less what went out
    return { ...rest, currentBalanceCents: current };
  });
  const out = { data: s, accounts, books };
  built.set(stage, out);
  return out;
}

const dayDiff = (a: Date, b: Date) => Math.round((b.getTime() - a.getTime()) / 86_400_000);
const sidesOf = (scope: Scope): Side[] => (scope === 'combined' ? ['business', 'personal'] : [scope]);

/** Everything one view needs, for one scope at one stage. */
export interface ScopeBook {
  scope: Scope;
  stage: Stage;
  cashCents: number;
  taxReserveCents: number;
  cardBillsCents: number;
  cardBalanceCents: number;
  freeCents: number;
  /** Average monthly net outflow, last three closed months. Negative: money in covers money out. 0 when unmeasured. */
  burnCents: number;
  /** False under 30 days of history: no rate, as the API does. */
  burnMeasured: boolean;
  /** Days of the headline window this scope has history for (the API's observed_days). */
  observedDays: number;
  /** Days since this scope's first history (the business's age, on its own). */
  historyDays: number;
  /** Months of free cash at this burn; null when money in covers money out, or when there isn't enough history. */
  runwayMonths: number | null;
  months: CashflowMonth[]; // Nov → Oct (Oct is month to date), from the scope's first month of history
  cats: { key: string; name: string; tone: string }[];
  catSeries: { period: string; byCat: Record<string, number> }[];
  /** Monthly rates over the headline window (by observed days when history is shorter). */
  avgIn: number;
  avgOut: number;
  avgSpend: number;
  avgIncome: number;
  avgInterest: number;
  /** Your pay, out of the business and into personal. */
  avgPay: number;
  /** What you put into the business. */
  avgFromYou: number;
  payByMonth: { period: string; pay: number; fromYou: number }[];
  /** Everything you've put into the business, October included. */
  fromYouTotalCents: number;
  /** Money that moved between your own sides in the last three closed months (combined leaves it out). */
  movedCents: number;
  /** A paycheck from somewhere else: who, and the last month it came. */
  salary: { label: string; lastPeriod: string | null; avgCents: number } | null;
  accounts: BankAccount[];
  connections: FinancialConnection[];
}

const TONES = ['navy', 'slate', 'jade', 'sand', 'mist', 'gold'];

export function bookFor(scope: Scope, stage: Stage = 'paying'): ScopeBook {
  const { data: s, accounts, books } = build(stage);
  const sides = sidesOf(scope);
  const both = scope === 'combined';

  // When this scope's history begins: the earliest side, as the API takes the earliest transaction.
  const earliest = new Date(`${sides.map((x) => s.start[x]).sort()[0]}T00:00:00`);
  const firstPeriod = `${earliest.getFullYear()}-${String(earliest.getMonth() + 1).padStart(2, '0')}`;

  // Per month: what came in and went out for this scope. Pay between the sides
  // counts only when you look at one side alone.
  const monthTotals = [...PERIODS, '2026-10'].map((period, i) => {
    let inC = 0, outC = 0, spendAll = 0, income = 0, interest = 0, pay = 0, fromYou = 0;
    for (const x of sides) {
      const m = i < PERIODS.length ? books[x].closed[i] : books[x].oct;
      const spendCash = i < PERIODS.length ? spendTotal(m) : books[x].oct.cashSpend;
      income += m.income;
      interest += m.interest;
      spendAll += spendTotal(m);
      inC += m.income + m.interest + (both ? 0 : m.paidIn);
      outC += spendCash + (both ? 0 : m.paidOut);
    }
    const b = i < PERIODS.length ? books.business.closed[i] : books.business.oct;
    pay = b.paidOut;
    fromYou = b.paidIn;
    return { period, inC, outC, spendAll, income, interest, pay, fromYou };
  });

  // Closing balances, walked back from this morning's cash.
  const cashAccts = accounts.filter((a) => a.type === 'depository' && sides.includes(wsSide(a.workspaceId)));
  const cashCents = sum(cashAccts.map((a) => a.currentBalanceCents));
  const closing: number[] = [];
  let bal = cashCents;
  for (let i = monthTotals.length - 1; i >= 0; i--) {
    closing[i] = bal;
    bal -= monthTotals[i].inC - monthTotals[i].outC;
  }
  const shown = monthTotals.map((m, i) => ({ m, i })).filter(({ m }) => m.period >= firstPeriod);
  const months: CashflowMonth[] = shown.map(({ m, i }) => ({
    period: m.period, cashInCents: m.inC, cashOutCents: m.outC, netCents: m.inC - m.outC, closingBalanceCents: closing[i],
  }));

  // The headline window: the last three closed months, normalised by the days
  // this scope actually has history for, and no rate at all under 30 days.
  const observedDays = Math.max(0, dayDiff(earliest > WINDOW_START ? earliest : WINDOW_START, WINDOW_END));
  const win = monthTotals.slice(-4, -1);
  const rate = (pick: (m: (typeof win)[number]) => number) =>
    observedDays >= WINDOW_DAYS ? avg(win.map(pick)) : observedDays > 0 ? (sum(win.map(pick)) / observedDays) * DAYS_PER_MONTH : 0;
  const avgIn = rate((m) => m.inC);
  const avgOut = rate((m) => m.outC);
  const burnMeasured = observedDays >= MIN_OBSERVED_DAYS;
  const burnCents = burnMeasured ? Math.round(avgOut - avgIn) : 0;

  const taxReserveCents = sum(cashAccts.filter((a) => /\btax/i.test(a.name)).map((a) => a.currentBalanceCents));
  const cards = accounts.filter((a) => a.type === 'credit' && sides.includes(wsSide(a.workspaceId)));
  const cardBillsCents = sum(cards.map((a) => a.statementBalanceCents ?? 0));
  const freeCents = cashCents - taxReserveCents - cardBillsCents;
  const runwayMonths = burnMeasured && burnCents > 0 ? Math.round((Math.max(0, freeCents) / burnCents) * 10) / 10 : null;

  // Spending lines by month. Viewed from the business alone, paying you is a line of its own.
  const catSeries = shown.map(({ m, i }) => {
    const byCat: Record<string, number> = {};
    for (const x of sides) {
      const sm = i < PERIODS.length ? books[x].closed[i] : books[x].oct;
      for (const [k, v] of Object.entries(sm.spend)) byCat[k] = (byCat[k] ?? 0) + v;
      if (scope === 'business' && sm.paidOut) byCat.OWNER_PAY = (byCat.OWNER_PAY ?? 0) + sm.paidOut;
    }
    return { period: m.period, byCat };
  });
  const totals = new Map<string, number>();
  for (const m of catSeries) for (const [k, v] of Object.entries(m.byCat)) totals.set(k, (totals.get(k) ?? 0) + v);
  const top = [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k]) => k);
  const rolled = catSeries.map((m) => {
    const byCat: Record<string, number> = {};
    for (const [k, v] of Object.entries(m.byCat)) { const kk = top.includes(k) ? k : 'OTHER'; byCat[kk] = (byCat[kk] ?? 0) + v; }
    return { period: m.period, byCat };
  });
  const cats = [...top, ...(totals.size > top.length ? ['OTHER'] : [])].map((k, i) => ({ key: k, name: k === 'OTHER' ? 'Other' : catName(k, stage), tone: TONES[i % TONES.length] }));

  const payByMonth = monthTotals.map((m) => ({ period: m.period, pay: m.pay, fromYou: m.fromYou }));
  const salaryMonths = s.salary ? [...s.salary.months] : [];
  const lastSalary = salaryMonths.length ? PERIODS[salaryMonths.map((v, i) => (v ? i : -1)).filter((i) => i >= 0).pop() ?? -1] ?? null : null;

  return {
    scope,
    stage,
    cashCents,
    taxReserveCents,
    cardBillsCents,
    cardBalanceCents: sum(cards.map((a) => a.currentBalanceCents)),
    freeCents,
    burnCents,
    burnMeasured,
    observedDays,
    historyDays: Math.max(0, dayDiff(earliest, NOW)),
    runwayMonths,
    months,
    cats,
    catSeries: rolled,
    avgIn,
    avgOut,
    avgSpend: rate((m) => m.spendAll),
    avgIncome: rate((m) => m.income),
    avgInterest: rate((m) => m.interest),
    avgPay: rate((m) => m.pay),
    avgFromYou: rate((m) => m.fromYou),
    payByMonth,
    fromYouTotalCents: sum(monthTotals.map((m) => m.fromYou)),
    movedCents: sum(win.map((m) => m.pay + m.fromYou)),
    salary: s.salary && sides.includes('personal') ? { label: s.salary.label, lastPeriod: lastSalary, avgCents: rate((m) => (both ? 0 : m.income)) } : null,
    accounts: accounts.filter((a) => sides.includes(wsSide(a.workspaceId))),
    connections: s.connections.filter((c) => sides.includes(wsSide(c.workspaceId))),
  };
}

/** The side an account belongs to, at a stage. */
export const sideOfAccount = (id: string, stage: Stage = 'paying') =>
  wsSide(build(stage).accounts.find((a) => a.id === id)!.workspaceId);

/** Your side, month by month: what the business paid you against everything you spent (cards included). October is to date. */
export function paycheckMonths(stage: Stage = 'paying'): { period: string; pay: number; spend: number; toBusiness: number; interest: number; open: boolean }[] {
  const { books } = build(stage);
  const rows = books.personal.closed.map((m) => ({ period: m.period, pay: m.paidIn, spend: spendTotal(m), toBusiness: m.paidOut, interest: m.interest, open: false }));
  const o = books.personal.oct;
  rows.push({ period: o.period, pay: o.paidIn, spend: spendTotal(o), toBusiness: o.paidOut, interest: o.interest, open: true });
  return rows;
}

/** Your savings and checking this morning, at a stage. */
export const savingsCents = (stage: Stage = 'paying') => build(stage).accounts.find((a) => a.id === 'a-you-save')!.currentBalanceCents;
export const checkingCents = (stage: Stage = 'paying') => build(stage).accounts.find((a) => a.id === 'a-you-chk')!.currentBalanceCents;
// Round 1's names for the same figures (the paying stage).
export const SAVINGS_CENTS = savingsCents('paying');
export const CHECKING_CENTS = checkingCents('paying');

/** Who paid the business over the last three closed months. */
export function payers(stage: Stage = 'paying'): { label: string; cents: number }[] {
  const { data, books } = build(stage);
  const income = sum(books.business.closed.slice(-3).map((m) => m.income));
  return data.payers.map(([label, share]) => ({ label, cents: Math.round(income * share) }));
}

/** Yesterday, merchant by merchant, signed so money in is positive (as the live page shows it). */
export function yesterdayLines(scope: Scope, stage: Stage = 'paying'): { label: string; cents: number }[] {
  const sides = sidesOf(scope);
  return DATA[stage].october.filter((t) => t.date === YESTERDAY && sides.includes(sideOfAccount(t.accountId, stage)))
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
export function upcoming(scope: Scope, days = 14, stage: Stage = 'paying'): UpcomingItem[] {
  const sides = sidesOf(scope);
  const { data, accounts } = build(stage);
  const today = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());
  const away = (iso: string) => Math.round((new Date(`${iso}T00:00:00`).getTime() - today.getTime()) / 86_400_000);
  const items: UpcomingItem[] = [];
  for (const a of accounts) {
    const side = wsSide(a.workspaceId);
    if (a.type !== 'credit' || !a.nextPaymentDueAt || !sides.includes(side)) continue;
    items.push({ key: a.id, dueOn: a.nextPaymentDueAt, label: `${a.name} bill`, sublabel: `Statement balance ••${a.mask}`, amountCents: a.statementBalanceCents ?? 0, daysAway: away(a.nextPaymentDueAt), side });
  }
  for (const r of data.recurring) {
    if (!sides.includes(r.side)) continue;
    for (const monthOffset of [0, 1]) {
      const d = new Date(today.getFullYear(), today.getMonth() + monthOffset, r.day);
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (away(iso) >= 0) { items.push({ key: `${r.key}-${monthOffset}`, dueOn: iso, label: r.label, sublabel: r.sublabel, amountCents: r.amountCents, daysAway: away(iso), side: r.side }); break; }
    }
  }
  return items.filter((u) => u.daysAway <= days).sort((a, b) => a.daysAway - b.daysAway);
}

/** Recurring bills for one side, biggest first, with the monthly total. */
export function recurringFor(side: Side, stage: Stage = 'paying') {
  const items = DATA[stage].recurring.filter((r) => r.side === side).sort((a, b) => b.amountCents - a.amountCents);
  return { items, totalCents: sum(items.map((r) => r.amountCents)) };
}

const money = (cents: number) => `$${Math.round(cents / 100).toLocaleString('en-US')}`;

/** The finance desk's asks for a scope, at a stage. Samples: there's no finance-agent API yet. Figures come from the data. */
export function asksFor(scope: Scope, stage: Stage = 'paying'): Ask[] {
  if (stage === 'paying') {
    return scope === 'personal'
      ? [
          { id: 'p1', who: 'Ledger', title: 'Pay the Sapphire bill in full?', note: '$1,690 is due Oct 14. Checking has $7,850 with October’s rent already paid.', primary: 'Schedule it', second: 'Remind me' },
          { id: 'p2', who: 'Ledger', title: 'Move $1,000 to savings?', note: 'October’s pay is in. Savings covers 4.4 months of your spending; 6 is the goal.', primary: 'Move $1,000', second: 'Not this month' },
        ]
      : [
          { id: 'a1', who: 'Quill', title: 'Lakeview Realty is 14 days late on $2,800', note: 'Invoice #1039. A friendly second reminder is drafted.', primary: 'Send reminder', second: 'Edit draft' },
          { id: 'a2', who: 'Scout', title: 'Two tools look unused', note: 'Adobe (no sign-in in 74 days) and Notion (overlaps the Library).', primary: 'Cancel both', second: 'Keep' },
          { id: 'a3', who: 'Ledger', title: 'Bill Northside for $394 of Anthropic?', note: '41% of September’s Claude usage ran on Northside work.', primary: 'Add to invoice', second: 'Absorb it' },
        ];
  }
  const biz = bookFor('business', stage);
  const you = bookFor('personal', stage);
  const yourCard = you.accounts.find((a) => a.type === 'credit');
  const cardAsk: Ask | null = yourCard ? { id: 'p1', who: 'Ledger', title: `Pay the ${yourCard.name} bill in full?`, note: `${money(yourCard.statementBalanceCents ?? 0)} is due ${new Date(`${yourCard.nextPaymentDueAt}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}. Checking has ${money(checkingCents(stage))}.`, primary: 'Schedule it', second: 'Remind me' } : null;
  if (stage === 'funding') {
    const sep = biz.catSeries[biz.catSeries.length - 2];
    const sepTotal = sum(Object.values(sep.byCat));
    const contractors = sep.byCat.CONTRACTORS ?? 0;
    return scope === 'personal'
      ? [cardAsk!, { id: 'p2', who: 'Ledger', title: `Set a limit on what goes into ${AGENCY}?`, note: `You’ve put in ${money(biz.fromYouTotalCents)} since January. At this pace your own money lasts ${you.runwayMonths?.toFixed(1)} months.`, primary: 'Set a limit', second: 'Not now' }]
      : [
          { id: 'b1', who: 'Quill', title: 'Northside Dental is 9 days late on $1,800', note: 'Invoice #1031. A friendly reminder is drafted.', primary: 'Send reminder', second: 'Edit draft' },
          { id: 'b2', who: 'Scout', title: `Contractors were ${Math.round((contractors / sepTotal) * 100)}% of September’s spending`, note: `${money(contractors)} of ${money(sepTotal)}. Two retainers would cover it.`, primary: 'See contractors', second: 'Dismiss' },
        ];
  }
  const sinceStart = sum(biz.months.map((m) => m.cashInCents));
  return scope === 'personal'
    ? [cardAsk!]
    : [{ id: 'b1', who: 'Ledger', title: 'Set aside tax from what clients pay?', note: `${money(sinceStart)} has come in since ${new Date(`${DATA[stage].start.business}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} and nothing is set aside yet. A quarter would be ${money(sinceStart / 4)}.`, primary: 'Open a tax reserve', second: 'Later' }];
}

/** Months of free cash at a given burn; null when nothing is burning. */
export const runwayAt = (freeCents: number, burnCents: number) =>
  burnCents > 0 ? Math.round((Math.max(0, freeCents) / burnCents) * 10) / 10 : null;

/** The date `months` from today, as "June 2028". */
export const lastsTo = (months: number) =>
  new Date(NOW.getTime() + months * 30.4375 * 86_400_000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
