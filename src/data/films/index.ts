/* Every film on /films, newest first. The index is built for films of every
 * kind (animation, documentary, brand, explainer, music), so each film carries
 * its own genre, and only real films go here: the page grows a chapter per
 * film as they're added. The first film is the featured one, the one the
 * title sequence flies into. */

import { LETTER } from "./the-letter-with-no-address";

export type FilmCard = {
  slug: string;
  title: string;
  logline: string;
  /** The one word set huge on the film's chapter, e.g. "Animation", "Documentary". */
  genre: string;
  /** Shown under the title: kind, audience, runtime, year. */
  meta: string;
  status: string;
  /** A wide still, used for the title sequence, the chapter and the list hover. */
  still: string;
  stillAlt: string;
};

export const FILMS: FilmCard[] = [
  {
    slug: LETTER.slug,
    title: LETTER.title,
    logline: LETTER.tagline,
    genre: "Animation",
    meta: `Animated short · Family · ${LETTER.runtime} · 2026`,
    status: "Animatic",
    still: `/films/${LETTER.slug}/look-world.webp`,
    stillAlt: "Starlight Town at night, under the Moon and the Cloud Post Office",
  },
];

export const filmHref = (f: FilmCard) => `/films/${f.slug}/`;
