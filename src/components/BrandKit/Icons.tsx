/* The brand kit's Icons section (2026-10-14): every icon as a suite. Each mark
   gets a grid, one row per ground and one column per size, with the files for
   that row; the rows we use say where. Picked on /prototypes/mason-icon (D,
   E); Zev asked for the whole suite, not only the chosen tile. Every file is
   made by scripts/brand-icons.mjs into public/brand/icons/. */

const ICONS = '/brand/icons';

type Row = {
  file: string; // base name in public/brand/icons/
  ground: string; // what it sits on
  note?: string;
  use?: string; // where Esy uses it, if it does
  svg?: boolean;
  ico?: boolean;
  tile?: boolean; // a full-bleed app tile: shown with the phone's rounded corners
  checker?: boolean; // transparent: shown on a checkerboard
  paper?: boolean; // a white tile: shown on grey so its edge shows
  big?: boolean; // has a 1024 PNG
};

type Mark = { id: string; name: string; line: string; rows: Row[] };

const SUITE: Mark[] = [
  {
    id: 'e',
    name: 'The e',
    line: 'The e from the wordmark. On a tile it’s drawn on a 16-pixel grid so it stays sharp at 16 and 32.',
    rows: [
      { file: 'e-transparent', ground: 'Transparent', note: 'The bare e, our tab icon until 14 October 2026.', svg: true, checker: true },
      { file: 'e-navy', ground: 'On navy', use: 'App icon at small sizes', note: 'Our tab icon from 14 to 18 October 2026. The flat e takes the app icon’s small sizes, where the vinyl’s shading blurs (2026-10-21).', svg: true, ico: true },
      { file: 'e-black', ground: 'On black', svg: true },
      { file: 'e-white', ground: 'On white', note: 'For light grounds that need a tile, such as a white app store listing.', svg: true, paper: true },
      { file: 'e-flat-tab', ground: 'The tab, maxed', use: 'In the tab, on every Esy app', note: 'The flat e in the light teal (#2BD8BB), near edge to edge on transparent. The same file every Esy app serves.', svg: true, ico: true, checker: true },
    ],
  },
  {
    id: 'e-vinyl',
    name: 'The e, vinyl',
    line: 'The e as a glossy teal vinyl piece, rendered by Esy from the flat e and keyed off its grey ground. Same letterform, in the brand’s material.',
    rows: [
      { file: 'e-vinyl-tab', ground: 'The tab, maxed', note: 'No ground, the e as big as the icon allows. Tried in the tab on 2026-10-18; the flat e is crisper at 16.', ico: true, checker: true, big: true },
      { file: 'e-vinyl-transparent', ground: 'Transparent', note: 'Cut out, for placing on any ground.', checker: true, big: true },
      { file: 'e-vinyl-navy', ground: 'On navy', use: 'App icon, profile pictures', note: 'The e is Esy’s symbol (2026-10-21): the phone’s home-screen icon and every profile picture.', tile: true, big: true },
      { file: 'e-vinyl-white', ground: 'On white', paper: true, big: true },
    ],
  },
  {
    id: 'flat',
    name: 'Mason, flat',
    line: 'His head drawn flat: the octagon, the stripe, the eyes. For small sizes where the vinyl’s shading blurs.',
    rows: [
      { file: 'mason-flat-transparent', ground: 'Transparent', svg: true, checker: true, big: true },
      { file: 'mason-flat-navy', ground: 'On navy', note: 'The app icon at 29 and 20 pt until 2026-10-21.', svg: true, tile: true, big: true },
      { file: 'mason-flat-teal', ground: 'On teal', svg: true, tile: true, big: true },
    ],
  },
  {
    id: 'vinyl',
    name: 'Mason, vinyl',
    line: 'His head in vinyl, made from his studio shot. On the home-screen tile his head fills the space; Android gets its own foreground, smaller, so its launchers’ masks never cut him.',
    rows: [
      { file: 'mason-vinyl-teal', ground: 'On teal', note: 'His head spans three quarters of the tile; iOS only rounds the corners. The app icon and profile picture until 2026-10-21.', tile: true, big: true },
      { file: 'mason-vinyl-android-foreground', ground: 'Android foreground', note: 'Android’s app icon until 2026-10-21; the e has no Android foreground yet. Transparent, with his head inside the safe zone (a centred circle 66% across) so no launcher’s mask cuts it. Android draws it over a teal (#2BE1CA) background layer.', checker: true, big: true },
      { file: 'mason-vinyl-tab-transparent', ground: 'The tab, transparent', note: 'His head alone, as tall as the icon, the biggest he can be at 16 and 32. Tried in the tab on 2026-10-18.', checker: true, big: true },
      { file: 'mason-vinyl-tab', ground: 'The tab, on navy', note: 'The same head on navy, for tabs where a navy head would vanish.', big: true },
      { file: 'mason-vinyl-navy', ground: 'On navy', note: 'His head fills 88% of the tile’s height, on navy with a soft glow behind it.', tile: true, big: true },
      { file: 'mason-vinyl-cutout', ground: 'Cut out', note: 'Transparent PNG, for placing on any ground.', checker: true, big: true },
    ],
  },
];

