import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FermentationTimeline } from '../FermentationTimeline';
import type { TimelineStep } from '@/util/fermentation';

describe('FermentationTimeline', () => {
  const steps: TimelineStep[] = [
    { name: 'Mix & knead dough', time: new Date('2026-03-21T10:00:00'), description: 'Mix and knead (30min)' },
    { name: 'Bulk ferment', time: new Date('2026-03-21T10:30:00'), description: 'Cover and let rise (8h)' },
    { name: 'Ready to bake!', time: new Date('2026-03-22T19:00:00'), description: 'Your dough is ready' },
  ];

  it('renders all timeline steps', () => {
    render(<FermentationTimeline steps={steps} />);
    expect(screen.getByText('Mix & knead dough')).toBeInTheDocument();
    expect(screen.getByText('Bulk ferment')).toBeInTheDocument();
    expect(screen.getByText('Ready to bake!')).toBeInTheDocument();
  });

  it('shows formatted times', () => {
    render(<FermentationTimeline steps={steps} />);
    expect(screen.getByText(/Sat 10:00/)).toBeInTheDocument();
  });

  it('renders empty state when no steps', () => {
    render(<FermentationTimeline steps={[]} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});
