import { computed, reactive } from 'vue';
import {
  generateActivities,
  generateActivitySelectOptions,
  getTotalActivitySeconds,
  id,
} from '@/lib/helper';
import { resetTimelineItemActivities, timelineItems } from './timeline-items';
import { IActivitiesItem } from '@/types';

export const activities = reactive(generateActivities());
export const activitySelectOptions = computed(() => generateActivitySelectOptions(activities));

export const trackedActivities = computed(() =>
  activities.filter(({ secondsToComplete }) => secondsToComplete),
);

export function createActivityItem(name: string) {
  activities.push({
    id: id(),
    name,
    secondsToComplete: 0,
  });
}

export function deleteActivityItem(id: string) {
  resetTimelineItemActivities(id);

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

export function calculateCompletionPercentage(totalTrackedSeconds: number) {
  const percentage = Math.floor((totalTrackedSeconds * 100) / totalActivitySecondsToComplete.value);
  if (Number.isNaN(percentage)) return 0;

  return percentage;
}

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map(({ secondsToComplete }) => secondsToComplete ?? 0)
    .reduce((total, seconds) => total + seconds, 0);
});
