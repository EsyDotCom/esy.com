/* AI News (esy.com/news): the posts and the stories they belong to.
 *
 * Rules for every post here (2026-09-30):
 *   - every fact is checked against the company's own announcement, which the
 *     post links as its source; a post we can't check that way stays a draft;
 *   - written in our own words, no quotes; a company's claim is said as theirs;
 *   - `publishedAt` is the day the post went up on esy.com, never backdated;
 *     `eventDate` is when the news happened, shown separately;
 *   - covers are fact cards drawn from the post (components/News/FactCard.tsx),
 *     with the company's official logo only where its terms allow editorial use.
 *
 * Only `status: 'published'` posts render. A story needs two published posts
 * for its own row on /news; its page at /news/<story>/ lists every post.
 */

export type NewsTopic = 'Ads' | 'SEO' | 'Social' | 'Creative' | 'Marketing Tools' | 'AI Models';

export interface NewsCompany {
  name: string;
  /** Their official logo, only where their brand terms clearly allow editorial use. */
  logo?: {
    /** For dark backgrounds (the fact cards are navy). */
    onDark: string;
    onLight: string;
    /** Where the file came from, and the terms that allow it. */
    from: string;
    terms: string;
  };
}

export interface NewsStory {
  slug: string;
  name: string;
  /** One line on what the story is. */
  line: string;
  company: NewsCompany;
}

export interface NewsSource {
  /** Who published it: "Meta Newsroom". */
  publisher: string;
  /** Their page's title. */
  title: string;
  url: string;
  /** Their publish date, as they give it: "September 29, 2026". */
  date: string;
  /** What in our post it backs up. */
  supports: string;
  /** Reporting by someone other than the company the news is about. */
  secondary?: boolean;
  /** Anything a reader should know about it. */
  note?: string;
}

export interface NewsPost {
  slug: string;
  status: 'published' | 'draft';
  story: string;
  /** A few words for the story line, e.g. "Small businesses". */
  chapter: string;
  topic: NewsTopic;
  headline: string;
  dek: string;
  why: string;
  body: string[];
  check: string[];
  facts: [string, string][];
  faq: [string, string][];
  /** Where every fact comes from, the company's own page first. */
  sources: NewsSource[];
  /** The post's cover and share image: a fact card drawn from these. */
  card: { title: string; /** Three short facts. */ facts: string[] };
  /** When the news happened: YYYY-MM-DD, or YYYY-MM when only the month is known. */
  eventDate: string;
  /** When the post went up on esy.com (YYYY-MM-DD). */
  publishedAt: string;
  readMinutes: number;
  /** Why a draft is held, for the next person to pick it up. */
  held?: string;
}

/* Companies we cover. Logos are the companies' own files, unchanged, and only
 * where their brand terms clearly allow editorial use (checked 2026-09-30):
 *   ElevenLabs — press kit and brand page for media coverage (elevenlabs.io/press).
 *   Anthropic  — media resources kit (anthropic.com/press-kit); editorial use is
 *                generally permitted, press@anthropic.com confirms in writing.
 * Names only, no logo, until cleared:
 *   Meta       — its brand pages disagree on whether editorial use needs review.
 *   Google     — its terms cover logo use only after Google approves a request.
 *   HubSpot    — logos need written permission; names are fine.
 *   OpenAI     — its brand page couldn't be read to check. */
const COMPANY: Record<string, NewsCompany> = {
  meta: { name: 'Meta' },
  google: { name: 'Google' },
  anthropic: {
    name: 'Anthropic',
    logo: { onDark: '/images/news/logos/anthropic-ivory.svg', onLight: '/images/news/logos/anthropic-slate.svg', from: 'https://www.anthropic.com/press-kit', terms: 'Anthropic media resources; editorial use in news coverage' },
  },
  elevenlabs: {
    name: 'ElevenLabs',
    logo: { onDark: '/images/news/logos/elevenlabs-white.svg', onLight: '/images/news/logos/elevenlabs-black.svg', from: 'https://elevenlabs.io/brand', terms: 'ElevenLabs brand and press materials for media coverage' },
  },
  hubspot: { name: 'HubSpot' },
  openai: { name: 'OpenAI' },
};

