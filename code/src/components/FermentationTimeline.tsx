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

function formatTotalDuration(firstTime: Date, lastTime: Date): string {
  const diffMs = lastTime.getTime() - firstTime.getTime();
  const totalHours = Math.round(diffMs / (1000 * 60 * 60));
  if (totalHours < 24) {
    return `Total: ~${totalHours} hour${totalHours !== 1 ? 's' : ''}`;
  }
  const days = Math.floor(totalHours / 24);
  const remainingHours = totalHours - days * 24;
  if (remainingHours === 0) {
    return `Total: ~${days} day${days !== 1 ? 's' : ''}`;
  }
  return `Total: ~${days} day${days !== 1 ? 's' : ''} ${remainingHours} hour${remainingHours !== 1 ? 's' : ''}`;
}

export function FermentationTimeline({ steps }: FermentationTimelineProps) {
  if (steps.length === 0) return null;

  const firstStep = steps[0];
  const lastStep = steps[steps.length - 1];
  const isStartInPast = firstStep.time < new Date();

  return (
    <div>
      <p className="text-text-secondary text-xs mb-3">
        {formatTotalDuration(firstStep.time, lastStep.time)}
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {steps.map((step, i) => (
          <li
            key={step.name}
            className="flex items-center gap-2.5 font-sans text-[13px]"
          >
            <div
              className="h-2 w-2 flex-shrink-0 rounded-full bg-primary"
              style={{ opacity: 1 - (i / steps.length) * 0.7 }}
            />
            <span className="min-w-[70px] font-medium text-text-secondary">
              {formatTime(step.time)}
            </span>
            <span className="text-text-primary">{step.name}</span>
          </li>
        ))}
      </ul>
      {isStartInPast && (
        <p className="text-orange-600 text-xs mt-2 bg-orange-50 rounded-lg px-3 py-2">
          Start time is in the past — move your target time later, or increase
          yeast or temperature.
        </p>
      )}
    </div>
  );
}
