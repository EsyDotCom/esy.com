/* The photoreal hero shots (2026-10-09), made through api.esy.com by
 * scripts/generate-hero-loops.mjs. Each is a still (a small webp kept in the
 * repo, shown first and to anyone with reduced motion) and an 8-second loop
 * that stays in Esy's own storage, so 23MB of video never enters the repo.
 * `focus` is where the shot's subject sits, so phones crop toward it. */

const STILLS = '/images/hero-loops';
const loop = (run: string) => `https://images.esy.com/artifacts/tool/${run}/step-2.mp4`;

export type HeroShot = { video: string; poster: string; focus: string };

const shot = (id: string, run: string, focus: string): HeroShot => ({ video: loop(run), poster: `${STILLS}/${id}.webp`, focus });

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
};
