---
gate: G8
essay: turkana-boy
auditor: publication-certifier
status: PASS
certification: CONDITIONAL
date: 2026-03-05
---

# Publication Certification — Turkana Boy

## Publication Certification

### 1. Prior Gates

All implemented pre-publication gates through `G7` have passed in the current run.

### 2. SOURCES and IMAGE_CREDITS

- `SOURCES` is imported and rendered in the shipped client component
- `IMAGE_CREDITS` is imported and rendered in the shipped client component

### 3. Image Usage

The client component references seven essay images via `src={IMAGES.*}` patterns, exceeding the publication minimum for photorealistic essays.

### 4. Image Hosting

`images.ts` now points exclusively to `images.esy.com` R2-hosted URLs. No `upload.wikimedia.org` hotlinks remain.

### 5. ArtifactDetailWrapper

`page.tsx` imports and uses `ArtifactDetailWrapper` correctly with `ESSAY_META`.

### 6. Design and Research Integrity

The implementation remains aligned with the approved Turkana Boy design research, the visualization technology decision, and the research package.

### 7. Certification

**Certification: CONDITIONAL**

The essay is publication-ready from a source-code and gate-compliance perspective. Final confidence would improve with explicit browser/device verification before public release, but there are no automated blockers remaining prior to human approval.
