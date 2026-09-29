/**
 * YouTubeBanner — G · Desk (LinkedInBanner.tsx) as YouTube channel art,
 * 2560×1440 (2026-09-29).
 *
 * YouTube crops the same image per device: TVs show all of it, desktop a
 * 2560×423 strip through the middle, phones only the centre 1546×423. So the
 * desk photo fills that middle strip, navy fills the rest (only TVs see it),
 * and every word sits inside the centre 1546×423 safe area.
 *
 * The copy sells the channel, not the email: the same name, a line about the
 * videos, and no URL (YouTube's own header links are the clickable ones).
 */
import { nlSerif } from '@/components/NewsletterHome/serif';
import { Wordmark } from './LinkedInBanner';
import './LinkedInBanner.css';
import './YouTubeBanner.css';

export const YOUTUBE_SIZE = { width: 2560, height: 1440 };

export default function YouTubeBanner() {
  return (
    <div className={`lib-root ytb-root ${nlSerif.variable}`}>
      <div className="lib-canvas ytb-canvas">
        {/* The photo spans the desktop strip, with room above and below to fade out. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- exported as a fixed-size image, no responsive sizes needed */}
        <img className="ytb-img" src="/prototypes/linkedin-banner/zev-setup.jpg" alt="" />
        <div className="ytb-wash" aria-hidden="true" />
        {/* Everything readable lives in the phone-safe centre box. */}
        <div className="ytb-safe">
          {/* The brand as a signature over the name, inside the phone-safe box. */}
          <div className="ytb-mark">
            <Wordmark onDark />
          </div>
          <div className="lib-serif ytb-name">
            The Marketing <em>Engineer</em>
          </div>
          <div className="ytb-sub">Watch me build the AI systems that run marketing.</div>
        </div>
      </div>
    </div>
  );
}
