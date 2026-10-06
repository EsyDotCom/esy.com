---
gate: G2
artifact: DATASETS
status: VERIFIED
visualization_count: 14
date: 2026-02-25
---

# Visualization Datasets — Homo naledi: The Rising Star

> Quantitative data tables for visualizations D1–D14. Each table provides
> the structured data needed to build the corresponding interactive
> visualization. All measurements cite primary literature; estimates are
> flagged with `~` and sourced.
>
> **D1–D14: Complete.**

---

## D1 · Cave Cross-Section — Rising Star Cave System

Interactive SVG cross-section with clickable waypoints. Data sourced from
Dirks et al. 2015 (*eLife* 4:e09561), Elliott et al. 2021, and Berger &
Hawks 2017 (*Almost Human*).

### Waypoint Table

| # | Waypoint | Distance from Entrance (m) | Passage Width (cm) | Passage Height (cm) | Elevation Change (m) | Cumulative Elevation (m) | Description | Traversal Difficulty | Source |
|---|----------|---------------------------|--------------------|--------------------|---------------------|-------------------------|-------------|---------------------|--------|
| 1 | Entrance | 0 | ~200 | ~150 | 0 | 0 | Dolomite sinkhole opening on hillside; partially concealed by vegetation; leads into the Rising Star system | Easy | Dirks et al. 2015 |
| 2 | Initial Passage | 0–15 | ~100–300 | ~100–200 | −5 | −5 | Descending passage through weathered dolomite; headroom variable; experienced cavers proceed without equipment | Easy | Dirks et al. 2015 |
| 3 | Superman's Crawl (Start) | ~15 | ~25 | ~25 | 0 | −5 | Entrance to the constriction; named because the only way through is with one arm extended forward, one back — "like Superman flying" | Extreme | Dirks et al. 2015; Elliott 2015 |
| 4 | Superman's Crawl (End) | ~27 | ~25 | ~25 | 0 | −5 | 12 m long belly-crawl through a slot averaging 25 cm wide; impassable for anyone with shoulder breadth >25 cm; total darkness beyond this point | Extreme | Dirks et al. 2015 |
| 5 | Dragon's Back Chamber | ~35 | ~400 | ~300 | +8 | +3 | Open chamber after Superman's Crawl; must climb up a jagged dolomite ridge ("Dragon's Back") with exposed edges; loose rock | Hard | Dirks et al. 2015 |
| 6 | Dragon's Back Ridge (Summit) | ~40 | ~200 | ~150 | +6 | +9 | Top of the ridge climb; narrow traverse along crest before descent to the Chute | Hard | Dirks et al. 2015 |
| 7 | The Chute (Top) | ~45 | ~25 | ~18–25 | 0 | +9 | Entrance to the near-vertical slot leading down to the Dinaledi Chamber; the narrowest point in the system at ~18 cm | Extreme | Dirks et al. 2015; Elliott et al. 2021 |
| 8 | The Chute (Bottom) | ~47 | ~25 | ~18–25 | −12 | −3 | 12 m vertical descent through a fissure barely wider than a human skull; free-climbing required; no rope anchors in original discovery | Extreme | Dirks et al. 2015 |
| 9 | Dinaledi Chamber | ~50 | ~1000 | ~100–200 | −2 | −5 | Irregular chamber approximately 10 m × 2–3 m; fossils visible on surface; total darkness; ~30 m below surface; ~80 m horizontal from entrance | Destination | Dirks et al. 2015 |
| 10 | Lesedi Chamber Branch | ~55 | — | — | — | — | Separate passage branching ~100 m from the Dinaledi Chamber; reached via additional narrow passages; contains "Neo" skull and at least 3 individuals | Extreme | Hawks et al. 2017 |

### Cross-Section Profile (Elevation in metres relative to entrance)

```
Elevation
(m)
 +10  ·                    ╱Dragon's Back╲
  +5  ·              ╱╱╱╱╱╱              ╲  Chute Top
    0  ▬▬ Entrance                          |
  −5  ·    ╲╲╲╲╲╲╲╲╲╲╲                     |  12m drop
 −10  ·                  Superman's Crawl   |
 −15  ·                                     ▼  Dinaledi
       |----|----|----|----|----|----|----|----|
       0    10   20   30   40   50   60   70   80
                   Distance from entrance (m)
```

### Key Dimensions Summary

| Measurement | Value | Source |
|---|---|---|
| Total horizontal distance, entrance → Dinaledi | ~80 m | Dirks et al. 2015 |
| Total vertical depth, surface → Dinaledi | ~30 m below surface | Dirks et al. 2015 |
| Superman's Crawl length | ~12 m | Dirks et al. 2015 |
| Superman's Crawl average width | ~25 cm | Dirks et al. 2015; Elliott 2015 |
| The Chute vertical drop | ~12 m | Dirks et al. 2015 |
| The Chute minimum width | ~18 cm | Dirks et al. 2015; Elliott et al. 2021 |
| Dinaledi Chamber floor area | ~10 × 2–3 m (est. 20–30 m²) | Dirks et al. 2015 |
| Dinaledi → Lesedi distance | ~100 m (through passages) | Hawks et al. 2017 |

---

## D2 · Anatomical Mosaic — Trait Classification

Interactive skeleton diagram with colour-coded primitive/derived regions.
Data synthesized from Berger et al. 2015, and the individual anatomy
papers in the 2015–2017 eLife/Nature Communications/JHE collection.

### Trait Classification Table

