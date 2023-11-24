import { activities } from '@/module/activities';
import { endOfHour, isToday, toSeconds, today } from '@/module/time';
import { timelineItems } from '@/module/timeline-items';
import { State, THourItem } from '@/types';

export const getItemFromStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : {};
};

export const setItemFromStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export function saveState() {
  setItemFromStorage('ontrack', {
    timelineItems: timelineItems.value,
    activities: activities.value,
    lastActiveAt: today(),
  });
}

export function loadState() {
  const state: State = getItemFromStorage('ontrack');

  activities.value = state.activities || activities.value;
  const lastActiveAt = new Date(state.lastActiveAt);
  timelineItems.value = isToday(lastActiveAt)
    ? syncIdleSeconds(state.timelineItems, lastActiveAt)
    : timelineItems.value;
}

function syncIdleSeconds(timelineItems: THourItem[], lastActiveAt: Date) {
  const activeTimelineItem = timelineItems.find((timelineItem) => timelineItem.isActiveTimer);

  if (activeTimelineItem) {
    activeTimelineItem.activitySeconds += calculateIdleSeconds(lastActiveAt);
  }

  return timelineItems;
}

function calculateIdleSeconds(lastActiveAt: Date) {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(+today() - +lastActiveAt)
    : toSeconds(+endOfHour(lastActiveAt) - +lastActiveAt);
}
