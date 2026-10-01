/* Example posts for the /news (AI Marketing News) prototypes, rebuilt 2026-09-30 from
 * real stories: AI as it hits marketing in September 2026 (ads, SEO, social,
 * ad creative, the tools marketers use, and models where they change the
 * work). Each is rewritten in our own words from its source, which it links.
 * Images are the companies' own share images, credited on the page; stories
 * without one render without an image. /news hasn't published yet, so the
 * pages say these are examples.
 *
 * Trends are the stories themselves (Meta Muse, ChatGPT Ads…), not themes.
 * Their heat is derived from the posts, never typed in.
 */

export type NewsTopic = 'Ads' | 'SEO' | 'Social' | 'Creative' | 'Marketing Tools' | 'AI Models';

/* What kind of post it is, so a post about last week's news never reads as
 * breaking: Breaking (same day), Tested (I ran it), Follow-up (what changed
 * since), How-to (use it in your system), Explainer (evergreen), Take (my read
 * on where it's going). */
export type NewsLabel = 'Breaking' | 'Tested' | 'Follow-up' | 'How-to' | 'Explainer' | 'Take';

export interface NewsPost {
  slug: string;
  /** ISO date-time, so the wire can group by day and show the time. */
  publishedAt: string;
  topic: NewsTopic;
  /** The story it belongs to; posts on one story are grouped. */
  trend: string;
  label: NewsLabel;
  headline: string;
  /** What happened, in one or two sentences. */
  dek: string;
  /** Why it matters to someone who builds marketing systems. */
  why: string;
  readMinutes: number;
  /** Where the facts come from. */
  source: { name: string; url: string };
  /** The company's own share image, when it has one. */
  image?: string;
  imageCredit?: string;
}

const META = (path: string) => `https://about.fb.com/news/2026/${path}`;

