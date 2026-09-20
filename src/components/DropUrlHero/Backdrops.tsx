'use client';

/* The hero backdrops — generated through api.esy.com, not drawn here.
 *
 * Each one is a `generate-illustration` render (cinematic, 16:9, xhigh) made
 * by scripts/generate-drop-url-creatives.mjs, prompted for a quiet centre so
 * the display type stays readable, with detail pushed to the edges. The scrim
 * over the top is what guarantees contrast whatever the render did: the
 * picture is art direction, the scrim is the contract.
 *
 * All three are decorative and aria-hidden; nothing here carries meaning the
 * copy doesn't already say. */

import Image from 'next/image';

const SRC = {
  dusk: '/prototypes/drop-url/backdrops/dusk.webp',
  daybreak: '/prototypes/drop-url/backdrops/daybreak.webp',
  ledger: '/prototypes/drop-url/backdrops/ledger.webp',
} as const;

function Backdrop({ variant }: { variant: keyof typeof SRC }) {
  return (
    <div className={`du-bg du-bg--${variant}`} aria-hidden="true">
      {/* Priority: this is the hero's LCP element on every one of these pages. */}
      <Image src={SRC[variant]} alt="" fill priority sizes="100vw" className="du-bg-img" />
      <span className="du-bg-scrim" />
    </div>
  );
}

/** Night: aurora over a moonlit fjord. White type, so the scrim darkens. */
export function DuskBackdrop() {
  return <Backdrop variant="dusk" />;
}

/** Morning: mist in the valleys under a low sun. Ink type, so the scrim lifts. */
export function DaybreakBackdrop() {
  return <Backdrop variant="daybreak" />;
}

/** Dawn over still water, in the jade the books are drawn in. */
export function LedgerBackdrop() {
  return <Backdrop variant="ledger" />;
}
