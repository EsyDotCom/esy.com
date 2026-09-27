/* Education hero A · Front Page: esy.com as a publication.
 *
 * A centred masthead names the category (Marketing Engineering), says what the
 * reader learns, and asks for the email. Under it, the four desks run like a
 * newspaper's section index: each one's promise and the pieces on it, real
 * articles linking out and planned ones marked "Coming up". The page reads as
 * a media site with a beat, not as a product with a blog. */

import type { ResolvedDesk } from './desks';
import { ChannelLine, EduSignup, LessonRow } from './shared';

// Two lines per desk keeps the four columns level; the full list is Latest, below.
const PER_DESK = 2;

export default function EduFrontPage({ desks }: { desks: ResolvedDesk[] }) {
  return (
    <section className="eh eh-front" id="subscribe">
      <div className="nl-container">
        {/* ── The masthead: category, promise, one action ─────────────── */}
        <div className="eh-front-head">
          <p className="eh-kicker">Esy · Marketing Engineering</p>
          <h1 className="eh-h1">
            Learn to build the AI systems that <em>run marketing</em>.
          </h1>
          <p className="eh-sub">
            Practical lessons on SEO, AI coding tools, and marketing agents, from someone running them in production.
            The best of each week arrives as one email.
          </p>
          <EduSignup />
          <ChannelLine />
        </div>

        {/* ── The section index: four desks, each with what's on it ─────── */}
        <nav className="eh-desks" aria-label="What we teach">
          {desks.map((desk) => (
            <div key={desk.key} className="eh-desk">
              <h2 className="eh-desk-name">{desk.name}</h2>
              <p className="eh-desk-line">{desk.line}</p>
              <ul className="eh-lessons">
                {desk.lessons.slice(0, PER_DESK).map((lesson) => (
                  <LessonRow key={lesson.title} lesson={lesson} />
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