// Newest first.
export const NEWS_POSTS: NewsPost[] = [
  {
    slug: 'meta-muse-for-small-business',
    publishedAt: '2026-09-29T09:30:00Z',
    topic: 'Social',
    trend: 'Meta Muse',
    label: 'Breaking',
    headline: 'Meta’s Muse agent comes to small businesses, with Shopify, Klaviyo and Canva plugged in',
    dek: 'Give Muse a goal like finding new customers and it works across the tools you connect: Shopify, Klaviyo, Canva, Stripe, Slack and your Facebook and Instagram business accounts.',
    why: 'An agent that sees your store, your email list and your creative tools at once. Nothing publishes, sends or spends without your approval, and most of it is free.',
    readMinutes: 3,
    source: { name: 'Meta Newsroom', url: META('09/introducing-muse-small-business/') },
    image: 'https://about.fb.com/wp-content/uploads/2026/09/The-Future-Is-for-Everyone_Muse-for-Small-Business_Social-Share.png?w=1200',
    imageCredit: 'Meta',
  },
  {
    slug: 'openai-devday-2026',
    publishedAt: '2026-09-29T17:00:00Z',
    topic: 'AI Models',
    trend: 'OpenAI DevDay',
    label: 'Breaking',
    headline: 'OpenAI DevDay: always-on “dots” agents and a cheaper GPT-6.1 Sol',
    dek: 'Dots are agents that live inside ChatGPT and keep working toward a goal in the background. GPT-6.1 Sol arrives a week after GPT-6 Sol as the lower-cost model.',
    why: 'Background agents are where campaign work is heading: research, reporting and follow-ups that run without a prompt.',
    readMinutes: 4,
    source: { name: 'OpenAI', url: 'https://openai.com/index/devday-2026-recap/' },
  },
  {
    slug: 'meta-enterprise-platform',
    publishedAt: '2026-09-28T12:36:00Z',
    topic: 'Marketing Tools',
    trend: 'Meta Muse',
    label: 'Breaking',
    headline: 'Meta starts selling its AI to businesses as Meta Enterprise Platform',
    dek: 'The new unit packages the Muse agent, Meta Business Agent, the Muse API and Muse Code for companies and developers.',
    why: 'The models behind Meta’s ad tools become something your own tools can call, not just Ads Manager.',
    readMinutes: 2,
    source: { name: 'Meta Newsroom', url: META('09/launching-meta-enterprise-platform/') },
    image: 'https://about.fb.com/wp-content/uploads/2026/09/Meta_Header.jpg?w=1200',
    imageCredit: 'Meta',
  },
  {
    slug: 'claude-sonnet-5-5',
    publishedAt: '2026-09-28T16:00:00Z',
    topic: 'AI Models',
    trend: 'Claude 5.5',
    label: 'Breaking',
    headline: 'Claude Sonnet 5.5: 30% faster at the same price, and better at docs and slides',
    dek: 'Anthropic’s second Claude 5.5 model keeps Sonnet’s $2 in and $10 out per million tokens and uses fewer tokens for the same work.',
    why: 'Content and reporting pipelines get faster runs for the same budget, and it’s strongest at the polished documents and decks marketing teams ship.',
    readMinutes: 3,
    source: { name: 'Anthropic', url: 'https://www.anthropic.com/claude-sonnet-5-5' },
    image: 'https://www-cdn.anthropic.com/images/4zrzovbb/website/eaa6046f4ae8c88e368c3c530c4c1312f7ff6f2e-1200x630.jpg',
    imageCredit: 'Anthropic',
  },
  {
    slug: 'elevenlabs-v4',
    publishedAt: '2026-09-28T14:00:00Z',
    topic: 'Creative',
    trend: 'ElevenLabs v4',
    label: 'Breaking',
    headline: 'ElevenLabs v4 clones a voice from 10 seconds of audio, in 90+ languages',
    dek: 'Eleven v4 adds inline tags for emotion, pacing and tone. v4 Turbo answers in about 100 ms for voice agents. Both work on the free tier.',
    why: 'Voiceover for ads and explainers gets cheaper to localize: one script, dozens of languages, the same voice.',
    readMinutes: 3,
    source: { name: 'ElevenLabs', url: 'https://elevenlabs.io/blog/eleven-v4' },
    image: 'https://eleven-public-cdn.elevenlabs.io/payloadcms/3o2hqbr4pb7-1920x1080.webp',
    imageCredit: 'ElevenLabs',
  },
  {
    slug: 'search-console-multimodal-filter',
    publishedAt: '2026-09-26T12:00:00Z',
    topic: 'SEO',
    trend: 'Google Search',
    label: 'Breaking',
    headline: 'Search Console now shows traffic from Google Lens and Circle to Search',
    dek: 'A new multimodal filter in the Performance report counts searches made with images: Lens, Circle to Search, image uploads and Chrome’s “Search this image”. There’s no query data, since most start from a picture.',
    why: 'Product images are a search surface now, and you can finally see whether yours bring traffic.',
    readMinutes: 2,
    source: { name: 'Search Engine Journal', url: 'https://www.searchenginejournal.com/seo-pulse-google-spam-update-image-search-data/590882/' },
  },
  {
    slug: 'google-september-2026-spam-update',
    publishedAt: '2026-09-24T16:15:00Z',
    topic: 'SEO',
    trend: 'Google Search',
    label: 'Breaking',
    headline: 'Google’s September 2026 spam update is rolling out',
    dek: 'It started September 24 and can take up to two weeks, worldwide and in all languages. It’s the fourth spam update this year.',
    why: 'If you publish pages at scale, watch rankings through early October before changing anything.',
    readMinutes: 2,
    source: { name: 'Google Search Status Dashboard', url: 'https://status.search.google.com/' },
  },
  {
    slug: 'chatgpt-ads-shopify-global',
    publishedAt: '2026-09-23T15:00:00Z',
    topic: 'Ads',
    trend: 'ChatGPT Ads',
    label: 'Follow-up',
    headline: 'ChatGPT Ads’ Shopify app goes global, and HubSpot plugs in',
    dek: 'Stores in Europe, Asia-Pacific, the Middle East and North Africa can now install the app and run campaigns. HubSpot’s integration went live worldwide the same day.',
    why: 'Leads from ChatGPT ads can land straight in your CRM, so you can see what they’re worth.',
    readMinutes: 2,
    source: { name: 'Common Thread Collective', url: 'https://commonthreadco.com/blogs/coachs-corner/every-chatgpt-ads-update-in-2026-updated-weekly' },
  },
  {
    slug: 'hubspot-unbound-2026',
    publishedAt: '2026-09-17T15:00:00Z',
    topic: 'Marketing Tools',
    trend: 'HubSpot UNBOUND',
    label: 'Breaking',
    headline: 'HubSpot rebuilds Marketing Hub around agents at UNBOUND',
    dek: 'Marketing Studio 2.0 adds Campaign, Content and Nurture agents. A new AEO tool finds where AI answers don’t cite you, then plans content to close the gap.',
    why: 'Answer engine optimization is now a line item in a mainstream CRM, priced in credits per plan, piece and email.',
    readMinutes: 4,
    source: { name: 'HubSpot', url: 'https://www.hubspot.com/spotlight' },
    image: 'https://www.hubspot.com/hubfs/F26_Spotlight_ShareCard.png',
    imageCredit: 'HubSpot',
  },
  {
    slug: 'chatgpt-sponsored-agents',
    publishedAt: '2026-09-16T15:00:00Z',
    topic: 'Ads',
    trend: 'ChatGPT Ads',
    label: 'Breaking',
    headline: 'Brands can now run their own agents inside ChatGPT as Sponsored Agents',
    dek: 'OpenAI also shipped a Shopify App Store integration that syncs US merchants’ catalogs into ChatGPT Ads automatically.',
    why: 'An ad that talks back: your agent answers the shopper’s questions in the conversation instead of sending them to a landing page.',
    readMinutes: 3,
    source: { name: 'Common Thread Collective', url: 'https://commonthreadco.com/blogs/coachs-corner/every-chatgpt-ads-update-in-2026-updated-weekly' },
  },
  {
    slug: 'google-ai-contribution-pilot',
    publishedAt: '2026-09-14T11:13:00Z',
    topic: 'SEO',
    trend: 'Google Search',
    label: 'Breaking',
    headline: 'Google is testing paying publishers when their pages shape AI answers',
    dek: 'Invited sites see an AI earnings figure in Search Console when their content contributes significantly to answers in Gemini, AI Overviews or AI Mode.',
    why: 'Being the source an answer is built from starts to have a price. Being a link in the answer doesn’t count.',
    readMinutes: 3,
    source: { name: 'Search Engine Roundtable', url: 'https://www.seroundtable.com/google-al-contribution-pilot-42076.html' },
  },
  {
    slug: 'chatgpt-ads-costs',
    publishedAt: '2026-09-09T14:00:00Z',
    topic: 'Ads',
    trend: 'ChatGPT Ads',
    label: 'Follow-up',
    headline: 'Six months in, ChatGPT ad costs are all over the map',
    dek: 'Some advertisers report clicks under $3; others pay $10 to $13. There are no shared benchmarks yet.',
    why: 'Start with a small test budget and your own conversion tracking; there’s no average to plan against.',
    readMinutes: 3,
    source: { name: 'MediaPost', url: 'https://www.mediapost.com/publications/article/417746/chatgpt-ad-results-are-not-yet-clear.html' },
  },
  {
    slug: 'meta-muse-launch',
    publishedAt: '2026-09-08T19:00:00Z',
    topic: 'Social',
    trend: 'Meta Muse',
    label: 'Breaking',
    headline: 'Meta launches Muse, a personal AI agent',
    dek: 'Muse is a private personal agent that works toward goals you set and suggests ideas on its own.',
    why: 'Meta’s ad tools run on the same model family, including Muse Image, which is coming to Advantage+ creative.',
    readMinutes: 3,
    source: { name: 'Meta Newsroom', url: META('09/introducing-muse-personal-ai-agent/') },
    image: 'https://about.fb.com/wp-content/uploads/2026/09/Introducing-Muse_-Personal-AI-Agent_SocialShare.jpg?w=1200',
    imageCredit: 'Meta',
  },
  {
    slug: 'chatgpt-ads-product-feeds',
    publishedAt: '2026-09-04T15:00:00Z',
    topic: 'Ads',
    trend: 'ChatGPT Ads',
    label: 'Breaking',
    headline: 'ChatGPT shopping results now require a product feed',
    dek: 'Without a connected feed, your products don’t show in ChatGPT shopping results, whatever you spend. ChatGPT Ads also opened in 30+ more countries.',
    why: 'A connected feed is now the minimum for selling in ChatGPT.',
    readMinutes: 2,
    source: { name: 'Common Thread Collective', url: 'https://commonthreadco.com/blogs/coachs-corner/every-chatgpt-ads-update-in-2026-updated-weekly' },
  },
  {
    slug: 'google-ai-max-three-switches',
    publishedAt: '2026-09-02T14:00:00Z',
    topic: 'Ads',
    trend: 'Google AI Max',
    label: 'How-to',
    headline: 'AI Max’s three switches, and what each changes in your Search ads',
    dek: 'Search term matching widens which searches you show for. Text customization writes headlines and descriptions. Final URL expansion picks the landing page.',
    why: 'Know which of the three is on before you read the results; each changes a different part of the ad.',
    readMinutes: 4,
    source: { name: 'Google Ads Help', url: 'https://support.google.com/google-ads/answer/15910366' },
  },
  {
    slug: 'google-ai-max-auto-upgrade',
    publishedAt: '2026-09-01T12:00:00Z',
    topic: 'Ads',
    trend: 'Google AI Max',
    label: 'Breaking',
    headline: 'Google starts moving Search campaigns to AI Max',
    dek: 'Campaigns using automatically created assets or campaign-level broad match are upgraded automatically. Dynamic Search Ads follow in February 2027.',
    why: 'AI Max can rewrite your headlines and pick your landing pages. Check which campaigns flipped.',
    readMinutes: 3,
    source: { name: 'Google Ads & Commerce Blog', url: 'https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/' },
    image: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/AI_Max_DSA___Hero___Social.width-1300.jpg',
    imageCredit: 'Google',
  },
].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)) as NewsPost[];

