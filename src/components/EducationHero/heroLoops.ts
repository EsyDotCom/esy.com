/* The photoreal hero shots (2026-10-09), made through api.esy.com by
 * scripts/generate-hero-loops.mjs. Each is a still (a small webp kept in the
 * repo, shown first and to anyone with reduced motion) and an 8-second loop
 * that stays in Esy's own storage, so 23MB of video never enters the repo.
 * `focus` is where the shot's subject sits, so phones crop toward it. */

const STILLS = '/images/hero-loops';
const loop = (run: string) => `https://images.esy.com/artifacts/tool/${run}/step-2.mp4`;

export type HeroShot = { video: string; poster: string; focus: string };

const shot = (id: string, run: string, focus: string): HeroShot => ({ video: loop(run), poster: `${STILLS}/${id}.webp`, focus });
// A finished video filed in Esy's media library (Mux) rather than straight off a run.
const muxShot = (id: string, playbackId: string, focus: string): HeroShot => ({ video: `https://stream.mux.com/${playbackId}/highest.mp4`, poster: `${STILLS}/${id}.webp`, focus });

export const HERO_SHOTS: Record<string, HeroShot> = {
  desk: shot('desk', 'run-532b13fe', '72% 60%'),
  architecture: shot('architecture', 'run-fb3e2be6', '70% 50%'),
  city: shot('city', 'run-131a3de5', '80% 50%'),
  glass: shot('glass', 'run-3bbd7ea2', '75% 50%'),
  studio: shot('studio', 'run-7e35ab49', '78% 55%'),
  'desk-night': shot('desk-night', 'run-2fad0032', '70% 55%'),
  'desk-highrise': shot('desk-highrise', 'run-6d35adb5', '75% 50%'),
  'desk-loft': shot('desk-loft', 'run-a9508497', '78% 50%'),
  'city-nyc': shot('city-nyc', 'run-9a84d526', '62% 45%'),
  'city-miami': shot('city-miami', 'run-c2e79a53', '72% 50%'),
  // Round 7 (2026-10-09): an empty open office, and a data center.
  'office-night': shot('office-night', 'run-2395448b', '70% 50%'),
  'office-lights': shot('office-lights', 'run-093cb26c', '72% 50%'),
  'datacenter-dusk': shot('datacenter-dusk', 'run-9a33bb63', '78% 55%'),
  'datacenter-aerial': shot('datacenter-aerial', 'run-8b008a30', '78% 50%'),
  // Round 8 (2026-10-09): B33 redone with dashboards on its screens, and people at work.
  'office-dashboards': shot('office-dashboards', 'run-dc0ef710', '78% 50%'),
  'dev-window': shot('dev-window', 'run-3a8624c5', '72% 50%'),
  'dev-output': shot('dev-output', 'run-e9ec6d15', '70% 50%'),
  'team-floor': shot('team-floor', 'run-4dd749c6', '68% 50%'),
  'team-desk': shot('team-desk', 'run-90d3c150', '68% 50%'),
  // Round 9: B37 redone as Zev, from his reference sheet.
  'zev-window': shot('zev-window', 'run-51834d5a', '72% 50%'),
  // Round 10: B37 re-shot (head to the screens, still) and B38 as Zev. 'zev-desk-a2' is a second take of the same still.
  'zev-desk-a': shot('zev-desk-a', 'run-f4b4a365', '72% 50%'),
  'zev-desk-a2': shot('zev-desk-a', 'run-294181e9', '72% 50%'),
  'zev-output': shot('zev-output', 'run-20d92f97', '66% 50%'),
  // Round 11: Zev walking a data center.
  'zev-dc-aisle': shot('zev-dc-aisle', 'run-502de9ef', '60% 50%'),
  'zev-dc-catwalk': shot('zev-dc-catwalk', 'run-0eeb0a57', '62% 50%'),
  'zev-dc-glass': shot('zev-dc-glass', 'run-a41b9aea', '70% 50%'),
  // Round 11: os.esy.com/agency/search on his screen. The video model garbles UI, so the real
  // screenshot was baked back onto the screen frame by frame (runs run-4502cd9b, run-16ec13a8)
  // and the result filed in Esy's media library; posters are each video's first frame. B45 is
  // cut to its first 4.6s, before his hand drifts off the keyboard.
  'zev-agency-close': muxShot('zev-agency-close', 'qOk2zAlLI015gBzypO57hiCBk02u00IdWFzBawkA6ZNs01w', '100% 50%'),
  // B44 re-shot over his left shoulder (run run-8d6ad0e8), the page baked on the same way;
  // round 12 made the screen clearer: the full page view, captured at retina and baked at 1080p.
  'zev-agency-shoulder': muxShot('zev-agency-shoulder', '00HfGgIb5CXKKRzYDw00Bnenh02juLvl8WVIALT8air3a00', '100% 50%'),
  // B45, round 12: the screen is the page's top section, bigger and at 1080p, its chart animating:
  // 16 states of the live page (bars growing, leads counting to 80) baked in time with the video.
  'zev-agency-desk': muxShot('zev-agency-desk', 'xeU01uLX021jiGo4300UmaaokyoOAaCOiyhgtF4B6FEiHQ', '85% 50%'),
};
