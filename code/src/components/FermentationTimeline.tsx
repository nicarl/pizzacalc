import type { TimelineStep } from '@/util/fermentation';

interface FermentationTimelineProps {
  steps: TimelineStep[];
}

function formatTime(date: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = days[date.getDay()];
  const hours = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');
  return `${day} ${hours}:${mins}`;
}

export function FermentationTimeline({ steps }: FermentationTimelineProps) {
  if (steps.length === 0) return null;

  return (
    <div className="mt-4 flex flex-col gap-2" role="list">
      {steps.map((step, i) => (
        <div key={step.name} className="flex items-center gap-2.5 font-sans text-[13px]" role="listitem">
          <div
            className="h-2 w-2 flex-shrink-0 rounded-full bg-primary"
            style={{ opacity: 1 - (i / steps.length) * 0.7 }}
          />
          <span className="min-w-[70px] font-medium text-text-secondary">
            {formatTime(step.time)}
          </span>
          <span className="text-text-primary">{step.name}</span>
        </div>
      ))}
    </div>
  );
}
