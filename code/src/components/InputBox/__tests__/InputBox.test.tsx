import { fireEvent, render } from '@testing-library/react';
import { defaultFormInput } from '../../../util/calculations';
import { InputBox } from '../InputBox';

describe('InputBox', () => {
  test('renders', () => {
    const { getByText } = render(
      <InputBox
        pizzaNumber={defaultFormInput.pizzaNumber}
        setPizzaNumber={() => {}}
        waterContent={defaultFormInput.waterContent}
        setWaterContent={() => {}}
        yeastContent={defaultFormInput.yeastContent}
        setYeastContent={() => {}}
        saltContent={defaultFormInput.saltContent}
        setSaltContent={() => {}}
        doughballWeight={defaultFormInput.doughballWeight}
        setDoughballWeight={() => {}}
      />,
    );

    expect(getByText('Number of pizzas'));
    expect(getByText('Doughball weight'));
    expect(getByText('Water content'));
    expect(getByText('Salt content'));
    expect(getByText('Yeast content'));
  });
  test('changes number of pizzas', () => {
    let pizzaNumber = defaultFormInput.pizzaNumber;
    const { getByText, queryByText } = render(
      <InputBox
        pizzaNumber={pizzaNumber}
        setPizzaNumber={newValue => {
          pizzaNumber = newValue;
        }}
        waterContent={defaultFormInput.waterContent}
        setWaterContent={() => {}}
        yeastContent={defaultFormInput.yeastContent}
        setYeastContent={() => {}}
        saltContent={defaultFormInput.saltContent}
        setSaltContent={() => {}}
        doughballWeight={defaultFormInput.doughballWeight}
        setDoughballWeight={() => {}}
      />,
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
      target: { value: '4' },
    });
    expect(queryByText('Please insert a positive integer.')).toBeFalsy();
    expect(pizzaNumber).toBe(4);
  });
  test('changes doughball weight', () => {
    let dougballWeight = defaultFormInput.doughballWeight;
    const { getByText, queryByText } = render(
      <InputBox
        pizzaNumber={defaultFormInput.pizzaNumber}
        setPizzaNumber={() => {}}
        waterContent={defaultFormInput.waterContent}
        setWaterContent={() => {}}
        yeastContent={defaultFormInput.yeastContent}
        setYeastContent={() => {}}
        saltContent={defaultFormInput.saltContent}
        setSaltContent={() => {}}
        doughballWeight={dougballWeight}
        setDoughballWeight={newValue => {
          dougballWeight = newValue;
        }}
      />,
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
    expect(dougballWeight).toBe(2);
  });
  test('changes water content', () => {
    let waterContent = defaultFormInput.waterContent;

    const { getByText, queryByText } = render(
      <InputBox
        pizzaNumber={defaultFormInput.pizzaNumber}
        setPizzaNumber={() => {}}
        waterContent={waterContent}
        setWaterContent={newValue => {
          waterContent = newValue;
        }}
        yeastContent={defaultFormInput.yeastContent}
        setYeastContent={() => {}}
        saltContent={defaultFormInput.saltContent}
        setSaltContent={() => {}}
        doughballWeight={defaultFormInput.doughballWeight}
        setDoughballWeight={() => {}}
      />,
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
    expect(waterContent).toBe(2);
  });
  test('changes salt content', () => {
    let saltContent = defaultFormInput.saltContent;

    const { getByText, queryByText } = render(
      <InputBox
        pizzaNumber={defaultFormInput.pizzaNumber}
        setPizzaNumber={() => {}}
        waterContent={defaultFormInput.waterContent}
        setWaterContent={() => {}}
        yeastContent={defaultFormInput.yeastContent}
        setYeastContent={() => {}}
        saltContent={saltContent}
        setSaltContent={newValue => {
          saltContent = newValue;
        }}
        doughballWeight={defaultFormInput.doughballWeight}
        setDoughballWeight={() => {}}
      />,
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
    expect(saltContent).toBe(2);
  });
  test('changes yeast content', () => {
    let yeastContent = defaultFormInput.yeastContent;

    const { getByText, queryByText } = render(
      <InputBox
        pizzaNumber={defaultFormInput.pizzaNumber}
        setPizzaNumber={() => {}}
        waterContent={defaultFormInput.waterContent}
        setWaterContent={() => {}}
        yeastContent={yeastContent}
        setYeastContent={newValue => {
          yeastContent = newValue;
        }}
        saltContent={defaultFormInput.saltContent}
        setSaltContent={() => {}}
        doughballWeight={defaultFormInput.doughballWeight}
        setDoughballWeight={() => {}}
      />,
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
    expect(yeastContent).toBe(2);
  });
});
