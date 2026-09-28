/* Image-led article B · Cover: the picture is the cover.
 *
 * The lead image fills the top of the screen, with a navy shade rising from
 * the bottom-left so the title, summary and byline can sit on it in white.
 * Then a centred body with nothing beside it, and a navy "get the next one"
 * band at the end, the page's one ask. */

import Image from 'next/image';
import { isRemote, type ImageArticle } from './article';
import { ArticleBody, ArticleEnd, Byline, SignupCard, TopicKicker } from './shared';

export default function ArticleCover({ article, image, sections, minutes, topic, related }: ImageArticle) {
  return (
    <article className="ai ai-cover">
      {/* ── The cover: the image, a shade, the head on top ─────────────── */}
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
      {image?.caption && <p className="ai-col ai-cover-credit">{image.caption}</p>}

      {/* ── The body, then the ask ─────────────────────────────────────── */}
      <div className="ai-col">
        <ArticleBody sections={sections} />
      </div>
      <div className="ai-cover-ask">
        <div className="ai-col">
          <SignupCard tone="dark" title="Liked this? Get the next one." />
        </div>
      </div>
      <div className="ai-col">
        <ArticleEnd related={related} />
      </div>
    </article>
  );
}
