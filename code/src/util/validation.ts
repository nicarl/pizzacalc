export function validatePositiveFloat(value: string): boolean {
  const n = Number(value);
  return (
    !Number.isNaN(n) && Number.isFinite(n) && n >= 0 && value.trim() !== ''
  );
}

export function validatePositiveInt(value: string): boolean {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1;
}
