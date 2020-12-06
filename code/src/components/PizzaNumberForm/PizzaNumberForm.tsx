import { ReactElement, useState } from 'react';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import validator from 'validator';

interface Props {
  pizzaNumber: number;
  setPizzaNumber: (pizzaNumber: number) => void;
}

export function PizzaNumberForm(props: Props): ReactElement {
  const [inputIsCorrect, setInputIsCorrect] = useState<boolean>(true);

  function handlePizzaNumberChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const value = event.target.value;
    if (validator.isInt(value, { min: 1 })) {
      setInputIsCorrect(true);
      props.setPizzaNumber(validator.toInt(value));
    } else {
      setInputIsCorrect(false);
    }
  }

  return (
    <div>
      <TextField
        id="pizza-number"
        label="Number of pizzas"
        type="number"
        data-testid="pizza-number"
        error={!inputIsCorrect}
        onChange={handlePizzaNumberChange}
        defaultValue={props.pizzaNumber}
        required={true}
        helperText={
          inputIsCorrect ? ' ' : 'Please insert a whole positive number.'
        }
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
}
