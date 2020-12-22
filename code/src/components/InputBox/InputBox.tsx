import { ReactElement, useEffect, useState } from 'react';
import React from 'react';
import { calculateRecipe, PizzaRecipe } from '../../util/calculations';
import { InputForm } from '../InputForm/InputForm';
import {
  validatePositiveFloat,
  validatePositiveInt,
} from '../../util/validation';
import validator from 'validator';

export function InputBox(): ReactElement {
  const [pizzaNumber, setPizzaNumber] = useState<number>(2);
  const [waterContent, setWaterContent] = useState<number>(0.62);
  const [doughballWeight, setDoughballWeight] = useState<number>(270);
  const [yeastContent, setYeastContent] = useState<number>(0.002);
  const [saltContent, setSaltContent] = useState<number>(0.03);

  const [, setPizzaRecipe] = useState<PizzaRecipe>(
    calculateRecipe(
      pizzaNumber,
      waterContent,
      yeastContent,
      saltContent,
      doughballWeight,
    ),
  );

  useEffect(() => {
    setPizzaRecipe(
      calculateRecipe(
        pizzaNumber,
        waterContent,
        yeastContent,
        saltContent,
        doughballWeight,
      ),
    );
  }, [pizzaNumber, waterContent, doughballWeight, yeastContent, saltContent]);

  const helpTextFloat = 'Please insert a positive number.';
  const helpTextInt = 'Please insert a whole positive number.';

  return (
    <div>
      <div>
        <InputForm
          label={'Number of pizzas'}
          helpText={helpTextInt}
          value={pizzaNumber}
          setValue={(value: string) => {
            setPizzaNumber(validator.toInt(value));
          }}
          validation={validatePositiveInt}
          dialButton={true}
        />
        <InputForm
          label={'Doughball weight'}
          helpText={helpTextFloat}
          value={doughballWeight}
          setValue={(value: string) => {
            setDoughballWeight(validator.toFloat(value));
          }}
          validation={validatePositiveFloat}
        />
        <InputForm
          label={'Water content'}
          helpText={helpTextFloat}
          value={waterContent}
          setValue={(value: string) => {
            setWaterContent(validator.toFloat(value));
          }}
          validation={validatePositiveFloat}
        />
        <InputForm
          label={'Salt content'}
          helpText={helpTextFloat}
          value={saltContent}
          setValue={(value: string) => {
            setSaltContent(validator.toFloat(value));
          }}
          validation={validatePositiveFloat}
        />
        <InputForm
          label={'Yeast content'}
          helpText={helpTextFloat}
          value={yeastContent}
          setValue={(value: string) => {
            setYeastContent(validator.toFloat(value));
          }}
          validation={validatePositiveFloat}
        />
      </div>
    </div>
  );
}
