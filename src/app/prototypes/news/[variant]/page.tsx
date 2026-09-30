import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { NewsBriefing, NewsFrontPage, NewsWire } from '@/components/NewsIndex/NewsIndex';
import { NewsDeveloping, NewsLiveFront, NewsTrendDesk } from '@/components/NewsIndex/NewsFronts';
import { TrendBoard, TrendLanes, TrendRows } from '@/components/NewsIndex/TrendSections';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsIndex/NewsIndex.css';

// One /news index direction, in the real site chrome and the publication's
// `.nl` scope. /news hasn't published yet, so all three read the same SAMPLE
// posts (NewsIndex/sample-news.ts) and say so on the page.

const LAYOUTS: Record<string, React.ComponentType> = {
  wire: NewsWire,
  'front-page': NewsFrontPage,
  briefing: NewsBriefing,
  // Round 2: three takes on B, for a steady feed and jumping on trends.
  'live-front': NewsLiveFront,
  'trend-desk': NewsTrendDesk,
  developing: NewsDeveloping,
  // Round 3: E with three takes on the section under its hero.
  'desk-rows': () => <NewsTrendDesk Desks={TrendRows} />,
  'desk-board': () => <NewsTrendDesk Desks={TrendBoard} />,
  'desk-lanes': () => <NewsTrendDesk Desks={TrendLanes} />,
};

const prototype = findPrototype('news')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `News ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function NewsVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Layout = LAYOUTS[variant];
  if (!Layout) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      <Layout />
      <PrototypeBar prototype={prototype} current={variant} />
    </div>
  );
}
