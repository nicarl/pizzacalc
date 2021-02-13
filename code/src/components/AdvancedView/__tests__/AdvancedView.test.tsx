import { render } from '@testing-library/react';
import { calculateRecipe, defaultFormInput } from '../../../util/calculations';
import { AdvancedView } from '../AdvancedView';

describe('The advanced view', () => {
  test('renders', () => {
    const { getByText } = render(
      <AdvancedView
        pizzaRecipe={calculateRecipe(
          defaultFormInput.pizzaNumber,
          defaultFormInput.waterContent,
          defaultFormInput.yeastContent,
          defaultFormInput.saltContent,
          defaultFormInput.doughballWeight,
        )}
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
    expect(getByText('Ingredients'));
    expect(getByText('254.9'));
  });
});
