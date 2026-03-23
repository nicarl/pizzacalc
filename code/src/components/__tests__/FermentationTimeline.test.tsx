import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { TimelineStep } from '@/util/fermentation';
import { FermentationTimeline } from '../FermentationTimeline';

describe('FermentationTimeline', () => {
  const futureSteps: TimelineStep[] = [
    {
      name: 'Mix & knead dough',
      time: new Date('2099-03-21T10:00:00'),
      description: 'Mix and knead (30min)',
    },
    {
      name: 'Bulk ferment',
      time: new Date('2099-03-21T10:30:00'),
      description: 'Cover and let rise (8h)',
    },
    {
      name: 'Ready to bake!',
      time: new Date('2099-03-22T19:00:00'),
      description: 'Your dough is ready',
    },
  ];

  const pastSteps: TimelineStep[] = [
    {
      name: 'Mix & knead dough',
      time: new Date('2020-01-01T10:00:00'),
      description: 'Mix and knead (30min)',
    },
    {
      name: 'Ready to bake!',
      time: new Date('2020-01-02T19:00:00'),
      description: 'Your dough is ready',
    },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-22T12:00:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders all timeline steps', () => {
    render(<FermentationTimeline steps={futureSteps} />);
    expect(screen.getByText('Mix & knead dough')).toBeInTheDocument();
    expect(screen.getByText('Bulk ferment')).toBeInTheDocument();
    expect(screen.getByText('Ready to bake!')).toBeInTheDocument();
  });

  it('shows formatted times', () => {
    render(<FermentationTimeline steps={futureSteps} />);
    expect(screen.getByText(/Sat 10:00/)).toBeInTheDocument();
  });

  it('renders empty state when no steps', () => {
    render(<FermentationTimeline steps={[]} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('shows total duration summary', () => {
    render(<FermentationTimeline steps={futureSteps} />);
    expect(screen.getByText(/Total: ~1 day 9 hours/)).toBeInTheDocument();
  });

  it('shows total duration in hours only when less than a day', () => {
    const shortSteps: TimelineStep[] = [
      {
        name: 'Mix & knead dough',
        time: new Date('2099-03-21T10:00:00'),
        description: 'Mix',
      },
      {
        name: 'Ready to bake!',
        time: new Date('2099-03-21T23:00:00'),
        description: 'Done',
      },
    ];
    render(<FermentationTimeline steps={shortSteps} />);
    expect(screen.getByText('Total: ~13 hours')).toBeInTheDocument();
  });

  it('shows total duration in days only when no remaining hours', () => {
    const evenSteps: TimelineStep[] = [
      {
        name: 'Mix & knead dough',
        time: new Date('2099-03-21T10:00:00'),
        description: 'Mix',
      },
      {
        name: 'Ready to bake!',
        time: new Date('2099-03-23T10:00:00'),
        description: 'Done',
      },
    ];
    render(<FermentationTimeline steps={evenSteps} />);
    expect(screen.getByText('Total: ~2 days')).toBeInTheDocument();
  });

  it('does not show past warning when start is in the future', () => {
    render(<FermentationTimeline steps={futureSteps} />);
    expect(
      screen.queryByText(/Start time is in the past/),
    ).not.toBeInTheDocument();
  });

  it('shows past warning when start is in the past', () => {
    render(<FermentationTimeline steps={pastSteps} />);
    expect(screen.getByText(/Start time is in the past/)).toBeInTheDocument();
  });

  it('shows singular day when exactly 1 day', () => {
    const oneDaySteps: TimelineStep[] = [
      {
        name: 'Mix',
        time: new Date('2099-03-21T10:00:00'),
        description: 'Mix',
      },
      {
        name: 'Done',
        time: new Date('2099-03-22T10:00:00'),
        description: 'Done',
      },
    ];
    render(<FermentationTimeline steps={oneDaySteps} />);
    expect(screen.getByText('Total: ~1 day')).toBeInTheDocument();
  });

  it('handles singular hour', () => {
    const oneHourSteps: TimelineStep[] = [
      {
        name: 'Mix',
        time: new Date('2099-03-21T10:00:00'),
        description: 'Mix',
      },
      {
        name: 'Done',
        time: new Date('2099-03-21T11:00:00'),
        description: 'Done',
      },
    ];
    render(<FermentationTimeline steps={oneHourSteps} />);
    expect(screen.getByText('Total: ~1 hour')).toBeInTheDocument();
  });

  it('handles singular remaining hour (1 day 1 hour)', () => {
    const steps25h: TimelineStep[] = [
      {
        name: 'Mix',
        time: new Date('2099-03-21T10:00:00'),
        description: 'Mix',
      },
      {
        name: 'Done',
        time: new Date('2099-03-22T11:00:00'),
        description: 'Done',
      },
    ];
    render(<FermentationTimeline steps={steps25h} />);
    expect(screen.getByText('Total: ~1 day 1 hour')).toBeInTheDocument();
  });

  it('handles singular day with remaining hours', () => {
    const oneDaySteps: TimelineStep[] = [
      {
        name: 'Mix',
        time: new Date('2099-03-21T10:00:00'),
        description: 'Mix',
      },
      {
        name: 'Done',
        time: new Date('2099-03-22T13:00:00'),
        description: 'Done',
      },
    ];
    render(<FermentationTimeline steps={oneDaySteps} />);
    expect(screen.getByText('Total: ~1 day 3 hours')).toBeInTheDocument();
  });
});
