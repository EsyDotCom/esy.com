'use client';

/* A photoreal background loop behind the hero (2026-10-09,
 * /prototypes/hero-backdrop/). The still shows first and stays for anyone
 * with reduced motion or Save-Data on; otherwise the shot plays, a little
 * slower than shot, so the movement stays subtle.
 *
 * The shot isn't a seamless loop (it's 8 seconds of real light changing), so
 * two copies of it take turns: near the end of one, the other starts from
 * the top and crossfades in. The jump back to the start never shows. */

import { useEffect, useRef, useState } from 'react';

const FADE_S = 1.6; // crossfade length; the CSS transition matches
const RATE = 0.8; // play the shot slower than it was made

export default function HeroLoop({ video, poster, focus = '70% 50%' }: { video: string; poster: string; focus?: string }) {
  const refs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [motion, setMotion] = useState(false);
  const [front, setFront] = useState(0);
  const [ready, setReady] = useState(false);

  // Motion only when the viewer hasn't asked for less of it (or for less data).
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    setMotion(!reduce && !conn?.saveData && !/2g/.test(conn?.effectiveType ?? ''));
  }, []);

  // Start the front copy once motion is allowed.
  useEffect(() => {
    if (!motion) return;
    const v = refs[0].current;
    if (!v) return;
    v.playbackRate = RATE;
    v.play().catch(() => setMotion(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motion]);

  // Near the end of the front copy, start the other one and hand over.
  function onTime(i: number) {
    const v = refs[i].current;
    if (i !== front || !v || !v.duration) return;
    if (v.duration - v.currentTime > FADE_S * RATE) return;
    const next = refs[1 - i].current;
    if (!next) return;
    next.currentTime = 0;
    next.playbackRate = RATE;
    next.play().catch(() => {});
    setFront(1 - i);
  }

  return (
    <div className={`eh-loop${ready ? ' is-ready' : ''}`} aria-hidden="true" style={{ ['--eh-loop-focus' as string]: focus }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- the still under the video, same crop as the video */}
      <img className="eh-loop-still" src={poster} alt="" />
      {motion && [0, 1].map((i) => (
        <video
          key={i}
          ref={refs[i]}
          className={`eh-loop-video${front === i ? ' is-on' : ''}`}
          src={video}
          muted
          playsInline
          preload={i === 0 ? 'auto' : 'metadata'}
          onPlaying={() => setReady(true)}
          onTimeUpdate={() => onTime(i)}
        />
      ))}
      <div className="eh-loop-scrim" />
    </div>
  );
}
