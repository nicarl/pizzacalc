import { ReactElement, useEffect, useState } from 'react';
import React from 'react';
import {
  calculateRecipe,
  defaultFormInput,
  PizzaRecipe,
} from '../../util/calculations';
import { InputForm } from '../InputForm/InputForm';
import {
  validatePositiveFloat,
  validatePositiveInt,
} from '../../util/validation';
import validator from 'validator';
import { InputAdornment } from '@material-ui/core';

interface InputBoxProps {
  setPizzaRecipe: (pizzaRecipe: PizzaRecipe) => void;
}

export function InputBox(props: InputBoxProps): ReactElement {
  const [pizzaNumber, setPizzaNumber] = useState<number>(
    defaultFormInput.pizzaNumber,
  );
  const [waterContent, setWaterContent] = useState<number>(
    defaultFormInput.waterContent,
  );
  const [doughballWeight, setDoughballWeight] = useState<number>(
    defaultFormInput.doughballWeight,
  );
  const [yeastContent, setYeastContent] = useState<number>(
    defaultFormInput.yeastContent,
  );
  const [saltContent, setSaltContent] = useState<number>(
    defaultFormInput.saltContent,
  );
  const setRecipe = props.setPizzaRecipe;

  useEffect(() => {
    setRecipe(
      calculateRecipe(
        pizzaNumber,
        waterContent,
        yeastContent,
        saltContent,
        doughballWeight,
      ),
    );
  }, [
    pizzaNumber,
    waterContent,
    doughballWeight,
    yeastContent,
    saltContent,
    setRecipe,
  ]);

  const helpTextFloat = 'Please insert a positive number.';
  const helpTextInt = 'Please insert a positive integer.';

  const massAdornment = <InputAdornment position="end">g</InputAdornment>;
  const percentAdornment = <InputAdornment position="end">%</InputAdornment>;

  return (
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
        endAdornment={massAdornment}
      />
      <InputForm
        label={'Water content'}
        helpText={helpTextFloat}
        value={waterContent}
        setValue={(value: string) => {
          setWaterContent(validator.toFloat(value));
        }}
        validation={validatePositiveFloat}
        endAdornment={percentAdornment}
      />
      <InputForm
        label={'Salt content'}
        helpText={helpTextFloat}
        value={saltContent}
        setValue={(value: string) => {
          setSaltContent(validator.toFloat(value));
        }}
        validation={validatePositiveFloat}
        endAdornment={percentAdornment}
      />
      <InputForm
        label={'Yeast content'}
        helpText={helpTextFloat}
        value={yeastContent}
        setValue={(value: string) => {
          setYeastContent(validator.toFloat(value));
        }}
        validation={validatePositiveFloat}
        endAdornment={percentAdornment}
      />
    </div>
  );
}
