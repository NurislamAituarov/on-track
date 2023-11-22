<template>
  <div class="flex w-full items-center gap-2">
    <BaseButton type="danger" @click="reset" :disabled="!formattedSeconds">
      <BaseIcon name="ArrowPath" class="h-8" />
    </BaseButton>
    <div
      class="flex w-full flex-grow items-center bg-gray-100 px-2 py-2.5 font-mono text-3xl"
    >
      {{ formattedSeconds }}
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
import { computed, watch, watchEffect } from "vue";

import { updateTimelineItem } from "@/module/timeline-items";
import { THourItem } from "@/types";
import { useStopWatch } from "@/lib/hooks";
import { now } from "@/module/time";
import BaseButton from "../base/BaseButton.vue";
import BaseIcon from "../base/BaseIcon.vue";

interface Props {
  timelineItem: THourItem;
}
const props = defineProps<Props>();
const { seconds, timelineItemTimer, formattedSeconds, start, stop, reset } =
  useStopWatch(props.timelineItem.activitySeconds, () =>
    updateTimelineItemActivitySeconds()
  );

watchEffect(() => {
  if (
    props.timelineItem.hour !== now.value.getHours() &&
    timelineItemTimer.value
  )
    stop();
});

watch(
  () => props.timelineItem.activityId,
  () => updateTimelineItemActivitySeconds()
);

function updateTimelineItemActivitySeconds() {
  updateTimelineItem(props.timelineItem, {
    activityId: props.timelineItem.activityId,
    activitySeconds: seconds.value,
    hour: props.timelineItem.hour,
  });
}

const isStartButtonDisabled = computed(() => {
  return props.timelineItem.hour !== now.value.getHours();
});
</script>