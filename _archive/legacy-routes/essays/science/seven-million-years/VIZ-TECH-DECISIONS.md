---
gate: G4.6
status: PASS
slug: seven-million-years
auditor: visualization-architect
date: 2026-02-24
total_visualizations: 9
average_tier: 2.0
minimum_tier: 2
---

# Visualization Technology Decisions: Seven Million Years

## Technology Tier Reference

- **Tier 0 (CSS):** Progress bars, hover states, micro-interactions ONLY
- **Tier 1 (SVG):** Annotated diagrams, small data (<20 points), process flows
- **Tier 2 (D3+SVG / Recharts):** Data visualizations, animated transitions, geographic maps
- **Tier 3 (Canvas):** High-volume rendering, particle systems, scroll-linked rendering
- **Tier 4 (Three.js):** 3D scenes, spatial simulations

---

## Technology Assignments

### V1: Phylogenetic Tree
- **Purpose:** Interactive cladogram showing all hominin species with time-scaled branches
- **Minimum Tier:** Tier 2 (D3+SVG)
- **Assigned Tier:** Tier 2
- **Justification:** Tree layout with 20+ nodes, time-scaled x-axis, click interactivity, hover tooltips. CSS cannot render a proper cladogram. D3's tree/cluster layouts are purpose-built for this.
- **Required Imports:** `d3-hierarchy`, `d3-shape`, `d3-scale`, `d3-selection`, `d3-transition`
- **Estimated Lines:** 180–250 (separate component: `PhylogeneticTree.tsx`)
- **Interactivity:** Click nodes for species detail popup, hover for date/brain size, zoom/pan on mobile

### V2: Species Timeline (Gantt Chart)
- **Purpose:** Horizontal bars showing temporal range of every hominin species with overlap visualization
- **Minimum Tier:** Tier 2 (Recharts)
- **Assigned Tier:** Tier 2
- **Justification:** 24 species with temporal ranges, color-coded by genus, hover interactions, timeline cursor. This is a multi-bar data visualization encoding quantitative temporal data — Tier 2 minimum.
- **Required Imports:** `recharts` (BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer)
- **Estimated Lines:** 120–160
- **Interactivity:** Hover for species details, vertical cursor shows "who was alive at this date"

### V3: Brain Volume Chart
- **Purpose:** Scatter plot showing cranial capacity across species and time with trend line
- **Minimum Tier:** Tier 2 (Recharts)
- **Assigned Tier:** Tier 2
- **Justification:** 18+ data points on two quantitative axes (time, cc) with trend line. Scatter chart encoding numerical data — Tier 2 minimum.
- **Required Imports:** `recharts` (ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Line)
- **Estimated Lines:** 100–140
- **Interactivity:** Hover for species name, brain size, date range

### V4: Migration Map — Out of Africa I (H. erectus)
- **Purpose:** Animated world map showing H. erectus dispersal from East Africa
- **Minimum Tier:** Tier 2 (D3-geo)
- **Assigned Tier:** Tier 2
- **Justification:** Geographic visualization with animated paths on a projected world map. Requires proper cartographic projection, topojson rendering, and path animation. D3-geo is the minimum viable technology.
- **Required Imports:** `d3-geo`, `d3-selection`, `d3-transition`, `d3-interpolate`, `topojson-client`
- **Estimated Lines:** 200–280 (separate component: `MigrationMap.tsx`)
- **Interactivity:** Play/pause animation, click sites for details, toggle routes

### V5: Climate Overlay
- **Purpose:** Marine isotope δ18O curve with species range bars overlaid
- **Minimum Tier:** Tier 2 (D3)
- **Assigned Tier:** Tier 2
- **Justification:** Line chart with time series data (~5000 data points downsampled), overlaid with semi-transparent horizontal bands for species ranges, and vertical event markers. The layered nature and data volume require D3.
- **Required Imports:** `d3-scale`, `d3-shape`, `d3-axis`, `d3-selection`
- **Estimated Lines:** 150–200
- **Interactivity:** Hover for climate values, toggle species overlay layers

### V6: Species Comparison Dashboard (Sapiens vs. Neanderthals)
- **Purpose:** Multi-axis radar chart comparing Neanderthals and Homo sapiens
- **Minimum Tier:** Tier 2 (Recharts)
- **Assigned Tier:** Tier 2
- **Justification:** Radar chart with 8+ axes encoding comparative data between two species. Requires proper polygon rendering on multiple axes with labels and legends.
- **Required Imports:** `recharts` (RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, ResponsiveContainer)
- **Estimated Lines:** 100–130
- **Interactivity:** Toggle between species pairs, hover for detailed values

