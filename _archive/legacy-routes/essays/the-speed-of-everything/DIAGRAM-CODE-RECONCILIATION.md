---
gate: G5.3
essay: the-speed-of-everything
agent: diagram-code-reconciliation-auditor
date: 2026-02-09
status: PASS
---

# G5.3 Diagram-Code Reconciliation: The Speed of Everything

## Visualization Inventory

| ID | Visualization | Component | Domain |
|----|---------------|-----------|--------|
| D1 | Familiar Race | `FamiliarRace` | Scale comparison |
| D2 | Slow Parade | `SlowParade` | Scale comparison (time-lapse) |
| D3 | Cosmic Speedometer | `CosmicSpeedometer` | Stacked velocity |
| D4 | Light Delay Explorer | `LightDelayExplorer` | Distance-time |
| D5 | Logarithmic Ruler | `LogarithmicRuler` | Logarithmic scale |

## Per-Visualization Reconciliation

### D1: Familiar Race

| Invariant | Check | Result |
|-----------|-------|--------|
| Speed values match CLAIMS.md | Walking 1.4, Bolt 12.3, Highway 31, Jet 250 | ✅ PASS |
| Race width proportional to speed | `width = (speed/250) * 100%`, capped at 100% | ✅ PASS |
| Animation duration inversely proportional | Faster objects animate shorter | ✅ PASS |
| Labels match data | All labels correspond to SPEEDS array entries | ✅ PASS |

### D2: Slow Parade

| Invariant | Check | Result |
|-----------|-------|--------|
| Base rates match CLAIMS.md | Continental drift 0.025 m/yr, Hair 0.15 m/yr, etc. | ✅ PASS |
| Multiplier logic correct | 1yr ×1, 100yr ×100, 1Myr ×1,000,000 | ✅ PASS |
| Bar width proportional to accumulated distance | `pct = (val/maxVal) * 100` | ✅ PASS |
| Display units shift with magnitude | m → km at ≥1000m | ✅ PASS |

### D3: Cosmic Speedometer

| Invariant | Check | Result |
|-----------|-------|--------|
| Layer values match CLAIMS.md | Rotation 465, Orbit 29800, Galactic 220000, CMB ~600000 | ✅ PASS |
| Layers stack additively (conceptual) | Labels use "+" prefix to indicate additive stacking | ✅ PASS |
| Ring widths increase with each layer | `--ring-width` = `((i+1)/total) * 100%` | ✅ PASS |
| Total matches sum narrative | "~600 km/s" label matches the CMB-relative motion claim | ✅ PASS |

### D4: Light Delay Explorer

| Invariant | Check | Result |
|-----------|-------|--------|
| Distances match CLAIMS.md | Moon 1.3s, Sun 500s (8m20s), Proxima 4.24yr | ✅ PASS |
| Photon animation duration scales | Short distances get 0.5s animation, long get 3s | ✅ PASS |
| Tab labels match LIGHT_DISTANCES array | All 5 entries present and labeled correctly | ✅ PASS |

### D5: Logarithmic Ruler

| Invariant | Check | Result |
|-----------|-------|--------|
| All 27 SPEEDS entries placed | Each has `bottom: pct%` based on `(log10 - LOG_MIN) / LOG_RANGE` | ✅ PASS |
| Log₁₀ values match CLAIMS.md | Spot-checked: walking 0.15, sound 2.54, light 8.48 | ✅ PASS |
| Tick marks span 10⁻⁹·⁵ to 10⁹ | `LOG_MIN = -9.5`, `LOG_MAX = 9` | ✅ PASS |
| "You are here" band at log₁₀ 0–1.5 | Matches human speed range (walking to highway) | ✅ PASS |
| Scroll progress maps to axis position | `currentLog = LOG_MIN + progress * LOG_RANGE` | ✅ PASS |
| Entries fade based on distance from cursor | `isNear: dist < 2`, `isClose: dist < 0.8` | ✅ PASS |

---

## Cross-Cutting Checks

| Check | Result |
|-------|--------|
| All speed values in SPEEDS array have sources | ✅ — `source` field populated for all entries |
| No speed value contradicts CLAIMS.md or STATISTICS.md | ✅ — Spot-checked 10 entries |
| Category assignments are semantically correct | ✅ — Each entry's category matches its domain |
| Log₁₀ values are mathematically consistent with speed_ms | ✅ — `Math.log10(speed_ms)` matches `log10` field within ±0.05 |

---

## Overall Status: ✅ PASS

All 5 visualizations pass diagram-code reconciliation. Labels, values, scales, and animation behaviors are consistent with the embedded data and research claims.
