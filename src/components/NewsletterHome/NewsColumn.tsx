/**
 * NewsColumn — AI Marketing News beside the homepage's Latest (2026-09-30,
 * /prototypes/home-trim/). Articles are weekly; AI Marketing News is daily, so a slim
 * column of its newest headlines keeps the front page current between
 * articles without a section of its own. Text only: story, headline, when it
 * happened. Reads the same posts /news does (src/data/news).
 */
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NEWS_STORIES, eventLabel, postPath, publishedPosts } from '@/data/news';

const COUNT = 6;

export default function NewsColumn() {
  const posts = publishedPosts().slice(0, COUNT);
  if (posts.length === 0) return null;
  const story = (slug: string) => NEWS_STORIES.find((s) => s.slug === slug)?.name ?? '';

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
        Researched, written and checked against each company&apos;s own page by a team of agents in{' '}
        <a href="https://compose.esy.com" target="_blank" rel="noopener noreferrer">Compose</a>, then approved by hand.
      </p>
    </aside>
  );
}
