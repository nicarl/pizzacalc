import { fireEvent, render } from '@testing-library/react';
import validator from 'validator';
import { validatePositiveInt } from '../../../util/validation';
import { InputForm } from '../InputForm';

describe('The InputForm', () => {
  it('renders', () => {
    let value = 1;
    function setValue(newContent: string): void {
      value = validator.toInt(newContent);
    }
    render(
      <InputForm
        label="Test form"
        helpText="Please set a correct value"
        value={value}
        setValue={setValue}
        validation={validatePositiveInt}
      />,
    );
  });
  it('shows warning when a wrong value is set', () => {
    let value = 1;
    function setValue(newContent: string): void {
      value = validator.toInt(newContent);
    }
    const { getByTestId, getByText } = render(
      <InputForm
        label="Test form"
        helpText="Please set a correct value"
        value={value}
        setValue={setValue}
        validation={validatePositiveInt}
        testId="test-form"
      />,
    );

    const form = getByTestId('test-form').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: '-2' },
    });
    expect(value).toBe(1);
    expect(getByText('Please set a correct value'));
  });
  it('does not show a warning when correct value is set', () => {
    let value = 1;
    function setValue(newContent: string): void {
      value = validator.toInt(newContent);
    }
    const { getByTestId, queryByText } = render(
      <InputForm
        label="Test form"
        helpText="Please set a correct value"
        value={value}
        setValue={setValue}
        validation={validatePositiveInt}
        testId="test-form"
      />,
    );

    const form = getByTestId('test-form').querySelector(
      'input',
    ) as HTMLInputElement;
    expect(form).not.toBe(null);
    fireEvent.change(form, {
      target: { value: '2' },
    });
    expect(value).toBe(2);
    expect(queryByText('Please set a correct value')).toBeFalsy();
  });
});
