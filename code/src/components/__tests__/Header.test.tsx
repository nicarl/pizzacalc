import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from '../Header';

describe('Header', () => {
  it('renders app title', () => {
    render(<Header />);
    expect(screen.getByText('Pizza Dough')).toBeInTheDocument();
  });
  it('renders subtitle', () => {
    render(<Header />);
    expect(screen.getByText('Calculate your perfect recipe')).toBeInTheDocument();
  });
});
