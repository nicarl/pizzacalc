import { fireEvent, render } from '@testing-library/react';
import { PizzaRecipe } from '../../../util/calculations';
import { InputBox } from '../InputBox';

describe('InputBox', () => {
  test('renders', () => {
    function setPizzaRecipe(newRecipe: PizzaRecipe): void {}
    const { getByText } = render(<InputBox setPizzaRecipe={setPizzaRecipe} />);

    expect(getByText('Number of pizzas'));
    expect(getByText('Doughball weight'));
    expect(getByText('Water content'));
    expect(getByText('Salt content'));
    expect(getByText('Yeast content'));
  });
  test('changes number of pizzas', () => {
    function setPizzaRecipe(newRecipe: PizzaRecipe): void {}
    const { getByText, queryByText } = render(
      <InputBox setPizzaRecipe={setPizzaRecipe} />,
    );

    const pizzaLabel = getByText('Number of pizzas')
      .parentElement as HTMLElement;
    const form = pizzaLabel.querySelector('input') as HTMLInputElement;
    expect(form).not.toBe(null);

    fireEvent.change(form, {
      target: { value: '-2' },
    });
    expect(getByText('Please insert a positive integer.'));

    fireEvent.change(form, {
      target: { value: '2' },
    });
    expect(queryByText('Please insert a positive integer.')).toBeFalsy();
  });
  test('changes doughball weight', () => {
    function setPizzaRecipe(newRecipe: PizzaRecipe): void {}
    const { getByText, queryByText } = render(
      <InputBox setPizzaRecipe={setPizzaRecipe} />,
    );

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
    function setPizzaRecipe(newRecipe: PizzaRecipe): void {}
    const { getByText, queryByText } = render(
      <InputBox setPizzaRecipe={setPizzaRecipe} />,
    );

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
    function setPizzaRecipe(newRecipe: PizzaRecipe): void {}
    const { getByText, queryByText } = render(
      <InputBox setPizzaRecipe={setPizzaRecipe} />,
    );

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
    function setPizzaRecipe(newRecipe: PizzaRecipe): void {}
    const { getByText, queryByText } = render(
      <InputBox setPizzaRecipe={setPizzaRecipe} />,
    );

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
