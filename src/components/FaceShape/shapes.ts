/* The face-shape takes (2026-10-06): what shape Zev's photo takes across the
 * site, in place of today's circle. Each one borrows a shape the brand already
 * uses, so the photo reads as part of the same system.
 *
 *   A · Hexagon — the hive: many workers, one hive (brand shapes round 4).
 *   B · Octagon — the e's own outline, every corner cut at 45°, and Mason's head.
 *   C · Tag     — two opposite corners cut, like the site's chamfered tags.
 * Round 2, after "keep the circle or the octagon?":
 *   D · Square  — a plain square, barely rounded, like an editorial photo. */

export type FaceShape = 'hex' | 'oct' | 'tag' | 'sq';

export interface FaceShapeTake {
  shape: FaceShape;
  name: string;
  /** Why this shape, in one sentence; shown on the sheet under the hero. */
  why: string;
}

export const FACE_SHAPES: Record<string, FaceShapeTake> = {
  hexagon: {
    shape: 'hex',
    name: 'Hexagon',
    why: 'The hive: many workers, one hive. Six sides with soft corners, pointing up, so the head sits under the top point.',
  },
  octagon: {
    shape: 'oct',
    name: 'Octagon',
    why: 'The e’s own outline: every corner cut at 45°, about a quarter in, as the loader cuts it. Mason’s head is the same shape.',
  },
  tag: {
    shape: 'tag',
    name: 'Tag',
    why: 'Two opposite corners cut, like the site’s chamfered tags. The square corners crop closer, so the hero shows less shoulder.',
  },
  square: {
    shape: 'sq',
    name: 'Square',
    why: 'A plain square with barely rounded corners, like a photo in a magazine. It matches the site’s cards and covers, and stays apart from Mason’s octagon.',
  },
};
