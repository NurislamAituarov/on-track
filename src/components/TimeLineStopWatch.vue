<template>
  <div class="flex w-full items-center gap-2">
    <BaseButton type="danger" @click="reset" :disabled="!seconds">
      <ArrowPathIcon class="h-8" />
    </BaseButton>
    <div
      class="flex w-full flex-grow items-center bg-gray-100 px-2 py-2.5 font-mono text-3xl"
    >
      {{ formattedSeconds }}
    </div>
    <BaseButton v-if="isRunning" type="warning" @click="stop">
      <PauseIcon class="h-8" />
    </BaseButton>
    <BaseButton
      v-else
      type="success"
      @click="start"
      :disabled="isStartButtonDisabled"
    >
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import { ArrowPathIcon, PauseIcon, PlayIcon } from "@heroicons/vue/24/outline";
import BaseButton from "./base/BaseButton.vue";
import { formatSeconds } from "@/lib/helper";
import { computed, inject, ref } from "vue";
import { MILlISECONDS_IN_SECONDS } from "@/lib/constants";
import { THourItem } from "@/types";

interface Props {
  timelineItem: THourItem;
}
type UpdateTimelineItemActivityFunction = (
  timelineItem: THourItem,
  second: number
) => void;

const props = defineProps<Props>();

const updateTimelineItemActivitySeconds = inject(
  "update-timeline-item-activity"
) as UpdateTimelineItemActivityFunction;

const seconds = ref(props.timelineItem.activitySeconds);
const isRunning = ref<boolean | number>(false);

const formattedSeconds = computed(() => {
  return formatSeconds(seconds.value);
});

const isStartButtonDisabled = props.timelineItem.hour !== new Date().getHours();

function start() {
  isRunning.value = setInterval(() => {
    updateTimelineItemActivitySeconds(props.timelineItem, 1);

    seconds.value++;
  }, MILlISECONDS_IN_SECONDS);
}

function stop() {
  if (typeof isRunning.value === "number") {
    updateTimelineItemActivitySeconds(props.timelineItem, -seconds.value);

    clearInterval(isRunning.value);
    isRunning.value = false;
  }
}

function reset() {
  stop();
  seconds.value = 0;
}
</script>