---
gate: G4.5
artifact: IMAGE_RESEARCH_AUDIT
status: PASS
essay: turkana-boy
image_count: 7
licensed: 7
unlicensed: 0
pending: 0
date: 2026-03-05
---

# Image Research Audit: Turkana Boy

## Summary

7 images were sourced for the initial Turkana Boy implementation set. All 7 are reusable Wikimedia Commons assets with direct `upload.wikimedia.org` URLs written into `images.ts`. No file-page URLs. No thumbnail URLs. No unlicensed assets.

This set is deliberately minimal-but-valid for the gate: it covers specimen context, comparative anatomy context, lake/landscape context, a locator map, and Acheulean tool context. It does **not** yet represent the full ideal photography ambition implied by the essay, but it provides a verified and licensed starting set for implementation.

## Source Breakdown

| Source | Count | License |
|--------|-------|---------|
| Wikimedia Commons | 7 | CC BY / CC BY-SA |

## Verification

All URLs in `src/app/essays/science/turkana-boy/images.ts` were extracted as direct Wikimedia file URLs using the Commons API / file-page extraction workflow and verified to avoid:

- file-page HTML URLs
- thumbnail URLs (`/commons/thumb/`)
- broken or redirected image links

Verified direct URL format:

`https://upload.wikimedia.org/wikipedia/commons/{hash1}/{hash2}/filename.ext`

## Image Inventory

| # | Key | Description | Source | License | Section Use | Status |
|---|-----|-------------|--------|---------|-------------|--------|
| 1 | `turkanaBoyReconstruction` | Turkana Boy reconstruction at the Neanderthal Museum | Wikimedia Commons | CC BY-SA | Hero / body-plan sections | ✅ Verified |
| 2 | `lakeTurkana` | Lake Turkana landscape photograph | Wikimedia Commons | CC BY-SA 3.0 | Landscape / environment sections | ✅ Verified |
| 3 | `lakeTurkanaMap` | Lake Turkana map graphic | Wikimedia Commons | CC BY-SA 3.0 | Geography / migration context | ✅ Verified |
| 4 | `lakeTurkanaEliye` | View of Lake Turkana from Eliye Springs | Wikimedia Commons | CC BY-SA | Landscape / palette support | ✅ Verified |
| 5 | `acheuleanHandaxe` | Acheulean bifaced hand axe | Wikimedia Commons | CC BY-SA 4.0 | Tools section | ✅ Verified |
| 6 | `ergasterSkullDiagram` | Homo ergaster skull illustration | Wikimedia Commons | CC BY-SA 2.5 | Brain / anatomy context | ✅ Verified |
| 7 | `ergasterSkullReplica` | Homo ergaster skull replica (World Museum Liverpool) | Wikimedia Commons | CC BY 3.0 | Comparative anatomy | ✅ Verified |

## License Summary

| License | Count |
|---------|-------|
| CC BY-SA 4.0 | 1 |
| CC BY-SA 3.0 | 2 |
| CC BY-SA (version unspecified in search summary; verify on final production pass) | 2 |
| CC BY 3.0 | 1 |
| CC BY-SA 2.5 | 1 |

All sourced images are reusable under free licenses. No fair-use or non-free Wikipedia-local assets were included.

## Section Coverage

| Section Area | Images Available | Coverage |
|--------------|------------------|----------|
| Hero / body-plan identity | `turkanaBoyReconstruction` | Adequate for first pass |
| Landscape / environment | `lakeTurkana`, `lakeTurkanaEliye`, `lakeTurkanaMap` | Good |
| Tools | `acheuleanHandaxe` | Good |
| Comparative anatomy | `ergasterSkullDiagram`, `ergasterSkullReplica` | Adequate |
| Discovery / people | none in `images.ts` yet | Gap |
| Mandible / lesion close-up | none in `images.ts` yet | Gap |

## Gap Analysis

The current set passes the gate but further sourcing is still desirable for production quality:

- direct Commons-compatible or self-hostable close-up imagery of the KNM-WT 15000 mandible / lesion
- discovery-context imagery centered on Kamoya Kimeu
- more explicit Nariokotome locality photography
- additional specimen/cast photography of the full skeleton

These are quality improvements, not gate blockers.

## Implementation

All verified direct URLs were written to:

`src/app/essays/science/turkana-boy/images.ts`

The file exports:

- `IMAGES`
- `IMAGE_CREDITS`
- `SOURCES`

This makes the image set ready for downstream implementation and later R2 migration if required by the production path.
