/* The article page for an article with a video (2026-09-27): B · Theater. The
 * title in white over a navy room, the video centred beneath in a spotlight
 * with a thin jade ring, the transcript under the room, then the same reading
 * layout as the image-led articles (email bar, contents rail, body, signup,
 * author, related). It replaces the full-width black player
 * (src/app/engineer/[slug]/client.tsx, retired). The prototypes are at
 * /prototypes/article-video/.
 *
 * Carries over what the old page showed: the timestamped transcript (or the
 * plain one for videos without an SRT), the workflow pipeline for articles
 * that declare stages, and "Try this workflow" for articles with a template. */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import LightHeader from '@/components/LightHeader/LightHeader';
import { buildImageArticle } from '@/components/ArticleImage/build';
import { nlSerif } from '@/components/NewsletterHome/serif';
import type { AgenticVideo } from '@/data/agentic-videos';
import { toNavArticles } from '@/lib/nav-articles';
import type { TranscriptSegment } from '@/lib/transcripts';
import VideoTheater from './VideoTheater';
import WorkflowPipeline from './WorkflowPipeline';

export default function VideoArticlePage({
  article,
  all,
  segments,
}: {
  article: AgenticVideo;
  all: AgenticVideo[];
  segments: TranscriptSegment[] | null;
}) {
  // What the article declares to show after its body.
  const extras = (
    <>
      {article.stages && article.stages.length > 0 && <WorkflowPipeline stages={article.stages} />}
      {article.templateSlug && (
        <aside className="av-template">
          <p className="av-template-title">Try this workflow</p>
          <p className="av-template-body">Open the template and create your first artifact in minutes.</p>
          <Link href={`/workflows/${article.templateSlug}`} className="av-template-cta">
            Open template <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </aside>
      )}
    </>
  );

  return (
    <div className={`nl ${nlSerif.variable}`}>
      <LightHeader latest={toNavArticles(all)} />
      <VideoTheater
        {...buildImageArticle(article, all, null)}
        segments={segments}
        transcriptText={article.transcript || undefined}
        extras={extras}
      />
    </div>
  );
}
