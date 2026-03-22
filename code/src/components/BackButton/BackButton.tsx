import { Button } from '@mui/material';
import type { ReactElement } from 'react';

interface BackButtonProps {
  onClick: () => void;
  testId?: string;
}

export function BackButton(props: BackButtonProps): ReactElement {
  return (
    <Button onClick={props.onClick} data-testid={props.testId}>
      Back
    </Button>
  );
}
