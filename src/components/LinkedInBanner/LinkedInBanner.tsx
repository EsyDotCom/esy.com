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
 * Round 2 leads with the name, The Marketing Engineer, and names no product:
 *
 *   D · Nameplate — a newspaper nameplate on paper: the name huge, the
 *                   promise under a rule.
 *   E · Desks     — navy: the name, and the four desks every issue files under.
 *   F · Night     — navy too: C's backdrop screened onto it, the name as the headline.
 *
 * Round 3 merges Zev's own banner (a photo of his desk) with the nameplate:
 *
 *   G · Desk      — his setup under a navy wash, the name on the right.
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
import { DESKS } from '@/components/EducationHero/desks';
import './LinkedInBanner.css';

export type BannerVariant = 'masthead' | 'proof' | 'scene' | 'nameplate' | 'desks' | 'night' | 'desk';
export const BANNER_VARIANTS: BannerVariant[] = ['masthead', 'proof', 'scene', 'nameplate', 'desks', 'night', 'desk'];
export { BANNER_SIZE } from './size';

/** The real wordmark: "esy" in Black Ops One, the "e" in jade. */
export function Wordmark({ onDark }: { onDark: boolean }) {
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
        <div className="lib-label">The Marketing Engineer · every week</div>
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
          <span className="lib-scene-cta">Every week at esy.com</span>
        </div>
      </div>
    </div>
  );
}

/* ── D · Nameplate ────────────────────────────────────────────────────── */

function Nameplate() {
  return (
    <div className="lib-canvas lib-nameplate">
      <div className="lib-corner">
        <Wordmark onDark={false} />
      </div>
      {/* A newspaper nameplate: the name as the masthead, the promise under a double rule. */}
      <div className="lib-nameplate-copy">
        <div className="lib-label">A weekly email</div>
        <div className="lib-serif lib-nameplate-name">
          The Marketing <em>Engineer</em>
        </div>
        <div className="lib-nameplate-rule" aria-hidden="true" />
        <div className="lib-nameplate-foot">
          <span>Learn to build the AI systems that run marketing.</span>
          <span className="lib-url">esy.com</span>
        </div>
      </div>
    </div>
  );
}

/* ── E · Desks ────────────────────────────────────────────────────────── */

function Desks() {
  return (
    <div className="lib-canvas lib-proof lib-desks">
      <div className="lib-proof-glow" aria-hidden="true" />
      <div className="lib-corner">
        <Wordmark onDark />
      </div>
      <div className="lib-desks-copy">
        <div className="lib-serif lib-desks-name">
          The Marketing <em>Engineer</em>
        </div>
        <div className="lib-desks-sub">One email a week on building the AI systems that run marketing.</div>
        {/* The four desks every issue files under, as on the homepage. */}
        <div className="lib-desks-row">
          {DESKS.map((d) => (
            <span key={d.key} className="lib-serif">
              {d.name}
            </span>
          ))}
          <span className="lib-desks-url">esy.com</span>
        </div>
      </div>
    </div>
  );
}

/* ── F · Night ────────────────────────────────────────────────────────── */

function Night() {
  return (
    <div className="lib-canvas lib-night">
      {/* The scene screened onto our navy: its black drops out and only the
          glowing paths and the lit valley stay. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- exported as a fixed-size PNG, no responsive sizes needed */}
      <img className="lib-scene-img lib-night-img" src="/prototypes/education/backdrops/flow.webp" alt="" />
      <div className="lib-corner">
        <Wordmark onDark />
      </div>
      <div className="lib-scene-copy lib-night-copy">
        <div className="lib-serif lib-night-name">
          The Marketing <em>Engineer</em>
        </div>
        <div className="lib-scene-sub">
          Learn to build the AI systems that run marketing.
          <span className="lib-scene-cta">Every week at esy.com</span>
        </div>
      </div>
    </div>
  );
}

/* ── G · Desk ─────────────────────────────────────────────────────────── */

function Desk() {
  return (
    <div className="lib-canvas lib-desk">
      {/* Zev's real setup: the proof he builds. The wash keeps the monitor
          visible on the left and goes deep navy under the name on the right. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- exported as a fixed-size PNG, no responsive sizes needed */}
      <img className="lib-desk-img" src="/prototypes/linkedin-banner/zev-setup.jpg" alt="" />
      <div className="lib-desk-wash" aria-hidden="true" />
      <div className="lib-desk-copy">
        {/* The brand as a signature over the name: esy presents The Marketing Engineer. */}
        <div className="lib-desk-mark">
          <Wordmark onDark />
        </div>
        <div className="lib-serif lib-desk-name">
          The Marketing <em>Engineer</em>
        </div>
        {/* No URL: the wordmark already names the brand, and the profile's website link is the clickable one. */}
        <div className="lib-desk-sub">Learn to build the AI systems that run marketing.</div>
      </div>
    </div>
  );
}

const BANNERS: Record<BannerVariant, () => React.JSX.Element> = {
  masthead: Masthead,
  proof: Proof,
  scene: Scene,
  nameplate: Nameplate,
  desks: Desks,
  night: Night,
  desk: Desk,
};

/** One banner at full upload size. Scale it with ScaledBanner to show it smaller. */
export default function LinkedInBanner({ variant }: { variant: BannerVariant }) {
  const Banner = BANNERS[variant];
  return (
    <div className={`lib-root ${nlSerif.variable}`}>
      <Banner />
    </div>
  );
}
