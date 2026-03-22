import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ToggleGroup, ToggleGroupItem } from '../toggle-group';

describe('ToggleGroup', () => {
  it('renders toggle group with items', () => {
    render(
      <ToggleGroup>
        <ToggleGroupItem value="a" aria-label="Option A">
          A
        </ToggleGroupItem>
        <ToggleGroupItem value="b" aria-label="Option B">
          B
        </ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(
      screen.getByRole('button', { name: 'Option A' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Option B' }),
    ).toBeInTheDocument();
  });

  it('applies custom className to group', () => {
    render(
      <ToggleGroup className="custom-group" data-testid="group">
        <ToggleGroupItem value="a" aria-label="A">
          A
        </ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByTestId('group').className).toContain('custom-group');
  });

  it('renders with variant and size context', () => {
    render(
      <ToggleGroup variant="outline" size="sm">
        <ToggleGroupItem value="a" aria-label="A">
          A
        </ToggleGroupItem>
      </ToggleGroup>,
    );
    expect(screen.getByRole('button', { name: 'A' })).toBeInTheDocument();
  });

  it('renders with spacing and vertical orientation', () => {
    render(
      <ToggleGroup spacing={4} orientation="vertical" data-testid="group">
        <ToggleGroupItem value="a" aria-label="A">
          A
        </ToggleGroupItem>
      </ToggleGroup>,
    );
    const group = screen.getByTestId('group');
    expect(group).toHaveAttribute('data-orientation', 'vertical');
    expect(group).toHaveAttribute('data-spacing', '4');
  });

  it('renders ToggleGroupItem with custom className', () => {
    render(
      <ToggleGroup>
        <ToggleGroupItem value="a" aria-label="A" className="custom-item">
          A
        </ToggleGroupItem>
      </ToggleGroup>,
    );
    const button = screen.getByRole('button', { name: 'A' });
    expect(button.className).toContain('custom-item');
  });
});
