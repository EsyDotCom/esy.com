'use client';

/* The video, set in a frame. Every video-article prototype plays the real Mux
 * video through the site's own player (VideoPlayer) and shows the real
 * click-to-seek transcript (VideoTranscript) under it; what changes is the
 * frame around the player, the padding that gives it room:
 *
 *   studio  — a wide navy panel with a soft jade glow (A)
 *   theater — a dark room: a spotlight behind, a thin jade ring (B)
 *   mat     — a light mat with a white inner border, like a framed print (C)
 *
 * The player and transcript share one ref so the transcript can seek and
 * follow playback, as on the live video pages. That's why the transcript lives
 * here: for B, `header` (the title block) goes inside the dark room with the
 * video, and the transcript sits outside it, on the light page. */

import { useRef } from 'react';
import type { MuxPlayerElement } from '@mux/mux-player-react';
import { VideoPlayer } from '@/components/School/VideoPlayer';
import { VideoTranscript } from '@/components/Research/VideoTranscript';
import { TranscriptToggle } from '@/components/School/TranscriptToggle';
import type { TranscriptSegment } from '@/lib/transcripts';

export type VideoFrame = 'studio' | 'theater' | 'mat';

export default function FramedVideo({
  frame,
  playbackId,
  title,
  thumbnailUrl,
  durationSeconds,
  segments,
  transcriptText,
  header,
  side,
}: {
  frame: VideoFrame;
  playbackId: string;
  title: string;
  thumbnailUrl?: string;
  durationSeconds: number;
  segments: TranscriptSegment[] | null;
  /** Plain transcript text, shown as a toggle when there are no timestamped segments. */
  transcriptText?: string;
  /** Content above the video inside its room (B's title block). */
  header?: React.ReactNode;
  /** Content beside the video (C's title block, on the left). */
  side?: React.ReactNode;
}) {
  const playerRef = useRef<MuxPlayerElement | null>(null);

  return (
    <div className={`av-framed av-framed--${frame}`}>
      <div className="av-room">
        <div className="av-room-inner">
          {header}
          <div className="av-room-row">
            {side}
            <figure className="av-frame">
              <div className="av-frame-screen">
                <VideoPlayer
                  playbackId={playbackId}
                  title={title}
                  thumbnailUrl={thumbnailUrl}
                  durationSeconds={durationSeconds}
                  playerRef={playerRef}
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
      {segments && segments.length > 0 ? (
        <div className="av-transcript">
          <VideoTranscript segments={segments} playerRef={playerRef} />
        </div>
      ) : (
        transcriptText && (
          <div className="av-transcript">
            <TranscriptToggle transcript={transcriptText} />
          </div>
        )
      )}
    </div>
  );
}
