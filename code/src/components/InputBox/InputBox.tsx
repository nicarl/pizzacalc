import { ReactElement, useState } from 'react';
import React from 'react';
import { PizzaNumberForm } from '../PizzaNumberForm/PizzaNumberForm';
import { WaterContentForm } from '../WaterContentForm/WaterContentForm';
import { DoughballWeightForm } from '../DoughballWeightForm/DoughballWeightForm';
import { YeastContentForm } from '../YeastContentForm/YeastContentForm';

export function InputBox(): ReactElement {
  const [pizzaNumber, setPizzaNumber] = useState<number>(2);
  const [waterContent, setWaterContent] = useState<number>(62);
  const [doughballWeight, setDoughballWeight] = useState<number>(270);
  const [yeastContent, setYeastContent] = useState<number>(0.02);

  return (
    <div>
      <PizzaNumberForm
        pizzaNumber={pizzaNumber}
        setPizzaNumber={setPizzaNumber}
      />
      <DoughballWeightForm
        doughballWeight={doughballWeight}
        setDoughballWeight={setDoughballWeight}
      />
      <WaterContentForm
        waterContent={waterContent}
        setWaterContent={setWaterContent}
      />
      <YeastContentForm
        yeastContent={yeastContent}
        setYeastContent={setYeastContent}
      />
    </div>
  );
}
