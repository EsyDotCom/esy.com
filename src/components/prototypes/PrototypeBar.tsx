import Link from 'next/link';
import type { Prototype } from './registry';
import './prototypes.css';

/** Floating switcher: jump between a prototype's variants without leaving the page. */
export default function PrototypeBar({ prototype, current }: { prototype: Prototype; current?: string }) {
  const base = `/prototypes/${prototype.slug}`;
  return (
    <nav className="proto-bar" aria-label={`${prototype.name} variants`}>
      <span>{prototype.name}</span>
      {prototype.variants.map((v) => (
        <Link key={v.slug} href={`${base}/${v.slug}/`} aria-current={current === v.slug ? 'page' : undefined}>
          {v.key} · {v.name}
          {v.live ? ' (live)' : ''}
        </Link>
      ))}
      <Link href="/prototypes/" aria-current={current ? undefined : 'page'}>
        All
      </Link>
    </nav>
  );
}
