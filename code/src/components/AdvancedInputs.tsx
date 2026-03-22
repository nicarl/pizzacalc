import { useState } from 'react';

interface AdvancedInputsProps {
  waterPercent: string;
  saltPercent: string;
  yeastPercent: string;
  oilPercent: string;
  showOil: boolean;
  onWaterChange: (value: string) => void;
  onSaltChange: (value: string) => void;
  onYeastChange: (value: string) => void;
  onOilChange: (value: string) => void;
  hasOverrides: boolean;
  onReset: () => void;
}

export function AdvancedInputs({
  waterPercent,
  saltPercent,
  yeastPercent,
  oilPercent,
  showOil,
  onWaterChange,
  onSaltChange,
  onYeastChange,
  onOilChange,
  hasOverrides,
  onReset,
}: AdvancedInputsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 font-sans text-[13px] text-primary"
      >
        <span className="text-xs">{isOpen ? '\u25B2' : '\u25BC'}</span>
        {isOpen ? 'Hide advanced' : 'Adjust hydration, salt & yeast'}
      </button>
      {isOpen && (
        <div className="mt-3 rounded-xl bg-advanced-bg p-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label
                htmlFor="water-percent"
                className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary"
              >
                Water %
              </label>
              <input
                id="water-percent"
                type="text"
                inputMode="decimal"
                value={waterPercent}
                onChange={e => onWaterChange(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-border bg-white px-3 py-2 font-sans text-[15px] text-text-primary outline-none focus:border-primary"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="salt-percent"
                className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary"
              >
                Salt %
              </label>
              <input
                id="salt-percent"
                type="text"
                inputMode="decimal"
                value={saltPercent}
                onChange={e => onSaltChange(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-border bg-white px-3 py-2 font-sans text-[15px] text-text-primary outline-none focus:border-primary"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="yeast-percent"
                className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary"
              >
                Yeast %
              </label>
              <input
                id="yeast-percent"
                type="text"
                inputMode="decimal"
                value={yeastPercent}
                onChange={e => onYeastChange(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-border bg-white px-3 py-2 font-sans text-[15px] text-text-primary outline-none focus:border-primary"
              />
            </div>
          </div>
          {showOil && (
            <div className="mt-3">
              <label
                htmlFor="oil-percent"
                className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary"
              >
                Oil %
              </label>
              <input
                id="oil-percent"
                type="text"
                inputMode="decimal"
                value={oilPercent}
                onChange={e => onOilChange(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-border bg-white px-3 py-2 font-sans text-[15px] text-text-primary outline-none focus:border-primary"
              />
            </div>
          )}
          {hasOverrides && (
            <button
              type="button"
              onClick={onReset}
              className="mt-3 font-sans text-xs text-primary underline-offset-2 hover:underline"
            >
              Reset to defaults
            </button>
          )}
        </div>
      )}
    </div>
  );
}
