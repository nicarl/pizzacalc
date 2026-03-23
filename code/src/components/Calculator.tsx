import { useCallback, useEffect, useMemo, useState } from 'react';
import { calculateRecipe } from '@/util/calculations';
import {
  type DoughType,
  getDoughPreset,
  type OvenType,
} from '@/util/dough-presets';
import { calculateTimeline } from '@/util/fermentation';
import type { UnitSystem } from '@/util/units';
import { deserializeFromParams, serializeToParams } from '@/util/url-params';
import { AdvancedInputs } from './AdvancedInputs';
import { CoreInputs } from './CoreInputs';
import { DoughGuide } from './DoughGuide';
import { DoughTypeSelector } from './DoughTypeSelector';
import { FermentationInputs } from './FermentationInputs';
import { FermentationTimeline } from './FermentationTimeline';
import { Header } from './Header';
import { RecipeCard } from './RecipeCard';
import { ShareButton } from './ShareButton';

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
  const hasColdFerment = preset.fermentation.phases.some(
    p => p.environment === 'fridge',
  );

  const handleDoughTypeChange = useCallback((type: DoughType) => {
    const p = getDoughPreset(type);
    setState(prev => {
      const ovenType = p.ovenDefault;
      const waterPercent =
        prev.ovenType === 'professional' && p.professionalWaterPercent != null
          ? p.professionalWaterPercent
          : p.waterPercent;
      return {
        ...prev,
        doughType: type,
        doughballWeight: String(p.doughballWeight),
        waterPercent: String(waterPercent),
        saltPercent: String(p.saltPercent),
        yeastPercent: String(p.yeastPercent),
        oilPercent: String(p.oilPercent),
        ovenType,
      };
    });
  }, []);

  const handleOvenTypeChange = useCallback((ovenType: OvenType) => {
    setState(prev => {
      const p = getDoughPreset(prev.doughType);
      if (p.professionalWaterPercent != null) {
        const waterPercent =
          ovenType === 'professional'
            ? p.professionalWaterPercent
            : p.waterPercent;
        return { ...prev, ovenType, waterPercent: String(waterPercent) };
      }
      return { ...prev, ovenType };
    });
  }, []);

  const update = useCallback((field: string, value: string) => {
    setState(prev => ({ ...prev, [field]: value }));
  }, []);

  const hasOverrides =
    state.doughballWeight !== String(preset.doughballWeight) ||
    state.waterPercent !== String(preset.waterPercent) ||
    state.saltPercent !== String(preset.saltPercent) ||
    state.yeastPercent !== String(preset.yeastPercent) ||
    state.oilPercent !== String(preset.oilPercent);

  const handleReset = useCallback(() => {
    setState(prev => {
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
  }, [
    state.pizzaCount,
    state.doughballWeight,
    state.waterPercent,
    state.saltPercent,
    state.yeastPercent,
    state.oilPercent,
  ]);

  const timeline = useMemo(() => {
    if (!state.targetTime) return [];
    return calculateTimeline(
      preset.fermentation,
      new Date(state.targetTime),
      Number(state.ambientTemp) || 22,
      Number(state.fridgeTemp) || 4,
    );
  }, [
    preset.fermentation,
    state.targetTime,
    state.ambientTemp,
    state.fridgeTemp,
  ]);

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

  const shareUrl = `${window.location.origin}${window.location.pathname}?${serializeToParams(
    {
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
    },
  ).toString()}`;

  return (
    <div className="mx-auto max-w-[420px]">
      <Header />
      <div className="space-y-6 p-6">
        <DoughTypeSelector
          selected={state.doughType}
          onSelect={handleDoughTypeChange}
        />
        <CoreInputs
          pizzaCount={state.pizzaCount}
          doughballWeight={state.doughballWeight}
          ovenType={state.ovenType}
          isPanStyle={preset.isPanStyle}
          onPizzaCountChange={(v: string) => update('pizzaCount', v)}
          onDoughballWeightChange={(v: string) => update('doughballWeight', v)}
          onOvenTypeChange={handleOvenTypeChange}
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
          showFridgeTemp={hasColdFerment}
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
