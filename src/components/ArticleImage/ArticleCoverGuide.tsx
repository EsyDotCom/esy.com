/* Image-led article D · Cover Guide: B's cover, C's reading layout.
 *
 * B's first screen: the lead image fills it, with the title, summary and
 * byline on it in white. Under the cover, C's layout: the sticky "In this
 * article" list in a left rail with the email signup under it, the
 * article on the right, and the reading-progress bar. B's navy "get the next
 * one" band closes the page.
 *
 * `signup` picks where the first email ask sits: 'rail' (D) puts the form at
 * the top of the left rail, 'bar' (E) puts the same full-width bar that sits
 * under the video on video articles right under the cover, and leaves the rail
 * to the contents. */

import Image from 'next/image';
import { isRemote, type ImageArticle } from './article';
import ArticleNav from './ArticleNav';
import { AgenticNewsletterBar } from '@/components/Agentic/AgenticNewsletterBar';
import { ArticleBody, ArticleEnd, Byline, SignupCard, TopicKicker } from './shared';

type CoverGuideProps = ImageArticle & { signup?: 'rail' | 'bar' };

export default function ArticleCoverGuide({ article, image, sections, minutes, topic, related, signup = 'rail' }: CoverGuideProps) {
  return (
    <article className="ai ai-cover ai-cover-guide">
      {/* ── B: the cover ───────────────────────────────────────────────── */}
      <header className="ai-cover-hero">
        {image && (
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="ai-cover-img" unoptimized={isRemote(image.src)} />
        )}
        <div className="ai-cover-shade" aria-hidden="true" />
        <div className="ai-cover-head">
          <TopicKicker topic={topic} onDark />
          <h1 className="ai-title ai-title--onDark">{article.title}</h1>
          {article.description && <p className="ai-dek ai-dek--onDark">{article.description}</p>}
          <Byline publishedAt={article.publishedAt} minutes={minutes} onDark />
        </div>
      </header>

      {/* E: the video articles' email bar, right under the cover. */}
      {signup === 'bar' && <AgenticNewsletterBar />}

      {/* ── C: the contents in a left rail, the article on the right ───── */}
      <div className="ai-guide-grid ai-cover-guide-grid">
        <ArticleNav sections={sections} bodySelector=".ai-cover-guide .ai-body" railSignup={signup === 'rail'} />
        <div className="ai-guide-main">
          {image?.caption && <p className="ai-cover-guide-credit">{image.caption}</p>}
          <ArticleBody sections={sections} />
        </div>
      </div>

      {/* ── B: the ask, then the author and what to read next ─────────── */}
      <div className="ai-cover-ask" id="next-issue">
        <div className="ai-col">
          <SignupCard tone="dark" title="Liked this? Get the next one." />
        </div>
      </div>
      <div className="ai-guide-grid ai-cover-guide-grid">
        <div aria-hidden="true" />
        <div className="ai-guide-main">
          <ArticleEnd related={related} />
        </div>
      </div>
    </article>
  );
}

/** E · Cover Bar: D with the email bar under the cover instead of in the rail. */
export const ArticleCoverBar = (props: ImageArticle) => <ArticleCoverGuide {...props} signup="bar" />;
