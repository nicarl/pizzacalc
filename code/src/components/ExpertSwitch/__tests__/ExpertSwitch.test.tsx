import { fireEvent, render } from '@testing-library/react';
import { ExpertSwitch } from '../ExpertSwitch';

describe('The ExpertSwitch', () => {
  test('renders', () => {
    render(
      <ExpertSwitch expertModeActive={false} setExpertModeActive={() => {}} />,
    );
  });
  test('handles a click', () => {
    let expertModeActive: boolean = false;
    const { getByText } = render(
      <ExpertSwitch
        expertModeActive={expertModeActive}
        setExpertModeActive={() => {
          expertModeActive = true;
        }}
      />,
    );
    fireEvent.click(getByText('Expert mode'));
    expect(expertModeActive).toBe(true);
  });
});
