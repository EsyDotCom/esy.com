# Technical Specifications Research

> Research Phase: LED Flashlight Process Essay
> Date: December 2025
> Domain: Electronics/Engineering Education

---

## 1. LED Specifications

### Forward Voltage by Color

LEDs require a minimum voltage (forward voltage, Vf) to emit light. This varies by the semiconductor material used for each color.

| LED Color | Forward Voltage (Vf) | Wavelength | Semiconductor Material |
|-----------|---------------------|------------|------------------------|
| Infrared | 1.1–1.4V | >760nm | GaAs, AlGaAs |
| Red | 1.8–2.2V | 620–645nm | AlGaInP, GaAsP |
| Orange | 2.0–2.2V | 590–620nm | GaAsP, AlGaInP |
| Yellow | 2.0–2.4V | 570–590nm | GaAsP, AlGaInP |
| Green | 2.0–3.5V | 520–570nm | GaP, AlGaInP, InGaN |
| Blue | 3.0–3.5V | 450–500nm | InGaN, SiC |
| White | 3.0–3.5V | Broad spectrum | InGaN + phosphor |
| UV | 3.0–4.0V | <400nm | InGaN, AlGaN |

**Source**: Vishay, Cree, and Nichia LED datasheets; "The LED Light" by E. Fred Schubert

### Current Ratings

| LED Type | Typical Current | Maximum Current | Notes |
|----------|----------------|-----------------|-------|
| Standard 5mm | 20mA | 30mA | Most common hobbyist LED |
| High-brightness 5mm | 20–30mA | 50mA | Increased luminous output |
| Power LED (1W) | 350mA | 500mA | Requires heat sinking |
| Power LED (3W) | 700mA | 1000mA | Significant heat management |

**Key Insight**: Running an LED at higher current increases brightness but decreases lifespan and efficiency. This creates a meaningful tradeoff for the reader.

### Luminous Efficacy

| LED Type | Efficacy (lm/W) | Typical Output |
|----------|-----------------|----------------|
| Red 5mm | 20–40 | 2–5 lumens |
| Green 5mm | 50–80 | 5–10 lumens |
| White 5mm | 80–120 | 3–8 lumens |
| White power (1W) | 100–150 | 80–130 lumens |

**Educational Note**: Efficacy varies by color because human eye sensitivity (photopic response) peaks at green (~555nm). A green LED appears brighter than a red LED at the same power.

---

## 2. Battery Specifications

### Common Battery Types for Flashlights

| Battery | Nominal Voltage | Capacity | Internal Resistance | Form Factor |
|---------|-----------------|----------|---------------------|-------------|
| AA Alkaline | 1.5V | 2000–2800mAh | 150–300mΩ | Cylindrical, 50mm × 14mm |
| AAA Alkaline | 1.5V | 1000–1200mAh | 200–400mΩ | Cylindrical, 44mm × 10mm |
| CR2032 (Coin) | 3.0V | 200–240mAh | 15–25Ω | Disc, 20mm × 3.2mm |
| AA NiMH | 1.2V | 1900–2800mAh | 20–50mΩ | Cylindrical, 50mm × 14mm |
| 18650 Li-ion | 3.7V | 2000–3500mAh | 20–80mΩ | Cylindrical, 65mm × 18mm |

### Voltage Discharge Curves

**Alkaline (AA)**:
- Fresh: 1.5V
- 50% capacity: 1.2V
- End of life: 0.9V
- Discharge is gradual, non-linear

**Lithium Coin (CR2032)**:
- Fresh: 3.0V
- 50% capacity: 2.8V
- End of life: 2.0V
- Relatively flat discharge curve

**Key Insight**: Single AA (1.5V) cannot directly drive a white/blue LED (3.0V+). Options: use 2× AA in series, use a boost converter, or choose a red/yellow LED.

### Runtime Calculation

```
Runtime (hours) = Battery Capacity (mAh) / LED Current (mA)
```

**Example**: 
- Battery: AA alkaline, 2500mAh
- LED current: 20mA
- Runtime: 2500 / 20 = 125 hours (theoretical maximum)

**Real-world factor**: Apply 0.7–0.8 efficiency factor for internal resistance and voltage drop.

---

## 3. Resistor Specifications

### Purpose in LED Circuit

The resistor limits current to protect the LED from overcurrent damage. Without it, the LED would draw excessive current and burn out.

### Standard Resistor Values (E12 Series)

| Decade | Values |
|--------|--------|
| 10Ω range | 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82 |
| 100Ω range | 100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820 |
| 1kΩ range | 1.0k, 1.2k, 1.5k, 1.8k, 2.2k, 2.7k, 3.3k, 3.9k, 4.7k, 5.6k, 6.8k, 8.2k |

### Power Rating

