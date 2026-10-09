/* The AI marketing tools for the /tools prototypes (2026-10-09), shaped like a
   directory entry the real page (and later Esy) would hold.

   Organised by the JOB a tool does, because that's how people search: the
   keyword export (Ahrefs, US) splits "ai marketing tools" (5,400/mo) into
   content/copy (~7.9k across the long tail), automation/agents (~6.9k),
   free (~5.3k), sales/B2B (~5k), email (~3.6k), SEO/search (~2.5k), social
   (~2.4k), images/video (~2k), ads (~1.8k).

   Honesty rules for this data:
   - Links only to things that exist: our articles (/articles/<slug>/), the
     Claude Code course, and AI Marketing News posts about the tool. Anything
     else is "review coming".
   - "We use it" only where Esy actually runs on it.
   - No prices or plan claims except where checked on 2026-10-09 (the email
     tools' free tiers, from this session's research).
   - Logos are each company's own icon file, pulled unaltered from its own
     site (2026-10-09) to identify the product in a comparison (nominative
     use), never generated or edited. Shown small, with the disclosure line
     saying we're not affiliated. Esy shows its own wordmark
     (public/brand/logo/) in place of its name, with no tile. */

export type ToolJob =
  | 'Writing & content'
  | 'Images & video'
  | 'SEO & AI search'
  | 'Email'
  | 'Social & ads'
  | 'Automation & agents'
  | 'Data & prospecting'
  | 'Building with AI';

export const JOBS: ToolJob[] = [
  'Writing & content',
  'Images & video',
  'SEO & AI search',
  'Email',
  'Social & ads',
  'Automation & agents',
  'Data & prospecting',
  'Building with AI',
];

export interface ToolLink { kind: 'Review' | 'Tutorial' | 'Course' | 'News'; label: string; href: string }

export interface Tool {
  slug: string;
  name: string;
  maker: string;
  job: ToolJob;
  /** What it's for, in one plain line. */
  does: string;
  /** Zev's one-line take, where he has one (sample wording until he writes his own). */
  take?: string;
  free?: string; // a checked free tier, when there is one
  usedByEsy?: boolean;
  /** The company's own icon in public/images/tools/logos; `inset` pads marks
      that aren't already a filled square. No logo = the lettered tile. */
  logo?: { src: string; inset?: boolean };
  /** A wordmark shown bare in place of the name, no tile (Esy's own). */
  wordmark?: string;
  links: ToolLink[];
}

const A = (slug: string) => `/articles/${slug}/`;
const N = (slug: string) => `/news/${slug}/`;
const L = (file: string, inset = false) => ({ src: `/images/tools/logos/${file}`, inset });

