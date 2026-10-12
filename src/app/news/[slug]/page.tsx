import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import { NewsPostPage, NewsStoryPage, postJsonLd } from '@/components/News/News';
import { findPostIn, findStoryIn, liveStories, liveStoriesOf, postPath, publishedPosts, type NewsData } from '@/data/news';
import { toNavArticles } from '@/lib/nav-articles';
import { getAllAgenticArticles } from '@/lib/published-articles';
import { getNews } from '@/lib/published-news';
import '@/components/NewsletterHome/NewsletterHome.css';
import '@/components/NewsIndex/NewsIndex.css';
import '@/components/NewsPost/NewsPost.css';
import '@/components/News/News.css';

// One address space for AI Marketing News: /news/<post>/ is a post (I · D · Spec sheet
// from /prototypes/news-post/), /news/<story>/ is a story's page. Post and
// story slugs never collide (src/data/news/index.ts). Drafts 404.
//
// Registry posts and stories prerender at build; posts published from Compose
// (and their stories) render on demand (dynamicParams), like articles. The
// revalidate webhook refreshes them; the hourly revalidate is the backstop.

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return [...publishedPosts().map((p) => ({ slug: p.slug })), ...liveStories().map((s) => ({ slug: s.slug }))];
}

// The post at this slug, or else a story with at least one post; drafts and
// unknown slugs resolve to neither.
function resolve(news: NewsData, slug: string) {
  const post = findPostIn(news.posts, slug);
  const story = post ? undefined : findStoryIn(news.stories, slug);
  const live = story && liveStoriesOf(news.posts, news.stories).includes(story) ? story : undefined;
  return { post, story, live };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { post, story } = resolve(await getNews(), slug);
  if (post) {
    const title = `${post.headline} — AI Marketing News`;
    return {
      title,
      description: post.dek,
      openGraph: {
        title, description: post.dek, type: 'article', url: `https://esy.com${postPath(post.slug)}`, siteName: 'Esy',
        publishedTime: post.publishedAt, authors: ['Zev Uhuru'],
      },
      twitter: { card: 'summary_large_image', title, description: post.dek, site: '@EsyDotCom' },
      // Large image previews in Discover and Top Stories; the RSS feed for readers and publisher tools.
      robots: { index: true, follow: true, 'max-image-preview': 'large' },
      alternates: { canonical: postPath(post.slug), types: { 'application/rss+xml': [{ url: '/news/rss.xml', title: 'AI Marketing News' }] } },
    };
  }
  if (story) {
    const title = `${story.name}: every post — AI Marketing News`;
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
  const news = await getNews();
  const { post, live: story } = resolve(news, slug);
  if (!post && !story) notFound();
  const articles = await getAllAgenticArticles();

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(articles)} />
      {post ? (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd(post, findStoryIn(news.stories, post.story))) }} />
          <NewsPostPage post={post} news={news} />
        </>
      ) : (
        <NewsStoryPage story={story} news={news} />
      )}
    </div>
  );
}
