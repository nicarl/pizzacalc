import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DoughTypeSelector } from '../DoughTypeSelector';

describe('DoughTypeSelector', () => {
  it('renders all dough type options', () => {
    render(<DoughTypeSelector selected="neapolitan" onSelect={vi.fn()} />);
    expect(screen.getByText('Neapolitan')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('Detroit')).toBeInTheDocument();
    expect(screen.getByText('Focaccia')).toBeInTheDocument();
  });

  it('highlights selected type', () => {
    render(<DoughTypeSelector selected="detroit" onSelect={vi.fn()} />);
    const detroit = screen.getByText('Detroit');
    expect(detroit.closest('button')).toHaveAttribute('data-selected', 'true');
  });

  it('calls onSelect when clicking a type', () => {
    const onSelect = vi.fn();
    render(<DoughTypeSelector selected="neapolitan" onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Focaccia'));
    expect(onSelect).toHaveBeenCalledWith('focaccia');
  });

  it('does not call onSelect when clicking already-selected type', () => {
    const onSelect = vi.fn();
    render(<DoughTypeSelector selected="neapolitan" onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Neapolitan'));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
