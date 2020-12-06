import { render, fireEvent } from '@testing-library/react';
import { PizzaNumberForm } from '../PizzaNumberForm';

describe('The PizzaNumberForm', () => {
  test('renders', () => {
    let pizzaNumber = 2;
    function setPizzaNumber(newNumber: number): void {
      pizzaNumber = newNumber;
    }
    const { getByText } = render(
      <PizzaNumberForm
        pizzaNumber={pizzaNumber}
        setPizzaNumber={setPizzaNumber}
      />,
    );
    expect(getByText('Number of pizzas')).toBeTruthy();
  });

  test('sets a correct number', () => {
    let pizzaNumber = 2;
    function setPizzaNumber(newNumber: number): void {
      pizzaNumber = newNumber;
    }
    const { getByTestId } = render(
      <PizzaNumberForm
        pizzaNumber={pizzaNumber}
        setPizzaNumber={setPizzaNumber}
      />,
    );

    const form = getByTestId('pizza-number').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: '3' },
    });
    expect(pizzaNumber).toBe(3);
  });

  test('does not set a negative number', () => {
    let pizzaNumber = 2;
    function setPizzaNumber(newNumber: number): void {
      pizzaNumber = newNumber;
    }
    const { getByTestId } = render(
      <PizzaNumberForm
        pizzaNumber={pizzaNumber}
        setPizzaNumber={setPizzaNumber}
      />,
    );

    const form = getByTestId('pizza-number').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: '-3' },
    });
    expect(pizzaNumber).toBe(2);
  });

  test('does not set a float number', () => {
    let pizzaNumber = 2;
    function setPizzaNumber(newNumber: number): void {
      pizzaNumber = newNumber;
    }
    const { getByTestId } = render(
      <PizzaNumberForm
        pizzaNumber={pizzaNumber}
        setPizzaNumber={setPizzaNumber}
      />,
    );

    const form = getByTestId('pizza-number').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: '3.5' },
    });
    expect(pizzaNumber).toBe(2);
  });

  test('sets an alphabetic string', () => {
    let pizzaNumber = 2;
    function setPizzaNumber(newNumber: number): void {
      pizzaNumber = newNumber;
    }
    const { getByTestId } = render(
      <PizzaNumberForm
        pizzaNumber={pizzaNumber}
        setPizzaNumber={setPizzaNumber}
      />,
    );

    const form = getByTestId('pizza-number').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: 'abc' },
    });
    expect(pizzaNumber).toBe(2);
  });
});
