import type { PizzaRecipe } from '@/util/calculations';
import { formatWeight, type UnitSystem } from '@/util/units';

interface RecipeCardProps {
  recipe: PizzaRecipe;
  showOil: boolean;
  units: UnitSystem;
  onToggleUnits: (units: UnitSystem) => void;
}

export function RecipeCard({
  recipe,
  showOil,
  units,
  onToggleUnits,
}: RecipeCardProps) {
  const unitSuffix = units === 'metric' ? 'g' : 'oz';

  const ingredients: { name: string; mass: number; testId: string }[] = [
    { name: 'Flour', mass: recipe.flourMass, testId: 'flour-amount' },
    { name: 'Water', mass: recipe.waterMass, testId: 'water-amount' },
    { name: 'Salt', mass: recipe.saltMass, testId: 'salt-amount' },
    { name: 'Yeast', mass: recipe.yeastMass, testId: 'yeast-amount' },
  ];

  if (showOil) {
    ingredients.push({
      name: 'Oil',
      mass: recipe.oilMass,
      testId: 'oil-amount',
    });
  }

  return (
    <div className="rounded-[14px] bg-surface-dark p-[22px] text-[#faf6f1]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-primary">
          Your Recipe
        </h3>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onToggleUnits('metric')}
            className={`rounded px-2 py-0.5 font-sans text-xs font-medium transition-colors ${
              units === 'metric'
                ? 'bg-primary text-white'
                : 'text-[#a89580] hover:text-[#faf6f1]'
            }`}
          >
            g
          </button>
          <button
            type="button"
            onClick={() => onToggleUnits('imperial')}
            className={`rounded px-2 py-0.5 font-sans text-xs font-medium transition-colors ${
              units === 'imperial'
                ? 'bg-primary text-white'
                : 'text-[#a89580] hover:text-[#faf6f1]'
            }`}
          >
            oz
          </button>
        </div>
      </div>
      {ingredients.map(item => (
        <div
          key={item.name}
          className="flex items-baseline justify-between border-b border-white/[0.08] py-2 last:border-b-0"
        >
          <span className="font-sans text-[15px]">{item.name}</span>
          <span className="font-sans text-lg font-semibold">
            <span data-testid={item.testId}>
              {formatWeight(item.mass, units)}
            </span>
            <span className="ml-1 text-xs text-[#a89580]">{unitSuffix}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