// Columns: the sizes an icon ships at. 16–48 show at real size; 180 and 512 are scaled down to fit.
const COLS = [
  { size: 16, show: 16, label: '16' },
  { size: 32, show: 32, label: '32' },
  { size: 48, show: 48, label: '48' },
  { size: 180, show: 90, label: '180 (½)' },
  { size: 512, show: 128, label: '512 (¼)' },
];

/** The row's files: the SVG, the ICO for the tab icon, and a PNG at each size. */
function Files({ row }: { row: Row }) {
  const pngs = [16, 32, 48, 180, 512, ...(row.big ? [1024] : [])];
  return (
    <p className="bk-ic-files">
      {row.svg && (
        <a href={`${ICONS}/${row.file}.svg`} download>SVG</a>
      )}
      {row.ico && (
        <a href={`${ICONS}/${row.file}.ico`} download>ICO</a>
      )}
      <span>PNG</span>
      {pngs.map((s) => (
        <a key={s} href={`${ICONS}/${row.file}-${s}.png`} download>{s}</a>
      ))}
    </p>
  );
}

/** A browser tab bar at real size, with the e on navy on the Esy tabs. */
function Tabs({ mode }: { mode: 'light' | 'dark' }) {
  return (
    <div className={`bk-ic-tabs is-${mode}`} aria-hidden="true">
      {[
        { e: true, title: 'AI Marketing News · Esy', active: true },
        { e: true, title: 'Esy brand kit' },
        { e: false, title: 'Search Console' },
      ].map((t) => (
        <span key={t.title} className={`bk-ic-tab${t.active ? ' is-active' : ''}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {t.e ? <img src={`${ICONS}/e-navy.svg`} width={16} height={16} alt="" /> : <i />}
          <span>{t.title}</span>
        </span>
      ))}
    </div>
  );
}

function Suite({ mark }: { mark: Mark }) {
  return (
    <section className="bk-ic-mark" aria-labelledby={`icon-${mark.id}`}>
      <h3 id={`icon-${mark.id}`} className="bk-ic-name">{mark.name}</h3>
      <p className="bk-ic-line">{mark.line}</p>
      <div className="bk-ic-grid" role="table" aria-label={`${mark.name}, every ground and size`}>
        <div className="bk-ic-row bk-ic-row--head" role="row">
          <span role="columnheader">Ground</span>
          {COLS.map((c) => <span key={c.size} role="columnheader">{c.label}</span>)}
        </div>
        {mark.rows.map((row) => (
          <div key={row.file} className={`bk-ic-row${row.use ? ' is-used' : ''}`} role="row">
            <div className="bk-ic-label" role="rowheader">
              <b>{row.ground}</b>
              {row.use && <span className="bk-ic-use">{row.use}</span>}
              {row.note && <small>{row.note}</small>}
              <Files row={row} />
            </div>
            {COLS.map((c) => (
              <div key={c.size} className={`bk-ic-cell${row.checker ? ' is-checker' : ''}${row.paper ? ' is-paper' : ''}`} role="cell">
                {/* SVGs draw themselves at tab sizes; the larger cells show the PNG we ship. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={row.svg && c.size <= 48 ? `${ICONS}/${row.file}.svg` : `${ICONS}/${row.file}-${c.size}.png`}
                  width={c.show}
                  height={c.show}
                  alt={c.size === 512 ? `${mark.name}, ${row.ground.toLowerCase()}` : ''}
                  className={row.tile ? 'bk-ic-ios' : undefined}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

const WHERE = [
  ['Browser tab, bookmarks', '16, 32, 48 px', 'The e, on navy'],
  ['iPhone home screen, App Store, Spotlight', '1024 px, 60 pt, 40 pt', 'Mason, vinyl, on teal'],
  ['Android home screen', 'Adaptive icon, 108 dp', 'Mason, vinyl, Android foreground on teal'],
  ['Settings, notifications', '29 pt, 20 pt', 'Mason, flat, on navy'],
  ['Profile pictures', 'Any', 'Mason, vinyl, on teal'],
];

export function BrandIcons() {
  return (
    <>
      <p className="bk-p">
        Three marks, each on every ground, at every size we ship. The e marks the site in a browser tab. Mason is the app: in vinyl where there’s room, flat where there isn’t. The rows we use say where.
      </p>
      <div className="bk-ic-tabbars">
        <Tabs mode="light" />
        <Tabs mode="dark" />
        <p className="bk-ic-line">The e on navy in a browser tab, at real size.</p>
      </div>
      {SUITE.map((m) => <Suite key={m.id} mark={m} />)}

      <h3 className="bk-ic-name bk-ic-name--where">Which icon where</h3>
      <table className="bk-ic-where">
        <thead>
          <tr><th>Where</th><th>Size</th><th>Icon</th></tr>
        </thead>
        <tbody>
          {WHERE.map(([where, size, icon]) => (
            <tr key={where}><td>{where}</td><td>{size}</td><td>{icon}</td></tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
