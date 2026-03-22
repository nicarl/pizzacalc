import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ShareButton } from '../ShareButton';

describe('ShareButton', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders share button', () => {
    render(<ShareButton url="https://example.com" />);
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });

  it('copies URL to clipboard on click', async () => {
    render(<ShareButton url="https://example.com?type=neapolitan" />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /share/i }));
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'https://example.com?type=neapolitan',
    );
  });

  it('shows confirmation toast after copying', async () => {
    render(<ShareButton url="https://example.com" />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /share/i }));
    });
    expect(screen.getByText(/copied/i)).toBeInTheDocument();
  });

  it('resets copied state after timeout', async () => {
    render(<ShareButton url="https://example.com" />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /share/i }));
    });
    expect(screen.getByText(/copied/i)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText(/share recipe/i)).toBeInTheDocument();
  });
});
