import { validatePositiveFloat, validatePositiveInt } from '../validation';

describe('validatePositiveFloat', () => {
  it('returns true for positive float', () => {
    expect(validatePositiveFloat('0.02')).toBe(true);
  });
  it('returns true for positive int', () => {
    expect(validatePositiveFloat('2')).toBe(true);
  });
  it('returns false for negative float', () => {
    expect(validatePositiveFloat('-0.02')).toBe(false);
  });
  it('returns false for alphabetic character', () => {
    expect(validatePositiveFloat('abc')).toBe(false);
  });
  it('return true for zero', () => {
    expect(validatePositiveFloat('0')).toBe(true);
  });
});

describe('validatePositiveInt', () => {
  it('returns false for positive float', () => {
    expect(validatePositiveInt('0.02')).toBe(false);
  });
  it('returns true for positive int', () => {
    expect(validatePositiveInt('2')).toBe(true);
  });
  it('returns false for negative float', () => {
    expect(validatePositiveInt('-0.02')).toBe(false);
  });
  it('returns false for alphabetic character', () => {
    expect(validatePositiveInt('abc')).toBe(false);
  });
  it('return false for negative int', () => {
    expect(validatePositiveInt('-2')).toBe(false);
  });
  it('return false for zero', () => {
    expect(validatePositiveInt('0')).toBe(false);
  });
});
