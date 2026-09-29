/* A film presented as a strip of its own frames (2026-09-29, from the
 * "Apps and Films Apart" prototype): a card with the title, logline and
 * facts, beside a strip of film running slowly sideways, sprocket holes top
 * and bottom, each frame marked with its scene. Hover pauses it; people who
 * ask for reduced motion get a still strip they can scroll. The next film
 * stacks as a second strip under the first.
 *
 * The frames render twice in a row so the loop is seamless: the animation
 * moves the row by half its width, then starts again.
 */
import Link from 'next/link';
import { Play } from 'lucide-react';
import { FILMS, filmHref, type FilmCard } from '@/data/films';
import './FilmStrip.css';

function Strip({ film }: { film: FilmCard }) {
  const frames = film.strip.map((f, i) => ({ ...f, n: String(i + 1).padStart(2, '0') }));
  return (
    <article className="fs-film">
      <div className="fs-card">
        <small>Now showing</small>
        <h3>
          <Link href={filmHref(film)}>{film.title}</Link>
        </h3>
        <p>{film.logline}</p>
        <span className="fs-meta">
          {film.meta}
          <br />
          {film.facts}
        </span>
        <Link href={`${filmHref(film)}#fr-now`} className="nl-film-cta fs-cta">
          <Play size={14} aria-hidden="true" /> Watch the film
        </Link>
      </div>
      <div className="fs-strip" aria-hidden="true">
        <div className="fs-run">
          {[0, 1].map((pass) =>
            frames.map((f) => (
              <figure key={`${pass}-${f.n}`}>
                {/* eslint-disable-next-line @next/next/no-img-element -- small stills in a moving strip */}
                <img src={f.src} alt="" loading="lazy" width={480} height={270} />
                <figcaption>
                  SC {f.scene} ▸ {f.n}
                </figcaption>
              </figure>
            )),
          )}
        </div>
      </div>
    </article>
  );
}

export default function FilmStrip({ films = FILMS }: { films?: FilmCard[] }) {
  if (films.length === 0) return null;
  return (
    <section className="nl-lab nl-lab--film fs" aria-label="Films">
      <div className="nl-container fs-stack">
        {films.map((f) => (
          <Strip key={f.slug} film={f} />
        ))}
      </div>
    </section>
  );
}
