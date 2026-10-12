/* One take of Mason as a toy: the material's concept pieces, then (below the
   page, in the footer's own slot via ConditionalFooter) the take's world. */

import Image from 'next/image';
import Link from 'next/link';
import { MATERIALS, PIECES, TOY_VARIANTS, USE_COVERS, USE_YT, WORLDS, CLIPART_SET, toySrc, inUseSrc, type Material } from './takes';
import './mason-toy.css';

/** Round 3: the material in use, on newsletter covers and YouTube thumbnails. */
function InUse({ material }: { material: Material }) {
  const m = MATERIALS[material];
  return (
    <section className="mt-wrap mt-gallery" aria-label={`${m.name} Mason in use`}>
      <h2 className="mt-h2">Newsletter covers</h2>
      <div className="mt-grid">
        {USE_COVERS.map((c) => (
          <figure key={c.id} className="mt-piece">
            <Image src={inUseSrc(material, c.id)} alt={`${c.name}: ${c.line}`} width={1536} height={864} sizes="(max-width: 720px) 100vw, 536px" />
            <figcaption><b>{c.name}.</b> {c.line}</figcaption>
          </figure>
        ))}
      </div>
      <h2 className="mt-h2">YouTube thumbnails</h2>
      {/* As they'd sit in a channel grid: the thumbnail, then the video title. */}
      <div className="mt-yt">
        {USE_YT.map((v) => (
          <figure key={v.id} className="mt-yt-card">
            <Image src={inUseSrc(material, v.id)} alt={`YouTube thumbnail: ${v.title}`} width={1280} height={720} sizes="(max-width: 720px) 100vw, 352px" />
            <figcaption>
              <b>{v.title}</b>
              <span>The Marketing Engineer · sample</span>
              <span className="mt-yt-kind">{v.kind}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {material === 'toy' && (
        <>
          <h2 className="mt-h2">Clip art, for the homepage</h2>
          <p className="mt-note mt-note--top">
            To replace the hot dog in the homepage’s clip.art replay: each one a real run of clip.art’s own workflow, anchored on his vinyl studio shot,
            $0.057 a run with its steps, checks and cost recorded, so the replay can play a Mason run the way it plays the hot dog’s.
          </p>
          <div className="mt-clip">
            {CLIPART_SET.map((c) => (
              <figure key={c.id} className="mt-clip-card">
                <Image src={`/prototypes/mason-toy/clipart-${c.id}.webp`} alt={`Mason as clip art: ${c.name.toLowerCase()}`} width={900} height={900} sizes="(max-width: 720px) 50vw, 260px" />
                <figcaption><b>{c.name}</b><span>{c.run}</span></figcaption>
              </figure>
            ))}
          </div>
        </>
      )}
      <p className="mt-note">
        <strong>Below: the shelf</strong> in {m.name.toLowerCase()}, as the footer. Switch material at the top to see the same covers and thumbnails in the other finish.
      </p>
      <p className="mt-note">
        Prototype. Every scene is made of the material and drawn on api.esy.com; the logos and words are laid on afterwards, the logos from the companies’ own files. The titles are drafts; nothing here is live.
      </p>
    </section>
  );
}

export default function MasonToyPage({ variant }: { variant: string }) {
  const { material, world, use } = TOY_VARIANTS[variant];
  const mats = (['felt', 'toy', 'flocked'] as Material[]).filter((x) => (use ? `${x}-use` : `${x}-${world}`) in TOY_VARIANTS);
  const m = MATERIALS[material];
  const [hero, ...rest] = PIECES;
  return (
    <main className="mt">
      <section className="mt-top">
        <div className="mt-wrap">
          <p className="mt-eyebrow">Prototype · Mason as a toy</p>
          <h1 className="mt-title">{m.name} Mason{use ? ', in use' : ''}</h1>
          <p className="mt-lede">{m.line}</p>
          {/* The same piece in the other material is one click away, so the two can be judged side by side. */}
          {/* Only the materials this world was made in (the brand settled on vinyl, so later worlds have one). */}
          {mats.length > 1 && (
            <nav className="mt-toggle" aria-label="Material">
              {mats.map((x) => (
                <Link key={x} href={`/prototypes/mason-toy/${use ? `${x}-use` : `${x}-${world}`}/`} aria-current={x === material ? 'page' : undefined}>
                  {MATERIALS[x].name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>

      {use ? <InUse material={material} /> : (
      <section className="mt-wrap mt-gallery" aria-label={`${m.name} concept pieces`}>
        <figure className="mt-piece mt-piece--hero">
          <Image src={toySrc(material, hero.id)} alt={`Mason the octopus as a ${m.name.toLowerCase()} toy, in a studio`} width={1536} height={1024} sizes="(max-width: 1120px) 100vw, 1072px" priority />
          <figcaption><b>{hero.name}.</b> {hero.line}</figcaption>
        </figure>
        <div className="mt-grid">
          {rest.map((p) => (
            <figure key={p.id} className="mt-piece">
              <Image src={toySrc(material, p.id)} alt={`Mason as a ${m.name.toLowerCase()} toy: ${p.line}`} width={1536} height={1024} sizes="(max-width: 720px) 100vw, 536px" />
              <figcaption><b>{p.name}.</b> {p.line}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-note">
          <strong>Below: {WORLDS[world].name.toLowerCase()}.</strong> {WORLDS[world].line} It sits where the reef footer is today, under the same footer card.
          {mats.length > 1 ? ' Switch material at the top to see the same world in another finish.' : ' In vinyl, the brand’s material.'}
        </p>
        <p className="mt-note">
          Prototype. Every picture is made on api.esy.com from Mason’s drawn figure (a studio shot first, then each scene from it); nothing here is live.
        </p>
      </section>
      )}
    </main>
  );
}
