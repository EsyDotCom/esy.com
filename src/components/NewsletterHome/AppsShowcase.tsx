'use client';
/**
 * AppsShowcase — the homepage's 01 Apps as one band instead of a ledger plus
 * three case-study bands (2026-09-30, /prototypes/home-trim/). The same three
 * stories and replays, one at a time, so the page loses about three screens
 * and only one replay plays at once. Three layouts:
 *
 *   tabs — the apps' wordmarks as tabs over the band; the chosen app's story
 *          and replay below, in the case-study layout the bands used.
 *   rail — the ledger becomes the picker: the apps stacked on the left, the
 *          chosen one opened to its story, its replay on the right.
 *   tour — tabs that advance on their own, each with a progress bar, pausing
 *          on hover and stopping for good once you pick one.
 *
 * Only the chosen app's replay is mounted, so the others don't run unseen.
 * The band's ground and accent follow the app: clip.art navy and jade,
 * SEOPage ink and blue, Compose night and jade.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ClipArtWordmark from './ClipArtWordmark';
import SeoPageWordmark from './SeoPageWordmark';
import ComposeWordmark from './ComposeWordmark';
import ClipArtVisuals from './ClipArtVisuals';
import SeoPageReplay from './SeoPageReplay';
import { ComposeReplay } from './ComposeBand';
import { APP_STORIES, type AppId, type AppStory } from './apps';
import './AppsShowcase.css';

export type AppsLayout = 'tabs' | 'rail' | 'tour';

/** How long the tour stays on each app before moving on. */
const TOUR_MS = 22000;

function Mark({ id }: { id: AppId }) {
  if (id === 'clipart') return <ClipArtWordmark className="as-mark-clipart" />;
  if (id === 'seopage') return <SeoPageWordmark weight="light" className="as-mark-seopage" />;
  return <ComposeWordmark mark="stencil" className="as-mark-compose" />;
}

function Visual({ id }: { id: AppId }) {
  if (id === 'clipart') return <ClipArtVisuals visual="control" />;
  if (id === 'seopage') return <SeoPageReplay />;
  return <ComposeReplay />;
}

/** The case study's story column: meta, title, what it is, its pills, the link. */
function Story({ app, title = true }: { app: AppStory; title?: boolean }) {
  return (
    <div className="nl-case-story">
      <div className="nl-case-meta">
        <span className="nl-case-tag">Case Study</span>
        <span className="nl-case-live"><span className="nl-case-live-dot" aria-hidden="true" />Live · In Production</span>
      </div>
      {title && (
        <h3 className="nl-case-title as-title">
          <span className="as-title-mark"><Mark id={app.id} /></span>
          <span className="nl-case-title-tail">runs on Esy OS</span>
        </h3>
      )}
      <p className="nl-case-desc">{app.desc}</p>
      <div className="nl-case-styles">
        <span className="nl-case-styles-label">{app.pillsLabel}</span>
        <div className="nl-case-pills">{app.pills.map((p) => <span key={p} className="nl-case-pill">{p}</span>)}</div>
      </div>
      <div>
        <a href={app.href} target="_blank" rel="noopener noreferrer" className="nl-case-cta as-cta">
          {app.cta} <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

/** Tabs and tour: the wordmarks across the band, optionally advancing. */
function Tabbed({ tour }: { tour: boolean }) {
  const [on, setOn] = useState(0);
  const [picked, setPicked] = useState(!tour);
  const [hover, setHover] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [seen, setSeen] = useState(false);
  const band = useRef<HTMLDivElement>(null);

  // The tour only runs while the band is on screen.
  useEffect(() => {
    const el = band.current;
    if (!el || !tour) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [tour]);

  // Fill the bar a tenth of a second at a time while the tour runs…
  useEffect(() => {
    if (picked || hover || !seen) return;
    const t = setInterval(() => setElapsed((ms) => ms + 100), 100);
    return () => clearInterval(t);
  }, [picked, hover, seen]);
  // …and move to the next app when it's full.
  useEffect(() => {
    if (elapsed < TOUR_MS) return;
    setOn((k) => (k + 1) % APP_STORIES.length);
    setElapsed(0);
  }, [elapsed]);

  const pick = (k: number) => { setOn(k); setPicked(true); setElapsed(0); };
  const app = APP_STORIES[on];

  return (
    <div className={`as-band as-band--${app.id}`} ref={band} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="nl-container">
        <div className="as-tabs" role="tablist" aria-label="Apps that run on Esy OS">
          {APP_STORIES.map((a, k) => (
            <button key={a.id} type="button" role="tab" id={`as-tab-${a.id}`} aria-selected={k === on} aria-controls="as-panel"
              className={`as-tab ${k === on ? 'is-on' : ''}`} onClick={() => pick(k)}>
              <span className="as-tab-mark"><Mark id={a.id} /></span>
              <small>{a.role}</small>
              {tour && (
                <span className="as-tab-bar" aria-hidden="true">
                  <span style={{ width: k === on ? `${picked ? 100 : (elapsed / TOUR_MS) * 100}%` : '0%' }} />
                </span>
              )}
            </button>
          ))}
        </div>
        <div className={`nl-case ${app.id === 'seopage' ? 'nl-case--flip' : ''} as-panel`} role="tabpanel" id="as-panel" aria-labelledby={`as-tab-${app.id}`} key={app.id}>
          {app.id === 'seopage' ? (
            <>
              <div className="nl-case-replay"><Visual id={app.id} /></div>
              <Story app={app} />
            </>
          ) : (
            <>
              <Story app={app} />
              <div className="as-visual"><Visual id={app.id} /></div>
            </>
          )}
        </div>
        {tour && !picked && <p className="as-hint">Showing each app in turn. Pick one to stay on it.</p>}
      </div>
    </div>
  );
}

/** Rail: the apps stacked on the left as the picker, the replay on the right. */
function Rail() {
  const [on, setOn] = useState(0);
  const app = APP_STORIES[on];
  return (
    <div className={`as-band as-band--${app.id}`}>
      <div className="nl-container as-rail">
        <ul className="as-rail-list" role="tablist" aria-orientation="vertical" aria-label="Apps that run on Esy OS">
          {APP_STORIES.map((a, k) => (
            <li key={a.id} className={`as-rail-row ${k === on ? 'is-on' : ''}`}>
              <button type="button" role="tab" aria-selected={k === on} aria-controls="as-rail-panel" className="as-rail-head" onClick={() => setOn(k)}>
                <span className="as-rail-mark"><Mark id={a.id} /></span>
                <span className="as-rail-role">{a.role}</span>
                {k !== on && <span className="as-rail-line">{a.line}</span>}
              </button>
              {k === on && <div className="as-rail-body"><Story app={a} title={false} /></div>}
            </li>
          ))}
        </ul>
        <div className="as-visual as-rail-visual" role="tabpanel" id="as-rail-panel" key={app.id}>
          <Visual id={app.id} />
        </div>
      </div>
    </div>
  );
}

export default function AppsShowcase({ layout, head }: { layout: AppsLayout; head: ReactNode }) {
  return (
    <section className={`as as--${layout}`} id="work-apps" aria-labelledby="nl-where-title">
      <div className="nl-container as-head">{head}</div>
      {layout === 'rail' ? <Rail /> : <Tabbed tour={layout === 'tour'} />}
    </section>
  );
}
