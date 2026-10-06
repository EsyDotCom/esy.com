'use client';

/* A working copy of os.esy.com/agency/runway, as a window on an esy.com page.
 *
 * The bar's markup and class names follow the live /agency shell (os.esy.com
 * src/components/folio/app/shell.tsx) and the stylesheets are the product's,
 * copied verbatim (folio.css, runway.css), so this looks like the product
 * because it is the product's UI, fed sample figures instead of the API.
 * Like OfficePreview, it renders at a fixed desktop width and scales to fit
 * its container; the panes scroll on their own inside it. */

import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Cormorant_Garamond } from 'next/font/google';
import './folio.css';
import './runway.css';
import './preview.css';

// Folio's display serif. Inter and Black Ops One are already loaded site-wide.
const cormorant = Cormorant_Garamond({ variable: '--font-cormorant', subsets: ['latin'], weight: ['600', '700'], style: ['normal', 'italic'] });

const DESIGN_WIDTH = 1240;
const NAV = ['Home', 'Brief', 'Inbox', 'Clients', 'Work', 'Agents', 'Data'];

/** Anything inside the window that leads outside the prototype calls this for a one-line note. */
const NoteContext = createContext<(text?: string) => void>(() => {});
export const useOutsideNote = () => useContext(NoteContext);

/** A link to a page that isn't in the preview: it answers with a note instead of navigating. */
export function OutLink({ className, children, note }: { className?: string; children: React.ReactNode; note?: string }) {
  const say = useOutsideNote();
  return (
    <button type="button" className={className} onClick={() => say(note)}>
      {children}
    </button>
  );
}

export default function RunwayWindow({
  children,
  path = '/agency/runway',
  screenHeight = 880,
  className = '',
}: {
  children: React.ReactNode;
  path?: string;
  /** Height of the window's screen, in desktop pixels (before scaling). */
  screenHeight?: number;
  className?: string;
}) {
  // ── Scale the desktop render to the container's width ─────────────────
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.8);
  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / DESIGN_WIDTH);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Pages outside the preview answer with a short note instead of nothing.
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);
  const say = (text?: string) => setToast(text ?? 'That part of Esy OS isn’t in this preview. Runway is.');

  return (
    <NoteContext.Provider value={say}>
      <div className={`rvp-frame ${className}`}>
        <div className="rvp-chrome" aria-hidden="true">
          <span className="rvp-dots"><i /><i /><i /></span>
          <span className="rvp-url"><b>os.esy.com</b>{path}</span>
          <span className="rvp-chrome-spacer" />
        </div>
        <div className="rvp-viewport" ref={viewportRef} style={{ height: screenHeight * scale }}>
          <div className="rvp-scaler" style={{ width: DESIGN_WIDTH, height: screenHeight, transform: `scale(${scale})` }}>
            <div className={`${cormorant.variable} folio rvp-win`}>
              <div className="fo-app">
                {/* ── The /agency bar (shell.tsx's Bar), Runway on ─────────── */}
                <header className="fo-bar">
                  <div className="fo-bar-in">
                    <button type="button" className="fo-lockup rvp-lockup" onClick={() => say()}>
                      <span className="fo-wordmark">esy</span>
                      <span className="fo-lockup-sep" />
                      <span className="fo-lockup-name">OS</span>
                    </button>
                    <nav className="fo-nav" aria-label="Esy OS (preview)">
                      {NAV.map((n) => (
                        <button key={n} type="button" className="rvp-navbtn" onClick={() => say()}>
                          {n}
                        </button>
                      ))}
                    </nav>
                    <div className="fo-bar-end">
                      <button type="button" className="fo-btn fo-btn--primary" onClick={() => say()}>+ New job</button>
                      <span className="fo-bar-link is-on rv-on" aria-current="page" title="Only you see Runway">Runway</span>
                      <button type="button" className="fo-bar-link rvp-navbtn" onClick={() => say()}>Classic</button>
                      <button type="button" className="fo-bar-link rvp-navbtn" onClick={() => say()}>Settings</button>
                    </div>
                  </div>
                </header>
                {children}
              </div>
              {toast && <div className="rvp-toast" role="status">{toast}</div>}
            </div>
          </div>
        </div>
      </div>
    </NoteContext.Provider>
  );
}
