import { fireEvent, render } from '@testing-library/react';
import { BackButton } from '../BackButton';

describe('The BackButton', () => {
  test('renders', () => {
    render(<BackButton onClick={() => {}} />);
  });
  test('handles a click', () => {
    let buttonClicked: boolean = false;
    const { getByText } = render(
      <BackButton
        onClick={() => {
          buttonClicked = true;
        }}
      />,
    );
    fireEvent.click(getByText('Back'));
    expect(buttonClicked).toBe(true);
  });
});