export const TOOLS: Tool[] = [
  {
    slug: 'claude', name: 'Claude', maker: 'Anthropic', job: 'Writing & content',
    logo: L('claude.png'),
    does: 'Writes, edits and researches: drafts, briefs, pages and long reports.',
    take: 'The model behind most of what Esy writes, and the one I reach for first.',
    usedByEsy: true,
    links: [{ kind: 'Review', label: 'First impressions: Claude Fable 5', href: A('claude-fable-5-first-impressions') }],
  },
  {
    slug: 'chatgpt-images', name: 'ChatGPT Images', maker: 'OpenAI', job: 'Images & video',
    logo: L('openai.svg', true),
    does: 'Makes and edits images from a prompt, including text inside the picture.',
    take: 'What clip.art’s 30,000+ pages were drawn with, through the API.',
    usedByEsy: true,
    links: [{ kind: 'Review', label: 'ChatGPT Images 2.0 vs Nano Banana 2', href: A('chatgpt-images-2-vs-nano-banana-2') }],
  },
  {
    slug: 'nano-banana', name: 'Nano Banana', maker: 'Google', job: 'Images & video',
    logo: L('gemini.png', true),
    does: 'Google’s image model: fast edits and consistent characters across shots.',
    links: [{ kind: 'Review', label: 'ChatGPT Images 2.0 vs Nano Banana 2', href: A('chatgpt-images-2-vs-nano-banana-2') }],
  },
  {
    slug: 'elevenlabs', name: 'ElevenLabs', maker: 'ElevenLabs', job: 'Images & video',
    logo: L('elevenlabs.svg'),
    does: 'Voices for video and ads: clones a voice and speaks it in many languages.',
    links: [{ kind: 'News', label: 'ElevenLabs v4 clones a voice from 10 seconds', href: N('elevenlabs-v4-launch') }],
  },
  {
    slug: 'search-console', name: 'Search Console', maker: 'Google', job: 'SEO & AI search',
    logo: L('search-console.png', true),
    does: 'Shows how Google finds your pages: searches, clicks and what’s broken.',
    free: 'Free',
    usedByEsy: true,
    links: [{ kind: 'News', label: 'Search Console now shows Lens and Circle to Search traffic', href: N('search-console-multimodal-report') }],
  },
  {
    slug: 'ahrefs', name: 'Ahrefs', maker: 'Ahrefs', job: 'SEO & AI search',
    logo: L('ahrefs.png'),
    does: 'Keyword research and competitor data: what people search and who ranks.',
    take: 'Where every SEO decision on esy.com starts, including this page.',
    usedByEsy: true,
    links: [],
  },
  {
    slug: 'resend', name: 'Resend', maker: 'Resend', job: 'Email',
    logo: L('resend.png'),
    does: 'Sends email from your own code: newsletters, confirmations, automations.',
    take: 'What The Marketing Engineer moved to, so the newsletter runs from Esy.',
    free: 'Free up to 1,000 contacts',
    usedByEsy: true,
    links: [],
  },
  {
    slug: 'beehiiv', name: 'Beehiiv', maker: 'Beehiiv', job: 'Email',
    logo: L('beehiiv.png', true),
    does: 'A newsletter platform with an editor, a website and a growth network.',
    free: 'Free up to 2,500 subscribers',
    links: [],
  },
  {
    slug: 'kit', name: 'Kit', maker: 'Kit', job: 'Email',
    logo: L('kit.png'),
    does: 'Email for creators: courses by email, tagging and sequences.',
    free: 'Free up to 10,000 subscribers',
    links: [],
  },
  {
    slug: 'meta-muse', name: 'Muse', maker: 'Meta', job: 'Social & ads',
    logo: L('meta.png', true),
    does: 'Meta’s agent for small businesses, with Shopify, Klaviyo and Canva plugged in.',
    links: [{ kind: 'News', label: 'Meta’s Muse agent comes to small businesses', href: N('meta-muse-for-small-business') }],
  },
  {
    slug: 'ai-max', name: 'AI Max', maker: 'Google', job: 'Social & ads',
    logo: L('google-ads.png', true),
    does: 'Google’s AI layer for Search campaigns: matching, copy and landing pages.',
    links: [{ kind: 'News', label: 'AI Max’s three features, and what each changes', href: N('google-ai-max-three-features') }],
  },
  {
    slug: 'hubspot', name: 'HubSpot Marketing Studio', maker: 'HubSpot', job: 'Automation & agents',
    logo: L('hubspot.png'),
    does: 'Campaign, Content and Nurture agents inside HubSpot’s marketing tools.',
    links: [{ kind: 'News', label: 'HubSpot’s Marketing Studio adds three agents', href: N('hubspot-marketing-studio-agents') }],
  },
  {
    slug: 'esy', name: 'Esy', maker: 'Esy (ours)', job: 'Automation & agents',
    wordmark: '/brand/logo/esy-wordmark.svg',
    does: 'Runs marketing work end to end, and records how every piece was made.',
    take: 'Ours. clip.art, SEOPage and AI Marketing News run on it.',
    usedByEsy: true,
    links: [{ kind: 'Tutorial', label: 'Run the Generate Clip Art Asset workflow', href: A('generate-clip-art-asset-walkthrough') }],
  },
  {
    slug: 'clay', name: 'Clay', maker: 'Clay', job: 'Data & prospecting',
    logo: L('clay.png', true),
    does: 'Finds and enriches leads from many data sources, then acts on them with AI.',
    links: [],
  },
  {
    slug: 'claude-code', name: 'Claude Code', maker: 'Anthropic', job: 'Building with AI',
    logo: L('claude.png'),
    does: 'An AI that writes and runs code in your terminal: builds the systems themselves.',
    take: 'How every system in this newsletter gets built.',
    usedByEsy: true,
    links: [
      { kind: 'Course', label: 'How to Use Claude Code for the AI Solopreneur', href: '/courses/how-to-use-claude-code/' },
      { kind: 'Tutorial', label: 'Building multi-agent workflows with Claude Code', href: A('building-multi-agent-workflows-claude-code') },
    ],
  },
  {
    slug: 'cursor', name: 'Cursor', maker: 'Anysphere', job: 'Building with AI',
    logo: L('cursor.png'),
    does: 'A code editor with AI built in, for building and changing your marketing sites.',
    links: [{ kind: 'Tutorial', label: 'Cursor workflow patterns that ship', href: A('cursor-workflow-patterns-production') }],
  },
];

export const toolsFor = (job: ToolJob) => TOOLS.filter((t) => t.job === job);
