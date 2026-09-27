/* Pieces every image-led article layout shares: the byline, the body
 * (rendered section by section), the signup card, and the end of the article
 * (author and related reading).
 *
 * The layouts render inside the publication's `.nl` scope, so they use its
 * tokens, its display serif, and the site-wide newsletter signup, which posts
 * to the same list as every other form. */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import EnhancedMarkdownRenderer from '@/components/SchoolArticle/EnhancedMarkdownRenderer';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import { articlePath } from '@/lib/article-path';
import { formatDate } from '@/lib/article-format';
import type { AgenticVideo } from '@/data/agentic-videos';
import { longDate, type ArticleSection } from './article';
import '@/components/NewsletterHome/NewsletterHome.css';
import './ArticleImage.css';

/** Who wrote it, when, and how long it takes. `detail` replaces "N min read"
 *  (a video article says how long the video is). `onDark` for the covers. */
export function Byline({
  publishedAt,
  minutes,
  detail,
  onDark = false,
}: {
  publishedAt: string;
  minutes: number;
  detail?: string;
  onDark?: boolean;
}) {
  return (
    <div className={`ai-byline${onDark ? ' ai-byline--onDark' : ''}`}>
      <span className="ai-byline-photo">
        <Image src="/images/zev-uhuru.png" alt="" width={88} height={88} />
      </span>
      <span className="ai-byline-text">
        <b>Zev Uhuru</b>
        <span>
          {longDate(publishedAt)} · {detail ?? `${minutes} min read`}
        </span>
      </span>
    </div>
  );
}

/** The article body: each ## section in its own anchored wrapper (the renderer
 *  gives headings no ids). `insert` (a signup card) goes after the section at
 *  index `insertAfter`. */
export function ArticleBody({
  sections,
  insertAfter,
  insert,
}: {
  sections: ArticleSection[];
  insertAfter?: number;
  insert?: React.ReactNode;
}) {
  return (
    <div className="ai-body">
      {sections.map((s, i) => (
        <div key={s.id}>
          <section id={s.id} className="ai-section">
            <EnhancedMarkdownRenderer content={s.markdown} light />
          </section>
          {i === insertAfter && insert}
        </div>
      ))}
    </div>
  );
}

/** The newsletter card that sits inside or after the article. */
export function SignupCard({
  title = 'Get the next one in your inbox',
  body = 'One email a week: one AI marketing system, built step by step, and what it did.',
  tone = 'light',
}: {
  title?: string;
  body?: string;
  tone?: 'light' | 'dark';
}) {
  return (
    <aside className={`ai-signup ai-signup--${tone}`} aria-label="Subscribe to The Marketing Engineer">
      <p className="ai-signup-kicker">The Marketing Engineer · Free weekly email</p>
      <p className="ai-signup-title">{title}</p>
      <p className="ai-signup-body">{body}</p>
      <NewsletterSignup tone={tone} note="Free · unsubscribe anytime" />
    </aside>
  );
}

/** The end of the article: who wrote it, and what to read next. */
export function ArticleEnd({ related }: { related: AgenticVideo[] }) {
  return (
    <footer className="ai-end">
      <div className="ai-author">
        <span className="ai-author-photo">
          <Image src="/images/zev-uhuru.png" alt="Zev Uhuru" width={144} height={144} />
        </span>
        <div>
          <p className="ai-author-name">Zev Uhuru</p>
          <p className="ai-author-bio">
            Marketing engineer. I build the AI systems that run clip.art and SEOPage, and write up how each one works.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <nav className="ai-related" aria-label="Read next">
          <p className="ai-related-label">Read next</p>
          <ul>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={articlePath(r.slug)}>
                  <span className="ai-related-title">{r.title}</span>
                  <span className="ai-related-meta">
                    {[r.categoryLabel, formatDate(r.publishedAt)].filter(Boolean).join(' · ')}{' '}
                    <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </footer>
  );
}

/** Where the article sits: its topic hub, when it has one. */
export function TopicKicker({ topic, onDark = false }: { topic: { name: string; href: string } | null; onDark?: boolean }) {
  if (!topic) return <p className={`ai-kicker${onDark ? ' ai-kicker--onDark' : ''}`}>The Marketing Engineer</p>;
  return (
    <p className={`ai-kicker${onDark ? ' ai-kicker--onDark' : ''}`}>
      <Link href={topic.href}>{topic.name}</Link>
    </p>
  );
}
