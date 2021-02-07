import { fireEvent, render } from '@testing-library/react';
import { NextButton } from '../NextButton';

describe('The NextButton', () => {
  test('renders', () => {
    render(<NextButton onClick={() => {}} disabled={false} />);
  });
  test('handles a click', () => {
    let buttonClicked: boolean = false;
    const { getByText } = render(
      <NextButton
        onClick={() => {
          buttonClicked = true;
        }}
        disabled={false}
      />,
    );
    fireEvent.click(getByText('Next'));
    expect(buttonClicked).toBe(true);
  });
  test('takes a custom label', () => {
    let buttonClicked: boolean = false;
    const { getByText } = render(
      <NextButton
        onClick={() => {
          buttonClicked = true;
        }}
        disabled={false}
        label={'custom label'}
      />,
    );
    fireEvent.click(getByText('custom label'));
    expect(buttonClicked).toBe(true);
  });
});