export const NEWS_STORIES: NewsStory[] = [
  { slug: 'meta-muse', name: 'Meta Muse', line: 'Meta’s AI agent, and the business tools built on it.', company: COMPANY.meta },
  { slug: 'google-search', name: 'Google Search', line: 'Ranking updates and new Search Console data.', company: COMPANY.google },
  { slug: 'google-ai-max', name: 'Google AI Max', line: 'Search campaigns moving to Google’s AI matching and ad text.', company: COMPANY.google },
  { slug: 'claude-5-5', name: 'Claude 5.5', line: 'Anthropic’s new models for everyday work.', company: COMPANY.anthropic },
  { slug: 'elevenlabs-v4', name: 'ElevenLabs v4', line: 'Voice models for voiceover and voice agents.', company: COMPANY.elevenlabs },
  { slug: 'hubspot-marketing-studio', name: 'HubSpot Marketing Studio', line: 'Agents for campaigns, content and nurture in HubSpot.', company: COMPANY.hubspot },
  { slug: 'chatgpt-ads', name: 'ChatGPT Ads', line: 'Advertising inside ChatGPT.', company: COMPANY.openai },
  { slug: 'openai-devday', name: 'OpenAI DevDay', line: 'OpenAI’s developer conference.', company: COMPANY.openai },
];

const PUBLISHED = '2026-09-30';

