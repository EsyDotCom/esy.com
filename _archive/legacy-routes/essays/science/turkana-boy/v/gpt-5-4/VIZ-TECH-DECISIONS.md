---
gate: G4.6
status: PASS
essay: turkana-boy
date: 2026-03-05
---

# Visualization Technology Decisions: Turkana Boy — The First Modern Body

## Decision Methodology

Each planned visualization is assigned a **Minimum Tier** based on the `visualization-quality-standard.md` technology ladder, the Turkana Boy invocation spec, and the corrected design research. The implementation may exceed the assigned tier but may not fall below it.

Key enforcement rules applied:

- Any visualization encoding quantities, comparisons, or geographic relationships must be **Tier 2+**
- Tier 0 is only acceptable for UI/micro-interaction work
- Any visualization with more than ~80 lines of rendering logic should be split into its own component file
- 3D is optional, not mandatory, unless asset quality supports it

## Technology Assignments

| ID | Name | Purpose | Minimum Tier | Assigned Technology | Rationale |
|----|------|---------|--------------|---------------------|-----------|
| D1 | Hero Skeletal Completeness Reveal | Show recovered vs missing anatomy and establish the specimen's completeness visually | Tier 2 | Custom SVG + React state | This is not a decorative hero. It encodes completeness and anatomical location, uses staged reveal states, and benefits from data-driven highlighting of recovered regions. Tier 1 could draw it, but the scroll-linked assembly and layered state make Tier 2 the safer minimum. |
| D2 | Teeth vs Bones Age Discrepancy | Compare dental maturity and skeletal maturity on separate developmental tracks | Tier 2 | D3 + SVG | This is a genuine comparison visualization with positioned markers and diverging scales. A CSS layout would not qualify as a chart. |
| D3 | Growth Curve / Adult Projection | Compare possible developmental trajectories and stature projections | Tier 2 | D3 + SVG | Time/progression curves with multiple modeled trajectories require computed scales, axes, and transitions. Subject-to-technology mapping puts this squarely in D3 chart territory. |
| D4 | Body Proportion Comparison | Compare Lucy, Turkana Boy, and recent humans on proportion and silhouette logic | Tier 2 | D3 + SVG | Comparative anatomy here is partly diagram, partly quantity encoding. Since proportions are data-bearing, the visualization must be Tier 2+ rather than static CSS bars or flex layouts. |
| D5 | Leg Geometry / Locomotion Comparison | Explain stride, limb emphasis, and locomotor consequence | Tier 2 | Custom SVG + D3 scales | This is an anatomy-measurement hybrid: visual lines, alignments, and comparative geometry. It needs precise positional mapping and hover/annotation states. |
| D6 | Brain Volume Context Chart | Place 880 cc in cluster/evolutionary context | Tier 2 | Recharts or D3 + SVG | This is a standard data chart and must not drop to CSS bars. Recharts is acceptable if the chart remains publication-grade; D3 is acceptable if custom annotation control is needed. |
| D7 | Voice / Vertebral Canal Debate Explainer | Compare older vs newer interpretations of thoracic canal evidence | Tier 1 | Annotated SVG | This is primarily a structured explanatory diagram rather than a high-density dataset. It needs careful annotations and toggled overlays, but not geographic projection or large-scale computed layout. |
| D8 | Acheulean Context Timeline | Show emergence and persistence of large cutting tools in relation to Turkana Boy | Tier 2 | D3 + SVG timeline | A time-encoded technology timeline with positioned milestones is data encoding and requires proper scale mapping. Tier 1 is too low if dates and spans are central. |
| D9 | Out-of-Africa Migration Map | Show East Africa anchor and movement toward Dmanisi / broader dispersal | Tier 2 | D3-Geo + SVG | Geographic projection math makes Tier 2 mandatory per the standard. Any static CSS map would be a contract violation. |
| D10 | Discovery / Excavation Completeness Tally | Show how 108 bones and multiple seasons build a benchmark specimen | Tier 1 | Annotated SVG + React state | This is essentially an explanatory sequence and count display, not a dense quantitative chart. SVG is sufficient if the count logic remains tightly controlled and visually precise. |
| D11 | Final Body-Plan Continuity Comparison | Connect Lucy -> Turkana Boy -> recent human in a synthesis comparison | Tier 2 | D3 + SVG | The closing comparison still encodes proportion and anatomical relationship. It must remain data/scale aware rather than collapse into decorative silhouettes. |
| D12 | Optional 3D Specimen Viewer | Allow inspection of a specimen or cast if a usable asset exists | Tier 4 | Three.js / React Three Fiber | This is only justified if a real educational scan or cast model is available. If not, the feature should degrade to annotated stills and not be implemented as fake 3D. |

## Per-Visualization Implementation Notes

### D1 — Hero Skeletal Completeness Reveal

- **Required imports**: `react`, optional `d3-scale` for region sequencing, inline SVG paths
- **Estimated lines**: 180-260
- **Dedicated component file?** Yes
- **Suggested file**: `visualizations/SkeletalCompletenessHero.tsx`
- **Notes**: Should support reduced-motion by rendering the fully assembled state immediately.

### D2 — Teeth vs Bones Age Discrepancy

- **Required imports**: `d3-scale`, `d3-axis` (if axis labels are custom), `react`
- **Estimated lines**: 120-180
- **Dedicated component file?** Yes
- **Suggested file**: `visualizations/AgeDiscrepancyViz.tsx`
- **Notes**: Keep comparison legible on mobile with stacked or tabbed views.

### D3 — Growth Curve / Adult Projection

