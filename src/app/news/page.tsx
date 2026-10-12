import type { Metadata } from 'next';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { NewsIndexPage } from '@/components/News/News';
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
// when a post is published; the hourly revalidate is the backstop.

const TITLE = 'AI Marketing News — The Marketing Engineer';
const DESCRIPTION =
  'What changed in the AI tools behind marketing, and why it matters: ads, SEO, social and creative. Each post links its source. From The Marketing Engineer.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: 'https://esy.com/news/', siteName: 'Esy', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, site: '@EsyDotCom' },
  // Large image previews in Discover and Top Stories; the RSS feed for readers and publisher tools.
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  alternates: { canonical: '/news/', types: { 'application/rss+xml': [{ url: '/news/rss.xml', title: 'AI Marketing News' }] } },
};

export const revalidate = 3600;

export default async function NewsPage() {
  const [articles, news] = await Promise.all([getAllAgenticArticles(), getNews()]);
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <NewsIndexPage news={news} />
    </div>
  );
}
