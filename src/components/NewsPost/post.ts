/* The one post the /news post-page prototypes render (2026-09-30): Meta's Muse
 * for Small Business, a real story, written in our own words from Meta's
 * announcement (linked as the source). It extends the index's example post
 * (NewsIndex/news-examples.ts) with the parts only a post page shows.
 */
import { NEWS_POSTS, postsFor, type NewsPost } from '@/components/NewsIndex/news-examples';

export interface PostPage extends NewsPost {
  body: string[];
  /** "What happened", as short bullets. */
  happened: string[];
  /** What a reader should check in their own setup. */
  check: string[];
  /** C's key facts. */
  facts: [string, string][];
  /** C's questions, answered in a sentence or two. */
  faq: [string, string][];
}

const base = NEWS_POSTS.find((p) => p.slug === 'meta-muse-for-small-business')!;

export const POST: PostPage = {
  ...base,
  happened: [
    'Meta opened its Muse agent to small businesses in the US and Canada on September 29.',
    'You give it a goal, like finding new customers, and it works across the tools you connect.',
    'It connects to 15 business tools at launch, plus your Facebook and Instagram business accounts.',
    'Nothing publishes, sends or spends until you approve it.',
  ],
  body: [
    'Meta has opened Muse, its AI agent, to small businesses in the US and Canada. You give it a goal, like finding new customers or getting a handle on the month’s spending, and it works through the tools you connect to reach it.',
    'At launch that’s 15 business tools: Shopify, Stripe and QuickBooks for the money; Klaviyo, Canva and Figma for the marketing; Notion, Slack, Asana, Box, Dropbox, Zoom, Granola, HighLevel and Lovable for the rest. Your Facebook and Instagram business accounts plug in too, and custom connectors are supported.',
    'Meta’s examples are the jobs a small team rarely gets to: reading sales, campaign and social data to draft a growth plan; checking how ads and posts performed and drafting the next campaign; flagging emails that need a reply and writing the drafts; spotting unusual expenses in the books.',
    'Everything waits for you. Muse doesn’t publish a post, send an email or spend money until you approve it. Most of it is free, with paid plans for heavier use; Meta hasn’t published prices. It lives in the Muse app, at muse.ai/business.',
    'It’s Meta’s third Muse launch this month. The personal agent came first on September 8, and on September 28 Meta put Muse, its business agent and its APIs into a new unit selling to companies, Meta Enterprise Platform.',
  ],
  check: [
    'Which accounts you connect: each one is data Muse can read.',
    'What Muse drafts on its own and what waits for your approval before it publishes, sends or spends.',
    'If an agency runs your Meta ads, who signs off on the campaigns Muse drafts.',
  ],
  facts: [
    ['What', 'Muse for Small Business, an AI agent from Meta'],
    ['For', 'Small businesses'],
    ['Where', 'US and Canada'],
    ['Price', 'Free for most of it; paid plans, prices not published'],
    ['Connects', '15 tools, Facebook and Instagram business accounts, custom connectors'],
    ['Control', 'Nothing publishes, sends or spends without your approval'],
    ['Announced', 'September 29, 2026'],
    ['Get it', 'The Muse app, at muse.ai/business'],
  ],
  faq: [
    ['Is Muse for Small Business free?', 'Mostly. Meta says most of what businesses need is free, with paid subscription plans for more. It hasn’t published prices.'],
    ['Which tools does it connect to?', 'Asana, Box, Canva, Dropbox, Figma, Granola, HighLevel, Intuit QuickBooks, Klaviyo, Lovable, Notion, Shopify, Slack, Stripe and Zoom, plus Facebook and Instagram business accounts and custom connectors.'],
    ['Can Muse post, email or spend without asking?', 'No. Meta says nothing publishes, sends or spends without your approval.'],
    ['Where is it available?', 'In the US and Canada, in the Muse app.'],
  ],
};

/** The rest of the post's story, newest first (the post itself excluded). */
export const STORY = postsFor(POST.trend, NEWS_POSTS);
export const STORY_OTHERS = STORY.filter((p) => p.slug !== POST.slug);

/** Other recent posts, for "More AI News". */
export const MORE = NEWS_POSTS.filter((p) => p.trend !== POST.trend).slice(0, 4);

/** News article structured data, so search and AI answers read the post right. */
export function articleJsonLd(post: PostPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.headline,
    description: post.dek,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.image ? [post.image] : undefined,
    author: [{ '@type': 'Person', name: 'Zev Uhuru', url: 'https://esy.com/about/' }],
    publisher: { '@type': 'Organization', name: 'Esy', url: 'https://esy.com' },
    isBasedOn: post.source.url,
    about: post.trend,
    articleSection: 'AI News',
  };
}
