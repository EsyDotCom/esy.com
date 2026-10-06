'use client';

// Copied from os.esy.com (src/components/folio/agency/builder2.tsx and
// builderproto.tsx on the proto/page-builder branch, PR #319, 2026-10-04) so
// esy.com/prototypes shows the real builder. Same markup and class names.

import { useState } from 'react';
import { SECTIONS, SEC_NOTE } from './sample';
import { Device } from './parts';

// ── R18–R20 · the frame bar, three ways ───────────────────────────────────
// Zev's screenshot (Oct 4): at a laptop width the section tabs wrapped
// ("Call to action" and "+ Section" on two lines) and the action row said
// Hero while Questions was the open tab. Each take keeps one line per row,
// and the bar, the canvas and the rail all follow the same picked section.

export type BarKind = 'one' | 'tabs' | 'float';

export const secOf = (id: string) => SECTIONS.find((x) => x.id === id) ?? SECTIONS[0];
export const secName = (id: string) => secOf(id).name;

export const LockIcon = () => (
  <svg className="bx-lock" viewBox="0 0 12 12" aria-label="locked" role="img">
    <rect x="2" y="5.5" width="8" height="5.5" rx="1.4" fill="currentColor" />
    <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

/** Try 3 more · Lock · Undo for an open section; Unlock for a locked one. */
export function SectionActions({ sel, onTry, dark = false }: { sel: string; onTry: () => void; dark?: boolean }) {
  const s = secOf(sel);
  const cls = dark ? 'bx-fbtn' : 'rb-act';
  if (s.lock) return <><span className="bx-locked"><LockIcon /> Locked by Zev</span><button className={cls}>Unlock</button></>;
  return (
    <>
      <button className={dark ? 'bx-fbtn bx-fbtn--try' : 'rb-act rb-act--try'} onClick={(e) => { e.stopPropagation(); onTry(); }}>Try 3 more</button>
      <button className={cls}>Lock</button>
      <button className={cls}>Undo</button>
    </>
  );
}

export function SectionTabs({ sel, setSel }: { sel: string; setSel: (id: string) => void }) {
  return (
    <div className="bx-tabwrap">
      <div className="bx-tabs" role="tablist" aria-label="Sections">
        {SECTIONS.map((s) => (
          <button key={s.id} role="tab" aria-selected={sel === s.id} className={sel === s.id ? 'is-on' : ''} onClick={() => setSel(s.id)}>
            {s.name}{s.lock && <LockIcon />}
          </button>
        ))}
      </div>
      <button className="bx-add" aria-label="Add a section" title="Add a section">+</button>
    </div>
  );
}

export function SectionMenu({ sel, setSel }: { sel: string; setSel: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const i = SECTIONS.findIndex((x) => x.id === sel);
  const s = SECTIONS[i];
  const step = (d: number) => setSel(SECTIONS[(i + d + SECTIONS.length) % SECTIONS.length].id);
  return (
    <div className="bx-menu">
      <button className="bx-pick" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="bx-pick-n">{i + 1}/{SECTIONS.length}</span>
        <b>{s.name}</b>{s.lock && <LockIcon />}
        <span className="bx-caret" aria-hidden="true" />
      </button>
      <button className="bx-step" aria-label="Previous section" onClick={() => step(-1)}>‹</button>
      <button className="bx-step" aria-label="Next section" onClick={() => step(1)}>›</button>
      {open && (
        <ul className="bx-list" role="listbox" aria-label="Sections">
          {SECTIONS.map((x, k) => (
            <li key={x.id}>
              <button role="option" aria-selected={x.id === sel} className={x.id === sel ? 'is-on' : ''} onClick={() => { setSel(x.id); setOpen(false); }}>
                <span className="bx-list-n">{k + 1}</span>
                <span className="bx-list-t"><b>{x.name}{x.lock && <LockIcon />}</b><span>{SEC_NOTE[x.id].note}</span></span>
              </button>
            </li>
          ))}
          <li><button className="bx-list-add">+ Add a section</button></li>
        </ul>
      )}
    </div>
  );
}

export const Warn = ({ sel, short = false }: { sel: string; short?: boolean }) => (SEC_NOTE[sel].warn ? <span className="bx-warn" title={SEC_NOTE[sel].warn}>! {short ? '1 to fix' : SEC_NOTE[sel].warn}</span> : null);
export const Score = () => <span className="rb-score"><b>9</b>/10 checks</span>;

export function SectionBar({ kind, sel, setSel, onTry, device = true }: { kind: BarKind; sel: string; setSel: (id: string) => void; onTry: () => void; device?: boolean }) {
  // R18 · One row: the section is a picker, so nothing has to wrap.
  if (kind === 'one') {
    return (
      <div className="bx-row bx-row--one">
        <SectionMenu sel={sel} setSel={setSel} />
        <span className="rb-div" />
        <SectionActions sel={sel} onTry={onTry} />
        <span className="bx-sp" />
        <Warn sel={sel} short />
        <Device />
        <Score />
      </div>
    );
  }
  // R19 · Two rows: tabs alone on top (they scroll, never wrap); the row
  // under them names the open section and carries its actions.
  if (kind === 'tabs') {
    return (
      <>
        <div className="bx-row bx-row--tabs"><SectionTabs sel={sel} setSel={setSel} /></div>
        <div className="bx-row bx-row--ctx">
          <span className="bx-what"><b>{secName(sel)}</b><span>{SEC_NOTE[sel].note}</span></span>
          <SectionActions sel={sel} onTry={onTry} />
          <span className="bx-sp" />
          <Warn sel={sel} />
          {device && <Device />}
          {device && <Score />}
        </div>
      </>
    );
  }
  // R20 · One slim row of tabs; the actions sit on the section itself.
  return (
    <div className="bx-row bx-row--slim">
      <SectionTabs sel={sel} setSel={setSel} />
      <span className="bx-sp" />
      <Device />
      <Score />
    </div>
  );
}

/** R20's toolbar, pinned to the top edge of the picked section on the page. */
export function FloatTools({ sel, onTry }: { sel: string; onTry: () => void }) {
  return (
    <div className="bx-float" role="toolbar" aria-label={`${secName(sel)} tools`} onClick={(e) => e.stopPropagation()}>
      <b>{secName(sel)}</b>
      <span className="bx-float-note">{SEC_NOTE[sel].note}</span>
      <span className="bx-float-div" />
      <SectionActions sel={sel} onTry={onTry} dark />
      {SEC_NOTE[sel].warn && <span className="bx-float-warn">! {SEC_NOTE[sel].warn}</span>}
    </div>
  );
}

