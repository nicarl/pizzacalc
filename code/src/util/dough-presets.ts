export type DoughType = 'neapolitan' | 'new-york' | 'detroit' | 'focaccia';
export type OvenType = 'home' | 'professional';

export interface FermentationPhase {
  name: string;
  environment: 'room' | 'fridge';
  baseDurationMin: number;
  description: string;
}

export interface FermentationProfile {
  referenceTemp: number;
  phases: FermentationPhase[];
  prepTimeMin: number;
  bakeTimeMin: number;
}

export interface PreparationStep {
  name: string;
  instruction: string;
  tip?: string;
}

export interface DoughPreset {
  name: string;
  doughballWeight: number;
  waterPercent: number;
  saltPercent: number;
  yeastPercent: number;
  oilPercent: number;
  ovenDefault: OvenType;
  isPanStyle: boolean;
  professionalWaterPercent?: number;
  fermentation: FermentationProfile;
  steps: PreparationStep[];
}

export const doughPresets: Record<DoughType, DoughPreset> = {
  neapolitan: {
    name: 'Neapolitan',
    doughballWeight: 250,
    waterPercent: 65,
    saltPercent: 2.8,
    yeastPercent: 0.05,
    oilPercent: 0,
    ovenDefault: 'home',
    isPanStyle: false,
    professionalWaterPercent: 60,
    fermentation: {
      referenceTemp: 20,
      phases: [
        {
          name: 'Bulk ferment',
          environment: 'room',
          baseDurationMin: 480,
          description: 'Cover and let rise at room temperature',
        },
        {
          name: 'Shape doughballs',
          environment: 'room',
          baseDurationMin: 300,
          description:
            'Divide and shape into balls, proof in covered containers',
        },
      ],
      prepTimeMin: 30,
      bakeTimeMin: 2,
    },
    steps: [
      {
        name: 'Mix dry ingredients',
        instruction: 'Combine flour and salt in a large bowl.',
      },
      {
        name: 'Add water',
        instruction:
          'Dissolve yeast in water, then add to flour mixture. Mix until no dry flour remains.',
        tip: 'Use room-temperature water (~20°C) for best results.',
      },
      {
        name: 'Knead',
        instruction:
          'Knead on an unfloured surface for 10-15 minutes until smooth and elastic.',
        tip: 'The dough should feel tacky but not stick to your hands.',
      },
      {
        name: 'Bulk ferment',
        instruction:
          'Place in a lightly oiled bowl, cover with a damp cloth or plastic wrap. Let rise at room temperature.',
      },
      {
        name: 'Shape doughballs',
        instruction:
          'Divide into equal portions and shape into tight balls. Place in a floured container, cover.',
      },
      {
        name: 'Final proof',
        instruction:
          'Let doughballs proof at room temperature until doubled in size.',
      },
      {
        name: 'Stretch and top',
        instruction:
          'Gently stretch each ball by hand into a round disc. Add toppings.',
        tip: 'Do not use a rolling pin — it degasses the dough.',
      },
    ],
  },
  'new-york': {
    name: 'New York',
    doughballWeight: 350,
    waterPercent: 63,
    saltPercent: 2.0,
    yeastPercent: 0.4,
    oilPercent: 3,
    ovenDefault: 'home',
    isPanStyle: false,
    fermentation: {
      referenceTemp: 21,
      phases: [
        {
          name: 'Cold ferment',
          environment: 'fridge',
          baseDurationMin: 2880,
          description: 'Ball immediately and refrigerate',
        },
        {
          name: 'Warm up',
          environment: 'room',
          baseDurationMin: 120,
          description: 'Remove from fridge, let come to room temperature',
        },
      ],
      prepTimeMin: 30,
      bakeTimeMin: 10,
    },
    steps: [
      {
        name: 'Mix dry ingredients',
        instruction:
          'Combine flour, salt, and sugar (if using) in a large bowl.',
      },
      {
        name: 'Add wet ingredients',
        instruction:
          'Dissolve yeast in water, add olive oil. Pour into flour mixture and mix until combined.',
      },
      {
        name: 'Knead',
        instruction:
          'Knead for 8-10 minutes until smooth. The dough should pass the windowpane test.',
        tip: 'Add oil to your hands instead of flour to prevent sticking.',
      },
      {
        name: 'Ball and refrigerate',
        instruction:
          'Divide into balls immediately. Place in oiled containers, cover tightly, and refrigerate.',
      },
      {
        name: 'Remove and warm up',
        instruction:
          'Take dough out of the fridge and let come to room temperature before baking.',
      },
      {
        name: 'Stretch and top',
        instruction:
          'Stretch into rounds on a floured surface. Add sauce and toppings.',
        tip: 'Preheat your oven with a pizza steel for at least 45 minutes at max temperature.',
      },
    ],
  },
  detroit: {
    name: 'Detroit',
    doughballWeight: 525,
    waterPercent: 70,
    saltPercent: 2.0,
    yeastPercent: 1.0,
    oilPercent: 2,
    ovenDefault: 'home',
    isPanStyle: true,
    fermentation: {
      referenceTemp: 22,
      phases: [
        {
          name: 'Cold ferment',
          environment: 'fridge',
          baseDurationMin: 1440,
          description: 'Cover bowl and refrigerate',
        },
        {
          name: 'Pan proof',
          environment: 'room',
          baseDurationMin: 120,
          description: 'Stretch into oiled pan, let rise until puffy',
        },
      ],
      prepTimeMin: 20,
      bakeTimeMin: 15,
    },
    steps: [
      {
        name: 'Mix ingredients',
        instruction:
          'Combine flour, salt, yeast, oil, and water. Mix until a shaggy dough forms.',
      },
      {
        name: 'Knead briefly',
        instruction:
          'Knead for 5 minutes. The dough will be wet and sticky — this is normal.',
        tip: 'Use wet hands instead of adding flour.',
      },
      {
        name: 'Cold ferment',
        instruction: 'Place in an oiled bowl, cover tightly, and refrigerate.',
      },
      {
        name: 'Oil the pan',
        instruction:
          'Generously oil a 25x35cm Detroit-style pan or similar steel pan.',
        tip: 'Use 30-45ml of olive oil or butter for the authentic fried-edge crust.',
      },
      {
        name: 'Stretch into pan',
        instruction:
          'Press and stretch the cold dough into the oiled pan. If it springs back, let it rest 10 minutes and try again.',
      },
      {
        name: 'Pan proof',
        instruction:
          'Cover and let rise at room temperature until the dough fills the pan and is puffy.',
      },
      {
        name: 'Top and bake',
        instruction:
          'Add cheese to the edges first (touching the pan), then sauce in racing stripes, then toppings.',
        tip: 'Use a good melting cheese like mozzarella, young gouda, or a mix.',
      },
    ],
  },
  focaccia: {
    name: 'Focaccia',
    doughballWeight: 950,
    waterPercent: 78,
    saltPercent: 2.1,
    yeastPercent: 0.3,
    oilPercent: 7,
    ovenDefault: 'home',
    isPanStyle: true,
    fermentation: {
      referenceTemp: 21,
      phases: [
        {
          name: 'Bulk ferment',
          environment: 'room',
          baseDurationMin: 720,
          description: 'Cover and let rise at room temperature',
        },
        {
          name: 'Pan proof',
          environment: 'room',
          baseDurationMin: 60,
          description: 'Transfer to oiled pan, let spread and rise',
        },
      ],
      prepTimeMin: 20,
      bakeTimeMin: 20,
    },
    steps: [
      {
        name: 'Mix ingredients',
        instruction:
          'Combine flour, salt, yeast, and water. Add olive oil and mix until incorporated.',
        tip: 'The dough will be very wet and sticky — this is expected for high-hydration focaccia.',
      },
      {
        name: 'Stretch and fold',
        instruction:
          'Perform 3-4 sets of stretch-and-folds, about 30 minutes apart, during the first part of the rise.',
      },
      {
        name: 'Overnight rise',
        instruction: 'Cover the bowl and let rise at room temperature.',
      },
      {
        name: 'Oil the pan',
        instruction:
          'Pour a generous amount of olive oil into a half-sheet pan (46x33cm).',
      },
      {
        name: 'Transfer to pan',
        instruction:
          'Gently pour the dough into the oiled pan. Use oiled fingers to spread it toward the edges.',
        tip: 'If the dough resists stretching, let it rest 15 minutes and try again.',
      },
      {
        name: 'Dimple and top',
        instruction:
          'Press your fingers into the dough to create dimples. Drizzle with olive oil, sprinkle with flaky salt.',
      },
      {
        name: 'Final proof',
        instruction: 'Let rest until slightly puffy, then bake.',
      },
    ],
  },
};

export const doughTypeList: DoughType[] = [
  'neapolitan',
  'new-york',
  'detroit',
  'focaccia',
];

export function getDoughPreset(type: DoughType): DoughPreset {
  return doughPresets[type];
}
