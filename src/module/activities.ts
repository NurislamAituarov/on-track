import { generateActivities, generateActivitySelectOptions, id } from '@/lib/helper';
import { computed, reactive } from 'vue';
import { timelineItems } from './timeline-items';
import { IActivitiesItem } from '@/types';

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

export function selectTimeActivity(activity: IActivitiesItem, value: number) {
  activity.secondsToComplete = value || 0;
}
