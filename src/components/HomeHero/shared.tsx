/* Pieces every homepage hero shares: where the buttons go, the note under the
 * live window, and the proof line. Copy rule for every hero: say what the
 * product does in the customer's words. No riddles, no engine vocabulary
 * (workflow, run, gate). */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './HomeHero.css';

export const DOCS_URL = 'https://docs.esy.com';
/** Waitlist link tagged with the hero it came from, so signups can be compared. */
export const waitlistHref = (src: string) => `/waitlist/?src=${src}`;

export function HeroActions({ src, docs = true }: { src: string; docs?: boolean }) {
  return (
    <div className="hl-actions">
      <Link href={waitlistHref(src)} className="hl-btn hl-btn--primary">
        Join the waitlist <ArrowRight size={16} aria-hidden="true" />
      </Link>
      {docs && (
        <a href={DOCS_URL} className="hl-btn hl-btn--ghost">
          Read the docs
        </a>
      )}
    </div>
  );
}

/** Says plainly what the window is and what to try in it. */
export function PreviewCaption() {
  return (
    <p className="hl-caption">
      <span className="tag">Live preview</span>
      The real Books page with sample numbers. Hover a day, switch the range, try dark mode.
    </p>
  );
}

export function HeroProof() {
  return (
    <p className="hl-proof">
      Already running the books for <b>clip.art</b> and <b>SEOPage.com</b>.
    </p>
  );
}
