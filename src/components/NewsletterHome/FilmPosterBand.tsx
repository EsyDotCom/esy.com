/* The newest film on its own night: a 2:3 poster beside its logline and
 * credits, the way a film is announced (the homepage's 03 Films band, #154).
 * Older films stay in the ledger above it. Styles: NewsletterHome.css
 * (.nl-lab--film, .nl-film-*). FilmStrip is the other way to present a film.
 */
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';
import { FILMS, filmHref, type FilmCard } from '@/data/films';

export default function FilmPosterBand({ film = FILMS[0] }: { film?: FilmCard }) {
  const f = film;
  if (!f) return null;
  return (
    <section className="nl-lab nl-lab--film" aria-label={`${f.title}: now showing`}>
      <div className="nl-container nl-film">
        <Link href={filmHref(f)} className="nl-film-poster">
          <Image src={f.poster} alt={f.posterAlt} width={600} height={900} sizes="(max-width: 900px) 70vw, 400px" />
          <span className="nl-film-poster-top">Esy presents</span>
          <span className="nl-film-poster-foot">
            <span className="nl-film-poster-title">{f.title}</span>
            <span className="nl-film-poster-billing">{f.credits.map(([, name]) => name).join(' · ')}</span>
          </span>
        </Link>
        <div className="nl-film-side">
          <p className="nl-film-kicker">Now showing · {f.meta}</p>
          <p className="nl-film-log">“{f.logline}”</p>
          <dl className="nl-film-credits">
            {f.credits.map(([role, name]) => (
              <div key={role}><dt>{role}</dt><dd>{name}</dd></div>
            ))}
          </dl>
          <div className="nl-film-ctas">
            <Link href={`${filmHref(f)}#fr-now`} className="nl-film-cta">
              <Play size={14} aria-hidden="true" /> Watch the film
            </Link>
            <Link href={filmHref(f)} className="nl-inline-link nl-film-link">
              The film page <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
