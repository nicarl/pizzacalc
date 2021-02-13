import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('The app', () => {
  test('renders', () => {
    render(<App />);
  });
  test('switches between modes', () => {
    const { getByText, queryByText } = render(<App />);

    expect(getByText('Select the oven type'));
    fireEvent.click(getByText('Advanced mode'));
    expect(queryByText('Select the oven type')).not.toBeTruthy();
    expect(getByText('Ingredients'));
  });
});
