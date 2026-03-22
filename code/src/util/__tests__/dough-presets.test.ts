import { describe, expect, it } from 'vitest';
import {
  type DoughType,
  doughPresets,
  getDoughPreset,
} from '../dough-presets';

describe('doughPresets', () => {
  it('has all four dough types', () => {
    const types: DoughType[] = ['neapolitan', 'new-york', 'detroit', 'focaccia'];
    for (const type of types) {
      expect(doughPresets[type]).toBeDefined();
    }
  });

  it('each preset has required fields', () => {
    for (const preset of Object.values(doughPresets)) {
      expect(preset.name).toBeTruthy();
      expect(preset.doughballWeight).toBeGreaterThan(0);
      expect(preset.waterPercent).toBeGreaterThan(0);
      expect(preset.saltPercent).toBeGreaterThan(0);
      expect(preset.yeastPercent).toBeGreaterThan(0);
      expect(preset.oilPercent).toBeGreaterThanOrEqual(0);
      expect(['home', 'professional']).toContain(preset.ovenDefault);
      expect(preset.isPanStyle).toBeDefined();
    }
  });

  it('neapolitan has no oil', () => {
    expect(doughPresets.neapolitan.oilPercent).toBe(0);
  });

  it('focaccia has oil', () => {
    expect(doughPresets.focaccia.oilPercent).toBe(7);
  });

  it('pan styles are detroit and focaccia', () => {
    expect(doughPresets.detroit.isPanStyle).toBe(true);
    expect(doughPresets.focaccia.isPanStyle).toBe(true);
    expect(doughPresets.neapolitan.isPanStyle).toBe(false);
    expect(doughPresets['new-york'].isPanStyle).toBe(false);
  });

  it('each preset has a fermentation profile', () => {
    for (const preset of Object.values(doughPresets)) {
      expect(preset.fermentation.referenceTemp).toBeGreaterThan(0);
      expect(preset.fermentation.phases.length).toBeGreaterThan(0);
      expect(preset.fermentation.prepTimeMin).toBeGreaterThan(0);
      expect(preset.fermentation.bakeTimeMin).toBeGreaterThan(0);
    }
  });

  it('each preset has preparation steps', () => {
    for (const preset of Object.values(doughPresets)) {
      expect(preset.steps.length).toBeGreaterThan(0);
      for (const step of preset.steps) {
        expect(step.name).toBeTruthy();
        expect(step.instruction).toBeTruthy();
      }
    }
  });

  it('getDoughPreset returns correct preset', () => {
    expect(getDoughPreset('neapolitan').name).toBe('Neapolitan');
    expect(getDoughPreset('detroit').name).toBe('Detroit');
  });
});
