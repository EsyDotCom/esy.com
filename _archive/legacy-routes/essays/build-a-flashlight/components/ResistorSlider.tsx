"use client";

import { RESISTOR_VALUES } from "../lib/components";

interface ResistorSliderProps {
  value: number;
  onChange: (value: number) => void;
  idealValue?: number;
  current?: number;
  maxCurrent?: number;
}

/**
 * Interactive resistor value selector with real-time feedback.
 */
export function ResistorSlider({
  value,
  onChange,
  idealValue,
  current = 0,
  maxCurrent = 30,
}: ResistorSliderProps) {
  const valueIndex = RESISTOR_VALUES.indexOf(value as (typeof RESISTOR_VALUES)[number]);
  const validIndex = valueIndex >= 0 ? valueIndex : 2; // Default to 100Ω

  const isOvercurrent = current > maxCurrent;
  const isDim = current < 5;

  return (
    <div className="fb-interaction">
      <div className="fb-interaction-label">
        <span>Resistor Value</span>
        <span className="fb-interaction-value">{value}Ω</span>
      </div>

      {/* Slider */}
      <div className="fb-slider-container">
        <input
          type="range"
          className="fb-slider"
          min={0}
          max={RESISTOR_VALUES.length - 1}
          value={validIndex}
          onChange={(e) => {
            const newIndex = parseInt(e.target.value, 10);
            onChange(RESISTOR_VALUES[newIndex]);
          }}
          aria-label={`Resistor value: ${value} ohms`}
          aria-valuemin={RESISTOR_VALUES[0]}
          aria-valuemax={RESISTOR_VALUES[RESISTOR_VALUES.length - 1]}
          aria-valuenow={value}
          aria-valuetext={`${value} ohms, resulting in ${current.toFixed(1)} milliamps`}
        />
        <div className="fb-slider-labels">
          <span>{RESISTOR_VALUES[0]}Ω (bright)</span>
          <span>{RESISTOR_VALUES[RESISTOR_VALUES.length - 1]}Ω (dim)</span>
        </div>
      </div>

      {/* Current readout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "var(--fb-spacing-md)",
          padding: "var(--fb-spacing-sm) var(--fb-spacing-md)",
          background: "var(--fb-bg-tertiary)",
          borderRadius: "8px",
        }}
      >
        <span style={{ color: "var(--fb-text-muted)", fontSize: "0.875rem" }}>Current Flow</span>
        <span
          style={{
            fontFamily: "var(--fb-font-mono)",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: isOvercurrent
              ? "var(--fb-accent-error)"
              : isDim
                ? "var(--fb-text-muted)"
                : "var(--fb-accent-warning)",
          }}
        >
          {current.toFixed(1)} mA
        </span>
      </div>

      {/* Ideal value hint */}
      {idealValue && Math.abs(idealValue - value) > 50 && (
        <div
          style={{
            marginTop: "var(--fb-spacing-sm)",
            padding: "var(--fb-spacing-sm) var(--fb-spacing-md)",
            background: "rgba(79, 209, 197, 0.1)",
            border: "1px solid var(--fb-accent-primary)",
            borderRadius: "8px",
            fontSize: "0.8125rem",
            color: "var(--fb-accent-primary)",
          }}
        >
          💡 For optimal brightness at 20mA, try ~{Math.round(idealValue)}Ω
        </div>
      )}

      {/* Warnings */}
      {isOvercurrent && (
        <div className="fb-error" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          <span>⚠️ Overcurrent! LED will burn out. Increase resistance.</span>
        </div>
      )}

      {isDim && !isOvercurrent && current > 0 && (
        <div className="fb-warning" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
          </svg>
          <span>Very dim output. Consider lower resistance for more brightness.</span>
        </div>
      )}
    </div>
  );
}

export default ResistorSlider;














