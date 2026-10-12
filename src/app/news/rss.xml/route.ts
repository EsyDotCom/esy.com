import { findStory, postPath, publishedPosts } from '@/data/news';

/* AI Marketing News as RSS (2026-10-12): the newest 50 posts, for news readers,
 * Google's publisher tools and posting to social as each story goes up. Linked
 * from /news and every post (<link rel="alternate">). */

export const revalidate = 3600;

const SITE = 'https://esy.com';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const rfc822 = (iso: string) => new Date(iso.length === 10 ? `${iso}T12:00:00Z` : iso).toUTCString();

export function GET() {
  const posts = publishedPosts().slice(0, 50);
  const items = posts
    .map((p) => {
      const url = `${SITE}${postPath(p.slug)}`;
      const story = findStory(p.story);
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
    <title>AI Marketing News — Esy</title>
    <link>${SITE}/news/</link>
    <atom:link href="${SITE}/news/rss.xml" rel="self" type="application/rss+xml" />
    <description>What changed in AI marketing, checked against each company’s own announcement.</description>
    <language>en</language>
    ${posts[0] ? `<lastBuildDate>${rfc822(posts[0].publishedAt)}</lastBuildDate>` : ''}
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
