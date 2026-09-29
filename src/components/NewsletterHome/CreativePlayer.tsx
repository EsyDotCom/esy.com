'use client';

/* A creative's video in the homepage's showcase band: YouTube's thumbnail with
 * a play button, and the privacy-enhanced player loaded only on click, so the
 * homepage doesn't pay for a player nobody pressed. */
import { useState } from 'react';
import { Play } from 'lucide-react';

export default function CreativePlayer({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="nl-creative-player">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" className="nl-creative-poster" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's own thumbnail, not a site asset */}
          <img src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`} alt="" />
          <span className="nl-creative-play" aria-hidden="true">
            <Play size={26} fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}
