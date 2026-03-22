import { InputAdornment } from '@mui/material';
import type { ReactElement } from 'react';
import {
  validatePositiveFloat,
  validatePositiveInt,
} from '../../util/validation';
import { InputForm } from '../InputForm/InputForm';

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
          props.setPizzaNumber(parseInt(value, 10));
        }}
        validation={validatePositiveInt}
        dialButton={true}
      />
      <InputForm
        label={'Doughball weight'}
        helpText={helpTextFloat}
        value={props.doughballWeight}
        setValue={(value: string) => {
          props.setDoughballWeight(parseFloat(value));
        }}
        validation={validatePositiveFloat}
        endAdornment={massAdornment}
      />
      <InputForm
        label={'Water content'}
        helpText={helpTextFloat}
        value={props.waterContent}
        setValue={(value: string) => {
          props.setWaterContent(parseFloat(value));
        }}
        validation={validatePositiveFloat}
        endAdornment={percentAdornment}
      />
      <InputForm
        label={'Salt content'}
        helpText={helpTextFloat}
        value={props.saltContent}
        setValue={(value: string) => {
          props.setSaltContent(parseFloat(value));
        }}
        validation={validatePositiveFloat}
        endAdornment={percentAdornment}
      />
      <InputForm
        label={'Yeast content'}
        helpText={helpTextFloat}
        value={props.yeastContent}
        setValue={(value: string) => {
          props.setYeastContent(parseFloat(value));
        }}
        validation={validatePositiveFloat}
        endAdornment={percentAdornment}
      />
    </div>
  );
}
