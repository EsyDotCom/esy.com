---
status: PASS
date: 2026-03-05
build: opus-4-6
---

# Diagram-Code Reconciliation — Turkana Boy (opus-4-6)

## Summary

7 `@diagram-contract` comments verified against implementation. All invariants hold.

## Reconciliation

| Viz | Contract Claim | Code Behavior | Match |
|-----|---------------|---------------|-------|
| SkeletalCompletenessViz | interactive SVG, 8 bone regions, found/total, clickable | 8 regions in BONE_REGIONS, hover state, percentage display | YES |
| AgeDiscrepancyViz | D3 horizontal range chart, dental (7.6–8.8), skeletal (10–11), consensus 8.5 | d3.scaleLinear [6,12], two rect ranges, dashed line at 8.5 | YES |
| GrowthProjectionViz | Recharts AreaChart, 3 series, Turkana as dashed | human/chimp/turkana series, strokeDasharray on turkana | YES |
| BodyProportionViz | Recharts grouped BarChart, 4 species × 3 metrics | BODY_PROPORTIONS array with 4 species keys, 3 data rows | YES |
| BrainVolumeViz | Recharts horizontal BarChart, Turkana highlighted | layout="vertical", per-Cell fill from BRAIN_DATA.color | YES |
| VoiceDebateViz | annotated SVG timeline, 3 events, toggle detail on click | VOICE_EVENTS[3], onClick toggles expanded state, foreignObject | YES |
| MigrationMapViz | D3-geo Natural Earth, simplified landmasses, 5 sites, arcs | geoNaturalEarth1, LANDMASSES FeatureCollection, 5 MIGRATION_SITES, quadratic bezier arcs | YES |
