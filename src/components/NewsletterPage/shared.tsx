'use client';

/* Shared pieces for the newsletter page and its issue pages (2026-10-09): the
   prototype signup, the archive row and card, an issue's meta line and body,
   and the next/previous links. Issues open as their own pages (no pop-ups), so
   every archive piece takes an `href` for the issue. Each take is a different
   arrangement of these, so a merge round is a small new component. */

import { createContext, useContext, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Copy, MailCheck } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterHome/NewsletterSignup';
import { findPost, postPath } from '@/data/news';
import { type Issue, type IssueSection, issueDate } from './issues';

/** Where an issue opens. Built on the client from a plain string a server page
    can pass: a template with {n} or {slug}, e.g. '/newsletter/{slug}/' (live)
    or '/prototypes/newsletter-issue/letter/?issue={n}' (prototypes). */
export type IssueHref = (issue: Issue) => string;
export const issueHref = (template: string): IssueHref => (issue) =>
  template.replace('{n}', String(issue.n)).replace('{slug}', issue.slug);

/* Where these components are running (2026-10-09). The prototypes and the live
   /newsletter pages share every component; this says which one they're in:
   - link:    where an issue opens (a template, see issueHref)
   - archive: where "All issues" goes
   - live:    the real site. The signup really subscribes, and while the
              issues are samples, dates show "Sample issue" instead: a past
              date would claim an issue went out that never did. */
export interface NewsletterMode { link: string; archive: string; live: boolean }
const ModeContext = createContext<NewsletterMode>({
  link: '/prototypes/newsletter-issue/cover/?issue={n}',
  archive: '/prototypes/newsletter/wide-feed/',
  live: false,
});
export const NewsletterModeProvider = ModeContext.Provider;
export const useNewsletterMode = () => useContext(ModeContext);
export const useIssueHref = () => issueHref(useContext(ModeContext).link);

/** An issue's date as a label: the date in prototypes, "Sample issue" on the live site. */
export function useDateLabel() {
  const { live } = useContext(ModeContext);
  return (issue: Issue) => (live ? 'Sample issue' : issueDate(issue.date));
}

/** The signup for these pages: the real one on the live site, the prototype one elsewhere. */
export function PageSignup({ tone = 'light', form }: { tone?: 'light' | 'dark'; form: string }) {
  const { live } = useContext(ModeContext);
  if (live) return <NewsletterSignup tone={tone} form={form} askName note="Free, every week. Unsubscribe in one click." />;
  return <ProtoSignup tone={tone} />;
}

/* The signup, in the site's own markup and classes (.nl-signup), that never
   posts: prototypes must not add anyone to the real list. Submitting shows the
   real success state and says it's a prototype. */
export function ProtoSignup({ tone = 'light', cta = 'Subscribe', note }: { tone?: 'light' | 'dark'; cta?: string; note?: string }) {
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <div className={`nl-signup nl-signup--${tone}`}>
        <p className="nl-signup-done" role="status">
          <MailCheck size={18} aria-hidden="true" />
          Prototype: nothing was sent. On the real page this asks you to confirm your email.
        </p>
      </div>
    );
  }
  return (
    <div className={`nl-signup nl-signup--${tone}`}>
      <form className="nl-signup-form" onSubmit={(e) => { e.preventDefault(); setDone(true); }} noValidate>
        <input className="nl-signup-input" type="email" placeholder="you@company.com" aria-label="Email address" />
        <button type="submit" className="nl-signup-btn">
          {cta} <ArrowRight size={16} aria-hidden="true" />
        </button>
      </form>
      <p className="nl-signup-note">{note ?? 'Free, every week. Unsubscribe in one click.'}</p>
    </div>
  );
}

/** "No. 3 · Oct 8, 2026 · 6 min" */
export function IssueMeta({ issue }: { issue: Issue }) {
  const dateLabel = useDateLabel();
  return (
    <p className="nlp-meta">
      <span className="nlp-no">No. {issue.n}</span> · {dateLabel(issue)} · {issue.minutes} min
    </p>
  );
}

/** One archive line: number, date, title, dek. */
export function IssueRow({ issue, href }: { issue: Issue; href: IssueHref }) {
  const dateLabel = useDateLabel();
  return (
    <Link href={href(issue)} className="nlp-row">
      <span className="nlp-row-n">{String(issue.n).padStart(2, '0')}</span>
      <span className="nlp-row-main">
        <span className="nlp-row-title">{issue.title}</span>
        <span className="nlp-row-dek">{issue.dek}</span>
      </span>
      <span className="nlp-row-date">{dateLabel(issue)}</span>
    </Link>
  );
}

/** A card for grid archives: topic, title, dek, meta. */
export function IssueCard({ issue, href }: { issue: Issue; href: IssueHref }) {
  return (
    <Link href={href(issue)} className="nlp-card">
      <span className="nlp-card-topic">{issue.topic}</span>
      <span className="nlp-card-title">{issue.title}</span>
      <span className="nlp-card-dek">{issue.dek}</span>
      <IssueMeta issue={issue} />
    </Link>
  );
}

