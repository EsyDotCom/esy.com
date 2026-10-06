---
gate: G4.6
status: PASS
essay: lucy
date: 2026-02-24
---

# Visualization Technology Decisions: Lucy — Before the Genus Homo

## Decision Methodology

Each visualization is assigned a **Minimum Tier** based on its data complexity, interactivity requirements, and the subject-to-technology mapping in the Visualization Quality Standard. The producing agent may exceed the tier (e.g., implement a Tier 2 assignment at Tier 3) but may NOT fall below it.

## Technology Assignments

| ID | Name | Minimum Tier | Assigned Technology | Rationale |
|----|------|-------------|-------------------|-----------|
| D1 | Anatomical Comparison | Tier 3 | D3 + SVG | Toggle overlay of 3 species requires state management, SVG manipulation, and smooth transitions. Interactive hover annotations. |
| D2 | Pliocene Climate Timeline | Tier 3 | D3 + SVG (Layered Chart) | Brushable zoom, multiple layered data series (temperature, CO₂, species ranges), requires D3 brush + scale interaction. |
| D3 | Hadar Site Map | Tier 3 | D3-Geo + TopoJSON | Geographic projection, zoomable, click-to-reveal locality panels. Requires d3-geo with proper projection. |
| D4 | Dietary Analysis | Tier 3 | D3 + SVG | Scatter plot with Voronoi hover detection, convex hull overlays, species filtering. Voronoi-based interaction exceeds Recharts capability. |
| D5 | Body Size Dimorphism | Tier 2 | Recharts GroupedBarChart | Standard grouped bar chart. Silhouette overlays are decorative SVG, not data-encoding. Recharts sufficient. |
| D6 | Contemporary Species Map | Tier 3 | D3-Geo + TopoJSON (Animated) | Time-slider driving animated species ranges. Requires d3-geo + d3-timer + custom state management for temporal bins. |
| D7 | Skeletal Completeness | Tier 3 | Custom SVG + React State | Click-to-explore bone elements, guided tour mode, highlight/fade states. Requires custom SVG paths per bone + complex state. |
| D8 | Phylogenetic Position | Tier 3 | D3 (Force/Tree Layout) | Three competing phylogenies with animated transitions between tree topologies. Requires D3 tree layout + transition system. |
| D9 | Cause of Death Evidence | Tier 3 | Custom SVG + React State | Clickable fracture sites with toggle between two hypothesis views. Similar architecture to D7. |
| D10 | Bipedalism Biomechanics | Tier 3 | Canvas + requestAnimationFrame | Animated gait cycles with real-time joint angles and force vectors. Canvas required for smooth multi-figure animation at 60fps. |
| D11 | Stratigraphic Column | Tier 2 | Annotated SVG (static) | Static cross-section diagram with annotations. No interactivity required. SVG sufficient. |
| D12 | Species Trait Radar | Tier 3 | D3 Radar/Radial Chart | Multi-axis radar with species toggle (add/remove species for comparison). Requires D3 radial scales + transitions. |

## Summary

| Tier | Count | Visualizations |
|------|-------|---------------|
| Tier 2 | 2 | D5, D11 |
| Tier 3 | 10 | D1, D2, D3, D4, D6, D7, D8, D9, D10, D12 |
| **Average Tier** | **2.83** | Exceeds standard minimum (≥2.0) |

## Component Decomposition

Per the >80-line rule, all Tier 3 visualizations MUST be separate component files:

| Component File | Visualization(s) | Estimated Lines |
|---------------|-------------------|-----------------|
| AnatomicalComparison.tsx | D1 | 200-300 |
| PlioceneClimate.tsx | D2 | 150-250 |
| HadarMap.tsx | D3 | 200-300 |
| DietaryAnalysis.tsx | D4 | 150-200 |
| ContemporarySpeciesMap.tsx | D6 | 250-350 |
| SkeletalCompleteness.tsx | D7 | 200-300 |
| PhylogeneticPosition.tsx | D8 | 200-300 |
| CauseOfDeath.tsx | D9 | 150-250 |
| BipedalismBiomechanics.tsx | D10 | 250-350 |
| SpeciesRadar.tsx | D12 | 150-200 |

D5 (Recharts) and D11 (static SVG) may be inline in the client component if under 80 lines each, or extracted if they exceed that threshold.

## D3 Module Budget

Only import needed D3 modules to minimize bundle:
- `d3-geo` + `d3-geo-projection`: D3, D6 (maps)
- `d3-scale` + `d3-axis`: D1, D2, D4, D8, D12
- `d3-shape`: D2, D4, D8, D12
- `d3-selection` + `d3-transition`: all D3 visualizations
- `d3-brush`: D2 (timeline zoom)
- `d3-voronoi` or `d3-delaunay`: D4 (hover detection)
- `d3-hierarchy`: D8 (tree layout)
- `d3-timer`: D6 (auto-play animation)

Avoid: `d3-force` (not needed), `d3-chord`, `d3-contour`, `d3-sankey`

## Mobile Degradation Strategy

| Viz | Desktop | Mobile (< 768px) |
|-----|---------|-------------------|
| D1 | Side-by-side toggle | Swipe carousel, one species at a time |
| D2 | Brushable timeline | Simplified timeline, no brush, tap for details |
| D3 | Zoomable map | Static map, tap localities for popups |
| D4 | Voronoi hover scatter | Tap-to-select scatter, no convex hulls |
| D5 | Grouped bar chart | Stacked bar (narrower) |
| D6 | Animated time-slider map | Auto-play only, no slider, simplified ranges |
| D7 | Click-to-explore skeleton | Guided tour mode only (step through) |
| D8 | Toggle between 3 trees | Swipe between trees, one at a time |
| D9 | Click fracture sites | Guided tour mode, numbered steps |
| D10 | Side-by-side gait animation | One figure at a time, swipe to compare |
| D11 | Annotated SVG column | Same (scales well) |
| D12 | Toggle species on radar | Select species from list, max 3 at a time |

## Performance Notes

- Total estimated visualization JS: ~2,500-3,500 lines across 10 component files
- Code-split all Tier 3 components with `next/dynamic` or `React.lazy`
- D3 and D10 (Canvas) are heaviest — lazy-load below fold
- TopoJSON for Africa: use simplified topology (~100KB) not high-detail
- requestAnimationFrame in D10: must clean up on unmount to prevent memory leaks
