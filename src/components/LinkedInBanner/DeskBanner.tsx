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
 * Exported at 2x by scripts/export-linkedin-banners.mjs from
 * /prototypes/social-banner/<kind>/raw/.
 */
import { nlSerif } from '@/components/NewsletterHome/serif';
import { Wordmark } from './LinkedInBanner';
import './LinkedInBanner.css';
import './DeskBanner.css';

export type DeskBannerKind = 'github' | 'x';

export const DESK_BANNERS: Record<DeskBannerKind, { width: number; height: number; line: string }> = {
  github: { width: 1280, height: 320, line: 'The code behind the AI systems that run marketing.' },
  x: { width: 1500, height: 500, line: 'Learn to build the AI systems that run marketing.' },
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
          <div className="db-sub">{b.line}</div>
        </div>
      </div>
    </div>
  );
}
