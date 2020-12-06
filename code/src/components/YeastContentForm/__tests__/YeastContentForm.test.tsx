import { render, fireEvent } from '@testing-library/react';
import { YeastContentForm } from '../YeastContentForm';

describe('The YeastContentForm', () => {
  test('renders', () => {
    let yeastContent = 0.02;
    function setYeastContent(newContent: number): void {
      yeastContent = newContent;
    }
    const { getByText } = render(
      <YeastContentForm
        yeastContent={yeastContent}
        setYeastContent={setYeastContent}
      />,
    );
    expect(getByText('Yeast content')).toBeTruthy();
  });
  test('sets a correct content', () => {
    let yeastContent = 0.02;
    function setYeastContent(newContent: number): void {
      yeastContent = newContent;
    }
    const { getByTestId } = render(
      <YeastContentForm
        yeastContent={yeastContent}
        setYeastContent={setYeastContent}
      />,
    );
    const form = getByTestId('yeast-content').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: '2.6' },
    });
    expect(yeastContent).toBe(2.6);
  });
  test('does not set a negative value', () => {
    let yeastContent = 0.02;
    function setYeastContent(newContent: number): void {
      yeastContent = newContent;
    }
    const { getByTestId } = render(
      <YeastContentForm
        yeastContent={yeastContent}
        setYeastContent={setYeastContent}
      />,
    );
    const form = getByTestId('yeast-content').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: '-2.6' },
    });
    expect(yeastContent).toBe(0.02);
  });
  test('does not set an alphabetic value', () => {
    let yeastContent = 0.02;
    function setYeastContent(newContent: number): void {
      yeastContent = newContent;
    }
    const { getByTestId } = render(
      <YeastContentForm
        yeastContent={yeastContent}
        setYeastContent={setYeastContent}
      />,
    );
    const form = getByTestId('yeast-content').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: 'abc' },
    });
    expect(yeastContent).toBe(0.02);
  });
});
