# Visuals — Seven Million Years

> Visual materials research: photography, image sources, and visual treatment plans
> All images must be verified for licensing before use

---

## Photography Sources

### Museum Collections (Tier 1 — institutional photography)

#### Smithsonian National Museum of Natural History
- **Hall of Human Origins** — comprehensive reconstructions by John Gurche
- License: Smithsonian Open Access (CC0 for many items)
- URL: https://humanorigins.si.edu/
- Key items: Full reconstructions of Australopithecus afarensis, H. erectus, H. neanderthalensis, H. floresiensis, H. heidelbergensis
- Photo quality: Excellent, high-resolution

#### Natural History Museum, London
- **Human Evolution gallery**
- License: Varies — some images CC BY 4.0 via NHM media
- Key items: Neanderthal reconstructions, Homo erectus specimens, Homo sapiens skulls

#### Nairobi National Museum (National Museums of Kenya)
- Key items: KNM-ER 1470 (H. rudolfensis), KNM-WT 15000 ("Turkana Boy")
- License: Institutional — requires permission for commercial use
- Note: Casts and replicas may be photographable

### Wikimedia Commons (Tier 2 — CC-licensed)

#### Fossil Specimens
1. **Sahelanthropus tchadensis (Toumaï)**
   - File: Sahelanthropus_tchadensis_-_TM_266-01-060-1.jpg
   - License: CC BY-SA 4.0 (Didier Descouens)
   - Quality: High — multiple angles available

2. **Australopithecus afarensis ("Lucy")**
   - File: Lucy_Mexico.jpg (cast at National Museum of Anthropology, Mexico)
   - License: CC BY-SA 2.0
   - Additional: Reconstruction images available (various licenses)

3. **Laetoli Footprints**
   - File: Laetoli_footprints.jpg
   - License: Public domain (John Reader photo reproductions)
   - Quality: Good — shows trail in volcanic ash

4. **Homo erectus — "Turkana Boy" (KNM-WT 15000)**
   - File: Turkana_Boy.jpg (various)
   - License: CC BY-SA variants available
   - Note: Most complete early Homo skeleton

5. **Homo neanderthalensis skulls**
   - Multiple specimens photographed at museums
   - La Chapelle-aux-Saints, La Ferrassie, Gibraltar Forbes' Quarry
   - License: Various CC licenses on Wikimedia

6. **Homo naledi**
   - File: Homo_naledi_holotype_specimen.jpg
   - License: CC BY 4.0 (from Berger et al. 2015, eLife)
   - Quality: Excellent — eLife is open access

7. **Homo floresiensis**
   - Files: Various skull photographs
   - License: Varies — some institutional

8. **Dmanisi Skull 5**
   - File: Dmanisi_Skull_5.jpg
   - License: CC BY-SA
   - Quality: Good

#### Landscape Photography
1. **Olduvai Gorge, Tanzania**
   - Multiple CC-licensed panoramic shots on Wikimedia
   - Shows layered geological strata — ideal for deep time visualization

2. **Sterkfontein Caves, South Africa**
   - "Cradle of Humankind" World Heritage Site
   - Multiple CC-licensed photos available

3. **Dmanisi, Georgia**
   - Medieval fortress above the excavation site
   - CC-licensed landscape shots available

4. **Liang Bua Cave, Flores, Indonesia**
   - Where H. floresiensis was discovered
   - Limited but available on Wikimedia

5. **Denisova Cave, Siberia**
   - Exterior and interior photographs
   - CC BY-SA available

6. **Great Rift Valley, East Africa**
   - Multiple stunning landscape photographs
   - CC BY-SA available

7. **Atapuerca, Spain**
   - Sima de los Huesos excavation site
   - Some CC-licensed photos available

### Reconstruction Art

#### John Gurche
- Created reconstructions for Smithsonian Hall of Human Origins
- License: Must verify — Smithsonian Open Access may cover
- Species: A. afarensis, H. erectus, H. neanderthalensis, H. floresiensis, H. heidelbergensis, H. sapiens
- Style: Hyperrealistic, scientifically accurate, emotionally powerful

#### Elisabeth Daynès
- French sculptor known for hominin reconstructions
- License: Commercial — would need licensing agreement
- Notable: Reconstructions at Musée de l'Homme, Paris
- Alternative: Use Wikimedia photos of her exhibits (photographer license varies)

