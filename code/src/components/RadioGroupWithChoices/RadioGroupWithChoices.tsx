import React, { ReactElement } from 'react';
import { RadioData } from '../NormalMode/types';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

interface RadioGroupProps {
  choices: RadioData;
  value: undefined | string;
  setChoice: (selection: string) => void;
  label: string;
}

export function RadioGroupWithChoices(props: RadioGroupProps): ReactElement {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setChoice(event.target.value);
  };
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label={props.label}
        name={props.label}
        value={props.value}
        onChange={handleChange}
      >
        {Object.keys(props.choices).map(choice => {
          return (
            <FormControlLabel
              value={props.choices[choice].id}
              control={<Radio color="primary" />}
              label={props.choices[choice].description}
              key={'key-radio-group-' + props.choices[choice].id}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
