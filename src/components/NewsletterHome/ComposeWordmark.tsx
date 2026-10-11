/**
 * ComposeWordmark — Esy Compose's mark, built from the esy wordmark: "esy" in
 * Black Ops One with its jade first letter, as the site header and
 * compose.esy.com's bar set it. Three ways to carry the name (2026-09-30,
 * /prototypes/home-compose/):
 *
 *   lockup  — esy | COMPOSE: hairline and tracked caps, exactly the header's
 *             "esy | OS" lockup with the product name swapped.
 *   stencil — "compose" set in the esy face itself, jade first letter, so the
 *             product reads as a sibling of the wordmark.
 *   pen     — esy, then "Compose" in Compose's own italic serif (Cormorant),
 *             the stencil for the company and the pen for the product.
 *
 * Everything is sized in em: set font-size on the mark or its parent. The
 * letters take currentColor; the first letter takes --cw-accent (jade).
 */
// Fonts are self-hosted from src/fonts/ (scripts/fetch-google-fonts.py), so builds never fetch from Google.
import localFont from 'next/font/local';
import './ComposeWordmark.css';

// Compose's italic display cut, loaded only where the pen mark renders.
const composeItalic = localFont({
  src: [
    { path: '../../fonts/cormorant-garamond/cormorant-garamond-300-700-italic.woff2', weight: '300 700', style: 'italic' },
  ],
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});

export type ComposeMarkStyle = 'lockup' | 'stencil' | 'pen';

export default function ComposeWordmark({ mark = 'lockup', className = '' }: { mark?: ComposeMarkStyle; className?: string }) {
  return (
    <span role="img" aria-label="Esy Compose" className={`cw cw--${mark} ${className}`}>
      {mark === 'stencil' ? (
        <span className="cw-face" aria-hidden="true">compose</span>
      ) : (
        <>
          <span className="cw-face" aria-hidden="true">esy</span>
          {mark === 'lockup' && <span className="cw-rule" aria-hidden="true" />}
          <span className={mark === 'lockup' ? 'cw-tag' : `cw-pen ${composeItalic.className}`} aria-hidden="true">Compose</span>
        </>
      )}
    </span>
  );
}
