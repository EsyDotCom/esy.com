'use client';
/**
 * The containers around the realistic Esy OS screens (round 3, 2026-11-07, /prototypes/home-os-apps/),
 * three answers to "a creative container, elegant and on brand", each on O5's plates:
 *   display  A slim studio display on a stand: dark bezel, a camera dot, a soft sheen across the glass,
 *            the stand and a floor shadow on the navy plate. The address and what's a sample sit under.
 *   float    The screen in space: tilted, a second pane faintly behind it and jade light beneath; it
 *            swings in when the feature changes and settles flat when you rest on it.
 *   mat      A gallery mount: the screen in a navy mat with a fine jade line inside, and a museum label
 *            beneath (what it is, where it lives, what's a sample).
 * On phones every container drops to the screen and its caption.
 */
import type { ReactNode } from 'react';
import { SCREEN_META } from './OsScreens';
import type { FeatureVisual } from './osAppFeatures';

export type ContainerKind = 'display' | 'float' | 'mat';

function Caption({ id, kind }: { id: FeatureVisual; kind: ContainerKind }) {
  const m = SCREEN_META[id];
  if (kind === 'mat') {
    return (
      <figcaption className="cx-label">
        <b>{m.label}</b>
        <span>{m.url}</span>
        {m.sample && <em>{m.sample}</em>}
      </figcaption>
    );
  }
  return (
    <figcaption className="cx-caption">
      <span className="cx-url"><i aria-hidden="true" />{m.url}</span>
      {m.sample && <em>{m.sample}</em>}
    </figcaption>
  );
}

export function OsContainer({ kind, id, children }: { kind: ContainerKind; id: FeatureVisual; children: ReactNode }) {
  if (kind === 'display') {
    return (
      <figure className="cx cx-display">
        <div className="cx-bezel">
          <span className="cx-camera" aria-hidden="true" />
          <div className="cx-glass">{children}</div>
        </div>
        <div className="cx-stand" aria-hidden="true"><i /><b /></div>
        <Caption id={id} kind={kind} />
      </figure>
    );
  }
  if (kind === 'float') {
    return (
      <figure className="cx cx-float">
        <div className="cx-space">
          <span className="cx-glow" aria-hidden="true" />
          <span className="cx-ghost" aria-hidden="true" />
          <div className="cx-card">{children}</div>
        </div>
        <Caption id={id} kind={kind} />
      </figure>
    );
  }
  return (
    <figure className="cx cx-mat">
      <div className="cx-mount">
        <div className="cx-inset">{children}</div>
      </div>
      <Caption id={id} kind={kind} />
    </figure>
  );
}
