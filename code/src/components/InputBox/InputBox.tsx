import { ReactElement, useState } from 'react';
import React from 'react';
import TextField from '@material-ui/core/TextField';

export function InputBox(): ReactElement {
  const [waterContent, setWaterContent] = useState<number>(62);
  const [weightDoughball, setWeightDoughBall] = useState<number>(270);
  const [numPizza, setNumPizza] = useState<number>(2);

  function handleWaterContentChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setWaterContent(parseFloat(event.target.value));
  }

  function handleWeightDoughballChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setWeightDoughBall(parseFloat(event.target.value));
  }

  function handleNumPizzaChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setNumPizza(parseInt(event.target.value));
  }

  return (
    <div>
      <div>
        <TextField
          id="standard-number"
          label="Number of pizzas"
          type="number"
          defaultValue={numPizza}
          onChange={handleNumPizzaChange}
          required={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-number"
          label="Weight of doughball"
          type="number"
          defaultValue={weightDoughball}
          onChange={handleWeightDoughballChange}
          required={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <TextField
          id="standard-number"
          label="Water content"
          type="number"
          defaultValue={waterContent}
          onChange={handleWaterContentChange}
          required={true}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </div>
  );
}
