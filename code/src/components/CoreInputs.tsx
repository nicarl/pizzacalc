import type { OvenType } from '@/util/dough-presets';
import { gramsToOz, ozToGrams, type UnitSystem } from '@/util/units';

interface CoreInputsProps {
  pizzaCount: string;
  doughballWeight: string;
  ovenType: OvenType;
  isPanStyle: boolean;
  units: UnitSystem;
  onPizzaCountChange: (value: string) => void;
  onDoughballWeightChange: (value: string) => void;
  onOvenTypeChange: (value: OvenType) => void;
}

export function CoreInputs({
  pizzaCount,
  doughballWeight,
  ovenType,
  isPanStyle,
  units,
  onPizzaCountChange,
  onDoughballWeightChange,
  onOvenTypeChange,
}: CoreInputsProps) {
  const countLabel = isPanStyle ? 'Pans' : 'Pizzas';
  const isImperial = units === 'imperial';
  const unitSuffix = isImperial ? 'oz' : 'g';

  const displayWeight =
    isImperial && doughballWeight !== ''
      ? gramsToOz(Number(doughballWeight)).toFixed(1)
      : doughballWeight;

  const handleWeightChange = (value: string) => {
    if (isImperial && value !== '') {
      const num = Number(value);
      if (!Number.isNaN(num)) {
        onDoughballWeightChange(String(Math.round(ozToGrams(num))));
        return;
      }
    }
    onDoughballWeightChange(value);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-1">
          <label
            htmlFor="pizza-count"
            className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary"
          >
            {countLabel}
          </label>
          <input
            id="pizza-count"
            type="text"
            inputMode="numeric"
            value={pizzaCount}
            onChange={e => onPizzaCountChange(e.target.value)}
            className="h-11 w-full rounded-[10px] border-[1.5px] border-border bg-white px-3.5 py-2.5 font-sans text-[15px] text-text-primary outline-none transition-colors focus:border-primary"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="oven-type"
            className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary"
          >
            Oven Type
          </label>
          <select
            id="oven-type"
            value={ovenType}
            onChange={e => onOvenTypeChange(e.target.value as OvenType)}
            className="h-11 w-full rounded-[10px] border-[1.5px] border-border bg-white px-3.5 py-2.5 font-sans text-[15px] text-text-primary outline-none transition-colors focus:border-primary"
          >
            <option value="home">Home Oven</option>
            <option value="professional">Professional</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="doughball-weight"
          className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary"
        >
          Doughball Weight
        </label>
        <div className="relative">
          <input
            id="doughball-weight"
            type="text"
            inputMode="decimal"
            value={displayWeight}
            onChange={e => handleWeightChange(e.target.value)}
            className="w-full rounded-[10px] border-[1.5px] border-border bg-white px-3.5 py-2.5 pr-8 font-sans text-[15px] text-text-primary outline-none transition-colors focus:border-primary"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 font-sans text-sm text-text-secondary">
            {unitSuffix}
          </span>
        </div>
      </div>
    </div>
  );
}
