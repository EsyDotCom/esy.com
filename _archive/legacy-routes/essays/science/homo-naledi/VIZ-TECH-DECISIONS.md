---
gate: G4
artifact: VIZ-TECH-DECISIONS
status: PASS
date: 2026-02-25
---

# Visualization Technology Decisions: Homo naledi — The Small-Brained Species That Buried Its Dead

## Decision Methodology

Each visualization is assigned a **Minimum Tier** based on its data complexity, interactivity requirements, and the subject-to-technology mapping established in the Visualization Quality Standard. The producing agent may exceed the tier but may NOT fall below it.

### Tier Definitions

| Tier | Technology | When to Use |
|------|-----------|-------------|
| **Tier 1** | CSS-only | Simple layout-based visuals (progress bars, color swatches, basic comparisons) |
| **Tier 2** | SVG / Recharts | Static or simply interactive charts; standard bar, line, scatter with hover tooltips |
| **Tier 3** | D3 + SVG | Interactive, data-driven; custom layouts, animated transitions, complex state |
| **Tier 4** | Canvas | High frame-rate animation, high element count, real-time rendering |
| **Tier 5** | Three.js / WebGL (React Three Fiber) | 3D models, spatial interaction, orbit controls |

## Technology Assignments

| ID | Name | Minimum Tier | Assigned Technology | Rationale | Interaction Pattern | Estimated Complexity |
|----|------|-------------|-------------------|-----------|-------------------|---------------------|
| D1 | Cave Cross-Section | Tier 3 | D3 + SVG Interactive | Layered cross-section of the Rising Star cave system with 10 clickable waypoints, distance/dimension annotations, and an animated "journey" mode that traces the path from entrance to Dinaledi Chamber. Requires D3 scales for elevation/distance mapping, SVG path animation for the journey mode, and complex state management for waypoint selection. Recharts cannot handle custom SVG path animation or non-standard coordinate layouts. | Click waypoint → expand info panel; toggle "journey" mode for animated traversal; hover for dimension callouts | High — custom SVG path generation, waypoint state, animation timeline |
| D2 | Anatomical Mosaic | Tier 3 | Custom SVG + React State | Full skeleton diagram with 18 body regions colour-coded by classification (primitive / derived / mosaic). Click any region to expand a comparison panel showing naledi vs. australopith vs. modern human for that feature. Requires custom SVG paths for each bone group, state-driven highlight/fade, and detail panel transitions. Similar architecture to Lucy's D7 (Skeletal Completeness). | Click region → expand comparison panel; hover → highlight + tooltip; guided tour mode available | High — custom SVG bone paths, 18-region state management, comparison panels |
| D3 | Brain Size vs. Behavioural Complexity | Tier 3 | D3 Scatter + Voronoi | Scatter plot of endocranial volume (x) vs. behavioural complexity score (y) for 9 species. Naledi appears twice (disposal accepted / rejected), connected by a vertical uncertainty band. Voronoi-based hover detection for non-overlapping interaction targets. Toggle between "disposal confirmed" and "disposal rejected" views with animated position transitions. The toggle is the core interaction — it shifts naledi's position and reshapes the viewer's interpretation. | Hover species → tooltip with details; toggle disposal button → animated naledi repositioning; "outlier zone" shaded region responds to toggle | Medium-High — Voronoi overlay, animated position transitions, toggle state |
| D4 | Dating Timeline | Tier 3 | D3 Layered Timeline | Horizontal bar chart spanning 500 ka – 50 ka showing temporal ranges for 7 species. Naledi's range highlighted with dating-method markers (U-Th, ESR, paleomag). Annotation markers for key events (Jebel Irhoud, Florisbad, last erectus). Requires D3 scales, band layout, annotation positioning, and hover-to-reveal detail panels for each species/method. | Hover species bar → tooltip with sites, dates, methods; click dating-method marker → expand method detail; zoom/pan on timeline | Medium — standard D3 band chart with annotation overlay system |
| D5 | Dinaledi Chamber Floor Plan | Tier 3 | D3 + SVG | Map of the chamber floor showing excavation grid (9 zones), bone density heat map, and specimen positions. Click zones to reveal finds, individual assignments, and taphonomic notes. Colour-coded by bone density (low/medium/high) and by individual where assigned. Requires custom SVG layout (non-geographic), grid interaction, and density-to-colour mapping. | Click grid zone → expand specimen panel; hover → bone density tooltip; toggle overlay: density view / individual view / taphonomic view | Medium-High — custom grid layout, multiple overlay modes, detail panels |
| D6 | Skull Comparison | Tier 3 | D3 + Interactive SVG Toggle | Four-species skull comparison (naledi DH1, erectus, sapiens, africanus) with toggle/overlay. 14 craniometric measurements displayed as overlaid measurement lines on SVG skull outlines. Toggle between species to see morphological differences. Qualitative feature comparison table alongside. | Toggle species → animated SVG skull transition; hover measurement line → value tooltip; Neo (LES1) comparison sub-toggle | High — SVG skull outlines with measurement overlays, multi-state toggle, animated transitions |
| D7 | Hand Morphology | Tier 3 | Annotated SVG + D3 | Three-species hand comparison (naledi, chimpanzee, human) with 12 clickable bone regions. Each region expands to show classification (primitive/derived/mosaic) and measurement data. Includes a curvature comparison sub-chart (bar chart of included angles across rays). The hand paradox is the centerpiece — curved fingers + modern thumb — and the interaction must make this tangible. | Click bone region → expand annotation panel; hover → highlight bone + classification colour; toggle between species overlay views; curvature chart is synced (clicking a finger highlights the corresponding bar) | High — 12-region bone SVG, tri-species state, synchronized sub-chart |
| D8 | Disposal Evidence Flowchart | Tier 3 | D3 Force / Tree Layout | Interactive evidence map with 9 evidence nodes. Each node flows to "supports disposal" or "alternative explanation" branches. Strength rating (strong/moderate/weak) determines visual weight (node size, connection thickness). Toggle between pro-disposal and counter-argument views. Five counter-arguments rendered as separate challenge nodes connected to relevant evidence. | Click node → expand evidence detail + source; toggle "pro/con" view → animated layout restructuring; hover → highlight connected evidence chain | High — force-directed or tree layout, dual-view animated transitions, node expansion |
| D9 | South African Cave Sites Map | Tier 3 | D3-Geo + TopoJSON | Zoomable map of the Cradle of Humankind showing 9 sites within ~15 km radius. Click each site for species found, key specimens, and dates. Rising Star highlighted as primary site with pulsing marker. Distance radius rings from Rising Star. Requires d3-geo with Mercator projection (small geographic extent), custom markers, and click-to-expand panels. | Click site → expand info panel with species, specimens, dates; zoom/pan; hover → distance from Rising Star; toggle layer: species overlay / temporal overlay | Medium — small geographic extent (simpler projection), 9 interactive markers, detail panels |
| D10 | Body Proportion Comparison | Tier 2 | Recharts Grouped Bar | Grouped bar chart comparing height, mass, brachial index, and crural index across 6 species. Silhouette scale figures alongside bars (decorative SVG, not data-encoding). Straightforward comparison chart — Recharts handles grouped bars with tooltips natively. No complex interaction beyond hover. | Hover bar → value tooltip; static silhouette figures for visual context | Low — standard grouped bar chart; Recharts sufficient |
| D11 | Phylogenetic Position | Tier 3 | D3 Tree Layout | Three competing cladograms for naledi's placement (Basal Homo / Sister to erectus / Living Fossil). Animated transitions between tree topologies — nodes rearrange when the user switches models. A. sediba included for comparison. Requires D3 tree/hierarchy layout with custom transition interpolation between different topologies. | Toggle between 3 models → animated tree restructuring; hover node → species detail tooltip; highlight naledi path in each model | High — 3 distinct tree topologies with animated transitions; interpolation between different hierarchical structures |
| D12 | Species Coexistence Timeline | Tier 3 | D3 Gantt Chart | Horizontal bar chart spanning 3,500 ka – 0 showing 7 southern African species. Overlap windows highlighted with connecting annotation bands. Naledi's range prominently marked. Key annotations (three-genus period, naledi + sapiens overlap). Requires D3 scales, overlapping bars, and annotation system. Exceeds Recharts due to overlap highlighting and annotation complexity. | Hover species bar → timeline detail; click overlap zone → expand co-existence analysis; annotation markers for key moments | Medium — Gantt-style layout with overlap highlighting and annotation system |
| D13 | DH1 Cranium 3D Viewer | Tier 5 | React Three Fiber | Interactive 3D model of the naledi holotype skull. OrbitControls for rotation/zoom. 12 annotation hotspots on key anatomical features (supraorbital torus, sagittal keel, foramen magnum, endocranial volume marker, etc.). Environment lighting simulates headlamp. Mesh decimated to ~500KB–1MB (glTF format). Fallback: static multi-angle photography for low-powered devices. | Orbit (drag to rotate, scroll to zoom); click hotspot → expand annotation with measurement and significance; reset view button; toggle annotations on/off | Very High — WebGL rendering, glTF mesh loading, HTML overlay annotations via drei's `Html` component, performance optimization |
| D14 | Naledi Hand 3D Viewer | Tier 5 | React Three Fiber | Interactive 3D model of the composite naledi hand. 10 annotation hotspots on bone regions. Key interaction: rotating to see curved fingers (primitive) from one angle and modern thumb/wrist from another — the paradox is spatial and the 3D viewer is the only medium that communicates it fully. Same technical stack as D13. | Orbit controls; click hotspot → bone annotation with classification (primitive/derived/mosaic); "paradox view" preset rotations (button toggles between "climbing grip" and "precision grip" angles) | Very High — same WebGL stack as D13; additional preset rotation animations |

