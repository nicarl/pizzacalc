import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Calculator } from '../Calculator';

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
  window.history.replaceState(null, '', '/');
});

describe('Calculator', () => {
  it('renders all sections', () => {
    render(<Calculator />);
    expect(screen.getByText('Pizza Dough')).toBeInTheDocument();
    expect(screen.getByText('Neapolitan')).toBeInTheDocument();
    expect(screen.getByLabelText(/pizzas/i)).toBeInTheDocument();
    expect(screen.getByText('Flour')).toBeInTheDocument();
  });

  it('updates recipe when pizza count changes', async () => {
    render(<Calculator />);
    const input = screen.getByLabelText(/pizzas/i);
    fireEvent.change(input, { target: { value: '8' } });
    await waitFor(() => {
      const flourElement = screen.getByTestId('flour-amount');
      const value = Number(flourElement.textContent);
      expect(value).toBeGreaterThan(0);
    });
  });

  it('switches dough type and updates defaults', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('Focaccia'));
    expect(screen.getByText('Oil')).toBeInTheDocument();
  });

  it('hides oil for neapolitan', () => {
    render(<Calculator />);
    expect(screen.queryByText('Oil')).not.toBeInTheDocument();
  });

  it('shows pans label for pan-style dough', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('Detroit'));
    expect(screen.getByLabelText(/pans/i)).toBeInTheDocument();
  });

  it('restores state from URL params', () => {
    window.history.replaceState(null, '', '/?type=focaccia&n=2');
    render(<Calculator />);
    expect(screen.getByText('Focaccia').closest('button')).toHaveAttribute(
      'data-selected',
      'true',
    );
    expect(screen.getByLabelText(/pans/i)).toHaveValue('2');
  });

  it('resets advanced inputs to preset defaults', () => {
    render(<Calculator />);
    // Open advanced panel
    fireEvent.click(screen.getByText(/adjust hydration/i));
    // Change water percent to create an override
    fireEvent.change(screen.getByLabelText(/water %/i), {
      target: { value: '70' },
    });
    // Click reset
    fireEvent.click(screen.getByText(/reset to defaults/i));
    // Water should be back to neapolitan default (65)
    expect(screen.getByLabelText(/water %/i)).toHaveValue('65');
  });

  it('updates doughball weight via CoreInputs', () => {
    render(<Calculator />);
    const input = screen.getByLabelText(/doughball/i);
    fireEvent.change(input, { target: { value: '300' } });
    expect(input).toHaveValue('300');
  });

  it('updates oven type via CoreInputs', () => {
    render(<Calculator />);
    const select = screen.getByLabelText(/oven type/i);
    fireEvent.change(select, { target: { value: 'professional' } });
    expect(select).toHaveValue('professional');
  });

  it('sets water to 60% when switching neapolitan to professional oven', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText(/adjust hydration/i));
    expect(screen.getByLabelText(/water %/i)).toHaveValue('65');
    const select = screen.getByLabelText(/oven type/i);
    fireEvent.change(select, { target: { value: 'professional' } });
    expect(screen.getByLabelText(/water %/i)).toHaveValue('60');
  });

  it('restores water to 65% when switching neapolitan back to home oven', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText(/adjust hydration/i));
    const select = screen.getByLabelText(/oven type/i);
    fireEvent.change(select, { target: { value: 'professional' } });
    expect(screen.getByLabelText(/water %/i)).toHaveValue('60');
    fireEvent.change(select, { target: { value: 'home' } });
    expect(screen.getByLabelText(/water %/i)).toHaveValue('65');
  });

  it('uses professional water when switching to neapolitan while oven is professional', () => {
    render(<Calculator />);
    // Switch oven to professional while on neapolitan
    const select = screen.getByLabelText(/oven type/i);
    fireEvent.change(select, { target: { value: 'professional' } });
    // Switch to NY (resets to home oven)
    fireEvent.click(screen.getByText('New York'));
    // Switch oven back to professional on NY
    const select2 = screen.getByLabelText(/oven type/i);
    fireEvent.change(select2, { target: { value: 'professional' } });
    // Now switch to neapolitan - prev.ovenType is professional so should use 60
    fireEvent.click(screen.getByText('Neapolitan'));
    fireEvent.click(screen.getByText(/adjust hydration/i));
    expect(screen.getByLabelText(/water %/i)).toHaveValue('60');
  });

  it('does not change water when switching oven type for non-neapolitan', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('New York'));
    fireEvent.click(screen.getByText(/adjust hydration/i));
    expect(screen.getByLabelText(/water %/i)).toHaveValue('63');
    const select = screen.getByLabelText(/oven type/i);
    fireEvent.change(select, { target: { value: 'professional' } });
    expect(screen.getByLabelText(/water %/i)).toHaveValue('63');
  });

  it('updates target time via FermentationInputs', () => {
    render(<Calculator />);
    const input = screen.getByLabelText(/eat at/i);
    fireEvent.change(input, { target: { value: '2026-04-01T18:00' } });
    expect(input).toHaveValue('2026-04-01T18:00');
  });

  it('updates fridge temp via FermentationInputs', () => {
    render(<Calculator />);
    // Switch to New York which has cold ferment (fridge phase)
    fireEvent.click(screen.getByText('New York'));
    const input = screen.getByLabelText(/fridge/i);
    fireEvent.change(input, { target: { value: '3' } });
    expect(input).toHaveValue('3');
  });

  it('toggles units to metric via RecipeCard', () => {
    render(<Calculator />);
    // Click oz first, then click g (metric) to exercise the metric callback
    const gButton = screen.getByRole('button', { name: 'g' });
    fireEvent.click(gButton);
    // Still in metric, flour should be in grams
    expect(screen.getByTestId('flour-amount').textContent).not.toContain('.');
  });

  it('changes advanced inputs (water, salt, yeast) inline', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText(/adjust hydration/i));
    fireEvent.change(screen.getByLabelText(/salt %/i), {
      target: { value: '3' },
    });
    expect(screen.getByLabelText(/salt %/i)).toHaveValue('3');
    fireEvent.change(screen.getByLabelText(/yeast %/i), {
      target: { value: '0.1' },
    });
    expect(screen.getByLabelText(/yeast %/i)).toHaveValue('0.1');
  });

  it('changes oil percent for focaccia', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('Focaccia'));
    fireEvent.click(screen.getByText(/adjust hydration/i));
    fireEvent.change(screen.getByLabelText(/oil %/i), {
      target: { value: '10' },
    });
    expect(screen.getByLabelText(/oil %/i)).toHaveValue('10');
  });

  it('updates ambient temp', () => {
    render(<Calculator />);
    const input = screen.getByLabelText(/ambient/i);
    fireEvent.change(input, { target: { value: '25' } });
    expect(input).toHaveValue('25');
  });

  it('handles empty numeric inputs gracefully (fallback branches)', () => {
    render(<Calculator />);
    // Switch to New York to get fridge input visible
    fireEvent.click(screen.getByText('New York'));
    // Set pizza count to empty to trigger || 0 fallback
    fireEvent.change(screen.getByLabelText(/pizzas/i), {
      target: { value: '' },
    });
    // Set doughball weight to empty
    fireEvent.change(screen.getByLabelText(/doughball/i), {
      target: { value: '' },
    });
    // Set ambient and fridge to empty to trigger || 22 and || 4 fallbacks
    fireEvent.change(screen.getByLabelText(/ambient/i), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText(/fridge/i), {
      target: { value: '' },
    });
    // Set target time to empty to trigger empty targetTime branch
    fireEvent.change(screen.getByLabelText(/eat at/i), {
      target: { value: '' },
    });
    // Open advanced and empty those too
    fireEvent.click(screen.getByText(/adjust hydration/i));
    fireEvent.change(screen.getByLabelText(/water %/i), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText(/salt %/i), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText(/yeast %/i), {
      target: { value: '' },
    });
    // Should still render without crashing
    expect(screen.getByText('Flour')).toBeInTheDocument();
  });

  it('switches to imperial units', () => {
    render(<Calculator />);
    const ozButton = screen.getByRole('button', { name: 'oz' });
    fireEvent.click(ozButton);
    // Should now show imperial values
    expect(screen.getByTestId('flour-amount').textContent).toContain('.');
  });

  it('hides fridge temp for dough types without cold ferment', () => {
    render(<Calculator />);
    // Neapolitan has no cold ferment
    expect(screen.queryByLabelText(/fridge/i)).not.toBeInTheDocument();
    // Switch to New York which has cold ferment
    fireEvent.click(screen.getByText('New York'));
    expect(screen.getByLabelText(/fridge/i)).toBeInTheDocument();
  });
});
