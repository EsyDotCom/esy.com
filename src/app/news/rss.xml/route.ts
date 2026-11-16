import { deskRss } from '@/lib/news-rss';

/* AI Marketing News as RSS (src/lib/news-rss.ts). Linked from /news and every
 * AI Marketing News post (<link rel="alternate">). */

export const revalidate = 3600;

export function GET() {
  return deskRss('ai-marketing-news');
}
