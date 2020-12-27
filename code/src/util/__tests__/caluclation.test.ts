import {
  calculateFlourMass,
  calculateFractionalMass,
  calculateRecipe,
  PizzaRecipe,
} from '../calculations';
import each from 'jest-each';

describe('calculateFractionalMass', () => {
  each([
    [1000, 1000, 100],
    [100, 1000, 10],
    [900, 1000, 90],
    [10000, 1000, 1000],
    [152, 1000, 15.2],
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
    [500, 1, 100, 0, 0, 1000],
    [500, 1, 0, 100, 0, 1000],
    [500, 1, 0, 0, 100, 1000],
    [500, 1, 20, 20, 60, 1000],
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
      100,
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
