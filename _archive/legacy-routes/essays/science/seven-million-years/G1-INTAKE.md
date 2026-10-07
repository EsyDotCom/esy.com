---
gate: G1
status: APPROVED
slug: seven-million-years
depth: deep
approved_by: visual-essay-orchestrator
date: 2026-02-24
---

# G1 Intake Approval: Seven Million Years

## Topic Confirmation

**Title:** Seven Million Years — The Complete Visual History of Our Kind
**Category:** Science / History (dual-category — paleoanthropology)
**Depth Mode:** Deep
**Estimated Read Time:** 35–45 min
**Target Path:** `src/app/essays/seven-million-years/`

## Scope Definition

This is a comprehensive expository visual essay tracing the entire hominid lineage from the earliest known candidates (~7 million years ago) through to modern Homo sapiens. The essay is photographic in character — museum specimens, fossil reconstructions, archaeological landscapes — with publication-quality data visualizations and interactive migration maps.

### What's In Scope

1. **Complete hominid taxonomy** — Every major species from Sahelanthropus tchadensis to Homo sapiens, including controversial and recently discovered species (H. naledi, H. floresiensis, H. luzonensis, H. longi, Denisovans)

2. **Geological and climatic context** — Miocene through Holocene, with emphasis on how climate oscillations (glacial/interglacial cycles) shaped speciation, migration, and extinction

3. **Species-by-species profiles** — Temporal range, geographic range, key anatomical features, tool technology, behavioral evidence, theoretical cause of decline

4. **Comparative analysis** — Side-by-side anatomical comparisons (cranial capacity, body proportions, dental morphology), behavioral comparisons (tool traditions, fire use, burial practices, symbolic behavior)

5. **The sapiens question** — Why Homo sapiens survived when all others went extinct. Major theories: social network superiority, language and symbolic thought, dietary generalism, technological adaptability, cultural cumulation (ratchet effect), demographic advantages

6. **Migration and dispersal** — Out of Africa events (multiple waves), Homo erectus global spread, Neanderthal range, Denisovan distribution, sapiens colonization of every continent

7. **Interbreeding and genetic legacy** — Neanderthal DNA in modern humans (1-4%), Denisovan admixture in Melanesian/East Asian populations, implications for the "replacement vs. assimilation" debate

### What's Out of Scope

- Post-agricultural human history (Holocene civilizations)
- Detailed primate evolution before the hominin split
- Genetic engineering / future human evolution speculation
- Non-hominin great ape evolution in depth

## Research Requirements (Deep Mode)

### Minimum Source Requirements
- **15+ primary/secondary sources** (Tier 1–2)
- Major paleoanthropological journals: Nature, Science, PNAS, Journal of Human Evolution
- Key monographs: Stringer & Andrews, Tattersall, Wood & Richmond, Hublin et al.
- Museum collections: Smithsonian, Natural History Museum London, Nairobi National Museum

### Key Research Questions

1. What is the current consensus phylogeny of hominins? Where do the major debates lie (e.g., Sahelanthropus as hominin vs. ape)?
2. What drove the evolution of bipedalism? (Savanna hypothesis, woodland hypothesis, postural feeding)
3. What is the evidence for and against the cognitive revolution hypothesis?
4. How many "Out of Africa" events are now recognized, and what species were involved?
5. What killed the Neanderthals? (Climate, competition, hybrid absorption, disease, combination?)
6. What is the latest Denisovan evidence, and how does it change our understanding of Late Pleistocene hominins?
7. Where does Homo naledi fit — a million-year survival of an archaic form, or something else?
8. What does the Harbin cranium (H. longi / "Dragon Man") mean for hominin phylogeny?

### Visual Research Requirements

- Museum photography: fossil crania, postcranial remains, tool assemblages
- Landscape photography: Olduvai Gorge, Sterkfontein, Dmanisi, Atapuerca, Liang Bua
- Reconstruction art: Elisabeth Daynès, John Gurche, Kennis & Kennis (check licensing)
- Climate data: marine isotope stages, temperature reconstructions
- Geographic data: continental configurations, vegetation zones, ice sheet extents

## Visualization Requirements

### Data Visualizations (must be Tier 2+ per quality standard)
1. **Hominid Timeline** — All species temporal ranges with overlap, interactive scrubbing
2. **Brain Volume Chart** — Cranial capacity (cc) across species and time (scatter + trend)
3. **Body Size Comparison** — Height and mass estimates across species
4. **Tool Technology Progression** — Oldowan → Acheulean → Mousterian → Upper Paleolithic
5. **Climate Overlay** — Marine isotope stages with species ranges superimposed
6. **Geographic Range Maps** — Per-species or per-era range polygons on world map
7. **Migration Animation** — Animated dispersal routes over time (requires D3 + topojson)
8. **Species Comparison Matrix** — Multi-axis comparison across key traits
9. **Phylogenetic Tree** — Interactive cladogram with branch lengths proportional to time

### Photography Integration
- Full-bleed photographic sections for each major era
- Specimen photography with annotations
- Landscape photography establishing geographic context

## Special Requirements & Constraints

1. **No existing essay design inheritance** — This essay must have a completely original visual identity derived from its subject matter (geological strata, bone, stone, ochre, cave environments)
2. **Scientific accuracy** — All dates, species names, and claims must be sourced. Use "approximately" for contested dates. Note where scientific consensus is uncertain.
3. **Taxonomic disputes** — Acknowledge major naming controversies (e.g., H. ergaster vs. H. erectus, H. heidelbergensis as a wastebasket taxon) without taking an editorial position
4. **Photography-forward design** — This is a visual essay in the most literal sense. Text serves the images, not the other way around.
5. **Chart quality** — All data visualizations must be publication-quality. No CSS-only bar charts, no primitive SVG shapes. Use Recharts or D3 with proper axes, legends, and annotations.
6. **Migration map** — Must use D3-geo with proper projections and animated paths. This is a centerpiece visualization.
7. **Accessibility** — All images must have descriptive alt text. Charts must have screen-reader-accessible data tables.
8. **Responsive** — Full mobile support. Complex visualizations should adapt gracefully to narrow viewports.

## Depth Mode Justification

**Deep** is required because:
- The topic spans 7 million years and 15+ species
- Each species requires individual treatment with sourced claims
- Multiple competing theories must be presented fairly
- The visualization suite is extensive (9+ data visualizations)
- Migration mapping requires geographic data research
- Cross-species comparisons require consistent, sourced metrics
- The interbreeding/genetic legacy section requires recent genomic literature

## Decision

**STATUS: APPROVED**

This essay is approved for deep-mode research. Proceed to G2 (Research Complete).
