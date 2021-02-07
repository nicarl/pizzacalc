interface RadioDataDetails {
  id: string;
  description: string;
}

export interface RadioData {
  [key: string]: RadioDataDetails;
}

export const ovenTypes: RadioData = {
  homeOven: {
    id: 'homeOven',
    description: 'Home oven',
  },
  professionalOven: {
    id: 'professionalOven',
    description: 'Professional oven',
  },
};
