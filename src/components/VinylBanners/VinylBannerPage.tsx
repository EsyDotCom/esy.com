/* The Marketing Engineer's banners in glossy vinyl (2026-10-11). One concept per
   take, shown the ways each site crops it: the YouTube channel art whole (TVs),
   as the desktop strip and as the phone's centre, then the LinkedIn and X
   headers with the profile photo where each site puts it. Every image is the
   exported PNG from scripts/vinyl-banners.py, so what's shown is what uploads.

   A · Network   a vinyl network of chamfered nodes and glowing tubes into a jade hub
   B · Bench     vinyl Mason wiring up a small glowing network
   C · Line      rough lumps in, through a glowing gantry, precise jade tiles out
   D · Kit       our 45° pieces laid out like a model kit, a few lit from inside
   E · Skyline   a vinyl city at night, light running between the towers */

import Image from 'next/image';
import './vinyl-banners.css';

export const BANNER_CONCEPTS = ['network', 'bench', 'line', 'kit', 'skyline'] as const;
export type BannerConcept = (typeof BANNER_CONCEPTS)[number];

const src = (concept: BannerConcept, fmt: 'youtube' | 'linkedin' | 'x') => `/prototypes/vinyl-banners/${concept}-${fmt}.png`;

/** The profile photo, where LinkedIn and X lay it over the bottom left of the header. */
const Avatar = ({ className }: { className: string }) => (
  <span className={`vb-avatar ${className}`}>
    <Image src="/images/og/zev-uhuru-360.jpg" alt="" width={360} height={360} />
  </span>
);

export default function VinylBannerPage({ concept }: { concept: BannerConcept }) {
  const yt = src(concept, 'youtube');
  return (
    <div className="vb">
      <section className="vb-block">
        <h2>YouTube channel art</h2>
        <p className="vb-note">2560 × 1440. TVs show all of it; the dashed box is the desktop strip, the solid box what phones show. Every word sits inside the solid box.</p>
        <div className="vb-yt-full">
          <Image src={yt} alt="The YouTube channel art, whole" width={2560} height={1440} sizes="(max-width: 1120px) 100vw, 1072px" />
          <span className="vb-yt-desk" aria-hidden="true" />
          <span className="vb-yt-phone" aria-hidden="true" />
        </div>
        <div className="vb-row">
          <figure className="vb-crop">
            {/* The same PNG cropped by CSS the way YouTube crops it on desktop, then on a phone. */}
            <div className="vb-yt-strip" style={{ backgroundImage: `url(${yt})` }} role="img" aria-label="As YouTube shows it on desktop" />
            <figcaption>On desktop</figcaption>
          </figure>
          <figure className="vb-crop vb-crop--phone">
            <div className="vb-yt-phonecrop" style={{ backgroundImage: `url(${yt})` }} role="img" aria-label="As YouTube shows it on a phone" />
            <figcaption>On a phone</figcaption>
          </figure>
        </div>
        <a className="vb-dl" href={yt} download={`marketing-engineer-youtube-${concept}.png`}>Download the YouTube PNG</a>
      </section>

      <section className="vb-block">
        <h2>LinkedIn</h2>
        <p className="vb-note">1584 × 396. The photo covers the bottom left, so the words sit right.</p>
        <div className="vb-profile vb-profile--li">
          <Image src={src(concept, 'linkedin')} alt="The LinkedIn banner" width={1584} height={396} sizes="(max-width: 1120px) 100vw, 1072px" />
          <Avatar className="vb-avatar--li" />
        </div>
        <a className="vb-dl" href={src(concept, 'linkedin')} download={`marketing-engineer-linkedin-${concept}.png`}>Download the LinkedIn PNG</a>
      </section>

      <section className="vb-block">
        <h2>X</h2>
        <p className="vb-note">1500 × 500, with the photo at the bottom left as X places it.</p>
        <div className="vb-profile vb-profile--x">
          <Image src={src(concept, 'x')} alt="The X header" width={1500} height={500} sizes="(max-width: 720px) 100vw, 640px" />
          <Avatar className="vb-avatar--x" />
        </div>
        <a className="vb-dl" href={src(concept, 'x')} download={`marketing-engineer-x-${concept}.png`}>Download the X PNG</a>
      </section>

      <p className="vb-note vb-foot">
        Prototype. Each concept is one 2560 × 1440 picture made on api.esy.com in glossy vinyl, cut three ways; the words are set in our own type
        (Black Ops One, Cormorant, Helvetica Neue) by scripts/vinyl-banners.py. Nothing here is uploaded anywhere.
      </p>
    </div>
  );
}
