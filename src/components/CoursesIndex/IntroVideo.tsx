'use client';

/* The /courses intro video (2026-09-29, prototypes at /prototypes/courses-hero/).
 *
 * Which video plays, and whether it's still the sample, is in intro.ts.
 *
 * The player is a facade: a thumbnail and a play button, with YouTube's
 * privacy-enhanced player loaded only on click, so the hero stays light.
 */
import { useEffect, useState } from 'react';
import { Play, X } from 'lucide-react';
import { INTRO_VIDEO } from './intro';


const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const embed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

/** The video itself: a poster that becomes the player on click. */
export function IntroPlayer({ className = '' }: { className?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`civ-player ${className}`}>
      {playing ? (
        <iframe
          src={embed(INTRO_VIDEO.youtubeId)}
          title={INTRO_VIDEO.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" className="civ-poster" onClick={() => setPlaying(true)} aria-label="Play the intro video">
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's own thumbnail, not a site asset */}
          <img src={thumb(INTRO_VIDEO.youtubeId)} alt="" />
          <span className="civ-play" aria-hidden="true">
            <Play size={26} fill="currentColor" />
          </span>
          <span className="civ-len">{INTRO_VIDEO.duration}</span>
        </button>
      )}
    </div>
  );
}

/** Says the video is a stand-in until the real intro exists. */
export function IntroSampleNote({ onDark = false }: { onDark?: boolean }) {
  if (!INTRO_VIDEO.sample) return null;
  return (
    <p className={`civ-sample ${onDark ? 'civ-sample--onDark' : ''}`}>
      <b>Sample.</b> The courses intro isn&apos;t made yet; this is the SEOPage explainer, standing in.
    </p>
  );
}

/** C's pill: a small thumbnail and label that open the video in a lightbox. */
export function IntroPill() {
  const [open, setOpen] = useState(false);

  // Escape closes the lightbox.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button type="button" className="civ-pill" onClick={() => setOpen(true)}>
        <span className="civ-pill-thumb">
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube's own thumbnail, not a site asset */}
          <img src={thumb(INTRO_VIDEO.youtubeId)} alt="" />
          <span className="civ-pill-play" aria-hidden="true">
            <Play size={12} fill="currentColor" />
          </span>
        </span>
        <span className="civ-pill-text">
          <b>Watch the intro</b>
          <span>What the courses are · {INTRO_VIDEO.duration}</span>
        </span>
      </button>
      {open && (
        <div className="civ-box" role="dialog" aria-modal="true" aria-label="Courses intro video" onClick={() => setOpen(false)}>
          <div className="civ-box-inner" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="civ-box-close" onClick={() => setOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
            <div className="civ-player">
              <iframe
                src={embed(INTRO_VIDEO.youtubeId)}
                title={INTRO_VIDEO.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <IntroSampleNote onDark />
          </div>
        </div>
      )}
    </>
  );
}
