'use client';

/* The reading aids the Guide layouts share: a sticky "In this article" list
 * made from the article's own sections (the one you're reading lights up),
 * and a reading-progress bar along the top of the screen. Shared so C · Guide
 * and D · Cover Guide use the same parts rather than copies.
 *
 * `railSignup` puts the weekly email form at the top of the rail, above the
 * list, so the ask stays in view the whole way down the article (D, the
 * default for image-led articles). */

import { useEffect, useState } from 'react';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import type { ArticleSection } from './article';

export default function ArticleNav({
  sections,
  bodySelector,
  railSignup = false,
  label = 'In this article',
}: {
  sections: ArticleSection[];
  /** The element whose scroll position drives the progress bar. */
  bodySelector: string;
  railSignup?: boolean;
  /** The list's heading: "In this article" by default, "In this lesson" on a lesson page. */
  label?: string;
}) {
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(sections[0]?.id ?? '');
  const headed = sections.filter((s) => s.title);

  // Progress and the current section, from the scroll position. A section is
  // "current" once its top passes a third of the way down the screen.
  useEffect(() => {
    const onScroll = () => {
      const body = document.querySelector(bodySelector);
      if (!body) return;
      const rect = body.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      setProgress(Math.min(1, Math.max(0, -rect.top / Math.max(total, 1))));
      let active = sections[0]?.id ?? '';
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 3) active = s.id;
      }
      setCurrent(active);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sections, bodySelector]);

  return (
    <>
      <div className="ai-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className="ai-rail">
        {/* The weekly email, first in the rail and stacked to fit it: the same
            form and list as every other signup on the site. */}
        {railSignup && (
          <aside className="ai-rail-signup" aria-label="Subscribe to The Marketing Engineer">
            <p className="ai-rail-signup-title">The Marketing Engineer</p>
            <p className="ai-rail-signup-body">One AI marketing system a week, built step by step.</p>
            <NewsletterSignup form="article-rail" note="Free · unsubscribe anytime" />
          </aside>
        )}

        {headed.length > 0 && (
          <nav className="ai-toc" aria-label={label}>
            <p className="ai-toc-label">{label}</p>
            <ol>
              {headed.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} aria-current={current === s.id ? 'location' : undefined}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </>
  );
}
