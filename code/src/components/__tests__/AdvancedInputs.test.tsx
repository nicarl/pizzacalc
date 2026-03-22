import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdvancedInputs } from '../AdvancedInputs';

describe('AdvancedInputs', () => {
  const defaultProps = {
    waterPercent: '65',
    saltPercent: '2.8',
    yeastPercent: '0.05',
    oilPercent: '0',
    showOil: false,
    onWaterChange: vi.fn(),
    onSaltChange: vi.fn(),
    onYeastChange: vi.fn(),
    onOilChange: vi.fn(),
    hasOverrides: false,
    onReset: vi.fn(),
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

  it('calls onWaterChange when water input changes', () => {
    const onWaterChange = vi.fn();
    render(<AdvancedInputs {...defaultProps} onWaterChange={onWaterChange} />);
    fireEvent.click(screen.getByText(/adjust hydration/i));
    fireEvent.change(screen.getByLabelText(/water %/i), {
      target: { value: '70' },
    });
    expect(onWaterChange).toHaveBeenCalledWith('70');
  });

  it('calls onSaltChange when salt input changes', () => {
    const onSaltChange = vi.fn();
    render(<AdvancedInputs {...defaultProps} onSaltChange={onSaltChange} />);
    fireEvent.click(screen.getByText(/adjust hydration/i));
    fireEvent.change(screen.getByLabelText(/salt %/i), {
      target: { value: '3' },
    });
    expect(onSaltChange).toHaveBeenCalledWith('3');
  });

  it('calls onYeastChange when yeast input changes', () => {
    const onYeastChange = vi.fn();
    render(<AdvancedInputs {...defaultProps} onYeastChange={onYeastChange} />);
    fireEvent.click(screen.getByText(/adjust hydration/i));
    fireEvent.change(screen.getByLabelText(/yeast %/i), {
      target: { value: '0.1' },
    });
    expect(onYeastChange).toHaveBeenCalledWith('0.1');
  });

  it('calls onOilChange when oil input changes', () => {
    const onOilChange = vi.fn();
    render(
      <AdvancedInputs
        {...defaultProps}
        showOil={true}
        oilPercent="7"
        onOilChange={onOilChange}
      />,
    );
    fireEvent.click(screen.getByText(/adjust hydration/i));
    fireEvent.change(screen.getByLabelText(/oil %/i), {
      target: { value: '10' },
    });
    expect(onOilChange).toHaveBeenCalledWith('10');
  });
});
