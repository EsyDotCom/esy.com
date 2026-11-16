import type { Metadata } from 'next';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { NewsIndexPage } from '@/components/News/News';
import { NEWS_DESKS } from '@/data/news';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import { getNews } from '@/lib/published-news';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsIndex/NewsIndex.css';
import '@/components/NewsPost/NewsPost.css';
import '@/components/News/News.css';

// AI Marketing News (2026-09-30): P · Trend desk · Rows · Wire from /prototypes/news/.
// Posts and stories: src/data/news/index.ts, plus posts published from Compose
// (getNews(), src/lib/published-news.ts). The revalidate webhook refreshes it
// when a post is published; the hourly revalidate is the backstop. Since
// 2026-11-15 it shows the AI Marketing News desk only; AI and Power has its own
// page (/news/ai-and-power/) and a tab here.

const DESK = NEWS_DESKS['ai-marketing-news'];

export const metadata: Metadata = {
  title: DESK.title,
  description: DESK.description,
  openGraph: { title: DESK.title, description: DESK.description, type: 'website', url: 'https://esy.com/news/', siteName: 'Esy', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: DESK.title, description: DESK.description, site: '@EsyDotCom' },
  // Large image previews in Discover and Top Stories; the RSS feed for readers and publisher tools.
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  alternates: { canonical: '/news/', types: { 'application/rss+xml': [{ url: DESK.rss, title: DESK.name }] } },
};

export const revalidate = 3600;

export default async function NewsPage() {
  const [articles, news] = await Promise.all([getAllAgenticArticles(), getNews()]);
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <NewsIndexPage news={news} desk="ai-marketing-news" />
    </div>
  );
}
