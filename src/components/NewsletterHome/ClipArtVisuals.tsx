/* What sits beside the clip.art case study's story (the homepage's 01 Apps):
 *
 *   grid    — A, live: 12 finished assets from the Clay Office pack.
 *   replay  — B: a real run, replayed (ClipArtRunReplay).
 *   styles  — C: one subject in six of clip.art's styles, each a real run of
 *             the same workflow (scripts/generate-clipart-styles.mjs).
 *
 * Compare them at /prototypes/home-clipart/.
 */
import ClipArtRunReplay from './ClipArtRunReplay';
import { CLIPART_RUN } from './clipartRun';
import './ClipArtRunReplay.css';

export type ClipArtVisual = 'grid' | 'replay' | 'styles';

const CLAY_OFFICE = 'https://images.clip.art/packs/business/25-boutique-consulting-clipart-pngs-clay-office';

const CLIPART_SHOWCASE = [
  { url: `${CLAY_OFFICE}/consultant-pitch-deck-presentation-scene-hbs2mr.webp`, alt: 'Clay consultant presenting a pitch deck' },
  { url: `${CLAY_OFFICE}/clay-laptop-open-muted-teal-screen-prop-24ahuy.webp`, alt: 'Clay laptop with a muted teal screen' },
  { url: `${CLAY_OFFICE}/strategy-workshop-in-action-sticky-note-wall-scene-mscrxi.webp`, alt: 'Clay strategy workshop at a sticky-note wall' },
  { url: `${CLAY_OFFICE}/ceramic-coffee-mug-break-time-prop-e4f8x6.webp`, alt: 'Clay ceramic coffee mug' },
  { url: `${CLAY_OFFICE}/consultant-presenting-insights-standing-pitch-pose-gzg4x8.webp`, alt: 'Clay consultant standing and presenting insights' },
  { url: `${CLAY_OFFICE}/analytics-dashboard-review-scene-b0300v.webp`, alt: 'Clay analytics dashboard review' },
  { url: `${CLAY_OFFICE}/focused-laptop-work-solo-consultant-deep-work-pose-opxz8r.webp`, alt: 'Clay consultant in focused laptop work' },
  { url: `${CLAY_OFFICE}/hybrid-video-meeting-room-scene-su3c6h.webp`, alt: 'Clay hybrid video meeting room' },
  { url: `${CLAY_OFFICE}/team-strategy-workshop-whiteboard-huddle-pose-onbdtz.webp`, alt: 'Clay team huddled at a whiteboard' },
  { url: `${CLAY_OFFICE}/coffee-break-lounge-corner-scene-o9uuji.webp`, alt: 'Clay coffee-break lounge corner' },
  { url: `${CLAY_OFFICE}/colleagues-reviewing-analytics-duo-desk-pose-ilf5g0.webp`, alt: 'Clay colleagues reviewing analytics at a desk' },
  { url: `${CLAY_OFFICE}/client-discovery-call-laptop-and-notepad-desk-scene-9mszcr.webp`, alt: 'Clay client discovery call at a desk with laptop and notepad' },
];

// C: the same subject, six styles, each its own run (ids for provenance).
const STYLE_RANGE = [
  { style: 'Flat', file: 'flat', run: 'run-27d58698' },
  { style: 'Watercolor', file: 'watercolor', run: 'run-69e3ad5a' },
  { style: 'Line art', file: 'outline', run: 'run-6c249b3d' },
  { style: 'Pixel', file: 'pixel', run: 'run-cafc444f' },
  { style: 'Clay', file: 'clay', run: 'run-876d7a21' },
  { style: '3D', file: '3d', run: 'run-b1261711' },
];

function Grid() {
  return (
    <ul className="nl-case-grid" aria-label="Sample assets from clip.art's Clay Office pack">
      {CLIPART_SHOWCASE.map(({ url, alt }) => (
        <li key={url} className="nl-case-tile">
          {/* eslint-disable-next-line @next/next/no-img-element -- clip.art's own CDN */}
          <img src={url} alt={alt} loading="lazy" width={228} height={228} />
        </li>
      ))}
    </ul>
  );
}

function Styles() {
  return (
    <figure className="cs">
      <ul className="cs-grid">
        {STYLE_RANGE.map((s) => (
          <li key={s.file} className="cs-tile">
            {/* eslint-disable-next-line @next/next/no-img-element -- generated through Esy, fixed size */}
            <img src={`/prototypes/home-clipart/${s.file}.webp`} alt={`A hot dog in sunglasses, ${s.style.toLowerCase()} style`} loading="lazy" width={220} height={220} />
            <span>{s.style}</span>
          </li>
        ))}
      </ul>
      <figcaption>
        One prompt, &ldquo;{CLIPART_RUN.subject}&rdquo;, six styles. Each is its own recorded run, about $0.02 apiece.
      </figcaption>
    </figure>
  );
}

export default function ClipArtVisuals({ visual = 'grid' }: { visual?: ClipArtVisual }) {
  if (visual === 'replay') return <ClipArtRunReplay />;
  if (visual === 'styles') return <Styles />;
  return <Grid />;
}
