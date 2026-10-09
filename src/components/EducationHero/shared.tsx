/* Pieces every education hero shares: the signup, the byline, the channel
 * line, and the lesson row. Copy rule for these heroes: sell what the reader
 * learns, never the software. Esy OS, workflows, and runs don't appear above
 * the fold. SEOPage appears only inside a piece that is actually about it.
 *
 * These heroes render inside NewsletterHomePage's `.nl` scope, so they pick
 * up its tokens (--nl-navy, --nl-jade…), its display serif, and the signup's
 * styles. */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Linkedin, PlayCircle, Youtube } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import type { Lesson } from './desks';
import './EducationHero.css';

export const YOUTUBE_URL = 'https://www.youtube.com/@EsyDotCom';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/zevuhuru/';

/** The one action. Same Beehiiv-backed list as every other signup on the site;
 *  the hook sends the page path, so prototype signups are tagged by URL. */
export function EduSignup({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  return <NewsletterSignup form="hero" tone={tone} note="Free · one email a week · unsubscribe anytime" />;
}

/** Who teaches it, and why they're worth listening to: they run what they write about. */
export function Byline({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`eh-byline${compact ? ' eh-byline--compact' : ''}`}>
      <span className="eh-byline-photo">
        <Image src="/images/zev-uhuru.png" alt="" width={88} height={88} />
      </span>
      <p>
        <b>Zev Uhuru</b>
        <span>Builds clip.art and SEOPage on the systems he writes about.</span>
      </p>
    </div>
  );
}

/** Where else the teaching happens. The email is the home; these are the doors in. */
export function ChannelLine() {
  return (
    <p className="eh-channels">
      <span>Also on</span>
      <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
        <Youtube size={15} aria-hidden="true" /> YouTube
      </a>
      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
        <Linkedin size={14} aria-hidden="true" /> LinkedIn
      </a>
    </p>
  );
}

/** One row of a desk: a published article links out; a planned one says "Coming up". */
export function LessonRow({ lesson }: { lesson: Lesson }) {
  if (!lesson.published || !lesson.href) {
    return (
      <li className="eh-lesson eh-lesson--upcoming">
        <span className="eh-lesson-title">{lesson.title}</span>
        <span className="eh-lesson-meta">Coming up</span>
      </li>
    );
  }
  return (
    <li className="eh-lesson">
      <Link href={lesson.href} className="eh-lesson-link">
        <span className="eh-lesson-title">
          {lesson.video && <PlayCircle size={15} aria-hidden="true" className="eh-lesson-icon" />}
          {lesson.title}
        </span>
        <span className="eh-lesson-meta">
          {lesson.meta} <ArrowUpRight size={13} aria-hidden="true" />
        </span>
      </Link>
    </li>
  );
}
