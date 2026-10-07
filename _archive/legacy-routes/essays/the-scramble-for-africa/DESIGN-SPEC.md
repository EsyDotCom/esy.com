# Design Specification: The Scramble for Africa

> **Generated**: December 29, 2024
> **CSS Class Prefix**: `partition-` (unique to this essay)
> **Design Philosophy**: Colonial cartography meets archival photography

---

## Artifact → Digital Metaphor Translations

| Physical Artifact | Digital Translation | Implementation |
|-------------------|---------------------|----------------|
| **Colonial Maps** | Era transition backgrounds | Gradient overlays with territorial color fills; borders as CSS gradients |
| **Treaty Documents** | Blockquote/quote styling | Aged parchment backgrounds, dark ink text, subtle paper grain texture |
| **Silver Gelatin Prints** | Figure cards | High contrast treatment, sepia-to-BW processing feel, vintage frame borders |
| **Border Markers** | Chapter dividers | Sharp geometric lines cutting through soft backgrounds |
| **Rivers (Penetration Routes)** | Progress indicator | Flowing vertical line with colonial colors pooling as you scroll |
| **Railroad Tracks** | Timeline connectors | Parallel lines with cross-ties for event markers |
| **Military Uniforms** | System comparison panels | Color-coded borders matching colonial power |
| **Brass Medals** | Statistics display | Metallic accent highlights, embossed appearance |
| **Ink Blots/Seals** | Section markers | Organic shapes anchoring chapter starts |

---

## Era Skin Specifications

### Era 1: `exploration` (1870–1884)
**Chapters**: Hero, Chapter 1 (The Stage Is Set)
**Visual Reference**: Victorian expedition photography, sepia toning, explorer journals

| Token | Value | Rationale |
|-------|-------|-----------|
| `--partition-bg` | `#1a1712` | Warm black like aged photographic plates |
| `--partition-bg-elevated` | `#2a251e` | Leather journal cover |
| `--partition-text` | `#f4e4c1` | Aged parchment cream |
| `--partition-accent` | `#c9a227` | Brass expedition equipment |
| `--partition-border` | `rgba(201, 162, 39, 0.2)` | Subtle gold trim |

---

### Era 2: `berlin` (1884–1885)
**Chapters**: Chapter 2 (The Rules of the Game)
**Visual Reference**: Diplomatic chambers, Prussian formality, iron and oak

| Token | Value | Rationale |
|-------|-------|-----------|
| `--partition-bg` | `#0f1114` | Cold diplomatic chamber |
| `--partition-bg-elevated` | `#1a1d22` | German iron gray |
| `--partition-accent` | `#434b4d` | Prussian steel |
| `--partition-accent-2` | `#6b7280` | Conference table marble |
| `--partition-border` | `rgba(67, 75, 77, 0.3)` | Iron ruling lines |

---

