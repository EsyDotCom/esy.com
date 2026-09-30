/* SAMPLE posts for the /news index prototypes (2026-09-30). /news hasn't
 * published anything yet, so nine stand-in posts show how each layout reads
 * when it's full. They use the newsletter's own topics (src/data/topics.ts)
 * and are not real reporting: every layout says so on the page and none of
 * them link anywhere. Swap this for the news publication's articles once it
 * exists in api.esy.com.
 */

export type NewsTopic = 'AI Models' | 'AI Image Generation' | 'AI Coding Tools' | 'Agentic Workflows' | 'SEO';

export interface NewsPost {
  slug: string;
  /** ISO date-time, so the wire can group by day and show the time. */
  publishedAt: string;
  topic: NewsTopic;
  headline: string;
  /** What happened, in one sentence. */
  dek: string;
  /** Why it matters to someone who builds marketing systems. */
  why: string;
  readMinutes: number;
  /** Optional image; round 1's lead and round 2's fronts use it. */
  image?: string;
  /** The trend it belongs to (round 2): posts on one trend are grouped. */
  trend: string;
}

export const SAMPLE_NEWS: NewsPost[] = [
  {
    slug: 'sample-image-model-transparent-backgrounds',
    trend: 'Transparent renders',
    publishedAt: '2026-09-30T14:10:00Z',
    topic: 'AI Image Generation',
    headline: 'Image models are starting to render transparent backgrounds directly',
    dek: 'A cut-out used to take two steps: render the picture, then erase the background. Newer models can do both in one.',
    why: 'Fewer steps per asset means lower cost and fewer ragged edges on product shots and clip art.',
    readMinutes: 3,
    image: '/prototypes/home-clipart/3d.webp',
  },
  {
    slug: 'sample-transparent-hard-cases',
    trend: 'Transparent renders',
    publishedAt: '2026-09-30T12:30:00Z',
    topic: 'AI Image Generation',
    headline: 'Hair and glass still trip up one-step cut-outs',
    dek: 'Fine edges and see-through objects come back with halos more often than solid shapes do.',
    why: 'Keep the old erase step as a fallback for the hard cases instead of dropping it.',
    readMinutes: 2,
    image: '/prototypes/home-clipart/outline.webp',
  },
  {
    slug: 'sample-transparent-cost',
    trend: 'Transparent renders',
    publishedAt: '2026-09-30T10:05:00Z',
    topic: 'AI Image Generation',
    headline: 'What a one-step cut-out saves per image',
    dek: 'Dropping the erase step removes a model call from every asset.',
    why: 'At a few hundred assets a day, the saving shows up in the monthly bill.',
    readMinutes: 2,
  },
  {
    slug: 'sample-coding-agent-long-runs',
    trend: 'Long-running agents',
    image: '/images/articles/how-we-made-our-explainer-video-in-code/builder-score.jpg',
    publishedAt: '2026-09-30T09:30:00Z',
    topic: 'AI Coding Tools',
    headline: 'Coding agents can now work for hours on one task',
    dek: 'Longer runs mean an agent can build a whole landing page, test it and fix it before a person looks.',
    why: 'The review step matters more than ever: budget caps and checks decide whether a long run is worth it.',
    readMinutes: 4,
  },
  {
    slug: 'sample-ai-answers-cite-local-pages',
    trend: 'Cited by AI',
    image: '/images/seopage/nora-proud.webp',
    publishedAt: '2026-09-29T16:45:00Z',
    topic: 'SEO',
    headline: 'AI answers lean on pages that state plain facts',
    dek: 'Pages with clear prices, service areas and hours get quoted more often when people ask an assistant for a recommendation.',
    why: 'For local businesses, being cited by AI is starting to matter as much as ranking.',
    readMinutes: 5,
  },
  {
    slug: 'sample-model-pinning',
    trend: 'Model pinning',
    image: '/prototypes/home-clipart/flat.webp',
    publishedAt: '2026-09-29T11:00:00Z',
    topic: 'AI Models',
    headline: 'Why you should pin the exact model version in batch work',
    dek: 'A model name without a date can quietly change underneath you, and a thousand images drift in style overnight.',
    why: 'Pinning a dated version keeps a catalog consistent and makes a bad batch easy to trace.',
    readMinutes: 3,
  },
  {
    slug: 'sample-agent-review-step',
    trend: 'Long-running agents',
    publishedAt: '2026-09-28T15:20:00Z',
    topic: 'Agentic Workflows',
    headline: 'The review step is where agent workflows earn their keep',
    dek: 'A second model checking the first catches most defects before a person has to.',
    why: 'Checks are cheap next to a customer finding the mistake.',
    readMinutes: 4,
  },
  {
    slug: 'sample-video-in-code',
    trend: 'Video in code',
    image: '/images/articles/how-we-made-our-explainer-video-in-code/hook.jpg',
    publishedAt: '2026-09-27T13:00:00Z',
    topic: 'AI Coding Tools',
    headline: 'Explainer videos built in code are getting practical',
    dek: 'With a code-based video tool and generated voice, one person can cut an explainer in a working session.',
    why: 'The real product can be the demo, and every cut comes from one timeline.',
    readMinutes: 6,
  },
  {
    slug: 'sample-style-references',
    trend: 'On-brand images',
    image: '/prototypes/home-clipart/watercolor.webp',
    publishedAt: '2026-09-26T10:15:00Z',
    topic: 'AI Image Generation',
    headline: 'Style references beat long prompts for on-brand images',
    dek: 'One reference image holds a look steadier than a paragraph describing it.',
    why: 'Brands can keep a consistent look across hundreds of images without writing longer prompts.',
    readMinutes: 3,
  },
  {
    slug: 'sample-programmatic-seo-quality',
    trend: 'Cited by AI',
    image: '/images/seopage/svc-leak.webp',
    publishedAt: '2026-09-25T17:40:00Z',
    topic: 'SEO',
    headline: 'Programmatic SEO still works when every page earns its place',
    dek: 'Thousands of pages can rank, as long as each one answers a real question better than a template would.',
    why: 'Scale is fine; thin pages are the risk.',
    readMinutes: 5,
  },
  {
    slug: 'sample-cost-per-asset',
    trend: 'Long-running agents',
    publishedAt: '2026-09-24T12:00:00Z',
    topic: 'Agentic Workflows',
    headline: 'Tracking cost per asset changes which workflows you keep',
    dek: 'When every run records what it cost, the expensive steps show up fast.',
    why: 'You cut the steps that cost the most and add the least.',
    readMinutes: 4,
  },
];

