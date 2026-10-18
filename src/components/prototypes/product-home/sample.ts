// Sample data for the product-homepage prototypes (2026-10-18). Copied from
// os.esy.com src/components/folio/agency/productproto-data.ts and
// search3-data.ts (main, 2026-10-18) with the numbers resolved, so these pages
// show the same sample week the os.esy.com sign-in and /agency Search pages do.
// Every client, query and count here is a sample, and every take says so.
//
// AI answers follow what os.esy.com's real "AI answers panel" source does:
// ChatGPT and Perplexity are asked 12 questions per client, 3 runs a week,
// through their APIs; Copilot's citations come from Bing's weekly export;
// Google's AI answers come from Search Console's AI report. Never Gemini: its
// terms forbid analysing its answers.

import type { ClientId } from './clients';

export type Engine = 'ChatGPT' | 'Perplexity' | 'Copilot' | 'Google AI Overviews';

export const CHECKS = { questions: 12, runs: 3 };
export const ANSWERS_SEEN = CHECKS.questions * CHECKS.runs;

/** Where an answer named or quoted a client's page this week. */
export const CITATIONS: { client: ClientId; site: string; q: string; engine: Engine }[] = [
  { client: 'fernvale', site: 'fernvaleair.com', q: 'emergency AC repair near me', engine: 'Perplexity' },
  { client: 'copperline', site: 'copperlineroofs.com', q: 'roof leak repair cost', engine: 'ChatGPT' },
  { client: 'juniper', site: 'juniperlanedental.com', q: 'same-day dental crown', engine: 'Google AI Overviews' },
  { client: 'copperline', site: 'copperlineroofs.com', q: 'hail damage roof inspection', engine: 'Copilot' },
];

/** Answers that named a client, per engine, this week (sums to CITED). */
export const BY_ENGINE: { engine: Engine; n: number }[] = [
  { engine: 'ChatGPT', n: 6 },
  { engine: 'Perplexity', n: 5 },
  { engine: 'Copilot', n: 2 },
  { engine: 'Google AI Overviews', n: 1 },
];
export const CITED = BY_ENGINE.reduce((s, e) => s + e.n, 0);
// Weekly answers that named a client, last 8 weeks (ends on CITED).
export const CITED_WEEKS = [3, 4, 4, 6, 7, 9, 11, CITED];

/** Rankings by client: classic positions and the share of AI answers that name them. */
export const CLIENT_RANKS: { client: ClientId; google: number; bing: number; aiShare: number; trend: number[] }[] = [
  { client: 'fernvale', google: 4, bing: 2, aiShare: 47, trend: [11, 10, 9, 8, 6, 6, 5, 4] },
  { client: 'copperline', google: 7, bing: 3, aiShare: 42, trend: [19, 17, 15, 14, 12, 10, 9, 7] },
  { client: 'juniper', google: 12, bing: 9, aiShare: 8, trend: [24, 22, 21, 18, 16, 15, 13, 12] },
  { client: 'halloway', google: 9, bing: 6, aiShare: 21, trend: [16, 15, 15, 13, 12, 11, 10, 9] },
];

/** Analytics: Search Console + Bing clicks and impressions, GA4's visits from AI answers. */
export const DATA = {
  clicks: 1840 + 96,
  impressions: 61200 + 4100,
  aiVisits: 23,
  clickWeeks: [27, 41, 49, 52, 55, 58, 71, 76, 79, 84],
};
export const CONNECTED: { name: string; fresh: string }[] = [
  { name: 'Google Search Console', fresh: 'through Mon Oct 5' },
  { name: 'Google Analytics 4', fresh: '1 h ago' },
  { name: 'Bing Webmaster Tools', fresh: 'through Tue Oct 6' },
];

/** The work behind the numbers: os.esy.com Work and Outreach, this week. */
export const WORK = { approved: 3, waiting: 2, replies: 4 };
export const WORK_ROWS: { client: ClientId; what: string; state: 'approved' | 'waiting' | 'reply' }[] = [
  { client: 'fernvale', what: 'Emergency AC repair in Boise: page live', state: 'approved' },
  { client: 'copperline', what: 'Hail damage inspection: draft for your OK', state: 'waiting' },
  { client: 'juniper', what: 'Local dental guide replied to your note', state: 'reply' },
];

export const SAMPLE_NOTE = 'Product shots use sample clients and numbers.';
export const n = (v: number) => v.toLocaleString('en-US');

/** Real, checkable facts about Esy's own brands (esy.com issues.ts, README). */
export const PROOF = [
  { big: '#1', line: 'clip.art on Google for “AI clipart”', small: 'Our own brand, run on the same system.' },
  { big: '30,000+', line: 'pages published by clip.art', small: 'Written by a system, reviewed by a person.' },
  { big: 'SEOPage', line: 'pages for local service businesses', small: 'The same engine, sold to roofers and HVAC companies.' },
];
