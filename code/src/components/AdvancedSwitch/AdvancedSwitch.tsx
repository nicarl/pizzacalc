import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

interface AdvancedSwitchProps {
  advancedModeActive: boolean;
  setAdvancedModeActive: Dispatch<SetStateAction<boolean>>;
}

export function AdvancedSwitch(props: AdvancedSwitchProps): ReactElement {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    props.setAdvancedModeActive(event.target.checked);
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={props.advancedModeActive}
            onChange={handleChange}
            name="advancedMode"
            color="primary"
          />
        }
        label="Advanced mode"
      />
    </FormGroup>
  );
}
