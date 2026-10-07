"use client";

import { useReducer, useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";

import "./flashlight-builder.css";
import {
  FlashlightState,
  initialState,
  reducer,
  saveState,
  loadState,
  clearState,
  exportState,
  STEPS,
} from "./lib/state";
import { LED_SPECS, BATTERY_SPECS, REFLECTOR_SPECS, SWITCH_SPECS } from "./lib/components";
import { canDriveLED, calculateIdealResistor } from "./lib/simulation";

import { DigitalTwin } from "./components/DigitalTwin";
import { PartSelector } from "./components/PartSelector";
import { ResistorSlider } from "./components/ResistorSlider";
import { TradeoffExplorer } from "./components/TradeoffExplorer";
import { ArtifactCard } from "./components/ArtifactCard";

type LEDColor = keyof typeof LED_SPECS;
type BatteryType = keyof typeof BATTERY_SPECS;
type ReflectorType = keyof typeof REFLECTOR_SPECS;
type SwitchType = keyof typeof SWITCH_SPECS;

export function FlashlightBuilderClient() {
  // State management
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOn, setIsOn] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // Refs for scroll tracking
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const viewportRef = useRef<HTMLDivElement>(null);

  // Load saved state on mount
  useEffect(() => {
    const saved = loadState();
    if (saved) {
      dispatch({ type: "RESTORE", state: saved });
    }
  }, []);

  // Save state on changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Intersection observer for section visibility
  // Also auto-completes read-only sections (intro, tradeoff, complete) when viewed
  useEffect(() => {
    const readOnlySections = ["intro", "tradeoff", "complete"];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-section");
          if (id) {
            setVisibleSections((prev) => {
              const next = new Set(prev);
              if (entry.isIntersecting) {
                next.add(id);
                // Auto-complete read-only sections when they become visible
                if (readOnlySections.includes(id)) {
                  dispatch({ type: "COMPLETE_STEP", stepId: id });
                }
              }
              return next;
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -100px 0px" }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    dispatch({ type: "SET_PREFERENCES", preferences: { reducedMotion: mq.matches } });

    const handler = (e: MediaQueryListEvent) => {
      dispatch({ type: "SET_PREFERENCES", preferences: { reducedMotion: e.matches } });
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Calculate progress
  const progress = (state.progress.completedSteps.length / STEPS.length) * 100;

  // Handlers - each selection completes the corresponding step
  const handleSelectLED = useCallback((color: LEDColor) => {
    const spec = LED_SPECS[color];
    dispatch({ type: "SELECT_LED", color, forwardVoltage: spec.forwardVoltage });
    dispatch({ type: "ASSEMBLE_PART", partId: "led" });
    dispatch({ type: "COMPLETE_STEP", stepId: "led" });
  }, []);

  const handleSelectBattery = useCallback((type: BatteryType) => {
    const spec = BATTERY_SPECS[type];
    dispatch({ type: "SELECT_BATTERY", batteryType: type, voltage: spec.voltage, capacity: spec.capacity });
    dispatch({ type: "ASSEMBLE_PART", partId: "battery" });
    dispatch({ type: "COMPLETE_STEP", stepId: "battery" });
  }, []);

  const handleSetResistor = useCallback((value: number) => {
    dispatch({ type: "SET_RESISTOR", value });
    dispatch({ type: "ASSEMBLE_PART", partId: "resistor" });
    dispatch({ type: "COMPLETE_STEP", stepId: "resistor" });
  }, []);

  const handleSelectReflector = useCallback((type: ReflectorType) => {
    const spec = REFLECTOR_SPECS[type];
    dispatch({ type: "SELECT_REFLECTOR", reflectorType: type, beamAngle: spec.beamAngle });
    dispatch({ type: "ASSEMBLE_PART", partId: "reflector" });
    dispatch({ type: "COMPLETE_STEP", stepId: "reflector" });
  }, []);

  const handleSelectSwitch = useCallback((type: SwitchType) => {
    const spec = SWITCH_SPECS[type];
    dispatch({ type: "SELECT_SWITCH", switchType: type, position: spec.position });
    dispatch({ type: "ASSEMBLE_PART", partId: "switch" });
    dispatch({ type: "COMPLETE_STEP", stepId: "switch" });
  }, []);

  const handleReset = useCallback(() => {
    clearState();
    dispatch({ type: "RESET" });
    setIsOn(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleExport = useCallback(() => {
    const json = exportState(state);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-flashlight-config.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [state]);

  // Derived values
  const batteryCompatibility = canDriveLED(state.config.battery.type, state.config.led.color);
  const idealResistor = calculateIdealResistor(state.config.battery.type, state.config.led.color, 20);

  // Section registration helper
  const registerSection = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  // LED options
  const ledOptions = Object.entries(LED_SPECS).map(([id, spec]) => ({
    id: id as LEDColor,
    name: spec.name,
    spec: `${spec.forwardVoltage}V`,
    description: spec.description,
    hexColor: spec.hexColor,
  }));

  // Battery options
  const batteryOptions = Object.entries(BATTERY_SPECS).map(([id, spec]) => ({
    id: id as BatteryType,
    name: spec.name,
    spec: `${spec.voltage}V / ${spec.capacity}mAh`,
    description: spec.description,
  }));

  // Reflector options
  const reflectorOptions = Object.entries(REFLECTOR_SPECS).map(([id, spec]) => ({
    id: id as ReflectorType,
    name: spec.name,
    spec: `${spec.beamAngle}° beam`,
    description: spec.description,
  }));

  // Switch options
  const switchOptions = Object.entries(SWITCH_SPECS).map(([id, spec]) => ({
    id: id as SwitchType,
    name: spec.name,
    spec: spec.position,
    description: spec.description,
  }));

  return (
    <main className="flashlight-builder">
      {/* Progress Bar */}
      <div className="fb-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="fb-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* Header */}
      <header className="fb-header">
        <span className="fb-header-title">Build-A-Light</span>
        <span className="fb-header-meta">{state.progress.completedSteps.length}/{STEPS.length}</span>
      </header>

      {/* Hero */}
      <section className="fb-hero" aria-labelledby="hero-title">
        <span className="fb-hero-badge">Interactive Build</span>
        <h1 id="hero-title" className="fb-hero-title">
          Build Your Own
          <br />
          LED Flashlight
        </h1>
        <p className="fb-hero-subtitle">
          Choose components, understand the tradeoffs, and create a working digital flashlight. Your decisions shape
          the final artifact.
        </p>
        <div className="fb-scroll-indicator" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
          Scroll to begin
        </div>
      </section>

      {/* Sticky Viewport */}
      <div className="fb-viewport-container" ref={viewportRef}>
        <div className="fb-viewport">
          <DigitalTwin state={state} isOn={isOn} />
          {/* Metrics Display */}
          <div className="fb-metrics">
            <div className="fb-metric">
              <div className="fb-metric-value brightness">{state.metrics.brightness}%</div>
              <div className="fb-metric-label">Brightness</div>
            </div>
            <div className="fb-metric">
              <div className="fb-metric-value battery">{state.metrics.batteryLife}h</div>
              <div className="fb-metric-label">Runtime</div>
            </div>
            <div className="fb-metric">
              <div className="fb-metric-value efficiency">{state.metrics.efficiency}%</div>
              <div className="fb-metric-label">Efficiency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="fb-content">
        {/* Step 1: Introduction */}
        <section
          ref={registerSection("intro")}
          data-section="intro"
          className={`fb-section ${visibleSections.has("intro") ? "visible" : ""}`}
          aria-labelledby="step-1-title"
        >
          <div className="fb-step-header">
            <span className="fb-step-number">1</span>
            <h2 id="step-1-title" className="fb-step-title">Meet the Components</h2>
          </div>
          <div className="fb-prose">
            <p>
              Every flashlight is a story of <em>electrons seeking ground</em>. Before we build, let&apos;s understand
              what we&apos;re working with.
            </p>
            <p>
              Our flashlight needs five components: a <strong>battery</strong> (the source), an <strong>LED</strong>{" "}
              (the light), a <strong>resistor</strong> (the sacrifice), a <strong>reflector</strong> (the shaper), and
              a <strong>switch</strong> (the gate).
            </p>
            <p>
              Each choice you make will ripple through the system. Choose a blue LED? You&apos;ll need more voltage.
              Pick a tiny coin cell? Runtime shrinks. There are no wrong answers—only tradeoffs.
            </p>
          </div>
          <div className="fb-notice">
            <div className="fb-notice-label">Notice This</div>
            <p>
              The digital twin above updates in real-time as you make choices. Watch how components appear and metrics
              change.
            </p>
          </div>
        </section>

        {/* Step 2: LED Selection */}
        <section
          ref={registerSection("led")}
          data-section="led"
          className={`fb-section ${visibleSections.has("led") ? "visible" : ""}`}
          aria-labelledby="step-2-title"
        >
          <div className="fb-step-header">
            <span className="fb-step-number">2</span>
            <h2 id="step-2-title" className="fb-step-title">Choose Your Light</h2>
          </div>
          <div className="fb-prose">
            <p>
              The LED is the heart of your flashlight. Each color isn&apos;t just aesthetics—it&apos;s physics. The{" "}
              <em>forward voltage</em> tells you the minimum voltage needed to make it glow.
            </p>
            <p>
              Red LEDs are easy to drive (2.0V), while white and blue demand more (3.2V). Your battery choice later
              will need to meet or exceed this voltage.
            </p>
          </div>
          <PartSelector
            label="Select LED Color"
            options={ledOptions}
            selected={state.config.led.color}
            onSelect={handleSelectLED}
          />
          <div className="fb-notice">
            <div className="fb-notice-label">Notice This</div>
            <p>
              Green LEDs appear brightest to human eyes—our sensitivity peaks around 555nm. The &quot;color factor&quot;
              adjusts perceived brightness accordingly.
            </p>
          </div>
        </section>

        {/* Step 3: Battery Selection */}
        <section
          ref={registerSection("battery")}
          data-section="battery"
          className={`fb-section ${visibleSections.has("battery") ? "visible" : ""}`}
          aria-labelledby="step-3-title"
        >
          <div className="fb-step-header">
            <span className="fb-step-number">3</span>
            <h2 id="step-3-title" className="fb-step-title">Power Source</h2>
          </div>
          <div className="fb-prose">
            <p>
              Your {LED_SPECS[state.config.led.color].name} needs at least{" "}
              <strong>{LED_SPECS[state.config.led.color].forwardVoltage}V</strong> to light up. Choose a battery that
              can deliver.
            </p>
            <p>
              More voltage gives you headroom for the resistor to work. More capacity (mAh) means longer runtime. But
              more batteries means more weight.
            </p>
          </div>
          <PartSelector
            label="Select Battery"
            options={batteryOptions}
            selected={state.config.battery.type}
            onSelect={handleSelectBattery}
            warning={!batteryCompatibility.canDrive ? batteryCompatibility.warning : undefined}
          />
        </section>

        {/* Step 4: Resistor */}
        <section
          ref={registerSection("resistor")}
          data-section="resistor"
          className={`fb-section ${visibleSections.has("resistor") ? "visible" : ""}`}
          aria-labelledby="step-4-title"
        >
          <div className="fb-step-header">
            <span className="fb-step-number">4</span>
            <h2 id="step-4-title" className="fb-step-title">The Sacrifice</h2>
          </div>
          <div className="fb-prose">
            <p>
              Here&apos;s the cruel truth: LEDs are <em>greedy</em>. Given unlimited current, they&apos;d consume
              everything and burn out instantly.
            </p>
            <p>
              The resistor is the sacrifice. It absorbs excess voltage as heat, limiting current to a safe level. This
              is <strong>Ohm&apos;s Law</strong> in action: I = (V_source - V_led) / R.
            </p>
            <p>
              Lower resistance → more current → brighter light → shorter battery life (and risk of burning the LED).
            </p>
          </div>
          <ResistorSlider
            value={state.config.resistor.value}
            onChange={handleSetResistor}
            idealValue={idealResistor}
            current={state.metrics.current}
            maxCurrent={LED_SPECS[state.config.led.color].maxCurrent}
          />
          <div className="fb-notice">
            <div className="fb-notice-label">Notice This</div>
            <p>
              The ideal resistor for 20mA (typical LED brightness) with your current setup is ~{Math.round(idealResistor)}Ω.
              Experiment with values above and below to see the effect.
            </p>
          </div>
        </section>

        {/* Step 5: Tradeoff Explorer */}
        <section
          ref={registerSection("tradeoff")}
          data-section="tradeoff"
          className={`fb-section ${visibleSections.has("tradeoff") ? "visible" : ""}`}
          aria-labelledby="step-5-title"
        >
          <div className="fb-step-header">
            <span className="fb-step-number">5</span>
            <h2 id="step-5-title" className="fb-step-title">The Tradeoff Triangle</h2>
          </div>
          <div className="fb-prose">
            <p>
              Engineering is about tradeoffs. You can&apos;t maximize everything. This triangle shows where your
              current configuration lands.
            </p>
          </div>
          <TradeoffExplorer metrics={state.metrics} />
        </section>

        {/* Step 6: Reflector */}
        <section
          ref={registerSection("reflector")}
          data-section="reflector"
          className={`fb-section ${visibleSections.has("reflector") ? "visible" : ""}`}
          aria-labelledby="step-6-title"
        >
          <div className="fb-step-header">
            <span className="fb-step-number">6</span>
            <h2 id="step-6-title" className="fb-step-title">Shaping the Beam</h2>
          </div>
          <div className="fb-prose">
            <p>
              LEDs emit light in a wide cone. The reflector focuses that cone into a useful beam. Tighter beams throw
              farther but illuminate less area.
            </p>
            <p>
              A smooth parabolic reflector creates a tight &quot;hotspot&quot; for distance. Orange peel texture
              smooths the beam for close-up work.
            </p>
          </div>
          <PartSelector
            label="Select Reflector"
            options={reflectorOptions}
            selected={state.config.reflector.type}
            onSelect={handleSelectReflector}
          />
        </section>

        {/* Step 7: Switch */}
        <section
          ref={registerSection("switch")}
          data-section="switch"
          className={`fb-section ${visibleSections.has("switch") ? "visible" : ""}`}
          aria-labelledby="step-7-title"
        >
          <div className="fb-step-header">
            <span className="fb-step-number">7</span>
            <h2 id="step-7-title" className="fb-step-title">Control</h2>
          </div>
          <div className="fb-prose">
            <p>
              The switch is your interface—how you command the light. Position affects ergonomics. Type affects
              behavior.
            </p>
            <p>
              Tail switches enable tactical &quot;cigar grip&quot; operation. Side switches work well for everyday use.
              Twist-heads are waterproof but slower to operate.
            </p>
          </div>
          <PartSelector
            label="Select Switch"
            options={switchOptions}
            selected={state.config.switch.type}
            onSelect={handleSelectSwitch}
          />
        </section>

        {/* Step 8: Test & Diagnose */}
        <section
          ref={registerSection("test")}
          data-section="test"
          className={`fb-section ${visibleSections.has("test") ? "visible" : ""}`}
          aria-labelledby="step-8-title"
        >
          <div className="fb-step-header">
            <span className="fb-step-number">8</span>
            <h2 id="step-8-title" className="fb-step-title">Test &amp; Diagnose</h2>
          </div>
          <div className="fb-prose">
            <p>
              Your circuit is complete. Time to flip the switch and see if your choices work together.
            </p>
          </div>
          <div className="fb-interaction" style={{ textAlign: "center" }}>
            <button
              className="fb-button"
              onClick={() => {
                setIsOn(!isOn);
                dispatch({ type: "TEST_CIRCUIT" });
                dispatch({ type: "COMPLETE_STEP", stepId: "test" });
              }}
              aria-pressed={isOn}
              aria-label={isOn ? "Turn flashlight off" : "Turn flashlight on"}
              style={{
                background: isOn ? "var(--fb-accent-secondary)" : "var(--fb-accent-primary)",
                minWidth: "200px",
              }}
            >
              {isOn ? "Turn Off" : "Turn On"}
            </button>
            {isOn && !state.metrics.working && (
              <div className="fb-error" style={{ marginTop: "var(--fb-spacing-md)" }}>
                <span>{state.metrics.error || "Circuit not working. Check your component compatibility."}</span>
              </div>
            )}
            {isOn && state.metrics.working && (
              <div
                style={{
                  marginTop: "var(--fb-spacing-md)",
                  padding: "var(--fb-spacing-md)",
                  background: "rgba(105, 219, 124, 0.1)",
                  border: "1px solid var(--fb-accent-success)",
                  borderRadius: "8px",
                  color: "var(--fb-accent-success)",
                }}
              >
                ✓ It works! Your flashlight produces {state.metrics.brightness}% brightness.
              </div>
            )}
          </div>
        </section>

        {/* Step 9: Complete */}
        <section
          ref={registerSection("complete")}
          data-section="complete"
          className={`fb-section ${visibleSections.has("complete") ? "visible" : ""}`}
          aria-labelledby="step-9-title"
        >
          <div className="fb-step-header">
            <span className="fb-step-number">9</span>
            <h2 id="step-9-title" className="fb-step-title">Your Flashlight</h2>
          </div>
          <div className="fb-prose">
            <p>
              You&apos;ve built something real—a configuration that reflects your priorities. Export it, share it, or
              start over and explore different tradeoffs.
            </p>
          </div>
          <ArtifactCard state={state} onReset={handleReset} onExport={handleExport} />
        </section>
      </div>


      {/* Noscript Fallback */}
      <noscript>
        <div className="fb-fallback">
          <h2>JavaScript Required</h2>
          <p>
            This interactive experience requires JavaScript. Please enable JavaScript or view our static essays
            instead.
          </p>
          <Link href="/essays">Browse Essays</Link>
        </div>
      </noscript>
    </main>
  );
}

export default FlashlightBuilderClient;

