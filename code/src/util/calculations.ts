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
    (doughballWeight * pizzaNumber) /
    (1 + waterContent + yeastContent + saltContent)
  );
}

export function calculateFractionalMass(
  flourMass: number,
  fraction: number,
): number {
  return flourMass * fraction;
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
