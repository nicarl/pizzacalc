import validator from 'validator';

export function validatePositiveFloat(value: string): boolean {
  return validator.isFloat(value, { min: 0 });
}

export function validatePositiveInt(value: string): boolean {
  return validator.isInt(value, { min: 1 });
}
