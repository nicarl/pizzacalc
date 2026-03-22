import { fireEvent, render } from '@testing-library/react';
import { AdvancedSwitch } from '../AdvancedSwitch';

describe('The AdvancedSwitch', () => {
  test('renders', () => {
    render(
      <AdvancedSwitch
        advancedModeActive={false}
        setAdvancedModeActive={() => {}}
      />,
    );
  });
  test('handles a click', () => {
    let advancedModeActive: boolean = false;
    const { getByText } = render(
      <AdvancedSwitch
        advancedModeActive={advancedModeActive}
        setAdvancedModeActive={() => {
          advancedModeActive = true;
        }}
      />,
    );
    fireEvent.click(getByText('Advanced mode'));
    expect(advancedModeActive).toBe(true);
  });
});
