import { describe, expect, it } from 'vitest';
import {
  validatePositiveFloat,
  validatePositiveInt,
  parseValidFloat,
  parseValidInt,
} from '../validation';

describe('validatePositiveFloat', () => {
  it('accepts positive numbers', () => {
    expect(validatePositiveFloat('3.14')).toBe(true);
    expect(validatePositiveFloat('0.5')).toBe(true);
    expect(validatePositiveFloat('100')).toBe(true);
  });

  it('accepts zero', () => {
    expect(validatePositiveFloat('0')).toBe(true);
  });

  it('rejects negative numbers', () => {
    expect(validatePositiveFloat('-1')).toBe(false);
  });

  it('rejects non-numeric strings', () => {
    expect(validatePositiveFloat('abc')).toBe(false);
    expect(validatePositiveFloat('')).toBe(false);
    expect(validatePositiveFloat(' ')).toBe(false);
  });
});

describe('validatePositiveInt', () => {
  it('accepts positive integers', () => {
    expect(validatePositiveInt('1')).toBe(true);
    expect(validatePositiveInt('99')).toBe(true);
  });

  it('rejects zero', () => {
    expect(validatePositiveInt('0')).toBe(false);
  });

  it('rejects decimals', () => {
    expect(validatePositiveInt('1.5')).toBe(false);
  });

  it('rejects non-numeric strings', () => {
    expect(validatePositiveInt('abc')).toBe(false);
    expect(validatePositiveInt('')).toBe(false);
  });
});

describe('parseValidFloat', () => {
  it('parses valid floats with fallback', () => {
    expect(parseValidFloat('3.14', 0)).toBe(3.14);
    expect(parseValidFloat('abc', 5)).toBe(5);
    expect(parseValidFloat('-1', 5)).toBe(5);
  });
});

describe('parseValidInt', () => {
  it('parses valid ints with fallback', () => {
    expect(parseValidInt('42', 1)).toBe(42);
    expect(parseValidInt('abc', 1)).toBe(1);
    expect(parseValidInt('0', 1)).toBe(1);
  });
});
