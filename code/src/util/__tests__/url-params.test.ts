import { describe, expect, it } from 'vitest';
import {
  type CalculatorState,
  deserializeFromParams,
  serializeToParams,
} from '../url-params';

const defaultState: CalculatorState = {
  doughType: 'neapolitan',
  pizzaCount: 4,
  doughballWeight: 250,
  waterPercent: 65,
  saltPercent: 2.8,
  yeastPercent: 0.05,
  oilPercent: 0,
  sugarPercent: 0,
  ovenType: 'home',
  targetTime: '2026-03-22T19:00',
  ambientTemp: 22,
  fridgeTemp: 4,
  units: 'metric',
};

describe('serializeToParams', () => {
  it('serializes all state to URL params', () => {
    const params = serializeToParams(defaultState);
    expect(params.get('type')).toBe('neapolitan');
    expect(params.get('n')).toBe('4');
    expect(params.get('w')).toBe('250');
    expect(params.get('water')).toBe('65');
    expect(params.get('salt')).toBe('2.8');
    expect(params.get('yeast')).toBe('0.05');
    expect(params.get('oven')).toBe('home');
    expect(params.get('units')).toBe('metric');
  });

  it('omits oil param when oil is 0', () => {
    const params = serializeToParams(defaultState);
    expect(params.has('oil')).toBe(false);
  });

  it('includes oil param when oil > 0', () => {
    const params = serializeToParams({ ...defaultState, oilPercent: 7 });
    expect(params.get('oil')).toBe('7');
  });

  it('omits sugar_pct param when sugar is 0', () => {
    const params = serializeToParams(defaultState);
    expect(params.has('sugar_pct')).toBe(false);
  });

  it('includes sugar_pct param when sugar > 0', () => {
    const params = serializeToParams({ ...defaultState, sugarPercent: 1.5 });
    expect(params.get('sugar_pct')).toBe('1.5');
  });
});

describe('deserializeFromParams', () => {
  it('deserializes full params', () => {
    const params = serializeToParams(defaultState);
    const state = deserializeFromParams(params);
    expect(state).not.toBeNull();
    expect(state?.doughType).toBe('neapolitan');
    expect(state?.pizzaCount).toBe(4);
    expect(state?.doughballWeight).toBe(250);
    expect(state?.waterPercent).toBe(65);
    expect(state?.oilPercent).toBe(0);
  });

  it('returns null for empty params', () => {
    const params = new URLSearchParams();
    expect(deserializeFromParams(params)).toBeNull();
  });

  it('returns null for invalid dough type', () => {
    const params = new URLSearchParams('type=invalid');
    expect(deserializeFromParams(params)).toBeNull();
  });

  it('falls back to preset defaults for missing params', () => {
    const params = new URLSearchParams('type=focaccia&n=2');
    const state = deserializeFromParams(params);
    expect(state).not.toBeNull();
    expect(state?.doughType).toBe('focaccia');
    expect(state?.pizzaCount).toBe(2);
    expect(state?.waterPercent).toBe(78);
    expect(state?.oilPercent).toBe(7);
  });

  it('roundtrips correctly', () => {
    const params = serializeToParams(defaultState);
    const restored = deserializeFromParams(params);
    expect(restored).toEqual(defaultState);
  });

  it('falls back to default when numeric param is NaN', () => {
    const params = new URLSearchParams('type=neapolitan&n=abc&w=xyz');
    const state = deserializeFromParams(params);
    expect(state).not.toBeNull();
    expect(state?.pizzaCount).toBe(4);
    expect(state?.doughballWeight).toBe(250);
  });

  it('deserializes professional oven type', () => {
    const params = new URLSearchParams('type=neapolitan&oven=professional');
    const state = deserializeFromParams(params);
    expect(state).not.toBeNull();
    expect(state?.ovenType).toBe('professional');
  });

  it('deserializes imperial units', () => {
    const params = new URLSearchParams('type=neapolitan&units=imperial');
    const state = deserializeFromParams(params);
    expect(state).not.toBeNull();
    expect(state?.units).toBe('imperial');
  });

  it('falls back to default target time when eat param is missing', () => {
    const params = new URLSearchParams('type=neapolitan');
    const state = deserializeFromParams(params);
    expect(state).not.toBeNull();
    // targetTime should be a valid datetime string (tomorrow at 19:00)
    expect(state?.targetTime).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
  });
});
