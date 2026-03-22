import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { App } from '../App';

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
  window.history.replaceState(null, '', '/');
});

describe('App', () => {
  it('renders calculator on root route', () => {
    render(<App />);
    expect(screen.getByText('Pizza Dough')).toBeInTheDocument();
  });
});
