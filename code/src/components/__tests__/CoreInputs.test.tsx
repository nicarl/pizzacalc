import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreInputs } from '../CoreInputs';

describe('CoreInputs', () => {
  const defaultProps = {
    pizzaCount: '4',
    doughballWeight: '210',
    ovenType: 'home' as const,
    isPanStyle: false,
    units: 'metric' as const,
    onPizzaCountChange: vi.fn(),
    onDoughballWeightChange: vi.fn(),
    onOvenTypeChange: vi.fn(),
  };

  it('renders pizza count input', () => {
    render(<CoreInputs {...defaultProps} />);
    expect(screen.getByLabelText(/pizzas/i)).toHaveValue('4');
  });

  it('renders doughball weight input', () => {
    render(<CoreInputs {...defaultProps} />);
    expect(screen.getByLabelText(/doughball/i)).toHaveValue('210');
  });

  it('shows "pans" label for pan styles', () => {
    render(<CoreInputs {...defaultProps} isPanStyle={true} />);
    expect(screen.getByLabelText(/pans/i)).toBeInTheDocument();
  });

  it('calls onPizzaCountChange', () => {
    const onChange = vi.fn();
    render(<CoreInputs {...defaultProps} onPizzaCountChange={onChange} />);
    fireEvent.change(screen.getByLabelText(/pizzas/i), {
      target: { value: '6' },
    });
    expect(onChange).toHaveBeenCalledWith('6');
  });

  it('calls onOvenTypeChange when oven select changes', () => {
    const onChange = vi.fn();
    render(<CoreInputs {...defaultProps} onOvenTypeChange={onChange} />);
    fireEvent.change(screen.getByLabelText(/oven type/i), {
      target: { value: 'professional' },
    });
    expect(onChange).toHaveBeenCalledWith('professional');
  });

  it('calls onDoughballWeightChange when weight input changes', () => {
    const onChange = vi.fn();
    render(<CoreInputs {...defaultProps} onDoughballWeightChange={onChange} />);
    fireEvent.change(screen.getByLabelText(/doughball/i), {
      target: { value: '300' },
    });
    expect(onChange).toHaveBeenCalledWith('300');
  });

  it('displays weight in oz when units is imperial', () => {
    render(<CoreInputs {...defaultProps} units="imperial" />);
    // 210g ≈ 7.4oz
    expect(screen.getByLabelText(/doughball/i)).toHaveValue('7.4');
  });

  it('shows oz label when units is imperial', () => {
    render(<CoreInputs {...defaultProps} units="imperial" />);
    expect(screen.getByText('oz')).toBeInTheDocument();
  });

  it('shows validation error for invalid pizza count', () => {
    render(<CoreInputs {...defaultProps} pizzaCount="abc" />);
    expect(screen.getByText('Enter a positive integer')).toBeInTheDocument();
  });

  it('shows validation error for invalid doughball weight', () => {
    render(<CoreInputs {...defaultProps} doughballWeight="abc" />);
    expect(screen.getByText('Enter a positive number')).toBeInTheDocument();
  });

  it('does not show validation errors for valid inputs', () => {
    render(<CoreInputs {...defaultProps} />);
    expect(
      screen.queryByText('Enter a positive integer'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Enter a positive number'),
    ).not.toBeInTheDocument();
  });

  it('does not show validation errors for empty inputs', () => {
    render(<CoreInputs {...defaultProps} pizzaCount="" doughballWeight="" />);
    expect(
      screen.queryByText('Enter a positive integer'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Enter a positive number'),
    ).not.toBeInTheDocument();
  });

  it('passes non-numeric value through when imperial weight is NaN', () => {
    const onChange = vi.fn();
    render(
      <CoreInputs
        {...defaultProps}
        units="imperial"
        onDoughballWeightChange={onChange}
      />,
    );
    fireEvent.change(screen.getByLabelText(/doughball/i), {
      target: { value: 'abc' },
    });
    expect(onChange).toHaveBeenCalledWith('abc');
  });

  it('passes empty value through when imperial weight is empty', () => {
    const onChange = vi.fn();
    render(
      <CoreInputs
        {...defaultProps}
        units="imperial"
        onDoughballWeightChange={onChange}
      />,
    );
    fireEvent.change(screen.getByLabelText(/doughball/i), {
      target: { value: '' },
    });
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('converts oz input back to grams when units is imperial', () => {
    const onChange = vi.fn();
    render(
      <CoreInputs
        {...defaultProps}
        units="imperial"
        onDoughballWeightChange={onChange}
      />,
    );
    fireEvent.change(screen.getByLabelText(/doughball/i), {
      target: { value: '10' },
    });
    // 10oz ≈ 283g
    expect(onChange).toHaveBeenCalledWith('283');
  });
});
