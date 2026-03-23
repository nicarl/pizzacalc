import { useState } from 'react';
import { validatePositiveFloat } from '@/util/validation';
import { INPUT_CLASS, LABEL_CLASS } from './styles';

function percentError(value: string): string | null {
  if (value === '') return null;
  return !validatePositiveFloat(value) ? 'Enter a positive number' : null;
}

interface AdvancedInputsProps {
  waterPercent: string;
  saltPercent: string;
  yeastPercent: string;
  oilPercent: string;
  showOil: boolean;
  sugarPercent: string;
  showSugar: boolean;
  onWaterChange: (value: string) => void;
  onSaltChange: (value: string) => void;
  onYeastChange: (value: string) => void;
  onOilChange: (value: string) => void;
  onSugarChange: (value: string) => void;
  hasOverrides: boolean;
  onReset: () => void;
}

export function AdvancedInputs({
  waterPercent,
  saltPercent,
  yeastPercent,
  oilPercent,
  showOil,
  sugarPercent,
  showSugar,
  onWaterChange,
  onSaltChange,
  onYeastChange,
  onOilChange,
  onSugarChange,
  hasOverrides,
  onReset,
}: AdvancedInputsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-1.5 font-sans text-[13px] text-primary"
      >
        <span className="text-xs">{isOpen ? '\u25B2' : '\u25BC'}</span>
        {isOpen ? 'Hide advanced' : 'Adjust hydration, salt & yeast'}
      </button>
      {isOpen && (
        <div className="mt-3 rounded-xl bg-advanced-bg p-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label htmlFor="water-percent" className={LABEL_CLASS}>
                Water %
              </label>
              <input
                id="water-percent"
                type="text"
                inputMode="decimal"
                value={waterPercent}
                onChange={e => onWaterChange(e.target.value)}
                className={INPUT_CLASS}
              />
              {percentError(waterPercent) && (
                <p className="mt-1 text-xs text-orange-600">
                  {percentError(waterPercent)}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="salt-percent" className={LABEL_CLASS}>
                Salt %
              </label>
              <input
                id="salt-percent"
                type="text"
                inputMode="decimal"
                value={saltPercent}
                onChange={e => onSaltChange(e.target.value)}
                className={INPUT_CLASS}
              />
              {percentError(saltPercent) && (
                <p className="mt-1 text-xs text-orange-600">
                  {percentError(saltPercent)}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="yeast-percent" className={LABEL_CLASS}>
                Yeast %
              </label>
              <input
                id="yeast-percent"
                type="text"
                inputMode="decimal"
                value={yeastPercent}
                onChange={e => onYeastChange(e.target.value)}
                className={INPUT_CLASS}
              />
              {percentError(yeastPercent) && (
                <p className="mt-1 text-xs text-orange-600">
                  {percentError(yeastPercent)}
                </p>
              )}
            </div>
          </div>
          {showOil && (
            <div className="mt-3">
              <label htmlFor="oil-percent" className={LABEL_CLASS}>
                Oil %
              </label>
              <input
                id="oil-percent"
                type="text"
                inputMode="decimal"
                value={oilPercent}
                onChange={e => onOilChange(e.target.value)}
                className={INPUT_CLASS}
              />
              {percentError(oilPercent) && (
                <p className="mt-1 text-xs text-orange-600">
                  {percentError(oilPercent)}
                </p>
              )}
            </div>
          )}
          {showSugar && (
            <div className="mt-3">
              <label htmlFor="sugar-percent" className={LABEL_CLASS}>
                Sugar %
              </label>
              <input
                id="sugar-percent"
                type="text"
                inputMode="decimal"
                value={sugarPercent}
                onChange={e => onSugarChange(e.target.value)}
                className={INPUT_CLASS}
              />
              {percentError(sugarPercent) && (
                <p className="mt-1 text-xs text-orange-600">
                  {percentError(sugarPercent)}
                </p>
              )}
            </div>
          )}
          {hasOverrides && (
            <button
              type="button"
              onClick={onReset}
              className="mt-3 cursor-pointer font-sans text-xs text-primary underline-offset-2 hover:underline"
            >
              Reset to defaults
            </button>
          )}
        </div>
      )}
    </div>
  );
}
