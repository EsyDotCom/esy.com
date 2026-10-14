'use client';

/* One take of Mason as an icon: the mark in a browser tab (light and dark),
   at every size a favicon ships at, pixel by pixel at 16, and on a phone's
   home screen, always beside today's e. This tab wears the take as its own
   favicon while it's open, so it can be judged where it would live. */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ICON_TAKES, iconUri, VINYL, vinylSrc, type IconId, type Mode } from './icons';
import { Phone, Pixels, TabStrip } from './parts';
import { AppIconTake, GroundsTake } from './Round2';
import './mason-icon.css';

const SIZES = [16, 32, 48, 180, 512];

export default function MasonIconPage({ variant }: { variant: string }) {
  const take = ICON_TAKES[variant];
  const [zoom, setZoom] = useState(false);

  // This tab wears the take while the page is open; the site's favicon comes back on the way out.
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = iconUri(take.id, { mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' });
    link.dataset.proto = 'mason-icon';
    document.head.appendChild(link);
    return () => link.remove();
  }, [take.id]);

  // Round 2 takes compare grounds and the vinyl app icon rather than a new mark.
  if (take.kind === 'grounds') return <GroundsTake take={take} />;
  if (take.kind === 'app') return <AppIconTake take={take} />;

  return (
    <main className="mi">
      <header className="mi-head">
        <p className="mi-kicker">Prototype · Mason as an icon · {take.key}</p>
        <h1>{take.title}</h1>
        <p className="mi-blurb">{take.blurb}</p>
        <p className="mi-note">
          Prototype. The live favicon is still the e; nothing here replaces it. This tab is wearing {take.key} as its favicon while it’s open: look up at it.
        </p>
      </header>

      <section className="mi-sec" aria-label="Today and this take">
        <div className="mi-pair">
          {(['current', take.id] as IconId[]).map((id) => (
            <figure key={id} className="mi-hero-icon">
              <div className="mi-hero-tiles">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={iconUri(id)} width={180} height={180} alt="" className="mi-on-light" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={iconUri(id, { mode: 'dark' })} width={180} height={180} alt="" className="mi-on-dark" />
              </div>
              <figcaption>{id === 'current' ? 'Today: the e' : `${take.key} · ${take.name}`}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mi-sec" aria-label="In a browser tab">
        <div className="mi-sec-head">
          <h2>In a browser tab</h2>
          <button type="button" className="mi-toggle" aria-pressed={zoom} onClick={() => setZoom((z) => !z)}>
            {zoom ? 'Real size' : 'Zoom 2×'}
          </button>
        </div>
        <div className={`mi-strips${zoom ? ' is-zoom' : ''}`}>
          {(['light', 'dark'] as Mode[]).map((mode) => (
            <div key={mode} className="mi-strip-pair">
              <p className="mi-label">Today · {mode}</p>
              <TabStrip src={iconUri('current', { mode })} mode={mode} />
              <p className="mi-label">{take.key} · {mode}</p>
              <TabStrip src={iconUri(take.id, { mode })} mode={mode} />
            </div>
          ))}
        </div>
      </section>

      <section className="mi-sec" aria-label="Every size">
        <h2>Every size it ships at</h2>
        <div className="mi-sizes">
          {(['current', take.id] as IconId[]).map((id) => (
            <div key={id} className="mi-size-row">
              <p className="mi-label">{id === 'current' ? 'Today' : `${take.key} · ${take.name}`}</p>
              <div className="mi-size-cells">
                {SIZES.map((s) => (
                  <figure key={s} className="mi-size">
                    {/* Tab sizes are the bare mark; 180 and 512 are the home-screen tile. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={iconUri(id, { tile: s >= 180 })} width={s === 512 ? 256 : s} height={s === 512 ? 256 : s} alt="" />
                    <figcaption>{s === 512 ? '512 (shown at half)' : s}</figcaption>
                  </figure>
                ))}
                <figure className="mi-size">
                  <Pixels src={iconUri(id)} />
                  <figcaption>16, pixel by pixel</figcaption>
                </figure>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mi-sec" aria-label="On a phone">
        <h2>On a phone’s home screen</h2>
        <div className="mi-phones">
          <Phone src={iconUri('current', { tile: true })} label="Today" />
          <Phone src={iconUri(take.id, { tile: true })} label={`${take.key} · ${take.name}`} />
        </div>
        <p className="mi-note">The other apps are blank sample tiles.</p>
      </section>

      <section className="mi-sec" aria-label="In vinyl">
        <h2>The head, in vinyl</h2>
        <p className="mi-note">
          Made from Mason’s vinyl studio shot with the arms and collar taken off (api.esy.com edit-image, gpt-image-2.5 Sunburst, high). The same on every take: for a large app icon, a profile picture or a sticker, not for 16 px.
        </p>
        <div className="mi-vinyl">
          {VINYL.map((v) => (
            <figure key={v.id}>
              <Image src={vinylSrc(v.id)} alt={`Mason’s head in vinyl, ${v.name.toLowerCase()}`} width={1024} height={1024} sizes="(max-width: 720px) 50vw, 260px" />
              <figcaption><b>{v.name}.</b> {v.line}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
