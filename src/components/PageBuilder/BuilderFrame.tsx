'use client';

/* The builder's own page: Folio's fonts and the stylesheets copied from
 * os.esy.com, around the builder. It renders at /prototypes/page-builder/
 * <variant>/raw/ (full screen) and inside BuilderWindow's iframe, so the
 * builder's own breakpoints and 100vh see a real desktop window. Links and
 * menus that lead outside the builder answer with a one-line note. */

import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
// Fonts are self-hosted from src/fonts/ (scripts/fetch-google-fonts.py), so builds never fetch from Google.
import localFont from 'next/font/local';
import './folio.css';
import './agency.css';
import './app.css';
import './builder.css';
import './builder2.css';
import './preview.css';

// Folio's display serif. Inter and Black Ops One already load site-wide under
// the variable names folio.css reads.
const cormorant = localFont({
  src: [
    { path: '../../fonts/cormorant-garamond/cormorant-garamond-300-700-italic.woff2', weight: '300 700', style: 'italic' },
    { path: '../../fonts/cormorant-garamond/cormorant-garamond-300-700-normal.woff2', weight: '300 700', style: 'normal' },
  ],
  variable: '--font-cormorant',
  adjustFontFallback: 'Times New Roman',
});

const OUTSIDE = 'a, .fo-lockup, .ed-page, .ed-crumb-cur';

export function BuilderFrame({ children }: { children: ReactNode }) {
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    if (!note) return;
    const t = setTimeout(() => setNote(null), 2600);
    return () => clearTimeout(t);
  }, [note]);

  const onClickCapture = (e: MouseEvent) => {
    if (!(e.target as HTMLElement).closest(OUTSIDE)) return;
    e.preventDefault();
    e.stopPropagation();
    setNote('That leads out of the page builder, which is all this prototype covers.');
  };

  return (
    <div className={`${cormorant.variable} folio pbw-app`} onClickCapture={onClickCapture}>
      {children}
      {note && <p className="pbw-note" role="status">{note}</p>}
    </div>
  );
}