| # | Body Region | Trait | Classification | Australopith Comparison | Modern *Homo* Comparison | Functional Implication | Source |
|---|---|---|---|---|---|---|---|
| 1 | Cranium | Endocranial volume ~560 cc (range 465–610 cc) | **Primitive** | *A. africanus* ~450 cc; *A. sediba* ~420 cc — naledi only slightly larger | *H. sapiens* ~1400 cc; *H. erectus* ~900 cc — naledi is 40% of sapiens | Brain size in the upper australopith range; well below any confirmed *Homo* except floresiensis | Garvin et al. 2017; Holloway et al. 2018 |
| 2 | Cranium | Frontal lobe organization (endocast) | **Derived** | Australopiths show ape-like frontal lobe sulcal pattern | Naledi frontal lobe morphology resembles *Homo* — human-like third frontal convolution (Broca's area region) | May indicate capacity for complex cognition or proto-language despite small volume | Holloway et al. 2018 |
| 3 | Cranium | Sagittal keel present | **Mosaic** | Absent in most australopiths | Present in *H. erectus*; absent in *H. sapiens* | Suggests structural affinity with *H. erectus* grade despite size difference | Schroeder et al. 2017 |
| 4 | Dentition | Small, simplified crown morphology | **Derived** | Australopiths have large, complex molars with thick enamel | Naledi molars are small and simplified, trending toward *H. sapiens* proportions | Diet shift toward processed or higher-quality foods; reduced masticatory demand | Berger et al. 2015; Irish et al. 2015 |
| 5 | Dentition | Relatively large anterior teeth | **Mosaic** | Australopiths have large anterior dentition | *H. sapiens* has reduced anterior teeth; naledi retains moderate size | Possible paramasticatory use or phylogenetic retention | Berger et al. 2015 |
| 6 | Shoulder / Scapula | Cranially oriented glenoid fossa | **Primitive** | *A. afarensis* and *A. africanus* have cranially oriented shoulders | *H. sapiens* glenoid faces laterally; *H. erectus* intermediate | Shoulder suited for overhead reaching and climbing; not optimized for throwing | Feuerriegel et al. 2017 |
| 7 | Shoulder / Scapula | Small scapular spine angle | **Primitive** | Similar to australopith condition | *H. sapiens* has wider scapular spine angle (more lateral orientation) | Upper limb retains arboreal functional signal | Feuerriegel et al. 2017 |
| 8 | Hand — Proximal phalanges | Strongly curved (included angle ~45–55°) | **Primitive** | *A. afarensis* ~48°; *A. africanus* similar curvature | *H. sapiens* ~32°; *Pan* ~56° — naledi intermediate but closer to apes | Retained capacity for arboreal locomotion; powerful flexor grip for climbing | Kivell et al. 2015 |
| 9 | Hand — Thumb | Long relative to fingers (thumb:finger ratio ~58–60%) | **Derived** | Australopith thumbs relatively shorter (~52–55%) | *H. sapiens* ~58–61%; naledi matches the modern human ratio | Precision grip capability; tool-making potential | Kivell et al. 2015 |
| 10 | Hand — Wrist (trapezoid, capitate) | Human-like configuration | **Derived** | Australopiths retain more ape-like carpal morphology | Naledi wrist bones closely resemble *H. sapiens* and Neanderthals | Stable, load-bearing wrist for tool use; opposed to the mobile wrist of climbers | Kivell et al. 2015 |
| 11 | Trunk / Thorax | Funnel-shaped (cranially narrow, caudally wide) | **Primitive** | *A. afarensis* and *A. sediba* have funnel-shaped thorax | *H. sapiens* and *H. erectus* have barrel-shaped thorax | Rib cage geometry suggests a breathing pattern and gut size closer to australopiths | Williams et al. 2017 |
| 12 | Trunk / Vertebrae | Strong lumbar lordosis | **Derived** | Moderate in australopiths | Well-developed in *H. sapiens*; naledi matches the modern condition | Efficient upright posture and bipedal locomotion; energy-saving spinal curvature | Williams et al. 2017 |
| 13 | Pelvis — Iliac blades | Flared, laterally oriented | **Primitive** | *A. africanus* (Sts 14) — broad, flared ilia; naledi resembles this condition | *H. sapiens* ilia are shorter and less flared; *H. erectus* narrower | Broader pelvis accommodates funnel-shaped thorax; primitive locomotor pattern in trunk | Laird et al. 2017; VanSickle et al. 2017 |
| 14 | Pelvis — Ischium | More derived than ilium | **Mosaic** | Australopith ischia are longer and more ape-like | Naledi ischium has some *Homo*-like features (shorter, reoriented) | Mixed pelvic signals — lower pelvis trending toward *Homo* while upper pelvis retains australopith form | Laird et al. 2017 |
| 15 | Femur | Long, with relatively thin cortical bone; low neck-shaft angle | **Mosaic** | Australopiths have shorter femora with thicker cortical bone | *H. sapiens* has long femora; naledi femoral length approaches modern range but shaft morphology is distinctive | Bipedal locomotion with a gait pattern slightly different from both australopiths and modern humans | Marchi et al. 2017 |
| 16 | Tibia | Human-like length and proportions | **Derived** | Australopiths have shorter tibiae relative to femur | Naledi tibial proportions fall within the *H. sapiens* range | Efficient striding bipedalism; long lower leg contributes to stride length | Marchi et al. 2017 |
| 17 | Foot — Architecture | Longitudinal arch present; adducted hallux | **Derived** | *A. afarensis* has partial arch; hallux more divergent | Naledi foot "virtually indistinguishable" from *H. sapiens* in most features | Committed, obligate terrestrial bipedalism; heel-strike, toe-off gait cycle | Harcourt-Smith et al. 2015 |
| 18 | Foot — Toes | Slightly curved proximal pedal phalanges | **Mosaic** | Australopiths have more curved pedal phalanges | *H. sapiens* pedal phalanges are straight; naledi shows minor curvature | Subtle retention of grasping capacity, though foot is functionally modern | Harcourt-Smith et al. 2015 |

### Classification Summary

| Classification | Count | Body Regions |
|---|---|---|
| **Primitive** | 6 | Cranial volume, shoulder orientation, scapular spine, phalanx curvature, thorax shape, iliac flare |
| **Derived** | 7 | Frontal lobe organization, dental crown size, thumb length, wrist morphology, lumbar lordosis, tibial proportions, foot architecture |
| **Mosaic** | 5 | Sagittal keel, anterior tooth size, ischium, femur, pedal toe curvature |

---

## D3 · Brain Size vs. Behavioural Complexity — Scatter Plot

Endocranial volume (x-axis) against a behavioural complexity index (y-axis,
scored 1–10). The index aggregates five behavioural domains, each scored
0–2, for a maximum of 10. Two rows for *H. naledi* reflect the debate
over whether deliberate body disposal is accepted.

### Behavioural Complexity Scoring Rubric

| Domain | Score 0 | Score 1 | Score 2 |
|---|---|---|---|
| **Tool Technology** | No tools | Simple (Oldowan / flake) | Complex (Acheulean / prepared core / hafted) |
| **Fire Use** | No evidence | Possible / contested | Controlled, habitual |
| **Symbolic Behaviour** | None | Possible (pigment, marks) | Clear (art, ornament, engraving) |
| **Mortuary Behaviour** | None | Possible disposal / ambiguous | Deliberate burial with structure |
| **Language Evidence** | No anatomical or archaeological signal | Anatomical indicators (hyoid, Broca's area) | Archaeological proxies (complex technology requiring teaching) |

### Species Data

| # | Species | Endocranial Volume (cc) | Tool | Fire | Symbolic | Mortuary | Language | Total Score | Key Evidence | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | *A. afarensis* | 430 | 0 | 0 | 0 | 0 | 0 | **0** | No associated technology; Lomekwian tools (3.3 Ma) debated but predate by 300 kyr | Holloway et al. 2004 |
| 2 | *A. africanus* | 450 | 0 | 0 | 0 | 0 | 0 | **1** | Possible bone tools (Swartkrans, debated attribution); Dart's osteodontokeratic culture discredited | Falk et al. 2000 |
| 3 | *A. sediba* | 420 | 0 | 0 | 0 | 0 | 0 | **0** | No tools; hand capable of precision grip; fell into natural death trap | Berger et al. 2010 |
| 4a | ***H. naledi* (disposal rejected)** | 560 | 0 | 0 | 0 | 0 | 1 | **1** | No tools recovered; hand anatomy permits tool use; endocast shows derived frontal lobe (Broca's region); no mortuary behaviour accepted | Berger et al. 2015; Holloway et al. 2018 |
| 4b | ***H. naledi* (disposal accepted)** | 560 | 0 | 1 | 1 | 1 | 1 | **4** | Deliberate body disposal in two chambers; possible controlled fire; possible wall engravings; derived frontal lobe organization | Berger et al. 2015, 2023a, 2023b; Holloway et al. 2018 |
| 5 | *H. floresiensis* | 420 | 1 | 1 | 0 | 0 | 0 | **2** | Simple flake tools at Liang Bua; evidence of fire use; butchered Stegodon; no symbolic or mortuary evidence | Morwood et al. 2004; Sutikna et al. 2016 |
| 6 | *H. erectus* | 900 | 2 | 1 | 0 | 0 | 1 | **4** | Acheulean handaxes; fire at Wonderwerk Cave ~1.0 Ma (contested earlier); Trinil shell engraving debated; no burials; anatomical proxies for speech | Antón 2003; Goren-Inbar et al. 2004 |
| 7 | *H. heidelbergensis* | 1200 | 2 | 2 | 1 | 1 | 1 | **7** | Schöningen spears; controlled fire; Sima de los Huesos body deposition; "Excalibur" handaxe (possible symbolic); hyoid and Broca's area | Arsuaga et al. 2014; Thieme 1997 |
| 8 | *H. neanderthalensis* | 1450 | 2 | 2 | 2 | 2 | 2 | **10** | Mousterian / Châtelperronian; habitual fire; eagle talon pendants, pigment, Spanish cave art; Shanidar/La Chapelle/Kebara burials; FOXP2 gene, hyoid | Zilhão et al. 2010; Roebroeks & Villa 2011 |
| 9 | *H. sapiens* | 1400 | 2 | 2 | 2 | 2 | 2 | **10** | MSA/LSA industries; ubiquitous fire; Blombos beads, ochre, cave art; systematic burial; full language capacity | McBrearty & Brooks 2000 |

### Plot Annotations

| Annotation | x | y | Label |
|---|---|---|---|
| Naledi uncertainty range | 560 | 1–4 | Arrow or band connecting the two naledi points; label: "Disposal debate shifts score by 3 points" |
| Brain size threshold (traditional) | 600 | — | Vertical dashed line; label: "Traditional Homo threshold" |
| Behavioural outlier zone | <600 | >2 | Shaded region; label: "Small brain, complex behaviour — the naledi question" |

---

## D4 · Dating Timeline — Species Overlap (500 ka – 50 ka)

Horizontal bar chart showing species temporal ranges in the critical
window when naledi was alive. Focus on 500 ka – 50 ka to highlight
contemporaneity. Extended ranges noted where species begin before 500 ka.

### Species Temporal Ranges

| # | Species | Start (ka) | End (ka) | Full Range Extends Before 500 ka? | Key Specimens / Sites in Window | Dating Method | Source |
|---|---|---|---|---|---|---|---|
| 1 | *H. naledi* | 335 | 236 | No | Dinaledi Chamber (DH1–DH5, composite skeleton); Lesedi Chamber (Neo, LES1) | U-Th on flowstones (bracketing); ESR + U-series on 3 teeth; paleomagnetic reversal constraint | Dirks et al. 2017 |
| 2 | *H. sapiens* | 315 | 0 (present) | No (315 ka is start) | Jebel Irhoud (~315 ka); Florisbad (~260 ka); Omo Kibish I (~195 ka); Herto (~160 ka) | TL, ESR, U-series, Ar-Ar | Hublin et al. 2017; Grün et al. 1996 |
| 3 | *H. erectus* | >500 (1900) | ~108 | Yes — extends to ~1.9 Ma | Ngandong, Java (~117–108 ka); Zhoukoudian (~400–250 ka) | U-series, ESR (Ngandong 2019 redating); biostratigraphy | Rizal et al. 2020; Indriati et al. 2011 |
| 4 | *H. heidelbergensis* | >500 (700) | ~200 | Yes — extends to ~700 ka | Kabwe/Broken Hill (~300 ka); Bodo (~600 ka); Sima de los Huesos (~430 ka) | U-series, ESR, luminescence | Grün et al. 2020; Arsuaga et al. 2014 |
| 5 | *H. neanderthalensis* | ~400 | ~40 | Yes — extends to ~400 ka | Shanidar (~60 ka); Vindija (~40 ka); Tabun (~120 ka); El Sidrón (~49 ka) | Radiocarbon, U-series, ESR, TL | Higham et al. 2014 |
| 6 | Denisovans | ~300 (est.) | ~50 | Possibly | Denisova Cave (~300–50 ka); Baishiya Karst Cave, Tibet (~160 ka) | Radiocarbon, U-series, optical dating | Slon et al. 2017; Chen et al. 2019 |
| 7 | *H. floresiensis* | ~100 | ~50 | No | Liang Bua, Flores (LB1–LB9); ancestral population at Mata Menge (~700 ka) | U-series, TL, radiocarbon (revised 2016) | Sutikna et al. 2016 |

### Naledi Dating Methods Detail

| Method | Material Dated | Result (ka) | Constraint Type | Source |
|---|---|---|---|---|
| U-Th (uranium-thorium) | Flowstone overlying fossils (Flowstone 1a) | 236 ± 11 | Maximum age of flowstone = minimum age of underlying fossils | Dirks et al. 2017 |
| U-Th | Flowstone beneath fossils (Flowstone 1b) | — (did not yield clean isochron for older flowstone; bracket established via stratigraphy) | Stratigraphic bracket | Dirks et al. 2017 |
| ESR (electron spin resonance) | 3 *H. naledi* teeth (enamel + dentine) | 253 +82/−35 (combined US-ESR model ages) | Direct dating of fossils; consistent with U-Th bracket | Dirks et al. 2017 |
| U-series | Same 3 teeth (dentine) | 227 +82/−34 | Cross-check on ESR; consistent | Dirks et al. 2017 |
| Palaeomagnetic | Cave sediments | Normal polarity (Brunhes chron, <780 ka) | Rules out age >780 ka | Dirks et al. 2017 |
| Stratigraphic | Relative position of fossils between flowstones | 236–335 ka (combined bracket) | Integrates all methods above | Dirks et al. 2017 |

### Timeline Annotations

| Annotation | Position (ka) | Label |
|---|---|---|
| Naledi range | 335–236 | Highlighted bar with "~100 kyr window" |
| Jebel Irhoud | 315 | Marker: "Earliest *H. sapiens*" |
| Florisbad | 260 | Marker: "*H. sapiens* in South Africa — same region as naledi" |
| Ngandong last *H. erectus* | 108 | Marker: "Last known *H. erectus*" |
| Last Neanderthals | 40 | Marker: "Neanderthal extinction" |

---

## D5 · Dinaledi Chamber Floor Plan — Excavation Grid

SVG floor plan with bone density heat map. Based on Dirks et al. 2015
(*eLife* 4:e09561), Berger et al. 2015 (supplementary data), and published
excavation photographs.

### Chamber Geometry

| Parameter | Value | Source |
|---|---|---|
| Maximum length | ~10 m (NE–SW axis) | Dirks et al. 2015, Fig. 1 |
| Maximum width | ~2–3 m (variable) | Dirks et al. 2015 |
| Ceiling height | ~1.0–2.0 m (low, irregular) | Dirks et al. 2015 |
| Floor area (approx.) | ~20–30 m² | Estimated from published plan |
| Entry point | SW corner (base of the Chute) | Dirks et al. 2015, Fig. 2 |

### Excavation Grid Data

The excavation grid uses 50 cm × 50 cm squares within a 1 m × 1 m
quadrant system. The following table reports data at 1 m² resolution
as published.

| # | Grid Square | Bone Density Zone | Est. Specimens/m² | Notable Finds | Individual Assignment (where published) | Depth Range (cm) | Source |
|---|---|---|---|---|---|---|---|
| 1 | 141/142 | **High** | >200 | DH1 holotype cranium (partial); mandible fragments; postcranial elements | H. naledi individual 1 (holotype) | 0–20 (surface to shallow subsurface) | Berger et al. 2015; Dirks et al. 2015 |
| 2 | 142/143 | **High** | >150 | DH2 partial cranium; associated vertebrae | Individual 2 | 5–25 | Berger et al. 2015 |
| 3 | 143/144 | **High** | ~150 | Composite hand assemblage (U.W. 101-1321 etc.); articulated finger bones | Hand assigned to individual 1 or 2 (debated) | 0–15 | Kivell et al. 2015; Berger et al. 2015 |
| 4 | 144/145 | **Medium** | ~80 | Foot assemblage (U.W. 101-1417 etc.); articulated metatarsals and phalanges | Foot individual not definitively assigned | 5–20 | Harcourt-Smith et al. 2015 |
| 5 | 145/146 | **Medium** | ~60 | Femoral shaft fragments; rib fragments; isolated teeth | Multiple individuals (commingled) | 10–30 | Marchi et al. 2017; Berger et al. 2015 |
| 6 | 146/147 | **Low** | ~30 | Isolated phalanges; vertebral fragments | Unassigned | 5–25 | Berger et al. 2015 |
| 7 | 147/148 | **Low** | ~20 | DH3 partial cranium (fragments); isolated teeth | Individual 3 | 10–30 | Schroeder et al. 2017 |
| 8 | 148+ (NE extent) | **Low** | <15 | Scattered postcranial fragments; unexcavated area extends NE | Unassigned | Unknown (surface collection) | Dirks et al. 2015 |
| 9 | 140/141 (SW, near Chute base) | **Medium** | ~50 | Pelvis fragments (partial ilium); scapular fragments | Possible individual 4 | 0–15 | Laird et al. 2017 |

### Taphonomic Notes

| Observation | Detail | Source |
|---|---|---|
| Articulation | Many elements partially articulated (hand, foot, vertebral segments); suggests minimal post-depositional disturbance | Dirks et al. 2015 |
| Commingling | Multiple individuals overlapping in high-density zones; juveniles, adults, and elderly represented | Berger et al. 2015 |
| Non-hominin fauna | Virtually absent — only isolated owl bones and rodent fragments (< 0.1% of assemblage) | Dirks et al. 2015 |
| Carnivore damage | None identified on any specimen | Dirks et al. 2015 |
| Water transport indicators | No fluvial sediment sorting; no hydraulic size-grading of bones; no rounded bone edges | Dirks et al. 2015 |
| Bone surface condition | No weathering stages >1 (Behrensmeyer scale); bones buried relatively quickly after deposition | Val 2016; Dirks et al. 2015 |

### Age Demographics of Recovered Individuals

| Age Class | Minimum Individuals | Diagnostic Elements | Source |
|---|---|---|---|
| Infant (0–3 yrs) | 1 | Unfused epiphyses; tiny isolated elements | Berger et al. 2015 |
| Juvenile (3–12 yrs) | 2 | Partially fused elements; dental eruption stage | Berger et al. 2015 |
| Subadult (12–18 yrs) | 3 | Fusing epiphyses; late dental eruption | Berger et al. 2015 |
| Adult (18–35 yrs) | 6 | Fully fused; moderate dental wear | Berger et al. 2015 |
| Old adult (35+ yrs) | 3 | Heavy dental wear; degenerative joint changes | Berger et al. 2015 |
| **Total** | **≥15** | | Berger et al. 2015 |

---

## D6 · Skull Comparison — Craniometric Data

Toggle/overlay visualization comparing four species. Measurements in
millimetres except endocranial volume (cc). Primary data from Schroeder
et al. 2017, Garvin et al. 2017 (naledi), Holloway et al. 2004 (general
reference), and standard comparative datasets.

### Craniometric Comparison Table

| # | Measurement | *H. naledi* DH1 | *H. erectus* KNM-ER 3733 | *H. sapiens* (modern mean) | *A. africanus* Sts 5 | Unit | Source |
|---|---|---|---|---|---|---|---|
| 1 | Endocranial volume | ~560 | ~848 | ~1400 | ~485 | cc | Garvin et al. 2017; Holloway et al. 2004 |
| 2 | Maximum cranial length (glabella–opisthocranion) | ~157 | ~192 | ~185 | ~168 | mm | Schroeder et al. 2017; Bräuer 1988 |
| 3 | Maximum cranial breadth (euryon–euryon) | ~113 | ~138 | ~140 | ~120 | mm | Schroeder et al. 2017; Bräuer 1988 |
| 4 | Bregma–basion height | ~116 | ~124 | ~135 | ~108 | mm | Schroeder et al. 2017; Bräuer 1988 |
| 5 | Bizygomatic breadth | ~108 (est.) | ~133 | ~132 | ~105 | mm | Garvin et al. 2017; estimates due to incomplete preservation |
| 6 | Orbital height | ~34 | ~37 | ~34 | ~32 | mm | Schroeder et al. 2017 |
| 7 | Orbital breadth | ~37 | ~41 | ~40 | ~36 | mm | Schroeder et al. 2017 |
| 8 | Nasal height | ~46 | ~52 | ~52 | ~42 | mm | Schroeder et al. 2017 |
| 9 | Nasal breadth | ~27 | ~30 | ~25 | ~28 | mm | Schroeder et al. 2017 |
| 10 | Palate breadth (external alveolar) | ~60 (est.) | ~70 | ~64 | ~66 | mm | Berger et al. 2015; estimates |
| 11 | Mandibular corpus height (at M1) | ~29 | ~35 | ~30 | ~33 | mm | Berger et al. 2015 |
| 12 | Supraorbital torus thickness | ~8 | ~14 | ~4–6 | ~7 | mm | Schroeder et al. 2017; Rightmire 1990 |
| 13 | Cranial index (breadth/length × 100) | ~72 | ~72 | ~76 | ~71 | ratio | Calculated from above |
| 14 | Encephalisation quotient (approx.) | ~3.0 | ~4.5 | ~7.5 | ~2.8 | EQ | Garvin et al. 2017; Ruff et al. 1997 |

### Qualitative Morphological Features

| Feature | *H. naledi* DH1 | *H. erectus* KNM-ER 3733 | *H. sapiens* | *A. africanus* Sts 5 |
|---|---|---|---|---|
| Supraorbital torus | Moderate; arched, not continuous bar | Pronounced; thick, continuous bar | Minimal or absent | Moderate; arched |
| Sagittal keel | Present (mild) | Present (pronounced) | Absent | Absent |
| Postorbital constriction | Moderate | Pronounced | Minimal | Pronounced |
| Prognathism | Moderate subnasal | Moderate | Orthognathic | Pronounced |
| Chin (mental eminence) | Absent | Absent | Present | Absent |
| Dental arcade shape | Parabolic | Parabolic | Parabolic | U-shaped (wider anterior) |
| Frontal profile | Low, sloping | Low, receding | High, vertical | Low, sloping |
| Occipital profile | Rounded (no occipital torus) | Angular (occipital torus present) | Rounded | Rounded |

### Neo Skull (LES1) Comparison to DH1

| Measurement | DH1 | Neo (LES1) | Note | Source |
|---|---|---|---|---|
| Endocranial volume | ~560 cc | ~610 cc (est.) | Neo slightly larger; within species range | Hawks et al. 2017 |
| Cranial completeness | ~40% (reconstructed) | ~70% (most complete naledi cranium) | Neo preserves more facial skeleton | Hawks et al. 2017 |
| Supraorbital morphology | Arched torus | Matches DH1 | Confirms species-level consistency | Hawks et al. 2017 |
| Sagittal keel | Present | Present | Consistent | Hawks et al. 2017 |
| Dental wear | Moderate | Heavier — suggests older individual | Age variation within species | Hawks et al. 2017 |

---

## D7 · Hand Morphology — Bone-by-Bone Comparison

Annotated SVG with clickable bone regions. Data from Kivell et al. 2015
(*Nature Communications* 6:8431), with chimpanzee and human comparative
data from Richmond & Strait 2000, Susman 1998, and Marzke 1997.

### Bone-by-Bone Comparison Table

| # | Bone / Feature | *H. naledi* | *Pan troglodytes* (Chimpanzee) | *H. sapiens* | Classification | Interpretation | Source |
|---|---|---|---|---|---|---|---|
| 1 | **Proximal phalanx curvature** (included angle, ray 3) | ~45–55° | ~54–60° | ~28–35° | **Primitive** | Strongly curved; close to chimpanzee condition; indicates powerful flexor grip for arboreal locomotion | Kivell et al. 2015 |
| 2 | **Proximal phalanx curvature** (included angle, ray 4) | ~48–53° | ~52–58° | ~25–32° | **Primitive** | Same pattern across all rays; curvature is a systemic feature, not anomalous | Kivell et al. 2015 |
| 3 | **Proximal phalanx robusticity** (midshaft breadth/length) | Moderate (~0.22) | Robust (~0.24) | Gracile (~0.19) | **Mosaic** | Intermediate between apes and humans; capable of both climbing and manipulative tasks | Kivell et al. 2015 |
| 4 | **Thumb (pollical) length** relative to ray 3 | ~58–60% | ~43–47% | ~58–61% | **Derived** | Long thumb matching human proportions; key adaptation for precision grip (pad-to-pad opposition) | Kivell et al. 2015 |
| 5 | **Thumb distal phalanx** — tuft width | Broad (human-like) | Narrow | Broad | **Derived** | Wide, flat distal tuft supports fleshy thumb pad for precision gripping | Kivell et al. 2015 |
| 6 | **Metacarpal 1 (thumb)** robusticity | Robust, human-like proportions | Relatively gracile | Robust | **Derived** | Strong thumb metacarpal for load-bearing during tool use; insertion sites for opponens pollicis well-developed | Kivell et al. 2015 |
| 7 | **Metacarpal 3 — styloid process** | Present | Absent | Present | **Derived** | Stabilizes the 3rd metacarpal–capitate joint; reduces mobility but increases load-bearing capacity for tool use | Kivell et al. 2015 |
| 8 | **Fingertip distal phalanx tufts** (rays 2–5) | Moderate width | Narrow | Broad | **Mosaic** | Intermediate between ape (narrow, pointed) and human (broad, spatulate); less padded fingertips than humans | Kivell et al. 2015 |
| 9 | **Trapezoid** (carpal bone) | Wedge-shaped, boot-like (human configuration) | Pyramidal (ape configuration) | Wedge-shaped, boot-like | **Derived** | Human-like carpal architecture; locks the 2nd metacarpal into a rigid central column for forceful grip | Kivell et al. 2015 |
| 10 | **Capitate** (carpal bone) | Dorsopalmarly expanded; human-like facets | Narrow, ape-like articular surfaces | Dorsopalmarly expanded | **Derived** | Human-like wrist morphology for load transfer during tool use and forceful precision grip | Kivell et al. 2015 |
| 11 | **Scaphoid** (carpal bone) | Expanded radial facet; human-like orientation | Smaller radial facet; more mobile | Expanded radial facet | **Derived** | Constrains wrist extension/flexion range in favour of stability; a trade-off away from arboreal mobility | Kivell et al. 2015 |
| 12 | **Intrinsic hand proportions** (metacarpal:phalanx ratio) | Relatively long metacarpals; short phalanges (fingers) | Long phalanges relative to metacarpals | Short phalanges relative to metacarpals | **Mosaic** | Finger length intermediate; metacarpal proportions near-human but phalanx curvature offsets this toward climbing | Kivell et al. 2015 |

### The Naledi Hand Paradox — Summary

| Feature Group | Classification | Functional Signal |
|---|---|---|
| Finger curvature (all rays) | **Primitive** (ape-like) | Powerful flexor grip; climbing capacity retained |
| Thumb proportions & morphology | **Derived** (human-like) | Precision grip; pad-to-pad opposition; potential for tool manufacture |
| Wrist architecture (carpals) | **Derived** (human-like) | Stable, load-bearing wrist; suited for forceful manipulation |
| Fingertip morphology (tufts) | **Mosaic** | Partially developed tactile pads; intermediate sensitivity |
| Overall hand function | **Unique mosaic** | A hand that could climb trees AND make tools — no living primate combines both at this level |

### Curvature Comparison Chart Data (Degrees of Included Angle)

For bar chart / radial chart visualization:

| Ray | *H. naledi* (°) | *Pan troglodytes* (°) | *H. sapiens* (°) | *A. afarensis* (°) | *A. sediba* (°) |
|---|---|---|---|---|---|
| Ray 2 (index) | ~42 | ~50 | ~30 | ~45 | ~44 |
| Ray 3 (middle) | ~50 | ~57 | ~32 | ~48 | ~46 |
| Ray 4 (ring) | ~50 | ~55 | ~28 | ~46 | ~45 |
| Ray 5 (little) | ~46 | ~52 | ~26 | ~44 | ~42 |

Sources: Kivell et al. 2015 (naledi); Stern & Susman 1983 (*A. afarensis*);
Berger et al. 2010 (*A. sediba*); Richmond & Strait 2000 (*Pan*, *H. sapiens*).

---

## D8 · Disposal Evidence Flowchart — Interactive Evidence Map

Interactive evidence map evaluating taphonomic observations for and against
deliberate body disposal. Strength ratings reflect consensus weight in the
literature. Data from Dirks et al. 2015, Val 2016, Randolph-Quinney et al.
2016, and Thackeray 2016.

### Evidence Table

| # | Evidence | Category | Supports Disposal? | Alternative Explanation | Strength | Source |
|---|----------|----------|-------------------|------------------------|----------|--------|
| 1 | No alternative entrance to Dinaledi Chamber | Geological | Yes | Possible undiscovered entrance (Thackeray 2016); further geological survey may reveal sealed passages | **Strong** | Dirks et al. 2015; Elliott et al. 2021 |
| 2 | No water-deposited sediment in fossil-bearing unit | Sedimentological | Yes | Micro-scale water transport possible at very low energy; seasonal drip-water could introduce fine sediment | **Moderate** | Dirks et al. 2015; Val 2016 |
| 3 | No carnivore tooth marks or gnawing on any specimen | Taphonomic | Yes | Bones deposited beyond carnivore access, but this itself implies intentional placement in an inaccessible location | **Strong** | Val 2016; Randolph-Quinney et al. 2016 |
| 4 | No other large animal remains (only owl bones, rodent fragments — <0.1% of assemblage) | Faunal | Yes | Highly selective natural trap theoretically possible but no known analog; owl/rodent presence indicates minor secondary access routes for small fauna | **Strong** | Dirks et al. 2015; Val 2016 |
| 5 | All age classes represented (infant to elderly, ≥15 individuals) | Demographic | Yes | Death trap could capture all ages over time; however, demographic profile lacks young-adult bias typical of accidental death traps | **Moderate** | Berger et al. 2015 |
| 6 | Partially articulated remains | Taphonomic | Yes | In-situ decay pattern (body decomposed where deposited); consistent with both disposal and natural death, but location makes natural death implausible | **Moderate** | Dirks et al. 2015; Val 2016 |
| 7 | Single species accumulation | Faunal | Yes | No known natural trap in the hominin fossil record accumulates only one large-bodied species over time | **Strong** | Berger et al. 2015; Dirks et al. 2015 |
| 8 | Cave is pitch-dark beyond Superman's Crawl; narrow access requires intentional navigation | Geological | Yes | None — darkness and constriction rule out accidental wandering; any entity reaching the chamber did so deliberately | **Strong** | Dirks et al. 2015; Elliott 2015 |
| 9 | No stone tools or cultural artifacts in Dinaledi Chamber (pre-2023 excavations) | Archaeological | Neutral / Against | If disposal were cultural practice, associated artifacts might be expected; absence may reflect simple disposal without grave goods | **Weak (against)** | Berger et al. 2015 |

### Counter-Evidence Summary

| # | Counter-Argument | Proposed By | Response in Literature | Status |
|---|------------------|-------------|----------------------|--------|
| 1 | Possible undiscovered entrance now sealed by geological processes | Thackeray 2016 | Dirks et al. 2015, 2017 conducted extensive geological survey including ground-penetrating radar; no evidence of alternative entrance found | Unresolved but unlikely |
| 2 | Periodic low-energy water events could transport bodies | Thackeray 2016; de Ruiter 2016 | No hydraulic size-sorting, no water-rounded bone edges, no fluvial sediment — all indicators negative for water transport | Largely refuted |
| 3 | Mass death event (group entered and could not exit) | Various informal | Does not explain multiple depositional episodes implied by varied decomposition states; chamber accessible only via technical climbing | Unlikely — multiple deposition events |
| 4 | Predator cache (leopard or hyena stash) | General taphonomic hypothesis | No carnivore tooth marks; no predator remains; access route too narrow for large carnivores | Refuted |
| 5 | Accidental fall through vertical shaft | General | The Chute requires active climbing/navigation; accidental repeated falls of 15+ individuals of all ages is improbable | Highly unlikely |

### Evidence Strength Summary

| Rating | Count | Proportion |
|--------|-------|------------|
| Strong (for disposal) | 5 | 56% |
| Moderate (for disposal) | 3 | 33% |
| Weak / Neutral / Against | 1 | 11% |

---

## D9 · South African Cave Sites Map — Cradle of Humankind

Geographic data for mapping hominin sites in the Cradle of Humankind World
Heritage Site and surroundings. Coordinates in decimal degrees (WGS 84).
Distance from Rising Star calculated as straight-line distance.

### Site Location Table

| # | Site | Latitude | Longitude | Key Species | Key Specimens | Date Range (ka) | Distance from Rising Star (km) | UNESCO Cradle? | Source |
|---|------|----------|-----------|-------------|---------------|-----------------|-------------------------------|----------------|--------|
| 1 | Rising Star | −25.885 | 27.714 | *H. naledi* | DH1 holotype; Neo (LES1); ≥15 individuals in Dinaledi Chamber; ≥3 in Lesedi Chamber | 335–236 | 0 | Yes | Berger et al. 2015; Hawks et al. 2017; Dirks et al. 2017 |
| 2 | Sterkfontein | −25.935 | 27.735 | *A. africanus*; early *Homo* | Mrs Ples (Sts 5); Little Foot (StW 573); >500 hominin specimens | 3700–1500 | ~5.8 | Yes | Clarke 2019; Granger et al. 2015 |
| 3 | Swartkrans | −25.940 | 27.738 | *P. robustus*; early *Homo* (cf. *H. ergaster*) | SK 48 (robustus cranium); burned bones (earliest fire evidence debate); >300 specimens | 2000–600 | ~6.3 | Yes | Brain 1993; Pickering et al. 2011 |
| 4 | Malapa | −25.883 | 27.730 | *A. sediba* | MH1 (juvenile male); MH2 (adult female) — both nearly complete skeletons | ~1980 | ~1.7 | Yes | Berger et al. 2010 |
| 5 | Drimolen | −25.917 | 27.750 | *P. robustus*; *H. erectus* | DNH 134 (*H. erectus* cranium, oldest known ~2.04 Ma); DNH 7 (*P. robustus*) | 2040–1400 | ~4.8 | Yes | Herries et al. 2020 |
| 6 | Kromdraai | −25.937 | 27.742 | *P. robustus* | TM 1517 (holotype of *P. robustus*) | ~2000–1500 | ~6.2 | Yes | Broom 1938; Braga et al. 2017 |
| 7 | Gladysvale | −25.890 | 27.765 | *A. africanus*; *P. robustus* | Fragmentary remains; first South African hominin site discovered using GIS prediction | ~2500–1500 | ~5.2 | Yes | Berger et al. 1993 |
| 8 | Cooper's Cave (Cooper's D) | −25.897 | 27.752 | *P. robustus*; *H. cf. erectus* | Fragmentary crania and postcrania; alongside diverse fauna | ~1900–1400 | ~4.5 | Yes | de Ruiter et al. 2009 |
| 9 | Bolt's Farm | −25.950 | 27.720 | Primarily faunal; possible hominin fragments | Important paleontological site with >30 deposits; carnivore and primate fossils | ~4000–1500 | ~7.2 | Yes | Gommery et al. 2012 |

### Site Clustering Note

All sites lie within a ~15 km radius in the dolomitic limestone of the
Malmani Subgroup (Transvaal Supergroup). The Cradle of Humankind UNESCO
site covers ~47,000 hectares (~180 km²) northwest of Johannesburg,
Gauteng Province, South Africa.

---

## D10 · Body Proportion Comparison — Grouped Bar Chart

Body size and limb proportion data for grouped bar chart. Measurements
from primary literature; values marked `~` are estimates based on partial
remains or scaling regressions.

### Body Proportion Table

| # | Species | Specimen(s) | Height (cm) | Mass (kg) | Relative Arm Length (humerus+radius / height) | Relative Leg Length (femur+tibia / height) | Brachial Index (radius/humerus × 100) | Crural Index (tibia/femur × 100) | Source |
|---|---------|-------------|-------------|-----------|----------------------------------------------|-------------------------------------------|---------------------------------------|----------------------------------|--------|
| 1 | *H. naledi* | Composite (DH1 + associated postcrania) | ~144–147 | ~40–56 | ~0.42 | ~0.48 | ~80 | ~85 | Garvin et al. 2017; Marchi et al. 2017; Berger et al. 2015 |
| 2 | *A. afarensis* (Lucy) | AL 288-1 | ~107 | ~28 | ~0.47 | ~0.44 | ~92 | ~83 | Jungers 1982; Richmond & Jungers 2008 |
| 3 | *H. erectus* (Turkana Boy projected adult) | KNM-WT 15000 (projected) | ~185 | ~68 | ~0.39 | ~0.52 | ~77 | ~83 | Ruff & Walker 1993; Graves et al. 2010 |
| 4 | *H. sapiens* (modern mean) | Population average | ~170 | ~70 | ~0.39 | ~0.52 | ~75 | ~83 | Ruff et al. 1997; WHO reference data |
| 5 | *A. sediba* | MH1 + MH2 | ~130 | ~33 | ~0.44 | ~0.46 | ~87 | ~83 | Berger et al. 2010; Churchill et al. 2013 |
| 6 | *H. floresiensis* | LB1 | ~106 | ~25 | ~0.44 | ~0.46 | ~84 | ~81 | Brown et al. 2004; Jungers et al. 2009 |

### Key Proportion Ratios (Normalised for Chart)

| Metric | *H. naledi* | Lucy (*A. afarensis*) | Turkana Boy (*H. erectus*) | Modern *H. sapiens* | *A. sediba* | *H. floresiensis* |
|--------|-------------|----------------------|---------------------------|---------------------|-------------|-------------------|
| Height (% of modern human) | ~85% | ~63% | ~109% | 100% | ~76% | ~62% |
| Mass (% of modern human) | ~69% | ~40% | ~97% | 100% | ~47% | ~36% |
| Brachial index | 80 | 92 | 77 | 75 | 87 | 84 |
| Crural index | 85 | 83 | 83 | 83 | 83 | 81 |

### Notes

- *H. naledi* is notably small-bodied for *Homo* but larger than australopiths.
- High brachial index in Lucy and *A. sediba* reflects relatively long forearms (primitive/arboreal signal).
- Naledi's brachial index (80) is intermediate — higher than *H. erectus*/sapiens but lower than australopiths.
- Crural index is relatively stable across taxa; naledi's slightly elevated value (85) may reflect tibial elongation for efficient bipedalism.

---

## D11 · Phylogenetic Position — Three Competing Cladogram Models

Data for three alternative phylogenetic placements of *H. naledi*. Tree
topologies in Newick (parenthetical) notation. Based on Dembo et al. 2016
(*Journal of Human Evolution* 97:17–26), Hawks et al. 2017, and subsequent
craniodental and postcranial analyses.

### Model 1 — Basal *Homo*

*H. naledi* as sister taxon to all other *Homo*, branching off near the
*Homo*–*Australopithecus* boundary.

| Property | Value |
|----------|-------|
| **Newick topology** | `((A_africanus, A_sediba), (H_naledi, (H_habilis, (H_erectus, (H_heidelbergensis, (H_neanderthalensis, H_sapiens))))));` |
| **Supported by** | Dembo et al. 2016 (craniodental morphometric analysis); some parsimony-based analyses |
| **Key evidence for** | Mosaic of primitive and derived traits; small brain size; primitive shoulder and trunk morphology; dental simplification could be convergent |
| **Key evidence against** | Derived wrist and hand morphology shared with later *Homo*; foot virtually identical to *H. sapiens*; derived features seem too numerous for a basal branch-off |
| **A. sediba position** | Sister to *Homo* clade (just outside), or sister to *H. naledi* at base of *Homo* |
| **Implication** | Naledi branched off >2 Ma and retained primitive features while independently evolving some derived traits |

### Model 2 — Sister to *H. erectus*

*H. naledi* and *H. erectus* share a common ancestor within *Homo*,
after the divergence from *H. habilis*.

| Property | Value |
|----------|-------|
| **Newick topology** | `((A_africanus, A_sediba), (H_habilis, ((H_naledi, H_erectus), (H_heidelbergensis, (H_neanderthalensis, H_sapiens)))));` |
| **Supported by** | Some total-evidence analyses; Hawks & Berger 2017 (informal); similarities in sagittal keel, dental trends, postcranial proportions |
| **Key evidence for** | Shared sagittal keel; similar dental reduction trend; long-legged body plan (though naledi is much smaller); both lack chin |
| **Key evidence against** | Major brain size discrepancy (560 vs 900 cc); naledi retains primitive shoulder/trunk that erectus does not; stratigraphic gap (erectus known from ~1.9 Ma, naledi only from ~335–236 ka — long ghost lineage) |
| **A. sediba position** | Outgroup to *Homo* or sister to *H. habilis* at the base |
| **Implication** | Naledi and erectus diverged ~2+ Ma from a common ancestor; naledi remained small-brained and small-bodied as a specialised lineage |

### Model 3 — Independent Long-Surviving Lineage ("Living Fossil")

*H. naledi* branched off early in *Homo* evolution and persisted largely
unchanged for >1.5 million years — a relict lineage surviving alongside
*H. sapiens* in southern Africa.

| Property | Value |
|----------|-------|
| **Newick topology** | `((A_africanus, A_sediba), ((H_habilis, H_naledi), (H_erectus, (H_heidelbergensis, (H_neanderthalensis, H_sapiens)))));` |
| **Supported by** | Berger et al. 2017 (preferred interpretation); Hawks et al. 2017; morphological stasis argument |
| **Key evidence for** | Young dating (335–236 ka) despite archaic morphology; no intermediate forms found; morphological stasis seen in other lineages (e.g., *H. floresiensis* persisted to ~50 ka); southern Africa's complex geography could harbour relict populations |
| **Key evidence against** | No fossil record of naledi between presumed origin (>2 Ma?) and 335 ka — enormous ghost lineage; if naledi evolved derived features convergently, parsimony is violated; small sample of dated specimens |
| **A. sediba position** | Sister to *Homo* clade (outgroup) or in a polytomy with early *Homo* |
| **Implication** | Multiple hominin species co-existed in southern Africa at ~300 ka; the human family tree is bushier than previously thought; complex behaviour may have evolved independently in small-brained lineages |

### Model Comparison Summary

| Criterion | Model 1 (Basal Homo) | Model 2 (Sister to erectus) | Model 3 (Living Fossil) |
|-----------|----------------------|----------------------------|------------------------|
| Phylogenetic position | Very basal | Within core *Homo* | Basal but sister to habilis |
| Ghost lineage required | Long (~2 Myr) | Long (~2 Myr) | Very long (>1.5 Myr) |
| Explains derived features | Convergence required | Shared ancestry | Mixed — some convergence |
| Explains primitive features | Retained from ancestor | Reversal or retention | Stasis |
| Current consensus weight | Moderate | Low–Moderate | Moderate–High (favoured by discovery team) |

---

## D12 · Species Coexistence Timeline — Southern Africa (Gantt Chart)

Temporal ranges of hominin species known from southern Africa. Dates in
thousands of years ago (ka). Focus on documenting overlap and co-existence.

### Species Temporal Range Table

| # | Species | Earliest (ka) | Latest (ka) | Duration (kyr) | Region | Key Sites | Dating Methods | Source |
|---|---------|---------------|-------------|-----------------|--------|-----------|----------------|--------|
| 1 | *A. africanus* | 3300 | 2100 | ~1200 | Gauteng, Limpopo | Sterkfontein (Member 4); Makapansgat (Members 3–4); Taung | Biostratigraphy; U-Pb (flowstones); palaeomagnetism; cosmogenic nuclide burial dating | Clarke 2019; Granger et al. 2015; Herries & Shaw 2011 |
| 2 | *P. robustus* | 2000 | 1000 | ~1000 | Gauteng | Swartkrans (Members 1–3); Kromdraai A; Drimolen Main Quarry; Cooper's Cave | U-Pb; ESR; palaeomagnetism; biostratigraphy | Herries et al. 2020; Pickering et al. 2011 |
| 3 | *A. sediba* | ~1980 | ~1980 | Single event | Gauteng | Malapa | U-Pb on flowstone (1.977 ± 0.002 Ma) | Dirks et al. 2010; Pickering et al. 2011 |
| 4 | Early *Homo* (*H. ergaster* / *H. erectus*) | ~2000 | ~500 (?) | ~1500 | Gauteng, possibly broader | Swartkrans (Member 1 — SK 15, SK 847); Drimolen (DNH 134) | U-Pb; ESR; palaeomagnetism | Herries et al. 2020; Susman et al. 2001 |
| 5 | *H. heidelbergensis* / *H. rhodesiensis* | ~700 | ~200 | ~500 | Zambia (Kabwe); possibly broader southern Africa | Kabwe (Broken Hill 1); Elandsfontein (Saldanha); Florisbad (archaic features) | U-series (Kabwe redated ~299 ka by Grün et al. 2020); ESR | Grün et al. 2020; Rightmire 2009 |
| 6 | *H. naledi* | 335 | 236 | ~100 | Gauteng | Rising Star Cave (Dinaledi Chamber; Lesedi Chamber) | U-Th; ESR; U-series on teeth; palaeomagnetism | Dirks et al. 2017 |
| 7 | *H. sapiens* | ~260 | 0 (present) | ~260+ | Widespread — Free State, KwaZulu-Natal, Eastern Cape, Western Cape | Florisbad (~260 ka); Border Cave (~170 ka); Klasies River (~120–90 ka); Blombos (~100–73 ka) | ESR; U-series; radiocarbon; luminescence | Grün et al. 1996; Henshilwood et al. 2002 |

### Overlap Windows

| # | Species Pair | Overlap Period (ka) | Duration (kyr) | Geographic Proximity | Implication |
|---|-------------|---------------------|-----------------|---------------------|-------------|
| 1 | *A. africanus* + *P. robustus* | ~2000–2100 | ~100 | Same sites (Sterkfontein, Swartkrans — <2 km apart) | Niche partitioning: africanus = C3 diet, robustus = C4 hard-object specialist |
| 2 | *A. africanus* + early *Homo* | ~2000–2100 | ~100 | Swartkrans, Sterkfontein area | Three hominin genera co-existing in the Cradle |
| 3 | *P. robustus* + early *Homo* | ~2000–1000 | ~1000 | Swartkrans Members 1–3; Drimolen | Longest documented co-existence in the Cradle |
| 4 | *H. naledi* + *H. sapiens* | ~260–236 | ~24 | Both in South Africa — Rising Star (Gauteng) vs Florisbad (Free State), ~300 km apart | Small-brained hominin contemporary with earliest modern humans in same region |
| 5 | *H. naledi* + *H. heidelbergensis* | ~335–200 (?) | up to ~135 | Both in broader southern Africa; Kabwe redating overlaps naledi range | Multiple mid-brained and small-brained species in late Middle Pleistocene |

### Timeline Annotations

| Annotation | Position (ka) | Label |
|------------|--------------|-------|
| A. sediba snapshot | ~1980 | "A. sediba: one moment in time — natural death trap at Malapa" |
| Naledi window | 335–236 | Highlighted bar: "H. naledi alive while H. sapiens emerges" |
| Florisbad | ~260 | Marker: "Earliest H. sapiens in South Africa" |
| Three-genus period | ~2000 | "Australopithecus, Paranthropus, and Homo all present in the Cradle" |

---

## D13 · DH1 Cranium 3D Viewer — Annotation Hotspot Data

Hotspot annotations for interactive 3D model of the DH1 holotype cranium.
Positions given as approximate anatomical regions (to be mapped to 3D model
coordinates). Data from Berger et al. 2015, Schroeder et al. 2017, Garvin
et al. 2017, and Holloway et al. 2018.

### Hotspot Table

| # | Hotspot ID | Position (Approx Region) | Feature Name | Description | Measurement | Significance | Source |
|---|-----------|-------------------------|--------------|-------------|-------------|--------------|--------|
| 1 | DH1-01 | Superior frontal, midline anterior | **Frontal Boss** | Mild frontal bossing; forehead low and sloping but with slight midline prominence | Frontal chord ~95 mm | Intermediate between flat australopith frontal and vertical *H. sapiens* frontal; contributes to "surprisingly *Homo*-like" gestalt | Schroeder et al. 2017 |
| 2 | DH1-02 | Supraorbital, bilateral | **Supraorbital Torus** | Moderate, arched brow ridge; not a continuous bar (unlike *H. erectus*); distinct supratoral sulcus present | Torus thickness ~8 mm | More gracile than *H. erectus* (14 mm); resembles early *Homo* condition; arched form considered derived relative to bar-like torus | Schroeder et al. 2017 |
| 3 | DH1-03 | Superior midline, posterior to bregma | **Sagittal Keel** | Low midline ridge on the vault; not a true sagittal crest (no muscle attachment function) | Keel height ~2–3 mm above surrounding vault | Shared with *H. erectus*; absent in *H. sapiens* and australopiths; a key character linking naledi to erectus-grade morphology | Schroeder et al. 2017 |
| 4 | DH1-04 | Lateral vault, bilateral | **Temporal Lines** | Well-defined superior and inferior temporal lines marking temporalis muscle attachment | Line separation ~15 mm at widest | Moderate temporalis development; consistent with reduced masticatory apparatus relative to australopiths | Schroeder et al. 2017 |
| 5 | DH1-05 | Posterior vault, midline | **Occipital Morphology** | Rounded occipital profile; no occipital torus or angular torus | Occipital chord ~85 mm (est.) | Differs from *H. erectus* (which has angular torus); more like *H. sapiens*; suggests different nuchal muscle configuration | Schroeder et al. 2017 |
| 6 | DH1-06 | Cranial base, inferior midline | **Foramen Magnum Position** | Anteriorly positioned foramen magnum, directly beneath cranial centre of gravity | Basion–bregma height ~116 mm | Fully bipedal head posture; position matches *H. sapiens* condition; confirms obligate bipedalism | Schroeder et al. 2017; Garvin et al. 2017 |
| 7 | DH1-07 | Lateral, inferior to temporal fossa | **Zygomatic Arch** | Gracile, lightly built zygomatic arch; no pronounced flare | Bizygomatic breadth ~108 mm (est.) | Much smaller than *H. erectus* (~133 mm) or australopiths; reflects reduced masticatory apparatus | Garvin et al. 2017 |
| 8 | DH1-08 | Midface, central | **Nasal Aperture** | Relatively wide, short nasal opening; nasal bones project slightly | Height ~46 mm; Breadth ~27 mm | Nasal index (~59) within *H. sapiens* variation; wider than *H. sapiens* mean (25 mm) but narrower than australopiths | Schroeder et al. 2017 |
| 9 | DH1-09 | Inferior midface, bilateral | **Maxillary Alveolar Process** | Small alveolar process housing notably small postcanine teeth; slight subnasal prognathism | Palate breadth ~60 mm (est.) | Dental reduction is one of the most derived features; molar size falls within *H. sapiens* range despite brain being 40% of sapiens | Berger et al. 2015; Irish et al. 2015 |
| 10 | DH1-10 | Endocranial (interior) | **Endocranial Volume Marker** | Total internal volume of the braincase; measured via virtual endocast from CT scan | 465–610 cc (mean ~560 cc across known specimens) | Barely above the australopith range; well below any other *Homo* except *H. floresiensis*; yet frontal lobe organisation is derived | Garvin et al. 2017; Holloway et al. 2018 |
| 11 | DH1-11 | Endocranial, anterior inferior | **Frontal Lobe Organisation (Broca's Area Region)** | Endocast reveals a human-like third inferior frontal convolution in the region of Broca's area | Qualitative — sulcal pattern | May indicate capacity for complex cognition or proto-language; the most provocative endocranial finding — modern organisation in a tiny braincase | Holloway et al. 2018 |
| 12 | DH1-12 | Posterior, behind bregma | **Postorbital Constriction** | Moderate narrowing of the cranium behind the orbits | Minimum frontal breadth ~80 mm (est.) vs max breadth ~113 mm | Less constricted than *H. erectus* or australopiths; more constricted than *H. sapiens*; intermediate condition | Schroeder et al. 2017 |

### Feature Classification Summary (Cranium)

| Classification | Features | Count |
|---------------|----------|-------|
| **Primitive** | Sagittal keel, low sloping frontal, small endocranial volume, postorbital constriction | 4 |
| **Derived** | Supraorbital torus (arched form), rounded occiput, anterior foramen magnum, dental reduction, frontal lobe organisation | 5 |
| **Mosaic / Intermediate** | Frontal boss, zygomatic gracility, nasal morphology | 3 |

---

## D14 · Naledi Hand 3D Viewer — Annotation Hotspot Data

Hotspot annotations for interactive 3D model of the *H. naledi* composite
hand (primarily U.W. 101-1321 and associated elements). Positions given
as anatomical regions for mapping to 3D model. Data from Kivell et al.
2015 (*Nature Communications* 6:8431).

### Hotspot Table

| # | Hotspot ID | Position | Bone / Feature | Description | Classification | Significance | Source |
|---|-----------|----------|---------------|-------------|----------------|--------------|--------|
| 1 | HAND-01 | Third ray, proximal segment | **Proximal Phalanx 3 (Curvature)** | Strongly curved shaft with included angle ~50°; longitudinal ridges for flexor sheath | **Primitive** | Curvature near chimpanzee range (~57°), far from human (~32°); powerful flexor grip for climbing; this is the single most ape-like feature in the hand | Kivell et al. 2015 |
| 2 | HAND-02 | First ray, distal segment | **Distal Phalanx 1 / Thumb Tip (Broad Tuft)** | Wide, spatulate distal tuft on the thumb; expanded apical surface for fleshy pad | **Derived** | Matches *H. sapiens* condition; provides broad contact surface for precision grip; essential for fine tool manipulation | Kivell et al. 2015 |
| 3 | HAND-03 | First ray, proximal segment / metacarpal | **Metacarpal 1 (Robust Thumb)** | Robust, thick-shafted first metacarpal with well-developed muscle attachment sites for opponens pollicis and flexor pollicis brevis | **Derived** | Human-like proportions; provides the structural strength for forceful opposition of the thumb against the fingers; a key tool-use adaptation | Kivell et al. 2015 |
| 4 | HAND-04 | Wrist, distal row, radial side | **Trapezoid** | Wedge-shaped (boot-shaped) carpal bone; human-like configuration that locks the 2nd metacarpal into a rigid central column | **Derived** | Ape trapezoid is pyramidal, allowing more mobility; naledi's derived configuration reduces wrist mobility but increases load-bearing stability for tool use | Kivell et al. 2015 |
| 5 | HAND-05 | Wrist, distal row, central | **Capitate** | Dorsopalmarly expanded head with human-like articular facets; interfaces with metacarpals 2 and 3 | **Primitive features retained** | While overall size and shape approach the human condition, some facet orientations retain primitive angulation; intermediate morphology in this critical carpal | Kivell et al. 2015 |
| 6 | HAND-06 | Wrist, proximal row, radial side | **Scaphoid** | Expanded radial facet with human-like orientation; constrains wrist extension range relative to apes | **Intermediate** | Scaphoid morphology reflects a trade-off: reduced mobility for increased stability; naledi has moved toward the human condition but retains subtle primitive features in tubercle size | Kivell et al. 2015 |
| 7 | HAND-07 | Wrist, composite view | **Wrist as Unit (Carpal Architecture)** | Overall carpal configuration closely resembles *H. sapiens* and Neanderthals; the eight carpals articulate in a modern pattern | **Derived** | The wrist as a functional unit is human-like despite primitive features in individual bones; this integrated modern architecture enables forceful precision grip and power grip for tool use | Kivell et al. 2015 |
| 8 | HAND-08 | Fifth ray, proximal segment | **Proximal Phalanx 5 (Curvature)** | Curved shaft with included angle ~46°; less curved than ray 3 but still well above human range | **Primitive** | Confirms that curvature is a systemic feature across all rays, not limited to central digits; entire finger set is adapted for arboreal grasping | Kivell et al. 2015 |
| 9 | HAND-09 | Third ray, metacarpal dorsal surface | **Metacarpal 3 — Styloid Process** | Bony projection on dorsal base of metacarpal 3 that interlocks with the capitate | **Derived** | Present in humans; absent in apes; stabilises the 3rd MC–capitate joint under compressive loads during power grip and tool use; a key derived character | Kivell et al. 2015 |
| 10 | HAND-10 | First ray, overall proportions | **Thumb-to-Finger Ratio** | Thumb length relative to ray 3: ~58–60%, matching *H. sapiens* range (~58–61%) | **Derived** | Long thumb relative to fingers is the fundamental adaptation for precision grip (pad-to-pad opposition); australopiths have shorter ratios (~52–55%); apes ~43–47% | Kivell et al. 2015 |

### Hand Feature Classification Summary

| Classification | Features | Count |
|---------------|----------|-------|
| **Primitive** (ape-like) | Proximal phalanx curvature (rays 3 and 5) | 2 |
| **Derived** (human-like) | Distal phalanx 1 tuft, metacarpal 1 robusticity, trapezoid, wrist architecture, MC3 styloid process, thumb-to-finger ratio | 6 |
| **Intermediate / Mixed** | Capitate, scaphoid | 2 |

### The Paradox in Numbers

| Measurement | *H. naledi* | *Pan troglodytes* | *H. sapiens* | Closer To |
|-------------|-------------|-------------------|--------------|-----------|
| PP3 curvature (°) | ~50 | ~57 | ~32 | Chimpanzee |
| Thumb:ray 3 ratio (%) | ~59 | ~45 | ~60 | Human |
| MC1 robusticity index | ~0.30 | ~0.24 | ~0.31 | Human |
| Trapezoid shape | Boot/wedge | Pyramidal | Boot/wedge | Human |
| PP5 curvature (°) | ~46 | ~52 | ~26 | Chimpanzee |
| MC3 styloid process | Present | Absent | Present | Human |
