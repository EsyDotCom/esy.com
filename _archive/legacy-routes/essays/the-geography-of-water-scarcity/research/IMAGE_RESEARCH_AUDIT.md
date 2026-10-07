# Image Research Audit: The Geography of Water Scarcity

**Date**: February 8, 2026  
**Gate**: G4.5 — Image Sourcing  
**Status**: ✅ PASS (No External Images Required)

---

## Assessment

This is a **Data Journalism** visual essay. All visual elements are **programmatic data visualizations** built with React, D3, and SVG — not external imagery.

### Visual Elements (All Programmatic)

| Visual | Type | Implementation | External Images? |
|--------|------|---------------|-----------------|
| Interactive Choropleth Map | D3 + TopoJSON SVG | Embedded geometry + data | ❌ None |
| Animated Flow Diagram (Sankey) | D3/React SVG | Programmatic paths | ❌ None |
| Country Comparison Widget | React + animated bars | UI components | ❌ None |
| Scroll-Locked Explainer | React + SVG layers | Programmatic build | ❌ None |
| Reactive Data Ticker | React + CSS | Typography-based | ❌ None |

### Data Assets (Embedded)

| Asset | Format | Source | License |
|-------|--------|--------|---------|
| World topology (110m) | TopoJSON (embedded JSON) | Natural Earth | Public Domain |
| Country stress data | JSON (embedded) | WRI Aqueduct (approximated) | Open Data |
| Allocation percentages | Constants | FAO AQUASTAT | Public |
| Comparison metrics | JSON object | World Bank / national authorities | Public |
| Ticker statistics | Constant array | Multiple (cited in essay) | Public |

### Conclusion

**No external image sourcing, licensing, or migration is required.** All visual content is generated programmatically from embedded data. The only external dependency is the world-110m TopoJSON topology, which is public domain (Natural Earth project).

---

*This essay uses the Data Journalism mode of the Conceptual Essay Pipeline. Photography is not part of the visual medium — all visuals are data visualizations.*