### V7: Tool Technology Timeline
- **Purpose:** Visual progression from Lomekwian through Upper Paleolithic
- **Minimum Tier:** Tier 2 (D3+SVG)
- **Assigned Tier:** Tier 2
- **Justification:** Stepped timeline with 5 stages, each encoding temporal data, associated species, and tool descriptions. Scroll-driven reveal with annotated visual elements.
- **Required Imports:** `d3-scale`, `d3-selection` (or custom SVG with Recharts)
- **Estimated Lines:** 100–140
- **Interactivity:** Scroll through stages, hover for details

### V8: Body Size Comparison
- **Purpose:** Scaled silhouettes and bar chart of height/mass across species
- **Minimum Tier:** Tier 2 (Recharts + custom SVG)
- **Assigned Tier:** Tier 2
- **Justification:** Grouped bar chart encoding height and mass data for 10+ species, plus scaled silhouette overlay. Quantitative comparison data — Tier 2 minimum.
- **Required Imports:** `recharts` (BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer)
- **Estimated Lines:** 120–160
- **Interactivity:** Hover silhouettes for species details, toggle height/mass view

### V9: Global Migration Animation (Sapiens Out of Africa II)
- **Purpose:** Full animated migration map showing sapiens dispersal to all continents
- **Minimum Tier:** Tier 2 (D3-geo)
- **Assigned Tier:** Tier 2
- **Justification:** Geographic visualization with multiple animated routes, date labels, population density, and temporal scrubbing. This is a centerpiece visualization — D3-geo with topojson is the minimum viable technology.
- **Required Imports:** `d3-geo`, `d3-selection`, `d3-transition`, `d3-interpolate`, `d3-scale`, `topojson-client`
- **Estimated Lines:** 250–350 (separate component: `GlobalMigrationMap.tsx`)
- **Interactivity:** Play/pause, speed control, timeline scrubber, click sites for details

---

## Non-Visualization UI Elements (Tier 0)

These are CSS-only micro-interactions, not data visualizations:

| Element | Tier | Notes |
|---------|------|-------|
| Reading progress bar | Tier 0 (CSS) | Vertical fill bar, scroll-driven |
| Section reveal animations | Tier 0 (CSS) | IntersectionObserver + CSS transitions |
| Era badge styling | Tier 0 (CSS) | Static styled elements |
| Hover states | Tier 0 (CSS) | Background/opacity transitions |
| Stratum dividers | Tier 0 (CSS) | Gradient border elements |

---

## Component File Plan

Large visualizations (>80 lines) that need separate component files:

| Component | File | Estimated Lines |
|-----------|------|----------------|
| PhylogeneticTree | `PhylogeneticTree.tsx` | 180–250 |
| MigrationMap | `MigrationMap.tsx` | 200–280 |
| GlobalMigrationMap | `GlobalMigrationMap.tsx` | 250–350 |

All other visualizations can be inline in `SevenMillionYearsClient.tsx` or extracted if they exceed 80 lines during implementation.

---

## Library Budget

| Library | Already Installed? | Modules Used |
|---------|-------------------|-------------|
| Recharts | ✅ Yes (^3.3.0) | ScatterChart, BarChart, RadarChart, etc. |
| d3-geo | ✅ Yes (3.1.1) | geoPath, geoNaturalEarth1, geoGraticule |
| d3-scale | ✅ Yes (4.0.2) | scaleLinear, scaleTime, scaleOrdinal |
| d3-interpolate | ✅ Yes (3.0.1) | interpolate, interpolateString |
| topojson-client | ✅ Yes (3.1.0) | feature, mesh |
| d3-hierarchy | ❌ No — needs install | tree, cluster |
| d3-shape | ❌ No — needs install | line, area, linkHorizontal |
| d3-selection | ❌ No — needs install | select, selectAll |
| d3-transition | ❌ No — needs install | transition |
| d3-axis | ❌ No — needs install | axisBottom, axisLeft |

**Action Required:** Install d3-hierarchy, d3-shape, d3-selection, d3-transition, d3-axis before G5.

---

## Tier Summary

| Tier | Count | Percentage |
|------|-------|-----------|
| Tier 0 (CSS) | 5 UI elements | N/A (not data visualizations) |
| Tier 2 (D3/Recharts) | 9 visualizations | 100% |
| Tier 3+ | 0 | 0% |

**Average Visualization Tier: 2.0** (minimum threshold met)
**No data-encoding visualization assigned below Tier 2.** ✅
