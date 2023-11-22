import { IActivitiesItem, INavItems, THourItem } from '@/types';
import {
  HOURS_IN_DAY,
  MILlISECONDS_IN_SECONDS,
  MINUTES_IN_HOUR,
  PAGE_TIMELINE,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
} from './constants';

export function normalizeHash(navItems: INavItems[]): string {
  const hash = window.location.hash.slice(1);
  const titleNavItems = navItems.map((el) => el.title);

  if (titleNavItems.includes(hash)) return window.location.hash.substring(1);
  window.location.hash = PAGE_TIMELINE;

  return PAGE_TIMELINE;
}

export function generateTimelineItems(activities: IActivitiesItem[]) {
  const timelineItems: THourItem[] = [];

  for (let hour = 0; hour < HOURS_IN_DAY; hour++) {
    timelineItems.push({
      hour,
      activityId: [0, 1, 2, 3, 4].includes(hour) ? activities[hour % 3].id : null,
      activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0,
      // activityId: null,
      // activitySeconds: 0,
    });
  }
  return timelineItems;
}

export function generateActivitySelectOptions(activities: IActivitiesItem[]) {
  return activities.map((el) => ({
    label: el.name,
    value: el.id,
  }));
}

export function id() {
  const random = new Date().getTime().toString() + (Math.random() * (1000 - 1)).toFixed(0);
  return random;
}

export function generateActivities(): IActivitiesItem[] {
  return ['Coding', 'Reading', 'Training'].map((el, i) => ({
    id: id(),
    name: el,
    secondsToComplete: 15 * 60,
    // secondsToComplete: i * SECONDS_IN_HOUR,
  }));
}

export function generatePeriodSelectOptions(periodsInMinutes: number[]) {
  return periodsInMinutes.map((period) => {
    return {
      value: period * SECONDS_IN_MINUTE,
      label: generatePeriodSelectOptionsLabel(period),
    };
  });
}

function generatePeriodSelectOptionsLabel(period: number) {
  const hours = Math.floor(period / MINUTES_IN_HOUR)
    .toString()
    .padStart(2, '0');

  const minutes = (period % MINUTES_IN_HOUR).toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function formatSeconds(seconds: number) {
  const date = new Date();
  date.setTime(Math.abs(seconds) * MILlISECONDS_IN_SECONDS);
  const utc = date.toUTCString();
  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
}

export function scrollToCurrentTimeLineItem(el: HTMLLIElement | null, isSmooth = false) {
  if (el)
    el.scrollIntoView({
      block: 'center',
      behavior: isSmooth ? 'smooth' : undefined,
    });
}
export function getTotalActivitySeconds(activity: IActivitiesItem, timelineItems: THourItem[]) {
  return timelineItems
    .filter((item) => item.activityId === activity.id)
    .reduce((total, item) => {
      return Math.round(item.activitySeconds + total);
    }, 0);
}

export const getProgressColorClass = (percent: number) => {
  if (percent < 33) return 'bg-red-500';
  if (percent < 66) return 'bg-yellow-500';
  if (percent < 100) return 'bg-blue-500';
  return 'bg-green-500';
};
