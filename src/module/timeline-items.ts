import { generateTimelineItems } from '@/lib/helper';
import { IActivitiesItem, THourItem } from '@/types';
import { ref } from 'vue';
import { activities } from './activities';
import { now } from './time';

export const timelineItems = ref(generateTimelineItems(activities.value));

export function updateTimelineItem(timelineItem: THourItem, fields: THourItem) {
  return Object.assign(timelineItem, fields);
}

export function resetTimelineItemActivities(id: string) {
  console.log(timelineItems.value);
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === id) {
      updateTimelineItem(timelineItem, {
        ...timelineItem,
        activitySeconds:
          timelineItem.hour === now.value.getHours() ? timelineItem.activitySeconds : 0,
        activityId: null,
      });
    }
  });
}

export function selectActivity(timelineItem: THourItem, activityId: number) {
  timelineItem.activityId = activityId;
}

export function calculateTrackedActivitySeconds(activity: IActivitiesItem) {
  return filterTimelineItemsByActivity(timelineItems.value, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0);
}

function filterTimelineItemsByActivity(timelineItems: THourItem[], activity: IActivitiesItem) {
  return timelineItems.filter(({ activityId }) => activityId === activity.id);
}