- **Required imports**: `d3-scale`, `d3-shape`, `d3-interpolate`, `react`
- **Estimated lines**: 150-220
- **Dedicated component file?** Yes
- **Suggested file**: `visualizations/GrowthProjectionViz.tsx`
- **Notes**: Must make uncertainty visible rather than imply one settled curve.

### D4 — Body Proportion Comparison

- **Required imports**: `d3-scale`, `react`
- **Estimated lines**: 160-240
- **Dedicated component file?** Yes
- **Suggested file**: `visualizations/BodyProportionsViz.tsx`
- **Notes**: Silhouettes may be SVG assets, but the comparison logic itself must remain data-driven.

### D5 — Leg Geometry / Locomotion Comparison

- **Required imports**: `d3-scale`, `react`
- **Estimated lines**: 140-220
- **Dedicated component file?** Yes
- **Suggested file**: `visualizations/LegGeometryViz.tsx`
- **Notes**: Prioritize alignment overlays and measurement bars over decorative animation.

### D6 — Brain Volume Context Chart

- **Required imports**: `recharts` or `d3-scale`, `react`
- **Estimated lines**: 80-140
- **Dedicated component file?** Likely yes
- **Suggested file**: `visualizations/BrainVolumeViz.tsx`
- **Notes**: Recharts is acceptable only if annotations and hierarchy remain strong; otherwise use custom D3+SVG.

### D7 — Voice / Vertebral Canal Debate Explainer

- **Required imports**: `react`, inline SVG
- **Estimated lines**: 90-140
- **Dedicated component file?** Yes
- **Suggested file**: `visualizations/VoiceDebateViz.tsx`
- **Notes**: Debate structure should remain flat, readable, and evidence-led.

### D8 — Acheulean Context Timeline

- **Required imports**: `d3-scale`, `d3-axis`, `react`
- **Estimated lines**: 110-170
- **Dedicated component file?** Yes
- **Suggested file**: `visualizations/AcheuleanTimelineViz.tsx`
- **Notes**: Show Turkana Boy's temporal position clearly without implying direct ownership of a specific artifact.

### D9 — Out-of-Africa Migration Map

- **Required imports**: `d3-geo`, `topojson-client`, `react`
- **Estimated lines**: 180-260
- **Dedicated component file?** Yes
- **Suggested file**: `visualizations/MigrationMapViz.tsx`
- **Notes**: Mobile should degrade to a static or lightly interactive map.

### D10 — Discovery / Excavation Completeness Tally

- **Required imports**: `react`, inline SVG
- **Estimated lines**: 100-160
- **Dedicated component file?** Yes
- **Suggested file**: `visualizations/ExcavationTallyViz.tsx`
- **Notes**: This can remain Tier 1 because its function is explanatory sequencing, not advanced numeric analysis.

### D11 — Final Body-Plan Continuity Comparison

- **Required imports**: `d3-scale`, `react`
- **Estimated lines**: 140-200
- **Dedicated component file?** Yes
- **Suggested file**: `visualizations/BodyPlanContinuityViz.tsx`
- **Notes**: Final comparison should preserve complexity and avoid presenting evolution as a simplistic straight line.

### D12 — Optional 3D Specimen Viewer

- **Required imports**: `three`, `@react-three/fiber`, `@react-three/drei`
- **Estimated lines**: 180-300
- **Dedicated component file?** Yes
- **Suggested file**: `visualizations/SpecimenViewer.tsx`
- **Notes**: Only implement if a usable specimen asset is available. Otherwise omit and replace with annotated specimen stills.

## Summary

| Tier | Count | Visualizations |
|------|-------|----------------|
| Tier 1 | 2 | D7, D10 |
| Tier 2 | 9 | D1, D2, D3, D4, D5, D6, D8, D9, D11 |
| Tier 4 | 1 optional | D12 |
| **Average Minimum Tier** | **2.0+** | Meets standard for a data-bearing visual essay |

## Component Decomposition

All planned visualizations except perhaps a very small inline chart exceed or are likely to exceed the 80-line threshold once annotation, responsiveness, and reduced-motion states are included.

Recommended structure:

```text
src/app/essays/science/turkana-boy/
  TurkanaBoyClient.tsx
  images.ts
  VIZ-TECH-DECISIONS.md
  visualizations/
    SkeletalCompletenessHero.tsx
    AgeDiscrepancyViz.tsx
    GrowthProjectionViz.tsx
    BodyProportionsViz.tsx
    LegGeometryViz.tsx
    BrainVolumeViz.tsx
    VoiceDebateViz.tsx
    AcheuleanTimelineViz.tsx
    MigrationMapViz.tsx
    ExcavationTallyViz.tsx
    BodyPlanContinuityViz.tsx
    SpecimenViewer.tsx
```

## D3 / Library Budget

Prefer importing only the modules actually needed:

- `d3-scale` for quantitative mapping
- `d3-shape` for curves / paths where necessary
- `d3-axis` for explicit chart axes
- `d3-interpolate` for state transitions if used
- `d3-geo` + `topojson-client` for migration map
- `recharts` only for the brain chart if custom D3 is unnecessary
- `three` + `@react-three/fiber` + `@react-three/drei` only if the optional specimen viewer is implemented

## Final Decision

The Turkana Boy essay should be built with a mostly **Tier 2** visualization stack: custom SVG and D3 for data-bearing diagrams, charts, and maps. Tier 1 is reserved for narrow explanatory diagrams that do not carry dense quantitative structure. Tier 4 is optional and contingent on real asset quality.

The producing gate must not collapse any of the comparison, chart, timeline, or map work into CSS bars, flex layouts, or decorative rectangles.
