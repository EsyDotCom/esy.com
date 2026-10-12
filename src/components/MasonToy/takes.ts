/* Mason as a toy (2026-10-11): after the Camouflage covers, Zev liked Mason as
   a felt toy (O) and a vinyl toy (N). This prototype makes concept pieces with
   each and puts each into the footer world, so the brand can pick one.

   A · Felt, reef     the footer's reef as a needle-felted diorama
   B · Felt, shelf    a shelf at night with the camouflage editions
   C · Vinyl, reef    the reef as a glossy toy playset
   D · Vinyl, shelf   the shelf, in vinyl
   F · Vinyl in use   round 3: vinyl against flocked on newsletter covers and
   G · Flocked in use YouTube thumbnails (felt is out); footer: the shelf
   E · Flocked, shelf round 2: vinyl's crisp cuts (which match the logo) under
                      felt-like velvet, the finish designer toys call flocked

   Every picture is an edit-image run on api.esy.com: first a studio shot made
   from his drawn figure, then each scene from that shot, so he stays himself.
   The whole scene is made of the material too (a felted world, a vinyl
   playset), not only Mason. */

export type Material = 'felt' | 'toy' | 'flocked';
export type World = 'reef' | 'shelf' | 'simul' | 'chain' | 'threads' | 'gate' | 'essai' | 'assembly' | 'livereef' | 'pc-reef' | 'pc-study' | 'pc-control' | 'pc-workshop' | 'pc-rooftop' | 'office-floor' | 'office-bullpen' | 'office-tiers';

export const MATERIALS: Record<Material, { name: string; line: string }> = {
  felt: { name: 'Felt', line: 'Handmade from needle-felted wool: soft, warm, a little irregular, and still cut at 45° like our e.' },
  toy: { name: 'Vinyl', line: 'A designer vinyl collectible: crisp, smooth and premium, like a toy you’d keep in its box.' },
  flocked: { name: 'Flocked', line: 'Vinyl’s crisp, exact shape, the 45° cuts of our e, covered in fine velvet: as sharp as the logo, as warm as the felt.' },
};

export const TOY_VARIANTS: Record<string, { material: Material; world: World; use?: boolean }> = {
  'felt-reef': { material: 'felt', world: 'reef' },
  'felt-shelf': { material: 'felt', world: 'shelf' },
  'toy-reef': { material: 'toy', world: 'reef' },
  'toy-shelf': { material: 'toy', world: 'shelf' },
  'flocked-shelf': { material: 'flocked', world: 'shelf' },
  'toy-use': { material: 'toy', world: 'shelf', use: true },
  'flocked-use': { material: 'flocked', world: 'shelf', use: true },
  'flocked-simul': { material: 'flocked', world: 'simul' },
  'flocked-chain': { material: 'flocked', world: 'chain' },
  'flocked-threads': { material: 'flocked', world: 'threads' },
  'toy-simul': { material: 'toy', world: 'simul' },
  'toy-chain': { material: 'toy', world: 'chain' },
  'toy-threads': { material: 'toy', world: 'threads' },
  'toy-gate': { material: 'toy', world: 'gate' },
  'toy-essai': { material: 'toy', world: 'essai' },
  'toy-assembly': { material: 'toy', world: 'assembly' },
  'toy-livereef': { material: 'toy', world: 'livereef' },
  'toy-pc-reef': { material: 'toy', world: 'pc-reef' },
  'toy-pc-study': { material: 'toy', world: 'pc-study' },
  'toy-pc-control': { material: 'toy', world: 'pc-control' },
  'toy-pc-workshop': { material: 'toy', world: 'pc-workshop' },
  'toy-pc-rooftop': { material: 'toy', world: 'pc-rooftop' },
  'toy-office-floor': { material: 'toy', world: 'office-floor' },
  'toy-office-bullpen': { material: 'toy', world: 'office-bullpen' },
  'toy-office-tiers': { material: 'toy', world: 'office-tiers' },
};

/** The take for a material in a world, or that material's shelf when it has no take there (flocked was made for the shelf only). */
export const takeFor = (material: Material, world: World) => (`${material}-${world}` in TOY_VARIANTS ? `${material}-${world}` : `${material}-shelf`);

/* Round 3, in use: made by scripts/mason-toy-media.py (the logos and words are laid on there, from the companies' own files). */
export const USE_COVERS: { id: string; name: string; line: string }[] = [
  { id: 'camo-dots', name: 'Camouflage · No. 5, Dots', line: 'The Dots’ colours on his skin, OpenAI’s mark on the tag.' },
  { id: 'camo-muse', name: 'Camouflage · No. 4, Muse', line: 'Meta’s blue with Jolly’s cream.' },
  { id: 'camo-clay', name: 'Camouflage · No. 6, Clay + Claude Code', line: 'Modelling-clay arms under a Claude-orange head.' },
  { id: 'jar', name: 'The Jar · No. 5, Dots', line: 'He opens the new thing for you: the Dots, in a labelled jar.' },
  { id: 'crate', name: 'Unboxing · No. 6, Clay + Claude Code', line: 'A crate of raw clay comes out as finished contact cards.' },
];
/* Mason as clip art, to replace the hot dog in the homepage's clip.art replay: real runs of clip.art's own
   reference-anchored workflow (generate-clip-art-asset-ref, 3D, medium), anchored on his vinyl studio shot.
   Laptop and envelope poses failed the workflow's cutout audit twice and aren't shown. */
