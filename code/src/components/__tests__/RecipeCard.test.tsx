import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RecipeCard } from '../RecipeCard';
import type { PizzaRecipe } from '@/util/calculations';

describe('RecipeCard', () => {
  const recipe: PizzaRecipe = {
    flourMass: 578, waterMass: 405, saltMass: 15, yeastMass: 1.2, oilMass: 0,
  };

  it('displays all ingredient amounts', () => {
    render(<RecipeCard recipe={recipe} showOil={false} units="metric" onToggleUnits={vi.fn()} />);
    expect(screen.getByText('Flour')).toBeInTheDocument();
    expect(screen.getByTestId('flour-amount')).toHaveTextContent('578');
    expect(screen.getByText('Water')).toBeInTheDocument();
    expect(screen.getByTestId('water-amount')).toHaveTextContent('405');
    expect(screen.getByText('Salt')).toBeInTheDocument();
    expect(screen.getByTestId('salt-amount')).toHaveTextContent('15');
    expect(screen.getByText('Yeast')).toBeInTheDocument();
    expect(screen.getByTestId('yeast-amount')).toHaveTextContent('1');
  });

  it('hides oil row when showOil is false', () => {
    render(<RecipeCard recipe={recipe} showOil={false} units="metric" onToggleUnits={vi.fn()} />);
    expect(screen.queryByText('Oil')).not.toBeInTheDocument();
  });

  it('shows oil row when showOil is true', () => {
    render(<RecipeCard recipe={{ ...recipe, oilMass: 40.5 }} showOil={true} units="metric" onToggleUnits={vi.fn()} />);
    expect(screen.getByText('Oil')).toBeInTheDocument();
    expect(screen.getByTestId('oil-amount')).toHaveTextContent('41');
  });

  it('shows unit toggle buttons', () => {
    render(<RecipeCard recipe={recipe} showOil={false} units="metric" onToggleUnits={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('g');
    expect(buttons[1]).toHaveTextContent('oz');
  });

  it('calls onToggleUnits when toggle is clicked', () => {
    const onToggle = vi.fn();
    render(<RecipeCard recipe={recipe} showOil={false} units="metric" onToggleUnits={onToggle} />);
    const ozButton = screen.getAllByRole('button')[1];
    fireEvent.click(ozButton);
    expect(onToggle).toHaveBeenCalledWith('imperial');
  });

  it('converts to imperial when units is imperial', () => {
    render(<RecipeCard recipe={recipe} showOil={false} units="imperial" onToggleUnits={vi.fn()} />);
    expect(screen.getByTestId('flour-amount')).toHaveTextContent('20.4');
  });
});