### Era 3: `congo` (1885–1908)
**Chapters**: Chapter 3 (The King's Private Hell)
**Visual Reference**: Rubber terror, Belgian burgundy, blood on documents

| Token | Value | Rationale |
|-------|-------|-----------|
| `--partition-bg` | `#0d0808` | Dried blood darkness |
| `--partition-bg-elevated` | `#1a1111` | Congo Free State horror |
| `--partition-accent` | `#722f37` | Belgian burgundy / blood |
| `--partition-accent-2` | `#8b1e1e` | Rubber-enforced violence |
| `--partition-text-muted` | `#9a8a8a` | Faded atrocity documentation |
| `--partition-border` | `rgba(114, 47, 55, 0.4)` | Stained borders |

---

### Era 4: `resistance` (1879–1898)
**Chapters**: Chapter 4 (Those Who Fought Back)
**Visual Reference**: Ethiopian sovereignty, Zulu victories, African gold and earth

| Token | Value | Rationale |
|-------|-------|-----------|
| `--partition-bg` | `#0d1008` | African savanna night |
| `--partition-bg-elevated` | `#1a2012` | Forest shade |
| `--partition-accent` | `#ffd700` | Ethiopian imperial gold |
| `--partition-accent-2` | `#ffb347` | Resistance amber/fire |
| `--partition-accent-3` | `#2d5a4a` | African highlands green |
| `--partition-border` | `rgba(255, 215, 0, 0.2)` | Victory gold trim |

---

### Era 5: `conquest` (1880–1900)
**Chapters**: Chapter 5 (The Tools of Conquest)
**Visual Reference**: Industrial machinery, Maxim guns, stark documentary

| Token | Value | Rationale |
|-------|-------|-----------|
| `--partition-bg` | `#0a0a0a` | Industrial black |
| `--partition-bg-elevated` | `#151515` | Machine housing |
| `--partition-accent` | `#6b7280` | Steel/gunmetal |
| `--partition-accent-2` | `#ef4444` | Muzzle flash / casualty red |
| `--partition-text` | `#e5e5e5` | High contrast documentary |
| `--partition-border` | `rgba(107, 114, 128, 0.3)` | Industrial rivets |

---

### Era 6: `systems` (1890–1914)
**Chapters**: Chapter 6 (The Colonial Machine)
**Visual Reference**: Administrative documents, multi-power comparison, bureaucratic

| Token | Value | Rationale |
|-------|-------|-----------|
| `--partition-bg` | `#0c0c0f` | Colonial office darkness |
| `--partition-bg-elevated` | `#16161a` | Filing cabinet |
| `--partition-british` | `#8b0000` | British Empire crimson |
| `--partition-french` | `#000080` | French Empire navy |
| `--partition-german` | `#434b4d` | German Empire iron |
| `--partition-belgian` | `#722f37` | Belgian Congo burgundy |
| `--partition-accent` | `#9ca3af` | Administrative gray |
| `--partition-border` | `rgba(156, 163, 175, 0.2)` | Document borders |

---

### Era 7: `cartography` (1885–1914)
**Chapters**: Chapter 7 (Lines on Maps, Lives Divided)
**Visual Reference**: Colonial maps, ruler-drawn borders, divided peoples

| Token | Value | Rationale |
|-------|-------|-----------|
| `--partition-bg` | `#f4e4c1` | Map parchment (LIGHT mode) |
| `--partition-bg-elevated` | `#e8d4a8` | Aged map surface |
| `--partition-text` | `#2a2520` | Cartographic ink |
| `--partition-accent` | `#8b4513` | Territory border brown |
| `--partition-accent-2` | `#d4a574` | Desert/land areas |
| `--partition-border` | `rgba(139, 69, 19, 0.5)` | Map borders |

---

### Era 8: `legacy` (1914–Present)
**Chapters**: Chapter 8 (The Borders That Remain)
**Visual Reference**: Transition to modern, documentary to contemporary

| Token | Value | Rationale |
|-------|-------|-----------|
| `--partition-bg` | `#0d0d0d` | Documentary black |
| `--partition-bg-elevated` | `#1a1a1a` | Modern archive |
| `--partition-text` | `#f5f5f5` | Clean modern white |
| `--partition-accent` | `#3b82f6` | Hope blue / future |
| `--partition-accent-2` | `#f4e4c1` | Historical echo |
| `--partition-border` | `rgba(59, 130, 246, 0.2)` | Modern borders |

---

## Component Specifications

### Progress Indicator: "The Partition"
- Vertical track styled as river
- Fill color cycles through colonial power colors as you scroll
- Year markers appear as border stones

### Figure Cards
- Vintage photograph frame treatment
- Sepia-tinted borders
- Epithet in colonial power color (where applicable)
- Quote appears like archived document excerpt

### Quote Monuments
- Treaty document aesthetic
- Aged paper background texture
- Dark serif text (ink-like)
- Attribution styled as archival notation

### Chapter Headers
- Era date appears like date stamp
- Title in high-contrast display type
- Metaphor subtitle in muted documentary tone
- Border below styled as map ruling line

### Statistics
- Brass medal treatment for numbers
- Metallic sheen on key figures
- Contrast color for emphasis stats

### Timeline Events
- Railroad track connector lines
- Event markers as station stops
- Year displayed prominently like mile markers

### Colonial System Panels
- Each panel border-coded to colonial power
- British = crimson left border
- French = navy left border
- German = iron gray left border
- Belgian = burgundy left border

---

## CSS Token Structure

```css
.partition-essay {
  /* Base tokens - overridden by era skins */
  --partition-bg: #0d0d0d;
  --partition-bg-elevated: #1a1a1a;
  --partition-text: #f4e4c1;
  --partition-text-muted: #a9a9a9;
  --partition-accent: #c9a227;
  --partition-accent-2: #ffb347;
  --partition-border: rgba(201, 162, 39, 0.2);

  /* Colonial power colors (constant) */
  --partition-british: #8b0000;
  --partition-french: #000080;
  --partition-german: #434b4d;
  --partition-belgian: #722f37;
  --partition-portuguese: #228b22;
  --partition-italian: #808000;
  --partition-ethiopian: #ffd700;

  /* Semantic colors */
  --partition-atrocity: #8b1e1e;
  --partition-resistance: #2d5a4a;
  --partition-reform: #4169e1;

  /* Typography */
  --partition-font-display: 'Playfair Display', Georgia, serif;
  --partition-font-body: 'Source Serif Pro', Georgia, serif;
  --partition-font-ui: 'Inter', system-ui, sans-serif;
  --partition-font-data: 'JetBrains Mono', monospace;
}
```

---

## Era-to-Chapter Mapping

| Chapter | Era Skin | Dominant Colors |
|---------|----------|-----------------|
| Hero | `exploration` | Brass gold, parchment |
| Ch 1: Stage Is Set | `exploration` | Sepia, expedition gold |
| Ch 2: Rules of the Game | `berlin` | Iron gray, steel |
| Ch 3: King's Private Hell | `congo` | Burgundy, blood red |
| Ch 4: Those Who Fought Back | `resistance` | Ethiopian gold, green |
| Ch 5: Tools of Conquest | `conquest` | Gunmetal, casualty red |
| Ch 6: Colonial Machine | `systems` | Multi-power coded |
| Ch 7: Lines on Maps | `cartography` | Parchment, brown ink |
| Ch 8: Borders That Remain | `legacy` | Documentary BW, hope blue |

---

## Novelty Verification

### Structural Uniqueness
- [x] CSS class prefix `partition-` is unique (not used in K-pop, RAP, Wine, etc.)
- [x] Era skin naming convention based on colonial/archival terminology
- [x] Colonial power color system unique to this subject
- [x] Map-as-progress-indicator unique to territorial expansion narrative

### Visual Uniqueness
- [x] Primary colors derived from colonial cartography tradition
- [x] Typography justified by Victorian-era documentary printing
- [x] Visual effects (parchment texture, sepia grain) tied to archives
- [x] Hover states styled as historical document examination

### Conceptual Uniqueness
- [x] "Partition" as core design metaphor
- [x] Era transitions reflect actual colonial periods
- [x] Color shifts tied to colonial power dominance in each chapter
- [x] Could identify subject from CSS (colonial colors, Africa outline)

---

*Design specification complete. Ready for CSS implementation.*
