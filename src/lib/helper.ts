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
      // activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
      // activitySeconds: hour % 4 === 0 ? 0 : (15 * MINUTES_IN_HOUR * hour) % SECONDS_IN_HOUR,
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
    secondsToComplete: i * SECONDS_IN_HOUR,
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
  if (el) {
    // el.scrollIntoView({
    //   block: 'center',
    //   behavior: 'smooth',
    // });
    const height = el.offsetTop;
    window.scrollTo({
      top: height - 100,
      behavior: 'smooth',
    });
  }
}
