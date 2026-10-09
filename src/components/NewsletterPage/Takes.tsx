'use client';

/* esy.com/newsletter, three takes (2026-10-09). The decision: how should the
   newsletter's page open, so a visitor can judge it before subscribing?

   A · The Batch    A light masthead with the promise and the signup, then the
                    latest issue featured and every past issue as a numbered
                    list (deeplearning.ai's The Batch is the model). Picked.
   B · Read first   The page IS the latest issue, readable in full; the signup
                    and the past issues sit in a column beside it.
   C · Studio       The homepage's navy hero with Zev's portrait and the
                    newsletter's own promise, then past issues as cards.

   Issues open as their own pages (the issue-page prototypes), and none of the
   signups send. */

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import EduStudio from '@/components/EducationHero/EduStudio';
import { ISSUES, ISSUE_COUNT, LATEST } from './issues';
import { IssueBody, IssueCard, IssueMeta, IssueRow, ProtoSignup, SampleNote, issueHref } from './shared';

/** The newsletter's promise: one system a week, plus the week's news (Zev, 2026-10-09). */
export const PROMISE =
  'One AI marketing system a week: how I built it, what it did, and the skills to run it yourself. Plus the week’s AI marketing news.';

// In the prototypes, issues open in the first issue-page take.
const PROTO_LINK = '/prototypes/newsletter-issue/letter/?issue={n}';
const protoHref = issueHref(PROTO_LINK);

/* A · The Batch. `link` and `signup` let the live page reuse it with real
   issue addresses and the real form. */
export function TakeBatch({ link = PROTO_LINK, signup = <ProtoSignup />, sample = <SampleNote /> }: { link?: string; signup?: React.ReactNode; sample?: React.ReactNode }) {
  const href = issueHref(link);
  return (
    <main className="nlp">
      <section className="nlp-mast">
        <p className="nl-kicker">The Marketing Engineer · weekly</p>
        <h1 className="nlp-mast-title">AI marketing, <em>built</em> in public.</h1>
        <p className="nlp-mast-sub">{PROMISE}</p>
        <div className="nlp-mast-signup">{signup}</div>
      </section>

      <section className="nlp-wrap">
        <p className="nlp-label">Latest issue</p>
        <Link href={href(LATEST)} className="nlp-feature">
          <IssueMeta issue={LATEST} />
          <span className="nlp-feature-title">{LATEST.title}</span>
          <span className="nlp-feature-dek">{LATEST.dek}</span>
          <span className="nlp-feature-cta">Read the issue <ArrowRight size={15} aria-hidden="true" /></span>
        </Link>

        <p className="nlp-label">All issues · {ISSUE_COUNT}</p>
        <div className="nlp-list">
          {ISSUES.map((i) => <IssueRow key={i.n} issue={i} href={href} />)}
        </div>
        {sample}
      </section>
    </main>
  );
}

/* B · Read first */
export function TakeReadFirst() {
  return (
    <main className="nlp">
      <div className="nlp-wrap nlp-split">
        <article className="nlp-issue">
          <p className="nl-kicker">The Marketing Engineer · this week’s issue</p>
          <IssueMeta issue={LATEST} />
          <h1 className="nlp-issue-title">{LATEST.title}</h1>
          <p className="nlp-dek">{LATEST.dek}</p>
          <IssueBody issue={LATEST} />
        </article>

        <aside className="nlp-aside">
          <div className="nlp-aside-box">
            <p className="nlp-h">Get it every week</p>
            <p className="nlp-aside-sub">{PROMISE}</p>
            <ProtoSignup />
          </div>
          <p className="nlp-label">Past issues</p>
          <div className="nlp-list nlp-list--tight">
            {ISSUES.slice(1).map((i) => <IssueRow key={i.n} issue={i} href={protoHref} />)}
          </div>
        </aside>
      </div>
      <div className="nlp-wrap"><SampleNote /></div>
    </main>
  );
}

/* C · Studio */
export function TakeStudio() {
  return (
    <main className="nlp">
      <EduStudio
        desks={[]}
        phone="profile"
        headline={<>Every week, one AI marketing system <em>I run</em>.</>}
        sub={<>How I built it, what it did, and the skills to run it yourself, plus the week’s AI marketing news. {ISSUE_COUNT} issues so far; read any of them below before you subscribe.</>}
        signup={<ProtoSignup tone="dark" />}
        greeting={false}
        portrait="medium"
        systemsRow={false}
      />
      <section className="nlp-wrap">
        <p className="nlp-label">Every issue</p>
        <div className="nlp-grid">
          {ISSUES.map((i) => <IssueCard key={i.n} issue={i} href={protoHref} />)}
        </div>
        <SampleNote />
      </section>
    </main>
  );
}
