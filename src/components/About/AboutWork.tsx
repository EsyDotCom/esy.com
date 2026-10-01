'use client';
/* Round 4 of /about: three takes on H · Chapters' "What I make" section. The
 * rest of the page is H unchanged; only the work section differs.
 *
 *   J · Four up    — Apps split in two: clip.art and SEOPage each get a card
 *                    and a visual of their own, beside the explainer and the
 *                    film, in a 2×2 grid.
 *   K · Ledger     — the homepage's numbered groups (01 Apps, 02 Creatives,
 *                    03 Films) as wide rows, each with four real frames.
 *   L · Showcase   — one big stage with three tabs; each tab puts that kind
 *                    of work up large with its credits beside it.
 *
 * Round 5, four styles of K: M · Night (the ledger on navy), N · Magazine (no
 * boxes, huge numbers, the frames as one wide strip), O · Preview (text rows,
 * the one you point at fills a big preview) and P · Bands (each kind in its
 * own band, like the chapters).
 *
 * Every visual and fact is already on the site: the style range from
 * /prototypes/home-clipart/, SEOPage's own art, the explainer's stills and
 * the film's frames (src/data).
 */
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import ClipArtWordmark from '@/components/NewsletterHome/ClipArtWordmark';
import SeoPageWordmark from '@/components/NewsletterHome/SeoPageWordmark';
import ComposeWordmark from '@/components/NewsletterHome/ComposeWordmark';
import { CLIPART_RUN } from '@/components/NewsletterHome/clipartRun';
import { articlePath } from '@/lib/article-path';
import { filmHref } from '@/data/films';
import { CREATIVE, FILM, WORK } from './content';

// clip.art's visual: one prompt in six styles, each a recorded run.
const STYLES = ['flat', 'watercolor', 'outline', 'pixel', 'clay', '3d'].map((f) => `/prototypes/home-clipart/${f}.webp`);
const SEOPAGE_ART = '/images/seopage/nora-proud.webp';
const SEOPAGE_FRAMES = ['nora-proud', 'svc-leak', 'svc-drain', 'svc-heater'].map((n) => `/images/seopage/${n}.webp`);
const RUNS = CLIPART_RUN.totalRuns.toLocaleString('en-US');

/** The section head every take shares. */
function Head() {
  return (
    <>
      <p className="nl-eyebrow">What I make</p>
      <h2 className="nl-title" id="ab-work">Apps, creatives and films, all on Esy.</h2>
    </>
  );
}

/* eslint-disable @next/next/no-img-element -- real outputs and stills, fixed sizes */

