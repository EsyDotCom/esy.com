'use client';
/**
 * OsAppsShowcase: the homepage's apps section, showing Esy OS's own apps only (2026-11-07,
 * /prototypes/home-os-apps/). Zev: "that section should showcase os.esy.com products only", so
 * clip.art and SEOPage leave it (the old AppsShowcase stays, commented out on the homepage).
 *
 * The decision: how does the homepage show the apps you run a business on?
 *   O1 Tour        Today's tour, with agency, compose and scout as its tabs (echo shown as coming):
 *                  each app's story beside what it looks like, advancing on its own until you pick.
 *   O2 Launcher    The section is os.esy.com's own launcher: the apps as rows of wordmarks with
 *                  what each does, and the picked one opens in a window beside it.
 *   O3 One window  One os.esy.com window across the band, the app switcher in its bar; the apps
 *                  sit under it as three columns, and picking one changes the screen.
 *
 * What each app shows: compose, its real replay (ComposeReplay); scout, a real funnel map (Gamma's,
 * from esy.com/scout); agency, a drawing of its home with sample figures, labelled as a sample.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { ComposeReplay } from './ComposeBand';
import { FunnelMap } from '@/components/Scout/FunnelMap';
import { FUNNELS } from '@/components/Scout/funnels';
import { cormorant } from '@/components/SkillsHub/folio/font';
import { OPEN_APPS, OS_APPS, type OsApp, type OsAppId } from './osApps';
import { OsMark } from './OsMark';
import OsAppSections, { type SectionsTake } from './OsAppSections';
import '@/components/SkillsHub/folio/folio.css';
import '@/components/Scout/scout.css';
import './AppsShowcase.css';
import './OsAppsShowcase.css';

// Round 1 (one section for every app): tour, launcher, window. Round 2 (a section per app): chapters, plates, index.
export type OsAppsTake = 'tour' | 'launcher' | 'window' | SectionsTake;
const SECTIONS: OsAppsTake[] = ['chapters', 'plates', 'index', 'plates-display', 'plates-float', 'plates-mat'];

const TOUR_MS = 22000;

export { OsMark };

// ── What each app looks like ─────────────────────────────────────────────────────────────

/** agency's home, drawn small: the four numbers its Today view leads with, and what waits on you.
 *  Every figure is a sample. */
function AgencyScreen() {
  const tiles = [
    { v: '$1,240', label: 'earned today', since: '3 Stripe payments in the Inbox', tone: 'jade' },
    { v: '$18.40', label: 'spent today', since: '$412 this month' },
    { v: '27', label: 'made today', since: 'artifacts filed since midnight' },
    { v: '4', label: 'agents working', since: '2 waiting on you', tone: 'gold' },
  ];
  const waiting = [
    ['Work', 'Three article drafts are ready to review'],
    ['Search', 'Four pages lost clicks this week: what to update'],
    ['Outreach', 'Two replies to read'],
  ];
  return (
    <div className="oa-agency">
      <div className="oa-agency-tiles">
        {tiles.map((t) => (
          <div key={t.label} className={`oa-tile ${t.tone ? `is-${t.tone}` : ''}`}>
            <b>{t.v}</b><span>{t.label}</span><small>{t.since}</small>
          </div>
        ))}
      </div>
      <p className="oa-agency-h">Waiting on you</p>
      <ul className="oa-agency-list">
        {waiting.map(([where, what]) => <li key={what}><em>{where}</em>{what}</li>)}
      </ul>
      <p className="oa-sample">A sample of agency’s Today view: the figures are illustrative.</p>
    </div>
  );
}

/** scout: a real funnel map, Gamma's, in the night finish esy.com/scout uses. */
function ScoutScreen() {
  const [pick, setPick] = useState<string | null>(null);
  const f = FUNNELS.find((x) => x.id === 'gamma')!;
  return (
    <div className={`folio oa-scout ${cormorant.variable}`}>
      <p className="oa-scout-h">{f.title}</p>
      <FunnelMap f={f} skin="plate" pick={pick} setPick={setPick} />
    </div>
  );
}

function Screen({ id }: { id: OsAppId }) {
  if (id === 'compose') return <ComposeReplay />;
  if (id === 'scout') return <ScoutScreen />;
  if (id === 'agency') return <AgencyScreen />;
  return null;
}

