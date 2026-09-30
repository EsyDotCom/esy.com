import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { PostAtAGlance, PostBrief, PostInStory } from '@/components/NewsPost/NewsPost';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsIndex/NewsIndex.css';
import '@/components/NewsPost/NewsPost.css';

// One AI News post-page direction, in the real site chrome and the
// publication's `.nl` scope. All three render the same real post
// (NewsPost/post.ts): Meta's Muse for Small Business.

const LAYOUTS: Record<string, React.ComponentType> = {
  brief: PostBrief,
  'in-story': PostInStory,
  'at-a-glance': PostAtAGlance,
};

const prototype = findPrototype('news-post')!;

export const revalidate = 3600;

export function generateStaticParams() {
  return prototype.variants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const v = prototype.variants.find((x) => x.slug === variant);
  return { title: v ? `News post ${v.key} · ${v.name} — Esy prototypes` : 'Esy prototypes' };
}

export default async function NewsPostVariantPage({ params }: { params: Promise<{ variant: string }> }) {
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
