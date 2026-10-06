import Link from 'next/link';
import LightHeader from '@/components/LightHeader/LightHeader';
import type { ReactNode } from 'react';
import './brand-shapes.css';

// The page every take renders into: the take's hero, then the same theme in
// use across the site (a loader, a profile picture, an empty page, an article
// stamp, a section divider). Same slots for all five, so the comparison is
// about the motion and the shapes, not the layout around them.

export interface TakeCopy {
  key: string;
  name: string;
  headline: string;
  lede: string;
  /** What the motion says about Esy, in one line. */
  says: string;
}

export function Board({
  copy,
  hero,
  mark,
  divider,
  tone = 'paper',
  note = 'Prototype. The e is real: its cut comes from Black Ops One, as in our loader. The animals are new drawings in that cut, and nothing here is live yet.',
  header = false,
}: {
  copy: TakeCopy;
  hero: ReactNode;
  /** The take's small animated mark at a given width in px. */
  mark: (width: number) => ReactNode;
  divider: ReactNode;
  tone?: 'paper' | 'mint' | 'grid' | 'night';
  /** The quiet line saying what's real; defaults to round one's. */
  note?: ReactNode;
  /** The site header on top, with the logo proposal: teal e, navy sy. */
  header?: boolean;
}) {
  return (
    <main className="bs-root">
      {header && (
        <div className="bs-logo-navy">
          <LightHeader />
        </div>
      )}

      {/* Hero: the take's copy beside its full-size figure. */}
      <section className={`bs-hero bs-hero--${tone}`}>
        <div className="bs-wrap bs-hero-grid">
          <div className="bs-hero-copy">
            <p className="bs-kicker">
              Brand shapes · <span>{copy.key}</span> · {copy.name}
            </p>
            <h1 className="bs-title">{copy.headline}</h1>
            <p className="bs-lede">{copy.lede}</p>
            <p className="bs-says">
              <b>What it says</b>
              {copy.says}
            </p>
          </div>
          <div className="bs-hero-stage">{hero}</div>
        </div>
      </section>

      {/* In use: the same mark at product sizes. */}
      <section className="bs-use">
        <div className="bs-wrap">
          <p className="bs-eyebrow">On the site</p>
          <h2 className="bs-h2">The same motion, small.</h2>
          <div className="bs-use-grid">
            <figure className="bs-card bs-card--loader">
              <div className="bs-loader-row">
                <div style={{ width: 64 }}>{mark(64)}</div>
                <span>Loading the article…</span>
              </div>
              <figcaption>Loader</figcaption>
            </figure>
            <figure className="bs-card bs-card--avatar">
              <div className="bs-avatar">{mark(132)}</div>
              <figcaption>Profile picture</figcaption>
            </figure>
            <figure className="bs-card bs-card--empty">
              <div style={{ width: 150 }}>{mark(150)}</div>
              <p className="bs-empty-title">This page wandered off.</p>
              <Link href="/" className="bs-empty-link">
                Back to the homepage →
              </Link>
              <figcaption>Empty page / 404</figcaption>
            </figure>
            <figure className="bs-card bs-card--article">
              <div className="bs-article">
                <div className="bs-article-cover">
                  <div className="bs-stamp">{mark(46)}</div>
                </div>
                <p className="bs-article-kicker">Sample article</p>
                <p className="bs-article-title">A sample headline, set the way the site sets them</p>
              </div>
              <figcaption>Article stamp</figcaption>
            </figure>
          </div>

          {/* Divider: between two stand-in section heads, as on the homepage. */}
          <div className="bs-divider-demo">
            <p className="bs-demo-head">
              <span>01</span> Apps
            </p>
            <div className="bs-divider">{divider}</div>
            <p className="bs-demo-head">
              <span>02</span> Latest
            </p>
          </div>

          <p className="bs-note">{note}</p>
        </div>
      </section>
    </main>
  );
}
