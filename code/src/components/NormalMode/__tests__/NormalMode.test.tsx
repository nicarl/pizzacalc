import { render, fireEvent } from '@testing-library/react';
import { calculateRecipe, defaultFormInput } from '../../../util/calculations';
import { NormalMode } from '../NormalMode';

describe('The Normalmode', () => {
  test('renders', () => {
    render(
      <NormalMode
        setAdvancedModeActive={() => {}}
        pizzaRecipe={calculateRecipe(
          defaultFormInput.pizzaNumber * 2,
          defaultFormInput.waterContent * 0.5,
          defaultFormInput.yeastContent * 10,
          defaultFormInput.saltContent * 2,
          defaultFormInput.doughballWeight * 5,
        )}
        setPizzaNumber={() => {}}
        setDoughballWeight={() => {}}
        setSaltContent={() => {}}
        setWaterContent={() => {}}
        setYeastContent={() => {}}
      />,
    );
  });
  test('can be navigated through with professional oven', () => {
    let setExpertModeActive = false;
    let pizzaNumber = defaultFormInput.pizzaNumber;
    let waterContent = defaultFormInput.waterContent;
    let yeastContent = defaultFormInput.yeastContent;
    let saltContent = defaultFormInput.saltContent;
    let doughballWeight = defaultFormInput.doughballWeight;

    const { getByText, getByTestId, queryByText } = render(
      <NormalMode
        setAdvancedModeActive={newValue => {
          setExpertModeActive = newValue;
        }}
        pizzaRecipe={calculateRecipe(
          pizzaNumber,
          waterContent,
          yeastContent,
          saltContent,
          doughballWeight,
        )}
        setPizzaNumber={newValue => {
          pizzaNumber = newValue;
        }}
        setDoughballWeight={newValue => {
          doughballWeight = newValue;
        }}
        setSaltContent={newValue => {
          saltContent = newValue;
        }}
        setWaterContent={newValue => {
          waterContent = newValue;
        }}
        setYeastContent={newValue => {
          yeastContent = newValue;
        }}
      />,
    );

    expect(getByText('Select the oven type'));
    expect(getByTestId('ovenTypeNextButton').closest('button')).toBeDisabled();
    fireEvent.click(getByText('Home oven'));
    fireEvent.click(getByText('Professional oven'));
    expect(getByText('Next').closest('button')).not.toBeDisabled();
    fireEvent.click(getByText('Next'));

    expect(getByText('Number of pizzas'));
    expect(
      getByTestId('pizzaNumberBackButton').closest('button'),
    ).not.toBeDisabled();
    expect(
      getByTestId('pizzaNumberNextButton').closest('button'),
    ).not.toBeDisabled();
    fireEvent.click(getByTestId('pizzaNumberBackButton'));
    expect(getByText('Home oven'));
    fireEvent.click(getByTestId('ovenTypeNextButton'));
    expect(getByText('Number of pizzas'));

    const pizzaLabel = getByText('Number of pizzas')
      .parentElement as HTMLElement;
    const form = pizzaLabel.querySelector('input') as HTMLInputElement;
    fireEvent.change(form, {
      target: { value: '4' },
    });
    fireEvent.click(getByTestId('pizzaNumberNextButton'));

    expect(getByText('medium'));
    expect(
      getByTestId('pizzaSizeBackButton').closest('button'),
    ).not.toBeDisabled();
    expect(getByText('Finish').closest('button')).not.toBeDisabled();
    fireEvent.click(getByTestId('pizzaSizeBackButton'));
    expect(getByText('Number of pizzas'));
    fireEvent.click(getByTestId('pizzaNumberNextButton'));
    fireEvent.click(getByText('Finish'));

    expect(getByText('Ingredient'));
    fireEvent.click(getByTestId('finalViewBackButton'));
    expect(getByText('medium'));
    fireEvent.click(getByText('Finish'));
    fireEvent.click(getByTestId('editButton'));
    expect(setExpertModeActive).toBe(true);
    expect(pizzaNumber).toBe(4);
    expect(doughballWeight).toBe(210);
    expect(saltContent).toBe(defaultFormInput.saltContent);
    expect(yeastContent).toBe(defaultFormInput.yeastContent);
    expect(waterContent).toBe(62);

    fireEvent.click(getByText('Reset'));
    expect(queryByText('Ingredient')).not.toBeTruthy();
  });
  test('can be navigated through with home oven', () => {
    let setExpertModeActive = false;
    let pizzaNumber = defaultFormInput.pizzaNumber;
    let waterContent = defaultFormInput.waterContent;
    let yeastContent = defaultFormInput.yeastContent;
    let saltContent = defaultFormInput.saltContent;
    let doughballWeight = defaultFormInput.doughballWeight;

    const { getByText, getByTestId, queryByText } = render(
      <NormalMode
        setAdvancedModeActive={newValue => {
          setExpertModeActive = newValue;
        }}
        pizzaRecipe={calculateRecipe(
          pizzaNumber,
          waterContent,
          yeastContent,
          saltContent,
          doughballWeight,
        )}
        setPizzaNumber={newValue => {
          pizzaNumber = newValue;
        }}
        setDoughballWeight={newValue => {
          doughballWeight = newValue;
        }}
        setSaltContent={newValue => {
          saltContent = newValue;
        }}
        setWaterContent={newValue => {
          waterContent = newValue;
        }}
        setYeastContent={newValue => {
          yeastContent = newValue;
        }}
      />,
    );

    expect(getByText('Select the oven type'));
    expect(getByTestId('ovenTypeNextButton').closest('button')).toBeDisabled();
    fireEvent.click(getByText('Home oven'));
    expect(getByText('Next').closest('button')).not.toBeDisabled();
    fireEvent.click(getByText('Next'));

    expect(getByText('Number of pizzas'));
    expect(
      getByTestId('pizzaNumberBackButton').closest('button'),
    ).not.toBeDisabled();
    expect(
      getByTestId('pizzaNumberNextButton').closest('button'),
    ).not.toBeDisabled();
    fireEvent.click(getByTestId('pizzaNumberBackButton'));
    expect(getByText('Home oven'));
    fireEvent.click(getByTestId('ovenTypeNextButton'));
    expect(getByText('Number of pizzas'));

    const pizzaLabel = getByText('Number of pizzas')
      .parentElement as HTMLElement;
    const form = pizzaLabel.querySelector('input') as HTMLInputElement;
    fireEvent.change(form, {
      target: { value: '4' },
    });
    fireEvent.click(getByTestId('pizzaNumberNextButton'));

    expect(getByText('medium'));
    expect(
      getByTestId('pizzaSizeBackButton').closest('button'),
    ).not.toBeDisabled();
    expect(getByText('Finish').closest('button')).not.toBeDisabled();
    fireEvent.click(getByTestId('pizzaSizeBackButton'));
    expect(getByText('Number of pizzas'));
    fireEvent.click(getByTestId('pizzaNumberNextButton'));
    fireEvent.click(getByText('Finish'));

    expect(getByText('Ingredient'));
    fireEvent.click(getByTestId('finalViewBackButton'));
    expect(getByText('medium'));
    fireEvent.click(getByText('Finish'));
    fireEvent.click(getByTestId('editButton'));
    expect(setExpertModeActive).toBe(true);
    expect(pizzaNumber).toBe(4);
    expect(doughballWeight).toBe(210);
    expect(saltContent).toBe(defaultFormInput.saltContent);
    expect(yeastContent).toBe(defaultFormInput.yeastContent);
    expect(waterContent).toBe(70);

    fireEvent.click(getByText('Reset'));
    expect(queryByText('Ingredient')).not.toBeTruthy();
  });
});
