'use client';
/**
 * One homepage section per Esy OS app (round 2, 2026-11-07, /prototypes/home-os-apps/). Zev: a section
 * for each app, more sophisticated, no slop, nice transitions from one to the next, and the valuable
 * features. The apps and their features are in osAppFeatures.ts; their visuals in OsFeatureVisuals.tsx.
 *
 *   O4 Chapters  Each app a chapter on its own ground, the grounds blending into each other. The
 *                screen stays put while its three features scroll past, and changes to each in turn.
 *   O5 Plates    Each app a sheet that slides up over the one before, like plates stacking. The
 *                three features are a numbered list beside the screen; picking one changes it.
 *   O6 Index     On paper: a rail of the apps stays at the side and fills as you read each one.
 *                Each feature is a row, text and screen alternating, revealed as it arrives.
 * Motion is short, and stops for reduced motion.
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { OsMark } from './OsMark';
import { OS_APPS } from './osApps';
import { APP_SECTIONS, HOME_APPS, type AppSection } from './osAppFeatures';
import { FeatureVisual, type Tone } from './OsFeatureVisuals';
import { OsScreen } from './OsScreens';
import { OsContainer, type ContainerKind } from './OsContainers';
import './OsAppSections.css';
import './OsScreens.css';

// Round 3: O5's plates with realistic screens in a container (OsScreens.tsx, OsContainers.tsx).
export type SectionsTake = 'chapters' | 'plates' | 'index' | 'plates-display' | 'plates-float' | 'plates-mat';

const appOf = (id: string) => OS_APPS.find((a) => a.id === id)!;
const external = (href: string) => (href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {});

/** True below the phone breakpoint, where the chapters drop their stage. */
function useNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return narrow;
}

/** Adds `is-in` once the element is on screen, for reveals. */
function useInView<T extends HTMLElement>(margin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, inView] as const;
}

/** The section's head: its number, the wordmark, the claim and the way in. */
function Head({ s, n, tone }: { s: AppSection; n: number; tone: Tone }) {
  const app = appOf(s.app);
  return (
    <header className="ox-head">
      <p className="ox-index"><span>{String(n).padStart(2, '0')}</span><i />{app.role}</p>
      <OsMark name={app.name} size="lg" ink={tone === "paper"} />
      <h3 className="ox-claim">{s.headline}</h3>
      <p className="ox-lede">{s.lede}</p>
      <a className={`ox-cta is-${tone}`} href={s.cta.href} {...external(s.cta.href)}>{s.cta.label}<ArrowUpRight size={14} aria-hidden="true" /></a>
    </header>
  );
}

/** echo isn't open yet: the run of apps closes on it as one line. */
function Coda({ tone }: { tone: Tone }) {
  const echo = appOf('echo');
  return (
    <p className={`ox-coda is-${tone}`}>
      <span>Next in Esy OS</span><OsMark name={echo.name} size="sm" ink={tone === "paper"} />{echo.does}
    </p>
  );
}

// ── O4 · Chapters ────────────────────────────────────────────────────────────────────────

