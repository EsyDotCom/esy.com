# Research Synthesis

> LED Flashlight Process Essay
> Date: December 2025

---

## Key Educational Insights

### 1. The Central Tradeoff Triangle

Every flashlight design balances three competing factors:

```
        BRIGHTNESS
            △
           / \
          /   \
         /     \
        /       \
       /_________\
  BATTERY LIFE   EFFICIENCY
```

**Reader Learning**: You can't maximize all three. Choices matter.

### 2. Voltage Matching is Critical

The most common "mistake" a reader can make: choosing a battery that can't drive the LED.

| LED Color | Minimum Battery |
|-----------|-----------------|
| Red/Yellow | 2×AA (3V) or CR2032 |
| Green | 2×AA (3V) or CR2032 |
| Blue/White | 3×AA (4.5V) recommended |

**Educational Moment**: When V_source < V_LED, the circuit simply doesn't work. This creates a natural diagnostic scene.

### 3. Resistor as the "Sacrifice"

The resistor converts "excess" voltage to heat. This is intentional waste to protect the LED.

**Insight for readers**: The resistor doesn't "use" electricity for anything useful—it throws it away as heat. That's why efficiency drops when there's a big gap between battery voltage and LED voltage.

### 4. Current Controls Everything

Once the reader understands that **current** (not voltage) determines brightness, they've grasped the core concept:

- More current → brighter LED → more heat → shorter life
- Less current → dimmer LED → less heat → longer life

The resistor is just the "knob" that sets current.

### 5. Reflector Redistributes, Doesn't Create

Common misconception: "A better reflector makes more light."

**Truth**: Total lumens are fixed by the LED. The reflector just concentrates or spreads them.

- Spot reflector: Same lumens, smaller area → higher lux
- Flood reflector: Same lumens, larger area → lower lux

---

## Tradeoff Relationships for Simulation

### Primary Tradeoffs

| Choice | Increases | Decreases |
|--------|-----------|-----------|
| Lower resistor | Brightness, heat | Battery life |
| Higher resistor | Battery life | Brightness |
| More batteries (series) | Efficiency (for high-Vf LEDs), brightness | Portability, simplicity |
| White LED | Useful light output | Efficiency (if battery mismatched) |
| Red LED | Efficiency with low voltage | Brightness perception |
| Spot reflector | Throw distance | Coverage area |
| Flood reflector | Coverage area | Throw distance |

### Secondary Tradeoffs

| Choice | Pros | Cons |
|--------|------|------|
| CR2032 | Tiny form factor | Short runtime |
| 3×AA | Best efficiency | Larger size |
| Tail switch | One-hand operation | Longer wiring |
| Side switch | Simple, compact | Accidental activation |

---

## Narrative Arc

### Beginning: "What is a flashlight?"

- Components introduction (battery, switch, resistor, LED)
- The electron's journey metaphor
- Why each part exists

### Middle: "Making choices"

1. **LED selection** — color determines voltage needs, affects brightness perception
2. **Battery selection** — must match or exceed LED voltage
3. **Resistor calculation** — the tradeoff dial between brightness and life
4. **Reflector choice** — throw vs. flood
5. **Switch selection** — usability consideration

### End: "Your flashlight"

- Artifact card showing all choices
- Computed metrics (brightness, runtime, efficiency)
- Comparison to "ideal" configurations
- What they learned

---

## Scene Opportunities

### High-Impact Interactive Moments

1. **Resistor Slider** — Watch brightness and battery life update in real-time as you drag
2. **Voltage Mismatch Diagnostic** — "Why won't my LED light?" reveals insufficient voltage
3. **Exploded Assembly** — Drag components into the flashlight body
4. **Beam Pattern Preview** — See how reflector choice changes the light cone
5. **Efficiency Meter** — Watch power split between "useful light" and "wasted heat"

### "Aha" Moments to Design For

1. "Oh, the resistor wastes energy on purpose!"
2. "1.5V can't drive a white LED—I need more batteries"
3. "Green looks brighter than red at the same current"
4. "A spot reflector doesn't make more light, just concentrates it"
5. "Lower resistance = brighter but shorter battery life"

---

## Content Guardrails

### What We're NOT Teaching

- Practical construction (no soldering instructions)
- Safety warnings about batteries (beyond scope)
- Advanced topics (boost converters, PWM dimming)
- Specific product recommendations

### What We ARE Teaching

- Basic circuit concepts (voltage, current, resistance)
- Ohm's Law and its practical application
- Engineering tradeoffs (can't maximize everything)
- How to read component specifications
- The relationship between choices and outcomes

---

## Research Confidence

| Topic | Confidence | Notes |
|-------|------------|-------|
| LED forward voltages | High | Multiple datasheet sources |
| Battery capacities | High | Manufacturer specs |
| Ohm's Law calculations | High | Fundamental physics |
| Luminous efficacy values | Medium | Varies by specific LED |
| Reflector efficiency factors | Medium | Simplified model |
| Runtime estimates | Medium | Depends on discharge conditions |

---

## Ready for Spec Construction

Research package complete:
- ✅ TECHNICAL-SPECS.md — Component specifications
- ✅ FORMULAS.md — Calculations and pseudocode
- ✅ COMPONENT-DATA.md — Concrete values for state model
- ✅ SYNTHESIS.md — Key insights and narrative arc

**Next**: Invoke Interactive Experience Architect to produce 12-section specification.















