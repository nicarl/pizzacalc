import { render, fireEvent } from '@testing-library/react';
import { DoughballWeightForm } from '../DoughballWeightForm';

describe('The DoughBallWeightForm', () => {
  test('renders', () => {
    let doughBallWeight = 250;
    function setDoughBallWeight(newWeight: number): void {
      doughBallWeight = newWeight;
    }
    const { getByText } = render(
      <DoughballWeightForm
        doughballWeight={doughBallWeight}
        setDoughballWeight={setDoughBallWeight}
      />,
    );
    expect(getByText('Doughball weight')).toBeTruthy();
  });
  test('sets a correct weight', () => {
    let doughBallWeight = 250;
    function setDoughBallWeight(newWeight: number): void {
      doughBallWeight = newWeight;
    }
    const { getByTestId } = render(
      <DoughballWeightForm
        doughballWeight={doughBallWeight}
        setDoughballWeight={setDoughBallWeight}
      />,
    );
    const form = getByTestId('doughball-weight').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: '100.0' },
    });
    expect(doughBallWeight).toBe(100.0);
  });
  test('does not set a negative weight', () => {
    let doughBallWeight = 250;
    function setDoughBallWeight(newWeight: number): void {
      doughBallWeight = newWeight;
    }
    const { getByTestId } = render(
      <DoughballWeightForm
        doughballWeight={doughBallWeight}
        setDoughballWeight={setDoughBallWeight}
      />,
    );
    const form = getByTestId('doughball-weight').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: '-100.0' },
    });
    expect(doughBallWeight).toBe(250);
  });
  test('does not set an alphabetic value for weight', () => {
    let doughBallWeight = 250;
    function setDoughBallWeight(newWeight: number): void {
      doughBallWeight = newWeight;
    }
    const { getByTestId } = render(
      <DoughballWeightForm
        doughballWeight={doughBallWeight}
        setDoughballWeight={setDoughBallWeight}
      />,
    );
    const form = getByTestId('doughball-weight').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: 'Abc' },
    });
    expect(doughBallWeight).toBe(250);
  });
});