/** The sections an issue has, in order, for a table of contents. */
export function sectionTitles(issue: Issue): { id: string; label: string }[] {
  return issue.body.flatMap((s, i) => {
    if (s.kind === 'system') return [{ id: `s${i}`, label: s.title }];
    if (s.kind === 'take') return [{ id: `s${i}`, label: s.title }];
    if (s.kind === 'news') return [{ id: `s${i}`, label: 'This week in AI marketing' }];
    return [];
  });
}

/** An issue's body, as the email reads: lead, the system, the skill or prompt, the week's news, next step. */
export function IssueBody({ issue }: { issue: Issue }) {
  return (
    <div className="nlp-body">
      {issue.body.map((s, i) => <Section key={i} id={`s${i}`} s={s} />)}
      <p className="nlp-sign">Zev</p>
    </div>
  );
}

function Section({ s, id }: { s: IssueSection; id: string }) {
  const [copied, setCopied] = useState(false);
  switch (s.kind) {
    case 'lead':
      return <>{s.text.map((t, i) => <p key={i} className="nlp-p">{t}</p>)}</>;
    case 'system':
      return (
        <div className="nlp-system" id={id}>
          <p className="nlp-h">{s.title}</p>
          <ol>
            {s.steps.map((st) => (
              <li key={st.name}><b>{st.name}.</b> {st.does}</li>
            ))}
          </ol>
        </div>
      );
    case 'take':
      // What the reader takes away: a skill or a prompt, never code.
      return (
        <div className="nlp-take" id={id}>
          <p className="nlp-h">{s.title}</p>
          <p className="nlp-p">{s.what}</p>
          <button type="button" className="nlp-take-btn" onClick={() => setCopied(true)}>
            <Copy size={14} aria-hidden="true" /> {copied ? 'Sample: the real issue copies it' : s.label}
          </button>
        </div>
      );
    case 'news':
      return <NewsSection id={id} slugs={s.slugs} />;
    case 'reads':
      return (
        <div className="nlp-reads">
          <p className="nlp-h">Worth your time</p>
          <ul>
            {s.items.map((r) => (
              <li key={r.title}><Link href={r.href}>{r.title}</Link>: {r.why}</li>
            ))}
          </ul>
        </div>
      );
    case 'next':
      return (
        <p className="nlp-next">
          {s.text} <a href={s.href}>{s.cta} <ArrowRight size={13} aria-hidden="true" /></a>
        </p>
      );
  }
}

/** The week's AI marketing news: the real posts' headlines and topics, each linking to its page. */
export function NewsSection({ slugs, id, variant = 'list' }: { slugs: string[]; id?: string; variant?: 'list' | 'cards' }) {
  const posts = slugs.map((s) => findPost(s)).filter((p) => p !== undefined);
  if (!posts.length) return null;
  return (
    <div className={`nlp-news nlp-news--${variant}`} id={id}>
      <p className="nlp-h">This week in AI marketing</p>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={postPath(p.slug)}>
              <span className="nlp-news-topic">{p.topic}</span>
              <span className="nlp-news-head">{p.headline}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="nlp-news-more"><Link href="/news/">All AI Marketing News <ArrowRight size={13} aria-hidden="true" /></Link></p>
    </div>
  );
}

/** "← Older issue / Newer issue →" at the foot of an issue page. */
export function IssueNav({ older, newer, href }: { older?: Issue; newer?: Issue; href: IssueHref }) {
  return (
    <nav className="nlp-nav" aria-label="More issues">
      {older ? (
        <Link href={href(older)} className="nlp-nav-link">
          <span className="nlp-nav-dir"><ArrowLeft size={13} aria-hidden="true" /> No. {older.n}</span>
          <span className="nlp-nav-title">{older.title}</span>
        </Link>
      ) : <span />}
      {newer ? (
        <Link href={href(newer)} className="nlp-nav-link nlp-nav-link--next">
          <span className="nlp-nav-dir">No. {newer.n} <ArrowRight size={13} aria-hidden="true" /></span>
          <span className="nlp-nav-title">{newer.title}</span>
        </Link>
      ) : <span />}
    </nav>
  );
}

/** The quiet line every page carries: what's real and what's a sample. On the
    live site it says plainly that the issues are previews. */
export function SampleNote() {
  const { live } = useContext(ModeContext);
  if (live) {
    return (
      <p className="nlp-sample">
        The first issue goes out soon. These sample issues show what each one looks like: one system, the skills to run it, and the week’s AI marketing news.
      </p>
    );
  }
  return (
    <p className="nlp-sample">
      Prototype. clip.art, SEOPage, Compose, their numbers and the news posts are real; the three issues, their dates and their wording are samples.
    </p>
  );
}
