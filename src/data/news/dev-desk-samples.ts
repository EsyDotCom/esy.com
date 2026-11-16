import { newestFirst, onDesk, type NewsData, type NewsPost, type NewsStory } from '@/data/news';

/* Local development only (getNews() under `next dev`): two labelled sample
 * posts on the AI and Power desk, so its page, the /news tabs and a post's desk
 * label can be seen before the first real post. They are added only while the
 * desk has no real post, and never in a build. Every word below is a sample. */

const STORY: NewsStory = {
  slug: 'sample-chip-export-rules',
  name: 'Sample: chip export rules',
  line: 'Sample story. Not real news.',
  company: { name: 'Sample Co' },
};

const base = {
  status: 'published' as const,
  desk: 'ai-and-power' as const,
  story: STORY.slug,
  topic: '' as const,
  check: [],
  faq: [],
  writtenBy: 'zev' as const,
  readMinutes: 3,
  take: 'Sample take. This is where Zev says what he thinks and what he would do.\n\nIt is a sample, shown only in local development.',
  takeLinks: [],
  sources: [{ publisher: 'Sample Co', title: 'Sample announcement', url: 'https://example.com/sample', date: 'Nov 14, 2026', supports: 'Every fact (sample)' }],
};

const SAMPLES: NewsPost[] = [
  {
    ...base,
    slug: 'sample-ai-and-power-export-rules',
    chapter: 'New rules',
    headline: 'Sample: how a chip export rule reaches your AI bill',
    dek: 'Sample post, shown only in local development. Not real news.',
    why: 'Sample: when the chips behind AI models get scarcer, the tools that run on them can cost more.',
    body: ['Sample body paragraph. Nothing here is real news.'],
    facts: [['What', 'A sample rule'], ['Where', 'Sample country']],
    card: { title: 'Sample export rule', facts: ['Sample fact one', 'Sample fact two', 'Sample fact three'] },
    eventDate: '2026-11-14',
    publishedAt: '2026-11-14T15:00:00+00:00',
  },
  {
    ...base,
    slug: 'sample-ai-and-power-first-response',
    chapter: 'The response',
    headline: 'Sample: the first response to the rule',
    dek: 'A second sample post, so the desk has a story to lead with.',
    why: 'Sample: a second post in the same story.',
    body: ['Sample body paragraph.'],
    facts: [['What', 'A sample response']],
    card: { title: 'Sample response', facts: ['Sample one', 'Sample two', 'Sample three'] },
    eventDate: '2026-11-15',
    publishedAt: '2026-11-15T15:00:00+00:00',
  },
];

export function withDevDeskSamples(news: NewsData): NewsData {
  if (onDesk(news.posts, 'ai-and-power').length > 0) return news;
  return { posts: [...news.posts, ...SAMPLES].sort(newestFirst), stories: [...news.stories, STORY] };
}
