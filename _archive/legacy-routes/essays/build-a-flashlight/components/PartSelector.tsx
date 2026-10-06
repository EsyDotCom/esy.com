"use client";

interface PartOption<T> {
  id: T;
  name: string;
  spec: string;
  description: string;
  hexColor?: string;
}

interface PartSelectorProps<T extends string> {
  label: string;
  options: PartOption<T>[];
  selected: T;
  onSelect: (id: T) => void;
  renderIcon?: (option: PartOption<T>) => React.ReactNode;
  warning?: string;
}

/**
 * Reusable part selection component.
 * Displays options in a grid with name, spec, and description.
 */
export function PartSelector<T extends string>({
  label,
  options,
  selected,
  onSelect,
  renderIcon,
  warning,
}: PartSelectorProps<T>) {
  return (
    <div className="fb-interaction" role="group" aria-label={label}>
      <div className="fb-interaction-label">
        <span>{label}</span>
        <span className="fb-interaction-value">{options.find((o) => o.id === selected)?.name}</span>
      </div>
      <div className="fb-part-grid" role="listbox" aria-label={label}>
        {options.map((option) => (
          <button
            key={option.id}
            className={`fb-part-option ${selected === option.id ? "selected" : ""}`}
            onClick={() => onSelect(option.id)}
            role="option"
            aria-selected={selected === option.id}
            aria-label={`${option.name}: ${option.description}`}
          >
            {renderIcon ? (
              <div className="fb-part-icon">{renderIcon(option)}</div>
            ) : option.hexColor ? (
              <div
                className="fb-part-icon"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: option.hexColor,
                  margin: "0 auto 8px",
                  boxShadow: selected === option.id ? `0 0 20px ${option.hexColor}` : "none",
                  transition: "box-shadow 0.2s",
                }}
              />
            ) : null}
            <div className="fb-part-name">{option.name}</div>
            <div className="fb-part-spec">{option.spec}</div>
            <div className="fb-part-desc">{option.description}</div>
          </button>
        ))}
      </div>
      {warning && (
        <div className="fb-warning" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          <span>{warning}</span>
        </div>
      )}
    </div>
  );
}

export default PartSelector;














