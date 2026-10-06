# Era Guide: The Invention of Wine

> Visual and narrative treatment specifications by historical period

---

## Design Philosophy

The essay uses a **wine aging progression** as its core visual metaphor:
- **Early eras**: Grape purple (#4A235A) — raw, unfermented potential
- **Classical eras**: Young burgundy (#722F37) — prime wine color
- **Later eras**: Aged brick (#8B4513) — mature, oxidized tones

This mirrors how wine darkens and browns with age, creating visual continuity with the subject matter.

---

## Era 1: The First Vintage (6000 BCE)

### Narrative Focus
The accidental discovery of wine in Neolithic Georgia. Emphasis on mystery, wonder, and the transformative moment when humans first tasted fermented grape juice.

### Visual Treatment
| Element | Specification |
|---------|---------------|
| Primary Color | --wine-grape (#4A235A) |
| Background | Darkest, most primordial feel |
| Mood | Ancient, mysterious, dawn of civilization |
| Key Visual | Grape cluster transforming to wine drop |

### Key Content
- Location: South Caucasus (Georgia, Armenia)
- Evidence: Pottery with tartaric acid residue
- Context: Before writing, before the wheel
- Significance: First biotechnology

### Tone
Reverent, wonder-filled. This is humanity's first encounter with the magic of fermentation.

---

## Era 2: Wine of the Pharaohs (3150 BCE)

### Narrative Focus
Wine's elevation to divine status in ancient Egypt. The burial of King Scorpion I with 700 wine jars demonstrates wine's importance to afterlife beliefs.

### Visual Treatment
| Element | Specification |
|---------|---------------|
| Primary Color | Gradient: --wine-grape → --wine-young |
| Background | Transitional, warming |
| Mood | Sacred, royal, ceremonial |
| Key Visual | Tomb imagery, sealed jars |

### Key Content
- Location: Abydos, Egypt
- Key Figure: King Scorpion I
- Evidence: 700 wine jars in royal tomb
- Significance: Wine reserved for gods and kings

### Tone
Majestic, sacred. Wine is now worthy of eternity.

---

## Era 3: Dionysus Rises (1500 BCE)

### Narrative Focus
The Greek philosophical and religious relationship with wine. Dionysus worship, symposia, and wine's role in shaping Western thought.

### Visual Treatment
| Element | Specification |
|---------|---------------|
| Primary Color | --wine-young (#722F37) |
| Background | Full burgundy warmth |
| Mood | Philosophical, ecstatic, cultured |
| Key Visual | Symposium scenes, Dionysian imagery |

### Key Content
- Location: Ancient Greece
- Key Figure: Dionysus (god of wine)
- Cultural practice: Symposia (drinking + philosophy)
- Spread: Viticulture across Mediterranean

### Tone
Intellectual yet passionate. Wine as vehicle for truth and ecstasy.

---

## Era 4: Bacchus and Empire (200 BCE)

### Narrative Focus
Roman industrialization of wine production. Classification systems, wooden barrels, and the spread of vineyards across the empire.

### Visual Treatment
| Element | Specification |
|---------|---------------|
| Primary Color | Gradient: --wine-young → --wine-aged |
| Background | Maturing, browning |
| Mood | Imperial, systematic, expansive |
| Key Visual | Barrels, amphorae, vineyard maps |

### Key Content
- Location: Roman Empire (Italy, Gaul, Iberia, Germania)
- Innovations: Wooden barrels, vintage classification
- Scale: First industrial wine production
- Legacy: Foundation of European wine regions

### Tone
Confident, imperial. Wine as infrastructure of civilization.

---

## Era 5: Monks and Champagne (500-1700 CE)

### Narrative Focus
Monastic preservation of viticultural knowledge through the Dark Ages, culminating in the terroir classifications of Burgundy and the champagne advances (though myths debunked).

### Visual Treatment
| Element | Specification |
|---------|---------------|
| Primary Color | --wine-aged (#8B4513) |
| Background | Aged, mature, brick tones |
| Mood | Contemplative, patient, preserving |
| Key Visual | Monastery cellars, champagne bubbles |

### Key Content
- Location: European monasteries (Burgundy, Champagne)
- Key Figures: Benedictine monks, Cistercians, Dom Pérignon
- Achievement: Terroir classification, sparkling wine
- Significance: Knowledge preservation through Dark Ages

### Tone
Reverent, scholarly. Quiet dedication preserving civilization's pleasures.

---

## Era 6: The Phylloxera Crisis (1863-1890) [EXPANSION]

### Narrative Focus
The aphid apocalypse that destroyed 70% of European vineyards and the paradoxical American rootstock solution.

### Visual Treatment
| Element | Specification |
|---------|---------------|
| Primary Color | Desaturated burgundy, almost gray |
| Background | Blighted, withered |
| Mood | Crisis, devastation, then hope |
| Key Visual | Dead vines, microscopic aphid, grafting diagram |

### Key Content
- Location: Europe (originating France)
- Villain: Phylloxera aphid (*Daktulosphaira vitifoliae*)
- Scale: 70% of European vineyards destroyed
- Solution: American rootstock grafting
- Legacy: Modern viticulture fundamentally changed

### Tone
Dramatic, urgent. The near-death of wine itself, and the ingenuity of salvation.

### Visual Approach (New)
- **Desaturated palette**: Drain color to represent blight
- **Before/after contrast**: Lush vineyard → devastated landscape
- **Microscopic view**: The tiny aphid that caused catastrophe
- **Grafting diagram**: Scientific solution visualized

---

## Era 7: The Global Industry (1976-Present) [EXPANSION]

### Narrative Focus
The rise of New World wines, the 1976 Judgment of Paris, and the modern $300+ billion global industry.

### Visual Treatment
| Element | Specification |
|---------|---------------|
| Primary Color | Return to full --wine-young |
| Background | Vibrant, global |
| Mood | Triumphant, diverse, contemporary |
| Key Visual | World map, data visualization, modern bottles |

### Key Content
- Watershed: 1976 Judgment of Paris (California beats France)
- Scale: $300B+ market, 260M hectoliters annually
- Geography: Global production (Italy, France, Spain, USA, Argentina, Chile, Australia)
- Challenges: Climate change, sustainability, natural wine movement

### Tone
Celebratory but forward-looking. Wine has conquered the world, but faces new challenges.

### Visual Approach (New)
- **World map**: Show global wine regions
- **Data visualization**: Production/consumption statistics
- **Modern photography style**: If using images
- **Full saturation return**: Vitality after crisis

---

## Era Transition Guidelines

### Color Flow
```
Era 1 (6000 BCE) → Purple (grape, raw)
        ↓
Era 2 (3150 BCE) → Purple-Burgundy gradient
        ↓
Era 3 (1500 BCE) → Full Burgundy (prime)
        ↓
Era 4 (200 BCE) → Burgundy-Brick gradient
        ↓
Era 5 (1668 CE) → Aged Brick
        ↓
Era 6 (1863) → Desaturated/Gray (crisis)
        ↓
Era 7 (Present) → Full Burgundy return (renewal)
```

### Typography Consistency
- All era headers: Playfair Display, 400 weight
- All era body: DM Sans, 300-400 weight
- Era dates: Playfair Display, large scale, low opacity

### Animation Philosophy
- **Horizontal parallax**: Maintain for visual continuity
- **Era-specific elements**: Add unique animations per era where meaningful
- **Scroll-driven**: User controls pace of historical journey

---

## Implementation Notes

### Current Implementation (Eras 1-5)
```typescript
const eras = [
  { year: '6000 BCE', title: 'The First Vintage', location: 'Georgia & Armenia' },
  { year: '3150 BCE', title: 'Wine of the Pharaohs', location: 'Ancient Egypt' },
  { year: '1500 BCE', title: 'Dionysus Rises', location: 'Ancient Greece' },
  { year: '200 BCE', title: 'Bacchus and Empire', location: 'Roman Empire' },
  { year: '1668 CE', title: 'Monks and Champagne', location: 'Medieval Europe' },
];
```

### Proposed Expansion (Eras 6-7)
```typescript
const expandedEras = [
  ...currentEras,
  { year: '1863', title: 'The Phylloxera Crisis', location: 'Europe' },
  { year: 'Today', title: 'The Global Industry', location: 'Worldwide' },
];
```

---

*Era guide supports consistent visual treatment across historical periods while allowing for expansion.*
