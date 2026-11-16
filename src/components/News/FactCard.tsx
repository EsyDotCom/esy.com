/* The AI Marketing News fact card (2026-09-30): every post's cover, drawn from the
 * post itself, so it's always about the story. The company (its official
 * logo where its terms allow, its name otherwise), the card title, three key
 * facts, the news date, and AI Marketing News in the corner. The share image
 * (app/news/[slug]/opengraph-image.tsx) draws the same card at 1200×630.
 */
/* eslint-disable @next/next/no-img-element -- small official SVG logos, unchanged */
import { DEFAULT_DESK, NEWS_DESKS, deskOf, eventLabel, type NewsDesk, type NewsPost, type NewsStory } from '@/data/news';

/** "esy.com/news" or "esy.com/news/ai-and-power", for a card's corner. */
const deskAddress = (desk: NewsDesk) => `esy.com${NEWS_DESKS[desk].path.replace(/\/$/, '')}`;

/** The company: its logo if cleared, its name set in type otherwise. */
export function CompanyMark({ story, tone = 'dark' }: { story: NewsStory; tone?: 'dark' | 'light' }) {
  const { company } = story;
  if (company.logo) {
    return <img className="nfc-logo" src={tone === 'dark' ? company.logo.onDark : company.logo.onLight} alt={company.name} />;
  }
  return <span className="nfc-company">{company.name}</span>;
}

/** The story comes from the caller (the registry's, or one built from a post published in
 *  Compose), so a post whose story can't be found draws without the company, never crashes. */
export function FactCard({ post, story, size = 'lg' }: { post: NewsPost; story: NewsStory | undefined; size?: 'lg' | 'sm' }) {
  return (
    <span className={`nfc nfc--${size}`} role="img" aria-label={`${story ? `${story.company.name}: ` : ''}${post.card.title}. ${post.card.facts.join(', ')}.`}>
      <span className="nfc-in">
      <span className="nfc-top">
        {story && <CompanyMark story={story} />}
        <span className="nfc-brand">{NEWS_DESKS[deskOf(post)].name}</span>
      </span>
      <span className="nfc-story">{story?.name}</span>
      <span className="nfc-title">{post.card.title}</span>
      <span className="nfc-facts">
        {post.card.facts.map((f) => <span key={f}>{f}</span>)}
      </span>
      <span className="nfc-foot">
        <span>{eventLabel(post.eventDate)}{post.eventDate.length > 7 ? ', ' : ' '}{post.eventDate.slice(0, 4)}</span>
        <span>{deskAddress(deskOf(post))}</span>
      </span>
      </span>
    </span>
  );
}

/** A story's card, for its page: the company, the story, how many posts. */
export function StoryCard({ story, count, latest, desk = DEFAULT_DESK }: { story: NewsStory; count: number; latest: string; desk?: NewsDesk }) {
  return (
    <span className="nfc nfc--lg" role="img" aria-label={`${story.company.name}: ${story.name}, ${count} posts.`}>
      <span className="nfc-in">
      <span className="nfc-top">
        <CompanyMark story={story} />
        <span className="nfc-brand">{NEWS_DESKS[desk].name}</span>
      </span>
      <span className="nfc-story">The story</span>
      <span className="nfc-title">{story.name}</span>
      <span className="nfc-facts"><span>{count} {count === 1 ? 'post' : 'posts'}</span><span>Latest news {latest}</span></span>
      <span className="nfc-foot"><span>{story.line}</span><span>{deskAddress(desk)}</span></span>
      </span>
    </span>
  );
}
