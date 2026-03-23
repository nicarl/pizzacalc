import { useState } from 'react';
import type {
  BakingInstruction,
  OvenType,
  PreparationStep,
} from '@/util/dough-presets';
import type { UnitSystem } from '@/util/units';

interface DoughGuideProps {
  steps: PreparationStep[];
  bakingInstructions: Record<OvenType, BakingInstruction>;
  ovenType: OvenType;
  units: UnitSystem;
}

export function DoughGuide({
  steps,
  bakingInstructions,
  ovenType,
  units,
}: DoughGuideProps) {
  const [isOpen, setIsOpen] = useState(false);

  const baking = bakingInstructions[ovenType];
  const temp = units === 'imperial' ? `${baking.tempF}°F` : `${baking.tempC}°C`;

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center gap-1.5 font-sans text-[13px] text-primary"
      >
        <span className="text-xs">{isOpen ? '\u25B2' : '\u25BC'}</span>
        {isOpen ? 'Hide preparation steps' : 'Show preparation steps'}
      </button>
      {isOpen && (
        <div className="mt-3 space-y-4">
          {steps.map((step, i) => (
            <div key={step.name} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-sans text-xs font-semibold text-primary">
                {i + 1}
              </span>
              <div>
                <h4 className="font-sans text-sm font-semibold text-text-primary">
                  {step.name}
                </h4>
                <p className="mt-0.5 font-sans text-[13px] text-text-secondary">
                  {step.instruction}
                </p>
                {step.tip && (
                  <div className="mt-1.5 rounded-lg bg-advanced-bg px-3 py-2 font-sans text-xs text-text-secondary">
                    {step.tip}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-sans text-xs font-semibold text-primary">
              {steps.length + 1}
            </span>
            <div>
              <h4 className="font-sans text-sm font-semibold text-text-primary">
                Bake
              </h4>
              <p className="mt-0.5 font-sans text-[13px] text-text-secondary">
                {baking.description}
              </p>
              <div className="mt-1.5 rounded-lg bg-advanced-bg px-3 py-2 font-sans text-xs text-text-secondary">
                Oven temperature: {temp}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
