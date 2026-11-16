import { deskRss } from '@/lib/news-rss';

/* AI and Power as RSS (src/lib/news-rss.ts). Linked from /news/ai-and-power/
 * and every AI and Power post. */

export const revalidate = 3600;

export function GET() {
  return deskRss('ai-and-power');
}