function Chapter({ s, n, from }: { s: AppSection; n: number; from: string }) {
  const [on, setOn] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);
  const [headRef, headIn] = useInView<HTMLDivElement>();
  const narrow = useNarrow();

  // The feature in the middle of the screen is the one the stage shows.
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setOn(Number((e.target as HTMLElement).dataset.i)); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="ox-chapter" style={{ '--ground': s.ground, '--from': from } as CSSProperties} aria-label={appOf(s.app).name}>
      <div className="ox-seam" aria-hidden="true" />
      <div className="nl-container">
        <div ref={headRef} className={`ox-reveal ${headIn ? 'is-in' : ''}`}><Head s={s} n={n} tone="night" /></div>
        <div className="ox-chapter-body">
          <div className="ox-stage">
            {!narrow && <div className="ox-stage-in"><div className="ox-stage-anim" key={on}><FeatureVisual id={s.features[on].id} tone="night" /></div></div>}
          </div>
          <ol className="ox-steps">
            {s.features.map((f, i) => (
              <li key={f.id} data-i={i} ref={(el) => { steps.current[i] = el; }} className={i === on ? 'is-on' : ''}>
                <span className="ox-step-n">{i + 1}</span>
                <h4>{f.name}</h4>
                <p>{f.says}</p>
                {/* Phones have no stage: each feature shows its own screen. */}
                {narrow && <div className="ox-step-visual"><FeatureVisual id={f.id} tone="night" /></div>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Chapters() {
  return (
    <div className="ox ox--chapters">
      {HOME_APPS.map((id, i) => <Chapter key={id} s={APP_SECTIONS[id]} n={i + 1} from={i ? APP_SECTIONS[HOME_APPS[i - 1]].ground : '#FFFFFF'} />)}
      <div className="ox-coda-wrap" style={{ background: APP_SECTIONS[HOME_APPS[HOME_APPS.length - 1]].ground }}><div className="nl-container"><Coda tone="night" /></div></div>
    </div>
  );
}

// ── O5 · Plates ──────────────────────────────────────────────────────────────────────────

function Plate({ s, n, z, container }: { s: AppSection; n: number; z: number; container?: ContainerKind }) {
  const [on, setOn] = useState(0);
  return (
    <section className="ox-plate" style={{ '--ground': s.ground, zIndex: z } as CSSProperties} aria-label={appOf(s.app).name}>
      <div className="nl-container ox-plate-in">
        <div className="ox-plate-text">
          <Head s={s} n={n} tone="night" />
          <ol className="ox-picks" role="tablist" aria-label={`What ${appOf(s.app).name} does`}>
            {s.features.map((f, i) => (
              <li key={f.id}>
                <button type="button" role="tab" aria-selected={i === on} className={i === on ? 'is-on' : ''} onClick={() => setOn(i)}>
                  <span className="ox-step-n">{i + 1}</span>
                  <span><b>{f.name}</b>{i === on && <small>{f.says}</small>}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="ox-plate-visual" role="tabpanel" key={on}>
          {container
            ? <OsContainer kind={container} id={s.features[on].id}><OsScreen id={s.features[on].id} /></OsContainer>
            : <FeatureVisual id={s.features[on].id} tone="night" />}
        </div>
      </div>
    </section>
  );
}

function Plates({ container }: { container?: ContainerKind }) {
  return (
    <div className={`ox ox--plates ${container ? `ox--${container}` : ''}`}>
      {HOME_APPS.map((id, i) => <Plate key={id} s={APP_SECTIONS[id]} n={i + 1} z={i + 1} container={container} />)}
      <div className="ox-plate-coda"><div className="nl-container"><Coda tone="night" /></div></div>
    </div>
  );
}

// ── O6 · Index ───────────────────────────────────────────────────────────────────────────

/** One feature as a row: text on one side, its screen on the other, revealed as it arrives. */
function Row({ f, i, flip }: { f: AppSection['features'][number]; i: number; flip: boolean }) {
  const [ref, inView] = useInView<HTMLLIElement>();
  return (
    <li ref={ref} className={`ox-row ox-reveal ${flip ? 'is-flip' : ''} ${inView ? 'is-in' : ''}`}>
      <div className="ox-row-text">
        <span className="ox-step-n">{i + 1}</span>
        <h4>{f.name}</h4>
        <p>{f.says}</p>
      </div>
      <div className="ox-row-visual"><FeatureVisual id={f.id} tone="paper" /></div>
    </li>
  );
}

function IndexTake() {
  const parts = useRef<(HTMLElement | null)[]>([]);
  const [progress, setProgress] = useState<number[]>(HOME_APPS.map(() => 0));

  // The rail fills each app's line by how far through its section you've read.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const mid = window.innerHeight * 0.4;
      setProgress(parts.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return Math.min(1, Math.max(0, (mid - r.top) / r.height));
      }));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, []);

  const current = progress.findIndex((p) => p > 0 && p < 1);
  return (
    <div className="ox ox--index">
      <div className="nl-container ox-index-grid">
        <nav className="ox-rail" aria-label="Esy OS apps">
          <ol>
            {HOME_APPS.map((id, i) => (
              <li key={id} className={i === current ? 'is-on' : progress[i] >= 1 ? 'is-done' : ''}>
                <a href={`#ox-${id}`}>
                  <span className="ox-rail-n">{String(i + 1).padStart(2, '0')}</span>
                  <OsMark name={appOf(id).name} size="sm" ink />
                </a>
                <span className="ox-rail-line" aria-hidden="true"><i style={{ transform: `scaleY(${progress[i]})` }} /></span>
              </li>
            ))}
          </ol>
        </nav>
        <div>
          {HOME_APPS.map((id, k) => {
            const s = APP_SECTIONS[id];
            return (
              <section key={id} id={`ox-${id}`} ref={(el) => { parts.current[k] = el; }} className="ox-part" aria-label={appOf(id).name}>
                <Head s={s} n={k + 1} tone="paper" />
                <ol className="ox-rows">
                  {s.features.map((f, i) => <Row key={f.id} f={f} i={i} flip={i % 2 === 1} />)}
                </ol>
              </section>
            );
          })}
          <Coda tone="paper" />
        </div>
      </div>
    </div>
  );
}

export default function OsAppSections({ take }: { take: SectionsTake }) {
  if (take === 'plates') return <Plates />;
  if (take.startsWith('plates-')) return <Plates container={take.slice(7) as ContainerKind} />;
  if (take === 'index') return <IndexTake />;
  return <Chapters />;
}
