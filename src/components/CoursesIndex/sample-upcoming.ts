/* SAMPLE courses for the /courses prototypes. Only one course is live today
 * (the others in src/lib/learn/mockData.ts are commented out), and one course
 * can't show how an index layout grows. These two stand in as "coming next"
 * entries, named after topics the newsletter already covers
 * (src/data/topics.ts). They are not real course plans: every layout labels
 * them as samples and never links them.
 */

export interface UpcomingCourse {
  title: string;
  description: string;
  tags: string[];
  plannedLessons: number;
}

export const SAMPLE_UPCOMING: UpcomingCourse[] = [
  {
    title: 'Agentic Workflows for Marketing',
    description:
      'Design multi-agent workflows that research, draft and review marketing work, with a person signing off at each step.',
    tags: ['Agentic workflows', 'Claude Code'],
    plannedLessons: 4,
  },
  {
    title: 'AI Image Generation for Brands',
    description:
      'Make on-brand images at volume: style references, batch runs, and a review step that catches the misses before they ship.',
    tags: ['AI image generation'],
    plannedLessons: 3,
  },
];
