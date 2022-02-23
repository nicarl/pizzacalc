import { Slider } from '@mui/material';
import React, { ReactElement } from 'react';

interface PizzaSizeSliderProps {
  doughBallWeight: number;
  setDoughBallWeight: (newValue: number) => void;
}

interface SizeMapping {
  0: number;
  1: number;
  2: number;
}

const sizeToDoughBallWeightMapping: SizeMapping = {
  0: 150,
  1: 210,
  2: 250,
};

function doughBallWeightToSize(doughBallWeight: number): number {
  if (doughBallWeight === 150) {
    return 0;
  } else if (doughBallWeight === 250) {
    return 2;
  } else {
    return 1;
  }
}

function sizeToDoughBallWeight(size: 0 | 1 | 2): number {
  return sizeToDoughBallWeightMapping[size];
}

export function PizzaSizeSlider(props: PizzaSizeSliderProps): ReactElement {
  const handlePizzaSizeChange = (event: any, newValue: number | number[]) => {
    props.setDoughBallWeight(sizeToDoughBallWeight(newValue as 0 | 1 | 2));
  };

  return (
    <Slider
      defaultValue={doughBallWeightToSize(props.doughBallWeight)}
      onChange={handlePizzaSizeChange}
      step={null}
      valueLabelDisplay="off"
      min={0}
      max={2}
      data-testid="pizzaSizeSlider"
      marks={[
        {
          value: 0,
          label: 'small',
        },
        {
          value: 1,
          label: 'medium',
        },
        {
          value: 2,
          label: 'large',
        },
      ]}
    />
  );
}
