'use client';

/* Round 2 of Mason as an icon (2026-10-13). Zev agreed the browser tab keeps
   the e, so:
   D · Black or navy   the tile the e sits on: today's e on black, the e on
                        navy, and C's Mason on navy, at every size, in the tab
                        bar and on a phone.
   E · Vinyl app icon  the vinyl head as a real app icon: a full-bleed 1024
                        square inside Android's safe zone and iOS's corner
                        mask, at the sizes a phone shows it, beside flat C,
                        with the sizes that fall back to the flat mark. */

import { useState } from 'react';
import { APP_ICONS, GROUNDS, iconUri, type Mode } from './icons';
import { Phone, Pixels, TabStrip } from './parts';

type Take = { key: string; name: string; title: string; blurb: string };

function Head({ take, note }: { take: Take; note: string }) {
  return (
    <header className="mi-head">
      <p className="mi-kicker">Prototype · Mason as an icon · {take.key}</p>
      <h1>{take.title}</h1>
      <p className="mi-blurb">{take.blurb}</p>
      <p className="mi-note">{note}</p>
    </header>
  );
}

/* ── D · Black or navy ───────────────────────────────────────────── */

const groundIcon = (g: (typeof GROUNDS)[number], opts: { round?: boolean } = {}) => iconUri(g.mark, { tile: true, bg: g.bg, ...opts });