#### Kennis & Kennis
- Dutch twin brothers, paleoartists
- License: Commercial — expensive
- Notable: Neanderthal Museum (Mettmann) reconstructions

### Tool Photography
1. **Oldowan choppers** — multiple CC-licensed images on Wikimedia
2. **Acheulean hand axes** — extensive Wikimedia collection, many museum shots
3. **Mousterian/Levallois cores** — available on Wikimedia
4. **Upper Paleolithic blades** — museum collections

### Cave Art Photography
1. **Chauvet Cave** — limited official photos (French Ministry of Culture)
2. **Lascaux Cave** — some CC-licensed replica images
3. **Altamira Cave** — replica images available
4. **Cueva de los Aviones** — limited

---

## Data Visualization Requirements

### 1. Hominid Timeline (Interactive)
- **Type:** Horizontal or vertical gantt-style chart
- **Data:** Species temporal ranges (from FIGURES.md)
- **Interactivity:** Hover for species details, scrub through time
- **Technology:** Recharts or D3
- **Data Source:** Compiled from FIGURES.md temporal ranges

### 2. Brain Volume Chart
- **Type:** Scatter plot with trend line
- **X-axis:** Time (MYA → kya)
- **Y-axis:** Cranial capacity (cc)
- **Data Points:** Each species' range with mean
- **Technology:** Recharts (ScatterChart)
- **Data Source:** Rightmire 2004; species-specific papers

### 3. Body Size Comparison
- **Type:** Grouped bar chart or silhouette comparison
- **Data:** Height and mass estimates per species
- **Technology:** Recharts or custom SVG
- **Data Source:** FIGURES.md body measurements

### 4. Tool Technology Progression
- **Type:** Stepped timeline or progression graphic
- **Stages:** Lomekwian → Oldowan → Acheulean → MSA/Mousterian → Upper Paleolithic
- **Associated with:** Species that used each technology
- **Technology:** Custom SVG + CSS animation

### 5. Climate Overlay
- **Type:** Line chart with species range bands
- **Data:** Marine isotope stages (Lisiecki & Raymo 2005 benthic δ18O stack)
- **Overlay:** Species temporal ranges as horizontal bands
- **Technology:** D3 (complex layered chart)
- **Data Source:** LR04 stack (publicly available data)

### 6. Geographic Range Maps
- **Type:** World map with colored range polygons
- **Per-species or per-era display**
- **Technology:** D3-geo with topojson (already installed)
- **Projection:** Natural Earth or Robinson
- **Data Source:** Published range estimates from species descriptions

### 7. Migration Animation
- **Type:** Animated world map showing dispersal over time
- **Routes:** Out of Africa I (H. erectus), Out of Africa II (H. sapiens), Neanderthal range, Denisovan distribution
- **Technology:** D3-geo with animated paths and temporal scrubbing
- **Key requirement:** Smooth, publication-quality animation — not jerky SVG

### 8. Species Comparison Matrix
- **Type:** Radar chart or parallel coordinates
- **Axes:** Brain size, body size, tool complexity, geographic range, temporal range, diet breadth
- **Technology:** Recharts (RadarChart) or D3
- **Interactivity:** Select species to compare

### 9. Phylogenetic Tree
- **Type:** Cladogram with time-scaled branches
- **Technology:** D3 tree layout with custom branch lengths
- **Interactivity:** Click species for details
- **Data Source:** Compiled from Wood & Richmond 2000; recent phylogenetic analyses

---

## Visual Treatment Notes

### Color Palette Inspiration (for Design Research)
- **Geological strata:** Layered earth tones — sienna, ochre, umber, sandstone
- **Bone:** Ivory, cream, weathered white
- **Cave:** Deep charcoal, slate, volcanic black
- **Ochre pigments:** Red ochre (#CC5500-ish), yellow ochre (#CC8800-ish) — used by hominins for 300,000+ years
- **Savanna:** Dry gold, sage green, dust brown

### Photography Treatment
- Full-bleed for landscape/environment shots
- Contained within frames for specimens
- Dark background for fossil photography (museum-style)
- High contrast — these images should be dramatic

### Typography Inspiration
- Serif for body text — editorial, authoritative
- Sans-serif for data labels — clean, scientific
- Monospace for dates and technical terms
