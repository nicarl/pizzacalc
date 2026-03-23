import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type {
  BakingInstruction,
  OvenType,
  PreparationStep,
} from '@/util/dough-presets';
import { DoughGuide } from '../DoughGuide';

describe('DoughGuide', () => {
  const steps: PreparationStep[] = [
    { name: 'Mix dry ingredients', instruction: 'Combine flour and salt.' },
    {
      name: 'Knead',
      instruction: 'Knead for 10 minutes.',
      tip: 'The dough should feel tacky.',
    },
  ];

  const bakingInstructions: Record<OvenType, BakingInstruction> = {
    home: {
      tempC: 275,
      tempF: 530,
      timeMin: 6,
      description: 'Max oven temperature with pizza stone, 5-7 minutes.',
    },
    professional: {
      tempC: 485,
      tempF: 905,
      timeMin: 2,
      description: 'Wood-fired oven, 60-90 seconds.',
    },
  };

  const defaultProps = {
    steps,
    bakingInstructions,
    ovenType: 'home' as OvenType,
    units: 'metric' as const,
  };

  it('is collapsed by default', () => {
    render(<DoughGuide {...defaultProps} />);
    expect(
      screen.queryByText('Combine flour and salt.'),
    ).not.toBeInTheDocument();
  });

  it('shows toggle button', () => {
    render(<DoughGuide {...defaultProps} />);
    expect(screen.getByText(/show preparation steps/i)).toBeInTheDocument();
  });

  it('expands to show steps when toggled', () => {
    render(<DoughGuide {...defaultProps} />);
    fireEvent.click(screen.getByText(/show preparation steps/i));
    expect(screen.getByText('Combine flour and salt.')).toBeInTheDocument();
    expect(screen.getByText('Knead for 10 minutes.')).toBeInTheDocument();
  });

  it('shows tips when present', () => {
    render(<DoughGuide {...defaultProps} />);
    fireEvent.click(screen.getByText(/show preparation steps/i));
    expect(
      screen.getByText('The dough should feel tacky.'),
    ).toBeInTheDocument();
  });

  it('changes toggle text when expanded', () => {
    render(<DoughGuide {...defaultProps} />);
    fireEvent.click(screen.getByText(/show preparation steps/i));
    expect(screen.getByText(/hide preparation steps/i)).toBeInTheDocument();
  });

  it('shows baking instructions as final step when expanded', () => {
    render(<DoughGuide {...defaultProps} />);
    fireEvent.click(screen.getByText(/show preparation steps/i));
    expect(screen.getByText('Bake')).toBeInTheDocument();
    expect(
      screen.getByText('Max oven temperature with pizza stone, 5-7 minutes.'),
    ).toBeInTheDocument();
    expect(screen.getByText(/275°C/)).toBeInTheDocument();
  });

  it('shows professional baking instructions when oven type is professional', () => {
    render(<DoughGuide {...defaultProps} ovenType="professional" />);
    fireEvent.click(screen.getByText(/show preparation steps/i));
    expect(
      screen.getByText('Wood-fired oven, 60-90 seconds.'),
    ).toBeInTheDocument();
    expect(screen.getByText(/485°C/)).toBeInTheDocument();
  });

  it('shows temperature in Fahrenheit when units is imperial', () => {
    render(<DoughGuide {...defaultProps} units="imperial" />);
    fireEvent.click(screen.getByText(/show preparation steps/i));
    expect(screen.getByText(/530°F/)).toBeInTheDocument();
  });
});
