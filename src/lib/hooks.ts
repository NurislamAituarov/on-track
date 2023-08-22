import { computed, ref, watch } from 'vue';
import { MILlISECONDS_IN_SECONDS } from './constants';
import { THourItem, UpdateTimelineItemActivityFunction } from '@/types';
import { formatSeconds } from './helper';

export function useStopWatch(
  timelineItem: THourItem,
  updateTimelineItemActivitySeconds: UpdateTimelineItemActivityFunction,
) {
  const seconds = ref(timelineItem.activitySeconds);
  const isRunning = ref<boolean | number>(false);

  watch(
    () => timelineItem.activityId,
    () => {
      updateTimelineItemActivitySeconds(timelineItem, seconds.value);
    },
  );

  const formattedSeconds = computed(() => {
    return formatSeconds(seconds.value);
  });

  function start() {
    isRunning.value = setInterval(() => {
      updateTimelineItemActivitySeconds(timelineItem, timelineItem.activitySeconds + 1);

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
