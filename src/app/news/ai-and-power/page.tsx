import type { Metadata } from 'next';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { NewsIndexPage } from '@/components/News/News';
import { NEWS_DESKS, onDesk } from '@/data/news';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import { getNews } from '@/lib/published-news';
import { inSearch } from '@/lib/search-indexing';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsIndex/NewsIndex.css';
import '@/components/NewsPost/NewsPost.css';
import '@/components/News/News.css';

// AI and Power (Zev, 2026-11-15): the technology-and-geopolitics desk of
// esy.com/news, laid out like /news. Its posts keep their /news/<post>/ links.
// Out of search until it has a post that's in search, so an empty desk is
// never indexed; the sitemap lists it from then on (src/app/sitemap.ts).

const DESK = NEWS_DESKS['ai-and-power'];

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const live = onDesk((await getNews()).posts, 'ai-and-power').some(inSearch);
  return {
    title: DESK.title,
    description: DESK.description,
    openGraph: { title: DESK.title, description: DESK.description, type: 'website', url: `https://esy.com${DESK.path}`, siteName: 'Esy', locale: 'en_US' },
    twitter: { card: 'summary_large_image', title: DESK.title, description: DESK.description, site: '@EsyDotCom' },
    robots: live ? { index: true, follow: true, 'max-image-preview': 'large' } : { index: false, follow: true },
    alternates: { canonical: DESK.path, types: { 'application/rss+xml': [{ url: DESK.rss, title: DESK.name }] } },
  };
}

export default async function AiAndPowerPage() {
  const [articles, news] = await Promise.all([getAllAgenticArticles(), getNews()]);
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <NewsIndexPage news={news} desk="ai-and-power" />
    </div>
  );
}
