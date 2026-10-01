/* The AI Marketing News fact card (2026-09-30): every post's cover, drawn from the
 * post itself, so it's always about the story. The company (its official
 * logo where its terms allow, its name otherwise), the card title, three key
 * facts, the news date, and AI Marketing News in the corner. The share image
 * (app/news/[slug]/opengraph-image.tsx) draws the same card at 1200×630.
 */
/* eslint-disable @next/next/no-img-element -- small official SVG logos, unchanged */
import { eventLabel, findStory, type NewsPost, type NewsStory } from '@/data/news';

/** The company: its logo if cleared, its name set in type otherwise. */
export function CompanyMark({ story, tone = 'dark' }: { story: NewsStory; tone?: 'dark' | 'light' }) {
  const { company } = story;
  if (company.logo) {
    return <img className="nfc-logo" src={tone === 'dark' ? company.logo.onDark : company.logo.onLight} alt={company.name} />;
  }
  return <span className="nfc-company">{company.name}</span>;
}

export function FactCard({ post, size = 'lg' }: { post: NewsPost; size?: 'lg' | 'sm' }) {
  const story = findStory(post.story)!;
  return (
    <span className={`nfc nfc--${size}`} role="img" aria-label={`${story.company.name}: ${post.card.title}. ${post.card.facts.join(', ')}.`}>
      <span className="nfc-in">
      <span className="nfc-top">
        <CompanyMark story={story} />
        <span className="nfc-brand">AI Marketing News</span>
      </span>
      <span className="nfc-story">{story.name}</span>
      <span className="nfc-title">{post.card.title}</span>
      <span className="nfc-facts">
        {post.card.facts.map((f) => <span key={f}>{f}</span>)}
      </span>
      <span className="nfc-foot">
        <span>{eventLabel(post.eventDate)}{post.eventDate.length > 7 ? ', ' : ' '}{post.eventDate.slice(0, 4)}</span>
        <span>esy.com/news</span>
      </span>
      </span>
    </span>
  );
}

/** A story's card, for its page: the company, the story, how many posts. */
export function StoryCard({ story, count, latest }: { story: NewsStory; count: number; latest: string }) {
  return (
    <span className="nfc nfc--lg" role="img" aria-label={`${story.company.name}: ${story.name}, ${count} posts.`}>
      <span className="nfc-in">
      <span className="nfc-top">
        <CompanyMark story={story} />
        <span className="nfc-brand">AI Marketing News</span>
      </span>
      <span className="nfc-story">The story</span>
      <span className="nfc-title">{story.name}</span>
      <span className="nfc-facts"><span>{count} {count === 1 ? 'post' : 'posts'}</span><span>Latest news {latest}</span></span>
      <span className="nfc-foot"><span>{story.line}</span><span>esy.com/news</span></span>
      </span>
    </span>
  );
}
