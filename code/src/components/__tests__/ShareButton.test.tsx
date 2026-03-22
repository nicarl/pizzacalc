import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ShareButton } from '../ShareButton';

describe('ShareButton', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  it('renders share button', () => {
    render(<ShareButton url="https://example.com" />);
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });

  it('copies URL to clipboard on click', async () => {
    render(<ShareButton url="https://example.com?type=neapolitan" />);
    fireEvent.click(screen.getByRole('button', { name: /share/i }));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('https://example.com?type=neapolitan');
  });

  it('shows confirmation toast after copying', async () => {
    render(<ShareButton url="https://example.com" />);
    fireEvent.click(screen.getByRole('button', { name: /share/i }));
    expect(await screen.findByText(/copied/i)).toBeInTheDocument();
  });
});
