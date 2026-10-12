'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { TOY_VARIANTS, toySrc } from './takes';
import '@/components/FooterWorld/FooterWorld.css';
import './mason-toy.css';

/* Worlds with an 8-second loop (generate-photoreal-video from the still, 2026-10-11:
   gate run-e5946172, assembly run-ec731f5a). The rest are stills, the live reef among them:
   its loop (run-468a3aac) weighed 2.6 MB against today's 15 KB footer, so it stays a still. */
const LOOPS: Record<string, string> = {
  'toy-gate': '/prototypes/mason-toy/loop-gate.mp4',
  'toy-assembly': '/prototypes/mason-toy/loop-assembly.mp4',
};

/* The take's world in the footer's slot, full-bleed, with the site footer
   floating over its lower part as a card (FooterWorld's CSS). A world with a
   loop plays it, unless the visitor asked for less motion: then the still. */
export default function ToyFooter({ variant }: { variant: string }) {
  const v = TOY_VARIANTS[variant];
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    setMotion(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  if (!v) return null;
  const still = toySrc(v.material, `footer-${v.world}`);
  const loop = LOOPS[variant];
  return (
    <div className={`fw mt-fw mt-fw--${v.world}`} aria-hidden="true">
      {loop && motion ? (
        <video src={loop} poster={still} autoPlay muted loop playsInline preload="metadata" />
      ) : (
        <Image src={still} alt="" width={1920} height={1080} sizes="100vw" />
      )}
    </div>
  );
}
