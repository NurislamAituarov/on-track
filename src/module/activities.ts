import { computed, reactive } from 'vue';
import {
  generateActivities,
  generateActivitySelectOptions,
  getTotalActivitySeconds,
  id,
} from '@/lib/helper';
import { timelineItems } from './timeline-items';
import { IActivitiesItem, THourItem } from '@/types';

export const activities = reactive(generateActivities());
export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities));

export function createActivityItem(name: string) {
  activities.push({
    id: id(),
    name,
    secondsToComplete: 0,
  });
}

export function deleteActivityItem(id: string) {
  timelineItems.forEach((el) => {
    if (el.activityId === id) {
      el.activityId = null;
      el.activitySeconds = 0;
    }
  });
  const activityItemId = activities.findIndex((el) => el.id === id);
  activities.splice(activityItemId, 1);
}

export function updateTimeActivity(activity: IActivitiesItem, value: number) {
  activity.secondsToComplete = value || 0;
}

export function getTotalActivityProgress(activity: IActivitiesItem) {
  const activitySeconds = getTotalActivitySeconds(activity, timelineItems);
  const secondsToComplete = activity.secondsToComplete ? activity.secondsToComplete : 0;

  return ((activitySeconds * 100) / secondsToComplete).toFixed();
}
