import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreInputs } from '../CoreInputs';

describe('CoreInputs', () => {
  const defaultProps = {
    pizzaCount: '4',
    doughballWeight: '250',
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
    expect(screen.getByLabelText(/doughball/i)).toHaveValue('250');
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
    // 250g ≈ 8.8oz
    expect(screen.getByLabelText(/doughball/i)).toHaveValue('8.8');
  });

  it('shows oz label when units is imperial', () => {
    render(<CoreInputs {...defaultProps} units="imperial" />);
    expect(screen.getByText('oz')).toBeInTheDocument();
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
