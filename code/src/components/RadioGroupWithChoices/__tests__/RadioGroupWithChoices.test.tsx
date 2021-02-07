import { fireEvent, render } from '@testing-library/react';
import { ovenTypes } from '../../NormalMode/types';
import { RadioGroupWithChoices } from '../RadioGroupWithChoices';

describe('The RadioGroupWithChoices', () => {
  test('renders', () => {
    render(
      <RadioGroupWithChoices
        choices={ovenTypes}
        value={'tonda'}
        setChoice={() => {}}
        label={'test-label'}
      />,
    );
  });
  test('handles change', () => {
    let selectedValue = 'homeOven';

    const { getByLabelText } = render(
      <RadioGroupWithChoices
        choices={ovenTypes}
        value={selectedValue}
        setChoice={newValue => {
          selectedValue = newValue;
        }}
        label={'test-label'}
      />,
    );
    const professionalOvenOption = getByLabelText('Professional oven');
    fireEvent.click(professionalOvenOption);

    expect(selectedValue).toBe('professionalOven');
  });
});