export const CLIPART_SET: { id: string; run: string; name: string }[] = [
  { id: 'wave', run: 'run-b4fbbb23', name: 'Waving' },
  { id: 'tile', run: 'run-d385cc94', name: 'Holding up a finished tile' },
  { id: 'blocks', run: 'run-a2633a9d', name: 'Juggling blocks' },
  { id: 'check', run: 'run-82be23c1', name: 'Holding up a check' },
];

export const USE_YT: { id: string; kind: string; title: string }[] = [
  { id: 'yt-desk', kind: 'News · A Desk, with Mason in Zev’s place', title: 'Meet Dots: OpenAI’s team that never logs off' },
  { id: 'yt-close', kind: 'News · a close-up and a claim', title: 'Meta’s new agent asks before it acts' },
  { id: 'yt-tutorial', kind: 'Tutorial · the build and the result', title: 'Clay + Claude Code: a lead list that builds itself' },
];

export const WORLDS: Record<World, { name: string; line: string }> = {
  reef: { name: 'The reef', line: 'His footer home, rebuilt as a diorama: he stacks blocks into the octagon gate.' },
  shelf: { name: 'The shelf', line: 'A shelf at night with the camouflage editions he wears on the newsletter covers, like a collectible line.' },
  // Round 4: footers that show his intelligence, in flocked (the home edition)
  simul: { name: 'The Simul', line: 'Eight chess games at once, one arm on each board: two thirds of an octopus’s neurons are in its arms, so each one thinks. Many agents, one mind.' },
  chain: { name: 'The Chain Reaction', line: 'A machine he built runs the width of the page, from a marble to a finished cube, one arm on the start lever: a workflow you can watch, step by step.' },
  // Round 5: footers on what Esy stands for (org-docs/brand/ESY_DEFINITION.md), in vinyl, the brand's material
  gate: { name: 'The Gate', line: '“Humans think. AI assists.” The line does the work, then stops at a lit gate where one key waits: Mason holds the finished piece up for a person to approve. It moves: an 8-second loop.' },
  essai: { name: 'The Essai', line: 'Esy comes from essai, an attempt. Every version of one piece stands in a row, rough to finished, and Mason sets down the last: every attempt is kept, not only the answer.' },
  assembly: { name: 'The Assembly', line: 'Workflows, not prompts: one clear line, raw pieces in, a station for every step, finished pieces out onto the shelf, Mason with an arm at several stations. It moves: an 8-second loop.' },
  // Round 6: today's live footer, the reef, remade in vinyl (the toy theme)
  livereef: { name: 'The live reef, in vinyl', line: 'Today’s footer, the same layout, as a vinyl toy diorama: Mason by the slab, the octagon gate, the kelp, and the school swimming through the middle toward the gate. A still, about 70 KB.' },
  // Round 7: Mason at a computer in glossy vinyl worlds, from behind with his arms on the keys (stills, Sunburst)
  'pc-reef': { name: 'At the reef console', line: 'A desktop built into the reef, coral and kelp around it, several arms typing at once.' },
  'pc-study': { name: 'In the study', line: 'Two glowing monitors at night, a lamp, a plant, the vinyl city through the window.' },
  'pc-control': { name: 'In the control room', line: 'A curved console of glossy panels, three screens, each arm on its own keyboard, dial or slider.' },
  'pc-workshop': { name: 'In the workshop', line: 'A chunky terminal on the bench, some arms typing, others holding parts, the gate’s slabs leaning nearby.' },
  'pc-rooftop': { name: 'On the rooftop', line: 'A laptop on a glossy ledge, typing over a vinyl city at night under an octagonal moon.' },
  // Round 8: a vinyl office of many Masons at desks (many agents, one mind; stills, Sunburst)
  'office-floor': { name: 'The office floor', line: 'An open-plan office at night: a dozen Masons at their own desks in rows, a window wall onto the vinyl city.' },
  'office-bullpen': { name: 'The bullpen', line: 'Masons at long shared desks, typing at their screens and passing finished tiles along. Daylight and ivory.' },
  'office-tiers': { name: 'Mission control', line: 'Rows of Masons on stepped desks, all facing one big glowing wall of screens.' },
  threads: { name: 'The Thread Wall', line: 'Everything he has made, each piece threaded back to the parts it came from: octopuses remember, and Esy keeps where everything came from.' },
};

/** The concept pieces, shown for each material: one scene each, same order. */
export const PIECES: { id: string; name: string; line: string }[] = [
  { id: 'hero', name: 'The studio shot', line: 'Mason on his own, the reference every other picture is made from.' },
  { id: 'mail', name: 'The newsletter goes out', line: 'Carrying the issue to the mailbox in the morning.' },
  { id: 'bench', name: 'At the bench', line: 'Many arms, many tools, one machine: the marketing engineer at work.' },
  { id: 'laptop', name: 'On the keys', line: 'In the daylight studio, typing with several arms at once.' },
  { id: 'box', name: 'In the box', line: 'The collectible release, for merch, launches and the toy-line idea.' },
];

export const toySrc = (material: Material, id: string) => `/prototypes/mason-toy/${material}-${id}.webp`;
/** Round 3's finished covers and thumbnails, as scripts/mason-toy-media.py names them. */
export const inUseSrc = (material: Material, id: string) => `/prototypes/mason-toy/use-${material}-${id}.webp`;
