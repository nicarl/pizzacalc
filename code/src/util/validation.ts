export function validatePositiveFloat(value: string): boolean {
  if (value.trim() === '') return false;
  const num = Number(value);
  return !Number.isNaN(num) && num >= 0;
}

export function validatePositiveInt(value: string): boolean {
  if (value.trim() === '') return false;
  const num = Number(value);
  return Number.isInteger(num) && num >= 1;
}

export function parseValidFloat(value: string, fallback: number): number {
  if (!validatePositiveFloat(value)) return fallback;
  return Number(value);
}

export function parseValidInt(value: string, fallback: number): number {
  if (!validatePositiveInt(value)) return fallback;
  return Number(value);
}
