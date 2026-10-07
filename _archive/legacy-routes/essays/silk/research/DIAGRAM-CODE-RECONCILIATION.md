---
gate: G5.3
status: PASS
auditor: diagram-code-reconciliation-auditor
date: 2026-02-09
essay: silk
---

# G5.3 Diagram-Code Reconciliation — Silk

## Assessment

This essay uses **interactive data visualizations** (MigrationTrail, IngredientOracle, TimefoldSlider) rather than SVG/Canvas scientific diagrams. There are no physics simulations, mathematical formulas, or coordinate-system-dependent visualizations that would require `@diagram-contract` blocks.

The three interaction modes are **data-driven UI components**, not scientific diagrams:

1. **MigrationTrail**: A tabbed interface displaying 7 Silk Road stops with descriptive text. No spatial/mathematical invariants to verify.
2. **IngredientOracle**: A 7-stage progressive reveal with emoji icons and descriptive text. No formula-dependent rendering.
3. **TimefoldSlider**: An 8-era timeline slider with text cards. Linear percentage-based positioning only.

## Diagram Contract Coverage

| Component | Type | Requires @diagram-contract? | Status |
|-----------|------|----------------------------|--------|
| MigrationTrail | Data UI (tab list) | No — no coordinate math | ✅ N/A |
| IngredientOracle | Data UI (reveal cards) | No — no coordinate math | ✅ N/A |
| TimefoldSlider | Data UI (slider) | No — percentage-based only | ✅ N/A |

## Invariant Checks

No invariants apply. This essay's visualizations are interaction-mode components (UI patterns), not scientific diagrams.

## Data Accuracy Spot-Check

| Data Point | Source | Client Code Value | Match? |
|------------|--------|-------------------|--------|
| Silk Road stops (7) | SYNTHESIS.md | 7 stops in SILK_ROAD_STOPS | ✅ |
| Sericulture stages (7) | research/SYNTHESIS.md | 7 stages in SERICULTURE_STAGES | ✅ |
| Timeline eras (8) | research/TIMELINE.md | 8 eras in TIMEFOLD_ERAS | ✅ |
| 900m filament length | C4 (Needham) | "up to 900 meters long" | ✅ |
| 25,000 cocoons/dress | C2 (Prasad) | "25,000 cocoons for one silk dress" | ✅ |
| China 80% production | C18 (FAO) | "80% of the world's raw silk" | ✅ |

**Data accuracy**: All spot-checked values match research sources.

**Gate G5.3 Status**: ✅ PASS
