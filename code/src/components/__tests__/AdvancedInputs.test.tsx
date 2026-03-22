import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdvancedInputs } from '../AdvancedInputs';

describe('AdvancedInputs', () => {
  const defaultProps = {
    waterPercent: '65', saltPercent: '2.8', yeastPercent: '0.05',
    oilPercent: '0', showOil: false,
    onWaterChange: vi.fn(), onSaltChange: vi.fn(),
    onYeastChange: vi.fn(), onOilChange: vi.fn(),
    hasOverrides: false, onReset: vi.fn(),
  };

  it('is collapsed by default', () => {
    render(<AdvancedInputs {...defaultProps} />);
    expect(screen.queryByLabelText(/water/i)).not.toBeInTheDocument();
  });

  it('expands when toggle is clicked', () => {
    render(<AdvancedInputs {...defaultProps} />);
    fireEvent.click(screen.getByText(/adjust hydration/i));
    expect(screen.getByLabelText(/water/i)).toBeInTheDocument();
  });

  it('hides oil input when showOil is false', () => {
    render(<AdvancedInputs {...defaultProps} />);
    fireEvent.click(screen.getByText(/adjust hydration/i));
    expect(screen.queryByLabelText(/oil/i)).not.toBeInTheDocument();
  });

  it('shows oil input when showOil is true', () => {
    render(<AdvancedInputs {...defaultProps} showOil={true} oilPercent="7" />);
    fireEvent.click(screen.getByText(/adjust hydration/i));
    expect(screen.getByLabelText(/oil/i)).toBeInTheDocument();
  });

  it('shows reset link when hasOverrides is true', () => {
    render(<AdvancedInputs {...defaultProps} hasOverrides={true} />);
    fireEvent.click(screen.getByText(/adjust hydration/i));
    expect(screen.getByText(/reset to defaults/i)).toBeInTheDocument();
  });
});
