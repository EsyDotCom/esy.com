/**
 * Types for the Esy Course/Lesson Learning System
 * 
 * Data shapes designed for easy swap from mock → real API.
 * Each interface maps to a future database table or API response.
 */

// ─── Transcript ────────────────────────────────────────────
export interface TranscriptSegment {
  id: string;
  startMs: number;
  endMs: number;
  text: string;
  speaker?: string;
}

// ─── Notes ─────────────────────────────────────────────────
export interface UserNote {
  id: string;
  timestampMs: number;
  text: string;
  createdAt: string; // ISO string
}

// ─── Resources ─────────────────────────────────────────────
export interface LessonResource {
  title: string;
  url: string;
  type: 'link' | 'download' | 'github' | 'paper';
  description?: string;
}

// ─── Commentary timestamp reference ────────────────────────
export interface TimestampRef {
  label: string;
  timeMs: number;
}

// ─── Commentary ────────────────────────────────────────────
export interface LessonCommentary {
  markdown: string;
  timestampRefs: TimestampRef[];
  resources: LessonResource[];
}

// ─── Lesson ────────────────────────────────────────────────
export interface Lesson {
  slug: string;
  title: string;
  description: string;
  videoUrl: string;
  /** The lesson's own recording on Mux. Until it's set, the lesson page plays a stand-in (LessonPage/video.ts). */
  muxPlaybackId?: string;
  durationMs: number;
  durationLabel: string;
  publishedAt: string; // ISO date
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  transcript: TranscriptSegment[];
  commentary: LessonCommentary;
  order: number;
}

// ─── Chapter ───────────────────────────────────────────────
export interface Chapter {
  title: string;
  lessons: Lesson[];
}

// ─── Course ────────────────────────────────────────────────
export interface Course {
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  chapters: Chapter[];
  totalLessons: number;
  totalDurationLabel: string;
  publishedAt: string;
  tags: string[];
}

// ─── Progress (localStorage shape) ─────────────────────────
export interface LessonProgress {
  courseSlug: string;
  lessonSlug: string;
  lastWatchedMs: number;
  completed: boolean;
  updatedAt: string;
}
