/* The article page for an article without a video (2026-09-27): E · Cover
 * Bar, the default for image-led articles: D · Cover Guide with the video
 * articles' email bar right under the cover. The article's thumbnail (set in
 * Compose) is the cover; with none, the cover is the navy ground alone. Video
 * articles keep their own page (src/app/engineer/[slug]/client.tsx).
 *
 * Rendered in the publication's `.nl` scope, with the same light header the
 * rest of the publication uses. Its prototype, and the four directions it
 * was picked over, are at /prototypes/article/. */

import LightHeader from '@/components/LightHeader/LightHeader';
import { nlSerif } from '@/components/NewsletterHome/serif';
import type { AgenticVideo } from '@/data/agentic-videos';
import { toNavArticles } from '@/lib/nav-articles';
import ArticleCoverGuide from './ArticleCoverGuide';
import { buildImageArticle, leadImageFor } from './build';

export default function ImageArticlePage({ article, all }: { article: AgenticVideo; all: AgenticVideo[] }) {
  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(all)} />
      <ArticleCoverGuide {...buildImageArticle(article, all, leadImageFor(article))} signup="bar" />
    </div>
  );
}