export const NEWS_POSTS: NewsPost[] = [
  /* ── Meta Muse ── */
  {
    slug: 'meta-muse-for-small-business',
    status: 'published',
    story: 'meta-muse',
    chapter: 'Small businesses',
    topic: 'Social',
    headline: 'Meta’s Muse agent comes to small businesses, with Shopify, Klaviyo and Canva plugged in',
    dek: 'Give Muse a goal like finding new customers and it works across the tools you connect: Shopify, Klaviyo, Canva, Stripe, Slack and your Facebook and Instagram business accounts.',
    why: 'An agent that can see your store, your email list and your design tools at once, from the company that sells your ads. Meta says it can’t publish, send or spend without your approval.',
    body: [
      'Meta has opened Muse, its AI agent, to small businesses in the US and Canada. You give it a goal, like finding new customers or getting a handle on the month’s spending, and it works through the tools you connect to get there.',
      'At launch that’s 15 business tools: Shopify, Stripe and QuickBooks for the money; Klaviyo, Canva and Figma for the marketing; Notion, Slack, Asana, Box, Dropbox, Zoom, Granola, HighLevel and Lovable for the rest. Facebook and Instagram business accounts connect too, and so can custom connectors.',
      'Meta’s examples are the jobs a small team rarely gets to: reading sales, campaign and social data to draft a growth plan; checking how ads and posts did and drafting the next campaign; flagging emails that need a reply and writing the drafts; spotting unusual expenses.',
      'Meta says Muse waits for approval before it publishes, sends or spends anything. Most of it is free, with paid plans for more; Meta hasn’t published prices. It runs in the Muse app, at muse.ai/business.',
    ],
    check: [
      'Which accounts you connect: each one is data Muse can read.',
      'What Muse drafts on its own and what waits for your approval.',
      'If an agency runs your Meta ads, who signs off on the campaigns Muse drafts.',
    ],
    facts: [
      ['What', 'Muse for Small Business, an AI agent from Meta'],
      ['Where', 'US and Canada'],
      ['Price', 'Free for most of it; paid plans, prices not published'],
      ['Connects', '15 business tools, Facebook and Instagram business accounts, custom connectors'],
      ['Control', 'Meta says nothing publishes, sends or spends without your approval'],
      ['Announced', 'September 29, 2026'],
      ['Get it', 'The Muse app, at muse.ai/business'],
    ],
    faq: [
      ['Is Muse for Small Business free?', 'Mostly. Meta says most of what businesses need is free, with paid plans for more. It hasn’t published prices.'],
      ['Which tools does it connect to?', 'Asana, Box, Canva, Dropbox, Figma, Granola, HighLevel, Intuit QuickBooks, Klaviyo, Lovable, Notion, Shopify, Slack, Stripe and Zoom, plus Facebook and Instagram business accounts and custom connectors.'],
      ['Can Muse post, email or spend without asking?', 'Meta says no: nothing publishes, sends or spends without your approval.'],
      ['Where is it available?', 'In the US and Canada, in the Muse app.'],
    ],
    sources: [{ publisher: 'Meta Newsroom', title: 'The Future Is for Everyone: Muse for Small Business', url: 'https://about.fb.com/news/2026/09/introducing-muse-small-business/', date: 'September 29, 2026', supports: 'What Muse does, the 15 tools it connects to, approvals, price and availability' }],
    card: { title: 'Muse for Small Business', facts: ['15 tools connected', 'US & Canada', 'Free for most'] },
    eventDate: '2026-09-29',
    publishedAt: PUBLISHED,
    readMinutes: 3,
  },
  {
    slug: 'meta-enterprise-platform',
    status: 'published',
    story: 'meta-muse',
    chapter: 'Enterprise Platform',
    topic: 'Marketing Tools',
    headline: 'Meta starts selling its AI to businesses as Meta Enterprise Platform',
    dek: 'A new Meta unit packages the Muse agent, Meta Business Agent, the Muse API and Muse Code for companies and developers.',
    why: 'The models behind Meta’s ad tools become something your own tools can build on, not only something inside Ads Manager.',
    body: [
      'Meta has started a new business unit, Meta Enterprise Platform, to sell its AI to companies and developers. It opens with Meta’s own stack: the Muse agent, Meta Business Agent, the Muse API and Muse Code, with more to follow.',
      'Chirantan “CJ” Desai runs it as Chief Enterprise Platform Officer. He joins from MongoDB, where he was CEO and President. Meta hasn’t given a timeline for wider availability.',
    ],
    check: ['If you build tools for clients, whether the Muse API is open to you yet; Meta hasn’t said when it opens more widely.'],
    facts: [
      ['What', 'Meta Enterprise Platform, a new unit selling Meta’s AI'],
      ['Includes', 'Muse agent, Meta Business Agent, Muse API, Muse Code'],
      ['For', 'Businesses and developers'],
      ['Led by', 'Chirantan “CJ” Desai, formerly CEO of MongoDB'],
      ['Announced', 'September 28, 2026'],
    ],
    faq: [
      ['What is Meta Enterprise Platform?', 'A new Meta business unit that sells its AI models, agents and developer tools to companies and developers.'],
      ['What does it include?', 'At launch, the Muse agent, Meta Business Agent, the Muse API and Muse Code.'],
    ],
    sources: [{ publisher: 'Meta Newsroom', title: 'Launching Meta Enterprise Platform', url: 'https://about.fb.com/news/2026/09/launching-meta-enterprise-platform/', date: 'September 28, 2026', supports: 'What the unit sells, who it’s for and who leads it' }],
    card: { title: 'Meta Enterprise Platform', facts: ['Muse API & Muse Code', 'For businesses & devs', 'Led by CJ Desai'] },
    eventDate: '2026-09-28',
    publishedAt: PUBLISHED,
    readMinutes: 2,
  },
  {
    slug: 'meta-muse-launch',
    status: 'published',
    story: 'meta-muse',
    chapter: 'Muse launches',
    topic: 'Social',
    headline: 'Meta launches Muse, a personal AI agent',
    dek: 'Muse is an agent that does tasks rather than only answering questions: it manages goals and scheduling and acts in apps you give it access to.',
    why: 'Muse is the base Meta’s business tools now build on. Separately, Meta said in July that its image model, Muse Image, is coming to advertisers through Advantage+ creative.',
    body: [
      'Meta has launched Muse, a personal AI agent. Rather than only answering questions, it works on goals you set: it handles scheduling and takes actions across apps you connect, such as email and a browser, once you give it permission.',
      'It started in the US, on iOS, Android and muse.ai, with AI glasses to come. Most of it is free, with paid plans for more.',
    ],
    check: ['What access you grant: Muse acts in the apps you connect, after you give it permission.'],
    facts: [
      ['What', 'Muse, a personal AI agent from Meta'],
      ['Where', 'United States first'],
      ['Apps', 'iOS, Android and muse.ai; AI glasses coming'],
      ['Price', 'Free for most of it; paid plans for more'],
      ['Launched', 'September 8, 2026'],
    ],
    faq: [
      ['What is Meta Muse?', 'A personal AI agent from Meta that works on goals you set and takes actions in apps you connect, with your permission.'],
      ['Where can I use Muse?', 'In the US, on iOS, Android and the muse.ai website.'],
    ],
    sources: [{ publisher: 'Meta Newsroom', title: 'Introducing Muse: The World’s First Personal AI Agent Built for Everyone', url: 'https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/', date: 'September 8, 2026', supports: 'What Muse does, where it’s available, the apps and the price' }, { publisher: 'Meta Newsroom', title: 'Introducing Muse Image: Image Generation Built for Your World', url: 'https://about.fb.com/news/2026/07/introducing-muse-image-meta-ai/', date: 'July 7, 2026', supports: 'Muse Image coming to advertisers through Advantage+ creative' }],
    card: { title: 'Muse, a personal AI agent', facts: ['Does tasks, not just answers', 'US first', 'iOS, Android, web'] },
    eventDate: '2026-09-08',
    publishedAt: PUBLISHED,
    readMinutes: 2,
  },

  /* ── Google Search ── */
  {
    slug: 'search-console-multimodal-report',
    status: 'published',
    story: 'google-search',
    chapter: 'Image search data',
    topic: 'SEO',
    headline: 'Search Console now shows traffic from Google Lens and Circle to Search',
    dek: 'A new “multimodal” search type in the Performance reports counts searches that start with an image: Lens, Circle to Search, image uploads and Chrome’s “Search this image”.',
    why: 'Product and brand images are a way into search now, and you can finally see whether yours bring visits.',
    body: [
      'Google has added web multimodal reporting to Search Console, in both the Search results performance report and the Generative AI features report. It covers searches where someone used an image: Google Lens, Circle to Search on Android, uploading an image to Google Search, and Chrome’s right-click “Search this image”.',
      'Pick the new multimodal search type in the performance filter to see it. Because these searches mostly start from a picture, there’s no query text to show. It’s rolling out worldwide from September 24.',
    ],
    check: ['Performance report: switch the search type to multimodal and see which pages it brings visits to.'],
    facts: [
      ['What', 'Multimodal search reporting in Search Console'],
      ['Counts', 'Lens, Circle to Search, image uploads, Chrome “Search this image”'],
      ['Where', 'Search results and Generative AI features performance reports'],
      ['Queries', 'Not shown; these searches start from an image'],
      ['Rollout', 'Worldwide, from September 24, 2026'],
    ],
    faq: [
      ['What counts as a multimodal search in Search Console?', 'A search that uses an image: Google Lens, Circle to Search on Android, image uploads to Google Search, and Chrome’s “Search this image”.'],
      ['Why is there no query data?', 'These searches mostly start from a picture, not typed words, so there’s no query text to report.'],
    ],
    sources: [{ publisher: 'Google Search Central Blog', title: 'Announcing web multimodal Search performance reporting in Search Console', url: 'https://developers.google.com/search/blog/2026/09/web-multimodal-in-sc', date: 'September 24, 2026', supports: 'What counts as multimodal, which reports show it, and the rollout' }, { publisher: 'Search Engine Journal', title: 'Google Spam Update, Image Search Data In GSC – SEO Pulse', url: 'https://www.searchenginejournal.com/seo-pulse-google-spam-update-image-search-data/590882/', date: 'September 26, 2026', supports: 'No query data for multimodal searches', secondary: true }],
    card: { title: 'Multimodal search in Search Console', facts: ['Lens & Circle to Search', 'Image uploads', 'Worldwide'] },
    eventDate: '2026-09-24',
    publishedAt: PUBLISHED,
    readMinutes: 2,
  },
  {
    slug: 'google-september-2026-spam-update',
    status: 'published',
    story: 'google-search',
    chapter: 'Spam update',
    topic: 'SEO',
    headline: 'Google’s September 2026 spam update is rolling out',
    dek: 'It started on September 24 and was still listed as rolling out on Google’s status dashboard six days later. It’s the fourth spam update this year.',
    why: 'This one is already running longer than every other spam update this year. If your rankings moved since the 24th, check this before you change anything.',
    body: [
      'Google started its September 2026 spam update on September 24. It’s the fourth this year, after March, June and August.',
      'The earlier ones finished quickly: March’s in under a day, June’s and August’s in under three. On September 30 this one was still listed as rolling out, with no end date on the dashboard.',
    ],
    check: ['Rankings and traffic since September 24, before and after the update finishes.'],
    facts: [
      ['What', 'September 2026 spam update'],
      ['Started', 'September 24, 2026'],
      ['Status', 'Still rolling out on September 30'],
      ['This year', 'Fourth spam update, after March, June and August'],
      ['Earlier ones took', 'March under a day; June and August under three days'],
    ],
    faq: [
      ['When did Google’s September 2026 spam update start?', 'On September 24, 2026, according to Google’s Search Status Dashboard.'],
      ['How long do spam updates take?', 'This year’s earlier ones finished in under three days. The September update was still rolling out six days in.'],
    ],
    sources: [{ publisher: 'Google Search Status Dashboard', title: 'Ranking incident history', url: 'https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history', date: 'Read September 30, 2026', supports: 'The start date, the status, and how long this year’s earlier updates took' }],
    card: { title: 'September 2026 spam update', facts: ['Started Sep 24', 'Still rolling out Sep 30', '4th this year'] },
    eventDate: '2026-09-24',
    publishedAt: PUBLISHED,
    readMinutes: 2,
  },

  /* ── Google AI Max ── */
  {
    slug: 'google-ai-max-auto-upgrade',
    status: 'published',
    story: 'google-ai-max',
    chapter: 'Auto-upgrade',
    topic: 'Ads',
    headline: 'Google is moving Search campaigns to AI Max this month',
    dek: 'Campaigns using automatically created assets or the campaign-level broad match setting upgrade in September. Dynamic Search Ads follow in February 2027.',
    why: 'AI Max can widen which searches you show for, rewrite headlines and descriptions, and pick landing pages. Know which of your campaigns upgraded before you read the results.',
    body: [
      'Google is automatically upgrading Search campaigns that use two older settings, automatically created assets and campaign-level broad match, to AI Max for Search campaigns this September.',
      'Dynamic Search Ads were due to upgrade at the same time, but Google pushed their sunset and upgrade to February 2027. Once that happens, new Dynamic Search Ads campaigns can’t be created; existing ones become standard ad groups with AI Max on.',
    ],
    check: ['Which of your campaigns used automatically created assets or campaign-level broad match; those are the ones upgrading.'],
    facts: [
      ['What', 'Automatic upgrade to AI Max for Search campaigns'],
      ['Which campaigns', 'Those using automatically created assets or campaign-level broad match'],
      ['When', 'September 2026'],
      ['Dynamic Search Ads', 'Upgrade moved to February 2027'],
    ],
    faq: [
      ['Which Google Ads campaigns upgrade to AI Max in September 2026?', 'Search campaigns using automatically created assets or the campaign-level broad match setting.'],
      ['When do Dynamic Search Ads move to AI Max?', 'Google moved it to February 2027.'],
    ],
    sources: [{ publisher: 'Google Ads & Commerce Blog', title: 'We’re upgrading Dynamic Search Ads to AI Max', url: 'https://blog.google/products/ads-commerce/dsa-upgrade-to-ai-max-2026/', date: 'April 15, 2026, updated June 11, 2026', supports: 'Which campaigns upgrade, when, and the Dynamic Search Ads delay' }],
    card: { title: 'Search campaigns move to AI Max', facts: ['Auto-created assets', 'Campaign-level broad match', 'DSA: Feb 2027'] },
    eventDate: '2026-09',
    publishedAt: PUBLISHED,
    readMinutes: 2,
  },
  {
    slug: 'google-ai-max-three-features',
    status: 'published',
    story: 'google-ai-max',
    chapter: 'The three features',
    topic: 'Ads',
    headline: 'AI Max’s three features, and what each changes in your Search ads',
    dek: 'Search term matching widens which searches you show for. Text customization adjusts headlines and descriptions. Final URL expansion picks the landing page.',
    why: 'Each one changes a different part of the ad, so a change in results can come from any of the three.',
    body: [
      'Google describes AI Max for Search campaigns as a suite of three features.',
      'Search term matching goes beyond your keyword list to match more searches. Text customization tailors your headlines and descriptions. Final URL expansion chooses the landing page it thinks best fits what the person searched.',
    ],
    check: ['After an upgrade, review the search terms, the ad text and the landing pages your ads used, one feature at a time.'],
    facts: [
      ['Search term matching', 'Matches searches beyond your keyword list'],
      ['Text customization', 'Tailors headlines and descriptions'],
      ['Final URL expansion', 'Picks the landing page for the search'],
    ],
    faq: [
      ['What does AI Max for Search campaigns change?', 'Which searches you match, the text of your headlines and descriptions, and which landing page is used.'],
    ],
    sources: [{ publisher: 'Google Ads Help', title: 'About AI Max for Search campaigns', url: 'https://support.google.com/google-ads/answer/15910366', date: 'Read September 30, 2026', supports: 'The three features and what each does' }],
    card: { title: 'AI Max\u2019s three features', facts: ['Search term matching', 'Text customization', 'Final URL expansion'] },
    eventDate: '2026-09',
    publishedAt: PUBLISHED,
    readMinutes: 2,
  },

  /* ── One-post stories ── */
  {
    slug: 'claude-sonnet-5-5',
    status: 'published',
    story: 'claude-5-5',
    chapter: 'Sonnet 5.5',
    topic: 'AI Models',
    headline: 'Claude Sonnet 5.5: over 30% faster, and strongest at docs, slides and spreadsheets',
    dek: 'Anthropic’s second Claude 5.5 model costs $2 in and $10 out per million tokens and, Anthropic says, does most work for up to 30% less.',
    why: 'Content and reporting pipelines get faster runs, and it’s tuned for the polished documents and decks marketing teams ship.',
    body: [
      'Anthropic has released Claude Sonnet 5.5, the second model in the Claude 5.5 family. It writes its output more than 30% faster than Sonnet 5 and, Anthropic says, needs fewer tokens for the same work, so most tasks cost up to 30% less.',
      'Anthropic says it’s strongest at well-scoped everyday work, fixing bugs, and polished documents, slides and spreadsheets. It’s on the Claude Platform as claude-sonnet-5-5, and on AWS, Google Cloud and Microsoft’s cloud.',
    ],
    check: ['If you run content or reporting jobs on Sonnet 5, compare a few on Sonnet 5.5 for speed and cost.'],
    facts: [
      ['What', 'Claude Sonnet 5.5, from Anthropic'],
      ['Price', '$2 per million input tokens, $10 per million output tokens'],
      ['Speed', 'Output over 30% faster than Sonnet 5'],
      ['Best at', 'Everyday tasks, bug fixes, documents, slides, spreadsheets'],
      ['Where', 'Claude Platform, AWS, Google Cloud, Microsoft’s cloud'],
      ['Released', 'September 28, 2026'],
    ],
    faq: [
      ['How much does Claude Sonnet 5.5 cost?', '$2 per million input tokens and $10 per million output tokens.'],
      ['What is Claude Sonnet 5.5 best at?', 'Anthropic says well-scoped everyday tasks, bug fixes, and documents, slides and spreadsheets.'],
    ],
    sources: [{ publisher: 'Anthropic', title: 'Introducing Claude Sonnet 5.5', url: 'https://www.anthropic.com/claude-sonnet-5-5', date: 'September 28, 2026', supports: 'Prices, speed, what it’s best at and where it’s available' }],
    card: { title: 'Claude Sonnet 5.5', facts: ['$2 / $10 per M tokens', '30%+ faster', 'Docs, slides, sheets'] },
    eventDate: '2026-09-28',
    publishedAt: PUBLISHED,
    readMinutes: 2,
  },
  {
    slug: 'elevenlabs-v4-launch',
    status: 'published',
    story: 'elevenlabs-v4',
    chapter: 'Eleven v4',
    topic: 'Creative',
    headline: 'ElevenLabs v4 clones a voice from 10 seconds of audio, in 90+ languages',
    dek: 'Eleven v4 and the faster Eleven v4 Turbo support more than 90 languages and take inline tags like [laughs] to direct the delivery.',
    why: 'Voiceover for ads and explainers gets easier to localize: one script, dozens of languages, the same voice.',
    body: [
      'ElevenLabs has released Eleven v4, its new text-to-speech model, and Eleven v4 Turbo, a low-latency version for voice agents. Both support more than 90 languages, and Instant Voice Clones now need only 10 seconds of audio.',
      'You direct the read with inline tags in the script, such as [laughs] or a described tone, and can add sound cues the same way. ElevenLabs puts v4’s median inference latency at about 100 ms, and v4 Turbo’s median time to first speech at about 150 ms. Both are in ElevenAgents, ElevenCreative and the API.',
    ],
    check: ['If you localize voiceover, test one script across your languages with a single cloned voice.'],
    facts: [
      ['What', 'Eleven v4 and Eleven v4 Turbo, from ElevenLabs'],
      ['Languages', 'More than 90'],
      ['Voice cloning', 'From 10 seconds of audio'],
      ['Direction', 'Inline tags in the script, like [laughs]'],
      ['Speed', 'v4 about 100 ms; v4 Turbo about 150 ms to first speech'],
      ['Where', 'ElevenAgents, ElevenCreative, ElevenAPI'],
      ['Released', 'September 28, 2026'],
    ],
    faq: [
      ['How many languages does ElevenLabs v4 support?', 'More than 90, in both Eleven v4 and Eleven v4 Turbo.'],
      ['How much audio does a voice clone need?', 'ElevenLabs says Instant Voice Clones need 10 seconds of audio.'],
    ],
    sources: [{ publisher: 'ElevenLabs', title: 'Eleven v4: Our most expressive text-to-speech AI model yet', url: 'https://elevenlabs.io/blog/eleven-v4', date: 'September 28, 2026', supports: 'Languages, voice cloning, inline tags, latency and where it’s available' }],
    card: { title: 'Eleven v4 and v4 Turbo', facts: ['90+ languages', 'Clone from 10 seconds', '~150 ms to speech'] },
    eventDate: '2026-09-28',
    publishedAt: PUBLISHED,
    readMinutes: 2,
  },
  {
    slug: 'hubspot-marketing-studio-agents',
    status: 'published',
    story: 'hubspot-marketing-studio',
    chapter: 'Marketing Studio',
    topic: 'Marketing Tools',
    headline: 'HubSpot’s Marketing Studio adds Campaign, Content and Nurture agents',
    dek: 'Announced at UNBOUND (September 16–18), Marketing Studio is one workspace from insight to campaign, with three agents and credit-based pricing.',
    why: 'Campaign planning, content and email personalization become agent jobs inside the CRM, paid for per piece rather than per seat.',
    body: [
      'HubSpot introduced Marketing Studio at UNBOUND, its conference, held September 16–18. It’s a single workspace for going from an insight to a campaign, with three new agents.',
      'The Campaign Agent turns goals into campaign plans with channels and messaging. The Content Agent writes blog posts, social posts and landing pages using your brand voice and audience data. The Nurture Agent personalizes each email in a nurture flow from contact and company data. Pricing is in credits, which vary by plan.',
    ],
    check: ['On your HubSpot plan, how many credits each agent uses per plan, piece and email.'],
    facts: [
      ['What', 'Marketing Studio, with three agents'],
      ['Agents', 'Campaign (plans), Content (posts and pages), Nurture (personalized emails)'],
      ['Pricing', 'Credits, varying by plan'],
      ['Announced', 'UNBOUND, September 16–18, 2026'],
    ],
    faq: [
      ['What are HubSpot’s new marketing agents?', 'Campaign Agent for campaign plans, Content Agent for posts and landing pages, and Nurture Agent for personalized nurture emails.'],
      ['How is Marketing Studio priced?', 'In credits, which vary by HubSpot plan.'],
    ],
    sources: [{ publisher: 'HubSpot', title: 'Fall 2026 Spotlight', url: 'https://www.hubspot.com/spotlight', date: 'September 16–18, 2026', supports: 'Marketing Studio, the three agents, credit pricing and the event dates' }],
    card: { title: 'Marketing Studio agents', facts: ['Campaign', 'Content', 'Nurture'] },
    eventDate: '2026-09-16',
    publishedAt: PUBLISHED,
    readMinutes: 2,
  },
  {
    slug: 'chatgpt-ads-costs-vary',
    status: 'published',
    story: 'chatgpt-ads',
    chapter: 'What clicks cost',
    topic: 'Ads',
    headline: 'Six months in, advertisers report ChatGPT ad clicks from under $3 to $13',
    dek: 'Some advertisers pay under $3 a click and others $10 to $13, MediaPost reported, citing Search Engine Journal. There are no shared benchmarks yet.',
    why: 'With no average to plan against, a small test budget and your own conversion tracking are the only reliable read.',
    body: [
      'Six months after ChatGPT Ads launched, results vary widely, MediaPost reported on September 8, citing a Search Engine Journal report. Some advertisers report costs per click under $3; others pay $10, and up to $13.',
      'There are no performance benchmarks yet across advertisers, industries or campaign types. Some campaigns brought qualified leads at reasonable costs; others saw little beyond the first clicks.',
    ],
    check: ['If you test ChatGPT Ads, set up conversion tracking first so you judge cost per lead, not cost per click.'],
    facts: [
      ['What', 'Reported costs per click on ChatGPT Ads'],
      ['Range', 'Under $3 to $13 per click'],
      ['Benchmarks', 'None published across advertisers or industries'],
      ['Reported', 'September 8, 2026, by MediaPost, citing Search Engine Journal'],
    ],
    faq: [
      ['How much do ChatGPT ads cost per click?', 'Advertisers report anywhere from under $3 to $13 per click, according to MediaPost, citing Search Engine Journal. There are no published benchmarks.'],
    ],
    sources: [{ publisher: 'MediaPost', title: 'ChatGPT Ad Results Are Not Yet Clear', url: 'https://www.mediapost.com/publications/article/417746/chatgpt-ad-results-are-not-yet-clear.html', date: 'September 8, 2026', supports: 'The cost range and the lack of benchmarks', secondary: true, note: 'MediaPost cites a Search Engine Journal report, which we haven’t read directly.' }],
    card: { title: 'What ChatGPT ad clicks cost', facts: ['Under $3 to $13', 'No benchmarks yet', 'Reported Sep 8'] },
    eventDate: '2026-09-08',
    publishedAt: PUBLISHED,
    readMinutes: 2,
  },

  /* ── Drafts: held until checked against the company's own announcement ── */
  ...(['chatgpt-ads-product-feeds', 'chatgpt-sponsored-agents', 'chatgpt-ads-shopify-global'] as const).map((slug) => ({
    slug,
    status: 'draft' as const,
    story: 'chatgpt-ads',
    chapter: '',
    topic: 'Ads' as const,
    headline: '',
    dek: '',
    why: '',
    body: [],
    check: [],
    facts: [],
    faq: [],
    card: { title: '', facts: ['', '', ''] },
    sources: [{ publisher: 'Common Thread Collective', title: '', url: 'https://commonthreadco.com/blogs/coachs-corner/every-chatgpt-ads-update-in-2026-updated-weekly', date: '', supports: '', secondary: true }],
    eventDate: '2026-09',
    publishedAt: PUBLISHED,
    readMinutes: 2,
    held: 'Only an agency blog confirms it; OpenAI’s pages block automated reads. OpenAI’s own snippet says Sponsored Agents are a test with select US advertisers.',
  })),
  {
    slug: 'openai-devday-2026',
    status: 'draft',
    story: 'openai-devday',
    chapter: '',
    topic: 'AI Models',
    headline: '',
    dek: '',
    why: '',
    body: [],
    check: [],
    facts: [],
    faq: [],
    card: { title: '', facts: ['', '', ''] },
    sources: [{ publisher: 'OpenAI', title: '', url: 'https://openai.com/index/devday-2026/', date: '', supports: '', secondary: true }],
    eventDate: '2026-09-29',
    publishedAt: PUBLISHED,
    readMinutes: 3,
    held: 'Details come from news summaries; OpenAI’s own pages block automated reads.',
  },
  {
    slug: 'google-ai-contribution-pilot',
    status: 'draft',
    story: 'google-search',
    chapter: '',
    topic: 'SEO',
    headline: '',
    dek: '',
    why: '',
    body: [],
    check: [],
    facts: [],
    faq: [],
    card: { title: '', facts: ['', '', ''] },
    sources: [{ publisher: 'Search Engine Roundtable', title: '', url: 'https://www.seroundtable.com/google-al-contribution-pilot-42076.html', date: '', supports: '', secondary: true }],
    eventDate: '2026-09-14',
    publishedAt: PUBLISHED,
    readMinutes: 3,
    held: 'No Google announcement found; only trade press.',
  },
];

