/* What every video-article prototype shares below its opening: the email bar
 * (the same one the live video pages use, right after the video), then the
 * image-led article's reading layout: the sticky "In this article" rail, the
 * body, the navy "get the next one" band, the author and related reading.
 * Only the opening differs between A, B and C: how the video is framed. */

import { AgenticNewsletterBar } from '@/components/Agentic/AgenticNewsletterBar';
import type { ImageArticle } from '@/components/ArticleImage/article';
import ArticleNav from '@/components/ArticleImage/ArticleNav';
import { ArticleBody, ArticleEnd, SignupCard } from '@/components/ArticleImage/shared';
import type { TranscriptSegment } from '@/lib/transcripts';
import { formatMinutes } from '@/lib/article-format';
import './ArticleVideo.css';

/** An image-led article plus what a video article adds: its transcript
 *  (timestamped segments, or plain text for older videos without an SRT), and
 *  anything the article declares to show after the body (a workflow pipeline). */
export type VideoArticle = ImageArticle & {
  segments: TranscriptSegment[] | null;
  transcriptText?: string;
  extras?: React.ReactNode;
};

/** "15 min video", for the byline, where an image-led article says "min read". */
export const videoDetail = (seconds: number) => `${formatMinutes(seconds) ?? '1 min'} video`;

export function VideoArticleRest({ sections, related, extras, rootClass }: VideoArticle & { rootClass: string }) {
  return (
    <>
      <AgenticNewsletterBar />
      <div className="ai-guide-grid av-grid">
        <ArticleNav sections={sections} bodySelector={`.${rootClass} .ai-body`} />
        <div className="ai-guide-main">
          <ArticleBody sections={sections} />
          {extras}
        </div>
      </div>
      <div className="ai-cover-ask">
        <div className="ai-col">
          <SignupCard tone="dark" title="Liked this? Get the next one." />
        </div>
      </div>
      <div className="ai-guide-grid av-grid">
        <div aria-hidden="true" />
        <div className="ai-guide-main">
          <ArticleEnd related={related} />
        </div>
      </div>
    </>
  );
}
