import { generateTimelineItems } from '@/lib/helper';
import { IActivitiesItem, THourItem } from '@/types';
import { reactive } from 'vue';
import { activities } from './activities';
import { now } from './time';

export const timelineItems: THourItem[] = reactive(generateTimelineItems(activities));

export function updateTimelineItem(timelineItem: THourItem, fields: THourItem) {
  return Object.assign(timelineItem, fields);
}

export function resetTimelineItemActivities(id: string) {
  timelineItems.forEach((timelineItem) => {
    if (timelineItem.activityId === id) {
      updateTimelineItem(timelineItem, {
        activitySeconds:
          timelineItem.hour === now.value.getHours() ? timelineItem.activitySeconds : 0,
        activityId: null,
        hour: timelineItem.hour,
      });
    }
  });
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

// Timer
// export const timelineItemTimer = ref<boolean | number>(false);
// export const seconds = ref(0);
// export const formattedSeconds = computed(() => {
//   return formatSeconds(seconds.value);
// });

// export function startTimelineItemTimer(timelineItem: THourItem) {
//   seconds.value = timelineItem.activitySeconds;

//   timelineItemTimer.value = setInterval(() => {
//     updateTimelineItemActivitySeconds(timelineItem, timelineItem.activitySeconds + 50);
//     seconds.value++;
//   }, MILlISECONDS_IN_SECONDS);
// }

// export function stopTimelineItemTimer() {
//   if (typeof timelineItemTimer.value === 'number') {
//     clearInterval(timelineItemTimer.value);
//     timelineItemTimer.value = false;
//   }
// }
// export function reset(timelineItem: THourItem) {
//   stop();
//   updateTimelineItemActivitySeconds(timelineItem, timelineItem.activitySeconds - seconds.value);
//   seconds.value = 0;
// }
