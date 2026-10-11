/* One take of the topic covers (2026-10-11): the issue page's cover header (L3,
 * the shipped issue layout, its own classes) with the take's art behind the
 * title, then a sheet with both topics' covers moving and still. */

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CoverArt, type TakeId } from './covers';
import { TOPIC_ISSUES, dateLabel, type TopicIssue } from './topics';

export interface TopicTake {
  key: string;
  name: string;
  idea: string;
  motion: string;
}

export const TOPIC_TAKES: Record<TakeId, TopicTake> = {
  mason: {
    key: 'A',
    name: 'Mason at work',
    idea: 'The course cover’s room, with Mason doing the topic’s work. Dots leave his screen for jobs around the room; Muse works through a long task on his second screen while he types, then asks for his OK.',
    motion: 'Drawn in code, so it moves for free on the site. For email it goes as a still or a short GIF recorded from the page.',
  },
  type: {
    key: 'B',
    name: 'Type',
    idea: 'The topic’s name is the cover, set huge in our stencil type. The full stop in “dots.” splits into a linked team; the night passes over “muse” while its steps fill in and a ring waits for your OK.',
    motion: 'Drawn in code, so it moves for free on the site, and it’s the easiest to keep as a series: one word, one motion per issue.',
  },
  room: {
    key: 'C',
    name: 'The room',
    idea: 'The live covers’ desk at night with no one in it and the screen off, edited with gpt-image-2.5 Sunburst so the room stays the same: glowing dots travelling across the desk, or a phone waiting for an OK.',
    motion: 'A photo, so it moves only through a video model (a few seconds of the dots rolling, or the phone lighting up). A still until then.',
  },
};

function CoverHeader({ issue, take }: { issue: TopicIssue; take: TakeId }) {
  return (
    <header className="nlp-cover has-cover tc-cover">
      <div className="tc-cover-art">
        <CoverArt take={take} topic={issue.id} />
      </div>
      {/* The live covers' shade: the title gets the left, the art the right. */}
      <div className="tc-cover-shade" aria-hidden="true" />
      <div className="nlp-cover-in tc-cover-in">
        <Link href="/prototypes/newsletter-topic-cover/" className="nlp-back nlp-back--dark"><ArrowLeft size={14} aria-hidden="true" /> All takes</Link>
        <div className="nlp-cover-grid">
          <span className="nlp-cover-n" aria-hidden="true">{String(issue.n).padStart(2, '0')}</span>
          <div>
            <p className="nlp-cover-kicker">The Marketing Engineer · No. {issue.n} · {dateLabel(issue.date)} · {issue.minutes} min</p>
            <h1 className="nlp-cover-title">{issue.title}</h1>
            <p className="nlp-cover-dek">{issue.dek}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function TopicCoverPage({ take, issue }: { take: TakeId; issue: TopicIssue }) {
  const t = TOPIC_TAKES[take];
  return (
    <main className="nlp">
      <CoverHeader issue={issue} take={take} />
      <section className="tc-sheet" aria-labelledby="tc-sheet-title">
        <div className="nl-container">
          <div className="tc-sheet-head">
            <div>
              <p className="nl-eyebrow">Prototype · newsletter covers by topic</p>
              <h2 className="nl-title" id="tc-sheet-title">{t.key} · {t.name}</h2>
              <p className="nl-lede">{t.idea}</p>
            </div>
            {/* Two issues, two covers: see either one on the issue page. */}
            <nav className="tc-toggle" aria-label="Which issue">
              {TOPIC_ISSUES.map((i) => (
                <Link key={i.id} href={`/prototypes/newsletter-topic-cover/${take}/?topic=${i.id}`} aria-current={i.id === issue.id ? 'page' : undefined}>
                  No. {i.n} · {i.id === 'muse' ? 'Meta Muse' : 'OpenAI Dots'}
                </Link>
              ))}
            </nav>
          </div>

          <p className="tc-label">Both issues, as they move</p>
          <div className="tc-grid">
            {TOPIC_ISSUES.map((i) => (
              <figure key={i.id} className="tc-card">
                <div className="tc-frame"><CoverArt take={take} topic={i.id} /></div>
                <figcaption>
                  <span className="tc-card-n">No. {i.n}</span> {i.title}
                  <span className="tc-card-idea">{i.idea}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="tc-label">As a still, for email and social</p>
          <div className="tc-grid tc-grid--small">
            {TOPIC_ISSUES.map((i) => (
              <div key={i.id} className="tc-frame"><CoverArt take={take} topic={i.id} still /></div>
            ))}
          </div>

          <p className="tc-note"><strong>Moving.</strong> {t.motion}</p>
          <p className="tc-note">
            Prototype. No faces: each cover carries its issue’s topic in Esy’s look. Muse and Dots appear by name only, never as a drawn logo.
            The titles are drafts and the issues aren’t written yet, so only the cover shows.
          </p>
        </div>
      </section>
    </main>
  );
}
