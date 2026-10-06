'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Prototype, PrototypeVariant } from './registry';
import './prototypes.css';

/**
 * Floating switcher: step through a prototype's variants with ‹ ›, or pick any
 * of them from one list grouped by round. A selector rather than a row of
 * links, so it stays one small bar however many variants a prototype grows
 * (the about page has 16; the page builder more).
 */
export default function PrototypeBar({ prototype, current }: { prototype: Prototype; current?: string }) {
  const router = useRouter();
  const base = `/prototypes/${prototype.slug}`;
  const variants = prototype.variants;
  const at = variants.findIndex((v) => v.slug === current);
  const step = (d: number) => `${base}/${variants[(Math.max(at, 0) + d + variants.length) % variants.length].slug}/`;

  const option = (v: PrototypeVariant) => (
    <option key={v.slug} value={v.slug}>
      {v.key} · {v.name}
      {v.live ? ' (live)' : ''}
    </option>
  );
  // Group by round when there's more than one; anything outside the listed
  // rounds goes last, so no variant drops out of the list.
  const listed = new Set(prototype.rounds.map((r) => r.n));
  const groups =
    prototype.rounds.length > 1
      ? [
          ...prototype.rounds.map((r) => ({ label: `Round ${r.n} · ${r.title}`, items: variants.filter((v) => v.round === r.n) })),
          { label: 'More', items: variants.filter((v) => !listed.has(v.round)) },
        ].filter((g) => g.items.length)
      : null;

  return (
    <nav className="proto-bar" aria-label={`${prototype.name}: versions`}>
      <Link href="/prototypes/#versions" className="proto-bar-all">
        ← All
      </Link>
      <Link href={step(-1)} className="proto-bar-step" aria-label="Previous version">
        ‹
      </Link>
      <select
        className="proto-bar-pick"
        aria-label="Version"
        value={at >= 0 ? current : ''}
        onChange={(e) => e.target.value && router.push(`${base}/${e.target.value}/`)}
      >
        {at < 0 && <option value="">Pick a version</option>}
        {groups ? groups.map((g) => <optgroup key={g.label} label={g.label}>{g.items.map(option)}</optgroup>) : variants.map(option)}
      </select>
      <span className="proto-bar-count">
        {at >= 0 ? at + 1 : '–'}/{variants.length}
      </span>
      <Link href={step(1)} className="proto-bar-step" aria-label="Next version">
        ›
      </Link>
    </nav>
  );
}
