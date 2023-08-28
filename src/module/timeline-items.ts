import { generateTimelineItems } from '@/lib/helper';
import { IActivitiesItem, THourItem } from '@/types';
import { reactive } from 'vue';
import { activities } from './activities';

export const timelineItems: THourItem[] = reactive(generateTimelineItems(activities));

export function updateTimelineItemActivitySeconds(timelineItem: THourItem, second: number) {
  timelineItem.activitySeconds = second;
}

export function selectActivity(timelineItem: THourItem, activityId: number) {
  timelineItem.activityId = activityId;
}

export function calculateTrackedActivitySeconds(activity: IActivitiesItem) {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0);
}

function filterTimelineItemsByActivity(timelineItems: THourItem[], activity: IActivitiesItem) {
  return timelineItems.filter(({ activityId }) => activityId === activity.id);
}
