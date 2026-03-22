import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FermentationInputs } from '../FermentationInputs';

describe('FermentationInputs', () => {
  const defaultProps = {
    targetTime: '2026-03-22T19:00',
    ambientTemp: '22',
    fridgeTemp: '4',
    units: 'metric' as const,
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
});
