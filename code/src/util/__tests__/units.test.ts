import { describe, expect, it } from 'vitest';
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  formatTemp,
  formatWeight,
  gramsToOz,
  ozToGrams,
} from '../units';

describe('weight conversion', () => {
  it('converts grams to ounces', () => {
    expect(gramsToOz(28.3495)).toBeCloseTo(1, 1);
    expect(gramsToOz(100)).toBeCloseTo(3.5, 1);
  });
  it('converts ounces to grams', () => {
    expect(ozToGrams(1)).toBeCloseTo(28.3, 0);
    expect(ozToGrams(10)).toBeCloseTo(283.5, 0);
  });
});

describe('temperature conversion', () => {
  it('converts celsius to fahrenheit', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
    expect(celsiusToFahrenheit(22)).toBeCloseTo(71.6, 1);
  });
  it('converts fahrenheit to celsius', () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
    expect(fahrenheitToCelsius(212)).toBe(100);
    expect(fahrenheitToCelsius(72)).toBeCloseTo(22.2, 1);
  });
});

describe('formatWeight', () => {
  it('formats metric weights', () => {
    expect(formatWeight(578.3, 'metric')).toBe('578');
    expect(formatWeight(1.2, 'metric')).toBe('1.2');
  });
  it('formats imperial weights to 1 decimal', () => {
    expect(formatWeight(578.3, 'imperial')).toBe('20.4');
    expect(formatWeight(28.35, 'imperial')).toBe('1.0');
  });
});

describe('formatTemp', () => {
  it('formats metric temperature', () => {
    expect(formatTemp(22, 'metric')).toBe('22°C');
  });
  it('formats imperial temperature', () => {
    expect(formatTemp(22, 'imperial')).toBe('72°F');
  });
});
