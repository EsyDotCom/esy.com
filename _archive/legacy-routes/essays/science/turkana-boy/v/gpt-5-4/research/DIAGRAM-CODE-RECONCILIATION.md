---
gate: G5.3
essay: turkana-boy
auditor: diagram-code-reconciler
status: PASS
invariants_checked: 12
invariants_passed: 12
invariants_failed: 0
date: 2026-03-05
---

# G5.3 Diagram-Code Reconciliation — Turkana Boy

This audit verifies that the `@diagram-contract` blocks in `TurkanaBoyClient.tsx` match the actual implemented behavior.

## D1 — Skeletal Completeness Reveal

| Invariant | Code Evidence | Result |
|-----------|---------------|--------|
| `REGION_WEIGHTING` | Each region computes density as `recovered / total`; active panel displays the same values and percentage. | PASS |
| `LEG_PRIORITY` | Lower limbs are initialized as the active region and carry the highest recovered count in the region dataset. | PASS |

## D2 — Age Discrepancy Comparison

| Invariant | Code Evidence | Result |
|-----------|---------------|--------|
| `SCALE_DIRECTION` | D3 linear scale maps 7 to the left and 13 to the right; skeletal marker value `11` renders to the right of dental value `8.5`. | PASS |
| `DUAL_EVIDENCE` | Separate horizontal tracks for dental eruption and skeletal maturity are rendered with distinct labels and colors. | PASS |

## D3 — Growth Projection Chart

| Invariant | Code Evidence | Result |
|-----------|---------------|--------|
| `CURVE_ORDER` | `turkanaProjection` remains above `modernHuman`, which remains above `chimpLike` across the dataset. | PASS |
| `AGE_WINDOW` | The chart data spans ages 8 through 16 exactly as declared in the contract. | PASS |

## D4 — Body Proportion Comparison

| Invariant | Code Evidence | Result |
|-----------|---------------|--------|
| `LEG_SHARE_ORDER` | `legShare` values rise from Lucy to Turkana Boy to recent human (`46`, `53`, `55`). | PASS |
| `HEAT_LOAD_DROP` | `trunkHeatLoad` for Turkana Boy (`58`) is lower than Lucy (`71`). | PASS |

## D5 — Brain Volume Context

| Invariant | Code Evidence | Result |
|-----------|---------------|--------|
| `TURKANA_POSITION` | The `brainData` array places Turkana Boy at `880`, between Lucy `438` and recent human `1350`. | PASS |

## D6 — Voice Debate Explainer

| Invariant | Code Evidence | Result |
|-----------|---------------|--------|
| `TWO_SIDED_ARGUMENT` | Both `constraint` and `caution` states are defined with separate titles, summaries, and bullet lists; toggle buttons switch between them. | PASS |

## D7 — Migration Route Map

| Invariant | Code Evidence | Result |
|-----------|---------------|--------|
| `ROUTE_ORIGIN` | All route definitions begin with `West Turkana` before projecting to Dmanisi, Java, or Lantian. | PASS |
| `SITE_PLOTTING` | Site points are projected with `d3.geoNaturalEarth1()` and stored from projected coordinates, not hard-coded CSS positions. | PASS |

## Summary

| Diagram | Invariants | Result |
|---------|------------|--------|
| D1 | 2 | PASS |
| D2 | 2 | PASS |
| D3 | 2 | PASS |
| D4 | 2 | PASS |
| D5 | 1 | PASS |
| D6 | 1 | PASS |
| D7 | 2 | PASS |

**Overall:** All 12 declared invariants are reflected correctly in code and rendered structure. **G5.3 PASS.**
