# Formulas and Calculations

> Research Phase: LED Flashlight Process Essay
> Domain: Electronics/Engineering Education

---

## Core Formulas

### 1. Ohm's Law

The fundamental relationship between voltage, current, and resistance.

```
V = I × R

Where:
  V = Voltage (Volts)
  I = Current (Amperes)
  R = Resistance (Ohms)
```

**Rearrangements**:
```
I = V / R    (solve for current)
R = V / I    (solve for resistance)
```

**Educational Note**: Ohm's Law is the single most important formula for understanding circuits. In a flashlight, we use it to calculate the resistor value needed to limit current to a safe level for the LED.

---

### 2. LED Current-Limiting Resistor

The resistor value needed to achieve a target LED current.

```
R = (V_source - V_LED) / I_LED

Where:
  R = Resistor value (Ohms)
  V_source = Battery voltage (Volts)
  V_LED = LED forward voltage (Volts)
  I_LED = Desired LED current (Amperes)
```

**Example Calculation**:
```
Given:
  V_source = 4.5V (3× AA batteries)
  V_LED = 2.0V (red LED)
  I_LED = 0.020A (20mA)

R = (4.5 - 2.0) / 0.020
R = 2.5 / 0.020
R = 125Ω

Nearest standard value: 120Ω or 150Ω
```

**Tradeoff**: 
- Lower R → Higher current → Brighter LED → Shorter battery life → Hotter LED
- Higher R → Lower current → Dimmer LED → Longer battery life → Cooler LED

---

### 3. Power Dissipation

Power consumed by each component.

**Resistor Power**:
```
P_resistor = I² × R = (V_source - V_LED)² / R

Where:
  P = Power (Watts)
```

**LED Power**:
```
P_LED = V_LED × I_LED
```

**Total Circuit Power**:
```
P_total = V_source × I_LED = P_resistor + P_LED
```

**Example**:
```
Given:
  V_source = 4.5V
  V_LED = 2.0V
  I_LED = 20mA
  R = 125Ω

P_resistor = (0.020)² × 125 = 0.05W (50mW)
P_LED = 2.0 × 0.020 = 0.04W (40mW)
P_total = 4.5 × 0.020 = 0.09W (90mW)

Efficiency = P_LED / P_total = 0.04 / 0.09 = 44%
```

**Insight**: 56% of the power is wasted as heat in the resistor! This is why resistor-based current limiting is inefficient for high-power LEDs.

---

### 4. Battery Runtime

Theoretical runtime from a battery.

```
Runtime (hours) = Capacity (mAh) / Current (mA)
```

**With efficiency factor** (accounts for internal resistance, voltage drop):
```
Runtime_actual = Runtime_theoretical × η

Where:
  η = Efficiency factor (typically 0.7–0.85)
```

**Example**:
```
Given:
  Battery: AA alkaline, 2500mAh
  LED current: 20mA
  Efficiency: 0.75

Runtime_theoretical = 2500 / 20 = 125 hours
Runtime_actual = 125 × 0.75 = 94 hours
```

---

### 5. Luminous Efficacy

How efficiently electrical power converts to visible light.

```
Efficacy (lm/W) = Luminous flux (lumens) / Power (Watts)
```

**LED Brightness** (approximate):
```
Lumens ≈ Efficacy × P_LED
```

**Example**:
```
Given:
  P_LED = 40mW = 0.04W
  Efficacy = 100 lm/W (white LED)

Lumens ≈ 100 × 0.04 = 4 lumens
```

**Note**: This is a rough approximation. Actual luminous output depends on LED quality, temperature, and drive current.

---

### 6. Voltage Divider (Multiple LEDs)

For LEDs in series:
```
V_total = V_LED1 + V_LED2 + ... + V_LEDn
R = (V_source - V_total) / I_LED
```

For LEDs in parallel (same color):
```
I_total = I_LED1 + I_LED2 + ... + I_LEDn
Each LED needs its own resistor!
```

**Warning**: Never connect LEDs of different colors in parallel without individual resistors—the lower Vf LED will hog current and may burn out.

---

## Derived Metrics for Process Essay

### Metric 1: Brightness (Relative)

Simplified brightness score (0–100 scale):

```
brightness = (current / max_current) × color_factor × 100

Where:
  current = actual LED current (mA)
  max_current = 30mA (reference)
  color_factor = 1.0 (white), 0.9 (green), 0.7 (red), 0.6 (blue)
```

**Rationale**: Brightness scales roughly linearly with current (within normal range). Color factor accounts for human eye sensitivity.

---

