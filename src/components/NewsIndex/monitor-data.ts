/* Data for the /news round 4 monitors (2026-09-30). Nothing here is typed in
 * from memory:
 *
 *   ESY_COSTS      — a snapshot of api.esy.com GET /v1/runs?status=completed,
 *                    the 8,000 newest completed runs (Sep 8–29, 2026), median
 *                    recorded cost per workflow, overall and per week.
 *   GOOGLE_UPDATES — Google's ranking updates this year, from the Search
 *                    Status Dashboard's ranking history.
 *   CHANGES        — what changed on each platform, one entry per real story
 *                    in news-examples.ts (linked by slug).
 */

/* ── N · Esy cost index ── */
export const COSTS_SNAPSHOT = {
  from: 'Sep 8',
  to: 'Sep 29',
  runs: 8000,
  weeks: ['Sep 8', 'Sep 15', 'Sep 22', 'Sep 29'],
};

export interface CostRow {
  id: string;
  /** What you get, in plain words. */
  name: string;
  kind: 'Image' | 'Video' | 'Planning' | 'SEO';
  runs: number;
  median: number;
  /** Weekly medians; null where the workflow didn't run that week. */
  weekly: (number | null)[];
  weeklyRuns: number[];
}

export const ESY_COSTS: CostRow[] = [
  { id: 'generate-coloring-page', name: 'Coloring page', kind: 'Image', runs: 427, median: 0.0059, weekly: [0.0059, 0.0137, null, null], weeklyRuns: [401, 26, 0, 0] },
  { id: 'generate-clip-art-asset-v2', name: 'Clip art image', kind: 'Image', runs: 4801, median: 0.0095, weekly: [0.0096, 0.0092, 0.0098, 0.0162], weeklyRuns: [3626, 928, 236, 11] },
  { id: 'generate-illustration', name: 'Illustration', kind: 'Image', runs: 373, median: 0.0165, weekly: [0.0138, 0.0166, 0.0166, 0.0166], weeklyRuns: [145, 42, 184, 2] },
  { id: 'generate-pack-cover', name: 'Pack cover', kind: 'Image', runs: 134, median: 0.0539, weekly: [0.0539, 0.0539, 0.0538, null], weeklyRuns: [108, 16, 10, 0] },
  { id: 'generate-photoreal-image', name: 'Photoreal image', kind: 'Image', runs: 98, median: 0.2099, weekly: [null, 0.108, 0.2102, null], weeklyRuns: [0, 3, 95, 0] },
  { id: 'generate-photoreal-video', name: 'Photoreal video shot', kind: 'Video', runs: 5, median: 0.5277, weekly: [null, null, 0.5277, null], weeklyRuns: [0, 0, 5, 0] },
  { id: 'animate-character', name: 'Character animation', kind: 'Video', runs: 12, median: 1.5323, weekly: [null, null, 1.5323, null], weeklyRuns: [0, 0, 12, 0] },
  { id: 'plan-clipart-pack', name: 'Plan a 25-piece pack', kind: 'Planning', runs: 139, median: 0.5952, weekly: [0.6163, 0.2943, 0.294, null], weeklyRuns: [103, 26, 10, 0] },
  { id: 'generate-seo-research', name: 'SEO keyword research', kind: 'SEO', runs: 6, median: 0.1678, weekly: [null, 0.1667, 0.1689, null], weeklyRuns: [0, 1, 5, 0] },
  { id: 'generate-seo-landing-page-v3', name: 'SEO landing page', kind: 'SEO', runs: 3, median: 4.0511, weekly: [null, 4.4867, 3.983, null], weeklyRuns: [0, 1, 2, 0] },
];

/** "$0.0095" under a cent, "$0.014" under ten cents, "$0.21" and "$4.05" above. */
export function usd(n: number) {
  if (n < 0.01) return `$${n.toFixed(4)}`;
  if (n < 0.1) return `$${n.toFixed(3)}`;
  return `$${n.toFixed(2)}`;
}

/** First and last weeks with enough runs (5+) to compare, and the change. */
export function costMove(row: CostRow) {
  const pts = row.weekly
    .map((v, i) => ({ v, n: row.weeklyRuns[i], i }))
    .filter((p): p is { v: number; n: number; i: number } => p.v !== null && p.n >= 5);
  if (pts.length < 2) return null;
  const a = pts[0];
  const b = pts[pts.length - 1];
  return { from: a.v, to: b.v, pct: Math.round(((b.v - a.v) / a.v) * 100), fromWeek: a.i, toWeek: b.i };
}

/* ── L · Rollout tracker ── */
export interface GoogleUpdate {
  name: string;
  kind: 'Core' | 'Spam';
  start: string;
  /** Null while it's still rolling out. */
  end: string | null;
  /** Google's stated maximum, for one still rolling out. */
  upTo?: string;
}

