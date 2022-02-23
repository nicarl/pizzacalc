import { ReactElement } from 'react';
import React from 'react';
import { InputForm } from '../InputForm/InputForm';
import {
  validatePositiveFloat,
  validatePositiveInt,
} from '../../util/validation';
import validator from 'validator';
import { InputAdornment } from '@mui/material';

interface InputBoxProps {
  pizzaNumber: number;
  setPizzaNumber: (newValue: number) => void;
  waterContent: number;
  setWaterContent: (newValue: number) => void;
  yeastContent: number;
  setYeastContent: (newValue: number) => void;
  saltContent: number;
  setSaltContent: (newValue: number) => void;
  doughballWeight: number;
  setDoughballWeight: (newValue: number) => void;
}

export function InputBox(props: InputBoxProps): ReactElement {
  const helpTextFloat = 'Please insert a positive number.';
  const helpTextInt = 'Please insert a positive integer.';

  const massAdornment = <InputAdornment position="end">g</InputAdornment>;
  const percentAdornment = <InputAdornment position="end">%</InputAdornment>;

  return (
    <div>
      <InputForm
        label={'Number of pizzas'}
        helpText={helpTextInt}
        value={props.pizzaNumber}
        setValue={(value: string) => {
          props.setPizzaNumber(validator.toInt(value));
        }}
        validation={validatePositiveInt}
        dialButton={true}
      />
      <InputForm
        label={'Doughball weight'}
        helpText={helpTextFloat}
        value={props.doughballWeight}
        setValue={(value: string) => {
          props.setDoughballWeight(validator.toFloat(value));
        }}
        validation={validatePositiveFloat}
        endAdornment={massAdornment}
      />
      <InputForm
        label={'Water content'}
        helpText={helpTextFloat}
        value={props.waterContent}
        setValue={(value: string) => {
          props.setWaterContent(validator.toFloat(value));
        }}
        validation={validatePositiveFloat}
        endAdornment={percentAdornment}
      />
      <InputForm
        label={'Salt content'}
        helpText={helpTextFloat}
        value={props.saltContent}
        setValue={(value: string) => {
          props.setSaltContent(validator.toFloat(value));
        }}
        validation={validatePositiveFloat}
        endAdornment={percentAdornment}
      />
      <InputForm
        label={'Yeast content'}
        helpText={helpTextFloat}
        value={props.yeastContent}
        setValue={(value: string) => {
          props.setYeastContent(validator.toFloat(value));
        }}
        validation={validatePositiveFloat}
        endAdornment={percentAdornment}
      />
    </div>
  );
}
