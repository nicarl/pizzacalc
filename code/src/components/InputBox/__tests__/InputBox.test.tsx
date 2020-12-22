import { fireEvent, render } from '@testing-library/react';
import { InputBox } from '../InputBox';

describe('InputBox', () => {
  test('renders', () => {
    const { getByText } = render(<InputBox />);

    expect(getByText('Number of pizzas'));
    expect(getByText('Doughball weight'));
    expect(getByText('Water content'));
    expect(getByText('Salt content'));
    expect(getByText('Yeast content'));
  });
  test('changes number of pizzas', () => {
    const { getByText, queryByText } = render(<InputBox />);

    const pizzaLabel = getByText('Number of pizzas')
      .parentElement as HTMLElement;
    const form = pizzaLabel.querySelector('input') as HTMLInputElement;
    expect(form).not.toBe(null);

    fireEvent.change(form, {
      target: { value: '-2' },
    });
    expect(getByText('Please insert a whole positive number.'));

    fireEvent.change(form, {
      target: { value: '2' },
    });
    expect(queryByText('Please insert a whole positive number.')).toBeFalsy();
  });
  test('changes doughball weight', () => {
    const { getByText, queryByText } = render(<InputBox />);

    const doughballLabel = getByText('Doughball weight')
      .parentElement as HTMLElement;
    const form = doughballLabel.querySelector('input') as HTMLInputElement;
    expect(form).not.toBe(null);

    fireEvent.change(form, {
      target: { value: '-2' },
    });
    expect(getByText('Please insert a positive number.'));

    fireEvent.change(form, {
      target: { value: '2' },
    });
    expect(queryByText('Please insert a positive number.')).toBeFalsy();
  });
  test('changes water content', () => {
    const { getByText, queryByText } = render(<InputBox />);

    const waterContentLabel = getByText('Water content')
      .parentElement as HTMLElement;
    const form = waterContentLabel.querySelector('input') as HTMLInputElement;
    expect(form).not.toBe(null);

    fireEvent.change(form, {
      target: { value: '-2' },
    });
    expect(getByText('Please insert a positive number.'));

    fireEvent.change(form, {
      target: { value: '2' },
    });
    expect(queryByText('Please insert a positive number.')).toBeFalsy();
  });
  test('changes salt content', () => {
    const { getByText, queryByText } = render(<InputBox />);

    const saltContentLabel = getByText('Salt content')
      .parentElement as HTMLElement;
    const form = saltContentLabel.querySelector('input') as HTMLInputElement;
    expect(form).not.toBe(null);

    fireEvent.change(form, {
      target: { value: '-2' },
    });
    expect(getByText('Please insert a positive number.'));

    fireEvent.change(form, {
      target: { value: '2' },
    });
    expect(queryByText('Please insert a positive number.')).toBeFalsy();
  });
  test('changes yeast content', () => {
    const { getByText, queryByText } = render(<InputBox />);

    const yeastContentLabel = getByText('Yeast content')
      .parentElement as HTMLElement;
    const form = yeastContentLabel.querySelector('input') as HTMLInputElement;
    expect(form).not.toBe(null);

    fireEvent.change(form, {
      target: { value: '-2' },
    });
    expect(getByText('Please insert a positive number.'));

    fireEvent.change(form, {
      target: { value: '2' },
    });
    expect(queryByText('Please insert a positive number.')).toBeFalsy();
  });
});