## Summary

| Tier | Count | Visualizations |
|------|-------|---------------|
| Tier 2 | 1 | D10 |
| Tier 3 | 11 | D1, D2, D3, D4, D5, D6, D7, D8, D9, D11, D12 |
| Tier 5 | 2 | D13, D14 |
| **Average Tier** | **3.14** | Exceeds standard minimum (≥2.0) |

This exceeds Lucy's average tier (2.83) and introduces the platform's first Tier 5 WebGL visualizations.

## Component Decomposition

Per the >80-line rule, all Tier 3 and Tier 5 visualizations MUST be separate component files:

| Component File | Visualization(s) | Estimated Lines | Shared Utilities |
|---------------|-------------------|-----------------|-----------------|
| CaveCrossSection.tsx | D1 | 250–350 | SVG annotation system, tooltip system |
| AnatomicalMosaic.tsx | D2 | 250–350 | SVG annotation system, comparison panel |
| BrainBehaviourScatter.tsx | D3 | 150–200 | Tooltip system, D3 scales |
| DatingTimeline.tsx | D4 | 200–250 | D3 scales, annotation system, tooltip system |
| ChamberFloorPlan.tsx | D5 | 200–300 | SVG annotation system, tooltip system |
| SkullComparison.tsx | D6 | 250–350 | SVG annotation system, measurement overlay, tooltip system |
| HandMorphology.tsx | D7 | 250–350 | SVG annotation system, comparison panel, D3 scales (curvature sub-chart) |
| DisposalEvidence.tsx | D8 | 200–300 | D3 force/tree layout, tooltip system |
| CradleSitesMap.tsx | D9 | 200–300 | D3-geo, tooltip system |
| PhylogeneticPosition.tsx | D11 | 200–300 | D3 tree layout, tooltip system |
| CoexistenceTimeline.tsx | D12 | 150–250 | D3 scales, annotation system, tooltip system |
| CraniumViewer.tsx | D13 | 300–400 | 3D viewer core (shared with D14), annotation hotspot system |
| HandViewer.tsx | D14 | 300–400 | 3D viewer core (shared with D13), annotation hotspot system |

