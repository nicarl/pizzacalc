import { ReactElement, useState } from 'react';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import validator from 'validator';

interface Props {
  waterContent: number;
  setWaterContent: (waterContent: number) => void;
}

export function WaterContentForm(props: Props): ReactElement {
  const [inputIsCorrect, setInputIsCorrect] = useState<boolean>(true);

  function handleWaterContentChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const value = event.target.value;
    if (validator.isFloat(value, { min: 0 })) {
      setInputIsCorrect(true);
      props.setWaterContent(validator.toFloat(value));
    } else {
      setInputIsCorrect(false);
    }
  }

  return (
    <div>
      <TextField
        id="water-content"
        label="Water content"
        type="number"
        data-testid="water-content"
        error={!inputIsCorrect}
        onChange={handleWaterContentChange}
        defaultValue={props.waterContent}
        required={true}
        helperText={inputIsCorrect ? ' ' : 'Please insert a positive number.'}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
}
