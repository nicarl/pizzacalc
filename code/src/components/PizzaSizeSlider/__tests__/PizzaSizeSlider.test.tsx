import { fireEvent, render } from '@testing-library/react';
import { PizzaSizeSlider } from '../PizzaSizeSlider';

describe('The PizzaSizeSlider', () => {
  test('renders', () => {
    render(
      <PizzaSizeSlider doughBallWeight={210} setDoughBallWeight={() => {}} />,
    );
  });
  test('sets the pizza size to small', () => {
    var doughBallWeight = 210;
    const { getByTestId } = render(
      <PizzaSizeSlider
        doughBallWeight={doughBallWeight}
        setDoughBallWeight={(newValue: number) => {
          doughBallWeight = newValue;
        }}
      />,
    );
    const slider = getByTestId('pizzaSizeSlider');
    fireEvent.mouseDown(slider, 0);
    expect(doughBallWeight).toBe(150);
  });
  test('is set to small', () => {
    var doughBallWeight = 150;
    render(
      <PizzaSizeSlider
        doughBallWeight={doughBallWeight}
        setDoughBallWeight={(newValue: number) => {
          doughBallWeight = newValue;
        }}
      />,
    );
  });
  test('is set to large', () => {
    var doughBallWeight = 250;
    render(
      <PizzaSizeSlider
        doughBallWeight={doughBallWeight}
        setDoughBallWeight={(newValue: number) => {
          doughBallWeight = newValue;
        }}
      />,
    );
  });
});
