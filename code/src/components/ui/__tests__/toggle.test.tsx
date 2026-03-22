import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Toggle, toggleVariants } from '../toggle';

describe('Toggle', () => {
  it('renders a toggle button', () => {
    render(<Toggle aria-label="Bold">B</Toggle>);
    expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Toggle className="custom-toggle" aria-label="test">
        T
      </Toggle>,
    );
    const button = screen.getByRole('button');
    expect(button.className).toContain('custom-toggle');
  });

  it('renders with outline variant', () => {
    render(
      <Toggle variant="outline" aria-label="test">
        T
      </Toggle>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with different sizes', () => {
    render(
      <Toggle size="sm" aria-label="test">
        T
      </Toggle>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('exports toggleVariants', () => {
    const result = toggleVariants({ variant: 'outline', size: 'lg' });
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
