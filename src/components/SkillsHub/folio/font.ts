import { Cormorant_Garamond } from 'next/font/google';

// Folio's serif, as docs.esy.com and os.esy.com load it: wrap the Folio root's
// parent in `cormorant.variable`; folio.css reads --font-cormorant. Inter and
// Black Ops One already come from esy.com's root layout.
export const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
});
