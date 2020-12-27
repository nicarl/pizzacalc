export interface PizzaRecipe {
  yeastMass: number;
  flourMass: number;
  waterMass: number;
  saltMass: number;
}

export function calculateFlourMass(
  pizzaNumber: number,
  waterContent: number,
  yeastContent: number,
  saltContent: number,
  doughballWeight: number,
): number {
  return (
    ((doughballWeight * pizzaNumber) /
      (100 + waterContent + yeastContent + saltContent)) *
    100
  );
}

export function calculateFractionalMass(
  flourMass: number,
  fraction: number,
): number {
  return (flourMass * fraction) / 100;
}

export function calculateRecipe(
  pizzaNumber: number,
  waterContent: number,
  yeastContent: number,
  saltContent: number,
  doughballWeight: number,
): PizzaRecipe {
  const flourMass = calculateFlourMass(
    pizzaNumber,
    waterContent,
    yeastContent,
    saltContent,
    doughballWeight,
  );
  const waterMass = calculateFractionalMass(flourMass, waterContent);
  const saltMass = calculateFractionalMass(flourMass, saltContent);
  const yeastMass = calculateFractionalMass(flourMass, yeastContent);
  return {
    yeastMass: yeastMass,
    flourMass: flourMass,
    waterMass: waterMass,
    saltMass: saltMass,
  };
}

export interface FormInput {
  pizzaNumber: number;
  waterContent: number;
  doughballWeight: number;
  yeastContent: number;
  saltContent: number;
}

export const defaultFormInput: FormInput = {
  pizzaNumber: 2,
  waterContent: 62.0,
  doughballWeight: 270,
  yeastContent: 0.2,
  saltContent: 3.0,
};

export const defaultRecipe: PizzaRecipe = calculateRecipe(
  defaultFormInput.pizzaNumber,
  defaultFormInput.waterContent,
  defaultFormInput.doughballWeight,
  defaultFormInput.yeastContent,
  defaultFormInput.saltContent,
);
