<template>
  <div class="flex w-full items-center gap-2">
    <BaseButton type="danger" @click="reset" :disabled="!seconds">
      <BaseIcon name="ArrowPath" class="h-8" />
    </BaseButton>
    <div
      class="flex w-full flex-grow items-center bg-gray-100 px-2 py-2.5 font-mono text-3xl"
    >
      {{ formattedSeconds }}
    </div>
    <BaseButton v-if="isRunning" type="warning" @click="stop">
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
import { inject } from "vue";
import BaseButton from "../base/BaseButton.vue";
import { THourItem, UpdateTimelineItemActivityFunction } from "@/types";
import BaseIcon from "../base/BaseIcon.vue";
import { useStopWatch } from "@/lib/hooks";

interface Props {
  timelineItem: THourItem;
}
const props = defineProps<Props>();

const updateTimelineItemActivitySeconds = inject(
  "update-timeline-item-activity"
) as UpdateTimelineItemActivityFunction;

const isStartButtonDisabled = props.timelineItem.hour !== new Date().getHours();

const { seconds, isRunning, formattedSeconds, start, stop, reset } =
  useStopWatch(props.timelineItem, updateTimelineItemActivitySeconds);
</script>