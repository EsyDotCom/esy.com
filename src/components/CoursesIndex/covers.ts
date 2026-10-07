/* Cover art for the courses (index, course page, lesson end card), by course slug:
 * a 16:9 cover for the lead story (D) and a 2:3 poster (F). The images were
 * made through api.esy.com by scripts/generate-article-images.mjs (ids
 * course-claude-code and course-claude-code-poster). A course with `drawn`
 * shows that drawn cover instead, from src/components/CourseCovers/ (picked at
 * /prototypes/course-cover/); the images stay for the prototype pages that use
 * them. A course without art falls back to the typographic cover. */

import type { CoverKey } from '@/components/CourseCovers/covers';

export interface CourseArt {
  wide: string;
  poster: string;
  alt: string;
  /** A drawn cover from CourseCovers, shown on the poster and the lesson end card. */
  drawn?: CoverKey;
}

export const COURSE_ART: Record<string, CourseArt> = {
  'how-to-use-claude-code': {
    wide: '/images/courses/claude-code.webp',
    poster: '/images/courses/claude-code-poster.webp',
    alt: 'Mason the octopus at his desk at night, seen from behind between two screens, an editor and a terminal, his tentacles pressing the keys',
    // Shipped 2026-10-07: the studio with two screens (K at /prototypes/course-cover/).
    drawn: 'studio-two',
  },
};
