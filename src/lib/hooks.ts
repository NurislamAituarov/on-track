import { computed, ref } from 'vue';
import { MILlISECONDS_IN_SECONDS } from './constants';
import { IActivitiesItem } from '@/types';
import { getTotalActivitySeconds } from './helper';
import { calculateTrackedActivitySeconds, timelineItems } from '@/module/timeline-items';
import { calculateCompletionPercentage, trackedActivities } from '@/module/activities';

export function useStopWatch(initialSeconds: number) {
  const timelineItemTimer = ref<boolean | number>(false);
  const seconds = ref(initialSeconds);

  function start() {
    timelineItemTimer.value = setInterval(() => {
      seconds.value++;
    }, MILlISECONDS_IN_SECONDS);
  }

  function stop() {
    if (typeof timelineItemTimer.value === 'number') {
      clearInterval(timelineItemTimer.value);
      timelineItemTimer.value = false;
    }
  }

  function reset() {
    stop();
    seconds.value = 0;
  }

  return {
    seconds,
    timelineItemTimer,
    start,
    stop,
    reset,
  };
}

export function useProgress(activity: IActivitiesItem) {
  return computed(() => {
    const activitySeconds = getTotalActivitySeconds(activity, timelineItems.value);
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