export const GOOGLE_UPDATES_SOURCE = {
  name: 'Google Search Status Dashboard',
  url: 'https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history',
};

export const GOOGLE_UPDATES: GoogleUpdate[] = [
  { name: 'March 2026 spam update', kind: 'Spam', start: '2026-03-24', end: '2026-03-25' },
  { name: 'March 2026 core update', kind: 'Core', start: '2026-03-27', end: '2026-04-08' },
  { name: 'May 2026 core update', kind: 'Core', start: '2026-05-21', end: '2026-06-02' },
  { name: 'June 2026 spam update', kind: 'Spam', start: '2026-06-24', end: '2026-06-26' },
  { name: 'August 2026 spam update', kind: 'Spam', start: '2026-08-18', end: '2026-08-21' },
  { name: 'September 2026 spam update', kind: 'Spam', start: '2026-09-24', end: null, upTo: '2026-10-08' },
];

/** Whole days between two YYYY-MM-DD dates. */
export function daysBetween(a: string, b: string) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);
}

/* ── M · Change board ── */
export const PLATFORMS = ['Google Ads', 'Google Search', 'Meta', 'ChatGPT Ads', 'HubSpot'] as const;
export const AREAS = ['Reach', 'Creative', 'Shopping', 'Measurement', 'AI & agents'] as const;
export type Platform = (typeof PLATFORMS)[number];
export type Area = (typeof AREAS)[number];

export interface Change {
  platform: Platform;
  area: Area;
  date: string;
  /** What changed, in a few words. */
  what: string;
  /** What to check in your own account. */
  check: string;
  /** The post that covers it (news-examples.ts). */
  post: string;
}

export const CHANGES: Change[] = [
  { platform: 'Google Ads', area: 'Reach', date: '2026-09-01', what: 'Search campaigns moved to AI Max search term matching', check: 'Search terms report: new queries you didn’t bid on', post: 'google-ai-max-auto-upgrade' },
  { platform: 'Google Ads', area: 'Creative', date: '2026-09-01', what: 'AI writes headlines and picks landing pages', check: 'Asset report: which headlines Google wrote', post: 'google-ai-max-three-switches' },
  { platform: 'Google Search', area: 'Reach', date: '2026-09-24', what: 'September spam update rolling out', check: 'Rankings through early October', post: 'google-september-2026-spam-update' },
  { platform: 'Google Search', area: 'Measurement', date: '2026-09-26', what: 'Lens and Circle to Search traffic in Search Console', check: 'Performance report: the multimodal filter', post: 'search-console-multimodal-filter' },
  { platform: 'Google Search', area: 'AI & agents', date: '2026-09-14', what: 'Pilot pays publishers whose pages shape AI answers', check: 'Search Console: an invite to the AI contribution pilot', post: 'google-ai-contribution-pilot' },
  { platform: 'Meta', area: 'AI & agents', date: '2026-09-29', what: 'Muse for Small Business connects your tools', check: 'What Muse can publish or spend before you approve', post: 'meta-muse-for-small-business' },
  { platform: 'Meta', area: 'Shopping', date: '2026-09-29', what: 'Muse reads your Shopify store and Klaviyo list', check: 'Which accounts you connect', post: 'meta-muse-for-small-business' },
  { platform: 'ChatGPT Ads', area: 'Shopping', date: '2026-09-23', what: 'Shopify app live in 30+ markets; feeds required', check: 'Is your product feed connected?', post: 'chatgpt-ads-shopify-global' },
  { platform: 'ChatGPT Ads', area: 'Reach', date: '2026-09-04', what: 'Ads open in 30+ more countries', check: 'Country targeting on live campaigns', post: 'chatgpt-ads-product-feeds' },
  { platform: 'ChatGPT Ads', area: 'Creative', date: '2026-09-16', what: 'Sponsored Agents: ads that answer questions', check: 'What your agent is allowed to say', post: 'chatgpt-sponsored-agents' },
  { platform: 'ChatGPT Ads', area: 'Measurement', date: '2026-09-23', what: 'Leads flow into HubSpot', check: 'Lead source in your CRM', post: 'chatgpt-ads-shopify-global' },
  { platform: 'HubSpot', area: 'AI & agents', date: '2026-09-17', what: 'Campaign, Content and Nurture agents', check: 'Credits each agent spends', post: 'hubspot-unbound-2026' },
  { platform: 'HubSpot', area: 'Measurement', date: '2026-09-17', what: 'AEO finds where AI answers skip you', check: 'Citation gaps for your top pages', post: 'hubspot-unbound-2026' },
];

/** The newest change for one cell, if any. */
export function cell(platform: Platform, area: Area) {
  return CHANGES.filter((c) => c.platform === platform && c.area === area).sort((a, b) => b.date.localeCompare(a.date))[0];
}
