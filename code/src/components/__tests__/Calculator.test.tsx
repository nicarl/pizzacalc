import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
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
    expect(screen.getByText('Focaccia').closest('button')).toHaveAttribute('data-selected', 'true');
    expect(screen.getByLabelText(/pans/i)).toHaveValue('2');
  });
});
