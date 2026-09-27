/* Image-led article C · Guide: built for tutorials people skim and come back to.
 *
 * The head splits in two: title, summary, byline and a compact signup on the
 * left, the lead image on the right. Under it, a sticky table of contents made
 * from the article's own sections (the one you're reading lights up), the
 * body, and a reading-progress bar along the top of the screen (ArticleNav). */

import Image from 'next/image';
import { isRemote, type ImageArticle } from './article';
import ArticleNav from './ArticleNav';
import { ArticleBody, ArticleEnd, Byline, SignupCard, TopicKicker } from './shared';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';

export default function ArticleGuide({ article, image, sections, minutes, topic, related }: ImageArticle) {
  return (
    <article className="ai ai-guide">
      {/* ── The head: words and signup left, the image right ───────────── */}
      <header className="ai-guide-head">
        <div className="ai-guide-copy">
          <TopicKicker topic={topic} />
          <h1 className="ai-title">{article.title}</h1>
          {article.description && <p className="ai-dek">{article.description}</p>}
          <Byline publishedAt={article.publishedAt} minutes={minutes} />
          <div className="ai-guide-signup">
            <p>Get one system like this every week.</p>
            <NewsletterSignup note="Free · unsubscribe anytime" />
          </div>
        </div>
        {image && (
          <figure className="ai-figure ai-guide-figure">
            <div className="ai-figure-frame">
              <Image src={image.src} alt={image.alt} fill priority unoptimized={isRemote(image.src)} sizes="(max-width: 960px) 100vw, 560px" />
            </div>
            <figcaption>{image.caption}</figcaption>
          </figure>
        )}
      </header>

      {/* ── The contents beside the body ───────────────────────────────── */}
      <div className="ai-guide-grid">
        <ArticleNav sections={sections} bodySelector=".ai-guide .ai-body" />
        <div className="ai-guide-main">
          <ArticleBody sections={sections} />
          <SignupCard />
          <ArticleEnd related={related} />
        </div>
      </div>
    </article>
  );
}