export const NEWS_TOPICS: NewsTopic[] = ['Ads', 'SEO', 'Social', 'Creative', 'Marketing Tools', 'AI Models'];

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

/* Trends: the stories, each with a one-line read. Heat is derived below. */
export interface NewsTrend {
  name: string;
  line: string;
  /** 0–100, from the trend's posts: more posts and newer posts run hotter. */
  heat: number;
}

const TREND_LINES: Record<string, string> = {
  'Meta Muse': 'Meta’s agent, now inside its business and ad tools.',
  'ChatGPT Ads': 'Ads, shopping and sponsored agents inside ChatGPT.',
  'Google Search': 'A spam update, paid AI sources and new Search Console data.',
  'Google AI Max': 'Search campaigns moving to Google’s AI matching and ad text.',
  'OpenAI DevDay': 'Background agents and a cheaper model.',
  'Claude 5.5': 'Anthropic’s new models for everyday work.',
  'ElevenLabs v4': 'Voiceover in 90+ languages from one voice.',
  'HubSpot UNBOUND': 'Agents and AI-search tools in Marketing Hub.',
};

/** The newest post's time: "now" for the examples, so they read the same any day. */
export const NOW = NEWS_POSTS[0].publishedAt;

/** Each post counts less the older it is (half after about four days). */
function trendScore(name: string) {
  return NEWS_POSTS.filter((p) => p.trend === name).reduce((sum, p) => {
    const days = (Date.parse(NOW) - Date.parse(p.publishedAt)) / 86_400_000;
    return sum + 1 / (1 + days / 4);
  }, 0);
}

