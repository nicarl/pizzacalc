import { describe, expect, it } from 'vitest';
import { getDoughPreset } from '../dough-presets';
import { adjustDuration, calculateTimeline } from '../fermentation';

describe('adjustDuration', () => {
  it('returns base duration at reference temp', () => {
    expect(adjustDuration(120, 22, 22)).toBe(120);
  });

  it('halves duration when temp is ~9°C above reference', () => {
    const adjusted = adjustDuration(120, 31, 22);
    expect(adjusted).toBeCloseTo(60, -1);
  });

  it('doubles duration when temp is ~9°C below reference', () => {
    const adjusted = adjustDuration(120, 13, 22);
    expect(adjusted).toBeCloseTo(240, -1);
  });

  it('handles fridge temperatures', () => {
    const adjusted = adjustDuration(120, 4, 22);
    expect(adjusted).toBeGreaterThan(400);
  });
});

describe('calculateTimeline', () => {
  it('calculates neapolitan timeline backwards from target', () => {
    const profile = getDoughPreset('neapolitan').fermentation;
    const target = new Date('2026-03-22T19:00:00');
    const timeline = calculateTimeline(profile, target, 20, 4);

    const lastStep = timeline[timeline.length - 1];
    expect(lastStep.name).toBe('Ready to bake!');
    expect(lastStep.time.getTime()).toBe(target.getTime());
    expect(timeline[0].time.getTime()).toBeLessThan(target.getTime());
    expect(timeline.length).toBeGreaterThanOrEqual(4);
  });

  it('calculates new york timeline with cold ferment', () => {
    const profile = getDoughPreset('new-york').fermentation;
    const target = new Date('2026-03-22T19:00:00');
    const timeline = calculateTimeline(profile, target, 21, 3);

    const firstStep = timeline[0];
    const lastStep = timeline[timeline.length - 1];
    const spanHours =
      (lastStep.time.getTime() - firstStep.time.getTime()) / (1000 * 60 * 60);
    expect(spanHours).toBeGreaterThan(40);
  });

  it('adjusts for different ambient temperatures', () => {
    const profile = getDoughPreset('neapolitan').fermentation;
    const target = new Date('2026-03-22T19:00:00');

    const timelineCold = calculateTimeline(profile, target, 15, 4);
    const timelineWarm = calculateTimeline(profile, target, 28, 4);

    expect(timelineCold[0].time.getTime()).toBeLessThan(
      timelineWarm[0].time.getTime(),
    );
  });

  it('formats durations exceeding 24h as days and hours', () => {
    // Use a very cold fridge temp to produce durations > 24h with remaining hours
    const profile = getDoughPreset('new-york').fermentation;
    const target = new Date('2026-03-22T19:00:00');
    const timeline = calculateTimeline(profile, target, 22, 1);

    // Check that at least one step description contains the "Xd Yh" format
    const hasDayHourFormat = timeline.some(step =>
      /\d+d \d+h/.test(step.description),
    );
    expect(hasDayHourFormat).toBe(true);
  });
});
