import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FermentationInputs } from '../FermentationInputs';

describe('FermentationInputs', () => {
  const defaultProps = {
    targetTime: '2026-03-22T19:00',
    ambientTemp: '22',
    fridgeTemp: '4',
    units: 'metric' as const,
    showFridgeTemp: true,
    onTargetTimeChange: vi.fn(),
    onAmbientTempChange: vi.fn(),
    onFridgeTempChange: vi.fn(),
  };

  it('renders target time input', () => {
    render(<FermentationInputs {...defaultProps} />);
    expect(screen.getByLabelText(/eat at/i)).toBeInTheDocument();
  });

  it('renders temperature inputs', () => {
    render(<FermentationInputs {...defaultProps} />);
    expect(screen.getByLabelText(/ambient/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fridge/i)).toBeInTheDocument();
  });

  it('calls onChange handlers', () => {
    const onAmbient = vi.fn();
    render(
      <FermentationInputs {...defaultProps} onAmbientTempChange={onAmbient} />,
    );
    fireEvent.change(screen.getByLabelText(/ambient/i), {
      target: { value: '25' },
    });
    expect(onAmbient).toHaveBeenCalledWith('25');
  });

  it('calls onTargetTimeChange when target time changes', () => {
    const onTargetTime = vi.fn();
    render(
      <FermentationInputs
        {...defaultProps}
        onTargetTimeChange={onTargetTime}
      />,
    );
    fireEvent.change(screen.getByLabelText(/eat at/i), {
      target: { value: '2026-04-01T18:00' },
    });
    expect(onTargetTime).toHaveBeenCalledWith('2026-04-01T18:00');
  });

  it('calls onFridgeTempChange when fridge temp changes', () => {
    const onFridge = vi.fn();
    render(
      <FermentationInputs {...defaultProps} onFridgeTempChange={onFridge} />,
    );
    fireEvent.change(screen.getByLabelText(/fridge/i), {
      target: { value: '3' },
    });
    expect(onFridge).toHaveBeenCalledWith('3');
  });

  it('shows °F labels when units is imperial', () => {
    render(<FermentationInputs {...defaultProps} units="imperial" />);
    expect(screen.getByLabelText(/ambient °f/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fridge °f/i)).toBeInTheDocument();
  });

  it('hides fridge temp input when showFridgeTemp is false', () => {
    render(<FermentationInputs {...defaultProps} showFridgeTemp={false} />);
    expect(screen.getByLabelText(/ambient/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/fridge/i)).not.toBeInTheDocument();
  });

  it('shows ambient warning for out-of-range temperature', () => {
    render(<FermentationInputs {...defaultProps} ambientTemp="50" />);
    expect(screen.getByText(/unusual temperature/i)).toBeInTheDocument();
  });

  it('shows fridge warning for out-of-range temperature', () => {
    render(<FermentationInputs {...defaultProps} fridgeTemp="-5" />);
    expect(screen.getByText(/unusual temperature/i)).toBeInTheDocument();
  });

  it('does not show warning for in-range temperatures', () => {
    render(<FermentationInputs {...defaultProps} />);
    expect(screen.queryByText(/unusual temperature/i)).not.toBeInTheDocument();
  });

  it('displays temperature in °F when units is imperial', () => {
    render(<FermentationInputs {...defaultProps} units="imperial" />);
    // 22°C ≈ 72°F
    expect(screen.getByLabelText(/ambient °f/i)).toHaveValue('72');
    // 4°C ≈ 39°F
    expect(screen.getByLabelText(/fridge °f/i)).toHaveValue('39');
  });

  it('converts °F input back to °C when units is imperial', () => {
    const onAmbient = vi.fn();
    render(
      <FermentationInputs
        {...defaultProps}
        units="imperial"
        onAmbientTempChange={onAmbient}
      />,
    );
    fireEvent.change(screen.getByLabelText(/ambient °f/i), {
      target: { value: '77' },
    });
    // 77°F ≈ 25°C
    expect(onAmbient).toHaveBeenCalledWith('25');
  });
});
