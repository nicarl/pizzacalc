import { render, fireEvent } from '@testing-library/react';
import { WaterContentForm } from '../WaterContentForm';

describe('The WaterContentForm', () => {
  test('renders', () => {
    let waterContent = 70.2;
    function setWaterContent(newContent: number): void {
      waterContent = newContent;
    }
    const { getByText } = render(
      <WaterContentForm
        waterContent={waterContent}
        setWaterContent={setWaterContent}
      />,
    );
    expect(getByText('Water content')).toBeTruthy();
  });
  test('sets a correct value', () => {
    let waterContent = 70.2;
    function setWaterContent(newContent: number): void {
      waterContent = newContent;
    }
    const { getByTestId } = render(
      <WaterContentForm
        waterContent={waterContent}
        setWaterContent={setWaterContent}
      />,
    );
    const form = getByTestId('water-content').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: '60.5' },
    });
    expect(waterContent).toBe(60.5);
  });
  test('does not set a negative value', () => {
    let waterContent = 70.2;
    function setWaterContent(newContent: number): void {
      waterContent = newContent;
    }
    const { getByTestId } = render(
      <WaterContentForm
        waterContent={waterContent}
        setWaterContent={setWaterContent}
      />,
    );
    const form = getByTestId('water-content').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: '-60.5' },
    });
    expect(waterContent).toBe(70.2);
  });
  test('does not set an alphabetic value', () => {
    let waterContent = 70.2;
    function setWaterContent(newContent: number): void {
      waterContent = newContent;
    }
    const { getByTestId } = render(
      <WaterContentForm
        waterContent={waterContent}
        setWaterContent={setWaterContent}
      />,
    );
    const form = getByTestId('water-content').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: 'abc' },
    });
    expect(waterContent).toBe(70.2);
  });
});