/** A browser window around a screen, with the app's real address. compose's replay brings its own. */
function Window({ app, children, bar }: { app: OsApp; children: ReactNode; bar?: ReactNode }) {
  if (app.id === 'compose' && !bar) return <>{children}</>;
  return (
    <figure className="oa-window">
      <div className="oa-window-bar" aria-hidden={!bar}>
        <i /><i /><i />
        {bar ?? <span className="oa-window-url">{app.url}</span>}
      </div>
      <div className="oa-window-body">{children}</div>
    </figure>
  );
}

/** The story beside a screen: what it is, its pills, the link. */
function Story({ app, title = true }: { app: OsApp; title?: boolean }) {
  return (
    <div className="nl-case-story">
      <div className="nl-case-meta">
        <span className="nl-case-tag">Esy OS</span>
        {app.open
          ? <span className="nl-case-live"><span className="nl-case-live-dot" aria-hidden="true" />Live · We run on it</span>
          : <span className="oa-coming">Coming</span>}
      </div>
      {title && <h3 className="nl-case-title oa-title"><OsMark name={app.name} size="lg" /><span className="nl-case-title-tail">{app.role}</span></h3>}
      <p className="nl-case-desc">{app.desc}</p>
      <div className="nl-case-styles">
        <span className="nl-case-styles-label">{app.pillsLabel}</span>
        <div className="nl-case-pills">{app.pills.map((p) => <span key={p} className="nl-case-pill">{p}</span>)}</div>
      </div>
      <div>
        <a href={app.href} className="nl-case-cta as-cta" {...(app.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {app.cta} <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

// ── O1 · Tour ────────────────────────────────────────────────────────────────────────────

function Tour() {
  const [on, setOn] = useState(0);
  const [picked, setPicked] = useState(false);
  const [hover, setHover] = useState(false);
  const [seen, setSeen] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const band = useRef<HTMLDivElement>(null);

  // The tour runs only while the band is on screen, and stops for good once you pick.
  useEffect(() => {
    const el = band.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (picked || hover || !seen) return;
    const t = setInterval(() => setElapsed((ms) => ms + 100), 100);
    return () => clearInterval(t);
  }, [picked, hover, seen]);
  useEffect(() => {
    if (elapsed < TOUR_MS) return;
    setOn((k) => (k + 1) % OPEN_APPS.length);
    setElapsed(0);
  }, [elapsed]);

  const app = OPEN_APPS[on];
  const echo = OS_APPS.find((a) => !a.open)!;
  return (
    <div className={`as-band oa-band oa-band--${app.id}`} ref={band} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="nl-container">
        <div className="as-tabs" role="tablist" aria-label="The apps of Esy OS">
          {OPEN_APPS.map((a, k) => (
            <button key={a.id} type="button" role="tab" aria-selected={k === on} aria-controls="oa-panel"
              className={`as-tab ${k === on ? 'is-on' : ''}`} onClick={() => { setOn(k); setPicked(true); setElapsed(0); }}>
              <span className="as-tab-mark"><OsMark name={a.name} /></span>
              <small>{a.role}</small>
              <span className="as-tab-bar" aria-hidden="true"><span style={{ width: k === on ? `${picked ? 100 : (elapsed / TOUR_MS) * 100}%` : '0%' }} /></span>
            </button>
          ))}
          {/* echo isn't open yet: shown, never picked. */}
          <span className="as-tab oa-tab-coming" aria-disabled="true">
            <span className="as-tab-mark"><OsMark name={echo.name} /></span>
            <small>Coming</small>
          </span>
        </div>
        <div className="nl-case as-panel" role="tabpanel" id="oa-panel" key={app.id}>
          <Story app={app} />
          <div className="as-visual"><Window app={app}><Screen id={app.id} /></Window></div>
        </div>
        {!picked && <p className="as-hint">Showing each app in turn. Pick one to stay on it.</p>}
      </div>
    </div>
  );
}

// ── O2 · Launcher ────────────────────────────────────────────────────────────────────────

function Launcher() {
  const [id, setId] = useState<OsAppId>('agency');
  const app = OS_APPS.find((a) => a.id === id)!;
  return (
    <div className={`as-band oa-band oa-band--${app.id}`}>
      <div className="nl-container oa-launch">
        <div className="oa-launch-side">
          {/* os.esy.com's switcher: "esy | agency ▾" opens a panel of every app. */}
          <div className="oa-panel">
            <p className="oa-panel-lockup"><span className="oa-wordmark">esy</span><i /><OsMark name={app.name} size="sm" /><ChevronDown size={14} aria-hidden="true" /></p>
            <ul role="tablist" aria-orientation="vertical" aria-label="The apps of Esy OS">
              {OS_APPS.map((a) => (
                <li key={a.id}>
                  <button type="button" role="tab" aria-selected={a.id === id} className={a.id === id ? 'is-on' : ''} onClick={() => setId(a.id)}>
                    <OsMark name={a.name} />
                    <span>{a.does}</span>
                    <em className={a.open ? 'is-open' : ''}>{a.open ? 'Open' : 'Coming'}</em>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="oa-launch-story" key={app.id}>
            <p className="nl-case-desc">{app.desc}</p>
            <a href={app.href} className="nl-case-cta as-cta" {...(app.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {app.cta} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="as-visual oa-launch-screen" key={`s-${app.id}`}>
          {app.open
            ? <Window app={app}><Screen id={app.id} /></Window>
            : <div className="oa-soon"><OsMark name={app.name} size="lg" /><p>{app.does}</p><small>Being built into Esy OS now.</small></div>}
        </div>
      </div>
    </div>
  );
}

// ── O3 · One window ──────────────────────────────────────────────────────────────────────

function OneWindow() {
  const [id, setId] = useState<OsAppId>('agency');
  const app = OPEN_APPS.find((a) => a.id === id)!;
  return (
    <div className="as-band oa-band oa-band--window">
      <div className="nl-container">
        <Window
          app={app}
          bar={
            <>
              <span className="oa-bar-lockup"><span className="oa-wordmark">esy</span><i /><OsMark name={app.name} size="sm" /></span>
              <span className="oa-bar-tabs" role="tablist" aria-label="The apps of Esy OS">
                {OPEN_APPS.map((a) => (
                  <button key={a.id} type="button" role="tab" aria-selected={a.id === id} className={a.id === id ? 'is-on' : ''} onClick={() => setId(a.id)}>{a.name}</button>
                ))}
              </span>
              <span className="oa-window-url">{app.url}</span>
            </>
          }
        >
          <div className="oa-one-screen" key={app.id}><Screen id={app.id} /></div>
        </Window>
        <ul className="oa-cols">
          {OS_APPS.map((a) => (
            <li key={a.id} className={`${a.id === id ? 'is-on' : ''} ${a.open ? '' : 'is-coming'}`}>
              {a.open
                ? <button type="button" onClick={() => setId(a.id)} aria-pressed={a.id === id}><OsMark name={a.name} /><small>{a.role}</small></button>
                : <div><OsMark name={a.name} /><small>Coming</small></div>}
              <p>{a.does}</p>
              <a href={a.href} {...(a.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{a.cta} <ArrowUpRight size={13} aria-hidden="true" /></a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── The section ──────────────────────────────────────────────────────────────────────────

export default function OsAppsShowcase({ take }: { take: OsAppsTake }) {
  return (
    <section className={`as oa oa--${take} ${cormorant.variable}`} id="work-apps" aria-labelledby="nl-where-title">
      <div className="nl-container as-head">
        <div className="nl-work-head">
          <span className="nl-work-n" aria-hidden="true">01</span>
          <p className="nl-eyebrow">Esy OS</p>
          <h2 className="nl-title nl-work-title" id="nl-where-title">The apps I run the business on.</h2>
        </div>
        <div>
          <p className="nl-lede">
            Esy OS is where ESY LLC is run: agency for clients and the work, compose for writing, scout for studying who’s ahead. AI Marketing News is written in compose, and the funnel maps at esy.com/scout come from scout.
          </p>
        </div>
      </div>
      {SECTIONS.includes(take) ? <OsAppSections take={take as SectionsTake} />
        : take === 'launcher' ? <Launcher /> : take === 'window' ? <OneWindow /> : <Tour />}
    </section>
  );
}
