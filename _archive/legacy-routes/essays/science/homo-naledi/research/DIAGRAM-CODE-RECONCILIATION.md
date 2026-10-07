---
gate: G5.3
artifact: DIAGRAM-CODE-RECONCILIATION
status: PASS
date: 2026-02-25
auditor: diagram-code-reconciliation-auditor
---

# Diagram-Code Reconciliation: Homo naledi

## Reconciled Contracts

### D3 -- Brain Size vs. Behavioural Complexity
- @diagram-contract block present in HomoNalediClient.tsx
- X_AXIS_MEANING: endocranial volume in cc -- verified, Recharts XAxis dataKey="cc"
- Y_AXIS_MEANING: behavioural complexity score -- verified, YAxis dataKey="score"
- SPECIES_DATA: 9 species + naledi dual position -- verified, 10 data points
- Naledi plots at 560cc -- verified in brainBehaviourData array

### D4 -- Dating Timeline
- @diagram-contract block present
- TIME_RANGE: 600-0 ka, left=older -- verified, d3.scaleLinear domain [600, 0]
- SPECIES_RANGES: H. naledi 335-236 ka -- verified in datingData array
- Dirks et al. 2017 sourced -- verified in contract annotation

### D10 -- Body Proportion Comparison
- @diagram-contract block present
- DUAL_BAR_ENCODING: stature (cm) + mass (kg) -- verified, Recharts Bar dataKey
- DATA_ACCURACY: naledi 144cm/40kg, Lucy 107cm/29kg -- verified in bodyProportionData
- Source: Garvin et al. 2017 -- verified in annotation

### D11 -- Phylogenetic Position
- @diagram-contract block present
- THREE_MODELS: A (Basal), B (Sister erectus), C (Independent) -- verified, 3 tree objects
- Naledi position changes between models -- verified, highlight property
- Source: Dembo et al. 2016 -- verified in annotation

### D12 -- Species Coexistence Timeline
- @diagram-contract block present
- GANTT_LAYOUT: horizontal bars, x in Ma -- verified, d3.scaleLinear domain [3.2, 0]
- Naledi range Signal Amber -- verified, color property

### D8 -- Disposal Evidence
- @diagram-contract block present
- EVIDENCE_NODES: 9 evidence points with pro/counter -- verified, disposalEvidence array
- Strength encoding (strong/moderate/weak) -- verified in data and bar width logic

## Summary

| Contract | Present | Reconciled | Status |
|----------|---------|-----------|--------|
| D3 Brain vs Behaviour | Yes | Yes | PASS |
| D4 Dating Timeline | Yes | Yes | PASS |
| D8 Disposal Evidence | Yes | Yes | PASS |
| D10 Body Proportions | Yes | Yes | PASS |
| D11 Phylogenetic Position | Yes | Yes | PASS |
| D12 Species Coexistence | Yes | Yes | PASS |

All 6 @diagram-contract blocks reconciled. No direction inconsistencies. No scale mismatches.