D10 (Recharts grouped bar) may be inline in the client component if under 80 lines, or extracted if it exceeds that threshold.

**Total estimated visualization code**: ~3,000–4,200 lines across 13 component files, plus ~400–600 lines of shared utilities.

## Shared Utility Code — Component Decomposition Strategy

Multiple visualizations share common interaction patterns and utility logic. Extracting shared code reduces duplication, ensures consistency, and makes the codebase maintainable.

### Shared Pattern 1: SVG Annotation System

**Used by**: D1, D2, D4, D5, D6, D7, D12

Multiple visualizations overlay clickable annotation markers on SVG elements — waypoints on the cave cross-section, bone regions on the skeleton, measurement lines on skulls, grid zones on the floor plan, event markers on timelines.

```
utils/SvgAnnotation.tsx (~80–120 lines)
├── <AnnotationMarker />    — positioned circle/icon with click handler
├── <AnnotationPanel />     — expandable detail panel anchored to marker
├── <AnnotationConnector /> — line/path connecting marker to panel
└── useAnnotationState()    — hook managing open/closed/hover states
```

### Shared Pattern 2: Tooltip System

**Used by**: D1, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12

Every Tier 2+ visualization needs tooltips. A shared tooltip component eliminates 11 separate tooltip implementations.

```
utils/ChartTooltip.tsx (~60–80 lines)
├── <ChartTooltip />     — positioned tooltip with arrow, styled per design tokens
├── useTooltipPosition() — hook calculating tooltip position relative to cursor/element
└── tooltipStyles        — shared style constants (Cave Charcoal bg, Bone Ivory text)
```

