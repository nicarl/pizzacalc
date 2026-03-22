import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FermentationInputs } from '../FermentationInputs';

describe('FermentationInputs', () => {
  const defaultProps = {
    targetTime: '2026-03-22T19:00', ambientTemp: '22', fridgeTemp: '4',
    units: 'metric' as const,
    onTargetTimeChange: vi.fn(), onAmbientTempChange: vi.fn(), onFridgeTempChange: vi.fn(),
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
    render(<FermentationInputs {...defaultProps} onAmbientTempChange={onAmbient} />);
    fireEvent.change(screen.getByLabelText(/ambient/i), { target: { value: '25' } });
    expect(onAmbient).toHaveBeenCalledWith('25');
  });
});
