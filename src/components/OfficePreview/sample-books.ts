/* Sample figures for the Books preview on the esy.com hero.
 *
 * Shaped like the office's real BooksData (os.esy.com, components/office/books)
 * so the preview renders the same panels the product does. Numbers are
 * illustrative, sized like ESY LLC's own clip.art and SEOPage.com work; the hero
 * says so in plain words beside the window. Everything derived (totals, the
 * headline, the story sentence) is computed here, never typed twice. */

export type Range = 7 | 14;
export type SeriesId = 'clipart' | 'seopage' | 'other';

export interface Day {
  day: string; // YYYY-MM-DD
  segments: { id: SeriesId; value: number }[];
  total: number;
}

export const SERIES: { id: SeriesId; name: string; color: string }[] = [
  { id: 'clipart', name: 'clip.art', color: 'var(--o-s1)' },
  { id: 'seopage', name: 'SEOPage.com', color: 'var(--o-s2)' },
  { id: 'other', name: 'Everything else', color: 'var(--o-s-other)' },
];

// Two weeks of daily spend per client, oldest first: [clip.art, SEOPage.com, other].
const RAW: [string, number, number, number][] = [
  ['2026-09-05', 24.1, 9.2, 1.4],
  ['2026-09-06', 19.8, 6.1, 0.9],
  ['2026-09-07', 27.5, 11.4, 2.2],
  ['2026-09-08', 31.2, 12.8, 1.7],
  ['2026-09-09', 26.4, 10.9, 2.5],
  ['2026-09-10', 22.7, 8.3, 1.1],
  ['2026-09-11', 29.9, 13.6, 2.8],
  ['2026-09-12', 21.3, 7.9, 1.2],
  ['2026-09-13', 17.6, 5.4, 0.8],
  ['2026-09-14', 25.8, 10.2, 1.9],
  ['2026-09-15', 28.4, 11.7, 2.1],
  ['2026-09-16', 23.9, 9.8, 1.6],
  ['2026-09-17', 26.7, 12.3, 2.4],
  ['2026-09-18', 19.2, 8.6, 1.3],
];

export const DAYS: Day[] = RAW.map(([day, a, b, c]) => ({
  day,
  segments: [
    { id: 'clipart', value: a },
    { id: 'seopage', value: b },
    { id: 'other', value: c },
  ],
  total: a + b + c,
}));

const sum = (days: Day[]) => days.reduce((s, d) => s + d.total, 0);
const sumOf = (days: Day[], id: SeriesId) =>
  days.reduce((s, d) => s + (d.segments.find((x) => x.id === id)?.value ?? 0), 0);

// Per-range figures that aren't spend: what was made, signed off, lost.
// `previous` is the same-length window before, for the ▲/▼ tag.
const RANGE_FACTS = {
  7: { pieces: 1842, pages: 64, scenes: 12, approved: 312, failed: 17, rejected: 24, previous: 266.5 },
  14: { pieces: 3701, pages: 131, scenes: 22, approved: 640, failed: 30, rejected: 51, previous: 488.3 },
} as const;

export const WAITING = 23;

export const WORKERS: Record<Range, { id: string; name: string; role: string; made: number; spend: number }[]> = {
  7: [
    { id: 'arlo', name: 'Arlo', role: 'clip art', made: 1204, spend: 96.2 },
    { id: 'juno', name: 'Juno', role: 'coloring pages', made: 638, spend: 66.7 },
    { id: 'rex', name: 'Rex', role: 'SEO pages', made: 64, spend: 65.9 },
    { id: 'mira', name: 'Mira', role: 'scenes', made: 12, spend: 11.3 },
  ],
  14: [
    { id: 'arlo', name: 'Arlo', role: 'clip art', made: 2431, spend: 208.1 },
    { id: 'juno', name: 'Juno', role: 'coloring pages', made: 1270, spend: 136.4 },
    { id: 'rex', name: 'Rex', role: 'SEO pages', made: 131, spend: 138.2 },
    { id: 'mira', name: 'Mira', role: 'scenes', made: 22, spend: 23.9 },
  ],
};

