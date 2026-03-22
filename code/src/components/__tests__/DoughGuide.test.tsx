import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DoughGuide } from '../DoughGuide';
import type { PreparationStep } from '@/util/dough-presets';

describe('DoughGuide', () => {
  const steps: PreparationStep[] = [
    { name: 'Mix dry ingredients', instruction: 'Combine flour and salt.' },
    { name: 'Knead', instruction: 'Knead for 10 minutes.', tip: 'The dough should feel tacky.' },
  ];

  it('is collapsed by default', () => {
    render(<DoughGuide steps={steps} />);
    expect(screen.queryByText('Combine flour and salt.')).not.toBeInTheDocument();
  });

  it('shows toggle button', () => {
    render(<DoughGuide steps={steps} />);
    expect(screen.getByText(/show preparation steps/i)).toBeInTheDocument();
  });

  it('expands to show steps when toggled', () => {
    render(<DoughGuide steps={steps} />);
    fireEvent.click(screen.getByText(/show preparation steps/i));
    expect(screen.getByText('Combine flour and salt.')).toBeInTheDocument();
    expect(screen.getByText('Knead for 10 minutes.')).toBeInTheDocument();
  });

  it('shows tips when present', () => {
    render(<DoughGuide steps={steps} />);
    fireEvent.click(screen.getByText(/show preparation steps/i));
    expect(screen.getByText('The dough should feel tacky.')).toBeInTheDocument();
  });

  it('changes toggle text when expanded', () => {
    render(<DoughGuide steps={steps} />);
    fireEvent.click(screen.getByText(/show preparation steps/i));
    expect(screen.getByText(/hide preparation steps/i)).toBeInTheDocument();
  });
});
