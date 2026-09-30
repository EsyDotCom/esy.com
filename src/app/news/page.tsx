import type { Metadata } from 'next';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { NewsIndexPage } from '@/components/News/News';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsIndex/NewsIndex.css';
import '@/components/NewsPost/NewsPost.css';
import '@/components/News/News.css';

// AI News (2026-09-30): P · Trend desk · Rows · Wire from /prototypes/news/.
// Posts and stories: src/data/news/index.ts.

const TITLE = 'AI News for Marketers — The Marketing Engineer';
const DESCRIPTION =
  'What changed in the AI tools behind marketing, and why it matters: ads, SEO, social and creative. Each post links its source. From The Marketing Engineer.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website', url: 'https://esy.com/news/', siteName: 'Esy', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, site: '@EsyDotCom' },
  alternates: { canonical: '/news/' },
};

export const revalidate = 3600;

export default async function NewsPage() {
  const articles = await getAllAgenticArticles();
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <NewsIndexPage />
    </div>
  );
}
