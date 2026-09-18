'use client';

/* Hero B · Stage — briefly the live homepage hero (2026-09-18), before
 * E · Stage Tour replaced it.
 *
 * Centred promise over a full-width Books window. Numbered chips light the
 * part of the page they name and say, in one line, what it tells you; a
 * Light/Dark switch shows the office's two themes. */

import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import OfficePreview, { type BooksPart, type OfficeTheme } from '@/components/OfficePreview/OfficePreview';
import { HeroActions, PreviewCaption } from './shared';

const PARTS: { part: BooksPart; label: string; explain: string }[] = [
  { part: 'stats', label: 'The week', explain: 'What was made, what it cost, and how much is waiting for you to approve.' },
  { part: 'spend', label: 'Spend by client', explain: 'Every model call, rolled up to the client it was for. Hover a day for the split.' },
  { part: 'budgets', label: 'Budgets', explain: 'A monthly budget per client. The tick shows where spend should be today.' },
  { part: 'workers', label: 'Workers', explain: 'Each AI worker’s output this week, and what one piece costs.' },
];

export default function HeroStage({ src = 'hero-stage' }: { src?: string }) {
  const [focus, setFocus] = useState<BooksPart | null>(null);
  const [theme, setTheme] = useState<OfficeTheme>('light');
  const active = PARTS.find((p) => p.part === focus);

  return (
    <section className="hl hl-hero">
      <div className="hl-wrap hl-stage">
        <h1 className="hl-h1">
          Your AI team&apos;s work and spend, <em>on one page</em>.
        </h1>
        <p className="hl-sub">
          See what your AI workers made this week, what it cost for each client, and what&apos;s waiting on you. Esy
          runs the work and keeps the books, so you never have to piece it together.
        </p>
        <HeroActions src={src} docs={false} />

        <div className="hl-stage-shot">
          {/* ── Chips point at a part; the switch flips the theme ───────── */}
          <div className="hl-controls">
            <div className="hl-chips" role="group" aria-label="Point at a part of the Books">
              {PARTS.map((p, i) => (
                <button
                  key={p.part}
                  type="button"
                  className="hl-chip"
                  aria-pressed={focus === p.part}
                  onClick={() => setFocus(focus === p.part ? null : p.part)}
                >
                  <span className="n">{i + 1}</span>
                  {p.label}
                </button>
              ))}
            </div>
            <div className="hl-seg" role="group" aria-label="Theme">
              <button type="button" aria-pressed={theme === 'light'} onClick={() => setTheme('light')}>
                <Sun size={14} aria-hidden="true" /> Light
              </button>
              <button type="button" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}>
                <Moon size={14} aria-hidden="true" /> Dark
              </button>
            </div>
          </div>
          <p className="hl-explain" aria-live="polite">
            {active ? (
              <>
                <b>{active.label}.</b> {active.explain}
              </>
            ) : (
              'Pick a number to see what each part of the page tells you.'
            )}
          </p>
          <OfficePreview theme={theme} onThemeChange={setTheme} focus={focus} screenHeight={700} />
          <PreviewCaption />
        </div>
      </div>
    </section>
  );
}
