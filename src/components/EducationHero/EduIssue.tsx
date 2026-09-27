'use client';

/* Education hero C · The Issue: show the product, and the product is the email.
 *
 * Following the prototype pattern (show the real thing, not a picture of it),
 * the right side is an issue rendered as it lands in an inbox, and the left
 * side asks for the address it lands in. Three sample issues, one per desk,
 * switch from the tabs above the window. One of them ends on SEOPage because
 * its build is about finding pages worth making; the others don't mention it. */

import { useState } from 'react';
import { ArrowRight, Wrench } from 'lucide-react';
import type { ResolvedDesk } from './desks';
import { SAMPLE_ISSUES } from './sample-issues';
import { Byline, ChannelLine, EduSignup } from './shared';

export default function EduIssue({ desks }: { desks: ResolvedDesk[] }) {
  const [active, setActive] = useState(0);
  const issue = SAMPLE_ISSUES[active];
  const deskName = (key: string) => desks.find((d) => d.key === key)?.name ?? key;

  return (
    <section className="eh eh-issue" id="subscribe">
      <div className="nl-container eh-split eh-split--issue">
        {/* ── Left: what the email is, and the one action ──────────────── */}
        <div className="eh-split-copy">
          <p className="eh-kicker">The weekly email from Esy</p>
          <h1 className="eh-h1 eh-h1--left">
            One email a week on how AI <em>actually runs marketing</em>.
          </h1>
          <p className="eh-sub eh-sub--left">
            Each issue walks through one system I built and what it did: SEO, agents, AI coding tools, and the
            integrations between them, with the steps to build it yourself.
          </p>
          <EduSignup />
          <Byline compact />
          <ChannelLine />
        </div>

        {/* ── Right: an issue, as it lands ─────────────────────────────── */}
        <div className="eh-inbox">
          <div className="eh-inbox-tabs" role="tablist" aria-label="Sample issues">
            {SAMPLE_ISSUES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                className="eh-inbox-tab"
                onClick={() => setActive(i)}
              >
                {deskName(s.desk)}
              </button>
            ))}
          </div>

          <article className="eh-mail" role="tabpanel" key={issue.id}>
            {/* The envelope: sender, subject, and the preview line, as a mail app shows them. */}
            <header className="eh-mail-envelope">
              <span className="eh-mail-avatar" aria-hidden="true">E</span>
              <div>
                <p className="eh-mail-from">
                  <b>The Marketing Engineer</b> <span>engineer.esy.com</span>
                </p>
                <p className="eh-mail-subject">{issue.subject}</p>
                <p className="eh-mail-pre">{issue.preheader}</p>
              </div>
            </header>

            {/* The body: the build, walked through. */}
            <div className="eh-mail-body">
              <p className="eh-mail-desk">{deskName(issue.desk)} · This week&apos;s build</p>
              <h2 className="eh-mail-title">{issue.lead.title}</h2>
              {issue.lead.paragraphs.map((p) => (
                <p key={p} className="eh-mail-p">
                  {p}
                </p>
              ))}
              {issue.lead.productNote && <p className="eh-mail-product">{issue.lead.productNote}</p>}
              <span className="eh-mail-read">
                Read the full walkthrough <ArrowRight size={14} aria-hidden="true" />
              </span>

              <p className="eh-mail-section">Worth your time</p>
              <ul className="eh-mail-links">
                {issue.links.map((l) => (
                  <li key={l.label}>
                    <b>{l.label}</b> {l.why}
                  </li>
                ))}
              </ul>

              <p className="eh-mail-tool">
                <Wrench size={14} aria-hidden="true" />
                <span>
                  <b>{issue.toolNote.tool}:</b> {issue.toolNote.note}
                </span>
              </p>
            </div>
          </article>

          <p className="eh-caption">
            <span className="eh-caption-tag">Sample issue</span>
            Written the way real issues are. Switch desks above to read another.
          </p>
        </div>
      </div>
    </section>
  );
}
