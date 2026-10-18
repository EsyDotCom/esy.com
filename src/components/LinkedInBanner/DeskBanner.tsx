/**
 * DeskBanner — the G · Desk banner (LinkedInBanner.tsx) at any size, for the
 * other profiles (2026-09-29): Zev's desk photo under a navy wash that deepens
 * to the right, the esy wordmark over "The Marketing Engineer", and one line.
 *
 *   github — 1280 × 320, the profile README banner. No avatar covers it.
 *   x      — 1500 × 500, the X header. X lays the avatar over the
 *            bottom-left and crops a little top and bottom on phones, so the
 *            words sit right and in the middle band.
 *
 * Added for the social kit (2026-10-18, esy.com/brand#social), same design:
 *   facebook — 851 × 315, the page cover. Phones crop it to 2.4:1, so the
 *              words stay clear of the right edge.
 *   bluesky  — 1500 × 500, like X: the avatar sits over the bottom-left.
 *   substack — 1100 × 220, the email header: wordmark and title only.
 *   skool    — 1084 × 576, the group cover. Skool shows it whole.
 *   reddit   — 1920 × 384, the community banner. Phones crop the sides.
 *   linkedin-company — 1512 × 256, the company page cover (the page's logo
 *              sits over its bottom-left).
 *
 * Exported at 2x by scripts/export-linkedin-banners.mjs from
 * /prototypes/social-banner/<kind>/raw/.
 */
import { nlSerif } from '@/components/NewsletterHome/serif';
import { Wordmark } from './LinkedInBanner';
import './LinkedInBanner.css';
import './DeskBanner.css';

export type DeskBannerKind = 'github' | 'x' | 'facebook' | 'bluesky' | 'substack' | 'skool' | 'reddit' | 'linkedin-company';

export const DESK_BANNERS: Record<DeskBannerKind, { width: number; height: number; line: string }> = {
  github: { width: 1280, height: 320, line: 'The code behind the AI systems that run marketing.' },
  x: { width: 1500, height: 500, line: 'Learn to build the AI systems that run marketing.' },
  facebook: { width: 851, height: 315, line: 'Learn to build the AI systems that run marketing.' },
  bluesky: { width: 1500, height: 500, line: 'Learn to build the AI systems that run marketing.' },
  substack: { width: 1100, height: 220, line: '' },
  skool: { width: 1084, height: 576, line: 'Learn to build the AI systems that run marketing.' },
  reddit: { width: 1920, height: 384, line: 'Learn to build the AI systems that run marketing.' },
  'linkedin-company': { width: 1512, height: 256, line: 'Learn to build the AI systems that run marketing.' },
};

export default function DeskBanner({ kind }: { kind: DeskBannerKind }) {
  const b = DESK_BANNERS[kind];
  return (
    <div className={`lib-root db-root db--${kind} ${nlSerif.variable}`} style={{ width: b.width, height: b.height }}>
      <div className="db-canvas" style={{ width: b.width, height: b.height }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- exported as a fixed-size image */}
        <img className="db-img" src="/prototypes/linkedin-banner/zev-setup.jpg" alt="" />
        <div className="db-wash" aria-hidden="true" />
        <div className="db-copy">
          <div className="db-mark">
            <Wordmark onDark />
          </div>
          <div className="lib-serif db-name">
            The Marketing <em>Engineer</em>
          </div>
          {b.line && <div className="db-sub">{b.line}</div>}
        </div>
      </div>
    </div>
  );
}
