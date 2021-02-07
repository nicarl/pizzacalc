import { Button } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface NextButtonProps {
  onClick: () => void;
  disabled: boolean;
  label?: string;
  testId?: string;
}

export function NextButton(props: NextButtonProps): ReactElement {
  return (
    <Button
      variant="contained"
      onClick={props.onClick}
      color="primary"
      disabled={props.disabled}
      data-testid={props.testId}
    >
      {props.label ? props.label : 'Next'}
    </Button>
  );
}
