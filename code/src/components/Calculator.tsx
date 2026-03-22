import { useMemo, useState, useEffect, useCallback } from 'react';
import { Header } from './Header';
import { DoughTypeSelector } from './DoughTypeSelector';
import { CoreInputs } from './CoreInputs';
import { AdvancedInputs } from './AdvancedInputs';
import { RecipeCard } from './RecipeCard';
import { FermentationInputs } from './FermentationInputs';
import { FermentationTimeline } from './FermentationTimeline';
import { DoughGuide } from './DoughGuide';
import { ShareButton } from './ShareButton';
import { type DoughType, type OvenType, getDoughPreset } from '@/util/dough-presets';
import { calculateRecipe } from '@/util/calculations';
import { calculateTimeline } from '@/util/fermentation';
import { type UnitSystem } from '@/util/units';
import { serializeToParams, deserializeFromParams } from '@/util/url-params';

function getDefaultTargetTime(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(19, 0, 0, 0);
  return tomorrow.toISOString().slice(0, 16);
}

function initState() {
  const params = new URLSearchParams(window.location.search);
  const restored = deserializeFromParams(params);
  if (restored) {
    return {
      doughType: restored.doughType,
      pizzaCount: String(restored.pizzaCount),
      doughballWeight: String(restored.doughballWeight),
      waterPercent: String(restored.waterPercent),
      saltPercent: String(restored.saltPercent),
      yeastPercent: String(restored.yeastPercent),
      oilPercent: String(restored.oilPercent),
      ovenType: restored.ovenType,
      targetTime: restored.targetTime,
      ambientTemp: String(restored.ambientTemp),
      fridgeTemp: String(restored.fridgeTemp),
      units: restored.units,
    };
  }
  const preset = getDoughPreset('neapolitan');
  return {
    doughType: 'neapolitan' as DoughType,
    pizzaCount: '4',
    doughballWeight: String(preset.doughballWeight),
    waterPercent: String(preset.waterPercent),
    saltPercent: String(preset.saltPercent),
    yeastPercent: String(preset.yeastPercent),
    oilPercent: String(preset.oilPercent),
    ovenType: preset.ovenDefault,
    targetTime: getDefaultTargetTime(),
    ambientTemp: '22',
    fridgeTemp: '4',
    units: 'metric' as UnitSystem,
  };
}

