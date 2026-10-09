'use client';

/* One issue of The Marketing Engineer as its own page, three takes
   (2026-10-09). The decision: how should a single issue read on the web, for
   someone who arrives from a shared link or from the archive?

   L1 · Letter   The email as a letter: one narrow column, masthead line,
                 title, the issue, the signup at the end, older/newer links.
   L2 · Guide    A reading page with a rail: the issue's sections listed and
                 the signup kept beside you while you read.
   L3 · Cover    A navy cover band with the issue number big, like a magazine;
                 the system, then the week's news as cards; a full-width
                 signup band and the other issues under it.

   All read the same sample issues; no signup sends. */

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { type Issue, ISSUES, neighbours } from './issues';
import { IssueBody, IssueMeta, IssueNav, IssueRow, PageSignup, SampleNote, issueHref, sectionTitles, useDateLabel, useNewsletterMode } from './shared';
import { PROMISE } from './Takes';

function BackToArchive() {
  const { archive } = useNewsletterMode();
  return (
    <Link href={archive} className="nlp-back">
      <ArrowLeft size={14} aria-hidden="true" /> All issues
    </Link>
  );
}

/* L1 · Letter */
export function IssueLetter({ issue, link }: { issue: Issue; link: string }) {
  const href = issueHref(link);
  const { older, newer } = neighbours(issue.n);
  return (
    <main className="nlp">
      <article className="nlp-letter">
        <BackToArchive />
        <p className="nl-kicker">The Marketing Engineer</p>
        <IssueMeta issue={issue} />
        <h1 className="nlp-issue-title">{issue.title}</h1>
        <p className="nlp-dek">{issue.dek}</p>
        <IssueBody issue={issue} />
        <div className="nlp-end">
          <p className="nlp-h">Get the next issue</p>
          <p className="nlp-aside-sub">{PROMISE}</p>
          <PageSignup />
        </div>
        <IssueNav older={older} newer={newer} href={href} />
        <SampleNote />
      </article>
    </main>
  );
}

/* L2 · Guide */
export function IssueGuide({ issue, link }: { issue: Issue; link: string }) {
  const href = issueHref(link);
  const { older, newer } = neighbours(issue.n);
  const toc = sectionTitles(issue);
  return (
    <main className="nlp">
      <div className="nlp-wrap nlp-guide">
        <aside className="nlp-guide-rail">
          <BackToArchive />
          <p className="nlp-label">In this issue</p>
          <ol className="nlp-toc">
            {toc.map((t) => (
              <li key={t.id}><a href={`#${t.id}`}>{t.label}</a></li>
            ))}
          </ol>
          <div className="nlp-aside-box">
            <p className="nlp-h">Get it every week</p>
            <p className="nlp-aside-sub">{PROMISE}</p>
            <PageSignup />
          </div>
        </aside>
        <article className="nlp-issue">
          <p className="nl-kicker">The Marketing Engineer</p>
          <IssueMeta issue={issue} />
          <h1 className="nlp-issue-title">{issue.title}</h1>
          <p className="nlp-dek">{issue.dek}</p>
          <IssueBody issue={issue} />
          <IssueNav older={older} newer={newer} href={href} />
          <SampleNote />
        </article>
      </div>
    </main>
  );
}

/* L3 · Cover */
/** The course an issue points to (2026-10-09: the newsletter promotes a course
    on its issue pages; news is already in every issue). The Claude Code course
    is the one live course with a poster. */
function CoursePromo() {
  return (
    <Link href="/courses/how-to-use-claude-code/" className="nlp-course">
      <Image src="/images/courses/claude-code-poster.webp" alt="" width={360} height={225} className="nlp-course-img" />
      <span className="nlp-course-text">
        <span className="nlp-course-kicker">Course</span>
        <span className="nlp-course-title">How to Use Claude Code for the AI Solopreneur</span>
        <span className="nlp-course-line">Short video lessons, from setup to a finished result. Free.</span>
        <span className="nlp-course-cta">Start the course <ArrowRight size={14} aria-hidden="true" /></span>
      </span>
    </Link>
  );
}

export function IssueCover({ issue, link }: { issue: Issue; link: string }) {
  const href = issueHref(link);
  const { archive } = useNewsletterMode();
  const dateLabel = useDateLabel();
  const others = ISSUES.filter((i) => i.n !== issue.n);
  return (
    <main className="nlp">
      <header
        className={`nlp-cover${issue.cover ? ' has-cover' : ''}`}
        style={issue.cover ? { backgroundImage: `linear-gradient(90deg, #0A1626 0%, #0A1626 40%, rgba(10,22,38,0.6) 65%, rgba(10,22,38,0.1) 100%), url(${issue.cover})` } : undefined}
      >
        <div className="nlp-cover-in">
          <Link href={archive} className="nlp-back nlp-back--dark"><ArrowLeft size={14} aria-hidden="true" /> All issues</Link>
          <div className="nlp-cover-grid">
            <span className="nlp-cover-n" aria-hidden="true">{String(issue.n).padStart(2, '0')}</span>
            <div>
              <p className="nlp-cover-kicker">The Marketing Engineer · No. {issue.n} · {dateLabel(issue)} · {issue.minutes} min</p>
              <h1 className="nlp-cover-title">{issue.title}</h1>
              <p className="nlp-cover-dek">{issue.dek}</p>
            </div>
          </div>
        </div>
      </header>
      <article className="nlp-letter nlp-letter--cover">
        <IssueBody issue={issue} />
        <CoursePromo />
      </article>
      <section className="nlp-band">
        <div className="nlp-band-in">
          <div>
            <p className="nlp-band-title">Get the next issue in your inbox.</p>
            <p className="nlp-band-sub">{PROMISE}</p>
          </div>
          <PageSignup tone="dark" />
        </div>
      </section>
      <section className="nlp-wrap">
        <p className="nlp-label">More issues</p>
        <div className="nlp-list">
          {others.map((i) => <IssueRow key={i.n} issue={i} href={href} />)}
        </div>
        <SampleNote />
      </section>
    </main>
  );
}

