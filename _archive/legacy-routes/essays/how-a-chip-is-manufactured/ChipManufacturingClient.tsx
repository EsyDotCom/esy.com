"use client";

import React, { useEffect, useState, useRef } from "react";
import "./chip-manufacturing.css";

// =============================================================================
// WAFER PROGRESS — Circular progress indicator
// =============================================================================

const WaferProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.min((window.scrollY / scrollHeight) * 100, 100);
      setProgress(Math.round(currentProgress));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="wafer-progress" style={{ "--progress": progress } as React.CSSProperties}>
      <div className="wafer-progress-ring" />
      <span className="wafer-progress-label">{progress}%</span>
    </div>
  );
};

// =============================================================================
// STAGE SECTION — With intersection observer
// =============================================================================

const Stage: React.FC<{
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ number, title, subtitle, children }) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`fab-stage ${isVisible ? "visible" : ""}`}>
      <span className="fab-stage-number" aria-hidden="true">{number}</span>
      <div className="fab-stage-content">
        <header className="fab-stage-header">
          <p className="fab-stage-label">Stage {number}</p>
          <h2 className="fab-stage-title">{title}</h2>
          {subtitle && <p className="fab-stage-subtitle">{subtitle}</p>}
        </header>
        <div className="fab-stage-prose">{children}</div>
      </div>
    </section>
  );
};

// =============================================================================
// KEY INSIGHT — Memorable callout
// =============================================================================

const Insight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="fab-insight">
    <p>{children}</p>
  </div>
);

// =============================================================================
// SPEC DISPLAY — Technical data points
// =============================================================================

const Specs: React.FC<{ items: Array<{ value: string; label: string; type?: string }> }> = ({ items }) => (
  <div className="fab-specs">
    {items.map((item, i) => (
      <div key={i} className={`fab-spec ${item.type || ""}`}>
        <span className="fab-spec-value">{item.value}</span>
        <span className="fab-spec-label">{item.label}</span>
      </div>
    ))}
  </div>
);

// =============================================================================
// SCALE COMPARISON — Visual size reference
// =============================================================================

const ScaleComparison: React.FC = () => (
  <div className="fab-scale">
    <p className="fab-scale-title">Scale Comparison</p>
    <div className="fab-scale-items">
      <div className="fab-scale-item">
        <div className="fab-scale-dot hair" />
        <span className="fab-scale-label">Human Hair</span>
        <span className="fab-scale-value">80,000 nm</span>
      </div>
      <div className="fab-scale-item">
        <div className="fab-scale-dot virus" />
        <span className="fab-scale-label">Coronavirus</span>
        <span className="fab-scale-value">100 nm</span>
      </div>
      <div className="fab-scale-item">
        <div className="fab-scale-dot transistor" />
        <span className="fab-scale-label">3nm Transistor</span>
        <span className="fab-scale-value">~12 nm</span>
      </div>
    </div>
  </div>
);

// =============================================================================
// LAYER STACK — Animated chip cross-section
// =============================================================================

