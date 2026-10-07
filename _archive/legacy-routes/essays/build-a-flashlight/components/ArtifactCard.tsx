"use client";

import { FlashlightState } from "../lib/state";
import { LED_SPECS, BATTERY_SPECS, REFLECTOR_SPECS, SWITCH_SPECS } from "../lib/components";
import { getConfigurationLabel } from "../lib/simulation";

interface ArtifactCardProps {
  state: FlashlightState;
  onReset: () => void;
  onExport: () => void;
}

/**
 * Final artifact card showing the completed flashlight configuration
 * and performance characteristics.
 */
export function ArtifactCard({ state, onReset, onExport }: ArtifactCardProps) {
  const { config, metrics } = state;
  const led = LED_SPECS[config.led.color];
  const battery = BATTERY_SPECS[config.battery.type];
  const reflector = REFLECTOR_SPECS[config.reflector.type];
  const switchSpec = SWITCH_SPECS[config.switch.type];

  const configLabel = getConfigurationLabel(metrics);

  // Calculate build time
  const buildTime = state.progress.completedAt && state.progress.startedAt
    ? Math.round((state.progress.completedAt - state.progress.startedAt) / 1000 / 60)
    : null;

  return (
    <div className="fb-artifact-card">
      <div className="fb-artifact-header">
        <div className="fb-artifact-label">Your Creation</div>
        <h2 className="fb-artifact-title">{configLabel}</h2>
        <div className="fb-score-badge">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
              clipRule="evenodd"
            />
          </svg>
          Score: {metrics.score}/100
        </div>
      </div>

      {/* Key Stats */}
      <div className="fb-artifact-stats">
        <div className="fb-artifact-stat">
          <div className="fb-artifact-stat-value" style={{ color: "var(--fb-accent-secondary)" }}>
            {metrics.brightness}%
          </div>
          <div className="fb-artifact-stat-label">Brightness</div>
        </div>
        <div className="fb-artifact-stat">
          <div className="fb-artifact-stat-value" style={{ color: "var(--fb-accent-success)" }}>
            {metrics.batteryLife}h
          </div>
          <div className="fb-artifact-stat-label">Runtime</div>
        </div>
        <div className="fb-artifact-stat">
          <div className="fb-artifact-stat-value" style={{ color: "var(--fb-accent-primary)" }}>
            {metrics.efficiency}%
          </div>
          <div className="fb-artifact-stat-label">Efficiency</div>
        </div>
        <div className="fb-artifact-stat">
          <div className="fb-artifact-stat-value" style={{ color: "var(--fb-accent-warning)" }}>
            {metrics.beamIntensity}
          </div>
          <div className="fb-artifact-stat-label">Beam Power</div>
        </div>
      </div>

      {/* Configuration Details */}
      <div className="fb-artifact-config">
        <div className="fb-artifact-config-title">Configuration</div>
        <div className="fb-artifact-config-item">
          <span>LED</span>
          <span>{led.name} ({led.forwardVoltage}V)</span>
        </div>
        <div className="fb-artifact-config-item">
          <span>Battery</span>
          <span>{battery.name} ({battery.voltage}V)</span>
        </div>
        <div className="fb-artifact-config-item">
          <span>Resistor</span>
          <span>{config.resistor.value}Ω</span>
        </div>
        <div className="fb-artifact-config-item">
          <span>Reflector</span>
          <span>{reflector.name} ({reflector.beamAngle}°)</span>
        </div>
        <div className="fb-artifact-config-item">
          <span>Switch</span>
          <span>{switchSpec.name}</span>
        </div>
        <div className="fb-artifact-config-item">
          <span>Current Draw</span>
          <span>{metrics.current}mA</span>
        </div>
        {buildTime && (
          <div className="fb-artifact-config-item">
            <span>Build Time</span>
            <span>{buildTime} min</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          gap: "var(--fb-spacing-md)",
          marginTop: "var(--fb-spacing-lg)",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button className="fb-button" onClick={onExport} aria-label="Export configuration as JSON">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Export Config
        </button>
        <button className="fb-button fb-button-secondary" onClick={onReset} aria-label="Reset and build another">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path
              fillRule="evenodd"
              d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0v2.43l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
              clipRule="evenodd"
            />
          </svg>
          Build Another
        </button>
      </div>

      {/* Learning Summary */}
      <div className="fb-notice" style={{ marginTop: "var(--fb-spacing-xl)", marginBottom: 0 }}>
        <div className="fb-notice-label">What You Learned</div>
        <p style={{ marginBottom: "var(--fb-spacing-sm)" }}>
          You applied <strong>Ohm&apos;s Law</strong> (V=IR) to calculate the resistor needed for your LED.
        </p>
        <p style={{ marginBottom: "var(--fb-spacing-sm)" }}>
          You discovered the <strong>fundamental tradeoff</strong> between brightness and battery life.
        </p>
        <p style={{ marginBottom: 0 }}>
          You experienced how <strong>component choices cascade</strong> — the LED voltage determines which batteries
          work, which determines the resistor needed.
        </p>
      </div>
    </div>
  );
}

export default ArtifactCard;














