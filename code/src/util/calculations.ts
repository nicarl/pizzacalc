export interface RecipeInput {
  pizzaCount: number;
  doughballWeight: number;
  waterPercent: number;
  saltPercent: number;
  yeastPercent: number;
  oilPercent: number;
}

export interface PizzaRecipe {
  flourMass: number;
  waterMass: number;
  saltMass: number;
  yeastMass: number;
  oilMass: number;
}

export function calculateRecipe(input: RecipeInput): PizzaRecipe {
  const totalDough = input.pizzaCount * input.doughballWeight;

  if (totalDough <= 0) {
    return {
      flourMass: 0,
      waterMass: 0,
      saltMass: 0,
      yeastMass: 0,
      oilMass: 0,
    };
  }

  const waterFraction = input.waterPercent / 100;
  const saltFraction = input.saltPercent / 100;
  const yeastFraction = input.yeastPercent / 100;
  const oilFraction = input.oilPercent / 100;

  const flourMass =
    totalDough /
    (1 + waterFraction + saltFraction + yeastFraction + oilFraction);

  return {
    flourMass,
    waterMass: flourMass * waterFraction,
    saltMass: flourMass * saltFraction,
    yeastMass: flourMass * yeastFraction,
    oilMass: flourMass * oilFraction,
  };
}