export function Calculator() {
  const [state, setState] = useState(initState);

  const preset = getDoughPreset(state.doughType);
  const showOil = preset.oilPercent > 0;

  const handleDoughTypeChange = useCallback((type: DoughType) => {
    const p = getDoughPreset(type);
    setState((prev) => ({
      ...prev,
      doughType: type,
      doughballWeight: String(p.doughballWeight),
      waterPercent: String(p.waterPercent),
      saltPercent: String(p.saltPercent),
      yeastPercent: String(p.yeastPercent),
      oilPercent: String(p.oilPercent),
      ovenType: p.ovenDefault,
    }));
  }, []);

  const update = useCallback((field: string, value: string) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const hasOverrides =
    state.doughballWeight !== String(preset.doughballWeight) ||
    state.waterPercent !== String(preset.waterPercent) ||
    state.saltPercent !== String(preset.saltPercent) ||
    state.yeastPercent !== String(preset.yeastPercent) ||
    state.oilPercent !== String(preset.oilPercent);

  const handleReset = useCallback(() => {
    setState((prev) => {
      const p = getDoughPreset(prev.doughType);
      return {
        ...prev,
        doughballWeight: String(p.doughballWeight),
        waterPercent: String(p.waterPercent),
        saltPercent: String(p.saltPercent),
        yeastPercent: String(p.yeastPercent),
        oilPercent: String(p.oilPercent),
      };
    });
  }, []);

  const recipe = useMemo(() => {
    return calculateRecipe({
      pizzaCount: Number(state.pizzaCount) || 0,
      doughballWeight: Number(state.doughballWeight) || 0,
      waterPercent: Number(state.waterPercent) || 0,
      saltPercent: Number(state.saltPercent) || 0,
      yeastPercent: Number(state.yeastPercent) || 0,
      oilPercent: Number(state.oilPercent) || 0,
    });
  }, [state.pizzaCount, state.doughballWeight, state.waterPercent, state.saltPercent, state.yeastPercent, state.oilPercent]);

  const timeline = useMemo(() => {
    if (!state.targetTime) return [];
    return calculateTimeline(
      preset.fermentation,
      new Date(state.targetTime),
      Number(state.ambientTemp) || 22,
      Number(state.fridgeTemp) || 4,
    );
  }, [preset.fermentation, state.targetTime, state.ambientTemp, state.fridgeTemp]);

  // URL sync
  useEffect(() => {
    const params = serializeToParams({
      doughType: state.doughType,
      pizzaCount: Number(state.pizzaCount) || 0,
      doughballWeight: Number(state.doughballWeight) || 0,
      waterPercent: Number(state.waterPercent) || 0,
      saltPercent: Number(state.saltPercent) || 0,
      yeastPercent: Number(state.yeastPercent) || 0,
      oilPercent: Number(state.oilPercent) || 0,
      ovenType: state.ovenType,
      targetTime: state.targetTime,
      ambientTemp: Number(state.ambientTemp) || 22,
      fridgeTemp: Number(state.fridgeTemp) || 4,
      units: state.units,
    });
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, [state]);

  const shareUrl = `${window.location.origin}${window.location.pathname}?${serializeToParams({
    doughType: state.doughType,
    pizzaCount: Number(state.pizzaCount) || 0,
    doughballWeight: Number(state.doughballWeight) || 0,
    waterPercent: Number(state.waterPercent) || 0,
    saltPercent: Number(state.saltPercent) || 0,
    yeastPercent: Number(state.yeastPercent) || 0,
    oilPercent: Number(state.oilPercent) || 0,
    ovenType: state.ovenType,
    targetTime: state.targetTime,
    ambientTemp: Number(state.ambientTemp) || 22,
    fridgeTemp: Number(state.fridgeTemp) || 4,
    units: state.units,
  }).toString()}`;

  return (
    <div className="mx-auto max-w-[420px]">
      <Header />
      <div className="space-y-6 p-6">
        <DoughTypeSelector selected={state.doughType} onSelect={handleDoughTypeChange} />
        <CoreInputs
          pizzaCount={state.pizzaCount}
          doughballWeight={state.doughballWeight}
          ovenType={state.ovenType}
          isPanStyle={preset.isPanStyle}
          onPizzaCountChange={(v: string) => update('pizzaCount', v)}
          onDoughballWeightChange={(v: string) => update('doughballWeight', v)}
          onOvenTypeChange={(v: OvenType) => update('ovenType', v)}
        />
        <AdvancedInputs
          waterPercent={state.waterPercent}
          saltPercent={state.saltPercent}
          yeastPercent={state.yeastPercent}
          oilPercent={state.oilPercent}
          showOil={showOil}
          onWaterChange={(v: string) => update('waterPercent', v)}
          onSaltChange={(v: string) => update('saltPercent', v)}
          onYeastChange={(v: string) => update('yeastPercent', v)}
          onOilChange={(v: string) => update('oilPercent', v)}
          hasOverrides={hasOverrides}
          onReset={handleReset}
        />
        <RecipeCard
          recipe={recipe}
          showOil={showOil}
          units={state.units}
          onToggleUnits={(u: UnitSystem) => update('units', u)}
        />
        <FermentationInputs
          targetTime={state.targetTime}
          ambientTemp={state.ambientTemp}
          fridgeTemp={state.fridgeTemp}
          units={state.units}
          onTargetTimeChange={(v: string) => update('targetTime', v)}
          onAmbientTempChange={(v: string) => update('ambientTemp', v)}
          onFridgeTempChange={(v: string) => update('fridgeTemp', v)}
        />
        <FermentationTimeline steps={timeline} />
        <DoughGuide steps={preset.steps} />
        <ShareButton url={shareUrl} />
      </div>
    </div>
  );
}
