// Copied from os.esy.com (src/components/folio/agency/builder2.tsx and
// builderproto.tsx on the proto/page-builder branch, PR #319, 2026-10-04) so
// esy.com/prototypes shows the real builder. Same markup and class names.
// Every client, figure and version here is a sample.

export type Hero = { id: string; v: string; bet: string; h1: string; sub: string; rank?: number; why?: string; fails?: string };
export const CURRENT: Hero = { id: 'h0', v: 'v1', bet: 'Current', h1: 'Roof repair in Denver, done right.', sub: 'Licensed roofers for leaks, storm damage and new roofs across the Denver metro.' };
export const ALTS: Hero[] = [
  { id: 'h1', v: 'v2', bet: 'Answer first', rank: 1, h1: 'Same-day roof leak repair in Denver', sub: 'Most leaks fixed in one visit, from $350. Licensed, insured, and 14 years on Denver roofs.', why: 'Says the search back in the headline, then answers price and timing: the two things a leak search wants to know.' },
  { id: 'h2', v: 'v3', bet: 'Urgency', rank: 2, h1: 'Water coming through the ceiling? We’re out today.', sub: 'Call before 2 pm for a same-day visit anywhere in Denver. We tarp first, then fix.', why: 'The strongest pull to call, but the headline drops “roof leak repair”.', fails: 'Headline doesn’t include the search' },
  { id: 'h3', v: 'v4', bet: 'Proof first', rank: 3, h1: 'Rated 4.9 by 212 Denver homeowners', sub: 'Leak repairs, storm damage and new roofs, with a 10-year workmanship warranty.', why: 'Trust up front, but it doesn’t say what you do until the second line.', fails: 'Search not in the first line' },
];
export const SECTIONS = [
  { id: 'hero', name: 'Hero', v: 'v1', lock: false },
  { id: 'proof', name: 'Proof', v: 'v2', lock: true },
  { id: 'services', name: 'Services', v: 'v1', lock: true },
  { id: 'faq', name: 'Questions', v: 'v3', lock: false },
  { id: 'cta', name: 'Call to action', v: 'v1', lock: false },
];
export const PHONE = '(303) 555-0148';

export const TREE = [
  { id: 'v1', label: 'v1 · First draft', who: 'Made by Esy · Oct 1', state: 'was', depth: 0 },
  { id: 'v2', label: 'v2 · Answer first', who: 'Try 3 more · ranked 1st · kept by Zev Oct 2', state: 'live', depth: 1 },
  { id: 'v2a', label: 'v2.1 · “from $350” first', who: 'Edited from v2 by Zev · not kept', state: 'tried', depth: 2 },
  { id: 'v2b', label: 'v2.2 · + the free roof check', who: 'Try 3 more from v2 · not kept', state: 'tried', depth: 2 },
  { id: 'v3', label: 'v3 · Urgency', who: 'Try 3 more · ranked 2nd · not kept', state: 'tried', depth: 1 },
  { id: 'v4', label: 'v4 · Proof first', who: 'Try 3 more · ranked 3rd · not kept', state: 'tried', depth: 1 },
];

export const SEC_NOTE: Record<string, { note: string; warn?: string }> = {
  hero: { note: 'v2 · 3 of 4 checks', warn: 'Search not in headline' },
  proof: { note: 'v2 · locked by Zev' },
  services: { note: 'v1 · locked by Zev' },
  faq: { note: 'v3 · 4 of 4 checks' },
  cta: { note: 'v1 · 2 of 2 checks' },
};

