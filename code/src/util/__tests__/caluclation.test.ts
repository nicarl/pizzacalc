import {
  calculateFlourMass,
  calculateFractionalMass,
  calculateRecipe,
  PizzaRecipe,
} from '../calculations';
import each from 'jest-each';

describe('calculateFractionalMass', () => {
  each([
    [1000, 1000, 1.0],
    [100, 1000, 0.1],
    [900, 1000, 0.9],
    [10000, 1000, 10],
    [152, 1000, 0.152],
  ]).it(
    'yields %s for %s gramm and a percentage of %s',
    (expected: number, flourMass: number, fraction: number) => {
      expect(calculateFractionalMass(flourMass, fraction)).toBe(expected);
    },
  );
});

describe('calculateFlourMass', () => {
  each([
    [1000, 1, 0, 0, 0, 1000],
    [0, 0, 0, 0, 0, 1000],
    [500, 1, 1.0, 0, 0, 1000],
    [500, 1, 0, 1.0, 0, 1000],
    [500, 1, 0, 0, 1.0, 1000],
    [500, 1, 0.2, 0.2, 0.6, 1000],
  ]).it(
    'yields %s for %s pizza, %s waterContent, %s yeastContent, %s saltContent, %s doughballWeight',
    (
      expected: number,
      pizzaNumber: number,
      waterContent: number,
      yeastContent: number,
      saltContent: number,
      doughballWeight: number,
    ) => {
      expect(
        calculateFlourMass(
          pizzaNumber,
          waterContent,
          yeastContent,
          saltContent,
          doughballWeight,
        ),
      ).toBe(expected);
    },
  );
});

describe('calculateRecipe', () => {
  each([
    [
      { flourMass: 100, saltMass: 0, waterMass: 0, yeastMass: 0 },
      1,
      0.0,
      0.0,
      0.0,
      100,
    ],
    [
      { flourMass: 0, saltMass: 0, waterMass: 0, yeastMass: 0 },
      0,
      0.0,
      0.0,
      0.0,
      100,
    ],
    [
      { flourMass: 400, saltMass: 0, waterMass: 0, yeastMass: 0 },
      2,
      0.0,
      0.0,
      0.0,
      200,
    ],
    [
      { flourMass: 50, saltMass: 0, waterMass: 50, yeastMass: 0 },
      1,
      1.0,
      0.0,
      0.0,
      100,
    ],
  ]).it(
    '',
    (
      expected: PizzaRecipe,
      pizzaNumber: number,
      waterContent: number,
      yeastContent: number,
      saltContent: number,
      doughballWeight: number,
    ) => {
      expect(
        calculateRecipe(
          pizzaNumber,
          waterContent,
          yeastContent,
          saltContent,
          doughballWeight,
        ),
      ).toEqual(expected);
    },
  );
});
