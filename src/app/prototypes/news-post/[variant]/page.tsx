import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import PrototypeBar from '@/components/prototypes/PrototypeBar';
import { findPrototype } from '@/components/prototypes/registry';
import { PostAtAGlance, PostBrief, PostInStory } from '@/components/NewsPost/NewsPost';
import { PostStoryGlance, PostStoryRail, PostStorySoFar } from '@/components/NewsPost/NewsPostStory';
import { PostChapters, PostEditorial, PostSpecSheet } from '@/components/NewsPost/NewsPostD';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsIndex/NewsIndex.css';
import '@/components/NewsPost/NewsPost.css';
import '@/components/News/News.css';
import { NewsPostPage } from '@/components/News/News';
import { findPostIn } from '@/data/news';
import { getNews } from '@/lib/published-news';

// One AI News post-page direction, in the real site chrome and the
// publication's `.nl` scope. All three render the same real post
// (NewsPost/post.ts): Meta's Muse for Small Business.

const LAYOUTS: Record<string, React.ComponentType> = {
  brief: PostBrief,
  'in-story': PostInStory,
  'at-a-glance': PostAtAGlance,
  // Round 2: three takes on B.
  'story-glance': PostStoryGlance,
  'story-rail': PostStoryRail,
  'story-so-far': PostStorySoFar,
  // Round 3: three takes on D, with a more considered story and key facts.
  editorial: PostEditorial,
  chapters: PostChapters,
  'spec-sheet': PostSpecSheet,
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

// Round 4: the live post page with Zev's take. The take is sample text (it's
// his to write); the post, its facts and the linked article are real.
const SAMPLE_TAKE =
  'I wouldn’t change a page while this is still rolling out: you’d be measuring against a moving target. When Google marks it finished, compare the two weeks before September 24 with the two weeks after, page by page.\n\nSample text: in a real take, Zev links the article where he went deeper, like [I Built an AI Worker That Runs Its Own Shifts](https://esy.com/articles/i-built-an-ai-worker/).';

async function PostWithTake() {
  const news = await getNews();
  const post = findPostIn(news.posts, 'google-september-2026-spam-update');
  if (!post) notFound();
  return <NewsPostPage post={{ ...post, take: SAMPLE_TAKE }} news={news} sample />;
}

export default async function NewsPostVariantPage({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Layout = variant === 'with-take' ? PostWithTake : LAYOUTS[variant];
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