const LayerStack: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  const layers = [
    { type: "substrate", label: "Silicon Substrate" },
    { type: "oxide", label: "Gate Oxide" },
    { type: "poly", label: "Polysilicon Gate" },
    { type: "dielectric", label: "Interlayer Dielectric" },
    { type: "metal", label: "Metal 1 (Copper)" },
    { type: "dielectric", label: "IMD" },
    { type: "metal", label: "Metal 2" },
    { type: "dielectric", label: "IMD" },
    { type: "metal", label: "Top Metal" },
    { type: "oxide", label: "Passivation" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setVisibleCount(count);
            if (count >= layers.length) clearInterval(interval);
          }, 120);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [layers.length]);

  return (
    <div className="fab-layers" ref={ref}>
      <p className="fab-layers-title">Chip Cross-Section (10+ Layers)</p>
      <div className="fab-layers-stack">
        {layers.map((layer, i) => (
          <div
            key={i}
            className={`fab-layer ${layer.type} ${i < visibleCount ? "visible" : ""}`}
            style={{ transitionDelay: `${i * 50}ms` }}
            title={layer.label}
          />
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// YIELD VISUALIZATION — Wafer die map
// =============================================================================

const YieldMap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [dies] = useState(() =>
    Array.from({ length: 48 }, () => (Math.random() > 0.22 ? "good" : "bad"))
  );

  const goodCount = dies.filter((d) => d === "good").length;
  const yieldPct = Math.round((goodCount / dies.length) * 100);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fab-yield" ref={ref}>
      <p className="fab-yield-title">Wafer Yield Map (Simulated)</p>
      <div className="fab-yield-wafer">
        {dies.map((status, i) => (
          <div
            key={i}
            className={`fab-yield-die ${revealed ? status : ""}`}
            style={{ transitionDelay: revealed ? `${i * 15}ms` : "0ms" }}
          />
        ))}
      </div>
      {revealed && <p className="fab-yield-stat">{yieldPct}% Yield</p>}
    </div>
  );
};

// =============================================================================
// COMPARISON PANEL
// =============================================================================

const Compare: React.FC<{
  left: { title: string; text: string };
  right: { title: string; text: string };
}> = ({ left, right }) => (
  <div className="fab-compare">
    <div className="fab-compare-panel">
      <h4>{left.title}</h4>
      <p>{left.text}</p>
    </div>
    <div className="fab-compare-arrow">→</div>
    <div className="fab-compare-panel">
      <h4>{right.title}</h4>
      <p>{right.text}</p>
    </div>
  </div>
);

// =============================================================================
// SOURCES
// =============================================================================

const sources = [
  { title: "Semiconductor Industry Association — U.S. Manufacturing Report", url: "https://www.semiconductors.org/" },
  { title: "ASML — How Microchips Are Made", url: "https://www.asml.com/en/technology/all-about-microchips/how-microchips-are-made" },
  { title: "Wikipedia — Semiconductor Device Fabrication", url: "https://en.wikipedia.org/wiki/Semiconductor_device_fabrication" },
  { title: "Wikipedia — CHIPS and Science Act", url: "https://en.wikipedia.org/wiki/CHIPS_and_Science_Act" },
  { title: "IEEE Spectrum — Semiconductor Manufacturing", url: "https://spectrum.ieee.org/topic/semiconductors/" },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function ChipManufacturingClient() {
  return (
    <article className="fab">
      <WaferProgress />

      {/* ===================================================================== */}
      {/* HERO */}
      {/* ===================================================================== */}
      <header className="fab-hero">
        <div className="fab-hero-content">
          <p className="fab-hero-eyebrow">Process Essay</p>
          <h1 className="fab-hero-title">
            How a Chip Is <em>Manufactured</em>
          </h1>
          <p className="fab-hero-subtitle">
            Nine stages of atomic-scale precision transform common sand into
            devices containing more components than the human brain has neurons.
          </p>
          <div className="fab-hero-stat">
            <div className="fab-hero-stat-item">
              <span className="fab-hero-stat-value">9</span>
              <span className="fab-hero-stat-label">Stages</span>
            </div>
            <div className="fab-hero-stat-item">
              <span className="fab-hero-stat-value">1000+</span>
              <span className="fab-hero-stat-label">Process Steps</span>
            </div>
            <div className="fab-hero-stat-item">
              <span className="fab-hero-stat-value">$20B+</span>
              <span className="fab-hero-stat-label">Fab Cost</span>
            </div>
          </div>
        </div>
        <div className="fab-scroll-cue">
          <span>Scroll</span>
          <div className="fab-scroll-line" />
        </div>
      </header>

      {/* ===================================================================== */}
      {/* CONTEXT */}
      {/* ===================================================================== */}
      <Stage number="0" title="What Is a Chip?" subtitle="The invisible foundation">
        <p>
          A semiconductor chip is an integrated circuit etched onto a small piece
          of silicon. Inside that thumbnail-sized sliver of material are billions
          of transistors—tiny switches that turn on and off billions of times per
          second, performing the calculations that power everything from
          smartphones to satellites.
        </p>
        <p>
          Manufacturing these chips is the most complex industrial process ever
          devised. It requires precision at scales invisible to the human eye,
          temperatures that would melt steel, chemicals purer than anything else
          on Earth, and machines that cost more than commercial aircraft.
        </p>
        <Insight>
          A chip is not built. It is grown, layered, etched, and measured at atomic scales.
        </Insight>
      </Stage>

      {/* ===================================================================== */}
      {/* STAGE 1 */}
      {/* ===================================================================== */}
      <Stage number="1" title="From Sand to Silicon" subtitle="The foundation">
        <p>
          It starts with sand—specifically, quartz sand, which is mostly silicon
          dioxide. This common material undergoes purification so extreme that the
          resulting silicon is 99.9999999% pure. That&apos;s nine nines: fewer
          than one foreign atom per billion.
        </p>
        <Specs
          items={[
            { value: "99.9999999%", label: "Purity Required", type: "litho" },
            { value: "1,420°C", label: "Melting Point", type: "plasma" },
            { value: "300mm", label: "Ingot Diameter", type: "" },
          ]}
        />
        <p>
          The purified silicon is melted and a seed crystal is slowly pulled
          upward while rotating, drawing the liquid into a perfect single-crystal
          cylinder called an ingot. This is the Czochralski process.
        </p>
        <Insight>Defects are failure.</Insight>
        <p>
          A single crystal dislocation—one atom out of place—can propagate through
          hundreds of chips, destroying them all.
        </p>
      </Stage>

      {/* ===================================================================== */}
      {/* STAGE 2 */}
      {/* ===================================================================== */}
      <Stage number="2" title="Wafer Creation" subtitle="The canvas">
        <p>
          The silicon ingot is sliced into thin wafers using diamond-coated wire
          saws. Each wafer is about 300mm in diameter—roughly the size of a dinner
          plate—but less than a millimeter thick.
        </p>
        <Specs
          items={[
            { value: "300mm", label: "Wafer Diameter", type: "plasma" },
            { value: "775μm", label: "Thickness", type: "" },
            { value: "<10nm", label: "Surface Flatness", type: "litho" },
            { value: "100+", label: "Chips Per Wafer", type: "" },
          ]}
        />
        <p>
          These wafers are then polished using Chemical-Mechanical Planarization
          (CMP) until they achieve near-atomic flatness. Surface variation must be
          less than 10 nanometers across the entire 300mm diameter.
        </p>
        <Insight>The canvas must be flawless.</Insight>
      </Stage>

      {/* ===================================================================== */}
      {/* STAGE 3 */}
      {/* ===================================================================== */}
      <Stage number="3" title="Layering the Circuit" subtitle="The stack">
        <p>
          Chips are not flat drawings—they are three-dimensional stacks. Modern
          processors can have over 100 distinct layers: insulators, conductors,
          and semiconductors deposited one atom-thin film at a time.
        </p>
        <LayerStack />
        <p>
          Deposition methods include Chemical Vapor Deposition (CVD), where gases
          react on the wafer surface to form thin films, and Atomic Layer
          Deposition (ALD), which builds material literally one atomic layer at a
          time.
        </p>
        <Insight>Chips are stacks, not drawings.</Insight>
      </Stage>

      {/* ===================================================================== */}
      {/* STAGE 4 */}
      {/* ===================================================================== */}
      <Stage number="4" title="Photolithography" subtitle="Light draws the circuit">
        <p>
          Photolithography is the heart of chip manufacturing. A light-sensitive
          coating called photoresist is applied to the wafer. Light is then
          projected through a mask containing the circuit pattern, exposing the
          photoresist in precise locations.
        </p>
        <Specs
          items={[
            { value: "193nm", label: "DUV Wavelength", type: "uv" },
            { value: "13.5nm", label: "EUV Wavelength", type: "litho" },
            { value: "60-100", label: "Litho Steps", type: "" },
            { value: "$200M+", label: "EUV Machine Cost", type: "copper" },
          ]}
        />
        <p>
          For decades, the industry used deep ultraviolet (DUV) light at 193nm.
          But modern transistors are smaller than that wavelength. The solution?
          Extreme Ultraviolet (EUV) light at 13.5nm—wavelengths so short they
          require mirrors instead of lenses, and vacuum instead of air.
        </p>
        <Insight>Light draws the circuit.</Insight>
      </Stage>

      {/* ===================================================================== */}
      {/* STAGE 5 */}
      {/* ===================================================================== */}
      <Stage number="5" title="Etching and Doping" subtitle="Controlled imperfection">
        <p>
          After photolithography exposes the pattern, etching removes material
          selectively. Plasma etching uses ionized gases to carve away material
          with atomic precision.
        </p>
        <Compare
          left={{
            title: "Pure Silicon",
            text: "A perfect silicon crystal is actually a poor conductor. It has too few free electrons to carry current. Pure silicon is essentially useless for electronics.",
          }}
          right={{
            title: "Doped Silicon",
            text: "By adding tiny amounts of impurities—phosphorus for extra electrons (n-type) or boron for electron 'holes' (p-type)—we create regions with different electrical properties.",
          }}
        />
        <p>
          This controlled imperfection is what makes transistors work. Logic
          emerges from imbalance.
        </p>
        <Insight>Function comes from imbalance.</Insight>
      </Stage>

      {/* ===================================================================== */}
      {/* STAGE 6 */}
      {/* ===================================================================== */}
      <Stage number="6" title="Transistor Formation" subtitle="Billions of identical switches">
        <p>
          The transistor is the fundamental building block of digital logic. It
          has three parts: a gate (the control), a source (where current enters),
          and a drain (where current exits). When voltage is applied to the gate,
          current flows. Remove the voltage, and current stops. On and off. One
          and zero.
        </p>
        <ScaleComparison />
        <Specs
          items={[
            { value: "80B+", label: "Transistors Per Chip", type: "litho" },
            { value: "~12nm", label: "Gate Length (3nm Node)", type: "plasma" },
            { value: "ps", label: "Switching Time", type: "" },
          ]}
        />
        <p>
          Modern chips use three-dimensional transistor structures called FinFETs,
          where the channel forms a vertical fin that the gate wraps around. The
          newest chips use Gate-All-Around (GAA) transistors for even better
          control.
        </p>
        <Insight>Small decisions, massive scale.</Insight>
      </Stage>

      {/* ===================================================================== */}
      {/* STAGE 7 */}
      {/* ===================================================================== */}
      <Stage number="7" title="Interconnects" subtitle="The wiring problem">
        <p>
          Building transistors is only half the challenge. Connecting billions of
          them is equally complex. Modern chips have 10-15 layers of copper wiring
          stacked above the transistors, forming an intricate network of
          connections.
        </p>
        <Specs
          items={[
            { value: "10-15", label: "Metal Layers", type: "copper" },
            { value: "Cu", label: "Primary Metal", type: "copper" },
            { value: "nm", label: "Wire Width", type: "" },
          ]}
        />
        <p>
          The copper is deposited using the damascene process: trenches are etched
          into insulating material, filled with copper, and polished flat. Vertical
          connections called vias link different metal layers.
        </p>
        <p>
          At these scales, wires become significant resistors and capacitors.
          Signal delay in the interconnects now rivals delay in the transistors
          themselves.
        </p>
        <Insight>Connecting things is harder than building them.</Insight>
      </Stage>

      {/* ===================================================================== */}
      {/* STAGE 8 */}
      {/* ===================================================================== */}
      <Stage number="8" title="Testing and Yield" subtitle="Manufacturing is statistics">
        <p>
          Here&apos;s a truth the industry doesn&apos;t advertise: most chips
          fail. At leading-edge nodes, yields can be as low as 50% when a new
          process starts. Even mature processes rarely exceed 90%.
        </p>
        <YieldMap />
        <p>
          Probe stations test each die on the wafer, checking electrical
          characteristics and functionality. Failed dies are marked. The economics
          of chip manufacturing are fundamentally statistics: yield determines
          profitability.
        </p>
        <Specs
          items={[
            { value: "50-90%", label: "Typical Yield", type: "" },
            { value: "$30K+", label: "Wafer Cost (Leading Edge)", type: "copper" },
          ]}
        />
        <Insight>Manufacturing is statistics.</Insight>
      </Stage>

      {/* ===================================================================== */}
      {/* STAGE 9 */}
      {/* ===================================================================== */}
      <Stage number="9" title="Packaging" subtitle="Surviving reality">
        <p>
          The wafer is diced into individual chips using diamond saws or lasers.
          Each working die is then mounted in a protective package that provides
          electrical connections to the outside world and dissipates heat.
        </p>
        <p>
          Modern packaging has become as innovative as transistor scaling.
          Chiplets—multiple smaller dies combined in one package—allow different
          components to be manufactured at different process nodes. 2.5D and 3D
          integration stack dies vertically, connected by through-silicon vias.
        </p>
        <Specs
          items={[
            { value: "100W+", label: "Heat Dissipation", type: "plasma" },
            { value: "1000s", label: "Package Pins", type: "" },
          ]}
        />
        <Insight>The chip is finished only when it can survive reality.</Insight>
      </Stage>

      {/* ===================================================================== */}
      {/* CLOSING */}
      {/* ===================================================================== */}
      <section className="fab-closing">
        <div className="fab-closing-content">
          <p className="fab-closing-quote">
            &ldquo;The modern world runs on silicon not because it is rare, but
            because it is <em>extraordinarily difficult</em> to shape with
            precision.&rdquo;
          </p>
          <Specs
            items={[
              { value: "$52B", label: "U.S. CHIPS Act", type: "plasma" },
              { value: "90%+", label: "TSMC Advanced Logic Share", type: "litho" },
              { value: "3-5yr", label: "New Fab Build Time", type: "" },
            ]}
          />
          <p className="fab-closing-label">End of Process</p>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SOURCES */}
      {/* ===================================================================== */}
      <footer className="fab-sources">
        <div className="fab-sources-content">
          <h3 className="fab-sources-title">Sources</h3>
          <ul className="fab-sources-list">
            {sources.map((source, i) => (
              <li key={i}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
          <p className="fab-sources-note">
            Technical specifications represent industry standards and may vary by
            manufacturer. Yield figures are representative ranges.
          </p>
        </div>
      </footer>
    </article>
  );
}