export const API_KEYS = [
  { id: 'k1', name: 'clip.art', prefix: 'esy_live_7Hq', lastUsed: 'Sep 18' },
  { id: 'k2', name: 'SEOPage.com', prefix: 'esy_live_2Kd', lastUsed: 'Sep 18' },
  { id: 'k3', name: 'Nightly catalog job', prefix: 'esy_live_9Ta', lastUsed: 'Sep 17' },
];

// Share of the window's spend by model or tool, and calls per window.
const MODELS = [
  { key: 'gpt-image-2', share: 0.64, calls: { 7: 1871, 14: 3790 } },
  { key: 'claude-sonnet-5', share: 0.2, calls: { 7: 412, 14: 851 } },
  { key: 'Background removal', share: 0.07, calls: { 7: 1842, 14: 3701 } },
  { key: 'Upscale to print', share: 0.05, calls: { 7: 604, 14: 1188 } },
  { key: 'Scene video', share: 0.04, calls: { 7: 12, 14: 22 } },
];

// September budgets, month to date on the 18th of 30 days.
export const MONTH = { day: 18, days: 30 };
export const BUDGETS = [
  { id: 'clipart' as SeriesId, name: 'clip.art', limit: 800, spent: 402.6 },
  { id: 'seopage' as SeriesId, name: 'SEOPage.com', limit: 250, spent: 178.4 },
];
export const WORKSPACE_BUDGET = { limit: 1200, spent: 611.3 };

export type PaceState = 'on' | 'ahead' | 'over';
export function pace(spent: number, limit: number) {
  const elapsed = MONTH.day / MONTH.days;
  const share = spent / limit;
  const projected = spent / elapsed;
  const state: PaceState = spent > limit ? 'over' : projected > limit ? 'ahead' : 'on';
  return { share, elapsed, projected, state };
}

// ── Money and words, as the office writes them (books-model.ts) ──────────
export const money = (usd: number) =>
  usd >= 1000
    ? `$${Math.round(usd).toLocaleString('en-US')}`
    : `$${usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const unitMoney = (usd: number) => (usd < 1 ? `${(usd * 100).toFixed(usd < 0.1 ? 1 : 0)}¢` : money(usd));
const plural = (n: number, noun: string) => `${n.toLocaleString('en-US')} ${noun}${n === 1 ? '' : 's'}`;

const DAY_FMT = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
export const dayLabel = (day: string) => DAY_FMT.format(new Date(`${day}T12:00:00Z`));

/** Everything one range of the Books needs, computed from the sample. */
export function booksFor(range: Range) {
  const days = DAYS.slice(-range);
  const f = RANGE_FACTS[range];
  const spend = sum(days);
  const madeTotal = f.pieces + f.pages + f.scenes;
  const parts = [plural(f.pieces, 'piece'), plural(f.pages, 'page'), plural(f.scenes, 'scene')];
  const rangeWord = range === 7 ? 'this week' : 'these two weeks';

  // The week in a sentence, then the story under it — same grammar as the office.
  const headline = `${money(spend)} spent ${rangeWord}, for ${parts[0]}, ${parts[1]} and ${parts[2]}.`;
  const change = Math.round(((spend - f.previous) / f.previous) * 100);
  const clip = sumOf(days, 'clipart');
  const seo = sumOf(days, 'seopage');
  const ahead = BUDGETS.find((b) => pace(b.spent, b.limit).state === 'ahead');
  const story = [
    `Spend is ${change > 0 ? 'up' : 'down'} ${Math.abs(change)}% from ${range === 7 ? 'last week' : 'the two weeks before'}, mostly clip.art pieces at about ${unitMoney(clip / f.pieces)} each.`,
    `SEOPage.com came in at ${unitMoney(seo / f.pages)} a page.`,
    ahead ? `${ahead.name} is running ahead of its monthly pace.` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return {
    days,
    spend,
    previous: f.previous,
    made: { total: madeTotal, parts },
    approved: f.approved,
    failed: f.failed,
    rejected: f.rejected,
    headline,
    story,
    rangeWord,
    legend: SERIES.map((s) => ({ ...s, value: sumOf(days, s.id) })),
    workers: WORKERS[range],
    byModel: MODELS.map((m) => ({ key: m.key, calls: m.calls[range], cost: spend * m.share })),
  };
}
