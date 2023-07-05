export const PAGE_TIMELINE = 'timeline';
export const PAGE_ACTIVITIES = 'activities';
export const PAGE_PROGRESS = 'progress';
export const HOURS_IN_DAY = 24;

import { INavItems, IOptionsItem, IPeriodSelectItem } from '@/types';
import { ClockIcon, ListBulletIcon, ChartBarIcon } from '@heroicons/vue/24/outline';

export const navItems: INavItems[] = [
  { title: PAGE_TIMELINE, id: 1, icon: ClockIcon },
  { title: PAGE_ACTIVITIES, id: 2, icon: ListBulletIcon },
  { title: PAGE_PROGRESS, id: 3, icon: ChartBarIcon },
];

export const options: IOptionsItem[] = [
  {
    value: 1,
    label: 'Coding',
  },
  {
    value: 2,
    label: 'Reading',
  },
  {
    value: 3,
    label: 'Training',
  },
];

export const periodSelectOptions: IPeriodSelectItem[] = [
  {
    value: 15,
    label: '0:15',
  },
  {
    value: 30,
    label: '0:30',
  },
  {
    value: 45,
    label: '0:45',
  },
];
