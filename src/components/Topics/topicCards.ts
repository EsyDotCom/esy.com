import type { AgenticVideo } from '@/data/agentic-videos';
import { TOPICS, articlesForTopic, topicHref } from '@/data/topics';
import { articlePath } from '@/lib/article-path';
import { formatDate, formatMinutes } from '@/lib/article-format';
import type { TopicCard } from '@/components/TopicsProto/TopicsTakes';

/* Each topic as plain data the topics page can render (2026-10-09): its
   cover, count and newest articles. Shared by the live /topics (T3 ·
   Explorer) and its prototypes, so they can't drift apart. Covers were
   generated through api.esy.com in the newsletter's series style
   (scripts/generate-newsletter-covers.mjs, COVERS_SET=topics). */
export function topicCards(articles: AgenticVideo[]): { topics: TopicCard[]; total: number } {
  const topics = TOPICS.map((t) => {
    const inTopic = articlesForTopic(articles, t);
    return {
      slug: t.slug,
      name: t.name,
      description: t.description,
      href: topicHref(t.slug),
      count: inTopic.length,
      cover: `/images/topics/${t.slug}.webp`,
      articles: inTopic.slice(0, 4).map((a) => ({
        title: a.title,
        href: articlePath(a.slug),
        date: formatDate(a.publishedAt) ?? '',
        minutes: formatMinutes(a.durationSeconds) ?? '',
      })),
    };
  });
  // Every article filed under any topic, counted once (an article can sit in several).
  const total = new Set(TOPICS.flatMap((t) => articlesForTopic(articles, t).map((a) => a.slug))).size;
  return { topics, total };
}
