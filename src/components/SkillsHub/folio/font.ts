// Fonts are self-hosted from src/fonts/ (scripts/fetch-google-fonts.py), so builds never fetch from Google.
import localFont from 'next/font/local';

// Folio's serif, as docs.esy.com and os.esy.com load it: wrap the Folio root's
// parent in `cormorant.variable`; folio.css reads --font-cormorant. Inter and
// Black Ops One already come from esy.com's root layout.
export const cormorant = localFont({
  src: [
    { path: '../../../fonts/cormorant-garamond/cormorant-garamond-300-700-italic.woff2', weight: '300 700', style: 'italic' },
    { path: '../../../fonts/cormorant-garamond/cormorant-garamond-300-700-normal.woff2', weight: '300 700', style: 'normal' },
  ],
  variable: '--font-cormorant',
  adjustFontFallback: 'Times New Roman',
});
