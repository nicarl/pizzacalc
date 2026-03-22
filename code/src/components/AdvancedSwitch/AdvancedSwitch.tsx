import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import type React from 'react';
import type { Dispatch, ReactElement, SetStateAction } from 'react';

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
