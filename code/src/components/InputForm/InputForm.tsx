import TextField from '@mui/material/TextField';
import type React from 'react';
import { type ReactElement, useState } from 'react';

interface Props {
  label: string;
  helpText: string;
  value: number;
  setValue: (value: string) => void;
  validation: (value: string) => boolean;
  dialButton?: boolean;
  testId?: string;
  endAdornment?: React.ReactElement;
}

export function InputForm(props: Props): ReactElement {
  const [inputIsCorrect, setInputIsCorrect] = useState<boolean>(
    props.validation(props.value.toString()),
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const value: string = event.target.value;
    if (props.validation(value)) {
      setInputIsCorrect(true);
      props.setValue(value);
    } else {
      setInputIsCorrect(false);
    }
  }

  return (
    <div>
      <TextField
        data-testid={props.testId}
        label={props.label}
        error={!inputIsCorrect}
        type={props.dialButton ? 'number' : undefined}
        onChange={handleInputChange}
        defaultValue={props.value}
        required={true}
        helperText={inputIsCorrect ? ' ' : props.helpText}
        InputProps={{ endAdornment: props.endAdornment }}
        fullWidth
      />
    </div>
  );
}
