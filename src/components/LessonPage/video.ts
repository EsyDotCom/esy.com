/* Which video a lesson page plays (server only).
 *
 * A lesson with its own Mux recording (`muxPlaybackId`) plays it. None of the
 * Claude Code lessons is recorded yet, so until one is, the page plays a real
 * published Esy video in its place (Claude Fable 5 first impressions, the one
 * video with a timestamped transcript) and says so on the page
 * (SampleVideoNote). Recording a lesson means adding its playback ID to
 * src/lib/learn/mockData.ts; the stand-in and its note then drop away.
 */
import type { Lesson } from '@/lib/learn/types';
import { findAgenticArticle } from '@/lib/published-articles';
import { loadTranscriptSegments } from '@/lib/transcript-loader';
import type { SampleVideo } from './shared';

const STAND_IN_SLUG = 'claude-fable-5-first-impressions';

/** The lesson's own video, or the stand-in (with `standIn: true`), or null if neither exists. */
export async function lessonVideo(lesson: Lesson): Promise<(SampleVideo & { standIn: boolean }) | null> {
  if (lesson.muxPlaybackId) {
    return {
      slug: '',
      playbackId: lesson.muxPlaybackId,
      title: lesson.title,
      durationSeconds: Math.round(lesson.durationMs / 1000),
      segments: null,
      standIn: false,
    };
  }
  const stand = await findAgenticArticle(STAND_IN_SLUG);
  if (!stand?.muxPlaybackId) return null;
  return {
    slug: stand.slug,
    playbackId: stand.muxPlaybackId,
    title: stand.title,
    thumbnailUrl: stand.thumbnailUrl,
    durationSeconds: stand.durationSeconds,
    segments: loadTranscriptSegments(stand.slug),
    standIn: true,
  };
}