export const NEWS_TOPICS: NewsTopic[] = ['AI Models', 'AI Image Generation', 'AI Coding Tools', 'Agentic Workflows', 'SEO'];

/** "Sep 30", "Sep 29"… for grouping and datelines. */
export function dayLabel(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'America/New_York' });
}

/** "10:10 AM" in New York time. */
export function timeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' });
}

/** Posts grouped by day, newest first, for the wire. */
export function byDay(posts: NewsPost[]) {
  const days: { day: string; posts: NewsPost[] }[] = [];
  for (const p of posts) {
    const day = dayLabel(p.publishedAt);
    const last = days[days.length - 1];
    if (last?.day === day) last.posts.push(p);
    else days.push({ day, posts: [p] });
  }
  return days;
}

/* Round 2 · trends. Each is a label, a one-line read on why it's moving,
 * and a heat score for the trending bar (samples, like the posts). */
export interface NewsTrend {
  name: string;
  line: string;
  heat: number;
}

export const SAMPLE_TRENDS: NewsTrend[] = [
  { name: 'Transparent renders', line: 'Cut-outs in one step instead of two.', heat: 92 },
  { name: 'Long-running agents', line: 'Agents that build, test and fix for hours.', heat: 81 },
  { name: 'Cited by AI', line: 'Getting quoted when people ask an assistant.', heat: 74 },
  { name: 'On-brand images', line: 'One reference image instead of a long prompt.', heat: 61 },
  { name: 'Video in code', line: 'Explainers cut by one person in a session.', heat: 52 },
  { name: 'Model pinning', line: 'Dated model versions for batch work.', heat: 38 },
];

/** A trend's posts, newest first. */
export function postsFor(trend: string, posts: NewsPost[]) {
  return posts.filter((p) => p.trend === trend);
}

/* Round 2 · F: the developing story's updates, newest first (samples). */
export const SAMPLE_UPDATES: { at: string; text: string }[] = [
  { at: '2026-09-30T14:10:00Z', text: 'Tested on 40 clip art prompts: 36 came back with clean edges and no halo, no erase step needed.' },
  { at: '2026-09-30T12:30:00Z', text: 'Hair and glass are still the hard cases. The old erase step is the better fallback there.' },
  { at: '2026-09-30T10:05:00Z', text: 'Cost per cut-out drops by roughly a third when the erase step goes away.' },
  { at: '2026-09-30T08:40:00Z', text: 'First reports: newer image models return a transparent background when asked for one.' },
];

/** "2h ago" from the newest post, so the sample reads the same any day. */
export function agoFrom(iso: string, now: string) {
  const mins = Math.max(0, Math.round((Date.parse(now) - Date.parse(iso)) / 60000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (mins < 60 * 24) return `${Math.round(mins / 60)}h ago`;
  return `${Math.round(mins / 60 / 24)}d ago`;
}