```
Power (W) = Current² × Resistance = I² × R
```

| Resistor Size | Power Rating | Typical Use |
|---------------|--------------|-------------|
| 1/8W | 0.125W | Low-current signal circuits |
| 1/4W | 0.25W | Standard hobbyist, LED circuits |
| 1/2W | 0.5W | Higher current applications |
| 1W | 1.0W | Power circuits |

**Example**: 100Ω resistor with 20mA current
- Power = (0.020)² × 100 = 0.04W
- A 1/4W resistor is sufficient (with margin)

---

## 4. Switch Types

### Common Switch Types

| Type | Operation | Current Rating | Best For |
|------|-----------|----------------|----------|
| Slide switch | Stays on/off | 0.3–3A | Simple flashlights |
| Toggle switch | Stays on/off | 1–10A | Robust applications |
| Momentary pushbutton | On while pressed | 0.1–1A | Signaling, testing |
| Latching pushbutton | Click on, click off | 0.5–5A | Modern flashlights |
| Rotary switch | Multiple positions | 0.1–1A | Mode selection |

### Switch Placement Considerations

| Position | Pros | Cons |
|----------|------|------|
| Tail cap | Natural thumb operation, one-hand use | Requires longer wiring |
| Side body | Easy access, shorter wiring | May activate accidentally |
| Head twist | Simple, no extra parts | Two-hand operation |

---

## 5. Reflector and Optics

### Reflector Types

| Type | Beam Pattern | Efficiency | Use Case |
|------|--------------|------------|----------|
| Smooth parabolic | Tight spot, far throw | 70–85% | Long-range flashlights |
| Orange peel | Moderate spot, smooth beam | 65–80% | General purpose |
| Textured | Wide flood, even distribution | 60–75% | Close-range work |
| TIR lens | Adjustable, very efficient | 85–92% | Modern LED flashlights |

### Beam Angle

| Reflector/Lens | Typical Beam Angle |
|----------------|-------------------|
| Deep smooth reflector | 5–10° (spot) |
| Shallow textured reflector | 30–60° (flood) |
| TIR optic (narrow) | 8–15° |
| TIR optic (wide) | 25–40° |
| Bare LED (no optic) | 100–120° |

**Key Insight**: Reflector choice doesn't change total light output—it redistributes it. A spot beam concentrates lumens into a smaller area (higher lux), while a flood spreads them (lower lux, wider coverage).

---

## 6. Circuit Fundamentals

### Series Circuit (Flashlight)

```
[Battery +] ──→ [Switch] ──→ [Resistor] ──→ [LED +] ──→ [LED -] ──→ [Battery -]
```

**Current Path**: Current flows from battery positive, through switch (when closed), through resistor (which limits current), through LED (which emits light), and back to battery negative.

### Kirchhoff's Voltage Law (Simplified)

> The sum of voltage drops around a closed loop equals the source voltage.

```
V_battery = V_resistor + V_LED
```

**Example**:
- Battery: 3V (2× AA in series)
- LED (white): 3.2V forward voltage
- Problem: LED won't light (insufficient voltage)

**Solution**: Use single AA with red LED (1.5V > 2.0V Vf) or add third AA.

### Current Calculation

```
I = (V_source - V_LED) / R
```

**Example**:
- Source: 3.0V (CR2032)
- LED: White, Vf = 3.2V
- Result: Negative! Won't work.

**Working example**:
- Source: 4.5V (3× AA)
- LED: White, Vf = 3.2V
- Desired current: 20mA

```
R = (4.5 - 3.2) / 0.020 = 65Ω
```

Nearest standard value: 68Ω

---

## Sources

1. Vishay Semiconductors. "LED Design Guide." Application Note.
2. Cree, Inc. "XLamp LED Electrical & Optical Performance." Datasheet.
3. Energizer. "Alkaline Manganese Dioxide Handbook." Technical Bulletin.
4. Schubert, E. Fred. "Light-Emitting Diodes." Cambridge University Press, 2006.
5. Horowitz, Paul and Hill, Winfield. "The Art of Electronics." Cambridge University Press, 2015.
6. All About Circuits. "LED Circuits and Resistor Calculations." Educational resource.
7. Adafruit Learning System. "All About LEDs." Tutorial series.

---

## Research Status

| Topic | Completeness | Notes |
|-------|--------------|-------|
| LED specifications | ✅ Complete | Covers color, voltage, current, efficacy |
| Battery specifications | ✅ Complete | Common types with discharge characteristics |
| Resistor calculations | ✅ Complete | E12 series, power ratings |
| Switch types | ✅ Complete | Types and placement |
| Reflector optics | ✅ Complete | Types and beam patterns |
| Circuit fundamentals | ✅ Complete | Series circuit, KVL, current calc |

**Overall Status**: ✅ Research Complete















