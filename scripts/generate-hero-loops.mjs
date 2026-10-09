#!/usr/bin/env node

/**
 * Generate the photoreal hero backgrounds for /prototypes/hero-backdrop/
 * (2026-10-09), through Esy's own API: a still per concept on
 * `generate-photoreal-image`, then a slow shot from that still on
 * `generate-photoreal-video`. Same run/poll approach as
 * generate-newsletter-covers.mjs.
 *
 * Zev's brief: professional, elegant and subtle, matching what the site is
 * for (learning to build AI marketing systems). Real places and real light,
 * no people, no symbols, nothing gimmicky. The headline sits on the LEFT, so
 * every still keeps the left side calm and dark.
 *
 * Usage:
 *   node scripts/generate-hero-loops.mjs stills            # every missing still
 *   node scripts/generate-hero-loops.mjs loops             # every missing loop (needs its still)
 *
 * Stills land in public/images/hero-loops/. Loops stay in Esy's storage: the
 * script records each loop's URL in scripts/hero-loops.runs.json, and
 * src/components/EducationHero/heroLoops.ts points the site at it.
 *   node scripts/generate-hero-loops.mjs stills --only desk --force
 *   node scripts/generate-hero-loops.mjs loops --only desk,city --force   # several, one process
 *
 * Cost (2026-10-09): a still is capped at $0.75; a loop at 720p 16:9 is
 * $0.3024/s, so 8s is about $2.42.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/images/hero-loops');
const API_BASE = process.env.ESY_API_URL || 'https://api.esy.com';

/* The key lives in the API repo's agent env, never in this repo. */
function apiKey() {
  if (process.env.ESY_API_KEY) return process.env.ESY_API_KEY;
  let dir = ROOT;
  for (let i = 0; i < 10; i += 1) {
    const file = path.join(dir, 'esy/server/api.esy.com/.env.agent');
    if (fs.existsSync(file)) {
      const line = fs.readFileSync(file, 'utf8').split('\n').find((l) => l.startsWith('ESY_API_KEY='));
      if (line) return line.slice('ESY_API_KEY='.length).trim();
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error('No ESY_API_KEY in the environment, and none in api.esy.com/.env.agent above this repo');
}

/* One art direction for every shot, so they read as one site. Round 8 let
 * people and charts in, but only where a concept asks (`people`, `charts`):
 * people are real and unposed, seen from behind; charts are shapes, never words. */
const LOOK =
  'Quiet, high-end editorial photography. Deep navy shadows with cool teal-blue light and a little warm neutral, low contrast, ' +
  'restrained colour, fine grain.';
const artDirectionOf = (c) => [
  LOOK,
  c.people
    ? 'Candid and documentary: real people at work in ordinary clothes, seen from behind or turned away, natural unposed posture, nobody looking at the camera.'
    : 'Nothing staged, no people, no hands.',
  c.charts
    ? 'Screens show charts and dashboards as clear shapes and lines, with no legible words, numbers or logos.'
    : 'No readable screens.',
  'No text, no logos, no symbols or props placed for meaning.',
].join(' ');

const PURPOSE = 'full-width website hero background behind a white headline on the left, for a site that teaches people to build AI marketing systems';

/* Zev from his reference sheet (sheet B, edit-image run-ee4122a9), walking
 * away from the camera: what he looks like from behind, and how the camera
 * follows so the loop never jumps him from far to near. */
const SHEET_B = 'https://images.esy.com/artifacts/tool/run-ee4122a9/step-1.webp';
const ZEV_WALKING =
  'The same short black hair in a tight low fade, the same deep brown skin, the same broad, solid build, the same plain charcoal-grey crewneck sweater, with dark trousers and dark shoes. ' +
  'The back of his head and neck are smooth and natural: no creases, folds, ridges or lines across the nape or the back of the head. No signage, no logos, no labels anywhere.';
const WALK_MOTION =
  'The camera follows behind him at a steady, constant distance, a slow smooth push forward that keeps him the same size in frame; he walks at an unhurried, steady pace, his head level and facing forward the whole time; status lights blink softly along the racks.';
const WALK_CONSTRAINTS =
  'he stays seen from behind and never turns his head or face, he stays the same size in frame, no camera shake, no cuts, no new people, no signage, no logos, no legible text, no creases or folds on the neck or the back of the head';

/* The five concepts (Zev picked "elegant and subtle", 2026-10-09). `motion`
 * is the one thing that happens in the shot, for the video step. */
export const CONCEPTS = [
  {
    id: 'desk',
    name: 'The desk at dusk',
    prompt: 'A clean, minimal wooden desk beside a tall floor-to-ceiling window at blue hour, an open laptop on the right side of the desk whose screen glows softly and is out of focus, a city softly blurred beyond the glass. The left of the frame is the dark, empty wall and window edge.',
    register: 'editorial',
    motion: 'The light outside the window fades very slowly toward night while the laptop glow stays steady; the camera is almost still, with the faintest slow push in.',
  },
  {
    id: 'architecture',
    name: 'Light on architecture',
    prompt: 'A minimal modern interior of smooth concrete and glass, late low sunlight entering from the right and casting long, crisp, parallel window shadows across a pale concrete wall and floor on the right half. The left of the frame falls into deep, even shadow.',
    register: 'editorial',
    motion: 'The sunlight shadows slide very slowly across the wall as the sun moves; nothing else moves and the camera is locked off.',
  },
  {
    id: 'city',
    name: 'City through glass',
    prompt: 'A night city seen through a tall window, completely out of focus: large soft bokeh lights in navy, teal and a little warm white filling the right side, faint reflections on the glass. The left side is dark glass with almost no light.',
    register: 'editorial',
    motion: 'The out-of-focus city lights shimmer and breathe gently, a few drift slowly as traffic moves; the camera is locked off.',
  },
  {
    id: 'glass',
    name: 'Dark glass, moving light',
    prompt: 'A macro photograph of a dark, smooth surface where black glass meets brushed dark metal, a single soft band of cool teal-white light lying across the right side of the surface. Most of the frame, especially the left, is near-black.',
    register: 'editorial',
    motion: 'The soft band of light travels very slowly across the surface from right to left and softens as it goes; the camera is locked off.',
  },
  {
    id: 'studio',
    name: 'The studio, early morning',
    prompt: 'A pristine, premium modern design studio at first daylight: a long pale oak desk with two slim monitors far back on the right, both out of focus and dark, polished concrete floor, no cables or clutter, very fine haze, a soft beam of early light falling from a high window on the right. The left of the frame is a calm, dim, smooth plaster wall. Immaculate, quiet, expensive.',
    register: 'editorial',
    motion: 'The early morning light warms and strengthens very gradually while fine dust drifts slowly through the beam; the camera is locked off.',
  },
  // Round 3 (2026-10-09): Zev liked B6 (the desk at dusk behind his
  // portrait), so five more in that feel, two of them real skylines he
  // named (New York, Miami). The portrait sits in front of each.
  {
    id: 'desk-night',
    name: 'Night office',
    prompt: 'A refined home office late at night: a dark walnut desk on the right with a laptop glowing softly, a warm brass desk lamp casting a small pool of light, a tall bookshelf in shadow, the city lights through a large window behind. The left of the frame is a dark, quiet wall.',
    register: 'editorial',
    motion: 'The city lights beyond the window twinkle softly and the lamp light stays steady; the camera is almost still, with the faintest slow push in.',
  },
  {
    id: 'desk-highrise',
    name: 'High floor',
    prompt: 'A corner office on a high floor at dusk: floor-to-ceiling windows with a wide city skyline turning blue, a clean desk on the right with two slim monitors glowing softly and out of focus, a leather chair. The left of the frame is a darker stretch of window and wall.',
    register: 'editorial',
    motion: 'Lights come on one by one across the skyline as dusk deepens; the camera is locked off.',
  },
  {
    id: 'desk-loft',
    name: 'Loft',
    prompt: 'A loft workspace in the evening: exposed brick and tall black steel-framed windows, a long desk on the right with a monitor glowing softly, a couple of large green plants, city lights outside. The left of the frame is a dark brick wall in shadow.',
    register: 'editorial',
    motion: 'The plants sway very slightly in a soft draught and the window light dims slowly into evening; the camera is locked off.',
  },
  {
    id: 'city-nyc',
    name: 'New York',
    prompt: 'A clean, minimal workspace inside a high-floor office in Manhattan: a wooden desk on the right with an open laptop glowing softly and out of focus, a tall floor-to-ceiling window behind it with the Manhattan skyline at blue hour, the Empire State Building and Midtown towers lighting up. The left of the frame is the dark wall and window edge. No legible signage.',
    register: 'editorial',
    motion: 'Lights come on slowly across the Manhattan towers as dusk deepens; the camera is almost still, with the faintest slow push in.',
  },
  {
    id: 'city-miami',
    name: 'Miami',
    prompt: 'A clean, minimal workspace inside a high-floor office in Miami: a wooden desk on the right with an open laptop glowing softly and out of focus, a tall floor-to-ceiling window behind it with the Brickell towers and Biscayne Bay at dusk, a soft pink and blue sky reflected on calm water. The left of the frame is the dark wall and window edge. No legible signage.',
    register: 'editorial',
    motion: 'The dusk sky deepens slowly and the tower lights shimmer on the bay; the camera is almost still, with the faintest slow push in.',
  },
  // Round 4 (2026-10-09): Zev asked for an open office or a data center.
  // Agents work while everyone's gone, so the office is empty, its screens
  // still working; the data center is a quiet building, not server aisles.
  {
    id: 'office-night',
    name: 'Open office, after hours',
    prompt: 'A long, modern open-plan office floor at night with nobody in it: rows of clean empty desks and chairs, a few monitors still on along the rows on the right, their screens softly glowing with blurred, unreadable charts and dashboards, the city lights through tall windows at the far end. Calm, expensive, minimal. The left of the frame is darker: the near end of the floor and a dim wall.',
    register: 'editorial',
    motion: 'The monitors along the rows update one by one with soft changes of glow, as if work is still happening; the camera is almost still, with the faintest slow push down the room.',
  },
  {
    id: 'office-lights',
    name: 'Open office, last light',
    prompt: 'A long, modern open-plan office floor at dusk with nobody in it: rows of empty desks, the overhead lights still on over the far rows, monitors glowing softly on several desks on the right, a blue dusk sky and city through tall windows. Calm and minimal. The left of the frame is the darker near end of the floor.',
    register: 'editorial',
    motion: 'The overhead lights switch off slowly, row by row, from the near end to the far end, while the monitors on the desks stay on; the camera is locked off.',
  },
  {
    id: 'datacenter-dusk',
    name: 'Data center at dusk',
    prompt: 'A long, low, modern data center building in open countryside at dusk, clean pale facade with a quiet row of rooftop cooling units on the right, soft white and cool teal lights along the building, a wet concrete apron reflecting the lights, a deep blue sky. No signage, no logos, no people, no vehicles. The left of the frame is open dark field and sky.',
    register: 'editorial',
    motion: 'Faint vapor drifts slowly up from the rooftop cooling units and the building lights pulse very gently; the camera is locked off.',
  },
  {
    id: 'datacenter-aerial',
    name: 'Data center from above',
    prompt: 'An aerial view at night of a modern data center campus surrounded by dark forest: long low buildings with large rooftop fans, soft white and teal perimeter lights, quiet empty roads, the campus on the right side of the frame. No signage, no logos, no people. The left of the frame is dark forest.',
    register: 'editorial',
    motion: 'A slow aerial drift forward over the campus while the rooftop fans turn slowly; no other movement.',
  },
  // Round 8 (2026-10-09): Zev asked to redo B33 with analytics and search
  // dashboards on its screens, and for real people at work: a dev from
  // behind, and a marketing and engineering team. Shot like a documentary
  // (locked-off camera, ordinary light), never the dark-room hacker cliché.
  {
    id: 'office-dashboards',
    name: 'Open office, after hours, dashboards',
    charts: true,
    prompt: 'A long, modern open-plan office floor at night with nobody in it: rows of clean empty desks and chairs running away from the camera, the city lights through tall windows at the far end. On the right, the two nearest desks are close to the camera and their large monitors are sharp and bright, showing web analytics dashboards: a white dashboard with a row of summary tiles across the top and a large blue line chart of traffic over time with a soft shaded area beneath it; a search performance report on a white panel with two smooth lines, one blue and one purple, rising across the months; small bar charts and a donut chart. Monitors further down the rows show the same kind of charts, softer. The left of the frame is darker: the near end of the floor and a dim wall.',
    register: 'editorial',
    // The first cut pushed down the room and lost the dashboards by second 4: the camera is pinned now.
    motion: 'Static locked-off camera that holds the reference photograph\'s exact framing for the whole shot, the two nearest monitors always in frame. On those monitors the chart lines extend a little to the right and the summary tiles refresh, as if live data is arriving; the monitors further down the rows change softly; city lights twinkle faintly beyond the windows.',
    constraints: 'no camera movement, no push in, no dolly, no zoom, no people, no hands, no camera shake, no cuts, no new objects appearing, no legible words or logos on the screens',
  },
  {
    id: 'dev-window',
    name: 'Dev at the window desk',
    people: true,
    prompt: 'From behind, over the shoulder: a software engineer working late at a clean desk beside a floor-to-ceiling window on a high floor at dusk. They sit in the right half of the frame, seen from behind and a little to the side, short dark hair, a plain charcoal crewneck sweater, relaxed natural posture, hands on a keyboard. Two monitors in front of them show a dark code editor with soft, unreadable lines of code in muted colours. Beyond the glass, a city at blue hour, softly out of focus. A coffee cup and nothing else on the desk. The left of the frame is the dark wall and window edge.',
    register: 'editorial',
    motion: 'The engineer types steadily, pauses, and leans back slightly in the chair before typing again; lines of code scroll gently on the monitor; outside, city lights come on as dusk deepens; the camera is locked off.',
    constraints: 'the person stays seen from behind and never turns to the camera; no camera shake, no cuts, no new people or objects, no legible words or logos',
  },
  {
    id: 'dev-output',
    name: 'Dev, the work appears',
    people: true,
    charts: true,
    prompt: 'From behind, a little wider: a software engineer at a desk with two large monitors in a quiet modern office at dusk, the whole desk in the right half of the frame. The left monitor shows a dark code editor and a terminal with soft, unreadable lines. The right monitor shows a clean light grid of finished marketing work arranged as tiles: web page layouts, product photos and small charts. The engineer sits between the monitors, seen from behind, plain dark sweater, natural posture, hands on the keyboard. Tall windows with a dusk city beyond, out of focus. The left of the frame is a dim wall and the darker edge of the room.',
    register: 'editorial',
    motion: 'The engineer types on the keyboard; on the right monitor, new tiles fade into the grid one at a time, finished pages and images arriving; the camera is locked off.',
    constraints: 'the person stays seen from behind and never turns to the camera; no camera shake, no cuts, nothing new appears except tiles on the right monitor, no legible words or logos',
  },
  {
    id: 'team-floor',
    name: 'The floor at work',
    people: true,
    charts: true,
    prompt: 'A modern open-plan office in the early evening, still at work: four or five people at their desks across the right half of the frame, a marketing and engineering team in ordinary clothes, seen from behind and in soft profile. Their monitors show analytics dashboards with line and bar charts, and dark code editors. Warm desk lamps and cool monitor light, tall windows with a blue dusk city beyond. Candid and documentary, nobody posing. The left of the frame is a darker, empty stretch of the floor near the camera.',
    register: 'editorial',
    // The first cut re-framed to a close-up of one man in profile: the whole room is the subject.
    motion: 'Static locked-off camera that holds the reference photograph\'s exact wide framing of the whole floor for the entire shot; the subject is the room, not any one person. Everyone keeps working at their desks with small natural movements: typing, scrolling, the standing colleague leaning a little closer to the screen.',
    constraints: 'no camera movement, no push in, no zoom, no re-framing, no close-ups, nobody turns to the camera, no camera shake, no cuts, no new people or objects, no legible words or logos',
  },
  {
    id: 'team-desk',
    name: 'Two at a dashboard',
    people: true,
    charts: true,
    prompt: 'Two colleagues at one desk in a modern office at dusk, in the right half of the frame, seen from behind and a little to the side: one seated at a large monitor showing a web analytics dashboard with a rising blue line chart and a row of summary tiles, the other standing beside the chair, leaning in with one hand on the desk, looking at the screen. Ordinary work clothes, candid natural posture. Beyond them, tall windows and a softly blurred city at blue hour. The left of the frame is the darker, empty side of the room.',
    register: 'editorial',
    motion: 'The seated colleague scrolls and the chart on the monitor updates; the standing colleague nods slightly and leans a little closer to the screen; small natural movements only; the camera is locked off.',
    constraints: 'neither person turns to the camera; no camera shake, no cuts, no new people or objects, no legible words or logos',
  },
  // Round 9 (2026-10-09): B37's dev becomes Zev, so the one person on screen is
  // the one who signs the hero. Built from a photoreal reference sheet edited
  // from his original headshot (edit-image run-ee4122a9, "sheet B": front,
  // three-quarter, profile, and three views from behind). His screens: code on
  // the left (the build), search performance climbing on the right (the result).
  {
    id: 'zev-window',
    name: 'Zev at the window desk (from the sheet)',
    people: true,
    charts: true,
    editFrom: 'https://images.esy.com/artifacts/tool/run-ee4122a9/step-1.webp',
    prompt: 'Using the man in this reference sheet, make ONE new single photograph, landscape 4:3, not a grid and with no panels: over the shoulder, from behind, he works late at a clean desk beside a floor-to-ceiling window on a high floor at dusk. He sits in the right half of the frame, seen from behind and a little to his right: the back of his head, his right ear and his shoulders visible; the same short black hair in a tight low fade with a sharp line-up, the same deep brown skin, the same broad, solid build, the same plain charcoal-grey crewneck sweater; hands on a keyboard, relaxed natural posture. Two monitors on the desk: the left one shows a dark code editor with soft, unreadable lines of code; the right one shows a search performance report on a white panel, two smooth lines, one blue and one purple, climbing steeply across the months, with a row of summary tiles above. A coffee cup and nothing else on the desk. Beyond the glass, a city at blue hour, softly out of focus. The left third of the frame is the dark wall and window edge, calm and empty.',
    register: 'editorial',
    motion: 'Static locked-off camera holding the reference framing. He types steadily, pauses, and leans back slightly in the chair; on the right monitor the blue and purple lines extend a little further up; outside, city lights come on as dusk deepens.',
    constraints: 'no camera movement, no zoom, he stays seen from behind and never turns his face to the camera, no camera shake, no cuts, no new people or objects, no legible words or logos',
  },
  {
    id: 'zev-window-edit',
    name: 'Zev at the window desk (B37 edited)',
    people: true,
    charts: true,
    keepLook: true,
    editFrom: 'https://images.esy.com/artifacts/photo-image/run-895a8b32/image.webp',
    prompt: 'Change only two things in this photograph: (1) the man at the desk becomes a Black man with deep brown skin, short black hair in a tight low fade with a sharp line-up at the nape, and a broad, solid build, still seen from behind in the same pose, the same charcoal crewneck sweater, hands on the keyboard; (2) the right monitor now shows a search performance report on a white panel: two smooth lines, one blue and one purple, climbing steeply across the months, with a row of summary tiles above, no legible words or logos. Keep everything else exactly the same: the framing, the window, the city at dusk, the left monitor\'s code, the desk, the cup and the light. Photorealistic.',
    register: 'editorial',
    motion: 'Static locked-off camera holding the reference framing. He types steadily, pauses, and leans back slightly in the chair; on the right monitor the blue and purple lines extend a little further up; outside, city lights come on as dusk deepens.',
    constraints: 'no camera movement, no zoom, he stays seen from behind and never turns his face to the camera, no camera shake, no cuts, no new people or objects, no legible words or logos',
  },
  // Round 10 (2026-10-09): Zev saw lines and a crease across the back of his
  // neck and head, and the side of his face looked off when he turned to the
  // window. Two fresh stills from sheet B (still two edits from the headshot,
  // never an edit of an edit), head turned toward the screens, away from the
  // camera; then videos where the head stays still, since leaning back and
  // looking around are what fold the neck and show the face.
  {
    id: 'zev-desk-a',
    name: 'Zev at the window desk, head to the screens',
    people: true,
    charts: true,
    editFrom: 'https://images.esy.com/artifacts/tool/run-ee4122a9/step-1.webp',
    prompt: 'Using the man in this reference sheet, make ONE new single photograph, landscape 4:3, not a grid and with no panels: from behind and a little to his right, he works late at a clean desk beside a floor-to-ceiling window on a high floor at dusk. He sits in the right half of the frame, his head turned slightly toward the monitors and away from the camera, so we see the back of his head, his right ear and only the very edge of his jaw, none of his face. The same short black hair in a tight low fade, the same deep brown skin, the same broad, solid build, the same plain charcoal-grey crewneck sweater; hands on a keyboard, upright relaxed posture, head level. The back of his head and neck are smooth and natural: no creases, folds, ridges or lines across the nape or the back of the head, the fade blending softly into the skin with no hard line. Two monitors on the desk: the left one shows a dark code editor with soft, unreadable lines of code; the right one shows a search performance report on a white panel, two smooth lines, one blue and one purple, climbing steeply across the months, with a row of summary tiles above. A coffee cup and nothing else on the desk. Beyond the glass, a city at blue hour, softly out of focus. The left third of the frame is the dark wall and window edge, calm and empty.',
    register: 'editorial',
    motion: 'Static locked-off camera holding the reference framing. He types steadily, his head still and facing the monitors the whole time; only his hands and shoulders move a little. On the right monitor the blue and purple lines extend a little further up; outside, city lights come on as dusk deepens.',
    constraints: 'no camera movement, no zoom, he never turns his head or face, he does not lean back or look down, no creases or folds on the neck or the back of the head, no camera shake, no cuts, no new people or objects, no legible words or logos',
  },
  {
    id: 'zev-desk-b',
    name: 'Zev at the corner desk, from behind and above',
    people: true,
    charts: true,
    editFrom: 'https://images.esy.com/artifacts/tool/run-ee4122a9/step-1.webp',
    prompt: 'Using the man in this reference sheet, make ONE new single photograph, landscape 4:3, not a grid and with no panels: seen directly from behind and slightly above, he works late at the right end of a clean desk beside a floor-to-ceiling window on a high floor at dusk, both monitors to his left and angled toward him, so they are fully visible beside him. We see the back of his head, both ears and his shoulders, none of his face. The same short black hair in a tight low fade, the same deep brown skin, the same broad, solid build, the same plain charcoal-grey crewneck sweater; hands on a keyboard, upright relaxed posture, head level. The back of his head and neck are smooth and natural: no creases, folds, ridges or lines across the nape or the back of the head, the fade blending softly into the skin with no hard line. The nearer monitor shows a search performance report on a white panel, two smooth lines, one blue and one purple, climbing steeply across the months, with a row of summary tiles above; the farther one shows a dark code editor with soft, unreadable lines. A coffee cup and nothing else on the desk. Beyond the glass, a city at blue hour, softly out of focus. The left third of the frame is the dark wall and window edge, calm and empty.',
    register: 'editorial',
    motion: 'Static locked-off camera holding the reference framing. He types steadily, his head still and facing the monitors the whole time; only his hands and shoulders move a little. On the search monitor the blue and purple lines extend a little further up; outside, city lights come on as dusk deepens.',
    constraints: 'no camera movement, no zoom, he never turns his head or face, he does not lean back or look down, no creases or folds on the neck or the back of the head, no camera shake, no cuts, no new people or objects, no legible words or logos',
  },
  // B38 as Zev too, and its second screen made his real story: the "30,000+
  // pages" line as a grid of finished clip-art pages filling in.
  {
    id: 'zev-output',
    name: 'Zev, the pages appear',
    people: true,
    charts: true,
    editFrom: 'https://images.esy.com/artifacts/tool/run-ee4122a9/step-1.webp',
    prompt: 'Using the man in this reference sheet, make ONE new single photograph, landscape 4:3, not a grid and with no panels: seen from behind and slightly above, he works late at a desk with two large monitors side by side in a quiet modern office at dusk, the whole desk in the right half of the frame, both screens fully visible above his shoulders. We see the back of his head, both ears and his shoulders, none of his face; head level, facing the screens. The same short black hair in a tight low fade, the same deep brown skin, the same broad, solid build, the same plain charcoal-grey crewneck sweater; hands on the keyboard. The back of his head and neck are smooth and natural: no creases, folds, ridges or lines across the nape or the back of the head. The left monitor shows a dark code editor with soft, unreadable lines. The right monitor shows a library of finished web pages as a clean light grid of tiles: each tile is a simple white page with a bright, friendly clip-art illustration (an apple, a sun, a cat, a flower, a rocket, a tree, a house, a butterfly) under a thin headline bar, a few tiles at the end still empty. Tall windows with a dusk city beyond, out of focus. The left third of the frame is a dim wall and the darker edge of the room, calm and empty.',
    register: 'editorial',
    motion: 'Static locked-off camera holding the reference framing. He types steadily, his head still and facing the screens the whole time; only his hands and shoulders move a little. On the right monitor, new page tiles fade into the empty places in the grid one at a time.',
    constraints: 'no camera movement, no zoom, he never turns his head or face, he does not lean back or look down, no creases or folds on the neck or the back of the head, no camera shake, no cuts, nothing new appears except page tiles on the right monitor, no legible words or logos',
  },
  // A second video take of zev-desk-a's still, with a different small action.
  {
    id: 'zev-desk-a2',
    name: 'Zev at the window desk, scrolling',
    stillOf: 'zev-desk-a',
    people: true,
    charts: true,
    register: 'editorial',
    motion: 'Static locked-off camera holding the reference framing. He types for a moment, then moves his right hand to the mouse and scrolls slowly, his head still and facing the monitors the whole time. On the right monitor the blue and purple lines extend a little further up; outside, city lights come on as dusk deepens.',
    constraints: 'no camera movement, no zoom, he never turns his head or face, he does not lean back or look down, no creases or folds on the neck or the back of the head, no camera shake, no cuts, no new people or objects, no legible words or logos',
  },
  // Round 11 (2026-10-09): Zev walking inside a data center, back only.
  {
    id: 'zev-dc-aisle',
    name: 'Zev in the cold aisle',
    people: true,
    editFrom: SHEET_B,
    prompt: `Using the man in this reference sheet, make ONE new single photograph, landscape 4:3, not a grid and with no panels: he walks away from the camera down a long cold aisle inside a modern data center, seen fully from behind, mid-stride, head to feet, in the right half of the frame. Tall black server racks line both sides with rows of tiny teal and white status lights, a clean pale raised floor, cool white light strips overhead; the aisle runs into the distance just right of center. ${ZEV_WALKING} The left third of the frame is the near rack row in deep shadow, calm and dark.`,
    register: 'editorial',
    motion: WALK_MOTION,
    constraints: WALK_CONSTRAINTS,
  },
  {
    id: 'zev-dc-catwalk',
    name: 'Zev on the catwalk',
    people: true,
    editFrom: SHEET_B,
    prompt: `Using the man in this reference sheet, make ONE new single photograph, landscape 4:3, not a grid and with no panels: he walks away from the camera along a steel mezzanine walkway on the side of a vast, dim data hall, seen fully from behind, mid-stride, head to feet, in the right half of the frame. Below him and to the right, long rows of server racks with teal and white status lights stretch into the distance under cable trays. ${ZEV_WALKING} The left third of the frame is the dark wall of the hall, calm and empty.`,
    register: 'editorial',
    motion: WALK_MOTION,
    constraints: WALK_CONSTRAINTS,
  },
  {
    id: 'zev-dc-glass',
    name: 'Zev in the glass corridor',
    people: true,
    editFrom: SHEET_B,
    prompt: `Using the man in this reference sheet, make ONE new single photograph, landscape 4:3, not a grid and with no panels: he walks away from the camera down a glass-walled corridor through a modern data center, seen fully from behind, mid-stride, head to feet, slightly right of center. Behind the glass on the right, rows of server racks glow with teal and white status lights; on the left, a dark matte wall; soft light from the racks falls across the polished floor. ${ZEV_WALKING} The left third of the frame is the dark wall, calm and empty.`,
    register: 'editorial',
    motion: WALK_MOTION,
    constraints: WALK_CONSTRAINTS,
  },
  // B38 redone around Zev's real product: os.esy.com/agency/search on his
  // screen. Models garble UI, so the screen in these stills is a placeholder;
  // a real screenshot of the page is composited onto it before the video step
  // (the composite is what runs.json records as the still).
  {
    id: 'zev-agency-close',
    name: 'Zev over the shoulder, Esy Search on screen',
    people: true,
    editFrom: SHEET_B,
    prompt: 'Using the man in this reference sheet, make ONE new single photograph, landscape 4:3, not a grid and with no panels: a close over-the-shoulder view from behind him at a clean desk at dusk. One large thin-bezel monitor faces the camera almost straight on and fills the middle of the frame, from about a third of the way in to about four fifths across; its screen is evenly lit plain white with nothing on it. He sits in the right foreground, seen from behind and slightly to his right: the back of his head, his right ear and his shoulder, softly out of focus at the right edge of the frame and never covering the screen; head level, facing the screen; the same short black hair in a tight low fade, the same deep brown skin, the same charcoal-grey crewneck sweater. The back of his head and neck are smooth and natural, with no creases or lines. Beyond the monitor, a floor-to-ceiling window with a blue-hour city softly out of focus. The left third of the frame is a dark wall, calm and empty.',
    register: 'editorial',
    motion: 'Static locked-off camera holding the reference framing. The page on the monitor stays exactly as it is, sharp and still. He sits still, facing the screen, his right hand moving slightly on the mouse; outside, city lights come on as dusk deepens.',
    constraints: 'no camera movement, no zoom, the monitor content does not change, scroll or redraw, he never turns his head or face, no creases or folds on the neck, no camera shake, no cuts, no new people or objects',
  },
  {
    id: 'zev-agency-desk',
    name: 'Zev at the desk, Esy Search on screen',
    stillOf: 'zev-agency-desk',
    people: true,
    register: 'editorial',
    motion: 'Static locked-off camera holding the reference framing. He types steadily, his head still and facing the screens the whole time; only his hands and shoulders move a little. The page on the right monitor stays exactly as it is, sharp and still.',
    constraints: 'no camera movement, no zoom, the right monitor content does not change, scroll or redraw, he never turns his head or face, he does not lean back or look down, no creases or folds on the neck, no camera shake, no cuts, no new people or objects',
  },
  // B44 re-shot: in the first close-up the monitor sat center-left, under the
  // hero's copy panel. Over his LEFT shoulder instead: his head fades behind the
  // copy on the left, the screen is whole on the right.
  {
    id: 'zev-agency-shoulder',
    name: 'Zev over the left shoulder, Esy Search on screen',
    people: true,
    editFrom: SHEET_B,
    prompt: 'Using the man in this reference sheet, make ONE new single photograph, landscape 4:3, not a grid and with no panels: an over-the-shoulder view from behind his left shoulder at a clean desk at dusk. His head and left shoulder are in the left-center foreground, seen from behind, softly out of focus, his head turned slightly to the right toward the screen so none of his face shows; the same short black hair in a tight low fade, the same deep brown skin, the same charcoal-grey crewneck sweater; the back of his head and neck smooth and natural, with no creases or lines. Past him, on the right half of the frame, one large thin-bezel monitor faces him at a slight angle, fully visible from about the middle of the frame to near the right edge, nothing covering it; its screen is evenly lit plain white with nothing on it. Beyond the monitor, a floor-to-ceiling window with a blue-hour city softly out of focus. The far left of the frame is a dark wall.',
    register: 'editorial',
    motion: 'Static locked-off camera holding the reference framing. The page on the monitor stays exactly as it is, sharp and still. He sits still, facing the screen, his head level; only his shoulders move slightly with his breathing; outside, city lights come on as dusk deepens.',
    constraints: 'no camera movement, no zoom, the monitor content does not change, scroll or redraw, nothing passes in front of the monitor, he never turns his head or face, no creases or folds on the neck, no camera shake, no cuts, no new people or objects',
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(pathname, init = {}) {
  const res = await fetch(`${API_BASE}${pathname}`, {
    ...init,
    headers: { Authorization: `Bearer ${apiKey()}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`${init.method || 'GET'} ${pathname} → ${res.status}: ${body.slice(0, 400)}`);
  return body ? JSON.parse(body) : null;
}

/** Start a run and wait for it to settle (video can take several minutes). */
async function run(templateId, intake) {
  const started = await api('/v1/runs', { method: 'POST', body: JSON.stringify({ templateId, intake }) });
  const id = started.id || started.runId;
  for (let i = 0; i < 300; i += 1) {
    await sleep(5000);
    const state = await api(`/v1/runs/${id}`);
    const status = (state.status || '').toLowerCase();
    if (['succeeded', 'completed', 'complete', 'success'].includes(status)) return state;
    if (['failed', 'error', 'cancelled', 'canceled'].includes(status)) {
      throw new Error(`run ${id} ${status}: ${state.error || state.failureReason || 'no reason given'}`);
    }
  }
  throw new Error(`run ${id} did not settle in 25 minutes`);
}

/** Every URL the run produced, the render step's first. */
function urlsOf(r) {
  return [
    ...(r.steps || []).flatMap((s) => (s.outputs || []).map((o) => o.url || o.videoUrl)),
    r.artifact?.url, r.artifact?.videoUrl, r.artifact?.imageUrl,
    ...(r.artifacts || []).map((a) => a.url || a.videoUrl || a.imageUrl),
  ].filter(Boolean);
}

const costOf = (r) => Number(r.totalCosts?.actualUsd ?? r.totalCosts?.estimatedUsd ?? 0);
const metaFile = path.join(ROOT, 'scripts/hero-loops.runs.json');
const readMeta = () => (fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, 'utf8')) : {});
const writeMeta = (m) => fs.writeFileSync(metaFile, `${JSON.stringify(m, null, 2)}\n`);

async function still(c) {
  // A concept with `editFrom` edits that image (e.g. Zev's reference sheet) instead of rendering from words.
  const r = c.editFrom
    ? await run('edit-image', { sourceUrl: c.editFrom, instruction: c.keepLook ? c.prompt : `${c.prompt} ${artDirectionOf(c)}`, quality: 'high' })
    : await run('generate-photoreal-image', {
      prompt: c.prompt, artDirection: artDirectionOf(c), purpose: PURPOSE,
      negativeSpace: 'left', aspectRatio: '4:3', quality: 'high',
    });
  const url = urlsOf(r).find((u) => /\.(webp|png|jpe?g)(\?|$)/i.test(u)) || urlsOf(r)[0];
  if (!url) throw new Error(`no image on run ${r.id}`);
  fs.writeFileSync(path.join(OUT_DIR, `${c.id}.webp`), Buffer.from(await (await fetch(url)).arrayBuffer()));
  return { runId: r.id, url, cost: costOf(r) };
}

async function loop(c, stillUrl) {
  const r = await run('generate-photoreal-video', {
    referenceImageUrl: stillUrl, motionBrief: c.motion, register: c.register,
    durationSeconds: '8', aspectRatio: '16:9', resolution: '720p', generateAudio: false,
    constraints: c.constraints || 'no people, no hands, no camera shake, no cuts, no new objects appearing',
  });
  const url = urlsOf(r).find((u) => /\.(mp4|webm|mov)(\?|$)/i.test(u)) || urlsOf(r)[0];
  if (!url) throw new Error(`no video on run ${r.id}`);
  return { runId: r.id, url, cost: costOf(r) };
}

async function main() {
  const stage = process.argv[2];
  if (!['stills', 'loops'].includes(stage)) throw new Error('Say which: stills or loops');
  const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;
  const force = process.argv.includes('--force');
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const meta = readMeta();
  // A still is done when its file exists; a loop when its URL is recorded.
  const done = (c) => (stage === 'stills' ? fs.existsSync(path.join(OUT_DIR, `${c.id}.webp`)) : !!meta[c.id]?.loop?.url);
  // A concept with `stillOf` has no still of its own: it is another video take of that concept's still.
  const queue = CONCEPTS.filter((c) => (!only || only.split(',').includes(c.id)) && !(stage === 'stills' && c.stillOf) && (force || !done(c)));
  if (!queue.length) return console.log('Nothing to render.');
  console.log(`Rendering ${queue.length} ${stage} via ${API_BASE}…`);

  // All at once: each run is independent, and video runs take minutes.
  const results = await Promise.allSettled(queue.map(async (c) => {
    const t = Date.now();
    const m = meta[c.id] || {};
    const stillUrl = c.stillOf ? meta[c.stillOf]?.still?.url : m.still?.url;
    if (stage === 'loops' && !stillUrl) throw new Error(`${c.id}: render its still first`);
    const out = stage === 'stills' ? await still(c) : await loop(c, stillUrl);
    meta[c.id] = { ...m, [stage === 'stills' ? 'still' : 'loop']: out };
    // Merge this one entry into the file as soon as it lands, so two script
    // runs at once (or a crash later in this one) never drop each other's runs.
    const latest = readMeta();
    writeMeta({ ...latest, [c.id]: { ...latest[c.id], ...meta[c.id] } });
    console.log(`  ${c.id}: ${((Date.now() - t) / 1000).toFixed(0)}s, $${out.cost.toFixed(3)} (run ${out.runId})`);
    return out.cost;
  }));
  results.forEach((r, i) => r.status === 'rejected' && console.log(`  ${queue[i].id}: FAILED ${r.reason?.message}`));
  const spend = results.reduce((s, r) => s + (r.status === 'fulfilled' ? r.value : 0), 0);
  console.log(`Done. Spend: $${spend.toFixed(2)}.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
