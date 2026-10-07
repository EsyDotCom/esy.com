/* The five course-cover takes, by URL slug (/prototypes/course-cover/<slug>/).
 * Each names the drawing in covers.tsx and says, in one sentence, how Mason
 * and the thing he works on relate. */

import type { CoverKey } from './covers';

export interface CoverTake {
  key: string;
  name: string;
  cover: CoverKey;
  /** How Mason and the work relate, shown on the sheet. */
  idea: string;
}

export const COVER_TAKES: Record<string, CoverTake> = {
  terminal: {
    key: 'A',
    name: 'Terminal',
    cover: 'terminal',
    idea: 'Mason types and the terminal writes itself: one mind, several arms at the keys. The closest to what the course is, Claude Code in a terminal.',
  },
  lessons: {
    key: 'B',
    name: 'Lessons',
    cover: 'lessons',
    idea: 'Each lesson is a numbered tile in one of his arms, lighting in order as the octagon around him fills in. The cover is the course’s progress.',
  },
  prompt: {
    key: 'C',
    name: 'Prompt',
    cover: 'prompt',
    idea: 'He builds the prompt sign, ">_", from stencil slabs like the gate in the footer, and holds the last piece, the cursor, out to you. The course is the last piece.',
  },
  night: {
    key: 'D',
    name: 'Night',
    cover: 'night',
    idea: 'A film poster for a band that announces courses like films: one giant cursor blinks at the top, and Mason rises through its beam in deep water.',
  },
  // Round 2: a real workspace, with Mason the main character doing the work in it.
  studio: {
    key: 'F',
    name: 'Studio',
    cover: 'studio',
    idea: 'Mason at his desk at night, from behind: the back of his head, the monitor beyond him, and his four front tentacles on the keyboard, each pressing a key as the terminal types.',
  },
  window: {
    key: 'G',
    name: 'Window',
    cover: 'window',
    idea: 'A laptop on a window ledge over the night city, its screen facing the room. We’re behind Mason as he sits at the ledge, his tentacles pressing its keys while the terminal types.',
  },
  floating: {
    key: 'H',
    name: 'Floating',
    cover: 'floating',
    idea: 'The original poster’s idea in our cut: a terminal glowing over night hills. Mason sits on its title bar against the moon, letting files drop into it, and the finished ones fall to the desk.',
  },
  flatlay: {
    key: 'I',
    name: 'Flat-lay',
    cover: 'flatlay',
    idea: 'The desk from above, with Mason at the laptop: we see the top of his head, not his face, and his four front tentacles on the keys, each pressing in turn as the terminal types.',
  },
  'two-screens': {
    key: 'J',
    name: 'Two screens',
    cover: 'screens',
    idea: 'Mason from behind at a desk with two screens, an editor and the terminal, his tentacles pressing the keys of the keyboard between them as both fill.',
  },
  // Round 3: the merge.
  'studio-two-screens': {
    key: 'K',
    name: 'Studio, two screens',
    cover: 'studio-two',
    idea: 'F’s room (the shelf, the lamp, the city window, the plant) with J’s two screens: Mason from behind at his desk at night, between an editor and the terminal, his tentacles pressing the keys between them.',
  },
  reef: {
    key: 'E',
    name: 'Reef',
    cover: 'reef',
    idea: 'Mason at home in the footer’s reef, at a stone desk with a slab screen typing beside him. The same world as the bottom of every page.',
  },
};