export function GroundsTake({ take }: { take: Take }) {
  const [zoom, setZoom] = useState(false);
  return (
    <main className="mi">
      <Head
        take={take}
        note="Prototype. The live site is unchanged: its tab icon is the bare e (no tile) and its apple-touch icon is already the e on navy (#0A2540). Black here is #000. At 16–48 the tile gets its own rounded corners, as a tab favicon would; at 180 and 512 it’s full-bleed, because the phone rounds it."
      />

      <section className="mi-sec" aria-label="The three grounds">
        <div className="mi-grounds">
          {GROUNDS.map((g) => (
            <figure key={g.key} className="mi-ground">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={groundIcon(g)} width={180} height={180} alt="" className="mi-mask-ios" />
              <figcaption>{g.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mi-sec" aria-label="Every size">
        <h2>Every size, side by side</h2>
        <div className="mi-sizes">
          {GROUNDS.map((g) => (
            <div key={g.key} className="mi-size-row">
              <p className="mi-label">{g.name}</p>
              <div className="mi-size-cells">
                {[16, 32, 48, 180, 512].map((s) => (
                  <figure key={s} className="mi-size">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={groundIcon(g, { round: s < 180 })} width={s === 512 ? 256 : s} height={s === 512 ? 256 : s} alt="" />
                    <figcaption>{s === 512 ? '512 (shown at half)' : s}</figcaption>
                  </figure>
                ))}
                <figure className="mi-size">
                  <Pixels src={groundIcon(g, { round: true })} />
                  <figcaption>16, pixel by pixel</figcaption>
                </figure>
              </div>
            </div>
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
              <p className="mi-label">Live today (bare e) · {mode}</p>
              <TabStrip src={iconUri('current', { mode })} mode={mode} />
              {GROUNDS.map((g) => (
                <div key={g.key}>
                  <p className="mi-label">{g.name} · {mode}</p>
                  <TabStrip src={groundIcon(g, { round: true })} mode={mode} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="mi-sec" aria-label="On a phone">
        <h2>On a phone’s home screen</h2>
        <div className="mi-phones">
          {GROUNDS.map((g) => (
            <Phone key={g.key} src={groundIcon(g)} label={g.name} />
          ))}
        </div>
        <p className="mi-note">The other apps are blank sample tiles.</p>
      </section>
    </main>
  );
}

/* ── E · Vinyl app icon ──────────────────────────────────────────── */

// The icons compared: the two vinyl renders and flat C on navy.
const CANDIDATES = [
  ...APP_ICONS.map((a) => ({ id: a.id, name: a.name, src: a.src, reach: `${a.reach}%` as string, vinyl: true })),
  // Take C's tile has the head at 78%, which reaches 39% and would be clipped; as an app icon it sits at 60% (30%).
  { id: 'flat-c', name: 'Flat C on navy', src: iconUri('tile', { tile: true, scale: 0.6 }), reach: '30.2%', vinyl: false },
];

// iOS sizes, in points (1 pt is one CSS pixel here, so they show at about the size an iPhone draws them),
// and which icon each should use. Vinyl holds where the eyes and stripe still read; below that the flat mark.
const SIZE_PLAN = [
  { pt: 60, px: 180, where: 'Home screen', use: 'vinyl' },
  { pt: 40, px: 120, where: 'Spotlight', use: 'vinyl' },
  { pt: 29, px: 87, where: 'Settings', use: 'flat' },
  { pt: 20, px: 60, where: 'Notifications', use: 'flat' },
] as const;

/** One candidate at 1024, with Android's safe zone and iOS's corner mask drawn over it. */
function Master({ c, guides }: { c: (typeof CANDIDATES)[number]; guides: boolean }) {
  return (
    <figure className="mi-master">
      <div className="mi-master-art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.src} alt="" />
        {guides && (
          <svg viewBox="0 0 1024 1024" aria-hidden>
            <circle cx="512" cy="512" r="338" fill="none" stroke="#FF3B30" strokeWidth="5" strokeDasharray="18 12" />
            <rect x="3" y="3" width="1018" height="1018" rx="229" fill="none" stroke="#fff" strokeWidth="5" />
          </svg>
        )}
      </div>
      <figcaption>
        <b>{c.name}.</b> Reaches {c.reach} from the centre; the safe zone allows 33%.
      </figcaption>
      <div className="mi-masks">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.src} alt="" className="mi-mask-ios" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.src} alt="" className="mi-mask-circle" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.src} alt="" className="mi-mask-squircle" />
        <span>iOS · Android circle · Android squircle</span>
      </div>
    </figure>
  );
}

export function AppIconTake({ take }: { take: Take }) {
  const [guides, setGuides] = useState(true);
  return (
    <main className="mi">
      <Head
        take={take}
        note="Prototype. The two vinyl icons are edit-image renders of Mason’s head from his studio shot (Sunburst, high), reframed so the head sits inside Android’s safe zone. Flat C is the SVG from take C. Nothing here is live."
      />

      <section className="mi-sec" aria-label="The 1024 masters">
        <div className="mi-sec-head">
          <h2>The 1024 master, with the guides</h2>
          <button type="button" className="mi-toggle" aria-pressed={guides} onClick={() => setGuides((g) => !g)}>
            {guides ? 'Hide guides' : 'Show guides'}
          </button>
        </div>
        <p className="mi-note mi-note--gap">
          Red dashes: Android’s adaptive-icon safe zone, a centred circle 66% across; anything outside can be cropped by a launcher’s mask. White: iOS’s corner mask. Each icon is full-bleed; the phone does the rounding.
        </p>
        <div className="mi-masters">
          {CANDIDATES.map((c) => (
            <Master key={c.id} c={c} guides={guides} />
          ))}
        </div>
      </section>

      <section className="mi-sec" aria-label="On a phone">
        <h2>On an iPhone home screen, at real size</h2>
        <p className="mi-note mi-note--gap">60-point icons on a 390-point screen, the iPhone’s own proportions.</p>
        <div className="mi-phones">
          {CANDIDATES.map((c) => (
            <Phone key={c.id} src={c.src} label={c.name} real />
          ))}
        </div>
      </section>

      <section className="mi-sec" aria-label="Where detail breaks">
        <h2>Where detail breaks</h2>
        <p className="mi-note mi-note--gap">
          Each size as iOS draws it (in points, shown here at about the same size). The chip says which icon that size should ship with.
        </p>
        <div className="mi-ladder">
          {CANDIDATES.map((c) => (
            <div key={c.id} className="mi-ladder-row">
              <p className="mi-label">{c.name}</p>
              <div className="mi-ladder-cells">
                {SIZE_PLAN.map((s) => (
                  <figure key={s.pt} className="mi-ladder-cell">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.src} width={s.pt} height={s.pt} alt="" className="mi-mask-ios" />
                    <figcaption>
                      {s.pt} pt · {s.where}
                      {c.vinyl && <span className={`mi-chip is-${s.use}`}>{s.use === 'vinyl' ? 'Vinyl holds' : 'Use flat'}</span>}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mi-mocks">
          <figure className="mi-spot">
            {CANDIDATES.map((c) => (
              <div key={c.id} className="mi-spot-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.src} width={40} height={40} alt="" className="mi-mask-ios" />
                <span><b>Esy</b><small>{c.name}</small></span>
              </div>
            ))}
            <figcaption>Spotlight, 40 pt</figcaption>
          </figure>
          <figure className="mi-settings">
            {CANDIDATES.map((c) => (
              <div key={c.id} className="mi-settings-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.src} width={29} height={29} alt="" className="mi-mask-ios" />
                <span>Esy · {c.name}</span>
                <span aria-hidden>›</span>
              </div>
            ))}
            <figcaption>Settings, 29 pt</figcaption>
          </figure>
        </div>
      </section>

      <section className="mi-sec" aria-label="Size plan">
        <h2>Which icon at which size</h2>
        <table className="mi-plan">
          <thead>
            <tr><th>Where</th><th>Size</th><th>Icon</th></tr>
          </thead>
          <tbody>
            <tr><td>App Store, home screen</td><td>1024 · 60 pt (180 px)</td><td>Vinyl head</td></tr>
            <tr><td>Spotlight</td><td>40 pt (120 px)</td><td>Vinyl head</td></tr>
            <tr><td>Settings, notifications</td><td>29 pt (87 px) · 20 pt (60 px)</td><td>Flat C</td></tr>
            <tr><td>Browser tab, bookmarks</td><td>16 · 32 · 48 px</td><td>The e (Zev, 2026-10-13)</td></tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
