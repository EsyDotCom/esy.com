import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { TakeBox, TakeCompany, TakeGlance, TakeLinked } from '@/components/prototypes/news-who-where/takes';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import { getNews } from '@/lib/published-news';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsIndex/NewsIndex.css';
import '@/components/NewsPost/NewsPost.css';
import '@/components/News/News.css';

// Who and where on a news post, as readers see it (2026-10-19): the real post
// page with SH4's share bar and rail, on one sample-worded post about a real
// story (Salesforce in Spain). Pairs with Compose's /prototypes/who-where.

const TAKES = { box: TakeBox, glance: TakeGlance, linked: TakeLinked } as const;
const prototype = findPrototype('news-who-where')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `Who and where ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes', robots: { index: false, follow: false } };
}

export default async function NewsWhoWhereVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Take = TAKES[variant as keyof typeof TAKES];
  if (!Take && variant !== 'company') notFound();
  const [news, articles] = await Promise.all([getNews(), getAllAgenticArticles()]);

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      {Take ? <Take news={news} /> : <TakeCompany />}
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
