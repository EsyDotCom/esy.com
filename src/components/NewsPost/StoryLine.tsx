'use client';
/* G's story line (2026-09-30): the story's posts as named chapters, oldest
 * first, each one clickable. Earlier posts don't have pages yet, so a click
 * opens a preview under the line (headline, summary, why it matters); the
 * current chapter closes it. */
import { useState } from 'react';
import { dayLabel } from '@/components/NewsIndex/news-examples';
import { CHAPTER_NAMES, POST, STORY } from './post';

const CHAPTERS = [...STORY].reverse();

export default function StoryLine() {
  const [open, setOpen] = useState<string | null>(null);
  const preview = CHAPTERS.find((p) => p.slug === open);
  return (
    <nav className="npg-story-wrap" aria-label={`The ${POST.trend} story`}>
      <div className="npg-story">
        <p className="npg-story-name"><span>The story</span> {POST.trend} <small>{CHAPTERS.length} posts</small></p>
        <ol>
          {CHAPTERS.map((p, i) => {
            const here = p.slug === POST.slug;
            const on = here ? !open : open === p.slug;
            return (
              <li key={p.slug}>
                <button
                  className={`${here ? 'is-here' : ''} ${on ? 'is-on' : ''}`}
                  aria-expanded={here ? undefined : open === p.slug}
                  aria-current={here ? 'page' : undefined}
                  onClick={() => setOpen(here || open === p.slug ? null : p.slug)}
                >
                  <b>{i + 1}</b>
                  <span className="npg-ch-name">{CHAPTER_NAMES[p.slug] ?? p.headline}</span>
                  <span className="npg-ch-date">{here ? 'This post' : dayLabel(p.publishedAt)}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      {preview && (
        <div className="npg-preview" aria-live="polite">
          <p className="nw-meta">
            <span className={`nw-label nw-label--${preview.label.toLowerCase()}`}>{preview.label}</span>
            <span>{dayLabel(preview.publishedAt)}</span>
            <a className="nw-source" href={preview.source.url} target="_blank" rel="noopener noreferrer">via {preview.source.name}</a>
          </p>
          <p className="npg-preview-title">{preview.headline}</p>
          <p className="npg-preview-dek">{preview.dek}</p>
          <p className="npg-preview-why"><b>Why it matters</b> {preview.why}</p>
          <button className="npg-preview-close" onClick={() => setOpen(null)}>Back to this post</button>
        </div>
      )}
    </nav>
  );
}
