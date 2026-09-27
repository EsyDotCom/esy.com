/* Image-led article A · Editorial: a magazine read.
 *
 * Title, summary and byline in a narrow reading column; the lead image wider
 * than the text, with a caption; then the body in the same column. The
 * newsletter card sits partway through (after the second section), where a
 * reader who's still going is most likely to want the next one, and the
 * author and related reading close the page. */

import Image from 'next/image';
import { isRemote, type ImageArticle } from './article';
import { ArticleBody, ArticleEnd, Byline, SignupCard, TopicKicker } from './shared';

export default function ArticleEditorial({ article, image, sections, minutes, topic, related }: ImageArticle) {
  return (
    <article className="ai ai-editorial">
      {/* ── The head: topic, title, summary, byline ───────────────────── */}
      <header className="ai-col ai-head">
        <TopicKicker topic={topic} />
        <h1 className="ai-title">{article.title}</h1>
        {article.description && <p className="ai-dek">{article.description}</p>}
        <Byline publishedAt={article.publishedAt} minutes={minutes} />
      </header>

      {/* ── The lead image: wider than the text, captioned ─────────────── */}
      {image && (
        <figure className="ai-figure ai-figure--wide">
          <div className="ai-figure-frame">
            <Image src={image.src} alt={image.alt} fill priority unoptimized={isRemote(image.src)} sizes="(max-width: 1100px) 100vw, 1040px" />
          </div>
          <figcaption>{image.caption}</figcaption>
        </figure>
      )}

      {/* ── The body, with the signup after the second section ─────────── */}
      <div className="ai-col">
        <ArticleBody sections={sections} insertAfter={2} insert={<SignupCard />} />
        <ArticleEnd related={related} />
      </div>
    </article>
  );
}
