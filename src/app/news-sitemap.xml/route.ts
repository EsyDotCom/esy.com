import { postPath, publishedTime } from '@/data/news';
import { getNews } from '@/lib/published-news';
import { inSearch } from '@/lib/search-indexing';

/* The Google News sitemap (2026-10-12): AI Marketing News posts from the last
 * two days, the window Google News reads (developers.google.com/search/docs/
 * crawling-indexing/sitemaps/news-sitemap). Older posts stay in /sitemap.xml.
 * An empty list is valid, and it refills as soon as a post goes up. The
 * publication name matches the publisher on every post's NewsArticle data.
 * Includes posts published from Compose (getNews()); the revalidate webhook
 * refreshes it on publish, so a new post is listed within seconds. A post Esy
 * marks noindex is never listed (src/lib/search-indexing.ts). */

export const revalidate = 3600;

const SITE = 'https://esy.com';
const WINDOW_MS = 2 * 24 * 60 * 60 * 1000;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function GET() {
  const since = Date.now() - WINDOW_MS;
  const fresh = (await getNews()).posts.filter((p) => inSearch(p) && publishedTime(p) >= since);
  const urls = fresh
    .map(
      (p) => `  <url>
    <loc>${SITE}${postPath(p.slug)}</loc>
    <news:news>
      <news:publication><news:name>Esy</news:name><news:language>en</news:language></news:publication>
      <news:publication_date>${esc(p.publishedAt)}</news:publication_date>
      <news:title>${esc(p.headline)}</news:title>
    </news:news>
  </url>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
