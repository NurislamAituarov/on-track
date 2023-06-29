export const PAGE_TIMELINE = 'timeline';
export const PAGE_ACTIVITIES = 'activities';
export const PAGE_PROGRESS = 'progress';
export const HOURS_IN_DAY = 24;

import { INavItems } from '@/types';
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';

export const navItems: INavItems[] = [
  { title: PAGE_TIMELINE, id: 1, icon: ClockIcon },
  { title: PAGE_ACTIVITIES, id: 2, icon: ListBulletIcon },
  { title: PAGE_PROGRESS, id: 3, icon: ChartBarIcon },
];
