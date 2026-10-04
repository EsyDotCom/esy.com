'use client';

// Copied from os.esy.com (src/components/folio/agency/builder2.tsx and
// builderproto.tsx on the proto/page-builder branch, PR #319, 2026-10-04) so
// esy.com/prototypes shows the real builder. Same markup and class names.

import type { ReactNode } from 'react';
import { Page } from './parts';
import { Lockup } from './lockup';

// ── R21–R23 · the builder as its own mode ─────────────────────────────────
// Zev (Oct 4): the builder needs its own interface. The agency nav and the
// masthead give way to an editor header with one way back to Work, and the
// page and rail fill the window below it (each scrolls on its own).
// R19's bar sits under each header.

export type ShellKind = 'light' | 'navy' | 'crumb';

const PageMenu = ({ dark = false }: { dark?: boolean }) => (
  <button className={`ed-page ${dark ? 'ed-page--dark' : ''}`} aria-haspopup="listbox">
    <span className="ed-page-t"><b>Roof leak repair, Denver</b><span>Northside Roofing · Draft v4 · Dan approves</span></span>
    <span className="bx-caret" aria-hidden="true" />
  </button>
);

function EditorHeader({ kind }: { kind: ShellKind }) {
  if (kind === 'navy') {
    // R22 · a dark editor chrome: Exit, the page, undo/redo and the device
    // in the middle, then the decisions.
    return (
      <header className="ed-bar ed-bar--navy">
        <a className="ed-exit" href="#" aria-label="Exit to Work"><span aria-hidden="true">✕</span> Exit</a>
        <span className="ed-vsep" />
        <PageMenu dark />
        <span className="bx-sp" />
        <div className="ed-mid">
          <button className="ed-icon" aria-label="Undo">↶</button>
          <button className="ed-icon" aria-label="Redo">↷</button>
          <div className="ed-seg" role="tablist" aria-label="Device"><button role="tab" aria-selected className="is-on">Desktop</button><button role="tab" aria-selected={false}>Phone</button></div>
          <span className="ed-score"><b>9</b>/10 checks</span>
        </div>
        <span className="bx-sp" />
        <span className="ed-saved ed-saved--dark">Saved</span>
        <button className="ed-ghost">Preview</button>
        <button className="ed-send">Send to Dan for approval</button>
      </header>
    );
  }
  if (kind === 'crumb') {
    // R23 · keep the agency's lockup so you know where you are; the nav
    // becomes the path to this page, and Done takes you back.
    return (
      <header className="fo-bar ed-crumbbar">
        <div className="fo-bar-in">
          <Lockup />
          <nav className="ed-crumbs" aria-label="Breadcrumb">
            <a href="#">Work</a><span aria-hidden="true">›</span>
            <a href="#">Northside Roofing</a><span aria-hidden="true">›</span>
            <button className="ed-crumb-cur" aria-haspopup="listbox">Roof leak repair, Denver <span className="bx-caret" aria-hidden="true" /></button>
            <span className="ed-chip">Draft · v4</span>
          </nav>
          <div className="fo-bar-end">
            <span className="ed-saved">Saved</span>
            <button className="fo-btn">Preview</button>
            <button className="fo-btn fo-btn--primary">Send to Dan for approval</button>
            <span className="ed-vsep ed-vsep--light" />
            <a className="ed-done" href="#">Done</a>
          </div>
        </div>
      </header>
    );
  }
  // R21 · a light editor header: back to Work, the page, the decisions.
  return (
    <header className="ed-bar ed-bar--light">
      <a className="ed-back" href="#"><span aria-hidden="true">←</span> Work</a>
      <span className="ed-vsep ed-vsep--light" />
      <PageMenu />
      <span className="bx-sp" />
      <span className="ed-saved">Saved</span>
      <button className="fo-btn">Preview</button>
      <button className="fo-btn fo-btn--primary">Send to Dan for approval</button>
    </header>
  );
}

/** The standard agency page, or the builder's own mode. */
export function Shell({ kind, children }: { kind?: ShellKind; children: ReactNode }) {
  return kind ? <EditorPage kind={kind}>{children}</EditorPage> : <Page>{children}</Page>;
}

function EditorPage({ kind, children }: { kind: ShellKind; children: ReactNode }) {
  return (
    <div className={`ed-app ed-app--${kind}`}>
      <EditorHeader kind={kind} />
      <div className="ed-body">{children}</div>
    </div>
  );
}

