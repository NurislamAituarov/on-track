import { computed, ref } from 'vue';
import { MILlISECONDS_IN_SECONDS } from './constants';
import { IActivitiesItem, THourItem, UpdateTimelineItemActivityFunction } from '@/types';
import { formatSeconds, getTotalActivitySeconds } from './helper';
import { calculateTrackedActivitySeconds, timelineItems } from '@/module/timeline-items';
import { calculateCompletionPercentage, trackedActivities } from '@/module/activities';

export function useStopWatch(
  timelineItem: THourItem,
  updateTimelineItemActivitySeconds: UpdateTimelineItemActivityFunction,
) {
  const seconds = ref(timelineItem.activitySeconds);
  const isRunning = ref<boolean | number>(false);

  const formattedSeconds = computed(() => {
    return formatSeconds(seconds.value);
  });

  function start() {
    isRunning.value = setInterval(() => {
      updateTimelineItemActivitySeconds(timelineItem, timelineItem.activitySeconds + 50);

      seconds.value++;
    }, MILlISECONDS_IN_SECONDS);
  }

  function stop() {
    if (typeof isRunning.value === 'number') {
      clearInterval(isRunning.value);
      isRunning.value = false;
    }
  }

  function reset() {
    stop();
    updateTimelineItemActivitySeconds(timelineItem, timelineItem.activitySeconds - seconds.value);
    seconds.value = 0;
  }

  return {
    seconds,
    isRunning,
    formattedSeconds,
    start,
    stop,
    reset,
  };
}

export function useProgress(activity: IActivitiesItem) {
  return computed(() => {
    const activitySeconds = getTotalActivitySeconds(activity, timelineItems);
    const secondsToComplete = activity.secondsToComplete ? activity.secondsToComplete : 0;

    return +((activitySeconds * 100) / secondsToComplete).toFixed();
  });
}

export function useTotalProgress() {
  const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value));

  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) =>
        Math.min(calculateTrackedActivitySeconds(activity), activity.secondsToComplete ?? 0),
      )
      .reduce((total, seconds) => total + seconds, 0);
  });

  return percentage;
}