/* ── J · Four up ── */
export function WorkFour() {
  return (
    <section className="nl-section" aria-labelledby="ab-work">
      <div className="nl-container">
        <Head />
        <div className="aw-four">
          <a href={WORK.clipart.href} target="_blank" rel="noopener noreferrer" className="ab-card">
            <span className="ab-card-art ab-card-art--check aw-styles">
              {STYLES.map((s) => <img key={s} src={s} alt="" />)}
            </span>
            <span className="ab-card-kind">App</span>
            <span className="ab-card-marks"><ClipArtWordmark className="ab-card-clipart" /></span>
            <span className="ab-card-line">{WORK.clipart.line}</span>
            <span className="ab-card-go">See clip.art <ArrowUpRight size={14} aria-hidden="true" /></span>
          </a>
          <a href={WORK.seopage.href} target="_blank" rel="noopener noreferrer" className="ab-card">
            <span className="ab-card-art"><img src={SEOPAGE_ART} alt="" className="ab-cover ab-cover--top" /></span>
            <span className="ab-card-kind">App</span>
            <span className="ab-card-marks"><SeoPageWordmark weight="light" className="ab-card-seopage" /></span>
            <span className="ab-card-line">{WORK.seopage.line}</span>
            <span className="ab-card-go">See SEOPage <ArrowUpRight size={14} aria-hidden="true" /></span>
          </a>
          {CREATIVE && (
            <Link href={articlePath(CREATIVE.articleSlug)} className="ab-card">
              <span className="ab-card-art">
                <img src={`https://i.ytimg.com/vi/${CREATIVE.youtubeId}/maxresdefault.jpg`} alt="" className="ab-cover" />
              </span>
              <span className="ab-card-kind">Creative</span>
              <span className="ab-card-title">{CREATIVE.title}</span>
              <span className="ab-card-line">{CREATIVE.logline}</span>
              <span className="ab-card-go">How I made it <ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
          )}
          {FILM && (
            <Link href={filmHref(FILM)} className="ab-card">
              <span className="ab-card-art"><img src={FILM.still} alt="" className="ab-cover" /></span>
              <span className="ab-card-kind">Film</span>
              <span className="ab-card-title">{FILM.title}</span>
              <span className="ab-card-line">{FILM.logline}</span>
              <span className="ab-card-go">Watch the film <ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── K · Ledger, and round 5's four styles of it ── */
type LedgerRow = {
  n: string; kind: string; href: string; external: boolean; go: string;
  title: React.ReactNode; line: string; frames: string[]; checker: boolean[];
  /** Round 5 · Bands: each kind in its own band, like the chapters above. */
  band: 'cream' | 'navy' | 'gold';
};

// One row per kind of work, numbered like the homepage's groups.
function ledgerRows(): LedgerRow[] {
  return [
    {
      n: '01', kind: 'Apps', href: WORK.clipart.href, external: true, go: 'See clip.art', band: 'cream' as const,
      title: <span className="aw-ledger-marks"><ClipArtWordmark className="ab-card-clipart" /><SeoPageWordmark weight="light" className="ab-card-seopage" /><ComposeWordmark mark="stencil" className="ab-card-compose" /></span>,
      line: `Three apps on one engine. ${RUNS} runs so far, each recorded on prompt, model, checks and cost.`,
      frames: [STYLES[0], STYLES[4], SEOPAGE_FRAMES[0], SEOPAGE_FRAMES[1]],
      checker: [true, true, false, false],
    },
    CREATIVE && {
      n: '02', kind: 'Creatives', href: articlePath(CREATIVE.articleSlug), external: false, go: 'How I made it', band: 'navy' as const,
      title: CREATIVE.title, line: `${CREATIVE.kind}. ${CREATIVE.logline}`,
      frames: CREATIVE.frames, checker: [false, false, false, false],
    },
    FILM && {
      n: '03', kind: 'Films', href: filmHref(FILM), external: false, go: 'Watch the film', band: 'gold' as const,
      title: FILM.title, line: `${FILM.meta} · ${FILM.facts}`,
      frames: FILM.frames, checker: [false, false, false, false],
    },
  ].filter(Boolean) as LedgerRow[];
}

/** A row's link: external rows open in a new tab. */
function RowLink({ row, className, children, ...rest }: { row: LedgerRow; className: string; children: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  if (row.external) {
    return <a href={row.href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>{children}</a>;
  }
  return <Link href={row.href} className={className} {...rest}>{children}</Link>;
}

function RowText({ row }: { row: LedgerRow }) {
  return (
    <span className="aw-ledger-text">
      <span className="ab-card-kind">{row.kind}</span>
      <span className="ab-card-title">{row.title}</span>
      <span className="ab-card-line">{row.line}</span>
      <span className="ab-card-go">
        {row.go} {row.external ? <ArrowUpRight size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}
      </span>
    </span>
  );
}

function Frames({ row, className = 'aw-ledger-frames' }: { row: LedgerRow; className?: string }) {
  return (
    <span className={className}>
      {row.frames.slice(0, 4).map((f, i) => (
        <span key={f} className={row.checker[i] ? 'is-check' : ''}><img src={f} alt="" loading="lazy" /></span>
      ))}
    </span>
  );
}

/** K, and M · Night / N · Magazine / P · Bands: the same rows in different dress. */
export function WorkLedger({ look = 'plain' }: { look?: 'plain' | 'night' | 'magazine' | 'bands' }) {
  const rows = ledgerRows();
  const dark = look === 'night';
  return (
    <section className={`nl-section aw-look--${look}`} aria-labelledby="ab-work">
      <div className="nl-container">
        {dark ? (
          <>
            <p className="nl-eyebrow nl-eyebrow--onDark">What I make</p>
            <h2 className="nl-title nl-title--onDark" id="ab-work">Apps, creatives and films, all on Esy.</h2>
          </>
        ) : <Head />}
        <ol className="aw-ledger">
          {rows.map((r) => (
            <li key={r.n} className={look === 'bands' ? `aw-band aw-band--${r.band}` : ''}>
              <RowLink row={r} className="aw-ledger-row">
                <span className="aw-ledger-n">{r.n}</span>
                <RowText row={r} />
                <Frames row={r} />
              </RowLink>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── O · Preview: text rows; the one you point at fills a big preview. ── */
export function WorkPreview() {
  const rows = ledgerRows();
  const [on, setOn] = useState(0);
  const row = rows[on];
  return (
    <section className="nl-section" aria-labelledby="ab-work">
      <div className="nl-container">
        <Head />
        <div className="aw-preview">
          <ol className="aw-ledger aw-preview-list">
            {rows.map((r, i) => (
              <li key={r.n} className={i === on ? 'is-on' : ''}>
                <RowLink row={r} className="aw-ledger-row" onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)}>
                  <span className="aw-ledger-n">{r.n}</span>
                  <RowText row={r} />
                </RowLink>
              </li>
            ))}
          </ol>
          {/* The preview: the row's first frame large, the other three under it. */}
          <div className="aw-preview-stage" aria-hidden="true">
            <span key={row.frames[0]} className={`aw-preview-main ${row.checker[0] ? 'is-check' : ''}`}>
              <img src={row.frames[0]} alt="" />
            </span>
            <span className="aw-preview-thumbs">
              {row.frames.slice(1, 4).map((f, i) => (
                <span key={f} className={row.checker[i + 1] ? 'is-check' : ''}><img src={f} alt="" /></span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── L · Showcase ── */
type Tab = 'apps' | 'creatives' | 'films';

export function WorkShowcase() {
  const [tab, setTab] = useState<Tab>('apps');
  const tabs: { id: Tab; label: string }[] = [
    { id: 'apps', label: 'Apps' },
    ...(CREATIVE ? [{ id: 'creatives' as Tab, label: 'Creatives' }] : []),
    ...(FILM ? [{ id: 'films' as Tab, label: 'Films' }] : []),
  ];

  return (
    <section className="nl-section" aria-labelledby="ab-work">
      <div className="nl-container">
        <Head />
        <div className="aw-tabs" role="tablist" aria-label="Kinds of work">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} className={tab === t.id ? 'is-on' : ''} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="aw-stage" role="tabpanel">
          {/* Apps: the style range on the left, both businesses beside it. */}
          {tab === 'apps' && (
            <>
              <div className="aw-stage-art aw-stage-art--check aw-styles aw-styles--big">
                {STYLES.map((s) => <img key={s} src={s} alt="" />)}
              </div>
              <div className="aw-stage-copy">
                <p className="ab-card-kind">Apps</p>
                <h3 className="aw-stage-title">Two businesses, one engine.</h3>
                <a href={WORK.clipart.href} target="_blank" rel="noopener noreferrer" className="aw-stage-app">
                  <ClipArtWordmark className="ab-card-clipart" />
                  <span>{WORK.clipart.line}</span>
                </a>
                <a href={WORK.seopage.href} target="_blank" rel="noopener noreferrer" className="aw-stage-app">
                  <SeoPageWordmark weight="light" className="ab-card-seopage" />
                  <span>{WORK.seopage.line}</span>
                </a>
                <p className="aw-stage-note">{RUNS} runs so far, each recorded on prompt, model, checks and cost.</p>
              </div>
            </>
          )}

          {/* Creatives: the explainer's thumbnail large, its credits beside it. */}
          {tab === 'creatives' && CREATIVE && (
            <>
              <div className="aw-stage-art">
                <img src={`https://i.ytimg.com/vi/${CREATIVE.youtubeId}/maxresdefault.jpg`} alt="" className="ab-cover" />
              </div>
              <div className="aw-stage-copy">
                <p className="ab-card-kind">{CREATIVE.kind}</p>
                <h3 className="aw-stage-title">{CREATIVE.title}</h3>
                <p className="ab-card-line">{CREATIVE.logline}</p>
                <dl className="aw-credits">
                  {CREATIVE.credits.slice(0, 4).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                </dl>
                <Link href={articlePath(CREATIVE.articleSlug)} className="ab-card-go">How I made it <ArrowRight size={14} aria-hidden="true" /></Link>
              </div>
            </>
          )}

          {/* Films: the poster, the logline and the credits. */}
          {tab === 'films' && FILM && (
            <>
              <div className="aw-stage-art">
                <img src={FILM.still} alt={FILM.stillAlt} className="ab-cover" />
              </div>
              <div className="aw-stage-copy">
                <p className="ab-card-kind">{FILM.meta}</p>
                <h3 className="aw-stage-title">{FILM.title}</h3>
                <p className="ab-card-line">{FILM.logline}</p>
                <dl className="aw-credits">
                  {FILM.credits.slice(0, 3).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                  <div><dt>Made</dt><dd>{FILM.facts}</dd></div>
                </dl>
                <Link href={filmHref(FILM)} className="ab-card-go">Watch the film <ArrowRight size={14} aria-hidden="true" /></Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
