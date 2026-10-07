---
gate: G4.5
status: PASS
essay: lucy
image_count: 14
licensed: 14
unlicensed: 0
pending: 0
date: 2026-02-24
---

# Image Research Audit: Lucy — Before the Genus Homo

## Sourcing Summary

| Metric | Value |
|--------|-------|
| Total images sourced | 14 |
| Fully licensed | 14 |
| Wikimedia Commons (CC/PD) | 14 |
| Permission-required | 0 |
| Unlicensed | 0 |

## Image Inventory

For each image, document: key in images.ts, source, license, section usage, and verification status.

### Fossil Specimens

| # | Key | Description | Source | License | Section | Status |
|---|-----|-------------|--------|---------|---------|--------|
| 1 | lucy | Lucy skeleton display (Mexico exhibit) | Wikimedia Commons | CC BY-SA 2.0 | 3, Hero | ✅ Verified |
| 2 | lucySkeleton | Lucy skeleton reconstruction (Cleveland) | Wikimedia Commons | CC BY-SA 4.0 | 3 | ✅ Verified |
| 3 | lucyBlackBg | Lucy skeleton on dark background | Wikimedia Commons | CC BY-SA | 3, 4 | ✅ Verified |
| 4 | lucyReconstruction | Lucy fossil reconstruction | Wikimedia Commons | CC BY-SA | 2, 3 | ✅ Verified |
| 5 | afarensisSkull | A. afarensis skull (Senckenberg) | Wikimedia Commons | CC BY-SA 3.0 | 4, 10 | ✅ Verified |
| 6 | afarensisReconstruction | A. afarensis skull reconstruction | Wikimedia Commons | CC BY-SA | 4 | ✅ Verified |
| 7 | laetoliFootprints | Laetoli footprints replica | Wikimedia Commons | CC BY-SA 4.0 | 10 | ✅ Verified |
| 8 | taungChild | Taung Child skull | Wikimedia Commons | CC BY-SA 2.0 | 10 | ✅ Verified |
| 9 | paranthropusBoisei | Paranthropus boisei skull | Wikimedia Commons | CC BY-SA 3.0 | 10 | ✅ Verified |

### Landscape/Site Photography

| # | Key | Description | Source | License | Section | Status |
|---|-----|-------------|--------|---------|---------|--------|
| 10 | hadar | Hadar region landscape | Wikimedia Commons | CC BY-SA | 1, 2 | ✅ Verified |
| 11 | afarTriangleMap | Political map of the Afar Triangle | Wikimedia Commons | CC BY-SA 3.0 | 1 | ✅ Verified |
| 12 | afarDepression | ASTER satellite image of Afar Depression | Wikimedia Commons | Public Domain (NASA) | 1, 6 | ✅ Verified |
| 13 | dallolLandscape | Dallol landscape, Afar Region | Wikimedia Commons | CC BY-SA | 6 | ✅ Verified |
| 14 | afarLakeKarum | Lake Karum area, Afar | Wikimedia Commons | CC BY-SA | 6 | ✅ Verified |

## License Summary

| License | Count |
|---------|-------|
| CC BY-SA 2.0 | 2 |
| CC BY-SA 3.0 | 2 |
| CC BY-SA 4.0 | 2 |
| CC BY-SA (unversioned) | 7 |
| Public Domain (NASA) | 1 |

All images are Creative Commons or Public Domain. No permission-required assets. No fair use claims.

## Section Coverage

| Section | Images Available | Coverage |
|---------|-----------------|----------|
| 1. The Afar | hadar, afarTriangleMap, afarDepression | ✅ Good |
| 2. November 24, 1974 | lucyReconstruction, hadar | ⚠️ Could use archival expedition photos |
| 3. Forty Percent | lucy, lucySkeleton, lucyBlackBg, lucyReconstruction | ✅ Excellent |
| 4. Built to Walk | afarensisSkull, afarensisReconstruction, lucyBlackBg | ✅ Good |
| 5. Or Built to Climb? | (no specific hand/foot bone photos) | ⚠️ Gap — may need additional sourcing |
| 6. The Pliocene World | afarDepression, dallolLandscape, afarLakeKarum | ✅ Good |
| 7. What She Ate | (no dental close-ups) | ⚠️ Gap — dental photography needed |
| 8. Among Her Kind | (relies on specimen photos above) | ⚠️ Could use First Family photos |
| 9. The Fall | (relies on specimen photos) | Adequate — fracture sites are in visualizations |
| 10. Her Contemporaries | taungChild, paranthropusBoisei, laetoliFootprints, afarensisSkull | ✅ Good |
| 11. Where She Sits | (covered by specimen photos + D8 visualization) | Adequate |
| 12. Dinkinesh | (no museum exhibition photos yet) | ⚠️ Gap — Ethiopian museum photos needed |

## Gap Analysis

14 images sourced against a target of 25-35. Current coverage is strong for core specimen and landscape photography but has gaps in:
- Hand/foot bone close-ups (Section 5)
- Dental detail photography (Section 7)
- First Family assemblage photos (Section 8)
- Ethiopian museum exhibition photos (Section 12)
- Archival expedition/discovery photos (Section 2)

These gaps can be filled in a follow-up sourcing pass or supplemented with visualization-only treatment in those sections.

## Verification Method

All 14 URLs verified via Wikimedia Commons API (action=query, prop=imageinfo, iiprop=url). Direct URLs confirmed returning HTTP 200. No thumbnail URLs. No file-page redirects.

## Implementation

All URLs written to `src/app/essays/science/lucy/images.ts` as a typed constant object (`as const`). Ready for G4.7 R2 upload.