### Shared Pattern 3: D3 Scale Factory

**Used by**: D3, D4, D5, D6, D7, D8, D9, D11, D12

Nine visualizations use D3 scales. A shared factory standardizes scale creation and axis formatting.

```
utils/scales.ts (~40–60 lines)
├── createTimeScale()   — ka/Ma time scales with proper tick formatting
├── createLinearScale()  — standard linear with naledi-specific domain helpers
├── createBandScale()    — for bar charts and Gantt-style layouts
└── formatKa() / formatMa() — consistent date label formatting across all charts
```

### Shared Pattern 4: Comparison Panel

**Used by**: D2, D6, D7

Three visualizations use side-by-side species comparison panels that expand from a clicked region. Shared layout and animation logic.

```
utils/ComparisonPanel.tsx (~100–140 lines)
├── <ComparisonPanel />  — sliding panel with species columns
├── <SpeciesColumn />    — single species data column (label, image, measurements)
├── <ClassificationBadge /> — primitive / derived / mosaic badge component
└── usePanelTransition() — animation hook (expand/collapse with design-token timing)
```

### Shared Pattern 5: 3D Viewer Core

**Used by**: D13, D14

Both Tier 5 viewers share the same rendering pipeline, lighting setup, orbit controls, and annotation hotspot system. The only differences are the mesh, camera position, and hotspot data.

```
utils/SpecimenViewer.tsx (~200–250 lines)
├── <SpecimenViewer />      — Canvas + Scene + Environment + OrbitControls wrapper
├── <SpecimenMesh />        — glTF loader with PBR material (Bone Ivory + roughness)
├── <AnnotationHotspot />   — drei Html component positioned at 3D coordinates
├── <ViewerFallback />      — static image fallback for no-WebGL environments
├── useViewerLighting()     — headlamp-style lighting setup (Signal Amber directional)
├── useViewerEntrance()     — entrance animation (opacity + rotation ramp)
└── VIEWER_DEFAULTS         — shared camera, controls, and performance settings
```

This means D13 and D14 are relatively thin wrappers:

```
CraniumViewer.tsx  = <SpecimenViewer mesh={craniumGltf} hotspots={craniumHotspots} />
HandViewer.tsx     = <SpecimenViewer mesh={handGltf} hotspots={handHotspots} presets={gripPresets} />
```

### Shared Pattern 6: Intersection Observer Wrapper

**Used by**: All 14 visualizations (lazy loading and entrance animations)

```
utils/useScrollReveal.ts (~30–40 lines)
├── useScrollReveal()     — IntersectionObserver hook returning { ref, isVisible, hasEntered }
└── REVEAL_THRESHOLD      — shared threshold (0.15 for Tier 2–3, 0.05 for Tier 5 viewers)
```

### Utility Budget Summary

| Utility | Estimated Lines | Consumers |
|---------|----------------|-----------|
| SvgAnnotation.tsx | 80–120 | D1, D2, D4, D5, D6, D7, D12 |
| ChartTooltip.tsx | 60–80 | D1–D12 (all except D13, D14) |
| scales.ts | 40–60 | D3, D4, D5, D6, D7, D8, D9, D11, D12 |
| ComparisonPanel.tsx | 100–140 | D2, D6, D7 |
| SpecimenViewer.tsx | 200–250 | D13, D14 |
| useScrollReveal.ts | 30–40 | All 14 |
| **Total shared code** | **510–690** | |

