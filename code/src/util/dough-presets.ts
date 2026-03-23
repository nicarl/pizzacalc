export type DoughType = 'neapolitan' | 'new-york' | 'detroit' | 'focaccia';
export type OvenType = 'home' | 'professional';

export interface FermentationPhase {
  name: string;
  environment: 'room' | 'fridge';
  baseDurationMin: number;
  referenceTemp: number;
  description: string;
}

export interface FermentationProfile {
  phases: FermentationPhase[];
  prepTimeMin: number;
}

export interface PreparationStep {
  name: string;
  instruction: string;
  tip?: string;
}

export interface BakingInstruction {
  tempC: number;
  tempF: number;
  timeMin: number;
  description: string;
}

export interface DoughPreset {
  name: string;
  doughballWeight: number;
  waterPercent: number;
  saltPercent: number;
  yeastPercent: number;
  oilPercent: number;
  sugarPercent?: number;
  ovenDefault: OvenType;
  isPanStyle: boolean;
  professionalWaterPercent?: number;
  fermentation: FermentationProfile;
  steps: PreparationStep[];
  bakingInstructions: Record<OvenType, BakingInstruction>;
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
      phases: [
        {
          name: 'Bulk ferment',
          environment: 'room',
          baseDurationMin: 480,
          referenceTemp: 20,
          description: 'Cover and let rise at room temperature',
        },
        {
          name: 'Shape doughballs',
          environment: 'room',
          baseDurationMin: 300,
          referenceTemp: 20,
          description:
            'Divide and shape into balls, proof in covered containers',
        },
      ],
      prepTimeMin: 30,
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
        tip: 'Use room-temperature water for best results.',
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
        tip: 'Total fermentation (bulk + proof) sweet spot is 12-24 hours at room temperature.',
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
    bakingInstructions: {
      home: {
        tempC: 275,
        tempF: 530,
        timeMin: 6,
        description:
          'Max oven temperature with pizza stone or steel, 5-7 minutes.',
      },
      professional: {
        tempC: 485,
        tempF: 905,
        timeMin: 2,
        description:
          'Wood-fired oven, Ooni, or Roccbox at full heat, 60-90 seconds.',
      },
    },
  },
  'new-york': {
    name: 'New York',
    doughballWeight: 350,
    waterPercent: 63,
    saltPercent: 2.0,
    yeastPercent: 0.4,
    oilPercent: 3,
    sugarPercent: 1.5,
    ovenDefault: 'home',
    isPanStyle: false,
    fermentation: {
      phases: [
        {
          name: 'Cold ferment',
          environment: 'fridge',
          baseDurationMin: 2880,
          referenceTemp: 3,
          description: 'Ball immediately and refrigerate',
        },
        {
          name: 'Warm up',
          environment: 'room',
          baseDurationMin: 120,
          referenceTemp: 21,
          description: 'Remove from fridge, let come to room temperature',
        },
      ],
      prepTimeMin: 30,
    },
    steps: [
      {
        name: 'Mix dry ingredients',
        instruction: 'Combine flour, salt, and sugar in a large bowl.',
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
        tip: 'Sweet spot is 48 hours cold ferment (range: 24-72 hours).',
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
    bakingInstructions: {
      home: {
        tempC: 275,
        tempF: 530,
        timeMin: 9,
        description:
          'Max oven temperature with pizza steel, preheat 45+ minutes, bake 8-10 minutes.',
      },
      professional: {
        tempC: 290,
        tempF: 550,
        timeMin: 7,
        description: 'Deck oven, 6-8 minutes.',
      },
    },
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
      phases: [
        {
          name: 'Cold ferment',
          environment: 'fridge',
          baseDurationMin: 1440,
          referenceTemp: 3,
          description: 'Cover bowl and refrigerate',
        },
        {
          name: 'Pan proof',
          environment: 'room',
          baseDurationMin: 120,
          referenceTemp: 22,
          description: 'Stretch into oiled pan, let rise until puffy',
        },
      ],
      prepTimeMin: 20,
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
        tip: '24 hours cold ferment is standard, followed by 1.5-2.5 hours pan proof at room temperature.',
      },
      {
        name: 'Oil the pan',
        instruction:
          'Generously oil a 25x35cm (10x14") Detroit-style pan or similar steel pan.',
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
    bakingInstructions: {
      home: {
        tempC: 260,
        tempF: 500,
        timeMin: 14,
        description:
          'Bake on lowest rack for 12-15 minutes until edges are deeply caramelized.',
      },
      professional: {
        tempC: 260,
        tempF: 500,
        timeMin: 14,
        description:
          'Bake for 12-15 minutes until edges are deeply caramelized.',
      },
    },
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
      phases: [
        {
          name: 'Bulk ferment',
          environment: 'room',
          baseDurationMin: 720,
          referenceTemp: 21,
          description: 'Cover and let rise at room temperature',
        },
        {
          name: 'Pan proof',
          environment: 'room',
          baseDurationMin: 60,
          referenceTemp: 21,
          description: 'Transfer to oiled pan, let spread and rise',
        },
      ],
      prepTimeMin: 20,
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
        tip: 'Perform at 30, 60, 90, and 120 minutes after mixing.',
      },
      {
        name: 'Overnight rise',
        instruction: 'Cover the bowl and let rise at room temperature.',
        tip: '12-14 hours at room temperature is ideal.',
      },
      {
        name: 'Oil the pan',
        instruction:
          'Pour a generous amount of olive oil into a half-sheet pan (46x33cm / 18x13").',
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
    bakingInstructions: {
      home: {
        tempC: 230,
        tempF: 450,
        timeMin: 22,
        description: 'Bake for 20-25 minutes until golden brown.',
      },
      professional: {
        tempC: 230,
        tempF: 450,
        timeMin: 22,
        description: 'Bake for 20-25 minutes until golden brown.',
      },
    },
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
