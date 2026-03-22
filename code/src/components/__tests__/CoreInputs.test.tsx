import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CoreInputs } from '../CoreInputs';

describe('CoreInputs', () => {
  const defaultProps = {
    pizzaCount: '4', doughballWeight: '250', ovenType: 'home' as const,
    isPanStyle: false, onPizzaCountChange: vi.fn(),
    onDoughballWeightChange: vi.fn(), onOvenTypeChange: vi.fn(),
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
    fireEvent.change(screen.getByLabelText(/pizzas/i), { target: { value: '6' } });
    expect(onChange).toHaveBeenCalledWith('6');
  });
});
