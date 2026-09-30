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
  /** Optional lead image; only the front page's lead story uses one. */
  image?: string;
}

export const SAMPLE_NEWS: NewsPost[] = [
  {
    slug: 'sample-image-model-transparent-backgrounds',
    publishedAt: '2026-09-30T14:10:00Z',
    topic: 'AI Image Generation',
    headline: 'Image models are starting to render transparent backgrounds directly',
    dek: 'A cut-out used to take two steps: render the picture, then erase the background. Newer models can do both in one.',
    why: 'Fewer steps per asset means lower cost and fewer ragged edges on product shots and clip art.',
    readMinutes: 3,
    image: '/prototypes/home-clipart/3d.webp',
  },
  {
    slug: 'sample-coding-agent-long-runs',
    publishedAt: '2026-09-30T09:30:00Z',
    topic: 'AI Coding Tools',
    headline: 'Coding agents can now work for hours on one task',
    dek: 'Longer runs mean an agent can build a whole landing page, test it and fix it before a person looks.',
    why: 'The review step matters more than ever: budget caps and checks decide whether a long run is worth it.',
    readMinutes: 4,
  },
  {
    slug: 'sample-ai-answers-cite-local-pages',
    publishedAt: '2026-09-29T16:45:00Z',
    topic: 'SEO',
    headline: 'AI answers lean on pages that state plain facts',
    dek: 'Pages with clear prices, service areas and hours get quoted more often when people ask an assistant for a recommendation.',
    why: 'For local businesses, being cited by AI is starting to matter as much as ranking.',
    readMinutes: 5,
  },
  {
    slug: 'sample-model-pinning',
    publishedAt: '2026-09-29T11:00:00Z',
    topic: 'AI Models',
    headline: 'Why you should pin the exact model version in batch work',
    dek: 'A model name without a date can quietly change underneath you, and a thousand images drift in style overnight.',
    why: 'Pinning a dated version keeps a catalog consistent and makes a bad batch easy to trace.',
    readMinutes: 3,
  },
  {
    slug: 'sample-agent-review-step',
    publishedAt: '2026-09-28T15:20:00Z',
    topic: 'Agentic Workflows',
    headline: 'The review step is where agent workflows earn their keep',
    dek: 'A second model checking the first catches most defects before a person has to.',
    why: 'Checks are cheap next to a customer finding the mistake.',
    readMinutes: 4,
  },
  {
    slug: 'sample-video-in-code',
    publishedAt: '2026-09-27T13:00:00Z',
    topic: 'AI Coding Tools',
    headline: 'Explainer videos built in code are getting practical',
    dek: 'With a code-based video tool and generated voice, one person can cut an explainer in a working session.',
    why: 'The real product can be the demo, and every cut comes from one timeline.',
    readMinutes: 6,
  },
  {
    slug: 'sample-style-references',
    publishedAt: '2026-09-26T10:15:00Z',
    topic: 'AI Image Generation',
    headline: 'Style references beat long prompts for on-brand images',
    dek: 'One reference image holds a look steadier than a paragraph describing it.',
    why: 'Brands can keep a consistent look across hundreds of images without writing longer prompts.',
    readMinutes: 3,
  },
  {
    slug: 'sample-programmatic-seo-quality',
    publishedAt: '2026-09-25T17:40:00Z',
    topic: 'SEO',
    headline: 'Programmatic SEO still works when every page earns its place',
    dek: 'Thousands of pages can rank, as long as each one answers a real question better than a template would.',
    why: 'Scale is fine; thin pages are the risk.',
    readMinutes: 5,
  },
  {
    slug: 'sample-cost-per-asset',
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
