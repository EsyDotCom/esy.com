'use client';

/* The social media kit on /brand#social (2026-10-18). What Esy shows on each
   platform: its profile there, the profile picture in three marks at every
   platform's upload size, and the desk banner at every banner size, each
   with a download. The data is social-kit.json (sizes and their sources) and
   lib/social-profiles.ts (the handles). The files come from
   scripts/brand-social.mjs and scripts/export-linkedin-banners.mjs. */

import { useState } from 'react';
import KIT from './social-kit.json';
import { profileOf, type SocialPlatform } from '@/lib/social-profiles';
import { Download } from './parts';

const DIR = '/brand/social';
type Avatar = (typeof KIT.avatars)[number];
type Banner = (typeof KIT.banners)[number];

// Which profile each picture and banner belongs to.
const AVATAR_PROFILE: Record<string, SocialPlatform> = {
  x: 'x', linkedin: 'linkedin', youtube: 'youtube', instagram: 'instagram', threads: 'threads', tiktok: 'tiktok',
  facebook: 'facebook', bluesky: 'bluesky', reddit: 'reddit', pinterest: 'pinterest', github: 'github', skool: 'skool', substack: 'substack',
};
const BANNER_PROFILE: Record<string, SocialPlatform> = {
  linkedin: 'linkedin-personal', 'linkedin-company': 'linkedin', youtube: 'youtube', x: 'x', github: 'github',
  facebook: 'facebook', bluesky: 'bluesky', substack: 'substack', skool: 'skool', reddit: 'reddit',
};

/** The live profile for a platform: its handle as a link and "See it live", or "Not set up yet". */
function Live({ platform }: { platform: SocialPlatform }) {
  const p = profileOf(platform);
  if (!p?.href) return <span className="bk-sk-live is-off">Not set up yet</span>;
  return (
    <span className="bk-sk-live">
      <a href={p.href} target="_blank" rel="noopener">{p.handle}</a>
      {p.note && <em> ({p.note})</em>}
      <a className="bk-sk-see" href={p.href} target="_blank" rel="noopener">See it live ↗</a>
    </span>
  );
}

/** Where a size comes from: the platform's own help page, or "no official size". */
function Source({ href, official }: { href: string; official: boolean }) {
  return (
    <a className="bk-sk-src" href={href} target="_blank" rel="noopener">
      {official ? 'Platform’s size' : 'No official size, safe default'}
    </a>
  );
}

function AvatarCard({ mark, a }: { mark: string; a: Avatar }) {
  const file = `${DIR}/${mark}-${a.id}.png`;
  return (
    <li className="bk-sk-av">
      {/* eslint-disable-next-line @next/next/no-img-element -- the file itself, shown as the platform crops it */}
      <img className={`bk-sk-av-img is-${a.crop}`} src={file} alt="" width={96} height={96} loading="lazy" />
      <b>{a.name}</b>
      <span className="bk-sk-meta">{a.size} × {a.size} · {a.crop === 'circle' ? 'circle' : a.crop === 'square' ? 'square' : 'rounded square'}</span>
      <Live platform={AVATAR_PROFILE[a.id]} />
      <span className="bk-sk-row">
        <Download href={file} label="PNG" />
        <Source href={a.source} official={a.official} />
      </span>
    </li>
  );
}

function BannerCard({ b, safe }: { b: Banner; safe: boolean }) {
  const file = `${DIR}/banners/${b.file}`;
  return (
    <li className="bk-sk-bn">
      <div className="bk-sk-bn-frame" style={{ aspectRatio: `${b.width} / ${b.height}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- the upload-ready file */}
        <img src={file} alt={`The Marketing Engineer banner for ${b.name}`} loading="lazy" />
        {safe && b.safe && (
          <span
            className="bk-sk-safe"
            style={{ width: `${(b.safe.width / b.width) * 100}%`, height: `${(b.safe.height / b.height) * 100}%` }}
            aria-hidden="true"
          />
        )}
      </div>
      <div className="bk-sk-bn-foot">
        <b>{b.name}</b>
        <span className="bk-sk-meta">{b.width} × {b.height}{b.inUse ? ' · in use' : ''}</span>
        <p className="bk-sk-note">{b.note}</p>
        <Live platform={BANNER_PROFILE[b.id]} />
        <span className="bk-sk-row">
          <Download href={file} label={b.file.endsWith('.jpg') ? 'JPG' : 'PNG'} />
          <Source href={b.source} official={b.official} />
        </span>
      </div>
    </li>
  );
}

export function SocialKit() {
  const [safe, setSafe] = useState(false);
  const inUse = KIT.marks.find((m) => m.id === KIT.inUse);
  const live = KIT.banners.filter((b) => b.inUse);
  const ready = KIT.banners.filter((b) => !b.inUse);
  return (
    <div className="bk-sk">
      <p className="bk-p">
        Everything Esy puts on a social profile: the picture, the banner, and where each one is live. The profile picture in use is <b>{inUse?.name}</b>. Every file is made by <code>scripts/brand-social.mjs</code> and <code>scripts/export-linkedin-banners.mjs</code>, at each platform’s upload size.
      </p>

      <h3 className="bk-h3">Profile pictures</h3>
      <p className="bk-p bk-sk-small">Every platform but LinkedIn shows the picture as a circle, so each mark sits inside one: its box stays within 80% of the circle.</p>
      {KIT.marks.map((m) => (
        <div key={m.id} className="bk-sk-mark">
          <div className="bk-sk-mark-head">
            <b>{m.name}</b>
            {m.id === KIT.inUse && <span className="bk-sk-use">In use</span>}
            <Download href={`${DIR}/${m.id}-profile-pictures.zip`} label="All sizes, ZIP" />
          </div>
          <p className="bk-sk-note">{m.line}</p>
          <ul className="bk-sk-avs">
            {KIT.avatars.map((a) => <AvatarCard key={a.id} mark={m.id} a={a} />)}
          </ul>
        </div>
      ))}

      <div className="bk-sk-bn-head">
        <h3 className="bk-h3">Banners</h3>
        <label className="bk-sk-toggle">
          <input type="checkbox" checked={safe} onChange={(e) => setSafe(e.target.checked)} /> Show safe areas
        </label>
      </div>
      <p className="bk-p bk-sk-small">The Marketing Engineer over Zev’s desk, one design at every size. Each platform keeps its own line. {KIT.none.join(', ')} have no banner.</p>
      <h4 className="bk-sk-h4">In use</h4>
      <ul className="bk-sk-bns">{live.map((b) => <BannerCard key={b.id} b={b} safe={safe} />)}</ul>
      <h4 className="bk-sk-h4">Ready for the other platforms</h4>
      <ul className="bk-sk-bns">{ready.map((b) => <BannerCard key={b.id} b={b} safe={safe} />)}</ul>

      <h4 className="bk-sk-h4">Takes we made</h4>
      <ul className="bk-sk-takes">
        {KIT.takes.map((t) => (
          <li key={t.file}>
            {/* eslint-disable-next-line @next/next/no-img-element -- an earlier take, as exported */}
            <img src={t.file} alt={`The ${t.name} banner take`} loading="lazy" />
            <span>{t.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
