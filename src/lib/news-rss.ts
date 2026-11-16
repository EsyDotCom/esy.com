import 'server-only';
import { NEWS_DESKS, findStoryIn, onDesk, postPath, type NewsDesk } from '@/data/news';
import { getNews } from '@/lib/published-news';

/* A desk's RSS feed (2026-10-12; per desk since 2026-11-15): its newest 50
 * posts, for news readers, Google's publisher tools and posting to social as
 * each story goes up. /news/rss.xml is AI Marketing News, /news/ai-and-power/
 * rss.xml is AI and Power. Includes posts published from Compose (getNews());
 * the revalidate webhook refreshes both on publish. */

const SITE = 'https://esy.com';

// The channel's one-line description, per desk.
const ABOUT: Record<NewsDesk, string> = {
  'ai-marketing-news': 'What changed in AI marketing, checked against each company’s own announcement.',
  'ai-and-power': 'Technology and geopolitics: chips, trade and export rules, each post checked against its sources.',
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const rfc822 = (iso: string) => new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso).toUTCString();

export async function deskRss(desk: NewsDesk): Promise<Response> {
  const news = await getNews();
  const info = NEWS_DESKS[desk];
  const posts = onDesk(news.posts, desk).slice(0, 50);
  const items = posts
    .map((p) => {
      const url = `${SITE}${postPath(p.slug)}`;
      const story = findStoryIn(news.stories, p.story);
      return `    <item>
      <title>${esc(p.headline)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.publishedAt)}</pubDate>
      <description>${esc(p.dek)}</description>
      ${story ? `<category>${esc(story.name)}</category>` : ''}
    </item>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(info.name)} — Esy</title>
    <link>${SITE}${info.path}</link>
    <atom:link href="${SITE}${info.rss}" rel="self" type="application/rss+xml" />
    <description>${esc(ABOUT[desk])}</description>
    <language>en</language>
    ${posts[0] ? `<lastBuildDate>${rfc822(posts[0].publishedAt)}</lastBuildDate>` : ''}
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
