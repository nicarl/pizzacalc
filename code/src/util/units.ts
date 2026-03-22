export type UnitSystem = 'metric' | 'imperial';

const GRAMS_PER_OZ = 28.3495;

export function gramsToOz(grams: number): number {
  return grams / GRAMS_PER_OZ;
}

export function ozToGrams(oz: number): number {
  return oz * GRAMS_PER_OZ;
}

export function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

export function fahrenheitToCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

export function formatWeight(grams: number, units: UnitSystem): string {
  if (units === 'imperial') {
    return gramsToOz(grams).toFixed(1);
  }
  if (grams < 10) {
    return Number(grams.toFixed(1)).toString();
  }
  return Math.round(grams).toString();
}

export function formatTemp(celsius: number, units: UnitSystem): string {
  if (units === 'imperial') {
    return `${Math.round(celsiusToFahrenheit(celsius))}°F`;
  }
  return `${Math.round(celsius)}°C`;
}
