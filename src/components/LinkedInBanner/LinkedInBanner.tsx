/**
 * LinkedInBanner — Zev's LinkedIn profile banner, three directions
 * (2026-09-28). Compare them at /prototypes/linkedin-banner/.
 *
 *   A · Masthead — light paper, the homepage's serif promise, and the two
 *                  businesses the systems run on.
 *   B · Proof    — navy: "Marketing engineer." on the left, a ledger of what
 *                  he runs (clip.art, SEOPage, Esy) on the right.
 *   C · Scene    — the education hero's generated "flow" backdrop with one
 *                  short line over its dark side.
 *
 * Every banner is drawn at LinkedIn's upload size, 1584×396, in plain px, and
 * exported to PNG by scripts/export-linkedin-banners.mjs. LinkedIn lays the
 * profile photo over the bottom-left (about the left 380px on desktop and 490px
 * in the phone app), so words start at x≈540 and only the small wordmark sits
 * in the free top-left corner.
 */
import ClipArtWordmark from '@/components/NewsletterHome/ClipArtWordmark';
import SeoPageWordmark from '@/components/NewsletterHome/SeoPageWordmark';
import { nlSerif } from '@/components/NewsletterHome/serif';
import './LinkedInBanner.css';

export type BannerVariant = 'masthead' | 'proof' | 'scene';
export const BANNER_VARIANTS: BannerVariant[] = ['masthead', 'proof', 'scene'];
export { BANNER_SIZE } from './size';

/** The real wordmark: "esy" in Black Ops One, the "e" in jade. */
function Wordmark({ onDark }: { onDark: boolean }) {
  return (
    <span className={`lib-wordmark ${onDark ? 'lib-wordmark--dark' : ''}`} aria-label="esy">
      <span className="lib-wordmark-e">e</span>sy
    </span>
  );
}

/* ── A · Masthead ─────────────────────────────────────────────────────── */

function Masthead() {
  return (
    <div className="lib-canvas lib-masthead">
      <div className="lib-corner">
        <Wordmark onDark={false} />
      </div>
      {/* The promise and the proof, right of the photo. */}
      <div className="lib-masthead-copy">
        <div className="lib-label">The Marketing Engineer · free every week</div>
        <div className="lib-serif lib-masthead-title">
          I build the AI systems that <em>run marketing</em>, and show you how.
        </div>
        <div className="lib-masthead-foot">
          <span className="lib-masthead-proof">
            Running in production at
            <ClipArtWordmark className="lib-clipart" />
            <SeoPageWordmark weight="light" className="lib-seopage" />
          </span>
          <span className="lib-url">esy.com</span>
        </div>
      </div>
    </div>
  );
}

/* ── B · Proof ────────────────────────────────────────────────────────── */

// What he runs, in the customer's words. No numbers: the banner lives for
// months, and a stale figure is worse than none.
const LEDGER = [
  { mark: <ClipArtWordmark className="lib-clipart" />, what: 'AI clip art and coloring pages' },
  { mark: <SeoPageWordmark weight="light" className="lib-seopage" />, what: 'Gets local businesses named in AI answers' },
  { mark: <Wordmark onDark />, what: 'The system both of them run on' },
];

function Proof() {
  return (
    <div className="lib-canvas lib-proof">
      <div className="lib-proof-glow" aria-hidden="true" />
      <div className="lib-corner">
        <Wordmark onDark />
      </div>
      {/* Who he is, and where to read him. */}
      <div className="lib-proof-copy">
        <div className="lib-serif lib-proof-title">
          Marketing <em>engineer</em>.
        </div>
        <div className="lib-proof-sub">
          I build AI systems that run real businesses, then write up how, every week at <b>esy.com</b>.
        </div>
      </div>
      {/* The ledger: what those systems run. */}
      <ul className="lib-ledger">
        {LEDGER.map((row, i) => (
          <li key={i}>
            <span className="lib-ledger-mark">{row.mark}</span>
            <span className="lib-ledger-what">{row.what}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── C · Scene ────────────────────────────────────────────────────────── */

function Scene() {
  return (
    <div className="lib-canvas lib-scene">
      {/* The backdrop is 16:9; its crop keeps the glowing paths and the figure on the cliff. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- exported as a fixed-size PNG, no responsive sizes needed */}
      <img className="lib-scene-img" src="/prototypes/education/backdrops/flow.webp" alt="" />
      <div className="lib-scene-shade" aria-hidden="true" />
      <div className="lib-corner">
        <Wordmark onDark />
      </div>
      <div className="lib-scene-copy">
        <div className="lib-serif lib-scene-title">
          Marketing, <em>engineered</em>.
        </div>
        <div className="lib-scene-sub">
          The AI behind clip.art and SEOPage, built in the open.
          <span className="lib-scene-cta">Free every week at esy.com</span>
        </div>
      </div>
    </div>
  );
}

/** One banner at full upload size. Scale it with ScaledBanner to show it smaller. */
export default function LinkedInBanner({ variant }: { variant: BannerVariant }) {
  const banner = variant === 'masthead' ? <Masthead /> : variant === 'proof' ? <Proof /> : <Scene />;
  return <div className={`lib-root ${nlSerif.variable}`}>{banner}</div>;
}
