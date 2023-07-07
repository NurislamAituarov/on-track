import { IActivitiesItem, INavItems, THourItem } from '@/types';
import { HOURS_IN_DAY, PAGE_TIMELINE, SECONDS_IN_HOURS } from '../lib/constants';

export function normalizeHash(navItems: INavItems[]): string {
  const hash = window.location.hash.slice(1);
  const titleNavItems = navItems.map((el) => el.title);

  if (titleNavItems.includes(hash)) return window.location.hash.substring(1);
  window.location.hash = PAGE_TIMELINE;

  return PAGE_TIMELINE;
}

export function generateTimelineItems() {
  const timelineItems: THourItem[] = [];

  for (let i = 0; i < HOURS_IN_DAY; i++) {
    timelineItems.push({ hour: i, activityId: null });
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
    secondsToComplete: i * SECONDS_IN_HOURS,
  }));
}
