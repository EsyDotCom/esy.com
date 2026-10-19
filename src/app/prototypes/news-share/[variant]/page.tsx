import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { TakeFooter, TakeFooterRail, TakeRail, TakeTopBottom } from '@/components/prototypes/news-share/takes';
import { findPostIn, postPath } from '@/data/news';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import { getNews } from '@/lib/published-news';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsIndex/NewsIndex.css';
import '@/components/NewsPost/NewsPost.css';
import '@/components/News/News.css';

// Sharing and "Add as a preferred source" on a news post (2026-10-19): three
// takes on the real post page, all rendering the same real published post.

const TAKES = { footer: TakeFooter, 'top-bottom': TakeTopBottom, rail: TakeRail, 'footer-rail': TakeFooterRail } as const;
const POST_SLUG = 'google-september-2026-spam-update';
const prototype = findPrototype('news-share')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `News share ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false, follow: false } };
}

export default async function NewsShareVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Take = TAKES[variant as keyof typeof TAKES];
  if (!Take) notFound();
  const [news, articles] = await Promise.all([getNews(), getAllAgenticArticles()]);
  const post = findPostIn(news.posts, POST_SLUG);
  if (!post) notFound();
  const target = { url: `https://esy.com${postPath(post.slug)}`, title: post.headline };

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <Take post={post} news={news} target={target} />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