## D3 Module Budget

Import only needed D3 modules to minimize bundle:

- `d3-scale` + `d3-axis`: D3, D4, D5, D6, D7, D11, D12
- `d3-shape`: D3, D4, D8, D11, D12
- `d3-selection` + `d3-transition`: all D3 visualizations (D1–D12 except D10)
- `d3-geo` + `d3-geo-projection`: D9 (single map)
- `d3-hierarchy`: D8, D11 (tree layouts)
- `d3-voronoi` or `d3-delaunay`: D3 (scatter hover detection)
- `d3-path`: D1 (cave cross-section custom path)
- `d3-interpolate`: D6, D11 (animated transitions between states)
- `d3-color`: utility (palette manipulation)

**Avoid**: `d3-force` (D8 uses tree, not force), `d3-chord`, `d3-contour`, `d3-sankey`, `d3-brush` (no brushable charts in this essay)

## Three.js / React Three Fiber Module Budget (D13, D14)

- `@react-three/fiber`: Core renderer
- `@react-three/drei`: OrbitControls, Environment, Html (annotation overlays), useGLTF (mesh loading), PresentationControls (optional)
- `three`: Underlying engine (peer dependency)

**Bundle strategy**: Code-split the entire 3D viewer system behind `React.lazy()` / `next/dynamic`. The Three.js bundle (~150KB gzipped) only downloads when the first 3D viewer scrolls into view. Both D13 and D14 share the same chunk.

## Mobile Degradation Strategy

| Viz | Desktop | Mobile (< 768px) |
|-----|---------|-------------------|
| D1 | Horizontal cross-section with clickable waypoints | Vertical stacked card layout; tap waypoint to expand; no animated journey mode |
| D2 | Click-to-explore skeleton with comparison panels | Guided tour mode only; step through body regions sequentially |
| D3 | Voronoi hover scatter with toggle | Tap-to-select scatter; toggle button prominent above chart |
| D4 | Horizontal timeline with hover | Simplified timeline; tap species bar for detail modal |
| D5 | Zoomable floor plan with overlays | Static plan; tap grid zone for detail popup; single overlay mode |
| D6 | Toggle between 4 skull overlays | Swipe carousel; one species at a time with measurement overlay |
| D7 | Click-to-explore hand with sub-chart | Guided tour mode; curvature chart below hand (no sync scroll) |
| D8 | Force/tree layout with toggle | Simplified vertical list with expand/collapse; no animated layout |
| D9 | Zoomable map with click markers | Static map; tap site for popup; no zoom/pan |
| D10 | Grouped bar chart | Same (Recharts responsive) |
| D11 | Animated tree toggle | Swipe between 3 tree views; no animated transition |
| D12 | Gantt chart with overlap highlighting | Simplified vertical list; tap species for date range detail |
| D13 | Full 3D orbit + 12 hotspots | Touch orbit (single-finger rotate, pinch zoom); reduced mesh (~300KB); 6 priority hotspots only |
| D14 | Full 3D orbit + 10 hotspots + preset rotations | Touch orbit; reduced mesh; 5 priority hotspots; preset rotation buttons (no custom presets) |

## Performance Notes

- Total estimated visualization JS: ~3,500–4,900 lines across 13 component files + ~550 lines shared utilities
- Code-split ALL Tier 3 components with `next/dynamic` or `React.lazy`
- 3D viewer chunk (D13 + D14 + Three.js): ~150KB gzipped, lazy-loaded independently
- D3 selective imports keep the D3 bundle to ~40–60KB gzipped (vs. ~80KB for full d3)
- TopoJSON for Cradle of Humankind map: minimal topology (~20KB) — small geographic extent
- glTF meshes: pre-decimated to 500KB–1MB each; served from CDN with aggressive caching
- IntersectionObserver on ALL visualizations: nothing renders until scrolled into view
- 3D viewers: `frameloop="demand"` in React Three Fiber — only re-render on interaction, not continuous
- `requestAnimationFrame` cleanup on unmount for all animated components
- Lighthouse target: maintain <3s LCP with all 14 visualizations lazy-loaded
