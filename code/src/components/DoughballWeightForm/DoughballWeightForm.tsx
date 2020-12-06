import { ReactElement, useState } from 'react';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import validator from 'validator';

interface Props {
  doughballWeight: number;
  setDoughballWeight: (doughballWeight: number) => void;
}

export function DoughballWeightForm(props: Props): ReactElement {
  const [inputIsCorrect, setInputIsCorrect] = useState<boolean>(true);

  function handleDoughballWeightChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const value = event.target.value;
    if (validator.isFloat(value, { min: 0 })) {
      setInputIsCorrect(true);
      props.setDoughballWeight(validator.toFloat(value));
    } else {
      setInputIsCorrect(false);
    }
  }

  return (
    <div>
      <TextField
        id="doughball-weight"
        label="Doughball weight"
        type="number"
        data-testid="doughball-weight"
        error={!inputIsCorrect}
        onChange={handleDoughballWeightChange}
        defaultValue={props.doughballWeight}
        required={true}
        helperText={inputIsCorrect ? ' ' : 'Please insert a positive number.'}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
}
