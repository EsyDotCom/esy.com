/* Turn an article into what the image-led layouts render. One builder for the
 * real article route (src/app/engineer/[slug]) and the prototypes
 * (src/app/prototypes/article), so the two can never disagree. Server-side:
 * it reads the topic list and resolves related articles from the full list. */

import type { AgenticVideo } from '@/data/agentic-videos';
import { topicHref, topicsForArticle } from '@/data/topics';
import { coverFor } from '@/lib/article-format';
import { relatedFrom } from '@/lib/published-articles';
import { readMinutes, splitSections, type ImageArticle, type LeadImage } from './article';

/** The lead image an article carries on its own: its cover image (set in
 *  Compose, with its alt text), else its thumbnail, which was the cover before
 *  Compose had a cover field. Null when it has neither; the cover then shows
 *  the navy ground alone. */
export function leadImageFor(article: AgenticVideo): LeadImage | null {
  const cover = coverFor(article);
  if (cover) return { ...cover, caption: '' };
  if (!article.thumbnailUrl) return null;
  return { src: article.thumbnailUrl, alt: '', caption: '' };
}

export function buildImageArticle(article: AgenticVideo, all: AgenticVideo[], image: LeadImage | null): ImageArticle {
  const firstTopic = topicsForArticle(article)[0];
  return {
    article,
    image,
    sections: splitSections(article.content ?? ''),
    minutes: readMinutes(article.content ?? ''),
    topic: firstTopic ? { name: firstTopic.name, href: topicHref(firstTopic.slug) } : null,
    related: relatedFrom(all, article.slug, article.relatedSlugs ?? [], 3),
  };
}
