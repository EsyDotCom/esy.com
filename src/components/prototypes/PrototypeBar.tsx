'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { prototypeBase, type Prototype } from './registry';
import './prototypes.css';

/** Floating switcher: jump between a prototype's variants, or back to all of them.
    Past five variants (several rounds), the row scrolls sideways, keeps the
    current one in view, and ends with "+", which lists every variant by round
    with what it tries, as os.esy.com's ProtoSwitch does. */
export default function PrototypeBar({ prototype, current }: { prototype: Prototype; current?: string }) {
  const base = prototypeBase(prototype);
  const many = prototype.variants.length > 5;
  const [open, setOpen] = useState(false);
  const row = useRef<HTMLDivElement>(null);

  // Bring the current variant into view in the scrolling row.
  useEffect(() => {
    row.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, [current]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);

  return (
    <>
      <nav className={`proto-bar ${many ? 'is-many' : ''}`} aria-label={`${prototype.name}: versions`}>
        <Link href="/prototypes/#versions">← All versions</Link>
        <span>Try:</span>
        <div className="proto-bar-row" ref={row}>
          {prototype.variants.map((v) => (
            <Link key={v.slug} href={`${base}/${v.slug}/`} aria-current={current === v.slug ? 'page' : undefined} title={v.blurb}>
              {v.key} · {v.name}
              {v.live ? ' (live)' : ''}
            </Link>
          ))}
        </div>
        {many && <button type="button" className="proto-bar-all" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label={`All ${prototype.variants.length} versions`}>+</button>}
      </nav>
      {open && (
        <div className="proto-modal-scrim" onClick={() => setOpen(false)}>
          <div className="proto-modal" role="dialog" aria-label={`${prototype.name}: every version`} onClick={(e) => e.stopPropagation()}>
            <header><h2>{prototype.name} <small>{prototype.variants.length} versions</small></h2><button type="button" onClick={() => setOpen(false)} aria-label="Close">×</button></header>
            {prototype.rounds.map((r) => (
              <section key={r.n}>
                <h3>Round {r.n} · {r.title}</h3>
                <ol>
                  {prototype.variants.filter((v) => v.round === r.n).map((v) => (
                    <li key={v.slug}>
                      <Link href={`${base}/${v.slug}/`} aria-current={current === v.slug ? 'page' : undefined} onClick={() => setOpen(false)}>
                        <b>{v.key}</b>
                        <span><strong>{v.name}{v.mergeOf ? ` (from ${v.mergeOf.join(' + ')})` : ''}</strong><small>{v.blurb}</small></span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
