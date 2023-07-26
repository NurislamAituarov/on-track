<template>
  <div v-if="activity.secondsToComplete" :class="classes">
    {{ seconds }}
    {{ false ? SECONDS_IN_MINUTE : "" }}
  </div>
</template>

<script lang="ts" setup>
import { SECONDS_IN_MINUTE } from "@/lib/constants";
import { formatSeconds, getTotalActivitySeconds } from "@/lib/helper";
import { IActivitiesItem, THourItem } from "@/types";
import { computed } from "vue";

interface Props {
  activity: IActivitiesItem;
  timelineItems: THourItem[];
}

const props = defineProps<Props>();

const secondsDiff = computed(() => {
  return props.activity.secondsToComplete
    ? getTotalActivitySeconds(props.activity, props.timelineItems) -
        props.activity.secondsToComplete
    : 0;
});

const seconds = computed(() => {
  return `${sign.value}${formatSeconds(secondsDiff.value)}`;
});

const sign = computed(() => {
  return secondsDiff.value >= 0 ? "+" : "-";
});

const classes = computed(() => {
  return `flex items-center rounded bg-purple-100 px-2 font-mono text-xl text-purple-600 ${colorClasses.value}`;
});

const colorClasses = computed(() => {
  return secondsDiff.value < 0
    ? "bg-red-100 text-red-600"
    : "bg-green-100 text-green-600";
});
</script>