/* Posts and stories share /news/<slug>/, so no slug may be both. Checked at
 * load, so a clash fails the build instead of hiding a page. */
{
  const storySlugs = new Set(NEWS_STORIES.map((s) => s.slug));
  const clash = NEWS_POSTS.find((p) => storySlugs.has(p.slug));
  if (clash) throw new Error(`AI News: "${clash.slug}" is both a post and a story; rename the post.`);
}

/* ── Reads ── */

/** Published posts, newest news first (they share a publish day at launch). */
export function publishedPosts(): NewsPost[] {
  return NEWS_POSTS.filter((p) => p.status === 'published').sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.eventDate.localeCompare(a.eventDate),
  );
}

export const findPost = (slug: string) => publishedPosts().find((p) => p.slug === slug);
export const findStory = (slug: string) => NEWS_STORIES.find((s) => s.slug === slug);

/** A story's published posts, newest news first. */
export const postsInStory = (story: string) => publishedPosts().filter((p) => p.story === story);

/** Stories with at least one published post, most recent news first. */
export function liveStories(): NewsStory[] {
  return NEWS_STORIES.filter((s) => postsInStory(s.slug).length > 0).sort(
    (a, b) => postsInStory(b.slug)[0].eventDate.localeCompare(postsInStory(a.slug)[0].eventDate),
  );
}

/** "Sep 29" from YYYY-MM-DD, "September" from YYYY-MM. */
export function eventLabel(date: string) {
  const [y, m, d] = date.split('-').map(Number);
  if (!d) return new Date(Date.UTC(y, m - 1, 15)).toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/** "September 30, 2026" from YYYY-MM-DD. */
export function longDate(date: string) {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export const postPath = (slug: string) => `/news/${slug}/`;
