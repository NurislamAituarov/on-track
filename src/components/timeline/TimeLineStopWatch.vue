<template>
  <div class="flex w-full items-center gap-2">
    <BaseButton
      type="danger"
      @click="reset"
      :disabled="!timelineItem.activitySeconds"
    >
      <BaseIcon name="ArrowPath" class="h-8" />
    </BaseButton>
    <div
      class="flex w-full flex-grow items-center bg-gray-100 px-2 py-2.5 font-mono text-3xl"
    >
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton
      v-if="timelineItemTimer && timelineItem.hour === now.getHours()"
      type="warning"
      @click="stop"
    >
      <BaseIcon name="Pause" class="h-8" />
    </BaseButton>
    <BaseButton
      v-else
      type="success"
      @click="start"
      :disabled="isStartButtonDisabled"
    >
      <BaseIcon name="Play" class="h-8" />
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, watch, watchEffect } from "vue";

import { updateTimelineItem } from "@/module/timeline-items";
import BaseButton from "../base/BaseButton.vue";
import BaseIcon from "../base/BaseIcon.vue";
import { formatSeconds } from "@/lib/helper";
import { useStopWatch } from "@/lib/hooks";
import { now } from "@/module/time";
import { THourItem } from "@/types";

interface Props {
  timelineItem: THourItem;
}
const props = defineProps<Props>();
const { seconds, timelineItemTimer, start, stop, reset } = useStopWatch(
  props.timelineItem.activitySeconds
);

onMounted(() => {
  if (props.timelineItem.isActiveTimer) {
    start();
  }
});

watchEffect(() => {
  if (
    props.timelineItem.hour !== now.value.getHours() &&
    timelineItemTimer.value
  )
    stop();
});

watch(seconds, () => {
  updateTimelineItem(props.timelineItem, {
    ...props.timelineItem,
    activitySeconds: seconds.value,
    isActiveTimer: Boolean(timelineItemTimer.value),
  });
});

watch(timelineItemTimer, (value) => {
  updateTimelineItem(props.timelineItem, {
    ...props.timelineItem,
    isActiveTimer: Boolean(value),
  });
});

const isStartButtonDisabled = computed(() => {
  return props.timelineItem.hour !== now.value.getHours();
});
</script>