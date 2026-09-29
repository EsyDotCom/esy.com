/* Generated cover art for the /courses round-2 prototypes, by course slug:
 * a 16:9 cover for the lead story (D) and a 2:3 poster (F). Made through
 * api.esy.com by scripts/generate-article-images.mjs (ids course-claude-code
 * and course-claude-code-poster). A course without art falls back to the
 * typographic cover. */

export interface CourseArt {
  wide: string;
  poster: string;
  alt: string;
}

export const COURSE_ART: Record<string, CourseArt> = {
  'how-to-use-claude-code': {
    wide: '/prototypes/courses/claude-code.webp',
    poster: '/prototypes/courses/claude-code-poster.webp',
    alt: 'Isometric illustration: a small robot assistant on a desk beside a terminal and code editor, sorting glowing file cards.',
  },
};
