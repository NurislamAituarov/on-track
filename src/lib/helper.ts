import { INavItems, THourItem } from '@/types';
import { HOURS_IN_DAY, PAGE_TIMELINE } from '../lib/constants';

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
    timelineItems.push({ hour: i });
  }
  return timelineItems;
}
