import type { UnitSystem } from '@/util/units';

interface FermentationInputsProps {
  targetTime: string;
  ambientTemp: string;
  fridgeTemp: string;
  units: UnitSystem;
  onTargetTimeChange: (value: string) => void;
  onAmbientTempChange: (value: string) => void;
  onFridgeTempChange: (value: string) => void;
}

export function FermentationInputs({
  targetTime,
  ambientTemp,
  fridgeTemp,
  units,
  onTargetTimeChange,
  onAmbientTempChange,
  onFridgeTempChange,
}: FermentationInputsProps) {
  const tempUnit = units === 'metric' ? '\u00B0C' : '\u00B0F';

  return (
    <div className="rounded-xl border border-primary-muted-border bg-primary-muted p-4">
      <h4 className="mb-3 font-sans text-[13px] font-semibold text-primary">
        Fermentation Schedule
      </h4>
      <div className="space-y-3">
        <div>
          <label
            htmlFor="target-time"
            className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary"
          >
            I want to eat at
          </label>
          <input
            id="target-time"
            type="datetime-local"
            value={targetTime}
            onChange={e => onTargetTimeChange(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-border bg-white px-3 py-2 font-sans text-[15px] text-text-primary outline-none focus:border-primary"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <label
              htmlFor="ambient-temp"
              className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary"
            >
              Ambient {tempUnit}
            </label>
            <input
              id="ambient-temp"
              type="text"
              inputMode="numeric"
              value={ambientTemp}
              onChange={e => onAmbientTempChange(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-border bg-white px-3 py-2 font-sans text-[15px] text-text-primary outline-none focus:border-primary"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="fridge-temp"
              className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary"
            >
              Fridge {tempUnit}
            </label>
            <input
              id="fridge-temp"
              type="text"
              inputMode="numeric"
              value={fridgeTemp}
              onChange={e => onFridgeTempChange(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-border bg-white px-3 py-2 font-sans text-[15px] text-text-primary outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
