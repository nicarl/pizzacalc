import { describe, expect, it } from 'vitest';
import { calculateRecipe, type RecipeInput } from '../calculations';

describe('calculateRecipe', () => {
  it('calculates basic recipe without oil', () => {
    const input: RecipeInput = {
      pizzaCount: 4,
      doughballWeight: 250,
      waterPercent: 65,
      saltPercent: 2.8,
      yeastPercent: 0.05,
      oilPercent: 0,
    };
    const recipe = calculateRecipe(input);
    // Total dough = 4 * 250 = 1000g
    // flour = 1000 / (1 + 0.65 + 0.028 + 0.0005 + 0) = 1000 / 1.6785
    expect(recipe.flourMass).toBeCloseTo(595.8, 0);
    expect(recipe.waterMass).toBeCloseTo(595.8 * 0.65, 0);
    expect(recipe.saltMass).toBeCloseTo(595.8 * 0.028, 0);
    expect(recipe.yeastMass).toBeCloseTo(595.8 * 0.0005, 1);
    expect(recipe.oilMass).toBe(0);
  });

  it('calculates recipe with oil', () => {
    const input: RecipeInput = {
      pizzaCount: 2,
      doughballWeight: 950,
      waterPercent: 78,
      saltPercent: 2.1,
      yeastPercent: 0.3,
      oilPercent: 7,
    };
    const recipe = calculateRecipe(input);
    // Total dough = 2 * 950 = 1900g
    // flour = 1900 / (1 + 0.78 + 0.021 + 0.003 + 0.07) = 1900 / 1.874
    expect(recipe.flourMass).toBeCloseTo(1013.9, 0);
    expect(recipe.oilMass).toBeCloseTo(1013.9 * 0.07, 0);
  });

  it('returns zero recipe for zero pizzas', () => {
    const input: RecipeInput = {
      pizzaCount: 0,
      doughballWeight: 250,
      waterPercent: 65,
      saltPercent: 2.8,
      yeastPercent: 0.05,
      oilPercent: 0,
    };
    const recipe = calculateRecipe(input);
    expect(recipe.flourMass).toBe(0);
    expect(recipe.waterMass).toBe(0);
    expect(recipe.saltMass).toBe(0);
    expect(recipe.yeastMass).toBe(0);
    expect(recipe.oilMass).toBe(0);
  });
});
