/* The brand kit's shared pieces (2026-10-11). Each take of /prototypes/brand
   and /prototypes/brand-mason arranges these differently; the content lives
   once, in kit.ts. */

import Image from 'next/image';
import Link from 'next/link';
import { OctopusFigure } from '@/components/BrandShapes/octopus-figure';
import { COLOURS, LOGO, MASON, MATERIAL, SCENES, TYPE } from './kit';
import '@/components/BrandShapes/reef.css';
import './brand-kit.css';

/** A download link that names the file it saves as. */
export const Download = ({ href, label }: { href: string; label: string }) => (
  <a className="bk-dl" href={href} download>
    {label} <span aria-hidden="true">↓</span>
  </a>
);

/** The flat wordmark on light and on navy, from the SVG masters. */
export function FlatLogos() {
  return (
    <div className="bk-logos">
      <figure className="bk-logo bk-logo--light">
        <Image src={LOGO.flat.light} alt="The esy wordmark: a teal e and navy sy" width={382} height={140} unoptimized />
        <figcaption><Download href={LOGO.flat.light} label="SVG, for light grounds" /></figcaption>
      </figure>
      <figure className="bk-logo bk-logo--dark">
        <Image src={LOGO.flat.dark} alt="The esy wordmark on navy: a teal e and white sy" width={382} height={140} unoptimized />
        <figcaption><Download href={LOGO.flat.dark} label="SVG, for navy grounds" /></figcaption>
      </figure>
    </div>
  );
}

/** The wordmark made vinyl: pictures of the logo, not the logo. */
export function VinylLogos({ only }: { only?: 'light' | 'dark' }) {
  const both = (['light', 'dark'] as const).filter((t) => !only || only === t);
  return (
    <div className={`bk-vinyl-logos${both.length === 1 ? ' bk-vinyl-logos--one' : ''}`}>
      {both.map((t) => (
        <figure key={t} className="bk-shot">
          <Image src={LOGO.vinyl[t]} alt={`The esy wordmark made in glossy vinyl, on ${t === 'light' ? 'ivory' : 'navy'}`} width={1920} height={1080} sizes="(max-width: 900px) 100vw, 560px" />
          <figcaption>Vinyl render, on {t === 'light' ? 'ivory' : 'navy'} · <Download href={LOGO.vinyl[t]} label="WebP" /></figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Rules({ items, kind }: { items: string[]; kind?: 'do' | 'dont' }) {
  return (
    <ul className={`bk-rules${kind ? ` bk-rules--${kind}` : ''}`}>
      {items.map((r) => <li key={r}>{r}</li>)}
    </ul>
  );
}

export function Swatches({ big = false }: { big?: boolean }) {
  return (
    <div className={`bk-swatches${big ? ' bk-swatches--big' : ''}`}>
      {COLOURS.map((c) => (
        <div key={c.hex} className={`bk-swatch${c.dark ? ' is-dark' : ''}`} style={{ background: c.hex }}>
          <b>{c.name}</b>
          <code>{c.hex}</code>
          <span>{c.job}</span>
        </div>
      ))}
    </div>
  );
}

export function TypeSpecimens() {
  return (
    <div className="bk-type">
      {TYPE.map((t) => (
        <div key={t.name} className="bk-type-row">
          <div className="bk-type-sample" style={{ fontFamily: t.family }}>{t.sample}</div>
          <div className="bk-type-meta"><b>{t.name}</b><span>{t.use}</span></div>
        </div>
      ))}
    </div>
  );
}

export function Materials() {
  return (
    <div className="bk-materials">
      {MATERIAL.map((m) => (
        <figure key={m.name} className="bk-material">
          <Image src={m.img} alt={m.name} width={1536} height={864} sizes="(max-width: 900px) 100vw, 360px" />
          <figcaption><b>{m.name}</b><span>{m.what}</span><span className="bk-use">{m.use}</span></figcaption>
        </figure>
      ))}
    </div>
  );
}

export function SceneGrid({ count = SCENES.length }: { count?: number }) {
  return (
    <div className="bk-scenes">
      {SCENES.slice(0, count).map((s) => (
        <figure key={s.name} className="bk-shot">
          <Image src={s.img} alt={`${s.name}: ${s.note}`} width={1536} height={864} sizes="(max-width: 900px) 100vw, 360px" />
          <figcaption><b>{s.name}.</b> {s.note}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Mason as a card for the brand page, pointing to his own page when there is one. */
export function MasonCard({ href }: { href?: string }) {
  const body = (
    <>
      <Image src={MASON.studio} alt="Mason, Esy’s octopus, as a vinyl toy" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 480px" />
      <span className="bk-mason-card-copy">
        <b>Meet Mason</b>
        <span>{MASON.who}</span>
        {href && <span className="bk-more">{href === '/mason/' ? 'More about Mason →' : 'Mason’s kit →'}</span>}
      </span>
    </>
  );
  return href ? <Link href={href} className="bk-mason-card">{body}</Link> : <div className="bk-mason-card">{body}</div>;
}

export function MasonSpec() {
  return (
    <dl className="bk-spec">
      {MASON.spec.map((s) => (
        <div key={s.part}>
          <dt>{s.part}</dt>
          <dd>{s.is}</dd>
        </div>
      ))}
    </dl>
  );
}

export function DoDont() {
  return (
    <div className="bk-dodont">
      <div><h4>Do</h4><Rules items={MASON.rules.do} kind="do" /></div>
      <div><h4>Don’t</h4><Rules items={MASON.rules.dont} kind="dont" /></div>
    </div>
  );
}

export function Poses() {
  return (
    <div className="bk-poses">
      {MASON.poses.map((p) => (
        <figure key={p.name} className="bk-pose">
          <Image src={p.img} alt={`Mason as clip art: ${p.name.toLowerCase()}`} width={900} height={900} sizes="(max-width: 720px) 50vw, 240px" />
          <figcaption><b>{p.name}</b> <Download href={p.img} label="PNG" /></figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Editions() {
  return (
    <div className="bk-scenes">
      {MASON.editions.map((e) => (
        <figure key={e.name} className="bk-shot">
          <Image src={e.img} alt={`Mason’s ${e.name} edition: ${e.note}`} width={1536} height={864} sizes="(max-width: 900px) 100vw, 360px" />
          <figcaption><b>{e.name}.</b> {e.note}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/** The flat stencil drawing at rest (seven arms forward, the tail up behind), for small and functional uses, at a few real sizes. */
export function FlatMason() {
  return (
    <div className="bk-flat">
      {[180, 96, 48, 24].map((s) => (
        <div key={s} className="bk-flat-cell">
          <div className="bk-flat-fig" style={{ width: s * 1.33 }}>
            <OctopusFigure pose="rest" />
          </div>
          <span>{s}px</span>
        </div>
      ))}
    </div>
  );
}

export function Turnaround() {
  return (
    <figure className="bk-shot bk-turn">
      <Image src={MASON.turnaround} alt="Mason’s turnaround at rest: front, three-quarter, side and back, his eighth arm curled up behind like a tail" width={1536} height={380} sizes="(max-width: 1120px) 100vw, 1072px" />
      <figcaption>Front, three-quarter, side, back. <Download href={MASON.turnaround} label="Turnaround" /> · <Download href={MASON.studio} label="Studio shot (the reference)" /></figcaption>
    </figure>
  );
}
