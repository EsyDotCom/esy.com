import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { NewsPostPage, NewsStoryPage, postJsonLd } from '@/components/News/News';
import { findPost, findStory, liveStories, postPath, publishedPosts } from '@/data/news';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsIndex/NewsIndex.css';
import '@/components/NewsPost/NewsPost.css';
import '@/components/News/News.css';

// One address space for AI News: /news/<post>/ is a post (I · D · Spec sheet
// from /prototypes/news-post/), /news/<story>/ is a story's page. Post and
// story slugs never collide (src/data/news/index.ts). Drafts 404.

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return [...publishedPosts().map((p) => ({ slug: p.slug })), ...liveStories().map((s) => ({ slug: s.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (post) {
    const title = `${post.headline} — AI News`;
    return {
      title,
      description: post.dek,
      openGraph: {
        title, description: post.dek, type: 'article', url: `https://esy.com${postPath(post.slug)}`, siteName: 'Esy',
        publishedTime: post.publishedAt, authors: ['Zev Uhuru'],
      },
      twitter: { card: 'summary_large_image', title, description: post.dek, site: '@EsyDotCom' },
      alternates: { canonical: postPath(post.slug) },
    };
  }
  const story = findStory(slug);
  if (story) {
    const title = `${story.name}: every post — AI News`;
    return {
      title,
      description: story.line,
      openGraph: { title, description: story.line, type: 'website', url: `https://esy.com/news/${story.slug}/`, siteName: 'Esy' },
      alternates: { canonical: `/news/${story.slug}/` },
    };
  }
  return {};
}

export default async function NewsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPost(slug);
  const story = post ? null : findStory(slug);
  if (!post && !(story && liveStories().includes(story))) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      {post ? (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd(post)) }} />
          <NewsPostPage post={post} />
        </>
      ) : (
        <NewsStoryPage story={story!} />
      )}
    </div>
  );
}