export const NEWS_TRENDS: NewsTrend[] = (() => {
  const names = Object.keys(TREND_LINES);
  const max = Math.max(...names.map(trendScore));
  return names
    .map((name) => ({ name, line: TREND_LINES[name], heat: Math.round((trendScore(name) / max) * 100) }))
    .sort((a, b) => b.heat - a.heat);
})();

/** A trend's posts, newest first. */
export function postsFor(trend: string, posts: NewsPost[]) {
  return posts.filter((p) => p.trend === trend);
}

/* F · Developing: the running story is ChatGPT Ads, a month of real updates. */
export const DEVELOPING_TREND = 'ChatGPT Ads';

/** "2h ago" / "3d ago" from now. */
export function agoFrom(iso: string, now: string) {
  const mins = Math.max(0, Math.round((Date.parse(now) - Date.parse(iso)) / 60000));
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (mins < 60 * 24) return `${Math.round(mins / 60)}h ago`;
  return `${Math.round(mins / 60 / 24)}d ago`;
}

/* Round 4 rules, for a realistic pace (a few posts a week):
 *   - a story earns a row or lane only with two or more posts;
 *   - at most three story rows, newest activity first;
 *   - one-post stories go to "Also in the news";
 *   - charts cover the 30 days up to now. */
export const MIN_POSTS = 2;
export const MAX_ROWS = 3;
export const WINDOW_DAYS = 30;

/** Stories with 2+ posts, newest activity first, capped. */
export function storyTrends(trends: NewsTrend[], posts: NewsPost[], max = MAX_ROWS) {
  return trends
    .filter((t) => postsFor(t.name, posts).length >= MIN_POSTS)
    .sort((a, b) => Date.parse(postsFor(b.name, posts)[0].publishedAt) - Date.parse(postsFor(a.name, posts)[0].publishedAt))
    .slice(0, max);
}

/** The posts of one-post stories, newest first. */
export function oneOffPosts(posts: NewsPost[]) {
  return posts.filter((p) => postsFor(p.trend, posts).length < MIN_POSTS);
}

/** The window's days, oldest first, as YYYY-MM-DD in New York time. */
export function windowDays(now = NOW, days = WINDOW_DAYS) {
  const end = Date.parse(now);
  return Array.from({ length: days }, (_, i) =>
    new Date(end - (days - 1 - i) * 86_400_000).toLocaleDateString('en-CA', { timeZone: 'America/New_York' }),
  );
}

/** A post's day as YYYY-MM-DD in New York time. */
export function dayKey(iso: string) {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
}
