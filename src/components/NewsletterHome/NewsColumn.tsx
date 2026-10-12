/**
 * NewsColumn — AI Marketing News beside the homepage's Latest (2026-09-30,
 * /prototypes/home-trim/). Articles are weekly; AI Marketing News is daily, so a slim
 * column of its newest headlines keeps the front page current between
 * articles without a section of its own. Text only: story, headline, when it
 * happened. Reads the same posts /news does: the registry plus posts published
 * from Compose (getNews(), src/lib/published-news.ts). The revalidate webhook
 * refreshes the homepage when a post is published.
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { eventLabel, findStoryIn, postPath } from '@/data/news';
import { getNews } from '@/lib/published-news';

const COUNT = 6;

export default async function NewsColumn() {
  const news = await getNews();
  const posts = news.posts.slice(0, COUNT);
  if (posts.length === 0) return null;
  const story = (slug: string) => findStoryIn(news.stories, slug)?.name ?? '';

  return (
    <aside className="nl-news" aria-labelledby="nl-news-title">
      <div className="nl-news-head">
        <h3 className="nl-news-title" id="nl-news-title"><Link href="/news/">AI Marketing News</Link></h3>
        <span className="nl-news-pace">Daily</span>
      </div>
      <ul className="nl-news-list">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={postPath(p.slug)} className="nl-news-row">
              <span className="nl-news-meta">{story(p.story)} · {eventLabel(p.eventDate)}</span>
              <span className="nl-news-headline">{p.headline}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/news/" className="nl-news-all">All AI Marketing News <ArrowRight size={14} aria-hidden="true" /></Link>
      <p className="nl-news-note">
        Written by Zev, some drafted with AI agents, and every fact checked against the company&apos;s own page.
      </p>
    </aside>
  );
}
