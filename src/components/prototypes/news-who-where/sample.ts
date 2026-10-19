/* Who and where on a news post, the reader's side (2026-10-19). One real story
 * from today's Newsroom, Salesforce's $1B investment in Spain: the headline,
 * the company's own post, its date and the dateline (MADRID) are real. The
 * post's wording, the stakeholders beyond Salesforce, the update and the
 * company page's other posts are samples. Shaped like the fields proposed for
 * api.esy.com's news-post spec (Compose docs/plans/2026-10-19-news-who-where.md),
 * the same values Compose's WW1–WW3 edit.
 */
import type { NewsPost, NewsStory } from '@/data/news';

export const STORY: NewsStory = {
  slug: 'salesforce-in-europe',
  name: 'Salesforce in Europe',
  line: 'Salesforce’s investments and hubs across Europe.',
  // Name in type: Salesforce's brand terms haven't been checked (docs/news/README.md).
  company: { name: 'Salesforce' },
};

export const OWN_POST_URL = 'https://salesforce.com/news/press-releases/2026/10/19/1-billion-ai-leadership-investment-spain';

export const POST: NewsPost = {
  slug: 'salesforce-1-billion-spain',
  status: 'published',
  story: STORY.slug,
  chapter: '$1B for Spain',
  topic: 'ai-marketing-tools',
  headline: 'Salesforce Accelerates European AI Leadership with $1 Billion Investment in Spain',
  dek: 'Salesforce will invest $1 billion in Spain over five years. Madrid becomes its hub for EMEA South.',
  why: 'Agencies that build on Salesforce in Spain get a regional hub in Madrid, with more local staff and AI training.',
  take: 'A billion over five years is mostly offices and people, not product. The useful part for an agency is the Madrid hub: more local Salesforce staff to work with on client builds.',
  body: [
    'Salesforce will invest $1 billion in Spain over the next five years, it said in Madrid on October 19.',
    'Madrid becomes the hub for the company’s EMEA South region. Salesforce says the money goes to a larger office presence, customer innovation and AI workforce development across the region.',
    'The announcement doesn’t name new products or prices for Spain.',
  ],
  check: ['If you build on Salesforce for clients in Spain, who your contact at the Madrid hub will be.'],
  facts: [
    ['What', '$1 billion investment in Spain'],
    ['Over', 'Five years'],
    ['Hub', 'Madrid, for EMEA South'],
    ['Announced', 'October 19, 2026'],
  ],
  faq: [],
  sources: [{
    publisher: 'Salesforce News',
    title: 'Salesforce Accelerates European AI Leadership with $1 Billion Investment in Spain',
    url: OWN_POST_URL,
    date: 'October 19, 2026',
    supports: 'Every fact in this post.',
  }],
  card: { title: 'Salesforce: $1B for Spain', facts: ['$1B over five years', 'Madrid hub', 'EMEA South'] },
  eventDate: '2026-10-19',
  publishedAt: '2026-10-19T09:30:00-04:00',
  updatedAt: '2026-10-20T10:15:00-04:00',
  writtenBy: 'zev',
  readMinutes: 2,
};

/* ── Who and where, as Zev kept it ── */

export type Role = 'announcer' | 'partner' | 'investor' | 'customer' | 'regulator' | 'competitor' | 'affected';
export interface Stakeholder { name: string; kind: 'organization' | 'person' | 'government'; role: Role; url: string; sameAs: string[]; slug?: string }

export const ROLE_WORDS: Record<Role, string> = {
  announcer: 'announced it', partner: 'partner', investor: 'investor', customer: 'customer',
  regulator: 'regulator', competitor: 'competitor', affected: 'affected',
};

export const WHO_WHERE = {
  dateline: { city: 'Madrid', country: 'Spain', code: 'ES' },
  places: [
    { name: 'Spain', level: 'country' as const, code: 'ES', slug: 'spain' },
    { name: 'EMEA South', level: 'region' as const, code: '', slug: '' },
  ],
  stakeholders: [
    {
      name: 'Salesforce', kind: 'organization', role: 'announcer', url: 'https://www.salesforce.com', slug: 'salesforce',
      sameAs: ['https://en.wikipedia.org/wiki/Salesforce', 'https://www.linkedin.com/company/salesforce'],
    },
  ] as Stakeholder[],
  /** Who it affects, in readers' words. */
  affects: ['Agencies', 'B2B marketing teams', 'Salesforce customers in EMEA South'],
  rollout: null as null | { status: string; from: string; who: string },
  dates: [
    { label: 'Investment runs to', date: '2031', iso: '2031' },
  ],
  products: [] as { name: string; url: string }[],
  // Sample: what an update reads like once a post changes after it's live.
  updates: [
    { at: '2026-10-20T10:15:00-04:00', label: 'October 20', kind: 'update' as const, text: 'Added that Madrid is the hub for Salesforce’s EMEA South region.' },
  ],
};

/** A company's page on AI Marketing News (R3b): every post naming it, and its role in each.
 *  Only the first is real; the others stand in for later posts. */
export const COMPANY_POSTS = [
  { headline: POST.headline, date: 'Oct 19', role: 'Announced it', href: '/prototypes/news-who-where/linked/' },
  { headline: 'Sample: a later post where Salesforce announced something', date: '—', role: 'Announced it', href: '' },
  { headline: 'Sample: a post that names Salesforce as a partner', date: '—', role: 'Partner', href: '' },
];
