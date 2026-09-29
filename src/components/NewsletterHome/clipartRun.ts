/* One real clip.art generation, as Esy recorded it: run-e9d17422 on
 * generate-clip-art-asset-v2, 2026-09-29 (read from GET /v1/runs/run-e9d17422).
 * The homepage's clip.art run replay plays it back; nothing here is invented.
 * To replay a different run, copy its intake, steps, outputs and totals.
 */

export const CLIPART_RUN = {
  id: 'run-e9d17422',
  workflow: 'Generate Clip Art (v2)',
  workflowVersion: '2026.09.19',
  subject: 'a fun, happy anthropomorphic hot dog wearing sunglasses',
  style: '3D',
  aspect: '1:1',
  /** The raw render, on its keying green, then the transparent cutout. */
  render: 'https://images.esy.com/artifacts/clip-art/run-e9d17422/image.webp',
  cutout: 'https://images.esy.com/artifacts/tool/run-e9d17422/step-2.webp',
  title: 'Happy Hot Dog with Sunglasses 3D Clipart',
  tags: ['hot dog', 'sunglasses', 'anthropomorphic', '3d clipart', 'funny food', 'summer'],
  totalUsd: 0.057,
  seconds: 37.9,
  /** The run's six steps in order, with what each recorded. */
  steps: [
    { name: 'Render image', detail: 'gpt-image-2 · $0.053', status: 'done' },
    { name: 'Remove background', detail: 'Chroma key · 70% keyed clear', status: 'done' },
    { name: 'Refine edges', detail: 'Skipped: the key was clean', status: 'skipped' },
    { name: 'Audit cutout', detail: 'Pass · 0 damaged holes, no halo', status: 'done' },
    { name: 'Classify asset', detail: 'Claude Haiku 4.5 · title, slug, 8 tags', status: 'done' },
    { name: 'Text gate', detail: 'Claude Haiku 4.5 · pass, no stray text', status: 'done' },
  ] as { name: string; detail: string; status: 'done' | 'skipped' }[],
  /** Runs recorded to date (GET /v1/runs total, 2026-09-29). */
  totalRuns: 53506,
};
