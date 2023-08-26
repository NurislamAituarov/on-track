<template>
  <li class="flex flex-col gap-1 p-4 text-start">
    <div class="truncate text-xl">{{ activity.name }}</div>

    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div
        :class="getProgressColorClass(+progress)"
        :style="`width: ${progress}%`"
      ></div>
    </div>

    <div class="flex justify-between font-mono text-sm">
      <span>{{ +progress >= 100 ? 100 : progress }}%</span>
      <span
        >{{ formatSeconds(getTotalActivitySeconds(activity, timelineItems)) }} /
        {{
          activity.secondsToComplete
            ? formatSeconds(activity.secondsToComplete)
            : formatSeconds(0)
        }}</span
      >
    </div>
  </li>
</template>


<script setup lang="ts">
import { computed } from "vue";
import { formatSeconds, getTotalActivitySeconds } from "@/lib/helper";
import { IActivitiesItem } from "@/types";
import { getProgressColorClass } from "@/lib/helper";
import { timelineItems } from "@/module/timeline-items";

interface Props {
  activity: IActivitiesItem;
}

const props = defineProps<Props>();

const progress = computed(() => {
  const activitySeconds = getTotalActivitySeconds(
    props.activity,
    timelineItems
  );
  const secondsToComplete = props.activity.secondsToComplete
    ? props.activity.secondsToComplete
    : 0;

  return ((activitySeconds * 100) / secondsToComplete).toFixed();
});
</script>