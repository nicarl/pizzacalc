import type { FermentationProfile } from './dough-presets';

export interface TimelineStep {
  name: string;
  time: Date;
  description: string;
}

const DOUBLING_TEMP_DELTA = 9;

function roundToNearest15Min(date: Date): Date {
  const ms = date.getTime();
  const fifteenMin = 15 * 60 * 1000;
  return new Date(Math.round(ms / fifteenMin) * fifteenMin);
}

export function adjustDuration(
  baseDurationMin: number,
  actualTemp: number,
  referenceTemp: number,
): number {
  const tempDelta = actualTemp - referenceTemp;
  const factor = 2 ** (tempDelta / DOUBLING_TEMP_DELTA);
  return baseDurationMin / factor;
}

export function calculateTimeline(
  profile: FermentationProfile,
  targetTime: Date,
  ambientTempC: number,
  fridgeTempC: number,
  bakeTimeMin: number,
): TimelineStep[] {
  const steps: TimelineStep[] = [];
  let currentTime = new Date(targetTime);

  steps.unshift({
    name: 'Time to eat!',
    time: new Date(currentTime),
    description: 'Enjoy your pizza!',
  });

  currentTime = new Date(currentTime.getTime() - bakeTimeMin * 60000);
  currentTime = roundToNearest15Min(currentTime);

  steps.unshift({
    name: 'Ready to bake!',
    time: new Date(currentTime),
    description: `Start baking (~${bakeTimeMin}min)`,
  });

  const reversedPhases = [...profile.phases].reverse();
  for (const phase of reversedPhases) {
    const temp = phase.environment === 'fridge' ? fridgeTempC : ambientTempC;
    const adjustedDuration = adjustDuration(
      phase.baseDurationMin,
      temp,
      phase.referenceTemp,
    );

    steps.unshift({
      name: phase.name,
      time: roundToNearest15Min(new Date(currentTime)),
      description: `${phase.description} (${formatDuration(adjustedDuration)})`,
    });

    currentTime = new Date(currentTime.getTime() - adjustedDuration * 60000);
  }

  steps.unshift({
    name: 'Mix & knead dough',
    time: roundToNearest15Min(new Date(currentTime)),
    description: `Mix and knead (${formatDuration(profile.prepTimeMin)})`,
  });

  return steps;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)}min`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours * 10) / 10}h`;
  const days = Math.floor(hours / 24);
  const remainingHours = Math.round(hours - days * 24);
  if (remainingHours === 0) return `${days}d`;
  return `${days}d ${remainingHours}h`;
}
