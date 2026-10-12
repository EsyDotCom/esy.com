/* One real clip.art generation, as Esy recorded it: run-b4fbbb23 on
 * generate-clip-art-asset-ref, 2026-10-12 (read from GET /v1/runs/run-b4fbbb23).
 * Mason, Esy's octopus, anchored on his vinyl studio shot. It replaced the hot
 * dog in sunglasses (run-e9d17422, 2026-09-29) as the run the homepage's
 * clip.art replay plays back; nothing here is invented. To replay a different
 * run, copy its intake, steps, outputs and totals.
 */

export const CLIPART_RUN = {
  id: 'run-b4fbbb23',
  workflow: 'Generate Clip Art (reference-consistent)',
  workflowVersion: 'wfv-f4a2fe72cab9',
  /** The intake's prompt, its opening and its last clause (the middle describes his figure). */
  subject: 'Mason, the Esy octopus mascot … one arm raised in a small wave',
  style: '3D',
  aspect: '1:1',
  /** The raw render, on the white backing it came back on, then the transparent cutout. */
  render: 'https://images.esy.com/artifacts/tool/run-b4fbbb23/step-1.webp',
  cutout: 'https://images.esy.com/artifacts/tool/run-b4fbbb23/step-2a.webp',
  title: 'Mason the Geometric Octopus Mascot 3D',
  tags: ['octopus mascot', 'geometric character', '3d mascot', 'angular design', 'teal navy colors', 'friendly character', 'mascot illustration', 'whimsical'],
  totalUsd: 0.057,
  seconds: 39.8,
  /** The run's six steps in order, with what each recorded. */
  steps: [
    { name: 'Render image', detail: 'gpt-image-2 · from his reference · $0.053', status: 'done' },
    { name: 'Remove background', detail: 'BiRefNet · the white backing had no key colour', status: 'done' },
    { name: 'Refine edges', detail: 'Edges choked 1px · 29,120 px cleaned', status: 'done' },
    { name: 'Audit cutout', detail: 'Pass · no halo, one 0.01% hole', status: 'done' },
    { name: 'Classify asset', detail: 'Claude Haiku 4.5 · title, slug, 8 tags', status: 'done' },
    { name: 'Text gate', detail: 'Claude Haiku 4.5 · pass, no stray text', status: 'done' },
  ] as { name: string; detail: string; status: 'done' | 'skipped' }[],
  /** Each step's real start and end, in seconds from the run's start, and its cost (runSteps). */
  timeline: [
    { name: 'Render image', short: 'Render', start: 1.5, end: 22.8, usd: 0.053, result: 'gpt-image-2 · 1024 × 1024, from his reference' },
    { name: 'Remove background', short: 'Cutout', start: 23.1, end: 25.7, usd: 0.0003, result: 'No key colour, so BiRefNet cut it' },
    { name: 'Refine edges', short: 'Refine', start: 25.8, end: 28.0, usd: 0.0, result: 'Edges choked 1px, spill cleaned' },
    { name: 'Audit cutout', short: 'Audit', start: 28.1, end: 34.4, usd: 0.0, result: 'No halo · one 0.01% hole · pass' },
    { name: 'Classify asset', short: 'Name', start: 34.5, end: 37.4, usd: 0.00118, result: 'Titled, slugged, 8 tags' },
    { name: 'Text gate', short: 'Gate', start: 37.5, end: 39.7, usd: 0.00233, result: 'No stray text · pass' },
    { name: 'Stored', short: 'Stored', start: 39.7, end: 39.8, usd: 0.0000135, result: 'Saved with its provenance' },
  ],
  /** Runs recorded to date (GET /v1/runs total, 2026-10-12). */
  totalRuns: 54901,
};