### Metric 2: Battery Life (Hours)

```
battery_life = (capacity × efficiency) / current

Where:
  capacity = battery capacity (mAh)
  efficiency = 0.75 (typical)
  current = LED current (mA)
```

**Example values**:
| Battery | Capacity | At 20mA | At 10mA |
|---------|----------|---------|---------|
| CR2032 | 220mAh | 8 hours | 16 hours |
| AA | 2500mAh | 94 hours | 187 hours |
| 2×AA | 2500mAh | 94 hours | 187 hours |

---

### Metric 3: Efficiency (%)

```
efficiency = P_LED / P_total × 100
           = V_LED / V_source × 100
```

**Key Insight**: Efficiency improves when V_source is closer to V_LED. This is why matching battery voltage to LED requirements matters.

| Config | V_source | V_LED | Efficiency |
|--------|----------|-------|------------|
| 2×AA + White | 3.0V | 3.2V | Won't work |
| 3×AA + White | 4.5V | 3.2V | 71% |
| CR2032 + Red | 3.0V | 2.0V | 67% |
| 2×AA + Red | 3.0V | 2.0V | 67% |

---

### Metric 4: Heat Dissipation (mW)

```
heat = P_resistor = I² × R = P_total - P_LED
```

Higher heat means:
- Wasted energy
- Shorter component life
- Potential safety concern (with high-power LEDs)

---

### Metric 5: Beam Intensity (Relative)

```
intensity = lumens / beam_solid_angle

For a simple model:
intensity = brightness × reflector_factor

Where:
  reflector_factor:
    - Spot (smooth): 2.0 (concentrated)
    - Medium (orange peel): 1.0 (baseline)
    - Flood (textured): 0.5 (spread)
    - No reflector: 0.3 (very spread)
```

---

### Metric 6: Overall Score

Weighted combination for "artifact card":

```
score = (brightness × 0.3) + (battery_life_normalized × 0.3) + 
        (efficiency × 0.2) + (beam_quality × 0.2)

Where all components are normalized to 0–100 scale
```

---

## Pseudocode: Compute All Metrics

```javascript
function computeMetrics(state) {
  const { battery, led, resistor, reflector } = state.config;
  
  // Get component specs
  const V_source = BATTERY_SPECS[battery].voltage;
  const capacity = BATTERY_SPECS[battery].capacity;
  const V_led = LED_SPECS[led.color].forwardVoltage;
  const R = resistor.value;
  
  // Calculate current (Ohm's Law)
  const current = (V_source - V_led) / R * 1000; // mA
  
  // Validate circuit works
  if (V_source < V_led) {
    return { error: "Insufficient voltage", ...defaultMetrics };
  }
  
  // Metric 1: Brightness
  const colorFactor = LED_SPECS[led.color].colorFactor;
  const brightness = Math.min(100, (current / 30) * colorFactor * 100);
  
  // Metric 2: Battery Life
  const batteryLife = (capacity * 0.75) / current;
  
  // Metric 3: Efficiency
  const efficiency = (V_led / V_source) * 100;
  
  // Metric 4: Heat
  const P_total = V_source * (current / 1000);
  const P_led = V_led * (current / 1000);
  const heat = (P_total - P_led) * 1000; // mW
  
  // Metric 5: Beam Intensity
  const reflectorFactor = REFLECTOR_SPECS[reflector.type].factor;
  const beamIntensity = brightness * reflectorFactor;
  
  // Metric 6: Overall Score
  const batteryLifeNorm = Math.min(100, (batteryLife / 100) * 100);
  const score = (brightness * 0.3) + (batteryLifeNorm * 0.3) + 
                (efficiency * 0.2) + (Math.min(100, beamIntensity) * 0.2);
  
  return {
    current: Math.round(current * 10) / 10,
    brightness: Math.round(brightness),
    batteryLife: Math.round(batteryLife),
    efficiency: Math.round(efficiency),
    heat: Math.round(heat),
    beamIntensity: Math.round(beamIntensity),
    score: Math.round(score)
  };
}
```

---

## Formula Verification Sources

1. Horowitz & Hill. "The Art of Electronics." Chapter 2: Basic Discrete-Component Circuit Analysis.
2. All About Circuits. "Ohm's Law" and "LED Circuits."
3. Electronics Tutorials. "Light Emitting Diodes."
4. SparkFun. "LEDs" tutorial.
5. Adafruit. "LED Current Limiting Resistors" guide.

---

## Status

All formulas verified against standard electronics references. Simplified models are appropriate for educational purposes while remaining physically accurate.















