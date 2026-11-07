/**
 * The head over the homepage's Esy OS plates (2026-11-07, /prototypes/home-os-head/).
 * Zev: drop the "01" (nothing follows it on the trimmed homepage) and say what the section is:
 * AI marketing tools, the suite a marketing engineer runs and grows a business on, used on ESY LLC
 * first. Three answers, each a different shape, not three skins:
 *   statement  H1 · Statement  paper. The category and the reader as the headline, the apps as a
 *                              row of marks that jump to their plates.
 *   suite      H2 · Suite      navy, flowing straight into the plates: a launch-style lineup of the
 *                              four apps with each one's job and whether you can use it yet.
 *   proof      H3 · Proof      paper. The headline beside a ledger of what each tool has already
 *                              made, every row a real, linked thing (counts come from the data).
 * Honest about access: agency and echo are on the waitlist, compose and scout's maps are open.
 * No outcome promises: "grow without growing the team" is what the tools are for, not a result.
 */
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { OsMark } from './OsMark';
import { OS_APPS, type OsAppId } from './osApps';
import { FUNNELS } from '../Scout/funnels';
import snapshot from '../../data/scout/snapshot.json';
import './OsSuiteHead.css';

export type OsHeadTake = 'statement' | 'suite' | 'proof';

// Each app's plate carries id `os-<app>` (OsAppSections.tsx), so every mark can jump to it.
const plateHref = (id: OsAppId) => `#os-${id}`;

// Whether a reader can use it today, in plain words. Follows osApps.ts: agency's door is the waitlist.
const ACCESS: Record<OsAppId, string> = { agency: 'Waitlist', compose: 'Open', scout: 'Maps free', echo: 'Coming' };

const EYEBROW = 'Esy OS · AI marketing tools';

// ── H1 · Statement ──────────────────────────────────────────────────────────────────────

function Statement() {
  return (
    <div className="nl-container sh sh--statement">
      <p className="sh-eyebrow">{EYEBROW}</p>
      <h2 className="sh-title" id="nl-where-title">
        AI marketing tools <em>for the marketing engineer.</em>
      </h2>
      <div className="sh-foot">
        <p className="sh-lede">
          The suite I run my own business on, built so you can grow the business without growing the team.
          Every tool is used on ESY LLC before it’s offered to you.
        </p>
        <nav className="sh-marks" aria-label="The tools">
          {OS_APPS.map((a) => (
            a.open
              ? <a key={a.id} href={plateHref(a.id)}><OsMark name={a.name} ink /><small>{a.role}</small></a>
              : <span key={a.id} className="is-soon"><OsMark name={a.name} ink /><small>Coming next</small></span>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ── H2 · Suite ──────────────────────────────────────────────────────────────────────────

function Suite() {
  return (
    <div className="sh-night">
      <div className="nl-container sh sh--suite">
        {/* The OS mark as the footer draws it: "OS" in the esy stencil, its O in teal (Zev: the logo, not a pill). */}
        <p className="sh-os" aria-label="Esy OS"><OsMark name="OS" size="lg" /></p>
        <h2 className="sh-title" id="nl-where-title">
          The AI marketing suite <em>for marketing engineers.</em>
        </h2>
        <p className="sh-lede">
          The AI marketing tools I run my verticals, newsletters and social media on. They research, write,
          check and publish alongside me, so I can grow like a team many times my size.
        </p>
        <ol className="sh-lineup">
          {OS_APPS.map((a) => (
            <li key={a.id} className={a.open ? '' : 'is-soon'}>
              <a href={a.open ? plateHref(a.id) : a.href}>
                <OsMark name={a.name} />
                <span className="sh-job">{a.does}</span>
                <span className="sh-access">{ACCESS[a.id]}{a.open && <ArrowDown size={13} aria-hidden="true" />}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ── H3 · Proof ──────────────────────────────────────────────────────────────────────────

// "a, b, c and d" for the maps' names.
const listOf = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

// What each tool has already made, all real and public. Counts are computed, never typed.
const MADE: { app: OsAppId; what: string; where: string; href: string }[] = [
  { app: 'compose', what: 'AI Marketing News, researched, written and fact-checked', where: 'esy.com/news', href: '/news/' },
  { app: 'scout', what: `Funnel maps of ${listOf(FUNNELS.map((f) => f.name))}, from ${snapshot.creators.length} creators studied`, where: 'esy.com/scout', href: '/scout/' },
  { app: 'agency', what: 'ESY LLC’s clients, its work and its search data, run every day', where: 'os.esy.com/agency', href: '/waitlist/' },
];

function Proof() {
  return (
    <div className="nl-container sh sh--proof">
      <div className="sh-proof-text">
        <p className="sh-eyebrow">{EYEBROW}</p>
        <h2 className="sh-title" id="nl-where-title">
          Marketing tools for the marketing engineer. <em>Tested on my own business.</em>
        </h2>
        <p className="sh-lede">
          A suite for growing a business with AI, without growing the team. I don’t sell a tool until it runs part of ESY LLC.
        </p>
      </div>
      <div className="sh-ledger">
        <p className="sh-ledger-label">What they’ve made so far</p>
        <ul>
          {MADE.map((m) => {
            const app = OS_APPS.find((a) => a.id === m.app)!;
            return (
              <li key={m.app}>
                <a href={plateHref(m.app)} className="sh-ledger-mark"><OsMark name={app.name} ink /></a>
                <span className="sh-ledger-what">{m.what}</span>
                <a className="sh-ledger-where" href={m.href}>{m.where}<ArrowUpRight size={12} aria-hidden="true" /></a>
              </li>
            );
          })}
        </ul>
        <p className="sh-ledger-soon"><OsMark name="echo" size="sm" ink /> is next: scheduling and sharing, with what each piece earned.</p>
      </div>
    </div>
  );
}

export function OsSuiteHead({ take }: { take: OsHeadTake }) {
  if (take === 'suite') return <Suite />;
  if (take === 'proof') return <Proof />;
  return <Statement />;
}
