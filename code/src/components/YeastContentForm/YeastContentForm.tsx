import { ReactElement, useState } from 'react';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import validator from 'validator';

interface Props {
  yeastContent: number;
  setYeastContent: (yeastContent: number) => void;
}

export function YeastContentForm(props: Props): ReactElement {
  const [inputIsCorrect, setInputIsCorrect] = useState<boolean>(true);

  function handleYeastContentChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const value = event.target.value;
    if (validator.isFloat(value, { min: 0 })) {
      setInputIsCorrect(true);
      props.setYeastContent(validator.toFloat(value));
    } else {
      setInputIsCorrect(false);
    }
  }

  return (
    <div>
      <TextField
        id="yeast-content"
        label="Yeast content"
        type="number"
        data-testid="yeast-content"
        error={!inputIsCorrect}
        onChange={handleYeastContentChange}
        defaultValue={props.yeastContent}
        required={true}
        helperText={inputIsCorrect ? ' ' : 'Please insert a positive number.'}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
}
