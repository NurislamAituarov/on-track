import { generateTimelineItems } from '@/lib/helper';
import { THourItem } from '@/types';
import { reactive } from 'vue';
import { activities } from './activities';

export const timelineItems: THourItem[] = reactive(generateTimelineItems(activities));

export function updateTimelineItemActivitySeconds(timelineItem: THourItem, second: number) {
  timelineItem.activitySeconds += second;
}

export function selectActivity(timelineItem: THourItem, activityId: number) {
  timelineItem.activityId = activityId;
}
