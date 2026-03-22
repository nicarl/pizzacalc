import {
  type DoughType,
  doughPresets,
  doughTypeList,
  type OvenType,
} from './dough-presets';
import type { UnitSystem } from './units';

export interface CalculatorState {
  doughType: DoughType;
  pizzaCount: number;
  doughballWeight: number;
  waterPercent: number;
  saltPercent: number;
  yeastPercent: number;
  oilPercent: number;
  ovenType: OvenType;
  targetTime: string;
  ambientTemp: number;
  fridgeTemp: number;
  units: UnitSystem;
}

export function serializeToParams(state: CalculatorState): URLSearchParams {
  const params = new URLSearchParams();
  params.set('type', state.doughType);
  params.set('n', String(state.pizzaCount));
  params.set('w', String(state.doughballWeight));
  params.set('water', String(state.waterPercent));
  params.set('salt', String(state.saltPercent));
  params.set('yeast', String(state.yeastPercent));
  if (state.oilPercent > 0) params.set('oil', String(state.oilPercent));
  params.set('oven', state.ovenType);
  params.set('eat', state.targetTime);
  params.set('ambient', String(state.ambientTemp));
  params.set('fridge', String(state.fridgeTemp));
  params.set('units', state.units);
  return params;
}

export function deserializeFromParams(
  params: URLSearchParams,
): CalculatorState | null {
  const typeParam = params.get('type');
  if (!typeParam) return null;
  if (!doughTypeList.includes(typeParam as DoughType)) return null;

  const doughType = typeParam as DoughType;
  const preset = doughPresets[doughType];

  const parseNum = (key: string, fallback: number): number => {
    const val = params.get(key);
    if (val === null) return fallback;
    const num = Number(val);
    return Number.isNaN(num) ? fallback : num;
  };

  return {
    doughType,
    pizzaCount: parseNum('n', 4),
    doughballWeight: parseNum('w', preset.doughballWeight),
    waterPercent: parseNum('water', preset.waterPercent),
    saltPercent: parseNum('salt', preset.saltPercent),
    yeastPercent: parseNum('yeast', preset.yeastPercent),
    oilPercent: parseNum('oil', preset.oilPercent),
    ovenType: (params.get('oven') === 'professional'
      ? 'professional'
      : 'home') as OvenType,
    targetTime: params.get('eat') ?? getDefaultTargetTime(),
    ambientTemp: parseNum('ambient', 22),
    fridgeTemp: parseNum('fridge', 4),
    units: (params.get('units') === 'imperial'
      ? 'imperial'
      : 'metric') as UnitSystem,
  };
}

function getDefaultTargetTime(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(19, 0, 0, 0);
  return tomorrow.toISOString().slice(0, 16);
}
