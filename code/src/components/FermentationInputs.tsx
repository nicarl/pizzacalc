import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  type UnitSystem,
} from '@/util/units';
import { INPUT_CLASS, LABEL_CLASS } from './styles';

interface FermentationInputsProps {
  targetTime: string;
  ambientTemp: string;
  fridgeTemp: string;
  units: UnitSystem;
  showFridgeTemp: boolean;
  onTargetTimeChange: (value: string) => void;
  onAmbientTempChange: (value: string) => void;
  onFridgeTempChange: (value: string) => void;
}

function tempWarning(
  valueCelsius: string,
  min: number,
  max: number,
): string | null {
  const num = Number(valueCelsius);
  if (valueCelsius === '' || Number.isNaN(num)) return null;
  if (num < min || num > max)
    return 'Unusual temperature \u2014 check your input';
  return null;
}

function displayTemp(celsiusStr: string, isImperial: boolean): string {
  if (!isImperial || celsiusStr === '') return celsiusStr;
  const c = Number(celsiusStr);
  if (Number.isNaN(c)) return celsiusStr;
  return String(Math.round(celsiusToFahrenheit(c)));
}

function handleTempInput(
  value: string,
  isImperial: boolean,
  onChange: (celsiusStr: string) => void,
): void {
  if (!isImperial || value === '') {
    onChange(value);
    return;
  }
  const f = Number(value);
  if (Number.isNaN(f)) {
    onChange(value);
    return;
  }
  onChange(String(Math.round(fahrenheitToCelsius(f))));
}

export function FermentationInputs({
  targetTime,
  ambientTemp,
  fridgeTemp,
  units,
  showFridgeTemp,
  onTargetTimeChange,
  onAmbientTempChange,
  onFridgeTempChange,
}: FermentationInputsProps) {
  const isImperial = units === 'imperial';
  const tempUnit = isImperial ? '\u00B0F' : '\u00B0C';
  const ambientWarning = tempWarning(ambientTemp, 10, 40);
  const fridgeWarning = tempWarning(fridgeTemp, 0, 10);

  return (
    <div className="rounded-xl border border-primary-muted-border bg-primary-muted p-4">
      <h4 className="mb-3 font-sans text-[13px] font-semibold text-primary">
        Fermentation Schedule
      </h4>
      <div className="space-y-3">
        <div>
          <label htmlFor="target-time" className={LABEL_CLASS}>
            I want to eat at
          </label>
          <input
            id="target-time"
            type="datetime-local"
            value={targetTime}
            onChange={e => onTargetTimeChange(e.target.value)}
            className={INPUT_CLASS}
          />
        </div>
        <div className="flex gap-3">
          <div className={showFridgeTemp ? 'flex-1' : 'w-full'}>
            <label htmlFor="ambient-temp" className={LABEL_CLASS}>
              Ambient {tempUnit}
            </label>
            <input
              id="ambient-temp"
              type="text"
              inputMode="numeric"
              value={displayTemp(ambientTemp, isImperial)}
              onChange={e =>
                handleTempInput(e.target.value, isImperial, onAmbientTempChange)
              }
              className={INPUT_CLASS}
            />
            {ambientWarning && (
              <p className="mt-1 text-xs text-orange-600">{ambientWarning}</p>
            )}
          </div>
          {showFridgeTemp && (
            <div className="flex-1">
              <label htmlFor="fridge-temp" className={LABEL_CLASS}>
                Fridge {tempUnit}
              </label>
              <input
                id="fridge-temp"
                type="text"
                inputMode="numeric"
                value={displayTemp(fridgeTemp, isImperial)}
                onChange={e =>
                  handleTempInput(
                    e.target.value,
                    isImperial,
                    onFridgeTempChange,
                  )
                }
                className={INPUT_CLASS}
              />
              {fridgeWarning && (
                <p className="mt-1 text-xs text-orange-600">{fridgeWarning}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
