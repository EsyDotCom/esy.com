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
  /** The homepage's films group: the kind of film (its ledger role), a short
   * summary, four frames that stand in for a logo, and a 2:3 poster with its
   * credits for the newest film's band. */
  kind: string;
  summary: string;
  frames: string[];
  poster: string;
  posterAlt: string;
  credits: [string, string][];
  /** The film as a strip of stills in story order, each with its scene (FilmStrip). */
  strip: { src: string; scene: number }[];
  /** A short production line for the strip's card, e.g. "39 shots · 6 voices". */
  facts: string;
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
    kind: "Animated short",
    summary: "A night postman follows a letter with no address across the sky. Four minutes, made from one clip.art pack. Showing as an animatic while the motion is made.",
    frames: ["look-world", "milo-stamp", "moon-tender", "dawn-home"].map((n) => `/films/${LETTER.slug}/${n}.webp`),
    poster: `/films/${LETTER.slug}/poster.webp`,
    posterAlt: "Lullo's balloon rising toward the sleeping Moon",
    strip: (
      [
        ["milo-stamp", 1], ["envelope-desk", 1], ["ottoline-perch", 2], ["launch", 2], ["lane-search", 3],
        ["stars-bounce", 3], ["letter-moonlight", 4], ["moon-tender", 4], ["stars-letter", 5], ["dawn-home", 6],
      ] as [string, number][]
    ).map(([n, scene]) => ({ src: `/films/${LETTER.slug}/${n}.webp`, scene })),
    facts: `${LETTER.shots} shots · ${LETTER.voices} voices · 1 clip.art pack`,
    credits: [
      ["Starring", "Lullo the Moon Bear, Ottoline, the Moon, the Lantern Stars"],
      ["Story", "Screenplay draft B"],
      ["Frames", "Esy, from one clip.art pack"],
      ["Voices", "Six designed voices · ElevenLabs"],
      ["Sound", "Temp score, mixed to broadcast loudness"],
      ["Made by", "Zev, with Claude and Esy"],
    ],
  },
];

export const filmHref = (f: FilmCard) => `/films/${f.slug}/`;
