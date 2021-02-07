import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

interface ExpertSwitchProps {
  expertModeActive: boolean;
  setExpertModeActive: Dispatch<SetStateAction<boolean>>;
}

export function ExpertSwitch(props: ExpertSwitchProps): ReactElement {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    props.setExpertModeActive(event.target.checked);
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={props.expertModeActive}
            onChange={handleChange}
            name="expertMode"
            color="primary"
          />
        }
        label="Expert mode"
      />
    </FormGroup>
  );
}
